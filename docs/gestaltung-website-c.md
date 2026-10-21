# Gestaltung von Version C

Stand: 21. Oktober 2026, nachts. Dieses Dokument ist verbindlich für alle, die `website-c/` bauen. Was hier nicht geregelt ist, bleibt wie in A (`website/`).

**Quellen und Kürzel**

- **Auftrag:** Dominiks Auftrag für C mit den Nachträgen 1 bis 3 (`scratchpad/lauf3/auftrag-dominik.txt`).
- **V01 bis V72:** seine Vorgaben (`docs/dominik-vorgaben.md`).
- **M1 bis M9:** seine Entscheidungen (`docs/mischfassung-entscheidungen.md`).
- **R1 bis R16:** Regeln aus den Vergleichsseiten (`docs/referenzen-c.md`).
- **E01 bis E28 und E14b:** die 29 Elemente, **F1 bis F30:** die Fragen (`docs/aenderungen-website-b.md`).
- **Rang 1 bis 68:** die KI-Merkmale (`docs/ki-merkmale.md`).
- **Prüfung:** `docs/pruefung-website.md`. **Regeln B:** `docs/gestaltung-website-b.md`.

Pfade ohne Ordner beziehen sich auf `website-c/`. „scratchpad/“ steht für `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/`.

---

## 1. Grundsatz und Rangfolge

### Rangfolge bei jeder Entscheidung

1. **Dominiks Vorgaben** (V01 bis V72, M1 bis M9, die Nachträge im Auftrag). Spätere gehen vor früheren. Eine Abweichung braucht einen sehr guten Grund, und der steht dann hier.
2. **Seine Texte.** Exposés, Vorhabensbeschreibung, seine Vita, alles, was er bei *Satoshi* und *Ursprung* geschickt oder gestrichen hat. Sie bleiben. Nur Tippfehler werden korrigiert (V61, V62). Wo sie stehen: `dominik-vorgaben.md`, Übersicht 1.
3. **Wie die besten vergleichbaren Seiten es machen** (R1 bis R16).
4. **Erst dann die KI-Merkmale.** Ein KI-typisches Element bleibt, wenn es deutlich eleganter, gebräuchlicher oder besser zu bedienen ist (V03). Weg kommen die vielen kleinen Markierungen: graue Kursive, gesperrte Etiketten, Randbemerkungen ohne Inhalt, Metazeilen, Requisiten, ungleiche Abstände.

### Was C ist

- **Die Anmutung von A:** Vollkorn, Papierweiß und Graphit, die große angeschnittene Kugel, die Chronik, das farbige Regal, das Zeitband auf der Startseite (V02).
- **Das Zoomen von B:** grob in Bewegung, fein in Ruhe, Namen auch beim Bewegen (V26, M1).
- **Ohne die Mikromarker:** eine Tinte für allen Text, Nebentext nur eine Stufe kleiner, Kursive nur für Titel, ein Abstandsraster (V03).
- **Der erste Eindruck:** souverän, literarisch, mit Freude gemacht. Nicht süß, nicht steif (M9). Faustregel: Ein verspieltes Element bleibt, wenn es präzise gemacht ist und etwas Echtes zeigt, also echte Orte, echte Bücher, echte Wege. Es geht, wenn es nur dekoriert.

### Texte, die eine Gestaltungsentscheidung mitbringt

Claudes Texte ändern sich nur bei deutlicher Verbesserung, und jede Änderung steht mit Vorher und Nachher in `docs/text-aenderungen-c.md` (V62, Zusage vom 21.10.). Das gilt auch für Wörter, die durch eine Entscheidung in diesem Dokument wegfallen oder neu entstehen. Solche Stellen sind hier mit **Text:** markiert. Die Texter tragen sie in die Liste ein.

### Fakten, die feststehen

- Kein Hinweis auf das Ende von *Satoshi* (V37). Fort Meade bleibt draußen (V31).
- Keine Einzelheiten zum Ghostwriting, kein *Wall Street Journal*, keine FAZ, kein *Harvard Business Manager*, kein Perry Rhodan, kein Capsule, keine Döblin-Bewerbung (V72).
- Simon-Kucher nur in der Vita (V56). Die Trilogie heißt nur „in Arbeit“ (V38).
- Keine privaten Lesenotizen, keine Buchzahlen, keine Zahl 67, kein „Untertagebuch“, keine neuen persönlichen Fakten (V46, V48, V21, V11, V70).
- Anschrift und E-Mail genau wie in A (V67). Buenos Aires 2026, Sansibar 2025, Kapstadt 2024 (V28).

### Spielraum beim Bau

- Die Zahlen hier sind Sollwerte. Zeigt der Test an einer Stelle einen sichtbaren Fehler (Umbruch, Überlappung, Ruckeln), darf der Bau den Wert um eine Rasterstufe oder höchstens 20 % ändern. Jede Abweichung steht mit Grund in `werkzeuge/aenderungsprotokoll.md`.
- Von Dominiks Vorgaben und seinen Texten weicht der Bau nicht ab.

---

## 2. Die 29 Elemente

### Auf einen Blick

| Nr. | Element | Wahl | Kern | Quelle |
|---|---|---|---|---|
| 01 | Schriftfamilie | A, selbst ausgeliefert | Vollkorn mit Kapitälchen aus einer Datei, IM Fell nur für den ersten Satz | V02, V64, E01 |
| 02 | Erster Satz | A, kürzer | fliegt in 1,0 s ein, 38 px, Globus wartet nie | **V13 vor E02, F2** |
| 03 | Graue Kursive | B in der Gestalt von A | Nebentext aufrecht, Tinte, eine Stufe kleiner, Koordinaten bleiben | V03, R3, R4, **V29 vor F18** |
| 04 | Kapitälchen | Mittelweg, streng | nur Stichwörter in Verzeichnissen | Rang 1, R6 |
| 05 | Textfarben | Mittelweg | eine Tinte, ein Grau nur für Zustände | R5, E05 |
| 06 | Schriftgrade | Mittelweg | vier Grade von A, dazu der Einstieg | R1, M9 |
| 07 | Unterstreichung | B, feine Linie | 1 px in voller Tinte, Listen ohne Strich | R8, F30 |
| 08 | Farbwelt | A ohne Siena | Papierweiß, Graphit, kühles Grau auf der Karte | V05, E08 |
| 09 | Globus | A mit fünf Änderungen | kühles Grau, aufrechte Namen, kein Hof | E09, M9, V27 |
| 10 | Zoomen | B (entschieden) | Datenregel, Namen in Bewegung, ein Finger dreht | M1, V26 |
| 11 | Chronik | neu | Einspieler, dann selbst steuern | **V22, M7 vor B** |
| 12 | Tafel | A mit Zeichen aus B | große Jahreszahl, ohne Luftlinie | V19, V20, V29 |
| 13 | Kartenwahl | A, ruhiger | vier unterstrichene Wörter, Gewähltes halbfett | E13 |
| 14 | Übrige Bewegung | Mittelweg | kein Heben unter der Maus, Herausziehen beim Klick | **V53, V23 vor E14** |
| 14b | Abstecher | B (bestätigt) | hin und zurück vom Wohnort | M5, M6 |
| 15 | Aufbau Startseite | A | Text links, Kugel rechts, Zeitband | V02, V18 |
| 16 | Kopf, Navigation | A, ruhiger | Tagline bleibt, Navigation offen auf dem Telefon | **V14 vor E16, F7** |
| 17 | „Was ich schreibe“ | A | ruhige Überschrift, Liste von A | V17 |
| 18 | *Satoshi* | neu | Zeitleiste am Globus, Klappentext direkt darunter | **V32, M3 vor F15** |
| 19 | *Ursprung* | Mittelweg | Flüsse, keine Grenzen, langsames Entfalten | **V23 vor F17** |
| 20 | Fuß | A ohne „Kontakt“ | Tinte, Newsletter-Zeile wie A | V64, V67 bis V69 |
| 21 | Regal | Mittelweg | Farben und Form von A, Requisiten weg | **V53 vor E21** |
| 22 | Buchzeile | B als Satz | ein Satz unter dem Brett | F19 |
| 23 | Zeitband | A | Startseite, ohne Mitschieben | V18, F14 |
| 24 | Leseliste | B in A | Liste mit Titel und Autor, Nachttisch bündig | V48, V49 |
| 25 | Länder | A | Register mit Kapitälchen, Strich nur beim Zeigen | V65, F5 |
| 26 | Vita | A mit Stationen von B | Foto größer und oben, Koordinaten bleiben | V55 bis V59, **V29 vor F18** |
| 27 | Kleine Seiten | A in Tinte | keine Koordinaten unter Erzählungen | E27, V66 |
| 28 | Technik | B | alles vom eigenen Server, Bau ohne Kommentare | E28 |

Fett in der Spalte „Quelle“ heißt: Dominiks Vorgabe geht hier der Empfehlung im Vergleichsdokument vor.

### 01. Schriftfamilie

**Wahl:** A, selbst ausgeliefert (Mittelweg der Empfehlung).

**Umsetzung:**
- Vollkorn 5.001 von Friedrich Althausen für allen Text außer dem ersten Satz. Variable Schrift, Gewichtsachse auf 400 bis 600 begrenzt. Zwei Dateien: aufrecht und kursiv.
- Die Kapitälchen kommen aus derselben Datei (OpenType `smcp` und `c2sc`). Geprüft in dieser Nacht: Die vollständige Vollkorn aus dem Archiv von Google Fonts auf GitHub enthält sie. Nur die Teilmenge, die die Google-Fonts-API ausliefert, hat sie nicht. Die Vollkorn SC entfällt damit (beantwortet F1). Die Kursive hat keine Kapitälchen.
- IM Fell French Canon Roman von Igino Marini nur für den ersten Satz, auf der Startseite und in der Vita.
- Fertige, im Browser geprüfte Dateien liegen in `scratchpad/lauf3/schrift-c/`: `vollkorn.woff2` (57 KB), `vollkorn-kursiv.woff2` (48 KB), `im-fell-french-canon.woff2` (45 KB), `OFL-Vollkorn.txt`, `OFL-IM-Fell-French-Canon.txt`. Sie kommen nach `schrift/`. Laden und Teilmenge: Abschnitt 8.1.

**Grund:** Die Vollkorn trägt die Anmutung, die Dominik an A mag (V02), und steht auf keiner Liste (Prüfung, Rang 31). Das Kolophon nennt beide Schriften in seinem Wortlaut (V64), es bleibt damit wahr. Selbst ausliefern löst Rang 48 und den Datenschutz (E28).

### 02. Der erste Satz

**Wahl:** A, kürzer. **Dominiks Vorgabe geht vor:** Er hat „Einstieg einfliegend“ gewählt (V13). E02 und F2 empfahlen den stehenden Satz.

**Umsetzung:**
- Wortlaut unverändert, drei Glieder, jedes Glied eine Zeile: „Dominik Jäkel schreibt tagsüber / unter fremden Namen / und abends unter seinem eigenen.“
- IM Fell French Canon, Grad Einstieg: 38 px, Zeilenhöhe 1,5 z (42,75 px), Tinte. Das längste Glied ist in dieser Größe 557 px breit. Ist die Spalte schmaler, wird die Schrift kleiner, bis das Glied passt, am Desktop nicht unter 28,5 px, am Telefon nicht unter 20,7 px. Darunter bricht der Satz frei (die Logik `setzen()` aus A bleibt).
- Einflug Wort für Wort von rechts wie in A, aber kürzer: Weg 0,2 em (A: 0,3 em), je Wort 360 ms (A: 640 ms), 40 ms Versatz (A: 80 ms), 100 ms Pause zwischen den Gliedern (A: 230 ms), waagrechte Unschärfe höchstens 0,06 em, die beim Ankommen vergeht. Easing `cubic-bezier(.22, .7, .28, 1)`, kein Nachfedern. Gesamtdauer rund 1,0 s (A: 1,8 s).
- Der Flug beginnt, sobald die IM Fell geladen ist. Sie wird vorgeladen. Gewartet wird höchstens 600 ms (A: 2,5 s). Ist sie dann nicht da, steht der Satz ohne Flug. Der Platz für drei Zeilen ist von Anfang an reserviert, nichts springt.
- Der Globus wartet nie auf den Satz (11).
- Bei jedem Laden der Startseite. Bei reduzierter Bewegung steht der Satz sofort.
- Vorleseprogramme lesen den Satz einmal als Ganzes (die Vorlesekopie aus A bleibt).
- Vita: derselbe Satz steht ohne Bewegung in der IM Fell, im Grad groß (28,5 px).

**Grund:** V13 und Claudes Zusage: Der Satz fliegt weiter ein, kürzer, ohne den Globus zu blockieren. Die Größe folgt Nachtrag 2 („größere, selbstbewusste Typografie im ersten Bildschirm“, M9). R1 hatte 28,5 px vorgeschlagen. Rang 25 bleibt bewusst, abgemildert durch die kurze Dauer und den freien Globus.

### 03. Graue Kursive als zweite Stimme

**Wahl:** die Regel von B in der Gestalt von A. **Dominiks Vorgabe geht vor:** Die Koordinaten bleiben (V29). F18 hatte empfohlen, sie nur an der Tafel zu zeigen.

**Umsetzung:**
- Nebentext hat ein einziges Mittel: Er ist eine Stufe kleiner (Grad klein, 15,4 px), aufrecht, in der Tinte. Kein Grau, keine Kursive als Nebenstimme.
- Ortsnamen stehen überall aufrecht, auch auf dem Globus. Heute stehen sie in `seite.js` als `italic 15px "Vollkorn"` (Zeile 199 und 352).
- Nebenorte (Colombo, Cotonou, Mallorca, Kapstadt, Sansibar, Buenos Aires) stehen so groß und so dunkel wie die Wohnorte. Was sie sind, sagen das Wort „längerer Aufenthalt“ und das offene Kartenzeichen.
- Koordinaten bleiben an der Tafel aller Globen, in den Stationen der Vita und bei den Bänden von *Ursprung*. Grad klein, aufrecht, Tinte, Mediävalziffern.
- Kursiv nur nach Abschnitt 3.4.

