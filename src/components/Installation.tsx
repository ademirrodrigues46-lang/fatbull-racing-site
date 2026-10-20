import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Download,
  Folder,
  LockKeyhole,
  Monitor,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { PulseMark } from "./Brand";

const steps = [
  {
    number: "01",
    title: "Baixe o instalador",
    description:
      "Um único .exe assinado. Sem runtime extra, sem cadastro e sem captura de tela.",
    meta: "18,4 MB · Windows x64",
  },
  {
    number: "02",
    title: "Deixe o RacePulse encontrar o iRacing",
    description:
      "Detecção automática do SDK, do teclado e do monitor principal. Tudo em segundo plano.",
    meta: "Configuração em 12 s",
  },
  {
    number: "03",
    title: "Entre na pista",
    description:
      "O perfil Endurance entra em ação. Ajuste o layout com Ctrl + Shift + E e volte para a pista.",
    meta: "Plug & play",
  },
];

const installerOptions = [
  {
    id: "autostart",
    label: "Iniciar com o Windows",
    description: "Pronto antes de abrir o iRacing.",
  },
  {
    id: "obs",
    label: "Fontes locais para OBS",
    description: "Browser Source em 127.0.0.1:8472.",
  },
  {
    id: "updates",
    label: "Atualizações automáticas",
    description: "Nunca durante uma sessão ativa.",
  },
];

