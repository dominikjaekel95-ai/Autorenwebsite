# Website Dominik Jäkel

Das Testsystem der Website, gebaut aus dem abgenommenen Entwurf F (`../entwuerfe/f-*.html`). Es wird zuerst als privater claude.ai-Link zum Durchklicken auf dem Telefon veröffentlicht und zieht später auf Dominiks eigene Domain um.

Kein Build-Schritt, keine Abhängigkeiten zum Installieren: jede Seite ist eine HTML-Datei, alle Verweise sind relativ und flach in diesem einen Ordner. Die Seiten funktionieren über `http://` und direkt aus dem Dateisystem (`file://`).

## Ansehen

- `index.html` im Browser öffnen, oder
- `python3 -m http.server --directory website 8000` und dann `http://localhost:8000/`.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: der erste Satz (einfliegend), Kurzvita, Globus mit Stationstafel, „Was ich schreibe“ mit Regalbild, „Was ich gelesen habe“ als Zeitband |
| `satoshi.html` | Der Roman *Satoshi*: Szenen der Reihe nach mit Globus, Klappentext, Eckdaten, Bau, Figuren, Frage, Machart |
| `ursprung.html` | Die Ursprungstrilogie: drei Bände, Globus von Göbekli Tepe bis Jerusalem |
| `erzaehlungen.html` | Erzählungen: die Zeile aus dem Werkverzeichnis der Startseite, darunter die Texte aus `daten/texte.js` (noch leer) |
| `untertext.html` | *Untertext*, das Journal: Einträge aus `daten/texte.js`, das Datum als Überschrift (noch leer) |
| `laender.html` | Länder: Verzeichnis der bereisten Länder nach Kontinenten, Globus mit Tafel; ein fertiger Länderguide erscheint auf der Tafel seines Lands (noch keiner) |
| `lesen.html` | Leseseite für einen einzelnen Text (Erzählung, Journaleintrag, Länderguide): `lesen.html#<slug>` |
| `bibliothek.html` | Das ganze Regal mit Karteikarten |
| `vita.html` | Vita mit Stationen und Foto |
| `impressum.html`, `datenschutz.html` | Impressum und Datenschutz, als Entwurf markiert; vor dem Umzug auf die eigene Domain prüfen (siehe unten) |
| `stil.css` | Gemeinsames Stylesheet aller Seiten |
| `seite.js` | Gemeinsame Helfer aller Seiten (`window.FSeite`), darunter `FSeite.texte` für die Texte |
| `globus/kern.js` | Der Globus (Canvas, d3) |
| `daten/inhalt.js` | Orte, Stationen, Länder, eigene Werke (`window.INHALT`), erzeugt |
| `daten/buecher.js` | Bücher aus dem Goodreads-Export (`window.BUECHER`), erzeugt |
| `daten/leseliste.js` | Was noch wartet, die eigene Leseliste (`window.LESELISTE`), erzeugt |
| `daten/texte.js` | Erzählungen, Journaleinträge und Länderguides (`window.TEXTE`), von Hand gepflegt, siehe „Texte hinzufügen“ |
| `daten/welt-110m.js`, `daten/welt-50m.js`, `daten/laender-de.js`, `daten/uk-landesteile.js` | Küsten, Grenzen und deutsche Ländernamen für den Globus (Natural Earth, gemeinfrei) |
| `bilder/` | Fotos (`dominik-jaekel.jpg` nutzt derzeit keine Seite) |
| `werkzeuge/daten.cjs` | Erzeugt die bereinigten Daten aus den Entwürfen neu |

## Wie die Seiten zusammenhängen

Jede Seite lädt `stil.css` und am Ende `seite.js`; Seiten mit Globus oder Büchern laden davor ihre Daten. Die Reihenfolge der Skripte ist fest:

```html
<script src="https://cdn.jsdelivr.net/npm/d3@7.9.0/dist/d3.min.js"></script>              <!-- nur mit Globus -->
<script src="https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js"></script>
<script src="daten/welt-110m.js"></script>
<script src="daten/laender-de.js"></script>
<script src="daten/uk-landesteile.js"></script>
<script src="globus/kern.js"></script>
<script src="daten/inhalt.js"></script>
<script src="daten/buecher.js"></script>                                              <!-- nur mit Büchern -->
<script src="daten/leseliste.js"></script>
<script src="daten/texte.js"></script>                                               <!-- nur Erzählungen, Untertext, Länder, Lesen -->
<script src="seite.js"></script>
```

