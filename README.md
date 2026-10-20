# RacePulse Overlay — site, app e distribuição

Kit de produto do **RacePulse Overlay**, um overlay nativo de telemetria para iRacing
(standings, relativos, combustível, mapa de pista, radar e delta) com janela transparente
sobre o simulador e Browser Sources para OBS.

Este repositório contém a **camada pública** do produto — o que o piloto vê antes e depois
de instalar:

| Camada | Onde vive | O que é |
| --- | --- | --- |
| Site institucional + Estúdio | este repositório | landing page, prévia interativa do overlay, documentação embutida e central de download |
| App Windows | repositório `racepulse-app` | janela transparente (Electron + SDK de telemetria do iRacing), instalador NSIS e auto-update |

O Estúdio (`#estudio`) e a documentação embutida (`Docs`) rodam no navegador com os mesmos
dados usados pelo app, o que mantém marketing, produto e suporte alinhados.

## Rodar local

```bash
npm install
npm run dev          # http://localhost:5173
```

## Rotas principais

```bash
npm run build        # gera dist/index.html (arquivo único, com CSS/JS inline)
npm run preview      # serve o build localmente
npm run release:site # build + SHA-256 + dist/release.json + próximos comandos
```

## Estrutura

```
src/
  App.tsx                    composição das seções + modais + toast
  index.css                  tokens de tema, tipografia, CSS do preview do overlay
  components/
    Header.tsx               navegação fixa e menu mobile
    Hero.tsx                 abertura com o overlay ao vivo
    Features.tsx             métricas + biblioteca de widgets
    OverlayPreview.tsx       motor visual do overlay (React + SVG), reutilizado no Hero e no Estúdio
    Studio.tsx               editor interativo: widgets, cor, escala, opacidade, presets
    Installation.tsx         simulador do assistente de instalação
    Streaming.tsx            preview de cena do OBS com Browser Sources
    Release.tsx              trilha de publicação, canais, changelog e checklist
    Identity.tsx             editor de marca: logo, paleta extraída, tokens ao vivo
  lib/
    brand.tsx                BrandProvider: aplica tokens em :root e persiste em localStorage
    color.ts                 mix/contraste/derive de paleta + extração de cores do logo (canvas)
  data/brand.ts              packs de cor, símbolos de logo, marca padrão
    Testimonials.tsx         feedback de pilotos-teste
    DownloadCTA.tsx          chamada final de download
    DownloadModal.tsx        central de download (versão, tamanho, SHA-256, novidades)
    DocsModal.tsx            documentação completa com busca e navegação por tópicos
  data/releases.ts           versões, canais, roadmap, comandos de deploy  ← edite aqui
scripts/release.mjs          geração de build publicável + checksum
docs/DEPLOY.md               publicação e atualização (site e app)
CHANGELOG.md                 histórico de versões
.github/workflows/deploy.yml CI que builda e publica a cada push na main
```

## Como atualizar o conteúdo

A regra é uma só: **conteúdo é dado, não componente.**

- Texto de versões, changelog, canais, roadmap e comandos → `src/data/releases.ts`.
- Widgets disponíveis e rótulos do Estúdio → `widgetLabels` em `src/components/OverlayPreview.tsx`.
- Artigos da documentação → array `topics` em `src/components/DocsModal.tsx`.
- Versão, tamanho e hash exibidos na central de download → `src/components/DownloadModal.tsx`
  (e `package.json` como fonte de verdade para o script de release).

Depois de editar: `npm run dev` para validar, `npm run release:site` para gerar o artefato.

## Publicar

Veja [`docs/DEPLOY.md`](docs/DEPLOY.md). Resumo: commit → push → o workflow builda e publica no
edge. Cada PR ganha URL de preview; o rollback é a implantação anterior no painel.

## Nota legal

Projeto independente, não afiliado à iRacing.com Motorsport Simulations, LLC.
Todas as leituras de telemetria mostradas na interface são simuladas.
