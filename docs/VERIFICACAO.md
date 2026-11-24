# Verificação da entrega

Concluída em 24/11/2026.

## Build

`npm run build` aprovado, incluindo a verificação de tipos TypeScript e o build Vite. Saída em `dist/`.

## Integração de releases

`npm test`: 12 testes aprovados. Cobertura de seleção do asset real, configuração inválida, instalador ausente, arquitetura diferente, múltiplos assets, ausência de releases, repositório indisponível, limite da API, falha de rede/timeout, dados inválidos, rejeição de drafts/prereleases e validação dos URLs.

## Navegador

`npm run test:browser`: 16 verificações aprovadas com Google Chrome em modo automatizado. Foram verificados galeria, imagens, logo, âncoras, FAQ, acesso por teclado, menu móvel e recuperação após falha.

Larguras conferidas sem rolagem horizontal: 320, 375, 390, 768, 1024 e 1440 pixels.

O teste de download simulou uma publicação ocorrida depois de abrir a página: a consulta inicial retornou uma versão e o clique obteve a seguinte, usando seu URL real retornado pela resposta de teste. Foi transferido somente um pequeno arquivo de teste, não o instalador do aplicativo.

## Consulta real

O script `scripts/verify-live.mjs` consultou a API pública e abriu o build em um navegador sem respostas simuladas. A conferência confirmou:

- Release Latest: v0.2.15.
- Asset: FATBULL-Overlay-0.2.15-Windows-x64.exe.
- Tamanho: 131804388 bytes (125,7 MB na interface).
- Histórico: seis releases exibidas.
- Versão, nome do arquivo e notas no site iguais aos retornados pela API.
- Nenhum erro de execução JavaScript observado.

Essa versão é uma observação da data de verificação, não um valor fixo de produção. Não foi executado o instalador nem validado o aplicativo dentro do iRacing.

## Logo

Comparação SHA-256 entre o PNG dentro do ZIP original e o PNG entregue: idênticos.

`737D38DE3BE19ED8377744B10924B2B11C248D78330326047FBD7DB3C34A5B0E`

## Limites

O deploy na Vercel ainda não foi realizado. Os screenshots mostram a interface real do aplicativo com dados de demonstração, conforme identificado no site. A disponibilidade de downloads depende do repositório público e da API do GitHub; o site apresenta estados explícitos de indisponibilidade.
