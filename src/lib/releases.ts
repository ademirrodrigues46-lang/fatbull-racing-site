export type ReleaseConfig = { owner: string; repo: string; assetPrefix: string; assetSuffix: string };
export type Asset = { name: string; size: number; url: string };
export type PublishedRelease = { version: string; name: string; date: string; notes: string; url: string; assets: Asset[] };
export type ReleaseState = {
  status: 'loading' | 'ready' | 'unconfigured' | 'empty' | 'unavailable' | 'rate-limited' | 'error' | 'no-asset' | 'ambiguous';
  latest?: PublishedRelease; asset?: Asset; history?: PublishedRelease[]; historyError?: boolean;
};

export function repositoryUrl(config: ReleaseConfig) {
  const valid = /^[a-zA-Z0-9][a-zA-Z0-9-]*$/.test(config.owner) && /^[a-zA-Z0-9_.-]+$/.test(config.repo) && !['.', '..'].includes(config.repo);
  return valid ? `https://github.com/${config.owner}/${config.repo}` : null;
}

function trustedUrl(value: unknown, config: ReleaseConfig, kind: 'tag' | 'download') {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    const prefix = `/${config.owner}/${config.repo}/releases/${kind}/`.toLowerCase();
    return url.protocol === 'https:' && url.hostname === 'github.com' && !url.port && !url.username && !url.password && url.pathname.toLowerCase().startsWith(prefix) ? url.href : null;
  } catch { return null; }
}

export function parseRelease(raw: unknown, config: ReleaseConfig): PublishedRelease | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  if (r.draft !== false || r.prerelease !== false) return null;
  const url = trustedUrl(r.html_url, config, 'tag');
  if (!url || typeof r.tag_name !== 'string' || !r.tag_name.trim() || typeof r.published_at !== 'string' || !Number.isFinite(Date.parse(r.published_at)) || !Array.isArray(r.assets)) return null;
  const assets = r.assets.flatMap((value: unknown): Asset[] => {
    if (!value || typeof value !== 'object') return [];
    const a = value as Record<string, unknown>;
    const assetUrl = trustedUrl(a.browser_download_url, config, 'download');
    return assetUrl && a.state === 'uploaded' && typeof a.name === 'string' && typeof a.size === 'number' && a.size > 0 && Number.isFinite(a.size)
      ? [{ name: a.name, size: a.size, url: assetUrl }] : [];
  });
  return { version: r.tag_name, name: typeof r.name === 'string' && r.name.trim() ? r.name : r.tag_name, date: r.published_at, notes: typeof r.body === 'string' ? r.body : '', url, assets };
}

export function selectDownload(latest: PublishedRelease, config: ReleaseConfig): ReleaseState {
  // Não escolhe um executável arbitrário nem retorna silenciosamente a uma versão antiga.
  const candidates = latest.assets.filter(a => a.name.startsWith(config.assetPrefix) && a.name.endsWith(config.assetSuffix) && /\.exe$/i.test(a.name));
  return { status: candidates.length === 1 ? 'ready' : candidates.length > 1 ? 'ambiguous' : 'no-asset', latest, asset: candidates.length === 1 ? candidates[0] : undefined };
}

async function request(url: string, fetcher: typeof fetch) {
  return fetcher(url, { headers: { Accept: 'application/vnd.github+json' }, cache: 'no-store', signal: AbortSignal.timeout(12000) });
}

export async function loadLatest(config: ReleaseConfig, fetcher: typeof fetch = fetch): Promise<ReleaseState> {
  if (!repositoryUrl(config) || !config.assetSuffix || !config.assetPrefix) return { status: 'unconfigured' };
  const base = `https://api.github.com/repos/${config.owner}/${config.repo}`;
  try {
    const response = await request(`${base}/releases/latest`, fetcher);
    if (response.status === 403 || response.status === 429) return { status: 'rate-limited' };
    if (response.status === 404) {
      const repo = await request(base, fetcher);
      if (repo.status === 403 || repo.status === 429) return { status: 'rate-limited' };
      return { status: repo.ok ? 'empty' : repo.status === 404 ? 'unavailable' : 'error' };
    }
    if (!response.ok) return { status: 'error' };
    const latest = parseRelease(await response.json(), config);
    return latest ? selectDownload(latest, config) : { status: 'error' };
  } catch { return { status: 'error' }; }
}

export async function loadHistory(config: ReleaseConfig, fetcher: typeof fetch = fetch): Promise<PublishedRelease[]> {
  if (!repositoryUrl(config)) return [];
  const response = await request(`https://api.github.com/repos/${config.owner}/${config.repo}/releases?per_page=20`, fetcher);
  if (!response.ok) throw new Error('Histórico indisponível');
  const data: unknown = await response.json();
  if (!Array.isArray(data)) throw new Error('Histórico inválido');
  return data.flatMap(raw => { const release = parseRelease(raw, config); return release ? [release] : []; })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 6);
}

export const statusMessages: Record<ReleaseState['status'], string> = {
  loading: 'Consultando a versão publicada no GitHub…',
  ready: 'Versão pública mais recente, consultada no GitHub.',
  unconfigured: 'O canal de downloads ainda não foi configurado.',
  empty: 'Ainda não há uma versão pública estável disponível.',
  unavailable: 'O repositório não está disponível publicamente.',
  'rate-limited': 'O GitHub limitou as consultas. Tente novamente mais tarde ou acesse as releases.',
  error: 'Não foi possível consultar o GitHub. Verifique sua conexão e tente novamente.',
  'no-asset': 'Esta versão ainda não tem um instalador Windows x64 compatível disponível.',
  ambiguous: 'Há mais de um instalador compatível. Escolha o arquivo na página da release.',
};

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeZone: 'America/Sao_Paulo' }).format(new Date(value));
}
export function formatSize(bytes: number) {
  return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(bytes / 1024 / 1024)} MB`;
}
