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
- **Das Zoomen von B:** grob in Bewegung, fein in Ruhe, Namen auch beim Bewegen (V26, M1). Seit Runde 4 gezoomt mit den feinen Linien auch in Bewegung und ohne harten Wechsel (10).
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
- IM Fell French Canon Roman von Igino Marini nur für den ersten Satz, auf der Startseite und in der Vita. Seit Option B auch für den Vorspann auf *Satoshi* in der Zweispaltenlage, seit dem 23. Oktober auf allen Breiten (9.2, V79).
- Fertige, im Browser geprüfte Dateien liegen in `scratchpad/lauf3/schrift-c/`: `vollkorn.woff2` (57 KB), `vollkorn-kursiv.woff2` (48 KB), `im-fell-french-canon.woff2` (45 KB), `OFL-Vollkorn.txt`, `OFL-IM-Fell-French-Canon.txt`. Sie kommen nach `schrift/`. Laden und Teilmenge: Abschnitt 8.1.

**Grund:** Die Vollkorn trägt die Anmutung, die Dominik an A mag (V02), und steht auf keiner Liste (Prüfung, Rang 31). Das Kolophon nennt beide Schriften in seinem Wortlaut (V64), es bleibt damit wahr. Selbst ausliefern löst Rang 48 und den Datenschutz (E28).

### 02. Der erste Satz

**Wahl:** A, kürzer. **Dominiks Vorgabe geht vor:** Er hat „Einstieg einfliegend“ gewählt (V13). E02 und F2 empfahlen den stehenden Satz.

**Umsetzung:**
- Wortlaut unverändert, drei Glieder, jedes Glied eine Zeile: „Dominik Jäkel schreibt tagsüber / unter fremden Namen / und abends unter seinem eigenen.“
- IM Fell French Canon, Grad Einstieg: 38 px, Zeilenhöhe 1,5 z (42,75 px), Tinte. Das längste Glied ist in dieser Größe 557 px breit. Ist die Spalte schmaler, wird die Schrift kleiner, bis das Glied passt, am Desktop nicht unter 28,5 px, am Telefon nicht unter 20,7 px. Darunter bricht der Satz frei (die Logik `setzen()` aus A bleibt).
- Einflug Wort für Wort von rechts wie in A, aber kürzer: Weg 0,2 em (A: 0,3 em), je Wort 360 ms (A: 640 ms), 40 ms Versatz (A: 80 ms), 100 ms Pause zwischen den Gliedern (A: 230 ms), waagrechte Unschärfe höchstens 0,06 em, die beim Ankommen vergeht. Easing `cubic-bezier(.22, .7, .28, 1)`, kein Nachfedern. Gesamtdauer rund 1,0 s (A: 1,8 s). Die Unschärfe ist seit dem 23. Oktober eine unscharfe Kopie über jedem Wort (fester Filter), die in das scharfe Wort überblendet; das sind wie der Flug Animationen der Deckkraft, die ohne den Hauptfaden weiterlaufen, so bleibt kein Wort verwischt stehen, wenn die Seite gerade die Kugel aufbaut (vorher stellte ein Skript die Unschärfe in jedem Bild ein). Die Frist von 1200 ms gilt nach der Uhr: kommt die Zusage der Schrift erst nach einer langen Aufgabe, fliegt der Satz nicht mehr, und nie, wenn der Notbehelf ihn schon gezeigt hat.
- Der Flug beginnt, sobald die IM Fell geladen ist. Sie wird vorgeladen. Gewartet wird höchstens 1200 ms (A: 2,5 s; bis zum 23. Oktober 600 ms, V79: auf dem Telefon im Mobilnetz kam sie oft später, dann flog nichts). So lange ist der Satz unsichtbar und schon an die Spalte angepasst (in der Ersatzschrift Vollkorn). Ist sie dann nicht da, steht der Satz ohne Flug und wird angepasst, wenn sie kommt. Der Platz für drei Zeilen ist von Anfang an reserviert, nichts springt. Läuft das Skript nicht weiter, steht der Satz nach 2 s von selbst da.
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
5. Feste Flugdauer 1,0 s, Europa 3,6-fach. Seit Runde 4 gilt das nur noch für Flüge von Hand; die Abläufe fliegen nach der Entfernung 0,9 bis 1,6 s und sanfter (7.2).
6. Ruhebild 220 ms nach der letzten Bewegung, fein erst ab 1,8-fach. Am Ende eines Flugs gleich.
8. **Runde 4** (Dominik, 21. Oktober abends: „Dann wird der Globus kurz unscharf. Dann für eine Sekunde kommen die detaillierten Ränder … Und dann wandert er super schnell wieder weiter“). Kein harter Wechsel mehr zwischen grob und fein:
   - Die feinen Grenzen und Küsten stehen gezoomt auch in Bewegung: zwischen 1,6- und 2,1-fach blenden sie über die groben, höchstens in 300 ms; beim Herauszoomen im Flug gehen sie in 150 ms. Gezeichnet werden nur die Stücke, die die Kugel erreichen, ohne Punkte, die näher als 1 px beieinander liegen. Strichstärke und Farbe sind grob und fein gleich (wie bisher).
   - Grob bleibt in Bewegung nur die Fläche. Die feine Fläche blendet in Ruhe über 350 ms ein und beim nächsten Griff oder Flug über 300 ms aus; dabei folgt ihr Bild der Kugel.
   - In einem Ablauf steht die feine Karte an jedem Halt mindestens 1,5 s, nie kürzer. Die feinen Linien kommen dort nur auf dem Weg zu einem Halt und gehen auf dem Weg davon.
   - Die Ortsnamen setzt FSeite in Ruhe und in Bewegung an dieselben Stellen (vorher in Bewegung schlichte Namen des Kerns, die beim Halt an ihren Platz sprangen). Punkt 2 gilt so nicht mehr.
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
- ~~Am Globus eine Zeitleiste (6.8)~~ **Entfallen** (Dominik, 21. Oktober abends: „direkt den Globus unter dem Aufhänger“), mit der Zeile zu den weiteren Schauplätzen. Die Szenen erreicht man über früher, später und abspielen, über die Orte auf der Kugel und mit der Tastatur über die Steuerzeile.
- In Ruhe zeigt der Globus den ganzen Weg ohne Szenentext. Die Tafel zeigt dann „Von Buenos Aires bis Penang“ und die Zeile „Prolog 2001, Kernhandlung 2007 bis 2010, Epilog 2013.“
- Ein Klick auf einen Punkt des Globus wählt die Szene. Dann fliegt der Globus dorthin, und die Tafel zeigt Jahr, Ort, Koordinaten und den Text der Szene.
- ~~Der Einspieler zeigt nur Orte und Linien, nie Szenentext (Nachtrag 1, Punkt 5).~~ Seit Runde 2 (K9) zeigen Einspieler und Abspielen an jeder Station den Szenentext, seit Runde 3 in rund einer Minute für alle zehn Szenen (7.2).
- Die Szenentexte bleiben wie in A (V36, Text-Flagge 25 ist nur ein Vorschlag). Der London-Satz (V33), der Auftakt (V34) und die drei Absätze nach der Frage (V35) bleiben wörtlich.
- Titel in Tinte, aufrecht. Überschriften ruhig (04). Figurennamen in Kapitälchen, Rolle in Tinte.
- Ab 75 rem eine Doppelseite unter dem Globus: links der Lesetext, rechts Eckdaten und Figuren (9.2, Standardentscheidung 19). Beide Spalten beginnen unter der Kugel auf einer Höhe, wie in Runde 4; die Lage aus Runde 5 mit dem Klappentext neben der Kugel ist mit Option B entfallen (9.2).
- **Text:** „Karteikarte“ bei Satoshi Nakamoto ist Dominiks Wort aus dem Exposé und bleibt als Wort. Es öffnet keine Karte mehr (22, Standardentscheidung 20).

**Grund:** V32, M3, V36, V37.

### 19. *Ursprung*

**Titel seit Runde 5:** *Ursprünge* (Dominik, 22. Oktober: „Es muss Ursprünge heißen … (Überall)“), beschreibend „die Ursprungstrilogie“. Die Datei heißt weiter `ursprung.html`. Wo dieses Dokument *Ursprung* schreibt, ist das Werk gemeint.

**Wahl:** Mittelweg. **Dominiks Vorgabe geht vor:** Die Trilogie entfaltet sich langsam (V23). F17 hatte „klicken statt Wiedergabe“ empfohlen. Klicken kommt dazu.

**Umsetzung** (Aufbau in 6.9 und 9.3):
- Globus von A ohne heutige Grenzen, mit den Flüssen aus B (Euphrat, Tigris, Schatt al-Arab, Jordan, Nil; `daten/fluesse.js` aus `website-b/daten/`), 0,8 px in der Farbe der Küste, ohne Namen.
- Einspieler langsam: Göbekli Tepe, Uruk, Tyros, Jerusalem, die Linie wandert in der Reihenfolge der Bände (7.2).
- Seit dem 24. Oktober fliegt *Ursprünge* nicht mehr ein (V81; Dominik: „… dann das Einfliegen bei Ursprünge weglassen“): Die Kugel erscheint beim Laden schon nah über Göbekli Tepe mit Punkt, Ring und Namen, erst wenn die feine Karte steht, in 0,7 s eingeblendet; der Einspieler hält dort zum Lesen und gleitet dann ohne Herauszoomen nach Uruk, Tyros und Jerusalem, und die Leselinie unterbricht keinen Flug mehr.
- Danach führt die Leselinie den Globus zum Band, den man liest (A). Klick auf Orte und die Steuerzeile wie an jedem Globus.
- Bandüberschrift ohne Randziffer und ohne Siena (6.9). „Arbeitstitel“ hinter dem Titel im Grad klein, Tinte (V39).
- Ortszeile je Band mit Koordinaten (V29). Die Zeile aus dem Exposé aufrecht.
- Kein Aufklappen von selbst auf dem Telefon, kein lebender Kolumnentitel.
- Seine Texte bleiben wörtlich: V40 bis V44.

**Grund:** V23, V29, V39 bis V45. Flüsse sind Inhalt, heutige Grenzen um 8000 v. Chr. ein Anachronismus (E19). Randziffer Rang 55, Siena Rang 10, Kolumnentitel Rang 60.

### 20. Fuß, Kontakt, Kolophon, Newsletter

**Wahl:** der Fuß von A ohne die Überschrift „Kontakt“, in Tinte.

