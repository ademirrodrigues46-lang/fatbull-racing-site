import {
  ArrowUpRight,
  ChevronRight,
  CircleGauge,
  Cpu,
  Fuel,
  Gauge,
  Layers3,
  Map,
  MonitorPlay,
  Radar,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";

const tableRows = [
  { pos: "1", car: "#7", name: "M. Rodrigues", gap: "L12", cls: "PRO", fastest: false },
  { pos: "2", car: "#24", name: "T. Voss", gap: "+1.284", cls: "PRO", fastest: false },
  { pos: "3", car: "#11", name: "J. Park", gap: "+4.801", cls: "PRO", fastest: true, you: true },
  { pos: "4", car: "#3", name: "A. Silva", gap: "+7.392", cls: "AM", fastest: false },
  { pos: "5", car: "#52", name: "L. Moreno", gap: "+11.830", cls: "AM", fastest: false },
];

export function Features({ onDownload }: { onDownload: () => void }) {
  return (
    <section id="recursos" className="relative py-16 sm:py-20 lg:py-24">
      <div className="page-shell">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.7fr] lg:items-end">
          <div>
            <span className="eyebrow">Por dentro do RacePulse</span>
            <h2 className="section-title mt-5 max-w-2xl text-[2.25rem] sm:text-[2.9rem] lg:text-[3.25rem]">
              Olhe para a pista.
              <br />
              <span className="text-[#839084]">O resto é com a gente.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[13px] leading-[1.8] text-muted lg:justify-self-end lg:pb-1">
            Telemetria do iRacing transformada em decisões. Sem janelas escondidas, sem captura de
            tela e sem ruído visual.
          </p>
        </div>

        <div className="mt-9 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: Cpu,
              metric: "0,8%",
              label: "CPU em média",
              description: "Renderização otimizada, sem captura de tela.",
              graph: (
                <div className="flex h-8 items-end gap-[3px]">
                  {[24, 35, 22, 42, 30, 52, 32, 44, 26, 38, 30, 45, 28, 34, 24, 39].map((height, index) => (
                    <span
                      key={index}
                      className="w-[3px] rounded-[1px] bg-pulse/50"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              ),
            },
            {
              icon: Timer,
              metric: "10 Hz",
              label: "Timing em tempo real",
              description: "Intervalos, classes e melhor volta sem atraso.",
              graph: (
                <div className="flex items-center gap-1">
                  {[...Array(8)].map((_, index) => (
                    <span
                      key={index}
                      className="h-1 rounded-full bg-pulse/50"
                      style={{
                        width: `${index === 6 ? 22 : 8}px`,
                        opacity: index === 6 ? 1 : 0.45,
                      }}
                    />
                  ))}
                </div>
              ),
            },
            {
              icon: MonitorPlay,
              metric: "60 FPS",
              label: "No seu cockpit",
              description: "Zero stutter. Zero interrupção da imersão.",
              graph: (
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-pulse" />
                  <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-[#8e9a8f]">
                    frame time
                  </span>
                  <span className="font-mono text-[8px] text-pulse">16.6ms</span>
                </div>
              ),
            },
          ].map(({ icon: Icon, metric, label, description, graph }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-lg border border-white/[0.08] bg-[#0b100f] p-4 transition hover:border-white/[0.15]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/[0.07] bg-white/[0.025] text-pulse">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-[22px] font-semibold tracking-[-0.055em] text-fog">
                    {metric}
                  </span>
                  <span className="truncate font-mono text-[7px] uppercase tracking-[0.07em] text-muted">
                    {label}
                  </span>
                </div>
                <div className="mt-2 hidden items-center justify-between sm:flex">
                  <p className="text-[9px] leading-tight text-muted/80">{description}</p>
                  <div className="ml-2 shrink-0">{graph}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="overlays" className="mt-16 scroll-mt-24 sm:mt-20">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-3">
              <span className="grid h-7 w-7 place-items-center rounded border border-pulse/20 bg-pulse/[0.06] text-pulse">
                <Layers3 className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-muted">
                  Biblioteca de overlays
                </p>
                <h3 className="mt-1 font-display text-[16px] font-semibold tracking-[-0.03em] text-fog">
                  Cada módulo. Do seu jeito.
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={onDownload}
              className="group flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-[#b6c2b2] transition hover:text-pulse"
            >
              Todos incluídos no app
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="grid gap-3 lg:grid-cols-12">
            <article className="group relative flex flex-col overflow-hidden rounded-xl border border-white/[0.09] bg-[#0b100f] lg:col-span-7">
              <div className="relative h-[220px] overflow-hidden border-b border-white/[0.07] bg-[#080d0b] p-4 sm:h-[235px]">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 78% 8%, rgba(201,249,90,.09), transparent 55%), linear-gradient(135deg, #0b110e, #080b0a)",
                  }}
                />
                <div className="absolute inset-0 dot-surface opacity-20" />
                <div className="relative mb-2.5 flex items-center justify-between">
                  <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-muted">
                    timing tower / preview
                  </span>
                  <span className="rounded-sm border border-white/10 bg-white/[0.025] px-1.5 py-0.5 font-mono text-[7px] text-muted">
                    10 Hz
                  </span>
                </div>
                <div className="relative mx-auto w-full max-w-[370px] overflow-hidden rounded border border-white/[0.11] bg-[#070b0a]/90 shadow-2xl">
                  <div className="h-[2px] bg-pulse" />
                  <div className="flex items-center justify-between border-b border-white/[0.07] px-2.5 py-2">
                    <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.06em] text-fog">
                      Standings <span className="text-muted">V2</span>
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-[6.5px] uppercase text-muted">
                      <span className="rounded-sm bg-white/[0.07] px-1 py-0.5 text-[#d6dfd1]">Geral</span>
                      <span>Classe</span>
                      <span>·</span>
                      <span>L12/24</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-[18px_1fr_54px_34px] gap-1 border-b border-white/[0.05] px-2.5 py-1 font-mono text-[6px] uppercase tracking-[0.08em] text-muted/70">
                    <span>pos</span>
                    <span>piloto</span>
                    <span className="text-right">gap</span>
                    <span className="text-right">classe</span>
                  </div>
                  {tableRows.map((row) => (
                    <div
                      key={row.car}
                      className={`grid grid-cols-[18px_1fr_54px_34px] items-center gap-1 border-l-2 px-2.5 py-[5px] font-mono text-[7.5px] ${
                        row.you
                          ? "border-pulse bg-pulse/[0.08]"
                          : "border-transparent border-b border-b-white/[0.035]"
                      }`}
                    >
                      <span className="text-muted">{row.pos}</span>
                      <span className="truncate text-[#cdd7c8]">
                        <span className="mr-1 text-muted/60">{row.car}</span>
                        {row.name}
                        {row.fastest && <span className="ml-1 text-[#c38bff]">▴</span>}
                      </span>
                      <span className="text-right tabular-nums text-[#b4c0b0]">{row.gap}</span>
                      <span
                        className={`text-right text-[6.5px] ${row.cls === "PRO" ? "text-pulse/80" : "text-[#ffab8e]/80"}`}
                      >
                        {row.cls}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between border-t border-white/[0.07] px-2.5 py-1.5 font-mono text-[6px] uppercase tracking-[0.06em] text-muted">
                    <span>
                      <span className="mr-1 text-[#c38bff]">▴</span> volta rápida 1:28.462
                    </span>
                    <span>24 carros</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-[18px] font-semibold tracking-[-0.035em] text-fog">
                        Standings V2
                      </h3>
                      <span className="rounded-full border border-pulse/25 bg-pulse/[0.07] px-2 py-0.5 font-mono text-[7px] uppercase tracking-[0.08em] text-pulse">
                        novo
                      </span>
                    </div>
                    <p className="mt-2 max-w-md text-[11px] leading-[1.7] text-muted">
                      Classificação geral ou por classe, intervalo, melhor volta e status na pit.
                      Atualização 10 vezes por segundo, do jeito que a disputa exige.
                    </p>
                  </div>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded border border-white/10 text-muted transition group-hover:border-pulse/30 group-hover:text-pulse">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-white/[0.07] pt-3 font-mono text-[7px] uppercase tracking-[0.07em] text-muted">
                  <span className="flex items-center gap-1.5 text-[#b7c3b3]">
                    <Trophy className="h-2.5 w-2.5 text-pulse" /> 24 carros
                  </span>
                  <span>Cores por equipe</span>
                  <span>•</span>
                  <span>Intervalos por classe</span>
                </div>
              </div>
            </article>

            <article className="group relative flex flex-col overflow-hidden rounded-xl border border-white/[0.09] bg-[#0b100f] lg:col-span-5">
              <div className="relative flex h-[235px] items-center justify-center overflow-hidden border-b border-white/[0.07] bg-[#080d0b]">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 62%, rgba(201,249,90,.1), transparent 55%), linear-gradient(160deg, #0b110e, #080b0a)",
                  }}
                />
                <div className="absolute inset-0 speed-lines opacity-40" />
                <div className="absolute left-4 top-4 flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.1em] text-muted">
                  <Fuel className="h-2.5 w-2.5 text-pulse" /> fuel plan
                </div>
                <div className="absolute right-4 top-4 rounded-sm border border-white/10 px-1.5 py-0.5 font-mono text-[6.5px] uppercase tracking-[0.08em] text-muted">
                  live
                </div>
                <div className="relative mt-3 flex items-end gap-5">
                  <div className="relative grid h-[136px] w-[136px] place-items-center">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "conic-gradient(#c9f95a 0 68%, #1e2721 68% 100%)",
                        mask: "radial-gradient(circle, transparent 62%, black 63%)",
                        WebkitMask: "radial-gradient(circle, transparent 62%, black 63%)",
                      }}
                    />
                    <div className="absolute inset-3 rounded-full border border-white/[0.09]" />
                    <div className="relative text-center">
                      <p className="font-mono text-[7px] uppercase tracking-[0.08em] text-muted">restante</p>
                      <p className="mt-1 font-display text-[27px] font-semibold leading-none tracking-[-0.07em] text-fog">
                        36.8
                      </p>
                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-pulse">litros</p>
                    </div>
                  </div>
                  <div className="mb-2 space-y-2">
                    <div>
                      <p className="font-mono text-[6px] uppercase tracking-[0.08em] text-muted">até o fim</p>
                      <p className="font-display text-[16px] font-semibold text-pulse">+1.6 L</p>
                    </div>
                    <div className="h-px w-16 bg-white/10" />
                    <div>
                      <p className="font-mono text-[6px] uppercase tracking-[0.08em] text-muted">janela de pit</p>
                      <p className="font-mono text-[9px] font-medium text-fog">L14 — L16</p>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-4 bottom-3 flex items-center justify-between border-t border-white/[0.07] pt-2 font-mono text-[6.5px] uppercase tracking-[0.06em] text-muted">
                  <span>
                    <strong className="font-medium text-[#dce5d7]">2.4</strong> L / volta
                  </span>
                  <span>
                    <strong className="font-medium text-[#dce5d7]">4.2</strong> voltas
                  </span>
                  <span className="text-pulse">economia: 0.2</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                <div>
                  <h3 className="font-display text-[18px] font-semibold tracking-[-0.035em] text-fog">
                    Estratégia de combustível
                  </h3>
                  <p className="mt-2 text-[11px] leading-[1.7] text-muted">
                    Voltas restantes, consumo real, alvo de economia e a janela ideal de pit —
                    recalculados a cada passagem pela linha.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded border border-white/10 bg-white/[0.025] px-2 py-1 font-mono text-[6.5px] uppercase tracking-[0.06em] text-muted">
                    tint
                  </span>
                  <span className="rounded border border-white/10 bg-white/[0.025] px-2 py-1 font-mono text-[6.5px] uppercase tracking-[0.06em] text-muted">
                    pit window
                  </span>
                  <span className="rounded border border-white/10 bg-white/[0.025] px-2 py-1 font-mono text-[6.5px] uppercase tracking-[0.06em] text-muted">
                    save mode
                  </span>
                </div>
              </div>
            </article>

            <article className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b100f] lg:col-span-4">
              <div className="relative h-[164px] overflow-hidden border-b border-white/[0.07] bg-[#080c0b] p-4">
                <div className="mb-2 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.08em] text-muted">
                  <span className="flex items-center gap-1.5 text-[#aebbab]">
                    <Timer className="h-2.5 w-2.5 text-pulse" /> Relativo
                  </span>
                  <span className="tabular-nums">00:53:18</span>
                </div>
                <div className="overflow-hidden rounded border border-white/[0.1] bg-[#070b0a]">
                  {[
                    ["#24", "T. Voss", "+1.124", "#ff9473"],
                    ["#11", "J. Park", "0.000", "#c9f95a"],
                    ["#3", "A. Silva", "-0.882", "#dce5d6"],
                    ["#52", "L. Moreno", "-1.406", "#dce5d6"],
                  ].map(([car, name, gap, color], index) => (
                    <div
                      key={car}
                      className={`grid grid-cols-[26px_1fr_44px] items-center border-b border-white/[0.04] px-2 py-[5px] font-mono text-[7px] last:border-0 ${
                        index === 1 ? "border-l-2 border-l-pulse bg-pulse/[0.07]" : "border-l-2 border-l-transparent"
                      }`}
                    >
                      <span style={{ color }}>{index === 1 ? "•" : car}</span>
                      <span className="text-[#c5d0c0]">{index === 1 ? "YOU" : name}</span>
                      <span className="text-right tabular-nums" style={{ color }}>
                        {gap}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-x-4 bottom-2 flex justify-between font-mono text-[6px] uppercase tracking-[0.06em] text-muted">
                  <span>gap em pista</span>
                  <span className="text-pulse">atualizado 10hz</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-3 p-4">
                <div>
                  <h3 className="font-display text-[15px] font-semibold tracking-[-0.03em] text-fog">
                    Relativo inteligente
                  </h3>
                  <p className="mt-1.5 text-[10px] leading-[1.7] text-muted">
                    Quem está ao redor, com gap ao vivo e relógio da sessão.
                  </p>
                </div>
                <div className="flex items-center gap-2 border-t border-white/[0.07] pt-3 font-mono text-[7px] uppercase tracking-[0.07em] text-muted">
                  <span className="h-1 w-1 rounded-full bg-pulse" /> filtro por classe
                </div>
              </div>
            </article>

            <article className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b100f] lg:col-span-4">
              <div className="relative h-[164px] overflow-hidden border-b border-white/[0.07] bg-[#080c0b]">
                <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.08em] text-muted">
                  <Radar className="h-2.5 w-2.5 text-pulse" /> Proximity radar
                </div>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="relative h-[126px] w-[190px] overflow-hidden rounded-t-full border border-b-0 border-white/[0.09] bg-[radial-gradient(ellipse_at_bottom,rgba(201,249,90,.07),transparent_65%)]">
                    <div className="absolute bottom-0 left-1/2 top-3 w-px -translate-x-1/2 bg-gradient-to-b from-pulse/45 via-pulse/15 to-transparent" />
                    <div className="absolute left-1/2 top-16 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px] border border-pulse/60 bg-pulse/20" />
                    <div className="absolute left-[28%] top-[42%] h-6 w-3 rounded-[4px] border border-[#ff8a67]/60 bg-[#ff8a67]/20" />
                    <div className="absolute right-[23%] top-[26%] h-5 w-3 rounded-[4px] border border-[#ff8a67]/40 bg-[#ff8a67]/10" />
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[6px] uppercase tracking-[0.08em] text-muted">
                      overlap / 0.4s
                    </div>
                  </div>
                </div>
                <div className="absolute right-4 top-4 rounded-sm border border-pulse/20 bg-pulse/[0.06] px-1.5 py-0.5 font-mono text-[6px] uppercase tracking-[0.06em] text-pulse">
                  clear
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-3 p-4">
                <div>
                  <h3 className="font-display text-[15px] font-semibold tracking-[-0.03em] text-fog">
                    Radar de proximidade
                  </h3>
                  <p className="mt-1.5 text-[10px] leading-[1.7] text-muted">
                    Veja o carro ao lado antes de fechar a porta. Sem pontos cegos.
                  </p>
                </div>
                <div className="flex items-center gap-2 border-t border-white/[0.07] pt-3 font-mono text-[7px] uppercase tracking-[0.07em] text-muted">
                  <span className="h-1 w-1 rounded-full bg-[#ff8a67]" /> alerta lateral
                </div>
              </div>
            </article>

            <article className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b100f] lg:col-span-4">
              <div className="relative h-[164px] overflow-hidden border-b border-white/[0.07] bg-[#080c0b]">
                <div className="absolute left-4 top-4 z-10 flex items-center justify-between right-4">
                  <span className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.08em] text-muted">
                    <Map className="h-2.5 w-2.5 text-pulse" /> Track map
                  </span>
                  <span className="font-mono text-[6px] uppercase tracking-[0.06em] text-[#b9c5b5]">
                    Interlagos · 4.30 km
                  </span>
                </div>
                <div className="absolute inset-x-6 bottom-5 top-9">
                  <svg viewBox="0 0 200 100" className="h-full w-full overflow-visible" aria-hidden="true">
                    <path
                      d="M20 78C12 58 34 44 52 50s18-18 6-26-29-6-28-13 64-5 88 4 24 25 10 35-4 24 17 17 37 3 31 19-29 12-46 4-32 4-56 2-36 2-48-14Z"
                      fill="rgba(5,8,7,.6)"
                      stroke="#33403a"
                      strokeWidth="9"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 78C12 58 34 44 52 50s18-18 6-26-29-6-28-13 64-5 88 4 24 25 10 35-4 24 17 17 37 3 31 19-29 12-46 4-32 4-56 2-36 2-48-14Z"
                      fill="none"
                      stroke="#c9f95a"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                      strokeDasharray="30 15 12 36"
                    />
                    <circle cx="93" cy="39" r="3.6" fill="#c9f95a" stroke="#07100a" strokeWidth="1.7" />
                    <circle cx="139" cy="78" r="2.5" fill="#c38bff" />
                    <circle cx="51" cy="58" r="2.5" fill="#ff8a67" />
                    <path d="M52 51v-9" stroke="#e7ecdf" strokeWidth="1.2" />
                  </svg>
                </div>
                <div className="absolute bottom-2 left-4 right-4 flex justify-between font-mono text-[6px] uppercase tracking-[0.06em] text-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-pulse" /> você
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-[#c38bff]" /> melhor setor
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-3 p-4">
                <div>
                  <h3 className="font-display text-[15px] font-semibold tracking-[-0.03em] text-fog">
                    Mapa da pista
                  </h3>
                  <p className="mt-1.5 text-[10px] leading-[1.7] text-muted">
                    Posição, setores e delta de volta. Mapas para cada circuito.
                  </p>
                </div>
                <div className="flex items-center gap-2 border-t border-white/[0.07] pt-3 font-mono text-[7px] uppercase tracking-[0.07em] text-muted">
                  <span className="h-1 w-1 rounded-full bg-[#c38bff]" /> melhores setores
                </div>
              </div>
            </article>
          </div>

          <div className="mt-3 flex flex-col items-start justify-between gap-4 rounded-lg border border-white/[0.08] bg-[#0a0f0d] px-4 py-3.5 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-mono text-[7px] uppercase tracking-[0.1em] text-muted">Mais widgets</span>
              {["Inputs", "Bandeiras", "Pneus", "Pit helper", "Stint", "Clima", "Setores", "Tempo restante"].map(
                (widget) => (
                  <span
                    key={widget}
                    className="rounded border border-white/[0.08] bg-white/[0.02] px-2 py-1 font-mono text-[7px] uppercase tracking-[0.05em] text-[#a5b1a3]"
                  >
                    {widget}
                  </span>
                ),
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2 font-mono text-[7px] uppercase tracking-[0.08em] text-muted">
              <CircleGauge className="h-3 w-3 text-pulse" />
              14 overlays · todos inclusos
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
          <p className="max-w-md text-[11px] leading-relaxed text-muted">
            Tudo roda em uma única janela transparente, com controle de posição, escala e opacidade
            por widget. Você decide o que merece espaço na tela.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
              <Zap className="h-3 w-3 text-pulse" /> sem captura de tela
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
              <Gauge className="h-3 w-3 text-pulse" /> 60 fps
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
