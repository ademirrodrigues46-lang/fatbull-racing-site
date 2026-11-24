import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Installation } from './components/Installation';
import { Release } from './components/Release';
import { Footer } from './components/Footer';
import { OverlayPreview } from './components/OverlayGallery';
import { DownloadCTA } from './components/DownloadCTA';
import { useReleases } from './lib/useReleases';

export default function App() {
  const releases = useReleases();
  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    <main id="conteudo">
      <Hero />
      <div className="pit-strip" aria-label="Compatibilidade"><div className="shell"><span>FEITO PARA O SEU COCKPIT</span><span>iRacing</span><span>Windows x64</span><span>Multimonitor</span><span>Integração com OBS</span></div></div>
      <section id="overlays" className="section shell">
        <div className="section-heading"><div><p className="eyebrow">01 / FATBULL OVERLAY</p><h2>Informação de corrida.<br /><span>No seu campo de visão.</span></h2></div><p>Seu ritmo, seus adversários e o que acontece ao redor. Escolha os widgets que fazem sentido para a sua corrida.</p></div>
        <OverlayPreview />
        <Features />
      </section>
      <section id="multimonitor" className="monitor-section section"><div className="shell monitor-layout">
        <div><p className="eyebrow">02 / SEU SETUP, SUAS REGRAS</p><h2>Uma tela.<br />Três telas.<br /><span>O cockpit é seu.</span></h2><p>Distribua os widgets entre os monitores conectados ao Windows. Ajuste posição, tamanho e fundo de cada painel e mantenha seu layout salvo neste PC.</p><a className="text-link" href="#instalacao">Prepare seu setup <span aria-hidden="true">↗</span></a></div>
        <div><div className="monitor-diagram" role="img" aria-label="Diagrama ilustrativo de três monitores com distribuição livre de widgets"><div className="screen screen-left"><span>01</span><b>CLASSIFICAÇÃO<br />RELATIVE</b></div><div className="screen screen-center"><span>02</span><b>DELTA · RADAR<br />INSTRUMENTOS</b></div><div className="screen screen-right"><span>03</span><b>CLIMA<br />SESSÃO</b></div></div><p className="caption">Distribuição ilustrativa — você escolhe onde cada widget fica.</p><div className="shortcut"><kbd>Ctrl</kbd><span>+</span><kbd>Shift</kbd><span>+</span><kbd>M</kbd><p>Ative a edição. Arraste. Volte à pista.</p></div></div>
      </div></section>
      <DownloadCTA releases={releases} />
      <Installation />
      <Release releases={releases} />
    </main>
    <Footer />
  </>;
}
