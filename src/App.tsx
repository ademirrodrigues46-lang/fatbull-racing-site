import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Installation } from './components/Installation';
import { Release } from './components/Release';
import { Footer } from './components/Footer';
import { OverlayPreview } from './components/OverlayGallery';
import { DownloadCTA } from './components/DownloadCTA';
import { MultiMonitor } from './components/MultiMonitor';
import { useReleases } from './lib/useReleases';

export default function App() {
  const releases = useReleases();
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotion(!preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  return <div className="site" data-motion={motion ? 'on' : 'off'}>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    <main id="conteudo">
      <Hero releases={releases} motion={motion} onToggleMotion={() => setMotion(value => !value)} />
      <div className="pit-strip" aria-label="Compatibilidade"><div className="shell"><span>NO SEU RITMO. NO SEU SETUP.</span><span>iRacing</span><span>Windows x64</span><span>Multimonitor</span><span>Integração com OBS</span></div></div>
      <section id="overlays" className="section shell">
        <div className="section-heading"><div><p className="eyebrow">01 / CONHEÇA O OVERLAY</p><h2>Menos distração.<br /><span>Mais corrida.</span></h2></div><p>Posições, ritmo e o que acontece ao redor. A informação que faz diferença, organizada do seu jeito.</p></div>
        <OverlayPreview />
        <Features />
      </section>
      <MultiMonitor />
      <DownloadCTA releases={releases} />
      <Installation />
      <Release releases={releases} />
    </main>
    <Footer />
  </div>;
}

