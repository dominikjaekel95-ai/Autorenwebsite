/* Version B (website-b): gemeinsame Hilfen aller Seiten, als window.FSeite.
   Neu geschrieben nach docs/gestaltung-website-b.md. Aus Version A übernommen sind nur Datenhelfer und Rechenwege
   (buch: Titel, Ordnung, Nachname, deutsche Rücken, Regelmaße; jahrText; texte; leselinie; blickFuer). Kein Markup, keine
   Klassen und kein Aussehen aus A. Farben, Grade und Schriften stehen in stil.css; was auf der Leinwand gezeichnet wird, liest
   seine Farben und Schriften aus den Tokens (tokens()).

   Braucht daten/inhalt.js. Für die Karte außerdem lib/d3.min.js, lib/topojson-client.min.js, daten/welt-110m.js,
   daten/laender-de.js, daten/uk-landesteile.js, globus/kern.js und daten/stationen.js; für Bücher daten/buecher.js und
   daten/leseliste.js; für Erzählungen und Untertext daten/texte.js. Fehlt etwas, bleibt die Seite ruhig.

   Übersicht (alles unter window.FSeite):
     SEITEN, NBSP, NNBSP            Dateinamen der Seiten; geschütztes und schmales geschütztes Leerzeichen
     $(sel, wurzel), $$(…)          querySelector, querySelectorAll als Liste
     esc(s), sauber(s)              HTML maskieren; Reste aus dem Export entfernen
     ruhig(), desktop(), telefon()  reduzierte Bewegung; Raster ab 75 rem; unter 48 rem
     tokens()                       Farben und Schriften aus stil.css { papier, tinte, tinteRaster, blau, blauRaster, schrift, ziffern }
     zahlwort(n), gross(s), tausender(n), jahrText(j), chr(t), versalien(html)
                                    Zahlwort bis 99; erster Buchstabe groß; 12 000 erst ab fünf Stellen; „um 750 v. Chr.“;
                                    „v. Chr.“ zusammenhalten; Versalabkürzungen ab drei Buchstaben als <abbr> (Kapitälchen)
     schriften(ms)                  Promise: Baskervville (Antiqua, Kursive, 500) und die Kartenziffern geladen, höchstens ms
     zeichen(art)                   gezeichnetes Zeichen als SVG für Zeichenerklärung und Tafel:
                                    'punkt', 'kreis', 'schraffur' (Karte); 'ruecken', 'liebste', 'wieder', 'abgebrochen', 'auszuege' (Regal)
     texte.alle(art), texte.satz(s), texte.datum(d), texte.punkt(s), texte.ARTEN
     buch.alle(), buch.ordnung, buch.nachname(a), buch.titelKurz(t), buch.deutsch(b), buch.masse(b), buch.fach(b),
     buch.FAECHER, buch.zeile(b), buch.manuskript()     Bücher und die Buchzeile nach Abschnitt 12.8
     leselinie(elemente, beiSchritt, o)   welches Element zuletzt die Leselinie erreicht hat (vor und zurück)
     stationen()                    Wohnorte aus INHALT.leben mit Zeitraum und Satz aus daten/stationen.js
     blickFuer(orte, bereich)       Mitte [lon, lat], bei der alle Orte mit Abstand zum Rand auf der Kugel stehen
     kartentafel(figur, o)          die Kartentafel (Abschnitt 12.5 und 12.6), siehe dort
     navigation()                   läuft beim Laden von selbst
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
    return { papier: t('--papier'), tinte: t('--tinte'), tinteRaster: t('--tinte-raster'), blau: t('--blau'), blauRaster: t('--blau-raster'), schrift: t('--schrift'), ziffern: t('--schrift-ziffern') };
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

  // ---------- Schrift ----------
  function schriften(ms) {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    const laden = Promise.all([
      document.fonts.load('400 20px "Baskervville"'), document.fonts.load('italic 400 20px "Baskervville"'),
      document.fonts.load('500 15px "Baskervville"'), document.fonts.load('500 13px "Baskervville Ziffern"', '0123456789')
    ]);
    return Promise.race([laden, warten(ms || 2500)]).catch(() => {});
  }

  // ---------- Gezeichnete Zeichen ----------
  // In Tinte (currentColor), ohne feste Farbe. Breite und Höhe in Pixeln; die Grundlinie liegt am unteren Rand
  function zeichen(art) {
    const svg = (w, h, inhalt) => `<svg class="zeichen" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true" focusable="false">${inhalt}</svg>`;
    switch (art) {
      case 'punkt': return svg(8, 9, '<circle cx="4" cy="4.5" r="3.5" fill="currentColor"/>');
      case 'kreis': return svg(8, 9, '<circle cx="4" cy="4.5" r="2.875" fill="none" stroke="currentColor" stroke-width="1.25"/>');
      case 'schraffur': {
        let l = '';
        for (let x = -11; x < 17; x += 3.4) l += `M${x.toFixed(2)} 11L${(x + 11).toFixed(2)} 0`;
        return svg(16, 11, `<path d="${l}" stroke="currentColor" stroke-width=".55" fill="none"/><rect x=".375" y=".375" width="15.25" height="10.25" fill="none" stroke="currentColor" stroke-width=".75"/>`);
      }
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
          if (!v || /[\s(\[„‚–]$/.test(v) || /<(?:i|em)>$/.test(v)) return 'oeffnet';
          if (!BUCHSTABE.test(t[j + 1] || '')) return 'schliesst';
        }
        return null;
      };
      for (let i = 0; i < t.length; i++) {
        const c = t[i];
        if (c !== "'") { aus += c; continue; }
        const vor = t.slice(0, i), nach = t.slice(i + 1);
        const anfang = !vor || /[\s(\[„‚–]$/.test(vor) || /<(?:i|em)>$/.test(vor);
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
        .replace(/(^|[\s(\[–‚]|<i>|<em>)"(?=\S)/g, '$1„')
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

  // ---------- Bücher (Datenhelfer und Regelmaße aus Version A, Buchzeile nach Abschnitt 12.8) ----------
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
    function titelKurz(t) {
      const s = sauber(t).replace(/\s*\(.*\)\s*$/, '').split(/:\s|\s[-–]\s/)[0];
      return s.replace(/(\d)-(\d)/g, '$1–$2').replace(/'/g, '’').trim();
    }
    const REGALE = ['gelesen', 'kindheit', 'gerade', 'abgebrochen'];
    const ordnung = (x, y) => (x.j == null) - (y.j == null) || (x.j || 0) - (y.j || 0) || x.nn.localeCompare(y.nn, 'de') || x.t.localeCompare(y.t, 'de');
    // Was noch wartet, kommt aus daten/leseliste.js (r: 'leseliste'), ohne was schon im Regal steht oder gerade gelesen wird
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
    // Die Buchzeile (12.8): Autor, Titel kursiv. Jahr. Verlag, Seiten. Leseart. Leere Teile entfallen. Gibt { text, html }
    function zeile(b) {
      const html = [], text = [];
      const teil = (h, t) => { html.push(h); text.push(t == null ? h : t); };
      const titel = esc(b.t);
      if (b.autor) teil(`${esc(b.autor)}, <i>${titel}</i>.`, `${b.autor}, ${b.t}.`); else teil(`<i>${titel}</i>.`, b.t + '.');
      if (b.j != null) teil(punkt(b.j < 1450 ? 'Entstanden ' + jahrText(b.j) : 'Zuerst erschienen ' + b.j));
      const ausgabe = [b.v ? esc(b.v) : '', b.p ? (b.ungefaehr ? 'etwa ' : '') + tausender(b.p) + ' Seiten' : ''].filter(Boolean).join(', ');
      if (ausgabe) teil(ausgabe + '.', ausgabe.replace(/&amp;/g, '&') + '.');
      if (b.r === 'gerade') teil('Lese ich gerade.');
      if (b.x) teil('In Auszügen gelesen.');
      if (b.r === 'abgebrochen') teil('Nicht zu Ende gelesen.');
      if (b.w) teil('Mehr als einmal gelesen.');
      if (b.s === 5 && b.r !== 'leseliste') teil('Eines der liebsten.');
      return { html: versalien(html.join(' ')), text: text.join(' ') };
    }
    const manuskript = () => ({
      html: `<a href="${SEITEN.satoshi}"><i>Satoshi</i></a> (AT). Manuskript, 364 Normseiten.`,
      text: 'Satoshi (AT). Manuskript, 364 Normseiten.'
    });
    return { alle, ordnung, nachname, titelKurz, deutsch, masse, fach, FAECHER, zeile, manuskript };
  })();

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
  // Wohnorte aus INHALT.leben; Zeitraum und Satz der Tafel aus daten/stationen.js
  function stationen() {
    const ST = window.STATIONEN || {};
    return (inhalt().leben || []).map(s => {
      const x = ST[s.name] || {};
      return { name: s.name, lat: s.lat, lon: s.lon, neben: !!s.neben, land: s.land || '', jahr: s.jahr, zeit: x.zeit || String(s.jahr || '').replace(/^bis /, ''), satz: x.satz || '' };
    });
  }
  /* Mitte für einen Überblick (Rechenweg aus Version A, für die ganze Kugel im Ring): alle Orte im Kreis, möglichst weit vom Rand,
     bei gleich guten Lagen die, deren Orte um die Mitte liegen. bereich: { lon: [von, bis], lat: [von, bis], k, schritt } */
  function blickFuer(orte, bereich) {
    for (const rand of [40, 24, 12]) { const m = blickStreng(orte, bereich, rand); if (m) return m; }
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

  // ---------- Kartentafel (Abschnitt 12.5 und 12.6) ----------
  /* kartentafel(figur, o): baut in <figure class="kartentafel"> mit <div class="rahmen"> (darin <p class="ohne-karte">) die Tafel:
     Leinwand, Zwickel (Kartenwahl, Kopf der Tafel, Zeichenerklärung, Maßstab und Hinweis), Legende mit früher und später.
       o.karten     Liste aus 'wohnorte', 'reisen', 'satoshi', 'ursprung' (Vorgabe ['wohnorte']); mehr als eine: Kartenwahl
       o.start      die Karte beim Laden (Vorgabe die erste)
       o.chronik    true: auf „wohnorte“ läuft einmal die Chronik (Startseite)
       o.legende    false: keine Legende und kein früher und später (Seite Satoshi)
       o.ortWoerter Bedienwörter mit data-ort="Name" (Kurzvita): fliegen die Karte zum Wohnort; der Ort, an dem sie steht, verliert den Strich
       o.beiSchritt (karte, i, schritt) => {}   nach jedem Schritt
     Rückgabe: { waehlen(karte), schritt(i, { fliegen }), ort(name), land(iso), kern, karte(), jetzt() } oder null ohne Kern */
  const KONTINENTE = { Europa: [[13, 50], 3.3], Asien: [[94, 26], 1.75], Afrika: [[16, 4], 1.9], Amerika: [[-80, 12], 1.25] };
  const europa = s => s.lat > 35 && s.lon > -12 && s.lon < 32;
  const zoomFuer = s => europa(s) ? 3.6 : 2.5;

  function karten() {
    const I = inhalt();
    const wohnorte = stationen();
    const berlin = wohnorte.map(s => s.neben).lastIndexOf(false);
    const SAT = I.satoshi || {};
    const satOrte = [];
    (SAT.szenen || []).forEach(s => { const o = (SAT.orte || []).find(x => x.name === s.ort); if (o && !satOrte.includes(o)) satOrte.push(o); });
    const szenen = (SAT.szenen || []).map(s => Object.assign({}, (SAT.orte || []).find(x => x.name === s.ort) || {}, { jahr: s.jahr, text: s.text })).filter(s => s.lat != null);
    const baende = {};
    ((I.trilogie && I.trilogie.baende) || []).forEach(b => { baende[b.band] = b; });
    const bandSatz = band => {
      const roh = String((I.baende || {})[band] || ''), m = roh.match(/^.*?v\. Chr\.\s+(.+)$/);
      return m ? m[1] : roh;
    };
    const ursprung = (I.ursprung || []).map(o => Object.assign({}, o));
    const kont = I.kontinente || {};
    return {
      wohnorte: {
        name: 'Wohnorte', schritte: wohnorte, orte: wohnorte, weg: true, ende: berlin,
        zeichen: [['punkt', 'Wohnort'], ['kreis', 'längerer Aufenthalt']],
        kopf: s => ({ zeichen: s.neben ? 'kreis' : 'punkt', name: s.name, angabe: [s.land, s.zeit].filter(Boolean).join(', ') }),
        legende: s => versalien(esc(s.satz)), blick: s => ({ mitte: [s.lon, s.lat], k: zoomFuer(s) }),
        ueberblick: () => ({ mitte: blickFuer(wohnorte, { lon: [20, 100], lat: [5, 50] }) || [60, 30], k: 1 })
      },
      reisen: {
        name: 'Reisen', schritte: null, orte: [], laender: true, zeichen: [['schraffur', 'bereist']],
        kopfText: gross(zahlwort((I.bereist || []).length)) + ' Länder und Gebiete',
        legendeText: () => {
          const w = n => `<button type="button" class="wort" data-kontinent="${n}">${n}</button>`;
          const z = n => zahlwort((kont[n] || []).length);
          return `${gross(z('Europa'))} in ${w('Europa')}, ${z('Asien')} in ${w('Asien')}, ${z('Afrika')} in ${w('Afrika')} und ${z('Amerika')} in ${w('Amerika')}.`;
        },
        ueberblick: () => ({ mitte: [34, 28], k: 1 })
      },
      satoshi: {
        name: '<i>Satoshi</i>', schritte: szenen, orte: satOrte.map(o => ({ name: o.name, kurz: o.kurz, lat: o.lat, lon: o.lon })),
        zeichen: [['punkt', 'Schauplatz']],
        kopf: s => ({ zeichen: 'punkt', name: s.kurz || s.name, angabe: [s.notiz, s.jahr].filter(Boolean).join(', ') }),
        legende: s => versalien(esc(s.text)), blick: s => ({ mitte: [s.lon, s.lat], k: zoomFuer(s) })
      },
      ursprung: {
        name: '<i>Ursprung</i>', schritte: ursprung, orte: ursprung.map(o => ({ name: o.name, lat: o.lat, lon: o.lon })), grenzen: false, fest: true,
        zeichen: [['punkt', 'Schauplatz']],
        kopf: s => ({ zeichen: 'punkt', name: s.name, angabe: chr(s.jahr || '') }),
        legende: s => { const b = baende[s.band] || {}; return `Band ${esc(s.band)}, <i>${esc(b.titel || '')}</i>. ${esc(bandSatz(s.band))}`; },
        blick: () => ({ mitte: [40, 33.6], k: 7 })
      }
    };
  }

  function kartentafel(fig, o) {
    if (!fig) return null;
    o = Object.assign({ karten: ['wohnorte'], start: null, chronik: false, legende: true, ortWoerter: [], beiSchritt: null }, o || {});
    const T = tokens();
    const K = karten();
    const liste = o.karten.filter(k => K[k]);
    const rahmen = $('.rahmen', fig);
    if (!rahmen || !liste.length) return null;

    // ---------- Aufbau ----------
    const canvas = document.createElement('canvas');
    canvas.className = 'kugel';
    canvas.tabIndex = 0;
    canvas.setAttribute('aria-label', 'Karte. Ziehen oder Pfeiltasten drehen sie, Plus und Minus zoomen.');
    rahmen.insertBefore(canvas, rahmen.firstChild);
    const neu = (tag, cls, html) => { const el = document.createElement(tag); if (cls) el.className = cls; if (html) el.innerHTML = html; return el; };
    const zwOL = neu('div', 'zwickel zw-ol'), zwOR = neu('div', 'zwickel zw-or'), zwUL = neu('div', 'zwickel zw-ul'), zwUR = neu('div', 'zwickel zw-ur');
    [zwOL, zwOR].forEach(z => { const a = neu('div', 'aussparung'); a.setAttribute('aria-hidden', 'true'); z.appendChild(a); });
    let wahl = null;
    if (liste.length > 1) {
      wahl = neu('ul', 'wahl kartenwahl', liste.map(k => `<li><button type="button" data-karte="${k}" aria-pressed="false">${K[k].name}</button></li>`).join(''));
      wahl.setAttribute('aria-label', 'Karte');
      zwOL.appendChild(wahl);
    }
    const kopf = neu('div', 'tafelkopf');
    kopf.setAttribute('aria-live', 'polite');
    zwOR.appendChild(kopf);
    const erkl = neu('ul', 'zeichenerklaerung');
    erkl.setAttribute('aria-label', 'Zeichenerklärung');
    zwUL.appendChild(erkl);
    const hinweis = neu('p', 'hinweis');
    hinweis.hidden = true;
    const mass = neu('p', 'massstab ziffern');
    mass.hidden = true;
    mass.setAttribute('aria-hidden', 'true');
    zwUR.appendChild(hinweis);
    zwUR.appendChild(mass);
    let legende = null, satzEl = null, frueher = null, spaeter = null;
    if (o.legende) {
      legende = neu('figcaption', 'tafellegende');
      satzEl = neu('p', 'legendensatz');
      const steuer = neu('p', 'steuer', '<button type="button" class="steuerwort" data-schritt="-1">früher</button> <button type="button" class="steuerwort" data-schritt="1">später</button>');
      legende.appendChild(satzEl);
      legende.appendChild(steuer);
      [frueher, spaeter] = $$('button', steuer);
    }
    // Reihenfolge für die Tastatur: Kartenwahl, Karte, Kopf, Legende mit früher und später; das Raster ordnet sie an
    fig.insertBefore(zwOL, rahmen);
    [zwOR, zwUL, zwUR].forEach(z => fig.appendChild(z));
    if (legende) fig.appendChild(legende);
    fig.classList.add('ist-gebaut');

    // ---------- Zustand ----------
    let karte = null, i = 0, chronikLaeuft = false, begonnen = false, gewaehlt = null, hoverLand = null, massZuletzt = '';
    const D = () => K[karte];
    const laut = an => kopf.setAttribute('aria-live', an ? 'polite' : 'off');

    // ---------- Kern ----------
    let g = null;
    const schrift = T.schrift || 'serif', ziffern = T.ziffern || schrift;
    const blauGrad = () => telefon() ? 12 : 13;
    let aussparCache = [];
    if (window.d3 && window.topojson && window.Globus && window.WELT_110M) {
      try {
        g = window.Globus.erstellen({
          canvas, flaeche: rahmen, hinweis, zeichenart: 'druck', pendeln: false, versalien: false, dauer: 1000,
          bereist: inhalt().bereist || [], winzig: inhalt().winzig || {}, ansichten: inhalt().ansichten || {},
          farben: { papier: T.papier, tinte: T.tinte, blau: T.blau, blauRaster: T.blauRaster },
          schrift: { ort: `500 15px ${schrift}`, ortAktiv: `600 15px ${schrift}`, wasser: `italic 500 ${blauGrad()}px ${schrift}`, ring: `500 ${blauGrad()}px ${ziffern}` },
          aussparungen: () => aussparCache,
          beiLand: land => { if (karte) landHover(land); },
          beiAnsicht: a => { if (karte) massstabSetzen(a.massstab); },
          beimEingriff: () => eingriff(),
          beiChronikEnde: grund => chronikEnde(grund)
        });
      } catch (fehler) { g = null; console.warn('Karte:', fehler); }
    }
    if (!g) { fig.classList.add('ohne-kugel'); canvas.remove(); return null; }

    // ---------- Zwickel: Text weicht der Kugel aus ----------
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
      [zwOL, zwOR].forEach(z => {
        const a = $('.aussparung', z);
        z.style.width = zw ? Math.round(S * .46) + 'px' : '';
        if (!a) return;
        if (!zw) { a.style.shapeOutside = ''; a.style.height = ''; return; }
        a.style.height = Math.round(S * .46) + 'px';
      });
      [zwUL, zwUR].forEach(z => { z.style.maxWidth = ''; });
      if (!zw) { aussparCache = []; return; }
      const c = canvas.getBoundingClientRect(), R = S / 2 - (S < 480 ? 19 : 24), M = 4;
      [zwOL, zwOR].forEach(z => {
        const a = $('.aussparung', z), b = a.getBoundingClientRect();
        a.style.shapeOutside = `circle(${(R + M).toFixed(1)}px at ${(c.left + S / 2 - b.left).toFixed(1)}px ${(c.top + S / 2 - b.top).toFixed(1)}px)`;
      });
      // Unten: so schmal, dass die oberste Zeile neben dem Kreis bleibt (der Block wächst beim Umbrechen nach oben)
      [zwUL, zwUR].forEach(z => {
        for (let n = 0; n < 4; n++) {
          const b = z.getBoundingClientRect();
          const dy = Math.abs(b.top - (c.top + S / 2)), frei = dy < R + M ? Math.sqrt((R + M) ** 2 - dy ** 2) : 0;
          const rand = z === zwUL ? b.left - c.left : c.right - b.right;
          const platz = Math.floor(S / 2 - frei - rand);
          if (!frei || b.width <= platz) break;
          z.style.maxWidth = Math.max(80, platz) + 'px';
        }
      });
      aussparCache = [zwOL, zwOR, zwUL, zwUR].flatMap(z => textRechtecke(z, c));
    }

    function kopfHtml(t) {
      if (!t) return '';
      return `<p class="tafelkopf-ort">${t.zeichen ? zeichen(t.zeichen) : ''}${esc(t.name)}</p>` + (t.angabe ? `<p class="tafelkopf-angabe">${esc(t.angabe)}</p>` : '');
    }
    function tafelSetzen() {
      const d = D();
      if (d.schritte) {
        const s = d.schritte[i];
        kopf.innerHTML = kopfHtml(d.kopf(s));
        if (satzEl) satzEl.innerHTML = d.legende(s) || '';
      } else {
        kopf.innerHTML = gewaehlt ? kopfHtml({ name: gewaehlt.name }) : `<p class="tafelkopf-ort">${esc(d.kopfText)}</p>`;
        if (satzEl) satzEl.innerHTML = d.legendeText();
      }
      if (legende) legende.classList.toggle('ohne-schritte', !d.schritte);
      if (frueher) {
        frueher.classList.toggle('ist-aus', !d.schritte || i <= 0);
        spaeter.classList.toggle('ist-aus', !d.schritte || i >= d.schritte.length - 1);
        [frueher, spaeter].forEach(b => { const aus = b.classList.contains('ist-aus'); b.tabIndex = aus ? -1 : 0; b.setAttribute('aria-hidden', String(aus)); });
      }
      $$('[data-kontinent]', fig).forEach(b => b.classList.remove('ist-aktiv'));
      woerterSetzen();
      zwickelFormen();
      neuZeichnen();
      if (typeof o.beiSchritt === 'function') o.beiSchritt(karte, i, d.schritte ? d.schritte[i] : null);
    }
    // Nach einer Änderung an Kopf oder Zwickeln einmal neu zeichnen (die Gradzahlen weichen dem Text aus), höchstens einmal je Bild
    let bildAngefordert = 0;
    function neuZeichnen() { if (!bildAngefordert) bildAngefordert = requestAnimationFrame(() => { bildAngefordert = 0; g.zeichnen(); }); }
    function woerterSetzen() {
      const name = karte === 'wohnorte' && D().schritte ? D().schritte[i].name : null;
      o.ortWoerter.forEach(w => { const an = w.dataset.ort === name; w.classList.toggle('ist-aktiv', an); if (an) w.setAttribute('aria-current', 'true'); else w.removeAttribute('aria-current'); });
    }
    // Die Legende und, in der Außenlage, der Kopf halten die Höhe ihres längsten Inhalts: darunter springt nichts
    function hoehenHalten() {
      const d = D();
      const probe = (el, inhalte) => {
        if (!el) return;
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
      if (satzEl) probe(satzEl, d.schritte ? d.schritte.map(s => d.legende(s) || '') : [d.legendeText()]);
      if (!zwickellage()) probe(kopf, d.schritte ? d.schritte.map(s => kopfHtml(d.kopf(s))) : [`<p class="tafelkopf-ort">${esc(d.kopfText)}</p>`]);
      else kopf.style.minHeight = '';
    }

    // ---------- Karten und Schritte ----------
    function ebeneSetzen(key, blick, fliegen, orte) {
      const d = K[key];
      return g.ebene({ orte: orte || d.orte, laender: !!d.laender, grenzen: d.grenzen !== false, blick }, { fliegen });
    }
    function waehlen(key, e) {
      e = e || {};
      if (!K[key]) return;
      chronikBeenden();
      begonnen = true;
      karte = key; gewaehlt = null;
      const d = D();
      if (wahl) $$('[data-karte]', wahl).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.karte === key)));
      erkl.innerHTML = d.zeichen.map(([z, w]) => `<li>${zeichen(z)}${esc(w)}</li>`).join('');
      const fliegen = e.fliegen !== false;
      if (key === 'wohnorte') {
        i = e.schritt != null ? e.schritt : d.ende;
        const ziel = e.schritt != null ? d.blick(d.schritte[i]) : d.ueberblick();
        ebeneSetzen(key, ziel, fliegen);
        g.routeZeigen(d.schritte);
        g.aktiv(d.schritte[i].name);
      } else if (d.schritte) {
        i = e.schritt || 0;
        ebeneSetzen(key, d.blick(d.schritte[i]), fliegen);
        g.aktiv(d.schritte[i].name);
      } else {
        ebeneSetzen(key, d.ueberblick(), fliegen);
      }
      hoehenHalten();
      tafelSetzen();
    }
    function schritt(n, e) {
      e = e || {};
      const d = D();
      if (!d.schritte) return;
      chronikBeenden();
      begonnen = true;
      i = Math.max(0, Math.min(d.schritte.length - 1, n));
      const s = d.schritte[i];
      if (d.fest) g.aktiv(s.name);
      else if (e.fliegen === false) { const b = d.blick(s); g.springen(b.mitte, b.k); g.aktiv(s.name); }
      else g.ortAnfliegen({ name: s.name, lat: s.lat, lon: s.lon }, d.blick(s).k);
      tafelSetzen();
    }
    function ort(name) {
      const st = K.wohnorte.schritte, n = st.findIndex(s => s.name === name);
      if (n < 0) return;
      if (karte !== 'wohnorte') { waehlen('wohnorte', { schritt: n }); return; }
      schritt(n);
    }

    // ---------- Chronik der Startseite ----------
    function endstand(springen) {
      const d = K.wohnorte;
      chronikLaeuft = false;
      laut(true);
      if (karte !== 'wohnorte') return;
      i = d.ende;
      g.routeZeigen(d.schritte);
      const b = d.ueberblick();
      if (springen) g.springen(b.mitte, b.k);
      g.aktiv(d.schritte[i].name);
      tafelSetzen();
    }
    function chronikStarten() {
      if (karte !== 'wohnorte' || begonnen) return;
      begonnen = true;
      if (ruhig()) { endstand(true); return; }
      const d = K.wohnorte;
      chronikLaeuft = true;
      laut(false);
      ebeneSetzen('wohnorte', d.blick(d.schritte[0]), false);
      g.chronik(d.schritte, {
        sofort: true, dauer: 1000, pause: 2600, zoom: s => zoomFuer(s), schluss: d.ueberblick(),
        beiStation: (s, n) => { if (!chronikLaeuft) return; i = n; tafelSetzen(); }
      });
    }
    function chronikEnde(grund) {
      if (!chronikLaeuft) return;
      if (grund === 'fertig') { endstand(false); return; }
      chronikLaeuft = false;
      laut(true);
      g.routeZeigen(K.wohnorte.schritte);
      tafelSetzen();
    }
    // Die Seite selbst beendet die Chronik (Kartenwahl, früher und später, Bedienwort): der ganze Weg bleibt stehen
    function chronikBeenden() {
      if (!chronikLaeuft) return;
      chronikLaeuft = false;
      g.chronikStoppen();
      g.routeZeigen(K.wohnorte.schritte);
      laut(true);
    }
    // Wer die Karte anfasst, bevor die Chronik lief, sieht alle Wohnorte und den ganzen Weg
    function eingriff() {
      if (!begonnen && karte === 'wohnorte' && o.chronik) {
        begonnen = true;
        g.ebene({ orte: K.wohnorte.orte, laender: false, grenzen: true, blick: { mitte: [0, 0], k: 1 } }, { fliegen: false, behalten: true });
        g.routeZeigen(K.wohnorte.schritte);
        g.aktiv(K.wohnorte.schritte[i].name);
      }
      begonnen = true;
    }

    // ---------- Reisen: Land unter dem Zeiger, gewähltes Land, Kontinente ----------
    function landHover(land) {
      if (karte !== 'reisen') return;
      hoverLand = land;
      const zeigen = land || gewaehlt;
      kopf.innerHTML = zeigen ? kopfHtml({ name: zeigen.name }) : `<p class="tafelkopf-ort">${esc(D().kopfText)}</p>`;
      zwickelFormen();
    }
    canvas.addEventListener('click', e => {
      if (karte !== 'reisen') return;
      const r = canvas.getBoundingClientRect();
      const land = g.landBei(e.clientX - r.left, e.clientY - r.top);
      gewaehlt = land;
      g.auswahl(land ? land.iso : null);
      landHover(hoverLand);
      if (!land) kopf.innerHTML = `<p class="tafelkopf-ort">${esc(D().kopfText)}</p>`;
    });

    // ---------- Maßstab und Hinweis ----------
    function massstabSetzen(m) {
      const schluessel = m ? m.km + '|' + Math.round(m.px) : '';
      if (schluessel === massZuletzt) return;
      massZuletzt = schluessel;
      if (!m) { mass.hidden = true; mass.innerHTML = ''; return; }
      const w = Math.round(m.px);
      mass.innerHTML = `0<svg class="leiste" width="${w + 2}" height="7" viewBox="0 0 ${w + 2} 7" aria-hidden="true" focusable="false"><rect x="1" y="1" width="${(w / 2).toFixed(2)}" height="5" fill="currentColor"/><rect x="1" y="1" width="${w}" height="5" fill="none" stroke="currentColor" stroke-width=".75"/></svg>${m.km}${NBSP}km`;
      mass.hidden = false;
    }
    // Der Kern zeigt den Hinweis bei jedem Rad ohne Taste; hier erscheint jeder Hinweis höchstens einmal je Besuch, zwei Sekunden
    if ('MutationObserver' in window) {
      let zeigt = null, uhr = 0;
      const verbraucht = new Set();
      new MutationObserver(() => {
        if (hinweis.hidden) { clearTimeout(uhr); uhr = 0; if (zeigt) verbraucht.add(zeigt); zeigt = null; mass.style.display = ''; return; }
        const text = hinweis.textContent;
        if (verbraucht.has(text)) { hinweis.hidden = true; return; }
        if (text === zeigt) return;
        zeigt = text;
        mass.style.display = 'none';
        zwickelFormen();
        clearTimeout(uhr);
        uhr = setTimeout(() => { hinweis.hidden = true; }, 2000);
      }).observe(hinweis, { attributes: true, attributeFilter: ['hidden'], childList: true, characterData: true, subtree: true });
    }

    // ---------- Bedienung ----------
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
        return;
      }
      if (b.dataset.kontinent) {
        const [mitte, k] = KONTINENTE[b.dataset.kontinent] || [];
        if (!mitte) return;
        gewaehlt = null; g.auswahl(null);
        landHover(null);
        g.fliegen(mitte, k);
        $$('[data-kontinent]', fig).forEach(x => x.classList.toggle('ist-aktiv', x === b));
      }
    });
    // Ein Bedienwort außerhalb der Tafel: auf dem Telefon rückt die Karte ins Bild (ohne Glätten)
    function insBild() {
      const r = rahmen.getBoundingClientRect(), H = window.innerHeight;
      if (r.top >= 0 && r.bottom <= H) return;
      window.scrollBy(0, r.top - Math.max(8, (H - r.height) / 2));
    }
    o.ortWoerter.forEach(w => w.addEventListener('click', () => { ort(w.dataset.ort); insBild(); }));

    // ---------- Laden, Sichtbarkeit, Größe ----------
    const start = o.start && liste.includes(o.start) ? o.start : liste[0];
    karte = start;
    const d0 = K[start];
    erkl.innerHTML = d0.zeichen.map(([z, w]) => `<li>${zeichen(z)}${esc(w)}</li>`).join('');
    if (wahl) $$('[data-karte]', wahl).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.karte === start)));
    if (start === 'wohnorte' && o.chronik) {
      // Bis die Chronik beginnt, steht die Karte an ihrer ersten Station, nur mit diesem Ort
      i = 0;
      ebeneSetzen('wohnorte', d0.blick(d0.schritte[0]), false, d0.orte.slice(0, 1));
      g.aktiv(d0.schritte[0].name);
    } else if (d0.schritte) {
      i = start === 'wohnorte' ? d0.ende : 0;
      ebeneSetzen(start, start === 'wohnorte' ? d0.ueberblick() : d0.blick(d0.schritte[i]), false);
      if (start === 'wohnorte') g.routeZeigen(d0.schritte);
      g.aktiv(d0.schritte[i].name);
    } else ebeneSetzen(start, d0.ueberblick(), false);

    schriften(2500).then(() => {
      hoehenHalten();
      tafelSetzen();
      fig.classList.add('ist-bereit');
      if (!(start === 'wohnorte' && o.chronik)) return;
      // Bei reduzierter Bewegung keine Chronik: gleich der ganze Weg und Berlin
      if (ruhig()) { begonnen = true; endstand(true); return; }
      if (!('IntersectionObserver' in window)) { chronikStarten(); return; }
      // Sie beginnt, wenn die Karte zur Hälfte zu sehen ist, und endet, wenn sie das Fenster verlässt
      new IntersectionObserver(e => {
        const q = e[e.length - 1].intersectionRatio;
        if (q >= .5 && !begonnen) chronikStarten();
        else if (q < .15 && chronikLaeuft) { chronikBeenden(); endstand(true); }
      }, { threshold: [0, .15, .5, 1] }).observe(rahmen);
    });
    let uhr = 0, breiteVorher = 0;
    window.addEventListener('resize', () => {
      clearTimeout(uhr);
      uhr = setTimeout(() => {
        zwickelFormen();
        const w = fig.getBoundingClientRect().width;
        if (Math.abs(w - breiteVorher) > .5) { breiteVorher = w; hoehenHalten(); }
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

    return { waehlen, schritt, ort, kern: g, karte: () => karte, jetzt: () => i, land: iso => { if (karte === 'reisen') { const f = g.land(iso); gewaehlt = f; g.auswahl(iso); landHover(null); return g.landAnfliegen(iso); } } };
  }

  // ---------- Navigation ----------
  /* Markiert die jetzige Seite in .nav (aria-current, halbfett). Erzählungen und Untertext: Elemente mit data-wenn-texte="art"
     erscheinen erst, wenn daten/texte.js einen Text der Art enthält; Elemente mit data-verweis-wenn-texte="art" und data-href
     werden dann zum Verweis. */
  function navigation() {
    document.documentElement.classList.add('js');
    const datei = decodeURIComponent(location.pathname.split('/').pop() || '') || SEITEN.start;
    $$('.nav a').forEach(a => { if (a.getAttribute('href') === datei && !$('[aria-current="page"]', a.closest('.nav'))) a.setAttribute('aria-current', 'page'); });
    const da = art => texte.alle(art).length > 0;
    $$('[data-wenn-texte]').forEach(el => { el.hidden = !da(el.dataset.wennTexte); });
    $$('[data-verweis-wenn-texte]').forEach(el => {
      if (!da(el.dataset.verweisWennTexte) || el.tagName === 'A') return;
      const a = document.createElement('a');
      a.href = el.dataset.href;
      a.innerHTML = el.innerHTML;
      el.replaceWith(a);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', navigation); else navigation();

  window.FSeite = {
    SEITEN, NBSP, NNBSP, $, $$, esc, sauber, ruhig, desktop, telefon, tokens,
    zahlwort, gross, tausender, jahrText, chr, versalien, punkt, schriften, zeichen,
    texte, buch, leselinie, stationen, blickFuer, kartentafel, navigation
  };
})();
