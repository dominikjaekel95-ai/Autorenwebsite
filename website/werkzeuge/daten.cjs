#!/usr/bin/env node
/* Erzeugt die bereinigten Daten der Website (website/daten/) aus den Entwürfen (entwuerfe/daten, entwuerfe/globus/inhalt.js).

   Aufruf (aus einem beliebigen Ordner):
     node website/werkzeuge/daten.cjs                 alles
     node website/werkzeuge/daten.cjs buecher         nur daten/buecher.js (etwa nach einem neuen Goodreads-Export)
     node website/werkzeuge/daten.cjs inhalt kopien   nur daten/inhalt.js und die unveränderten Kopien
     --quelle <ordner>   anderer Ordner der Entwürfe (Vorgabe: ../../entwuerfe von hier aus)
     --erzwingen         auch Dateien überschreiben, die seit dem letzten Lauf von Hand geändert wurden

   Was bereinigt wird:
     buecher.js  nur die Regale gelesen, kindheit, gerade und abgebrochen (ohne die Goodreads-Leseliste und „lieber nicht“;
                 was noch wartet, kommt aus leseliste.js) und nur die Felder, die die Seiten lesen: t u a r s j p w b v
                 (ohne den Lesemonat d). Beim Verlag fällt der Zusatz „An Imprint of …“ weg, wie ihn auch die Seite weglässt.
     inhalt.js   ohne Fort Meade, ohne die Beispieleinträge des Journals, ohne die Vita-Fakten (die Vita steht als Text in
                 vita.html; die Mentoren hat Dominik gestrichen), ohne die Texte, die als HTML in satoshi.html und ursprung.html
                 stehen, und ohne alles andere, was keine Seite liest (person, sondernamen, regale, satoshi.notiz,
                 trilogie.untertitel/stand/herkunft, Pitch, Frage und Text der Bände, die übrigen Figuren, von/bis der Stationen,
                 werke[].ebene).
     Kopien      leseliste.js, welt-110m.js, welt-50m.js, laender-de.js, uk-landesteile.js unverändert.

   Schutz vor Überschreiben: werkzeuge/daten-stand.json hält die Prüfsumme jeder erzeugten Datei. Ist eine Datei seither von Hand
   geändert worden, bleibt sie stehen (Meldung), außer mit --erzwingen. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');

const HIER = __dirname;
const ZIEL = path.resolve(HIER, '..', 'daten');
const STAND = path.join(HIER, 'daten-stand.json');
const args = process.argv.slice(2);
const erzwingen = args.includes('--erzwingen');
const qi = args.indexOf('--quelle');
const QUELLE = qi >= 0 ? path.resolve(args[qi + 1]) : path.resolve(HIER, '..', '..', 'entwuerfe');
const teile = args.filter((a, i) => !a.startsWith('--') && !(qi >= 0 && i === qi + 1));
const alle = !teile.length || teile.includes('alle');
const soll = t => alle || teile.includes(t);

const sha1 = s => crypto.createHash('sha1').update(s).digest('hex');
const stand = fs.existsSync(STAND) ? JSON.parse(fs.readFileSync(STAND, 'utf8')) : {};
let geschrieben = 0, uebersprungen = 0;

// Eine Datei der Entwürfe ausführen und die Variable lesen, die sie an window hängt
function laden(datei, name) {
  const fenster = {};
  vm.runInNewContext(fs.readFileSync(datei, 'utf8'), { window: fenster }, { filename: datei });
  if (!(name in fenster)) throw new Error(datei + ' setzt window.' + name + ' nicht');
  return fenster[name];
}

function schreiben(name, inhalt) {
  const datei = path.join(ZIEL, name);
  if (fs.existsSync(datei)) {
    const jetzt = fs.readFileSync(datei, 'utf8');
    if (jetzt === inhalt) { stand[name] = sha1(inhalt); console.log('unverändert  daten/' + name); return; }
    if (stand[name] && sha1(jetzt) !== stand[name] && !erzwingen) {
      console.log('VON HAND GEÄNDERT, bleibt stehen: daten/' + name + ' (mit --erzwingen überschreiben)');
      uebersprungen++;
      return;
    }
  }
  fs.mkdirSync(ZIEL, { recursive: true });
  fs.writeFileSync(datei, inhalt);
  stand[name] = sha1(inhalt);
  geschrieben++;
  console.log('geschrieben  daten/' + name + ' (' + Buffer.byteLength(inhalt) + ' Bytes)');
}

// ---------- buecher.js ----------
function buecher() {
  const REGALE = ['gelesen', 'kindheit', 'gerade', 'abgebrochen'];
  const FELDER = ['t', 'u', 'a', 'r', 's', 'j', 'p', 'w', 'b', 'v'];
  const roh = laden(path.join(QUELLE, 'daten', 'buecher.js'), 'BUECHER');
  const imprint = v => String(v || '').replace(/:\s*an imprint of .*$/i, '').replace(/,?\s+an imprint of .*$/i, '');
  const liste = roh.filter(b => b && REGALE.includes(b.r)).map(b => {
    const x = {};
    FELDER.forEach(f => { x[f] = f === 'v' ? imprint(b[f]) : b[f]; });
    return x;
  });
  const zaehlen = REGALE.map(r => r + ' ' + liste.filter(b => b.r === r).length).join(', ');
  const kopf = '/* Bücher von Dominik Jäkel aus seinem Goodreads-Export, bereinigt von werkzeuge/daten.cjs (nicht von Hand ändern).\n' +
    '   Nur die Regale gelesen, kindheit (Kindheit und Jugend), gerade (Nachttisch) und abgebrochen; was noch wartet, steht in leseliste.js.\n' +
    '   t Titel, u Untertitel, a Autor, r Regal, s Sterne (5 = eines der liebsten), j Jahr der Erstveröffentlichung, p Seiten,\n' +
    '   w wiedergelesen, b Bindung (p Paperback, h Hardcover, m Mass Market, e sonst), v Verlag. Ohne Notizen und Rezensionen. */\n';
  schreiben('buecher.js', kopf + 'window.BUECHER = [\n' + liste.map(b => JSON.stringify(b)).join(',\n') + '\n];\n');
  console.log('             ' + liste.length + ' Bücher (' + zaehlen + ')');
}

