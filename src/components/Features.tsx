import { Flag, Gauge, ListOrdered, Radar, Route, SlidersHorizontal } from 'lucide-react';
const features = [
  { Icon: ListOrdered, title: 'A corrida em contexto', text: 'Classificação e Relative com posições, categorias, tempos e intervalos para acompanhar seus adversários.' },
  { Icon: Gauge, title: 'Seu ritmo, volta a volta', text: 'Delta com referência identificada, marcha, pedais e RPM. Dados ausentes permanecem indicados como indisponíveis.' },
  { Icon: Radar, title: 'Atenção ao redor', text: 'Radar lateral com distância, tamanho e cores ajustáveis. Alertas de ocupação à esquerda e à direita.' },
  { Icon: Flag, title: 'Sinais que importam', text: 'Bandeiras da sessão e informações de clima. A disponibilidade depende da telemetria enviada pelo simulador.' },
  { Icon: Route, title: 'Visão da sessão', text: 'Mapa do traçado e informações do Pit Box. Circuitos sem correspondência exibem uma indicação de indisponibilidade.' },
  { Icon: SlidersHorizontal, title: 'Ajuste do seu jeito', text: 'Posição, tamanho e fundo por widget. O OBS pode usar uma fonte de navegador com layout independente.' },
];
export function Features() {
  return <div id="recursos" className="feature-grid">{features.map(({ Icon, title, text }, i) => <article className="feature" key={title}><div className="feature-top"><Icon size={23} strokeWidth={1.5} /><span>0{i + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>;
}

