# Website Dominik Jäkel, Version C

Version C ist die dritte Fassung der Website. Sie verbindet die Anmutung von Version A (`../website/`) mit dem Zoomen von Version B (`../website-b/`) und lässt die vielen kleinen Markierungen weg: eine Tinte für allen Text, Kursiv nur für Werktitel, Nebentext eine Stufe kleiner, ein Raster für alle Abstände. A und B bleiben zum Vergleich unverändert.

Verbindlich für alles, was hier gebaut wird, ist `../docs/gestaltung-website-c.md`. Die Textänderungen gegenüber A stehen mit Vorher und Nachher in `../docs/text-aenderungen-c.md`. Jede Abweichung von den Regeln steht mit Grund in `werkzeuge/aenderungsprotokoll.md`.

## Ansehen

```
python3 -m http.server --directory website-c 8000
```

Dann `http://localhost:8000/` öffnen. Die Seiten laden nichts von fremden Servern: Schriften (`schrift/`) und Bibliotheken (`lib/`) liegen im Ordner.

## Bauen für den Testlink auf claude.ai

```
python3 website-c/werkzeuge/artefakt.py <zielordner>                 die Ausgabe, die AUSGABE nennt (jetzt der Platzhalter)
python3 website-c/werkzeuge/artefakt.py --website <zielordner>       die volle Website
python3 website-c/werkzeuge/artefakt.py --platzhalter <zielordner>   der Platzhalter mit dem digitalen Exposé
```

Der Bau kopiert `website-c/` ohne `werkzeuge/`, ohne diese Datei und ohne Bilder, auf die nichts verweist. Er entfernt alle Kommentare aus HTML, CSS und den eigenen Skripten (nicht aus `lib/`) und nimmt der Hauptseite ihr Gerüst, weil claude.ai sie selbst in eines bettet. Die Klassen ihres `<body>` setzt dann ein kleines Skript. Liest man den Bau ohne das Gerüst von claude.ai, landen sie auf `<html>`. Stile fragen darum nur nach Vorfahren (`.mit-globus .kopf`), nie nach `body.mit-globus`.

`404.html` und `vercel.json` gehören nur zur Veröffentlichung und fehlen im Bau für claude.ai.

## Veröffentlichen (Vercel)

```
python3 website-c/werkzeuge/veroeffentlichen.py              die echte Veröffentlichung
python3 website-c/werkzeuge/veroeffentlichen.py --entwurf    auch mit offenen [[ZU PRÜFEN …]]-Stellen
python3 website-c/werkzeuge/veroeffentlichen.py --ziel <ordner>   zum Ausprobieren woanders hin
python3 website-c/werkzeuge/veroeffentlichen.py --website        für diesen Bau die volle Website, gleich, was AUSGABE sagt
python3 website-c/werkzeuge/veroeffentlichen.py --platzhalter    für diesen Bau den Platzhalter, gleich, was AUSGABE sagt
```

**Zwei Ausgaben (27. Oktober, V87).** Der Schalter `AUSGABE` oben in `werkzeuge/veroeffentlichen.py` wählt, was ausgeliefert wird; `artefakt.py` folgt ihm. Er steht auf `'platzhalter'`, solange die Website offline ist: unter `/` der Platzhalter (`platzhalter.html`: Name, Rolle, der erste Satz, der Globus, „Seite im Aufbau.“, Impressum und Datenschutz), unter `/satoshi` das digitale Exposé (die Seite *Satoshi* ohne Navigation zu anderen Seiten, mit „Digitales Exposé“ und der Bitte, den Link nur mit Zustimmung zu teilen), dazu Impressum, Datenschutz und `404.html`. Nur `/` ist indiziert und steht in der Sitemap; die übrigen Adressen leitet `vercel.json` mit 307 auf `/`. Was nur in einer Ausgabe steht, ist in den Seiten markiert (`data-nur="website"`, `data-nur="expose"`, `data-verweis="website"`, erklärt in `satoshi.html`). Zurück zur vollen Website: `AUSGABE = 'website'` und neu bauen, sonst ändert sich nichts. Vor jedem Livegang auch das Prüfprogramm im Browser laufen lassen; Verweise, die erst ein Skript setzt, sieht der Bau nicht.

Vercel liefert den Ordner `../veroeffentlichung/` aus (Root Directory `veroeffentlichung`, Framework „Other“, kein Build-Schritt, siehe `../docs/vercel-einrichtung.md`). Vercel baut nur neu, wenn sich dort etwas ändert. Darum entsteht der Ordner nur mit diesem Werkzeug, als bewusster, geprüfter Stand. Von Hand wird in `veroeffentlichung/` nichts geändert, und Zwischenstände in `website-c/` gehen erst online, wenn jemand neu veröffentlicht.

