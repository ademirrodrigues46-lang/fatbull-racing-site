import type { BrandTokens } from "@/lib/color";

export type MarkId = "fatbull" | "pulse" | "chevron" | "apex" | "laurel" | "wing";
export type LogoMode = "mark" | "image";

export type BrandConfig = {
  name: string;
  tagline: string;
  logoMode: LogoMode;
  mark: MarkId;
  image: string | null;
  tokens: BrandTokens;
};

export const markLabels: Record<MarkId, string> = {
  fatbull: "Fat Bull",
  pulse: "Pulse",
  chevron: "Chevron",
  apex: "Apex",
  laurel: "Laurel",
  wing: "Wing",
};

export const packs: {
  id: string;
  label: string;
  note: string;
  tokens: BrandTokens;
  mark: MarkId;
}[] = [
  {
    id: "fatbull",
    label: "Fat Bull Red",
    note: "vermelho de corrida, marinho e ouro",
    tokens: {
      accent: "#E51124", // Vermelho vibrante do touro
      ember: "#FFB800",  // Dourado dos chifres e argola
      ink: "#080E1B",    // Azul marinho muito escuro do distintivo
      text: "#F4F7FC",   // Branco azulado do texto RACING
    },
    mark: "fatbull",
  },
  {
    id: "fatbull-gold",
    label: "Bull Horn Gold",
    note: "dourado com fundo marinho",
    tokens: {
      accent: "#FFB800",
      ember: "#E51124",
      ink: "#080E1B",
      text: "#F4F7FC",
    },
    mark: "fatbull",
  },
  {
    id: "pulse",
    label: "Pulse Lime",
    note: "verde telemetria clássico",
    tokens: { accent: "#C9F95A", ember: "#FF6E4A", ink: "#070A0A", text: "#F2F5EC" },
    mark: "pulse",
  },
  {
    id: "ember",
    label: "Ember Orange",
    note: "calor de fim de stint",
    tokens: { accent: "#FF7A3D", ember: "#FFD166", ink: "#0B0705", text: "#FFF3EA" },
    mark: "wing",
  },
  {
    id: "gulf",
    label: "Gulf Blue",
    note: "endurance clássico",
    tokens: { accent: "#5FB8FF", ember: "#FFB03A", ink: "#050B13", text: "#EAF4FF" },
    mark: "chevron",
  },
  {
    id: "crimson",
    label: "Crimson Dark",
    note: "vermelho profundo",
    tokens: { accent: "#FF2E3B", ember: "#FFB800", ink: "#070B14", text: "#FFF0F2" },
    mark: "fatbull",
  },
];

export const defaultBrand: BrandConfig = {
  name: "FatBull Racing",
  tagline: "iRacing Overlay Systems",
  logoMode: "mark",
  mark: "fatbull",
  image: "/images/fat-bull-racing.svg",
  tokens: packs[0].tokens,
};

export const STORAGE_KEY = "fatbull.brand.v2";
