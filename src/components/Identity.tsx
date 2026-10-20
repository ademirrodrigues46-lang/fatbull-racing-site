import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Contrast,
  Download,
  Droplet,
  ImagePlus,
  Palette,
  RotateCcw,
  Sparkles,
  Type,
  Upload,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useBrand } from "@/lib/brand";
import { contrastRatio, extractPalette, readableOn } from "@/lib/color";
import { markLabels, packs, type MarkId } from "@/data/brand";
import { RacePreview } from "./OverlayPreview";
import { Brand, PulseMark } from "./Brand";

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("imagem inválida"));
    img.src = src;
  });

export function Identity({ onNotify }: { onNotify: (message: string) => void }) {
  const {
    config,
    theme,
    setName,
    setTagline,
    setMark,
    setImage,
    setAccent,
    setTokens,
    applyPack,
    reset,
  } = useBrand();
  const setInk = useCallback((ink: string) => setTokens({ ink }), [setTokens]);
  const [palette, setPalette] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ratio = useMemo(() => contrastRatio(theme.accent, theme.ink), [theme.accent, theme.ink]);
  const onAccent = useMemo(
    () => readableOn(theme.accent, theme.text, theme.ink),
    [theme.accent, theme.text, theme.ink],
  );

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(null), 1400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function handleFile(file?: File | null) {
    if (!file) return;
    if (!/image\/(png|jpeg|jpg|webp|svg\+xml|gif)/.test(file.type)) {
      onNotify("Formato não suportado. Use PNG, JPG, WEBP ou SVG.");
      return;
    }
    setBusy(true);
    try {
      const dataUrl = await fileToDataUrl(file);
      setImage(dataUrl);
      try {
        const img = await loadImage(dataUrl);
        const result = extractPalette(img);
        setPalette(result.swatches);
        if (result.swatches.length > 1) {
          setTokens({ accent: result.accent, ink: result.ink });
          onNotify("Paleta extraída do logo: destaque e base aplicados em todo o site e no overlay.");
        } else {
          onNotify("Logo aplicado. Não encontramos cores suficientes para extrair paleta.");
        }
      } catch {
        onNotify("Logo aplicado. A extração de cor não foi possível neste arquivo.");
      }
    } catch {
      onNotify("Não foi possível ler o arquivo.");
    } finally {
      setBusy(false);
    }
  }

  async function copyToken(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
    } catch {
      onNotify(`Copie manualmente: ${value}`);
    }
  }

  function exportBrand() {
    const payload = {
      name: config.name,
      tagline: config.tagline,
      mark: config.mark,
      tokens: config.tokens,
      resolved: theme,
      css: Object.entries(theme)
        .map(([key, value]) => `  --color-${kebab(key)}: ${value};`)
        .join("\n"),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${config.name.toLowerCase()}-brand.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    onNotify("Arquivo de marca exportado. Ele documenta a paleta para o app e para o site.");
  }

  const tokens: { label: string; key: keyof typeof theme; note: string }[] = [
    { label: "accent", key: "accent", note: "overlay, botões, destaques" },
    { label: "ember", key: "ember", note: "alertas e rivais próximos" },
    { label: "ink", key: "ink", note: "fundo do site e dos widgets" },
    { label: "panel", key: "panel", note: "superfícies e cartões" },
    { label: "text", key: "text", note: "tipografia principal" },
    { label: "muted", key: "muted", note: "rótulos e legendas" },
  ];

  return (
    <section
      id="identidade"
      className="relative overflow-hidden border-t border-white/[0.07] py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 grid-surface opacity-25" />
      <div className="page-shell relative">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow">Identidade</span>
            <h2 className="section-title mt-5 text-[2.15rem] sm:text-[2.8rem] lg:text-[3.1rem]">
              Sua logo, suas cores,
              <br />
              <span className="text-muted">em todo lugar.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[12px] leading-[1.8] text-muted lg:pb-1">
            Solte o arquivo do logo e a paleta é extraída dele. O site inteiro e os widgets do
            overlay assumem as cores na hora — nada de reimplementar tela.
          </p>
        </div>

        <div className="mt-9 grid gap-3 xl:grid-cols-[0.92fr_1.08fr]">
          {/* ---------- controles ---------- */}
          <div className="overflow-hidden rounded-xl border border-white/[0.09] bg-[#0b100f]">
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0d1210] px-4 py-2.5">
              <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-[#b6c2b2]">
                <Palette className="h-3 w-3" style={{ color: "var(--color-pulse)" }} />
                editor de marca
              </span>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setPalette([]);
                  onNotify("Marca restaurada para o padrão Pulse Lime.");
                }}
                className="flex items-center gap-1.5 rounded border border-white/10 px-2 py-1 font-mono text-[7px] uppercase tracking-[0.07em] text-muted transition hover:border-white/25 hover:text-fog"
              >
                <RotateCcw className="h-2.5 w-2.5" />
                padrão
              </button>
            </div>

            <div className="space-y-4 p-4 sm:p-5">
              <div>
                <span className="mono-label flex items-center gap-1.5">
                  <ImagePlus className="h-3 w-3" /> Logo
                </span>
                <div
                  onDragOver={(event) => {
                    event.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(event) => {
                    event.preventDefault();
                    setDragging(false);
                    void handleFile(event.dataTransfer.files?.[0]);
                  }}
                  className={cn(
                    "mt-2 flex items-center gap-3.5 rounded-lg border border-dashed p-3.5 transition",
                    dragging
                      ? "border-[color:var(--color-pulse)] bg-[color:color-mix(in_srgb,var(--color-pulse)_8%,transparent)]"
                      : "border-white/12 bg-white/[0.018]",
                  )}
                >
                  <div className="checker grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-md border border-white/10">
                    <PulseMark className="h-11 w-11 rounded-lg" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-[#dbe4d6]">
                      Arraste um PNG, SVG ou JPG aqui
                    </p>
                    <p className="mt-1 text-[9.5px] leading-relaxed text-muted">
                      {config.logoMode === "image"
                        ? "Sua imagem está ativa no site inteiro, inclusive no instalador simulado."
                        : "Sem arquivo? Escolha um símbolo vetorial abaixo."}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        disabled={busy}
                        className="flex items-center gap-1.5 rounded border border-white/12 bg-white/[0.03] px-2 py-1 font-mono text-[7px] uppercase tracking-[0.07em] text-[#cdd7c8] transition hover:border-white/25 disabled:opacity-60"
                      >
                        <Upload className="h-2.5 w-2.5" />
                        {busy ? "lendo…" : "escolher arquivo"}
                      </button>
                      {config.logoMode === "image" && (
                        <button
                          type="button"
                          onClick={() => {
                            setImage(null);
                            setPalette([]);
                          }}
                          className="font-mono text-[7px] uppercase tracking-[0.07em] text-muted underline-offset-2 transition hover:text-fog hover:underline"
                        >
                          remover imagem
                        </button>
                      )}
                      <input
                        ref={inputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/svg+xml,image/webp"
                        className="hidden"
                        onChange={(event) => void handleFile(event.target.files?.[0])}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="mono-label">Símbolo vetorial</span>
                <div className="mt-2 grid grid-cols-5 gap-1.5">
                  {(Object.keys(markLabels) as MarkId[]).map((mark) => (
                    <button
                      key={mark}
                      type="button"
                      onClick={() => setMark(mark)}
                      aria-pressed={config.mark === mark && config.logoMode === "mark"}
                      className={cn(
                        "group flex flex-col items-center gap-1.5 rounded border p-2 transition",
                        config.mark === mark && config.logoMode === "mark"
                          ? "border-[color:color-mix(in_srgb,var(--color-pulse)_45%,transparent)] bg-[color:color-mix(in_srgb,var(--color-pulse)_8%,transparent)]"
                          : "border-white/[0.08] hover:border-white/20",
                      )}
                    >
                      <PulseMark className="h-6 w-6" />
                      <span
                        className={cn(
                          "font-mono text-[6.5px] uppercase tracking-[0.06em]",
                          config.mark === mark && config.logoMode === "mark"
                            ? "text-[#dfe8da]"
                            : "text-muted",
                        )}
                      >
                        {markLabels[mark]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mono-label flex items-center gap-1.5">
                    <Type className="h-3 w-3" /> Nome
                  </span>
                  <input
                    value={config.name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-1.5 h-9 w-full rounded border border-white/10 bg-black/25 px-2.5 font-display text-[12px] font-semibold tracking-[-0.02em] text-fog outline-none transition focus:border-[color:color-mix(in_srgb,var(--color-pulse)_45%,transparent)]"
                  />
                </label>
                <label className="block">
                  <span className="mono-label">Assinatura</span>
                  <input
                    value={config.tagline}
                    onChange={(event) => setTagline(event.target.value)}
                    placeholder="ex.: Racing Tools"
                    className="mt-1.5 h-9 w-full rounded border border-white/10 bg-black/25 px-2.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[#c9d4c4] outline-none transition focus:border-[color:color-mix(in_srgb,var(--color-pulse)_45%,transparent)]"
                  />
                </label>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="mono-label">Paletas prontas</span>
                  <span className="font-mono text-[7px] uppercase tracking-[0.07em] text-muted/70">
                    {packs.length} combinações
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {packs.map((pack) => {
                    const active =
                      pack.tokens.accent.toUpperCase() === config.tokens.accent.toUpperCase();
                    return (
                      <button
                        key={pack.id}
                        type="button"
                        onClick={() => {
                          applyPack(pack.tokens, pack.mark);
                          setPalette([]);
                        }}
                        className={cn(
                          "rounded border p-2 text-left transition",
                          active
                            ? "border-white/25 bg-white/[0.05]"
                            : "border-white/[0.08] hover:border-white/20",
                        )}
                      >
                        <span className="flex items-center gap-1">
                          {[pack.tokens.accent, pack.tokens.ember, pack.tokens.ink].map((color) => (
                            <span
                              key={color}
                              className="h-3.5 flex-1 rounded-[2px]"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </span>
                        <span className="mt-1.5 block text-[9px] font-semibold text-[#dbe4d6]">
                          {pack.label}
                        </span>
                        <span className="block text-[7.5px] leading-tight text-muted">{pack.note}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {palette.length > 1 && (
                <div>
                  <div className="flex items-center justify-between">
                    <span className="mono-label flex items-center gap-1.5">
                      <Sparkles className="h-3 w-3" style={{ color: "var(--color-pulse)" }} />
                      Cores extraídas do seu logo
                    </span>
                    <span className="font-mono text-[7px] uppercase tracking-[0.07em] text-muted/70">
                      clique para aplicar
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {palette.map((color, index) => (
                      <button
                        key={`${color}-${index}`}
                        type="button"
                        onClick={() => {
                          setAccent(color);
                          onNotify(`Destaque aplicado: ${color.toUpperCase()}`);
                        }}
                        className="animate-swatch-in group relative h-9 w-14 overflow-hidden rounded border border-white/10 transition hover:border-white/40"
                        style={{ backgroundColor: color, animationDelay: `${index * 40}ms` }}
                        aria-label={`Aplicar ${color}`}
                      >
                        <span
                          className="absolute inset-x-0 bottom-0 px-1 py-0.5 text-center font-mono text-[5.5px] uppercase tracking-[0.04em]"
                          style={{ color: readableOn(color, "#ffffff", "#0b100f") }}
                        >
                          {color.replace("#", "")}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <ColorField
                  label="Destaque"
                  hint={config.tokens.accent}
                  value={config.tokens.accent}
                  onChange={setAccent}
                />
                <ColorField
                  label="Base"
                  hint={config.tokens.ink}
                  value={config.tokens.ink}
                  onChange={setInk}
                />
              </div>

              <div className="flex items-center justify-between gap-3 rounded border border-white/[0.08] bg-white/[0.02] px-3 py-2.5">
                <span className="flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.07em] text-muted">
                  <Contrast className="h-3 w-3" style={{ color: "var(--color-pulse)" }} />
                  contraste destaque × base
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[9px] font-medium text-[#dce5d7]">
                    {ratio.toFixed(2)}:1
                  </span>
                  <span
                    className={cn(
                      "rounded-sm border px-1.5 py-0.5 font-mono text-[6.5px] uppercase tracking-[0.07em]",
                      ratio >= 4.5
                        ? "border-[color:color-mix(in_srgb,var(--color-pulse)_40%,transparent)] text-[color:var(--color-pulse)]"
                        : "border-[#ff8a67]/40 text-[#ffab8e]",
                    )}
                  >
                    {ratio >= 7 ? "excelente" : ratio >= 4.5 ? "legível" : "só para número grande"}
                  </span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.07] pt-3">
                <button
                  type="button"
                  onClick={exportBrand}
                  className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded text-[10px] font-extrabold transition"
                  style={{ backgroundColor: "var(--color-pulse)", color: "var(--color-ink)" }}
                >
                  <Download className="h-3.5 w-3.5" />
                  Exportar brand.json
                </button>
                <button
                  type="button"
                  onClick={() =>
                    copyToken(
                      "css",
                      `:root {\n  --color-pulse: ${theme.accent};\n  --color-ink: ${theme.ink};\n  --color-ember: ${theme.ember};\n}`,
                    )
                  }
                  className="flex h-9 items-center justify-center gap-1.5 rounded border border-white/12 px-3 font-mono text-[8px] uppercase tracking-[0.07em] text-[#cdd7c8] transition hover:border-white/25"
                >
                  {copied === "css" ? <Check className="h-3 w-3" /> : null}
                  {copied === "css" ? "copiado" : "copiar :root"}
                </button>
              </div>
            </div>
          </div>

          {/* ---------- tabuleiro ao vivo ---------- */}
          <div className="flex flex-col gap-3">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  label: "sobre a base",
                  bg: "var(--color-ink)",
                  fg: "var(--color-fog)",
                  tagline: "var(--color-muted)",
                  mark: "solid" as const,
                },
                {
                  label: "sobre o destaque",
                  bg: "var(--color-pulse)",
                  fg: onAccent,
                  tagline: onAccent,
                  mark: "knockout" as const,
                },
                {
                  label: "sobre a pista",
                  bg:
                    "radial-gradient(circle at 28% 18%, rgba(255,255,255,.18), transparent 46%), linear-gradient(150deg, #1c2624, #060908 72%)",
                  fg: "#f4f7f0",
                  tagline: "rgba(244,247,240,.62)",
                  mark: "solid" as const,
                },
              ].map((board) => (
                <div
                  key={board.label}
                  className="relative flex min-h-[108px] items-center justify-center overflow-hidden rounded-lg border border-white/[0.09] p-3"
                  style={{ background: board.bg }}
                >
                  <Brand
                    size="sm"
                    color={board.fg}
                    taglineColor={board.tagline}
                    markVariant={board.mark}
                  />
                  <span
                    className="absolute bottom-2 right-2.5 font-mono text-[6px] uppercase tracking-[0.08em]"
                    style={{ color: board.tagline }}
                  >
                    {board.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-xl border border-white/[0.09] bg-[#0b100f]">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-2.5">
                <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#b6c2b2]">
                  overlay com a sua marca
                </span>
                <span className="font-mono text-[7px] uppercase tracking-[0.07em] text-muted">
                  tempo real
                </span>
              </div>
              <div className="p-3 sm:p-4">
                <RacePreview className="rounded-lg border border-white/[0.07]" />
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/[0.09] bg-[#0b100f]">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-2.5">
                <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#b6c2b2]">
                  tokens aplicados
                </span>
                <span className="font-mono text-[7px] uppercase tracking-[0.07em] text-muted">
                  var(--color-*)
                </span>
              </div>
              <div className="divide-y divide-white/[0.05]">
                {tokens.map((token) => {
                  const value = theme[token.key];
                  return (
                    <button
                      key={token.key}
                      type="button"
                      onClick={() => void copyToken(token.key, value)}
                      className="group flex w-full items-center gap-3 px-4 py-2 text-left transition hover:bg-white/[0.025]"
                    >
                      <span
                        className="h-5 w-5 shrink-0 rounded-[3px] border border-white/15"
                        style={{ backgroundColor: value }}
                      />
                      <span className="w-24 shrink-0 font-mono text-[8px] text-[#c9d4c4]">
                        --color-{kebab(token.key)}
                      </span>
                      <span className="min-w-0 flex-1 truncate font-mono text-[8px] uppercase text-muted">
                        {value}
                      </span>
                      <span className="hidden shrink-0 text-right font-mono text-[6.5px] uppercase tracking-[0.06em] text-muted/60 sm:block">
                        {copied === token.key ? "copiado ✓" : token.note}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="border-t border-white/[0.08] px-4 py-2.5 font-mono text-[7px] uppercase leading-relaxed tracking-[0.06em] text-muted/70">
                os mesmos tokens alimentam o app: copie o bloco <code>:root</code> para o tema do
                overlay no repo do RacePulse.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function kebab(key: string) {
  return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function ColorField({
  label,
  value,
  hint,
  onChange,
}: {
  label: string;
  value: string;
  hint: string;
  onChange: (hex: string) => void;
  icon?: boolean;
}) {
  return (
    <label className="flex items-center gap-2.5 rounded border border-white/[0.08] bg-white/[0.018] px-2.5 py-2">
      <input
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-7 w-7 shrink-0 rounded"
        aria-label={`Cor ${label}`}
      />
      <span className="min-w-0 flex-1">
        <span className="mono-label block">{label}</span>
        <span className="mt-0.5 block font-mono text-[9px] uppercase text-[#d3ddce]">{hint}</span>
      </span>
      <Droplet className="h-3 w-3 shrink-0 text-muted" />
    </label>
  );
}