- **Die Adresse** steht an einer Stelle: `BASIS_URL` oben in `werkzeuge/veroeffentlichen.py` (jetzt `https://dominikjaekel.de`). Daraus entstehen Canonical, `og:url`, `og:image`, `sitemap.xml` und `robots.txt`. Ändert sich die Domain, nur dort ändern und neu veröffentlichen. Die Seiten in `website-c/` tragen deshalb keine Canonical- und Open-Graph-Angaben; `robots.txt` und `sitemap.xml` gibt es nur im Bau.
- **Was der Bau tut:** Er kopiert `website-c/` ohne `werkzeuge/`, diese Datei und Bilder, auf die nichts verweist, und entfernt alle Kommentare wie `artefakt.py`. Alle Seiten behalten ihr Gerüst, auch `index.html`. In den Kopf jeder Seite schreibt er Canonical, `og:title` (der Titel der Seite), `og:description` (die Meta-Beschreibung der Seite), `og:url`, `og:image` (`bilder/vorschau.jpg`), `og:locale` `de_DE` und `twitter:card` `summary_large_image`, außer in `404.html`. Er schreibt `sitemap.xml` mit den elf Seiten (lastmod: Tag des Baus, für unveränderte Seiten bleibt der alte Tag; im Entwurf ohne die Seiten mit `noindex`) und `robots.txt` (alles erlaubt, Verweis auf die Sitemap).
- **Skripte in den Seiten und CSP:** Die Skripte, die in den Seiten stehen, bleiben dort. Der Bau trägt für jedes den SHA-256-Hash in `script-src` der Content-Security-Policy in `vercel.json` ein. In `website-c/vercel.json` steht nur `script-src 'self'`; `'unsafe-inline'` braucht die Seite nicht. Ändert sich ein Skript, ändert sich beim nächsten Bau sein Hash mit.
- **Offene Stellen:** Steht in einer ausgelieferten Datei noch `[[ZU PRÜFEN …]]`, baut das Werkzeug nicht und nennt jede Stelle mit Datei und Zeile. Mit `--entwurf` baut es trotzdem, nennt die Stellen und gibt den Seiten mit offenen Stellen `noindex`.
- **Prüfungen vor dem Ersetzen:** keine Kommentare; jedes Skript in einer Seite hat seinen Hash in der CSP; keine `onclick=` und keine `javascript:`-Verweise; nichts von fremden Servern; Verweise nach außen nur die aus `AUSSEN_ERLAUBT` oben im Werkzeug (jetzt fünf: Autorenforum, Simon-Kucher, A.-E.-Johann-Preis, Wikipedia zum Problem der byzantinischen Generäle, Satoshi Nakamoto Institute), mit `rel="noopener"` und ohne `target`, auch als `href:` in den Daten; jeder lokale Verweis zeigt auf eine ausgelieferte Datei; Icons, `theme-color` und Vorschau-Angaben in jedem Kopf; kein „Testsystem“, „claude.ai“ oder „Anthropic“ in Seiten, Stilen und eigenen Skripten; `vercel.json` mit allen Headern. Schlägt etwas fehl, bleibt der alte Stand von `veroeffentlichung/` stehen.
- **Newsletter:** zum Start ausgeblendet. `NEWSLETTER = true` in `seite.js` setzt die Zeile wieder in jeden Fuß. Das Werkzeug baut dann nur, wenn der Abschnitt „Newsletter“ wieder im Datenschutz steht und in `POST_DANKE` ein Dank steht, der zum Dienst passt (jetzt leer; `../docs/newsletter-datenschutz-entwurf.md`).
- **Seit Runde 6:** Adressen ohne `.html` im Bau (`/vita`, Startseite `/`, Anker bleiben; in href und in `FSeite.SEITEN`); kein interner Verweis darf auf `.html` enden. Strukturierte Daten (`<script type="application/ld+json">`, nicht ausführbar, ohne Hash): Person auf Startseite und Vita, Book auf *Satoshi*, BookSeries auf *Ursprünge*, aus Kurzvita, Überschriften und Meta-Beschreibungen gelesen, dazu `PERSON_*` oben im Werkzeug; `sameAs` aus `PROFILE`. `lesen.html` bekommt `noindex` und fehlt in der Sitemap, solange `daten/texte.js` keinen Text hat. `TARIF` oben im Werkzeug (`None`, `'pro'` oder `'hobby'`) wählt den Absatz zur Auftragsverarbeitung im Datenschutz; `artefakt.py` folgt ihm.
- **Icons und Vorschaubild** liegen fertig im Ordner. Neu rechnen nach einer Änderung an Zeichen oder Vorlage: `python3 website-c/werkzeuge/favicon.py`, dann `node website-c/werkzeuge/bilder.cjs` (braucht fontTools mit brotli und Playwright).

