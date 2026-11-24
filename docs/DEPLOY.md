# Publicar o FATBULL Racing na Vercel

## 1. Preparar o código

Extraia o ZIP entregue e abra a pasta `fatbull-racing-site-main`. Ela contém o `package.json`, o `index.html` e o `vercel.json`. Crie ou utilize um repositório Git para **o site** e envie o conteúdo dessa pasta. Não envie `node_modules`, arquivos `.env.local` ou a pasta `qa`.

O repositório do site pode ser diferente do repositório que hospeda os instaladores do overlay.

## 2. Importar na Vercel

No painel Vercel, crie um projeto e importe o repositório do site. Se você já tem o projeto do site original, conecte a revisão atualizada ao mesmo projeto para preservar o endereço público.

Use:

| Campo | Valor |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | Pasta que contém este package.json |
| Node.js Version | 24.x |
| Install Command | npm ci |
| Build Command | npm run build |
| Output Directory | dist |

Se a pasta do projeto estiver dentro de outro repositório, use `fatbull-racing-site-main` como Root Directory. Se o conteúdo dela estiver na raiz do repositório, use a raiz.

`vercel.json` já define framework, instalação, build e saída. O site é estático e não precisa de servidor Node em produção nem de regras para uma SPA com rotas: a navegação usa âncoras da mesma página.

## 3. Conferir o repositório de releases

Os valores padrão já apontam para o repositório encontrado no aplicativo local:

```dotenv
VITE_GITHUB_OWNER=ademirrodrigues46-lang
VITE_GITHUB_REPO=fatbull-overlay-releases
VITE_GITHUB_ASSET_PREFIX=FATBULL-Overlay-
VITE_GITHUB_ASSET_SUFFIX=-Windows-x64.exe
```

Para trocar, informe essas variáveis em Settings → Environment Variables na Vercel. Aplique a Production e, se desejar testar, a Preview. Faça um novo deploy após alterar valores. Não use tokens privados em variáveis com prefixo `VITE_`.

O repositório de instaladores deve ser público. A API sem autenticação está sujeita ao limite por endereço IP do GitHub; nesse caso o site exibe uma mensagem e mantém um link para as releases. Não há cache persistente ou fallback para uma versão possivelmente antiga.

## 4. Verificar o Preview e publicar

1. Confira a logo e a galeria.
2. Abra `/#overlays`, `/#download`, `/#instalacao` e `/#changelog`.
3. Confira se versão, nome e tamanho do instalador correspondem à release Latest no GitHub.
4. Verifique o menu em um celular.
5. Publique/promova o deploy aprovado para Production.

O endereço antigo informado na conversa usava um domínio de deployment. Para divulgar, prefira o domínio estável de Production mostrado pela Vercel. Se visitantes forem redirecionados para login, revise Deployment Protection no projeto e libere o domínio de produção conforme a sua intenção de tornar o site público.

Este trabalho entrega o código e o build local. Não executa nem presume a publicação na sua conta Vercel.

## 5. Publicar próximas versões do aplicativo

No repositório de releases, prepare a nova release, anexe o instalador real compatível com a configuração e só então publique. Marque a release estável desejada como Latest. Não marque como prerelease se ela deve aparecer no botão principal.

O site vai obter a nova versão sem novo deploy. Para o atualizador interno do aplicativo, siga também as instruções do projeto Electron sobre `latest.yml` e `.blockmap`; esses arquivos não são tratados como instaladores pelo site.

Se houver mais de um EXE compatível, o download automático fica indisponível e a página orienta a escolher o arquivo na release. Ajuste prefixo/sufixo ou publique somente um instalador correspondente.

## Referências

- [Vercel: configuração do build](https://vercel.com/docs/builds/configure-a-build)
- [GitHub: API de releases](https://docs.github.com/en/rest/releases/releases#get-the-latest-release)

