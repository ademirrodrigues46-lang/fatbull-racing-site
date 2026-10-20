import { useCallback, useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Studio } from "./components/Studio";
import { Identity } from "./components/Identity";
import { Installation } from "./components/Installation";
import { Streaming } from "./components/Streaming";
import { Release } from "./components/Release";
import { Testimonials } from "./components/Testimonials";
import { DownloadCTA } from "./components/DownloadCTA";
import { Footer } from "./components/Footer";
import { DownloadModal } from "./components/DownloadModal";
import { DocsModal } from "./components/DocsModal";
import { BrandProvider } from "./lib/brand";

export default function App() {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const notify = useCallback((message: string) => {
    setToast(message);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 5200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const openDownload = useCallback(() => {
    setDocsOpen(false);
    setDownloadOpen(true);
  }, []);

  const openDocs = useCallback(() => {
    setDownloadOpen(false);
    setDocsOpen(true);
  }, []);

  return (
    <BrandProvider>
      <div className="min-h-screen overflow-x-hidden bg-ink text-fog selection:bg-pulse selection:text-ink">
        <a
          href="#recursos"
          className="fixed left-3 top-3 z-[100] -translate-y-20 rounded bg-pulse px-3 py-2 text-[10px] font-bold text-ink transition focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>

        <Header onDownload={openDownload} onDocs={openDocs} />
        <main>
          <Hero onDownload={openDownload} />
          <Features onDownload={openDownload} />
          <Studio onNotify={notify} onDownload={openDownload} />
          <Identity onNotify={notify} />
          <Installation onDownload={openDownload} onDocs={openDocs} />
          <Streaming onDocs={openDocs} />
          <Release onNotify={notify} />
          <Testimonials />
          <DownloadCTA onDownload={openDownload} onDocs={openDocs} />
        </main>
        <Footer onDownload={openDownload} onDocs={openDocs} onNotify={notify} />

        <DownloadModal
          open={downloadOpen}
          onClose={() => setDownloadOpen(false)}
          onDocs={openDocs}
          onNotify={notify}
        />
        <DocsModal
          open={docsOpen}
          onClose={() => setDocsOpen(false)}
          onDownload={openDownload}
          onNotify={notify}
        />

        {toast && (
          <div
            className="animate-toast-in fixed bottom-4 left-1/2 z-[100] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-start gap-2.5 rounded-lg border border-white/15 bg-panel-raised px-3.5 py-3 shadow-[0_24px_70px_rgba(0,0,0,0.8)] backdrop-blur sm:left-auto sm:right-5 sm:translate-x-0"
            role="status"
            aria-live="polite"
          >
            <span
              className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-ink"
              style={{ backgroundColor: "var(--color-pulse)", color: "var(--color-ink)" }}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <p className="flex-1 text-[10.5px] leading-relaxed text-[#dbe5d5]">{toast}</p>
            <button
              type="button"
              onClick={() => setToast(null)}
              aria-label="Fechar notificação"
              className="mt-0.5 text-muted transition hover:text-fog"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </BrandProvider>
  );
}
