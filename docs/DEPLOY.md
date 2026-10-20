# Publicação e atualizações

Duas trilhas independentes, cada uma com seu comando, seu canal e seu ponto de rollback.

---

## 1. Site (este repositório)

### Ciclo de mudança

```bash
git switch -c feat/novo-widget-tyres
npm install
npm run dev                  # valida em http://localhost:5173
npm run release:site         # build + SHA-256 + dist/release.json
git add . && git commit -m "feat(site): widget de pneus no estúdio"
git push -u origin feat/novo-widget-tyres
```

O push abre o PR. O workflow `deploy.yml` roda o build e publica uma **URL de preview**
isolada (por PR). Ao aprovar e fazer merge na `main`, o mesmo workflow publica em produção
e envia um commit para a branch `gh-pages` como espelho.

### Onde editar o quê

| Quero mudar… | Arquivo |
| --- | --- |
| Logo e cores (site + overlay) | seção **Identidade** (`#identidade`) → exportar `brand.json`; padrão em `src/data/brand.ts` |
| Notas de versão, canais, roadmap, comandos | `src/data/releases.ts` |
| Lista de widgets do Estúdio e do preview | `src/components/OverlayPreview.tsx` (`widgetLabels`, `defaultOverlayConfig`) |
| Texto/artigos da documentação | `src/components/DocsModal.tsx` (`topics`) |
| Versão, tamanho, hash e destaques do download | `src/components/DownloadModal.tsx` |
| Tokens de cor, fontes, estilo do overlay | `src/index.css` (fallbacks em `@theme` + classes `.race-*`), aplicados em runtime por `src/lib/brand.tsx` |
| Imagem de fundo da prévia | `src/assets/cockpit-night.jpg` |

Nada disso exige tocar em vários arquivos: os dados alimentam o JSX.

### Hosts suportados

O build é um arquivo único (`viteSingleFile`), então serve em qualquer host estático:

```bash
# Cloudflare Pages
npx wrangler pages deploy dist --project-name racepulse

# Netlify
npx netlify deploy --prod --dir=dist

# Vercel
npx vercel deploy --prod dist

# GitHub Pages (o workflow já cuida disso)
```

`netlify.toml` já traz `command = "npm run build"` e `publish = "dist"`.

### Rollback

1. **Painel:** escolha a última implantação boa → “promote”. Leva segundos.
2. **Git:** `git revert <sha> && git push origin main` — o CI republica a versão anterior.
3. **Local:** `npm run release:site` com a tag antiga, depois o deploy manual.

---

## 2. App Windows (repositório `racepulse-app`)

O app é um Electron com janela transparente *click-through* sobre o iRacing, lendo o SDK de
telemetria oficial (`Documents/iRacing/telemetry.json` + memory mapping) a 10 Hz.

### Empacotar

```bash
npm run app:build      # electron-builder: NSIS + portable
npm run app:hash       # SHA-256 do instalador (publicado na central de download)
npm run app:release    # GitHub Releases + latest.yml para o auto-update
```

Artefatos gerados:

```
dist-app/RacePulse-Setup-2.4.1.exe          # instalador assinado
dist-app/RacePulse-2.4.1-portable.exe       # execução sem instalação
dist-app/latest.yml                         # manifesto lido pelo auto-update
dist-app/builder-debug.yml                  # log do empacotamento
```

Assinatura de código (Authenticode) evita o aviso do SmartScreen e é obrigatória para
publicação no canal Stable.

### Canais

| Canal | Cadência | Quem usa | Manifesto |
| --- | --- | --- | --- |
| `canary` | cada commit na `main` | devs e testers de plantão | `canary.yml` |
| `beta` | semanal | pilotos que aceitam bugs | `beta.yml` |
| `stable` | a cada 3–5 semanas | todo o resto | `latest.yml` |

Trocar de canal: **Ajustes → Atualizações → Canal** (reinício único, perfis preservados).

### Auto-update

- Verificação ao iniciar e a cada 6 h, **nunca durante sessão ativa** do iRacing.
- Download em background → instalação pedida apenas na próxima abertura.
- `electron-updater` + Releases no GitHub: nenhuma infra própria é necessária.
- Reverter: **Ajustes → Geral → Gerenciador de versões** reinstala a build anterior sem
  apagar `%APPDATA%\RacePulse`.

### Publicar uma nova versão no site

Quando sair release do app, três arquivos precisam refletir isso:

1. `src/data/releases.ts` → nova entrada em `releaseEntries` (versão, data, tamanho, notas, canal).
2. `src/components/DownloadModal.tsx` → `2.4.1`, `18,4 MB` e o SHA-256 exibido.
3. `CHANGELOG.md` → mesmo texto das notas, para quem lê o repositório.

`npm run release:site` registra a versão no `dist/release.json`, que é o arquivo que
confere com o hash publicado.

---

## 3. Checklist de release

- [ ] `npm run build` e smoke test visual sem erros de console
- [ ] Notas da versão escritas (usuário, não commits)
- [ ] SHA-256 do instalador publicado na central de download
- [ ] Instalador assinado (Authenticode) antes de subir para `stable`
- [ ] `CHANGELOG.md` atualizado
- [ ] Cache do edge limpo e preview removido
