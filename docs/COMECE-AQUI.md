# Comece aqui — GitHub, site no ar e como testar no PC

Este repositório é o **site + Estúdio** do FatBull Racing Overlay.
Ele roda no navegador. **Ainda não existe um `.exe` Windows** que se sobreponha ao iRacing.
O botão “Baixar instalador” na página é a central de produto (versão, hash, notas) — o instalador nativo vem no próximo repositório (`fatbull-app`).

Você já pode:

1. Subir o código no GitHub
2. Publicar o site (URL pública)
3. Rodar no seu PC, abrir o Estúdio e ir anotando o que melhorar
4. Fazer alterações, commitar e republicar

---

## 0. O que instalar no PC (uma vez)

1. **Git** — https://git-scm.com/download/win
2. **Node.js LTS (22.x)** — https://nodejs.org (marque a opção que adiciona ao PATH)
3. **VS Code** (recomendado) — https://code.visualstudio.com
4. Conta no **GitHub** — https://github.com/signup

Abra o **PowerShell** ou **Git Bash** e confira:

```bash
git --version
node -v
npm -v
```

Se `node` não for reconhecido, feche e reabra o terminal depois da instalação.

---

## 1. Copiar este projeto para o seu computador

Se você baixou a pasta (ZIP):

```bash
cd C:\Users\SEU_USUARIO\Downloads
# extraia o ZIP, depois:
cd fatbull-racing-overlay
```

Se ainda não tem Git iniciado nesta pasta:

```bash
git init -b main
git add .
git commit -m "feat: primeira versão do site FatBull Racing Overlay"
```

---

## 2. Criar o repositório no GitHub e enviar

1. Entre em https://github.com/new
2. Nome sugerido: `fatbull-racing-overlay`
3. Deixe **Public** (necessário para GitHub Pages grátis) ou Private se for usar Netlify/Vercel
4. **Não** marque “Add a README” (o projeto já tem um)
5. Clique em **Create repository**

No terminal, na pasta do projeto (troque `SEU_USUARIO`):

```bash
git remote add origin https://github.com/SEU_USUARIO/fatbull-racing-overlay.git
git push -u origin main
```

Se o GitHub pedir login, use um **Personal Access Token** (Settings → Developer settings → Tokens) no lugar da senha.

Pronto: o código está no GitHub.

---

## 3. Colocar o site no ar (escolha UMA opção)

### Opção A — Netlify (a mais simples, 3 minutos)

1. Entre em https://app.netlify.com e faça login com GitHub
2. **Add new site → Import an existing project**
3. Autorize o GitHub e escolha `fatbull-racing-overlay`
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy

A URL fica algo como `https://fatbull-racing.netlify.app`.
Cada `git push` na `main` republica sozinho.

### Opção B — Vercel (também simples)

1. https://vercel.com/new → Import GitHub repo
2. Framework: Vite (detecta sozinho)
3. Deploy

### Opção C — GitHub Pages

O workflow em `.github/workflows/pages.yml` publica a pasta `dist` na branch `gh-pages`.

1. No GitHub: **Settings → Pages → Source = GitHub Actions**
2. Faça um push (ou rode o workflow em **Actions**)
3. A URL será `https://SEU_USUARIO.github.io/fatbull-racing-overlay/`

Se a página abrir em branco, o `base` do Vite precisa ser o nome do repo.
Nesse caso edite `vite.config.ts` e adicione:

```ts
base: "/fatbull-racing-overlay/",
```

Netlify/Vercel **não** precisam disso.

---

## 4. Rodar no PC para testar e melhorar

Na pasta do projeto:

```bash
npm install
npm run dev
```

Abra **http://localhost:5173**

O que você consegue testar agora (sem iRacing):

| Onde | O que avaliar |
| --- | --- |
| Hero / preview | layout dos widgets, leitura em pista escura |
| Estúdio (`#estudio`) | ligar/desligar widgets, escala, opacidade, presets |
| Marca (`#identidade`) | logo Fat Bull, cores, contraste |
| Docs | textos de instalação e troubleshooting |
| Mobile (F12 → 390px) | menu, overflow, toques |

Anote numa lista: “fuel muito pequeno”, “standings poluído”, “quero widget de pneus”, etc.

Para ver o build de produção (o mesmo que vai ao ar):

```bash
npm run build
npm run preview
```

---

## 5. Ciclo de alteração (o dia a dia)

```bash
git switch -c feat/o-que-voce-vai-mudar
npm run dev                 # edita, vê ao vivo
npm run build               # confirma que não quebrou
git add .
git commit -m "feat: descreva a mudança"
git push -u origin feat/o-que-voce-vai-mudar
```

No GitHub: **Compare & pull request → Merge**.
O Netlify/Vercel publica a `main` sozinho.

Arquivos que você mais vai mexer:

| Quero mudar | Arquivo |
| --- | --- |
| Nome, logo, cores de fábrica | `src/data/brand.ts` |
| Widgets do overlay / preview | `src/components/OverlayPreview.tsx` |
| Estúdio (presets, sliders) | `src/components/Studio.tsx` |
| Textos da home | `src/components/Hero.tsx`, `Features.tsx` |
| Documentação | `src/components/DocsModal.tsx` |
| Versões / changelog | `src/data/releases.ts`, `CHANGELOG.md` |

---

## 6. Sobre o “app no PC” (overlay no iRacing)

Hoje **não há instalador `.exe`**. O que existe é o site.

O overlay de verdade (janela transparente sobre o iRacing, lendo telemetria) precisa de um segundo projeto:

- Electron (ou Tauri) no Windows
- SDK do iRacing (`irsdk`)
- Janela `always-on-top` + click-through
- `electron-builder` → `FatBull-Racing-Setup-x.y.z.exe`

Isso **não roda neste ambiente Linux** e ainda não está neste repositório.

Enquanto o `.exe` não existe, o jeito certo de “ver o que melhorar” é:

1. Rodar `npm run dev` no PC
2. Usar o Estúdio como se fosse o overlay
3. Abrir o iRacing em **janela sem borda** numa tela e o browser na outra, para sentir tamanho/posição
4. Anotar e ir commitando

Quando formos gerar o app Windows, ele reaproveita os mesmos widgets (`OverlayPreview`) e o mesmo `brand.json`.

---

## Problemas comuns

**`npm` não é reconhecido** — reinstale o Node marcando “Add to PATH”, feche o terminal e abra de novo.

**Push recusado** — `git pull origin main --rebase` e depois `git push`.

**Site no GitHub Pages em branco** — falta o `base: "/nome-do-repo/"` no `vite.config.ts`, ou use Netlify.

**SmartScreen / antivírus** — só entra na história quando houver `.exe` assinado.
