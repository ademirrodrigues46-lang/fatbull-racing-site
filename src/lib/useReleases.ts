import { useCallback, useEffect, useRef, useState } from 'react';
import { downloadConfig } from '../data/download';
import { loadHistory, loadLatest, repositoryUrl, type ReleaseState } from './releases';

export function useReleases() {
  const [state, setState] = useState<ReleaseState>({ status: 'loading' });
  const [downloading, setDownloading] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState('');
  const busy = useRef(false);
  const generation = useRef(0);
  const refresh = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    const current = ++generation.current;
    setState({ status: 'loading' });
    const latest = await loadLatest(downloadConfig);
    setState(latest);
    busy.current = false;
    if (latest.latest) {
      try { const history = await loadHistory(downloadConfig); if (generation.current === current) setState({ ...latest, history }); }
      catch { if (generation.current === current) setState({ ...latest, historyError: true }); }
    }
  }, []);
  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => { if (!document.hidden) void refresh(); }, 300000);
    return () => window.clearInterval(timer);
  }, [refresh]);
  const download = async () => {
    if (busy.current || downloading) return;
    busy.current = true;
    ++generation.current;
    setDownloading(true);
    setDownloadNotice('Confirmando a versão mais recente…');
    const fresh = await loadLatest(downloadConfig);
    // Revalida no clique para acompanhar uma publicação feita depois de abrir a página.
    setState(previous => ({ ...fresh, history: previous.history, historyError: previous.historyError }));
    if (fresh.status === 'ready' && fresh.asset) {
      window.location.assign(fresh.asset.url);
      setDownloadNotice(`Download solicitado: ${fresh.asset.name}`);
    } else setDownloadNotice('O download não foi iniciado. Confira o status abaixo.');
    setDownloading(false);
    busy.current = false;
  };
  return { state, refresh, download, downloading, downloadNotice, repoUrl: repositoryUrl(downloadConfig) };
}
export type ReleasesController = ReturnType<typeof useReleases>;