**Umsetzung** (6.2):
- Reihenfolge wie A: E-Mail-Zeile, Newsletter-Zeile, Impressum (seit Runde 6 ohne Anschrift, 6.2) und Datenschutz, der verborgene Platz für Profile, das Kolophon.
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
- Telefon: Das Band scrollt in seinem eigenen Rahmen, bewegt sich nur unter dem Finger und steht beim Laden am rechten Ende (Standardentscheidung 27). Am 23. Oktober stand es kurz am linken Ende bei Gilgamesch; zurückgenommen, weil dort die zwei Reihen darunter beim Laden leer im Bild waren.
- Ein Klick zeigt die Buchzeile als Satz (22). Auf dem Telefon steht dort in Ruhe grau der Satz zum Buch am Knopf von „gelesen“, beim Laden Gilgamesch, damit unter „früher“ und „später“ kein leerer Raum bleibt; ein Tipp darauf wählt es. Breiter bleibt die Zeile in Ruhe leer (V73, 6.11).
- In Ruhe stehen die Knöpfe aller drei Regler leer beim ältesten Buch ihrer Reihe, auf allen Breiten (V73, 6.11; bis zum 23. Oktober beim neuesten). Der leere Knopf von „gelesen“ steht damit schon beim Laden über der ersten Marke („Gilgamesch“, breit „Gilgamesch, um 1800 v. Chr.“); damit er ihr „G“ nicht berührt, stehen die Jahreszahlen des Reglers seit dem 23. Oktober 2 px tiefer (`reglerBauen`, `yT`). Breit deckt er weiter den kleinen Anfangsstrich der Achse, wie schon immer, wenn Gilgamesch gewählt war.
- Unter dem Band ein Regler, darunter „früher“ und „später“ (Runde 6, S9; Dominik: „Noch ein Pfeil oder Slider darunter?“). Breit ist der Regler die Achse des Bands, auf dem Telefon das ganze Band im Kleinen. Seit Runde 8 hat jede der drei Reihen ihren eigenen Regler (6.11).
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
| IM Fell French Canon Roman | `schrift/im-fell-french-canon.woff2` | der erste Satz (Startseite, Vita), der Vorspann auf *Satoshi* |

Es gibt keine dritte Schrift. Kursive Kapitälchen gibt es nicht. Steht ein Figurenname in kursivem Text, bleibt er kursiv ohne Kapitälchen.

### 3.2 Grade

| Grad | Desktop (ab 62,0625 rem) | unter 62 rem | Zeilenhöhe | Wofür |
|---|---|---|---|---|
| klein | 15,4375 px (0,8125 × Text) | 15 px | ¾ z (21,375 / 20,25 px) | Ortsleisten, Unterzeile und Koordinaten der Tafel, Bildlegende, Zeitbandachse und Bandnamen, Regalschilder, Zeichenerklärung, Fuß außer der E-Mail-Zeile, Kolophon, Vermerke, Hinweise am Globus, „Arbeitstitel“, „bis“, „seit“, „um“ an der Tafel |
| Text | 19 px (1,1875 rem) | 18 px | 1 z (28,5 / 27 px) | Lesetext, Kurzvita, Tagline, Navigation, Kartenwahl, Werkverzeichnis, Szenentext an der Tafel, Buchzeile, Leseliste, E-Mail-Zeile, `h3` |
| Überschrift | 23,75 px (1,25 × Text) | 22,5 px | 1,25 z (35,625 / 33,75 px) | `h2`, Name im Kopf, Ort an der Tafel, Vorspann auf *Satoshi* („Am 31. Oktober 2008 …“) unter 62 rem |
| groß | 28,5 px (1,5 × Text) | 27 px | 1,5 z (42,75 / 40,5 px) | `h1` Seitentitel, Jahr und Bandziffer an der Tafel, erster Satz der Vita |
| Einstieg | 38 px (2 × Text), höchstens so groß, dass das längste Glied in die Spalte passt, nicht unter 28,5 px | an die Spalte angepasst, höchstens 30 px, nicht unter 20,7 px | 1,5 z, unter 62 rem 1,25 z | der erste Satz der Startseite; zweispaltig der Vorspann auf *Satoshi* (9.2) |

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

Auf Touchgeräten ist jede Bedienung mindestens 44 px hoch: Navigation, früher, später, Steuerwort, Ortsleisten, Kartenwahl, Länderregister, „Eintragen“, Rücken, die Regler des Zeitbands. Wörter im Satz bekommen die Fläche über `padding-block` mit gleich großem negativem `margin-block`, damit die Zeile nicht wächst.

---

## 6. Bausteine

### 6.1 Kopf und Navigation

- Desktop: Name (Grad Überschrift), darunter „Schriftsteller und Reisender“ (Grad Text), eine Zeile tiefer die Navigation (Grad Text). Auf Seiten mit Globus steht der Kopf in der Breite der linken Spalte und hat die feste Höhe `--kopf-h`. Die Navigation darf wie in A über die Spalte hinaus bis kurz vor die Kugel laufen und bricht, wenn nötig, nach „Untertext“.
- Reihenfolge der Navigation wie A: *Satoshi*, *Ursprung*, Erzählungen, *Untertext*, Länder, Bibliothek, Vita.
- Verweise ohne Strich, Strich beim Zeigen. Aktuelle Seite halbfett, ohne Verweis (`aria-current="page"`). Auf der Leseseite steht die Liste, zu der ein Text gehört, halbfett und bleibt ein Verweis.
- Telefon: Name, Tagline, dann die Navigation offen in zwei Zeilen. Kein Schalter, kein Menüzeichen.
- Seit 25. Oktober (V86) steht die Navigation auf dem Telefon und dem Tablet ein zweites Mal am Fuß jeder Seite (6.2).
- Sprungmarke „Zum Inhalt“ wie A.

### 6.2 Fuß

Von oben nach unten, alles linksbündig in der Satzbreite:

0. Seit 25. Oktober (V86, Vorschlag A aus dem Navigationstest): die fünf Menüwörter wie oben, eine Abschrift der Navigation (`FSeite.fuss` setzt sie mit `fussNavigation()`, `nav.fuss-nav`, `aria-label` „Website“, die jetzige Seite halbfett mit `aria-current`, keine doppelten ids), gesetzt wie oben und auf dem Telefon wie oben nach „Länder“ gebrochen, 1 z über der Zeile mit den Anfragen, jede Trefferfläche 44 px hoch. Nur schmal bis 62 rem oder mit dem Finger (Telefon, Tablet hoch und quer); breit mit der Maus `display: none`. Ohne Skript entfällt sie. Grund: vom Seitenende zurück zum Menü vorher bis 19 Wischer (Bibliothek, 393 px), quer bis 33; jetzt ein Tipp.
1. „Anfragen zu Lesungen und zu den Romanen:“ und die E-Mail-Adresse als unterstrichener Verweis. Grad Text. Wortlaut und Adresse wie A.
2. Die Newsletter-Zeile, Wortlaut wie A: „Eine E-Mail, wenn ein Buch erscheint oder eine Lesung ansteht:“, dahinter das Feld und „Eintragen“. Grad klein. Das Feld ist ein Strich von 1 px in Tinte, ohne Rahmen, ohne Rundung, 16 em breit. Beim Fokus wird der Strich 2 px. „Eintragen“ ist ein unterstrichenes Wort. Auf dem Telefon sind Feld und Wort 44 px hoch, im Feld mindestens 16 px Schrift. Nach dem Eintragen erscheint in der Statuszeile „Danke. Im Testsystem wird noch nichts verschickt.“ Es wird nichts verschickt und nichts geladen. Ohne Skript ist das Formular verborgen.
3. „Impressum“ und in der nächsten Zeile „Datenschutz“, zwei Verweise, Grad klein. Seit Runde 6 (S4, Dominiks Entscheidung) ohne Anschrift: Sie steht nur noch auf `impressum.html`, die Impressumspflicht erfüllt der Verweis. Bis Runde 5 stand „Impressum: Dominik Jäkel, Stresemannstraße 76, 10963 Berlin“ (wie A); zurück mit einer Zeile, `ANSCHRIFT_IM_FUSS` in `seite.js`.
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
- *Satoshi*: keine (6.8 ist entfallen).
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
- Die Linie wächst während des Flugs von der einen Stadt zur nächsten. Erst wenn sie am Ziel ist, erscheinen Punkt und Name, und im selben Bild wechselt die Tafel (bis Runde 2 schon bei 55 % des Flugs). Auf dem Rückweg eines Abstechers bleibt die Tafel beim Abstecher.
- Die Ortsleiste hebt die jetzige Station halbfett hervor. Die Tafel geht mit.
- **Was die Tafel wann zeigt.** Seit Runde 4 (Dominik: „Die Beschreibungen der Orte sollen bleiben“) zeigt die Tafel auch im Einspieler und beim Abspielen alles, was sie in Ruhe zeigt, und jeder Halt reicht zum Lesen (7.2). Runde 3 hatte „nicht jedes Mal kurz die Details zeigen“ auf die Tafel bezogen; gemeint war die feine Karte (10, Punkt 8). Die Tabelle gibt den Stand von Runde 3; die Zeilen „bevor der Einspieler läuft“ und „im Einspieler und beim Abspielen“ gelten jetzt wie „nach einem Schritt von Hand“: die ganze Tafel.

  | Zustand | Leben | *Ursprung* | *Satoshi* | Reisen |
  |---|---|---|---|---|
  | bevor der Einspieler läuft | die erste Station, nur die Kopfzeile | die erste Station, nur die Kopfzeile | die erste Szene mit Text | Überblick |
  | im Einspieler und beim Abspielen | Kopfzeile: Jahr, Zeichen, Ort, Land | Kopfzeile: Band, Ort, die Zeit klein dahinter („um 8000 v. Chr.“) | Jahr, Ort, (auf der Seite Koordinaten,) Szenentext | kein Ablauf |
  | angehalten | die ganze Tafel der jetzigen Station | die ganze Tafel | wie im Ablauf | – |
  | am Ende | Berlin mit „Wohnort“ | Jerusalem mit Landschaft und Zeile zum Band | nach dem Einspieler die Ruhetafel, nach dem Abspielen Penang | – |
  | nach einem Schritt von Hand | ganze Tafel, sofort | ganze Tafel, sofort | ganze Tafel, sofort | Kontinent oder Land, bei Klick |
  | reduzierte Bewegung | Endzustand | Endzustand | Ruhetafel | Überblick |