Danach folgt ein eigener `<script>`-Block der Seite; Besonderes im Aussehen steht in einem eigenen `<style>`-Block im Kopf der Seite. Fehlt etwas (etwa ohne Netz), geben die Helfer `null` oder leere Listen zurück, und die Seite bleibt ruhig: ohne d3 steht an der Stelle des Globus ein Satz.

- **`stil.css`** legt die Farben (Papier `#FFFEFC`, Graphit, Grautöne, Siena nur für eigene Werke), die Zeile `--z` als Maßeinheit, die Schrift (Vollkorn und Vollkorn SC; IM Fell French Canon nur für den ersten Satz) und die gemeinsamen Teile fest: Kopf mit Briefkopf und Navigation, Fuß, Abschnitte und Spalten, Globus, Stationstafel, Karteikarte, schlichte Unterseite (`.unterseite`).
- **`seite.js`** stellt `window.FSeite` bereit. Wichtig für neue Seiten: `FSeite.SEITEN` (alle Dateinamen; Karteikarten eigener Werke verweisen darüber auf ihre Seite), die Navigation (klappt auf dem Telefon hinter „Inhalt“ zusammen, läuft beim Laden von selbst), `karteikarte`, `buch`, `werkKarte`, `globus`, `tafel`, `leselinie` und `fortschritt` fürs Scrollen. Die Übersicht steht oben in der Datei.
- **Kopf und Fuß** stehen in jeder Seite als HTML und sind überall gleich; nur `aria-current="page"` sitzt auf der jeweiligen Seite (auf der Startseite am Briefkopf, auf Impressum und Datenschutz am Verweis im Fuß). Die Leseseite setzt `aria-current="true"` auf die Liste, zu der der Text gehört. Wer Navigation oder Fuß ändert, ändert alle Seiten. Im Fuß stehen außerdem die Newsletter-Zeile (`form.post`; `FSeite.fuss` fängt das Abschicken ab, im Testsystem geht nichts hinaus, ohne Skript ist sie verborgen) und unter Impressum und Datenschutz der Platz für Profile (`.profile`), gefüllt aus der Liste `PROFILE` in `seite.js`; solange sie leer ist, bleibt er verborgen. Version B hat dasselbe Markup, dieselbe Liste und denselben Wortlaut.
- **Externe Quellen:** nur die Schriften von Google Fonts und, auf Seiten mit Globus, d3 7.9.0 und topojson-client 3.1.0 von jsDelivr.

### Eine neue Seite anlegen

1. Eine schlichte Unterseite (etwa `impressum.html`, sie hat keinen eigenen `<script>`-Block) kopieren und den Inhalt von `<main>` ersetzen: Kopf, Navigation und Fuß sind dann schon richtig. Besonderes im Aussehen kommt in einen `<style>`-Block im Kopf.
2. `aria-current="page"` vom Impressum-Verweis im Fuß nehmen und auf den Verweis der neuen Seite setzen, Titel und Beschreibung im `<head>` anpassen.
3. Den Dateinamen in `FSeite.SEITEN` in `seite.js` eintragen und, wenn die Seite in die Navigation gehört, den Verweis in allen Seiten ergänzen.

## Texte hinzufügen

Erzählungen, Einträge im Journal *Untertext* und Länderguides stehen in `daten/texte.js`, ein Eintrag je Text. Mehr ist nicht zu tun: `erzaehlungen.html` oder `untertext.html` listet den Text, auf `laender.html` führt die Tafel seines Lands zu einem Länderguide, `lesen.html#<slug>` zeigt jeden. Alle vier Seiten lesen die Einträge über `FSeite.texte` in `seite.js` und lassen dieselben gelten. Die Liste ist leer, bis Texte geliefert werden; sie wird nicht mit Beispielen gefüllt.

