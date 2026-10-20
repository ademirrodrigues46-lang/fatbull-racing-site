# Changelog

Formato seguindo Keep a Changelog; versões seguem SemVer.
O texto abaixo é o mesmo exibido em `src/data/releases.ts` e na central de download.

## [2.4.1] — 2026-02-18 (stable)

### Added
- Standings V2 com intervalo por classe e destaque de volta mais rápida.
- Radar de proximidade com detecção de overlap em pelotões densos.
- Site: Estúdio de layout interativo (widgets, cor de destaque, escala, opacidade).
- Site: seção **Publicação & atualizações** com canais, changelog filtrável e checklist.

### Changed
- Inicialização do overlay 34% mais rápida (cache de mapas de pista em disco).
- Documentação embutida reorganizada em tópicos com busca.

## [2.4.0] — 2026-02-02 (stable)

### Added
- Editor visual com snap de 8 px e prévia instantânea.
- Perfis vinculados a carro, pista ou tipo de sessão.
- Browser Source por camada para OBS (`http://127.0.0.1:8472/overlay/<widget>`).

### Fixed
- Overlay oculto ao alternar entre monitores com resoluções diferentes.
- Cálculo de combustível ignorando volta de instalação na pit lane.

## [2.5.0-beta.3] — 2026-02-20 (beta)

### Added
- Widget de pneus: temperatura por roda e degradação estimada.
- Alertas de economia de combustível com alvo configurável.
- Tema de alto contraste para transmissão noturna.

## [2.6.0-canary.7] — 2026-02-21 (canary)

### Added
- Prévia do modo espectador com dados do teammate.
- Experimento de janela em fullscreen exclusivo.

> Canary é compilado automaticamente a cada commit. Não instale em máquina de corrida.
