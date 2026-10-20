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
     tokens()                       Farben und Schriften aus stil.css { papier, tinte, tinteRaster, blau, blauRaster, schrift }
     zahlwort(n), gross(s), tausender(n), jahrText(j), chr(t), versalien(html)
                                    Zahlwort bis 99; erster Buchstabe groß; 12 000 erst ab fünf Stellen; „um 750 v. Chr.“;
                                    „v. Chr.“ zusammenhalten; Versalabkürzungen ab drei Buchstaben als <abbr> (Kapitälchen)
     schriften(ms)                  Promise: Baskervville (Antiqua, Kursive, 500) geladen, höchstens ms
     gleichBreit(elemente)          Sperrung, die die Mehrbreite des halbfetten Worts ausgleicht (Auswahllisten)
     zeichen(art)                   gezeichnetes Zeichen als SVG für Zeichenerklärungen:
                                    'punkt', 'kreis' (Karte); 'ruecken', 'liebste', 'wieder', 'abgebrochen', 'auszuege' (Regal)
     texte.alle(art), texte.satz(s), texte.datum(d), texte.punkt(s), texte.ARTEN
     buch.alle(), buch.ordnung, buch.nachname(a), buch.titelKurz(t), buch.deutsch(b), buch.masse(b), buch.fach(b),
     buch.FAECHER, buch.zeile(b), buch.manuskript()     Bücher und die Buchzeile nach Abschnitt 12.8
     leselinie(elemente, beiSchritt, o)   welches Element zuletzt die Leselinie erreicht hat (vor und zurück)
     stationen()                    Wohnorte und längere Aufenthalte mit Land, Zeitraum und Satz aus daten/stationen.js
     szenen()                       die Szenen von Satoshi mit den Texten aus daten/stationen.js
     landName(iso)                  deutscher Name eines Lands oder Gebiets
     blickFuer(orte, bereich)       Mitte [lon, lat], bei der alle Orte mit Abstand zum Rand auf der Kugel stehen
     kartentafel(figur, o)          die Kartentafel, siehe dort
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
      'Thomas von Aquin': 'Thomas von Aquin', 'Mark Aurel': 'Mark Aurel', 'Anonymous': '', 'Anonym': '', 'Die 19 Finaltexte': ''
    };
    const AUTOR = { 'Anonymous': 'Anonym' };
    const BERICHTIGT = [
      { a: 'Ingeborg Bachmann', t: 'Malina', j: 1971 },
      { a: 'Franz Kafka', t: 'In the Penal Colony', j: 1919 },
      { a: 'Scott O\'Dell', t: 'Island of the Blue Dolphins', v: /cornelsen/i, u: '' },
      { a: 'David Graeber', t: 'The Dawn of Everything', autor: 'David Graeber und David Wengrow' }
    ];
    /* Werke, die zuerst auf Deutsch erschienen sind, stehen mit ihrem Originaltitel da, auch wenn die gelesene Ausgabe eine
       Übersetzung ist; Verlag und Seitenzahl der Buchzeile bleiben die der gelesenen Ausgabe. Schlüssel: Autor|Titel der Daten.
       Welche davon Dominik auf Deutsch gelesen hat, ist offen (Regeln 21.10). */
    const ORIGINAL = {
      'Christoph Ransmayr|Atlas of an Anxious Man': 'Atlas eines ängstlichen Mannes', 'Christoph Ransmayr|The Last World': 'Die letzte Welt',
      'Jenny Erpenbeck|Go, Went, Gone': 'Gehen, ging, gegangen', 'Jenny Erpenbeck|Visitation': 'Heimsuchung',
      'Ernst Haffner|Blood Brothers': 'Blutsbrüder', 'Ernst Jünger|Storm of Steel': 'In Stahlgewittern',
      'W.G. Sebald|The Rings of Saturn': 'Die Ringe des Saturn', 'W.G. Sebald|The Emigrants': 'Die Ausgewanderten',
      'Stefan Zweig|The World of Yesterday': 'Die Welt von Gestern', 'Stefan Zweig|Chess Story': 'Schachnovelle', 'Stefan Zweig|Fouché': 'Joseph Fouché',
      'Wulf Dorn|La psichiatra': 'Trigger', 'Franz Werfel|Una scrittura femminile azzurro pallido': 'Eine blassblaue Frauenschrift',
      'Irmgard Keun|The Artificial Silk Girl': 'Das kunstseidene Mädchen', 'John Rabe|The Good Man of Nanking': 'Der gute Deutsche von Nanking',
      'Heinrich Harrer|Seven Years in Tibet': 'Sieben Jahre in Tibet',
      'Thomas Mann|Mario and the Magician': 'Mario und der Zauberer', 'Thomas Mann|The Magic Mountain': 'Der Zauberberg', 'Thomas Mann|Death in Venice': 'Der Tod in Venedig',
      'Ferdinand von Schirach|The Collini Case': 'Der Fall Collini', 'Elfriede Jelinek|The Piano Teacher': 'Die Klavierspielerin',
      'Max Frisch|Bluebeard': 'Blaubart', 'Max Frisch|Gantenbein': 'Mein Name sei Gantenbein', "Max Frisch|I'm Not Stiller": 'Stiller', 'Max Frisch|Homo Faber': 'Homo faber',
      'Peter Stamm|Seven Years': 'Sieben Jahre', 'Christa Wolf|Cassandra': 'Kassandra',
      'Daniel Kehlmann|Measuring the World': 'Die Vermessung der Welt', 'Siegfried Lenz|The German Lesson': 'Deutschstunde',
      'Arthur Schnitzler|Dream Story': 'Traumnovelle', 'Arthur Schnitzler|La Ronde': 'Reigen',
      'Patrick Süskind|The Pigeon': 'Die Taube', 'Patrick Süskind|Perfume': 'Das Parfum',
      'Peter Handke|Short Letter, Long Farewell': 'Der kurze Brief zum langen Abschied',
      'Herta Müller|The Land of Green Plums': 'Herztier', 'Herta Müller|The Hunger Angel': 'Atemschaukel',
      'Saša Stanišić|How the Soldier Repairs the Gramophone': 'Wie der Soldat das Grammofon repariert',
      'Günter Grass|Crabwalk': 'Im Krebsgang', 'Günter Grass|Cat and Mouse': 'Katz und Maus',
      'Bernhard Schlink|The Reader': 'Der Vorleser', 'Friedrich Dürrenmatt|The Visit': 'Der Besuch der alten Dame',
      'Gustav Janouch|Conversations with Kafka': 'Gespräche mit Kafka', 'Karl Marx|The Communist Manifesto': 'Manifest der Kommunistischen Partei',
      'Joseph Roth|Job': 'Hiob', 'Otfried Preußler|The Little Ghost': 'Das kleine Gespenst', 'Erich Kästner|Emil and the Detectives': 'Emil und die Detektive',
      'Cornelia Funke|Inkheart': 'Tintenherz', 'Cornelia Funke|Inkspell': 'Tintenblut', 'Cornelia Funke|Inkdeath': 'Tintentod',
      'Friedrich Nietzsche|Thus Spoke Zarathustra': 'Also sprach Zarathustra',
      'Heinrich Böll|The Clown': 'Ansichten eines Clowns', 'Heinrich Böll|The Lost Honor of Katharina Blum': 'Die verlorene Ehre der Katharina Blum',
      'Markus Heitz|The Dwarves': 'Die Zwerge', 'Hugo von Hofmannsthal|The Lord Chandos Letter and Other Writings': 'Ein Brief',
      'Rainer Maria Rilke|Duino Elegies': 'Duineser Elegien', 'Rainer Maria Rilke|Letters to a Young Poet': 'Briefe an einen jungen Dichter',
      'Rainer Maria Rilke|The Notebooks of Malte Laurids Brigge': 'Die Aufzeichnungen des Malte Laurids Brigge',
      'Robert Musil|The Confusions of Young Törless': 'Die Verwirrungen des Zöglings Törleß',
      'Franz Kafka|A Country Doctor': 'Ein Landarzt', 'Franz Kafka|Letter to His Father': 'Brief an den Vater', 'Franz Kafka|In the Penal Colony': 'In der Strafkolonie',
      'Franz Kafka|A Hunger Artist': 'Ein Hungerkünstler', 'Franz Kafka|The Complete Short Stories': 'Sämtliche Erzählungen',
      'Franz Kafka|The Metamorphosis': 'Die Verwandlung', 'Franz Kafka|The Castle': 'Das Schloss', 'Franz Kafka|The Trial': 'Der Prozess',
      'Franz Kafka|Diaries, 1910-1923': 'Tagebücher 1910–1923', 'Franz Kafka|The Judgment and other stories': 'Das Urteil und andere Erzählungen',
      'Michael Ende|The Neverending Story': 'Die unendliche Geschichte', 'Johann Wolfgang von Goethe|Faust, First Part': 'Faust. Der Tragödie erster Teil',
      'Erich Maria Remarque|All Quiet on the Western Front': 'Im Westen nichts Neues',
      'Hermann Hesse|Beneath the Wheel': 'Unterm Rad', 'Hermann Hesse|Narcissus and Goldmund': 'Narziß und Goldmund', 'Hermann Hesse|Steppenwolf': 'Der Steppenwolf',
      'Hermann Hesse|The Glass Bead Game': 'Das Glasperlenspiel', 'Hermann Hesse|The Journey to the East': 'Die Morgenlandfahrt'
    };
    // Deutsche Namensformen (wie in deutschen Ausgaben)
    const NAMEN_DE = {
      'Aristotle': 'Aristoteles', 'Fyodor Dostoevsky': 'Fjodor Dostojewski', 'Leo Tolstoy': 'Leo Tolstoi', 'Mikhail Bulgakov': 'Michail Bulgakow',
      'Aleksandr Solzhenitsyn': 'Alexander Solschenizyn', 'Arkady Strugatsky': 'Arkadi Strugatzki', 'Sergei Lukyanenko': 'Sergej Lukianenko',
      'Dmitry Glukhovsky': 'Dmitry Glukhovsky', 'Marcus Aurelius': 'Mark Aurel', 'Sun Tzu': 'Sunzi'
    };
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
    // Kurztitel für den Rücken: ohne Klammer, ohne Untertitel nach Doppelpunkt, Strich oder Punkt („Holzfällen. Eine Erregung“)
    function titelKurz(t) {
      const s = sauber(t).replace(/\s*\(.*\)\s*$/, '').split(/:\s|\s[-–]\s|(?<=\p{Ll}{3})\.\s(?=\p{Lu})/u)[0];
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
        // Die Laufrichtung des Rückens folgt der gelesenen Ausgabe, angezeigt wird der Originaltitel
        b.ausgabeDeutsch = DE_VERLAG.test(b.v || '') || DE_TITEL.test(b.t || '');
        const original = ORIGINAL[b.a + '|' + b.t];
        if (original) { b.t = original; b.u = ''; }
        if (NAMEN_DE[b.a]) b.a = NAMEN_DE[b.a];
        b.nn = satz(nachname(b.a)); b.autor = initialen((k && k.autor) || AUTOR[b.a] || b.a);
        b.t = satz(b.t); b.u = satz(b.u); b.v = initialen(b.v); b.a = initialen(b.a);
        b.key = b.t + '|' + b.a;
      });
      const imRegal = new Set(cache.filter(b => b.r !== 'leseliste').map(titelSchluessel));
      cache = cache.filter(b => b.r !== 'leseliste' || !imRegal.has(titelSchluessel(b)));
      return cache;
    }
    // Deutsche Rücken laufen von unten nach oben
    const deutsch = b => b.ausgabeDeutsch != null ? b.ausgabeDeutsch : DE_VERLAG.test(b.v || '') || DE_TITEL.test(b.t || '');
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
  // Wohnorte aus INHALT.leben und die längeren Aufenthalte aus INHALT.aufenthalte (als Nebenorte); Land, Zeitraum und Satz
  // aus daten/stationen.js, wo es dort steht
  function stationen() {
    const ST = window.STATIONEN || {}, I = inhalt();
    const roh = (I.leben || []).concat((I.aufenthalte || []).map(s => Object.assign({ neben: true }, s)));
    return roh.map(s => {
      const x = ST[s.name] || {};
      return {
        name: s.name, lat: s.lat, lon: s.lon, neben: !!s.neben, land: x.land != null ? x.land : (s.land || ''), jahr: s.jahr,
        zeit: x.zeit || String(s.jahr || '').replace(/^bis /, ''), satz: x.satz || ''
      };
    });
  }
  // Die Szenen von Satoshi mit Ort und Koordinaten; die Texte aus daten/stationen.js (SZENEN), sonst aus daten/inhalt.js
  function szenen() {
    const SAT = inhalt().satoshi || {}, eigen = window.SZENEN || [];
    return (SAT.szenen || []).map((s, i) => {
      const o = (SAT.orte || []).find(x => x.name === s.ort) || {};
      return Object.assign({}, o, { jahr: s.jahr, text: (eigen[i] && eigen[i].text) || s.text });
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

  // ---------- Kartentafel ----------
  /* kartentafel(figur, o): baut in <figure class="kartentafel"> mit <div class="rahmen"> (darin <p class="ohne-karte">) die Tafel:
     Leinwand, Kartenwahl (Zwickel oben links), Zeichenerklärung (unten links, nur wo es zwei Zeichen gibt), Bedienhinweis
     (unten rechts) und die Legende unter dem Rahmen mit früher und später. Kein Kopf: den Namen des Orts trägt die Karte.
       o.karten     Liste aus 'wohnorte', 'reisen', 'satoshi', 'ursprung' (Vorgabe ['wohnorte']); mehr als eine: Kartenwahl
       o.start      die Karte beim Laden (Vorgabe die erste)
       o.legende    false: keine Legende und kein früher und später
       o.satz       false: auf der Karte „Reisen“ kein Satz in der Legende (Seite Länder)
       o.ring       'aequator': im Überblick steht „Äquator“ im Ring (Seite Länder), sonst keine Ringbeschriftung
       o.beiSchritt (karte, i, schritt) => {}   nach jedem Schritt
     Rückgabe: { waehlen(karte), schritt(i, { fliegen }), land(iso), kern, karte(), jetzt() } oder null ohne Kern */
  const KONTINENTE = { Europa: [[13, 50], 3.3], Asien: [[94, 26], 1.75], Afrika: [[16, 4], 1.9], Amerika: [[-80, 12], 1.25] };
  const europa = s => s.lat > 35 && s.lon > -12 && s.lon < 32;
  const zoomFuer = s => europa(s) ? 3.6 : 2.5;
  // Legende einer Station: Land, Zeitraum und Tätigkeit, wo es sie gibt („Taiwan, 2018–2022, Lektor und freier Autor.“)
  const stationSatz = s => punkt(gross([s.land, s.zeit, s.satz].filter(Boolean).join(', ')));

  function karten() {
    const I = inhalt();
    const wohnorte = stationen();
    const berlin = wohnorte.map(s => s.neben).lastIndexOf(false);
    const sz = szenen(), satOrte = [];
    sz.forEach(s => { if (!satOrte.some(o => o.name === s.name)) satOrte.push({ name: s.name, kurz: s.kurz, lat: s.lat, lon: s.lon }); });
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
        name: 'Wohnorte', schritte: wohnorte, orte: wohnorte, ende: berlin,
        zeichen: [['punkt', 'Wohnort'], ['kreis', 'längerer Aufenthalt']],
        legende: s => versalien(esc(stationSatz(s))), blick: s => ({ mitte: [s.lon, s.lat], k: zoomFuer(s) }),
        ueberblick: () => ({ mitte: blickFuer(wohnorte, { lon: [10, 100], lat: [-10, 50] }) || [50, 20], k: 1 })
      },
      reisen: {
        name: 'Reisen', schritte: null, orte: [], laender: true, zeichen: [],
        legendeText: () => {
          const w = n => `<button type="button" class="wort" data-kontinent="${n}">${n}</button>`;
          const z = n => zahlwort((kont[n] || []).length);
          return `${gross(zahlwort((I.bereist || []).length))} Länder und Gebiete, ${z('Europa')} in ${w('Europa')}, ${z('Asien')} in ${w('Asien')}, ${z('Afrika')} in ${w('Afrika')} und ${z('Amerika')} in ${w('Amerika')}.`;
        },
        ueberblick: () => ({ mitte: [34, 28], k: 1 })
      },
      satoshi: {
        name: 'Satoshi', schritte: sz, orte: satOrte, zeichen: [],
        legende: s => versalien(esc(punkt(s.jahr + '. ' + s.text))), blick: s => ({ mitte: [s.lon, s.lat], k: zoomFuer(s) })
      },
      ursprung: {
        name: 'Ursprung', schritte: ursprung, orte: ursprung.map(o => ({ name: o.name, lat: o.lat, lon: o.lon })), grenzen: false, fluesse: true, fest: true,
        zeichen: [],
        legende: s => { const b = baende[s.band] || {}; return `Band ${esc(s.band)}, <i>${esc(b.titel || '')}</i>. ${esc(bandSatz(s.band))}`; },
        blick: () => ({ mitte: [40, 33.6], k: 7 })
      }
    };
  }

  function kartentafel(fig, o) {
    if (!fig) return null;
    o = Object.assign({ karten: ['wohnorte'], start: null, legende: true, satz: true, ring: null, beiSchritt: null }, o || {});
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
    const zwOL = neu('div', 'zwickel zw-ol'), zwUL = neu('div', 'zwickel zw-ul'), zwUR = neu('div', 'zwickel zw-ur');
    const ausparung = neu('div', 'aussparung');
    ausparung.setAttribute('aria-hidden', 'true');
    zwOL.appendChild(ausparung);
    let wahl = null;
    if (liste.length > 1) {
      wahl = neu('ul', 'wahl kartenwahl', liste.map(k => `<li><button type="button" data-karte="${k}" aria-pressed="false">${K[k].name}</button></li>`).join(''));
      wahl.setAttribute('aria-label', 'Karte');
      zwOL.appendChild(wahl);
    }
    const erkl = neu('ul', 'zeichenerklaerung');
    erkl.setAttribute('aria-label', 'Zeichenerklärung');
    zwUL.appendChild(erkl);
    const hinweis = neu('p', 'hinweis');
    hinweis.hidden = true;
    zwUR.appendChild(hinweis);
    let legende = null, satzEl = null, frueher = null, spaeter = null;
    if (o.legende) {
      legende = neu('figcaption', 'tafellegende');
      satzEl = neu('p', 'legendensatz');
      satzEl.setAttribute('aria-live', 'polite');
      const steuer = neu('p', 'steuer', '<button type="button" class="steuerwort" data-schritt="-1">früher</button> <button type="button" class="steuerwort" data-schritt="1">später</button>');
      legende.appendChild(satzEl);
      legende.appendChild(steuer);
      [frueher, spaeter] = $$('button', steuer);
    }
    // Reihenfolge für die Tastatur: Kartenwahl, Karte, Legende mit früher und später; das Raster ordnet sie an
    fig.insertBefore(zwOL, rahmen);
    [zwUL, zwUR].forEach(z => fig.appendChild(z));
    if (legende) fig.appendChild(legende);
    fig.classList.add('ist-gebaut');

    // ---------- Zustand ----------
    let karte = null, i = 0, gewaehlt = null;
    const D = () => K[karte];

    // ---------- Kern ----------
    let g = null;
    const schrift = T.schrift || 'serif';
    const blauGrad = () => telefon() ? 12 : 13;
    let aussparCache = [];
    if (window.d3 && window.topojson && window.Globus && window.WELT_110M) {
      try {
        g = window.Globus.erstellen({
          canvas, hinweis, dauer: 1000, ring: o.ring, landName,
          bereist: inhalt().bereist || [], winzig: inhalt().winzig || {}, ansichten: inhalt().ansichten || {},
          farben: { papier: T.papier, tinte: T.tinte, blau: T.blau, blauRaster: T.blauRaster },
          schrift: { ort: `500 15px ${schrift}`, ortAktiv: `600 15px ${schrift}`, wasser: `italic 500 ${blauGrad()}px ${schrift}`, ring: `500 ${blauGrad()}px ${schrift}` },
          aussparungen: () => aussparCache,
          beimEingriff: () => { $$('[data-kontinent]', fig).forEach(b => b.classList.remove('ist-aktiv')); }
        });
      } catch (fehler) { g = null; console.warn('Karte:', fehler); }
    }
    if (!g) { fig.classList.add('ohne-kugel'); canvas.remove(); return null; }

    // ---------- Zwickel: der Text oben links weicht der Kugel aus ----------
    const zwickellage = () => getComputedStyle(zwOL).getPropertyValue('--lage').trim() === 'zwickel';
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
      zwOL.style.width = zw ? Math.round(S * .46) + 'px' : '';
      if (!zw) { ausparung.style.shapeOutside = ''; ausparung.style.height = ''; aussparCache = []; [zwUL, zwUR].forEach(z => { z.style.maxWidth = ''; }); return; }
      ausparung.style.height = Math.round(S * .46) + 'px';
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
      aussparCache = [zwOL, zwUL, zwUR].flatMap(z => textRechtecke(z, c));
    }

    function tafelSetzen() {
      const d = D();
      if (satzEl) {
        if (d.schritte) satzEl.innerHTML = d.legende(d.schritte[i]) || '';
        else satzEl.innerHTML = o.satz && d.legendeText ? d.legendeText() : '';
      }
      if (legende) legende.classList.toggle('ohne-schritte', !d.schritte);
      if (frueher) {
        frueher.classList.toggle('ist-aus', !d.schritte || i <= 0);
        spaeter.classList.toggle('ist-aus', !d.schritte || i >= d.schritte.length - 1);
        [frueher, spaeter].forEach(b => { const aus = b.classList.contains('ist-aus'); b.tabIndex = aus ? -1 : 0; b.setAttribute('aria-hidden', String(aus)); });
      }
      $$('[data-kontinent]', fig).forEach(b => b.classList.remove('ist-aktiv'));
      zwickelFormen();
      neuZeichnen();
      if (typeof o.beiSchritt === 'function') o.beiSchritt(karte, i, d.schritte ? d.schritte[i] : null);
    }
    // Nach einer Änderung an den Zwickeln einmal neu zeichnen (die Ringbeschriftung weicht dem Text aus), höchstens einmal je Bild
    let bildAngefordert = 0;
    function neuZeichnen() { if (!bildAngefordert) bildAngefordert = requestAnimationFrame(() => { bildAngefordert = 0; g.zeichnen(); }); }
    // Die Legende hält die Höhe des längsten Satzes ihrer Karte, höchstens zwei Zeilen: darunter springt fast nichts
    function hoeheHalten() {
      if (!satzEl) return;
      const d = D();
      satzEl.style.minHeight = '';
      const p = satzEl.cloneNode(false);
      p.removeAttribute('aria-live');
      p.setAttribute('aria-hidden', 'true');
      p.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;left:0;top:0;width:${satzEl.getBoundingClientRect().width}px;min-height:0;max-width:none;margin:0`;
      satzEl.parentNode.appendChild(p);
      let h = 0;
      (d.schritte ? d.schritte.map(s => d.legende(s) || '') : [o.satz && d.legendeText ? d.legendeText() : '']).forEach(x => { p.innerHTML = x; h = Math.max(h, p.getBoundingClientRect().height); });
      p.remove();
      const zeile = parseFloat(getComputedStyle(satzEl).lineHeight) || 0;
      satzEl.style.minHeight = Math.ceil(zeile ? Math.min(h, zeile * 2) : h) + 'px';
    }

    // ---------- Karten und Schritte ----------
    function ebeneSetzen(key, blick, fliegen) {
      const d = K[key];
      return g.ebene({ orte: d.orte, laender: !!d.laender, grenzen: d.grenzen !== false, fluesse: !!d.fluesse, blick }, { fliegen });
    }
    // Wohnorte in Ruhe: der ganze Weg im Überblick, Berlin hervorgehoben; Satoshi und Ursprung: der erste Schauplatz
    function waehlen(key, e) {
      e = e || {};
      if (!K[key]) return;
      karte = key; gewaehlt = null;
      const d = D();
      if (wahl) $$('[data-karte]', wahl).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.karte === key)));
      erkl.innerHTML = d.zeichen.map(([z, w]) => `<li>${zeichen(z)}${esc(w)}</li>`).join('');
      zwUL.hidden = !d.zeichen.length;
      const fliegen = e.fliegen !== false;
      if (key === 'wohnorte') {
        i = d.ende;
        ebeneSetzen(key, d.ueberblick(), fliegen);
        g.routeZeigen(d.schritte);
        g.aktiv(d.schritte[i].name);
      } else if (d.schritte) {
        i = 0;
        ebeneSetzen(key, d.blick(d.schritte[i]), fliegen);
        if (d.fest) g.routeZeigen(d.schritte);
        g.aktiv(d.schritte[i].name);
      } else {
        ebeneSetzen(key, d.ueberblick(), fliegen);
      }
      hoeheHalten();
      tafelSetzen();
    }
    function schritt(n, e) {
      e = e || {};
      const d = D();
      if (!d.schritte) return;
      i = Math.max(0, Math.min(d.schritte.length - 1, n));
      const s = d.schritte[i];
      if (d.fest) g.aktiv(s.name);
      else if (e.fliegen === false) { const b = d.blick(s); g.springen(b.mitte, b.k); g.aktiv(s.name); }
      else g.ortAnfliegen({ name: s.name, lat: s.lat, lon: s.lon }, d.blick(s).k);
      tafelSetzen();
    }

    // ---------- Reisen: ein Klick wählt ein bereistes Land, der Kern schreibt seinen Namen auf die Karte ----------
    canvas.addEventListener('click', e => {
      if (karte !== 'reisen') return;
      const r = canvas.getBoundingClientRect();
      gewaehlt = g.landBei(e.clientX - r.left, e.clientY - r.top);
      g.auswahl(gewaehlt ? gewaehlt.iso : null);
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
        g.fliegen(mitte, k);
        $$('[data-kontinent]', fig).forEach(x => x.classList.toggle('ist-aktiv', x === b));
      }
    });

    // ---------- Laden, Größe ----------
    const start = o.start && liste.includes(o.start) ? o.start : liste[0];
    waehlen(start, { fliegen: false });
    schriften(2500).then(() => {
      hoeheHalten();
      tafelSetzen();
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
      waehlen, schritt, kern: g, karte: () => karte, jetzt: () => i,
      land: iso => { if (karte !== 'reisen') return null; gewaehlt = g.land(iso); g.auswahl(iso); return g.landAnfliegen(iso); },
      gewaehlt: () => gewaehlt
    };
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
    zahlwort, gross, tausender, jahrText, chr, versalien, punkt, schriften, gleichBreit, zeichen,
    texte, buch, leselinie, stationen, szenen, landName, blickFuer, kartentafel, navigation
  };
})();