export function Installation({
  onDownload,
  onDocs,
}: {
  onDownload: () => void;
  onDocs: () => void;
}) {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    autostart: true,
    obs: true,
    updates: true,
  });

  return (
    <section id="instalacao" className="relative overflow-hidden border-t border-white/[0.07] py-16 sm:py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 80% 42%, rgba(201,249,90,.07), transparent 48%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 grid-surface opacity-20" />

      <div className="page-shell relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 xl:gap-20">
          <div>
            <span className="eyebrow">Instalação</span>
            <h2 className="section-title mt-5 text-[2.15rem] sm:text-[2.8rem] lg:text-[3.1rem]">
              Do download à primeira volta.
              <br />
              <span className="text-[#7f8c81]">Em menos de um minuto.</span>
            </h2>
            <p className="mt-4 max-w-md text-[12.5px] leading-[1.8] text-muted">
              Instalação silenciosa, configuração guiada e nenhum arquivo do jogo modificado. O
              RacePulse conversa com o iRacing apenas pela telemetria oficial.
            </p>

            <div className="mt-8">
              {steps.map((step, index) => (
                <div key={step.number} className="relative flex gap-4 pb-6 last:pb-0">
                  {index < steps.length - 1 && (
                    <span className="absolute left-[15px] top-8 bottom-0 w-px bg-gradient-to-b from-white/15 to-white/[0.03]" />
                  )}
                  <span
                    className={cn(
                      "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border font-mono text-[9px] font-medium",
                      index === 0
                        ? "border-pulse/50 bg-pulse/10 text-pulse"
                        : "border-white/12 bg-[#0d1311] text-muted",
                    )}
                  >
                    {step.number}
                  </span>
                  <div className="pt-0.5">
                    <p className="text-[12px] font-semibold text-[#e2eade]">{step.title}</p>
                    <p className="mt-1 max-w-sm text-[10.5px] leading-[1.75] text-muted">
                      {step.description}
                    </p>
                    <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.08em] text-[#69766c]">
                      {step.meta}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <button type="button" onClick={onDownload} className="btn-primary group text-[11px]">
                <Download className="h-3.5 w-3.5" />
                Baixar instalador
                <ArrowRight className="h-3 w-3 opacity-60 transition group-hover:translate-x-0.5" />
              </button>
              <button type="button" onClick={onDocs} className="btn-secondary text-[11px]">
                <BookOpen className="h-3.5 w-3.5" />
                Guia completo
              </button>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5 border-t border-white/[0.07] pt-4">
              {[
                { icon: ShieldCheck, label: "Assinado digitalmente" },
                { icon: RefreshCw, label: "Atualização automática" },
                { icon: LockKeyhole, label: "Sem dados de conta" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 font-mono text-[7.5px] uppercase tracking-[0.06em] text-muted"
                >
                  <Icon className="h-3 w-3 text-[#789078]" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-pulse/[0.035] blur-[60px]" />
            <div className="absolute -right-1 -top-3 z-20 hidden items-center gap-1.5 rounded border border-pulse/25 bg-[#101810]/95 px-2.5 py-1.5 font-mono text-[7px] uppercase tracking-[0.07em] text-pulse shadow-xl sm:flex">
              <ShieldCheck className="h-2.5 w-2.5" />
              Instalador verificado
            </div>

            <div className="relative overflow-hidden rounded-xl border border-white/12 bg-[#0b100f] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]">
              <div className="flex h-10 items-center justify-between border-b border-white/[0.08] bg-[#0e1412] px-3.5">
                <div className="flex items-center gap-2">
                  <PulseMark className="h-4 w-4 rounded-[4px]" />
                  <span className="font-display text-[10px] font-semibold tracking-[-0.02em] text-[#dde6d8]">
                    RacePulse Setup
                  </span>
                  <span className="hidden font-mono text-[7px] uppercase tracking-[0.08em] text-muted sm:block">
                    / instalação
                  </span>
                </div>
                <div className="flex items-center gap-2 pl-2">
                  <span className="h-px w-2.5 bg-white/30" />
                  <span className="h-2.5 w-2.5 border border-white/30" />
                  <span className="relative block h-2.5 w-2.5 before:absolute before:left-[5px] before:top-0 before:h-2.5 before:w-px before:rotate-45 before:bg-white/30" />
                </div>
              </div>

              <div className="grid sm:grid-cols-[112px_1fr]">
                <aside className="hidden border-r border-white/[0.07] bg-[#090e0c] p-3 sm:block">
                  <p className="mono-label">Etapas</p>
                  <div className="mt-3 space-y-1">
                    {[
                      ["01", "Destino", true],
                      ["02", "Componentes", false],
                      ["03", "Concluir", false],
                    ].map(([number, label, active]) => (
                      <div
                        key={number as string}
                        className={cn(
                          "flex items-center gap-2 rounded px-1.5 py-2 font-mono text-[7px] uppercase tracking-[0.05em]",
                          active ? "bg-pulse/[0.08] text-pulse" : "text-muted",
                        )}
                      >
                        <span
                          className={cn(
                            "grid h-3.5 w-3.5 place-items-center rounded-full border text-[6px]",
                            active ? "border-pulse/50" : "border-white/15",
                          )}
                        >
                          {active ? <Check className="h-2 w-2" /> : number}
                        </span>
                        {label}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 border-t border-white/[0.07] pt-3">
                    <p className="mono-label">Versão</p>
                    <p className="mt-1.5 font-mono text-[8px] text-[#b6c2b2]">2.4.1 stable</p>
                  </div>
                </aside>

                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-pulse">
                        Bem-vindo, piloto
                      </p>
                      <h3 className="mt-1.5 font-display text-[17px] font-semibold tracking-[-0.04em] text-fog">
                        Tudo pronto para instalar.
                      </h3>
                      <p className="mt-1 text-[9.5px] leading-relaxed text-muted">
                        O RacePulse encontrou o iRacing nesta máquina.
                      </p>
                    </div>
                    <span className="hidden rounded border border-pulse/20 bg-pulse/[0.06] px-1.5 py-1 font-mono text-[6px] uppercase tracking-[0.08em] text-pulse sm:block">
                      auto-detect
                    </span>
                  </div>

                  <div className="mt-4 rounded border border-white/[0.08] bg-black/20 px-2.5 py-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-2 font-mono text-[7.5px] text-[#b9c5b4]">
                        <Folder className="h-3 w-3 shrink-0 text-muted" />
                        <span className="truncate">%LOCALAPPDATA%\FatBullRacing</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setEnabled((prev) => ({ ...prev }))}
                        className="shrink-0 font-mono text-[7px] uppercase tracking-[0.05em] text-pulse"
                      >
                        alterar
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="mono-label">Componentes</span>
                      <span className="font-mono text-[7px] text-muted">recomendado</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      {installerOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setEnabled((prev) => ({ ...prev, [option.id]: !prev[option.id] }))}
                          className="flex w-full items-center gap-2.5 rounded border border-transparent px-1 py-1.5 text-left transition hover:border-white/[0.07]"
                          aria-pressed={enabled[option.id]}
                        >
                          <span
                            className={cn(
                              "grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[3px] border transition",
                              enabled[option.id]
                                ? "border-pulse bg-pulse text-ink"
                                : "border-white/20 bg-white/[0.03]",
                            )}
                          >
                            {enabled[option.id] && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[9.5px] font-medium text-[#d3ddce]">
                              {option.label}
                            </span>
                            <span className="mt-0.5 block text-[8px] leading-tight text-muted">
                              {option.description}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/[0.07] pt-3.5">
                    <span className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.06em] text-muted">
                      <RefreshCw className="h-2.5 w-2.5" />
                      verificação automática
                    </span>
                    <p className="font-mono text-[7px] uppercase tracking-[0.06em] text-muted">
                      42 MB utilizados
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onDownload}
                    className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded bg-pulse text-[10px] font-extrabold text-ink transition hover:bg-[#dcff8d]"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Instalar RacePulse
                  </button>
                  <p className="mt-2 text-center font-mono text-[6.5px] uppercase leading-relaxed tracking-[0.06em] text-muted/70">
                    Ao instalar, você concorda com a licença de uso pessoal.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#090e0c] px-3 py-2.5">
                <span className="flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.06em] text-muted">
                  <span className="h-1 w-1 rounded-full bg-pulse shadow-[0_0_6px_#c9f95a]" />
                  Servidor de atualizações online
                </span>
                <span className="flex items-center gap-2.5 font-mono text-[7px] uppercase tracking-[0.06em] text-muted">
                  <span className="hidden items-center gap-1 sm:flex">
                    <Monitor className="h-2.5 w-2.5" /> Windows 11
                  </span>
                  <ChevronRight className="h-2.5 w-2.5" />
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 px-1">
              <span className="font-mono text-[7px] uppercase leading-relaxed tracking-[0.06em] text-muted/75">
                SHA-256 · 4f9a17d2…c297
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.06em] text-muted/75">
                <LockKeyhole className="h-2.5 w-2.5" /> Conexão local
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
