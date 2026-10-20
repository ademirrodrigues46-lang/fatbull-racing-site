import {
  ArrowUpRight,
  Check,
  Eye,
  Layers,
  MonitorPlay,
  Radio,
  SlidersHorizontal,
  Tv,
  Wifi,
  Zap,
} from "lucide-react";

const cockpitNight = "/images/cockpit-night.jpg";

const benefits = [
  ["Browser Sources nativos", "Cada widget tem seu próprio link local."],
  ["Fundo transparente", "Sem chroma key, sem bordas, sem recortes."],
  ["Cenas independentes", "Timing, combustível e lower third separados."],
  ["Zero captura de tela", "Menos GPU. Mais frames para a live."],
];

export function Streaming({ onDocs }: { onDocs: () => void }) {
  return (
    <section id="streaming" className="relative overflow-hidden border-y border-white/[0.07] bg-[#090d0c]">
      <div className="pointer-events-none absolute -right-40 top-0 h-[480px] w-[480px] rounded-full bg-pulse/[0.035] blur-[100px]" />
      <div className="page-shell relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14 xl:gap-20">
          <div>
            <span className="eyebrow">Streamer ready</span>
            <h2 className="section-title mt-5 text-[2.15rem] sm:text-[2.8rem] lg:text-[3rem]">
              A mesma volta.
              <br />
              <span className="text-[#7f8c81]">Uma live mais limpa.</span>
            </h2>
            <p className="mt-4 max-w-sm text-[12.5px] leading-[1.8] text-muted">
              Transforme qualquer overlay em uma fonte de transmissão transparente. O RacePulse
              serve os widgets direto para o OBS — sem captura de janela, sem duplicar FPS.
            </p>

            <div className="mt-7 grid gap-x-4 gap-y-3 sm:grid-cols-2">
              {benefits.map(([title, description]) => (
                <div key={title} className="flex gap-2.5">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-pulse/30 bg-pulse/[0.07] text-pulse">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  <div>
                    <p className="text-[10.5px] font-semibold leading-tight text-[#dbe4d5]">{title}</p>
                    <p className="mt-1 text-[9.5px] leading-relaxed text-muted">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onDocs}
              className="group mt-7 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.08em] text-[#c1ccbd] transition hover:text-pulse"
            >
              Abrir guia para OBS / XSplit
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/[0.07] pt-5">
              {[
                ["60", "FPS no OBS"],
                ["0", "capturas de tela"],
                ["1", "fonte local"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-[22px] font-semibold leading-none tracking-[-0.06em] text-fog">
                    {value}
                  </p>
                  <p className="mt-1.5 font-mono text-[6.5px] uppercase tracking-[0.08em] text-muted">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-pulse/[0.04] blur-[50px]" />

            <div className="relative overflow-hidden rounded-xl border border-white/12 bg-[#0b100f] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95)]">
              <div className="flex h-10 items-center justify-between gap-2 border-b border-white/[0.08] bg-[#0d1210] px-3">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-4 w-4 place-items-center rounded-sm bg-pulse text-ink">
                    <Tv className="h-2.5 w-2.5" />
                  </span>
                  <span className="font-display text-[10px] font-semibold tracking-[-0.02em] text-[#e0e8db]">
                    RacePulse Cast
                  </span>
                  <span className="hidden h-3 w-px bg-white/10 sm:block" />
                  <span className="hidden items-center gap-1 font-mono text-[7px] uppercase tracking-[0.08em] text-muted sm:flex">
                    <Radio className="h-2.5 w-2.5 text-[#ff7658]" />
                    Cena 02 / Race
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 font-mono text-[7px] uppercase tracking-[0.08em] text-[#ff9473]">
                    <span className="h-1 w-1 rounded-full bg-[#ff7658] shadow-[0_0_5px_#ff7658]" /> live
                  </span>
                  <span className="font-mono text-[7px] text-muted">60 fps</span>
                </div>
              </div>

              <div className="grid md:grid-cols-[minmax(0,1fr)_114px]">
                <div className="relative overflow-hidden bg-black">
                  <div className="relative aspect-[16/9] w-full">
                    <img
                      src={cockpitNight}
                      alt="Visão do cockpit em uma pista noturna durante transmissão"
                      className="absolute inset-0 h-full w-full object-cover object-[center_58%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-black/25" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.08]" />

                    <div className="absolute left-[3%] top-[6%] flex items-center gap-1.5">
                      <span className="grid h-4 w-4 place-items-center rounded-sm bg-pulse text-ink">
                        <Zap className="h-2.5 w-2.5" />
                      </span>
                      <span className="font-display text-[8px] font-semibold tracking-[-0.02em] text-white">
                        RACEPULSE
                      </span>
                      <span className="rounded-sm border border-white/20 bg-black/40 px-1 py-0.5 font-mono text-[5px] uppercase tracking-[0.08em] text-white/70 backdrop-blur">
                        live timing
                      </span>
                    </div>

                    <div className="absolute right-[3%] top-[6%] w-[37%] overflow-hidden rounded border border-white/[0.13] bg-[#070c0a]/85 backdrop-blur-sm">
                      <div className="h-[2px] bg-pulse" />
                      <div className="flex justify-between border-b border-white/[0.08] px-1.5 py-1 font-mono text-[5px] uppercase tracking-[0.05em] text-white/45">
                        <span>standings</span>
                        <span>GT3 · L12/24</span>
                      </div>
                      {[
                        { pos: "1", car: "#7", name: "M. Rodrigues", gap: "L12", you: false },
                        { pos: "2", car: "#24", name: "T. Voss", gap: "+1.284", you: false },
                        { pos: "3", car: "#11", name: "J. Park", gap: "+4.801", you: true },
                      ].map(({ pos, car, name, gap, you }) => (
                        <div
                          key={car}
                          className={`grid grid-cols-[8px_1fr_30px] items-center gap-1 border-l-[1.5px] px-1.5 py-[3px] font-mono text-[5.5px] ${
                            you
                              ? "border-[#c9f95a] bg-[#c9f95a]/10 text-white"
                              : "border-transparent text-white/65"
                          }`}
                        >
                          <span className="opacity-50">{pos}</span>
                          <span className="truncate">
                            <span className="opacity-40">{car}</span> {name}
                          </span>
                          <span className="text-right tabular-nums">{gap}</span>
                        </div>
                      ))}
                    </div>

                    <div className="absolute bottom-[8%] left-[3%] flex items-stretch overflow-hidden rounded-sm border border-white/15 bg-[#070c0a]/90 backdrop-blur">
                      <div className="flex w-8 items-center justify-center bg-pulse text-ink">
                        <span className="font-display text-[17px] font-bold leading-none tracking-[-0.08em]">
                          3
                        </span>
                      </div>
                      <div className="px-2 py-1.5">
                        <p className="font-mono text-[5px] uppercase tracking-[0.1em] text-white/45">
                          GT3 PRO · Você
                        </p>
                        <p className="mt-0.5 font-display text-[10px] font-semibold leading-none tracking-[-0.02em] text-white">
                          J. PARK <span className="font-mono text-[5.5px] font-normal text-white/45">#11</span>
                        </p>
                      </div>
                      <div className="flex flex-col justify-center border-l border-white/10 px-2">
                        <span className="font-mono text-[5px] uppercase tracking-[0.06em] text-white/40">
                          intervalo
                        </span>
                        <span className="font-mono text-[7px] font-medium text-[#ffb29c]">+4.801</span>
                      </div>
                    </div>

                    <div className="absolute bottom-[8%] right-[3%] flex items-center gap-1.5 rounded-sm border border-white/10 bg-black/50 px-1.5 py-1 font-mono text-[5px] uppercase tracking-[0.07em] text-white/55 backdrop-blur">
                      <Tv className="h-2 w-2 text-pulse" />
                      source 01 / transparent
                    </div>

                    <div className="absolute inset-x-[3%] bottom-[2.5%] flex justify-between font-mono text-[5px] uppercase tracking-[0.07em] text-white/25">
                      <span>RacePulse Overlay · 1920 × 1080</span>
                      <span>SAFE ZONE</span>
                    </div>
                  </div>
                </div>

                <aside className="hidden flex-col border-l border-white/[0.08] bg-[#0a0f0d] md:flex">
                  <div className="flex items-center justify-between border-b border-white/[0.07] px-2.5 py-2">
                    <span className="font-mono text-[6.5px] uppercase tracking-[0.1em] text-muted">
                      Sources
                    </span>
                    <SlidersHorizontal className="h-2.5 w-2.5 text-muted" />
                  </div>
                  <div className="space-y-1 p-1.5">
                    {[
                      { icon: Layers, label: "Race Overlay", active: true },
                      { icon: Radio, label: "Standings", active: true },
                      { icon: MonitorPlay, label: "Lower third", active: true },
                      { icon: Tv, label: "Game capture", active: false },
                    ].map(({ icon: Icon, label, active }) => (
                      <div
                        key={label}
                        className={`flex items-center gap-1.5 rounded px-1.5 py-1.5 font-mono text-[6px] uppercase tracking-[0.04em] ${
                          active ? "bg-white/[0.045] text-[#d7e2d2]" : "text-muted/60"
                        }`}
                      >
                        <Icon className={`h-2.5 w-2.5 ${active ? "text-pulse" : "text-muted/60"}`} />
                        <span className="flex-1 truncate">{label}</span>
                        {active && <Eye className="h-2 w-2 text-muted" />}
                      </div>
                    ))}
                  </div>
                  <div className="mx-2.5 border-t border-white/[0.07]" />
                  <div className="space-y-2 p-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[5.5px] uppercase tracking-[0.08em] text-muted">
                        Race Overlay
                      </span>
                      <span className="font-mono text-[5px] text-pulse">on</span>
                    </div>
                    <div className="flex items-end gap-[2px]">
                      {[34, 52, 42, 68, 45, 25, 38, 62, 44, 53, 30, 55, 40, 48, 36].map((height, i) => (
                        <span
                          key={i}
                          className="w-full rounded-[1px] bg-pulse/45"
                          style={{ height: `${height * 0.35}px` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto border-t border-white/[0.07] p-2.5">
                    <div className="flex items-center gap-1.5 font-mono text-[5.5px] uppercase tracking-[0.06em] text-muted">
                      <Wifi className="h-2.5 w-2.5 text-pulse" /> local source
                    </div>
                    <p className="mt-1 font-mono text-[5px] leading-relaxed text-muted/60">
                      127.0.0.1:8472
                    </p>
                  </div>
                </aside>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-white/[0.08] bg-[#0c1110] px-3 py-2">
                <div className="flex items-center gap-3 font-mono text-[6.5px] uppercase tracking-[0.06em] text-muted">
                  <span className="flex items-center gap-1 text-[#b9c5b5]">
                    <Check className="h-2.5 w-2.5 text-pulse" /> browser source
                  </span>
                  <span className="hidden sm:inline">1920 × 1080</span>
                  <span className="hidden md:inline">30 fps</span>
                </div>
                <span className="flex items-center gap-1.5 font-mono text-[6.5px] uppercase tracking-[0.06em] text-muted">
                  <span className="h-1 w-1 rounded-full bg-pulse" /> no capture
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between px-1">
              <span className="font-mono text-[7px] uppercase tracking-[0.07em] text-muted/70">
                Preview de transmissão · dados simulados
              </span>
              <a
                href="#estudio"
                className="flex items-center gap-1 font-mono text-[7px] uppercase tracking-[0.07em] text-muted transition hover:text-pulse"
              >
                editar layout <ArrowUpRight className="h-2.5 w-2.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