- Die Tafel zeigt schon vor dem Einspieler seine erste Station, und jeder Ablauf von vorn setzt sie sofort. Zwischen der Wahl einer Ebene und der ersten Station steht keine Ruhetafel.
- Kein Inhalt der Tafel steht im Ablauf kürzer als 1,5 s. Die Tafel ist nie leer. Ihre Höhe ist die ihres längsten Inhalts und ändert sich im Ablauf und an seinem Ende nicht.
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

**Entfallen** (Runde 3, Dominik am 21. Oktober abends: „Und bei Satoshi kann im Grunde das noch raus .... Also direkt den Globus unter dem Aufhänger“), mit der Zeile „Weitere Schauplätze: Temple City im San Gabriel Valley und die Anden an der Grenze zu Chile.“, ihren Knöpfen, ihrem CSS und ihrem Code. Temple City und die Anden bleiben als offene Kreise auf der Kugel (ab 2,4-fach) und lassen sich dort anklicken. Bis Runde 2 galt:

- Eine fließende Zeile im Grad klein, in der linken Spalte unter dem Vorspann, auf dem Telefon über dem Globus.
- Das Jahr steht nur vor dem ersten Ort seines Jahres, in Mediävalziffern mit fester Breite, als Teil der Gruppe. Orte innerhalb eines Jahres durch Komma getrennt, Gruppen durch 1 em Abstand:
  „2001 Buenos Aires   2007 London, Black Rock Desert, London, Kobe   2008 New York, Berlin   2009 Buenos Aires   2010 Bariloche   2013 Penang“
- Jeder Ort ist ein Knopf mit `aria-pressed`. Sein Name für Vorleseprogramme nennt Ort und Jahr („Kobe, 2007“). So bleiben die Szenen erreichbar, ohne als Liste dazustehen (M3).
- Darunter, ¼ z Abstand, der Satz von A zu den weiteren Schauplätzen (Temple City, die Anden). Beide stehen auf dem Globus als offene Kreise ohne Weg, mit Namen erst ab 2,4-fach.
- Weg auf dem Globus: von Stadt zu Stadt in der Reihenfolge der Szenen, auch zurück nach London und nach Buenos Aires.

### 6.9 Die Bände von *Ursprung*

Je Band ein Abschnitt in der linken Spalte:

1. Überschrift (`h2`, Grad Überschrift, aufrecht): „Band I“, 1 em Abstand, der Titel. Bei Band II und III dahinter „Arbeitstitel“ im Grad klein (V39).
2. Ortszeile, Grad klein: der Ort als Knopf, Komma, die Zeit. ~~In der nächsten Zeile die Koordinaten.~~ Die Koordinaten stehen nur noch auf der Tafel unter dem Globus (Runde 3, Dominik: „Es reicht wenn die Koordinaten unter dem Globus stehen. Müssen nicht nochmal doppelt in den Teasern auftauchen“). Bei Band III danach der Satz von A zu Tyros, Tyros als Knopf.
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
- Seit 25. Oktober (V86, geht dem Gesagten vor): Die liegenden Bücher liegen auf jeder Breite leicht versetzt, nicht bündig: das größte zuunterst bündig, jedes weitere 1,4 bis 6,3 mm nach links oder rechts, stufenlos, ohne Drehung, mit ihren Konturen (aufeinander teilen sie sich eine). Der Versatz kommt aus Titel und Autor (`versatzMm`, `F.hash`, `VERSATZ = .7`), nie aus Zufall; die Richtung wechselt bei zwei von drei Büchern, so entsteht kein Zickzack. Länder lehnt an dem Buch, das am weitesten herausragt (`anLehne`). Telefon (unter 40 rem): jedes liegende Buch 18 px und 0,03 px je Seite stark (`staerkePx`, Camus 24,4 px, Musil 49 px), der Stapel so hoch wie die Rücken, jedes Buch beschriftet (mindestens 9,5 px). Breiter Stärke nach Seitenzahl im Maßstab der Rücken (Bild 146 px bei 1024, 155 bei 1280, 188 bei 1440, höchstens 191). Ein Tipp irgendwo in die Fläche wählt das nächste Buch (`naechstesStueck`), mit der Maus nur das Buch selbst. In der Bibliothek liegt der Nachttisch weiter bündig (6.14).

### 6.11 Zeitband (Startseite)

- Rechenweg von A: jedes Buch ein senkrechter Strich an seinem Erscheinungsjahr, so breit wie sein Rücken, frühe Jahrhunderte gestaucht.
- Gelesene Bücher `--zb-strich`, Lieblingsbücher `--tinte`, nicht zu Ende gelesene halb so hoch, wiedergelesene mit einem Strich darüber (1 px Tinte), was gerade gelesen wird, liegt quer (Papier mit Kontur 0,75 px Tinte), eigene Werke rechts als Umriss in Tinte (1,1 px).
- Gezeigt oder gewählt: Fläche in Tinte.
- Achse: Jahreszahlen aufrecht, Grad klein, Tinte, Mediävalziffern mit fester Breite. Bruchstellen der Stauchung als feine Linie in Tinte, 0,9 px.
- Darunter die Buchzeile (reserviert ist die Höhe des längsten Satzes, auf dem Telefon mindestens 3 z: bei 390 bis 430 px 4 z, bei 320 bis 375 px 5 z; so läuft kein Satz in den Namen der Reihe darunter, und deren Regler springen nicht), dann die Reihen „die wichtigsten aus Kindheit und Jugend“ (`--zb-kind`) und „was noch wartet“ (Kontur `--zb-warte`). Ihre Namen aufrecht, Grad klein, Tinte, 1 z darüber.
- Darunter ¾ z, dann „Die ganze Bibliothek“ als Verweis mit dem Satz von A.
- Telefon: Band im eigenen Rahmen, waagrecht scrollbar, beim Laden am rechten Ende (Standardentscheidung 27). Am 23. Oktober kurz am linken Ende bei Gilgamesch, passend zur Ruhe beim ältesten (V73); zurückgenommen, weil die Reihen „die wichtigsten aus Kindheit und Jugend“ und „was noch wartet“ erst im 20. Jahrhundert beginnen und links beim Laden keinen Strich im Bild hatten (bei 390 px 0 von 85 und 0 von 73; rechts 68 und 44). Knopf und grauer Satz stehen trotzdem zusammen im Bild, denn der Regler zeigt das ganze Band im Kleinen; nur der Strich von Gilgamesch ist erst nach dem Rollen oder einem Tipp zu sehen. Kein Mitschieben beim senkrechten Scrollen.
- **Regler, früher und später (Runde 6, S9; Runde 8: ein Regler je Reihe).** Die Ordnung ist dieselbe wie am Globus: unter dem Band der Regler, darunter die Steuerzeile „früher“ und „später“ (Steuerwörter nach 6.20), darunter die Buchzeile. Seit Runde 8 hat auch „die wichtigsten aus Kindheit und Jugend“ und „was noch wartet“ je einen Regler direkt unter dem eigenen Band (Dominik: „Kannst du da auch noch jeweils einen einzelnen Slider darunter machen. Die Titel können aber gerne an derselben Stelle eingeblendet werden“). Die Buchzeile bleibt an ihrem einen Ort unter „früher“ und „später“, für alle drei Reihen.
  - **Breit** ist der Regler die Achse des Bands selbst: dieselbe Haarlinie mit den Brüchen, dieselben Jahreszahlen an derselben Stelle, 9 px unter den Strichen (vorher 5 px). Der Knopf steht genau unter dem Strich seines Buchs. Die Fläche des Reglers ist 1¼ z hoch und reicht über die Jahreszahlen.
  - **Auf dem Telefon** zeigt der Regler unter dem rollenden Band, ½ z darunter, das ganze Band im Kleinen. Er rollt selbst nicht mit (`position: sticky`). Die Linie hat keine Brüche, damit man sie nicht für eine zweite Achse hält. Der Teil des Bands, der gerade zu sehen ist, ist auf der Linie 1,75 px stark. Die Jahreszahlen stehen unterstrichen darunter („Gilgamesch“, 1800, 1950, 2000). Die Fläche ist 44 px hoch.
  - **Die Regler der zwei Reihen darunter** sind gleich gebaut und bedient, mit drei Unterschieden. (1) Ihre Linie reicht vom ersten bis zum letzten Buch ihrer Reihe, ohne Brüche (die Reihen beginnen nach den ausgelassenen Jahrhunderten). (2) Sie haben keine Jahreszahlen, nur die kleinen Striche (3,5 px) an den Marken, die der Regler von „gelesen“ beschriftet, soweit ihre Reihe reicht: Alle drei Reihen teilen dieselbe Achse, breit genau untereinander, im Kleinen im selben Maß; dreimal dieselben Zahlen untereinander wären Unruhe. Darum gibt es dort keinen Tipp auf eine Jahreszahl; Bild auf und ab springen trotzdem zu den Marken. (3) Breit sind sie ¾ z hoch (Linie 8,5 px unter den Strichen wie oben), mit Finger 44 px. Auf dem Telefon stehen sie ½ z unter ihrem Band, und der Name der nächsten Reihe rückt auf ½ z heran, weil die Fläche unter der Linie leer ist. Den sichtbaren Teil zeigen sie nur, so weit ihre Reihe reicht.
  - **Knopf:** ein kleiner Rücken, 6 × 14 px. Leer (Papier, Kontur 0,75 px Tinte), solange kein Buch seiner Reihe gewählt ist, und dann beim ältesten Buch der Reihe (seit dem 23. Oktober, V73; vorher beim neuesten). Nach dem Zurücklegen bleibt er leer an seinem Buch. In Tinte, wenn ein Buch seiner Reihe gewählt ist. Fokus: Rahmen 1,5 px Tinte um den Knopf.
  - **Bedienen:** Ein Tipp oder Klick irgendwo auf den Regler wählt das Buch an dieser Stelle, einer auf eine Jahreszahl das erste Buch ihres Jahrs. Beim Ziehen steht die kurze Angabe unter dem Band und der Strich in Tinte, mit dem Finger auch über dem Knopf (Grad klein, Papier, ohne Rahmen); an den Reglern der zwei Reihen darunter steht dieser Name an der Stelle des Reihennamens, der so lange verborgen ist, damit er nicht auf den Strichen liegt und den Strich in Tinte anschneidet. Beim Loslassen erscheint der Satz. Ein Finger zieht erst, wenn er sich waagrecht bewegt; senkrecht rollt die Seite (`touch-action: pan-y`). Über den Regler, früher, später und die Jahreszahlen gewählt, rollt das Band auf dem Telefon so, dass der Strich genau über dem Knopf steht, wie bei einer Bildlaufleiste. Ein Tipp auf einen Strich im Band selbst rollt nichts; der Knopf folgt.
  - **Jeder Regler gehört nur zu seiner Reihe** (Runde 7 und 8, auf Dominiks Wunsch): Wählt man ein Buch, ob über den Strich, einen Regler, früher und später oder die Tastatur, bewegt sich nur der Regler seiner Reihe, und sein Knopf steht in Tinte. Die anderen Knöpfe bleiben, wo sie waren, und stehen leer; so sieht man immer, welche Reihe gerade gilt.
  - **„früher“ und „später“** sind ein Paar und bleiben unter dem Regler von „gelesen“. Sie blättern in der Reihe des gewählten Buchs und bewegen deren Knopf, ohne Wahl in „gelesen“ ab dessen Knopf. Sie stehen nicht unter dem letzten Regler: Steuerzeile und Satz bleiben eine Einheit wie am Globus, der Satz ändert sich direkt unter dem Wort, das man tippt; unter „was noch wartet“ stünden sie auf dem Telefon rund 300 px unter dem Satz. Welcher Reihe sie folgen, zeigt der Knopf in Tinte.
  - **Tastatur und Vorleseprogramme:** `role="slider"`, Name die Reihe („Gelesen“, „Die wichtigsten aus Kindheit und Jugend“, „Was noch wartet“, wie die sichtbaren Reihennamen), Wert die kurze Angabe des Buchs (`aria-valuetext`: Autor, Titel, Jahr). Tab geht Reihe für Reihe: Band, Regler, früher, später, Band und Regler „Kindheit und Jugend“, Band und Regler „was noch wartet“. Pfeile links und unten für früher, rechts und oben für später (so kommen auch die Wischgesten von VoiceOver an), Bild auf und Bild ab zur nächsten oder vorigen Jahresmarke, Pos1 und Ende. Aus der Ruhe steht der Knopf vor dem ältesten Buch: rechts und oben wählen das älteste, links und unten tun nichts, Bild ab wählt das älteste, Bild auf die nächste Jahresmarke (in „gelesen“ Schiller, *Wilhelm Tell*, 1804). Ebenso ist „früher“ in Ruhe leise, und „später“ wählt das älteste Buch. Am Band selbst zeigt der Fokus mit der Tastatur zuerst das älteste Buch der Reihe (bis zum 23. Oktober das neueste); auf dem Telefon rollt das Band dabei zu ihm, wenn es nicht im Bild ist. Am Regler spricht die Buchzeile nicht noch einmal (`aria-live` aus). „früher“ und „später“ werden am Ende der Reihe leise mit `aria-disabled`, nicht `disabled`, damit der Fokus bleibt.
  - Zeigen und Klicken auf die Striche bleiben. Mit dem Finger trifft ein Tipp jetzt den nächsten Strich bis 12 px daneben (Maus weiter 4 px).
