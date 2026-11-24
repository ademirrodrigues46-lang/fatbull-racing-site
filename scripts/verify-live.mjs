import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { loadLatest, loadHistory } from '../src/lib/releases.ts';
const config = { owner: 'ademirrodrigues46-lang', repo: 'fatbull-overlay-releases', assetPrefix: 'FATBULL-Overlay-', assetSuffix: '-Windows-x64.exe' };
const result = await loadLatest(config);
assert.equal(result.status, 'ready', JSON.stringify(result));
const history = await loadHistory(config);
console.log(JSON.stringify({ version: result.latest.version, asset: result.asset.name, size: result.asset.size, url: result.asset.url, history: history.length }, null, 2));
const port = 4175;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { windowsHide: true, stdio: 'ignore' });
let browser;
try {
  for(let i = 0; i < 60; i++) {
    if(server.exitCode !== null) throw new Error('Falha no servidor local');
    try { if((await fetch(`http://127.0.0.1:${port}`)).ok) break; } catch {}
    if(i === 59) throw new Error('Servidor local indisponível');
    await new Promise(r => setTimeout(r, 200));
  }
  browser = await chromium.launch({channel: 'chrome', headless: true});
  const page = await browser.newPage({viewport: {width: 1440, height: 1000}, reducedMotion: 'reduce'});
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${port}`, {waitUntil: 'networkidle'});
  await page.locator('.download-button:not([disabled])').waitFor();
  assert.equal(await page.locator('.release-version').textContent(), result.latest.version);
  assert.equal(await page.locator('.asset-name').textContent(), result.asset.name);
  await page.locator('.release-notes').first().waitFor();
  assert.equal(await page.locator('.release-notes').first().textContent(), result.latest.notes);
  await page.evaluate(async () => { for (const img of document.images) { img.loading = 'eager'; if(!img.complete) await new Promise(r => {img.onload = r; img.onerror = r;}); } await document.fonts.ready; });
  assert.deepEqual(errors, []);
  await mkdir('qa', {recursive: true});
  await page.screenshot({path: 'qa/site-final-desktop.png', fullPage: true});
  await page.screenshot({path: 'qa/previa-site.png'});
  await page.setViewportSize({width: 390, height: 844});
  await page.screenshot({path: 'qa/site-final-mobile.png', fullPage: true});
  const report = {checkedAt: new Date().toISOString(), version: result.latest.version, asset: result.asset, historyCount: history.length, browserErrors: errors};
  await writeFile('qa/live-release-check.json', JSON.stringify(report, null, 2));
  console.log('API real e navegador sem mocks: versão, arquivo e notas conferidos. Nenhum instalador baixado.');
} finally { await browser?.close(); server.kill(); }
