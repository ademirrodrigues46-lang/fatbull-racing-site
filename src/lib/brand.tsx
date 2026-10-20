import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultBrand,
  STORAGE_KEY,
  type BrandConfig,
  type MarkId,
  type LogoMode,
} from "@/data/brand";
import { resolveTheme, themeToVars, type ResolvedTheme } from "./color";

type BrandContextValue = {
  config: BrandConfig;
  theme: ResolvedTheme;
  update: (patch: Partial<BrandConfig>) => void;
  setName: (name: string) => void;
  setTagline: (tagline: string) => void;
  setMark: (mark: MarkId) => void;
  setLogoMode: (mode: LogoMode) => void;
  setImage: (dataUrl: string | null) => void;
  setAccent: (hex: string) => void;
  setInk: (hex: string) => void;
  setTokens: (patch: Partial<BrandConfig["tokens"]>) => void;
  applyPack: (tokens: BrandConfig["tokens"], mark?: MarkId) => void;
  reset: () => void;
};

const BrandContext = createContext<BrandContextValue | null>(null);

function readStored(): BrandConfig {
  if (typeof window === "undefined") return defaultBrand;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultBrand;
    const parsed = JSON.parse(raw) as Partial<BrandConfig>;
    return {
      ...defaultBrand,
      ...parsed,
      tokens: { ...defaultBrand.tokens, ...(parsed.tokens ?? {}) },
    };
  } catch {
    return defaultBrand;
  }
}

export function BrandProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<BrandConfig>(() => readStored());

  const theme = useMemo(() => resolveTheme(config.tokens), [config.tokens]);

  useEffect(() => {
    const vars = themeToVars(theme);
    const root = document.documentElement;
    for (const [key, value] of Object.entries(vars)) root.style.setProperty(key, value);
    root.style.colorScheme = "dark";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme.ink);
  }, [theme]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      /* armazenamento indisponível: segue só em memória */
    }
  }, [config]);

  const update = useCallback((patch: Partial<BrandConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  const setTokens = useCallback((patch: Partial<BrandConfig["tokens"]>) => {
    setConfig((prev) => ({ ...prev, tokens: { ...prev.tokens, ...patch } }));
  }, []);

  const value = useMemo<BrandContextValue>(
    () => ({
      config,
      theme,
      update,
      setName: (name) => update({ name }),
      setTagline: (tagline) => update({ tagline }),
      setMark: (mark) => update({ mark, logoMode: "mark" }),
      setLogoMode: (logoMode) => update({ logoMode }),
      setImage: (image) => update({ image, logoMode: image ? "image" : "mark" }),
      setAccent: (accent) => setTokens({ accent }),
      setInk: (ink) => setTokens({ ink }),
      setTokens,
      applyPack: (tokens, mark) => {
        setConfig((prev) => ({
          ...prev,
          tokens,
          ...(mark ? { mark, logoMode: "mark" as const } : {}),
        }));
      },
      reset: () => {
        setConfig(defaultBrand);
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* noop */
        }
      },
    }),
    [config, theme, update, setTokens],
  );

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand precisa estar dentro de <BrandProvider>");
  return ctx;
}

/** Igual a `useBrand`, mas tolera a ausência do provider (peças isoladas). */
export function useBrandSafe() {
  return useContext(BrandContext);
}