- **Satz in Ruhe, nur auf dem Telefon (23. Oktober, V73).** Solange kein Buch gewählt ist, keins gezeigt und nichts gezogen wird, steht auf dem Telefon (rollendes Band, bis 40 rem) in der Buchzeile der Satz zum Buch am Knopf von „gelesen“, im blassesten Grau der Seite (`--zb-strich`, das Grau der hellen Striche im Band; zuerst `--leise`, Dominik: „Es muss noch deutlich grauer sein. Also viel blasser“): beim Laden das älteste, Gilgamesch, das „später“ als erstes wählt, nach dem Zurücklegen das Buch, an dem der Knopf dann steht. Kein neues Wort, keine Anleitung, nur der echte Satz, ein Hauch als Zustand (noch nicht gewählt), deutlich leiser als das leise „früher“ darüber. Eigenes Feld (`#zeile-ruhe`), `aria-hidden`, ohne Verweise, nicht im `aria-live`-Feld, damit nichts beim Laden angesagt wird. Er steht unter seinem Strich, im sichtbaren Teil, und geht beim Rollen mit. Beim Zeigen, Ziehen und solange ein Buch offen ist, ist er verborgen (`visibility`, nichts springt, kein Übergang); maßgeblich ist, was in der Zeile zu sehen ist. Ein Tipp auf ihn wählt sein Buch; ein Wischen über ihn rollt nur das Band. Die reservierte Höhe bleibt. Breiter (Tablet, Desktop) bleibt die Zeile in Ruhe leer wie zuvor: dort ist der Raum unter „früher später“ eine Zeile, auf dem Telefon bis zu 5 z (Dominik: „Davon abgesehen ist das glaube ich auch nur ein mobiles Problem. Sonst geht das“). Zuerst stand hier der Satz zum neuesten Buch (Caroline Wahl), auf allen Breiten; Dominik: „mach mal das älteste. Also Gilgamesch.“

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
- Nachttisch: zwei Stapel liegender Bücher in den Farben ihrer Familie, bündig, das größte zuunterst, ohne Versatz und ohne Bewegung beim Zeigen. Darunter „Auf dem Nachttisch“, Grad klein. Das gilt für die Bibliothek; im Regalbild der Startseite liegen die Bücher seit 25. Oktober leicht versetzt (V86, 6.10).

### 6.15 Länderregister

- Ein Absatz je Kontinent, hängender Einzug 1 em: das Stichwort in Kapitälchen, ein Leerzeichen, die Länder alphabetisch, Komma getrennt.
- Jeder Name ein Knopf, der den Globus zum Land dreht. Strich nach 07. Gewähltes Land halbfett. Lange Namen dürfen umbrechen.
- Über dem Register „Länderguides, in Arbeit.“ und der Satz von A zum Grau.
- Seit 25. Oktober (V86, Vorschlag B aus dem Navigationstest): Schmal ohne Band (Telefon quer) holt ein Name die Kugel ins Bild, 187 bis 850 px nach oben. Nach so einem Sprung steht in der Unterzeile der Tafel hinter „bereist“ das Bedienwort „zurück zum Verzeichnis“ (Grad klein, unterstrichen wie jedes Wort, 0,9 em Abstand hinter „bereist“; bricht die Zeile um, beginnt es ohne Einzug). Ein Tipp rollt zurück, bis der Name dort steht, wo er beim Antippen stand, und gibt ihm den Fokus. Wird die Tafel höher (langer Name, größere Schrift), rollt die Seite so weit, dass das Wort mit 8 px Luft im Bild steht. Ohne Sprung, hochkant mit Band und breit erscheint es nicht; ein Kontinent oder der Überblick nimmt es weg.

### 6.16 Stationen der Vita und Bild

- Bild: oben in der rechten Spalte, `width: min(100%, 24em)`, Seitenverhältnis 3 : 4, ohne Rahmen. Darunter ¼ z die Legende im Grad klein.
- Stationen: `h2` „Stationen“, darunter die Liste von A. Die Jahreszahl hängt im Steg zwischen den Spalten (rechtsbündig, Mediävalziffern mit fester Breite), dann Ort, Komma, Tätigkeit im Grad Text, in der nächsten Zeile die Koordinaten im Grad klein. Einträge ¼ z auseinander. Nebenorte gleich groß und gleich dunkel.
- Zeitspannen (seit 25. Oktober, V86: Freiburg 2014–2015, Potsdam 2015–2018): das Endjahr in der Jahresspalte unter dem Anfangsjahr, Ziffer unter Ziffer, rechtsbündig wie das Jahr; der Halbgeviertstrich ohne Leerzeichen hängt davor aus der Spalte (breit in den Steg, schmal in den Rand), damit die Spalte nicht breiter wird. Der Eintrag ist mindestens zwei Zeilen hoch (`li.spanne`). Für Vorleseprogramme und beim Kopieren „2014 bis 2015“ (unsichtbares „bis“ mit geschützten Leerzeichen, das Endjahr absolut gesetzt).
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
| Steuerwort | früher, später (Globus und Zeitband), Steuerwort, „Eintragen“ | Strich 1 px | Strich, Fokusrahmen | – | `--leise`, ohne Strich, `disabled` (am Zeitband `aria-disabled`, damit der Fokus bleibt) |

Knöpfe sind `<button>` ohne Rahmen, Grund und Radius. Verweise sind `<a>`. Kein Pfeil, kein „Mehr erfahren“.

---

## 7. Bewegung

### 7.1 Was sich bewegt und warum

| Was | Wo | Wie lange | Warum |
|---|---|---|---|
| Einflug des ersten Satzes | Startseite | rund 1,9 s (seit V83 im Tempo „gelassen“: je Wort 0,42 s Deckkraft und 0,8 s Weg, 75 ms Versatz, 0,22 s zwischen den Zeilen, ohne Unschärfe; bis zum 24. Oktober 1,0 s), bei jedem Laden und Seitenwechsel, nicht nach der Zurück-Taste | V13, V83 |
| Einflug des Vorspanns | *Satoshi*, auf allen Breiten (bis zum 23. Oktober nur zweispaltig) | rund 2,2 s (wie der erste Satz, 55 ms Versatz; bis zum 24. Oktober 1,0 s) | Dominik, Option B (9.2), V79, V83 |
| Einblenden in Folge: erst das Nebenbild, zuletzt der Globus mit Tafel und Steuerzeile | Startseite, *Satoshi*, *Ursprünge* (nicht Länder) | Regal 1,2 s, Buch 1,4 s, Globus 1,4 s (Telefon 1,2 s), nur Deckkraft; die Bewegung 1,6 s nach dem Globus; Zeitpunkte in 7.2 | V83 |
| Erscheinen des Inhaltsbuchs | *Satoshi* | seit V83 in der Folge: bei 1440 × 900 von 3,1 bis 4,5 s, 1,4 s, Deckkraft und 8 px von rechts; der schmale Band (bis 62 rem) liegt beim Laden unter dem ersten Bildschirm und steht sofort (vorher 700 ms, wenn ein Viertel von ihm im Bild war) | V77, V80, V82, V83 (9.2) |
| ~~Umblättern des Inhaltsbuchs~~ | ~~*Satoshi*, ab 62,0625 rem~~ | ~~480 ms je Blatt, 90 ms Versatz~~; entfällt seit V82 | V77, V82 (9.2) |
| Aufschlagen des Bands | *Satoshi*, auf allen Breiten (am Desktop seit V82) | 600 ms, der Deckel um den Falz; Einträge der linken Seite 280 ms ab 420 ms; „Klappentext“ (nur schmal) 150 ms aus, mit den Einträgen wieder ein | V80, V82 (9.2) |
| Der Band folgt dem Text der Tafel | *Satoshi*, bis 62 rem | hinauf 600 ms, hinunter im selben Bild wie der Text; außer Sicht ohne Bewegung | V80 (9.2) |
| Einspieler Leben | Startseite | rund 34 s, mit der ganzen Tafel | V22, M7, Runde 4 |
| Einspieler *Satoshi* | Startseite (Ebene), *Satoshi* | rund 59 s, mit Szenentext | M7, K9, Runde 4 |
| Einspieler *Ursprung* | Startseite (Ebene), *Ursprung* | rund 27 s, mit der ganzen Tafel | V23, Runde 4 |
| Abspielen | alle drei Abläufe | wie der Einspieler; *Satoshi* rund 57 s, endet in Penang | Nachtrag 1, Punkt 5, K9 |
| Flug nach Klick, früher, später | alle Globen | 1,0 s | V26 |
| Leselinie führt den Globus | *Ursprung*, ab 62,0625 rem | Flug 1,0 s | E19, V10 |
| Drehen und Zoomen | alle Globen | folgt der Hand | V26 |
| Herausziehen eines Rückens | Regalbild, Bibliothek | 160 ms, 12 px | V53 |
| Schuber öffnen | Bibliothek | 300 ms | M9 (kleine Entdeckung) |

