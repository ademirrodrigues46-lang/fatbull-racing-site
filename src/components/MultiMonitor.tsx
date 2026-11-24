import { useState } from 'react';
import { ArrowUpRight, Move, Save, SlidersHorizontal } from 'lucide-react';
export function MultiMonitor() {
  const [count, setCount] = useState(3);
  const layouts = count === 1 ? ['TODOS OS WIDGETS'] : count === 2 ? ['CLASSIFICAÇÃO · RELATIVE', 'DELTA · RADAR · CLIMA'] : ['CLASSIFICAÇÃO · RELATIVE', 'DELTA · RADAR', 'CLIMA · SESSÃO'];
  return <section id="multimonitor" className="section monitor-section"><div className="shell monitor-layout">
    <div><p className="eyebrow">02 / SEU SETUP, SUAS REGRAS</p><h2>O limite não é<br /><span>a sua tela.</span></h2><p>Do setup compacto ao cockpit de três monitores. Distribua os widgets e mantenha a pista livre para o que você faz de melhor.</p><ul className="setup-benefits"><li><Move size={17} /> Arraste entre monitores</li><li><SlidersHorizontal size={17} /> Ajuste cada widget</li><li><Save size={17} /> Mantenha seu layout salvo neste PC</li></ul><a className="text-link" href="#instalacao">Prepare seu setup <ArrowUpRight size={16} /></a></div>
    <div className="setup-card"><div className="setup-top"><span className="eyebrow">EXPLORE AS POSSIBILIDADES</span><span className="setup-indicator">SEU COCKPIT</span></div><div className="setup-options" role="group" aria-label="Escolher quantidade de telas">{[1, 2, 3].map(n => <button type="button" key={n} aria-pressed={count === n} onClick={() => setCount(n)}>{n} {n === 1 ? 'tela' : 'telas'}</button>)}</div><div className={'monitor-diagram monitors-' + count} role="img" aria-label={'Diagrama ilustrativo de ' + count + (count === 1 ? ' monitor' : ' monitores') + ' com distribuição livre de widgets'}>{layouts.map((label, i) => <div className={'screen screen-' + i} key={count + '-' + i}><span>0{i + 1}</span><div className="screen-bars" aria-hidden="true"><i /><i /><i /></div><b>{label}</b></div>)}</div><p className="caption">Distribuição ilustrativa. Você escolhe onde cada widget fica.</p><div className="shortcut"><span className="shortcut-label">MODO DE EDIÇÃO</span><div><kbd>Ctrl</kbd><span>+</span><kbd>Shift</kbd><span>+</span><kbd>M</kbd></div><p>Ative. Arraste. Volte à pista.</p></div></div>
  </div></section>;
}

