import { useMemo, useState } from "react";
import {
  Check,
  Copy,
  Eye,
  Monitor,
  RotateCcw,
  Save,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useBrand } from "@/lib/brand";
import { mix } from "@/lib/color";
import {
  PreviewFrame,
  defaultOverlayConfig,
  widgetLabels,
  type OverlayConfig,
  type WidgetKey,
} from "./OverlayPreview";

type PresetKey = "broadcast" | "endurance" | "sprint";

const presets: Record<
  PresetKey,
  { label: string; description: string; widgets: Record<WidgetKey, boolean> }
> = {
  broadcast: {
    label: "Broadcast",
    description: "Timing limpo para a live",
    widgets: {
      standings: true,
      relative: true,
      fuel: false,
      delta: false,
      radar: false,
      map: true,
    },
  },
  endurance: {
    label: "Endurance",
    description: "Tudo à mão na longa",
    widgets: {
      standings: true,
      relative: true,
      fuel: true,
      delta: true,
      radar: true,
      map: true,
    },
  },
  sprint: {
    label: "Sprint",
    description: "Só o que decide a volta",
    widgets: {
      standings: true,
      relative: true,
      fuel: false,
      delta: true,
      radar: true,
      map: false,
    },
  },
};



const initialConfig: OverlayConfig = {
  ...defaultOverlayConfig,
  widgets: presets.endurance.widgets,
};