### 7.2 Takt der Einspieler

**Stand 24. Oktober (V83): die Folge beim Laden, Tempo „gelassen“** (`docs/einblenden.md`, Variante 2 und Abschnitt „Das Tempo“; Werte in `FOLGE` in `seite.js`). Dominik: „Nimm gelassen und bau es ein.“ und „Und Globus muss mitwandern bei Gelassen. Und zwar relativ weit mitwandern“. Auf der Startseite, auf *Satoshi* und auf *Ursprünge*; Länder ist ausgenommen (dort ist der Globus der Inhalt). Zeitpunkte in Sekunden ab dem Aufruf:

| Seite, Format | Text steht still | Nebenbild | Globus mit Tafel und Steuerzeile | Bewegung (Einspieler) |
|---|---|---|---|---|
| Startseite, 1440 × 900 | 1,99 | Regal 2,74–3,94 | 3,59–4,99 | 6,57 |
| *Satoshi*, 1440 × 900 | 2,48 | Buch 3,10–4,50 | 4,08–5,49 | 7,08 |
| *Ursprünge*, 1440 × 900 | (kein Einflug, V81) | – | 1,94–3,34 | 4,94 |
| Startseite, 393 px | rund 1,9 nach dem Beginn des Einflugs | – | 2,74–3,94 | 5,54 |
| *Satoshi*, 393 px | rund 2,2 nach dem Beginn des Einflugs | – | Beginn des Einflugs + 2,92 bis 4,12 | Beginn des Einflugs + 5,72 |

- Gerechnet vom Beginn des Einflugs (Textmoment: das letzte Wort steht zu 95 %; Lesemoment: die Wörter des ersten Satzes bei 230 Wörtern je Minute), nicht vom Ende der Skripte: Ein schwaches Gerät wartet nicht noch länger. Das Nebenbild beginnt 0,8 s nach dem Textmoment, frühestens so, dass es zu 39 % da ist, wenn der erste Satz gelesen ist; der Globus, wenn das Nebenbild zu 70 % gelaufen ist, mindestens 0,4 s nach ihm; die Bewegung 1,6 s nach dem geplanten Ende des Globus, mindestens 0,8 s nach dem wirklichen. Ohne Nebenbild im ersten Bildschirm (Telefon, *Ursprünge*) nimmt der Globus dessen Zeitpunkt. Ohne Einflug (*Ursprünge*) beginnt die Folge 1,8 s nach dem ersten Bild; dort wartet die Figur auch auf die feine Karte (höchstens 2,5 s länger) und blendet dann in einem Zug ein.
- Text wartet nie. Eingeblendet wird nur über die Deckkraft, ohne Weg und Maßstab, in der Kurve `cubic-bezier(.4, 0, .3, 1)`; nur das Buch auf *Satoshi* rückt dabei 8 px von rechts heran (V77). Platz und Höhe stehen vom ersten Bild an; der Globus der Startseite klebt und wandert während seiner Blende genau wie ohne sie (Wanderstrecke 1440 × 900: 656 px, V78).
- Jede Handlung (Zeiger, Taste, Rad, Finger, Rollen der Seite, Fokus) zeigt alles in 0,25 s und gibt die Bewegung frei. Auch unsichtbar ist die Kugel bedienbar (der erste Griff dreht sie); Regal und Buch nehmen, solange sie noch nicht zu sehen sind, keinen Mausklick an.
- Was beim Aufruf unter dem ersten Bildschirm liegt, steht sofort. Bei reduzierter Bewegung steht alles sofort (7.4).
- Weitere Seiten desselben Besuchs (Verweis von einer Seite der Website): kürzere Folge, Ruhe 0,4 statt 0,8 s, Blenden × 0,7, Ruhe vor der Bewegung 0,8 s; der Einflug wie immer. Neu laden: die ganze Folge. Zurück- und Vor-Taste, auch aus dem Zurück-Cache: alles steht sofort, kein Einflug, die Bewegung 0,8 s nach dem ersten Bild der Kugel. Ohne Browserspeicher.
- Sicherheitsnetz: spätestens 1 s nach dem geplanten Ende des Globus, mindestens 5 s nach dem Aufruf steht alles; ohne Skript nach 7 s (`.folge [data-folge]:not(.da)` in `stil.css`).
- Auf *Ursprünge* beginnt der Halt an Göbekli Tepe mit dem Einspieler; das erste Gleiten nach Uruk kommt bei 1440 × 900 nach rund 11,8 statt 7,8 s (offen für Dominik, V83).
- Damit gilt nicht mehr: „Vor dem ersten Flug: 0,6 s nach dem ersten Bild der Kugel“ (unten, Runde 4) für diese drei Seiten; Länder bleibt dabei.

Stand Runde 4 (21. Oktober abends, Dominik: „Ich glaube, es ist am besten die Animation zu verlangsamen“, im Nachtrag: „Versuch die mal alle aufeinander abzustimmen“, *Satoshi* als Orientierung; Werte in `FSeite.TAKT` und `LESEN`, gemessen in `website-c.md`, Runde 4). Ein Rhythmus für alle Abläufe:

| Ablauf | Flug | Halt | Vergrößerung | Gesamt |
|---|---|---|---|---|
| Leben | nach der Entfernung 0,9 s plus 0,7 s mal Entfernung durch 180°, höchstens 1,6 s (0,92 bis 1,23 s), sanft an- und auslaufend; der Rückweg eines Abstechers ohne Halt ebenso | 0,9 s plus 0,27 s je Wort unter der Kopfzeile der Tafel (ohne Koordinaten), mindestens 2,5 s, höchstens 8 s (2,5 bis 3,1 s) | wie Runde 3 | rund 34 s |
| *Satoshi* | wie Leben (0,96 bis 1,48 s) | wie Leben, nach dem Szenentext (2,5 bis 7,4 s) | wie Runde 3 | rund 59 s, Abspielen 57 s |
| *Ursprung* | wie Leben (0,93 bis 1,0 s) | wie Leben und 0,5 s Grundhalt (4,9 bis 6,3 s, Startseite und Seite gleich) | wie Runde 3 | rund 27 s |

- Ist die Kugel am Halt über 1,8-fach gezoomt, dauert der Halt mindestens so lange, dass die feine Karte danach 1,5 s steht (rund 2,1 s).
- Ein erster Stand von Runde 4 (Zwischenstand `d6595e1`) flog 1,8 bis 2,4 s und hielt 1,5 s plus 1 s je 15 Zeichen der ganzen Tafel (Leben 64 s, *Satoshi* 76 s, *Ursprung* 44 s); der Nachtrag hat ihn abgelöst.
- Vor dem ersten Flug: 0,6 s nach dem ersten Bild der Kugel und erst, wenn die Schriften und die feine Karte geladen sind (höchstens 2,5 und 2 s).
- Easing der Abläufe seit Runde 4: Smootherstep (`sanft` im Kern), in der Mitte 1,9-mal so schnell wie im Schnitt (kubisch 3-mal). Flüge von Hand bleiben 1,0 s mit `d3.easeCubicInOut`.

Stand Runde 3 (überholt):

| Einspieler | Flug | Halt | Vergrößerung | Tafel steht je Station | Gesamt |
|---|---|---|---|---|---|
| Leben | 1,0 s je Station, Rückweg eines Abstechers 0,8 s ohne Halt, mit der Vergrößerung des Abstechers | 0,8 s | Europa 3,6-fach, Colombo, Cotonou, Kaohsiung 2,4-fach, am Ende Überblick | 1,8 s, Abstecher 2,6 s | rund 18 s |
| *Satoshi* | 0,9 s | 1 s plus 0,3 s je Wort des Szenentexts, mindestens 3 s, höchstens 9 s (zusammen 50 s) | fest 1,2-fach, die Kugel dreht nur, am Ende Überblick | 3,9 bis 9,1 s | rund 60 s |
| *Ursprung* | 1,6 s | 1,4 s | fest 3,3-fach (Blick von A auf die Region) | 3,0 s | rund 14 s |
| Abspielen *Satoshi* | 1,0 s | wie im Einspieler | 2,4-fach, Europa 3,6-fach | 4,0 bis 9,2 s | rund 60 s, endet in Penang |
| Abspielen Leben, *Ursprung* | wie der Einspieler | | | | |

- Vor dem ersten Flug 0,6 s nach dem ersten Bild der Kugel. Der erste Flug ist nur die Fahrt zur ersten Station, ohne Linie; ihre Tafel steht schon da.
- Bis Runde 2: Leben Halt 0,6 s und Rückweg 0,5 s mit der Vergrößerung des Wohnorts (rund 16 s); *Satoshi* 3 s plus 0,6 s je Wort, 6 bis 18 s (rund 118 s); *Ursprung* Halt 2,0 s (rund 16 s).