**Grund:** Das Merkmal, das Dominiks Freund bemerkt hat, die wirksamste Einzeländerung (E03, Rang 24 aus 8, 11, 3, 26). R3 und R4 folgen der strengeren Gruppe der Vergleichsseiten (Tufte, Resilient Web Design, Republik). Die Koordinaten hat Dominik gelobt und selbst geprüft (V29).

### 04. Kapitälchen-Labels, Name, Figuren, Kontinente

**Wahl:** Mittelweg, strenger als die Mischfassung: Kapitälchen an genau einer Sorte Stelle.

**Umsetzung:**
- Abschnittsüberschriften aufrecht, normale Schreibung, Grad Überschrift (23,75 px), Gewicht 400, ohne Sperrung.
- Der Name im Kopf in der gewöhnlichen Vollkorn, ohne Sperrung (F4, Standardentscheidung 3).
- „Wohnort“ und „längerer Aufenthalt“ an der Tafel als normale Wörter.
- Kapitälchen nur für das Stichwort am Anfang eines Verzeichniseintrags: die Figurennamen auf *Satoshi* und die Kontinente im Länderregister. Umsetzung `font-variant-caps: small-caps; letter-spacing: .04em`, der Anfangsbuchstabe bleibt groß. Sonst nirgends: nicht im Kopf, nicht über Abschnitten, nicht auf Rücken, nicht auf Regalschildern, nicht an der Tafel, nicht für Abkürzungen.

**Grund:** Rang 1 ist das häufigste Merkmal. Jede gemessene Vergleichsseite nutzt Versalien oder Kapitälchen an genau einer Sorte Stelle (R6). Personenverzeichnis und Register sind Buchsatz (E04, F5).

### 05. Grautöne und Textfarben

**Wahl:** Mittelweg der Prüfung.

