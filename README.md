# FATBULL Racing — site do FATBULL OVERLAY

Atualização visual feita sobre `fatbull-racing-site-main(1).zip`, enviado pelo usuário com a logo corrigida. Mantém React, TypeScript, Vite, a organização por componentes e o download automático. **PNG e SVG da logo foram preservados byte a byte.**

## Visual atualizado

Referência visual: [OriginKit](https://www.originkit.dev/), especialmente superfícies escuras, cartões arredondados, profundidade e luz ambiente. Os efeitos foram implementados no próprio projeto, sem copiar componentes, imagens ou código da biblioteca e sem acrescentar dependências.

- Abertura centralizada com captura real do overlay.
- Galeria com navegação lateral e estados de imagem indisponível.
- Cartões com realce e movimento suave ao passar o mouse.
- Seletor ilustrativo de uma, duas ou três telas.
- Botão para pausar efeitos e suporte à preferência de movimento reduzido.
- Menu, instalação, download e changelog redesenhados.

Esta entrega não foi enviada ao GitHub nem à Vercel. O usuário fará o commit.

## Executar e conferir

Requer Node.js 24 e npm.

```sh
npm ci
npm test
npm run build
npm run preview
```

Para desenvolver: `npm run dev`. Para os testes de interface: `npm run test:browser`, após o build. Eles usam Google Chrome instalado; alternativamente instale o Chromium do Playwright e execute com `BROWSER_CHANNEL=chromium` no ambiente. O teste inicia e encerra seu próprio servidor local e não baixa instaladores reais.

## O que foi implementado

- Seção `#overlays`, galeria com capturas reais da interface e indicação explícita de dados simulados.
- Recursos documentados no aplicativo local, multimonitor, atalhos, instalação e perguntas frequentes.
- Download da release estável indicada como **Latest pelo GitHub**, consultado novamente no clique.
- Versão, data, tamanho e changelog fornecidos pela API, sem versões promocionais fixas.
- Mensagens para ausência de configuração, ausência de release estável, repositório indisponível, limite de consultas, falhas de rede, instalador ausente e seleção ambígua.
- Menu responsivo, navegação por teclado, foco visível, link para pular conteúdo e respeito à preferência por movimento reduzido.

As antigas telas fictícias, depoimentos, métricas de desempenho, roadmap e versões de demonstração foram retirados. O site não promete recursos sem base na documentação local.

## Configuração dos downloads

Edite `src/data/download.ts` ou copie `.env.example` para `.env.local`. Os valores padrão foram encontrados em `build.publish` do projeto Electron local e conferidos na API pública:

```dotenv
VITE_GITHUB_OWNER=ademirrodrigues46-lang
VITE_GITHUB_REPO=fatbull-overlay-releases
VITE_GITHUB_ASSET_PREFIX=FATBULL-Overlay-
VITE_GITHUB_ASSET_SUFFIX=-Windows-x64.exe
```

Esses valores são públicos. **Não coloque um token GitHub em uma variável VITE_.** O site usa a API pública sem autenticação. Um valor vazio de owner, repo, prefixo ou sufixo desabilita o download com mensagem clara.

O código usa `GET /repos/{owner}/{repo}/releases/latest`, sem ordenar versões como strings e sem montar um endereço de EXE. O botão só aceita exatamente um asset enviado, de tamanho positivo, cujo nome tenha o prefixo e sufixo configurados e termine em `.exe`. O endereço vem de `browser_download_url`, validado como HTTPS no repositório esperado. Se a release mais recente ainda não tiver instalador, o site **não baixa uma versão anterior silenciosamente**.

A consulta ocorre ao abrir a página, a cada cinco minutos enquanto ela estiver visível, ao usar “Verificar novamente” e novamente ao clicar em baixar. O GitHub decide qual é a release Latest; isso não é uma busca por maior número de versão. Rascunhos e pré-lançamentos são rejeitados. O histórico mostra até seis releases estáveis entre as vinte publicações consultadas, com link para o histórico completo.

As notas são renderizadas como texto, preservando quebras de linha e sem executar HTML. Marcações Markdown das notas continuam visíveis; a release original oferece a apresentação completa.

## Publicação

Veja [docs/DEPLOY.md](docs/DEPLOY.md). A configuração Vercel está em `vercel.json`.

Não é necessário publicar novamente o site a cada versão do aplicativo. Basta publicar a release no repositório configurado, anexar o instalador compatível e defini-la como Latest. Mudanças nas variáveis de ambiente exigem um novo deploy do site.

## Imagens e conteúdo

Veja [docs/ASSETS.md](docs/ASSETS.md) para origem, limitações e substituição das capturas. As imagens mostram a interface real em modo de prévia; não são prova de uma sessão ao vivo ou de validação no simulador.

## Estrutura

- `src/components/`: seções do site original reformuladas.
- `src/lib/releases.ts`: validação da API, seleção do instalador e estados.
- `src/lib/useReleases.ts`: consulta, atualização periódica e revalidação no clique.
- `src/data/download.ts`: configuração pública.
- `public/images/`: identidade e capturas.
- `tests/`: testes da integração e do navegador.
- `docs/`: publicação, procedência dos arquivos e verificação.

A versão de `package.json` é a versão interna do site herdada do ZIP; não é usada como versão do aplicativo.

