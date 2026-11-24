# Verificação da atualização visual

## Build

`npm run build` aprovado, incluindo TypeScript e Vite. Saída pronta em `dist/`.

## Downloads

`npm test`: 12 testes aprovados. A lógica de GitHub Releases, seleção do instalador, revalidação no clique e tratamento de erros foi preservada.

## Navegador

`npm run test:browser`: 18 verificações aprovadas no Google Chrome.

- Versão, tamanho e changelog renderizados; notas não executam HTML.
- Navegação por âncoras, galeria, imagens, logo e perguntas frequentes.
- Seletor demonstrativo de uma, duas e três telas.
- Botão de pausa e respeito à preferência de movimento reduzido.
- Larguras 320, 375, 390, 768, 1024 e 1440 pixels sem rolagem horizontal.
- Menu móvel e acesso por teclado.
- Estados de ausência de release, limite da API, falha de rede, instalador ausente ou ambíguo.
- Falha do histórico não impede um download válido.
- Nova versão publicada depois da abertura é consultada no clique.
- Recuperação por verificação manual e placeholder para captura indisponível.

As respostas do GitHub nos testes de navegador são controladas para reproduzir esses estados. Nenhum instalador real foi baixado. A integração já havia sido conferida com a API real na entrega anterior; esta atualização visual não mudou essa integração.

## Integridade da logo

PNG e SVG comparados byte a byte com os arquivos do ZIP atualizado: idênticos. Os hashes estão em `docs/ASSETS.md`.

## Entrega

Não houve commit no GitHub nem publicação na Vercel nesta atualização. O usuário fará o envio. O ZIP inclui código, build, testes e instruções.
