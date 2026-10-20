# FatBull Racing Overlay — site e Estúdio

Site institucional + editor de overlay do **FatBull Racing** para iRacing
(standings, relativos, combustível, mapa, radar e delta).

> **Estado atual:** este repositório é um **site React/Vite**. Roda no navegador.
> Ainda **não há instalador `.exe`** que se sobreponha ao iRacing.
> Para testar no PC: `npm run dev` → http://localhost:5173

**Guia completo (GitHub, Netlify, ciclo de alteração):** [`docs/COMECE-AQUI.md`](docs/COMECE-AQUI.md)

## Rodar no PC

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # gera dist/index.html (arquivo único)
npm run preview      # serve o build
```

## Subir no GitHub (resumo)

```bash
git init -b main
git add .
git commit -m "feat: primeira versão FatBull Racing Overlay"
git remote add origin https://github.com/SEU_USUARIO/fatbull-racing-overlay.git
git push -u origin main
```

Depois ligue o repo no [Netlify](https://app.netlify.com) (build `npm run build`, pasta `dist`)
ou ative **Settings → Pages → GitHub Actions**.

## Onde editar

| Quero mudar | Arquivo |
| --- | --- |
| Nome, logo, cores | `src/data/brand.ts` |
| Widgets / preview | `src/components/OverlayPreview.tsx` |
| Estúdio | `src/components/Studio.tsx` |
| Docs | `src/components/DocsModal.tsx` |
| Versões | `src/data/releases.ts` |

Projeto independente, não afiliado à iRacing.com Motorsport Simulations, LLC.
