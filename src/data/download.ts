// Confirmado no build.publish do aplicativo local. Valores vazios desativam a integração.
export const downloadConfig = {
  owner: import.meta.env.VITE_GITHUB_OWNER ?? 'ademirrodrigues46-lang',
  repo: import.meta.env.VITE_GITHUB_REPO ?? 'fatbull-overlay-releases',
  assetPrefix: import.meta.env.VITE_GITHUB_ASSET_PREFIX ?? 'FATBULL-Overlay-',
  assetSuffix: import.meta.env.VITE_GITHUB_ASSET_SUFFIX ?? '-Windows-x64.exe',
};