Easing der Flüge bis Runde 3: `d3.easeCubicInOut`. Kein Nachfedern, keine Trägheit.

### 7.3 Was sich nicht bewegt

- Kein Einblenden beim Scrollen. Kein Heben unter der Maus. Keine Farbübergänge. Der Strich unter der Maus erscheint sofort.
- Kein Mitschieben des Zeitbands. Kein Aufklappen von selbst. Keine Überblendung der Bände.
- Keine Dauerdrehung, kein Pendeln im Leerlauf.
- `transition` steht im Stylesheet nur an zwei Stellen: Herausziehen und Schuber.

### 7.4 Reduzierte Bewegung

Bei `prefers-reduced-motion: reduce`:

- Der erste Satz und der Vorspann von *Satoshi* stehen sofort. Das gilt auch für ein Telefon mit „Animationen entfernen“ (Android, Bedienungshilfen): Chrome auf Android meldet dann `prefers-reduced-motion: reduce`. Ob das Fenster der Claude-App (eine WebView) die Einstellung weitergibt, ist in Chromium hier nicht zu prüfen; gibt sie sie weiter, fliegt dort nichts, und das ist richtig so (V79).
- Kein Einspieler. Der ganze Weg steht, die Tafel zeigt den Endzustand.
- Keine Folge beim Laden (V83): Regal, Buch und Globus stehen, sobald sie fertig sind.
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

Im Kopf jeder Seite `<link rel="preload" href="schrift/vollkorn.woff2" as="font" type="font/woff2" crossorigin>`, auf Startseite und Vita zusätzlich für die IM Fell, auf *Satoshi* mit `media="(min-width: 62.0625rem)"` nur für die Zweispaltenlage. Kein Link zu Google, kein `preconnect`. `FSeite.schriften()` wartet auf `19px "Vollkorn"` und `italic 19px "Vollkorn"`, nicht mehr auf „Vollkorn SC“.

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

**Seit 23. Oktober (V75, Testfassung „7 und 6“), geht dem oben Gesagten vor:** Ab 62,0625 rem steht das Regalbild (eigene Werke und Nachttisch) links 2 z unter der Kurzvita neben der Kugel des Lebens (`regalOrt` setzt es an der Grenze um), „Was ich schreibe“ hat nur Überschrift und Werkverzeichnis in der Satzbreite; die Kartenwahl und der Text der Ebene entfallen auf allen Breiten. Unter 62 rem steht das Regalbild über dem Verzeichnis, mit dem Nachttisch daneben, nur kleiner (bei 390 px 333 px breit; Titel unter 9 px entfallen, ein Tipp bis 10 px neben ein Buch trifft das nächste, zwischen den Stapeln mindestens 14 px Luft). Telefon (unter 40 rem): Unter 40 rem (Telefon) stehen die eigenen Werke wieder in der ursprünglichen Größe mit lesbaren Titeln auf den Rücken (0,86 px je mm, Titel 10,8 px), daneben vom Nachttisch nur der rechte Stapel (Camus, Aristotle, Kafka, Bolaño, Musil), in derselben Größe; nur wenn er bei sehr schmalen Schirmen nicht daneben passt, wird allein der Stapel kleiner (bei 320 px 56 %), nie die Rücken. Seine Titel nehmen den Grad der Rücken. Zwischen 40 und 62 rem beide Stapel wie am Desktop.
**Unterschrift des Regalbilds** „Meine Projekte und was auf dem Nachttisch liegt“ (Dominiks Wortlaut), `figcaption` im Grad klein, in Tinte, wandert mit dem Bild: am Desktop ¼ z unter dem Brett, darunter die Buchzeile (so springt sie beim Klick nicht); auf dem Telefon zwischen „Was ich schreibe“ (1½ z darüber, mit der Maus 2 z) und dem Bild (¼ z bis zum höchsten Rücken, mit der Maus ¾ z für den Namen beim Zeigen und ¼ z Luft), also näher am Bild als an der Überschrift; unter 23 em ausgeglichen auf zwei Zeilen.

**Seit 25. Oktober (V86), Büchergrafik, geht dem oben Gesagten vor:** Die Bücher des Nachttischs liegen auf allen Breiten leicht versetzt (6.10). Am Telefon (unter 40 rem) Fassung V5 „Eine Höhe“: der Stapel so hoch wie die Rücken, jedes liegende Buch 18 px und 0,03 px je Seite stark und beschriftet; die Rücken bleiben bei 0,86 px je mm, kürzer wird nur der Stapel (bei 390 px 84 %, 360 px 69 %, 320 px 48 %). Zwischen 40 und 62 rem und breiter das Bild wie bisher mit zwei Stapeln, Stärke nach Seitenzahl, mit demselben Versatz (Fassung V1 „Versetzt“); der Maßstab ist dafür rund 2 % kleiner, der Globus wandert bei 1280 × 800 742 px, bei 1024 × 768 907 px (1440 × 900 unverändert 656). Ein Tipp irgendwo in die Fläche wählt das nächste Buch. Unterschrift, Bedienung und Buchzeile bleiben.

**Seit 23. Oktober (V78):** ab 62,0625 rem bleibt der Block aus Kugel, Steuerzeile und Tafel beim Rollen stehen (sticky), neben „Was ich schreibe“, der Überschrift „Mein digitales Bücherregal“ und der Legende, und hält 3 z über dem Zeitband, das über die ganze Breite frei bleibt (bei 1440 × 900 rund 656 px Weg); die Abschnitte bleiben im Quelltext getrennt, nur `main` ist ein gemeinsames Raster mit Unterrastern. Für die Lage beim Kleben zählt der Block so hoch, wie er mit dem längsten Steuerwort („noch einmal von vorn“) wird: In niedrigen Fenstern (Kugel unter rund 480 px) bricht die Steuerzeile an der letzten Station um, ohne dass Kugel und Steuerzeile springen; die Tafel hat dort, solange keine Station am Ende ist, 1¼ z mehr Luft nach unten (50 statt 14 px), die Kugel ist oben 35,6 px mehr angeschnitten.

**Seit 24. Oktober (V83), Folge beim Laden:** erst der Satz (Einflug rund 1,9 s), dann das Regal (1,2 s), zuletzt Kugel, Steuerzeile und Tafel (1,4 s); der Einspieler Leben beginnt 1,6 s danach (bei 1440 × 900 Regal 2,74–3,94 s, Globus 3,59–4,99 s, Bewegung 6,57 s; 7.2). Auf dem Telefon nach dem Satz gleich der Globus (1,2 s). Der Globus klebt und wandert dabei wie oben, die Wanderstrecke ist auf allen Größen gleich geblieben.

**Erster Bildschirm bei 1440 × 900:** fünf Grade (Einstieg, groß, Überschrift, Text, klein), rund 7 unterstrichene Wörter, kein Grau außer einem leisen „später“ am Ende des Einspielers.

### 9.2 *Satoshi* (`satoshi.html`)

**Desktop ab 62,0625 rem.** Globusband wie auf der Startseite: links Kopf, `h1` „Satoshi“ (groß, aufrecht), Unterzeile (Grad Text), der Vorspann „Am 31. Oktober 2008 …“ wie der erste Satz der Startseite (IM Fell, Grad Einstieg, Zeilenhöhe 1,5 z, fliegt ein; Option B, unten); die Zeitleiste darunter ist entfallen (6.8). Rechts die Kugel, angeschnitten, nicht haftend, neben Titel und Vorspann, darunter die Steuerzeile und die Tafel. Die Kugel bemisst sich an der längsten Tafel, damit auch der längste Szenentext bei 1440 × 900 ganz im Bild steht. 2 z unter dem Ende des Globusbands beginnt der Klappentext.

