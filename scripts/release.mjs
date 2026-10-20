#!/usr/bin/env node
/**
 * RacePulse — trilha de publicação do site.
 *
 * O que este script faz, em ordem:
 *   1. roda `vite build` (gera dist/index.html, um arquivo único);
 *   2. calcula o SHA-256 do build publicado;
 *   3. escreve dist/release.json com versão, data, hash e tamanho;
 *   4. imprime o próximo comando de deploy conforme o host escolhido.
 *
 * Uso:
 *   npm run release:site
 *   npm run release:site -- --channel beta --version 2.5.0-beta.4
 */
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(new URL("..", import.meta.url).pathname);
const dist = join(root, "dist");

function arg(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  return index > -1 ? process.argv[index + 1] : fallback;
}

const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const version = arg("version", pkg.version);
const channel = arg("channel", "stable");

console.log("\n\u001b[1mRacePulse · publicando site\u001b[0m");
console.log(`canal ${channel} · versão ${version}\n`);

const build = spawnSync("npx", ["vite", "build"], { cwd: root, stdio: "inherit" });
if (build.status !== 0) {
  console.error("\nBuild falhou. Corrija os erros acima antes de publicar.\n");
  process.exit(build.status ?? 1);
}

if (!existsSync(join(dist, "index.html"))) {
  console.error("\nDist não encontrado. Rode `npm run build` manualmente.\n");
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const files = walk(dist);
const hash = createHash("sha256");
for (const file of files) hash.update(readFileSync(file));
const sha256 = hash.digest("hex");
const bytes = files.reduce((total, file) => total + statSync(file).size, 0);

const manifest = {
  product: "RacePulse Overlay — site institucional",
  version,
  channel,
  sha256,
  files: files.length,
  sizeBytes: bytes,
  sizeMb: Number((bytes / 1024 / 1024).toFixed(2)),
  publishedAt: new Date().toISOString(),
};

writeFileSync(join(dist, "release.json"), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`\ndist/ pronto · ${manifest.sizeMb} MB · ${files.length} arquivo(s)`);
console.log(`SHA-256: ${sha256}`);
console.log(
  [
    "git add . && git commit -m \"release(site): v" + version + "\" && git push origin main   # CI publica",
  ].join("\n")
);
console.log(`\ndeploy manual: npx wrangler pages deploy dist --project-name racepulse`);
console.log("reversão: escolha a última implantação no painel do host, ou `git revert` + push.\n");