`vercel.json` (Quelle hier, mit den Hashes im Bau): `cleanUrls` true (seit Runde 6: Vercel liefert `vita.html` unter `/vita` aus und leitet `/vita.html` mit 308 dorthin weiter; `veroeffentlichen.py` schreibt die internen Verweise im Bau auf `/vita` um, hier bleiben sie `vita.html` für den Testlink), `trailingSlash` false (`/vita/` auf `/vita`), Content-Security-Policy, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` ohne Kamera, Mikrofon, Standort und `interest-cohort`. HTML mit `must-revalidate` (Regel `/([^/.]+)` für die Adressen ohne Endung), `schrift/`, `lib/`, `daten/` und `bilder/` einen Tag (`max-age=86400`, nicht `immutable`, die Dateinamen tragen keinen Hash). Die Fehlerseite `404.html` zeigt Vercel von selbst für jede unbekannte Adresse.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: erster Satz, Kurzvita, Globus mit Tafel, „Was ich schreibe“, „Mein digitales Bücherregal“ (Zeitband mit Regler, „früher“ und „später“; Runde 6, S9) |
| `satoshi.html`, `ursprung.html` | die Romane, je mit Globus |
| `erzaehlungen.html`, `untertext.html`, `lesen.html` | Texte aus `daten/texte.js` (noch leer) |
| `laender.html` | Länderregister und Globus |
| `bibliothek.html`, `vita.html`, `impressum.html`, `datenschutz.html` | die übrigen Seiten |
| `404.html` | Fehlerseite für Vercel: Kopf, „Diese Seite gibt es nicht.“, „Zur Startseite“, Fuß. Verweise vom Wurzelordner aus (`/stil.css`), weil Vercel sie unter jeder unbekannten Adresse zeigt |
| `vercel.json` | Header, Zwischenspeicher und Adressen bei Vercel |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` | Zeichen der Website: „DJ“ aus der Vollkorn als Pfade, Tinte auf Papier |
| `bilder/vorschau.jpg` | Vorschaubild für Verweise (Open Graph), 1200 × 630 |
| `stil.css` | Token (Farben, Grade, Abstände), Kopf, Fuß, Globus, Tafel, Steuerzeile, Ortsleiste, Buchzeile |
| `seite.js` | `window.FSeite`: Globus, Tafel, Ablauf am Globus, Buchzeile, Bücher mit ihren Rückenfarben (`FAMILIEN`), Texte, Navigation, Fuß. Die Übersicht steht oben in der Datei |
| `globus/kern.js` | der Globus auf der Leinwand (d3) |
| `daten/` | Inhalte, Bücher, Karten. `inhalt.js` und `buecher.js` sind in C von Hand geändert und werden nicht neu erzeugt |
| `schrift/`, `lib/` | Vollkorn und IM Fell French Canon mit Lizenzen; d3 und topojson-client mit Lizenzen |
| `werkzeuge/` | Bau für claude.ai (`artefakt.py`), Veröffentlichung (`veroeffentlichen.py`), Icons und Vorschaubild (`favicon.py`, `bilder.cjs`, `vorschaubild.html`), Erzeugen der Daten (`daten.cjs`, für C nicht mehr verwenden), Änderungsprotokoll |

Jede Seite lädt `stil.css` und am Ende `seite.js`, Seiten mit Globus davor `lib/d3.min.js`, `lib/topojson-client.min.js`, die Karten und `globus/kern.js`. Kopf und Fuß stehen in jeder Seite als HTML und sind überall gleich. Wer sie ändert, ändert alle elf Seiten und `404.html`. Die Newsletter-Zeile steht in keinem Fuß; mit `NEWSLETTER = true` setzt `seite.js` sie ein. Die Anschrift steht seit Runde 6 in keinem Fuß, nur im Impressum (und als Verantwortlicher im Datenschutz); mit `ANSCHRIFT_IM_FUSS` in `seite.js` setzt `seite.js` sie wieder hinter „Impressum“.
