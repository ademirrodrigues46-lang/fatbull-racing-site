# Identidade e capturas

## Logo original preservada

`public/images/fat-bull-racing-logo.png` veio do ZIP original e foi mantida byte a byte, sem recorte, redesenho, recoloração ou remoção de fundo. É utilizada no cabeçalho, rodapé e favicon.

Os outros arquivos originais de identidade continuam em `public/images`, mas não substituem a logo PNG na página. O quadrículado que aparece no PNG pertence ao arquivo fornecido; ele não foi alterado.

A paleta deriva do branding original: vermelho #E51124, marinho #080E1B, dourado #FFB800 e branco #F4F7FC.

## Imagem de cockpit

`public/images/cockpit-night.jpg` veio do ZIP original. O hero a identifica como imagem de cockpit do projeto. Ela é ambientação, não uma demonstração do FATBULL sobre o jogo.

## Capturas reais da interface

- `overlay-panel.png`: capturada do arquivo local `fatbull-overlay/web/index.html`, em 1440 × 900, no modo de prévia. O painel informa “Prévia com dados simulados · ponte desligada”. Nenhum widget foi desenhado para o site.
- `overlay-widgets.png`: cópia integral da imagem local `Atualizacoes-0.2.15.png`. A origem foi confirmada no script local `.build/updates-preview.html`, que renderiza os widgets do próprio aplicativo com dados simulados.

A galeria identifica explicitamente os dados simulados. Não foram encontradas capturas de uma sessão real do iRacing nesta base. É possível substituir os arquivos por capturas feitas durante uma sessão autorizada; ajuste a descrição da galeria se elas deixarem de mostrar dados de demonstração.

O desenho de três monitores é um **diagrama ilustrativo**, identificado como tal, e não uma tela do aplicativo.

O script `scripts/capture-app.mjs` permite repetir a captura se a pasta do aplicativo estiver ao lado da pasta do site. Ele é uma ferramenta local opcional; não faz parte do build ou do deploy.

## Evidências de conteúdo

Os recursos e atalhos foram confrontados com `fatbull-overlay/LEIA-ME.md`, a interface local e a configuração de publicação do Electron. Não foi necessário inventar um repositório: `build.publish` indica `ademirrodrigues46-lang/fatbull-overlay-releases`.

A consulta pública confirmou a release v0.2.15 com o asset `FATBULL-Overlay-0.2.15-Windows-x64.exe`, de 131804388 bytes, publicado em 21/11/2026. Essa versão não foi fixada no código de produção. As notas da release informam que a validação em sessões reais do iRacing segue pendente; o site não afirma que essa validação foi realizada.

