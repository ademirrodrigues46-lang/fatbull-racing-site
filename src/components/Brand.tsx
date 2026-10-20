import type { ReactNode, SVGProps } from "react";
import { defaultBrand, type MarkId } from "@/data/brand";
import { useBrandSafe } from "@/lib/brand";

const glyphs: Record<MarkId, ReactNode> = {
  fatbull: (
    <g fill="none" strokeWidth="2.2">
      {/* Chifres curvados fortes dourados */}
      <path
        d="M 6 12 C 7 6 12 5 15 11"
        stroke="#FFB800"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M 26 12 C 25 6 20 5 17 11"
        stroke="#FFB800"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Cabeça forte do touro */}
      <path
        d="M 9 13 C 9 8 23 8 23 13 C 24 18 20 23 16 25 C 12 23 8 18 9 13 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        fill="currentColor"
        fillOpacity="0.25"
      />
      {/* Narinas / Focinho robusto */}
      <path
        d="M 12 18 C 12 17 20 17 20 18 C 20 21 12 21 12 18 Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      {/* Argola dourada no focinho (Bull Ring) */}
      <circle cx="16" cy="22.5" r="2.8" stroke="#FFB800" strokeWidth="2" />
      {/* Olhos com fúria de corrida */}
      <circle cx="12.5" cy="14" r="1.2" fill="currentColor" />
      <circle cx="19.5" cy="14" r="1.2" fill="currentColor" />
    </g>
  ),
  pulse: (
    <path
      d="M6 18.25h4.1l2.2-8.1 4.05 13.2 2.55-8.6 1.9 3.5H26"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  chevron: (
    <>
      <path d="M7 8.5 15 16l-8 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 8.5 24.5 16l-8 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  apex: (
    <>
      <path d="M16 6.5 26.5 25.5h-21L16 6.5Z" strokeLinejoin="round" />
      <path d="M11 25.5h10" strokeLinecap="round" />
    </>
  ),
  laurel: (
    <>
      <path d="M9 23c-2.6-4.6-2-10 2-14" strokeLinecap="round" />
      <path d="M23 23c2.6-4.6 2-10-2-14" strokeLinecap="round" />
      <circle cx="16" cy="17" r="3.6" />
    </>
  ),
  wing: (
    <>
      <path d="M5 11h12.5L31 6l-9 10 4 10L14 19H5l0-8Z" strokeLinejoin="round" />
    </>
  ),
};

export function PulseMark({
  className,
  variant = "solid",
  ...props
}: SVGProps<SVGSVGElement> & {
  variant?: "solid" | "onLight" | "knockout";
}) {
  const ctx = useBrandSafe();
  const config = ctx?.config ?? defaultBrand;

  const tile =
    variant === "onLight" ? "#080E1B" : "var(--color-pulse, #E51124)";
  const glyph =
    variant === "onLight" ? "#F4F7FC" : "var(--color-ink, #080E1B)";

  if (config.logoMode === "image" && config.image) {
    return (
      <span
        className={className}
        role="img"
        aria-label={`${config.name} (logo)`}
        style={{
          display: "inline-block",
          backgroundImage: `url(${config.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role="img"
      aria-label={config.name}
      {...props}
    >
      {variant !== "knockout" && (
        <rect
          width="32"
          height="32"
          rx="8"
          fill={tile}
          stroke={variant === "solid" ? "rgba(255,255,255,0.15)" : "none"}
          strokeWidth="1"
        />
      )}
      <g stroke={variant === "knockout" ? "currentColor" : glyph} strokeWidth="2.25" fill="none">
        {glyphs[config.mark] ?? glyphs.fatbull}
      </g>
    </svg>
  );
}

/** Divide nomes para colorir a segunda parte com a cor de destaque (accent) */
function splitName(name: string): [string, string] {
  if (name.toLowerCase().includes("fat") && name.toLowerCase().includes("bull")) {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return [parts[0] + " ", parts.slice(1).join(" ")];
    }
  }
  const match = name.match(/^(.+?)([A-Z][a-zA-Z0-9]*)$/);
  if (!match || !match[1]) return [name, ""];
  return [match[1], match[2]];
}

export function Brand({
  compact = false,
  className = "",
  size = "md",
  color,
  taglineColor,
  markVariant = "solid",
}: {
  compact?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  taglineColor?: string;
  markVariant?: "solid" | "onLight" | "knockout";
}) {
  const ctx = useBrandSafe();
  const config = ctx?.config ?? defaultBrand;
  const [head, tail] = splitName(config.name);

  const markSize = size === "lg" ? "h-12 w-12" : size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const titleSize = size === "lg" ? "text-[26px]" : size === "sm" ? "text-[13px]" : "text-[18px]";

  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className}`}
      style={color ? { color } : undefined}
    >
      {config.image ? (
        <img
          src={config.image}
          alt={config.name}
          className={`${markSize} shrink-0 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]`}
        />
      ) : (
        <PulseMark
          variant={markVariant}
          className={`${markSize} shrink-0 ${size === "lg" ? "rounded-xl" : ""}`}
        />
      )}
      {!compact && (
        <span className="flex flex-col">
          <span
            className={`font-display ${titleSize} font-black italic uppercase leading-none tracking-[-0.04em] ${
              color ? "" : "text-fog"
            }`}
          >
            {head}
            {tail && (
              <span
                style={{
                  color: markVariant === "solid" ? "var(--color-pulse)" : "inherit",
                }}
              >
                {tail}
              </span>
            )}
          </span>
          {config.tagline && (
            <span
              className={`mt-1 font-mono text-[7px] font-bold uppercase leading-none tracking-[0.22em] ${
                taglineColor ? "" : "text-muted"
              }`}
              style={taglineColor ? { color: taglineColor } : undefined}
            >
              {config.tagline}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
