import { useState } from 'react';
import { ArrowUpRight, ImageOff } from 'lucide-react';
const shots = [
  { src: '/images/overlay-panel.png', label: 'Painel de configuração', title: 'Seu layout, no detalhe.', description: 'Captura do painel do aplicativo local. A prévia usa dados simulados, como indicado pelo próprio FATBULL.' },
  { src: '/images/overlay-widgets.png', label: 'Widgets de corrida', title: 'O que importa, à vista.', description: 'Captura existente no projeto do aplicativo: Classificação, Pit Box, GAP de retorno e Radar. Valores e pilotos de demonstração.' },
];
export function OverlayPreview() {
  const [selected, setSelected] = useState(0);
  const [failed, setFailed] = useState(false);
  const shot = shots[selected];
  return <div className="gallery"><div className="gallery-toolbar"><span className="eyebrow">POR DENTRO DO FATBULL</span><div className="gallery-tabs" role="group" aria-label="Escolher captura">{shots.map((item, i) => <button type="button" key={item.src} aria-pressed={selected === i} onClick={() => { setSelected(i); setFailed(false); }}>{item.label}</button>)}</div></div><div className="gallery-image">{failed ? <div className="image-placeholder"><ImageOff size={32} /><p>Captura indisponível.</p><span>Adicione uma imagem real do aplicativo para este espaço.</span></div> : <img src={shot.src} onError={() => setFailed(true)} alt={shot.description} width="1440" height="900" loading="lazy" />}</div><div className="gallery-caption"><div><span className="eyebrow">CAPTURA DO APLICATIVO · DADOS SIMULADOS</span><h3>{shot.title}</h3><p>{shot.description}</p></div>{!failed && <a className="text-link" href={shot.src} target="_blank" rel="noreferrer">Ampliar captura <ArrowUpRight size={16} /></a>}</div></div>;
}

