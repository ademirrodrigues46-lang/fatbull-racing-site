export type Channel = "stable" | "beta" | "canary";

export type ReleaseEntry = {
  version: string;
  date: string;
  channel: Channel;
  title: string;
  size: string;
  notes: string[];
  tags: ("app" | "site" | "widgets" | "docs")[];
};

export const releaseEntries: ReleaseEntry[] = [
  {
    version: "2.4.1",
    date: "18 FEV 2026",
    channel: "stable",
    title: "Standings V2 e radar estável",
    size: "18,4 MB",
    notes: [
      "Intervalos por classe e destaque de melhor volta no Standings V2.",
      "Radar de proximidade com detecção de overlap em pelotões densos.",
      "Redução de 34% no tempo de inicialização do overlay.",
    ],
    tags: ["app", "widgets"],
  },
  {
    version: "2.4.0",
    date: "02 FEV 2026",
    channel: "stable",
    title: "Estúdio de layout por perfil",
    size: "18,2 MB",
    notes: [
      "Editor visual com snap de 8 px, escala e opacidade por widget.",
      "Perfis vinculados a carro, pista ou tipo de sessão.",
      "Exportação de Browser Source para OBS com URL por camada.",
    ],
    tags: ["app", "widgets"],
  },
  {
    version: "2.5.0-beta.3",
    date: "20 FEV 2026",
    channel: "beta",
    title: "Pneus, stint e alertas de consumo",
    size: "19,1 MB",
    notes: [
      "Widget de pneus com temperatura por roda e degradação estimada.",
      "Alertas de economia de combustível com alvo configurável.",
      "Novo tema de contraste para transmissão noturna.",
    ],
    tags: ["app", "widgets", "docs"],
  },
  {
    version: "2.5.0-beta.1",
    date: "12 FEV 2026",
    channel: "beta",
    title: "Base de telemetria assíncrona",
    size: "18,9 MB",
    notes: [
      "Leitura de telemetria em thread separada do render.",
      "Cache de mapas de pista em disco, sem depender de rede.",
    ],
    tags: ["app"],
  },
  {
    version: "2.6.0-canary.7",
    date: "HOJE",
    channel: "canary",
    title: "Construção automática a cada commit",
    size: "20,4 MB",
    notes: [
      "Prévia do modo espectador com dados do teammate.",
      "Ajuste experimental de janela em tela cheia exclusiva.",
      "Instável por definição: use apenas para testes.",
    ],
    tags: ["app", "widgets", "site", "docs"],
  },
];

export const channelMeta: Record<
  Channel,
  { label: string; description: string; cadence: string; risk: string }
> = {
  stable: {
    label: "Stable",
    description: "Builds testadas em corrida real. É o canal que a maioria dos pilotos deve usar.",
    cadence: "a cada 3–5 semanas",
    risk: "risco baixo",
  },
  beta: {
    label: "Beta",
    description: "Recursos novos antes de todo mundo, com correções frequentes.",
    cadence: "semanal",
    risk: "risco médio",
  },
  canary: {
    label: "Canary",
    description: "Compilado automático de cada commit no main. Instável por definição.",
    cadence: "a cada push",
    risk: "risco alto",
  },
};

export const deploySteps = [
  {
    id: "commit",
    label: "Commit no Git",
    detail: "branches por feature; cada PR roda build e testes visuais.",
  },
  {
    id: "build",
    label: "Build e testes",
    detail: "vite build, SHA-256 e artefato validado no CI.",
  },
  {
    id: "preview",
    label: "Preview",
    detail: "URL isolada por PR para validar antes de publicar.",
  },
  {
    id: "edge",
    label: "Publicação no edge",
    detail: "deploy imediato, rollback em um clique se precisar.",
  },
];

export const siteCommands = [
  {
    label: "Rodar local com hot reload",
    command: "npm run dev",
  },
  {
    label: "Build + versão + SHA-256",
    command: "npm run release:site",
  },
  {
    label: "Publicar manualmente no edge",
    command: "npx wrangler pages deploy dist --project-name racepulse",
  },
  {
    label: "Publicar via Git (CI)",
    command: "git push origin main   # o workflow faz o deploy",
  },
];

export const appCommands = [
  {
    label: "Gerar a versão + hash do site",
    command: "npm run release:site",
  },
  {
    label: "Empacotar instalador (repo do app)",
    command: "npm run app:build   # dist-app/FatBull-Racing-Setup-[versão].exe",
  },
  {
    label: "Checksum publicado na central",
    command: "npm run app:hash",
  },
  {
    label: "Release com auto-update",
    command: "npm run app:release # GitHub Releases + latest.yml",
  },
];

export const roadmap = [
  {
    period: "PRÓXIMO CICLO",
    items: [
      "Overlay de pneus com temperatura por roda",
      "Perfil por volante (presets de botões)",
      "Modo espectador com timing do teammate",
    ],
  },
  {
    period: "EM SEGUIMENTO",
    items: [
      "Sincronização de layout na nuvem entre PCs",
      "API pública para plugins de terceiros",
      "Versão para Linux e segunda tela em VR via OVR Toolkit",
    ],
  },
];
