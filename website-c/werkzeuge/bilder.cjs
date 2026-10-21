#!/usr/bin/env node
/* Rechnet die Bilder für den Start mit Playwright (Chromium), ohne Netz:
     favicon-32.png, apple-touch-icon.png (180 px), icon-512.png   aus favicon.svg (das schreibt werkzeuge/favicon.py)
     bilder/vorschau.jpg                                           Vorschaubild für Verweise (Open Graph), 1200 × 630, aus
                                                                   werkzeuge/vorschaubild.html, JPEG unter 300 KB
   Aufruf (aus einem beliebigen Ordner):
     python3 website-c/werkzeuge/favicon.py
     node website-c/werkzeuge/bilder.cjs
   Die Dateien kommen aus website-c/ über eine erfundene Adresse (http://vorlage.lokal/), die nur in diesem Browser gilt. Jede
   andere Anfrage bricht ab, damit das Bild nichts von außen enthält. */
'use strict';
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const QUELLE = path.resolve(__dirname, '..');
const BASIS = 'http://vorlage.lokal/';
const ARTEN = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.css': 'text/css; charset=utf-8' };
const ICONS = [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-512.png', 512]];
const HOECHSTENS = 300 * 1024;

async function bereitstellen(kontext) {
  await kontext.route('**/*', route => {
    const url = route.request().url();
    if (!url.startsWith(BASIS)) return route.abort();
    const datei = path.join(QUELLE, decodeURIComponent(new URL(url).pathname));
    if (!datei.startsWith(QUELLE + path.sep) || !fs.existsSync(datei)) return route.fulfill({ status: 404, body: '' });
    return route.fulfill({ status: 200, body: fs.readFileSync(datei), headers: { 'content-type': ARTEN[path.extname(datei)] || 'application/octet-stream' } });
  });
}

(async () => {
  const browser = await chromium.launch();
  try {
    // Die Icons: das SVG bildschirmfüllend, ohne Rand, mit Pixeldichte 1
    for (const [name, groesse] of ICONS) {
      const kontext = await browser.newContext({ viewport: { width: groesse, height: groesse }, deviceScaleFactor: 1 });
      await bereitstellen(kontext);
      const seite = await kontext.newPage();
      await seite.setContent(`<!doctype html><html><body style="margin:0;background:#FFFEFC"><img src="${BASIS}favicon.svg" width="${groesse}" height="${groesse}" style="display:block"></body></html>`);
      await seite.waitForFunction(() => document.images[0].complete && document.images[0].naturalWidth > 0);
      await seite.screenshot({ path: path.join(QUELLE, name), type: 'png', omitBackground: false });
      console.log(`${name}: ${groesse} × ${groesse}, ${fs.statSync(path.join(QUELLE, name)).size} Bytes`);
      await kontext.close();
    }

    // Das Vorschaubild
    const kontext = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, locale: 'de-DE' });
    await bereitstellen(kontext);
    const seite = await kontext.newPage();
    const fehler = [];
    seite.on('pageerror', e => fehler.push(e.message));
    seite.on('console', m => { if (m.type() === 'error') fehler.push(m.text()); });
    await seite.goto(BASIS + 'werkzeuge/vorschaubild.html', { waitUntil: 'load' });
    await seite.waitForSelector('body[data-fertig]', { timeout: 20000 });
    if (fehler.length) throw new Error('Vorlage: ' + fehler.join(' | '));
    const ziel = path.join(QUELLE, 'bilder', 'vorschau.jpg');
    let qualitaet = 90;
    for (;;) {
      await seite.screenshot({ path: ziel, type: 'jpeg', quality: qualitaet });
      const groesse = fs.statSync(ziel).size;
      if (groesse < HOECHSTENS || qualitaet <= 60) {
        if (groesse >= HOECHSTENS) throw new Error(`bilder/vorschau.jpg ist auch mit Qualität ${qualitaet} ${groesse} Bytes groß`);
        console.log(`bilder/vorschau.jpg: 1200 × 630, JPEG Qualität ${qualitaet}, ${(groesse / 1024).toFixed(1)} KB`);
        break;
      }
      qualitaet -= 5;
    }
    await kontext.close();
  } finally {
    await browser.close();
  }
})().catch(e => { console.error('bilder.cjs: ' + e.message); process.exit(1); });