**Option B** (Dominik, 22. Oktober abends: „Nimm Option B für Satoshi“; `docs/satoshi-optionen.md`). Es gilt wieder die Lage aus Runde 4: Der Klappentext beginnt 2 z unter dem Globusband, links, auf einer Höhe mit den Eckdaten rechts. Die Lage aus Runde 5 (der gekürzte Absatz „Wer war Satoshi Nakamoto wirklich? …“ unter dem Vorspann, der Klappentext ab 75 rem schon neben der Kugel) ist entfallen; der volle Absatz „Doch mit welcher Konsequenz? …“ steht auf jeder Breite als letzter unter „Die Frage hinter dem Roman“.
- Der Vorspann steht in der IM Fell French Canon im Grad Einstieg (38 px, Zeilenhöhe 1,5 z). Jeder der drei Sätze beginnt eine Zeile, der erste bricht ausgeglichen (`text-wrap: balance`). Passen die beiden kurzen Sätze nicht in die Spalte, wird er kleiner, bis sie passen, nicht unter 28,5 px: von 993 bis 1200 px Breite 29,3 px, bei 1280 px 31,1 px, bei 1366 px 34,7 px, ab rund 1440 px 38 px. Auf allen geprüften Breiten von 993 bis 2560 px hat er so fünf Zeilen und endet bei 556 px.
- Beim Laden fliegt er Wort für Wort von rechts ein, mit der Mechanik des ersten Satzes der Startseite (02: Weg 0,2 em, je Wort 360 ms, waagrechte Unschärfe, die beim Ankommen vergeht). Der Takt ist enger, weil er 21 statt 12 Wörter hat: 28 statt 40 ms Versatz, 70 statt 100 ms zwischen den Sätzen, zusammen 1,0 s (mit dem Takt der Startseite wären es 1,3 s). **Seit 24. Oktober (V83)** im Tempo „gelassen“: je Wort 0,42 s Deckkraft (eine eigene Animation) und 0,8 s Weg, 55 ms Versatz, 0,22 s zwischen den Sätzen, ohne Unschärfe (die unscharfe Kopie ist weg), zusammen rund 2,2 s; nach der Zurück-Taste steht er sofort. Er wartet höchstens 1200 ms auf die IM Fell (bis zum 23. Oktober 600 ms), die auf allen Breiten vorgeladen wird; ist sie dann nicht da, steht er ohne Flug und wird angepasst, wenn sie kommt. Bei reduzierter Bewegung steht er sofort. Der Platz ist von Anfang an reserviert, nichts springt. Vorleseprogramme lesen ihn als einen Satz (Vorlesekopie wie auf der Startseite, die Wortkästen sind `aria-hidden`).
- ~~Die Kugel wartet nicht auf ihn. Ihr Einspieler beginnt wie vorher rund 0,7 s nach dem Laden, beide Bewegungen laufen kurz gleichzeitig.~~ **Seit V83** kommt die Kugel nach ihm und nach dem Buch: bei 1440 × 900 Aufhänger still nach 2,48 s, Buch 3,10–4,50 s, Kugel mit Tafel und Steuerzeile 4,08–5,49 s, Einspieler ab 7,08 s (7.2).
- Unter dem Vorspann bleiben im ersten Bildschirm bei 1440 × 900 rund 340 px frei, bei 1280 × 800 rund 240 px, bei 1920 × 1080 rund 520 px.
- ~~Tablet und Telefon (bis 62 rem): wie vorher, Vorspann im Grad Überschrift als schlichter Text, kein Flug; die IM Fell wird dort nicht geladen.~~ **Seit dem 23. Oktober (V79)** auch auf Tablet und Telefon in der IM Fell, Zeilenhöhe 1,25 z wie der erste Satz der Startseite dort (zuerst 1,5 z wie breit; nach der Prüfung angeglichen, Wahl für Dominik im Änderungsprotokoll), mit demselben Einflug (21 Wörter, 1,0 s). Ausgang ist der Grad des ersten Satzes der Startseite auf dem Telefon (`--g-einstieg`, 20,7 bis 30 px). Die beiden kurzen Sätze stehen je auf einer Zeile, der erste bricht ausgeglichen; passt der längere („Verschwinden musste er trotzdem.“) nicht mit Luft in die Spalte, wird die Schrift kleiner, mit der Anpassung der Startseite (97 % der Spalte, mindestens 6 px Luft, bis 20,7 px; dann mit 6 px Luft bis 19 px; dann 2 px Luft; Nachmessen, bis zu drei Durchgänge je Stufe). Passt es so nicht, bricht jeder Satz ausgeglichen in 20,7 px. Grade: 320 px 20,7 (der dritte Satz bricht ausgeglichen, 6 Zeilen), 360 px 20,5, 390 px 21,9, 393 px 22,1, 430 px 24,2 (je 5 Zeilen), Tablet 768 px und quer 844 px 30 px (4 Zeilen); hinter dem letzten Wort bleiben mindestens 7 px (360 px) bis 12,5 px (430 px). Die Kugel steht damit auf dem Telefon von 320 bis 430 px genau wie vorher (390 px: 558,75 px; 360 px: 33,75 px höher, weil der Vorspann dort jetzt fünf statt sechs Zeilen hat), auf dem Tablet und quer 33,75 px tiefer (eine Zeile mehr). Mit 1,5 z waren es bis zu 40,5 px, auf dem Tablet 60,75 px. Das kleine Inhaltsbuch unter der Kugel bleibt (seit V80 der schmale Band, unten); es erscheint wie breit erst, wenn der Vorspann eingeflogen ist und dazu 0,8 s vergangen sind, und wenn man es erreicht (seit V83 steht es sofort da, weil es beim Laden unter dem ersten Bildschirm liegt). Ohne Skript steht der Vorspann auch schmal in der IM Fell, ausgeglichen gebrochen.

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

**Telefon.** `h1`, Unterzeile, Vorspann, Kugel, Tafel, der schmale Band als Inhaltsverzeichnis (unten), dann der Klappentext und die übrigen Abschnitte in der Reihenfolge von A. Die Tafel hält vom Laden an die Höhe der längsten Szene, auch in Ruhe; der Band und mit ihm der Klappentext rücken an ihren Text heran (V80, unten).

Figuren: `h3` mit dem Namen in Kapitälchen, Komma, die Rolle im Grad Text, darunter ¼ z der Text. Zwischen Figuren ¾ z.

**Das Inhaltsverzeichnis als Buch zum Umblättern** (V76, V77; Dominik wählte von fünf Varianten in `docs/satoshi-buch.md` die fünfte, „aber unter jedem Kapitel noch ein Symbol, dass das Kapitel darstellt“). `nav#inhaltsbuch`, „Auf dieser Seite“. **Bis 24. Oktober. Am Desktop seitdem ersetzt durch den Band ohne Symbole (V82, unten „Das Inhaltsverzeichnis am Desktop“); die Punkte hier bleiben zur Geschichte, es gelten noch Ort, Folge in der Quelle und „Ohne Skript“.**
- Der *Satoshi*-Band aus dem Regal: Deckel in Tinte mit dem Titel in Papier, Seiten in Papier mit einem Rand von 1 px im Grau der Küsten. Jede Seite trägt genau einen Eintrag im Wortlaut einer Überschrift, oben links, darunter seine Vignette. Drei Doppelseiten: Klappentext | Eckdaten, Gebaut wie ein Protokoll | Die Figuren, Die Frage hinter dem Roman | Wie er gemacht ist. Beim Laden liegt es aufgeschlagen bei der ersten; zuklappen geht nur mit Wischen nach rechts (ein Klick links neben „Klappentext“ tut nichts, damit ein knapp verfehltes Wort das Buch nicht schließt). Am Falz steht nur eine Linie (die linke Seite hat dort keinen Rand). Am äußeren Schnitt zeigen 0 bis 2 Striche die Blätter, die noch auf jeder Seite liegen.
- Umblättern: Klick oder Tipp auf die rechte Hälfte vor, links zurück, Wischen, Pfeiltasten. Auf dem Buch rollt die Seite senkrecht und lässt sich mit zwei Fingern zoomen (`touch-action: pan-y pinch-zoom`). Jedes Blatt dreht sich steif um den Falz, 480 ms, ohne Wölbung und Schatten. Der Tabulator schlägt das Buch beim Eintrag auf, ohne Drehung; er schließt es nie.
- Ein Eintrag (Wort und Vignette) ist ein gewöhnlicher Anker. Nach dem Sprung steht die Überschrift 1 z unter dem oberen Rand, der Fokus liegt auf ihr, ohne Rahmen.
- Format (Höhe × Breite einer Seite): unter 50 rem Fensterhöhe 5,75 × 5 z, bis 56,25 rem 6,5 × 5 z, darüber 9 × 6,75 z im Lesegrad; sonst im Grad klein. Kein Eintrag hat mehr als zwei Zeilen. (Auf dem Telefon stand es bis zum 23. Oktober in 6 × 5,25 z; seitdem gibt es dort dieses Buch nicht, erst Variante 4, seit V80 der schmale Band.)
- Vignetten: eigene Zeichen in der Art einer Vignette im gedruckten Buch, nicht eines Piktogramms: Linie in Tinte, 1,1 px wie die Kartenzeichen, stumpfe Enden und spitze Ecken, geschriebener Text gepunktet wie die Zeichen für Auszüge im Regal, ohne Füllung bis auf zwei kleine Flächen; alle im selben Feld, 2 z hoch (unter 50 rem Fensterhöhe 1¾ z, Format L 2½ z), auf allen Seiten auf einer Höhe. Klappentext ein Schutzumschlag mit aufgeschlagener, beschriebener Klappe; Eckdaten die Zeitleiste des Romans als Maßstabsleiste (ein Strich je Jahr, Prolog 2001 und Epilog 2013 als Enden, 2007 bis 2010 als schmale Fläche); Gebaut wie ein Protokoll drei Blöcke einer Kette; Die Figuren drei Kreise, die sich überschneiden, im gemeinsamen Feld ein Punkt, das Pseudonym; Die Frage hinter dem Roman eine Münze mit Perlkreis, unregelmäßig in zwei Hälften gebrochen; Wie er gemacht ist ein Blatt, auf das schräg ein Streifen eines anderen geklebt ist (die Montage).
- Ort: am Desktop in der weißen Fläche unter dem Vorspann, bündig mit ihm, 2 z darunter (bis 56,25 rem Fensterhöhe 1 z); der Klappentext steht wie vorher. ~~Auf dem Telefon fest 1 z unter der Tafel, deren Höhe die längste Szene hält: immer zu sehen, auch im Einspieler und nach einer Wahl. Bei 390 px bleiben in Ruhe 218 px zwischen „Die Schauplätze“ mit seiner Zeile und dem Buch; die Seite wird um 189 px länger.~~ Auf dem Telefon seit V80 der schmale Band (unten).
- Erscheinen: Das Buch wartet, bis der Vorspann eingeflogen ist, dann 0,8 s, und blendet in 1,4 s ein, dabei 8 px von rechts; auch in einem niedrigen Fenster, wo es unter der Kante liegt. Sein Platz ist reserviert. Mit der Tastatur, bei reduzierter Bewegung und ohne Skript steht es gleich da. Für den schmalen Band auf dem Telefon gelten eigene Zeiten (unten).
- Folge: In der Quelle steht es zwischen Vorspann und Kugel, so kommt der Tabulator nach der Navigation ins Verzeichnis. Schmal (mit Skript) steht es nicht da; der schmale Band steht in der Quelle hinter der Kugel, damit Tastatur und Vorleseprogramm der sichtbaren Folge folgen.
- Ohne Skript: die sechs Überschriften als Liste im Lesegrad unter dem Vorspann, ohne Vignetten, auf jeder Breite.

