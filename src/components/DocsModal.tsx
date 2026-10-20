import { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronRight,
  Download,
  ExternalLink,
  HardDriveDownload,
  LayoutGrid,
  LifeBuoy,
  ListChecks,
  Radio,
  RefreshCw,
  Rocket,
  Send,
  Search,
  GitBranch,
  Settings2,
  ShieldAlert,
  Terminal,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ModalShell } from "./ModalShell";
import { cn } from "@/utils/cn";

type TopicId =
  | "instalacao"
  | "primeiros-passos"
  | "widgets"
  | "streaming"
  | "problemas"
  | "atualizacoes"
  | "publicar"
  | "github";

type DocSection = {
  title: string;
  body?: string;
  steps?: { title: string; description: string }[];
  tip?: string;
  code?: string;
};

type Topic = {
  id: TopicId;
  label: string;
  icon: LucideIcon;
  kicker: string;
  title: string;
  intro: string;
  sections: DocSection[];
};

const topics: Topic[] = [
  {
    id: "instalacao",
    label: "Instalação",
    icon: HardDriveDownload,
    kicker: "Comece aqui",
    title: "Do instalador à primeira volta.",
    intro:
      "O RacePulse leva menos de um minuto para instalar. Nenhum driver adicional, captura de tela ou configuração de telemetria é necessária.",
    sections: [
      {
        title: "Antes de instalar",
        steps: [
          {
            title: "Feche o iRacing e o OBS",
            description:
              "Mantenha o simulador fechado durante a instalação para permitir a criação do atalho e do serviço local.",
          },
          {
            title: "Use Windows 10 ou 11 de 64 bits",
            description:
              "São necessários 42 MB livres. A instalação não requer .NET Framework ou runtime adicional.",
          },
          {
            title: "Baixe o instalador oficial",
            description:
              "Sempre confira o SHA-256 exibido na central de download. Builds oficiais usam o nome RacePulse-Setup-2.4.1.exe.",
          },
        ],
      },
      {
        title: "Executando o instalador",
        steps: [
          {
            title: "Abra o arquivo como administrador",
            description:
              "O RacePulse registra uma exceção de firewall local para receber telemetria e servir overlays ao OBS.",
          },
          {
            title: "Selecione o perfil de uso",
            description:
              "Escolha Piloto, Streamer ou Ambos. Isso define os widgets iniciais e as permissões padrão dos overlays.",
          },
          {
            title: "Conclua e inicie o RacePulse",
            description:
              "O aplicativo procura o iRacing automaticamente em Documentos/iRacing e inicia em segundo plano.",
          },
        ],
        tip: "Se o SmartScreen aparecer, clique em Mais informações → Executar assim mesmo. O instalador oficial é assinado digitalmente.",
      },
      {
        title: "Verificando o overlay",
        body:
          "Abra o iRacing em modo janela sem borda. Entre em um treino livre. O indicador no topo da janela RacePulse deve ficar verde e os widgets aparecem automaticamente.",
        code: "%LOCALAPPDATA%\\RacePulse\n%APPDATA%\\RacePulse\\config",
      },
    ],
  },
  {
    id: "primeiros-passos",
    label: "Primeiros passos",
    icon: Rocket,
    kicker: "Guia rápido",
    title: "Tudo no lugar em quatro passos.",
    intro:
      "O RacePulse é iniciado junto com o Windows e reconhece uma sessão do iRacing em segundos. O layout inicial combina timing e estratégia.",
    sections: [
      {
        title: "1. Ative o modo de edição",
        body:
          "Pressione Ctrl + Shift + E ou clique em Editar layout. Cada widget se move livremente pela tela. Use as setas para ajustar 1 px por toque.",
      },
      {
        title: "2. Escolha o display",
        body:
          "Com múltiplos monitores, arraste a janela do overlay para o display desejado. O RacePulse memoriza a posição por tela e por perfil.",
      },
      {
        title: "3. Configure a sessão",
        steps: [
          {
            title: "Perfil automático",
            description:
              "O layout pode ser vinculado ao carro, à pista ou ao tipo de sessão. A troca é instantânea.",
          },
          {
            title: "Atalhos do cockpit",
            description:
              "Associe teclas ou botões do volante para mostrar, ocultar e trocar o nível de detalhe.",
          },
          {
            title: "Opacidade adaptativa",
            description:
              "O overlay fica em repouso quando você está sozinho na pista e volta a 100% em disputa.",
          },
        ],
        tip: "Dica: pressione Ctrl + Shift + L para bloquear todos os widgets e evitar movimentos acidentais em corrida.",
      },
    ],
  },
  {
    id: "widgets",
    label: "Widgets",
    icon: LayoutGrid,
    kicker: "Referência",
    title: "Cada informação no seu lugar.",
    intro:
      "Os widgets são independentes, compartilham a mesma telemetria e podem ser exportados individualmente para o OBS ou para uma segunda tela.",
    sections: [
      {
        title: "Standings V2",
        body:
          "A tabela mostra posição, carro, piloto, classe, intervalo, volta mais rápida e status na pit lane. Você pode escolher entre classificação geral ou filtrada por classe e limitar a lista a 5, 10 ou 20 carros.",
        code: "Render Hz: 10   |   Colunas: overall, class, interval\nHover: detalhes do piloto   |   Cores: classe ou equipe",
      },
      {
        title: "Relativos e combustível",
        body:
          "O Relativo lista quem está à frente e atrás de você em pista, com relógio de sessão, tempo restante e gap em segundos. O Fuel Plan calcula o consumo por volta, combustível necessário até o fim, voltas restantes e a janela ideal de pit stop.",
      },
      {
        title: "Mapa, radar e delta",
        body:
          "O Track Map destaca sua posição e os setores roxo/verde. O radar de proximidade alerta sobre overlap nas laterais. Delta + RPM reúne referência de volta, delta em tempo real, marcha, velocidade e faixa de RPM.",
        tip: "Todos os widgets aceitam fundo transparente, cor de destaque e escala independentes, além de presets de tamanho para 1080p, 1440p e 4K.",
      },
    ],
  },
  {
    id: "streaming",
    label: "Streaming",
    icon: Radio,
    kicker: "OBS / Twitch",
    title: "Pronto para ir ao ar.",
    intro:
      "Além da janela sobre o iRacing, o RacePulse publica cada widget como uma fonte local para composições de transmissão.",
    sections: [
      {
        title: "Adicionar como Browser Source",
        steps: [
          {
            title: "Crie uma fonte no OBS",
            description:
              "Fontes → Navegador. Defina largura 1920 e altura 1080, ou use a resolução exata do seu overlay.",
          },
          {
            title: "Cole o endereço local",
            description:
              "No RacePulse, abra Overlays → Browser Source e copie o link do widget desejado.",
          },
          {
            title: "Ajuste a transparência",
            description:
              "Desmarque fundo opaco. O OBS respeita a transparência e mantém 60 FPS sem captura de janela.",
          },
        ],
        code: "http://127.0.0.1:8472/overlay/racepulse\nhttp://127.0.0.1:8472/overlay/standings?theme=pulse",
      },
      {
        title: "Segunda tela e dual PC",
        body:
          "Para transmissões em outro PC, ative Exportação de rede no RacePulse e use o endereço privado exibido no Helper. Não é necessário compartilhar a pasta do iRacing.",
        tip: "Desative o preview do OBS enquanto joga para reduzir o uso da GPU. O RacePulse renderiza apenas widgets ativos.",
      },
    ],
  },
  {
    id: "problemas",
    label: "Solução de problemas",
    icon: Wrench,
    kicker: "Diagnóstico",
    title: "Resolva antes da largada.",
    intro:
      "Os problemas mais comuns têm solução em poucos cliques. Abra Ajustes → Diagnóstico para verificar iRacing, rede local e integridade dos arquivos.",
    sections: [
      {
        title: "Overlay invisível",
        steps: [
          {
            title: "Use modo janela sem borda",
            description:
              "O iRacing deve estar em Windowed ou Borderless. Alt+Tab e o modo tela cheia exclusivo podem ocultar a janela.",
          },
          {
            title: "Verifique o monitor principal",
            description:
              "Em Ajustes → Sistema, execute Mostrar em todos os displays e reconfirme a resolução.",
          },
          {
            title: "Desative softwares de captura",
            description:
              "Sobreposições de GPU podem interferir. Desligue temporariamente RTSS, MSI Afterburner e filtros do driver.",
          },
        ],
      },
      {
        title: "Sem telemetria",
        body:
          "Confira se o indicador iRacing está verde. Ative a coleta de telemetria em Diagnóstico → Reconectar SDK. Se persistir, adicione a pasta de instalação à lista de exceções do antivírus.",
        code: "Ajustes → Diagnóstico → Reconectar SDK\nLogs: %APPDATA%\\RacePulse\\logs",
        tip: "Em caso de stutter, reduza Render FPS para 30 e desligue a aceleração por hardware em Ajustes → Desempenho.",
      },
    ],
  },
  {
    id: "atualizacoes",
    label: "Atualizações",
    icon: RefreshCw,
    kicker: "Manutenção",
    title: "Sempre na versão da pole.",
    intro:
      "Atualizações estáveis são distribuídas pelo próprio app. Seus layouts e perfis ficam em %APPDATA%\\RacePulse e não são sobrescritos.",
    sections: [
      {
        title: "Canais de distribuição",
        body:
          "Stable recebe apenas builds testadas. Beta antecipa novos widgets e melhorias de telemetria. A troca de canal fica em Ajustes → Atualizações e exige reinício.",
      },
      {
        title: "Backup e restauração",
        steps: [
          {
            title: "Exportar configuração",
            description:
              "Ajustes → Geral → Exportar. Salve o arquivo .racepulse-profile em nuvem ou unidade externa.",
          },
          {
            title: "Restaurar em outro PC",
            description:
              "Importe o perfil depois de instalar o RacePulse. Os links de Browser Source permanecem válidos.",
          },
          {
            title: "Reverter uma versão",
            description:
              "Geral → Gerenciador de versões permite reinstalar a build anterior sem apagar perfis.",
          },
        ],
        tip: "O RacePulse verifica atualizações ao iniciar, mas nunca reinicia durante uma sessão ativa do iRacing.",
      },
    ],
  },
  {
    id: "publicar",
    label: "Publicar & atualizar",
    icon: Send,
    kicker: "Release",
    title: "Como o site e o app vão ao ar.",
    intro:
      "Duas trilhas independentes: o site institucional (esta página) e o instalador Windows. Cada uma tem seu comando, seu canal e seu ponto de rollback.",
    sections: [
      {
        title: "Publicar o site",
        steps: [
          {
            title: "Editar o conteúdo",
            description:
              "Textos de versão, changelog, roadmap e comandos ficam em src/data/releases.ts. Os componentes só renderizam esses dados.",
          },
          {
            title: "Rodar e validar",
            description:
              "npm run dev para ver em local; npm run build gera dist/index.html, um arquivo único que sobe em qualquer host estático.",
          },
          {
            title: "Enviar para o edge",
            description:
              "git push origin main dispara o workflow de deploy. Cada PR também recebe uma URL de preview isolada.",
          },
        ],
        code: "npm run build\nnpx wrangler pages deploy dist --project-name racepulse\ngit push origin main   # CI publica automaticamente",
        tip: "Rollback: no painel do host, escolha a última implantação boa. Como o build é um arquivo só, levar o site de volta leva segundos.",
      },
      {
        title: "Publicar uma versão do app",
        steps: [
          {
            title: "Empacotar o instalador",
            description:
              "npm run app:build gera RacePulse-Setup-[versão].exe com Electron Builder (NSIS). O mesmo comando produz o bloco de atualização usado pelo auto-update.",
          },
          {
            title: "Assinar e gerar checksum",
            description:
              "npm run app:hash imprime o SHA-256 exibido na central de download. A assinatura evita o aviso do SmartScreen.",
          },
          {
            title: "Publicar no canal certo",
            description:
              "Canary a cada commit, Beta semanal, Stable a cada 3–5 semanas. O update.yml é publicado junto para que os apps existentes encontrem a novidade.",
          },
        ],
        code: "npm run app:build\nnpm run app:hash\nnpm run app:release   # GitHub Releases + latest.yml",
      },
      {
        title: "Adicionar um recurso novo",
        steps: [
          {
            title: "Criar a branch e o widget",
            description:
              "Cada overlay vive em src/components com sua própria pasta de widgets. Registre o novo widget em widgetLabels para ele aparecer no Estúdio e nas configurações.",
          },
          {
            title: "Somar no preview",
            description:
              "Adicione o bloco correspondente em RacePreview e o estado em OverlayConfig. O Estúdio ganha o toggle automaticamente.",
          },
          {
            title: "Documentar e anotar",
            description:
              "Inclua o artigo em topics (DocsModal) e uma linha no CHANGELOG antes de publicar.",
          },
        ],
        tip: "Checklist antes de subir: build + testes visuais, notas da versão, SHA-256 publicado, instalador assinado e cache do edge limpo.",
      },
    ],
  },
  {
    id: "github",
    label: "GitHub e o PC",
    icon: GitBranch,
    kicker: "Comece aqui",
    title: "Subir no GitHub, publicar e testar no Windows.",
    intro:
      "Este repositório é o site + Estúdio. Ainda não existe um .exe sobre o iRacing. Você já pode versionar no GitHub, colocar a página no ar e rodar localmente para decidir o que melhorar.",
    sections: [
      {
        title: "No PC, uma vez",
        steps: [
          {
            title: "Instale Git, Node.js LTS e VS Code",
            description:
              "git-scm.com, nodejs.org (marque Add to PATH) e code.visualstudio.com. Confira com git --version, node -v e npm -v no terminal.",
          },
          {
            title: "Abra a pasta do projeto",
            description:
              "Se baixou o ZIP, extraia. Se já tem Git: git clone https://github.com/SEU_USUARIO/fatbull-racing-overlay.git",
          },
        ],
        code: "npm install\nnpm run dev          # http://localhost:5173",
      },
      {
        title: "Mandar para o GitHub",
        steps: [
          {
            title: "Crie o repositório vazio",
            description:
              "github.com/new → nome fatbull-racing-overlay → sem README (este projeto já tem).",
          },
          {
            title: "Primeiro push",
            description:
              "Na pasta do projeto, inicialize o Git se ainda não existir e envie a main.",
          },
        ],
        code: "git init -b main\ngit add .\ngit commit -m \"feat: primeira versão FatBull Racing Overlay\"\ngit remote add origin https://github.com/SEU_USUARIO/fatbull-racing-overlay.git\ngit push -u origin main",
      },
      {
        title: "Site no ar",
        body:
          "O caminho mais simples é Netlify ou Vercel ligados ao GitHub: build npm run build, pasta dist. Cada push na main republica. GitHub Pages também funciona (Actions → pages.yml; Settings → Pages → GitHub Actions).",
        tip: "Guia completo passo a passo: docs/COMECE-AQUI.md no repositório.",
      },
      {
        title: "Ciclo de alteração",
        code: "git switch -c feat/o-que-vai-mudar\nnpm run dev\nnpm run build\ngit add . && git commit -m \"feat: descreva\" && git push",
        tip: "Não há instalador Windows neste repo. Use o Estúdio no navegador, lado a lado com o iRacing em janela sem borda, para julgar tamanho, cor e informação.",
      },
    ],
  },
];

