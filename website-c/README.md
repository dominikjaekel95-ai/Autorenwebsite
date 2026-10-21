# Website Dominik Jäkel, Version C

Version C ist die dritte Fassung der Website. Sie verbindet die Anmutung von Version A (`../website/`) mit dem Zoomen von Version B (`../website-b/`) und lässt die vielen kleinen Markierungen weg: eine Tinte für allen Text, Kursiv nur für Werktitel, Nebentext eine Stufe kleiner, ein Raster für alle Abstände. A und B bleiben zum Vergleich unverändert.

Verbindlich für alles, was hier gebaut wird, ist `../docs/gestaltung-website-c.md`. Die Textänderungen gegenüber A stehen mit Vorher und Nachher in `../docs/text-aenderungen-c.md`. Jede Abweichung von den Regeln steht mit Grund in `werkzeuge/aenderungsprotokoll.md`.

## Ansehen

```
python3 -m http.server --directory website-c 8000
```

Dann `http://localhost:8000/` öffnen. Die Seiten laden nichts von fremden Servern: Schriften (`schrift/`) und Bibliotheken (`lib/`) liegen im Ordner.

## Bauen

```
python3 website-c/werkzeuge/artefakt.py <zielordner>
```

Der Bau kopiert `website-c/` ohne `werkzeuge/`, ohne diese Datei und ohne Bilder, auf die nichts verweist. Er entfernt alle Kommentare aus HTML, CSS und den eigenen Skripten (nicht aus `lib/`) und nimmt der Hauptseite ihr Gerüst, weil claude.ai sie selbst in eines bettet. Die Klassen ihres `<body>` setzt dann ein kleines Skript. Liest man den Bau ohne das Gerüst von claude.ai, landen sie auf `<html>`. Stile fragen darum nur nach Vorfahren (`.mit-globus .kopf`), nie nach `body.mit-globus`.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: erster Satz, Kurzvita, Globus mit Tafel, „Was ich schreibe“, „Was ich gelesen habe“ |
| `satoshi.html`, `ursprung.html` | die Romane, je mit Globus |
| `erzaehlungen.html`, `untertext.html`, `lesen.html` | Texte aus `daten/texte.js` (noch leer) |
| `laender.html` | Länderregister und Globus |
| `bibliothek.html`, `vita.html`, `impressum.html`, `datenschutz.html` | die übrigen Seiten |
| `stil.css` | Token (Farben, Grade, Abstände), Kopf, Fuß, Globus, Tafel, Steuerzeile, Ortsleiste, Buchzeile |
| `seite.js` | `window.FSeite`: Globus, Tafel, Ablauf am Globus, Buchzeile, Bücher mit ihren Rückenfarben (`FAMILIEN`), Texte, Navigation, Fuß. Die Übersicht steht oben in der Datei |
| `globus/kern.js` | der Globus auf der Leinwand (d3) |
| `daten/` | Inhalte, Bücher, Karten. `inhalt.js` und `buecher.js` sind in C von Hand geändert und werden nicht neu erzeugt |
| `schrift/`, `lib/` | Vollkorn und IM Fell French Canon mit Lizenzen; d3 und topojson-client mit Lizenzen |
| `werkzeuge/` | Bau (`artefakt.py`), Erzeugen der Daten (`daten.cjs`, für C nicht mehr verwenden), Änderungsprotokoll |

Jede Seite lädt `stil.css` und am Ende `seite.js`, Seiten mit Globus davor `lib/d3.min.js`, `lib/topojson-client.min.js`, die Karten und `globus/kern.js`. Kopf und Fuß stehen in jeder Seite als HTML und sind überall gleich. Wer sie ändert, ändert alle elf Seiten.
