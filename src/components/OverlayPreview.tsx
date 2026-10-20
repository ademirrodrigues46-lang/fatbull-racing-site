import { useState, type CSSProperties, type ReactNode } from "react";
import {
  ChevronDown,
  Circle,
  Gauge,
  LayoutGrid,
  Radio,
  Settings2,
  Signal,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/utils/cn";
import cockpitNight from "@/assets/cockpit-night.jpg";
import { PulseMark } from "./Brand";

export type WidgetKey = "standings" | "relative" | "fuel" | "delta" | "radar" | "map";

export type OverlayConfig = {
  widgets: Record<WidgetKey, boolean>;
  accent: string;
  opacity: number;
  scale: number;
};

export const widgetLabels: { key: WidgetKey; label: string; short: string }[] = [
  { key: "standings", label: "Standings V2", short: "STD" },
  { key: "relative", label: "Relativo + relógio", short: "REL" },
  { key: "fuel", label: "Estratégia de combustível", short: "FUEL" },
  { key: "delta", label: "Delta e RPM", short: "DLT" },
  { key: "radar", label: "Radar de proximidade", short: "RDR" },
  { key: "map", label: "Mapa da pista", short: "MAP" },
];

export const defaultOverlayConfig: OverlayConfig = {
  widgets: {
    standings: true,
    relative: true,
    fuel: true,
    delta: true,
    radar: true,
    map: true,
  },
  /** "" = segue a cor da marca (var --color-pulse definido pelo BrandProvider). */
  accent: "",
  opacity: 1,
  scale: 1,
};

const standings = [
  { pos: "1", car: "#7", driver: "M. Rodrigues", gap: "12 L", fastest: false },
  { pos: "2", car: "#24", driver: "T. Voss", gap: "+1.284", fastest: false },
  { pos: "3", car: "#11", driver: "J. Park", gap: "+4.801", fastest: true, you: true },
  { pos: "4", car: "#3", driver: "A. Silva", gap: "+7.392", fastest: false },
  { pos: "5", car: "#52", driver: "L. Moreno", gap: "+11.830", fastest: false },
  { pos: "6", car: "#8", driver: "K. Jensen", gap: "+14.246", fastest: false },
];

const relatives = [
  { car: "#24", driver: "T. Voss", gap: "+1.124", tone: "#ff9473" },
  { car: "#11", driver: "J. Park", gap: "0.000", tone: "var(--accent)", you: true },
  { car: "#3", driver: "A. Silva", gap: "-0.882", tone: "#f2f5ec" },
  { car: "#52", driver: "L. Moreno", gap: "-1.406", tone: "#f2f5ec" },
];

export function RacePreview({
  config = defaultOverlayConfig,
  className,
}: {
  config?: OverlayConfig;
  className?: string;
}) {
  const style = config.accent
    ? ({ "--accent": config.accent } as CSSProperties)
    : undefined;

  return (
    <div className={cn("race-preview", className)} style={style}>
      <img
        src={cockpitNight}
        alt="Visão do cockpit em uma pista noturna"
        className="race-preview__scene"
        loading="eager"
      />
      <div className="race-preview__shade" />
      <div className="race-preview__scan" />

      <div className="race-preview__footer">
        <span>RP // SESSION_04</span>
        <span className="hidden items-center gap-1.5 sm:flex">
          <span className="inline-block h-1 w-1 rounded-full bg-[color:var(--accent)] shadow-[0_0_6px_var(--accent)]" />
          OVERLAY ON
        </span>
      </div>

      <div className="race-preview__meta">
        <span className="race-preview__meta-dot" />
        <span style={{ color: "var(--accent)" }}>LIVE</span>
        <span className="text-white/35">/</span>
        <span>OKAYAMA · GT3</span>
        <span className="text-white/35">/</span>
        <span>19:42</span>
        <span className="hidden text-white/35 sm:inline">/</span>
        <span className="hidden sm:inline">28.4°C</span>
      </div>

      <div
        className="absolute inset-0 origin-center transition-all duration-300"
        style={{ opacity: config.opacity, transform: `scale(${config.scale})` }}
      >
        {config.widgets.standings && (
          <div className="race-widget race-widget--standings">
            <div className="race-widget__bar" />
            <div className="race-widget__heading">
              <span>
                <strong>STANDINGS</strong> <span className="opacity-50">V2</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-[color:var(--accent)]" />
                L12/24
              </span>
            </div>
            <div className="race-widget__body">
              {standings.map((row) => (
                <div
                  key={row.car}
                  className={cn("race-row", row.you && "race-row--you", row.fastest && "race-row--fastest")}
                >
                  <span className="race-row__pos">{row.pos}</span>
                  <span className="race-row__name">
                    <span className="opacity-50">{row.car}</span> {row.driver}
                  </span>
                  <span className="race-row__gap">{row.gap}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {config.widgets.relative && (
          <div className="race-widget race-widget--relative">
            <div className="race-widget__bar" />
            <div className="race-widget__heading">
              <span>
                <strong>RELATIVE</strong>
              </span>
              <span className="tabular-nums text-[#dbe3d7]">00:53:18</span>
            </div>
            <div className="race-widget__body">
              {relatives.map((row) => (
                <div key={row.car} className={cn("race-row", row.you && "race-row--you")}>
                  <span className="race-row__pos" style={{ color: row.tone }}>
                    {row.you ? "•" : row.car}
                  </span>
                  <span className="race-row__name">
                    {row.you ? "YOU" : row.driver}
                  </span>
                  <span className="race-row__gap" style={{ color: row.tone }}>
                    {row.gap}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {config.widgets.map && (
          <div className="race-widget race-widget--map">
            <div className="race-widget__bar" />
            <div className="race-widget__heading">
              <span>
                <strong>TRACK MAP</strong>
              </span>
              <span>INTERLAGOS / 4.30 KM</span>
            </div>
            <div className="race-widget__body">
              <div className="race-map__plot">
                <svg className="race-map__svg" viewBox="0 0 200 100" aria-hidden="true">
                  <path
                    d="M20 78C12 58 34 44 52 50s18-18 6-26-29-6-28-13 64-5 88 4 24 25 10 35-4 24 17 17 37 3 31 19-29 12-46 4-32 4-56 2-36 2-48-14Z"
                    fill="rgba(5,8,7,.58)"
                    stroke="#3b4640"
                    strokeWidth="8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 78C12 58 34 44 52 50s18-18 6-26-29-6-28-13 64-5 88 4 24 25 10 35-4 24 17 17 37 3 31 19-29 12-46 4-32 4-56 2-36 2-48-14Z"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    strokeDasharray="26 13 9 32"
                  />
                  <circle cx="93" cy="39" r="3.4" fill="var(--accent)" stroke="#07100a" strokeWidth="1.6" />
                  <circle cx="139" cy="78" r="2.3" fill="#c38bff" />
                  <circle cx="51" cy="58" r="2.3" fill="#ff8a67" />
                  <path d="M52 51v-9" stroke="#e7ecdf" strokeWidth="1.2" />
                  <path d="M38 15h9v9h-9z" fill="#f2f5ec" opacity=".8" />
                  <text x="50" y="22" fill="#8b968d" fontSize="6.5" fontFamily="JetBrains Mono">
                    S/F
                  </text>
                </svg>
              </div>
              <div className="race-map__legend">
                <span>
                  <i className="race-map__dot" /> Você
                </span>
                <span>
                  <i className="race-map__dot race-map__dot--purple" /> Melhor volta
                </span>
              </div>
            </div>
          </div>
        )}

        {config.widgets.radar && (
          <div className="race-widget race-widget--radar">
            <div className="race-widget__bar" />
            <div className="race-widget__heading">
              <strong>PROX</strong>
              <span>0.4s</span>
            </div>
            <div className="race-widget__body flex justify-center px-1 pb-1">
              <div className="race-radar">
                <div className="race-radar__arc" />
                <div className="race-radar__you" />
                <span className="race-radar__car" style={{ top: "23%", left: "62%" }} />
                <span className="race-radar__car" style={{ bottom: "24%", left: "20%", opacity: 0.6 }} />
              </div>
            </div>
          </div>
        )}

        {config.widgets.delta && (
          <div className="race-widget race-widget--delta">
            <div className="race-widget__bar" />
            <div className="race-widget__heading">
              <span>
                <strong>DELTA</strong>
              </span>
              <span>LIVE · LAP 12</span>
            </div>
            <div className="race-widget__body race-widget__body--delta">
              <div className="race-delta__value">
                −0.284 <small>s</small>
              </div>
              <div className="race-delta__track">
                <span />
              </div>
              <div className="race-delta__meta">
                <span>
                  <strong>246</strong> km/h
                </span>
                <span>
                  <strong>5</strong>ª marcha
                </span>
                <span style={{ color: "var(--accent)" }}>▲ 0.12</span>
              </div>
            </div>
          </div>
        )}

        {config.widgets.fuel && (
          <div className="race-widget race-widget--fuel">
            <div className="race-widget__bar" />
            <div className="race-widget__heading">
              <span>
                <strong>FUEL PLAN</strong>
              </span>
              <span>DRY · MIX 6</span>
            </div>
            <div className="race-widget__body race-widget__body--fuel">
              <div className="fuel-top">
                <div>
                  <div className="fuel-value">36.8</div>
                  <div className="fuel-unit">LITROS RESTANTES</div>
                </div>
                <div className="text-right text-[0.32rem] leading-tight text-[#bac4b8]">
                  <div className="font-display text-[clamp(0.55rem,2.7cqw,0.9rem)] font-semibold text-white">
                    +1.6L
                  </div>
                  <div>PARA O FIM</div>
                </div>
              </div>
              <div className="fuel-bar">
                <span />
              </div>
              <div className="fuel-stats">
                <span>
                  <strong>4.2</strong> voltas
                </span>
                <span>
                  <strong>2.4</strong> L/v
                </span>
                <span style={{ color: "var(--accent)" }}>
                  PIT <strong>L14</strong>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PreviewFrame({
  config,
  className,
  studio = false,
  footer = true,
}: {
  config?: OverlayConfig;
  className?: string;
  studio?: boolean;
  footer?: boolean;
}) {
  const [sessionOpen, setSessionOpen] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/12 bg-[#090d0c] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95)]",
        className,
      )}
    >
      <div className="flex h-10 items-center justify-between gap-2 border-b border-white/[0.08] bg-[#0d1210] px-3 sm:h-11 sm:px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <PulseMark className="h-4 w-4 rounded-[4px] sm:h-[18px] sm:w-[18px]" />
          <span className="font-display text-[10px] font-semibold tracking-[-0.02em] text-[#e6ebdf] sm:text-[11px]">
            RacePulse
          </span>
          <span className="hidden rounded-[3px] border border-white/10 px-1.5 py-0.5 font-mono text-[7px] tracking-[0.08em] text-muted sm:inline">
            2.4.1
          </span>
          <span className="hidden h-3.5 w-px bg-white/10 sm:block" />
          <button
            type="button"
            onClick={() => setSessionOpen((v) => !v)}
            className="hidden items-center gap-1 font-mono text-[8px] uppercase tracking-[0.08em] text-muted transition hover:text-[#dce4d7] sm:flex"
            aria-expanded={sessionOpen}
          >
            {studio ? "Estúdio / Sessão 04" : "Sessão / Okayama"}
            <ChevronDown className="h-2.5 w-2.5" />
          </button>
          {sessionOpen && (
            <span className="absolute left-28 top-9 z-20 rounded border border-white/10 bg-[#141b18] px-2.5 py-2 font-mono text-[8px] text-muted shadow-xl">
              Practice 03 · GT3 · 24 voltas
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.08em] text-[#98a296] sm:flex">
            <Signal className="h-2.5 w-2.5 text-pulse" />
            iRacing
          </span>
          <span className="items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.08em] text-[#98a296] sm:flex">
            <span className="h-1 w-1 rounded-full bg-pulse shadow-[0_0_6px_#c9f95a]" />
            Live
          </span>
          <div className="flex items-center gap-2 pl-2">
            <span className="h-px w-2.5 bg-white/35" />
            <span className="h-2.5 w-2.5 border border-white/35" />
            <span className="relative block h-2.5 w-2.5 before:absolute before:left-[5px] before:top-0 before:h-2.5 before:w-px before:rotate-45 before:bg-white/35" />
          </div>
        </div>
      </div>

      <div className="relative">
        <RacePreview config={config} />
        <div className="absolute left-2.5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-1.5 lg:flex">
          {[LayoutGrid, Gauge, SlidersHorizontal, Settings2].map((Icon, i) => (
            <button
              key={i}
              type="button"
              aria-label={["Overlays", "Telemetria", "Aparência", "Configurações"][i]}
              className={cn(
                "grid h-6 w-6 place-items-center rounded border transition",
                i === 0
                  ? "border-pulse/30 bg-pulse/15 text-pulse"
                  : "border-white/10 bg-black/25 text-white/35 hover:text-white/70",
              )}
            >
              <Icon className="h-3 w-3" />
            </button>
          ))}
        </div>
      </div>

      {footer && (
        <div className="flex h-8 items-center justify-between gap-2 border-t border-white/[0.08] bg-[#0c1110] px-3 sm:h-9 sm:px-4">
          <div className="flex items-center gap-3 font-mono text-[7px] uppercase tracking-[0.08em] text-muted">
            <span className="flex items-center gap-1 text-[#ccd5c8]">
              <LayoutGrid className="h-2.5 w-2.5 text-pulse" /> Overlays
            </span>
            <span className="hidden items-center gap-1 sm:flex">
              <Gauge className="h-2.5 w-2.5" /> Telemetria
            </span>
            <span className="hidden items-center gap-1 md:flex">
              <Settings2 className="h-2.5 w-2.5" /> Ajustes
            </span>
          </div>
          <div className="flex items-center gap-2.5 font-mono text-[7px] uppercase tracking-[0.08em] text-muted">
            <span className="hidden sm:inline">60 FPS</span>
            <span className="hidden h-2 w-px bg-white/15 sm:block" />
            <span className="flex items-center gap-1 text-[#cbd5c7]">
              <Radio className="h-2.5 w-2.5 text-pulse" /> Telemetria ativa
            </span>
            <Circle className="h-1.5 w-1.5 fill-pulse text-pulse" />
          </div>
        </div>
      )}
    </div>
  );
}

export function WidgetToggle({
  label,
  short,
  checked,
  onChange,
}: {
  label: string;
  short: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={cn(
        "group flex w-full items-center gap-2.5 rounded-md border px-2.5 py-2 text-left transition sm:px-3",
        checked
          ? "border-pulse/25 bg-pulse/[0.07]"
          : "border-white/[0.07] bg-white/[0.018] hover:border-white/15",
      )}
    >
      <span
        className={cn(
          "grid h-6 w-6 shrink-0 place-items-center rounded font-mono text-[7px] font-semibold tracking-wide transition",
          checked ? "bg-pulse text-ink" : "bg-white/[0.06] text-muted",
        )}
      >
        {short}
      </span>
      <span className={cn("flex-1 text-[11px] font-medium", checked ? "text-[#e5ebdf]" : "text-muted")}>
        {label}
      </span>
      <span
        className={cn(
          "relative h-3.5 w-6 rounded-full transition-colors",
          checked ? "bg-pulse" : "bg-white/15",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-2.5 w-2.5 rounded-full bg-ink transition-all",
            checked ? "left-3" : "left-0.5",
          )}
        />
      </span>
    </button>
  );
}

export function PreviewNote({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 font-mono text-[8px] uppercase leading-relaxed tracking-[0.08em] text-muted">
      {children}
    </p>
  );
}
