/* Gemeinsame Hilfen aller Seiten von Version C, als window.FSeite. Verbindlich: docs/gestaltung-website-c.md.
   Grundlage ist seite.js von Version A; alle Funktionen von A stehen weiter bereit, damit die Seiten laufen, solange sie
   umgebaut werden. Neu in C: die Tafel mit der Steuerzeile darüber, Ortsleiste, Ablauf (Einspieler und eigene Bedienung an jedem
   Globus), Buchzeile, gezeichnete Zeichen, die Namen auf dem Globus aufrecht und in Tinte, die Rückenfarben (buch.farbe).

   Braucht daten/inhalt.js (window.INHALT). Für den Globus außerdem lib/d3.min.js, lib/topojson-client.min.js, daten/welt-110m.js,
   daten/laender-de.js, daten/uk-landesteile.js und globus/kern.js (auf Ursprung auch daten/fluesse.js); für Bücher daten/buecher.js
   und daten/leseliste.js. Fehlt etwas (etwa ohne Netz), geben die Funktionen null oder leere Listen zurück, und die Seite bleibt ruhig.

   Übersicht (alles unter window.FSeite):
     SEITEN, NBSP, NNBSP            Dateinamen der Seiten (relativ, flach in einem Ordner); geschützte Leerzeichen
     $(sel, wurzel), $$(sel, wurzel) querySelector, querySelectorAll als Liste
     esc(s), sauber(s)              HTML maskieren; Zeichenreste aus dem Export entfernen
     hash(s), wert(s, a, b)         fester Hash statt Zufall; Zahl zwischen a und b aus einem Text
     ruhig(), schmal(), breit()     reduzierte Bewegung; Telefonbreite (< 640 px); zwei Spalten mit angeschnittenem Globus (ab 62,0625 rem)
     masz(name)                     eine CSS-Länge oder Variable in Pixeln, etwa masz('--rand-l')
     zahlwort(n), gross(s), tausender(n)
     grad(x, plus, minus), koord(lat, lon)        „51° 31′ N, 7° 28′ O“
     entfernungKm(a, b), km(a, b)   Luftlinie (C zeigt sie nicht mehr; bleibt für alte Aufrufe)
     jahrText(j), chr(t), jahrMarke(jahr)          „um 1800 v. Chr.“; „v. Chr.“ zusammenhalten; Marke der Tafel („seit“ klein darüber)
     schriften(ms)                  Promise: Vollkorn aufrecht und kursiv geladen (oder Zeit abgelaufen)
     schriftEinstieg(ms)            Promise<boolean>: die IM Fell ist innerhalb von ms da (Vorgabe 600 ms)
     satzzeichenBinden(wurzel)      Satzzeichen nach einem Knopf-Wort an das Wort binden
     gleichBreit(elemente)          halbfett ohne Sprung: eine Sperrung (--ausgleich) gleicht die Mehrbreite aus
     zeichen(art)                   gezeichnetes Zeichen als SVG: 'wohnort', 'aufenthalt' (Karte); 'ruecken', 'liebste', 'wieder',
                                    'abgebrochen', 'auszug' (Regal)
     FARBEN                         Farben des Globus (Abschnitt 4.1); SIENA, SIENA_EBENE sind Altnamen ohne Wirkung
     globus(opts)                   Globus mit den gemeinsamen Farben, Schriften und Namen; gibt die Maschine zurück oder null
     blickFuer(canvas, orte, bereich)  Mitte [lon, lat], bei der alle Orte im sichtbaren Teil des Globus stehen
     ueberblick(canvas, orte, k)    { mitte, k } für den Schluss eines Einspielers
     tafel(el, inhalt), tafelReservieren(el, inhalte), tafelPlatz(el, inhalte, platz)
     steuerzeile(tafelEl)           die Steuerzeile eines Globus, direkt unter der Kugel über der Tafel (früher, später, Steuerwort)
     ortsleiste(el, eintraege)      Orte als Knöpfe in einer fließenden Zeile, durch Komma getrennt
     ablauf(opts)                   Einspieler und Bedienung eines Globus (siehe dort); TAKT: die Takte aus Abschnitt 7.2
     stationen(), stationInhalt(s)  Lebensstationen aus INHALT.leben; ihre Tafel
     szenen()                       die Szenen von Satoshi mit Ort und Koordinaten
     ursprungOrte(), ursprungInhalt(i)   die vier Orte der Trilogie; Tafel für einen Ort (-1: die ganze Trilogie)
     buchzeile(el, o)               die Buchzeile unter einem Brett: zeigen, schliessen, umschalten (Escape schließt)
     buch.alle(), buch.satz(b, { person }), buch.zeile(b), buch.karte(b), buch.nachname(a), buch.titelKurz(t), buch.ordnung
     buch.farbe(b), buch.familie(b), buch.DE_VERLAG   Rückenfarbe { grund, tinte, dunkel } aus den Verlagsfamilien (4.2)
     werkSatz(id, { person }), werkKarte(id, { person })   Buchzeile und Karteikarte eines eigenen Werks
     karteikarte.oeffnen(inhalt, ausloeser), .schliessen(), .offen()   nur noch für den Übergang; C zeigt die Buchzeile
     texte.alle(art), texte.satz(s), texte.datum(d), texte.punkt(s), texte.ARTEN   Texte aus daten/texte.js
     navigation()                   Navigation einrichten (läuft beim Laden von selbst)
     fuss(), PROFILE                Newsletter-Zeile und Profile im Fuß (läuft beim Laden von selbst); PROFILE: Liste der Profile
     leselinie(elemente, beiSchritt, o)   beim Scrollen: welches Element zuletzt die Leselinie erreicht hat (vor und zurück)
     fortschritt(element, beiWert, o)     beim Scrollen: wie weit ein Element durch das Fenster gewandert ist, 0 bis 1
     imBild(element, { starten, unterbrechen, fortsetzen })   eine Chronik hält an, wenn ihr Globus aus dem Bild ist
*/
(function () {
  'use strict';
  const inhalt = () => window.INHALT || {};
  const NBSP = ' ', NNBSP = ' ';

  // Dateinamen der Seiten; alle liegen nebeneinander in einem Ordner, Verweise sind relativ (für http:// und file://)
  const SEITEN = {
    start: 'index.html', satoshi: 'satoshi.html', ursprung: 'ursprung.html', erzaehlungen: 'erzaehlungen.html', untertext: 'untertext.html',
    laender: 'laender.html', bibliothek: 'bibliothek.html', vita: 'vita.html', lesen: 'lesen.html', impressum: 'impressum.html', datenschutz: 'datenschutz.html'
  };

  // ---------- Kleine Werkzeuge ----------
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  // Reste aus dem Export entfernen: doppelt maskiertes &, Richtungszeichen
  const sauber = s => String(s == null ? '' : s).replace(/&amp;(amp;)*/g, '&').replace(/[‎‏]/g, '').trim();
  const esc = s => sauber(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // Feld als Text (maskiert) oder als { html } (unverändert)
  const teil = v => v == null || v === '' ? '' : typeof v === 'object' ? String(v.html || '') : esc(v);
  const warten = ms => new Promise(r => setTimeout(r, ms));
  // Unregelmäßiges nur aus den Daten: ein fester Hash statt Zufall
  function hash(s) { let h = 2166136261 >>> 0; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h; }
  const wert = (s, a, b) => a + (hash(s) % 100003) / 100003 * (b - a);
  const mq = q => !!(window.matchMedia && window.matchMedia(q).matches);
  const ruhig = () => mq('(prefers-reduced-motion: reduce)');
  const schmal = () => window.innerWidth < 640;
  const breit = () => mq('(min-width: 62.0625rem)');
  /* Wert einer CSS-Länge in Pixeln, auch für Variablen mit clamp() oder vw: masz('--rand-l'). Zeile und Ränder (ohne el gemessen)
     gelten bis zur nächsten Größenänderung des Fensters; was eine Seite selbst setzt (etwa --tafel-h), wird jedes Mal gemessen */
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
     stärker angeschnitten). Gesetzt, bevor die Seite ihren Globus baut, und bei jeder Größenänderung zuerst. Ändert sich die Breite
     ohne Größenänderung des Fensters (die Leiste erscheint), meldet FSeite eine Größenänderung, damit Kern und Seite neu messen. */
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
  const gross = s => String(s).charAt(0).toUpperCase() + String(s).slice(1);
  // Tausender erst ab fünf Stellen, mit schmalem geschütztem Leerzeichen: 1040, 12 000 (Abschnitt 3.9)
  const tausender = n => { const s = String(n); return /^\d{5,}$/.test(s) ? s.replace(/\B(?=(\d{3})+(?!\d))/g, NNBSP) : s; };
  // Grad und Minuten: 51° 31′ N
  function grad(x, plus, minus) {
    const a = Math.abs(x);
    let g = Math.floor(a), m = Math.round((a - g) * 60);
    if (m === 60) { g += 1; m = 0; }
    return g + '°' + NBSP + String(m).padStart(2, '0') + '′' + NBSP + (x >= 0 ? plus : minus);
  }
  const koord = (lat, lon) => grad(lat, 'N', 'S') + ', ' + grad(lon, 'O', 'W');
  const lonLat = x => Array.isArray(x) ? [x[0], x[1]] : [x.lon, x.lat];
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
  const km = (a, b) => tausender(entfernungKm(a, b)) + NBSP + 'km';
  // Jahr als Text: negative Jahre vor Christus, „um“ davor; frühe Jahre nach Christus mit „n. Chr.“
  const jahrText = j => j == null ? '' : j < 0 ? 'um' + NBSP + (-j) + NBSP + 'v.' + NBSP + 'Chr.' : j < 1000 ? 'um' + NBSP + j + NBSP + 'n.' + NBSP + 'Chr.' : String(j);
  // „um 8000 v. Chr.“ in einem Stück halten
  const chr = t => String(t).replace(/(\d) v\. Chr\./g, '$1' + NBSP + 'v.' + NBSP + 'Chr.').replace(/\bum (\d)/g, 'um' + NBSP + '$1');
  /* Marke der Tafel: „bis 2014“, „seit 2022“, „um 940“. Das Vorwort steht im Grad klein über der Zahl (stil.css: .tafel-marke .vor);
     ein echtes Leerzeichen bleibt für Vorlesen und Kopieren */
  const jahrMarke = jahr => {
    const m = /^(bis|seit|um) (.+)$/.exec(jahr || '');
    return m ? { html: '<span class="vor">' + m[1] + ' </span>' + esc(m[2]) } : String(jahr || '');
  };

  // ---------- Schrift und Satz ----------
  // Wartet, bis die Vollkorn aufrecht und kursiv geladen ist, höchstens ms Millisekunden
  function schriften(ms) {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    const laden = Promise.all(['19px "Vollkorn"', 'italic 19px "Vollkorn"'].map(f => document.fonts.load(f)));
    return Promise.race([laden, warten(ms || 2500)]).catch(() => {});
  }
  // Die IM Fell French Canon für den ersten Satz: true, wenn sie innerhalb von ms da ist (Abschnitt 02: höchstens 600 ms warten)
  function schriftEinstieg(ms) {
    if (!document.fonts || !document.fonts.load) return Promise.resolve(false);
    const laden = document.fonts.load('38px "IM Fell French Canon"').then(l => !!(l && l.length));
    return Promise.race([laden, warten(ms == null ? 600 : ms).then(() => false)]).catch(() => false);
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
  /* Halbfett ohne Sprung: eine Sperrung (--ausgleich, je Element gemessen, in em) gleicht die Mehrbreite des halbfetten Worts
     aus, damit Ortsleisten und Register beim Wählen nicht neu umbrechen (stil.css setzt sie nur im gewählten Zustand) */
  function gleichBreit(els) {
    const c = document.createElement('canvas').getContext('2d');
    return schriften(2500).then(() => {
      (els || []).forEach(el => {
        const t = el.textContent, n = Array.from(t).length;
        if (!n) return;
        const kursiv = getComputedStyle(el).fontStyle === 'italic' ? 'italic ' : '';
        c.font = kursiv + '400 100px Vollkorn'; const a = c.measureText(t).width;
        c.font = kursiv + '600 100px Vollkorn'; const b = c.measureText(t).width;
        el.style.setProperty('--ausgleich', ((a - b) / n / 100).toFixed(4) + 'em');
      });
    });
  }

  // ---------- Gezeichnete Zeichen ----------
  /* In Tinte (currentColor), ohne feste Farbe. Kartenzeichen wie auf der Kugel (Durchmesser 6 px, Kontur 1,1 px); die Zeichen des
     Regals auf einem kleinen Rücken: Punkt über dem Fuß (liebste), Strich über dem Kopf (wieder gelesen), gestrichelte Kontur
     (nicht zu Ende gelesen), gepunktete Kontur (in Auszügen) */
  function zeichen(art) {
    const svg = (w, h, innen) => `<svg class="zeichen zeichen-${art}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" focusable="false">${innen}</svg>`;
    // Ein kleiner Rücken, gefüllt wie ein gelesenes Buch im Zeitband (stil.css: .ruecken-grund); die Zeichen darauf in Tinte
    const ruecken = (zusatz, strich) => '<rect class="ruecken-grund" x="0" y="3" width="9" height="18"/>' +
      (strich ? `<rect x=".5" y="3.5" width="8" height="17" fill="none" stroke="currentColor"${strich}/>` : '') + (zusatz || '');
    switch (art) {
      case 'wohnort': case 'punkt': return svg(8, 8, '<circle cx="4" cy="4" r="3" fill="currentColor"/>');
      case 'aufenthalt': case 'kreis': return svg(8, 8, '<circle cx="4" cy="4" r="2.45" fill="none" stroke="currentColor" stroke-width="1.1"/>');
      case 'ruecken': return svg(9, 21, ruecken());
      case 'liebste': return svg(9, 21, ruecken('<circle cx="4.5" cy="15" r="1.5" fill="currentColor"/>'));
      case 'wieder': return svg(9, 21, ruecken('<path d="M0 1H9" stroke="currentColor"/>'));
      case 'abgebrochen': return svg(9, 21, ruecken('', ' stroke-dasharray="3 2"'));
      case 'auszug': case 'auszuege': return svg(9, 21, ruecken('', ' stroke-dasharray="1 2" stroke-linecap="round"'));
      default: return '';
    }
  }

  // ---------- Globus ----------
  // Farben aus Abschnitt 4.1 (dieselben Werte wie die Token in stil.css)
  const FARBEN = { papier: '#FFFEFC', land: '#F3F3F2', reise: '#C4C7CC', grenze: '#B0B3B8', kueste: '#9C9DA1', gradnetz: '#ECEDEE', tinte: '#1D1E21' };
  // Altnamen aus A: C hat keine Farbe für eigene Werke
  const SIENA = FARBEN.tinte;
  const SIENA_EBENE = {};

  /* Globus mit den gemeinsamen Farben und Schriften. Optionen wie Globus.erstellen (canvas, flaeche, tipp, hinweis, tippText,
     beimEingriff, beiChronikEnde, beimAnsichtWechsel, beiOrtKlick, farben, schrift, dauer); bereist, winzig und ansichten kommen
     aus INHALT.
     radHinweis: false (oder eine Funktion, die false gibt), wo der Globus beim Scrollen mitgeht: kein Hinweis auf Strg oder ⌘.
     namen: { orte(), spur(), aktiv() }: in Ruhe setzt FSeite die Ortsnamen selbst, als Namensblöcke wie in A, in einer zweiten
     Leinwand über dem Globus (dicht beieinander liegende Orte als Block mit Führungslinie; Namen meiden den Weg und den
     angeschnittenen Rand). In Bewegung setzt der Kern schlichte Namen an die Punkte.
       orte()  -> [{ name, text?, lat, lon, neben? }]   was jetzt beschriftet wird
       spur()  -> [{ lat, lon }]                        Stationen des Wegs bis zur jetzigen
       aktiv() -> 'Name' | null                         der gewählte Ort, halbfett
     Ob ein Ort gerade auf der Kugel steht, sagt der Kern (g.gezeigt(): während eines Einspielers nur die erreichten Orte); die
     Namen folgen ihm, die Seite gibt nur die Orte der Ebene. Ein Ort mit abK erscheint erst ab dieser Vergrößerung (oder gewählt).
     Rückgabe: die Maschine des Kerns mit den Zusätzen g.projektion, g.namenNeu() (Namen neu setzen), g.eingriffe und g.ortKlicks
     (Listen von Funktionen, die FSeite.ablauf nutzt). Ohne d3 oder Kern: null. */
  function globus(o) {
    o = o || {};
    const I = inhalt();
    if (!o.canvas || !(window.d3 && window.topojson && window.Globus && window.WELT_110M)) return null;
    const px = schmal() ? 14 : 15;
    const schrift = Object.assign({ ort: px + 'px "Vollkorn"', ortAktiv: '600 ' + px + 'px "Vollkorn"' }, o.schrift || {});
    const eingriffe = [], ortKlicks = [];
    let g = null, beschrifter = null, rund = false;
    const rundSetzen = k => {
      // Zwischen k = 1 und dem Lupenrand des Kerns (ab k = 1,15) wäre die Kugel kurz eckig vom Rand der Leinwand beschnitten
      const jetzt = k > 1.0005;
      if (o.flaeche && jetzt !== rund) { rund = jetzt; o.flaeche.classList.toggle('ist-rund', rund); }
    };
    try {
      g = window.Globus.erstellen({
        canvas: o.canvas, flaeche: o.flaeche, tipp: o.tipp, hinweis: o.hinweis,
        bereist: o.bereist || I.bereist || [], winzig: o.winzig || I.winzig || {}, ansichten: o.ansichten || I.ansichten || {},
        farben: Object.assign({}, FARBEN, o.farben || {}),
        schrift, daten50: o.daten50 || 'daten/welt-50m.js', dauer: o.dauer || 1000,
        namenInRuhe: !o.namen,
        tippText: o.tippText || (land => land.name),
        beimZeichnen: info => { rundSetzen(info.k); if (beschrifter) beschrifter(info); if (typeof o.beimZeichnen === 'function') o.beimZeichnen(info); },
        beiOrtKlick: (ort, i) => { ortKlicks.slice().forEach(f => f(ort, i)); if (typeof o.beiOrtKlick === 'function') o.beiOrtKlick(ort, i); },
        ortKlickbar: () => ortKlicks.length > 0 || typeof o.beiOrtKlick === 'function',
        rechterRand: () => Math.min(o.canvas.clientWidth, document.documentElement.clientWidth - o.canvas.getBoundingClientRect().left) - 4,
        beimEingriff: () => { eingriffe.slice().forEach(f => f()); if (typeof o.beimEingriff === 'function') o.beimEingriff(); },
        beiChronikEnde: grund => { if (typeof o.beiChronikEnde === 'function') o.beiChronikEnde(grund); },
        beimAnsichtWechsel: teile => { if (typeof o.beimAnsichtWechsel === 'function') o.beimAnsichtWechsel(teile); }
      });
    } catch (fehler) { g = null; }
    if (!g) return null;
    g.eingriffe = eingriffe;
    g.ortKlicks = ortKlicks;
    g.canvas = o.canvas;
    g.flaeche = o.flaeche || null;

    /* Der Kern misst seine Leinwand nur bei einer Größenänderung des Fensters neu. Ändert sich ihre Größe anders (die Seite setzt
       --tafel-h, die Bildlaufleiste erscheint), meldet FSeite eine Größenänderung */
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

    /* Jeder Hinweis erscheint höchstens einmal je Besuch und dann höchstens zwei Sekunden lang, egal wie oft der Kern ihn neu
       anstößt. Wo der Globus beim Scrollen mitgeht (radHinweis: false), entfällt der Hinweis auf Strg oder ⌘; der Hinweis für
       das Telefon bleibt */
    if (o.hinweis && 'MutationObserver' in window) {
      const el = o.hinweis;
      let zeigt = null, uhr = 0;
      const verbraucht = new Set();
      const radAus = () => (typeof o.radHinweis === 'function' ? o.radHinweis() : o.radHinweis) === false;
      /* Der Hinweis steht beim Zeiger oder Finger, der ihn ausgelöst hat: Wer mit dem Rad über der Kugel scrollt, scrollt die Seite,
         und oben an der Kugel wäre er dann schon aus dem Bild. Er haftet am Fenster, im sichtbaren Bereich */
      let zuletzt = null;
      const merken = (x, y) => { zuletzt = { x, y, t: performance.now() }; };
      // In der Einfangphase am Dokument: vor dem Kern, der den Hinweis im selben Ereignis auslöst
      document.addEventListener('wheel', e => { if (e.target === o.canvas) merken(e.clientX, e.clientY); }, { passive: true, capture: true });
      document.addEventListener('touchmove', e => { if (e.target === o.canvas && e.touches[0]) merken(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true, capture: true });
      function setzen() {
        if (!zuletzt || performance.now() - zuletzt.t > 400) { el.classList.remove('am-zeiger'); el.style.left = el.style.top = ''; return; }
        el.classList.add('am-zeiger');
        const b = el.offsetWidth, h = el.offsetHeight, W = document.documentElement.clientWidth, H = window.innerHeight;
        el.style.left = Math.round(Math.max(8, Math.min(W - b - 8, zuletzt.x + 16))) + 'px';
        el.style.top = Math.round(Math.max(8, Math.min(H - h - 8, zuletzt.y - h - 12))) + 'px';
      }
      new MutationObserver(() => {
        if (el.hidden) { clearTimeout(uhr); uhr = 0; if (zeigt) verbraucht.add(zeigt); zeigt = null; return; }
        const text = el.textContent;
        if (verbraucht.has(text) || (radAus() && /halten und scrollen/.test(text))) { el.hidden = true; return; }
        if (text === zeigt) return;
        zeigt = text;
        setzen();
        clearTimeout(uhr);
        uhr = setTimeout(() => { el.hidden = true; }, 2000);
      }).observe(el, { attributes: true, attributeFilter: ['hidden'], childList: true, characterData: true, subtree: true });
    }

    /* Früher sperrte g.sperren(true) die Länderhervorhebung mit einem Zuhörer, der auch das Drehen mit einem Finger verschluckte.
       Der Kern hebt Länder nur auf Ebenen mit laender: true hervor; sperren bleibt als leere Funktion für ältere Aufrufe */
    g.sperren = () => {};

    if (o.namen) beschrifter = namenEinrichten(g, o, schrift);
    g.namenNeu = () => { if (beschrifter) beschrifter.neu(); };
    if (beschrifter) beschrifter.neu();
    return g;
  }

  /* Ortsnamen in Ruhe, in einer eigenen Leinwand über dem Globus: aufrecht, alle in Tinte und gleich groß (auch die Nebenorte),
     der gewählte halbfett; dicht beieinander liegende Orte als Block mit Führungslinie (A). In Bewegung ist die Leinwand leer, dann
     setzt der Kern seine schlichten Namen. Gibt eine Funktion zurück, die der Kern nach jedem Bild aufruft; .neu() fordert ein
     Neusetzen an. */
  function namenEinrichten(g, o, schrift) {
    const d3 = window.d3, proj = g.projektion;
    const canvas = o.canvas, flaeche = o.flaeche || canvas.parentNode;
    let leinwand = $('canvas.namen', flaeche);
    if (!leinwand) { leinwand = document.createElement('canvas'); leinwand.className = 'namen'; leinwand.setAttribute('aria-hidden', 'true'); flaeche.appendChild(leinwand); }
    const nctx = leinwand.getContext('2d');
    const gedaechtnis = new Map();
    const N = o.namen;
    const liste = f => { try { return (typeof f === 'function' ? f() : f) || []; } catch (e) { return []; } };

    // Was der Kern gerade zeigt (null: alles); während eines Einspielers nur die erreichten Orte
    const gezeigtJetzt = () => (typeof g.gezeigt === 'function' ? g.gezeigt() : null);
    function spurPunkte(mitte, skala) {
      const gz = gezeigtJetzt();
      const st = liste(N.spur).filter(s => !gz || gz.has(s.name));
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
        if (Math.hypot(pkte[a].p[0] - pkte[b].p[0], pkte[a].p[1] - pkte[b].p[1]) < T) eltern[wurzel(a)] = wurzel(b);
      }
      const m = new Map();
      pkte.forEach((x, i) => { const r = wurzel(i); if (!m.has(r)) m.set(r, []); m.get(r).push(x); });
      return [...m.values()].map(orte => ({ orte: orte.sort((x, y) => x.i - y.i) }));
    }
    function leeren() { nctx.setTransform(1, 0, 0, 1, 0, 0); nctx.clearRect(0, 0, leinwand.width, leinwand.height); }
    function beschriften() {
      const S = canvas.clientWidth || 0;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      if (leinwand.width !== Math.round(S * dpr)) { leinwand.width = Math.round(S * dpr); leinwand.height = Math.round(S * dpr); }
      leeren();
      nctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const R = S / 2 - 2, k = proj.scale() / R, gezoomt = k > 1.15;
      const gz = gezeigtJetzt();
      const aktivName = typeof N.aktiv === 'function' ? N.aktiv() : null;
      const orte = liste(N.orte)
        .filter(x => (!gz || gz.has(x.name)) && (!x.abK || k > x.abK - .01 || x.name === aktivName))
        .map((x, i) => Object.assign({ i, text: x.text || x.kurz || x.name }, x));
      if (!orte.length || !S) return;
      const rot = proj.rotate(), mitte = [-rot[0], -rot[1]];
      const cr = canvas.getBoundingClientRect();
      const rechts = Math.min(S, document.documentElement.clientWidth - cr.left) - 4;
      const ecken = b => [[b[0], b[1]], [b[2], b[1]], [b[0], b[3]], [b[2], b[3]]];
      const imBereich = b => b[0] >= 2 && b[2] <= rechts && b[1] >= 2 && b[3] <= S - 2 &&
        ecken(b).every(([x, y]) => Math.hypot(x - S / 2, y - S / 2) < (gezoomt ? S / 2 - 7 : R * k - 3));
      const sicht = orte.filter(x => d3.geoDistance([x.lon, x.lat], mitte) < Math.PI / 2 - .02).map(x => Object.assign({ p: proj([x.lon, x.lat]) }, x));
      if (!sicht.length) return;
      const klein = schmal();
      const stil = x => {
        const px = klein ? 14 : 15, aktiv = !!aktivName && x.name === aktivName;
        return { px, font: (aktiv ? schrift.ortAktiv : schrift.ort) };
      };
      const belegt = sicht.map(x => [x.p[0] - 4.5, x.p[1] - 4.5, x.p[0] + 4.5, x.p[1] + 4.5]);
      const spur = spurPunkte(mitte, R * k);
      const trifft = (a, b, luft) => a[0] - luft < b[2] && a[2] + luft > b[0] && a[1] - luft < b[3] && a[3] + luft > b[1];
      const gruppen = gruppieren(sicht, klein ? 22 : 26);
      gruppen.forEach(gr => { gr.aktiv = gr.orte.some(x => aktivName && x.name === aktivName); });
      gruppen.sort((a, b) => b.aktiv - a.aktiv || b.orte.length - a.orte.length || a.orte[0].i - b.orte[0].i);
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
      // Führungslinien in der Farbe der Küste, dann die Namen mit 4 px Freistellung in Papier
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
            nctx.strokeStyle = FARBEN.kueste; nctx.lineWidth = .7; nctx.stroke();
          }
        }
        let y = box[1];
        zeilen.forEach(z => {
          nctx.font = z.font;
          const mittig = seite === 'N' || seite === 'S';
          nctx.textAlign = mittig ? 'center' : links ? 'right' : 'left';
          const x = mittig ? (box[0] + box[2]) / 2 : links ? box[2] - 1 : box[0] + 1;
          nctx.lineWidth = 4; nctx.strokeStyle = FARBEN.papier;
          nctx.strokeText(z.text, x, y + z.h / 2);
          nctx.fillStyle = FARBEN.tinte;
          nctx.fillText(z.text, x, y + z.h / 2);
          y += z.h;
        });
      });
    }
    // Der Kern meldet jedes Bild: in Bewegung leer, in Ruhe (ein Bild später) die Namensblöcke
    let gesetzt = false, bild = 0;
    const anstossen = () => {
      if (bild) return;
      bild = requestAnimationFrame(() => { bild = 0; if (g.bewegt && g.bewegt()) return; beschriften(); gesetzt = true; });
    };
    const beiBild = info => {
      if (info.bewegt) { if (bild) { cancelAnimationFrame(bild); bild = 0; } if (gesetzt) { leeren(); gesetzt = false; } return; }
      anstossen();
    };
    beiBild.neu = anstossen;
    window.addEventListener('resize', anstossen);
    return beiBild;
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

  // Schluss eines Einspielers: alle Orte im Überblick, bei Vergrößerung k (Vorgabe 1), gesucht im bereich ({ lon, lat, schritt })
  function ueberblick(canvas, orte, k, bereich) {
    const m = blickFuer(canvas, orte, Object.assign({}, bereich || {}, { k: k || 1 }));
    return m ? { mitte: m, k: k || 1 } : undefined;
  }

  // ---------- Tafel (6.4) ----------
  /* Setzt eine Tafel. inhalt: { marke, kopf, zeichen, zusatz, unter, daten, satz, text, fuss }
       marke   Jahr oder Bandziffer, Grad groß; jahrMarke() setzt „bis“, „seit“, „um“ klein darüber
       kopf    Ort oder Titel, Grad Überschrift; zeichen: 'wohnort' oder 'aufenthalt' davor; zusatz klein dahinter („Nevada“)
       unter   Art und Vermerk, Grad klein („Wohnort“, „längerer Aufenthalt, Freiwilligenprojekt mit AIESEC“)
       daten   Koordinaten, Grad klein
       satz, text   ein Satz oder Absatz im Grad Text (Szenentext, die Zeile zum Band)
       fuss    HTML für einen Fuß (etwa der Verweis auf einen Länderguide); false oder leer: kein Fuß
     Die Steuerzeile steht nicht in der Tafel, sondern darüber, direkt unter der Kugel (steuerzeile()); Neusetzen der Tafel lässt sie
     und ihren Fokus in Ruhe. Textfelder werden maskiert, { html } bleibt unverändert. neben und eigen bleiben als Klassen
     (ist-neben, ist-eigen) ohne Aussehen. */
  function tafel(el, t) {
    if (!el) return;
    t = t || {};
    el.classList.add('tafel');
    el.classList.toggle('ist-neben', !!t.neben);
    el.classList.toggle('ist-eigen', !!t.eigen);
    const zeile = (cls, v) => v ? `<p class="${cls}">${teil(v)}</p>` : '';
    const kopf = t.kopf ? `<p class="tafel-kopf">${t.zeichen ? zeichen(t.zeichen) : ''}${teil(t.kopf)}${t.zusatz ? ` <span class="zusatz">${teil(t.zusatz)}</span>` : ''}</p>` : '';
    el.innerHTML = `<p class="tafel-marke">${teil(t.marke)}</p><div class="tafel-inhalt">${kopf}${zeile('tafel-unter', t.unter)}${zeile('tafel-daten', t.daten)}${zeile('tafel-satz', t.satz)}${zeile('tafel-text', t.text)}${typeof t.fuss === 'string' && t.fuss ? `<p class="tafel-fuss">${t.fuss}</p>` : ''}</div>`;
  }
  // Hält die Höhe der Tafel fest: so hoch wie ihr längster Inhalt bei der jetzigen Breite, damit darunter nichts springt
  function tafelHoeheVon(el, inhalte) {
    if (!el || !el.parentNode || !el.clientWidth) return 0;
    const probe = el.cloneNode(false);
    probe.removeAttribute('id'); probe.removeAttribute('aria-live');
    probe.setAttribute('aria-hidden', 'true');
    probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;left:0;top:0;margin:0;min-height:0;width:${el.clientWidth}px`;
    el.parentNode.appendChild(probe);
    let h = 0;
    (inhalte || []).forEach(x => { tafel(probe, x); h = Math.max(h, probe.getBoundingClientRect().height); });
    probe.remove();
    return Math.ceil(h);
  }
  function tafelReservieren(el, inhalte) {
    if (!el || !el.parentNode || !el.clientWidth) return;
    el.style.minHeight = tafelHoeheVon(el, inhalte) + 'px';
  }
  /* Wie tafelReservieren; breit dazu --tafel-h: Platz unter der Kugel für die Steuerzeile und die Tafel mit ihrem längsten Inhalt
     (aus platz, Vorgabe inhalte). Der Globus nimmt die übrige Fensterhöhe, so passen Kugel, Steuerzeile und Tafel zusammen auf einen
     Schirm. Bis zu dreimal nachgemessen, denn die Breite der Tafel hängt an der Größe der Kugel. */
  function tafelPlatz(el, inhalte, platz) {
    const wurzel = document.documentElement.style;
    if (!breit()) wurzel.removeProperty('--tafel-h');
    for (let n = 0; n < 3; n++) {
      tafelReservieren(el, inhalte);
      if (!breit()) break;
      const kasten = el && el._steuerKasten;
      const steuer = kasten && kasten.parentNode ? kasten.getBoundingClientRect().height : 0;
      const tafelH = platz ? tafelHoeheVon(el, platz) : (parseFloat(el.style.minHeight) || 0);
      const soll = Math.ceil(tafelH + steuer + masz('--z') * .75);
      if (!tafelH || Math.abs(soll - masz('--tafel-h')) < 1) break;
      wurzel.setProperty('--tafel-h', soll + 'px');
    }
  }
  /* Die Steuerzeile eines Globus: „früher“, „später“ und ein Steuerwort, drei Knöpfe direkt unter der Kugel, über der Tafel, im
     Raster der Tafel (breit bündig mit ihrem Inhalt und der Kante der Kugel, auf dem Telefon über die ganze Breite). Sie steht auf
     allen vier Globen an derselben Stelle und springt nie, wie lang der Text der Tafel auch ist. Einmal je Tafel; FSeite.ablauf
     beschriftet sie. Ist sie verborgen (eine Ebene ohne Ablauf), hält sie ihren Platz. */
  function steuerzeile(el) {
    if (!el) return null;
    if (el._steuerzeile) return el._steuerzeile;
    const kasten = document.createElement('div');
    kasten.className = 'steuer';
    kasten.innerHTML = '<span class="steuer-rand" aria-hidden="true"></span><div class="tafel-inhalt"><p class="steuerzeile"><button type="button" class="wort" data-steuer="frueher">früher</button><button type="button" class="wort" data-steuer="spaeter">später</button><button type="button" class="wort" data-steuer="wort" hidden>abspielen</button></p></div>';
    if (el.parentNode) el.parentNode.insertBefore(kasten, el);
    const p = $('.steuerzeile', kasten);
    el._steuerzeile = p;
    el._steuerKasten = kasten;
    return p;
  }
  /* Ortsleiste: eintraege [{ text, name? }] als Knöpfe mit data-station (der Index), durch Komma getrennt; text ist sichtbar
     („Dortmund bis 2014“), name der Name für Vorleseprogramme, wenn er anders lauten soll („Kobe, 2007“). Ort und Jahr bleiben
     zusammen. Die Knöpfe bekommen aria-pressed; FSeite.ablauf markiert die jetzige Station. */
  function ortsleiste(el, eintraege) {
    if (!el) return null;
    el.classList.add('ortsleiste');
    el.innerHTML = (eintraege || []).map((e, i) => `<span class="glied"><button type="button" class="wort" data-station="${i}" aria-pressed="false"${e.name ? ` aria-label="${esc(e.name)}"` : ''}>${teil(e.html ? { html: e.html } : e.text)}</button>${i < eintraege.length - 1 ? ',' : ''}</span>`).join(' ');
    gleichBreit($$('[data-station]', el));
    return el;
  }

  // ---------- Lebensstationen, Szenen, Trilogie ----------
  // Lebensstationen aus INHALT.leben
  const stationen = () => (inhalt().leben || []).map(s => ({ name: s.name, lat: s.lat, lon: s.lon, neben: !!s.neben, jahr: s.jahr, land: s.land || '', projekt: s.projekt || '' }));
  /* Tafel für eine Lebensstation: Kartenzeichen und Ort, darunter die Art mit dem Vermerk aus der Vita. Die Luftlinie entfällt
     (V20, Textänderung 12), die Koordinaten auch (Dominik, 21. Oktober: nicht auf der Startseite) */
  function stationInhalt(s) {
    return {
      zeichen: s.neben ? 'aufenthalt' : 'wohnort',
      marke: jahrMarke(s.jahr), kopf: s.land ? s.name + ', ' + s.land : s.name, neben: !!s.neben,
      unter: (s.neben ? 'längerer Aufenthalt' : 'Wohnort') + (s.projekt ? ', ' + s.projekt : '')
    };
  }
  // Die Szenen von Satoshi der Reihe nach, mit Ort und Koordinaten: { name, kurz, notiz, jahr, text, lat, lon }
  function szenen() {
    const S = inhalt().satoshi || {}, orte = {};
    (S.orte || []).forEach(o => { orte[o.name] = o; });
    return (S.szenen || []).map((sz, i) => {
      const o = orte[sz.ort] || {};
      return { i, name: sz.ort, kurz: o.kurz || sz.ort, notiz: o.notiz || '', jahr: sz.jahr, text: sz.text, lat: o.lat, lon: o.lon };
    }).filter(s => s.lat != null);
  }
  // Die vier Orte der Reihe nach: Göbekli Tepe, Uruk, Tyros, Jerusalem
  const ursprungOrte = () => (inhalt().ursprung || []).map((o, i) => ({ i, name: o.name, lat: o.lat, lon: o.lon, band: o.band, jahr: o.jahr }));
  /* Tafel für einen Ort der Trilogie (Startseite und Seite der Trilogie gleich): die Bandziffer als Marke, der Ort als Kopf,
     darunter Landschaft und Zeit, die Koordinaten und die Zeile zum Band (INHALT.baende, V40). -1 ist die ganze Trilogie. */
  function ursprungInhalt(i) {
    const I = inhalt(), orte = ursprungOrte(), band = {};
    ((I.trilogie && I.trilogie.baende) || []).forEach(b => { band[b.band] = b; });
    const o = orte[i];
    if (!o) return { eigen: true, marke: 'I–III', kopf: (I.trilogie && I.trilogie.titel) || 'Ursprung', satz: chr('Drei Bände, um 8000, 2700 und 940 v. Chr.') };
    const b = band[o.band] || {};
    const m = String((I.baende || {})[o.band] || '').match(/^(.*?v\. Chr\.)\s+(.+)$/);
    const landschaft = m ? m[1] : [b.ort, b.zeit].filter(Boolean).join(', ');
    // Tyros steht nur auf dem Globus, als die Stadt der Phönizier, aus der Thyra kommt
    const unter = o.name === b.ort ? landschaft.replace(new RegExp('^' + o.name + '\\s+'), '') : 'die Stadt der Phönizier, ' + (b.zeit || o.jahr || '');
    // Ohne Kartenzeichen: auf dieser Karte sind alle Orte gleich, und neben der Bandziffer läse sich der Punkt wie „I •“
    return { eigen: true, marke: o.band, kopf: o.name, unter: chr(unter), daten: koord(o.lat, o.lon), text: m ? m[2] : '' };
  }

  // ---------- Ablauf am Globus (6.4, 6.5, 7.2) ----------
  // Die Takte der Einspieler; zoom und halt als Zahl oder als Funktion (station, i)
  const europa = s => s.lon > -25 && s.lon < 45 && s.lat > 34;
  const woerter = s => String(s.text || '').trim().split(/\s+/).filter(Boolean).length;
  const TAKT = {
    leben: { flug: 1000, halt: 600, rueckweg: 500, zoom: s => europa(s) ? 3.6 : 2.4 },
    satoshi: { flug: 900, halt: 400, rueckweg: 450, zoom: 1.2 },
    satoshiAbspielen: { flug: 1000, halt: s => Math.max(3000, Math.min(9000, 1500 + 300 * woerter(s))), zoom: s => europa(s) ? 3.6 : 2.4 },
    ursprung: { flug: 1600, halt: 2000, zoom: 3.3, schlussK: 3.3, schlussBereich: { lon: [32, 48], lat: [26, 40], schritt: .25 } },
    europa
  };
  const STEUERWORT = { laeuft: 'anhalten', weiter: 'abspielen', ende: 'noch einmal von vorn' };

  /* Ein Ablauf verbindet Globus, Ortsleiste, Tafel und Steuerzeile einer Ebene, auf allen vier Globen gleich (6.4, 6.5).
     Beim ersten Sichtbarwerden läuft der Einspieler einmal: die Linie wandert von Stadt zu Stadt, Punkte und Namen erscheinen mit
     ihr, die Ortsleiste und (außer auf Satoshi) die Tafel gehen mit. Danach steuert man selbst. Jeder Griff an die Kugel beendet
     den Einspieler, dann steht der ganze Weg. Bei reduzierter Bewegung gibt es keinen Einspieler und kein Steuerwort.

     const a = FSeite.ablauf({
       globus: g,                    // FSeite.globus(…); ohne Globus gehen Ortsleiste, Tafel und früher/später trotzdem
       stationen: [...] | () => [...],   // { name, lat, lon, neben?, text? } in der Reihenfolge des Wegs
       takt: FSeite.TAKT.leben,      // Takt des Einspielers (Felder wie g.chronik); schluss: { mitte, k } | null (der Globus bleibt);
                                     // ohne schluss der Überblick über alle Orte bei schlussK (Vorgabe 1) im schlussBereich
       taktAbspielen: …,             // Takt, wenn der Besucher „abspielen“ wählt (Vorgabe: takt)
       schrittZoom: k | (s, i) => k, // Vergrößerung bei einem Schritt von Hand (Vorgabe: zoom des Takts)
       tafel: el,                    // die Tafel; bekommt die Steuerzeile in ihren Fuß (steuerzeile: false, wenn keine)
       ortsleiste: el | [el, …],     // Elemente mit Knöpfen [data-station]; ein Klick wählt die Station
       sichtbar: el,                 // der Einspieler beginnt, wenn el zur Hälfte im Bild ist (Vorgabe: die Fläche des Globus)
       beiStation(i, info),          // die Seite setzt die Tafel; i = -1 heißt: keine Station (Satoshi in Ruhe).
                                     // info: { quelle: 'einspieler' | 'abspielen' | 'hand' | 'ende' | 'ruhe' | 'wieder', zustand, station }
       tafelImEinspieler: true,      // false: beiStation kommt während des Einspielers nicht (Satoshi)
       ruhe: 'ende' | 'ruhe',        // nach dem Einspieler: 'ende' (die Tafel zeigt endeBei) oder 'ruhe' (nichts gewählt, Satoshi)
       endeBei: n - 1,               // die Station, die die Tafel am Ende zeigt (Leben: Berlin)
       wegBisStation: true,          // ein Schritt von Hand zeigt den Weg bis zu dieser Station; false: der ganze Weg bleibt
       aktiv: true                   // false: erst mit a.zeigen() (Ebenen der Startseite)
     });
     a.einspielen()   Einspieler starten (wartet, bis der Globus zur Hälfte zu sehen ist, und mindestens 600 ms nach seinem ersten Bild)
     a.abspielen(), a.anhalten(), a.vonVorn(), a.waehlen(i), a.waehlenName(name), a.frueher(), a.spaeter()
     a.zeigen()       die Ebene wird gezeigt: Weg und Tafel wie zuletzt, beim ersten Mal der Einspieler
     a.ruhen()        zurück in die Ruhe: ganzer Weg im Überblick, keine Station gewählt
     a.loesen()       die Ebene geht: ein laufender Ablauf endet, Klicks und Griffe gelten nicht mehr ihr
     a.zustand()      'bereit' | 'einspieler' | 'abspielen' | 'angehalten' | 'hand' | 'ende' | 'ruhe'
     a.jetzt()        Index der jetzigen Station oder -1
     Ein Klick auf einen Punkt des Globus wählt die Station dieses Orts; hat ein Ort mehrere Stationen (London), wählt der erste
     Klick die frühere, der nächste die spätere. */
  function ablauf(o) {
    o = o || {};
    const g = o.globus || null;
    const liste = () => (typeof o.stationen === 'function' ? o.stationen() : o.stationen) || [];
    const takt = o.takt || TAKT.leben;
    const zoomVon = v => typeof v === 'function' ? v : () => (v == null ? 2.4 : v);
    const schrittZoom = zoomVon(o.schrittZoom != null ? o.schrittZoom : takt.zoom);
    const endeBei = () => { const n = liste().length; const e = typeof o.endeBei === 'function' ? o.endeBei() : o.endeBei; return e == null ? n - 1 : Math.max(0, Math.min(n - 1, e)); };
    const tafelEl = o.tafel || null;
    const sz = o.steuerzeile === false ? null : (o.steuerzeile || (tafelEl ? steuerzeile(tafelEl) : null));
    const leisten = [].concat(o.ortsleiste || []).filter(Boolean);
    const flaeche = o.sichtbar || (g && g.flaeche) || null;
    let zustand = 'bereit', art = null, jetzt = -1, weiterAb = 0, orteModus = 'bis';
    let gespielt = false, aktiv = o.aktiv !== false, lauf = 0, systemPause = false, wartetAufSicht = false, startUhr = 0;
    let anteil = 1;

    const laeuft = () => zustand === 'einspieler' || zustand === 'abspielen';
    function steuerZeigen() {
      if (!sz || !aktiv) return;
      sz.hidden = false;
      const n = liste().length;
      const [fr, sp, wo] = ['frueher', 'spaeter', 'wort'].map(k => $(`[data-steuer="${k}"]`, sz));
      // Wird das Wort mit dem Fokus leise (später an der letzten Station), geht der Fokus auf das andere, statt verloren zu gehen
      const hatte = sz.contains(document.activeElement) ? document.activeElement : null;
      fr.disabled = !(jetzt > 0);
      sp.disabled = !(jetzt < n - 1);
      if (ruhig() || !g) wo.hidden = true;
      else {
        wo.hidden = false;
        wo.textContent = laeuft() ? STEUERWORT.laeuft : zustand === 'ende' ? STEUERWORT.ende : STEUERWORT.weiter;
      }
      if (hatte && (hatte.disabled || hatte.hidden)) {
        const ziel = [fr, sp, wo].find(b => !b.disabled && !b.hidden);
        if (ziel) ziel.focus({ preventScroll: true });
      }
    }
    function leisteZeigen() {
      leisten.forEach(l => $$('[data-station]', l).forEach(b => {
        b.setAttribute('aria-pressed', String(+b.dataset.station === jetzt && zustand !== 'ruhe' && zustand !== 'bereit'));
      }));
    }
    function melden(i, quelle) {
      jetzt = i;
      leisteZeigen(); steuerZeigen();
      if (tafelEl) tafelEl.setAttribute('aria-live', quelle === 'einspieler' ? 'off' : 'polite');
      if (quelle === 'einspieler' && o.tafelImEinspieler === false) return;
      if (typeof o.beiStation === 'function') o.beiStation(i, { quelle, zustand, station: liste()[i] || null });
    }
    // Ende eines Ablaufs: Leben und Ursprung zeigen die Station endeBei, Satoshi nach dem Einspieler nichts
    function amEnde(vonArt) {
      if (o.ruhe === 'ruhe' && vonArt === 'einspieler') {
        zustand = 'ruhe'; jetzt = -1;
        if (g) g.aktiv(null);
        leisteZeigen(); steuerZeigen();
        if (tafelEl) tafelEl.setAttribute('aria-live', 'polite');
        if (typeof o.beiStation === 'function') o.beiStation(-1, { quelle: 'ruhe', zustand, station: null });
        return;
      }
      zustand = 'ende';
      const e = endeBei(), s = liste()[e];
      if (g && s) g.aktiv(s.name);
      melden(e, 'ende');
    }
    async function spielen(neuArt, ab, modus) {
      const st = liste();
      if (!g || !st.length) return;
      const nr = ++lauf;
      clearTimeout(startUhr);
      art = neuArt; zustand = neuArt; orteModus = modus; systemPause = false; gespielt = true;
      steuerZeigen();
      const t = Object.assign({}, neuArt === 'abspielen' && o.taktAbspielen ? o.taktAbspielen : takt);
      if (t.schluss === undefined) t.schluss = g.canvas ? ueberblick(g.canvas, st, t.schlussK || 1, t.schlussBereich) : undefined;
      const ende = st[endeBei()];
      t.ab = ab; t.orte = modus;
      t.endeAktiv = o.ruhe === 'ruhe' && neuArt === 'einspieler' ? null : ende ? ende.name : null;
      t.beiStation = (s, i) => { if (nr === lauf) melden(i, neuArt); };
      if (tafelEl && neuArt === 'einspieler') tafelEl.setAttribute('aria-live', 'off');
      const r = await g.chronik(st, t);
      if (nr !== lauf || !aktiv) return;
      if (r === 'fertig') amEnde(neuArt);
      else if (r === 'abgebrochen') griff();
    }
    // Ein Griff an die Kugel: der Einspieler endet mit dem ganzen Weg; ein Abspielen hält an, der Weg bleibt, wie weit er ist
    function griff() {
      if (!aktiv) return;
      clearTimeout(startUhr);
      if (zustand === 'einspieler' || (zustand === 'angehalten' && art === 'einspieler') || (zustand === 'bereit' && wartetAufSicht)) {
        lauf++; wartetAufSicht = false; systemPause = false; gespielt = true;
        if (g) { if (g.chronikLaeuft()) g.chronikStoppen(); g.nurOrte(null); g.routeZeigen(liste()); }
        amEnde('einspieler');
      } else if (zustand === 'abspielen') {
        lauf++; systemPause = false;
        if (g && g.chronikLaeuft()) g.chronikStoppen();
        zustand = 'angehalten'; weiterAb = jetzt + 1;
        steuerZeigen();
      }
    }
    function anhalten() {
      if (!laeuft()) return;
      lauf++;
      clearTimeout(startUhr);
      if (systemPause) systemPause = false;
      else {
        const stand = g ? g.chronikAnhalten() : null;
        weiterAb = stand ? (stand.unterwegs != null ? stand.unterwegs : stand.bei + 1) : jetzt + 1;
      }
      if (zustand === 'einspieler' && jetzt < 0) weiterAb = 0;
      zustand = 'angehalten';
      steuerZeigen();
    }
    function abspielen() {
      const n = liste().length;
      if (zustand === 'angehalten') return spielen('abspielen', Math.min(weiterAb, n), art === 'einspieler' ? 'bis' : orteModus);
      if (zustand === 'hand') return spielen('abspielen', Math.min(jetzt + 1, n), 'alle');
      if (zustand === 'ende') return vonVorn();
      if (zustand === 'ruhe') return spielen('abspielen', 0, 'alle');
      if (zustand === 'bereit') { if (g) g.nurOrte([]); return spielen('abspielen', 0, 'bis'); }
    }
    function vonVorn() { if (g) g.nurOrte([]); return spielen('abspielen', 0, 'bis'); }
    function waehlen(i) {
      const st = liste();
      if (!st[i] || !aktiv) return;
      lauf++;
      clearTimeout(startUhr);
      wartetAufSicht = false; systemPause = false; gespielt = true;
      if (g) {
        if (g.chronikLaeuft()) g.chronikStoppen();
        g.nurOrte(null);
        const z = schrittZoom(st[i], i);
        if (o.wegBisStation === false) { g.routeZeigen(st); g.ortAnfliegen(st[i], z); }
        else g.chronikSchritt(st, i, { zoom: z, dauer: 1000 });
      }
      art = 'hand';
      zustand = i === st.length - 1 ? 'ende' : 'hand';
      melden(i, 'hand');
    }
    function waehlenName(name) {
      const idx = liste().map((s, i) => s.name === name ? i : -1).filter(i => i >= 0);
      if (!idx.length) return false;
      const pos = idx.indexOf(jetzt);
      waehlen(pos >= 0 ? idx[(pos + 1) % idx.length] : idx[0]);
      return true;
    }
    /* Zurück in die Ruhe (Ursprung, wenn man über den ersten Band hinaus nach oben scrollt): der ganze Weg im Überblick, keine
       Station gewählt; „später“ führt zur ersten, das Steuerwort spielt ab */
    function ruhen() {
      const st = liste();
      if (!aktiv || zustand === 'ruhe' || !st.length) return;
      lauf++;
      clearTimeout(startUhr);
      wartetAufSicht = false; systemPause = false; gespielt = true;
      if (g) {
        if (g.chronikLaeuft()) g.chronikStoppen();
        g.nurOrte(null); g.routeZeigen(st); g.aktiv(null);
        const sch = takt.schluss !== undefined ? takt.schluss : (g.canvas ? ueberblick(g.canvas, st, takt.schlussK || 1, takt.schlussBereich) : null);
        if (sch) g.fliegen(sch.mitte || sch, sch.k || 1);
      }
      art = null; zustand = 'ruhe'; jetzt = -1;
      leisteZeigen(); steuerZeigen();
      if (typeof o.beiStation === 'function') o.beiStation(-1, { quelle: 'ruhe', zustand, station: null });
    }
    const frueher = () => { if (jetzt > 0) waehlen(jetzt - 1); };
    const spaeter = () => { if (jetzt < liste().length - 1) waehlen(jetzt + 1); };

    // Sichtbarkeit: Start ab der Hälfte im Bild, Pause unter einem Fünftel oder bei verborgenem Tab, weiter ab der Hälfte
    const imBildGenug = () => anteil >= .5 && !document.hidden;
    function einspielenJetzt() {
      wartetAufSicht = false;
      zustand = 'einspieler'; art = 'einspieler'; gespielt = true;
      steuerZeigen();
      const warte = Math.max(0, 600 - (performance.now() - (g.erstesBild || 0)));
      clearTimeout(startUhr);
      const nr = lauf;
      startUhr = setTimeout(() => { if (aktiv && nr === lauf && zustand === 'einspieler') spielen('einspieler', 0, 'bis'); }, warte);
    }
    function einspielen() {
      if (gespielt || !aktiv) return;
      const st = liste();
      if (ruhig() || !g || !st.length) {
        gespielt = true;
        if (g) { g.nurOrte(null); g.routeZeigen(st); }
        amEnde('einspieler');
        return;
      }
      g.nurOrte([]);
      g.routeZeigen(st, -1);
      if (!imBildGenug()) { wartetAufSicht = true; steuerZeigen(); return; }
      einspielenJetzt();
    }
    function sichtPruefen() {
      if (!aktiv || !g) return;
      if (imBildGenug()) {
        if (wartetAufSicht) einspielenJetzt();
        else if (systemPause && laeuft()) { systemPause = false; spielen(art, weiterAb, orteModus); }
      } else if ((anteil < .2 || document.hidden) && laeuft() && !systemPause && g.chronikLaeuft()) {
        lauf++;
        const stand = g.chronikAnhalten();
        weiterAb = stand ? (stand.unterwegs != null ? stand.unterwegs : stand.bei + 1) : jetzt + 1;
        systemPause = true;
      }
    }
    if (flaeche && 'IntersectionObserver' in window) {
      anteil = 0;
      new IntersectionObserver(e => { anteil = e[e.length - 1].intersectionRatio; sichtPruefen(); }, { threshold: [0, .2, .5, .75, 1] }).observe(flaeche);
    }
    document.addEventListener('visibilitychange', sichtPruefen);

    // Bedienung: Steuerzeile, Ortsleiste, Punkte auf dem Globus, Griffe
    if (sz) sz.addEventListener('click', e => {
      const b = e.target.closest('[data-steuer]');
      if (!b || b.disabled || !aktiv) return;
      const k = b.dataset.steuer;
      if (k === 'frueher') frueher();
      else if (k === 'spaeter') spaeter();
      else if (laeuft()) anhalten();
      else abspielen();
    });
    leisten.forEach(l => l.addEventListener('click', e => {
      const b = e.target.closest('[data-station]');
      if (b && l.contains(b) && aktiv) waehlen(+b.dataset.station);
    }));
    if (g && g.ortKlicks) g.ortKlicks.push(ort => { if (aktiv) waehlenName(ort.name); });
    if (g && g.eingriffe) g.eingriffe.push(() => griff());

    function zeigen() {
      aktiv = true;
      const st = liste();
      if (!gespielt) { einspielen(); steuerZeigen(); return; }
      if (g) {
        g.nurOrte(null);
        if (zustand === 'hand' || zustand === 'angehalten') { g.routeZeigen(st, jetzt); g.aktiv(st[jetzt] ? st[jetzt].name : null); }
        else { g.routeZeigen(st); g.aktiv(zustand === 'ruhe' || !st[jetzt] ? null : st[jetzt].name); }
      }
      if (zustand === 'einspieler' || zustand === 'abspielen') zustand = 'angehalten';
      leisteZeigen(); steuerZeigen();
      if (typeof o.beiStation === 'function') o.beiStation(zustand === 'ruhe' ? -1 : jetzt, { quelle: 'wieder', zustand, station: st[jetzt] || null });
    }
    function loesen() {
      if (!aktiv) return;
      lauf++;
      clearTimeout(startUhr);
      if (g && g.chronikLaeuft()) g.chronikStoppen();
      if (zustand === 'einspieler' || (zustand === 'angehalten' && art === 'einspieler') || (zustand === 'bereit' && wartetAufSicht)) {
        gespielt = true; wartetAufSicht = false;
        if (o.ruhe === 'ruhe') { zustand = 'ruhe'; jetzt = -1; } else { zustand = 'ende'; jetzt = endeBei(); }
      } else if (zustand === 'abspielen') { zustand = 'angehalten'; weiterAb = jetzt + 1; }
      systemPause = false;
      leisteZeigen();
      aktiv = false;
      if (sz) sz.hidden = true;
    }

    if (aktiv) { leisteZeigen(); steuerZeigen(); }
    return {
      einspielen, abspielen, anhalten, vonVorn, waehlen, waehlenName, frueher, spaeter, zeigen, loesen, ruhen,
      zustand: () => zustand, jetzt: () => jetzt, aktiv: () => aktiv, gespielt: () => gespielt
    };
  }

  // ---------- Karteikarte (nur noch für den Übergang) ----------
  /* C zeigt statt der Karte die Buchzeile (FSeite.buchzeile, Abschnitt 22). Die Karte bleibt, bis die Seiten umgebaut sind.
     Eine Karteikarte; auf dem Telefon unten am Bildschirm. Esc, „schließen“, ein Klick daneben oder Tab aus der Karte
     hinaus legt sie zurück, der Fokus geht an das auslösende Element zurück. Breit liegt sie über dem Auslöser, sonst darunter,
     sonst daneben; nie unter dem Kopf der Seite oder unter dem, was oben haftet (scroll-padding-top). Gerät der Auslöser beim
     Scrollen dorthin oder aus dem Fenster, legt sie sich zurück.
     oeffnen(inhalt, ausloeser): inhalt = { signatur, titel, unter, autor, zeilen: [], notiz, verweis: { href, text }, eigen, beimSchliessen }
       eigen: eigenes Werk (Titel kursiv); titelGerade: der Titel ist ein Sammelbegriff (Erzählungen, Länder)
       und steht gerade wie in Navigation und Werkverzeichnis. Textfelder werden maskiert, { html } bleibt unverändert.
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
    // Was oben frei bleibt: der Kopf der Seite und der Titel einer Unterseite, solange sie im Bild sind, und was oben haftet
    // (scroll-padding-top der Seite)
    const haftetOben = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    function frei() {
      const unten = el => el ? el.getBoundingClientRect().bottom : 0;
      const kb = Math.max(unten($('.kopf')), unten($('main h1.seitentitel'))), sp = haftetOben();
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
      k.classList.toggle('titel-gerade', !!x.titelGerade);
      const zeilen = (x.zeilen || []).filter(Boolean).map(teil);
      k.innerHTML =
        `<div class="karte-kopf"><span class="signatur">${teil(x.signatur)}</span><button type="button" class="wort karte-zu">schließen</button></div>` +
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
  /* buch.alle(): alle Bücher der vier Regale aus daten/buecher.js in einer Liste; was noch wartet, kommt aus daten/leseliste.js (r: 'leseliste'),
     ohne was schon im Regal steht oder auf dem Nachttisch liegt.
     Felder wie in daten/buecher.js (t, u, a, r, s, j, p, w, b, v) und dazu nn (Nachname), autor, key, sig (Signatur wie im Regal der Bibliothek:
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
      'Thomas von Aquin': 'Thomas von Aquin', 'Anonymous': '', 'Anonym': '', 'Die 19 Finaltexte': ''
    };
    const AUTOR = { 'Anonymous': 'Anonym' };
    // Bleibt draußen, falls ein Buch nicht im Regal stehen soll (derzeit nichts)
    const DRAUSSEN = [];
    // Malina erschien 1971 (1990 ist die englische Ausgabe), In der Strafkolonie 1919 (beide Ausgaben); der Untertitel der
    // Cornelsen-Ausgabe (ein Arbeitsheft für die Schule) fällt weg
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

    /* Rückenfarben (4.2): die Verlagsfamilien von A, gedämpft auf eine OKLCH-Buntheit von höchstens 0,035 (Reclam 0,07). Geändert
       sind nur #D8CC9F (jetzt #D2CCB3), die zwei Reclam-Töne (#DED39F, #D7CB98) und #76857E (jetzt #7B8A83, sonst unter 4,5 : 1).
       Startseite (Nachttisch) und Bibliothek nehmen dieselbe Farbe für dasselbe Buch. Die Rückenschrift steht in Tinte oder Papier,
       je nachdem, was auf dieser Farbe mehr Kontrast gibt; jede Farbe hier erreicht mindestens 4,5 : 1. */
    const DE_VERLAG = /suhrkamp|rowohlt|diogenes|kiepenheuer|kiwi|deutscher taschenbuch|\bdtv\b|hanser|fischer|insel|reclam|piper|ullstein|aufbau|luchterhand|wagenbach|klett|heyne|goldmann|\bbtb\b|kein & aber|\bmare\b|matthes|beck|thienemann|arena|bastei|droemer|knaur|scherz|dumont|hoffmann und campe|arche|kirschbuch|cornelsen|rediroma|carlsen|oetinger|ravensburger|blessing|verlag/i;
    const FAMILIEN = {
      schwarz: ['#262628', '#2D2D2F'],
      suhrkamp: ['#C9BBAF', '#B8C2AF', '#C6C0D2', '#D2CCB3', '#AABAC6', '#CDB5B2', '#B4C7C0'],
      reclam: ['#DED39F', '#D7CB98'],
      vintage: ['#EFEDE7', '#E7E5DF'],
      nyrb: ['#D7D6D0', '#CACCC7', '#DCD9CF'],
      dunkel: ['#3D4045', '#55585D', '#6E7175', '#8D8F92', '#A4A5A6'],
      genre: ['#5A6A7B', '#7B8A83', '#8A8F96', '#9EA3A6', '#B5B5B0', '#4F5961'],
      leinen: ['#DCD5C6', '#D1CAB9', '#E4DED1', '#C8C1B1'],
      creme: ['#F2EFE7', '#EAE7DF', '#E1DDD4', '#D5D2CA', '#E7E5E0', '#C9C7C2', '#BAB8B3']
    };
    function familie(b) {
      const v = (b.v || '').toLowerCase();
      if (/penguin (classics|modern classics|english library|twentieth)/.test(v)) return 'schwarz';
      if (/suhrkamp|insel/.test(v)) return 'suhrkamp';
      if (/reclam/.test(v)) return 'reclam';
      if (/vintage/.test(v)) return 'vintage';
      if (/new directions|nyrb|new york review/.test(v)) return 'nyrb';
      if (b.b === 'm' || /bantam|signet|del rey|orbit|ballantine|\btor\b|\bace\b|\bdaw\b|scholastic|puffin|speak|walker|hodder|philomel|amulet|hyperion|miramax|voyager|gollancz|pocket|\bdell\b|avon/.test(v)) return 'genre';
      if (DE_VERLAG.test(v)) return 'leinen';
      if (b.b === 'h' && /knopf|farrar|straus|scribner|little, brown|random house|harper|ecco|grove|pantheon|doubleday|houghton|picador|riverhead|viking|penguin press|simon|norton|crown|bloomsbury/.test(v)) return 'dunkel';
      return 'creme';
    }
    // Kontrast nach WCAG
    const hell = hex => {
      const c = hex.replace('#', '').match(/../g).map(x => parseInt(x, 16) / 255).map(v => v <= .04045 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4));
      return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
    };
    const kontrast = (a, b) => { const x = hell(a), y = hell(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
    /* Farbe eines Buchs: { grund, tinte, dunkel }. grund ist die Rückenfarbe, tinte die Rückenschrift als Token ('var(--tinte)' oder
       'var(--papier)'), dunkel heißt: die Schrift steht in Papier (dort zeigt die Kontur beim Zeigen eine Linie in Papier) */
    function farbe(b) {
      const farben = FAMILIEN[familie(b)];
      const grund = farben[hash((b.key || (b.t + '|' + b.a)) + 'f') % farben.length];
      const dunkel = kontrast(grund, FARBEN.tinte) < kontrast(grund, FARBEN.papier);
      return { grund, tinte: dunkel ? 'var(--papier)' : 'var(--tinte)', dunkel };
    }
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
    const REGALE = ['gelesen', 'kindheit', 'gerade', 'abgebrochen'];   // gelesen, Kindheit und Jugend, Nachttisch, nicht zu Ende gelesen
    const EPOCHEN = [['A', 1899], ['B', 1945], ['C', 1989], ['D', 2009], ['E', Infinity]];
    const jahrSig = j => j == null ? 'o.' + NBSP + 'J.' : j < 0 ? '−' + (-j) : String(j);
    const ordnung = (x, y) => (x.j == null) - (y.j == null) || (x.j || 0) - (y.j || 0) || x.nn.localeCompare(y.nn, 'de') || x.t.localeCompare(y.t, 'de');
    function alle() {
      if (cache) return cache;
      const draussen = b => DRAUSSEN.some(x => x.t === sauber(b.t) && x.a === sauber(b.a));
      const roh = (window.BUECHER || []).filter(b => b && REGALE.includes(b.r) && !draussen(b));
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
      const jahr = b.j == null ? '' : b.j < 1000 ? 'Entstanden ' + jahrText(b.j) : b.j < 1450 ? 'Entstanden um ' + b.j : 'Zuerst erschienen ' + b.j;
      // Ohne Verlag beginnt die Angabe mit „Etwa …“: als eigener Satz groß
      const ausgabe = gross([b.v, b.p ? (b.ungefaehr ? 'etwa ' : '') + tausender(b.p) + ' Seiten' : ''].filter(Boolean).join(', '));
      const notiz = [];
      if (b.r === 'gerade') notiz.push(er ? 'Liest er gerade.' : 'Lese ich gerade.');
      if (b.r === 'abgebrochen') notiz.push('Nicht zu Ende gelesen.');
      if (b.r === 'leseliste') notiz.push('Wartet noch.');
      if (b.r === 'kindheit') notiz.push('Aus Kindheit und Jugend.');
      if (b.s === 5 && b.r !== 'leseliste') notiz.push(er ? 'Eines seiner liebsten.' : 'Eines meiner liebsten.');
      if (b.x) notiz.push('In Auszügen gelesen.');
      if (b.w) notiz.push('Mehr als einmal gelesen.');
      return { signatur: b.sig || '', titel: b.t, unter: b.u, autor: b.autor, zeilen: [satz(jahr), satz(ausgabe)], notiz: notiz.join(' ') };
    }
    /* Die Buchzeile (6.13): ein Satz über ein Buch, als HTML. „Thomas Mann, <i>Buddenbrooks</i>. Zuerst erschienen 1901.
       Everyman’s Library, 731 Seiten.“ Dahinter die Notizen der Karte von A im selben Wortlaut („In Auszügen gelesen.“,
       „Lese ich gerade.“). person: 3 spricht von ihm, sonst spricht er selbst */
    function buchSatz(b, o) {
      const k = karte(b, o);
      const kopf = (b.autor ? esc(b.autor) + ', ' : '') + `<i>${esc(b.t)}</i>`;
      const ende = /[.!?…]$/.test(b.t) ? '' : '.';
      return [kopf + ende].concat((k.zeilen || []).filter(Boolean).map(esc), k.notiz ? [esc(k.notiz)] : []).join(' ');
    }
    // Eine Zeile über ein Buch: „Bukowski, Pulp, 1994“ als Text und als HTML (Titel kursiv)
    function zeile(b) {
      const zusatz = b.r === 'abgebrochen' ? 'nicht zu Ende gelesen' : b.r === 'gerade' ? 'lese ich gerade' : b.r === 'leseliste' ? 'wartet noch' : b.x ? 'in Auszügen' : '';
      const j = b.j != null ? jahrText(b.j) : '';
      return {
        text: [b.nn, b.t, j, zusatz].filter(Boolean).join(', '),
        html: [b.nn ? esc(b.nn) : '', `<i>${esc(b.t)}</i>`, j, zusatz].filter(Boolean).join(', ')
      };
    }
    return { alle, karte, satz: buchSatz, zeile, nachname, titelKurz, ordnung, farbe, familie, DE_VERLAG };
  })();

  // ---------- Eigene Werke ----------
  const WERK_SIG = { satoshi: 'DJ 1', 'ursprung-1': 'DJ 2/I', 'ursprung-2': 'DJ 2/II', 'ursprung-3': 'DJ 2/III', erzaehlungen: 'DJ 3', untertext: 'DJ 4', laender: 'DJ 5' };
  // Sammelbegriffe statt Werktitel: aufrecht wie in Navigation und Werkverzeichnis (kursiv nur Satoshi, Ursprung mit seinen Bänden
  // und Untertext)
  const WERK_GERADE = ['erzaehlungen', 'laender'];
  /* Karteikarte für ein eigenes Werk (id aus INHALT.werke); der Titel führt zur Seite des Werks (die Bände der Trilogie zur Seite der
     Trilogie). „Arbeitstitel“ steht klein hinter dem Titel. Für die Trilogie gilt nur „in Arbeit“. person: 3 spricht von ihm. */
  function werkKarte(id, o) {
    const I = inhalt(), er = !!o && o.person === 3;
    const w = (I.werke || []).find(x => x.id === id);
    if (!w) return null;
    const ziel = w.band ? SEITEN.ursprung : SEITEN[id] || '';
    const name = esc(w.buchtitel || w.titel);
    const titel = { html: (ziel ? `<a href="${ziel}">${name}</a>` : name) + (w.arbeitstitel ? ' <span class="arbeitstitel">Arbeitstitel</span>' : '') };
    const x = { signatur: (WERK_SIG[id] || 'DJ').replace(' ', NBSP), titel, eigen: true, titelGerade: WERK_GERADE.includes(id), autor: 'Dominik Jäkel' };
    const punkt = t => t && !/[.!?…]$/.test(t) ? t + '.' : t;
    if (id === 'satoshi') {
      const s = I.satoshi || {};
      x.unter = 'Roman';
      x.zeilen = [(s.eckdaten && s.eckdaten.stand) || ''];
      x.notiz = s.hook || w.text || '';
    } else if (w.band) {
      const b = ((I.trilogie && I.trilogie.baende) || []).find(y => y.band === w.band) || {};
      x.unter = 'Band ' + w.band + ' der Ursprungstrilogie';
      x.zeilen = [chr([b.ort, b.zeit].filter(Boolean).join(', ')), 'In Arbeit.'];
      x.notiz = punkt(b.thema || '');
    } else if (id === 'erzaehlungen') {
      x.unter = '';
      x.notiz = er ? 'Viele davon hat er auf der Werkstattbühne des Autorenforums Berlin e.' + NBSP + 'V. vorgestellt.' : 'Viele davon habe ich auf der Werkstattbühne des Autorenforums Berlin e.' + NBSP + 'V. vorgestellt.';
    } else {
      x.unter = w.art + (w.stand ? ', ' + w.stand : '');
    }
    return x;
  }
  /* Die Buchzeile eines eigenen Werks (6.10, 6.13): Titel als Verweis auf die Seite des Werks, Art und Stand. Ohne Stand (Erzählungen)
     steht der Satz der Karte dahinter. „<i>Satoshi</i>. Roman. Das Manuskript liegt vollständig vor, gerade entsteht die Endfassung.“ */
  function werkSatz(id, o) {
    const I = inhalt(), w = (I.werke || []).find(x => x.id === id), k = werkKarte(id, o);
    if (!w || !k) return '';
    const ziel = w.band ? SEITEN.ursprung : SEITEN[id] || '';
    const name = esc(w.buchtitel || w.titel), titel = WERK_GERADE.includes(id) ? name : `<i>${name}</i>`;
    const punkt = t => t && !/[.!?…]$/.test(t) ? t + '.' : t;
    const kopf = (ziel ? `<a href="${ziel}">${titel}</a>` : titel) + (w.arbeitstitel ? ' <span class="arbeitstitel">Arbeitstitel</span>' : '') + '.';
    const zeilen = (k.zeilen || []).filter(Boolean);
    const rest = [k.unter].concat(zeilen, zeilen.length ? [] : [k.notiz]).filter(Boolean).map(s => esc(punkt(s)));
    return [kopf].concat(rest).join(' ');
  }

  // ---------- Buchzeile (6.13) ----------
  /* Der Satz unter einem Brett, im Grad Text, aria-live. buchzeile(el, { beimSchliessen }) gibt zurück:
       zeigen(html, ausloeser, schluessel)   den Satz zeigen; der Auslöser (ein Rücken) bekommt die Klasse ist-offen (herausgezogen)
       umschalten(schluessel, html, ausloeser)   ein zweiter Klick auf dasselbe Buch schließt; gibt zurück, ob jetzt offen
       schliessen(fokus)   leeren, der Rücken geht zurück; mit fokus geht der Fokus an ihn zurück
       offen(), schluessel(), ausloeser()
     Escape schließt jede offene Buchzeile. Keine Signatur, kein „zurücklegen“, kein Kasten. */
  const buchzeilen = new Set();
  function buchzeile(el, o) {
    if (!el) return null;
    o = o || {};
    el.classList.add('buchzeile');
    el.setAttribute('aria-live', 'polite');
    let ausloeser = null, schluessel = null;
    const api = {
      el,
      zeigen(html, aus, key) {
        if (ausloeser && ausloeser !== aus) ausloeser.classList.remove('ist-offen');
        ausloeser = aus || null;
        schluessel = key == null ? (aus || html) : key;
        if (ausloeser) ausloeser.classList.add('ist-offen');
        el.innerHTML = html || '';
      },
      schliessen(fokus) {
        const a = ausloeser, warOffen = schluessel !== null;
        el.innerHTML = '';
        if (a) { a.classList.remove('ist-offen'); if (fokus && document.contains(a)) a.focus({ preventScroll: true }); }
        ausloeser = null; schluessel = null;
        if (warOffen && typeof o.beimSchliessen === 'function') o.beimSchliessen(a);
      },
      umschalten(key, html, aus) {
        if (schluessel !== null && key === schluessel) { api.schliessen(); return false; }
        api.zeigen(html, aus, key);
        return true;
      },
      offen: () => schluessel !== null,
      schluessel: () => schluessel,
      ausloeser: () => ausloeser
    };
    buchzeilen.add(api);
    return api;
  }
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    buchzeilen.forEach(b => { if (b.offen()) b.schliessen(true); });
  });

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

  // ---------- Texte zum Lesen (daten/texte.js) ----------
  /* Erzählungen, Einträge im Untertext und Länderguides stehen in window.TEXTE; erzaehlungen.html, untertext.html, laender.html und
     lesen.html lesen sie nur hierüber, damit alle dieselben Einträge gelten lassen.
       alle(art)    gültige Einträge (ohne art: alle), das neueste zuerst. Ungültige (slug, art, titel fehlt, ist ungültig oder
                    doppelt; ein Länderguide ohne land) stehen einmal als Warnung in der Konsole und bleiben draußen
       satz(s)      gerade Zeichen werden deutsche: "…" zu „…“, '…' zu ‚…‘, sonst ' zu ’ (Apostroph), ... zu …, ' - ' zu ' – '
                    (geschütztes Leerzeichen davor). Maskiert; nur <i>, <em> und <br> bleiben Auszeichnung
       datum(d)     '2026-03-14' → „14. März 2026“, '2026-03' → „März 2026“, '2026' → „2026“; ungültig: ''
       punkt(s), zeichenAmEnde(s)   ein Punkt ans Satzende, wenn dort noch kein Satzzeichen steht
       ARTEN        je Art die Liste, zu der ein Text gehört: { seite, alle (Verweis zurück), titelKursiv }
       BELEGT       Slugs, die schon Stellen der Seiten benennen */
  const texte = (function () {
    const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/, LAND = /^[A-Z]{2}(?:-[A-Z]{2,3})?$/;
    const BELEGT = ['inhalt', 'kontakt', 'kontakt-titel', 'nav-liste', 'lesen'];
    const ARTEN = {
      erzaehlung: { seite: SEITEN.erzaehlungen, alle: 'Alle Erzählungen', titelKursiv: true },
      untertext: { seite: SEITEN.untertext, alle: 'Alle Einträge im <i>Untertext</i>', titelKursiv: false },
      laenderguide: { seite: SEITEN.laender, alle: 'Alle Länder', titelKursiv: false }
    };
    const BUCHSTABE = /[\p{L}\p{N}]/u;
    // Verkürzte Wörter mit Apostroph vorn: 's, 'n, 'ne, 'raus …
    const VERKUERZT = /^(?:s|n|ne|nem|nen|ner|nes|m|raus|rein|rum|rüber|runter|rauf|ran|naus|nein|nüber|nunter|nauf)(?![\p{L}\p{N}])/u;
    /* Einfache gerade Anführungszeichen: am Wortanfang (Absatzanfang, nach Leerzeichen, „, (, [, Strich oder <i>) öffnet ' ein ‚,
       wenn später im Absatz ein schließendes folgt; das nächste ' danach, das nicht zwischen zwei Buchstaben steht, schließt mit ‘.
       Jedes übrige ' ist ein Apostroph ’ (geht's, Grass' Roman, 's war, '68). */
    function einfache(t) {
      let aus = '', offen = false;
      const schliesstSpaeter = ab => {
        for (let j = ab; j < t.length; j++) {
          if (t[j] !== "'") continue;
          if (/\s/.test(t[j - 1] || ' ')) continue;
          if (!BUCHSTABE.test(t[j + 1] || '')) return true;
        }
        return false;
      };
      // Was das nächste ' nach einer Stelle tut: 'oeffnet' (am Wortanfang), 'schliesst' oder nichts davon (null)
      const folgt = ab => {
        for (let j = ab; j < t.length; j++) {
          if (t[j] !== "'") continue;
          const v = t.slice(0, j);
          if (!v || /[\s(\[„‚–—]$/.test(v) || /<(?:i|em)>$/.test(v)) return 'oeffnet';
          if (!BUCHSTABE.test(t[j + 1] || '')) return 'schliesst';
        }
        return null;
      };
      for (let i = 0; i < t.length; i++) {
        const c = t[i];
        if (c !== "'") { aus += c; continue; }
        const vor = t.slice(0, i), nach = t.slice(i + 1);
        const anfang = !vor || /[\s(\[„‚–—]$/.test(vor) || /<(?:i|em)>$/.test(vor);
        const zwischen = BUCHSTABE.test(vor.slice(-1)) && BUCHSTABE.test(nach.charAt(0));
        // Genitiv nach s, ß, x, z innerhalb von ‚…‘ („‚Hans' Hut‘“): ein Apostroph, wenn vor dem nächsten Öffnen noch ein ' schließt
        if (offen && !anfang && !zwischen && /[sßxz]$/.test(vor) && /^\s/.test(nach) && folgt(i + 1) === 'schliesst') { aus += '’'; continue; }
        if (offen && !anfang && !zwischen) { aus += '‘'; offen = false; continue; }
        if (!offen && anfang && nach && !/^\s/.test(nach) && !VERKUERZT.test(nach) && !/^\d{2}(?!\d)/.test(nach) && schliesstSpaeter(i + 1)) {
          aus += '‚'; offen = true; continue;
        }
        aus += '’';
      }
      return aus;
    }
    function satz(s) {
      const t = einfache(String(s == null ? '' : s).trim()
        .replace(/\.\.\./g, '…')
        .replace(/ --? /g, ' – ')
        .replace(/(^|[\s(\[–—‚]|<i>|<em>)"(?=\S)/g, '$1„')
        .replace(/"/g, '“'));
      return t.replace(/&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/&lt;(\/?)(i|em)&gt;/g, '<$1$2>').replace(/&lt;br\s*\/?&gt;/g, '<br>');
    }
    function datum(d) {
      const m = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(String(d || '').trim());
      if (!m || (m[2] && !MONATE[+m[2] - 1]) || (m[3] && (+m[3] < 1 || +m[3] > 31))) return '';
      return (m[3] ? +m[3] + '. ' : '') + (m[2] ? MONATE[+m[2] - 1] + ' ' : '') + m[1];
    }
    // Satzende: ein Punkt, wenn noch kein Satzzeichen da ist (auch vor schließendem Anführungszeichen, Klammer oder Tag)
    const zeichenAmEnde = s => /[.!?…:]$/.test(String(s).replace(/<[^>]*>/g, '').replace(/[“‘’»«)\s]+$/, ''));
    const punkt = s => zeichenAmEnde(s) ? s : s + '.';
    const gemeldet = new Set();
    function gueltig(t, gesehen) {
      return !!t && typeof t.slug === 'string' && SLUG.test(t.slug) && !BELEGT.includes(t.slug) && !gesehen.has(t.slug)
        && Object.prototype.hasOwnProperty.call(ARTEN, t.art) && !!t.titel
        && (t.art !== 'laenderguide' || (typeof t.land === 'string' && LAND.test(t.land)));
    }
    function alle(art) {
      const gesehen = new Set();
      return (Array.isArray(window.TEXTE) ? window.TEXTE : []).filter(t => {
        if (!gueltig(t, gesehen)) {
          if (!gemeldet.has(t)) { gemeldet.add(t); console.warn('daten/texte.js: Eintrag übersprungen (slug, art, titel oder beim Länderguide land fehlt, ist ungültig oder doppelt)', t); }
          return false;
        }
        gesehen.add(t.slug);
        return !art || t.art === art;
      }).sort((a, b) => String(b.datum || '') > String(a.datum || '') ? 1 : String(b.datum || '') < String(a.datum || '') ? -1 : 0);
    }
    return { alle, satz, datum, punkt, zeichenAmEnde, ARTEN, BELEGT };
  })();

  // ---------- Fuß: Newsletter und Profile (6.2) ----------
  /* Profile im Fuß, unter Impressum und Datenschutz. Hier eintragen, sobald Dominik die Adressen gibt, in der Reihenfolge, in der
     sie stehen sollen, etwa { name: 'Instagram', url: 'https://…' }, { name: 'LinkedIn', url: 'https://…' }. Solange die Liste leer
     ist, bleibt die Zeile .profile verborgen; es gibt keine toten Verweise. */
  const PROFILE = [];
  /* Die Zeile „Benachrichtigung, wenn ein Buch erscheint oder eine Lesung ansteht“ (form.post im Fuß jeder Seite). Einen Newsletter-Dienst
     gibt es noch nicht: Eintragen schickt nichts ab und lädt nichts, es leert nur das Feld und zeigt den Dank in der Statuszeile.
     Ohne Skript ist das Formular verborgen (stil.css). */
  const POST_DANKE = 'Danke. Im Testsystem wird noch nichts verschickt.';
  function fuss() {
    $$('form.post').forEach(form => {
      if (form.dataset.bereit) return;
      form.dataset.bereit = '1';
      const status = $('.post-status', form);
      // Wer danach wieder tippt, sieht den Dank nicht mehr (er gälte sonst auch für eine neue, vielleicht ungültige Adresse)
      form.addEventListener('input', () => { if (status && status.textContent) status.textContent = ''; });
      form.addEventListener('submit', e => {
        e.preventDefault();
        form.reset();
        if (!status) return;
        // Zweimal eingetragen: erst leeren, damit Vorleseprogramme die Zeile noch einmal ansagen
        status.textContent = '';
        setTimeout(() => { status.textContent = POST_DANKE; }, 60);
      });
    });
    const profile = PROFILE.filter(p => p && p.name && /^https:\/\//.test(p.url || ''));
    $$('.profile').forEach(el => {
      el.innerHTML = profile.map(p => `<a href="${esc(p.url)}" rel="me">${esc(p.name)}</a>`).join(' ');
      el.hidden = !profile.length;
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fuss); else fuss();

  // ---------- Navigation (6.1) ----------
  /* Markiert die jetzige Seite (falls die Seite es nicht selbst tut). Die Navigation steht auf allen Breiten offen, ohne Schalter.
     Breit neben dem Globus läuft sie bis kurz vor ihn; passt sie dort nicht in eine Zeile, bricht sie nach „Untertext“
     (.zweizeilig) statt vor einem einzelnen Wort. */
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
    schriften, schriftEinstieg, satzzeichenBinden, gleichBreit, zeichen,
    FARBEN, SIENA, SIENA_EBENE, globus, blickFuer, ueberblick,
    tafel, tafelReservieren, tafelPlatz, steuerzeile, ortsleiste, ablauf, TAKT,
    stationen, stationInhalt, szenen, ursprungOrte, ursprungInhalt,
    karteikarte, buch, werkKarte, werkSatz, buchzeile, texte, navigation, fuss, PROFILE,
    leselinie, fortschritt, imBild
  };
})();
