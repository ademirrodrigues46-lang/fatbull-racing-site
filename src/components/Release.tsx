import { ArrowUpRight } from 'lucide-react';
import { formatDate, statusMessages } from '../lib/releases';
import type { ReleasesController } from '../lib/useReleases';
export function Release({ releases }: { releases: ReleasesController }) {
  const { state, repoUrl } = releases;
  const items = state.latest ? [state.latest, ...(state.history ?? []).filter(r => r.url !== state.latest?.url)].slice(0, 6) : [];
  return <section className="section shell" id="changelog"><div className="section-heading"><div><p className="eyebrow">05 / DIÁRIO DE DESENVOLVIMENTO</p><h2>A cada versão,<br /><span>uma nova volta.</span></h2></div><div><p>Novidades, correções e limitações informadas por quem desenvolve o aplicativo. Notas obtidas das releases públicas.</p>{repoUrl && <a className="text-link" href={repoUrl + '/releases'} target="_blank" rel="noreferrer">Histórico completo no GitHub <ArrowUpRight size={16} /></a>}</div></div>
    {items.length ? <div className="release-list">{items.map((release, i) => <details className="release-item" key={release.url} open={i === 0}><summary><span className="release-tag">{release.version}</span><span className="release-name">{release.name}{i === 0 && <small>MAIS RECENTE NO GITHUB</small>}</span><time dateTime={release.date}>{formatDate(release.date)}</time><span className="expand-sign" aria-hidden="true">+</span></summary><div className="release-body"><p className="release-notes">{release.notes || 'Esta release não inclui notas de atualização.'}</p><a className="text-link" href={release.url} target="_blank" rel="noreferrer">Abrir notas originais <ArrowUpRight size={16} /></a></div></details>)}</div> : <p className="empty-state">{statusMessages[state.status]}</p>}
    {state.historyError && <p className="empty-state">A versão atual foi encontrada, mas não foi possível carregar o histórico. Use “Verificar novamente” na central de downloads ou consulte o GitHub.</p>}
  </section>;
}

