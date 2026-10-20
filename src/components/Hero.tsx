import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  Gauge,
  Keyboard,
  Monitor,
  Play,
  Signal,
  Sparkles,
} from "lucide-react";
import { PreviewFrame } from "./OverlayPreview";

export function Hero({ onDownload }: { onDownload: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden pb-10 pt-[104px] sm:pb-16 lg:pt-[132px]">
      <div
        className="pointer-events-none absolute inset-0 grid-surface opacity-60"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 88%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 88%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-[15%] -top-[18%] h-[720px] w-[720px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,249,90,0.10) 0%, rgba(201,249,90,0.035) 38%, transparent 68%)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-px bg-gradient-to-b from-pulse/20 to-transparent" />

      <div className="page-shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:gap-10 xl:gap-16">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 font-mono text-[8px] font-medium uppercase tracking-[0.1em] text-[#b9c6b4]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pulse opacity-30" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-pulse" />
                </span>
                Overlay nativo para iRacing
              </span>
              <span className="rounded-full border border-white/10 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
                v2.4.1 · stable
              </span>
            </div>

            <h1 className="mt-6 font-display text-[2.9rem] font-medium leading-[0.98] tracking-[-0.06em] text-fog sm:text-[3.65rem] lg:text-[3.6rem] xl:text-[4.1rem]">
              Toda a sua corrida.
              <br />
              <span className="text-pulse">Em uma só camada.</span>
            </h1>

            <p className="mt-6 max-w-[29rem] text-[13.5px] leading-[1.75] text-[#9ba69d] sm:text-[14.5px]">
              Standings, relativos, combustível e estratégia em tempo real. Um overlay leve,
              preciso e totalmente seu — direto no cockpit, sem tirar os olhos da pista.
            </p>

            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <button type="button" onClick={onDownload} className="btn-primary group text-[12px]">
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Baixar para Windows
                <ArrowRight className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a href="#estudio" className="btn-secondary group text-[12px]">
                <span className="grid h-5 w-5 place-items-center rounded-full border border-white/20 bg-white/[0.06] transition group-hover:border-pulse/40 group-hover:text-pulse">
                  <Play className="ml-px h-2 w-2 fill-current" />
                </span>
                Abrir o estúdio
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {[
                { icon: Monitor, label: "Windows 10 / 11" },
                { icon: Gauge, label: "60 FPS nativos" },
                { icon: Keyboard, label: "Plug & play" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.07em] text-muted"
                >
                  <Icon className="h-3 w-3 text-[#6f7b70]" />
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3 border-t border-white/[0.07] pt-5">
              <div className="flex -space-x-2">
                {[
                  ["FB", "bg-[#E51124] text-[#FFFFFF]"],
                  ["MR", "bg-[#141E38] text-[#FFB800]"],
                  ["TV", "bg-[#1E293B] text-[#F8FAFC]"],
                  ["LS", "bg-[#B80716] text-[#FFFFFF]"],
                ].map(([initials, classes]) => (
                  <span
                    key={initials}
                    className={`grid h-6 w-6 place-items-center rounded-full border border-[#080E1B] font-mono text-[7px] font-bold ${classes}`}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <p className="text-[10px] leading-relaxed text-muted">
                <span className="font-semibold text-[#c8d2c4]">Feito por pilotos</span> que também
                configuram o próprio setup.
              </p>
            </div>
          </div>

          <div className="relative min-w-0 lg:pl-1">
            <div className="pointer-events-none absolute -inset-12 -z-10 rounded-full bg-pulse/[0.045] blur-[70px]" />

            <div className="mb-2.5 flex items-center justify-between gap-3 px-1">
              <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                <span className="h-1 w-1 rounded-full bg-pulse" />
                Live overlay / preview
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
                <Signal className="h-2.5 w-2.5 text-[#95a195]" />
                12 ms
              </span>
            </div>

            <div className="relative">
              <PreviewFrame />

              <div className="absolute -right-2 -top-3 z-20 hidden items-center gap-2 rounded border border-pulse/25 bg-[#0d1510]/95 px-2.5 py-1.5 font-mono text-[7px] uppercase tracking-[0.08em] text-pulse shadow-xl sm:flex lg:-right-3 lg:-top-4">
                <Sparkles className="h-2.5 w-2.5" />
                iRacing SDK conectado
              </div>

              <div className="absolute -bottom-4 left-4 z-20 hidden items-center gap-2.5 rounded border border-white/10 bg-[#0e1412]/95 px-3 py-2 shadow-2xl backdrop-blur sm:flex">
                <span className="grid h-6 w-6 place-items-center rounded-sm bg-pulse/10 text-pulse">
                  <Check className="h-3 w-3" />
                </span>
                <div>
                  <p className="font-mono text-[7px] uppercase tracking-[0.08em] text-[#aeb9ac]">
                    Perfil detectado
                  </p>
                  <p className="mt-0.5 text-[9px] font-semibold text-fog">GT3 · Endurance 6h</p>
                </div>
                <span className="ml-2 font-mono text-[8px] text-pulse">ativo</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 px-1">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[7.5px] uppercase tracking-[0.07em] text-muted">
                <span>Ctrl + Shift + E</span>
                <span className="text-white/15">/</span>
                <span>Editar layout</span>
                <span className="text-white/15">/</span>
                <span>Transparente</span>
              </div>
              <a
                href="#overlays"
                className="hidden items-center gap-1 font-mono text-[7.5px] uppercase tracking-[0.07em] text-[#c3cebf] transition hover:text-pulse sm:flex"
              >
                Explorar overlays <ArrowUpRight className="h-2.5 w-2.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative mt-14 border-y border-white/[0.08] py-4 sm:mt-20">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="shrink-0 font-mono text-[7.5px] uppercase tracking-[0.14em] text-[#68746a]">
              Integra-se ao seu ecossistema
            </span>
            <div className="flex w-full flex-wrap items-center justify-center gap-x-7 gap-y-3 sm:w-auto sm:justify-end lg:gap-x-10">
              {["iRacing", "OBS Studio", "SimHub", "Twitch", "Stream Deck"].map((name) => (
                <span
                  key={name}
                  className="font-display text-[11px] font-semibold tracking-[-0.02em] text-[#7e8a80] transition hover:text-[#cbd5c7]"
                >
                  {name}
                </span>
              ))}
              <span className="hidden h-3 w-px bg-white/10 lg:block" />
              <span className="hidden items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.06em] text-[#8a968b] lg:flex">
                <Signal className="h-2.5 w-2.5" /> Windows 11 ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