1. In `daten/texte.js` das auskommentierte Beispiel kopieren, die `//` am Zeilenanfang entfernen und die Felder füllen. Jeder Eintrag endet mit einem Komma.
2. Erzählungen oder *Untertext* im Browser neu laden, den Titel anklicken, lesen.
3. Erscheint ein Text nicht, nennt die Konsole des Browsers den übersprungenen Eintrag (`slug`, `art`, `titel` oder beim Länderguide `land` fehlt, ist ungültig oder doppelt). Ein Tippfehler in der Datei selbst (fehlendes Komma, offenes Anführungszeichen) lässt beide Listen leer; die Konsole nennt dann die Zeile.

```js
{
  slug: 'titel-der-erzaehlung',                    // Adresse: lesen.html#titel-der-erzaehlung
  art: 'erzaehlung',                               // oder 'untertext' oder 'laenderguide' (dann auch land: 'TW')
  titel: 'Titel der Erzählung',
  untertitel: 'Untertitel, wenn es einen gibt',    // wahlweise
  datum: '2026-03-14',                             // oder '2026-03' oder '2026'
  ort: { name: 'Berlin', lat: 52.52, lon: 13.405 },   // wahlweise; auch nur 'Berlin', ohne Koordinaten
  absaetze: [
    'Erster Absatz.',
    'Zweiter Absatz mit einem <i>kursiven</i> Wort und "wörtlicher Rede".',
    '***',                                         // Szenenwechsel
    'Weiter nach dem Szenenwechsel.'
  ],
  notiz: 'Gelesen auf der Werkstattbühne des Autorenforums Berlin.'   // wahlweise, steht am Ende des Textes
},
```

- **`slug`:** Kleinbuchstaben, Ziffern und Bindestriche, ohne Umlaute (ä → ae), einmalig; nicht `inhalt`, `kontakt`, `kontakt-titel`, `nav-liste` oder `lesen`, so heißen schon Stellen der Seiten. Ist der Verweis einmal geteilt, den Slug nicht mehr ändern.
- **Länderguide:** `art: 'laenderguide'` und `land` mit dem ISO-Code des Lands wie in `daten/inhalt.js` (`bereist`), etwa `'TW'` oder `'GB-SCT'`. Die Tafel des Lands auf `laender.html` zeigt dann „Zum Länderguide“; auf der Leseseite führt „Alle Länder“ zurück, und in der Navigation steht Länder schwarz.
- **`absaetze`:** eine Liste, ein Eintrag je Absatz. Für einen ganzen Text zum Einfügen geht auch ein einziger Text in Backticks; Absätze trennt dann eine Leerzeile, einfache Zeilenumbrüche werden zu Leerzeichen (der Text darf dann keinen Backtick enthalten):
  ```js
  absaetze: `Erster Absatz,
  gern über mehrere Zeilen.

  Zweiter Absatz.`,
  ```
- **Satz:** In Titel, Untertitel, Ort, Notiz und Absätzen werden gerade doppelte Anführungszeichen zu „…“. Ein gerades einfaches `'` am Wortanfang (nach einem Leerzeichen, am Absatzanfang, nach „ oder einer Klammer) wird zu ‚, wenn im selben Absatz ein schließendes folgt, das schließende zu ‘; jedes andere `'` ist ein Apostroph ’ (geht’s, Grass’ Roman, ’s war, ’68). `...` wird zu … und ` - ` zu einem Gedankenstrich mit geschütztem Leerzeichen davor. Schon typografische Zeichen bleiben, wie sie sind; wer bei einem Zweifelsfall sicher gehen will, tippt ‚…‘ oder ’ direkt. Kursiv mit `<i>…</i>`; alles andere wird als Text gesetzt, nicht als HTML.
- **`html`:** statt `absaetze` der ganze Text als HTML (`'<p>…</p><p>…</p>'`), für den seltenen Fall, dass mehr Auszeichnung nötig ist. Wird unverändert übernommen.
- **Reihenfolge:** Die Listen stehen nach `datum`, das neueste zuerst. Auf der Leseseite führen „Früher“ und „Später“ zum Nachbarn derselben Art, am Ende steht der Weg zurück zur Liste (Erzählungen, *Untertext* oder Länder); in der Navigation steht die Liste, zu der der Text gehört, schwarz.
- **Aussehen:** Erzählungen stehen wie im Werkverzeichnis der Startseite (Titel kursiv, Untertitel, Datum), der *Untertext* wie ein Journal (das Datum als Überschrift, darunter der Titel). Die Leseseite setzt eine Spalte von rund 62 Zeichen im Zeilenmaß der übrigen Seiten, mit einem Geviert Einzug statt Leerzeile zwischen den Absätzen; der Titel steht in Siena wie auf den Seiten der Romane.
- **Grenze:** Die Texte werden im Browser aus `daten/texte.js` gesetzt. Ohne JavaScript und für Suchmaschinen stehen Listen und Leseseite leer (die Leseseite zeigt dann den Hinweis auf Erzählungen und *Untertext*). Für die eigene Domain kann ein kleines Werkzeug später je Text eine feste Seite erzeugen.

