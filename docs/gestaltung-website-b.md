# Gestaltungsregeln für Version B

Stand: 20. Oktober 2026. Diese Regeln sind bindend für alle, die an Version B bauen.

Grundlage sind die Rangliste in `docs/ki-merkmale.md`, die Prüfung von Version A in `docs/pruefung-website.md` und die drei Richtungsmuster Verlag, Atlas und Werkstatt (Pfade im Anhang). Angaben wie „Rang 24“ verweisen auf die Rangliste, Angaben wie „B2“ auf die Befunde der Prüfung.

---

## 1. Geltung

- Version B entsteht im Ordner `website-b/` neben `website/`. Version A bleibt unverändert, damit Dominik beide vergleichen kann. `entwuerfe/` wird nicht angefasst. Nichts wird committet oder gepusht, bevor Dominik es sagt.
- B wird von diesem Blatt aus gebaut. HTML und CSS von A werden weder kopiert noch umgebaut. Übernommen werden nur die Daten, der Globus-Kern und die Rechenwege, die Abschnitt 17 nennt.
- Jede sichtbare Farbe, Schriftgröße, Zeilenhöhe und Schrift kommt aus einem Token in `website-b/stil.css`. Ein `<style>`-Block in einer Seite darf nur Anordnung festlegen, also Raster, Reihenfolge und Abstände in Vielfachen der Zeile.
- Wo dieses Blatt schweigt, gilt die einfachste Lösung, die kein neues Zeichen, keine neue Größe und keine neue Farbe braucht. Jede Abweichung steht mit Grund im Änderungsprotokoll von B.
- Dominiks freigegebene Texte bleiben Wort für Wort. Neue Mikrotexte stehen in Abschnitt 16 als Vorschlag und gelten erst, wenn er sie freigibt. Bis dahin baut B mit den Vorschlägen, damit die Seite vollständig ist.

---

## 2. Urteil über die drei Richtungen

Gesehen habe ich alle Bildschirmfotos der letzten Runden (Verlag `r3-*`, Atlas `r6-*` und `r7-*`, Werkstatt `r6-*`) bei 1440 × 900 und 390 × 844, die Zwischenrunden, die Probeblätter der Schriften, die Stylesheets und zum Vergleich die Fotos von Version A. Die Schriftdateien habe ich mit fontTools geprüft.

### Bewertung

Punkte von 1 bis 5. Gewichtet ist nach dem Auftrag. Abstand zu den KI-Merkmalen und die Wirkung von Gestalterhand sind der Zweck von B und zählen doppelt. Eleganz und Passung sind Dominiks Bedingung und zählen anderthalbfach. Machbarkeit und Telefon müssen stimmen, unterscheiden die Richtungen aber wenig.

| Kriterium | Gewicht | Verlag | Atlas | Werkstatt |
|---|---:|---:|---:|---:|
| Abstand zu den KI-Merkmalen | 2 | 3 | 5 | 4 |
| Wirkt von Gestalterhand | 2 | 4 | 5 | 3 |
| Eleganz | 1,5 | 5 | 3 | 3 |
| Passung zu Dominiks Werk und zu der Eleganz, die er an A mag | 1,5 | 4 | 4 | 3 |
| Machbarkeit über elf Seiten und alle Interaktionen | 1 | 5 | 3 | 5 |
| Telefon | 1 | 4 | 4 | 4 |
| **Summe, gewichtet** | | **36,5** | **37,5** | **32** |

### Verlag

Baskervville, Lapis für *Ursprung*, Verlagsfarben im Regal.

- **Stärken.** Die eleganteste Seite der drei. Baskervville steht auf keiner geprüften Liste, hat in der selbst gehosteten Datei alle OpenType-Funktionen und trägt den ersten Satz ohne IM Fell. Der Satzspiegel aus der Normseite ist das sauberste Raster der drei: 30 Zeilen auf 900 px, Satzspalte 27,5 em, Bundsteg zu Außensteg 1 : 2. Die Titelaufnahme in der Zeile unter dem Brett ersetzt die Karteikarte ohne Kasten.
- **Schwächen.** Der erste Bildschirm hat dieselbe Silhouette wie A: Text links, Kugel rechts, Navigation darüber. Wer A kennt, sieht eine bereinigte A. Lapis für die eigenen Werke ist wieder ein einzelner Akzent mit einer Bedeutung, also das Muster aus Rang 10 und 19 in anderer Farbe. Die Verlagsfarben im Regal sind geschätzt und per Hash gestreut (A, `bibliothek.html` Zeile 229–257). Die Familien „leinen“ und „creme“ bringen warme Flächen und viele Grautöne zurück (Rang 2, 29). Dazu kommen Kapitälchen auf den Rücken, per Hash versetzte Stapel und Rücken für Erzählungen, *Untertext* und Länder, die es als Bücher nicht gibt. Auf dem Telefon steht die Navigation mit ungleichen Lücken.

### Atlas

Libertinus, Zweifarbendruck, Kartenrahmen mit Zwickeln, Regal als Strichzeichnung.

- **Stärken.** Die einzige Richtung, deren Look man aus „Autorenseite“ nicht erraten kann (Prüffrage nach impeccable). Die Kugel ist eine Karte geworden: Wasser als Raster der Blauplatte, Gradnetz mit Gradzahlen im Ring, Ortsnamen aufrecht und freigestellt, Gewässernamen kursiv, bereiste Länder schraffiert, ein Maßstab nur dort, wo er stimmt, und keine heutigen Grenzen um 8000 v. Chr. Farbe kommt aus dem Druckverfahren und tritt im Text nie auf. Die Startseite braucht keinen Kopf, ihr Inhaltsverzeichnis ist die Navigation. Erzählungen und *Untertext* stehen dort ohne Link, bis es Texte gibt. Das Regal zeigt nur, was die Daten wissen.
- **Schwächen.** Libertinus erinnert an Wikipedia und Fachbuch, nicht an das, was Dominik an A schön findet. Die Fontsource-Fassung hat gar keine GSUB-Tabelle, also keine Ligaturen, keine Mediävalziffern und keine Kapitälchen. Die Rückenschrift ist mit 7 px nicht lesbar. Die Katalogkarte bleibt ein Kasten über dem Regal. ISBD-Zeichen („Ilias / Homer. – 560 S.“) und GND-Ansetzungen („Homerus“) sind Bibliothekskostüm für Leser, die sie nicht brauchen (Rang 60). Der eigene Renderer `karte.js` (314 Zeilen) kann weniger als `globus/kern.js` (517 Zeilen mit Chronik, Szenen und Länderwahl) und müsste für Satoshi, Ursprung und Länder erst nachgezogen werden. Auf dem Telefon fehlen auf dünnen liegenden Büchern die Titel.

### Werkstatt

Piazzolla, Königsblau für die eigene Arbeit, das Typoskript als Vorbild.

