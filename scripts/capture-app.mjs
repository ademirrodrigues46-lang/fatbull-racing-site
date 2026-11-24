import { chromium } from 'playwright';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const browser = await chromium.launch({channel:'chrome',headless:true});
try {
 const page = await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
 await page.goto(pathToFileURL(path.resolve('../fatbull-overlay/web/index.html')).href);
 await page.waitForSelector('.srow');
 await page.evaluate(() => document.fonts.ready);
 await page.screenshot({path:'public/images/overlay-panel.png'});
 console.log('Captura do painel real salva, com a prévia simulada identificada.');
} finally { await browser.close(); }
