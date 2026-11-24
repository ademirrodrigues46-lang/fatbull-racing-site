import { ArrowDownToLine, ArrowUpRight } from 'lucide-react';
export function Hero() {
  return <section className="hero" id="top"><div className="hero-photo" aria-hidden="true" /><div className="shell hero-layout">
    <div className="hero-copy"><p className="eyebrow"><span className="red-line" /> FATBULL RACING / SOFTWARE PARA PILOTOS</p><h1>FOCO NA PISTA.<br /><span>CONTROLE</span><br />NA TELA.</h1><p className="hero-description">Transforme telemetria em decisões.<br />FATBULL OVERLAY coloca a informação da corrida onde você precisa: à sua frente.</p><div className="hero-actions"><a className="button" href="#download"><ArrowDownToLine size={18} /> Baixar para Windows</a><a className="text-link" href="#overlays">Conheça o overlay <ArrowUpRight size={17} /></a></div><p className="hero-meta">PARA iRACING <span>/</span> WINDOWS x64 <span>/</span> SEU LAYOUT</p></div>
    <div className="hero-aside"><span className="vertical-label">PRECISÃO EM CADA VOLTA</span><div className="hero-note"><span className="eyebrow">DO GRID À BANDEIRADA</span><p>A corrida muda.<br /><strong>Seu foco permanece.</strong></p><a href="#overlays" aria-label="Ver recursos do FATBULL Overlay"><ArrowUpRight /></a></div><span className="image-credit">Imagem de cockpit do projeto original.</span></div>
  </div><div className="hero-bottom shell"><span>FATBULL OVERLAY</span><span>DESENVOLVIDO PARA O SEU RITMO <span aria-hidden="true">↓</span></span></div></section>;
}