**Das Inhaltsverzeichnis am Desktop: der Band ohne Symbole** (ab 62,0625 rem; V82, Dominik: „Vielleicht ist es doch besser ohne die Symbole. Einfach das Buch. Man klickt drauf, analog zum Inhaltsverzeichnis auf dem Handy. Es öffnet. Sonst liegt zu viel Fokus auf dem Inhaltsverzeichnis beim Desktop.“). `nav#inhaltsbuch.klappbuch`, „Auf dieser Seite“.
- Derselbe Band wie auf dem Telefon (unten): dasselbe Markup, derselbe Stil `.klappbuch`, ein Skript für beide (`einrichten(buch, klein)`); das Initial („Klappentext“ neben dem Fuß) gibt es nur schmal. Keine Vignetten, kein Umblättern, kein Wischen, keine Pfeiltasten.
- Zu beim Laden, in Tinte, „Satoshi“ in der IM Fell mit kurzem Strich, die Rille. 5 z breit (142,5 × 216 px, so hoch wie der Aufhänger), 2 z unter ihm, bündig mit ihm; in Fenstern unter 56,25 rem Höhe 4,5 z (128 × 195 px), 1 z darunter, so steht er bei 1280 × 800 ganz im ersten Bildschirm. Der Klappentext steht wie vorher.
- Aufgeschlagen 10 z breit (bei 4,5 z: 256,5 px), die Doppelseite bleibt in der linken Spalte und liegt nie über Kugel, Tafel oder Text (bei 1024 × 768 bleiben rechts 180 px). Einträge im Grad klein, Rand ½ z (bei 4,5 z ¼ z), höchstens zwei Zeilen. Liegt das Buch offen still, wird die linke Seite flach gezeichnet (`.liegt`), sonst stünde ihre Schrift bei einfacher Pixeldichte grauer als rechts.
- Aufschlagen mit Klick, Eingabe oder Leertaste: der Deckel dreht sich in 600 ms um den Falz; ein Klick auf die freie linke Seite schlägt es zu, über die Tastatur wird nie zugeschlagen; über die Tastatur und bei reduzierter Bewegung steht es sofort offen, der Fokus auf Klappentext. Klicks während der Drehung zählen nicht. Ein Eintrag springt zu seinem Abschnitt, die Überschrift steht 1 z unter dem oberen Rand (28 bis 29 px), der Fokus auf ihr.
- Für Vorleseprogramme zu ein Knopf „Satoshi, Inhalt aufschlagen“ (wörtlich vom Telefon) mit `aria-expanded`, das Verzeichnis `inert`; die sechs Verweise sind erst nach dem Aufschlagen da (vorher standen sie immer da).
- Über die Grenze: Liegt der Fokus auf einem Band, geht er auf den anderen; liegt er auf einem Eintrag, schlägt sich das andere Buch ohne Drehung auf, der Fokus auf demselben Eintrag.
- Erscheinen in der Folge von V83 (`data-folge="1"`, 1,4 s, Deckkraft und 8 px von rechts, bei 1440 × 900 von 3,1 bis 4,5 s). Solange es nicht zu sehen ist, nimmt es keinen Klick an (der Klick zeigt alles in 0,25 s, der zweite schlägt auf); ein Klick während der Blende zeigt es ganz und schlägt auf. Ohne `seite.js` nimmt es nach 7 s Klicks an. Ohne Skript: die Liste der sechs Überschriften wie vorher.
- Offen: Bei 1024 × 768 liegen die unteren 11 px unter dem ersten Bildschirm, bei 1440 × 700 der größte Teil (wie beim Buch vorher). In Safari ungeprüft.

**Der schmale Band auf Telefon und Tablet** (bis 62 rem; V80, Variante 2 „Die Doppelseite“, ersetzt das kleine Buch aus Variante 4; Dominik: „Finde der schmale Band ist besser / dezenter“, „füll Mal etwas den Whitespace noch auf“, „das spacing beim schmalen band kann nochmal besser proportioniert sein“). `nav#inhaltsbuch-klein.klappbuch`, „Auf dieser Seite“.
- Zu: ein Band in Tinte, bündig an der Textkante, halb so breit wie die Spalte (aufgeschlagen liegt die Doppelseite dann genau über der Spalte), höchstens 8 z (Tablet), quer nie höher als 55 % des Fensters; Format des Satoshi-Bands aus dem Regal, 135 × 205 mm (Höhe = Breite × 1,5185). Auf dem Deckel nur „Satoshi“ in der IM Fell in Papier, 0,165 der Breite groß, mittig rechts der Rille, die Mitte der Zeile bei 38,2 % der Höhe (goldener Schnitt), darunter ein Strich von 1,4 em; die Rille 1 px bei 7 % der Breite. Kein Rahmen, kein Schatten. Für Vorleseprogramme ein Knopf „Satoshi, Inhalt aufschlagen“ mit `aria-expanded`; zu ist das Verzeichnis `inert`.
- Maß der Abstände: Der Band ist der Kopf des ersten Abschnitts. Er steht 2 z unter der letzten Zeile der Tafel (so weit wie ein Abschnitt vom nächsten), nicht unter ihrer Reserve für die längste Szene; „Klappentext“ steht rechts neben seinem Fuß, ¾ z daneben, die Grundlinie auf seiner Unterkante, der Absatz beginnt so weit unter der Unterkante wie sonst unter der Grundlinie einer Überschrift (rund 1 z). Bleibt rechts von der Überschrift weniger als ½ z, rückt sie auf ½ z an den Band (mindestens ¼ z Rand). Reicht das nicht (320 px, 360 px mit großer Schrift), wird der Band so viel schmaler, dass sie mit ¾ z Luft und ½ z Rand daneben steht (sonst ½ z und ¼ z), nie schmaler als 4 z und nur, solange die Einträge im Grad klein oder größer auf zwei Zeilen passen; dann liegt die Doppelseite nicht ganz über der Spalte. Geht auch das nicht (320 px mit größerer Schrift), steht die Überschrift wie jede 2 z unter dem Band. Zusammen: Kugel bis Steuerzeile ¼ z, Steuerzeile bis Tafel ½ z, Tafel bis Band 2 z, im Abschnitt ¾ bis 1 z, auf jeder Breite gleich, weil z auf dem Telefon fest ist.
- Der Band folgt dem Text der Tafel (`--hoch`), das Buch der Abschnitte rückt um dasselbe Maß mit (`--nach`): Wird der Text länger, rücken beide im selben Bild hinunter (gleitend deckte der Band den neuen Text zu); wird er kürzer, gleiten sie in 600 ms hinauf, auch im Einspieler und beim Abspielen im Takt der Stationen. Außer Sicht springen sie; liegt der Band oder die Tafel über dem Bild, wird der Bildlauf nachgeführt, und was man liest, steht still. Offen und bis 1 s nach einer Berührung geht der Band nicht hinauf.
- Aufschlagen: Tipp, Eingabe oder Leertaste. Der Deckel dreht sich in 600 ms um den Falz, der Band gleitet dabei um seine Breite nach rechts; die rechte Seite dreht sich nicht, ihre Einträge stehen von Anfang an, die der linken kommen in 280 ms ab 420 ms. „Klappentext“ blendet neben dem Band aus (150 ms) und mit den Einträgen 2 z unter der Doppelseite wieder ein, der Absatz gleitet nur senkrecht dorthin. Bis die Schrift steht (beim Zuschlagen, bis der Deckel liegt), nimmt das Buch keinen Tipp an. Ein Tipp auf die freie linke Seite schlägt es zu; über die Tastatur wird nie zugeschlagen. Über die Tastatur und bei reduzierter Bewegung steht es sofort offen, der Fokus geht auf Klappentext.
- Die Doppelseite ist kein Kasten: links die Kante des Deckels, in der Mitte ein Falz, der oben und unten ausläuft, rechts zwei Striche als Block der Seiten, alles in `--zb-strich`. Links Klappentext, Eckdaten, Gebaut wie ein Protokoll, rechts Die Figuren, Die Frage hinter dem Roman, Wie er gemacht ist; Satzspiegel außen und am Bund ½ z, oben ein Drittel des freien Raums der volleren Seite, unten der Rest. Grad: Lesegrad, solange kein Eintrag mehr als zwei Zeilen hat, sonst 10 % kleiner, sonst Grad klein, dann mit ¼ z Rand, dann bis 5 % kleiner; reicht das nicht (quer mit großer Schrift), wird der Band in Schritten von ¼ z breiter (höchstens die halbe Spalte). Zwischen den Einträgen ¾ z, mehr, wo der Finger sonst keine 44 px hätte, auf einer hohen Seite (Tablet, 430 px) bis 1½ z, etwa so viel wie über dem ersten Eintrag. Jeder Eintrag nimmt den Finger über die halbe Luft darüber und darunter, nach außen bis zum Rand der Seite, zum Falz nur bis zum Bund. Auf dem Telefon ohne Unterstrich (der Strich kommt mit Maus und Fokus); das weicht von der Auswahlliste in 6.20 ab (Touch: Strich) und ist für Dominik offen.
- ~~Erscheinen: Der Band wartet wie breit auf den Vorspann und 0,8 s und blendet in 700 ms ein, wenn ein Viertel von ihm im Bild ist. Ist der Vorspann schon über dem Bild, wartet er nicht: sobald ein Teil von ihm im Bild ist, nach der IM Fell seines Titels (höchstens 1,2 s), in 200 ms.~~ **Seit V83:** Der Band liegt beim Laden auf allen gemessenen Größen (360 × 800 bis 992 × 1366) unter dem ersten Bildschirm und steht darum sofort da, ohne Einblenden beim Hineinrollen (`data-folge="2"`; läge er im ersten Bildschirm, blendete er mit dem Globus ein).
- Messwerte (Chromium, z = 27 px): 393 px (Dominiks Gerät) Band 169 × 256,6 px (6,26 × 9,5 z), über ihm 55 bis 55,7 px, Luft 20,3 px (+20 %: 13,5 px), Absatz 25,6 bis 27 px unter dem Band; 320 px Band 120,3 × 182,6 px (4,45 z, verjüngt), mit größerer Schrift 137,6 px und die Überschrift darunter; 768 px 216 × 328 px (8 z). Offen bricht kein Eintrag dreizeilig, auch nicht 780 × 360 mit +20 %.

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
21. **Der Vorspann von *Satoshi* („Am 31. Oktober 2008 …“) im Überschriftengrad.** Alternative: im Textgrad. Seit Option B steht er zweispaltig im Grad Einstieg und fliegt ein (9.2); schmaler bleibt der Überschriftengrad.
22. **Koordinaten auch an der Tafel von *Satoshi*** (wie A). Alternative: dort weglassen, an Startseite, Vita und *Ursprung* bleiben sie.
23. **Regal: Lücken, lehnende und liegende Bücher wie A,** Bleistift und Lesezeichen werden Punkt, Strich und gestrichelte Kante. Alternative: das Regal ohne Lehnen und Lücken (B).
24. **Rückenfarben gedämpft, Familien bleiben.** Alternative: alle Rücken in einem Ton.
25. **Herausziehen beim Klick: 12 px nach oben in 160 ms,** beim Zeigen nur eine Kante. Alternative: gar keine Bewegung.
26. **Buchzeile als Satz statt Karteikarte.** Alternative: eine schlichte weiße Karte mit „schließen“.
27. **Zeitband auf dem Telefon startet am rechten Ende** (das Neueste und deine Werke). Alternative: am linken Ende bei Gilgamesch; am 23. Oktober kurz so gebaut (passend zur Ruhe beim ältesten, V73) und zurückgenommen, weil dann die zwei Reihen darunter beim Laden leer im Bild sind.
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