**Umsetzung:**
- `--tinte` #1D1E21 für allen Text. Das Schwarz #0A0B0D aus A geht darin auf. Was A schwarz hervorhob (aktuelle Seite, gewählte Wörter), steht halbfett.
- `--leise` #6B6D72 (5,1 : 1) nur für Zustände: das nicht verfügbare „früher“ oder „später“, ein abgeschaltetes Bedienwort. Nie für Text, den man lesen soll.
- Die übrigen vier Grautöne von A entfallen (#47494E, #7C7E83, #96989C, #A2A4A7).
- Alle Farben sind Token in `stil.css` (Abschnitt 4). Feste Farbwerte stehen sonst nur in der Farbtabelle des Globus (`FARBEN` in `seite.js`) und in den Rückenfarben (`FAMILIEN` in `bibliothek.html`). Beide übernehmen die Werte aus Abschnitt 4.

**Grund:** Rang 29, 11 und 50. R5: Tufte und Resilient Web Design kommen ohne Grau aus, Republik und Standard Ebooks mit genau einem.

### 06. Schriftgrade und Rhythmus

**Wahl:** Mittelweg: die vier Grade auf der Skala von A, dazu der Grad Einstieg nur für den ersten Satz der Startseite.

**Umsetzung:** Tabelle in Abschnitt 3.2. Im ersten Bildschirm jeder Seite stehen höchstens fünf Grade. Zeichnungen (Kartenschrift, Rückenschrift) zählen nicht mit.

**Grund:** R1 und E06 (13 Grade in A, 3 bis 5 bei den Vergleichsseiten). Der fünfte Grad folgt aus M9 und Nachtrag 2.

### 07. Unterstreichung der Verweise

**Wahl:** die Menge aus B, die Linie als 1 px in voller Textfarbe (F30, zweite Fassung).

**Umsetzung:**
- `text-decoration-thickness: 1px; text-underline-offset: .12em; text-decoration-color: currentColor; text-decoration-skip-ink: auto`.
- In Ruhe unterstrichen: Verweise im Text, die E-Mail-Adresse, die vier Wörter der Kartenwahl, Bedienwörter im Satz, die Steuerwörter (früher, später und das Steuerwort, 6.4), „Eintragen“.
- In Ruhe ohne Strich: Navigation, Name im Kopf, Ortsleisten an den Globen, Länderregister, Standortregister der Bibliothek, Leseliste. Der Strich erscheint unter der Maus und beim Tastaturfokus, sofort, ohne Übergang.
- Auf Geräten ohne Maus (`@media (hover: none)`) bleibt der Strich bei Ortsleisten und Registern stehen, damit man sieht, dass man tippen kann.
- Gewählt oder aktuell: halbfett, ohne Strich.

**Grund:** Rang 53. R8 (Tufte: 1 px in Textfarbe, Navigation ohne Strich bei brandur und Resilient Web Design). Im ersten Bildschirm der Startseite stehen damit rund 7 Striche statt 20.

### 08. Farbwelt

**Wahl:** A ohne Siena, Creme, Karton und Beige, ohne das Blau von B.

**Umsetzung:**
- Papierweiß #FFFEFC bleibt (F30, Standardentscheidung 11).
- Siena fällt überall weg: Titel, Bandziffern, Rücken, Muster, Zeitband, Globus.
- Eigene Werke erkennt man an der Stellung (zuerst im Werkverzeichnis, rechts am Ende des Zeitbands, oben im Regal) und am kursiven Titel.
- Eigene Rücken weiß mit Kontur in Tinte. Bereiste Länder in kühlem Hellgrau (09).
- Kein Farbakzent. V05 erlaubt einen Akzent für Orte, C nutzt ihn nicht (Standardentscheidung 13).

**Grund:** Rang 2 und 10, Anthropics eigene Farbfamilie (E08). Dominiks Wahl „Weiß & Graphit“ (V05). M9: keine Pastellfläche als Hauptton.

### 09. Der Globus

**Wahl:** die Kugel von A mit fünf Änderungen.

**Umsetzung:**
1. Bereiste Länder #C4C7CC statt Beige #DBD5CB. Der Abstand zum übrigen Land steigt von 1,29 : 1 auf 1,53 : 1. Dominik muss sie deutlich sehen (V27).
2. Weg und Punkte überall in Tinte.
3. Ortsnamen aufrecht, 15 px (Telefon 14 px), mit 4 px Freistellung in Papier.
4. Der Weg mit Abstechern (14b).
5. Kein Hof um die Punkte (`akzentHauch` entfällt). Der gewählte Ort bekommt einen Ring: 1 px Tinte, Radius 6,5 px.

Bleibt wie A: angeschnitten am rechten Fensterrand, Größe aus der Fensterhöhe, Wasser in Papier, Kugelrand 1 px Tinte, kein Pendeln. Nicht aus B: Rahmen, leerer Ring, Blauplatte, Schraffur, gestrichelte Grenzen, Gewässernamen. Farben und Linienstärken in Abschnitt 4.

**Grund:** E09 empfiehlt die Kugel von A mit kleinen Änderungen. M9: präzise statt niedlich, feine Linien, wenige und ruhige Beschriftungen.

### 10. Zoomen und Kartendetail

**Wahl:** die Technik aus B, das Aussehen von A (entschieden, M1, V26).

**Umsetzung** in `globus/kern.js` (Grundlage ist der Kern von A):
1. Datenregel aus B: `const daten = () => fein && k > 1.8 && !bewegt ? fein : grob;` statt A, Zeile 111, `(fein && (k > 1.8 || !bewegt)) ? fein : grob`.
2. Namen auch in Bewegung: beim Bewegen schlichte Namen an sechs Lagen um den Punkt (wie B), in Ruhe die Namensblöcke von A.
3. Gradnetz wird mit dem Zoom dichter, Schritte wie B: unter 1,6-fach alle 30°, unter 4-fach alle 10°, unter 9-fach alle 5°, darüber alle 2°. Farbe #ECEDEE, 0,5 px.
4. Telefon: Ein Finger waagrecht dreht die Kugel, senkrecht scrollt die Seite, zwei Finger zoomen (B, `kern.js` Zeile 461 bis 495).
5. Feste Flugdauer 1,0 s, Europa 3,6-fach.
6. Ruhebild 220 ms nach der letzten Bewegung, fein erst ab 1,8-fach.
7. Kein `willReadFrequently`.

**Text:** Der Hinweis „Zwei Finger zum Drehen und Zoomen“ muss zur neuen Geste passen, denn ein Finger dreht jetzt waagrecht. Die Texter prüfen den Wortlaut.

**Grund:** Messung E10: 60 statt etwa 11 Bilder je Sekunde. Dominiks Eindruck deckt sich damit.

### 11. Chronik

**Wahl:** neu, ein Einspieler und danach eigene Bedienung. **Dominiks Vorgabe geht vor:** Die Chronik springt von selbst (V22), die Linien wandern über den Globus, dann klickt man selbst (M7, Nachtrag 1). B hatte gar keine selbsttätige Bewegung.

**Umsetzung:**
- Beim ersten Sichtbarwerden der Kugel (mindestens 50 % im Bild) läuft der Einspieler einmal. Die Linie wandert von Stadt zu Stadt, Punkte und Namen erscheinen mit ihr, Tafel und Ortsleiste gehen mit.
- Er wartet nicht auf den ersten Satz. Er beginnt frühestens 600 ms nach dem ersten Bild der Kugel.
- Dauer rund 15 s (Abschnitt 7.2).
- Am Ende steht der ganze Weg, die Kugel zeigt ihn im Überblick, die Tafel zeigt Berlin, seit 2022.
- Danach steuert man selbst: früher, später, Klick auf einen Ort, ein Steuerwort (6.4).
- Jeder Griff an die Kugel (Ziehen, Zoomen, Klick) beendet den Einspieler. Dann steht der ganze Weg.

**Grund:** V22, M7. Die KI-Liste nennt die Lebenschronik selbst als Gegenmittel zu Rang 25 („Eine Bewegung, die etwas erzählt“, `ki-merkmale.md`, Abschnitt 6, Regel 11).

### 12. Tafel, Legende und Zeichen an der Karte

**Wahl:** die Tafel von A mit den Kartenzeichen aus B, ohne Luftlinie.

**Umsetzung** (Aufbau in 6.4):
- Unter dem Globus, an einer Stelle, mit fester reservierter Höhe (`--tafel-h`, 6,5 z), damit nichts springt.
- Links die Marke: das Jahr im Grad groß (28,5 px), Mediävalziffern, Tinte. „bis“, „seit“ und „um“ stehen im Grad klein über der Zahl. So stößt „seit 2022“ auf dem Telefon nicht mehr an „Berlin“.
- Rechts der Kopf: das Kartenzeichen, dann Ort und Land im Grad Überschrift, aufrecht, Tinte. Gefüllter Punkt für einen Wohnort, offener Kreis für einen längeren Aufenthalt, als SVG in der Form der Kugel (Durchmesser 6 px, Kontur 1,1 px).
- Darunter die Art („Wohnort“, „längerer Aufenthalt“), beim Projekt der Vermerk „Freiwilligenprojekt mit AIESEC“ (V57), dann die Koordinaten (V29). Alles Grad klein.
- Eine eigene Zeichenerklärung gibt es nicht. Das Zeichen und das Wort an der Tafel erklären die Karte.
- **Text:** Die Luftlinie entfällt (V20), mit ihr „… km Luftlinie von Dortmund.“ und „Von hier aus sind die Entfernungen gemessen.“

**Grund:** Die Stationstafel ist Dominiks Wahl (V19). Die Kennzahlen hat er verworfen (V20). E12 empfiehlt genau diesen Mittelweg.

### 13. Kartenwahl

**Wahl:** A, mit ruhigerer Form.

**Umsetzung:**
- Satz und Platz von A unter der Kurzvita, Grad Text, Tinte. Die vier Wörter unterstrichen (07). Das gewählte Wort halbfett ohne Strich.
- Der Text der Ebene steht wie in A neben der Kugel, auf dem Telefon darüber.
- Jede Ebene spielt beim ersten Zeigen ihren Einspieler einmal (6.5). Danach steht ihr ganzer Weg.
- Doppelpunkt und die Formel „Auf dem Globus“ sind Textfragen für die Texter (F29).

**Grund:** E13. Ohne Strich sähe man nicht, dass man wählen kann.

### 14. Übrige Bewegung

**Wahl:** Mittelweg. **Dominiks Vorgaben gehen vor:** Bücher lassen sich herausziehen (V53), die Trilogie entfaltet sich langsam (V23).

**Umsetzung:**
- **Heben unter der Maus:** weg. Beim Zeigen bekommt ein Rücken eine Kontur von 1,5 px in Tinte, und sein Name steht über ihm, ohne Bewegung.
- **Herausziehen beim Klick:** Der gewählte Rücken steigt um 12 px, in 160 ms, `ease-out`. Ein zweiter Klick oder Escape stellt ihn zurück.
- **Überblendung der Bände:** weg. Der Text steht sofort da. Das Entfalten geschieht auf Globus und Tafel (6.5).
- **Kopplung an das Scrollen:** auf *Ursprung* führt die Leselinie den Globus (wie A). In der Bibliothek haftet das Standortregister. *Satoshi* hat keine Leselinie mehr (18).
- **Mitschieben des Zeitbands:** weg.

**Grund:** Rang 39, 6 und 56. V10: Bewegung beim Scrollen, sofern sie Sinn ergibt. V53: „wo man Sachen rausziehen kann“.

### 14b. Weg zu den längeren Aufenthalten

**Wahl:** B, von Dominik bestätigt („Abstecher stimmen“, M5).

**Umsetzung:**
- `routeBauen` aus dem Kern von B: Ein längerer Aufenthalt ist ein Abstecher vom Wohnort davor, hin und zurück, gestrichelt (Strich 2,5 px, Lücke 3,5 px). Der durchgezogene Weg verbindet nur die Wohnorte. Die Daten bleiben, wie sie sind; die Reihenfolge in `INHALT.leben` genügt.
- Colombo und Cotonou von Potsdam aus, Mallorca von Berlin aus (V24).
- Kapstadt, Sansibar und Buenos Aires gehen von Berlin aus, sobald sie auf einer Karte stehen. In C stehen sie auf keinem Globus (V28).
- *Satoshi* und *Ursprung*: Der Weg geht immer von Stadt zu Stadt, in der Reihenfolge der Szenen und der Bände (M6).

**Grund:** M5, M6, V24, V28.

### 15. Aufbau der Startseite

**Wahl:** A, ohne Beiwerk, ohne Spiegelung (F13).

**Umsetzung:** Text links, Kugel rechts und angeschnitten, darunter „Was ich schreibe“ mit Werkverzeichnis und Regalbild, „Was ich gelesen habe“ mit dem Zeitband, dann der Fuß. Am Regalbild bleibt die Form, das Beiwerk geht (21). Seite 9 beschreibt das Ziel.

**Grund:** Dominik mag diese Anmutung (V02). Der Nutzen der Spiegelung ist unbelegt (E15).

### 16. Kopf und Navigation

**Wahl:** der Briefkopf von A, ruhiger. **Dominiks Vorgabe geht vor:** „Schriftsteller und Reisender“ bleibt (V14). E16, F7 und Text-Flagge 1 empfahlen, die Zeile zu streichen.

**Umsetzung:**
- Name: Grad Überschrift (23,75 px), Gewicht 400, ohne Sperrung, Tinte. Auf der Startseite ist der Kopf die `h1` ohne Verweis. Auf Unterseiten ist der Name ein Verweis zur Startseite, ohne Strich, mit Strich beim Zeigen.
- „Schriftsteller und Reisender“ direkt darunter, ohne Abstand, Grad Text, Tinte, aufrecht.
- Navigation eine Zeile tiefer (1 z), Grad Text (A: 17,8 px), Tinte (A: Grau), ohne Strich, Strich beim Zeigen. Die aktuelle Seite halbfett und ohne Verweis. Werktitel kursiv. Abstand zwischen den Einträgen 0,85 em (A).
- Telefon: Die Navigation steht offen in zwei Zeilen, ohne den Schalter „Inhalt“ (F8, Standardentscheidung 5). Jede Trefferfläche mindestens 44 px hoch.
- **Text:** Das Wort „Inhalt“ entfällt.
- Die 25 Alternativen zur Tagline und die besten fünf schreiben die Texter (Auftrag, Nachtrag 1, Punkt 1). Auf der Website steht bis zu Dominiks Wahl „Schriftsteller und Reisender“.

**Grund:** V14 (Wortlaut ist sein Wunsch, die Kritik galt der Form), V16. R5: nicht grau. R8: Navigation ohne Strich, aktuelle Seite halbfett.

### 17. Inhaltsverzeichnis der Startseite („Was ich schreibe“)

**Wahl:** A, mit ruhiger Überschrift.

**Umsetzung:**
- `h2` „Was ich schreibe“ (V17, seine Wörter), Grad Überschrift, aufrecht.
- Werkverzeichnis von A: je Werk „Titel. Satz.“, der Titel ist ein unterstrichener Verweis, Werktitel kursiv. Einträge ¼ z auseinander, Gruppen 1 z.
- Rechts daneben das Regalbild (21), an der linken Kante des Globus ausgerichtet wie in A.
- Die Semikolons in den Einträgen sind Textfragen (F29).

**Grund:** V17, E17.

### 18. *Satoshi*

**Wahl:** neu, nach Dominiks Wunsch. **Dominiks Vorgabe geht vor:** Der Klappentext steht direkt unter dem Globus, eine Szene zeigt ihren Text nur nach einem Klick (V32, M3). F15 hatte empfohlen, den Klappentext neben den Globus zu setzen.

**Umsetzung** (Aufbau der Seite in 9.2):
- Keine Szenenliste, keine Wiedergabe „Szene für Szene“, keine Leselinie, kein haftender Globus.
- Am Globus eine Zeitleiste (6.8): die zehn Szenen in der Reihenfolge des Romans, das Jahr nur vor dem ersten Ort seines Jahres.
- In Ruhe zeigt der Globus den ganzen Weg ohne Szenentext. Die Tafel zeigt dann „Von Buenos Aires bis Penang“ und die Zeile „Prolog 2001, Kernhandlung 2007 bis 2010, Epilog 2013.“
- Ein Klick auf einen Ort der Zeitleiste oder auf einen Punkt des Globus wählt die Szene. Dann fliegt der Globus dorthin, und die Tafel zeigt Jahr, Ort, Koordinaten und den Text der Szene.
- Der Einspieler zeigt nur Orte und Linien, nie Szenentext (Nachtrag 1, Punkt 5). Szenentext erscheint nur nach einem Klick oder wenn der Besucher selbst „Abspielen“ wählt.
- Die Szenentexte bleiben wie in A (V36, Text-Flagge 25 ist nur ein Vorschlag). Der London-Satz (V33), der Auftakt (V34) und die drei Absätze nach der Frage (V35) bleiben wörtlich.
- Titel in Tinte, aufrecht. Überschriften ruhig (04). Figurennamen in Kapitälchen, Rolle in Tinte.
- Ab 75 rem eine Doppelseite unter dem Globus: links der Lesetext, rechts Eckdaten und Figuren (9.2, Standardentscheidung 19).
- **Text:** „Karteikarte“ bei Satoshi Nakamoto ist Dominiks Wort aus dem Exposé und bleibt als Wort. Es öffnet keine Karte mehr (22, Standardentscheidung 20).

**Grund:** V32, M3, V36, V37.

### 19. *Ursprung*

**Wahl:** Mittelweg. **Dominiks Vorgabe geht vor:** Die Trilogie entfaltet sich langsam (V23). F17 hatte „klicken statt Wiedergabe“ empfohlen. Klicken kommt dazu.

**Umsetzung** (Aufbau in 6.9 und 9.3):
- Globus von A ohne heutige Grenzen, mit den Flüssen aus B (Euphrat, Tigris, Schatt al-Arab, Jordan, Nil; `daten/fluesse.js` aus `website-b/daten/`), 0,8 px in der Farbe der Küste, ohne Namen.
- Einspieler langsam: Göbekli Tepe, Uruk, Tyros, Jerusalem, die Linie wandert in der Reihenfolge der Bände (7.2).
- Danach führt die Leselinie den Globus zum Band, den man liest (A). Klick auf Orte und die Steuerzeile wie an jedem Globus.
- Bandüberschrift ohne Randziffer und ohne Siena (6.9). „Arbeitstitel“ hinter dem Titel im Grad klein, Tinte (V39).
- Ortszeile je Band mit Koordinaten (V29). Die Zeile aus dem Exposé aufrecht.
- Kein Aufklappen von selbst auf dem Telefon, kein lebender Kolumnentitel.
- Seine Texte bleiben wörtlich: V40 bis V44.

**Grund:** V23, V29, V39 bis V45. Flüsse sind Inhalt, heutige Grenzen um 8000 v. Chr. ein Anachronismus (E19). Randziffer Rang 55, Siena Rang 10, Kolumnentitel Rang 60.

### 20. Fuß, Kontakt, Kolophon, Newsletter

**Wahl:** der Fuß von A ohne die Überschrift „Kontakt“, in Tinte.

**Umsetzung** (6.2):
- Reihenfolge wie A: E-Mail-Zeile, Newsletter-Zeile, Impressum mit Anschrift und Datenschutz, der verborgene Platz für Profile, das Kolophon.
- Wortlaut wie A, auch die Newsletter-Zeile und der Dank nach dem Eintragen.
- E-Mail-Zeile im Grad Text, alles andere im Grad klein, alles in Tinte.
- Der Fuß behält `id="kontakt"` und bekommt `aria-label="Kontakt"`, damit der Verweis „über den Kontakt“ auf *Satoshi* weiter trägt.
- **Text:** Die Überschrift „Kontakt“ entfällt.

**Grund:** E20, F6 (Empfehlung „Kontakt“ weg). V64 (Kolophon im Fuß, sein Wortlaut), V67 (Anschrift und Mail wie A), V68 (sehr dezent), V69 (verborgener Platz). R13 und R14.

### 21. Regal

**Wahl:** Mittelweg. Farben und Form von A, die Requisiten gehen. **Dominiks Vorgabe geht vor:** Herausziehen und quer liegende Bücher bleiben (V53). E21 hatte auch das Lehnen streichen wollen.

**Umsetzung** (6.12):
- Die Verlagsfamilien von A bleiben, gedeckt: OKLCH-Buntheit höchstens 0,035, Reclam-Gelb höchstens 0,07 (heute 0,09 bis 0,10). Betroffen sind nur #D8CC9F und die zwei Reclam-Töne.
- Rückenschrift in Tinte oder Papier, je nachdem, was mehr Kontrast gibt, mindestens 4,5 : 1. Aufrecht, gewöhnliche Vollkorn, keine Kapitälchen.
- Maße, Lücken, liegende Stapel und lehnende Bücher wie A.
- Bleistiftstriche und Lesezeichen werden die Zeichen aus B, in der Schriftfarbe des Rückens: ein Punkt über dem Fuß für ein Lieblingsbuch, ein Strich über dem Kopf für mehrmals gelesen, eine gestrichelte Kontur für nicht zu Ende gelesen, eine gepunktete für Auszüge (V50).
- Buchstützen, Insel-Muster, Bünde, Kartonflächen und Siena-Linien entfallen. Eigene Rücken weiß mit Kontur in Tinte.
- Regalschilder behalten ihren Wortlaut, aufrecht, Grad klein, Tinte, unter dem Brett.
- Der Schuber der Trilogie bleibt und öffnet in 300 ms.
- **Text:** Die Zeichenerklärung der Bibliothek nennt die neuen Zeichen (Fassung von B). Der Name des Bretts „Kinderzimmer“ wird nach V47 zu „die wichtigsten aus Kindheit und Jugend“.

**Grund:** V53, V47, V50. Rang 52 und 57 für die Requisiten. M9: Das Regal mit Rücken ist das Verspielte, das bleiben darf.

### 22. Buchzeile und Buchkarte

**Wahl:** das Prinzip aus B, als Satz in der Vollkorn (F19).

**Umsetzung** (6.13):
- Keine Karteikarte, keine Signatur, kein „zurücklegen“. Ein Klick zieht den Rücken heraus (14), und unter dem Brett steht ein Satz: „Thomas Mann, *Buddenbrooks*. Zuerst erschienen 1901. Everyman’s Library, 731 Seiten.“
- Ein zweiter Klick oder Escape legt das Buch zurück.
- Gilt für die Bibliothek, das Regalbild der Startseite, das Zeitband und die Leseliste.
- **Text:** „Karteikarte“, „zurücklegen“ und der Satz „Zu jedem Rücken gibt es eine Karteikarte.“ entfallen oder ändern sich.

**Grund:** Rang 52 in Reinform (E22). Auf dem Telefon verdeckt kein Blatt mehr ein Drittel des Bildschirms.

### 23. Zeitband

**Wahl:** A auf der Startseite (V18, F14), ohne Mitschieben.

**Umsetzung** (6.11):
- Farben von A, kühl gestellt (Abschnitt 4). Lieblingsbücher in Tinte. Eigene Werke als Umrisse in Tinte statt Siena.
- Jahreszahlen aufrecht, Grad klein, Tinte.
- Telefon: Das Band scrollt in seinem eigenen Rahmen, bewegt sich nur unter dem Finger und steht beim Laden am rechten Ende (Standardentscheidung 27).
- Ein Klick zeigt die Buchzeile als Satz (22).
- Darunter die zwei Reihen „die wichtigsten aus Kindheit und Jugend“ und „was noch wartet“ (V47), dann der Verweis auf die ganze Bibliothek (V18).

**Grund:** V18. Nach dem Globus das eigenständigste Bild der Seite (Prüfung, E23).

### 24. Leseliste und Nachttisch

**Wahl:** die Liste aus B in der Typografie von A, der Nachttisch von A bündig.

**Umsetzung** (6.14):
- „was noch wartet“ in der Bibliothek als Liste: je Zeile „Autor, *Titel*“, am Desktop zwei Spalten, nach dem Erscheinungsjahr geordnet. Nur Titel und Autor (V48).
- Der Nachttisch: die farbigen Stapel von A, bündig, ohne Versatz, ohne Rücken unter der Maus. Darunter „Auf dem Nachttisch“ aufrecht, Grad klein (V49, sein Wort). Bolaño liegt darauf, die Geisha nicht.

**Grund:** V48, V49. Kontrast (A: 2,5 : 1) und Lesbarkeit (E24).

### 25. Länder

**Wahl:** das Register von A.

**Umsetzung** (6.15):
- Ein Absatz je Kontinent, das Stichwort in Kapitälchen (die eine Sorte Stelle, 04), dahinter die Länder alphabetisch mit Komma.
- Die Namen ohne Strich, Strich beim Zeigen und beim Fokus. Auf Touchgeräten bleibt er stehen (07). Das gewählte Land halbfett.
- „Länderguides, in Arbeit.“ in Tinte (V65).
- 65 Länder und Gebiete, die Liste unverändert (V27).

**Grund:** E25, F5. V65: Länder bleibt in der Navigation.

### 26. Vita

**Wahl:** die Anordnung von A, die Stationen wie B. **Dominiks Vorgabe geht vor:** Die Koordinaten bleiben (V29). F18 und E26 hatten empfohlen, sie in der Vita zu streichen.

**Umsetzung** (6.16 und 9.5):
- Sein Text wörtlich (V55). Absätze ¾ z auseinander.
- Der erste Satz stehend in IM Fell, Grad groß (02).
- Foto größer und weiter oben (F26, M9): am Desktop oben in der rechten Spalte, bis 24 em breit (456 px), auf dem Telefon direkt unter dem Titel. Bildlegende „Mit *Picknick am Wegesrand* der Brüder Strugatzki.“ im Grad klein, aufrecht. Kein Bildnachweis (M8).
- Stationen unter dem Foto: Jahreszahl hängt im Steg wie A, Ort aufrecht, Nebenorte gleich groß und dunkel, Koordinaten Grad klein, Tinte.
- `h2` „Stationen“ als ruhige Überschrift (04).

**Grund:** V29, V55 bis V59, M8, M9 („ein Foto von Dominik früher und größer“).

### 27. Lesen, Erzählungen, *Untertext*, Impressum, Datenschutz

**Wahl:** die Seiten von A in Tinte.

**Umsetzung** (6.17 bis 6.19):
- Überschriften nach 04, Titel der Leseseite in Tinte.
- Vermerk, Notiz, Ort, Datum und Artikelangaben aufrecht, Grad klein, Tinte.
- Keine Koordinaten unter einer Erzählung (Standardentscheidung 33).
- Szenenwechsel: drei Sternchen in der Mitte, Tinte, je 1 z Luft.
- Die Rechte im Datenschutz behalten den Halbgeviertstrich, in Tinte.
- Abkürzungen (DDG, DSGVO) in Versalien, nicht in Kapitälchen (04).
- Erzählungen und *Untertext* bleiben in der Navigation und bleiben leer, ohne Beispieltexte (V66).

**Grund:** E27, V66.

### 28. Technik und Datenschutz

**Wahl:** B.

**Umsetzung:** Abschnitt 8. Schriften und Bibliotheken vom eigenen Server, keine Anfrage an fremde Server, der Bau entfernt alle Kommentare, die Datenschutzerklärung passt dazu.

**Grund:** E28, Datenschutz (Urteil LG München I vom 20. Januar 2022), Rang 48 und 67.

---

## 3. Schrift

### 3.1 Familien

| Familie | Datei | Wofür |
|---|---|---|
| Vollkorn, aufrecht, 400 bis 600 | `schrift/vollkorn.woff2` | aller Text, Kapitälchen, Kartenschrift, Rückenschrift |
| Vollkorn, kursiv, 400 bis 600 | `schrift/vollkorn-kursiv.woff2` | Werktitel, fremde Wörter, Betonung |
| IM Fell French Canon Roman | `schrift/im-fell-french-canon.woff2` | nur der erste Satz (Startseite, Vita) |

Es gibt keine dritte Schrift. Kursive Kapitälchen gibt es nicht. Steht ein Figurenname in kursivem Text, bleibt er kursiv ohne Kapitälchen.

### 3.2 Grade

| Grad | Desktop (ab 62,0625 rem) | unter 62 rem | Zeilenhöhe | Wofür |
|---|---|---|---|---|
| klein | 15,4375 px (0,8125 × Text) | 15 px | ¾ z (21,375 / 20,25 px) | Ortsleisten, Unterzeile und Koordinaten der Tafel, Bildlegende, Zeitbandachse und Bandnamen, Regalschilder, Zeichenerklärung, Fuß außer der E-Mail-Zeile, Kolophon, Vermerke, Hinweise am Globus, „Arbeitstitel“, „bis“, „seit“, „um“ an der Tafel |
| Text | 19 px (1,1875 rem) | 18 px | 1 z (28,5 / 27 px) | Lesetext, Kurzvita, Tagline, Navigation, Kartenwahl, Werkverzeichnis, Szenentext an der Tafel, Buchzeile, Leseliste, E-Mail-Zeile, `h3` |
| Überschrift | 23,75 px (1,25 × Text) | 22,5 px | 1,25 z (35,625 / 33,75 px) | `h2`, Name im Kopf, Ort an der Tafel, Vorspann auf *Satoshi* („Am 31. Oktober 2008 …“) |
| groß | 28,5 px (1,5 × Text) | 27 px | 1,5 z (42,75 / 40,5 px) | `h1` Seitentitel, Jahr und Bandziffer an der Tafel, erster Satz der Vita |
| Einstieg | 38 px (2 × Text), höchstens so groß, dass das längste Glied in die Spalte passt, nicht unter 28,5 px | an die Spalte angepasst, höchstens 30 px, nicht unter 20,7 px | 1,5 z | nur der erste Satz der Startseite |

Ausnahmen gibt es nur in Zeichnungen:

- **Kartenschrift** auf der Leinwand: Ortsnamen 15 px, Telefon 14 px. Der gewählte Ort in 600.
- **Rückenschrift** im Regal: 9 bis 13 px, aus der Breite des Rückens berechnet wie in A. Unter 9 px bleibt der Rücken leer.

Der Grad 0,9375 em aus A (17,8 px) und alle übrigen Zwischenstufen entfallen.

### 3.3 Körper der Seite

- `body`: Vollkorn 400, Grad Text, Zeilenhöhe 1 z, Tinte auf Papier.
- `font-variant-numeric: oldstyle-nums proportional-nums; font-kerning: normal`.
- Prosa: `hyphens: auto; text-wrap: pretty`. Bricht `pretty` sichtbar zu früh um (B hatte das in Band I von *Ursprung*), steht in diesem Absatz `text-wrap: wrap`.
- Überschriften und der erste Satz: `hyphens: manual; text-wrap: balance`.
- `lang="de"` auf jeder Seite.

### 3.4 Kursiv

Kursiv stehen genau drei Dinge:

- **Werktitel** im Satz, in Listen, in der Navigation, im Werkverzeichnis, in der Buchzeile, in der Leseliste (`<i>` oder `<cite>`). Also *Satoshi*, *Ursprung*, *Untertext*, *Buddenbrooks*.
- **Fremdsprachige Wörter** (`<i lang="…">`).
- **Echte Betonung** (`<em>`), sparsam.

Aufrecht steht alles andere, ausdrücklich auch:

- Legenden, Tafel, Koordinaten, Orte, Jahre, „bis“, „seit“, „um“, Unterzeilen, Hinweise, Fuß, Kolophon, Vermerke.
- Ortsnamen auf dem Globus, Titel auf Buchrücken, Regalschilder, Zeitbandachse, Namen der Reihen im Zeitband.
- „Arbeitstitel“, die Zeile aus dem Exposé bei Band I.
- Seitentitel und Überschriften, auch wenn sie ein Werktitel sind („Satoshi“ als `h1`, „Band I  Kreise ohne Wiederkehr“).

Weitere Regeln:

- Titel von Erzählungen stehen im Satz in deutschen Anführungszeichen („…“), weil sie Teil eines Ganzen sind. Nie kursiv und Anführungszeichen zugleich.
- Wörtliche Zitate im Satz stehen in „…“, aufrecht.
- In Dominiks Texten bleibt die Kursive, wie sie in A steht (*Wolf unter Wölfen*, *Schwarzer Obelisk*, *Ficciones*).
- Ziel: höchstens 5 % der sichtbaren Zeichen einer Seite kursiv, und nur in `i`, `em` oder `cite`.

### 3.5 Nebentext

- Ein Mittel: eine Stufe kleiner (Grad klein). Sonst gleich: aufrecht, Tinte, dieselbe Schrift.
- Er steht direkt unter oder neben dem Gegenstand, den er erklärt, linksbündig mit ihm, ¼ z Abstand.
- Er steht nur, wo er etwas sagt, das man nicht sieht. Eine Legende, die eine Überschrift wiederholt, entfällt (Regalbild der Startseite, R10).
- Keine zweite Abstufung: Nebenorte, Nebensätze, Zusätze („Nevada“, „Patagonien“) stehen im selben Grad wie ihr Nachbar.

### 3.6 Überschriften und Beschriftungen

| Ebene | Grad | Gewicht | Abstand davor | Abstand danach |
|---|---|---|---|---|
| `h1` Seitentitel | groß | 400 | Abstand nach dem Kopf (5.2) | 1 z |
| `h2` Abschnitt | Überschrift | 400 | 2 z | ½ z |
| `h3` (Figuren) | Text | 400 | ¾ z | 0 |

- Normale Groß- und Kleinschreibung, aufrecht, ungesperrt.
- Keine Zeile über einer Überschrift, weder in Versalien noch in Kapitälchen noch klein (Rang 1).
- Wo ein Abschnitt ohne Überschrift verständlich ist, bekommt er keine (Fuß).
- Überschriften sind Dominiks Wörter, wo es sie gibt („Was ich schreibe“, „Was ich gelesen habe“, die Gliederung seines Exposés auf *Satoshi*).

### 3.7 Halbfett

600 hat eine Bedeutung: Zustand. Aktuelle Seite in der Navigation, gewählte Ebene der Kartenwahl, gewählter Ort, gewählte Szene oder gewählter Band in den Ortsleisten, gewähltes Land, aktuelles Fach im Standortregister, gewählter Ortsname auf dem Globus. Nie für Überschriften, nie zur Betonung im Satz.

### 3.8 Kapitälchen

Nur das Stichwort eines Verzeichniseintrags: Figurennamen auf *Satoshi* (Lana Álvarez, Arthur Volkov, Samuel Vaughn, Satoshi Nakamoto) und Kontinente im Länderregister. `font-variant-caps: small-caps; letter-spacing: .04em`. Sonst nirgends (04).

### 3.9 Ziffern

- Lauftext, Tafel, Koordinaten: Mediävalziffern, proportional.
- Spalten mit Jahren (Stationen der Vita, Kapiteltage auf *Satoshi*, Zeitbandachse, Standortregister): Mediävalziffern mit fester Breite (`oldstyle-nums tabular-nums`).
- Kartenschrift: die Ziffern, die die Schrift ohne Funktion setzt.
- Tausender erst ab fünf Stellen mit schmalem geschütztem Leerzeichen. Postleitzahl und vierstellige Zahlen ohne.
- Zahlen, die etwas zählen, im Satz ausgeschrieben, wo Dominik es so hält („vierzig Kapitel“, „Fünfundsechzig Länder und Gebiete“).

### 3.10 Deutscher Satz

- Anführungszeichen „…“ und ‚…‘, Apostroph ’, Grad und Minuten ° ′ ″.
- Geschützte Leerzeichen in „v. Chr.“, „e. V.“, „S. 12“ und zwischen Zahl und Einheit.
- Spannen in Registern und an der Achse mit Halbgeviertstrich ohne Leerzeichen (1900–1945). Im Satz „2007 bis 2010“.
- Den Halbgeviertstrich als Einschub gibt es nur in Dominiks Texten (V35). In Claudes Texten steht keiner.
- Keine Semikolons und keine Doppelpunkt-Pointen in Claudes Texten. Das prüfen die Texter.
- Auf Apple-Geräten nennt der Zoom-Hinweis „⌘“. Die Vollkorn hat das Zeichen nicht, es kommt aus der Systemschrift. Das ist hingenommen.

---

## 4. Farben

### 4.1 Token

| Token | Wert | Kontrast auf Papier | Wofür |
|---|---|---:|---|
| `--papier` | #FFFEFC | – | Grund aller Seiten, Wasser auf dem Globus, eigene Rücken, Freistellung der Kartennamen |
| `--tinte` | #1D1E21 | 16,5 : 1 | aller Text, Weg, Punkte, Ring, Kugelrand, Konturen, Fokus, Lieblingsbücher im Zeitband |
| `--leise` | #6B6D72 | 5,1 : 1 | nur Zustände: nicht verfügbares „früher“ oder „später“, abgeschaltetes Bedienwort |
| `--karte-land` | #F3F3F2 | 1,1 : 1 | Land |
| `--karte-bereist` | #C4C7CC | 1,7 : 1 (1,53 : 1 zum Land) | bereiste Länder |
| `--karte-grenze` | #B0B3B8 | – | Grenzen, 0,45 px, ab 3-fach 0,7 px |
| `--karte-kueste` | #9C9DA1 | 2,7 : 1 | Küste 0,6 px, Flüsse auf *Ursprung* 0,8 px |
| `--karte-gradnetz` | #ECEDEE | – | Gradnetz 0,5 px |
| `--brett` | #DCDDDF | – | Brett im Regal, 4 px hoch, ohne Kante |
| `--zb-strich` | #BEC0C3 | 1,8 : 1 | Zeitband: gelesene Bücher |
| `--zb-kind` | #A9ABAF | 2,3 : 1 | Zeitband: Kindheit und Jugend |
| `--zb-warte` | #8E9095 | 3,2 : 1 | Zeitband: Kontur der wartenden Bücher, 0,65 px |

Linienstärken und Zeichen auf dem Globus:

| Teil | Wert |
|---|---|
| Weg zwischen Wohnorten, Szenen, Bänden | 1,3 px Tinte, runde Enden |
| Abstecher | 1,3 px Tinte, gestrichelt 2,5 / 3,5 px |
| Wohnort, Schauplatz, Ort eines Bands | gefüllter Punkt, Radius 2,6 px |
| längerer Aufenthalt, weiterer Schauplatz | offener Kreis, Radius 2,3 px, Kontur 1,1 px, innen Papier |
| gewählter Ort | dazu ein Ring, Radius 6,5 px, 1 px Tinte |
| Land unter der Maus | Kontur 1 px Tinte |
| gewähltes Land | Kontur 1,2 px Tinte |
| Kugelrand | 1 px Tinte |

### 4.2 Regeln

- Es gibt keine weiteren Farben. Keine Transparenz für Text, keine Farbmischung für Linien unter Text.
- Farbe tritt nie bei Zeigen, Fokus oder Verweisen auf.
- Rückenfarben: die Familien aus A (`FAMILIEN` in `bibliothek.html`), OKLCH-Buntheit höchstens 0,035, Reclam höchstens 0,07. Die Rückenschrift nimmt Tinte oder Papier, je nachdem, was mehr Kontrast gibt, mindestens 4,5 : 1. Gemessen erfüllt jede Familie das mit einem der beiden Werte.
- Textauswahl: `::selection { background: var(--tinte); color: var(--papier); }`.
- Fokus: `outline: 1.5px solid var(--tinte); outline-offset: 3px`, nur bei `:focus-visible`. Auf dem Globus ein Ring innerhalb der Scheibe wie in A.
- Kein Text unter 4,5 : 1. Text unter 7 : 1 nur für Zustände.

---

## 5. Abstände, Raster und Breiten

### 5.1 Die Zeile

`--z` ist 1,78125 rem (28,5 px) ab 62,0625 rem Fensterbreite und 1,6875 rem (27 px) darunter. Senkrechte Abstände nehmen nur diese Stufen: ¼ z, ½ z, ¾ z, 1 z, 2 z, 3 z. Andere Werte gibt es nicht, auch nicht in den Stilen einzelner Seiten.

### 5.2 Wo welcher Abstand steht

| Stelle | Abstand |
|---|---|
| Absatz zu Absatz in Prosa, auf allen Seiten | ¾ z |
| Einträge einer Liste oder eines Registers (Werkverzeichnis, Stationen, Kapiteltage, Leseliste, Bände der Ebene *Ursprung*) | ¼ z |
| Gruppen einer Liste | 1 z |
| Absatz nach einer `h2` | ½ z |
| vor einer `h2` | 2 z |
| nach dem Seitentitel `h1` | 1 z |
| Legende unter einem Bild, Tafel unter dem Globus, Buchzeile unter dem Brett, Nebentext unter seinem Gegenstand | ¼ z |
| kurze Zeilen, die zusammengehören (Name und Tagline, Zeilen der Tafel, Anschrift) | 0 |
| Kopf: oben | 1,5 z |
| Kopf: Tagline zur Navigation | 1 z |
| Kopf zum Inhalt auf Unterseiten ohne Globus | 2 z |
| zwischen großen Teilen einer Seite | 3 z |
| zwischen Globusband und Klappentext auf *Satoshi* | 2 z |
| vor dem Fuß | 3 z |
| im Fuß zwischen E-Mail-Zeile, Newsletter-Zeile, Impressum und Profilen | ½ z |
| im Fuß vor dem Kolophon | 1 z |
| unter dem Fuß | 2 z |
| Szenenwechsel auf der Leseseite, darüber und darunter | 1 z |

Prosa beginnt nach einer Überschrift ohne Einzug. Absätze haben nie einen Einzug, denn sie haben Abstand.

### 5.3 Waagrechtes Raster

Das Raster von A bleibt, mit seinen Variablen:

| Variable | Wert | Bedeutung |
|---|---|---|
| `--rand-l` | `clamp(16px, 7vw, 136px)`, ab 106,25 rem wachsend wie A | linker Rand |
| `--rand-r` | `clamp(16px, 3vw, 48px)` | rechter Rand |
| `--mass` | 31 em | Satzbreite, rund 62 Zeichen |
| `--spalte` | `clamp(23em, calc(62vw - 330px), 30em)` | Textspalte neben dem Globus |
| `--globus` | Formel von A (aus Fensterbreite, Fensterhöhe, höchstens 1000 px) | Durchmesser der Kugel |
| `--globuskante` | Formel von A | linke Kante der Kugel; daran richten sich Regalbild und rechte Spalten aus |
| `--kopf-h`, `--tafel-h` | je 6,5 z | Kopf und Tafel, damit Kopf, Kugel und Tafel auf einen Bildschirm passen |

Alles steht links. Zentriert ist nur der Szenenwechsel der Leseseite.

### 5.4 Breiten

| Fensterbreite | Was sich ändert |
|---|---|
| ab 106,25 rem (1700 px) | Der linke Rand wächst um drei Viertel der Breite über 1700 px (A). |
| ab 75 rem (1200 px) | *Satoshi* unter dem Globus als Doppelseite (9.2). |
| ab 62,0625 rem (993 px) | Zwei Spalten: Text links, Kugel rechts, angeschnitten. Vita zweispaltig. Grade Desktop, `--z` 28,5 px. |
| unter 62 rem | Eine Spalte. Die Kugel steht unter dem Text der Ebene, `width: min(100%, 100svh - 6rem)`. Grade Telefon, `--z` 27 px. |
| unter 40 rem (640 px) | Telefon: Navigation offen in zwei Zeilen, Zeitband scrollt in seinem Rahmen, Leseliste einspaltig. |

### 5.5 Zeilenmaß

- Lesetext 55 bis 75 Zeichen bei 1280 bis 1920 px, 35 bis 45 auf dem Telefon (R2).
- Die Textspalte der Vita fällt bei 1280 px nicht unter 55 Zeichen (heute 49). Ihre Spalte ist `minmax(29em, 31em)` breit, die rechte Spalte nimmt den Rest.
- Keine waagrechte Bildlaufleiste der Seite bei 360 px. Nur das Zeitband scrollt in seinem eigenen Rahmen.

### 5.6 Trefferflächen

Auf Touchgeräten ist jede Bedienung mindestens 44 px hoch: Navigation, früher, später, Steuerwort, Ortsleisten, Kartenwahl, Länderregister, „Eintragen“, Rücken. Wörter im Satz bekommen die Fläche über `padding-block` mit gleich großem negativem `margin-block`, damit die Zeile nicht wächst.

---

## 6. Bausteine

### 6.1 Kopf und Navigation

- Desktop: Name (Grad Überschrift), darunter „Schriftsteller und Reisender“ (Grad Text), eine Zeile tiefer die Navigation (Grad Text). Auf Seiten mit Globus steht der Kopf in der Breite der linken Spalte und hat die feste Höhe `--kopf-h`. Die Navigation darf wie in A über die Spalte hinaus bis kurz vor die Kugel laufen und bricht, wenn nötig, nach „Untertext“.
- Reihenfolge der Navigation wie A: *Satoshi*, *Ursprung*, Erzählungen, *Untertext*, Länder, Bibliothek, Vita.
- Verweise ohne Strich, Strich beim Zeigen. Aktuelle Seite halbfett, ohne Verweis (`aria-current="page"`). Auf der Leseseite steht die Liste, zu der ein Text gehört, halbfett und bleibt ein Verweis.
- Telefon: Name, Tagline, dann die Navigation offen in zwei Zeilen. Kein Schalter, kein Menüzeichen.
- Sprungmarke „Zum Inhalt“ wie A.

### 6.2 Fuß

Von oben nach unten, alles linksbündig in der Satzbreite:

1. „Anfragen zu Lesungen und zu den Romanen:“ und die E-Mail-Adresse als unterstrichener Verweis. Grad Text. Wortlaut und Adresse wie A.
2. Die Newsletter-Zeile, Wortlaut wie A: „Eine E-Mail, wenn ein Buch erscheint oder eine Lesung ansteht:“, dahinter das Feld und „Eintragen“. Grad klein. Das Feld ist ein Strich von 1 px in Tinte, ohne Rahmen, ohne Rundung, 16 em breit. Beim Fokus wird der Strich 2 px. „Eintragen“ ist ein unterstrichenes Wort. Auf dem Telefon sind Feld und Wort 44 px hoch, im Feld mindestens 16 px Schrift. Nach dem Eintragen erscheint in der Statuszeile „Danke. Im Testsystem wird noch nichts verschickt.“ Es wird nichts verschickt und nichts geladen. Ohne Skript ist das Formular verborgen.
3. „Impressum: Dominik Jäkel, Stresemannstraße 76, 10963 Berlin“ und in der nächsten Zeile „Datenschutz“. Grad klein. Wortlaut und Anschrift wie A.
4. Der Platz für Profile (`p.profile`), verborgen, solange `FSeite.PROFILE` leer ist. Später eine Zeile im Grad klein mit Verweisen wie „Instagram“ und „LinkedIn“, 1,2 em Abstand, ohne Zeichen und ohne Symbole. Keine toten Verweise.
5. Das Kolophon im Wortlaut von V64: „Website gesetzt aus der Vollkorn von Friedrich Althausen, der erste Satz aus der IM Fell French Canon von Igino Marini. Küsten und Grenzen nach Natural Earth.“ Grad klein, höchstens 36 em breit.

Keine Überschrift, kein Kasten, keine Linie über dem Fuß.

### 6.3 Der Globus

- Gemeinsamer Kern `globus/kern.js` für alle vier Seiten mit Globus (Startseite, *Satoshi*, *Ursprung*, Länder).
- Aussehen nach 09 und Abschnitt 4. Technik nach 10.
- Am Desktop vom oberen Fensterrand bis unter den Kopf, am rechten Rand angeschnitten wie A. Gezoomt eine runde Lupe am selben Ort wie A (`clip-path: circle(…)`, Rand 1 px Tinte). Der Anschnitt bleibt auch gezoomt (Standardentscheidung 34).
- Namen: nur die Orte der aktiven Ebene. Während eines Einspielers nur die Orte bis zur jetzigen Station. Kein Ländername auf der Kugel. Unter der Maus erscheint auf Ebenen mit Ländern der Name des Lands als Zettel: aufrecht, Grad klein, Tinte auf Papier, 0,3 em Rand, ohne Rahmen.
- Hinweis zum Zoomen (Strg oder ⌘ mit dem Rad, zwei Finger auf dem Telefon): aufrecht, Grad klein, Tinte auf Papier, höchstens einmal je Besuch und höchstens 2 s (A).
- Ohne Globus (kein Skript, Fehler): der Ersatzsatz von A an seiner Stelle, aufrecht, Grad Text, Tinte.
- Leinwand mit `tabindex="0"` und der Beschreibung von A. Pfeiltasten drehen, Plus und Minus zoomen.

### 6.4 Bedienung an jedem Globus: Ortsleiste, Tafel, Steuerzeile

Alle vier Globen haben dieselben drei Teile. Das hält die Seiten gleich und verhindert, dass jede Seite eine eigene Bedienung erfindet (Rang 50).

**Ortsleiste.** Die Orte der Ebene in ihrer Reihenfolge, als Knöpfe in einer fließenden Zeile, Grad klein, Tinte, durch Komma getrennt.

- Startseite, Leben: „Dortmund bis 2014, Freiburg 2014, Potsdam 2015, Colombo 2016, Cotonou 2018, Kaohsiung 2018, Berlin seit 2022, Mallorca 2023“. Ort und Jahr bleiben zusammen.
- *Satoshi*: siehe 6.8.
- *Ursprung*: „Göbekli Tepe um 8000 v. Chr., Uruk um 2700 v. Chr., Tyros und Jerusalem um 940 v. Chr.“ Jeder Ort ist ein Knopf.
- Strich nach 07: ohne Strich in Ruhe, Strich beim Zeigen und auf Touchgeräten. Der gewählte Ort halbfett.
- **Text:** Die Halbgeviertstriche der Stationenzeile von A werden Kommas (R11).

**Tafel.** Unter dem Globus, Höhe reserviert. Raster wie A: links die Marke (4,4 em, rechtsbündig), 0,8 em Abstand, rechts der Inhalt.

| Teil | Grad | Inhalt |
|---|---|---|
| Vorwort der Marke | klein | „bis“, „seit“, „um“, über der Zahl |
| Marke | groß | Jahr oder Bandziffer (I, II, III) |
| Kopf | Überschrift | Kartenzeichen und Ort, ein Zusatz wie „Nevada“ im Grad klein dahinter |
| Unterzeile | klein | Art und Vermerk („Wohnort“, „längerer Aufenthalt, Freiwilligenprojekt mit AIESEC“, „um 8000 v. Chr.“) |
| Daten | klein | Koordinaten |
| Text | Text | Szenentext auf *Satoshi*, die Zeile zum Band auf *Ursprung* (V40), sonst leer |
| Fuß | Text | die Steuerzeile |

Jahreszahl und Ortsname stehen auf einer Grundlinie. Die Tafel meldet sich Vorleseprogrammen (`aria-live="polite"`) nur bei einer Wahl des Besuchers, nicht während eines Einspielers.

**Steuerzeile.** Im Fuß der Tafel: „früher“, „später“ und ein Steuerwort, 1,2 em Abstand, unterstrichen.

| Zustand | Steuerwort | früher | später |
|---|---|---|---|
| Einspieler oder Abspielen läuft | Anhalten | an | an |
| angehalten mitten im Ablauf, oder nach einem Schritt von Hand | Abspielen (weiter ab der jetzigen Station) | an | an |
| am Ende | Noch einmal von vorn | an | leise |
| an der ersten Station | je nach Ablauf wie in den Zeilen darüber | leise | an |
| *Satoshi* in Ruhe, keine Szene gewählt | Abspielen (von der ersten Szene an, mit Szenentext) | leise | an (zur ersten Szene) |
| reduzierte Bewegung | entfällt | an | an |

- „leise“ heißt: in `--leise`, ohne Strich, nicht bedienbar (`disabled`), an seinem Platz.
- Ein Klick auf früher, später oder einen Ort hält jeden laufenden Ablauf an.
- Ein Punkt auf dem Globus ist eine Wahl wie ein Ort der Ortsleiste. Trefferradius 12 px. Hat ein Ort mehrere Szenen (London, Buenos Aires), wählt der erste Klick die frühere, der nächste Klick die spätere.
- **Text:** „Noch einmal von Dortmund an“, „Noch einmal von Göbekli Tepe an“, „Szene für Szene, von Buenos Aires an“, „Ort für Ort, von Göbekli Tepe an“, „anhalten“ und „weiter mit …“ werden „Abspielen“, „Anhalten“ und „Noch einmal von vorn“ (Dominik: „Nochmal von vorne oder sowas“, Nachtrag 1).

### 6.5 Einspieler und Chronik

- Jede Ebene spielt beim ersten Zeigen ihren Einspieler einmal: auf der Startseite Leben beim ersten Sichtbarwerden, die anderen Ebenen beim ersten Wählen, auf *Satoshi* und *Ursprung* beim ersten Sichtbarwerden des Globus. Danach steht der ganze Weg der Ebene.
- „Sichtbar“ heißt: mindestens 50 % der Kugel im Fenster. Sinkt der Anteil unter 20 % oder wird der Tab verborgen, hält der Einspieler an und läuft weiter, wenn die Kugel wieder zur Hälfte zu sehen ist.
- Die Linie wächst während des Flugs von der einen Stadt zur nächsten. Am Ziel erscheinen Punkt und Name.
- Die Ortsleiste hebt die jetzige Station halbfett hervor. Die Tafel geht mit, außer auf *Satoshi* (dort bleibt sie beim Einspieler in Ruhe).
- Am Ende zeigt die Kugel den ganzen Weg im Überblick.
- Jeder Griff an die Kugel, jede Wahl und auf *Ursprung* jeder Wechsel der Leselinie beendet den Einspieler. Dann steht der ganze Weg, und die Steuerzeile zeigt „Noch einmal von vorn“, auf *Satoshi* „Abspielen“ (6.4).
- Bei reduzierter Bewegung gibt es keinen Einspieler. Der ganze Weg steht sofort, die Tafel zeigt den Endzustand.
- Dauern und Vergrößerungen in 7.2.

### 6.6 Kartenwahl und Text der Ebene (Startseite)

- Kartenwahl: Satz von A, Grad Text, vier unterstrichene Wörter, das gewählte halbfett ohne Strich.
- Text der Ebene, links neben der Kugel (Telefon: darüber):
  - **Leben:** die Ortsleiste.
  - **Reisen:** der Satz von A mit den vier Kontinenten als unterstrichene Wörter, der Verweis auf die Länderguides. Kein Einspieler, die Kugel fliegt zum gewählten Kontinent.
  - **Satoshi:** die zwei Sätze von A, die Orte darin als unterstrichene Wörter. Ein Klick wählt die erste Szene dieses Orts, die Tafel zeigt ihren Text. Ohne Wahl kein Szenentext (V32).
  - **Ursprung:** die drei Bände, je eine Zeile: Bandziffer, Abstand 0,5 em, kursiver Titel, Komma, die Orte als Knöpfe. Die Ziffer steht in der Zeile, nicht im Rand, in Tinte. Die Zeilen stehen sofort da.
- Die Ebenen Satoshi und Ursprung haben dieselbe Steuerzeile wie die Seiten *Satoshi* und *Ursprung*.

### 6.7 Zeichen und Legende

Es gibt keine eigene Zeichenerklärung an den Globen. Das Zeichen vor dem Ort an der Tafel und das Wort darunter erklären die Karte. Die Ebene Reisen und die Seite Länder erklären das Grau mit dem Satz von A („Fünfundsechzig Länder und Gebiete, grau auf dem Globus.“). Das Grau ist mit #C4C7CC weiter ein Grau, der Satz bleibt wahr.

### 6.8 Die Zeitleiste von *Satoshi*

- Eine fließende Zeile im Grad klein, in der linken Spalte unter dem Vorspann, auf dem Telefon über dem Globus.
- Das Jahr steht nur vor dem ersten Ort seines Jahres, in Mediävalziffern mit fester Breite, als Teil der Gruppe. Orte innerhalb eines Jahres durch Komma getrennt, Gruppen durch 1 em Abstand:
  „2001 Buenos Aires   2007 London, Black Rock Desert, London, Kobe   2008 New York, Berlin   2009 Buenos Aires   2010 Bariloche   2013 Penang“
- Jeder Ort ist ein Knopf mit `aria-pressed`. Sein Name für Vorleseprogramme nennt Ort und Jahr („Kobe, 2007“). So bleiben die Szenen erreichbar, ohne als Liste dazustehen (M3).
- Darunter, ¼ z Abstand, der Satz von A zu den weiteren Schauplätzen (Temple City, die Anden). Beide stehen auf dem Globus als offene Kreise ohne Weg, mit Namen erst ab 2,4-fach.
- Weg auf dem Globus: von Stadt zu Stadt in der Reihenfolge der Szenen, auch zurück nach London und nach Buenos Aires.

### 6.9 Die Bände von *Ursprung*

Je Band ein Abschnitt in der linken Spalte:

1. Überschrift (`h2`, Grad Überschrift, aufrecht): „Band I“, 1 em Abstand, der Titel. Bei Band II und III dahinter „Arbeitstitel“ im Grad klein (V39).
2. Ortszeile, Grad klein: der Ort als Knopf, Komma, die Zeit. In der nächsten Zeile die Koordinaten. Bei Band III danach der Satz von A zu Tyros, Tyros als Knopf.
3. Thema, Grad Text.
4. Bei Band I die Zeile aus dem Exposé, Grad Text, aufrecht.
5. Inhalt, Grad Text. Bei Band I danach „Alles steht unter der Frage: …“ (V42).

Zwischen den Bänden 2 z. Unter Band III der Satz zur Bibliothek (V44), die Titel als Verweise auf ihre Buchzeile.

### 6.10 Werkverzeichnis und Regalbild (Startseite)

- Werkverzeichnis nach 17.
- Regalbild: die eigenen Rücken (*Satoshi*, die drei Bände von *Ursprung*) und der Stapel vom Nachttisch auf einem Brett. Eigene Rücken weiß mit Kontur 0,75 px in Tinte, Rückentitel aufrecht in der gewöhnlichen Vollkorn, keine Bünde, keine Muster. Liegende Bücher in den Farben ihrer Familie, Autor und Titel aufrecht, ohne Kapitälchen.
- Zeigen: Kontur 1,5 px und der Name über dem Rücken. Zeigt man auf einen Eintrag im Werkverzeichnis, bekommt sein Rücken dieselbe Kontur.
- Klick: Herausziehen (14) und die Buchzeile unter dem Brett (6.13). Bei eigenen Werken nennt sie Titel, Art und Stand aus `INHALT.werke` und verweist auf die Seite des Werks.
- Keine Bildlegende (R10).
- **Text:** Die Legende „Was ich schreibe, und daneben, was gerade auf dem Nachttisch liegt.“ entfällt.

### 6.11 Zeitband (Startseite)

- Rechenweg von A: jedes Buch ein senkrechter Strich an seinem Erscheinungsjahr, so breit wie sein Rücken, frühe Jahrhunderte gestaucht.
- Gelesene Bücher `--zb-strich`, Lieblingsbücher `--tinte`, nicht zu Ende gelesene halb so hoch, wiedergelesene mit einem Strich darüber (1 px Tinte), was gerade gelesen wird, liegt quer (Papier mit Kontur 0,75 px Tinte), eigene Werke rechts als Umriss in Tinte (1,1 px).
- Gezeigt oder gewählt: Fläche in Tinte.
- Achse: Jahreszahlen aufrecht, Grad klein, Tinte, Mediävalziffern mit fester Breite. Bruchstellen der Stauchung als feine Linie in Tinte, 0,9 px.
- Darunter die Buchzeile (Höhe 1 z reserviert, Telefon 2 z), dann die Reihen „die wichtigsten aus Kindheit und Jugend“ (`--zb-kind`) und „was noch wartet“ (Kontur `--zb-warte`). Ihre Namen aufrecht, Grad klein, Tinte, 1 z darüber.
- Darunter ¾ z, dann „Die ganze Bibliothek“ als Verweis mit dem Satz von A.
- Telefon: Band im eigenen Rahmen, waagrecht scrollbar, beim Laden am rechten Ende. Kein Mitschieben beim senkrechten Scrollen.

### 6.12 Regal (Bibliothek)

- Oben das Brett „Was ich schreibe und was auf dem Nachttisch liegt“: *Satoshi*, der Schuber mit den drei Bänden von *Ursprung*, Erzählungen, *Untertext*, Länder (wie A), daneben der Nachttisch.
- Darunter die Bretter nach Zeiten (Fächer von A), dann „die wichtigsten aus Kindheit und Jugend“, dann „was noch wartet“ als Liste (6.14).
- Rücken: Familienfarben nach 4.2, Maße, Lücken, liegende und lehnende Bücher wie A.
- Zeichen für die Leseart nach 21, in der Schriftfarbe des Rückens: ein Punkt mit 3 px Durchmesser 6 px über dem Fuß, ein Strich von 1 px über dem Kopf, eine gestrichelte Kontur von 1 px (Strich 3 px, Lücke 2 px), eine gepunktete Kontur von 1 px (Punkt 1 px, Lücke 2 px).
- Brett: `--brett`, 4 px hoch. Darunter die Regalschilder, aufrecht, Grad klein, Tinte, Wortlaut von A.
- Standortregister über den Brettern, haftend wie A: die Zeiten als Auswahlliste, Grad klein, Tinte, ohne Strich, das aktuelle Fach halbfett, Einträge durch 1 em Abstand getrennt, ohne Striche dazwischen.
- Zeigen: Kontur 1,5 px Tinte, Name über dem Rücken. Klick: Herausziehen und Buchzeile.
- Schuber: Ein Klick öffnet ihn, die drei Bände gleiten in 300 ms `ease-out` heraus. Bei reduzierter Bewegung stehen sie sofort.

### 6.13 Buchzeile

- Ein Satz im Grad Text unter dem Brett, ¼ z Abstand, linksbündig mit dem Brett: „Autor, *Titel*. Zuerst erschienen Jahr. Verlag, Seiten Seiten.“ Bei Auszügen folgt „In Auszügen gelesen.“ (V50). Bei eigenen Werken Titel, Art und Stand und der Verweis auf die Seite.
- Höhe einer Zeile reserviert, auf dem Telefon zwei.
- Beim Zeigen genügt der kurze Name über dem Rücken. Die Buchzeile erscheint beim Klick.
- `aria-live="polite"`. Escape oder ein zweiter Klick schließt.
- Keine Signatur, kein „zurücklegen“, kein Kasten.

### 6.14 Leseliste und Nachttisch

- „was noch wartet“: Liste, je Zeile „Autor, *Titel*“, Grad Text, am Desktop zwei Spalten mit 2 z Abstand, Telefon einspaltig, nach Erscheinungsjahr. Einträge ¼ z auseinander. Jeder Eintrag lässt sich zeigen und wählen wie ein Rücken (Auswahlliste nach 07) und öffnet seine Buchzeile.
- Nachttisch: zwei Stapel liegender Bücher in den Farben ihrer Familie, bündig, das größte zuunterst, ohne Versatz und ohne Bewegung beim Zeigen. Darunter „Auf dem Nachttisch“, Grad klein.

### 6.15 Länderregister

- Ein Absatz je Kontinent, hängender Einzug 1 em: das Stichwort in Kapitälchen, ein Leerzeichen, die Länder alphabetisch, Komma getrennt.
- Jeder Name ein Knopf, der den Globus zum Land dreht. Strich nach 07. Gewähltes Land halbfett. Lange Namen dürfen umbrechen.
- Über dem Register „Länderguides, in Arbeit.“ und der Satz von A zum Grau.

### 6.16 Stationen der Vita und Bild

- Bild: oben in der rechten Spalte, `width: min(100%, 24em)`, Seitenverhältnis 3 : 4, ohne Rahmen. Darunter ¼ z die Legende im Grad klein.
- Stationen: `h2` „Stationen“, darunter die Liste von A. Die Jahreszahl hängt im Steg zwischen den Spalten (rechtsbündig, Mediävalziffern mit fester Breite), dann Ort, Komma, Tätigkeit im Grad Text, in der nächsten Zeile die Koordinaten im Grad klein. Einträge ¼ z auseinander. Nebenorte gleich groß und gleich dunkel.
- Darunter der Verweis von A „… auf dem Globus“.

### 6.17 Leseseite

- Titel `h1` in Tinte. Unterzeile, Ort und Datum im Grad klein, aufrecht.
- Text in der Satzbreite, Absätze ¾ z.
- Szenenwechsel: drei Sternchen in der Mitte („* * *“), Tinte, 1 z darüber und darunter.
- Notiz am Ende im Grad klein, aufrecht, 2 z Abstand.
- Keine Koordinaten.

### 6.18 Impressum und Datenschutz

- Eine Spalte in der Satzbreite. `h1`, darunter der Entwurfsvermerk im Grad klein, aufrecht, 1 z Abstand.
- Abschnitte mit `h2` nach 3.6. Absätze ¾ z.
- Die Rechte als Liste mit hängendem Halbgeviertstrich in Tinte, 1,1 em Einzug. Artikelangaben in Tinte, nicht getrennt.
- „Stand: …“ am Ende im Grad klein.

### 6.19 Leere Seiten (Erzählungen, *Untertext*)

- Sie bleiben in der Navigation (V66). Titel, eine ruhige Zeile im Grad Text, die sagt, dass noch kein Text dasteht, kein Beispieltext. Den Wortlaut prüfen die Texter.
- Kommt ein Text in `daten/texte.js`, erscheint er als Liste: Titel (Erzählungen in „…“ nur im Satz, als Listeneintrag schlicht), Datum im Grad klein dahinter.

### 6.20 Die vier Arten von Bedienung

| Art | Beispiele | Ruhe | Zeigen und Fokus | gewählt | nicht verfügbar |
|---|---|---|---|---|---|
| Verweis im Text | E-Mail, Werktitel im Werkverzeichnis, „Vita“, Impressum | Strich 1 px | Strich, Fokusrahmen | – | – |
| Bedienwort im Satz | Kartenwahl, Kontinente, Orte im Text der Ebene | Strich 1 px | Strich, Fokusrahmen | halbfett, ohne Strich | – |
| Auswahlliste | Navigation, Ortsleisten, Länderregister, Standortregister, Leseliste | ohne Strich (Touch: Strich) | Strich, Fokusrahmen | halbfett, ohne Strich | – |
| Steuerwort | früher, später, Steuerwort, „Eintragen“ | Strich 1 px | Strich, Fokusrahmen | – | `--leise`, ohne Strich, `disabled` |

Knöpfe sind `<button>` ohne Rahmen, Grund und Radius. Verweise sind `<a>`. Kein Pfeil, kein „Mehr erfahren“.

---

## 7. Bewegung

### 7.1 Was sich bewegt und warum

| Was | Wo | Wie lange | Warum |
|---|---|---|---|
| Einflug des ersten Satzes | Startseite | 1,0 s, bei jedem Laden | V13 |
| Einspieler Leben | Startseite | rund 15 s | V22, M7 |
| Einspieler *Satoshi* | Startseite (Ebene), *Satoshi* | rund 14 s, ohne Szenentext | M7, V32 |
| Einspieler *Ursprung* | Startseite (Ebene), *Ursprung* | rund 15 s, langsamer je Ort | V23 |
| Abspielen mit Szenentext | Startseite (Ebene), *Satoshi* | je Szene 3 bis 9 s Halt | Nachtrag 1, Punkt 5 |
| Flug nach Klick, früher, später | alle Globen | 1,0 s | V26 |
| Leselinie führt den Globus | *Ursprung*, ab 62,0625 rem | Flug 1,0 s | E19, V10 |
| Drehen und Zoomen | alle Globen | folgt der Hand | V26 |
| Herausziehen eines Rückens | Regalbild, Bibliothek | 160 ms, 12 px | V53 |
| Schuber öffnen | Bibliothek | 300 ms | M9 (kleine Entdeckung) |

### 7.2 Takt der Einspieler

| Einspieler | Flug | Halt | Vergrößerung | Gesamt |
|---|---|---|---|---|
| Leben | 1,0 s je Station, Rückweg eines Abstechers 0,5 s ohne Halt | 0,6 s | Europa 3,6-fach, Colombo, Cotonou, Kaohsiung 2,4-fach, am Ende Überblick | rund 15 s |
| *Satoshi* | 0,9 s | 0,4 s | fest 1,2-fach, die Kugel dreht nur, am Ende Überblick | rund 14 s |
| *Ursprung* | 1,6 s | 2,0 s | fest 3,3-fach (Blick von A auf die Region) | rund 15 s |
| Abspielen *Satoshi* | 1,0 s | 1,5 s plus 0,3 s je Wort des Szenentexts, mindestens 3 s, höchstens 9 s | 2,4-fach, Europa 3,6-fach | je nach Text |

Easing der Flüge: `d3.easeCubicInOut`. Kein Nachfedern, keine Trägheit.

### 7.3 Was sich nicht bewegt

- Kein Einblenden beim Scrollen. Kein Heben unter der Maus. Keine Farbübergänge. Der Strich unter der Maus erscheint sofort.
- Kein Mitschieben des Zeitbands. Kein Aufklappen von selbst. Keine Überblendung der Bände.
- Keine Dauerdrehung, kein Pendeln im Leerlauf.
- `transition` steht im Stylesheet nur an zwei Stellen: Herausziehen und Schuber.

### 7.4 Reduzierte Bewegung

Bei `prefers-reduced-motion: reduce`:

- Der erste Satz steht sofort.
- Kein Einspieler. Der ganze Weg steht, die Tafel zeigt den Endzustand.
- Flüge werden Sprünge (Dauer 0).
- Das Steuerwort entfällt. Früher, später und Klicks bleiben.
- Rücken und Schuber ohne Übergang, aber mit derselben Lage.

---

## 8. Technik

### 8.1 Schriften

Dateien nach `schrift/` (fertig in `scratchpad/lauf3/schrift-c/`):

- `vollkorn.woff2` und `vollkorn-kursiv.woff2`: aus `Vollkorn[wght].ttf` und `Vollkorn-Italic[wght].ttf` (raw.githubusercontent.com/google/fonts/main/ofl/vollkorn/), Gewichtsachse mit `fontTools.varLib.instancer` auf 400 bis 600 begrenzt.
- `im-fell-french-canon.woff2`: aus `IMFeFCrm28P.ttf` (…/ofl/imfellfrenchcanon/).
- Teilmenge: U+0020–007E, U+00A0–017F, U+0192, U+02C6, U+02DA, U+02DC, U+2009, U+200A, U+2010–2014, U+2018–201A, U+201C–201E, U+2020–2022, U+2026, U+202F, U+2030, U+2032, U+2033, U+2039, U+203A, U+20AC, U+2122, U+2190–2193, U+2212. Geprüft: Alle Zeichen der heutigen Seiten und Daten liegen darin, außer „⌘“.
- Funktionen: kern, liga, calt, ccmp, locl, mark, mkmk, onum, lnum, pnum, tnum, smcp, c2sc, case, frac, numr, dnom.
- Lizenzen: `schrift/OFL-Vollkorn.txt`, `schrift/OFL-IM-Fell-French-Canon.txt`.

In `stil.css`:

```css
@font-face { font-family: "Vollkorn"; src: url("schrift/vollkorn.woff2") format("woff2"); font-weight: 400 600; font-style: normal; font-display: swap; }
@font-face { font-family: "Vollkorn"; src: url("schrift/vollkorn-kursiv.woff2") format("woff2"); font-weight: 400 600; font-style: italic; font-display: swap; }
@font-face { font-family: "IM Fell French Canon"; src: url("schrift/im-fell-french-canon.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: swap; }
```

Im Kopf jeder Seite `<link rel="preload" href="schrift/vollkorn.woff2" as="font" type="font/woff2" crossorigin>`, auf Startseite und Vita zusätzlich für die IM Fell. Kein Link zu Google, kein `preconnect`. `FSeite.schriften()` wartet auf `19px "Vollkorn"` und `italic 19px "Vollkorn"`, nicht mehr auf „Vollkorn SC“.

### 8.2 Bibliotheken

`website-b/lib/` nach `lib/` kopieren: `d3.min.js` (7.9.0), `topojson-client.min.js` (3.1.0), `LICENSE-d3.txt`, `LICENSE-topojson-client.txt`. Die Seiten laden `lib/d3.min.js` und `lib/topojson-client.min.js` statt jsDelivr.

### 8.3 Daten

- `daten/` wie A. Dazu `daten/fluesse.js` aus `website-b/daten/` (nur *Ursprung*).
- Für die Abstecher ändern sich die Daten nicht, die Reihenfolge in `INHALT.leben` reicht (14b).
- Rückenfarben und Globusfarben stehen als Werte aus Abschnitt 4 in `bibliothek.html` und `seite.js`.

### 8.4 Kern

`globus/kern.js` von A ist die Grundlage. Aus B kommen: die Datenregel, Namen in Bewegung, das dichter werdende Gradnetz, das Drehen mit einem Finger, die feste Flugdauer, `routeBauen` und das Zeichnen der Flüsse (nur die Linien). Nicht aus B: Blauplatte, Rahmen, Ring, Schraffur, Gewässernamen, `willReadFrequently`. Für den Einspieler bekommt `g.chronik` die Werte aus 7.2 als Einstellungen, dazu Anhalten und Fortsetzen.

### 8.5 Bau

- `werkzeuge/artefakt.py` nach dem Vorbild von `website-b/werkzeuge/artefakt.py`: Quelle `website-c/`, Vergleich von `daten/` mit `website/daten/`, erlaubte eigene Dateien nur `fluesse.js`.
- Der Bau entfernt alle Kommentare aus HTML, CSS und den eigenen Skripten (nicht aus `lib/`) und prüft, dass keiner übrig ist. Die Arbeitsdateien in `website-c/` behalten ihre Kommentare.
- Die Hauptseite verliert ihr Gerüst wie in B, die übrigen Seiten behalten es.
- `README.md` von C beschreibt Aufbau und Bau.
- `werkzeuge/aenderungsprotokoll.md` führt jede Abweichung von diesem Dokument.

### 8.6 Datenschutz und Kolophon

- **Text:** Die Abschnitte „Schriften von Google Fonts“ und „Programmbibliotheken von jsDelivr“ werden „Schriften“ und „Programmbibliotheken“ in der Fassung von B, mit „Vollkorn und IM Fell French Canon“ statt „Baskervville“. Der Satz zu den USA und der Satz „Für die endgültige Website werden die Schriften auf dem eigenen Server liegen …“ entfallen. Der Hinweis auf claude.ai als Hoster bleibt, er ist in der Testphase wahr.
- Das Kolophon bleibt im Wortlaut von V64. Die Schriften sind dieselben, die Flüsse kommen ebenfalls von Natural Earth, der Satz bleibt wahr.

### 8.7 Prüfungen

- Keine Anfrage an fremde Server: alle elf Seiten mit Playwright laden, jede Anfrage an einen anderen Host als den lokalen Server zählt als Fehler. Soll: 0.
- Keine Konsolenfehler auf allen elf Seiten.
- Ohne Skript: Seiten lesbar, Ersatzsätze an Globus und Regal (A).
- Kein `localStorage` und kein `sessionStorage` nötig. Wird doch etwas gespeichert, dann in `try … catch`, und die Seite funktioniert auch ohne.
- Zustände von A bleiben: Sprungmarke, sichtbarer Fokus, `aria-pressed`, `aria-live` an Tafel und Buchzeile, Vorlesekopie des ersten Satzes, `noscript`-Hinweise.

---

## 9. Die Seiten

### 9.1 Startseite (`index.html`)

**Desktop.** Erster Bildschirm wie A: links in der Spalte Kopf, der erste Satz (Einstieg, fliegt ein), die Kurzvita (V15, Wortlaut unverändert, „Ausführlich in der Vita.“ als Teil des Absatzes in Tinte), die Kartenwahl und der Text der Ebene mit der Ortsleiste. Rechts die Kugel vom oberen Rand, angeschnitten, darunter die Tafel mit der Steuerzeile. Der Einspieler Leben beginnt, sobald die Kugel steht. 3 z darunter „Was ich schreibe“: links das Werkverzeichnis, rechts an der Kante der Kugel das Regalbild. 3 z darunter „Was ich gelesen habe“: Vorwort in der Satzbreite, das Zeitband über die ganze Breite zwischen den Rändern, die zwei Reihen, der Verweis auf die Bibliothek. Dann der Fuß.

**Telefon.** Kopf mit offener Navigation, erster Satz, Kurzvita, Kartenwahl, Text der Ebene, Kugel in voller Breite, Tafel. Der Einspieler beginnt, wenn die Kugel zur Hälfte im Bild ist. Dann „Was ich schreibe“ mit dem Regalbild über dem Verzeichnis (A), „Was ich gelesen habe“ mit dem Zeitband im eigenen Rahmen, dann der Fuß.

**Erster Bildschirm bei 1440 × 900:** fünf Grade (Einstieg, groß, Überschrift, Text, klein), rund 7 unterstrichene Wörter, kein Grau außer einem leisen „später“ am Ende des Einspielers.

### 9.2 *Satoshi* (`satoshi.html`)

**Desktop ab 62,0625 rem.** Globusband wie auf der Startseite: links Kopf, `h1` „Satoshi“ (groß, aufrecht), Unterzeile (Grad Text), der Vorspann „Am 31. Oktober 2008 …“ (Grad Überschrift, Zeilenhöhe 1,25 z), darunter die Zeitleiste (6.8) mit dem Satz zu den weiteren Schauplätzen. Rechts die Kugel, angeschnitten, nicht haftend, darunter die Tafel mit Steuerzeile. 2 z unter dem Ende des Globusbands beginnt der Klappentext.

**Ab 75 rem** ist der Teil darunter eine Doppelseite:

| linke Spalte (Satzbreite, ab `--rand-l`) | rechte Spalte (ab `--globuskante`, höchstens 24 em) |
|---|---|
| Klappentext | Eckdaten |
| Gebaut wie ein Protokoll, mit den Kapiteltagen als Register | Die Figuren |
| Die Frage hinter dem Roman | |
| Wie er gemacht ist | |
| der Satz für Verlage und Agenturen | |

Beide Spalten beginnen auf einer Höhe. Die Kapiteltage stehen als Register in drei Spalten: Jahr (3 em, Mediävalziffern mit fester Breite), Tag (7,5 em), Ereignis. Einträge ¼ z auseinander, alles in Tinte.

**Zwischen 62 und 75 rem** eine Spalte in der Reihenfolge von A: Klappentext, Eckdaten, Gebaut wie ein Protokoll, Die Figuren, Die Frage hinter dem Roman, Wie er gemacht ist.

**Telefon.** `h1`, Unterzeile, Vorspann, Zeitleiste, Kugel, Tafel, dann direkt der Klappentext und die übrigen Abschnitte in der Reihenfolge von A.

Figuren: `h3` mit dem Namen in Kapitälchen, Komma, die Rolle im Grad Text, darunter ¼ z der Text. Zwischen Figuren ¾ z.

### 9.3 *Ursprung* (`ursprung.html`)

**Desktop.** Links Kopf, `h1` „Ursprung“, Unterzeile, Einleitung, die Ortsleiste. Dann die drei Bände (6.9) und der Satz zur Bibliothek. Rechts die Kugel ohne Grenzen, mit Flüssen, haftend am oberen Rand wie A, darunter die Tafel mit Steuerzeile. Der Einspieler läuft, sobald die Kugel steht. Danach führt die Leselinie (45 % der Fensterhöhe) die Kugel zum Band, den man liest.

**Telefon.** `h1`, Unterzeile, Einleitung, Ortsleiste, Kugel, Tafel, dann die Bände. Die Kugel haftet nicht. Kein Aufklappen von selbst, kein Kolumnentitel.

### 9.4 Bibliothek (`bibliothek.html`)

**Desktop.** `h1`, Vorspann und Zeichenerklärung in der Satzbreite (Texter). Darunter über die ganze Breite: das Standortregister, haftend, dann das obere Brett mit den eigenen Werken und dem Nachttisch, die Bretter nach Zeiten mit ihren Schildern, „die wichtigsten aus Kindheit und Jugend“, „was noch wartet“ als Liste in zwei Spalten. Unter jedem Brett die Buchzeile. Darunter der Satz von A, dass dieselben Bücher auf der Startseite auf einer Zeitachse stehen.

**Telefon.** Dieselbe Folge in einer Spalte, Bretter in der Breite des Fensters umbrochen wie A, Leseliste einspaltig.

### 9.5 Vita (`vita.html`)

**Desktop.** Zwei Spalten. Links (`minmax(29em, 31em)`): `h1` „Vita“, der erste Satz in IM Fell (groß, stehend), sein Vita-Text. Rechts: das Bootsfoto oben (bis 24 em), die Legende, darunter „Stationen“ mit den zwölf Einträgen und dem Verweis auf den Globus. Bei 1440 × 900 stehen Titel, erster Satz, der Anfang des Texts und das Foto im ersten Bildschirm.

**Telefon.** `h1`, Foto in voller Breite mit Legende, erster Satz, Text, Stationen.

### 9.6 Länder (`laender.html`)

**Desktop.** Links `h1` „Länder“, „Länderguides, in Arbeit.“, der Satz zum Grau, das Register. Rechts die Kugel wie A, angeschnitten, bereiste Länder in #C4C7CC. Ein Klick auf einen Namen dreht die Kugel und zeigt das Land.

**Telefon.** `h1`, die zwei Sätze, Kugel, Register.

### 9.7 Erzählungen und *Untertext*

Kopf, `h1`, eine Zeile (6.19), Fuß. Am Desktop und auf dem Telefon gleich, eine Spalte in der Satzbreite.

### 9.8 Leseseite (`lesen.html`)

Kopf, dann der Text nach 6.17 in der Satzbreite, Fuß. Gleich auf allen Breiten.

### 9.9 Impressum und Datenschutz

Kopf, dann eine Spalte nach 6.18, Fuß. Gleich auf allen Breiten.

---

## 10. Standardentscheidungen, die Dominik morgen prüfen sollte

Hier steht alles, was ich für dich entschieden habe, wo du vielleicht etwas anderes willst. Antworte kurz mit der Nummer, etwa: „3 Kapitälchen, 19 einspaltig.“

1. **Erster Satz 38 px groß,** an die Spalte angepasst. Alternative: 28,5 px wie in der Referenzregel R1, dann ruhiger.
2. **Einflug Wort für Wort in 1,0 s, bei jedem Laden.** Alternative: Glied für Glied, oder nur beim ersten Besuch einer Sitzung.
3. **Name im Kopf in gewöhnlicher Vollkorn.** Alternative: Kapitälchen ohne Sperrung wie ein Briefkopf.
4. **Tagline unter dem Namen, im Textgrad.** Alternative: in derselben Zeile hinter dem Namen (wie B).
5. **Navigation auf dem Telefon offen in zwei Zeilen.** Alternative: hinter dem Wort „Inhalt“ wie A.
6. **Werktitel in der Navigation kursiv.** Alternative: aufrecht wie in B.
7. **Kapitälchen nur für Figurennamen und Kontinente.** Alternative: auch Abkürzungen wie AIESEC und DSGVO, oder gar keine.
8. **Absätze überall ¾ Zeile auseinander.** Alternative: ½ Zeile wie A oder eine ganze wie Republik.
9. **Ein Grau nur für Zustände** (ein nicht verfügbares „früher“). Alternative: kein Grau, das Wort verschwindet dann (B).
10. **Unterstreichung 1 px in voller Textfarbe.** Alternative: die Linie, die der Browser von selbst zeichnet.
11. **Papierweiß #FFFEFC.** Alternative: reines Weiß.
12. **Bereiste Länder kühles Hellgrau, deutlicher als in A.** Alternative: feine Schraffur in Graphit.
13. **Kein Farbakzent, auch nicht für Orte.** Du hattest „ein Akzent: Orte“ gewählt. Alternative: Weg und Punkte in einer einzigen Farbe.
14. **An jedem Globus dieselbe Bedienung:** früher, später und ein Wort, das „Anhalten“, „Abspielen“ oder „Noch einmal von vorn“ heißt. Alternative: zwei getrennte Knöpfe, oder „zurück“ und „weiter“ statt „früher“ und „später“.
15. **Dauer der Einspieler** rund 15 s (Leben), 14 s (*Satoshi*), 15 s (*Ursprung*). Alternative: kürzer oder länger.
16. **Jede Ebene der Startseite spielt beim ersten Zeigen einmal.** Alternative: nur das Leben spielt, die anderen Ebenen stehen sofort ganz da.
17. **Die Bände von *Ursprung* stehen im Text sofort da,** das Entfalten zeigen Globus und Tafel. Alternative: die Bände blenden im Takt ein wie A.
18. ***Satoshi*: Zeitleiste in der linken Spalte neben dem Globus,** Tafel unter dem Globus, Klappentext gleich nach dem Globusband. Alternative: die Zeitleiste unter dem Globus in der rechten Spalte.
19. ***Satoshi* unten als Doppelseite,** rechts Eckdaten und Figuren. Alternative: einspaltig wie A.
20. **„Karteikarte“ bei Satoshi Nakamoto bleibt ein Wort ohne Verweis.** Alternative: ein kurzer Satz mit den Angaben darunter.
21. **Der Vorspann von *Satoshi* („Am 31. Oktober 2008 …“) im Überschriftengrad.** Alternative: im Textgrad.
22. **Koordinaten auch an der Tafel von *Satoshi*** (wie A). Alternative: dort weglassen, an Startseite, Vita und *Ursprung* bleiben sie.
23. **Regal: Lücken, lehnende und liegende Bücher wie A,** Bleistift und Lesezeichen werden Punkt, Strich und gestrichelte Kante. Alternative: das Regal ohne Lehnen und Lücken (B).
24. **Rückenfarben gedämpft, Familien bleiben.** Alternative: alle Rücken in einem Ton.
25. **Herausziehen beim Klick: 12 px nach oben in 160 ms,** beim Zeigen nur eine Kante. Alternative: gar keine Bewegung.
26. **Buchzeile als Satz statt Karteikarte.** Alternative: eine schlichte weiße Karte mit „schließen“.
27. **Zeitband auf dem Telefon startet am rechten Ende** (das Neueste und deine Werke). Alternative: am linken Ende bei Gilgamesch.
28. **Schuber bleibt und öffnet in 300 ms.** Alternative: drei einzelne Rücken ohne Schuber.
29. **Vita: Foto größer (bis 456 px) oben rechts, Stationen darunter.** Alternative: Foto unter den Stationen wie A.
30. **Kein Foto auf der Startseite.** Alternative: das Bootsfoto klein neben der Kurzvita.
31. **Bandüberschrift „Band I  Kreise ohne Wiederkehr“, aufrecht.** Alternative: nur die Ziffer, oder der Titel kursiv.
32. **Die Zeile aus dem Exposé bei Band I aufrecht.** Alternative: kursiv wie A.
33. **Keine Koordinaten unter Erzählungen.** Alternative: wie A, mit Koordinaten.
34. **Die Kugel bleibt auch gezoomt am Rand angeschnitten** (wie A). Alternative: gezoomt rückt sie ganz ins Bild.
35. **Flüsse auf *Ursprung* ohne Namen.** Alternative: Euphrat, Tigris, Jordan und Nil klein beschriftet.
36. **Leselinie auf *Ursprung*: Der Globus folgt dem Band, den du liest** (wie A). Alternative: Der Globus steht, er bewegt sich nur auf Klick.
37. **Fuß ohne Überschrift „Kontakt“,** E-Mail-Zeile im Textgrad, der Rest klein. Alternative: die Überschrift zurück.
38. **Länderregister auf dem Telefon unterstrichen,** am Rechner erst beim Zeigen. Alternative: überall ohne Strich.
39. **Mallorca als Abstecher von Berlin aus.** Das hattest du nicht ausdrücklich genannt.
40. **Kapstadt, Sansibar und Buenos Aires auf keinem Globus** (V28). Alternative: eine kleine Karte in der Vita, dann als Abstecher von Berlin.

Offen bleiben außerdem die Fragen aus `dominik-vorgaben.md`, Übersicht 3 (etwa die Postleitzahl 10936 oder 10963). Sie halten den Bau nicht auf. C übernimmt dort den Stand von A.

---

## Anhang A: Prüfliste für den fertigen Bau

Gemessen mit `scratchpad/lauf3/referenzen/skripte/messen.cjs` an Startseite, Vita und *Satoshi*, bei 1440 × 900 und 390 × 844, dazu Sichtprüfung bei 1280 × 800, 1920 × 1080 und 360 × 740.

- [ ] Grade im ersten Bildschirm: höchstens fünf, Zeichnungen nicht mitgezählt.
- [ ] Kursiv: höchstens 5 % der Zeichen, nur in `i`, `em`, `cite`.
- [ ] Kapitälchen nur an Figurennamen und Kontinenten. Keine Sperrung außer den 0,04 em dort.
- [ ] Kein Text unter 4,5 : 1. Text unter 7 : 1 nur für Zustände, unter 2 % der Zeichen.
- [ ] Absatzabstand in Prosa auf jeder Seite ¾ z, kein anderer Wert.
- [ ] Alle senkrechten Abstände auf den Stufen aus 5.1.
- [ ] Lesetext bei 1280 mindestens 55 Zeichen je Zeile, auch in der Vita.
- [ ] Keine waagrechte Bildlaufleiste bei 360 px.
- [ ] Startseite: höchstens 8 unterstrichene Elemente im ersten Bildschirm.
- [ ] Keine Farbwerte außerhalb von `stil.css`, `FARBEN` in `seite.js` und `FAMILIEN` in `bibliothek.html`.
- [ ] 0 Anfragen an fremde Server auf allen elf Seiten. 0 Konsolenfehler.
- [ ] Im Bau keine Kommentare in HTML, CSS und eigenen Skripten.
- [ ] Erster Satz: Flug höchstens 1,1 s, die Kugel zeichnet vor dem Ende des Flugs ihr erstes Bild.
- [ ] Zoomen über Berlin bei 6-fach: in Bewegung höchstens 17 ms je Bild im Prüfbrowser.
- [ ] Einspieler: Satoshi zeigt dabei keinen Szenentext. Jeder Griff an die Kugel beendet ihn.
- [ ] Reduzierte Bewegung: kein Einflug, kein Einspieler, kein Steuerwort, Flüge springen.
- [ ] Trefferflächen auf dem Telefon mindestens 44 px hoch.
- [ ] Inhalt: kein Fort Meade, kein Hinweis auf das Ende, keine Zahl 67, keine Buchzahlen, Simon-Kucher nur in der Vita, „in Arbeit“ für die Trilogie, Anschrift und Mail wie A, Kapstadt 2024, Sansibar 2025, Buenos Aires 2026.
- [ ] Dominiks Texte aus Übersicht 1 von `dominik-vorgaben.md` wörtlich wie in A, Abweichungen nur als Tippfehler in `text-aenderungen-c.md`.
- [ ] Fünf-Sekunden-Test für die Kritik: Wie beschreiben Verlagsleute, Agenturen und Leser den ersten Bildschirm in drei Adjektiven? Ziel: souverän, literarisch, mit Freude gemacht. Nicht süß, nicht steif.

## Anhang B: Was in C bewusst bleibt, obwohl es auf der Liste steht

Nach V03 bleibt ein KI-typisches Element, wenn es deutlich besser ist oder Dominik es will.

| Rang | Merkmal | Wo in C | Warum es bleibt |
|---|---|---|---|
| 9 | Serife | Vollkorn | Anmutung von A (V02), steht auf keiner Liste |
| 25 | Ladeauftritt | Einflug des ersten Satzes | V13, gekürzt auf 1,0 s, blockiert nichts |
| 21 | Tagline | „Schriftsteller und Reisender“ | V14, sein Wortlaut |
| 26 | Mikro-Metadaten | Koordinaten | V29, an Karte, Vita und Bänden |
| 27 | Prunkstück | der Globus | echte Daten, eigener Bau, jede Bewegung zeigt einen Weg |
| 56 | Bewegung ohne Zutun | Einspieler, Leselinie auf *Ursprung* | V22, V23, M7, anhaltbar, endet bei jedem Griff |
| 7 | gezeichnet statt fotografiert | Karte, Regal, Zeitband | Daten tragen die Geometrie, dazu das eine echte Foto, größer |
| 52, nah | gezeichneter Gegenstand | Rücken, Schuber, liegende Bücher | V53, Maße aus echten Daten, Requisiten sind weg |
| 55 | Jahresspalte | Stationen der Vita, Kapiteltage | echte Chronologien |
| 60 | Buchkonvention | Kolophon | V64, eine Quellenangabe |
| 35 | wiederholte Formel | „in Arbeit“ | V38 |
| 1, teilweise | Kapitälchen | Figurennamen, Kontinente | Buchsatz, eine einzige Sorte Stelle |
| 53, teilweise | Unterstreichung | Register auf Touchgeräten | sonst sieht man nicht, dass man tippen kann |
| 51 | Haarlinien | Kugelrand, Brett, Konturen | jede trennt etwas, zwischen Textabschnitten gibt es keine |
| 16, 17, 36 | Textmerkmale | in Dominiks Texten | seine Texte bleiben (V62) |
