import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const port = Number(process.env.TEST_PORT || 4173);
const origin = `http://127.0.0.1:${port}`;
const api = 'https://api.github.com/repos/ademirrodrigues46-lang/fatbull-overlay-releases';
const repo = 'https://github.com/ademirrodrigues46-lang/fatbull-overlay-releases';
const fixture = (version = 'v0.2.15') => ({
  tag_name: version, name: `FATBULL Overlay ${version}`, draft: false, prerelease: false,
  published_at: '2026-11-21T20:12:40Z', html_url: `${repo}/releases/tag/${version}`,
  body: 'Notas controladas do teste de interface.\n<script>window.__injected = true</script>',
  assets: [{ name: `FATBULL-Overlay-${version.slice(1)}-Windows-x64.exe`, state: 'uploaded', size: 131804388,
    browser_download_url: `${repo}/releases/download/${version}/FATBULL-Overlay-${version.slice(1)}-Windows-x64.exe` }],
});
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
let serverOutput = '';
server.stdout.on('data', b => serverOutput += b);
server.stderr.on('data', b => serverOutput += b);
let browser;
let passed = 0;
const check = name => { passed++; console.log(`OK ${passed}: ${name}`); };
const fulfill = (route, body, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body), headers: { 'Access-Control-Allow-Origin': '*' } });
async function openCase(latestHandler, historyHandler) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', acceptDownloads: true });
  const page = await context.newPage();
  await page.route(api + '**', route => {
    const url = route.request().url();
    if (url.endsWith('/releases/latest')) return latestHandler(route);
    if (url.includes('/releases?')) return historyHandler ? historyHandler(route) : fulfill(route, [fixture()]);
    return fulfill(route, { name: 'fatbull-overlay-releases' });
  });
  await page.goto(origin);
  return { context, page };
}
async function ensureNoOverflow(page, width) {
  await page.setViewportSize({ width, height: 1000 });
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `overflow em ${width}px`);
}
try {
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw new Error('Servidor não iniciou: ' + serverOutput);
    try { if ((await fetch(origin)).ok) break; } catch {}
    if (i === 99) throw new Error('Timeout iniciando servidor');
    await new Promise(r => setTimeout(r, 100));
  }
  await mkdir('qa', { recursive: true });
  browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL === 'chromium' ? undefined : process.env.BROWSER_CHANNEL || 'chrome', headless: true });
  const { context, page } = await openCase(route => fulfill(route, fixture()));
  const runtimeErrors = [];
  page.on('pageerror', error => runtimeErrors.push(error.message));
  await page.locator('.download-button:not([disabled])').waitFor();
  assert.equal(await page.locator('.release-version').textContent(), 'v0.2.15');
  assert.match(await page.locator('.release-meta').innerText(), /125,7 MB/);
  assert.match(await page.locator('.release-notes').first().innerText(), /<script>/);
  assert.equal(await page.evaluate(() => window.__injected), undefined);
  check('versão, tamanho e changelog renderizados; notas não executam HTML');
  for (const id of ['overlays', 'recursos', 'multimonitor', 'download', 'instalacao', 'changelog']) assert.equal(await page.locator('#' + id).count(), 1);
  await page.locator('.nav a[href="#overlays"]').click();
  assert.equal(new URL(page.url()).hash, '#overlays');
  check('âncoras e navegação da seção overlays');
  await page.getByRole('button', { name: 'Widgets de corrida', exact: true }).click();
  assert.match(await page.locator('.gallery-image img').getAttribute('src'), /overlay-widgets/);
  await page.getByRole('button', { name: 'Painel de configuração', exact: true }).click();
  for (const img of await page.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(el => el.complete ? Promise.resolve() : new Promise(r => { el.onload = r; el.onerror = r; }));
    assert.equal(await img.evaluate(el => el.naturalWidth > 0), true);
  }
  assert.equal(await page.locator('.brand img').first().getAttribute('src'), '/images/fat-bull-racing-logo.png');
  check('galeria alterna capturas e imagens carregam com a logo original');
  await page.getByText('Como atualizar o aplicativo?', { exact: true }).click();
  assert.equal(await page.locator('.faq details').nth(1).getAttribute('open'), '');
  check('perguntas frequentes expandem');
  for (const width of [320, 375, 390, 768, 1024, 1440]) await ensureNoOverflow(page, width);
  await page.goto(origin);
  await page.locator('.download-button:not([disabled])').waitFor();
  await page.screenshot({ path: 'qa/desktop.png', fullPage: true });
  await page.screenshot({ path: 'qa/hero-desktop.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'qa/mobile.png', fullPage: true });
  await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Fechar menu', exact: true }).getAttribute('aria-expanded'), 'true');
  await page.locator('.nav a[href="#instalacao"]').click();
  assert.equal(new URL(page.url()).hash, '#instalacao');
  assert.equal(await page.getByRole('button', { name: 'Abrir menu', exact: true }).getAttribute('aria-expanded'), 'false');
  check('seis larguras sem rolagem horizontal; menu móvel funcional');
  await page.goto(origin);
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement?.textContent), 'Pular para o conteúdo');
  await page.keyboard.press('Enter');
  assert.equal(new URL(page.url()).hash, '#conteudo');
  assert.deepEqual(runtimeErrors, []);
  check('acesso por teclado e ausência de erros de execução');
  await context.close();

  const cases = [
    ['empty', (route) => fulfill(route, {}, 404), /Ainda não há uma versão pública estável/],
    ['rate', (route) => fulfill(route, {}, 429), /GitHub limitou as consultas/],
    ['server', (route) => fulfill(route, {}, 503), /Não foi possível consultar o GitHub/],
    ['offline', (route) => route.abort('internetdisconnected'), /Não foi possível consultar o GitHub/],
    ['no-asset', (route) => fulfill(route, { ...fixture(), assets: [] }), /ainda não tem um instalador/],
    ['ambiguous', (route) => { const f = fixture(); f.assets.push({ ...f.assets[0], name: 'FATBULL-Overlay-Outro-Windows-x64.exe' }); return fulfill(route, f); }, /mais de um instalador/],
  ];
  for (const [name, handler, pattern] of cases) {
    const c = await openCase(handler);
    await c.page.waitForFunction(() => !document.querySelector('.download-status')?.textContent?.includes('Consultando'));
    assert.match(await c.page.locator('.download-status').innerText(), pattern);
    assert.equal(await c.page.locator('.download-button').isDisabled(), true);
    assert.equal(await c.page.locator('.download-links a').getAttribute('href') !== '', true);
    await c.context.close();
    check('estado ' + name + ' impede download e oferece alternativa');
  }
  const historyFailure = await openCase(route => fulfill(route, fixture()), route => fulfill(route, {}, 503));
  await historyFailure.page.getByText('A versão atual foi encontrada, mas', { exact: false }).waitFor();
  assert.equal(await historyFailure.page.locator('.download-button').isEnabled(), true);
  await historyFailure.context.close();
  check('falha do histórico preserva download válido da versão atual');

  let requests = 0;
  const newer = await openCase(route => fulfill(route, fixture(++requests === 1 ? 'v0.2.15' : 'v0.2.16')));
  await newer.page.route(repo + '/releases/download/**', route => route.fulfill({ status: 200, headers: { 'Content-Disposition': 'attachment; filename="test-download.txt"' }, contentType: 'application/octet-stream', body: 'Arquivo de teste; nenhum instalador real.' }));
  await newer.page.locator('.download-button:not([disabled])').waitFor();
  const event = newer.page.waitForEvent('download');
  await newer.page.locator('.download-button').click();
  const download = await event;
  assert.match(download.url(), /v0.2.16/);
  assert.equal(requests, 2);
  await download.cancel();
  await newer.context.close();
  check('clique consulta novamente e baixa a nova versão retornada, sem URL fixa');

  let retry = 0;
  const recovery = await openCase(route => ++retry === 1 ? fulfill(route, {}, 500) : fulfill(route, fixture()));
  await recovery.page.getByText('Não foi possível consultar o GitHub.', { exact: false }).first().waitFor();
  await recovery.page.getByRole('button', { name: 'Verificar novamente' }).click();
  await recovery.page.locator('.download-button:not([disabled])').waitFor();
  await recovery.context.close();
  check('verificação manual recupera a interface após falha');

  const missingImage = await openCase(route => fulfill(route, fixture()));
  await missingImage.page.route('**/overlay-widgets.png', route => route.abort());
  await missingImage.page.getByRole('button', { name: 'Widgets de corrida', exact: true }).click();
  await missingImage.page.getByText('Captura indisponível.', { exact: true }).waitFor();
  await missingImage.context.close();
  check('imagem ausente tem placeholder honesto');
  console.log(`${passed} verificações de interface aprovadas.`);
} finally {
  await browser?.close();
  server.kill();
}