export function DocsModal({
  open,
  onClose,
  onDownload,
  onNotify,
}: {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
  onNotify: (message: string) => void;
}) {
  const [topicId, setTopicId] = useState<TopicId>("instalacao");
  const [query, setQuery] = useState("");

  const topic = topics.find((item) => item.id === topicId) ?? topics[0];
  const filteredTopics = useMemo(() => {
    if (!query.trim()) return topics;
    const term = query.toLowerCase();
    return topics.filter(
      (item) =>
        item.label.toLowerCase().includes(term) ||
        item.title.toLowerCase().includes(term) ||
        item.intro.toLowerCase().includes(term),
    );
  }, [query]);

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      label="Documentação RacePulse"
      className="max-w-[1040px]"
    >
      <div className="flex h-[min(760px,88vh)] flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#0e1412] px-4 py-3 pr-12 sm:px-5 sm:pr-14">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded border border-pulse/20 bg-pulse/[0.08] text-pulse">
              <BookOpen className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="font-display text-[12px] font-semibold tracking-[-0.02em] text-fog">
                RacePulse Docs
              </p>
              <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-muted">
                Knowledge base · v2.4.1
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="relative hidden items-center sm:flex">
              <Search className="pointer-events-none absolute left-2.5 h-3 w-3 text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar na documentação"
                className="h-8 w-48 rounded border border-white/10 bg-black/20 pl-8 pr-2.5 font-sans text-[10px] text-fog outline-none transition placeholder:text-muted/70 focus:border-pulse/40"
              />
            </label>
            <button
              type="button"
              onClick={onDownload}
              className="flex h-8 items-center gap-1.5 rounded bg-pulse px-2.5 font-sans text-[9px] font-extrabold text-ink transition hover:bg-[#d8ff7d]"
            >
              <Download className="h-3 w-3" />
              Baixar app
            </button>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 md:grid-cols-[210px_minmax(0,1fr)]">
          <aside className="flex flex-col border-b border-white/[0.08] bg-[#0a0f0e] md:border-b-0 md:border-r">
            <div className="hidden px-3 pb-1 pt-4 md:block">
              <span className="mono-label">Documentação</span>
            </div>
            <nav className="flex gap-1 overflow-x-auto p-2.5 md:flex-col md:overflow-visible">
              {filteredTopics.map((item) => {
                const Icon = item.icon;
                const active = item.id === topicId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTopicId(item.id)}
                    className={cn(
                      "flex shrink-0 items-center gap-2 rounded px-2.5 py-2 text-left transition md:w-full",
                      active
                        ? "bg-pulse/[0.09] text-[#ecf2e6]"
                        : "text-muted hover:bg-white/[0.03] hover:text-[#cbd5c7]",
                    )}
                  >
                    <Icon className={cn("h-3.5 w-3.5 shrink-0", active && "text-pulse")} />
                    <span className="text-[11px] font-medium">{item.label}</span>
                    {active && <ChevronRight className="ml-auto hidden h-3 w-3 text-pulse md:block" />}
                  </button>
                );
              })}
              {filteredTopics.length === 0 && (
                <p className="px-2 py-4 text-[10px] leading-relaxed text-muted">
                  Nenhum artigo encontrado para “{query}”.
                </p>
              )}
            </nav>

            <div className="mt-auto hidden p-3 md:block">
              <div className="rounded border border-white/[0.08] bg-white/[0.02] p-3">
                <LifeBuoy className="mb-2 h-4 w-4 text-pulse" />
                <p className="text-[10px] font-semibold text-[#dce4d6]">Precisa de ajuda?</p>
                <p className="mt-1 text-[9px] leading-relaxed text-muted">
                  Nossa equipe responde em até um dia útil.
                </p>
                <a
                  href="mailto:suporte@racepulse.gg"
                  className="mt-2 flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.07em] text-pulse transition hover:text-[#e3ffab]"
                >
                  Abrir ticket <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
              <button
                type="button"
                onClick={() => onNotify("Diagnóstico concluído: iRacing, rede local e arquivos OK.")}
                className="mt-2 flex w-full items-center justify-center gap-1.5 rounded border border-white/10 px-2 py-2 font-mono text-[8px] uppercase tracking-[0.07em] text-muted transition hover:border-pulse/30 hover:text-pulse"
              >
                <Terminal className="h-3 w-3" /> Executar diagnóstico
              </button>
            </div>
          </aside>

          <div className="min-h-0 overflow-y-auto">
            <div className="mx-auto max-w-2xl px-5 py-6 sm:px-8 sm:py-8">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-pulse/20 bg-pulse/[0.06] px-2 py-1 font-mono text-[7px] uppercase tracking-[0.1em] text-pulse">
                  {topic.kicker}
                </span>
                <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-muted">
                  {topic.sections.length + 2} min de leitura
                </span>
              </div>
              <h2 className="mt-3 font-display text-[25px] font-medium tracking-[-0.04em] text-fog sm:text-[30px]">
                {topic.title}
              </h2>
              <p className="mt-2.5 text-[12px] leading-relaxed text-muted">{topic.intro}</p>

              <div className="mt-7 space-y-7">
                {topic.sections.map((section, sectionIndex) => (
                  <section key={section.title}>
                    <h3 className="flex items-center gap-2 text-[13px] font-bold text-[#e6ede0]">
                      <span className="font-mono text-[9px] font-medium text-pulse">
                        {String(sectionIndex + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </h3>
                    {section.body && (
                      <p className="mt-2 text-[11px] leading-[1.8] text-muted">{section.body}</p>
                    )}
                    {section.steps && (
                      <ol className="mt-3 space-y-3 border-l border-white/[0.09] pl-4">
                        {section.steps.map((step) => (
                          <li key={step.title} className="relative">
                            <span className="absolute -left-[21px] top-1 grid h-[11px] w-[11px] place-items-center rounded-full border border-pulse/40 bg-[#0b100f]">
                              <span className="h-1 w-1 rounded-full bg-pulse" />
                            </span>
                            <p className="text-[11px] font-semibold text-[#dbe4d6]">{step.title}</p>
                            <p className="mt-1 text-[10px] leading-[1.75] text-muted">
                              {step.description}
                            </p>
                          </li>
                        ))}
                      </ol>
                    )}
                    {section.code && (
                      <pre className="mt-3 overflow-x-auto rounded border border-white/[0.08] bg-[#080c0b] px-3 py-2.5 font-mono text-[9px] leading-relaxed text-[#b9c8b3]">
                        {section.code}
                      </pre>
                    )}
                    {section.tip && (
                      <div className="mt-3 flex gap-2.5 rounded border border-pulse/15 bg-pulse/[0.04] px-3 py-2.5">
                        <ListChecks className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pulse" />
                        <p className="text-[10px] leading-[1.75] text-[#aebba9]">{section.tip}</p>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              <div className="mt-8 rounded-lg border border-white/[0.08] bg-white/[0.018] p-4">
                <div className="flex items-start gap-3">
                  <Settings2 className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                  <div>
                    <p className="text-[11px] font-semibold text-[#dce4d6]">
                      Artigo útil? Encontrou algo diferente?
                    </p>
                    <p className="mt-1 text-[10px] leading-relaxed text-muted">
                      A documentação é revisada junto com cada build. Se o seu cenário não estiver
                      aqui, envie os logs para nosso time.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => onNotify("Obrigado! Seu feedback ajuda a melhorar a documentação.")}
                        className="flex items-center gap-1.5 rounded border border-pulse/25 bg-pulse/[0.06] px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.07em] text-pulse transition hover:bg-pulse/10"
                      >
                        <Check className="h-2.5 w-2.5" /> Sim, ajudou
                      </button>
                      <button
                        type="button"
                        onClick={() => onNotify("Relato registrado. Um especialista entrará em contato.")}
                        className="flex items-center gap-1.5 rounded border border-white/10 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.07em] text-muted transition hover:border-white/20 hover:text-fog"
                      >
                        <ShieldAlert className="h-2.5 w-2.5" /> Relatar problema
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-4 font-mono text-[8px] uppercase tracking-[0.07em] text-muted">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="h-2.5 w-2.5" /> Documentação oficial · v2.4.1
                </span>
                <button
                  type="button"
                  onClick={onDownload}
                  className="flex items-center gap-1.5 text-pulse transition hover:text-[#e3ffab]"
                >
                  <Rocket className="h-2.5 w-2.5" /> Baixar instalador
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