## Die Daten neu erzeugen

`daten/inhalt.js` und `daten/buecher.js` sind bereinigte Fassungen der Daten aus den Entwürfen; die übrigen Dateien in `daten/` sind unveränderte Kopien. Erzeugt werden sie mit:

```sh
node website/werkzeuge/daten.cjs                 # alles
node website/werkzeuge/daten.cjs buecher         # nur die Bücher, etwa nach einem neuen Goodreads-Export
node website/werkzeuge/daten.cjs inhalt kopien   # nur inhalt.js und die Kopien
```

- Quelle ist `../entwuerfe/daten/` und `../entwuerfe/globus/inhalt.js`; mit `--quelle <ordner>` ein anderer Ordner mit demselben Aufbau.
- **Bücher:** nur die Regale gelesen, Kindheit und Jugend, Nachttisch und nicht zu Ende gelesen; ohne die Goodreads-Leseliste (was noch wartet, steht in `daten/leseliste.js`), ohne den Lesemonat und ohne den Verlagszusatz „An Imprint of …“. Von der Goodreads-Wertung bleibt nur 5 (eines der liebsten) oder 0; die übrigen Sterne stehen nicht im Quelltext.
- **Inhalt:** nur, was die Seiten lesen. Texte, die als HTML in den Seiten stehen (Klappentext, Vita, Bände der Trilogie), stehen nicht noch einmal in den Daten; die Seiten selbst sind dafür die Quelle.
- **Schutz:** `werkzeuge/daten-stand.json` hält die Prüfsumme jeder erzeugten Datei. Wer eine Datei in `daten/` von Hand geändert hat, verliert die Änderung nicht: das Werkzeug lässt sie stehen und meldet es; erst `--erzwingen` überschreibt.
- Erzählungen, Journal und Länderguides stehen in `daten/texte.js`; die Datei ist von Hand gepflegt, das Werkzeug fasst sie nicht an.

## Veröffentlichen

Zur Website gehören nur die elf HTML-Seiten, `stil.css`, `seite.js`, `globus/kern.js`, die acht Dateien in `daten/` (mit `daten/texte.js`) und `bilder/dominik-jaekel-boot.jpg`. Dieses README, `werkzeuge/` und das ungenutzte `bilder/dominik-jaekel.jpg` bleiben lokal.

Für den privaten claude.ai-Link baut `python3 website/werkzeuge/artefakt.py <zielordner>` genau diese Dateien in einen eigenen Ordner. Alle bleiben Byte für Byte gleich bis auf `index.html`: claude.ai bettet die Hauptseite in ein eigenes Gerüst, darum verliert sie Doctype, `<html>`, `<head>`, `<meta charset>` und `<body>`. Die Sprache (`lang="de"`, für die Silbentrennung) und die Klasse `mit-globus` setzt dort je ein kleines Skript. Die anderen Seiten bleiben vollständige Dokumente.

Vor dem Umzug auf die eigene Domain: die Schriften und d3/topojson-client selbst hosten (dann entfallen die Abschnitte zu Google Fonts und jsDelivr in `datenschutz.html`), den Hoster und seine Speicherdauer für Logfiles nennen, den Absatz zu claude.ai streichen, im Impressum einen zweiten schnellen Kontaktweg und gegebenenfalls eine USt-IdNr. ergänzen, den Entwurfsvermerk auf beiden Seiten entfernen und den Stand aktualisieren.
