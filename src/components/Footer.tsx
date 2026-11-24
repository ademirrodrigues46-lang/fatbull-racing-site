import { ArrowUpRight } from 'lucide-react';
export function Footer() {
  return <footer className="site-footer"><div className="shell footer-top"><a className="brand" href="#top" aria-label="FATBULL Racing — voltar ao início"><img src="/images/fat-bull-racing-logo.png" alt="Logo original FATBULL Racing" width="108" height="72" /><span>FATBULL <b>RACING</b><small>SEU RITMO. SUA CORRIDA.</small></span></a><p>Informação na tela.<br /><strong>Instinto na pista.</strong></p><a className="text-link" href="#download">Baixar FATBULL OVERLAY <ArrowUpRight size={16} /></a></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} FATBULL Racing</span><span>Projeto independente, sem afiliação oficial com o iRacing.</span><a href="#top">Voltar ao topo ↑</a></div></footer>;
}

