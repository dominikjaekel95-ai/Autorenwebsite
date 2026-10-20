/* Entwurf F: gemeinsame Hilfen aller Seiten, als window.FSeite.
   Braucht globus/inhalt.js (window.INHALT). Für den Globus außerdem d3, topojson-client, daten/welt-110m.js, daten/laender-de.js,
   daten/uk-landesteile.js und globus/kern.js; für Bücher daten/buecher.js und daten/leseliste.js. Fehlt etwas (etwa ohne Netz),
   geben die Funktionen null oder leere Listen zurück, und die Seite bleibt ruhig.

   Übersicht (alles unter window.FSeite):
     SEITEN                         Dateinamen der fünf Seiten
     $(sel, wurzel), $$(sel, wurzel) querySelector, querySelectorAll als Liste
     esc(s), sauber(s)              HTML maskieren; Zeichenreste aus dem Export entfernen
     hash(s), wert(s, a, b)         fester Hash statt Zufall; Zahl zwischen a und b aus einem Text
     ruhig(), schmal(), breit()     reduzierte Bewegung; Telefonbreite (< 640 px); breites Layout mit angeschnittenem Globus
     masz(name)                    eine CSS-Länge oder Variable in Pixeln, etwa masz('--rand-l')
     zahlwort(n), gross(s), tausender(n)
     grad(x, plus, minus), koord(lat, lon)        „51° 31′ N, 7° 28′ O“
     entfernungKm(a, b), km(a, b)  Luftlinie auf 10 km gerundet (Zahl); als Text „8 190 km“. a, b: {lat, lon} oder [lon, lat]
     jahrText(j), chr(t), jahrMarke(jahr)          „um 1800 v. Chr.“; „v. Chr.“ zusammenhalten; „bis 2014“ für die Tafel
     schriften(ms)                 Promise: Vollkorn, Vollkorn kursiv und Vollkorn SC geladen (oder Zeit abgelaufen)
     satzzeichenBinden(wurzel)     Satzzeichen nach einem Knopf-Wort an das Wort binden
     FARBEN, SIENA, SIENA_EBENE   Grundfarben des Globus; Farben für Ebenen eigener Werke
     globus(opts)                  Globus mit den gemeinsamen Farben und Schriften; gibt die Maschine zurück oder null
     blickFuer(canvas, orte, bereich)  Mitte [lon, lat], bei der alle Orte im sichtbaren Teil des Globus stehen
     tafel(el, inhalt), tafelReservieren(el, inhalte), tafelPlatz(el, inhalte), stationInhalt(station, ausgang)
     stationen()                   Lebensstationen aus INHALT.leben
     ursprungOrte(), ursprungInhalt(i)   die vier Orte der Trilogie; Tafel für einen Ort (-1: die ganze Trilogie)
     karteikarte.oeffnen(inhalt, ausloeser), .schliessen(), .offen()
     buch.alle(), buch.karte(b, { person }), buch.zeile(b), buch.nachname(a), buch.titelKurz(t)
     werkKarte(id, { person })     Karteikarte für ein eigenes Werk (id aus INHALT.werke)
     navigation()                  Navigation einrichten (läuft beim Laden von selbst)
     leselinie(elemente, beiSchritt, o)   beim Scrollen: welches Element zuletzt die Leselinie erreicht hat (vor und zurück)
     fortschritt(element, beiWert, o)     beim Scrollen: wie weit ein Element durch das Fenster gewandert ist, 0 bis 1
     imBild(element, { starten, unterbrechen, fortsetzen })   eine Chronik hält an, wenn ihr Globus aus dem Bild ist
*/
(function () {
  'use strict';
  const inhalt = () => window.INHALT || {};
  const NBSP = '\u00A0', NNBSP = '\u202F';

  // Dateinamen der Seiten; die Build-Stufe macht daraus Einzeldateien mit denselben Namen
  const SEITEN = { start: 'f-start.html', satoshi: 'f-satoshi.html', ursprung: 'f-ursprung.html', bibliothek: 'f-bibliothek.html', vita: 'f-vita.html' };

  // ---------- Kleine Werkzeuge ----------
  // querySelector und querySelectorAll als Liste
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  // Reste aus dem Export entfernen: doppelt maskiertes &, Richtungszeichen
  const sauber = s => String(s == null ? '' : s).replace(/&amp;(amp;)*/g, '&').replace(/[\u200E\u200F]/g, '').trim();
  // HTML maskieren
  const esc = s => sauber(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // Feld als Text (maskiert) oder als { html } (unverändert)
  const teil = v => v == null || v === '' ? '' : typeof v === 'object' ? String(v.html || '') : esc(v);
  // Unregelmäßiges nur aus den Daten: ein fester Hash statt Zufall
  function hash(s) { let h = 2166136261 >>> 0; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h; }
  const wert = (s, a, b) => a + (hash(s) % 100003) / 100003 * (b - a);
  // Bewegung reduziert? Telefonbreite? Breites Layout mit angeschnittenem Globus?
  const ruhig = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const schmal = () => window.innerWidth < 640;
  const breit = () => window.matchMedia('(min-width: 62.0625rem)').matches;
  // Wert einer CSS-Länge in Pixeln, auch für Variablen mit clamp() oder vw: masz('--rand-l').
  // Zeile und Ränder (ohne el gemessen) gelten bis zur nächsten Größenänderung des Fensters; was eine Seite selbst setzt
  // (etwa --tafel-h), wird jedes Mal gemessen
  const maszSpeicher = new Map(), FEST = ['--z', '--rand-l', '--rand-r'];
  function masz(name, el) {
    const fest = !el && FEST.includes(name);
    if (fest && maszSpeicher.has(name)) return maszSpeicher.get(name);
    const probe = document.createElement('div');
    probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;height:0;width:' + (name.startsWith('--') ? 'var(' + name + ')' : name);
    (el || document.body).appendChild(probe);
    const w = probe.getBoundingClientRect().width;
    probe.remove();
    if (fest && w) maszSpeicher.set(name, w);
    return w;
  }
  /* --vb: die Breite des Fensters ohne Bildlaufleiste (100vw zählt eine sichtbare Leiste mit; dann wäre der Globus um ihre Breite
     stärker angeschnitten, und Navigation und Bilder stünden neben seiner wirklichen Kante). Gesetzt, bevor die Seite ihren Globus
     baut, und bei jeder Größenänderung zuerst (dieser Listener steht vor dem des Kerns). Ändert sich die Breite ohne Größenänderung
     des Fensters (die Leiste erscheint), meldet FSeite eine Größenänderung, damit Kern und Seite neu messen. */
  let vbJetzt = 0;
  function vbSetzen() {
    const w = document.documentElement.clientWidth;
    if (!w || w === vbJetzt) return false;
    vbJetzt = w;
    document.documentElement.style.setProperty('--vb', w + 'px');
    maszSpeicher.clear();
    return true;
  }
  vbSetzen();
  window.addEventListener('resize', () => { maszSpeicher.clear(); vbSetzen(); });
  if ('ResizeObserver' in window) {
    let vbUhr = 0;
    new ResizeObserver(() => {
      if (document.documentElement.clientWidth === vbJetzt) return;
      clearTimeout(vbUhr);
      vbUhr = setTimeout(() => { if (vbSetzen()) window.dispatchEvent(new Event('resize')); }, 60);
    }).observe(document.documentElement);
  }

  // ---------- Zahlen, Jahre, Koordinaten ----------
  const EINER = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'];
  const ZEHNER = ['', 'zehn', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
  const EIGEN = { 0: 'null', 1: 'eins', 11: 'elf', 12: 'zwölf', 16: 'sechzehn', 17: 'siebzehn' };
  // Zahl als deutsches Wort bis 99, darüber als Ziffern
  function zahlwort(n) {
    if (EIGEN[n]) return EIGEN[n];
    if (n < 10) return EINER[n];
    if (n < 20) return EINER[n % 10] + 'zehn';
    if (n < 100) return (n % 10 ? EINER[n % 10] + 'und' : '') + ZEHNER[Math.floor(n / 10)];
    return String(n);
  }
  // erster Buchstabe groß
  const gross = s => String(s).charAt(0).toUpperCase() + String(s).slice(1);
  // Tausender mit schmalem geschütztem Leerzeichen: 8 190
  const tausender = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NNBSP);
  // Grad und Minuten: 51° 31′ N
  function grad(x, plus, minus) {
    const a = Math.abs(x);
    let g = Math.floor(a), m = Math.round((a - g) * 60);
    if (m === 60) { g += 1; m = 0; }
    return g + '°' + NBSP + String(m).padStart(2, '0') + '′' + NBSP + (x >= 0 ? plus : minus);
  }
  // Deutsche Koordinaten: „51° 31′ N, 7° 28′ O“
  const koord = (lat, lon) => grad(lat, 'N', 'S') + ', ' + grad(lon, 'O', 'W');
  const lonLat = x => Array.isArray(x) ? [x[0], x[1]] : [x.lon, x.lat];
  // Luftlinie in km, auf 10 km gerundet; mit d3 oder, ohne Netz, nach der Haversine-Formel
  function entfernungKm(a, b) {
    const A = lonLat(a), B = lonLat(b);
    let rad;
    if (window.d3 && typeof window.d3.geoDistance === 'function') rad = window.d3.geoDistance(A, B);
    else {
      const r = Math.PI / 180, dLat = (B[1] - A[1]) * r, dLon = (B[0] - A[0]) * r;
      const h = Math.sin(dLat / 2) ** 2 + Math.cos(A[1] * r) * Math.cos(B[1] * r) * Math.sin(dLon / 2) ** 2;
      rad = 2 * Math.asin(Math.min(1, Math.sqrt(h)));
    }
    return Math.round(rad * 6371 / 10) * 10;
  }
  // Luftlinie als Text: „8 190 km“
  const km = (a, b) => tausender(entfernungKm(a, b)) + NBSP + 'km';
  // Jahr als Text: negative Jahre vor Christus, „um“ davor
  const jahrText = j => j == null ? '' : j < 0 ? 'um' + NBSP + (-j) + NBSP + 'v.' + NBSP + 'Chr.' : String(j);
  // „um 8000 v. Chr.“ in einem Stück halten
  const chr = t => String(t).replace(/(\d) v\. Chr\./g, '$1' + NBSP + 'v.' + NBSP + 'Chr.').replace(/\bum (\d)/g, 'um' + NBSP + '$1');
  // Jahr für die große Zahl der Tafel; „bis 2014“ mit kleinem, kursivem „bis“ und einem echten Leerzeichen (Vorlesen und Kopieren)
  const jahrMarke = jahr => /^bis /.test(jahr || '') ? { html: '<span class="bis">bis' + NBSP + '</span>' + esc(jahr.slice(4)) } : String(jahr || '');

  // ---------- Schrift und Satz ----------
  // Wartet, bis die drei Schnitte geladen sind, höchstens ms Millisekunden
  function schriften(ms) {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    const laden = Promise.all(['15px "Vollkorn"', 'italic 15px "Vollkorn"', '15px "Vollkorn SC"'].map(f => document.fonts.load(f)));
    return Promise.race([laden, new Promise(r => setTimeout(r, ms || 2500))]).catch(() => {});
  }
  // Knöpfe sind Inline-Blöcke: das folgende Satzzeichen wird an das Wort gebunden, sonst rutscht es allein in die nächste Zeile
  function satzzeichenBinden(wurzel) {
    $$('button.wort, a', wurzel).forEach(b => {
      const n = b.nextSibling;
      if (!n || n.nodeType !== 3 || (b.parentNode && b.parentNode.classList && b.parentNode.classList.contains('glied'))) return;
      const m = n.textContent.match(/^[.,;:!?)]+/);
      if (!m) return;
      const glied = document.createElement('span');
      glied.className = 'glied';
      b.parentNode.insertBefore(glied, b);
      glied.appendChild(b);
      glied.appendChild(document.createTextNode(m[0]));
      n.textContent = n.textContent.slice(m[0].length);
    });
  }

  // ---------- Globus ----------
  // Grundfarben: Graphit für Spur und Orte, ein leises warmes Grau für bereiste Länder
  const FARBEN = { papier: '#FFFEFC', land: '#F2F1EE', reise: '#DBD5CB', grenze: '#CAC9C5', kueste: '#9C9DA1', rand: '#1D1E21', text: '#1D1E21', textLeise: '#7A7C81', akzent: '#1D1E21', akzentHauch: 'rgba(29, 30, 33, .09)', gradnetz: '#EEEDEA' };
  const SIENA = '#9B5230';
  // Für Ebenen eigener Werke: nur Punkte und Spur Siena, der Hof um den gewählten Ort bleibt Graphit
  const SIENA_EBENE = { akzent: SIENA, akzentHauch: 'rgba(29, 30, 33, .08)' };

  /* Globus mit den gemeinsamen Farben und Schriften. Optionen wie Globus.erstellen (canvas, flaeche, tipp, hinweis, tippText,
     beimEingriff, beiChronikEnde, beimAnsichtWechsel, farben, schrift); bereist, winzig und ansichten kommen aus INHALT.
     radHinweis: false (oder eine Funktion, die false gibt), wo der Globus beim Scrollen mitgeht: kein Hinweis auf Strg oder ⌘.
     Mit namen: { orte(), spur(), aktiv() } setzt FSeite die Ortsnamen selbst, in einer zweiten Leinwand über dem Globus
     (aus E1: dicht beieinander liegende Orte als Block mit Führungslinie, Namen meiden die Spur und den angeschnittenen Rand):
       orte()  -> [{ name, text?, lat, lon, neben? }]   was jetzt beschriftet wird
       spur()  -> [{ lat, lon }]                        Stationen der Spur bis zur jetzigen
       aktiv() -> 'Name' | null                         der gewählte Ort, schwarz und mit Ring
     Rückgabe: die Maschine des Kerns mit drei Zusätzen: g.projektion (oder null), g.namenNeu() (Namen neu setzen),
     g.sperren(an) (keine Länderhervorhebung, etwa auf Ebenen der eigenen Werke). Ohne d3 oder Kern: null. */
  function globus(o) {
    o = o || {};
    const I = inhalt();
    if (!o.canvas || !(window.d3 && window.topojson && window.Globus && window.WELT_110M)) return null;
    const d3 = window.d3;
    const schrift = Object.assign({ ort: (schmal() ? 'italic 14px' : 'italic 15px') + ' "Vollkorn"', land: 'italic 13px "Vollkorn"' }, o.schrift || {});
    // Die Projektion des Kerns wird beim Erstellen nur mitgelesen; der Kern zeichnet unverändert
    let proj = null, mitlesen = false;
    const urOrtho = d3.geoOrthographic;
    if (o.namen) {
      try { d3.geoOrthographic = function () { const p = urOrtho.apply(this, arguments); if (!proj) proj = p; return p; }; mitlesen = d3.geoOrthographic !== urOrtho; } catch (e) { mitlesen = false; }
    }
    let g = null, namenNeu = () => {};
    try {
      g = window.Globus.erstellen({
        canvas: o.canvas, flaeche: o.flaeche, tipp: o.tipp, hinweis: o.hinweis,
        bereist: o.bereist || I.bereist || [], winzig: o.winzig || I.winzig || {}, ansichten: o.ansichten || I.ansichten || {},
        farben: Object.assign({}, FARBEN, o.farben || {}),
        schrift, versalien: false, pendeln: false, daten50: o.daten50 || 'daten/welt-50m.js',
        tippText: o.tippText || (land => land.name),
        beimEingriff: () => { namenNeu(); if (typeof o.beimEingriff === 'function') o.beimEingriff(); },
        beiChronikEnde: grund => { if (typeof o.beiChronikEnde === 'function') o.beiChronikEnde(grund); },
        beimAnsichtWechsel: teile => { if (typeof o.beimAnsichtWechsel === 'function') o.beimAnsichtWechsel(teile); }
      });
    } catch (fehler) { g = null; }
    try { if (o.namen) d3.geoOrthographic = urOrtho; } catch (e) { /* bleibt */ }
    if (!mitlesen) proj = null;
    if (!g) return null;
    g.projektion = proj;

    /* Der Kern misst seine Leinwand nur bei einer Größenänderung des Fensters neu. Ändert sich ihre Größe anders (die Seite setzt
       --tafel-h, die Bildlaufleiste erscheint, das Globusband wechselt), meldet FSeite eine Größenänderung */
    if ('ResizeObserver' in window) {
      let breite = o.canvas.clientWidth, uhr = 0;
      new ResizeObserver(() => {
        const w = o.canvas.clientWidth;
        if (!w || Math.abs(w - breite) < .5) return;
        breite = w;
        clearTimeout(uhr);
        uhr = setTimeout(() => window.dispatchEvent(new Event('resize')), 30);
      }).observe(o.canvas);
    }

    /* Der Kern zeigt bei jedem Rad über dem Globus, wie man zoomt, und hält den Hinweis, solange man ohne Pause weiterscrollt.
       Jeder Hinweis erscheint darum höchstens einmal je Besuch und dann höchstens zwei Sekunden lang, egal wie oft der Kern ihn
       neu anstößt. Wo der Globus beim Scrollen mitgeht (radHinweis: false, oder eine Funktion, die false gibt), ist das Rad über
       ihm die gewollte Lesegeste: dort entfällt der Hinweis auf Strg oder ⌘ ganz; der Hinweis für zwei Finger bleibt */
    if (o.hinweis && 'MutationObserver' in window) {
      const el = o.hinweis;
      let zeigt = null, uhr = 0;
      const verbraucht = new Set();
      const radAus = () => (typeof o.radHinweis === 'function' ? o.radHinweis() : o.radHinweis) === false;
      new MutationObserver(() => {
        if (el.hidden) { clearTimeout(uhr); uhr = 0; if (zeigt) verbraucht.add(zeigt); zeigt = null; return; }
        const text = el.textContent;
        if (verbraucht.has(text) || (radAus() && /halten und scrollen/.test(text))) { el.hidden = true; return; }
        if (text === zeigt) return;
        zeigt = text;
        clearTimeout(uhr);
        uhr = setTimeout(() => { el.hidden = true; }, 2000);
      }).observe(el, { attributes: true, attributeFilter: ['hidden'], childList: true, characterData: true, subtree: true });
    }

    // Keine Länderhervorhebung, solange gesperrt
    let gesperrt = false;
    if (o.flaeche) o.flaeche.addEventListener('pointermove', e => { if (gesperrt) e.stopPropagation(); }, true);
    g.sperren = an => { gesperrt = !!an; };

    if (o.namen && proj) {
      // Der Kern soll keine Ortsnamen setzen: in seiner Ortsschrift ist jedes Wort breiter als der Globus, er findet keinen Platz
      const ctx = o.canvas.getContext('2d');
      const beschreibung = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(ctx), 'font');
      let ortsschrift = false;
      if (beschreibung && beschreibung.set) {
        Object.defineProperty(ctx, 'font', { configurable: true, get() { return beschreibung.get.call(this); }, set(v) { ortsschrift = v === schrift.ort; beschreibung.set.call(this, v); } });
        const messen = ctx.measureText.bind(ctx);
        ctx.measureText = t => ortsschrift ? { width: 1e6 } : messen(t);
        namenNeu = namenEinrichten(g, proj, o);
      }
    }
    g.namenNeu = () => namenNeu();
    return g;
  }

  // Ortsnamen in einer eigenen Leinwand (aus E1). Gibt die Funktion zurück, die ein Neusetzen anfordert.
  function namenEinrichten(g, proj, o) {
    const d3 = window.d3;
    const canvas = o.canvas, flaeche = o.flaeche || canvas.parentNode;
    let leinwand = $('canvas.namen', flaeche);
    if (!leinwand) { leinwand = document.createElement('canvas'); leinwand.className = 'namen'; leinwand.setAttribute('aria-hidden', 'true'); flaeche.appendChild(leinwand); }
    const nctx = leinwand.getContext('2d');
    const gedaechtnis = new Map();
    const N = o.namen;
    const liste = f => { try { return (typeof f === 'function' ? f() : f) || []; } catch (e) { return []; } };

    function spurPunkte(mitte, skala) {
      const st = liste(N.spur);
      const punkte = [];
      for (let i = 0; i < st.length - 1; i++) {
        const a = [st[i].lon, st[i].lat], b = [st[i + 1].lon, st[i + 1].lat];
        const weg = d3.geoInterpolate(a, b), n = Math.max(8, Math.ceil(d3.geoDistance(a, b) * skala / 6));
        for (let j = 0; j <= n; j++) { const q = weg(j / n); if (d3.geoDistance(q, mitte) < Math.PI / 2 - .02) punkte.push(proj(q)); }
      }
      return punkte;
    }
    function gruppieren(pkte, T) {
      const eltern = pkte.map((_, i) => i);
      const wurzel = i => eltern[i] === i ? i : (eltern[i] = wurzel(eltern[i]));
      for (let a = 0; a < pkte.length; a++) for (let b = a + 1; b < pkte.length; b++) {
        if (pkte[a].neben !== pkte[b].neben) continue;
        if (Math.hypot(pkte[a].p[0] - pkte[b].p[0], pkte[a].p[1] - pkte[b].p[1]) < T) eltern[wurzel(a)] = wurzel(b);
      }
      const m = new Map();
      pkte.forEach((x, i) => { const r = wurzel(i); if (!m.has(r)) m.set(r, []); m.get(r).push(x); });
      return [...m.values()].map(orte => ({ orte: orte.sort((x, y) => x.i - y.i), neben: orte[0].neben }));
    }
    function leeren() { nctx.setTransform(1, 0, 0, 1, 0, 0); nctx.clearRect(0, 0, leinwand.width, leinwand.height); }
    function beschriften() {
      const S = canvas.clientWidth || 0;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (leinwand.width !== Math.round(S * dpr)) { leinwand.width = Math.round(S * dpr); leinwand.height = Math.round(S * dpr); }
      leeren();
      nctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const orte = liste(N.orte).map((x, i) => Object.assign({ i, text: x.text || x.kurz || x.name, neben: !!x.neben }, x));
      if (!orte.length || !S) return;
      const rot = proj.rotate(), mitte = [-rot[0], -rot[1]];
      const R = S / 2 - 2, k = proj.scale() / R, gezoomt = k > 1.15;
      const cr = canvas.getBoundingClientRect();
      const rechts = Math.min(S, document.documentElement.clientWidth - cr.left) - 4;
      const ecken = b => [[b[0], b[1]], [b[2], b[1]], [b[0], b[3]], [b[2], b[3]]];
      const imBereich = b => b[0] >= 2 && b[2] <= rechts && b[1] >= 2 && b[3] <= S - 2 &&
        (!gezoomt || ecken(b).every(([x, y]) => Math.hypot(x - S / 2, y - S / 2) < S / 2 - 7));
      const sicht = orte.filter(x => d3.geoDistance([x.lon, x.lat], mitte) < Math.PI / 2 - .02).map(x => Object.assign({ p: proj([x.lon, x.lat]) }, x));
      if (!sicht.length) return;
      const klein = schmal();
      const aktivName = typeof N.aktiv === 'function' ? N.aktiv() : null;
      const einerAktiv = !!aktivName && sicht.some(x => x.name === aktivName);
      const stil = x => {
        const px = x.neben ? (klein ? 12.5 : 13) : (klein ? 14 : 15);
        let farbe;
        if (einerAktiv && x.name === aktivName) farbe = '#0A0B0D';
        else if (einerAktiv) farbe = x.neben ? '#9A9CA0' : '#6B6D72';
        else farbe = x.neben ? '#7C7E83' : '#1D1E21';
        return { px, farbe, font: `italic ${px}px "Vollkorn"` };
      };
      const belegt = sicht.map(x => [x.p[0] - 4.5, x.p[1] - 4.5, x.p[0] + 4.5, x.p[1] + 4.5]);
      const spur = spurPunkte(mitte, R * k);
      const trifft = (a, b, luft) => a[0] - luft < b[2] && a[2] + luft > b[0] && a[1] - luft < b[3] && a[3] + luft > b[1];
      const gruppen = gruppieren(sicht, klein ? 22 : 26);
      gruppen.forEach(gr => { gr.aktiv = gr.orte.some(x => einerAktiv && x.name === aktivName); });
      gruppen.sort((a, b) => b.aktiv - a.aktiv || a.neben - b.neben || b.orte.length - a.orte.length || a.orte[0].i - b.orte[0].i);
      const platziert = [];
      gruppen.forEach(gr => {
        const zeilen = gr.orte.map(x => { const st = stil(x); nctx.font = st.font; return Object.assign({ text: x.text, b: nctx.measureText(x.text).width, h: Math.round(st.px * 1.2) }, st); });
        const w = Math.max(...zeilen.map(z => z.b)) + 2, h = zeilen.reduce((a, z) => a + z.h, 0);
        const xs = gr.orte.map(x => x.p[0]), ys = gr.orte.map(x => x.p[1]);
        const box0 = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
        const cy = (box0[1] + box0[3]) / 2;
        const kand = [];
        if (gr.orte.length === 1) {
          const [px, py] = gr.orte[0].p;
          kand.push(['O', px + 8, py - h / 2, 0], ['W', px - 8 - w, py - h / 2, .4], ['NO', px + 5, py - 5 - h, 1], ['SO', px + 5, py + 5, 1.1],
            ['NW', px - 5 - w, py - 5 - h, 1.2], ['SW', px - 5 - w, py + 5, 1.3], ['N', px - w / 2, py - 9 - h, 1.6], ['S', px - w / 2, py + 9, 1.7]);
        } else {
          [8, 18, 32, 50, 72].forEach(d => {
            [['m', cy - h / 2, 0], ['o', box0[1] - 6 - h, .5], ['u', box0[3] + 6, .6]].forEach(([v, y, kv]) => {
              kand.push(['O' + v + d, box0[2] + d, y, d * .025 + kv], ['W' + v + d, box0[0] - d - w, y, .3 + d * .025 + kv]);
            });
          });
        }
        const schluessel = gr.orte.map(x => x.name).join('|');
        let best = null;
        kand.forEach(([seite, x, y, kosten]) => {
          const b = [x, y, x + w, y + h];
          if (!imBereich(b)) return;
          if (belegt.some(q => trifft(b, q, 1.5)) || platziert.some(q => trifft(b, q.box, 3))) return;
          let c = kosten;
          spur.forEach(([sx, sy]) => { if (sx > b[0] - 2 && sx < b[2] + 2 && sy > b[1] - 2 && sy < b[3] + 2) c += .5; });
          if (gedaechtnis.get(schluessel) === seite) c -= .6;
          if (!best || c < best.c) best = { c, seite, box: b };
        });
        if (!best) return;
        gedaechtnis.set(schluessel, best.seite);
        platziert.push({ box: best.box, zeilen, gr, seite: best.seite });
      });
      // Führungslinien, dann die Namen mit Papierhof, zuletzt ein Ring um den gewählten Ort
      nctx.textBaseline = 'middle';
      nctx.lineJoin = 'round';
      platziert.forEach(({ box, zeilen, gr, seite }) => {
        const links = seite[0] === 'W';
        if (gr.orte.length > 1) {
          const zx = links ? box[2] + 3 : box[0] - 3;
          const zy = Math.max(box[1] + 4, Math.min(box[3] - 4, (box[1] + box[3]) / 2));
          const nah = gr.orte.reduce((a, x) => Math.hypot(x.p[0] - zx, x.p[1] - zy) < Math.hypot(a.p[0] - zx, a.p[1] - zy) ? x : a);
          const d = Math.hypot(nah.p[0] - zx, nah.p[1] - zy);
          if (d > 12) {
            const ux = (zx - nah.p[0]) / d, uy = (zy - nah.p[1]) / d;
            nctx.beginPath(); nctx.moveTo(nah.p[0] + ux * 5, nah.p[1] + uy * 5); nctx.lineTo(zx, zy);
            nctx.strokeStyle = '#8A8C90'; nctx.lineWidth = .7; nctx.stroke();
          }
        }
        let y = box[1];
        zeilen.forEach(z => {
          nctx.font = z.font;
          const mittig = seite === 'N' || seite === 'S';
          nctx.textAlign = mittig ? 'center' : links ? 'right' : 'left';
          const x = mittig ? (box[0] + box[2]) / 2 : links ? box[2] - 1 : box[0] + 1;
          nctx.lineWidth = 3.5; nctx.strokeStyle = '#FFFEFC';
          nctx.strokeText(z.text, x, y + z.h / 2);
          nctx.fillStyle = z.farbe;
          nctx.fillText(z.text, x, y + z.h / 2);
          y += z.h;
        });
      });
      const aktiv = einerAktiv && sicht.find(x => x.name === aktivName);
      if (aktiv) { nctx.beginPath(); nctx.arc(aktiv.p[0], aktiv.p[1], 6.5, 0, Math.PI * 2); nctx.strokeStyle = '#1D1E21'; nctx.lineWidth = .9; nctx.stroke(); }
    }
    // Beobachtet die Projektion: in Bewegung keine Namen, nach zwei ruhigen Bildern neu setzen
    let stand = '', ruheBilder = 0, gesetzt = false, schmutzig = true, an = false;
    function schleife() {
      if (!an) return;
      requestAnimationFrame(schleife);
      if (document.hidden) return;
      const r = proj.rotate();
      const jetzt = r[0].toFixed(3) + ',' + r[1].toFixed(3) + ',' + proj.scale().toFixed(2) + ',' + canvas.clientWidth;
      if (jetzt !== stand) { stand = jetzt; ruheBilder = 0; if (gesetzt) { leeren(); gesetzt = false; } return; }
      if (++ruheBilder >= 2 && (!gesetzt || schmutzig)) { beschriften(); gesetzt = true; schmutzig = false; }
    }
    const starten = () => { if (!an) { an = true; requestAnimationFrame(schleife); } };
    if ('IntersectionObserver' in window) new IntersectionObserver(e => { if (e.some(x => x.isIntersecting)) starten(); else an = false; }).observe(flaeche);
    else starten();
    window.addEventListener('resize', () => { schmutzig = true; });
    return () => { schmutzig = true; };
  }

  /* Mitte für einen Überblick: alle Orte im sichtbaren Teil der Leinwand (rechts kann der Fensterrand den Globus anschneiden),
     möglichst weit vom Rand. bereich: { lon: [von, bis], lat: [von, bis], k } (k = Zoomfaktor, Vorgabe 1). Gibt [lon, lat] oder null.
     Zuerst streng: jeder Ort mindestens 40 px vom Rand der Scheibe und vom angeschnittenen Fensterrand, bei gleich guten Lagen die,
     deren Orte um die Mitte des sichtbaren Teils liegen. Passt das nicht (die acht Lebensorte spannen 118 Längengrade), gelten
     24 und 12 px; zuletzt die alte, weichere Regel. */
  function blickFuer(canvas, orte, bereich) {
    for (const rand of [40, 24, 12]) { const m = blickStreng(canvas, orte, bereich, rand); if (m) return m; }
    return blickWeich(canvas, orte, bereich);
  }
  function blickStreng(canvas, orte, bereich, RAND) {
    const d3 = window.d3;
    if (!d3 || !canvas || !orte || !orte.length) return null;
    bereich = Object.assign({ lon: [-180, 180], lat: [-60, 70], k: 1, schritt: 1 }, bereich || {});
    const S = canvas.clientWidth || 600, rS = S / 2 - 2, R = rS * Math.min(1, bereich.k);
    const rechts = Math.min(S, document.documentElement.clientWidth - canvas.getBoundingClientRect().left);
    const mx = rechts / 2, my = S / 2;
    const pr = d3.geoOrthographic().clipAngle(90).translate([S / 2, S / 2]).scale(rS * bereich.k);
    let best = null;
    for (let lon = bereich.lon[0]; lon <= bereich.lon[1] + 1e-9; lon += bereich.schritt) for (let lat = bereich.lat[0]; lat <= bereich.lat[1] + 1e-9; lat += bereich.schritt) {
      pr.rotate([-lon, -lat]);
      let summe = 0, sx = 0, sy = 0;
      for (const s of orte) {
        if (d3.geoDistance([s.lon, s.lat], [lon, lat]) > 1.35) { summe = -Infinity; break; }
        const [x, y] = pr([s.lon, s.lat]);
        const rand = Math.min(R - Math.hypot(x - S / 2, y - S / 2), rechts - x - 8, x - 8, y - 8, S - y - 8);
        if (rand < RAND) { summe = -Infinity; break; }
        summe += Math.log(Math.min(rand, .45 * rS) + .04 * rS);
        sx += x; sy += y;
      }
      if (summe === -Infinity) continue;
      summe -= .6 * Math.hypot(sx / orte.length - mx, sy / orte.length - my) / rS;
      if (!best || summe > best.s) best = { s: summe, lon, lat };
    }
    return best ? [best.lon, best.lat] : null;
  }
  function blickWeich(canvas, orte, bereich) {
    const d3 = window.d3;
    if (!d3 || !canvas || !orte || !orte.length) return null;
    bereich = Object.assign({ lon: [-180, 180], lat: [-60, 70], k: 1, schritt: 1 }, bereich || {});
    // sichtbar ist immer die Scheibe der Leinwand (gezoomt wird sie beschnitten), gezeichnet wird mit dem Faktor k
    const S = canvas.clientWidth || 600, rS = S / 2 - 2;
    const cr = canvas.getBoundingClientRect();
    const rechts = Math.min(S, document.documentElement.clientWidth - cr.left);
    const pr = d3.geoOrthographic().clipAngle(90).translate([S / 2, S / 2]).scale(rS * bereich.k);
    let best = null;
    for (let lon = bereich.lon[0]; lon <= bereich.lon[1] + 1e-9; lon += bereich.schritt) for (let lat = bereich.lat[0]; lat <= bereich.lat[1] + 1e-9; lat += bereich.schritt) {
      pr.rotate([-lon, -lat]);
      let summe = 0;
      for (const s of orte) {
        if (d3.geoDistance([s.lon, s.lat], [lon, lat]) > 1.35) { summe = -Infinity; break; }
        const [x, y] = pr([s.lon, s.lat]);
        const rand = rS - Math.hypot(x - S / 2, y - S / 2);
        if (x < 14 || x > rechts - 14 || y < 14 || y > S - 14 || rand < .08 * rS) { summe = -Infinity; break; }
        // Logarithmus: ein Ort am Rand kostet mehr, als ein Ort tief im Innern bringt
        summe += Math.log(Math.min(rand, .35 * rS) + .04 * rS);
      }
      if (summe > -Infinity && (!best || summe > best.s)) best = { s: summe, lon, lat };
    }
    return best ? [best.lon, best.lat] : null;
  }

  // ---------- Stationstafel ----------
  /* Setzt eine Tafel. inhalt: { marke, kopf, unter, daten, satz, text, fuss, neben, eigen }
       marke  große Zahl links (Jahr, „65“, Bandnummer); kopf  Ort oder Titel, kursiv; unter  Art in Kapitälchen;
       daten  Koordinaten; satz  ein grauer Satz; text  ein längerer Absatz; fuss  HTML für „früher“ und „später“;
       neben  Nebenort (grau); eigen  Bandnummer in Siena. Textfelder werden maskiert, { html } bleibt unverändert. */
  function tafel(el, t) {
    if (!el) return;
    t = t || {};
    el.classList.add('tafel');
    el.classList.toggle('ist-neben', !!t.neben);
    el.classList.toggle('ist-eigen', !!t.eigen);
    const zeile = (cls, v) => v ? `<p class="${cls}">${teil(v)}</p>` : '';
    el.innerHTML = `<p class="tafel-marke">${teil(t.marke)}</p><div class="tafel-inhalt">${zeile('tafel-kopf', t.kopf)}${zeile('tafel-unter', t.unter)}${zeile('tafel-daten', t.daten)}${zeile('tafel-satz', t.satz)}${zeile('tafel-text', t.text)}${t.fuss ? `<p class="tafel-fuss">${t.fuss}</p>` : ''}</div>`;
  }
  // Hält die Höhe der Tafel fest: so hoch wie ihr längster Inhalt bei der jetzigen Breite, damit darunter nichts springt
  function tafelReservieren(el, inhalte) {
    if (!el || !el.parentNode || !el.clientWidth) return;
    const probe = el.cloneNode(false);
    probe.removeAttribute('id'); probe.removeAttribute('aria-live');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;left:0;top:0;margin:0;min-height:0;width:${el.clientWidth}px`;
    el.parentNode.appendChild(probe);
    let h = 0;
    (inhalte || []).forEach(x => { tafel(probe, x); h = Math.max(h, probe.getBoundingClientRect().height); });
    probe.remove();
    el.style.minHeight = Math.ceil(h) + 'px';
  }
  /* Wie tafelReservieren; breit dazu --tafel-h: so hoch wie die Tafel mit ihrem längsten Inhalt und einer halben Zeile. Der Globus
     nimmt die übrige Fensterhöhe, so passen Globus und Tafel zusammen auf einen Schirm, auch wenn die Tafel in einer schmalen Spalte
     mehr Zeilen braucht. Ein größerer Globus macht die Tafel schmaler, darum bis zu dreimal nachgemessen; die Leinwand misst der Kern
     danach selbst neu (siehe globus). Schmal gilt der Wert aus dem Stil. */
  function tafelPlatz(el, inhalte) {
    const wurzel = document.documentElement.style;
    if (!breit()) wurzel.removeProperty('--tafel-h');
    for (let n = 0; n < 3; n++) {
      tafelReservieren(el, inhalte);
      if (!breit()) break;
      const soll = Math.ceil((parseFloat(el.style.minHeight) || 0) + masz('--z') * .5);
      if (!soll || Math.abs(soll - masz('--tafel-h')) < 1) break;
      wurzel.setProperty('--tafel-h', soll + 'px');
    }
  }
  // Lebensstationen aus INHALT.leben
  const stationen = () => (inhalt().leben || []).map(s => ({ name: s.name, lat: s.lat, lon: s.lon, neben: !!s.neben, jahr: s.jahr, land: s.land || '' }));
  // Tafel für eine Lebensstation, Entfernung vom ersten Ort (Dortmund) aus gemessen
  function stationInhalt(s, ausgang) {
    ausgang = ausgang || stationen()[0];
    return {
      marke: jahrMarke(s.jahr), kopf: s.land ? s.name + ', ' + s.land : s.name, neben: !!s.neben,
      unter: s.neben ? 'längerer Aufenthalt' : 'Wohnort',
      daten: koord(s.lat, s.lon),
      satz: ausgang && s.name === ausgang.name ? 'Von hier aus sind die Entfernungen gemessen.' : km(ausgang, s) + ' Luftlinie von ' + ausgang.name + '.'
    };
  }

  // ---------- Ursprungstrilogie ----------
  // Die vier Orte der Reihe nach: Göbekli Tepe, Uruk, Tyros, Jerusalem
  const ursprungOrte = () => (inhalt().ursprung || []).map((o, i) => ({ i, name: o.name, lat: o.lat, lon: o.lon, band: o.band, jahr: o.jahr }));
  /* Tafel für einen Ort der Trilogie (Startseite und Seite der Trilogie gleich): Titel des Bands, darunter Landschaft und Zeit und die
     Koordinaten, dann ein Satz zum Band (aus INHALT.baende). -1 ist die ganze Trilogie. Stand nur „in Arbeit“, für die ganze Trilogie. */
  function ursprungInhalt(i) {
    const I = inhalt(), orte = ursprungOrte(), band = {};
    ((I.trilogie && I.trilogie.baende) || []).forEach(b => { band[b.band] = b; });
    const o = orte[i];
    if (!o) {
      const a = orte[0], z = orte[orte.length - 1];
      return { eigen: true, marke: 'I–III', kopf: (I.trilogie && I.trilogie.titel) || 'Ursprung', unter: 'Trilogie, in Arbeit',
        satz: a && z ? chr(('Von ' + a.name + ' ' + a.jahr + ' bis ' + z.name + ' ' + z.jahr).replace(/([^.])$/, '$1.')) : '' };
    }
    const b = band[o.band] || {};
    const m = String((I.baende || {})[o.band] || '').match(/^(.*?v\. Chr\.)\s+(.+)$/);
    const landschaft = m ? m[1] : [b.ort, b.zeit].filter(Boolean).join(', ');
    const satz = m ? m[2] : b.thema ? b.thema.replace(/([^.])$/, '$1.') : '';
    // Tyros steht nur auf dem Globus, als die Stadt der Phönizier, aus der Thyra kommt
    const ort = o.name === b.ort ? landschaft : o.name + ', die Stadt der Phönizier, ' + (b.zeit || o.jahr || '');
    return {
      eigen: true, marke: o.band,
      kopf: { html: esc(b.titel || '') + (b.arbeitstitel ? ' <span class="arbeitstitel">Arbeitstitel</span>' : '') },
      daten: { html: `<span class="ortzeit">${esc(chr(ort))}</span><br>${esc(koord(o.lat, o.lon))}` },
      satz
    };
  }

  // ---------- Karteikarte ----------
  /* Eine Karteikarte, A6 quer; auf dem Telefon unten am Bildschirm. Esc, „zurücklegen“, ein Klick daneben oder Tab aus der Karte
     hinaus legt sie zurück, der Fokus geht an das auslösende Element zurück. Breit liegt sie über dem Auslöser, sonst darunter,
     sonst daneben; nie unter dem Kopf der Seite oder unter dem, was oben haftet (scroll-padding-top). Gerät der Auslöser beim
     Scrollen dorthin oder aus dem Fenster, legt sie sich zurück.
     oeffnen(inhalt, ausloeser): inhalt = { signatur, titel, unter, autor, zeilen: [], notiz, verweis: { href, text }, eigen, beimSchliessen }
       eigen: Werk von Dominik (Signatur Siena, Titel kursiv). Textfelder werden maskiert, { html } bleibt unverändert.
       beimSchliessen(still): danach aufgerufen; still ist wahr, wenn ein Klick daneben die Karte zurückgelegt hat.
       Das auslösende Element bekommt solange die Klasse ist-offen. */
  const karteikarte = (function () {
    let karte = null, ausloeser = null, danach = null;
    function element() {
      if (karte) return karte;
      karte = document.createElement('div');
      karte.className = 'karte';
      karte.id = 'karteikarte';
      karte.setAttribute('role', 'dialog');
      karte.setAttribute('aria-labelledby', 'karte-titel');
      karte.tabIndex = -1;
      karte.hidden = true;
      document.body.appendChild(karte);
      karte.addEventListener('click', e => { if (e.target.closest('.karte-zu')) schliessen(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape' && !karte.hidden) { e.preventDefault(); schliessen(); } });
      // Ein Druck neben die Karte legt sie zurück; ein Druck auf das auslösende Element entscheidet die Seite selbst
      document.addEventListener('pointerdown', e => {
        if (karte.hidden || karte.contains(e.target)) return;
        if (ausloeser && ausloeser.contains(e.target)) return;
        schliessen(true);
      }, true);
      // Tab aus der Karte hinaus (vorwärts nach dem letzten Verweis, rückwärts vor dem ersten): die Karte legt sich zurück, und es geht
      // beim auslösenden Element weiter, nicht am Ende der Seite, wo die Karte im Quelltext steht
      document.addEventListener('keydown', e => {
        if (e.key !== 'Tab' || karte.hidden || e.defaultPrevented) return;
        const a = document.activeElement;
        if (!karte.contains(a)) return;
        const fokusbar = $$('button, a[href]', karte);
        const raus = e.shiftKey ? (a === karte || a === fokusbar[0]) : (!fokusbar.length || a === fokusbar[fokusbar.length - 1]);
        if (!raus) return;
        e.preventDefault();
        schliessen(false);
      });
      let t = null, bild = 0;
      window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(stellen, 80); });
      window.addEventListener('scroll', () => { if (!bild && !karte.hidden) bild = requestAnimationFrame(() => { bild = 0; beimRollen(); }); }, { passive: true });
      return karte;
    }
    const alsBlatt = () => window.matchMedia('(max-width: 40rem)').matches;
    // Was oben frei bleibt: der Kopf der Seite, solange er im Bild ist, und was oben haftet (scroll-padding-top der Seite)
    const haftetOben = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    function frei() {
      const kopf = $('.kopf'), kb = kopf ? kopf.getBoundingClientRect().bottom : 0, sp = haftetOben();
      return Math.max(12, sp ? sp + 8 : 0, kb > 0 ? kb + masz('--z') * .5 : 0);
    }
    function stellen() {
      if (!karte || karte.hidden) return;
      const blatt = alsBlatt();
      karte.classList.toggle('als-blatt', blatt);
      if (blatt) { karte.style.left = ''; karte.style.top = ''; return; }
      const vw = document.documentElement.clientWidth, H = window.innerHeight;
      const randL = Math.max(16, masz('--rand-l')), randR = Math.max(16, masz('--rand-r'));
      const kb = karte.offsetWidth, kh = karte.offsetHeight;
      let links, oben;
      if (ausloeser && document.contains(ausloeser)) {
        const r = ausloeser.getBoundingClientRect(), f = frei();
        const ueber = r.top - kh - 16, unter = r.bottom + 16;
        links = r.left + r.width / 2 - kb / 2;
        if (ueber >= f) oben = ueber;
        else if (unter + kh <= H - 12) oben = unter;
        else {
          const rechts = r.right + 16, daneben = r.left - 16 - kb;
          const neben = rechts + kb <= vw - randR ? rechts : daneben >= randL ? daneben : null;
          if (neben !== null) { links = neben; oben = Math.max(f, Math.min(H - 12 - kh, r.top - 6)); }
          else oben = unter;
        }
      } else { links = (vw - kb) / 2; oben = (H - kh) / 2; }
      links = Math.max(randL, Math.min(vw - kb - randR, links));
      karte.style.left = Math.round(links + window.scrollX) + 'px';
      karte.style.top = Math.round(Math.max(12, oben) + window.scrollY) + 'px';
    }
    // Der Auslöser ist unter das geraten, was oben haftet, oder aus dem Fenster: die Karte legt sich zurück (das Blatt bleibt)
    function beimRollen() {
      if (!karte || karte.hidden || karte.classList.contains('als-blatt') || !ausloeser || !document.contains(ausloeser)) return;
      const r = ausloeser.getBoundingClientRect(), sp = haftetOben();
      if (sp > 0 ? r.top < sp : r.bottom < 0) schliessen(!karte.contains(document.activeElement));
    }
    function oeffnen(x, el) {
      const k = element();
      if (ausloeser && ausloeser !== el) ausloeser.classList.remove('ist-offen');
      ausloeser = el || null;
      if (ausloeser) ausloeser.classList.add('ist-offen');
      danach = typeof x.beimSchliessen === 'function' ? x.beimSchliessen : null;
      k.classList.toggle('ist-eigen', !!x.eigen);
      const zeilen = (x.zeilen || []).filter(Boolean).map(teil);
      k.innerHTML =
        `<div class="karte-kopf"><span class="signatur">${teil(x.signatur)}</span><button type="button" class="wort karte-zu">zurücklegen</button></div>` +
        `<h3 class="karte-titel" id="karte-titel">${teil(x.titel)}</h3>` +
        (x.unter ? `<p class="karte-unter">${teil(x.unter)}</p>` : '') +
        (x.autor ? `<p class="karte-autor">${teil(x.autor)}</p>` : '') +
        (zeilen.length ? `<p class="karte-zeilen">${zeilen.join('<br>')}</p>` : '') +
        (x.notiz ? `<p class="karte-notiz">${teil(x.notiz)}</p>` : '') +
        (x.verweis && x.verweis.href ? `<p class="karte-verweis"><a href="${esc(x.verweis.href)}">${teil(x.verweis.text)}</a></p>` : '');
      k.hidden = false;
      stellen();
      k.focus({ preventScroll: true });
    }
    // still: der Fokus springt nicht zurück (Klick daneben, der Fokus gehört dem neuen Ziel)
    function schliessen(still) {
      if (!karte || karte.hidden) return;
      karte.hidden = true;
      const el = ausloeser;
      ausloeser = null;
      if (el) el.classList.remove('ist-offen');
      if (el && !still && document.contains(el)) el.focus({ preventScroll: true });
      const f = danach; danach = null;
      if (f) f(!!still);
    }
    return { oeffnen, schliessen: () => schliessen(false), offen: () => !!karte && !karte.hidden, ausloeser: () => ausloeser, stellen };
  })();

  // ---------- Bücher ----------
  /* buch.alle(): alle Bücher in einer Liste, ohne „lieber nicht“; was noch wartet, kommt aus daten/leseliste.js (r: 'leseliste'),
     ohne was schon im Regal steht oder auf dem Nachttisch liegt.
     Felder wie in daten/buecher.js (t, u, a, r, s, j, p, w, b, v) und dazu nn (Nachname), autor, key, sig (Signatur wie im Regal von E1:
     Zeit A bis E und Jahr; K Kindheit und Jugend, N Nachttisch, W was noch wartet).
     Berichtigt, solange daten/buecher.js es nicht selbst ist: das Jahr der Erstveröffentlichung, wo der Export das einer Übersetzung
     trägt; der zweite Verfasser von The Dawn of Everything. Gesetzt mit Halbgeviertstrich in Spannen, typografischen Apostrophen
     und Anführungszeichen (die Titel sind meist englisch: “…”) und geschützten Leerzeichen nach Initialen („T. S. Eliot“). */
  const buch = (function () {
    let cache = null;
    const NACHNAMEN = {
      'Sun Tzu': 'Sun Tzu', 'Luo Guanzhong': 'Luo', 'Han Kang': 'Han', 'Gabriel García Márquez': 'García Márquez', 'Jin Yong': 'Jin Yong',
      'Carlos Ruiz Zafón': 'Ruiz Zafón', 'Adolfo Bioy Casares': 'Bioy Casares', 'Daphne du Maurier': 'du Maurier',
      'Ursula K. Le Guin': 'Le Guin', 'John le Carré': 'le Carré', 'Antoine de Saint-Exupéry': 'Saint-Exupéry', 'Lieutenant X': 'Lieutenant X',
      'Anonymous': '', 'Anonym': '', 'Die 19 Finaltexte': ''
    };
    const AUTOR = { 'Anonymous': 'Anonym' };
    // Bleibt draußen, bis Dominik es freigibt
    const DRAUSSEN = [{ t: 'Ghostwritten', a: 'David Mitchell' }];
    // Malina erschien 1971 (1990 ist die englische Ausgabe), In der Strafkolonie 1919 (beide Ausgaben); der Untertitel der
    // Cornelsen-Ausgabe (ein Arbeitsheft für die Schule) fehlt, bis Dominik sie ansieht
    const BERICHTIGT = [
      { a: 'Ingeborg Bachmann', t: 'Malina', j: 1971 },
      { a: 'Franz Kafka', t: 'In the Penal Colony', j: 1919 },
      { a: 'Scott O\'Dell', t: 'Island of the Blue Dolphins', v: /cornelsen/i, u: '' },
      { a: 'David Graeber', t: 'The Dawn of Everything', autor: 'David Graeber und David Wengrow' }
    ];
    const satz = s => String(s || '').replace(/(\d)-(\d)/g, '$1–$2').replace(/"([^"]*)"/g, '“$1”').replace(/'/g, '’');
    const initialen = s => satz(s).replace(/\b([A-Z])\.\s?(?=[A-Z])/g, '$1.' + NBSP);
    // Verlag ohne den Zusatz „An Imprint of …“; ganz in Versalien exportierte Namen aus mehreren Wörtern in gemischter Schreibung
    // (Kürzel wie DTV bleiben)
    const verlag = v => {
      const t = sauber(v).replace(/:\s*an imprint of .*$/i, '').replace(/,?\s+an imprint of .*$/i, '');
      return /[A-ZÄÖÜ]{3}\s+[A-ZÄÖÜ]{3}/.test(t) && t === t.toUpperCase() ? t.toLowerCase().replace(/(^|[\s(&\/-])(\p{L})/gu, (m, a, b) => a + b.toUpperCase()) : t;
    };
    const titelSchluessel = b => b.nn + '|' + b.t.toLowerCase().replace(/^(der|die|das|the|a|an|ein|eine)\s+/, '').replace(/[^\p{L}\p{N}]+/gu, '');
    // Nachname für Rücken und Zeile
    function nachname(a) {
      a = sauber(a);
      if (a in NACHNAMEN) return NACHNAMEN[a];
      if (/^Die \d/.test(a)) return '';
      const t = a.replace(/,?\s+(Jr\.|Sr\.)$/, '').split(/\s+/);
      return t[t.length - 1] || '';
    }
    // Rückentitel: ohne Untertitel und Reihe
    function titelKurz(t) {
      let s = sauber(t);
      s = s.replace(/\s*\(.*\)\s*$/, '').split(/:\s|\s[-–]\s/)[0];
      return s.replace(/(\d)-(\d)/g, '$1–$2').replace(/'/g, '’').trim();
    }
    const EPOCHEN = [['A', 1899], ['B', 1945], ['C', 1989], ['D', 2009], ['E', Infinity]];
    const jahrSig = j => j == null ? 'o.' + NBSP + 'J.' : j < 0 ? '−' + (-j) : String(j);
    const ordnung = (x, y) => (x.j == null) - (y.j == null) || (x.j || 0) - (y.j || 0) || x.nn.localeCompare(y.nn, 'de') || x.t.localeCompare(y.t, 'de');
    function alle() {
      if (cache) return cache;
      const draussen = b => DRAUSSEN.some(x => x.t === sauber(b.t) && x.a === sauber(b.a));
      const roh = (window.BUECHER || []).filter(b => b && b.r !== 'lieber-nicht' && b.r !== 'leseliste' && !draussen(b));
      const warte = (window.LESELISTE || []).map(x => ({ t: x.t, u: '', a: x.a, r: 'leseliste', s: 0, j: x.j == null ? null : x.j, p: x.p || 0, w: 0, b: 'p', v: '', k: !!x.k, ungefaehr: true }));
      cache = roh.map(b => Object.assign({}, b)).concat(warte);
      cache.forEach(b => {
        b.t = sauber(b.t); b.u = sauber(b.u); b.a = sauber(b.a); b.v = verlag(b.v);
        const k = BERICHTIGT.find(x => x.a === b.a && x.t === b.t && (!x.v || x.v.test(b.v)));
        if (k) { if ('j' in k) b.j = k.j; if ('u' in k) b.u = k.u; }
        b.nn = satz(nachname(b.a)); b.autor = initialen((k && k.autor) || AUTOR[b.a] || b.a);
        b.t = satz(b.t); b.u = satz(b.u); b.v = initialen(b.v); b.a = initialen(b.a);
        b.key = b.t + '|' + b.a;
      });
      // Was schon im Regal steht oder auf dem Nachttisch liegt, wartet nicht noch einmal
      const imRegal = new Set(cache.filter(b => b.r !== 'leseliste').map(titelSchluessel));
      cache = cache.filter(b => b.r !== 'leseliste' || !imRegal.has(titelSchluessel(b)));
      // Signaturen: Buchstabe der Zeit oder des Fachs, Jahr, bei gleichem Jahr a, b, c …
      const fach = b => b.r === 'kindheit' ? 'K' : b.r === 'gerade' ? 'N' : b.r === 'leseliste' ? 'W' : b.j == null ? 'E' : EPOCHEN.find(e => b.j <= e[1])[0];
      const gruppen = {};
      cache.forEach(b => { const z = fach(b) + '|' + jahrSig(b.j); (gruppen[z] = gruppen[z] || []).push(b); });
      Object.entries(gruppen).forEach(([z, bs]) => {
        bs.sort(ordnung);
        bs.forEach((b, i) => { b.sig = z.replace('|', NBSP) + (bs.length > 1 ? (i < 26 ? 'abcdefghijklmnopqrstuvwxyz'[i] : String(i + 1)) : ''); });
      });
      return cache;
    }
    // Karteikarte eines Buchs; person: 3 spricht von ihm („Eines seiner liebsten.“), sonst spricht er selbst
    function karte(b, o) {
      const er = !!o && o.person === 3;
      const satz = s => s && !/[.!?]$/.test(s) ? s + '.' : s;
      const jahr = b.j == null ? '' : b.j < 0 ? 'Entstanden ' + jahrText(b.j) : b.j < 1450 ? 'Entstanden um ' + b.j : 'Zuerst erschienen ' + b.j;
      const ausgabe = [b.v, b.p ? (b.ungefaehr ? 'etwa ' : '') + tausender(b.p) + ' Seiten' : ''].filter(Boolean).join(', ');
      const notiz = [];
      if (b.r === 'gerade') notiz.push(er ? 'Liest er gerade.' : 'Lese ich gerade.');
      if (b.r === 'abgebrochen') notiz.push('Nicht zu Ende gelesen.');
      if (b.r === 'leseliste') notiz.push('Wartet noch.');
      if (b.r === 'kindheit') notiz.push('Aus Kindheit und Jugend.');
      if (b.s === 5 && b.r !== 'leseliste') notiz.push(er ? 'Eines seiner liebsten.' : 'Eines meiner liebsten.');
      if (b.w) notiz.push('Mehr als einmal gelesen.');
      return { signatur: b.sig || '', titel: b.t, unter: b.u, autor: b.autor, zeilen: [satz(jahr), satz(ausgabe)], notiz: notiz.join(' ') };
    }
    // Eine Zeile über ein Buch: „Bukowski, Pulp, 1994“ als Text und als HTML (Titel kursiv)
    function zeile(b) {
      const zusatz = b.r === 'abgebrochen' ? 'nicht zu Ende gelesen' : b.r === 'gerade' ? 'lese ich gerade' : b.r === 'leseliste' ? 'wartet noch' : '';
      const j = b.j != null ? jahrText(b.j) : '';
      return {
        text: [b.nn, b.t, j, zusatz].filter(Boolean).join(', '),
        html: [b.nn ? esc(b.nn) : '', `<i>${esc(b.t)}</i>`, j, zusatz].filter(Boolean).join(', ')
      };
    }
    return { alle, karte, zeile, nachname, titelKurz, ordnung };
  })();

  // ---------- Eigene Werke ----------
  const WERK_SIG = { satoshi: 'DJ 1', 'ursprung-1': 'DJ 2/I', 'ursprung-2': 'DJ 2/II', 'ursprung-3': 'DJ 2/III', erzaehlungen: 'DJ 3', untertext: 'DJ 4', laender: 'DJ 5' };
  /* Karteikarte für ein eigenes Werk (id aus INHALT.werke): Signatur Siena, Titel kursiv; bei Satoshi und den Bänden der Trilogie
     führt der Titel selbst zur Seite des Werks. „Arbeitstitel“ steht klein hinter dem Titel. Für die Trilogie gilt nur „in Arbeit“,
     für die ganze Trilogie, ohne Stand je Band. person: 3 spricht von ihm (Seiten in der dritten Person), sonst spricht er selbst. */
  function werkKarte(id, o) {
    const I = inhalt(), er = !!o && o.person === 3;
    const w = (I.werke || []).find(x => x.id === id);
    if (!w) return null;
    const ziel = id === 'satoshi' ? SEITEN.satoshi : w.band ? SEITEN.ursprung : '';
    const name = esc(w.buchtitel || w.titel);
    const titel = { html: (ziel ? `<a href="${ziel}">${name}</a>` : name) + (w.arbeitstitel ? ' <span class="arbeitstitel">Arbeitstitel</span>' : '') };
    const x = { signatur: (WERK_SIG[id] || 'DJ').replace(' ', NBSP), titel, eigen: true, autor: 'Dominik Jäkel' };
    const punkt = t => t && !/[.!?…]$/.test(t) ? t + '.' : t;
    if (id === 'satoshi') {
      const s = I.satoshi || {};
      x.unter = 'Roman';
      x.zeilen = [(s.eckdaten && s.eckdaten.stand) || ''];
      x.notiz = s.hook || w.text || '';
    } else if (w.band) {
      const b = ((I.trilogie && I.trilogie.baende) || []).find(y => y.band === w.band) || {};
      x.unter = 'Band ' + w.band + ' der Ursprungstrilogie';
      x.zeilen = [chr([b.ort, b.zeit].filter(Boolean).join(', ')), 'Die Trilogie ist in Arbeit.'];
      x.notiz = punkt(b.thema || '');
    } else if (id === 'erzaehlungen') {
      // „Erzählungen, Kurzgeschichten“ sagte dasselbe zweimal
      x.unter = '';
      x.notiz = er ? 'Viele davon hat er auf der Werkstattbühne des Autorenforums Berlin gelesen.' : 'Viele davon habe ich auf der Werkstattbühne des Autorenforums Berlin gelesen.';
    } else {
      x.unter = w.art + (w.stand ? ', ' + w.stand : '');
    }
    return x;
  }

  // ---------- Beim Scrollen ----------
  /* Was dem Scrollen folgt, folgt ihm in beide Richtungen: Zurückscrollen nimmt zurück, nichts wird einmal ausgelöst und bleibt.
     Eine gemeinsame Schleife für alle Seiten: passive Listener, höchstens ein requestAnimationFrame je Bild, und jeder Beobachter
     rechnet nur, solange sein Bereich im Bild ist (IntersectionObserver; beim Verlassen rechnet er ein letztes Mal, damit nach
     schnellem Scrollen der Stand stimmt). Ob eine Seite bei reduzierter Bewegung mitgeht, entscheidet sie selbst (ruhig()). */
  const beobachter = new Set();
  let rollBild = 0, rollBereit = false;
  function rollLauf() { rollBild = 0; beobachter.forEach(b => { if (b.imBild) b.pruefen(false); }); }
  function rollAnstossen() { if (!rollBild) rollBild = requestAnimationFrame(rollLauf); }
  function beobachten(b, bereich) {
    if (!rollBereit) {
      rollBereit = true;
      window.addEventListener('scroll', rollAnstossen, { passive: true });
      window.addEventListener('resize', rollAnstossen, { passive: true });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(rollAnstossen);
    }
    b.imBild = true;
    if (bereich && 'IntersectionObserver' in window) {
      b.imBild = false;
      let erst = true;
      new IntersectionObserver(e => {
        const da = e[e.length - 1].isIntersecting;
        if (da === b.imBild && !erst) return;
        erst = false; b.imBild = da;
        b.pruefen(false);
      }, { rootMargin: '20% 0px' }).observe(bereich);
    }
    beobachter.add(b);
    rollAnstossen();
  }

  /* leselinie(elemente, beiSchritt, o): welches Element zuletzt die Leselinie erreicht hat.
       elemente   Liste (oder Funktion, die eine gibt) von Elementen in der Reihenfolge der Seite
       beiSchritt(i, { vorher, richtung, neu })   i = -1, solange noch keines die Linie erreicht hat, sonst sein Index.
                  Kommt einmal gleich zu Beginn (vorher: null) und danach nur, wenn sich i ändert (mit o.jedesMal in jedem Bild).
       o.linie    Lage der Linie: Anteil der Fensterhöhe (Vorgabe .45) oder Funktion (H) => Pixel vom oberen Rand
       o.ende     Vorgabe an: gegen Seitenende, wenn die letzten Elemente die Linie nicht mehr erreichen könnten, wandert sie auf dem
                  letzten Drittel Fenster des Wegs bis auf neun Zehntel der Fensterhöhe hinab
       o.stelle(el, i)   y im Fenster, die die Linie erreichen muss (Vorgabe: Oberkante; ein Element ohne Größe zählt nicht)
       o.bereich  Element, außerhalb dessen nicht gerechnet wird
     Rückgabe: { jetzt(), linie(), pruefen(erzwingen) } */
  function leselinie(elemente, beiSchritt, o) {
    o = o || {};
    const liste = () => (typeof elemente === 'function' ? elemente() : elemente) || [];
    const stelle = o.stelle || (el => {
      if (!el || !el.getBoundingClientRect) return null;
      const r = el.getBoundingClientRect();
      return r.width || r.height ? r.top : null;
    });
    function linie() {
      const H = window.innerHeight;
      let l = typeof o.linie === 'function' ? o.linie(H) : H * (o.linie == null ? .45 : o.linie);
      if (o.ende !== false) {
        const rest = Math.max(0, document.documentElement.scrollHeight - H - window.scrollY), strecke = H / 3;
        if (rest < strecke) l += Math.max(0, H * .9 - l) * (1 - rest / strecke);
      }
      return l;
    }
    let jetzt = null;
    const b = {
      pruefen(erzwingen) {
        const l = linie();
        let i = -1;
        liste().forEach((el, j) => { const y = stelle(el, j); if (y != null && y <= l) i = j; });
        const neu = i !== jetzt;
        if (!neu && !erzwingen && !o.jedesMal) return;
        const vorher = jetzt;
        jetzt = i;
        beiSchritt(i, { vorher, richtung: vorher == null ? 0 : Math.sign(i - vorher), neu });
      }
    };
    beobachten(b, o.bereich);
    return { jetzt: () => jetzt, linie, pruefen: erzwingen => b.pruefen(!!erzwingen) };
  }

  /* fortschritt(element, beiWert, o): wie weit ein Element durch das Fenster gewandert ist, als Zahl von 0 bis 1.
     0, solange seine Oberkante bei o.von (Anteil der Fensterhöhe, Vorgabe 1: unterer Rand) oder tiefer steht; 1, sobald sie o.bis
     erreicht (Vorgabe 0: oberer Rand) oder die Seite nicht weiter kann. beiWert(q, { roh }) kommt, wenn sich q ändert;
     roh ist ungekappt (unter 0: noch nicht erreicht, über 1: vorbei). Rückgabe: { wert(), pruefen(erzwingen) } */
  function fortschritt(el, beiWert, o) {
    o = o || {};
    let zuletzt = null, wert = 0;
    const b = {
      pruefen(erzwingen) {
        if (!el || !el.isConnected) return;
        const H = window.innerHeight, y = window.scrollY;
        const oben = el.getBoundingClientRect().top + y;
        const s0 = oben - H * (o.von == null ? 1 : o.von);
        const s1 = Math.min(oben - H * (o.bis == null ? 0 : o.bis), document.documentElement.scrollHeight - H);
        // Unter 40 px Weg gibt es nichts zu verfolgen
        if (s1 - s0 < 40) return;
        const roh = (y - s0) / (s1 - s0);
        wert = Math.max(0, Math.min(1, roh));
        const schluessel = roh <= 0 ? -1 : roh >= 1 ? 2 : wert;
        if (schluessel === zuletzt && !erzwingen) return;
        zuletzt = schluessel;
        beiWert(wert, { roh });
      }
    };
    beobachten(b, o.bereich || el);
    return { wert: () => wert, pruefen: erzwingen => b.pruefen(!!erzwingen) };
  }

  /* imBild(el, { starten, unterbrechen, fortsetzen }): eine Chronik auf dem Globus läuft nur, solange man ihn sieht.
     starten, wenn el zum ersten Mal zur Hälfte zu sehen ist; unterbrechen, wenn weniger als ein Siebtel zu sehen ist; fortsetzen,
     wenn es wieder zur Hälfte da ist. Gibt eine Funktion zurück, die sagt, ob el gerade im Bild ist. */
  function imBild(el, o) {
    let da = false, erst = true;
    if (!el || !('IntersectionObserver' in window)) { da = true; if (o.starten) o.starten(); return () => da; }
    new IntersectionObserver(eintraege => {
      const q = eintraege[eintraege.length - 1].intersectionRatio;
      if (q >= .5 && !da) { da = true; if (erst) { erst = false; if (o.starten) o.starten(); } else if (o.fortsetzen) o.fortsetzen(); }
      else if (q < .15 && da) { da = false; if (o.unterbrechen) o.unterbrechen(); }
    }, { threshold: [0, .15, .5, 1] }).observe(el);
    return () => da;
  }

  // ---------- Navigation ----------
  /* Markiert die jetzige Seite (falls die Seite es nicht selbst tut) und klappt die Liste auf dem Telefon hinter „Inhalt“ zusammen;
     ein Tipp daneben, Esc oder die Wahl eines Verweises klappt sie wieder zu. Breit neben dem Globus läuft sie bis kurz vor ihn;
     passt sie dort nicht in eine Zeile, bricht sie nach „Untertext“ (.zweizeilig) statt vor einem einzelnen Wort. */
  function navZeilen() {
    $$('.nav').forEach(nav => {
      const liste = $('.nav-liste', nav);
      if (!liste) return;
      nav.classList.remove('zweizeilig');
      if (!breit() || !nav.closest('.mit-globus')) return;
      const zeile = parseFloat(getComputedStyle(liste).lineHeight) || 28;
      if (liste.getBoundingClientRect().height > zeile * 1.5) nav.classList.add('zweizeilig');
    });
  }
  let navBereit = false;
  function navigation() {
    document.documentElement.classList.add('js');
    $$('.nav').forEach(nav => {
      if (nav.dataset.bereit) return;
      nav.dataset.bereit = '1';
      if (!$('[aria-current="page"]', nav)) {
        const datei = decodeURIComponent(location.pathname.split('/').pop() || '');
        $$('a', nav).forEach(a => { const h = a.getAttribute('href') || ''; if (datei && h === datei) a.setAttribute('aria-current', 'page'); });
      }
      const knopf = $('.nav-schalter', nav), liste = $('.nav-liste', nav);
      if (!knopf || !liste) return;
      if (!liste.id) liste.id = 'nav-liste';
      knopf.setAttribute('aria-controls', liste.id);
      const setzen = auf => { knopf.setAttribute('aria-expanded', String(auf)); nav.classList.toggle('ist-offen', auf); };
      setzen(false);
      knopf.addEventListener('click', () => setzen(knopf.getAttribute('aria-expanded') !== 'true'));
      document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('ist-offen')) { setzen(false); knopf.focus(); } });
      document.addEventListener('pointerdown', e => { if (nav.classList.contains('ist-offen') && !nav.contains(e.target)) setzen(false); }, true);
      liste.addEventListener('click', e => { if (e.target.closest('a')) setzen(false); });
    });
    navZeilen();
    if (navBereit) return;
    navBereit = true;
    let uhr = 0;
    window.addEventListener('resize', () => { clearTimeout(uhr); uhr = setTimeout(navZeilen, 100); });
    schriften(3000).then(navZeilen);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', navigation); else navigation();

  window.FSeite = {
    SEITEN, NBSP, NNBSP,
    $, $$, esc, sauber, hash, wert, ruhig, schmal, breit, masz,
    zahlwort, gross, tausender, grad, koord, entfernungKm, km, jahrText, chr, jahrMarke,
    schriften, satzzeichenBinden,
    FARBEN, SIENA, SIENA_EBENE, globus, blickFuer,
    tafel, tafelReservieren, tafelPlatz, stationen, stationInhalt, ursprungOrte, ursprungInhalt,
    karteikarte, buch, werkKarte, navigation,
    leselinie, fortschritt, imBild
  };
})();
