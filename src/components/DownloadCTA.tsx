import { ArrowRight, Check, Download, FileText, Monitor, Sparkles } from "lucide-react";
import { PulseMark } from "./Brand";

export function DownloadCTA({
  onDownload,
  onDocs,
}: {
  onDownload: () => void;
  onDocs: () => void;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-6 sm:pb-20">
      <div className="page-shell">
        <div className="relative overflow-hidden rounded-2xl bg-pulse">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #0b1008 1px, transparent 1px), linear-gradient(to bottom, #0b1008 1px, transparent 1px)",
              backgroundSize: "54px 54px",
              maskImage: "linear-gradient(110deg, black, transparent 70%)",
              WebkitMaskImage: "linear-gradient(110deg, black, transparent 70%)",
            }}
          />
          <div className="pointer-events-none absolute -right-24 -top-40 h-[420px] w-[420px] rounded-full border border-black/10" />
          <div className="pointer-events-none absolute -right-3 -top-20 h-[300px] w-[300px] rounded-full border border-black/10" />
          <span className="pointer-events-none absolute -bottom-8 right-3 select-none font-display text-[92px] font-bold leading-none tracking-[-0.1em] text-black/[0.055] sm:text-[130px]">
            PULSE
          </span>

          <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-14 lg:p-11">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-black/[0.07] px-2.5 py-1.5 font-mono text-[8px] font-medium uppercase tracking-[0.1em] text-[#253213]">
                <span className="h-1 w-1 rounded-full bg-[#1d2811]" />
                Pronto para a temporada 2026
              </span>
              <h2 className="mt-5 max-w-xl font-display text-[2.35rem] font-medium leading-[0.98] tracking-[-0.06em] text-[#10170b] sm:text-[3rem] lg:text-[3.4rem]">
                A próxima volta
                <br />
                começa aqui.
              </h2>
              <p className="mt-4 max-w-md text-[12px] font-medium leading-[1.8] text-[#354526]">
                Baixe o RacePulse, ative seu primeiro perfil e transforme a telemetria em decisões.
                Configuração em menos de um minuto.
              </p>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={onDownload}
                  className="group inline-flex items-center justify-center gap-2 rounded-[6px] border border-black bg-[#0b1009] px-4 py-3 text-[11px] font-extrabold text-[#ecf6de] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5 hover:bg-[#141d0f]"
                >
                  <Download className="h-4 w-4 text-pulse" />
                  Baixar para Windows
                  <ArrowRight className="h-3.5 w-3.5 opacity-60 transition group-hover:translate-x-0.5" />
                </button>
                <button
                  type="button"
                  onClick={onDocs}
                  className="inline-flex items-center justify-center gap-2 rounded-[6px] border border-black/25 bg-white/15 px-4 py-3 text-[11px] font-bold text-[#1b2513] transition hover:bg-white/25"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Ler a documentação
                </button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                {["Sem cartão", "30 dias de avaliação", "Atualizações inclusas"].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.07em] text-[#41512f]"
                  >
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-xl border border-black/20 bg-[#0b100c] p-4 text-fog shadow-[0_28px_60px_-24px_rgba(11,16,8,0.6)] sm:p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PulseMark className="h-6 w-6" />
                    <div>
                      <p className="font-display text-[11px] font-bold tracking-[-0.02em]">
                        FatBull Racing Overlay
                      </p>
                      <p className="mt-0.5 font-mono text-[6px] uppercase tracking-[0.08em] text-muted">
                        Windows installer
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-pulse/25 bg-pulse/[0.07] px-1.5 py-0.5 font-mono text-[6px] uppercase tracking-[0.08em] text-pulse">
                    stable
                  </span>
                </div>

                <div className="mt-4 space-y-0 border-y border-white/[0.08]">
                  {[
                    ["Versão", "2.4.1"],
                    ["Plataforma", "Windows 10 / 11 · x64"],
                    ["Tamanho", "18,4 MB"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border-b border-white/[0.05] py-2 last:border-0"
                    >
                      <span className="font-mono text-[7px] uppercase tracking-[0.07em] text-muted">
                        {label}
                      </span>
                      <span className="font-mono text-[7.5px] text-[#d2dccb]">{value}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onDownload}
                  className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded bg-pulse text-[10px] font-extrabold text-ink transition hover:bg-[#dcff8d]"
                >
                  <Download className="h-3.5 w-3.5" />
                  Baixar instalador
                </button>

                <div className="mt-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-[6px] uppercase tracking-[0.06em] text-muted">
                    <Sparkles className="h-2.5 w-2.5 text-pulse" />
                    Instalador assinado
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[6px] uppercase tracking-[0.06em] text-muted">
                    <Monitor className="h-2.5 w-2.5" />
                    Win 11 ready
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded border border-black/15 bg-black/[0.045] px-2.5 py-2">
                <span className="font-mono text-[6px] uppercase tracking-[0.06em] text-[#455435]">
                  SHA-256
                </span>
                <span className="font-mono text-[6px] text-[#3d4d2b]">4f9a17d2…c297</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
