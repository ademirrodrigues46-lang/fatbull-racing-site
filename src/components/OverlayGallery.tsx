import { useState } from 'react';
import { ArrowUpRight, ImageOff, SlidersHorizontal, PanelsTopLeft } from 'lucide-react';
const shots = [
  { src: '/images/overlay-panel.png', Icon: SlidersHorizontal, label: 'Painel de configuração', title: 'Seu layout, no detalhe.', description: 'Escolha seus widgets, ajuste as dimensões e encontre o equilíbrio ideal entre informação e espaço na tela.', detail: 'Captura do painel real. A prévia usa dados simulados.' },
  { src: '/images/overlay-widgets.png', Icon: PanelsTopLeft, label: 'Widgets de corrida', title: 'O que importa, à vista.', description: 'Classificação, Pit Box, GAP de retorno e Radar. Uma visão direta das informações que acompanham a sua sessão.', detail: 'Widgets reais do aplicativo. Valores e pilotos de demonstração.' },
];
export function OverlayPreview() {
  const [selected, setSelected] = useState(0);
  const [failed, setFailed] = useState(false);
  const shot = shots[selected];
  return <div className="gallery">
    <div className="gallery-sidebar"><p className="eyebrow">POR DENTRO DO FATBULL</p><h3>{shot.title}</h3><p>{shot.description}</p><div className="gallery-tabs" role="group" aria-label="Escolher captura">{shots.map((item, i) => <button type="button" key={item.src} aria-pressed={selected === i} onClick={() => { setSelected(i); setFailed(false); }}><item.Icon size={18} /><span>{item.label}</span><ArrowUpRight size={15} /></button>)}</div><div className="gallery-note"><span className="status-dot" /> CAPTURAS REAIS DA INTERFACE</div><p className="gallery-disclaimer">{shot.detail}</p></div>
    <div className="gallery-view"><div className="gallery-toolbar"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>{shot.label}</span><span className="gallery-count">0{selected + 1} / 02</span></div><div className="gallery-image">{failed ? <div className="image-placeholder"><ImageOff size={32} /><p>Captura indisponível.</p><span>Adicione uma imagem real do aplicativo para este espaço.</span></div> : <img key={shot.src} src={shot.src} onError={() => setFailed(true)} alt={shot.detail} width="1440" height="900" loading="lazy" />}</div><div className="gallery-caption"><span>DADOS SIMULADOS · MODO DE DEMONSTRAÇÃO</span>{!failed && <a className="text-link" href={shot.src} target="_blank" rel="noreferrer">Ampliar captura <ArrowUpRight size={15} /></a>}</div></div>
  </div>;
}