export function Studio({
  onNotify,
  onDownload,
}: {
  onNotify: (message: string) => void;
  onDownload: () => void;
}) {
  const [config, setConfig] = useState<OverlayConfig>(initialConfig);
  const [activePreset, setActivePreset] = useState<PresetKey | "custom">("endurance");
  const [saved, setSaved] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  const { theme } = useBrand();
  const softAccent = useMemo(() => mix(theme.accent, theme.text, 0.42), [theme.accent, theme.text]);
  const accents = useMemo(
    () => [
      { label: "Marca", value: "", swatch: theme.accent },
      { label: "Ember", value: theme.ember, swatch: theme.ember },
      { label: "Suave", value: softAccent, swatch: softAccent },
      { label: "Chalk", value: theme.text, swatch: theme.text },
    ],
    [theme.accent, theme.ember, theme.text, softAccent],
  );
  const activeAccentLabel =
    accents.find((item) => item.value === config.accent)?.label ?? "Personalizada";
  const activeAccentHex = (config.accent || theme.accent).toUpperCase();

  const activeCount = useMemo(
    () => Object.values(config.widgets).filter(Boolean).length,
    [config.widgets],
  );

  function update(patch: Partial<OverlayConfig>) {
    setConfig((prev) => ({ ...prev, ...patch }));
    setActivePreset("custom");
    setSaved(false);
  }

  function toggleWidget(key: WidgetKey) {
    update({
      widgets: { ...config.widgets, [key]: !config.widgets[key] },
    });
  }

  function applyPreset(key: PresetKey) {
    setConfig((prev) => ({ ...prev, widgets: presets[key].widgets }));
    setActivePreset(key);
    setSaved(false);
  }

  function reset() {
    setConfig(initialConfig);
    setActivePreset("endurance");
    setSaved(true);
    onNotify("Configuração restaurada para o preset Endurance.");
  }

  function save() {
    setSaved(true);
    onNotify("Preset salvo. A configuração já está ativa no seu overlay.");
  }

  async function copyBrowserSource() {
    try {
      await navigator.clipboard.writeText("http://127.0.0.1:8472/overlay/racepulse");
      onNotify("Link do Browser Source copiado para a área de transferência.");
    } catch {
      onNotify("Seu navegador bloqueou a cópia. Link: 127.0.0.1:8472/overlay");
    }
  }

  return (
    <section id="estudio" className="relative overflow-hidden border-y border-white/[0.07] bg-[#090d0c]">
      <div className="pointer-events-none absolute inset-0 dot-surface opacity-[0.35]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-pulse/[0.04] blur-[100px]" />

      <div className="page-shell relative py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow">RacePulse Studio</span>
            <h2 className="section-title mt-5 text-[2.15rem] sm:text-[2.75rem] lg:text-[3.2rem]">
              Monte seu cockpit digital.
              <br />
              <span className="text-muted">Sem sair da pista.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[13px] leading-relaxed text-muted lg:pb-1">
            Ative os widgets, ajuste a escala, a opacidade e a cor de destaque. O resultado aparece
            aqui e fica pronto para o iRacing e para o OBS.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-xl border border-white/[0.1] bg-[#0b100f] shadow-[0_30px_100px_-30px_rgba(0,0,0,0.8)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#0e1311] px-3 py-2.5 sm:px-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-5 w-5 place-items-center rounded bg-pulse text-ink">
                <SlidersHorizontal className="h-3 w-3" />
              </span>
              <span className="font-display text-[11px] font-semibold tracking-[-0.02em] text-[#eef3e7]">
                RacePulse Studio
              </span>
              <span className="hidden h-3 w-px bg-white/15 sm:block" />
              <span className="hidden font-mono text-[8px] uppercase tracking-[0.1em] text-muted sm:inline">
                Overlay editor / Practice 03
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyBrowserSource}
                className="hidden items-center gap-1.5 rounded border border-white/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-muted transition hover:border-white/20 hover:text-fog sm:flex"
              >
                <Copy className="h-2.5 w-2.5" /> Browser source
              </button>
              <span className="flex items-center gap-1.5 rounded-full border border-pulse/20 bg-pulse/[0.06] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-pulse">
                <span className="h-1 w-1 rounded-full bg-pulse animate-soft-pulse" />
                sincronizado
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(330px,0.75fr)]">
            <div className="relative min-w-0 border-b border-white/[0.08] lg:border-b-0 lg:border-r">
              <div
                className={cn(
                  "absolute inset-0 transition-opacity",
                  showGrid ? "grid-surface opacity-30" : "opacity-0",
                )}
              />
              <div className="relative flex flex-col gap-4 p-3 sm:p-5 lg:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                      Preview ao vivo
                    </span>
                    <span className="hidden rounded-sm bg-white/[0.06] px-1.5 py-0.5 font-mono text-[7px] text-[#a7b2a6] sm:inline">
                      1.280 × 720
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowGrid((value) => !value)}
                    className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-muted transition hover:text-fog"
                  >
                    <Eye className="h-2.5 w-2.5" />
                    {showGrid ? "grade on" : "grade off"}
                  </button>
                </div>

                <PreviewFrame config={config} studio footer={false} />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
                    <Monitor className="h-2.5 w-2.5 text-pulse" />
                    Janela sem borda · 60 FPS · 12 ms
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-[#b4c0b2]">
                    {activeCount} de 6 widgets ativos
                    <span className="h-1 w-1 rounded-full bg-pulse" />
                  </span>
                </div>
              </div>
            </div>

            <aside className="flex min-w-0 flex-col bg-[#0b100f]">
              <div className="border-b border-white/[0.08] px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="mono-label">Predefinições</span>
                  {activePreset === "custom" && (
                    <span className="rounded-sm border border-white/10 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-wider text-muted">
                      personalizado
                    </span>
                  )}
                </div>
                <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                  {(Object.keys(presets) as PresetKey[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => applyPreset(key)}
                      className={cn(
                        "group rounded border p-2 text-left transition",
                        activePreset === key
                          ? "border-pulse/35 bg-pulse/[0.08]"
                          : "border-white/[0.08] bg-white/[0.018] hover:border-white/20",
                      )}
                      aria-pressed={activePreset === key}
                    >
                      <span className="mb-2 flex h-4 items-end gap-[3px]">
                        <span
                          className={cn(
                            "h-1.5 w-3 rounded-[1px]",
                            activePreset === key ? "bg-pulse" : "bg-white/25",
                          )}
                        />
                        <span
                          className={cn(
                            "h-2.5 w-2 rounded-[1px]",
                            activePreset === key ? "bg-pulse/70" : "bg-white/15",
                          )}
                        />
                        {key !== "broadcast" && (
                          <span
                            className={cn(
                              "h-3 w-1.5 rounded-[1px]",
                              activePreset === key ? "bg-pulse/45" : "bg-white/10",
                            )}
                          />
                        )}
                      </span>
                      <span
                        className={cn(
                          "block text-[10px] font-semibold leading-none",
                          activePreset === key ? "text-fog" : "text-[#b1bcb0]",
                        )}
                      >
                        {presets[key].label}
                      </span>
                      <span className="mt-1 block text-[8px] leading-tight text-muted">
                        {presets[key].description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-b border-white/[0.08] p-4">
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="mono-label">Widgets ativos</span>
                  <Sparkles className="h-3 w-3 text-pulse/70" />
                </div>
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
                  {widgetLabels.map(({ key, label, short }) => (
                    <WidgetRow
                      key={key}
                      label={label}
                      short={short}
                      checked={config.widgets[key]}
                      onChange={() => toggleWidget(key)}
                    />
                  ))}
                </div>
              </div>

              <div className="border-b border-white/[0.08] p-4">
                <div className="flex items-center justify-between">
                  <span className="mono-label">Cor de destaque</span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.08em] text-[#cfd8c9]">
                    {activeAccentLabel}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center gap-2">
                  {accents.map((accent) => (
                    <button
                      key={accent.label}
                      type="button"
                      onClick={() => update({ accent: accent.value })}
                      aria-label={`Usar cor ${accent.label}`}
                      aria-pressed={config.accent === accent.value}
                      className={cn(
                        "relative grid h-7 w-7 place-items-center rounded-full border transition",
                        config.accent === accent.value
                          ? "border-white/60"
                          : "border-transparent hover:border-white/25",
                      )}
                    >
                      <span
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: accent.swatch }}
                      />
                      {config.accent === accent.value && (
                        <Check className="absolute h-3 w-3 text-ink" strokeWidth={3} />
                      )}
                    </button>
                  ))}
                  <span className="ml-1 font-mono text-[8px] uppercase text-muted">
                    {activeAccentHex}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center justify-between border-t border-white/[0.06] pt-2">
                  <span className="font-mono text-[7px] uppercase leading-relaxed tracking-[0.06em] text-muted/75">
                    “Marca” acompanha a identidade do site
                  </span>
                  <a
                    href="#identidade"
                    className="shrink-0 font-mono text-[7px] uppercase tracking-[0.06em] transition hover:text-pulse"
                    style={{ color: "var(--color-pulse)" }}
                  >
                    editar marca
                  </a>
                </div>
              </div>

              <div className="space-y-3.5 p-4">
                <RangeControl
                  label="Escala do overlay"
                  value={config.scale}
                  min={0.78}
                  max={1.16}
                  step={0.01}
                  display={`${Math.round(config.scale * 100)}%`}
                  onChange={(value) => update({ scale: value })}
                />
                <RangeControl
                  label="Opacidade"
                  value={config.opacity}
                  min={0.45}
                  max={1}
                  step={0.01}
                  display={`${Math.round(config.opacity * 100)}%`}
                  onChange={(value) => update({ opacity: value })}
                />
              </div>

              <div className="mt-auto flex items-center gap-2 border-t border-white/[0.08] bg-[#0d1311] p-3">
                <button
                  type="button"
                  onClick={reset}
                  className="flex h-9 items-center justify-center gap-1.5 rounded border border-white/10 px-2.5 font-mono text-[8px] uppercase tracking-[0.08em] text-muted transition hover:border-white/20 hover:text-fog"
                >
                  <RotateCcw className="h-3 w-3" />
                  Restaurar
                </button>
                <button
                  type="button"
                  onClick={save}
                  className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded bg-pulse px-3 font-sans text-[10px] font-extrabold text-ink transition hover:bg-[#d8ff7d]"
                >
                  {saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
                  {saved ? "Preset salvo" : "Salvar configuração"}
                </button>
                <button
                  type="button"
                  onClick={onDownload}
                  title="Baixar RacePulse"
                  className="grid h-9 w-9 place-items-center rounded border border-pulse/25 bg-pulse/10 text-pulse transition hover:bg-pulse/20"
                  aria-label="Baixar RacePulse"
                >
                  <Monitor className="h-3.5 w-3.5" />
                </button>
              </div>
            </aside>
          </div>
        </div>

        <p className="mt-3 font-mono text-[8px] uppercase leading-relaxed tracking-[0.1em] text-muted/70">
          Demonstração interativa · As alterações são aplicadas ao preview em tempo real
        </p>
      </div>
    </section>
  );
}

function WidgetRow({
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
      className="group flex items-center gap-2 rounded border border-transparent px-1 py-1 text-left transition hover:bg-white/[0.03]"
    >
      <span
        className={cn(
          "grid h-5 w-7 shrink-0 place-items-center rounded-sm font-mono text-[7px] font-semibold tracking-wide transition",
          checked ? "bg-pulse/15 text-pulse" : "bg-white/[0.05] text-white/25",
        )}
      >
        {short}
      </span>
      <span
        className={cn(
          "flex-1 text-[10px] font-medium transition",
          checked ? "text-[#dbe4d5]" : "text-muted/70",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "relative h-3.5 w-6 shrink-0 rounded-full border transition",
          checked ? "border-pulse bg-pulse" : "border-white/15 bg-[#151c19]",
        )}
      >
        <span
          className={cn(
            "absolute top-[2px] h-2 w-2 rounded-full transition-all",
            checked ? "left-[12px] bg-ink" : "left-[2px] bg-white/40",
          )}
        />
      </span>
    </button>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}) {
  const percentage = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between">
        <span className="font-sans text-[10px] font-medium text-[#b7c2b4]">{label}</span>
        <span className="rounded-sm bg-white/[0.05] px-1.5 py-0.5 font-mono text-[8px] tabular-nums text-[#dde5d7]">
          {display}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="rp-range"
        style={{ "--range-progress": `${percentage}%` } as React.CSSProperties}
      />
    </label>
  );
}