// ---------- inhalt.js ----------
const nur = (o, felder) => { const x = {}; felder.forEach(f => { if (o[f] !== undefined) x[f] = o[f]; }); return x; };
function inhaltBereinigen(I) {
  const s = I.satoshi || {};
  const nakamoto = (s.figuren || []).find(f => f.name === 'Satoshi Nakamoto');
  return {
    bereist: I.bereist,
    kontinente: I.kontinente,
    winzig: I.winzig,
    ansichten: I.ansichten,
    leben: I.leben.map(o => nur(o, ['name', 'land', 'jahr', 'neben', 'projekt', 'lat', 'lon'])),
    aufenthalte: I.aufenthalte,
    satoshi: {
      orte: s.orte.filter(o => o.name !== 'Fort Meade'),
      szenen: s.szenen,
      hook: s.hook,
      eckdaten: nur(s.eckdaten || {}, ['zeit', 'stand']),
      figuren: nakamoto ? [nur(nakamoto, ['name', 'rolle'])] : []
    },
    ursprung: I.ursprung,
    baende: I.baende,
    trilogie: {
      titel: I.trilogie.titel,
      baende: I.trilogie.baende.map(b => nur(b, ['band', 'titel', 'arbeitstitel', 'ort', 'zeit', 'thema']))
    },
    werke: I.werke.map(w => nur(w, ['id', 'titel', 'buchtitel', 'arbeitstitel', 'art', 'stand', 'text', 'band']))
  };
}
const KOMMENTARE = {
  bereist: 'Bereiste Länder und Gebiete (ISO-Codes; die Landesteile des Vereinigten Königreichs einzeln, Westjordanland als PS-WB)',
  kontinente: 'Dieselben Länder nach Kontinenten, für die Wörter im Text der Ebene „wohin ich gereist bin“',
  winzig: 'Kleinstaaten ohne Fläche im groben Maßstab: [Länge, Breite]',
  ansichten: 'Eigene Blickpunkte für große Länder: [Länge, Breite, Zoom]',
  leben: 'Lebensstationen in zeitlicher Reihenfolge (Chronik der Startseite, Koordinaten der Vita).\n  // neben: ein längerer Aufenthalt, während der Wohnort woanders war',
  aufenthalte: 'Weitere längere Aufenthalte, nur für die Koordinaten der Vita (auf dem Globus wäre es zu voll)',
  satoshi: 'Satoshi: Schauplätze, die Szenen der Reihe nach (ohne das Ende zu verraten), der erste Satz, Eckdaten und das Pseudonym\n  // für die Karteikarte. Klappentext, Bau, Figuren und Frage stehen als Text in satoshi.html',
  ursprung: 'Ursprungstrilogie: die Orte in zeitlicher Reihenfolge (für die Chronik)',
  baende: 'Ein Satz je Band für die Tafel: Landschaft und Zeit, dann worum es geht',
  trilogie: 'Die Bände im Einzelnen; Stand nach Dominiks Wunsch nur „in Arbeit“ (für die ganze Trilogie). Die Texte stehen in ursprung.html',
  werke: 'Eigene Werke für Regal, Zeitband und Karteikarten; titel ist der kurze Rückentitel, buchtitel der Titel des Buchs'
};
// Lesbar setzen: kurze Objekte und Listen aus einfachen Werten in eine Zeile, sonst eingerückt; Zeichenketten in einfachen Anführungszeichen
function wert(v, tiefe) {
  const ein = '  '.repeat(tiefe + 1), aus = '  '.repeat(tiefe);
  if (v === null) return 'null';
  if (typeof v === 'string') return "'" + v.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  const einfach = x => x === null || ['string', 'number', 'boolean'].includes(typeof x);
  if (Array.isArray(v)) {
    if (v.every(einfach)) return '[' + v.map(x => wert(x, 0)).join(', ') + ']';
    return '[\n' + v.map(x => ein + wert(x, tiefe + 1)).join(',\n') + '\n' + aus + ']';
  }
  const schluessel = k => /^[A-Za-z_$][\w$]*$/.test(k) ? k : "'" + k + "'";
  const paare = Object.keys(v).map(k => [k, v[k]]);
  const zeile = '{ ' + paare.map(([k, x]) => schluessel(k) + ': ' + wert(x, 0)).join(', ') + ' }';
  if (paare.every(([, x]) => einfach(x) || (Array.isArray(x) && x.every(einfach) && x.length <= 4)) && zeile.length <= 240) return zeile;
  return '{\n' + paare.map(([k, x]) => (tiefe === 0 && KOMMENTARE[k] ? '\n' + ein + '// ' + KOMMENTARE[k] + '\n' : '') + ein + schluessel(k) + ': ' + wert(x, tiefe + 1)).join(',\n') + '\n' + aus + '}';
}
function inhalt() {
  const I = laden(path.join(QUELLE, 'globus', 'inhalt.js'), 'INHALT');
  const sauber = inhaltBereinigen(I);
  const kopf = '/* Gemeinsame Inhalte der Website: Orte, Stationen, Länder, eigene Werke. Bereinigt erzeugt von werkzeuge/daten.cjs aus den\n' +
    '   Entwürfen (entwuerfe/globus/inhalt.js); nur, was die Seiten lesen. Keine privaten Kontaktdaten. */\n';
  const text = kopf + 'window.INHALT = ' + wert(sauber, 0).replace(/^\{\n\n/, '{\n') + ';\n';
  // Probe: die erzeugte Datei muss dasselbe Objekt ergeben
  const probe = {};
  vm.runInNewContext(text, { window: probe });
  if (JSON.stringify(probe.INHALT) !== JSON.stringify(sauber)) throw new Error('inhalt.js: erzeugte Datei ergibt nicht dasselbe Objekt');
  schreiben('inhalt.js', text);
}

// ---------- unveränderte Kopien ----------
function kopien() {
  ['leseliste.js', 'welt-110m.js', 'welt-50m.js', 'laender-de.js', 'uk-landesteile.js'].forEach(n => {
    schreiben(n, fs.readFileSync(path.join(QUELLE, 'daten', n), 'utf8'));
  });
}

console.log('Quelle ' + QUELLE + '\nZiel   ' + ZIEL);
if (soll('buecher')) buecher();
if (soll('inhalt')) inhalt();
if (soll('kopien')) kopien();
fs.writeFileSync(STAND, JSON.stringify(stand, null, 2) + '\n');
console.log(geschrieben + ' geschrieben' + (uebersprungen ? ', ' + uebersprungen + ' übersprungen' : ''));
