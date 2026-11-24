# Identidade e imagens

Esta atualização usa `fatbull-racing-site-main(1).zip` enviado pelo usuário, com os dois arquivos de logo já corrigidos.

## Logos preservadas

- `public/images/fat-bull-racing-logo.png`: imagem original corrigida, sem recorte, recoloração ou redesenho. Usada no cabeçalho, rodapé e favicon.
- `public/images/fat-bull-racing.svg`: SVG com a imagem PNG incorporada, mantido exatamente como recebido.

Os dois arquivos foram comparados byte a byte com os do ZIP atualizado e são idênticos.

SHA-256 do PNG: `24928916e11fb9d51e6da4c80ed73fbe0c13a42e87df4639da6015458d30ff91`

SHA-256 do SVG: `18f113f130434d52466449c620c2929b670ec5fad5bfcacd6cc7fdbfac8a040e`

## Capturas do aplicativo

- `overlay-panel.png`: captura existente do painel real do FATBULL, com a indicação de prévia com dados simulados.
- `overlay-widgets.png`: captura existente dos widgets Classificação, Pit Box, GAP de retorno e Radar, com dados de demonstração.

As capturas não foram alteradas. As legendas continuam identificando os dados simulados. Não são imagens de uma sessão real do iRacing.

O seletor de monitores é uma ilustração de distribuição de widgets, explicitamente identificada como ilustrativa. Ele não configura o aplicativo instalado.

## Referência visual

[OriginKit](https://www.originkit.dev/) foi consultado como referência de superfícies escuras, cartões, profundidade e luz ambiente; também foi observado o efeito [Ribbon Glow](https://www.originkit.dev/components/ribbon-glow). Nenhum código, imagem ou componente do OriginKit foi copiado para esta entrega. Os efeitos decorativos são CSS e SVG próprios do site, sem novas dependências.