- **Stärken.** Das Vorbild kommt am deutlichsten aus Dominiks Material: Exposé, „(AT)“, Normseiten. Die Datumszeile nimmt ihre Sätze aus seiner Vita und aus den Szenen. Das Regal kodiert die Leseart statt geschätzter Verlagsfarben und zeichnet nur, was es gibt, nämlich das Manuskript von *Satoshi* als Stapel aus 364 Blatt.
- **Schwächen.** Piazzolla ist robust, aber nicht elegant. Die Seite wirkt am ehesten wie ein ordentlicher Blog. Königsblau für die eigene Arbeit ist dasselbe Akzentmuster wie Lapis. Die Koordinaten bleiben und stehen mit geraden Apostrophen („22° 38' N“, Rang 46). Die schwarz gefüllten Lieblingsbücher machen das Regal schwer, die Zeichenerklärung hat sieben Einträge. Courier Prime für Leseproben wäre Monospace (Rang 13).

### Entscheidung

Sieger ist **Atlas** als Gestaltungssystem. Von dort kommen das Leitbild, die Kartenzeichnung, die Farbe als Druckplatte, das Inhaltsverzeichnis statt eines Kopfs auf der Startseite und die Register statt der Etiketten. Die Schwäche von Atlas ist die Eleganz, und sie lässt sich übertragen. Die Schwäche von Verlag sitzt dagegen im Aufbau, die Seite bliebe eine bereinigte A.

Aufgepfropft werden:

- **aus Verlag:** die Schrift Baskervville mit Selbsthosting und Ergänzung der Strichzeichen, die drei Grade, der Satzspiegel aus der Normseite mit Bundsteg zu Außensteg 1 : 2, der Kopf als kleiner Kolumnentitel, die offene Navigation auf dem Telefon und die Titelaufnahme in der Zeile unter dem Brett.
- **aus Werkstatt:** die Inhalte der Tafel aus Dominiks Vita und Szenen, die Ortsnamen der Kurzvita als Bedienwörter, das Regal nach Leseart, das Manuskript von *Satoshi* als einziges eigenes Werk im Regal und „(AT)“ und „Normseiten“ im Inhaltsverzeichnis.

Nicht übernommen werden Libertinus, Piazzolla, Courier Prime, Lapis, Königsblau, die Verlagsfarben, die Katalogkarte, ISBD- und GND-Formen und die Koordinaten.

---

## 3. Leitbild

Die Website ist ein Atlasblatt mit Register, gesetzt in einer Buchschrift.

- Das Vorbild ist ein Druckverfahren, die topografische Karte im Zweifarbendruck. Die Schwarzplatte trägt Schrift und Zeichnung. Die Blauplatte trägt Gewässer und Gradnetz und kommt nur auf Karten vor.
- Kartografische und bibliothekarische Mittel stehen nur dort, wo sie eine Aufgabe haben. Prüffrage für jedes solche Mittel: Braucht der Leser es, um etwas zu finden oder zu verstehen? Wenn nicht, fällt es weg.
- Den Inhalt bestimmt Dominiks Material: seine Stationen, seine Szenen, seine Liste bei Goodreads, seine Rubbelkarte, seine Exposés. Erfunden wird nichts, auch keine Streuung per Zufall.
- Eleganz entsteht aus einer feinen Schrift, viel Weiß, wenigen Linien und ruhiger Bewegung. Ornament kommt keines dazu.
- Das Bild ist hell und bleibt hell. `color-scheme: light`, kein dunkles Schema. Ein gedrucktes Blatt hat keinen Nachtmodus.

---

## 4. Schrift

### Familie

**Baskervville** des Atelier National de Recherche Typographique (ANRT) in Nancy, Version 1.100, variable Achse `wght` 400–700, Antiqua und Kursive. Lizenz SIL Open Font License 1.1 ohne Reserved Font Name.

Eine Familie für alles: Text, Überschriften, Navigation, Kartenschrift und Rückenschrift. Es gibt keine zweite Familie und keine Display-Schrift (Rang 9, 31).

Gründe:

- Sie steht auf keiner geprüften Liste (Rang 31). In den 300 Probeseiten der Design Creativity Bench (15 Modelle mit je 20 Seiten) kommt Baskerville einmal vor, bei MiniMax M3, bei Opus 5.5 nie. Georgia steht auf 79 dieser Seiten, Iowan Old Style auf 51.
- Die selbst gehostete Datei hat alle Funktionen, die der Satz braucht: `onum`, `lnum`, `tnum`, `pnum`, `smcp`, `c2sc`, `liga` und `kern` (mit fontTools geprüft). Die Fassungen von Google Fonts per API und von Fontsource entfernen `smcp`, `onum` und `c2sc`.
- Die Antiqua steht Baskerville nah, die Kursive Didot. In solchen Schriften sind die Kupferstichkarten des 18. und 19. Jahrhunderts beschriftet, die Antiqua für Orte und die Kursive für Gewässer. Die Schrift passt damit zum Atlasblatt. Diese Einordnung stammt aus allgemeinem Wissen und ist nicht eigens belegt.
- Im Probedruck der Richtung Verlag war sie unter acht Kandidaten die eleganteste (`ki-richtung-verlag/probe/schriften.png`).
- **Grenze:** kein Griechisch, kein Hebräisch. Dominik hat die frühen Werke als Titel in der Leseliste gewünscht, nicht als Auszüge im Original. Kommen später Zitate auf Griechisch, wird für `U+0370–03FF` und `U+1F00–1FFF` über `unicode-range` eine griechische Schrift zugeschaltet. Vorschlag ist GFS Didot der Greek Font Society (OFL), weil die Kursive von Baskervville selbst Didot nahesteht. Das ist vor dem Einsatz zu prüfen.

### Laden

- Dateien: `website-b/schrift/baskervville-antiqua.woff2` (58 KB), `website-b/schrift/baskervville-kursiv.woff2` (50 KB) und `website-b/schrift/OFL.txt`. Quelle sind die fertigen Dateien der Richtung Verlag in `ki-richtung-verlag/b-muster/schrift/`.
- Erzeugt wurden sie aus den TTF in `google/fonts/ofl/baskervville` (Quelle anrt-type/ANRT-Baskervville, Commit 0629447) mit `ki-richtung-verlag/skripte/schrift.py`. Das Skript kommt als `website-b/werkzeuge/schrift.py` mit, damit man die Dateien nachbauen kann.
- Die Antiqua-Datei enthält schon Minute und Sekunde (′ ″), übernommen aus der Kursive. Das ist eine Änderung nach OFL und steht im Kolophon. Ein dritter `@font-face`-Eintrag ist nicht nötig.
- Kein Link zu Google Fonts und überhaupt keine Anfrage an einen fremden Server (Rang 48).
- `@font-face` genau so:

```css
@font-face { font-family: "Baskervville"; src: url("schrift/baskervville-antiqua.woff2") format("woff2");
  font-weight: 400 700; font-style: normal; font-display: swap; }
@font-face { font-family: "Baskervville"; src: url("schrift/baskervville-kursiv.woff2") format("woff2");
  font-weight: 400 700; font-style: italic; font-display: swap; }
:root { --schrift: "Baskervville", Baskerville, "Times New Roman", serif; }
```

- `<link rel="preload">` für die Antiqua nur, wenn die Seite über `http` ausgeliefert wird. Über `file://` scheitert es an CORS.
- Auf `body`: `font-kerning: normal; font-variant-ligatures: common-ligatures; font-variant-numeric: oldstyle-nums proportional-nums;`.
- Die Leinwand der Karte zeichnet erst, wenn `document.fonts.load('500 15px Baskervville')` erfüllt ist.

### Schnitte

| Gewicht | Wofür |
|---|---|
| 400 | aller Text, erster Satz, Seitentitel, Navigation, Legenden, Rückenschrift ab 11 px |
| 500 | Kartenschrift, Rückenschrift unter 11 px |
| 600 | Halbfett, genau eine Bedeutung: Orientierung. Abschnittsüberschriften, die aktuelle Seite, die gewählte Karte, das aktuelle Fach im Register, der aktive Ort auf der Karte |

Keine anderen Gewichte. Kein 700.

---

## 5. Grade und Zeilen

Die Maßeinheit ist die Zeile `--z`. Es gibt drei Grade im HTML (Rang 30).

| Grad | Token | Desktop und Tablet | Telefon | Zeilenhöhe | Wofür |
|---|---|---|---|---|---|
| klein | `--klein` | 16 px | 15 px | 0,75 z | Legenden, Tafelangaben, Zeichenerklärung, Buchzeile, Kopf der Unterseiten, Standortregister, Fuß, Kolophon |
| Text | `--text` | 20 px | 18 px | 1 z | Lesetext, Kurzvita, Inhaltsverzeichnis, Kartenwahl, Abschnittsüberschriften, Ortsname der Tafel |
| groß | `--gross` | 30 px | 26 px | 1,25 z | der erste Satz der Startseite, Seitentitel (`h1`) |

- `--z` ist 30 px (1,875 rem) ab 48 rem Breite und 27 px (1,6875 rem) darunter.
- Zwei Ausnahmen, beide nur in Zeichnungen:
  - **Kartenschrift** auf der Leinwand: Ortsnamen 15 px, alles auf der Blauplatte 13 px (Telefon 12 px).
  - **Rückenschrift** im Regal: 9 bis 13 px, berechnet aus der Breite des Rückens. Unter 9 px bleibt der Rücken leer.
- Abstände sind Vielfache von 0,25 z und nach Gewicht ungleich (Rang 49):

| Stelle | Abstand |
|---|---|
| zwischen Absätzen in Prosa | 0, dafür 1 em Einzug ab dem zweiten Absatz |
| zwischen Einträgen einer Liste oder eines Registers | 0,25 z |
| zwischen Gruppen einer Liste | 0,75 z |
| vor einer Abschnittsüberschrift | 2 z |
| nach einer Abschnittsüberschrift | 0,5 z |
| zwischen großen Teilen einer Seite | 3 z |
| vor dem Fuß | 4 z |
| unter dem Fuß | 2 z |

- Nach einer Überschrift, nach einem Bild und nach einem Szenenwechsel beginnt der Absatz ohne Einzug.

---

## 6. Raster und Ränder

Drei Breiten. Die Werte gelten für alle elf Seiten.

### Desktop, ab 75 rem (1200 px)

Fünf Spalten, Vorbild ist der Satzspiegel der Richtung Verlag.

| Spalte | Breite |
|---|---|
| Bundsteg | ein Drittel des Rests |
| Satzspalte | 34,375 rem (550 px, 27,5 em bei 20 px, rund 60 Anschläge wie die Normseite) |
| Zwischenschlag | 2 z (60 px) |
| Tafelfeld `--P` | `clamp(30rem, min(100vw - 34.375rem - 3.75rem - 7.5rem, 100svh - 5 * var(--z)), 42rem)` |
| Außensteg | zwei Drittel des Rests |

- Rest = `100vw - 34.375rem - 3.75rem - var(--P)`. Bundsteg zu Außensteg steht 1 : 2 wie im Buchkanon. Bei 1440 × 900 ergibt das Tafelfeld 672 px, Bundsteg 53 px, Außensteg 105 px.
- Kopfsteg 2 z. Auf der Startseite steht die Oberkante des ersten Satzes auf der Höhe der Oberkante des Kartenrahmens.
- Alles steht links. Nichts ist zentriert (Rang 14).

### Tablet, 48 bis 75 rem

- Eine Spalte. Links fester Rand von 2 z, Satzspalte höchstens 34,375 rem, rechts der Rest, mindestens 2 z.
- Die Kartentafel steht unter dem Text, `width: min(100%, 40rem)`, linksbündig mit der Satzspalte.
- Grade wie auf dem Desktop.

### Telefon, unter 48 rem

- Eine Spalte, Rand links und rechts je 16 px.
- `--z` 27 px, Grade 15, 18 und 26 px.
- Die Kartentafel nimmt die volle Breite zwischen den Rändern ein (358 px bei 390 px Fensterbreite).

### Lage der Randangaben an der Karte

- **Zwickellage**, wenn das Tafelfeld mindestens 38 rem breit ist. Die Randangaben stehen in den vier Ecken des Rahmens wie bei Hemisphärenkarten. Umsetzung als Container-Abfrage auf das Tafelfeld, nicht als Medienabfrage.
- **Außenlage** darunter. Die Kartenwahl steht über dem Rahmen, alle übrigen Angaben darunter.
- Bei 1440 × 900 gilt die Zwickellage, bei 1280 × 800 und auf Tablet und Telefon die Außenlage.

---

## 7. Farben

| Token | Hex | Kontrast auf Weiß | Bedeutung |
|---|---|---:|---|
| `--papier` | `#FFFFFF` | – | Grund jeder Seite, Land auf der Karte, Rücken im Regal. Kein Creme (Rang 2) |
| `--tinte` | `#141414` | 18,4 : 1 | aller Text, alle Linien, Grenzen, Wege, Ortszeichen, Schraffur, Kartenrahmen, Bretter, Rückenkontur |
| `--tinte-raster` | `#C4C4C4` | 1,7 : 1 | Raster der Schwarzplatte, 25 %. Nur für die Striche im Zeitband, nie für Text |
| `--blau` | `#2A5F99` | 6,6 : 1, auf dem Raster 5,5 : 1 | Blauplatte, nur auf Karten: Küste, Gradnetz, Gradzahlen, Gewässernamen |
| `--blau-raster` | `#E5ECF3` | – | Raster der Blauplatte, nur auf Karten: Wasserfläche |

- Es gibt keine weiteren Farben, keine Transparenzen für Text und keine festen Werte außerhalb von `stil.css` (Rang 29, 50).
- **Es gibt kein Grau für Text** (Rang 11, 24). Ein Bedienwort, das nicht verfügbar ist, steht mit `visibility: hidden` an seinem Platz, damit nichts springt.
- Kein Akzent für eigene Werke. Eigene Werke erkennt man an ihrer Stellung und an der Kursive des Titels (Rang 10).
- Farbe tritt nie bei Hover, Fokus oder Links auf.
- Textauswahl umgekehrt: `::selection { background: var(--tinte); color: var(--papier); }`. `caret-color: var(--tinte)`. Die Bildlaufleiste bleibt im Werkszustand.

---

## 8. Auszeichnung und Satz

### Kursiv

- Kursiv markiert genau drei Dinge: Werktitel im Satz, in Listen und in der Navigation, fremdsprachige Wörter und Zitate (Rang 8, 24).
- Steht ein Werktitel allein als Überschrift, ist er aufrecht. Seitentitel „Satoshi“, Abschnitt „Band I. Kreise ohne Wiederkehr“.
- Auf der Karte stehen Gewässernamen kursiv in Blau, wie es die Kartografie vorsieht. Ortsnamen stehen aufrecht, überall: auf der Karte, auf der Tafel, in der Vita, in den Szenen.
- Kursiv steht nie für Nebensache, Legende, Datum, Ort, Unterzeile oder Bedienhinweis.

### Halbfett

- 600, eine Bedeutung: Orientierung. Abschnittsüberschriften, die aktuelle Seite in der Navigation, die gewählte Karte, das aktuelle Fach im Standortregister, der aktive Ort auf der Karte, die Figurennamen auf der Seite *Satoshi*.
- Nie zur Betonung im Satz.

### Kapitälchen und Versalien

- Keine Kapitälchen als Label, als Überschrift, als Name im Kopf oder auf Buchrücken (Rang 1).
- Versalabkürzungen ab drei Buchstaben im Lauftext stehen als Kapitälchen, wie Bringhurst es vorsieht: AIESEC, UdSSR, USA, CTO, FAZ. Umsetzung mit `<abbr>` und `font-variant-caps: all-small-caps; letter-spacing: .04em`. In kursivem Text bleiben sie Versalien, weil die Kursive keine Kapitälchen hat.
- Gesperrte Versalien gibt es nur auf der Karte, für Ozeannamen, deren Sperrung die Ausdehnung der Fläche zeigt. Sonst nirgends.

### Ziffern

- Im Lauftext Mediävalziffern, proportional.
- Auf der Karte, an der Jahresachse im Regal und im Zeitband Versalziffern mit fester Breite (`lining-nums tabular-nums`).
- Zahlen, die etwas zählen, stehen im Satz ausgeschrieben, wo Dominik es so hält: vierzig Kapitel, fünfundsechzig Länder. Jahre, Seitenzahlen und Normseiten in Ziffern.

### Deutscher Satz

- Anführungszeichen „…“ und ‚…‘, Apostroph ’.
- Halbgeviertstrich mit Leerzeichen für den Einschub, ohne Leerzeichen für Spannen in Registern und Randangaben (1900–1945, 2018–2022). Im Satz „2018 bis 2022“. Kein Geviertstrich.
- Tausender werden erst ab fünf Stellen mit schmalem Leerzeichen getrennt (12 000), vierstellige Zahlen stehen ohne (1040 Seiten). Geschütztes Leerzeichen in „v. Chr.“, „n. Chr.“, „S. 12“, „e. V.“.
- `lang="de"` auf jeder Seite, `hyphens: auto` und `text-wrap: pretty` für Prosa. Der erste Satz und Überschriften trennen nicht (`hyphens: manual`).
- Keine Semikolons in Mikrotexten (Rang 58). Ein Doppelpunkt nur vor Aufzählung, Zitat oder Adresse (Rang 32).

---

## 9. Verweise, Bedienung, Navigation und Zustände

Es gibt genau vier Arten, und jede hat genau ein Aussehen.

| Art | Beispiele | Ruhe | Hover und Fokus | aktuell oder gewählt | nicht verfügbar |
|---|---|---|---|---|---|
| Verweis im Text | E-Mail, Titel im Inhaltsverzeichnis, Impressum | unterstrichen im Werkszustand des Browsers | wie in Ruhe, dazu Fokusrahmen | – | – |
| Bedienwort im Text | Ortsnamen der Kurzvita, Orte in den Szenen, Kontinente in der Tafellegende | unterstrichen im Werkszustand | wie in Ruhe, dazu Fokusrahmen | ohne Strich | – |
| Auswahlliste | Navigation, Kartenwahl, Standortregister, Länderregister | ohne Strich | unterstrichen | halbfett, ohne Strich | – |
| Steuerwort | früher, später | unterstrichen im Werkszustand | wie in Ruhe, dazu Fokusrahmen | – | `visibility: hidden` |

- „Werkszustand“ heißt `text-decoration-line: underline` und sonst nichts. Keine Dicke, kein Abstand, keine Farbmischung (Rang 53).
- Kein Pfeil, kein „Mehr erfahren“. Der Verweis nennt sein Ziel (Rang 12).
- Bedienwörter und Steuerwörter sind `<button>`, Verweise sind `<a>`. Knöpfe haben keinen Rahmen, keinen Grund, keinen Radius (Rang 4).
- Fokus: `outline: 2px solid var(--tinte); outline-offset: 3px`, nur bei `:focus-visible`.
- Kein Übergang bei Hover oder Fokus. `transition` kommt im Stylesheet nicht vor (Rang 39).
- Im ersten Bildschirm der Startseite stehen höchstens zwölf unterstrichene Elemente (A: 20).

### Navigation

- **Unterseiten:** Kopfzeile im Grad klein. „Dominik Jäkel“ in der Satzspalte als Verweis auf die Startseite, ohne Strich, bei Hover unterstrichen. Die Navigation im Tafelfeld als Auswahlliste: *Satoshi*, *Ursprung*, Länder, Bibliothek, Vita. Abstand zwischen den Einträgen 1 em.
- **Startseite:** kein Kopf. Das Inhaltsverzeichnis unter der Kurzvita ist die Navigation (Abschnitt 12.4).
- Erzählungen und *Untertext* erscheinen in der Navigation erst, wenn `daten/texte.js` einen Text der Art enthält. Sie stehen dann nach *Ursprung*. Das prüft das Skript beim Laden.
- **Telefon:** Name in der ersten Zeile, die Navigation offen in der zweiten, bei Bedarf umbrechend. Kein Schalter „Inhalt“, kein Menü.

---

## 10. Legenden und Nebentexte

Hier steht, was die graue Kursive ersetzt (Rang 24, B2). Die Regel gilt ohne Ausnahme.

- **Pro Textebene ein Unterscheidungsmittel.** Nebentexte sind eine Stufe kleiner (Grad klein), sonst nichts. Sie stehen aufrecht, in `--tinte`, in derselben Schrift.
- Was sie vom Text unterscheidet, ist ihre Stellung: direkt unter oder neben dem Gegenstand, den sie erklären, mit 0,25 z Abstand, linksbündig mit ihm. So setzt Tufte CSS Randnotizen.
- Kursiv darin nur für Werktitel. „Mit *Picknick am Wegesrand* der Brüder Strugatzki.“
- Das gilt für Bildlegenden, die Tafel an der Karte, Achsen und Jahreszahlen unter Brettern und Zeitband, die Buchzeile, die Zeichenerklärung, den Entwurfsvermerk der Rechtsseiten, die Notiz am Ende eines Textes, den Fuß und das Kolophon.
- Die Stationenzeile nach Joyce entfällt (B2). Koordinaten entfallen überall. Die Gradzahlen im Kartenring zeigen die Lage (Abschnitt 12.5).
- Eine Legende steht nur dort, wo sie etwas sagt, das man nicht sieht. Leere Felder bleiben leer (Rang 33).

---

## 11. Überschriften, Labels und Rubriken

- Es gibt keine Zeile über einer Überschrift, weder in Versalien noch in Kapitälchen noch klein (Rang 1).
- `h1` ist der Seitentitel im Grad groß, Gewicht 400. Auf der Startseite ist der erste Satz die `h1`.
- `h2` und `h3` stehen im Grad Text, halbfett, aufrecht, in normaler Schreibung, mit 2 z Abstand davor und 0,5 z danach.
- Überschriften sind Substantive für den Inhalt oder Dominiks Wörter aus dem Exposé: Klappentext, Eckdaten, Aufbau, Die Figuren, Stationen, Leseliste. Keine Effektüberschriften, keine w-Sätze als Etikett (Rang 28, 35).
- Wo ein Abschnitt ohne Überschrift verständlich ist, bekommt er keine. Der Fuß hat keine Überschrift „Kontakt“.
- Rubriken heißen, wie Dominik sie selbst nennt. Für die Bibliothek sind das die Regale seiner Liste bei Goodreads in der deutschen Fassung: Lese ich gerade, Kindheit und Jugend (childhood-readings), Nicht zu Ende gelesen (not-finished), Leseliste. „Nachttisch“, „Kinderzimmer“, „Was noch wartet“ und „Eigenes“ entfallen.
- Nummern nur für echte Reihen: Band I, II und III der Trilogie, Kapitel, Verse (Rang 23).

---

## 12. Bausteine

### 12.1 Kopf der Unterseiten

- Eine Zeile im Grad klein auf der Höhe des Kopfstegs (2 z). Name in der Satzspalte, Navigation im Tafelfeld (Desktop) oder darunter (Tablet, Telefon).
- Keine Tagline, kein „Schriftsteller und Reisender“ (Rang 21, B5). Keine Sperrung, keine Kapitälchen.
- Danach 2 z bis zum Seitentitel.

### 12.2 Der erste Satz

Er ersetzt die einfliegende Zeile in IM Fell French Canon (B3, Rang 25, 9, 31).

- Dominiks Satz, unverändert: „Dominik Jäkel schreibt tagsüber unter fremden Namen und abends unter seinem eigenen.“
- `h1`, Baskervville 400, Grad groß, `--tinte`.
- Zeilenfall wie in A, in drei Gliedern: „Dominik Jäkel schreibt tagsüber / unter fremden Namen / und abends unter seinem eigenen.“ Die drei Glieder sind `<span>` mit `display: block`. Auf dem Telefon sind sie `inline`, der Satz fließt mit `text-wrap: balance`.
- Er steht beim Laden vollständig da. Kein Einflug, keine Staffel, keine Unschärfe, keine zweite Schrift, kein Skript.
- IM Fell French Canon kommt in B nicht vor. Version A behält die einfliegende Zeile, weil Dominik sie festgelegt hat (Commit e65dc13). Der Vergleich zeigt ihm beides.

### 12.3 Kurzvita

- Ein Absatz im Grad Text, dritte Person, 1 z unter dem ersten Satz.
- Die fünf Ortsnamen Dortmund, Freiburg, Potsdam, Kaohsiung und Berlin sind Bedienwörter. Ein Klick fliegt die Karte dorthin, hält die Chronik an und zeigt die Tafel des Orts. Der Ort, an dem die Karte gerade steht, verliert seinen Strich.
- Wortlaut in Abschnitt 16.

### 12.4 Inhaltsverzeichnis (Startseite)

- Eine Liste in der Satzspalte, 1,5 z unter der Kurzvita, `<nav aria-label="Inhalt">`.
- Jeder Eintrag: Titel oder Wort, Punkt, ein Satz im Grad Text. Nur der Titel ist Verweis.
- Zwei Gruppen mit 0,75 z Abstand. Erste Gruppe *Satoshi*, *Ursprung*, Erzählungen, *Untertext*, Länder. Zweite Gruppe Bibliothek, Vita.
- Erzählungen und *Untertext* stehen ohne Verweis, solange es keinen Text der Art gibt. Danach wird ihr Wort zum Verweis.
- Wortlaut in Abschnitt 16.

### 12.5 Kartentafel

Die Kugel aus `globus/kern.js` in der Zeichnung der Richtung Atlas.

**Rahmen**
- Ein Quadrat mit 1 px `--tinte` als Kartenrahmen. Darin die Kugel mit einem Ring von 24 px (Telefon 19 px) zwischen Kugelrand und Rahmen.
- Der Kugelrand ist eine Linie von 0,9 px `--tinte`. Der Rahmen ist der einzige Kasten der Website (Rang 5). Er umfasst eine Abbildung.

**Zeichnung**

| Element | Platte | Ausführung |
|---|---|---|
| Wasser | blau | Fläche `--blau-raster` |
| Land | – | `--papier` |
| Küste | blau | `--blau`, 0,8 px |
| Gradnetz | blau | `--blau`, 0,45 px, Deckkraft 0,75. Abstand nach Zoom: 30° unter k 1,6, 10° unter k 4, 5° unter k 9, sonst 2° |
| Grenzen | schwarz | `--tinte`, 0,45 px (ab k 3 0,6 px), gestrichelt 2,2 / 1,6. Auf der Karte *Ursprung* keine heutigen Grenzen |
| bereiste Länder | schwarz | Schraffur 45°, Linien 0,55 px im Abstand 3,4 px. Nur auf der Karte Reisen und auf der Seite Länder |
| Weg | schwarz | `--tinte`, 1,2 px, runde Enden. Zu Nebenorten gestrichelt 3 / 3 |
| Wohnort, Schauplatz | schwarz | gefüllter Punkt, 7 px |
| längerer Aufenthalt | schwarz | offener Kreis, 7 px, Kontur 1,25 px |

**Beschriftung**
- Ortsnamen: Baskervville 500, 15 px, aufrecht, `--tinte`, freigestellt mit 3 px `--papier`. Der aktive Ort in 600. Lage nach der Reihenfolge rechts oben, rechts unten, links oben, links unten, dann rechts oder links. Kein Name überdeckt einen anderen.
- Gewässernamen: kursiv, 13 px, `--blau`, nur auf Wasser (Prüfung per `d3.geoContains`, sonst die nächste Lage). Liste und Zoomschwellen aus `ki-richtung-atlas/mockup/karte.js`.
- Ozeane in Versalien, gesperrt um 0,12 em.
- Gradzahlen im Ring, dem Rund folgend, 13 px, `--blau`, Versalziffern: „30° N“, „120° O“, „60° W“, „Äquator“. Eine Zahl steht dort, wo ihre Netzlinie den Kugelrand schneidet. Gradzahlen, die näher als 40 px an der vorigen stehen oder einen Zwickeltext berühren würden, entfallen.
- Kein Maßstab unter Zoom 2,4. In der orthografischen Projektion stimmt er nur in der Kartenmitte. Ab 2,4 eine Leiste mit runder Länge (100, 250, 500 oder 1000 km), 5 px hoch, links Tinte, rechts Papier, Kontur 0,75 px, im Grad klein mit Versalziffern beschriftet.

**Randangaben**

| Zwickel | Inhalt |
|---|---|
| oben links | Kartenwahl als Auswahlliste untereinander: Wohnorte, Reisen, *Satoshi*, *Ursprung* (nur Startseite) |
| oben rechts | Kopf der Tafel (12.6), rechtsbündig |
| unten links | Zeichenerklärung der gewählten Karte, gezeichnete Zeichen mit je einem Wort |
| unten rechts | Maßstab, wenn er gilt |

- Der Text in den Zwickeln weicht der Kugel aus (`shape-outside` mit Aussparung wie in `ki-richtung-atlas/mockup/start.html`).
- In der Außenlage: Kartenwahl als Zeile über dem Rahmen, darunter der Rahmen, dann Kopf und Legende der Tafel, früher und später, dann Zeichenerklärung und Maßstab in einer Zeile.
- Zeichenerklärung je Karte: Wohnorte „● Wohnort“, „○ längerer Aufenthalt“. Reisen „Schraffur bereist“. *Satoshi* und *Ursprung* „● Schauplatz“.

**Bedienung**
- Ziehen dreht die Kugel, Pfeiltasten auch, Plus und Minus zoomen. Zoomen mit dem Rad nur mit gehaltener Strg- oder ⌘-Taste. Der Hinweis „Zum Zoomen Strg halten und scrollen“ erscheint nur, wenn jemand ohne Taste scrollt (unsichtbare Geste).
- Auf dem Telefon `touch-action: pan-y`, damit die Seite scrollt. Gedreht wird mit einem Finger waagerecht, gezoomt mit zwei.
- Die Leinwand hat `tabindex="0"` und ein `aria-label`, das sagt, was man mit ihr tun kann.

**Größe je Seite**
- Startseite und Länder: das ganze Tafelfeld.
- *Satoshi* und *Ursprung*: höchstens 30 rem, im Tafelfeld, haftend während der Szenen oder Bände (12.11). So haben nicht vier Seiten dieselbe Silhouette (B16).

**Umsetzung**
- `globus/kern.js` aus A wird nach `website-b/globus/kern.js` kopiert und behält seine Schnittstelle (Ebenen, Chronik, Flüge, Länderwahl).
- Hinzu kommt eine Zeichenart „druck“ mit Blauplatte, Schraffur, Ring, Gewässernamen und Maßstab. Vorlage ist `ki-richtung-atlas/mockup/karte.js`, die Zeichenwerte stehen oben.
- Das Pendeln bleibt aus (`pendeln: false`).

### 12.6 Tafel

Sie ersetzt die Stationstafel von A. Sie hat zwei Teile.

**Kopf der Tafel** (Zwickel oben rechts oder unter dem Rahmen)
- Erste Zeile im Grad Text: das Kartenzeichen des Orts und der Name, aufrecht. „● Kaohsiung“.
- Zweite Zeile im Grad klein: das Land aus dem Feld `land` der Daten, wenn es eines gibt (für deutsche Orte steht keines), und der Zeitraum. „Taiwan, 2018–2022“. „seit 2022“. Der Zeitraum eines Wohnorts endet mit dem Jahr des nächsten Wohnorts.
- `aria-live="polite"`.

**Legende der Tafel** (unter dem Rahmen, über die Breite des Rahmens)
- Ein Satz im Grad klein, aufrecht, in Tinte. Herkunft je Karte:
  - Wohnorte: die Zeile der Station aus Dominiks Stationenliste in `vita.html`, mit großem Anfangsbuchstaben und Punkt. „Vier Jahre als Lektor und freier Autor.“
  - Reisen: der Satz mit den Kontinenten. Die Kontinente sind Bedienwörter und drehen die Kugel.
  - *Satoshi*: der Text der Szene aus `daten/inhalt.js`, wörtlich.
  - *Ursprung*: Band und Titel, dann der Satz zum Band.
- Am rechten Ende der Zeile, bündig mit dem Rahmen, die Steuerwörter „früher“ und „später“.
- Gibt es keinen Satz, bleibt die Legende leer. Für Berlin und die längeren Aufenthalte ist das so, weil Kopf und Zeichenerklärung schon alles sagen.

Die Sätze für die Wohnorte stehen in einer neuen Datei `website-b/daten/stationen.js`, von Hand gepflegt, mit einem Vermerk, dass sie aus `vita.html` stammen. Die übrigen Daten in `website-b/daten/` sind unveränderte Kopien aus `website/daten/`.

Es entfallen gegenüber A: die große hängende Jahreszahl, das Kapitälchen-Label „wohnort“, die Koordinaten, die Luftlinie, die Liste der drei Bände mit grauen Einträgen, „Hier lebt er heute.“ und „Noch einmal von Dortmund an“.

### 12.7 Regal

Das Regal ist eine Strichzeichnung aus Daten, gezeichnet wie ein Aufriss.

**Maße**
- Breite in mm: Seiten × 0,06 + 1 (Paperback, Mass Market, sonstige) oder + 5 (Hardcover). Ohne Seitenzahl gilt 260 Seiten.
- Höhe in mm nach Bindung: Paperback 185, Mass Market 175, sonstige 198, Hardcover 225.
- Maßstab 0,9 px je mm (Desktop), 0,8 (Tablet), 0,68 (Telefon), wie in A seit Commit 4653065.
- Keine Streuung per Hash, weder bei Maß noch bei Lage (B7).

**Zeichnung**
- Rücken: Fläche `--papier`, Kontur `--tinte` 1 px bei einfacher Pixeldichte, 0,75 px ab doppelter.
- Zwischen zwei Rücken 1 px Papier, damit jede Kontur für sich steht.
- Brett: eine Linie von 1 px `--tinte` über die ganze Breite des Regals.
- Rückenschrift: Baskervville aufrecht, Nachname und Kurztitel, getrennt durch ein Geviert Abstand. Keine Kapitälchen und keine Kursive, denn die Schrift beschriftet hier den Gegenstand und zitiert nichts. Deutsche Rücken laufen von unten nach oben, alle anderen von oben nach unten. Erkennung wie in A (`DE_VERLAG`, `DE_TITEL`).

**Zeichen** (eine Zeichenerklärung mit vier Einträgen)

| Zeichen | Bedeutung | Datenfeld |
|---|---|---|
| Punkt, 4 px, mittig, 6 px über dem Fuß | eines der liebsten | `s: 5` |
| waagerechter Strich, 1 px, 2 px über dem Kopf, so breit wie der Rücken | mehr als einmal gelesen | `w: 1` |
| Kontur gestrichelt 3 / 2 | nicht zu Ende gelesen | `r: 'abgebrochen'` |
| Kontur gepunktet 1 / 2 mit runden Enden | in Auszügen gelesen | `x: 1` |

- Die Bücher, die Dominik nur in Auszügen gelesen hat, sind damit am Regal sichtbar markiert: Genesis, Ilias, Odyssee, Aeneis, De bello Gallico, Metamorphosen und Summa theologica. Sie stehen im ersten Fach „bis 1899“ in der Reihenfolge ihrer Entstehung. Die Buchzeile sagt dazu „In Auszügen gelesen.“ Liest Dominik weitere Schriften Thomas von Aquins in Auszügen, kommen sie mit `x: 1` in die Daten.

**Zustände**
- Hover, Fokus und Auswahl kehren den Rücken um: Fläche `--tinte`, Schrift und Zeichen `--papier`. Kein Anheben, kein Verschieben, kein Übergang (Rang 39).
- Bedienung mit der Tastatur wie in A: ein Rücken im Fokus, Pfeiltasten wechseln, Eingabe wählt, Escape hebt die Wahl auf.

**Oberstes Brett**
- Links das Manuskript von *Satoshi*, liegend: 297 mm breit (A4 quer) und 364 Blatt × 0,1 mm = 36 mm hoch, Kontur Tinte, darin „Satoshi“ aufrecht.
- Rechts davon, 2 z entfernt, die Bücher, die Dominik gerade liest, liegend als Stapel, das größte zuunterst, bündig ohne Versatz. Rückenschrift waagerecht. Passen sie nicht auf einen Stapel, zwei Stapel.
- Unter dem Brett steht „Manuskript“ unter dem Manuskript und „Lese ich gerade“ unter dem Stapel.
- Eigene Werke ohne Manuskript erscheinen nicht. Die Bände von *Ursprung*, die Erzählungen, *Untertext* und Länder bekommen keine Rücken (Rang 52).

**Fächer**
- Bis 1899, 1900–1945, 1946–1989, 1990–2009, seit 2010, geordnet nach dem Jahr der Erstausgabe. Danach Kindheit und Jugend, ebenso geordnet. Jedes Fach umbricht in so viele Bretter, wie es braucht.
- Unter jedem Brett eine Zeile im Grad klein, die die Jahresachse trägt: ein senkrechter Strich von 4 px und das Jahr, wo eine neue Jahreszahl beginnt und mindestens 5 em vom vorigen Strich entfernt ist. Jahre vor Christus mit „v. Chr.“.
- Wird ein Rücken gewählt, steht in dieser Zeile seine Buchzeile (12.8). Ohne Wahl kehrt die Achse zurück. Die Höhe der Zeile ist fest, nichts springt.
- Ohne Buchstützen, Schilder, Schuber, Bleistiftstriche, Lesezeichen, Muster und vorgezeichnete Umrisse (Rang 52, 57).

**Leseliste**
- Kein gezeichnetes Brett. Nach dem letzten Fach eine Überschrift „Leseliste“ und darunter die Bücher als Register in Textform, ein Eintrag je Zeile: „Michel Houellebecq, *Serotonin*“. Desktop zweispaltig, sonst einspaltig. Geordnet nach dem Jahr der Erstausgabe.

### 12.8 Buchzeile

Sie ersetzt die Karteikarte von A (B7, Rang 52). Es gibt keinen Kasten, keinen Karton, keine Signatur und kein „zurücklegen“.

- Eine Zeile im Grad klein, aufrecht, in Tinte, in der festen Zeile unter dem Brett oder unter dem Zeitband, linksbündig mit dem Regal.
- Feste Folge, leere Teile entfallen:
  1. Autor in der Form, die die Daten führen, Komma, Titel kursiv, Punkt.
  2. „Zuerst erschienen 1930.“ Bei Werken vor 1450 „Entstanden um 750 v. Chr.“ oder „Entstanden 1270.“ (Jahreswort wie `F.jahrText` in A).
  3. Verlag der gelesenen Ausgabe und Seitenzahl. „Rowohlt, 1040 Seiten.“
  4. Leseart, in dieser Reihenfolge: „Lese ich gerade.“, „In Auszügen gelesen.“, „Nicht zu Ende gelesen.“, „Mehr als einmal gelesen.“, „Eines der liebsten.“
- Beispiele:
  - „Homer, *Ilias*. Entstanden um 750 v. Chr. 560 Seiten. In Auszügen gelesen.“
  - „Robert Musil, *Der Mann ohne Eigenschaften I*. Zuerst erschienen 1930. Rowohlt, 1040 Seiten.“
  - Manuskript: „*Satoshi* (AT). Manuskript, 364 Normseiten.“ Der Titel ist Verweis auf `satoshi.html`.
- Auf dem Telefon darf sie umbrechen. Die Zeile hält dann Platz für zwei Zeilen frei.
- `aria-live="polite"`.

### 12.9 Zeitband

Das Zeitband zieht von der Startseite in die Bibliothek und steht dort als Übersicht über dem Regal, wie eine Übersichtskarte vor den Einzelblättern. Die Startseite wird damit zu einem einzigen Blatt und verliert die Schablonenfolge Vita, Werke, Bücher, Kontakt (Rang 42).

- Lage der Striche wie in A (`website/index.html`, Funktion `bandBauen`, Zeile 1045): Waagerechte nach Jahr der Erstausgabe mit gestauchten Strecken für die frühen Jahrhunderte, jeder Strich so breit wie sein Rücken, so hoch wie sein Buch im gemeinsamen Maßstab.
- Alle Striche in `--tinte-raster`. Das Band ist eine Übersicht und kodiert keine Leseart. Die Zeichen stehen im Regal darunter.
- Zwei Reihen auf einer gemeinsamen Achse: oben die Fächer nach Zeit, darunter Kindheit und Jugend mit dem Wort „Kindheit und Jugend“ im Grad klein über der Reihe. Die Leseliste steht nicht im Band.
- Achse: 1 px `--tinte`, Brüche als zwei kurze Schrägstriche, Jahreszahlen im Grad klein mit Versalziffern.
- Hover und Fokus färben den Strich `--tinte`, die feste Zeile unter dem Band zeigt die Buchzeile. Ein Klick springt zum Rücken im Regal und wählt ihn. Bei reduzierter Bewegung ohne weiches Scrollen.
- Kein Satz über das Band. Was es ist, sagen der Vorspann der Bibliothek und die Achse.
- Telefon: Das Band behält seinen Maßstab und lässt sich waagerecht wischen (`overflow-x: auto`). Es schiebt sich nie von selbst mit (B11).

### 12.10 Standortregister

- Die Fächer als Auswahlliste im Grad klein, zwischen Zeitband und Regal: bis 1899, 1900–1945, 1946–1989, 1990–2009, seit 2010, Kindheit und Jugend, Leseliste. Getrennt durch 1,5 em Abstand, ohne Mittelpunkt (Rang 3).
- Es haftet beim Scrollen oben wie ein Kolumnentitel. Dann trägt es den Grund `--papier` und unten eine Linie von 1 px `--tinte`. Das Fach, in dem man liest, steht halbfett.
- Ein Klick springt zum Fach.

### 12.11 Register und Chronologien

Wo der Inhalt wirklich ein Register oder eine Chronologie ist, gilt die Registerkonvention mit hängender Jahreszahl (Rang 55, B13).

- **Stationen in der Vita, Szenen auf *Satoshi*, Kapiteltage im Abschnitt Aufbau:** Die Jahreszahl hängt im Bundsteg, rechtsbündig, 0,5 em vor der Satzkante, im Grad des Eintrags. Ist der Bundsteg schmaler als 3 em (Tablet, Telefon), steht sie als eigene Zeile über dem Eintrag.
- **Station:** „Kaohsiung, Taiwan, vier Jahre als Lektor und freier Autor“, aufrecht, in Tinte. Nebenorte genauso groß und genauso dunkel wie Wohnorte. „längerer Aufenthalt“ steht als Wort da. Keine Koordinaten.
- **Szene:** Ort als Bedienwort, Komma, Dominiks Text. Während man liest, steht die Karte am Ort der Szene in der Lesehöhe, der Ort verliert seinen Strich.
- **Länderregister:** Je Kontinent eine Überschrift (`h2`, halbfett, Grad Text) und darunter die Länder als Auswahlliste im Fließsatz, durch Komma getrennt, ohne Strich. Ein Klick dreht die Kugel zum Land und wählt es. Der Kopf der Tafel zeigt den Namen. Auf dem Telefon rückt die Karte dabei ins Bild.
- **Bände von *Ursprung*:** Überschrift „Band I. Kreise ohne Wiederkehr“, darunter „Göbekli Tepe, um 8000 v. Chr.“ mit dem Ort als Bedienwort, dann Dominiks Text. Die Bandziffer steht in der Titelzeile, nicht im Rand.

### 12.12 Bilder

- Fotos stehen, wie Dominik sie liefert, in Farbe, ohne Filter, Rahmen, Schatten oder Rundung.
- Breite: die Satzspalte oder das Tafelfeld, nie die volle Fensterbreite.
- Legende darunter nach Abschnitt 10. Fotograf oder Fotografin in der Legende („Foto: …“), sobald bekannt (§ 13 UrhG).
- Vorhanden ist das Bootsfoto `bilder/dominik-jaekel-boot.jpg` auf der Vita. Weitere Fotos kommen nur von Dominik. Fehlt ein Foto, steht dort nichts. Es gibt keinen Platzhalter und keinen CSS-Nachbau (Rang 7, 44).

### 12.13 Fuß und Kolophon

Auf allen Seiten gleich, in der Satzspalte, 4 z unter dem letzten Inhalt, 2 z Fußsteg.

1. Grad Text: „Anfragen zu Lesungen und zu den Romanen: dominik.jd.jaekel@gmail.com“. Die Adresse ist der Verweis.
2. Grad klein, 0,5 z darunter: „Impressum und Datenschutz“, beide Wörter Verweise.
3. Grad klein, 0,5 z darunter: das Kolophon als Quellenangabe in Tinte (Rang 60). Dominik hat es gewünscht (Commit 8b57842). Wortlaut in Abschnitt 16.

Keine Überschrift, keine Adresse im Fuß. Die Anschrift steht im Impressum.

---

## 13. Seiten

| Seite | Aufbau |
|---|---|
| `index.html` | Kein Kopf. Satzspalte mit erstem Satz, Kurzvita, Inhaltsverzeichnis. Tafelfeld mit der Kartentafel, Karte Wohnorte, Chronik. Danach der Fuß. Sonst nichts |
| `satoshi.html` | Kopf. `h1` Satoshi, Dominiks Anfang (Hook) im Grad Text. Die Szenen als Chronologie in der Satzspalte, daneben die Tafel *Satoshi* (höchstens 30 rem, haftend, nur Kopf der Tafel, keine Legende, kein früher und später). Danach in der Satzspalte Klappentext, Aufbau mit den Kapiteltagen, Die Figuren, Warum dieser Roman, Vergleichstitel. Eckdaten im Tafelfeld neben dem Klappentext, im Grad Text |
| `ursprung.html` | Kopf. `h1` Ursprung, ein Vorspann. Die drei Bände untereinander, daneben die Tafel *Ursprung* (höchstens 30 rem, haftend, ohne Grenzen). Die Karte folgt dem Band, den man liest. Die Bände stehen vollständig da und erscheinen nicht nacheinander |
| `erzaehlungen.html` | Kopf. `h1` Erzählungen. Ohne Text: der Satz aus dem Inhaltsverzeichnis. Mit Texten: die Liste, je Eintrag Titel kursiv als Verweis, Untertitel, Datum im Grad klein |
| `untertext.html` | Kopf. `h1` Untertext. Ohne Text: „Sein Journal.“ Mit Texten: je Eintrag das Datum als `h2`, darunter der Titel als Verweis |
| `laender.html` | Kopf. `h1` Länder, darunter das Länderregister nach Kontinenten in der Satzspalte. Im Tafelfeld die Kartentafel mit Schraffur. Ein Länderguide erscheint als Verweis in der Legende der Tafel seines Lands, mit seinem Titel |
| `lesen.html` | Kopf. Eine Spalte. Titel als `h1` aufrecht, Untertitel im Grad Text, Datum und Ort im Grad klein. Absätze mit Einzug. Ein Szenenwechsel ist eine Leerzeile. Die Notiz am Ende im Grad klein. Darunter früher und später zum Nachbarn derselben Art und der Verweis zurück zur Liste |
| `bibliothek.html` | Kopf. `h1` Bibliothek, Vorspann in der Satzspalte, Zeichenerklärung im Tafelfeld auf der Grundlinie der letzten Vorspannzeile. Zeitband über die Breite von Satzspalte bis Tafelfeld. Standortregister. Oberstes Brett. Fächer. Kindheit und Jugend. Leseliste |
| `vita.html` | Kopf. `h1` Vita, Dominiks Vita in der Satzspalte. Im Tafelfeld `h2` Stationen als Chronologie, darunter das Bootsfoto mit Legende. Der erste Satz der Startseite steht hier nicht noch einmal (Rang 35) |
| `impressum.html`, `datenschutz.html` | Kopf. Eine Spalte. Der Entwurfsvermerk als erster Absatz im Grad klein, aufrecht, in Tinte. Überschriften `h2`. Inhalt wie in A, nur entfallen in der Datenschutzerklärung die Abschnitte zu Google Fonts und jsDelivr, weil B beides nicht nutzt |

---

## 14. Bewegung

Es gibt eine selbsttätige Bewegung, und sie erzählt etwas (Rang 6, 25, 56).

- **Chronik der Startseite:** Sie beginnt, sobald Schrift und Karte bereit sind. Die erste Station steht sofort da, ohne Wartezeit und ohne Auftritt. Jeder Flug dauert 1000 ms mit `d3.easeCubicInOut`, ohne Überschwingen (Rang 45). Bei weiten Sprüngen geht der Zoom kurz zurück, wie der Kern es tut. An jeder Station hält sie 2,6 s, der Weg bleibt stehen. Sie läuft einmal und endet in Berlin.
- Jeder Eingriff beendet sie: Ziehen, Zoomen, Tasten, ein Bedienwort, die Kartenwahl, früher oder später. Verlässt die Karte das Fenster, endet sie ebenfalls. Sie startet nicht von selbst neu.
- Die Karten *Satoshi* und *Ursprung* auf der Startseite fliegen auf Klick zur ersten Szene oder zum ersten Band. Weiter geht es mit früher und später. Wer wieder Wohnorte wählt, sieht den ganzen Weg und Berlin, ohne neue Chronik.
- **Auf Handlung des Lesers:** Flüge nach Klick auf ein Bedienwort, ein Land, eine Szene. Gleiche Dauer und Kurve.
- **An die Leseposition gebunden** (`F.leselinie` aus A): die Szenen auf *Satoshi*, die Bände auf *Ursprung*, das aktuelle Fach im Standortregister. Das bildet Inhalt ab und entführt den Scroll nicht.
- Auf *Satoshi* und *Ursprung* haftet die Tafel während der Szenen oder Bände. Desktop im Tafelfeld, `top: 2 z`. Tablet und Telefon über der Liste in `width: min(100%, 50svh)`. Nach der Liste löst sie sich.
- **Nicht erlaubt:** Ladeauftritt, Einblenden beim Scrollen, Hover-Lift, Schuber, Dauerrotation, Pendeln, Laufband, weiches Scrollen (`scroll-behavior` bleibt `auto`), CSS-Animationen und CSS-Übergänge. `@keyframes` und `transition` kommen in B nicht vor.
- **Reduzierte Bewegung** (`prefers-reduced-motion: reduce`): keine Chronik. Die Startseite zeigt den ganzen Weg und Berlin. Alle Flüge werden Sprünge. Springen zu Fach oder Rücken ohne Glätten.

---

## 15. Leere Zustände, Fehler, ohne Skript

- **Ohne JavaScript:** Alle Texte, die im HTML stehen, sind da. Im Kartenrahmen steht im Grad klein: „Die Karte braucht JavaScript. Die Stationen stehen in der Vita.“ mit „Vita“ als Verweis. Die Bücher stehen nur in `daten/buecher.js`. In der Bibliothek steht deshalb an Stelle von Zeitband und Regal: „Das Regal braucht JavaScript.“
- **Ohne d3 oder ohne Kartendaten:** derselbe Satz im Rahmen.
- **Schrift fehlt:** Die Seite fällt auf Baskerville oder Times zurück und bleibt lesbar.
- **Erzählungen und *Untertext* ohne Text:** nicht in der Navigation, im Inhaltsverzeichnis ohne Verweis. Die Seiten selbst zeigen Titel und einen Satz, ohne „Noch steht hier keine“ (B12).
- **Leseliste leer:** Die Überschrift entfällt mit.
- **Fehlende Datenfelder:** Die Buchzeile lässt den Teil weg. Ein Buch ohne Jahr steht am Ende seines Fachs, ohne Strich in der Achse.
- **Kein Treffer in einer Legende:** Das Feld bleibt leer. Es gibt keinen Ersatzsatz.

---

## 16. Texte

### Regeln

- Dominiks Texte bleiben Wort für Wort: der erste Satz, die Vita, Klappentext, Hook, Figuren, die Absätze zu Aufbau und Frage, die Bandtexte, die Szenen, die Stationen. Auch wo Merkmale der Liste darin stehen (B17). Vorschläge dazu bekommt er getrennt.
- Eine Stimme je Seite. Startseite, *Satoshi*, *Ursprung* und Vita in der dritten Person (Verlagskonvention). Bibliothek in der ersten Person. Register und Legenden ohne Person (Rang 61).
- Jedes Ding wird einmal gesagt. Keine Sätze über das Layout, keine Bedienhinweise für sichtbare Gesten, keine Absicherung (Rang 33, 59).
- Kein „nicht X, sondern Y“, keine Dreierreihe aus Gewohnheit, keine Pointe am Schluss, keine Tiefsinnsformel (Rang 16, 17, 34, 37).
- Jede Formel höchstens einmal auf der Website (Rang 35):

| Formel | einzige Stelle |
|---|---|
| „Das Manuskript liegt vollständig vor.“ | *Satoshi*, Eckdaten |
| „von Gilgamesch bis Labatut“ | Bibliothek, Vorspann |
| „in Arbeit“ | *Ursprung*, Vorspann, höchstens einmal |
| „Fünfundsechzig Länder und Gebiete“ | Startseite, Kopf der Tafel Reisen |
| „Werkstattbühne des Autorenforums Berlin“ mit vollem Namen | Kurzvita und Vita, je Seite einmal |

- Meta-Beschreibungen sind Sätze, nie „Name: Erklärung“ (Rang 32).
- Gestrichen ohne Ersatz: „Schriftsteller und Reisender“, „Ausführlich in der Vita.“, „Auf dem Globus: …“, „Eine Auswahl, längst nicht alles.“, „Es ist eine Auswahl und wird nie vollständig sein.“, „Zu jedem Rücken gibt es eine Karteikarte.“, „Oben steht …, darunter …“, die Legende des Zeitbands in fünf Sätzen, „390 km Luftlinie von Dortmund.“, „Hier lebt er heute.“, „Die meisten …, viele …, einige …, wenige …“, „Die Wohnorte und die ersten längeren Aufenthalte auf dem Globus.“

### Textbausteine zum Freigeben

Diese Mikrotexte schreibt B neu. Sie gelten, bis Dominik sie ändert.

| Stelle | Vorschlag |
|---|---|
| Titel der Startseite | Dominik Jäkel |
| Beschreibung der Startseite | Dominik Jäkel schreibt Romane. Sein Debüt Satoshi erzählt die Gründungslegende von Bitcoin. |
| Kurzvita | Er wurde 1995 in Dortmund geboren, studierte in Freiburg und am Hasso-Plattner-Institut in Potsdam und lebte vier Jahre in Kaohsiung auf Taiwan. Seit 2022 lebt er in Berlin und moderiert die Werkstattbühne des Autorenforums Berlin. Im selben Jahr erhielt er den A.-E.-Johann-Preis. |
| Inhalt, *Satoshi* | *Satoshi* (AT). Roman in vierzig Kapiteln, 364 Normseiten. |
| Inhalt, *Ursprung* | *Ursprung*. Drei Romane über die Anfänge der Zivilisation, begonnen in Kaohsiung. |
| Inhalt, Erzählungen | Erzählungen. Viele davon hat er auf der Werkstattbühne gelesen. |
| Inhalt, *Untertext* | *Untertext*. Sein Journal. |
| Inhalt, Länder | Länder. Die Länder und Gebiete, in denen er war, nach Kontinenten. |
| Inhalt, Bibliothek | Bibliothek. Die Bücher, die er gelesen hat. |
| Inhalt, Vita | Vita. |
| Kartenwahl | Wohnorte, Reisen, *Satoshi*, *Ursprung* |
| Tafel Wohnorte, Legenden | Dortmund: Geburtsort. Freiburg: Studium Liberal Arts & Sciences. Potsdam: Studium IT-Systems Engineering am Hasso-Plattner-Institut. Colombo und Cotonou: Freiwilligenprojekt mit AIESEC. Kaohsiung: Vier Jahre als Lektor und freier Autor. Berlin und Mallorca: leer |
| Tafel Wohnorte, Zeiträume | Dortmund 1995–2014, Freiburg 2014–2015, Potsdam 2015–2018, Colombo 2016, Cotonou 2018, Kaohsiung 2018–2022, Berlin seit 2022, Mallorca 2023. Die Enden sind aus den Daten abgeleitet und von Dominik zu bestätigen |
| Tafel Reisen, Kopf | Fünfundsechzig Länder und Gebiete |
| Tafel Reisen, Legende | Einunddreißig in Europa, neunzehn in Asien, elf in Afrika und vier in Amerika. |
| Tafel *Ursprung*, Legende Band I | Band I, *Kreise ohne Wiederkehr*. Der älteste Tempel der Menschheit, und warum er von Menschenhand begraben wurde. |
| Tafel *Ursprung*, Legenden II und III | nach demselben Muster aus `baende` in `daten/inhalt.js`, ohne den Teil mit Ort und Zeit |
| Bibliothek, Vorspann | Was ich gelesen habe, nach dem Jahr der Erstausgabe, von Gilgamesch bis Labatut. Kurzgeschichten und Anthologien trage ich noch nach. |
| Bibliothek, Zeichenerklärung | eines der liebsten, mehr als einmal gelesen, nicht zu Ende gelesen, in Auszügen gelesen |
| Bibliothek, oberstes Brett | Manuskript, Lese ich gerade |
| *Satoshi*, Überschriften | Klappentext, Eckdaten, Aufbau, Die Figuren, Warum dieser Roman, Vergleichstitel |
| *Satoshi*, Eckdaten, Stand | Das Manuskript liegt vollständig vor. Gerade entsteht die Endfassung. |
| *Satoshi*, Vergleichstitel | Dominiks Absatz aus dem Exposé vom August 2026, wörtlich. Er ersetzt den Abschnitt „Wie er gemacht ist“ |
| *Satoshi*, Beschreibung | Satoshi ist der Debütroman von Dominik Jäkel. Er erzählt die Gründungslegende von Bitcoin als Liebesgeschichte dreier Menschen. |
| *Ursprung*, Vorspann | Drei Romane über die Geburt der organisierten Religion am Göbekli Tepe, der Literatur in Uruk und der Heiligen Schrift in Jerusalem. In Taiwan begann Dominik Jäkels Beschäftigung mit der Frühgeschichte des Menschen und die Arbeit an der Trilogie. |
| Länder, Beschreibung | Die Länder und Gebiete, in denen Dominik Jäkel war, nach Kontinenten. |
| Vita, Bildlegende | Mit *Picknick am Wegesrand* der Brüder Strugatzki. Dazu „Foto: …“, sobald bekannt |
| Karte ohne Skript | Die Karte braucht JavaScript. Die Stationen stehen in der Vita. |
| Kolophon, alle Seiten | Website gesetzt aus der Baskervville des Atelier National de Recherche Typographique in Nancy, unter der SIL Open Font License 1.1, ergänzt um Minuten- und Sekundenstrich. Küsten und Grenzen nach Natural Earth, die bereisten Länder nach seiner Rubbelkarte. |
| Kolophon, Zusatz Bibliothek | Die Bücher nach seiner Liste bei Goodreads. |

Die Quellen für Dominiks Texte sind `website/*.html`, `website/daten/inhalt.js` und die Exposés in `scratchpad/pdf/`.

---

## 17. Technik

**Dateien in `website-b/`**
- Die elf HTML-Seiten mit denselben Namen wie in A.
- `stil.css`, das einzige Stylesheet, mit allen Tokens.
- `seite.js`, neu geschrieben. Übernommen werden dürfen aus `website/seite.js` nur Datenhelfer und Rechenwege: `F.buch` (Titel, Ordnung), `F.jahrText`, `F.texte`, `F.leselinie`, die Erkennung deutscher Rücken, die Regelbreite und -höhe der Rücken, `bandBauen` aus `website/index.html`. Kein Markup, keine Klassen, kein Aussehen aus A.
- `globus/kern.js`, kopiert und um die Zeichenart „druck“ erweitert (12.5).
- `daten/`: unveränderte Kopien aller Dateien aus `website/daten/`, dazu `daten/stationen.js` (12.6).
- `lib/d3.min.js` (7.9.0) und `lib/topojson-client.min.js` (3.1.0) als lokale Kopien, beide ISC-Lizenz. Kein CDN.
- `schrift/` mit beiden WOFF2 und `OFL.txt`.
- `bilder/dominik-jaekel-boot.jpg`.
- `werkzeuge/` mit `schrift.py` und einer eigenen Fassung von `artefakt.py`. Bleibt lokal.

**Regeln**
- Keine Anfrage an fremde Server. Prüfung im Browser: Netzwerkliste nach dem Laden jeder Seite.
- Keine seiteneigenen Farben, Größen oder Schriften (Rang 50).
- Kein `border-radius` außer dem Kreis der Kugel, kein `box-shadow`, kein `backdrop-filter`, kein Verlauf, kein `filter` (Rang 5, 41, 47, 64).
- Kein `transition`, kein `@keyframes`, kein `z-index` über 10.
- Erzählende Kommentare dürfen in den Quellen stehen, werden beim Veröffentlichen aber aus HTML, CSS und JS entfernt (Rang 67, B14). Ausgelieferte HTML-Kommentare gibt es nicht.
- Ausgeliefert wird nur, was zur Seite gehört. Kein README, keine Werkzeuge, keine Notizen (Rang 68).
- Barrierefreiheit: Sprungmarke „Zum Inhalt“, sichtbarer Fokus, `aria-current="page"` auf der aktuellen Seite, `aria-pressed` in der Kartenwahl, `aria-live` an Tafel und Buchzeile, Bedienung von Karte und Regal mit der Tastatur, Kontrast aller Texte mindestens 4,5 : 1. Das erfüllen `--tinte` und `--blau` überall.

**Veröffentlichen**
- B wird als eigenes Artefakt unter einem neuen Link veröffentlicht. A behält seinen Link. Dominik bekommt beide Links nebeneinander.

---

## 18. Was bewusst KI-typisch bleibt, und warum

| Rang | Merkmal | Wo in B | Warum es bleibt |
|---:|---|---|---|
| 9 | Serife bei einem Schriftsteller | überall | Eine Textschrift mit Herkunft und Grund, ohne Display-Geste, ohne kursives Akzentwort. Für einen Schriftsteller legitim, und die Schrift steht auf keiner Liste |
| 27 | Prunkstück, hier die Kugel | Startseite, *Satoshi*, *Ursprung*, Länder | Eigener Bau mit echter Projektion und echten Daten. Sie hat eine Aufgabe, die nur dieser Inhalt stellt, und lässt sich über Wörter bedienen. Sie dreht sich nicht von selbst und leuchtet nicht. Kein Fertigbaustein |
| 7 | Gezeichnet statt fotografiert | Karte, Regal, Zeitband | Hier tragen Daten die Geometrie, dafür ist Code-Zeichnung richtig. Fotos gibt es nur eines, weitere muss Dominik liefern |
| 51 | Haarlinien | Kartenrahmen, Kugelrand, Bretter, Achsen, haftendes Register | Jede trennt etwas, das Abstand nicht trennen kann. Keine Linien zwischen Textabschnitten |
| 26 | Gradzahlen und Maßstab | Kartenring, Zwickel unten rechts | Kartenrand und Maßstab benennen die gezeichneten Linien. Der Maßstab erscheint nur, wo er stimmt. Alle übrigen Koordinaten sind gestrichen |
| 1 | gesperrte Versalien | nur Ozeannamen auf der Karte | Kartenschrift. Die Sperrung zeigt die Ausdehnung der Fläche. Nie über Inhalten |
| 1 | Kapitälchen | nur Versalabkürzungen im Lauftext | Buchsatz nach Bringhurst. Nie als Label, nie im Kopf, nicht auf Rücken |
| 55 | hängende Jahreszahl | Stationen, Szenen, Kapiteltage | Echte Chronologien, Registerkonvention. Nicht als Abschnittskopf |
| 53 | Unterstreichung | Verweise und Bedienwörter | Im Werkszustand des Browsers und nur, wo man klicken kann |
| 60 | Kolophon | Fuß | Dominiks Wunsch und eine Quellenangabe in Tinte: Schrift, Gießerei, Lizenz, Änderung, Kartendaten |
| 56 | an das Scrollen gebunden | Szenen, Bände, aktuelles Fach | Bildet ab, was man gerade liest, und entführt den Scroll nicht |
| 25, nah | Bewegung ohne Klick | Chronik der Startseite | Gehört zum Inhalt, einmal, ohne Auftritt, endet beim ersten Eingriff und fehlt bei reduzierter Bewegung |
| 57, nah | Schraffur | bereiste Länder | Einfarbiger thematischer Druck mit Bedeutung, keine simulierte Handarbeit |
| 52, nah | gezeichneter Gegenstand | Manuskriptstapel, Rücken | Datenzeichnung aus Blattzahl, Seitenzahl und Bindung, ohne Textur, ohne Zierrat |
| 19, nah | Blau | nur auf Karten | Opus 5.5 wählt oft Blau als Akzent. Hier ist Blau die zweite Druckplatte für Wasser und Gradnetz, wie auf jeder topografischen Karte. Es erscheint nie in Text oder Bedienung |
| 14, 42 | Text links, Bild rechts | Startseite, Länder | Folgt aus dem Inhalt, einem Blatt mit Karte. Auf *Satoshi* und *Ursprung* ist die Karte kleiner, damit nicht vier Seiten dieselbe Silhouette haben |
| 16 | drei Glieder | Kurzvita, erster Satz | Drei Tatsachen in der Form einer Verlagsvita. Der erste Satz ist Dominiks |
| 16, 17, 34, 36, 37 | Textmerkmale | in Dominiks Texten | Sie bleiben unverändert, weil es seine Texte sind. Vorschläge bekommt er getrennt (B17) |

Ziel für die Prüfung: höchstens vier dieser Merkmale je Bildschirm. Auf der Startseite sind das 9, 26, 27 und 51 (A: 17). In der Bibliothek 7, 9, 51 und 56, dazu 52 teilweise für den Manuskriptstapel (A: 11).

---

## 19. Was gegenüber A entfällt

- IM Fell French Canon und der einfliegende erste Satz.
- Alle Kapitälchen-Labels, der gesperrte Name im Kopf, die Kapitälchen der Figurennamen und der Kontinente.
- Die Tagline „Schriftsteller und Reisender“.
- Siena, Karton, Creme und alle warmen Flächen, die beigen Länder auf der Kugel.
- Alle sieben Grautöne für Text und die 16 festen Farbwerte ohne Token.
- Kursive Ortsnamen, die Stationenzeile nach Joyce, Koordinaten in Vita und Tafel, die Luftlinie.
- Die Karteikarte mit Signatur, das Regalbild der Startseite, Bleistiftstriche, Lesezeichen, Buchstützen, Schuber, Inselmuster, vorgezeichnete Umrisse der Leseliste, Regalschilder.
- Verlagsfarben und jede Streuung per Hash.
- Hover-Lift, das Mitschieben des Zeitbands auf dem Telefon, die Überblendung der Bände, der Schalter „Inhalt“.
- Das „feine“ Rezept der Unterstreichung, die unterstrichene Navigation, das unterstrichene Länderregister.
- Google Fonts per Link, d3 und topojson vom CDN, ausgelieferte erzählende Kommentare.
- Erzählungen und *Untertext* in der Navigation, solange sie leer sind.
- Zwölf Schriftgrade auf der Startseite, jetzt drei.

---

## 20. Abnahme

Vor der Übergabe prüfen die Bauenden jede Seite mit Playwright bei 1440 × 900, 1024 × 768 und 390 × 844 (doppelte Pixeldichte). Messung mit `ki-pruefung/messen.cjs`, angepasst auf `website-b/`.

| Prüfung | Soll |
|---|---|
| Anteil grauer Zeichen im ersten Bildschirm und auf der ganzen Seite | 0 % |
| Textfarben im HTML | genau eine, `#141414` |
| Schriftgrade im HTML je Seite | höchstens drei |
| Schriftfamilien | genau eine |
| kursive Zeichen ohne Werktitel, Fremdwort oder Zitat | 0 |
| Semikolons, Mittelpunkte, Pfeile, Geviertstriche in Mikrotexten | 0 |
| unterstrichene Elemente im ersten Bildschirm der Startseite | höchstens 12 |
| `border-radius` außer Kugel, `box-shadow`, `backdrop-filter`, Verläufe | 0 |
| `transition`, `@keyframes` | 0 |
| Anfragen an fremde Server | 0 |
| Kontrast aller Texte | mindestens 4,5 : 1 |
| Formeln aus Abschnitt 16 | je einmal |
| Merkmale der Liste je Bildschirm | höchstens vier, nur die aus Abschnitt 18 |
| reduzierte Bewegung | keine Chronik, keine Flüge |
| ohne JavaScript | alle Texte da, Satz im Kartenrahmen |
| Tastatur | Karte, Kartenwahl, Regal, Zeitband und Register bedienbar, Fokus immer sichtbar |
| alle elf Seiten nebeneinander | gleicher Kopf, gleicher Fuß, gleiche Grade und Abstände |

Dazu der **Silhouettentest**: der erste Bildschirm jeder Seite auf 200 px Breite, schwarzweiß, neben fünf andere Autorenseiten. Dafür fehlt noch ein Vergleichssatz. Dominik kann fünf Seiten von Autorinnen und Autoren nennen, die er kennt.

Und an jede Entscheidung die Frage aus Anthropics Skill: „would you have arrived here for any similar page?“ Wo die Antwort ja ist, kommt Inhalt hin und kein neues Ornament.

---

## 21. Was Dominik entscheiden muss

1. Ob ihm der stehende erste Satz in B gefällt. A behält den einfliegenden.
2. Die Textbausteine aus Abschnitt 16, vor allem Kurzvita, Inhaltsverzeichnis und Tafellegenden.
3. Ob „(AT)“ und „364 Normseiten“ auf die Startseite dürfen.
4. Ob das Zeitband in der Bibliothek bleibt. Will er es auf der Startseite, steht es unter dem Blatt, ohne Überschrift, mit „Bibliothek“ als Verweis.
5. Ob die Koordinaten fehlen dürfen. Will er sie, stehen sie im Kopf der Tafel im Grad klein, und der Ring verliert seine Gradzahlen.
6. Ob im Regal nur das Manuskript von *Satoshi* steht und die Bände von *Ursprung* erst mit ihrem Manuskript dazukommen.
7. Ob die Rubriken „Lese ich gerade“, „Kindheit und Jugend“, „Nicht zu Ende gelesen“ und „Leseliste“ seine Wörter sind.
8. Ob „Vergleichstitel“ aus dem Exposé den Abschnitt „Wie er gemacht ist“ ersetzt, und ob der Satz „Nicht ein einzelner Skandal, sondern …“ von ihm stammt.
9. Welche Fotos es gibt und wer das Bootsfoto gemacht hat.
10. Welche der 39 Bücher deutschsprachiger Autoren er auf Deutsch gelesen hat (B15). Preußler wird sofort berichtigt.
11. Ob Erzählungen und *Untertext* bis zum ersten Text aus der Navigation bleiben.
12. Ob die Formulierung „nach seiner Rubbelkarte“ im Kolophon stimmt. Argentinien, Uruguay und das Westjordanland kamen nachträglich dazu.

---

## 22. Ungeprüftes und Grenzen

- Die Herkunft von Baskervville stammt aus dem Artikel der ANRT in der Schriftbibliothek von Google Fonts, gelesen von der Richtung Verlag. Die Verbindung zur Kehler Voltaire-Ausgabe ist nicht geprüft und erscheint deshalb nicht auf der Website.
- Dass Kupferstichkarten in solchen Antiquas und Kursiven beschriftet sind, ist allgemeines Wissen, hier nicht belegt. Kursiv und Blau für Gewässer belegt die Quelle der Richtung Atlas (UNBC, Lettering 2025).
- Die Reihenfolge der Namenslagen nach Imhof (1975) kennt die Richtung Atlas nur aus Sekundärquellen.
- Die Blattstärke von 0,1 mm ist ein Näherungswert für 80-g-Papier. Die Normseite mit 30 Zeilen zu 60 Anschlägen ist die übliche Verlagsdefinition.
- GFS Didot als griechische Ergänzung ist ein Vorschlag, nicht geprüft.
- Der Silhouettentest fehlt noch, wie schon im Audit.
- Auch diese Regeln beschreiben den Stand vom Oktober 2026. Was heute selten ist, kann im nächsten Jahr der Standard sein.

---

## Anhang: Muster und Dateien

Alle Pfade unter `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/`.

**Verlag**, Schrift und Satzspiegel
- `ki-richtung-verlag/b-muster/stil-b.css` (Raster, Grade, `@font-face`)
- `ki-richtung-verlag/b-muster/schrift/baskervville-antiqua.woff2`, `baskervville-kursiv.woff2`, `OFL.txt`
- `ki-richtung-verlag/skripte/schrift.py`
- `ki-richtung-verlag/probe/schriften.png`
- `ki-richtung-verlag/shots/r3-start-desktop.png`, `r3-start-telefon.png`, `r3-bibliothek-desktop-ilias.png`

**Atlas**, Karte und Register
- `ki-richtung-atlas/mockup/karte.js` (Zweifarbendruck, Ring, Schraffur, Gewässernamen, Maßstab)
- `ki-richtung-atlas/mockup/start.html` (Zwickel mit Aussparung, Außenlage)
- `ki-richtung-atlas/mockup/atlas.css`, `regal.js`
- `ki-richtung-atlas/shots/r6-d-start-station5.png`, `r6-d-start-ebenereisen.png`, `r7-d-start-ebeneursprung.png`, `r6-t-start-station5.png`, `r6-d-bibliothek.png`

**Werkstatt**, Tafel und Regal nach Leseart
- `ki-richtung-werkstatt/mockup/start.html`, `bibliothek.html`
- `ki-richtung-werkstatt/shots/r6-d-start-schirm.png`, `r6-d-start-satoshi-schirm.png`, `r6-d-bibliothek-schirm.png`

**Version A und Prüfung**
- `website/index.html` (`bandBauen`, Zeile 1045), `website/seite.js` (`leselinie`, Zeile 897), `website/globus/kern.js`
- `ki-pruefung/messen.cjs`, `ki-pruefung/shots/`

**Wertung**
- `ki-jury/wertung.txt`
