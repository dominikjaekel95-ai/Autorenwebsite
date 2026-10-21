/* Version B (website-b): gemeinsame Hilfen aller Seiten, als window.FSeite.
   Neu geschrieben nach docs/gestaltung-website-b.md. Aus Version A übernommen sind Datenhelfer, Rechenwege und alle Wortlaute
   (buch: Titel, Ordnung, Nachname, Signatur, Karteikarte und Zeile wie in A; werkKarte; die Tafeln der Karten wie in A:
   stationInhalt, lebenUeberblick, satoshiInhalt, ursprungInhalt, reisenInhalt; jahrText, koord, km; texte; leselinie; blickFuer).
   Kein Markup, keine Klassen und kein Aussehen aus A: wie die Wortlaute von A in B stehen, legen tafelTeile und kartentafel fest.
   Farben, Grade und Schriften stehen in stil.css; was auf der Leinwand gezeichnet wird, liest seine Farben und Schriften aus den
   Tokens (tokens()).

   Braucht daten/inhalt.js. Für die Karte außerdem lib/d3.min.js, lib/topojson-client.min.js, daten/welt-110m.js,
   daten/laender-de.js, daten/uk-landesteile.js und globus/kern.js; für Bücher daten/buecher.js und daten/leseliste.js; für
   Erzählungen und Untertext daten/texte.js. Fehlt etwas, bleibt die Seite ruhig.

   Übersicht (alles unter window.FSeite):
     SEITEN, NBSP, NNBSP            Dateinamen der Seiten; geschütztes und schmales geschütztes Leerzeichen
     $(sel, wurzel), $$(…)          querySelector, querySelectorAll als Liste
     esc(s), sauber(s)              HTML maskieren; Reste aus dem Export entfernen
     ruhig(), desktop(), telefon()  reduzierte Bewegung; Raster ab 75 rem; unter 48 rem
     tokens()                       Farben und Schriften aus stil.css { papier, tinte, tinteRaster, blau, blauRaster, schrift }
     zahlwort(n), gross(s), tausender(n), jahrText(j), chr(t), versalien(html)
                                    Zahlwort bis 99; erster Buchstabe groß; 12 000 erst ab fünf Stellen; „um 750 v. Chr.“;
                                    „v. Chr.“ zusammenhalten; Versalabkürzungen ab drei Buchstaben als <abbr> (Kapitälchen)
     grad(x, plus, minus), koord(lat, lon), entfernungKm(a, b), km(a, b), jahrMarke(jahr)
                                    „51° 31′ N, 7° 28′ O“; Luftlinie auf 10 km gerundet, „8190 km“; „bis 2014“, „seit 2022“
     schriften(ms)                  Promise: Baskervville (Antiqua, Kursive, 500) geladen, höchstens ms
     gleichBreit(elemente)          Sperrung, die die Mehrbreite des halbfetten Worts ausgleicht (Auswahllisten)
     zeichen(art)                   gezeichnetes Zeichen als SVG für Zeichenerklärungen:
                                    'punkt', 'kreis' (Karte); 'ruecken', 'liebste', 'wieder', 'abgebrochen', 'auszuege' (Regal)
     texte.alle(art), texte.satz(s), texte.datum(d), texte.punkt(s), texte.ARTEN
     buch.alle(), buch.ordnung, buch.nachname(a), buch.titelKurz(t), buch.deutsch(b), buch.masse(b), buch.fach(b), buch.FAECHER,
     buch.karte(b, { person }), buch.zeile(b), buch.kartenzeile(b, { person }), buch.manuskript()
                                    Bücher; Karteikarte und Zeile mit dem Wortlaut von A; die Karteikarte als Zeile (Buchzeile)
     werkKarte(id, { person })      Karteikarte eines eigenen Werks (id aus INHALT.werke), Wortlaut von A
     leselinie(elemente, beiSchritt, o)   welches Element zuletzt die Leselinie erreicht hat (vor und zurück)
     stationen()                    die Lebensstationen aus INHALT.leben (wie in A)
     szenen()                       die Szenen von Satoshi mit Ort und Koordinaten (Texte aus daten/inhalt.js)
     stationInhalt(s), lebenUeberblick(), satoshiInhalt(p), ursprungOrte(), ursprungInhalt(i), reisenInhalt(land, kontinent, o)
                                    die Tafeln von A: { marke, kopf, unter, daten, satz, text, fuss, zeichen }
     tafelTeile(inhalt)             eine Tafel in der Form von B: { kopf, legende } als HTML (Kopf der Tafel, Legende)
     landName(iso)                  deutscher Name eines Lands oder Gebiets
     blickFuer(orte, bereich)       Mitte [lon, lat], bei der alle Orte mit Abstand zum Rand auf der Kugel stehen
     kartentafel(figur, o)          die Kartentafel, siehe dort
     navigation()                   läuft beim Laden von selbst
     fuss(), PROFILE                Newsletter-Zeile und Profile im Fuß (läuft beim Laden von selbst); PROFILE: Liste der Profile
*/
(function () {
  'use strict';
  const inhalt = () => window.INHALT || {};
  const NBSP = ' ', NNBSP = ' ';
  const SEITEN = {
    start: 'index.html', satoshi: 'satoshi.html', ursprung: 'ursprung.html', erzaehlungen: 'erzaehlungen.html', untertext: 'untertext.html',
    laender: 'laender.html', bibliothek: 'bibliothek.html', vita: 'vita.html', lesen: 'lesen.html', impressum: 'impressum.html', datenschutz: 'datenschutz.html'
  };

  // ---------- Kleine Werkzeuge ----------
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const sauber = s => String(s == null ? '' : s).replace(/&amp;(amp;)*/g, '&').replace(/[‎‏]/g, '').trim();
  const esc = s => sauber(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const mq = q => !!(window.matchMedia && window.matchMedia(q).matches);
  const ruhig = () => mq('(prefers-reduced-motion: reduce)');
  const desktop = () => mq('(min-width: 75rem)');
  const telefon = () => !mq('(min-width: 48rem)');
  const warten = ms => new Promise(r => setTimeout(r, ms));

  function tokens() {
    const cs = getComputedStyle(document.documentElement);
    const t = n => cs.getPropertyValue(n).trim();
    return { papier: t('--papier'), tinte: t('--tinte'), tinteRaster: t('--tinte-raster'), blau: t('--blau'), blauRaster: t('--blau-raster'), schrift: t('--schrift') };
  }

  // ---------- Zahlen, Jahre, Satz ----------
  const EINER = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'];
  const ZEHNER = ['', 'zehn', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];
  const EIGEN = { 0: 'null', 1: 'eins', 11: 'elf', 12: 'zwölf', 16: 'sechzehn', 17: 'siebzehn' };
  function zahlwort(n) {
    if (EIGEN[n]) return EIGEN[n];
    if (n < 10) return EINER[n];
    if (n < 20) return EINER[n % 10] + 'zehn';
    if (n < 100) return (n % 10 ? EINER[n % 10] + 'und' : '') + ZEHNER[Math.floor(n / 10)];
    return String(n);
  }
  const gross = s => String(s).charAt(0).toUpperCase() + String(s).slice(1);
  // Tausender erst ab fünf Stellen, mit schmalem geschütztem Leerzeichen: 1040, 12 000
  const tausender = n => String(n).length < 5 ? String(n) : String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NNBSP);
  // Jahr als Text wie in Version A: vor Christus mit „um“, frühe Jahre nach Christus mit „n. Chr.“
  const jahrText = j => j == null ? '' : j < 0 ? 'um' + NBSP + (-j) + NBSP + 'v.' + NBSP + 'Chr.' : j < 1000 ? 'um' + NBSP + j + NBSP + 'n.' + NBSP + 'Chr.' : String(j);
  const chr = t => String(t).replace(/(\d) ([vn])\. Chr\./g, '$1' + NBSP + '$2.' + NBSP + 'Chr.').replace(/\bum (\d)/g, 'um' + NBSP + '$1');
  // Versalabkürzungen ab drei Buchstaben (AIESEC, CTO, UdSSR) als <abbr>; in Kursive bleiben sie Versalien (stil.css)
  const versalien = html => String(html).replace(/(?<![\p{L}\p{N}])([A-ZÄÖÜ](?:[A-ZÄÖÜ]|[a-zäöü](?=[A-ZÄÖÜ])){2,})(?![\p{L}\p{N}])/gu, '<abbr>$1</abbr>');
  const punkt = s => s && !/[.!?…:]$/.test(String(s).replace(/<[^>]*>/g, '').replace(/[“‘’»«)\s]+$/, '')) ? s + '.' : s;
  // Grad und Minuten wie in A: „51° 31′ N“; deutsche Koordinaten „51° 31′ N, 7° 28′ O“
  function grad(x, plus, minus) {
    const a = Math.abs(x);
    let g = Math.floor(a), m = Math.round((a - g) * 60);
    if (m === 60) { g += 1; m = 0; }
    return g + '°' + NBSP + String(m).padStart(2, '0') + '′' + NBSP + (x >= 0 ? plus : minus);
  }
  const koord = (lat, lon) => grad(lat, 'N', 'S') + ', ' + grad(lon, 'O', 'W');
  const lonLat = x => Array.isArray(x) ? [x[0], x[1]] : [x.lon, x.lat];
  // Luftlinie in km, auf 10 km gerundet (Rechenweg aus A); als Text „8190 km“
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
  // Jahr der Tafel: „bis 2014“, „seit 2022“ mit geschütztem Leerzeichen
  const jahrMarke = jahr => String(jahr || '').replace(/^(bis|seit) /, '$1' + NBSP);

  // ---------- Schrift ----------
  function schriften(ms) {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    const laden = Promise.all([
      document.fonts.load('400 20px "Baskervville"'), document.fonts.load('italic 400 20px "Baskervville"'),
      document.fonts.load('500 15px "Baskervville"'), document.fonts.load('italic 500 13px "Baskervville"')
    ]);
    return Promise.race([laden, warten(ms || 2500)]).catch(() => {});
  }

  // ---------- Halbfett ohne Sprung ----------
  // Eine Sperrung (--ausgleich, je Element gemessen) gleicht die Mehrbreite des halbfetten Worts aus; die Zeilen brechen nicht neu um
  function gleichBreit(els) {
    const c = document.createElement('canvas').getContext('2d');
    return schriften(2500).then(() => {
      const f = tokens().schrift;
      const w = (t, g) => { c.font = `${g} 100px ${f}`; return c.measureText(t).width; };
      (els || []).forEach(el => {
        const t = el.textContent, n = Array.from(t).length;
        if (n) el.style.setProperty('--ausgleich', ((w(t, 400) - w(t, 600)) / n / 100).toFixed(4) + 'em');
      });
    });
  }

  // ---------- Gezeichnete Zeichen ----------
  // In Tinte (currentColor), ohne feste Farbe. Breite und Höhe in Pixeln; die Grundlinie liegt am unteren Rand
  function zeichen(art) {
    const svg = (w, h, inhalt) => `<svg class="zeichen" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" focusable="false">${inhalt}</svg>`;
    switch (art) {
      case 'punkt': return svg(8, 9, '<circle cx="4" cy="4.5" r="3.5" fill="currentColor"/>');
      case 'kreis': return svg(8, 9, '<circle cx="4" cy="4.5" r="2.875" fill="none" stroke="currentColor" stroke-width="1.25"/>');
      case 'ruecken': return svg(8, 18, '<rect x=".5" y="2.5" width="7" height="15" fill="none" stroke="currentColor"/>');
      case 'liebste': return svg(8, 18, '<rect x=".5" y="2.5" width="7" height="15" fill="none" stroke="currentColor"/><circle cx="4" cy="11.5" r="2" fill="currentColor"/>');
      case 'wieder': return svg(8, 18, '<rect x=".5" y="3.5" width="7" height="14" fill="none" stroke="currentColor"/><path d="M0 .5H8" stroke="currentColor"/>');
      case 'abgebrochen': return svg(8, 18, '<rect x=".5" y="2.5" width="7" height="15" fill="none" stroke="currentColor" stroke-dasharray="3 2"/>');
      case 'auszuege': return svg(8, 18, '<rect x=".5" y="2.5" width="7" height="15" fill="none" stroke="currentColor" stroke-dasharray="1 2" stroke-linecap="round"/>');
      default: return '';
    }
  }

  // ---------- Texte zum Lesen (daten/texte.js), Rechenweg aus Version A ----------
  const texte = (function () {
    const MONATE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/, LAND = /^[A-Z]{2}(?:-[A-Z]{2,3})?$/;
    const BELEGT = ['inhalt', 'karte', 'fuss'];
    const ARTEN = {
      erzaehlung: { seite: SEITEN.erzaehlungen, alle: 'Alle Erzählungen', titelKursiv: true },
      untertext: { seite: SEITEN.untertext, alle: 'Alle Einträge im <i>Untertext</i>', titelKursiv: false },
      laenderguide: { seite: SEITEN.laender, alle: 'Alle Länder', titelKursiv: false }
    };
    const BUCHSTABE = /[\p{L}\p{N}]/u;
    const VERKUERZT = /^(?:s|n|ne|nem|nen|ner|nes|m|raus|rein|rum|rüber|runter|rauf|ran|naus|nein|nüber|nunter|nauf)(?![\p{L}\p{N}])/u;
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
        .replace(/ --? /g, ' – ')
        .replace(/(^|[\s(\[–—‚]|<i>|<em>)"(?=\S)/g, '$1„')
        .replace(/"/g, '“'));
      return t.replace(/&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/&lt;(\/?)(i|em)&gt;/g, '<$1$2>').replace(/&lt;br\s*\/?&gt;/g, '<br>');
    }
    function datum(d) {
      const m = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(String(d || '').trim());
      if (!m || (m[2] && !MONATE[+m[2] - 1]) || (m[3] && (+m[3] < 1 || +m[3] > 31))) return '';
      return (m[3] ? +m[3] + '.' + NBSP : '') + (m[2] ? MONATE[+m[2] - 1] + ' ' : '') + m[1];
    }
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
    return { alle, satz, datum, punkt, ARTEN };
  })();

  // ---------- Bücher: Daten, Karteikarte und Zeile wie in Version A; Regelmaße und Fächer für das Regal von B ----------
  /* buch.alle(): alle Bücher der vier Regale aus daten/buecher.js in einer Liste; was noch wartet, kommt aus daten/leseliste.js
     (r: 'leseliste'), ohne was schon im Regal steht oder gerade gelesen wird. Felder wie in daten/buecher.js (t, u, a, r, s, j, p, w,
     b, v, x) und dazu nn (Nachname), autor, key, sig (Signatur wie in A: Zeit A bis E und Jahr; K Kindheit und Jugend, N Nachttisch,
     W was noch wartet). Berichtigt wie in A; Titel und Namen stehen, wie die Daten sie nennen. */
  const buch = (function () {
    let cache = null;
    const NACHNAMEN = {
      'Sun Tzu': 'Sun Tzu', 'Luo Guanzhong': 'Luo', 'Han Kang': 'Han', 'Gabriel García Márquez': 'García Márquez', 'Jin Yong': 'Jin Yong',
      'Carlos Ruiz Zafón': 'Ruiz Zafón', 'Adolfo Bioy Casares': 'Bioy Casares', 'Daphne du Maurier': 'du Maurier',
      'Ursula K. Le Guin': 'Le Guin', 'John le Carré': 'le Carré', 'Antoine de Saint-Exupéry': 'Saint-Exupéry', 'Lieutenant X': 'Lieutenant X',
      'Thomas von Aquin': 'Thomas von Aquin', 'Anonymous': '', 'Anonym': '', 'Die 19 Finaltexte': ''
    };
    const AUTOR = { 'Anonymous': 'Anonym' };
    const BERICHTIGT = [
      { a: 'Ingeborg Bachmann', t: 'Malina', j: 1971 },
      { a: 'Franz Kafka', t: 'In the Penal Colony', j: 1919 },
      { a: 'Scott O\'Dell', t: 'Island of the Blue Dolphins', v: /cornelsen/i, u: '' },
      { a: 'David Graeber', t: 'The Dawn of Everything', autor: 'David Graeber und David Wengrow' }
    ];
    const DE_VERLAG = /suhrkamp|rowohlt|diogenes|kiepenheuer|kiwi|deutscher taschenbuch|\bdtv\b|hanser|fischer|insel|reclam|piper|ullstein|aufbau|luchterhand|wagenbach|klett|heyne|goldmann|\bbtb\b|kein & aber|\bmare\b|matthes|beck|thienemann|arena|bastei|droemer|knaur|scherz|dumont|hoffmann und campe|arche|kirschbuch|cornelsen|rediroma|carlsen|oetinger|ravensburger|blessing|verlag/i;
    const DE_TITEL = /[äöüß]|\b(der|die|das|und|ein|eine|im|vom|zum|nicht|ich|wir|über|mit)\b/i;
    const satz = s => String(s || '').replace(/(\d)-(\d)/g, '$1–$2').replace(/"([^"]*)"/g, '“$1”').replace(/'/g, '’');
    const initialen = s => satz(s).replace(/\b([A-Z])\.\s?(?=[A-Z])/g, '$1.' + NBSP);
    const verlag = v => {
      const t = sauber(v).replace(/:\s*an imprint of .*$/i, '').replace(/,?\s+an imprint of .*$/i, '');
      return /[A-ZÄÖÜ]{3}\s+[A-ZÄÖÜ]{3}/.test(t) && t === t.toUpperCase() ? t.toLowerCase().replace(/(^|[\s(&\/-])(\p{L})/gu, (m, a, b) => a + b.toUpperCase()) : t;
    };
    const titelSchluessel = b => b.nn + '|' + b.t.toLowerCase().replace(/^(der|die|das|the|a|an|ein|eine)\s+/, '').replace(/[^\p{L}\p{N}]+/gu, '');
    function nachname(a) {
      a = sauber(a);
      if (a in NACHNAMEN) return NACHNAMEN[a];
      if (/^Die \d/.test(a)) return '';
      const t = a.replace(/,?\s+(Jr\.|Sr\.)$/, '').split(/\s+/);
      return t[t.length - 1] || '';
    }
    // Rückentitel wie in A: ohne Untertitel und Reihe
    function titelKurz(t) {
      const s = sauber(t).replace(/\s*\(.*\)\s*$/, '').split(/:\s|\s[-–]\s/)[0];
      return s.replace(/(\d)-(\d)/g, '$1–$2').replace(/'/g, '’').trim();
    }
    const REGALE = ['gelesen', 'kindheit', 'gerade', 'abgebrochen'];
    const EPOCHEN = [['A', 1899], ['B', 1945], ['C', 1989], ['D', 2009], ['E', Infinity]];
    const jahrSig = j => j == null ? 'o.' + NBSP + 'J.' : j < 0 ? '−' + (-j) : String(j);
    const ordnung = (x, y) => (x.j == null) - (y.j == null) || (x.j || 0) - (y.j || 0) || x.nn.localeCompare(y.nn, 'de') || x.t.localeCompare(y.t, 'de');
    function alle() {
      if (cache) return cache;
      const roh = (window.BUECHER || []).filter(b => b && REGALE.includes(b.r));
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
      const imRegal = new Set(cache.filter(b => b.r !== 'leseliste').map(titelSchluessel));
      cache = cache.filter(b => b.r !== 'leseliste' || !imRegal.has(titelSchluessel(b)));
      // Signaturen wie in A: Buchstabe der Zeit oder des Fachs, Jahr, bei gleichem Jahr a, b, c …
      const sigFach = b => b.r === 'kindheit' ? 'K' : b.r === 'gerade' ? 'N' : b.r === 'leseliste' ? 'W' : b.j == null ? 'E' : EPOCHEN.find(e => b.j <= e[1])[0];
      const gruppen = {};
      cache.forEach(b => { const z = sigFach(b) + '|' + jahrSig(b.j); (gruppen[z] = gruppen[z] || []).push(b); });
      Object.entries(gruppen).forEach(([z, bs]) => {
        bs.sort(ordnung);
        bs.forEach((b, i) => { b.sig = z.replace('|', NBSP) + (bs.length > 1 ? (i < 26 ? 'abcdefghijklmnopqrstuvwxyz'[i] : String(i + 1)) : ''); });
      });
      return cache;
    }
    // Deutsche Rücken laufen von unten nach oben
    const deutsch = b => DE_VERLAG.test(b.v || '') || DE_TITEL.test(b.t || '');
    // Regelmaße in mm nach Abschnitt 12.7: ohne Seitenzahl 260 Seiten; ohne Streuung
    const HOEHE = { p: 185, m: 175, e: 198, h: 225 };
    const masse = b => ({ breite: (b.p > 0 ? b.p : 260) * .06 + (b.b === 'h' ? 5 : 1), hoehe: HOEHE[b.b] || HOEHE.e });
    const FAECHER = [
      { id: 'bis-1899', name: 'bis 1899', bis: 1899 }, { id: '1900-1945', name: '1900–1945', bis: 1945 }, { id: '1946-1989', name: '1946–1989', bis: 1989 },
      { id: '1990-2009', name: '1990–2009', bis: 2009 }, { id: 'seit-2010', name: 'seit 2010', bis: Infinity },
      { id: 'kindheit', name: 'Kindheit und Jugend' }, { id: 'leseliste', name: 'Leseliste' }
    ];
    // Fach eines Buchs; was gerade gelesen wird, liegt auf dem obersten Brett ('gerade'). Ohne Jahr: das letzte Zeitfach
    function fach(b) {
      if (b.r === 'gerade') return 'gerade';
      if (b.r === 'kindheit') return 'kindheit';
      if (b.r === 'leseliste') return 'leseliste';
      return (FAECHER.find(f => f.bis !== undefined && b.j != null && b.j <= f.bis) || FAECHER[4]).id;
    }
    // Karteikarte eines Buchs wie in A; person: 3 spricht von ihm („Eines seiner liebsten.“), sonst spricht er selbst
    function karte(b, o) {
      const er = !!o && o.person === 3;
      const satzEnde = s => s && !/[.!?]$/.test(s) ? s + '.' : s;
      const jahr = b.j == null ? '' : b.j < 1000 ? 'Entstanden ' + jahrText(b.j) : b.j < 1450 ? 'Entstanden um ' + b.j : 'Zuerst erschienen ' + b.j;
      const ausgabe = [b.v, b.p ? (b.ungefaehr ? 'etwa ' : '') + tausender(b.p) + ' Seiten' : ''].filter(Boolean).join(', ');
      const notiz = [];
      if (b.r === 'gerade') notiz.push(er ? 'Liest er gerade.' : 'Lese ich gerade.');
      if (b.r === 'abgebrochen') notiz.push('Nicht zu Ende gelesen.');
      if (b.r === 'leseliste') notiz.push('Wartet noch.');
      if (b.r === 'kindheit') notiz.push('Aus Kindheit und Jugend.');
      if (b.s === 5 && b.r !== 'leseliste') notiz.push(er ? 'Eines seiner liebsten.' : 'Eines meiner liebsten.');
      if (b.x) notiz.push('In Auszügen gelesen.');
      if (b.w) notiz.push('Mehr als einmal gelesen.');
      return { signatur: b.sig || '', titel: b.t, unter: b.u, autor: b.autor, zeilen: [satzEnde(jahr), satzEnde(ausgabe)], notiz: notiz.join(' ') };
    }
    // Eine Zeile über ein Buch wie in A: „Bukowski, Pulp, 1994“ als Text und als HTML (Titel kursiv)
    function zeile(b) {
      const zusatz = b.r === 'abgebrochen' ? 'nicht zu Ende gelesen' : b.r === 'gerade' ? 'lese ich gerade' : b.r === 'leseliste' ? 'wartet noch' : b.x ? 'in Auszügen' : '';
      const j = b.j != null ? jahrText(b.j) : '';
      return {
        text: [b.nn, b.t, j, zusatz].filter(Boolean).join(', '),
        html: [b.nn ? esc(b.nn) : '', `<i>${esc(b.t)}</i>`, j, zusatz].filter(Boolean).join(', ')
      };
    }
    /* Die Karteikarte als Zeile (Buchzeile von B, Abschnitt 12.8): die Felder der Karte von A in ihrer Reihenfolge, Wort für Wort,
       ohne Zeichen dazwischen; jedes Feld ein <span> mit seiner Klasse (signatur, titel, unter, autor, zeile, notiz), den Abstand
       setzt stil.css. Der Titel kursiv, bei eigenen Werken ein Verweis (werkKarte). inhalt: eine Karte (buch.karte, werkKarte) oder ein Buch */
    function kartenzeile(x, o) {
      const k = x && x.zeilen ? x : karte(x, o);
      const teil = v => v == null || v === '' ? '' : typeof v === 'object' ? String(v.html || '') : esc(v);
      const teile = [['signatur', k.signatur], ['titel', k.titel], ['unter', k.unter], ['autor', k.autor]].concat((k.zeilen || []).map(z => ['zeile', z]), [['notiz', k.notiz]])
        .filter(([, v]) => v != null && v !== '');
      const html = teile.map(([c, v]) => `<span class="${c}">${c === 'titel' && !(typeof v === 'object') ? `<i>${teil(v)}</i>` : teil(v)}</span>`).join(' ');
      const text = teile.map(([, v]) => typeof v === 'object' ? String(v.html || '').replace(/<[^>]*>/g, '') : String(v)).join(' ');
      return { html: versalien(html), text };
    }
    // Das Manuskript von Satoshi im Regal: wie in A der Name über dem Rücken („Satoshi, Roman“) und die Karte des Werks
    const manuskript = () => {
      const w = (inhalt().werke || []).find(x => x.id === 'satoshi') || { buchtitel: 'Satoshi', art: 'Roman' };
      const t = w.buchtitel || w.titel || '';
      return { html: `<i>${esc(t)}</i>, ${esc(w.art || '')}`, text: `${t}, ${w.art || ''}`, karte: werkKarte('satoshi') };
    };
    return { alle, ordnung, nachname, titelKurz, deutsch, masse, fach, FAECHER, karte, zeile, kartenzeile, manuskript };
  })();

  // ---------- Eigene Werke (wie in Version A) ----------
  const WERK_SIG = { satoshi: 'DJ 1', 'ursprung-1': 'DJ 2/I', 'ursprung-2': 'DJ 2/II', 'ursprung-3': 'DJ 2/III', erzaehlungen: 'DJ 3', untertext: 'DJ 4', laender: 'DJ 5' };
  const WERK_GERADE = ['erzaehlungen', 'laender'];
  /* Karteikarte für ein eigenes Werk (id aus INHALT.werke), Wortlaut von A: der Titel selbst führt zur Seite des Werks (die Bände der
     Trilogie zur Seite der Trilogie), „Arbeitstitel“ steht hinter dem Titel (span.arbeitstitel). person: 3 spricht von ihm. */
  function werkKarte(id, o) {
    const I = inhalt(), er = !!o && o.person === 3;
    const w = (I.werke || []).find(x => x.id === id);
    if (!w) return null;
    const ziel = w.band ? SEITEN.ursprung : SEITEN[id] || '';
    const name = esc(w.buchtitel || w.titel);
    const gerade = WERK_GERADE.includes(id);
    const titelHtml = gerade ? name : `<i>${name}</i>`;
    const titel = { html: (ziel ? `<a href="${ziel}">${titelHtml}</a>` : titelHtml) + (w.arbeitstitel ? ' <span class="arbeitstitel">Arbeitstitel</span>' : '') };
    const x = { signatur: (WERK_SIG[id] || 'DJ').replace(' ', NBSP), titel, eigen: true, titelGerade: gerade, autor: 'Dominik Jäkel' };
    const punktEnde = t => t && !/[.!?…]$/.test(t) ? t + '.' : t;
    if (id === 'satoshi') {
      const s = I.satoshi || {};
      x.unter = 'Roman';
      x.zeilen = [(s.eckdaten && s.eckdaten.stand) || ''];
      x.notiz = s.hook || w.text || '';
    } else if (w.band) {
      const b = ((I.trilogie && I.trilogie.baende) || []).find(y => y.band === w.band) || {};
      x.unter = 'Band ' + w.band + ' der Ursprungstrilogie';
      x.zeilen = [chr([b.ort, b.zeit].filter(Boolean).join(', ')), 'Die Trilogie ist in Arbeit.'];
      x.notiz = punktEnde(b.thema || '');
    } else if (id === 'erzaehlungen') {
      x.unter = '';
      x.notiz = er ? 'Viele davon hat er auf der Werkstattbühne des Autorenforums Berlin gelesen.' : 'Viele davon habe ich auf der Werkstattbühne des Autorenforums Berlin gelesen.';
    } else {
      x.unter = w.art + (w.stand ? ', ' + w.stand : '');
    }
    return x;
  }

  // ---------- Beim Scrollen: die Leselinie (Rechenweg aus Version A) ----------
  /* leselinie(elemente, beiSchritt, o): welches Element zuletzt die Leselinie erreicht hat, vor und zurück.
       elemente   Liste (oder Funktion) von Elementen in der Reihenfolge der Seite
       beiSchritt(i, { vorher, richtung })  i = -1, solange keines die Linie erreicht hat; kommt gleich zu Beginn und bei jeder Änderung
       o.linie    Anteil der Fensterhöhe (Vorgabe .45) oder Funktion (H) => Pixel; o.ende (Vorgabe an): gegen Seitenende wandert
                  die Linie hinab, damit auch die letzten Elemente drankommen; o.bereich: außerhalb dieses Elements wird nicht gerechnet
     Rückgabe: { jetzt(), pruefen(erzwingen) } */
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
  function leselinie(elemente, beiSchritt, o) {
    o = o || {};
    const liste = () => (typeof elemente === 'function' ? elemente() : elemente) || [];
    const stelle = o.stelle || (el => { if (!el || !el.getBoundingClientRect) return null; const r = el.getBoundingClientRect(); return r.width || r.height ? r.top : null; });
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
        if (i === jetzt && !erzwingen) return;
        const vorher = jetzt;
        jetzt = i;
        beiSchritt(i, { vorher, richtung: vorher == null ? 0 : Math.sign(i - vorher) });
      }
    };
    beobachten(b, o.bereich);
    return { jetzt: () => jetzt, pruefen: erzwingen => b.pruefen(!!erzwingen) };
  }

  // ---------- Orte ----------
  // Lebensstationen aus INHALT.leben, wie in A (die weiteren längeren Aufenthalte aus INHALT.aufenthalte stehen nur in der Vita)
  const stationen = () => (inhalt().leben || []).map(s => ({ name: s.name, lat: s.lat, lon: s.lon, neben: !!s.neben, jahr: s.jahr, land: s.land || '', projekt: s.projekt || '' }));
  // Die Szenen von Satoshi mit Ort, Notiz und Koordinaten; Jahr und Text aus daten/inhalt.js, wie in A
  function szenen() {
    const SAT = inhalt().satoshi || {};
    return (SAT.szenen || []).map(s => {
      const o = (SAT.orte || []).find(x => x.name === s.ort) || {};
      return Object.assign({}, o, { ort: s.ort, jahr: s.jahr, text: s.text });
    }).filter(s => s.lat != null);
  }
  // Deutscher Name eines Lands oder Gebiets: Landesteile und Gebiete eigens, sonst aus daten/laender-de.js
  let namen = null;
  function landName(iso) {
    if (!namen) {
      namen = Object.assign({ 'GB-ENG': 'England', 'GB-SCT': 'Schottland', 'GB-NIR': 'Nordirland', 'GB-WLS': 'Wales', 'PS-WB': 'Westjordanland', 'PS-GZ': 'Gazastreifen' }, inhalt().sondernamen || {});
      Object.values((window.LAENDER_DE && window.LAENDER_DE.nach_id) || {}).forEach(e => { if (e[0] && !namen[e[0]]) namen[e[0]] = e[1]; });
    }
    return namen[iso] || iso;
  }
  /* Mitte für einen Überblick (Rechenweg aus Version A, für die ganze Kugel im Ring): alle Orte im Kreis, möglichst weit vom Rand,
     bei gleich guten Lagen die, deren Orte um die Mitte liegen. bereich: { lon: [von, bis], lat: [von, bis], k, schritt }.
     Passen nicht alle Orte auf eine Halbkugel (Kaohsiung und Buenos Aires), fällt der Ort weg, der am weitesten außen liegt. */
  function blickFuer(orte, bereich) {
    let rest = (orte || []).slice();
    while (rest.length) {
      for (const rand of [40, 24, 12]) { const m = blickStreng(rest, bereich, rand); if (m) return m; }
      if (rest.length < 3 || !window.d3) return null;
      const mitte = window.d3.geoCentroid({ type: 'MultiPoint', coordinates: rest.map(s => [s.lon, s.lat]) });
      let weit = 0;
      rest.forEach((s, j) => { if (window.d3.geoDistance([s.lon, s.lat], mitte) > window.d3.geoDistance([rest[weit].lon, rest[weit].lat], mitte)) weit = j; });
      rest.splice(weit, 1);
    }
    return null;
  }
  function blickStreng(orte, bereich, RAND) {
    const d3 = window.d3;
    if (!d3 || !orte || !orte.length) return null;
    bereich = Object.assign({ lon: [-180, 180], lat: [-60, 70], k: 1, schritt: 1 }, bereich || {});
    const S = 600, rS = S / 2 - 24, R = rS;
    const pr = d3.geoOrthographic().clipAngle(90).translate([S / 2, S / 2]).scale(rS * bereich.k);
    let best = null;
    for (let lon = bereich.lon[0]; lon <= bereich.lon[1] + 1e-9; lon += bereich.schritt) for (let lat = bereich.lat[0]; lat <= bereich.lat[1] + 1e-9; lat += bereich.schritt) {
      pr.rotate([-lon, -lat]);
      let summe = 0, sx = 0, sy = 0;
      for (const s of orte) {
        if (d3.geoDistance([s.lon, s.lat], [lon, lat]) > 1.35) { summe = -Infinity; break; }
        const [x, y] = pr([s.lon, s.lat]);
        const rand = R - Math.hypot(x - S / 2, y - S / 2);
        if (rand < RAND) { summe = -Infinity; break; }
        summe += Math.log(Math.min(rand, .45 * rS) + .04 * rS);
        sx += x; sy += y;
      }
      if (summe === -Infinity) continue;
      summe -= .6 * Math.hypot(sx / orte.length - S / 2, sy / orte.length - S / 2) / rS;
      if (!best || summe > best.s) best = { s: summe, lon, lat };
    }
    return best ? [best.lon, best.lat] : null;
  }

  // ---------- Tafeln: der Wortlaut der Tafeln von A ----------
  /* Eine Tafel ist { marke, kopf, unter, daten, satz, text, fuss, zeichen }, Felder wie in A: marke Jahr oder Bandnummer, kopf Ort
     oder Titel, unter Art (Wohnort, bereist), daten Koordinaten, satz und text Sätze, fuss HTML (Verweis). zeichen ('punkt',
     'kreis') ist das Kartenzeichen vor dem Ort im Kopf. Textfelder sind Text oder { html }; das HTML setzt nur Kursive für
     Werktitel und span.arbeitstitel. Die Wortlaute sind die von A (seite.js, index.html und laender.html von A). */
  // Eine Lebensstation; die Entfernung vom ersten Ort (Dortmund) aus gemessen
  function stationInhalt(s, ausgang) {
    ausgang = ausgang || stationen()[0];
    return {
      zeichen: s.neben ? 'kreis' : 'punkt',
      marke: jahrMarke(s.jahr), kopf: s.land ? s.name + ', ' + s.land : s.name,
      unter: s.neben ? 'längerer Aufenthalt' : 'Wohnort',
      daten: koord(s.lat, s.lon),
      satz: (s.projekt ? s.projekt + '. ' : '') + (ausgang && s.name === ausgang.name ? 'Von hier aus sind die Entfernungen gemessen.' : km(ausgang, s) + ' Luftlinie von ' + ausgang.name + '.')
    };
  }
  // Am Ende der Stationen der Ort, an dem er heute lebt: der letzte Wohnort
  function lebenUeberblick() {
    const heute = stationen().filter(s => !s.neben).pop();
    if (!heute) return {};
    return { zeichen: 'punkt', marke: jahrMarke('seit ' + heute.jahr), kopf: heute.name, unter: 'Wohnort', daten: koord(heute.lat, heute.lon), satz: 'Hier lebt er heute.' };
  }
  // Satoshi auf der Startseite: 0 ist der Roman, danach die Szenen in der Reihenfolge des Romans
  function satoshiInhalt(p) {
    const SAT = inhalt().satoshi || {};
    if (!p) return { kopf: { html: '<i>Satoshi</i>' }, unter: 'Roman', text: SAT.hook || '' };
    const s = szenen()[p - 1];
    if (!s) return {};
    return { zeichen: 'punkt', marke: s.jahr, kopf: (s.kurz || s.ort) + (s.notiz ? ', ' + s.notiz : ''), daten: koord(s.lat, s.lon), text: s.text };
  }
  // Die vier Orte der Trilogie der Reihe nach: Göbekli Tepe, Uruk, Tyros, Jerusalem
  const ursprungOrte = () => (inhalt().ursprung || []).map((o, i) => ({ i, name: o.name, lat: o.lat, lon: o.lon, band: o.band, jahr: o.jahr }));
  /* Tafel für einen Ort der Trilogie (Startseite und Seite der Trilogie gleich): Titel des Bands, darunter Landschaft und Zeit und die
     Koordinaten, dann ein Satz zum Band (aus INHALT.baende). -1 ist die ganze Trilogie. */
  function ursprungInhalt(i) {
    const I = inhalt(), orte = ursprungOrte(), band = {};
    ((I.trilogie && I.trilogie.baende) || []).forEach(b => { band[b.band] = b; });
    const o = orte[i];
    if (!o) {
      const a = orte[0], z = orte[orte.length - 1];
      return {
        marke: 'I–III', kopf: { html: `<i>${esc((I.trilogie && I.trilogie.titel) || 'Ursprung')}</i>` }, unter: 'Trilogie, in Arbeit',
        satz: a && z ? chr(('Von ' + a.name + ' ' + a.jahr + ' bis ' + z.name + ' ' + z.jahr).replace(/([^.])$/, '$1.')) : ''
      };
    }
    const b = band[o.band] || {};
    const m = String((I.baende || {})[o.band] || '').match(/^(.*?v\. Chr\.)\s+(.+)$/);
    const landschaft = m ? m[1] : [b.ort, b.zeit].filter(Boolean).join(', ');
    const satz = m ? m[2] : b.thema ? b.thema.replace(/([^.])$/, '$1.') : '';
    // Tyros steht nur auf der Karte, als die Stadt der Phönizier, aus der Thyra kommt
    const ort = o.name === b.ort ? landschaft : o.name + ', die Stadt der Phönizier, ' + (b.zeit || o.jahr || '');
    return {
      marke: o.band,
      kopf: { html: `<i>${esc(b.titel || '')}</i>` + (b.arbeitstitel ? ' <span class="arbeitstitel">Arbeitstitel</span>' : '') },
      daten: { html: `<span class="ortzeit">${esc(chr(ort))}</span><br>${esc(koord(o.lat, o.lon))}` },
      satz
    };
  }
  /* Reisen (Startseite und Länder von A): die Zahl, ein Kontinent oder ein Land (land: ein Land des Kerns { iso, name, punkt }).
     o.guides: { ISO: 'lesen.html#slug' } für den Verweis „Zum Länderguide“ (Seite Länder).
     Abweichung von A: „grau“ heißt hier „schraffiert“, denn B zeichnet bereiste Länder mit einer Schraffur, nicht grau. */
  const BEREIST_AUF_DER_KARTE = 'schraffiert auf dem Globus';
  function reisenInhalt(land, kontinent, o) {
    const I = inhalt(), bereist = I.bereist || [];
    o = o || {};
    const zahl = n => gross(zahlwort(n)) + ' Länder und Gebiete, ' + BEREIST_AUF_DER_KARTE + '.';
    if (land) {
      const ist = bereist.includes(land.iso);
      const p = land.punkt || (I.winzig && I.winzig[land.iso]);
      const guide = o.guides && o.guides[land.iso];
      return {
        kopf: ist || !land.name ? landName(land.iso) : land.name, unter: ist ? 'bereist' : 'nicht bereist',
        daten: p ? koord(p[1], p[0]) : '', fuss: guide ? `<a href="${esc(guide)}">Zum Länderguide</a>` : ''
      };
    }
    if (kontinent) return { kopf: kontinent, satz: zahl(((I.kontinente || {})[kontinent] || []).length) };
    return { kopf: 'Wohin ich gereist bin', satz: zahl(bereist.length) };
  }
  /* Eine Tafel in der Form von B: { kopf, legende } als HTML. Der Kopf (12.6) trägt in der ersten Zeile das Kartenzeichen und den
     Ort oder Titel, darunter im Grad klein Jahr oder Band und die Art; die Legende unter dem Rahmen die Koordinaten, die Sätze und
     den Verweis. Jedes Feld steht auf einer eigenen Zeile, so bleibt der Wortlaut von A ohne neue Zeichen. */
  function tafelTeile(t) {
    t = t || {};
    const teil = v => v == null || v === '' ? '' : typeof v === 'object' ? String(v.html || '') : esc(v);
    const kopf = (t.kopf ? `<p class="tafelkopf-ort">${t.zeichen ? zeichen(t.zeichen) : ''}${teil(t.kopf)}</p>` : '') +
      [t.marke, t.unter].filter(v => v != null && v !== '').map(v => `<p class="tafelkopf-angabe">${teil(v)}</p>`).join('');
    const legende = [['legendendaten', t.daten], ['legendensatz', t.satz], ['legendentext', t.text]]
      .filter(([, v]) => v != null && v !== '').map(([c, v]) => `<p class="${c}">${versalien(teil(v))}</p>`).join('') +
      (t.fuss ? `<p class="legendenfuss">${typeof t.fuss === 'object' ? String(t.fuss.html || '') : t.fuss}</p>` : '');
    return { kopf, legende };
  }

  // ---------- Kartentafel ----------
  /* kartentafel(figur, o): baut in <figure class="kartentafel"> mit <div class="rahmen"> (darin <p class="ohne-karte">) die Tafel:
     Kartenwahl über dem Rahmen (Startseite), Leinwand, Kopf der Tafel (Zwickel oben rechts, sonst unter dem Rahmen),
     Zeichenerklärung (unten links, nur wo es zwei Zeichen gibt), Bedienhinweis (unten rechts) und die Legende unter dem Rahmen
     mit früher und später. Kopf und Legende tragen die Tafeln von A (tafelTeile).
       o.karten     Liste aus 'wohnorte', 'reisen', 'satoshi', 'ursprung' (Vorgabe ['wohnorte']); mehr als eine: Kartenwahl
                    mit dem Wortlaut von A („Auf dem Globus: wo ich gelebt habe, wohin ich gereist bin, …“)
       o.start      die Karte beim Laden (Vorgabe die erste)
       o.legende    false: kein Kopf, keine Legende und kein früher und später (die Seite zeigt die Tafel selbst)
       o.satz       false: auf der Karte „Reisen“ kein Text der Ebene in der Legende (Seite Länder: der Satz steht im Text)
       o.ebenentext true: unter der Legende (oder in o.textEl) der Text der gewählten Karte wie auf der Startseite von A
                    (Stationen, Schauplätze, Bände, mit Bedienwörtern, die die Karte führen)
       o.textEl     Element für den Text der Karte (statt unter der Legende)
       o.guides     { ISO: 'lesen.html#slug' }: auf der Karte „Reisen“ führt die Tafel eines Lands zu seinem Länderguide
       o.label      aria-label der Leinwand (Vorgabe: der Wortlaut von A für die Seite)
       o.ring       wird nicht mehr weitergegeben: „Äquator“ im Ring ist ein Wort, das A nicht hat (Textregel)
       o.beiSchritt (karte, i, schritt) => {}   nach jedem Schritt
     Schritte: Wohnorte die Stationen und am Ende der heutige Wohnort (Vorgabe), Satoshi der Roman und die Szenen, Ursprung die
     Trilogie und die Orte. Bedienwörter überall auf der Seite: data-schritt-zu="i" geht zum Schritt i der gewählten Karte,
     data-kontinent="Europa" dreht die Karte Reisen. Elemente mit data-karten-text="karte" stehen nur bei ihrer Karte.
     Rückgabe: { waehlen(karte), schritt(i, { fliegen }), land(iso), kontinent(name), kern, karte(), jetzt(), gewaehlt() } oder
     null ohne Kern */
  const KONTINENTE = { Europa: [[13, 50], 3.3], Asien: [[94, 26], 1.75], Afrika: [[16, 4], 1.9], Amerika: [[-80, 12], 1.25] };
  const europa = s => s.lat > 35 && s.lon > -12 && s.lon < 32;
  const zoomFuer = s => europa(s) ? 3.6 : 2.5;
  // Wortlaut von A: die Wahl der Ebene auf der Startseite und das aria-label der Leinwand je Seite
  const WAHL = { wohnorte: 'wo ich gelebt habe', reisen: 'wohin ich gereist bin', satoshi: 'wo <i>Satoshi</i> spielt', ursprung: 'wo die Ursprungstrilogie spielt' };
  // Abweichung von A auf der Seite Länder: „in Grau“ heißt „in Schraffur“ (B zeichnet bereiste Länder schraffiert)
  const LEINWAND = {
    start: 'Globus mit den Orten aus dem Text; Pfeiltasten drehen, Plus und Minus zoomen',
    satoshi: 'Globus mit den Schauplätzen des Romans; Pfeiltasten drehen, Plus und Minus zoomen',
    ursprung: 'Globus mit den Schauplätzen der Trilogie; Pfeiltasten drehen, Plus und Minus zoomen',
    reisen: 'Globus mit den bereisten Ländern in Schraffur; Pfeiltasten drehen, Plus und Minus zoomen'
  };
  const wortKnopf = (attr, html) => `<button type="button" class="wort" ${attr}>${html}</button>`;
  // Ein Satzzeichen nach einem Bedienwort bleibt bei ihm (kein Umbruch dazwischen)
  const gebunden = (knopf, nach) => nach ? `<span class="nw">${knopf}${nach}</span>` : knopf;

  function karten() {
    const I = inhalt();
    const st = stationen();
    const heute = st.filter(s => !s.neben).pop();
    const wohnSchritte = st.map(s => Object.assign({}, s, { inhalt: () => stationInhalt(s, st[0]) }));
    if (heute) wohnSchritte.push(Object.assign({}, heute, { ueberblick: true, inhalt: lebenUeberblick }));
    const sz = szenen(), satOrte = [];
    sz.forEach(s => { if (!satOrte.some(o => o.name === s.name)) satOrte.push({ name: s.name, kurz: s.kurz, notiz: s.notiz, lat: s.lat, lon: s.lon }); });
    const satSchritte = [{ ueberblick: true, inhalt: () => satoshiInhalt(0) }].concat(sz.map((s, j) => Object.assign({}, s, { inhalt: () => satoshiInhalt(j + 1) })));
    const ur = ursprungOrte();
    const urSchritte = [{ ueberblick: true, inhalt: () => ursprungInhalt(-1) }].concat(ur.map(x => Object.assign({}, x, { inhalt: () => ursprungInhalt(x.i) })));
    const baende = {};
    ((I.trilogie && I.trilogie.baende) || []).forEach(b => { baende[b.band] = b; });
    // Der Text der Ebene, wie auf der Startseite von A
    const kolophon = () => `<p class="kolophon">${st.map((s, j) => gebunden(wortKnopf(`data-schritt-zu="${j}"`, esc(s.name + ' ' + s.jahr)), j < st.length - 1 ? ' –' : '')).join(' ')}</p>` +
      `<p class="nochmal">${wortKnopf('data-schritt-zu="0"', 'Noch einmal von ' + esc(st[0] ? st[0].name : '') + ' an')}</p>`;
    const kontinentSatz = () => {
      const w = n => wortKnopf(`data-kontinent="${n}"`, n);
      return `<p>Die meisten Länder liegen in ${gebunden(w('Europa'), ',')} viele in ${gebunden(w('Asien'), ',')} einige in ${gebunden(w('Afrika'), ',')} wenige in ${gebunden(w('Amerika'), '.')}</p>`;
    };
    const satoshiText = () => {
      const erste = name => satSchritte.findIndex(x => x.name === name);
      const wort = o => {
        const knopf = wortKnopf(`data-schritt-zu="${erste(o.name)}"`, esc(o.kurz || o.name));
        if (o.name === 'Black Rock Desert') return 'die ' + knopf + ' in Nevada';
        if (o.notiz === 'Patagonien') return knopf + ' in Patagonien';
        return knopf;
      };
      const w = satOrte.map(wort);
      const mit = (x, z) => /<\/button>$/.test(x) ? gebunden(x, z) : x + z;
      const vorn = w.slice(0, -1);
      const liste = vorn.map((x, j) => j < vorn.length - 1 ? mit(x, ',') : x).join(' ') + ' und ' + mit(w[w.length - 1], '.');
      return `<p><a href="${SEITEN.satoshi}"><i>Satoshi</i></a> erzählt die Gründungslegende von Bitcoin. Der Roman beginnt 2001 in Buenos Aires; die Kernhandlung spielt 2007 bis 2010.</p>` +
        `<p>Die Schauplätze in der Reihenfolge des Romans: ${liste}</p>`;
    };
    const ursprungText = () => {
      const zeile = b => {
        const namen = ur.filter(x => x.band === b).map(x => wortKnopf(`data-schritt-zu="${x.i + 1}"`, esc(x.name)));
        return `<p class="band"><span class="band-nr">${b}</span><i>${esc((baende[b] || {}).titel || '')}</i>, ${namen.join(' und ')}</p>`;
      };
      return `<p>Die drei Bände der <a href="${SEITEN.ursprung}">Ursprungstrilogie</a>:</p>` + ['I', 'II', 'III'].map(zeile).join('') +
        `<p class="nochmal">${wortKnopf('data-schritt-zu="1"', 'Noch einmal von ' + esc(ur[0] ? ur[0].name : '') + ' an')}</p>`;
    };
    return {
      wohnorte: {
        schritte: wohnSchritte, start: wohnSchritte.length - 1, orte: st, zeichen: [],
        aktivBeiUeberblick: heute ? heute.name : null, weg: true,
        blick: s => ({ mitte: [s.lon, s.lat], k: zoomFuer(s) }),
        ueberblick: () => ({ mitte: blickFuer(st, { lon: [10, 100], lat: [-10, 50] }) || [50, 20], k: 1 }),
        text: kolophon
      },
      reisen: {
        schritte: null, orte: [], laender: true, zeichen: [],
        ueberblick: () => ({ mitte: [34, 28], k: 1 }),
        text: () => kontinentSatz() + `<p>Die <a href="${SEITEN.laender}">Länderguides</a> sind in Arbeit.</p>`,
        legendeText: kontinentSatz
      },
      satoshi: {
        schritte: satSchritte, start: 0, orte: satOrte, zeichen: [],
        blick: s => ({ mitte: [s.lon, s.lat], k: s.name === 'Bariloche' ? 6 : zoomFuer(s) }),
        ueberblick: () => ({ mitte: blickFuer(satOrte.filter(x => x.lon < 40), { lon: [-90, 10], lat: [-10, 40], schritt: 2 }) || [-48, 18], k: 1 }),
        text: satoshiText
      },
      ursprung: {
        schritte: urSchritte, start: 0, orte: ur.map(x => ({ name: x.name, lat: x.lat, lon: x.lon })), grenzen: false, fluesse: true, fest: true, weg: true,
        zeichen: [], blick: () => ({ mitte: [40, 33.6], k: 7 }), ueberblick: () => ({ mitte: [40, 33.6], k: 7 }),
        text: ursprungText
      }
    };
  }

  function kartentafel(fig, o) {
    if (!fig) return null;
    o = Object.assign({ karten: ['wohnorte'], start: null, legende: true, satz: true, ebenentext: false, textEl: null, guides: null, label: null, ring: null, beiSchritt: null }, o || {});
    const T = tokens();
    const K = karten();
    const liste = o.karten.filter(k => K[k]);
    const rahmen = $('.rahmen', fig);
    if (!rahmen || !liste.length) return null;

    // ---------- Aufbau ----------
    const canvas = document.createElement('canvas');
    canvas.className = 'kugel';
    canvas.tabIndex = 0;
    canvas.setAttribute('aria-label', o.label || (liste.length > 1 ? LEINWAND.start : LEINWAND[liste[0]] || LEINWAND.start));
    rahmen.insertBefore(canvas, rahmen.firstChild);
    const neu = (tag, cls, html) => { const el = document.createElement(tag); if (cls) el.className = cls; if (html) el.innerHTML = html; return el; };
    // Die Kartenwahl steht als Satz über dem Rahmen (zw-ol ohne Zwickellage); der Kopf der Tafel im Zwickel oben rechts
    const zwOL = neu('div', 'zw-ol'), zwOR = neu('div', 'zwickel zw-or'), zwUL = neu('div', 'zwickel zw-ul'), zwUR = neu('div', 'zwickel zw-ur');
    const ausparung = neu('div', 'aussparung');
    ausparung.setAttribute('aria-hidden', 'true');
    zwOR.appendChild(ausparung);
    let wahl = null;
    if (liste.length > 1) {
      wahl = neu('p', 'wahl kartenwahl', 'Auf dem Globus: ' + liste.map((k, j) => gebunden(`<button type="button" data-karte="${k}" aria-pressed="false">${WAHL[k]}</button>`, j < liste.length - 1 ? ',' : '.')).join(' '));
      zwOL.appendChild(wahl);
    }
    let kopf = null;
    if (o.legende) {
      kopf = neu('div', 'tafelkopf');
      kopf.setAttribute('aria-live', 'polite');
      zwOR.appendChild(kopf);
    }
    // Zeichenerklärung ohne eigenes aria-label: das Wort „Zeichenerklärung“ steht in A nicht (Textregel). Keine Karte hat eine:
    // A erklärt die Zeichen nicht, „Wohnort“ und „längerer Aufenthalt“ stehen wie in A im Kopf der Tafel (Textregel)
    const erkl = neu('ul', 'zeichenerklaerung');
    zwUL.appendChild(erkl);
    const hinweis = neu('p', 'hinweis');
    hinweis.hidden = true;
    zwUR.appendChild(hinweis);
    let legende = null, inhaltEl = null, frueher = null, spaeter = null;
    if (o.legende) {
      legende = neu('figcaption', 'tafellegende');
      inhaltEl = neu('div', 'legendeninhalt');
      inhaltEl.setAttribute('aria-live', 'polite');
      legende.appendChild(inhaltEl);
      // früher und später nur, wo eine der Karten Schritte hat (nicht auf der Seite Länder)
      if (liste.some(k => K[k].schritte)) {
        const steuer = neu('p', 'steuer', '<button type="button" class="steuerwort" data-schritt="-1">früher</button> <button type="button" class="steuerwort" data-schritt="1">später</button>');
        legende.appendChild(steuer);
        [frueher, spaeter] = $$('button', steuer);
      }
    }
    let textEl = null;
    if (o.ebenentext) {
      textEl = o.textEl || neu('div', 'kartentext');
      if (!o.textEl) textEl.classList.add('kartentext');
      textEl.setAttribute('aria-live', 'polite');
    }
    // Reihenfolge für die Tastatur: Kartenwahl, Karte, Kopf, Legende mit früher und später, Text der Karte; das Raster ordnet sie an
    fig.insertBefore(zwOL, rahmen);
    [zwOR, zwUL, zwUR].forEach(z => fig.appendChild(z));
    if (legende) fig.appendChild(legende);
    if (textEl && !o.textEl) fig.appendChild(textEl);
    fig.classList.add('ist-gebaut');

    // ---------- Zustand ----------
    let karte = null, i = 0, gewaehlt = null, zeiger = null, kontinent = null;
    const D = () => K[karte];

    // ---------- Kern ----------
    let g = null;
    const schrift = T.schrift || 'serif';
    const blauGrad = () => telefon() ? 12 : 13;
    let aussparCache = [];
    if (window.d3 && window.topojson && window.Globus && window.WELT_110M) {
      try {
        g = window.Globus.erstellen({
          // Ohne Ringwort („Äquator“) und ohne Gewässernamen: A hat beides nicht (Textregel); o.ring bleibt für später
          canvas, hinweis, dauer: 1000, ring: null, gewaesserNamen: false, landName, alleLaender: true,
          bereist: inhalt().bereist || [], winzig: inhalt().winzig || {}, ansichten: inhalt().ansichten || {},
          farben: { papier: T.papier, tinte: T.tinte, blau: T.blau, blauRaster: T.blauRaster },
          schrift: { ort: `500 15px ${schrift}`, ortAktiv: `600 15px ${schrift}`, land: `500 ${blauGrad()}px ${schrift}`, wasser: `italic 500 ${blauGrad()}px ${schrift}`, ring: `500 ${blauGrad()}px ${schrift}` },
          aussparungen: () => aussparCache,
          beiLand: land => { if (karte === 'reisen') { zeiger = land; tafelSetzen(true); } },
          beimEingriff: () => { if (karte === 'reisen' && kontinent) { kontinent = null; tafelSetzen(true); } }
        });
      } catch (fehler) { g = null; console.warn('Karte:', fehler); }
    }
    // Ohne Kern bleibt im Rahmen nur der Satz von A: Kartenwahl, Legende mit früher und später und der Text der Karte täten nichts.
    // Den Zwickel oben rechts behält eine Seite, die ihre Tafel selbst setzt (o.legende false: Satoshi, Ursprung)
    if (!g) {
      fig.classList.add('ohne-kugel'); canvas.remove();
      [zwOL, zwUL, zwUR, legende, o.textEl ? null : textEl, o.legende ? zwOR : null].forEach(el => { if (el) el.remove(); });
      return null;
    }

    // ---------- Zwickel: der Kopf oben rechts weicht der Kugel aus ----------
    const zwickellage = () => getComputedStyle(zwOR).getPropertyValue('--lage').trim() === 'zwickel';
    function textRechtecke(el, bezug) {
      const out = [], w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let n;
      const r = document.createRange();
      while ((n = w.nextNode())) {
        if (!n.textContent.trim()) continue;
        r.selectNodeContents(n);
        Array.from(r.getClientRects()).forEach(q => { if (q.width && q.height) out.push([q.left - bezug.left, q.top - bezug.top, q.right - bezug.left, q.bottom - bezug.top]); });
      }
      $$('svg', el).forEach(s => { const q = s.getBoundingClientRect(); if (q.width) out.push([q.left - bezug.left, q.top - bezug.top, q.right - bezug.left, q.bottom - bezug.top]); });
      return out;
    }
    function zwickelFormen() {
      const S = canvas.clientWidth;
      const zw = zwickellage();
      zwOR.style.width = zw ? Math.round(S * .46) + 'px' : '';
      if (!zw) { ausparung.style.shapeOutside = ''; ausparung.style.height = ''; ausparung.style.width = ''; aussparCache = []; [zwUL, zwUR].forEach(z => { z.style.maxWidth = ''; }); return; }
      // Die Aussparung ist so breit wie der Zwickel: shape-outside wirkt nur innerhalb ihres Kastens
      ausparung.style.height = Math.round(S * .46) + 'px';
      ausparung.style.width = Math.round(S * .46) + 'px';
      const c = canvas.getBoundingClientRect(), R = Math.max(0, S / 2 - (S < 480 ? 19 : 24)), M = 4;
      const b = ausparung.getBoundingClientRect();
      ausparung.style.shapeOutside = `circle(${(R + M).toFixed(1)}px at ${(c.left + S / 2 - b.left).toFixed(1)}px ${(c.top + S / 2 - b.top).toFixed(1)}px)`;
      // Unten: so schmal, dass die oberste Zeile neben dem Kreis bleibt (der Block wächst beim Umbrechen nach oben)
      [zwUL, zwUR].forEach(z => {
        z.style.maxWidth = '';
        for (let n = 0; n < 4; n++) {
          const q = z.getBoundingClientRect();
          const dy = Math.abs(q.top - (c.top + S / 2)), frei = dy < R + M ? Math.sqrt((R + M) ** 2 - dy ** 2) : 0;
          const rand = z === zwUL ? q.left - c.left : c.right - q.right;
          const platz = Math.floor(S / 2 - frei - rand);
          if (!frei || q.width <= platz) break;
          z.style.maxWidth = Math.max(80, platz) + 'px';
        }
      });
      aussparCache = [zwOR, zwUL, zwUR].flatMap(z => textRechtecke(z, c));
    }

    // ---------- Tafel ----------
    // Was die Tafel gerade zeigt: der Schritt der Karte; auf Reisen das Land unter dem Zeiger, das gewählte, der Kontinent, die Zahl
    function inhaltJetzt() {
      const d = D();
      if (d.schritte) return d.schritte[i].inhalt();
      return reisenInhalt(zeiger || gewaehlt, kontinent, { guides: o.guides });
    }
    let stand = '';
    function tafelSetzen(nurTafel) {
      const d = D();
      if (kopf) {
        const t = tafelTeile(inhaltJetzt());
        const neuStand = t.kopf + '|' + t.legende + '|' + (d.legendeText && o.satz && !o.ebenentext ? 'x' : '');
        if (neuStand !== stand) {
          stand = neuStand;
          kopf.innerHTML = t.kopf;
          inhaltEl.innerHTML = t.legende + (!d.schritte && o.satz && !o.ebenentext && d.legendeText ? `<div class="legendenzusatz">${d.legendeText()}</div>` : '');
        }
      }
      if (legende) legende.classList.toggle('ohne-schritte', !d.schritte);
      if (frueher) {
        frueher.classList.toggle('ist-aus', !d.schritte || i <= 0);
        spaeter.classList.toggle('ist-aus', !d.schritte || i >= d.schritte.length - 1);
        [frueher, spaeter].forEach(b => { const aus = b.classList.contains('ist-aus'); b.tabIndex = aus ? -1 : 0; b.setAttribute('aria-hidden', String(aus)); });
      }
      woerterSetzen();
      zwickelFormen();
      neuZeichnen();
      if (!nurTafel && typeof o.beiSchritt === 'function') o.beiSchritt(karte, i, d.schritte ? d.schritte[i] : null);
    }
    // Der Text der Karte (o.ebenentext) und Elemente mit data-karten-text stehen nur bei ihrer Karte
    function textSetzen() {
      if (textEl) textEl.innerHTML = D().text ? D().text() : '';
      $$('[data-karten-text]').forEach(el => { el.hidden = el.dataset.kartenText !== karte; });
    }
    // Das Bedienwort des gezeigten Schritts und der gewählte Kontinent verlieren den Strich
    function woerterSetzen() {
      const d = D();
      const s = d.schritte ? d.schritte[i] : null;
      $$('[data-schritt-zu]').forEach(b => {
        const z = d.schritte ? d.schritte[+b.dataset.schrittZu] : null;
        const an = !!s && !!z && !s.ueberblick && (z === s || (z.name === s.name && !/^Noch einmal/.test(b.textContent)));
        b.classList.toggle('ist-aktiv', an);
        if (an) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
      });
      $$('[data-kontinent]').forEach(b => b.classList.toggle('ist-aktiv', karte === 'reisen' && b.dataset.kontinent === kontinent));
    }
    // Nach einer Änderung an den Zwickeln einmal neu zeichnen (die Ringbeschriftung weicht dem Text aus), höchstens einmal je Bild
    let bildAngefordert = 0;
    function neuZeichnen() { if (!bildAngefordert) bildAngefordert = requestAnimationFrame(() => { bildAngefordert = 0; g.zeichnen(); }); }
    // Legende und, in der Außenlage, Kopf halten die Höhe ihres längsten Inhalts auf dieser Karte: darunter springt nichts
    function hoeheHalten() {
      if (!kopf) return;
      const d = D();
      const alle = d.schritte ? d.schritte.map(s => s.inhalt()) :
        [reisenInhalt(null, null, o), ...Object.keys(KONTINENTE).map(k => reisenInhalt(null, k, o)), reisenInhalt({ iso: 'XX', name: 'Demokratische Republik Kongo', punkt: [20, -3] }, null, o)]
          .concat(Object.keys(o.guides || {}).map(iso => reisenInhalt({ iso, punkt: [0, 0] }, null, o)));
      const teile = alle.map(tafelTeile);
      const extra = !d.schritte && o.satz && !o.ebenentext && d.legendeText ? `<div class="legendenzusatz">${d.legendeText()}</div>` : '';
      const probe = (el, inhalte) => {
        el.style.minHeight = '';
        const p = el.cloneNode(false);
        p.removeAttribute('aria-live');
        p.setAttribute('aria-hidden', 'true');
        p.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;left:0;top:0;width:${el.getBoundingClientRect().width}px;min-height:0;max-width:none;margin:0`;
        el.parentNode.appendChild(p);
        let h = 0;
        inhalte.forEach(x => { p.innerHTML = x; h = Math.max(h, p.getBoundingClientRect().height); });
        p.remove();
        el.style.minHeight = Math.ceil(h) + 'px';
      };
      probe(inhaltEl, teile.map(t => t.legende + extra));
      if (!zwickellage()) probe(kopf, teile.map(t => t.kopf));
      else kopf.style.minHeight = '';
    }

    // ---------- Karten und Schritte ----------
    function ebeneSetzen(key, blick, fliegen) {
      const d = K[key];
      return g.ebene({ orte: d.orte, laender: !!d.laender, grenzen: d.grenzen !== false, fluesse: !!d.fluesse, blick }, { fliegen });
    }
    // Beim Wählen einer Karte: Wohnorte zeigen den ganzen Weg und den heutigen Wohnort, Satoshi den Roman, Ursprung die Trilogie
    function waehlen(key, e) {
      e = e || {};
      if (!K[key]) return;
      karte = key; gewaehlt = null; zeiger = null; kontinent = null; stand = '';
      const d = D();
      if (wahl) $$('[data-karte]', wahl).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.karte === key)));
      erkl.innerHTML = d.zeichen.map(([z, w]) => `<li>${zeichen(z)}${esc(w)}</li>`).join('');
      zwUL.hidden = !d.zeichen.length;
      const fliegen = e.fliegen !== false;
      if (d.schritte) {
        i = d.start || 0;
        const s = d.schritte[i];
        ebeneSetzen(key, s.ueberblick ? d.ueberblick() : d.blick(s), fliegen);
        if (d.weg) g.routeZeigen(d.schritte.filter(x => !x.ueberblick));
        g.aktiv(s.ueberblick ? d.aktivBeiUeberblick || null : s.name);
      } else {
        ebeneSetzen(key, d.ueberblick(), fliegen);
      }
      textSetzen();
      hoeheHalten();
      tafelSetzen();
    }
    function schritt(n, e) {
      e = e || {};
      const d = D();
      if (!d.schritte) return;
      i = Math.max(0, Math.min(d.schritte.length - 1, n));
      const s = d.schritte[i];
      if (d.fest) g.aktiv(s.ueberblick ? null : s.name);
      else if (s.ueberblick) {
        const b = d.ueberblick();
        if (e.fliegen === false) g.springen(b.mitte, b.k); else g.fliegen(b.mitte, b.k);
        g.aktiv(d.aktivBeiUeberblick || null);
      } else if (e.fliegen === false) { const b = d.blick(s); g.springen(b.mitte, b.k); g.aktiv(s.name); }
      else g.ortAnfliegen({ name: s.name, lat: s.lat, lon: s.lon }, d.blick(s).k);
      tafelSetzen();
    }
    function kontinentWaehlen(name) {
      const [mitte, k] = KONTINENTE[name] || [];
      if (!mitte) return;
      if (karte !== 'reisen') waehlen('reisen', { fliegen: false });
      gewaehlt = null; zeiger = null; g.auswahl(null);
      g.fliegen(mitte, k);
      kontinent = name;
      tafelSetzen();
    }

    // ---------- Reisen: ein Klick wählt ein bereistes Land, der Kern schreibt seinen Namen auf die Karte ----------
    canvas.addEventListener('click', e => {
      if (karte !== 'reisen') return;
      const r = canvas.getBoundingClientRect();
      gewaehlt = g.landBei(e.clientX - r.left, e.clientY - r.top);
      if (gewaehlt) kontinent = null;
      g.auswahl(gewaehlt ? gewaehlt.iso : null);
      tafelSetzen();
    });

    // Der Kern zeigt den Hinweis bei jedem Rad ohne Taste; hier erscheint jeder Hinweis höchstens einmal je Besuch, zwei Sekunden
    if ('MutationObserver' in window) {
      let zeigt = null, uhr = 0;
      const verbraucht = new Set();
      new MutationObserver(() => {
        if (hinweis.hidden) { clearTimeout(uhr); uhr = 0; if (zeigt) verbraucht.add(zeigt); zeigt = null; return; }
        const text = hinweis.textContent;
        if (verbraucht.has(text)) { hinweis.hidden = true; return; }
        if (text === zeigt) return;
        zeigt = text;
        zwickelFormen();
        clearTimeout(uhr);
        uhr = setTimeout(() => { hinweis.hidden = true; }, 2000);
      }).observe(hinweis, { attributes: true, attributeFilter: ['hidden'], childList: true, characterData: true, subtree: true });
    }

    // ---------- Bedienung: Kartenwahl, früher und später in der Tafel; Bedienwörter der Seite überall ----------
    fig.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b || !fig.contains(b)) return;
      if (b.dataset.karte) { if (b.dataset.karte !== karte) waehlen(b.dataset.karte); return; }
      if (b.dataset.schritt) {
        if (b.classList.contains('ist-aus')) return;
        const fokus = document.activeElement === b;
        schritt(i + +b.dataset.schritt);
        // Am Ende verschwindet das Wort; der Fokus geht zum anderen
        if (fokus && b.classList.contains('ist-aus')) (b === frueher ? spaeter : frueher).focus({ preventScroll: true });
      }
    });
    document.addEventListener('click', e => {
      const b = e.target.closest('button[data-schritt-zu], button[data-kontinent]');
      if (!b) return;
      if (b.dataset.kontinent) { kontinentWaehlen(b.dataset.kontinent); return; }
      if (D().schritte) schritt(+b.dataset.schrittZu);
    });

    // ---------- Laden, Größe ----------
    const start = o.start && liste.includes(o.start) ? o.start : liste[0];
    waehlen(start, { fliegen: false });
    if (wahl) gleichBreit($$('button', wahl));
    schriften(2500).then(() => {
      hoeheHalten();
      tafelSetzen(true);
      fig.classList.add('ist-bereit');
    });
    let uhr = 0, breiteVorher = 0;
    window.addEventListener('resize', () => {
      clearTimeout(uhr);
      uhr = setTimeout(() => {
        zwickelFormen();
        const w = fig.getBoundingClientRect().width;
        if (Math.abs(w - breiteVorher) > .5) { breiteVorher = w; hoeheHalten(); }
        g.zeichnen();
      }, 120);
    });
    if ('ResizeObserver' in window) {
      let w0 = canvas.clientWidth, ru = 0;
      new ResizeObserver(() => {
        if (Math.abs(canvas.clientWidth - w0) < .5) return;
        w0 = canvas.clientWidth;
        clearTimeout(ru);
        ru = setTimeout(() => window.dispatchEvent(new Event('resize')), 30);
      }).observe(canvas);
    }

    return {
      waehlen, schritt, kern: g, karte: () => karte, jetzt: () => i, kontinent: kontinentWaehlen,
      land: iso => {
        if (karte !== 'reisen') return null;
        gewaehlt = g.land(iso) || { iso, name: landName(iso), punkt: (inhalt().winzig || {})[iso] };
        kontinent = null; zeiger = null;
        g.auswahl(iso);
        tafelSetzen();
        return g.landAnfliegen(iso);
      },
      gewaehlt: () => gewaehlt
    };
  }

  // ---------- Fuß: Newsletter und Profile ----------
  /* Profile im Fuß, unter Impressum und Datenschutz. Hier eintragen, sobald Dominik die Adressen gibt, in der Reihenfolge, in der
     sie stehen sollen, etwa { name: 'Instagram', url: 'https://…' }, { name: 'LinkedIn', url: 'https://…' }. Version A hat dieselbe
     Liste in website/seite.js. Solange die Liste leer ist, bleibt die Zeile .profile verborgen. */
  const PROFILE = [];
  /* Die Zeile „Eine E-Mail, wenn ein Buch erscheint oder eine Lesung ansteht“ (form.post im Fuß jeder Seite), Wortlaut wie in A.
     Einen Newsletter-Dienst gibt es noch nicht: Eintragen schickt nichts ab und lädt nichts, es leert nur das Feld und zeigt den
     Dank in der Statuszeile. Ohne Skript ist das Formular verborgen (stil.css), damit der Browser die Adresse nicht als Teil der
     Adresszeile abschickt. */
  const POST_DANKE = 'Danke. Im Testsystem wird noch nichts verschickt.';
  function fuss() {
    $$('form.post').forEach(form => {
      if (form.dataset.bereit) return;
      form.dataset.bereit = '1';
      const status = $('.post-status', form);
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

  // ---------- Navigation ----------
  /* Markiert die jetzige Seite in .nav (aria-current, halbfett). Erzählungen und Untertext stehen wie in A immer da: Elemente mit
     data-wenn-texte erscheinen, Elemente mit data-verweis-wenn-texte und data-href werden zum Verweis (die Attribute sind aus der
     Zeit, als B sie erst mit dem ersten Text zeigte). */
  function navigation() {
    document.documentElement.classList.add('js');
    const datei = decodeURIComponent(location.pathname.split('/').pop() || '') || SEITEN.start;
    $$('.nav a').forEach(a => { if (a.getAttribute('href') === datei && !$('[aria-current="page"]', a.closest('.nav'))) a.setAttribute('aria-current', 'page'); });
    $$('[data-wenn-texte]').forEach(el => { el.hidden = false; });
    $$('[data-verweis-wenn-texte]').forEach(el => {
      if (el.tagName === 'A' || !el.dataset.href) return;
      const a = document.createElement('a');
      a.href = el.dataset.href;
      a.innerHTML = el.innerHTML;
      el.replaceWith(a);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', navigation); else navigation();

  window.FSeite = {
    SEITEN, NBSP, NNBSP, $, $$, esc, sauber, ruhig, desktop, telefon, tokens,
    zahlwort, gross, tausender, jahrText, chr, versalien, punkt, grad, koord, entfernungKm, km, jahrMarke, schriften, gleichBreit, zeichen,
    texte, buch, werkKarte, leselinie, stationen, szenen, landName, blickFuer,
    stationInhalt, lebenUeberblick, satoshiInhalt, ursprungOrte, ursprungInhalt, reisenInhalt, tafelTeile, kartentafel, navigation,
    fuss, PROFILE
  };
})();
