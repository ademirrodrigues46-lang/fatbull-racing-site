export type RGB = { r: number; g: number; b: number };

export function hexToRgb(hex: string): RGB {
  const value = hex.replace("#", "").trim();
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value.padEnd(6, "0").slice(0, 6);
  const int = Number.parseInt(full, 16);
  return { r: (int >> 16) & 255, g: (int >> 8) & 255, b: int & 255 };
}

export function rgbToHex({ r, g, b }: RGB) {
  const to = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

/** mix(a, b, t) → t = 0 retorna `a`, t = 1 retorna `b`. */
export function mix(a: string, b: string, t: number) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return rgbToHex({
    r: A.r + (B.r - A.r) * t,
    g: A.g + (B.g - A.g) * t,
    b: A.b + (B.b - A.b) * t,
  });
}

export function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function saturation(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === 0) return 0;
  return (max - min) / max;
}

export function contrastRatio(a: string, b: string) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** Texto legível sobre uma cor de fundo. */
export function readableOn(background: string, light: string, dark: string) {
  return contrastRatio(background, light) >= contrastRatio(background, dark) ? light : dark;
}

export function distance(a: string, b: string) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return Math.sqrt((A.r - B.r) ** 2 + (A.g - B.g) ** 2 + (A.b - B.b) ** 2);
}

export type BrandTokens = {
  accent: string;
  ember: string;
  ink: string;
  text: string;
};

export type ResolvedTheme = {
  accent: string;
  accentDeep: string;
  ink: string;
  inkSoft: string;
  panel: string;
  panelRaised: string;
  text: string;
  muted: string;
  line: string;
  ember: string;
};

/**
 * Deriva a paleta completa a partir da marca (accent) e da base (ink).
 * Toda a interface — site e overlay — lê estes tokens.
 */
export function resolveTheme({ accent, ember, ink, text }: BrandTokens): ResolvedTheme {
  const base = luminance(ink) > 0.5 ? mix(ink, "#000000", 0.02) : ink;
  const panel = mix(base, accent, 0.045);
  const panelRaised = mix(panel, text, 0.055);
  return {
    accent,
    accentDeep: mix(accent, base, 0.2),
    ink: base,
    inkSoft: mix(base, panel, 0.45),
    panel,
    panelRaised,
    text: mix(text, accent, 0.04),
    muted: mix(text, panel, 0.52),
    line: mix(panel, text, 0.13),
    ember: ember,
  };
}

export function themeToVars(theme: ResolvedTheme): Record<string, string> {
  return {
    "--color-pulse": theme.accent,
    "--color-pulse-deep": theme.accentDeep,
    "--color-ink": theme.ink,
    "--color-ink-soft": theme.inkSoft,
    "--color-panel": theme.panel,
    "--color-panel-raised": theme.panelRaised,
    "--color-fog": theme.text,
    "--color-muted": theme.muted,
    "--color-line": theme.line,
    "--color-ember": theme.ember,
  };
}

/**
 * Extrai uma paleta de uma imagem (o logo). Estratégia: reduz para uma grade
 * pequena, agrupa pixels em baldes de 32 níveis por canal, descarta cores
 * quase brancas/quase pretas para o destaque e escolhe a mais vibrante como
 * accent. As demais viram os swatches que o usuário pode promover.
 */
export function extractPalette(source: HTMLImageElement): {
  accent: string;
  swatches: string[];
  ink: string;
} {
  const size = 84;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { accent: "#C9F95A", swatches: [], ink: "#070A0A" };

  ctx.drawImage(source, 0, 0, size, size);
  let data: Uint8ClampedArray;
  try {
    data = ctx.getImageData(0, 0, size, size).data;
  } catch {
    return { accent: "#C9F95A", swatches: [], ink: "#070A0A" };
  }

  type Bucket = { r: number; g: number; b: number; count: number };
  const buckets = new Map<number, Bucket>();

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 128) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
    const found = buckets.get(key);
    if (found) {
      found.r += r;
      found.g += g;
      found.b += b;
      found.count += 1;
    } else {
      buckets.set(key, { r, g, b, count: 1 });
    }
  }

  const colors = [...buckets.values()]
    .map((bucket) => ({
      hex: rgbToHex({
        r: bucket.r / bucket.count,
        g: bucket.g / bucket.count,
        b: bucket.b / bucket.count,
      }),
      count: bucket.count,
    }))
    .sort((a, b) => b.count - a.count);

  if (colors.length === 0) return { accent: "#C9F95A", swatches: [], ink: "#070A0A" };

  const distinct: string[] = [];
  for (const item of colors) {
    if (distinct.every((existing) => distance(existing, item.hex) > 42)) {
      distinct.push(item.hex);
    }
    if (distinct.length >= 7) break;
  }

  const ink =
    [...distinct]
      .sort((a, b) => luminance(a) - luminance(b))
      .find((hex) => luminance(hex) < 0.14) ?? mix(colors[0].hex, "#000000", 0.82);

  const candidates = distinct.filter(
    (hex) => saturation(hex) > 0.22 && luminance(hex) > 0.12 && luminance(hex) < 0.92,
  );
  const scored = (candidates.length ? candidates : distinct).map((hex) => ({
    hex,
    score: saturation(hex) * 2.4 + Math.max(0, 1 - Math.abs(luminance(hex) - 0.62) * 2.2),
  }));
  scored.sort((a, b) => b.score - a.score);

  return { accent: scored[0]?.hex ?? "#C9F95A", swatches: distinct, ink };
}
