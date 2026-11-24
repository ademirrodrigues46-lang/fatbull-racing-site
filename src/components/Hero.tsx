import { ArrowDownToLine, ArrowUpRight, Layers3, Monitor, Pause, Play } from 'lucide-react';
import type { ReleasesController } from '../lib/useReleases';

export function Hero({ releases, motion, onToggleMotion }: { releases: ReleasesController; motion: boolean; onToggleMotion: () => void }) {
  return <section className="hero" id="top">
    <div className="hero-atmosphere" aria-hidden="true"><div className="halo halo-red" /><div className="halo halo-gold" /><div className="hero-grid" />
      <svg className="light-ribbons" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="ribbon-color" x1="0" x2="1"><stop stopColor="#e51124" stopOpacity="0" /><stop offset=".4" stopColor="#e51124" /><stop offset=".7" stopColor="#ffb800" /><stop offset="1" stopColor="#e51124" stopOpacity="0" /></linearGradient></defs><path className="ribbon-base" d="M-100 650 C 250 650 220 210 650 390 S 1140 690 1550 60" /><path className="ribbon-light" d="M-100 650 C 250 650 220 210 650 390 S 1140 690 1550 60" /><path className="ribbon-secondary" d="M-140 710 C 250 710 260 265 680 430 S 1200 720 1580 130" /></svg>
    </div>
    <div className="shell hero-content">
      <a className="release-pill" href={releases.state.latest ? '#changelog' : '#overlays'}><span className="status-dot" /><span>{releases.state.latest ? releases.state.latest.version + ' disponível' : 'FATBULL OVERLAY'}</span><i />Feito para iRacing <ArrowUpRight size={13} /></a>
      <h1>Seu instinto na pista.<br /><span>Sua vantagem na tela.</span></h1>
      <p className="hero-description">A corrida não espera. Tenha o ritmo, os adversários e os sinais da pista<br className="desktop-break" /> no seu campo de visão — com um overlay que acompanha você.</p>
      <div className="hero-actions"><a className="button" href="#download"><ArrowDownToLine size={18} /> Baixar para Windows <ArrowUpRight size={16} /></a><a className="button button-secondary" href="#overlays"><Layers3 size={17} /> Explorar os overlays</a></div>
      <p className="hero-meta"><Monitor size={13} /> Windows x64 <span /> Layout personalizável <span /> Multimonitor</p>
      <div className="product-stage">
        <div className="stage-orbit" aria-hidden="true" />
        <div className="product-window">
          <div className="window-toolbar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>FATBULL / RACE WIDGETS</span><span className="preview-label">PRÉVIA DO APLICATIVO</span></div>
          <a className="product-image-link" href="#overlays" aria-label="Explorar as capturas reais do FATBULL Overlay"><img src="/images/overlay-widgets.png" alt="Widgets reais do FATBULL Overlay: Classificação, Pit Box, GAP de retorno e Radar, com dados simulados." width="1686" height="969" fetchPriority="high" /></a>
          <div className="window-bottom"><span><span className="status-dot" /> Sua corrida, em perspectiva.</span><span>Interface real · dados simulados</span></div>
        </div>
        <div className="stage-card stage-card-left"><span className="card-symbol"><Layers3 size={20} /></span><div><strong>Cada detalhe. Seu.</strong><small>Widgets independentes</small></div></div>
        <div className="stage-card stage-card-right"><span className="card-symbol"><Monitor size={20} /></span><div><strong>Além de uma tela.</strong><small>Seu setup multimonitor</small></div></div>
      </div>
      <div className="hero-bottom"><p>Captura real da interface em modo de demonstração.</p><button className="motion-control" type="button" aria-pressed={!motion} onClick={onToggleMotion}>{motion ? <Pause size={12} /> : <Play size={12} />}{motion ? 'Pausar efeitos' : 'Ativar efeitos'}</button></div>
    </div>
  </section>;
}

