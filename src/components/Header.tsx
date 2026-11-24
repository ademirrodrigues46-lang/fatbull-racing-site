import { useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return <header className="site-header"><div className="shell header-inner">
    <a className="brand" href="#top" aria-label="FATBULL Racing — início"><img src="/images/fat-bull-racing-logo.png" alt="Logo original FATBULL Racing" width="108" height="72" /><span>FATBULL <b>RACING</b><small>OVERLAY SYSTEMS</small></span></a>
    <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="main-nav" className={open ? 'nav open' : 'nav'} aria-label="Navegação principal" onClick={() => setOpen(false)} onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } }}>
      <a href="#overlays">O overlay</a><a href="#multimonitor">Seu setup</a><a href="#instalacao">Instalação</a><a href="#changelog">Atualizações</a><a className="button button-small" href="#download">Baixar overlay <ArrowUpRight size={16} /></a>
    </nav>
  </div></header>;
}

