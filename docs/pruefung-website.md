# Prüfung der Website auf KI-Merkmale

Version A, das Testsystem in `website/`, alle elf Seiten. Stand: 20. Oktober 2026.
Geprüft gegen die Rangliste in `docs/ki-merkmale.md`. Die Nummern („Rang 24“) beziehen sich auf diese Liste, die Befunde („B2“) auf Abschnitt 5 dieses Dokuments.

---

## 1. Ergebnis

Die Website meidet die erste und die zweite Welle fast vollständig. Im ganzen Testsystem gibt es keinen abgerundeten Kasten, keinen Schatten, keinen Weichzeichner, keinen Mittelpunkt, keinen Pfeil, keine Monospace-Schrift, kein Icon, kein Emoji und keine Kennzahl-Kachel. Das ist gemessen und ist das Ergebnis der Regeln aus synthese.md.

Dafür trägt sie fast das ganze Profil der dritten Welle, des literarischen Looks. Von den 68 Merkmalen der Liste sind 29 eindeutig vorhanden, 16 teilweise oder nur an einer Stelle, 23 gar nicht. Von den 35 häufigsten Merkmalen treffen 18 zu, 7 weitere teilweise. Die zehn, die nicht zutreffen, sind Pillen, Pfeile, Monospace, der zentrierte Hero, shadcn, Inter, Lila, Emoji, Icon-Quadrate und dekorative Nummern. Der erste Bildschirm der Startseite zeigt 17 Merkmale der Liste. Hallmark nennt schon zwei auf einem Bildschirm eine Bestätigung.

Der Hinweis des Freundes trifft zu und lässt sich beziffern. Im ersten Bildschirm der Startseite und der Vita sind 15 % aller sichtbaren Zeichen zugleich grau und kursiv, auf dem Telefon 16 %. Dazu kommt grauer Text ohne Kursive. Auf den Seiten mit Inhalt steht ein Fünftel bis ein Viertel aller Zeichen in einem der Grautöne #6B6D72 oder heller. Drei der verwendeten Töne liegen unter dem Mindestkontrast von 4,5 : 1.

Ein großer Teil der Treffer geht auf die eigenen Notizen dieses Projekts zurück. recherche-design.md und synthese.md haben die Kapitälchen, die kursive Stationenzeile nach Joyce, „Auf dem Globus: wo ich gelebt habe …“, Koordinaten „kursiv in Grau“, Insel-Muster, Schuber, Bleistiftstrich, Lesebändchen, Karteikarte und „Kinderzimmer“ ausdrücklich empfohlen. An zwei Stellen weicht der Bau außerdem von den eigenen Regeln ab. Regel 3 aus synthese.md strich die Tagline, auf allen elf Seiten steht trotzdem „Schriftsteller und Reisender“. Regel 7 erlaubte eine einzige Bewegung, die Seite hat inzwischen fünf Arten davon.

Was trägt und bleiben sollte: der Globus als eigene Arbeit mit echten Daten, das Zeitband aller Bücher, das Regal mit Rückenbreite aus der Seitenzahl, der deutsche Satz, die gestalteten Zustände und der Satzspiegel in Zeilenhöhen. Abschnitt 6 begründet das.

Die fünf Änderungen mit der größten Wirkung:

1. Die Kapitälchen-Labels über allen Abschnitten durch aufrechte Überschriften in der Textschrift ersetzen oder streichen (B1).
2. Grau und Kursiv trennen. Pro Textebene ein Mittel, Ortsnamen aufrecht, Koordinaten nur noch auf der Tafel (B2).
3. Den ersten Satz beim Laden stehen lassen und in der Vollkorn setzen (B3). Das entscheidet Dominik, er hat den einfliegenden Satz gewählt.
4. Siena durch einen Akzent aus Dominiks Material ersetzen oder ganz weglassen, Karton- und Cremeflächen weiß (B4).
5. Die Tagline streichen und Claudes Mikrotexte neu schreiben, ohne Semikolonketten, ohne Sätze über das Layout und ohne wiederkehrende Formeln (B5, B6).

---

## 2. Vorgehen

- **Werkzeug:** Playwright mit Chromium. Der Kontext kommt aus `tools/laden.cjs`, die Schriften aus dem Cache von Google Fonts, d3 und topojson-client aus lokalen Kopien. Alle Seiten über `file://`.
- **Geräte:** Desktop 1440 × 900, Telefon 390 × 844 mit doppelter Pixeldichte.
- **Bildschirmfotos:** pro Seite und Gerät der erste Bildschirm nach 3,5 s (Startseite nach 7 s, wenn der Einstieg steht) und die ganze Seite nach einmaligem Durchscrollen. Dazu rund 20 Zustände: der Einstieg im Flug, Karteikarten, die Ebenen des Globus, Satoshi beim Lesen, Telefonansichten.
- **Messung im Browser:** über alle sichtbaren Textknoten Farbe, Kursive, Schriftgrad und Schriftfamilie je Zeichen, der Kontrast jeder Textfarbe gegen #FFFEFC, die Zahl der unterstrichenen Elemente, die Zeichen ·, →, –, ; und :. Dazu Radius, Schatten, `backdrop-filter` und Übergänge aller Elemente.
- **Quelltext:** `stil.css`, die `<style>`-Blöcke der Seiten, `seite.js` und `globus/kern.js` gelesen, Farbwerte gezählt.
- **Herkunft der Texte:** Abgleich aller sichtbaren Sätze mit den beiden Exposés (`ki-text/herkunft.txt`) und mit der Git-Historie. So lassen sich Dominiks Texte von Claudes Mikrotexten trennen. Dominiks Texte bleiben unverändert, Vorschläge dazu stehen getrennt in B17.
- **Nicht gemacht:** der Silhouettentest gegen fünf andere Autorenseiten. Dafür fehlt in der Arbeitsumgebung ein Vergleichssatz. Er gehört vor die Abgabe von Version B.
- **Grenzen:** Gezählt werden Zeichen, nicht Flächen. In der Bibliothek verzerrt die Rückenbeschriftung die Werte für Farbe und Schriftgrad. Der Anteil „grau und kursiv“ enthält die Werktitel der Navigation, die in #47494E kursiv stehen. Ohne sie liegt er auf der Startseite bei rund 12 %.

---

## 3. Messwerte

### Textfarben

| Ton | Token | Kontrast auf #FFFEFC | Verwendung |
|---|---|---:|---|
| #0A0B0D | `--schwarz` | 19,5 : 1 | gewählte Einträge, Seitentitel |
| #1D1E21 | `--graphit` | 16,5 : 1 | Lesetext |
| #47494E | `--grau-1` | 8,9 : 1 | Navigation, Ebenenzeile |
| #6B6D72 | `--grau-2` | 5,1 : 1 | Tagline, Unterzeilen, Legenden, Koordinaten, Tafelsatz, Fuß |
| #7C7E83 | `--grau-neben` | **4,0 : 1** | Nebenorte in Stationenzeile und Vita, ihre Koordinaten |
| #96989C | `--grau-3` | **2,9 : 1** | Striche der Stationenzeile, inaktives „früher“ |
| #A2A4A7 | ohne Token, `bibliothek.html` | **2,5 : 1** | kursive Titel der wartenden Bücher |

Fett: unter WCAG AA für normalen Text. Im Code stehen außerdem 14 Farbwerte in `stil.css`, 9 feste Werte ohne Token in `index.html` und 7 in `bibliothek.html`, die Verlagsfarben der Buchrücken nicht mitgezählt.

### Seiten

| Seite (Desktop) | grau, erster Bildschirm / ganze Seite | grau und kursiv, erster Bildschirm / ganze Seite | Schriftgrade, erster Bildschirm / ganze Seite | unterstrichen im ersten Bildschirm | Semikolons |
|---|---:|---:|---:|---:|---:|
| Startseite | 21,8 % / 22,5 % | 15,1 % / 10,5 % | 7 / 12 | 20 | 8 |
| Startseite, Telefon | 22,4 % / 24,1 % | 16,3 % / 9,8 % | 5 / 13 | 13 | 8 |
| Satoshi | 23,6 % / 9,1 % | 1,7 % / 1,7 % | 8 / 9 | 11 | 3 |
| Ursprung | 22,0 % / 25,7 % | 6,7 % / 4,8 % | 6 / 9 | 13 | 0 |
| Vita | 23,4 % / 27,1 % | 15,1 % / 12,3 % | 9 / 11 | 6 | 1 |
| Länder | 11,5 % / 27,0 % | 2,6 % / 1,9 % | 5 / 7 | 75 | 0 |
| Bibliothek | 27,2 % / – | 6,5 % / 4,2 % | – | 13 | 0 |

„Grau“ heißt hier #6B6D72 und heller, ohne die Navigation. Schriftgrade auf der ganzen Startseite: 30,9 px, 30,4 px, 23,8 px, 21,9 px, 20,2 px, 19 px, 17,8 px, 15,3 px, 14 px, 13 px, 10,8 px und 9,9 px. Auf der ganzen Website: 0 Mittelpunkte, 0 Pfeile, 0 Elemente mit `border-radius` außer dem runden Globusrand, 0 Schatten, 0 `backdrop-filter`.

---

## 4. Treffer pro Bildschirm

Bildschirmfotos im Ordner `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/`, vollständige Pfade im Anhang.

| Bildschirm | Merkmale (Rang) | Zahl |
|---|---|---:|
| Startseite, Desktop | 1, 8, 9, 11, 21, 24, 25, 26, 27, 31, 32, 35, 53, 55, 58, 60, 61 | 17 |
| Startseite, Telefon | 1, 9, 11, 21, 24, 25, 31, 32, 35, 53, 58, 60, 61 | 13 |
| Ursprung, Desktop | 1, 8, 10, 11, 16, 21, 24, 26, 27, 32, 35, 53, 55 | 13 |
| Satoshi, Desktop | 1, 8, 10, 11, 21, 27, 33, 34, 35, 53, 55, 58 | 12 |
| Vita, Desktop | 1, 8, 9, 11, 21, 24, 26, 29, 30, 31, 55 | 11 |
| Bibliothek, Desktop | 1, 2, 3, 10, 11, 21, 24, 28, 33, 52, 59 | 11 |
| Länder, Desktop | 2, 21, 27, 32, 33, 34, 35, 53 | 8 |
| Erzählungen, Desktop | 1, 11, 21, dazu die leere Seite (B12) | 3 |

---

## 5. Befunde nach Wirkung

Die Reihenfolge richtet sich danach, wie sichtbar ein Merkmal ist (erster Bildschirm, jede Seite), wie stark es in diesem Zusammenhang nach KI aussieht und an wie vielen Stellen es steht. „Stärke“ bewertet das Merkmal auf dieser Website, nicht allgemein.

### B1. Kapitälchen-Labels über jedem Abschnitt (Rang 1, dazu Rang 28)

- **Befund:** gefunden, auf allen elf Seiten.
- **Wo:**
  - `.titel` in `stil.css` Zeile 109: Vollkorn SC, `letter-spacing: .06em`, `text-transform: lowercase`. Startseite „was ich schreibe“, „was ich gelesen habe“. Satoshi „der roman der reihe nach“, „klappentext“, „eckdaten“, „gebaut wie ein protokoll“, „die figuren“, „die frage hinter dem roman“, „wie er gemacht ist“. Vita „stationen“. Impressum zwei, Datenschutz acht. Im Fuß jeder Seite „kontakt“.
  - `.tafel-unter` in `stil.css` Zeile 214: „wohnort“, „längerer aufenthalt“, „trilogie, in arbeit“ auf der Stationstafel.
  - `.schild` in `bibliothek.html` Zeile 38: Regalschilder wie „von gilgamesch bis zur jahrhundertwende“, über dem Regal „was ich schreibe“ und „auf dem nachttisch“.
  - Der Name im Briefkopf (`.briefkopf .name`, `stil.css` Zeile 82) gesperrt in Kapitälchen, die Figurennamen auf Satoshi (`.figur-name`).
  - Fotos: `d-index-ganz.png`, `d-satoshi-ganz.png`, `d-vita-schirm.png`, `d-bibliothek-schirm.png`.
- **Stärke:** stark. Die Liste nennt als Beispiele der literarischen Variante genau „klappentext“, „eckdaten“ und „stationen“. Verräterisch ist die Dichte von einem Label pro Abschnitt.
- **Herkunft:** synthese.md, Entwurf A und Regel 6 (Kapitälchen statt Versalien), recherche-design.md Muster 6.
- **Alternative:**
  - Abschnittsüberschriften als `h2` in der Vollkorn, aufrecht, in normaler Schreibung, eine Stufe größer als der Text (1,25 em) und in Graphit. Darüber zwei Zeilen Abstand, darunter eine halbe.
  - Wo ein Abschnitt ohne Überschrift verständlich ist, entfällt sie. Der Fuß braucht kein „Kontakt“, die E-Mail-Adresse spricht für sich.
  - Auf der Tafel das Label in die Kopfzeile holen: „Freiburg, 2014. Studium.“
  - Regalschilder durch die Jahreszahlen unter dem Brett ersetzen („1900–1945“), ohne Namen für die Epoche.
  - Kapitälchen bleiben, wo der Buchsatz sie vorsieht: die Kontinente als Stichwort am Absatzanfang des Länderregisters (eine Registerkonvention) und die Autorennamen auf den Buchrücken. Den Namen im Briefkopf ohne Sperrung setzen.
  - Für Satoshi Dominiks Gliederung aus dem Exposé nehmen (B17).

### B2. Graue Kursive als zweite Stimme (Rang 24, mit Rang 8, 11 und 26)

- **Befund:** gefunden. Das ist das Merkmal, das der Freund gesehen hat.
- **Messung:** 15,1 % der Zeichen im ersten Bildschirm der Startseite sind grau und kursiv, auf dem Telefon 16,3 %, auf der Vita 15,1 %.
- **Wo, grau und kursiv, meist auch kleiner (drei Mittel für dieselbe Nachricht „Nebensache“):**
  - Stationenzeile `.kolophon` in `index.html` Zeile 42–46 und `ursprung.html` Zeile 34–37: 0,9375 em, kursiv, #6B6D72. Nebenorte zusätzlich 0,86 em in #7C7E83, Striche in #96989C.
  - Startseite: Bildlegende `.regalbild figcaption` (Zeile 79), Bandnamen `.bandname` (Zeile 118), Jahreszahlen der Achse `.zb .jahr` (Zeile 107, 13 px).
  - Vita: Koordinaten `.daten .koord` (Zeile 57, 0,8125 em), Nebenorte `.daten .neben` zugleich kleiner und heller (Zeile 58–60).
  - Satoshi: Kapiteltage `.protokoll .tag`. Der Ortszusatz „, Nevada“ ist aufrecht, aber grau und kleiner, also zwei Mittel.
  - Bibliothek: Zeitleiste `.zeitleiste-zeile` (Zeile 114), wartende Bücher `.geist .aufschrift` (Zeile 73, #A2A4A7).
  - Karteikarte `.karte-unter` („Roman“, `stil.css` Zeile 241), Hinweis `.hinweis` (165), Ersatzsatz `.ersatz` (167), Entwurfsvermerk `.recht .vermerk` (130), Notiz der Leseseite `.lese-notiz`.
- **Wo, kursiv ohne Werktitel als Grund:** Ortsnamen im Tafelkopf (`.tafel-kopf`, `stil.css` 212), in den Szenen (`.szene-ort`), in den Stationen der Vita (`.daten .ort`) und auf dem Globus (`seite.js` Zeile 198, `italic 15px "Vollkorn"`).
- **Fotos:** `d-index-schirm.png`, `t-index-schirm.png`, `d-vita-schirm.png`, `d-bibliothek-schirm.png`.
- **Stärke:** stark. Jede Stelle für sich ist Buchsatz. Zusammen ergeben sie neben dem Text eine zweite, gedämpfte Stimme, und sie steht im ersten Bildschirm.
- **Herkunft:** recherche-design.md Muster 6 („kursiv in Grau“), synthese.md Entwurf A (kursive Kolophonzeile) und Entwurf C (kursive Marginalie).
- **Alternative:**
  - Regel für alle Seiten: pro Textebene genau ein Unterscheidungsmittel. Kursiv nur für Werktitel, fremdsprachige Wörter und Zitate. Grau nur für einen Zustand (nicht gewählt, inaktiv).
  - Die Stationenzeile streichen. Die Stationen stehen auf der Tafel mit „früher“ und „später“, und die Kurzvita nennt Dortmund, Potsdam, Taiwan und Berlin schon. Diese Ortsnamen im Satz können den Globus steuern. Wer Joyces Zeile behalten will, setzt sie einmal ans Ende der Vita, aufrecht und in Textfarbe, als Unterschrift in Joyces Form: „Dortmund–Freiburg–Potsdam–Kaohsiung–Berlin 1995–2026“.
  - Legenden und Achsenzahlen aufrecht, in Graphit, eine Stufe kleiner (0,8125 em). Sie unterscheiden sich durch ihre Stellung unter dem Bild. So setzt Tufte CSS Randnotizen.
  - Ortsnamen aufrecht. In der Kartografie stehen Siedlungen aufrecht, kursiv sind Gewässer und Landschaften. Das gilt für die Beschriftung im Globus, den Tafelkopf und die Szenenorte.
  - Die Koordinaten in der Vita streichen, dort gibt es keine Karte. Auf der Tafel neben dem Globus bleiben sie, aufrecht und in Textfarbe.
  - Nebenorte nicht kleiner und heller setzen. „längerer Aufenthalt“ steht schon als Wort da.

### B3. Einfliegender erster Satz in einer Display-Schrift (Rang 25, Rang 9, Rang 31)

- **Befund:** gefunden.
- **Wo:** `index.html`, Skript nach `#einstieg` (Zeile 168), Animation ab Zeile 284. Jedes Wort gleitet 0,3 em von rechts herein, 640 ms, gestaffelt, mit Bewegungsunschärfe über `feGaussianBlur` (Zeile 264). Erst danach startet die Chronik. Die Schrift `--anzeige`, IM Fell French Canon (`stil.css` Zeile 33, `.leitsatz` Zeile 73), gilt nur für diesen Satz, auf der Vita steht er damit ohne Bewegung. Fotos: `d-index-einstieg-folge.png` (nach 150, 450 und 900 ms), `d-vita-schirm.png`.
- **Stärke:** stark. Das ist fast wörtlich das Rezept aus Anthropics Cookbook und Skill von 2025: „one well-orchestrated page load with staggered reveals“. IM Fell steht in Hallmarks Rezept „Almanac“. Eine Charakterschrift für eine einzige Zeile beschreibt Rang 9 als eigenes Muster.
- **Herkunft:** Dominik hat den einfliegenden Einstieg festgelegt (Commit e65dc13, „Einstieg einfliegend festgelegt“). Die Entscheidung liegt bei ihm.
- **Alternative:**
  - Der Satz steht beim Laden da, in der Vollkorn, 1,5 em, Graphit. Er trägt ohne Bewegung, er ist der beste Satz der Startseite.
  - Die eine Bewegung der Seite ist dann die Chronik auf dem Globus. Sie beginnt sofort.
  - Will Dominik die Bewegung behalten: ohne Unschärfe und ohne Staffel, der Satz erscheint als Ganzes in 200 ms. Das schwächt das Merkmal ab, beseitigt es aber nicht.
  - IM Fell streichen, eine Schrift für die ganze Website. Braucht es einen zweiten Schnitt, dann eine Groteske mit Herkunft für alles Funktionale, wie bei Paris Review und Sternberg Press.

### B4. Siena-Akzent und warme Flächen (Rang 10, Rang 2)

- **Befund:** Siena gefunden. Creme teilweise: Der Seitengrund #FFFEFC ist praktisch weiß, warme Töne stehen in Flächen.
- **Wo:**
  - `--siena: #9B5230` (`stil.css` Zeile 28) für die Seitentitel von Satoshi und Ursprung (`.buchtitel`), die Bandziffern (`.band-ziffer`, `ursprung.html` Zeile 52), die Tafelmarke eigener Werke, die Signatur der Karteikarte, Muster und Rahmen der eigenen Rücken (`bibliothek.html` Zeile 85–96), die offenen Striche im Zeitband (`.zb .werk`) und für Wege und Punkte auf dem Globus (`seite.js` Zeile 178).
  - Warme Flächen: `--karton: #FBF9F4` (Karteikarte), `.stueck.eigen` #F8F4EC (`index.html` Zeile 64), `.eigen` #F6F2EA und `.titelschild` #FDFBF7 (`bibliothek.html` Zeile 85–86), `--brett: #E9E6E0`. Auf der Länderseite füllt das warme Beige #DBD5CB der bereisten Länder große Teile des Globus (`seite.js` Zeile 177).
  - Fotos: `d-satoshi-schirm.png`, `d-ursprung-schirm.png`, `d-bibliothek-schirm.png`, `d-laender-schirm.png`, `d-index-karte-eigen.png`.
- **Stärke:** Siena stark. Die Liste nennt Siena ausdrücklich als dunklere Variante der Terrakotta-Familie, zu der Anthropics eigene Markenfarbe gehört. Dass die Farbe hier genau eine Bedeutung hat (eigene Werke), ist gutes Handwerk und mildert den Eindruck. Die Familie bleibt erkennbar. Creme mittel: Die Flächen sind klein, ergeben aber mit Siena zusammen die Paarung aus Rang 2 und 10.
- **Alternative:**
  - Variante a, kein Akzent: Schwarz auf Weiß. Eigene Werke erkennt man an ihrer Stellung (sie stehen zuerst) und an der Kursive des Titels. Auf dem Globus die Wege in Graphit, Satoshi durchgezogen, Ursprung gestrichelt.
  - Variante b, ein Akzent mit Herkunft aus einer anderen Familie, etwa ein Tintenblau, abgenommen von einem Gegenstand aus Dominiks Arbeit (Tinte, Notizbuch, Atlas). Zum Ausprobieren #23406E, Kontrast 10 : 1 auf Weiß. Die Bedeutung bleibt dieselbe.
  - Bitcoin-Orange liegt für Satoshi nahe und gehört zur selben Familie. Es scheidet aus.
  - Flächen weiß: Karteikarte #FFFFFF mit 1 px Graphit, eigene Rücken weiß, das Brett als 1 px Linie in Graphit, wie synthese.md es ursprünglich vorsah. Bereiste Länder in einem kühlen Grau um #D9DBDE oder als feine Schraffur.

### B5. Tagline unter dem Namen (Rang 21)

- **Befund:** gefunden, auf allen elf Seiten im ersten Bildschirm und in der Beschreibung der Startseite.
- **Wo:** `<span class="rolle">Schriftsteller und Reisender</span>` im Briefkopf jeder Seite (`index.html` Zeile 150, `bibliothek.html` Zeile 158 usw.), grau gesetzt über `.briefkopf .rolle` (`stil.css` Zeile 85). Meta-Beschreibung der Startseite „Dominik Jäkel, Schriftsteller und Reisender.“ Foto: `d-index-schirm.png`.
- **Stärke:** mittel bis stark. Die Liste führt fast dieses Beispiel wörtlich („Autor und Reisender“). Grau unter dem Namen ist zugleich Rang 11.
- **Herkunft:** synthese.md Regel 3 hat die Zeile gestrichen („‚Autor und Reisender‘ fällt weg“). Ob Dominik sie später gewünscht hat, geht aus den Notizen nicht hervor.
- **Alternative:** streichen. Der Beruf steht im ersten Satz: „Dominik Jäkel schreibt tagsüber unter fremden Namen und abends unter seinem eigenen.“ Auf den Unterseiten steht der Name allein. Beschreibung der Startseite: „Dominik Jäkel schreibt Romane. Sein Debüt Satoshi erzählt die Gründungslegende von Bitcoin.“

### B6. Claudes Mikrotexte (Rang 58, 33, 59, 34, 32, 35, 61, 37, 28)

- **Befund:** gefunden. Diese Sätze stehen in keinem Exposé und stammen laut Git-Historie aus dem Bau. Sie dürfen geändert werden, wenn Dominik die neue Fassung freigibt.
- **Semikolonketten (Rang 58):** Kurzvita `index.html` Zeile 334 („auf Taiwan; heute lebt er …“, „Satoshi ab; daneben …“), Werkverzeichnis („liegt vollständig vor; gerade entsteht …“, „in Arbeit; begonnen in Kaohsiung“), Legende des Zeitbands mit vier Semikolons in einem Absatz. Auf der Startseite 8 Semikolons auf 386 Wörter. Satoshi-Unterzeile und Karteikarte wiederholen die Kette.
- **Sätze über die Seite (Rang 33):** Bibliothek „Oben steht, woran ich schreibe … Darunter steht, was ich gelesen habe …“ und „Zu jedem Rücken gibt es eine Karteikarte.“. Startseite: Bildlegende „Was ich schreibe, und daneben, was gerade auf dem Nachttisch liegt.“ (sie wiederholt die Überschrift darüber), die Legende des Zeitbands in fünf Sätzen, „Die ganze Bibliothek, jedes Buch mit seinem Rücken im Regal.“. Satoshi-Tafel „Kobe und Penang liegen auf der anderen Seite des Globus.“. Länder-Tafel „Fünfundsechzig Länder und Gebiete, grau auf dem Globus.“. Bibliothek „Dieselben Bücher stehen auf der Startseite auf einer Zeitachse.“. Tafel „Von hier aus sind die Entfernungen gemessen.“ (`seite.js` Zeile 555).
- **Absicherung (Rang 59):** „Eine Auswahl, längst nicht alles.“ (Startseite) und „Es ist eine Auswahl und wird nie vollständig sein.“ (Bibliothek). Beide stehen in der Liste als Beispiel.
- **Gleich gebaute Sätze (Rang 34):** „Die meisten Länder liegen in Europa, viele in Asien, einige in Afrika, wenige in Amerika.“ auf der Startseite (Ebene Reisen) und auf der Länderseite, ebenfalls ein Listenbeispiel. Der leere Schlusssatz „Dieser Roman erzählt die Geschichte.“ (`ursprung.html` Zeile 165): Im Exposé heißt er „Kreise ohne Wiederkehr erzählt die Geschichte hinter dem größten Rätsel der Frühgeschichte“. Die Kürzung hat ihm den Inhalt genommen.
- **Doppelpunkt (Rang 32):** „Auf dem Globus: …“ (Startseite zweimal, Länder), „Drei Romane über drei Geburten: …“ (Ursprung), „Die drei Bände der Ursprungstrilogie:“ (Startseite, Ebene Ursprung). Meta-Beschreibungen nach dem Muster „Name: Erklärung“ auf fünf von elf Seiten (Satoshi, Ursprung, Vita, Bibliothek, Länder).
- **Wiederholte Formeln (Rang 35):** „Auf dem Globus“ mindestens fünfmal. „in Arbeit“ mindestens siebenmal (Startseite, Ursprung, Länder, Tafel, Karteikarte, Beschreibungen). „X für X, von Y an“ dreimal: „Noch einmal von Dortmund an“, „Szene für Szene, von Buenos Aires an“, „Ort für Ort, von Göbekli Tepe an“. „Von X bis Y“ fünfmal: „Von Gilgamesch bis Labatut“, „Von Buenos Aires bis Penang“, „von Göbekli Tepe … bis Jerusalem“ auf Tafel, Vita und in der Beschreibung, das Regalschild „von Gilgamesch bis zur Jahrhundertwende“. w-Sätze als Etiketten: „Was ich schreibe“, „Was ich gelesen habe“, „wo ich gelebt habe“, „wohin ich gereist bin“, „wo Satoshi spielt“, „was noch wartet“. „Das Manuskript liegt vollständig vor“ viermal, „Viele davon habe ich auf der Werkstattbühne … gelesen“ dreimal.
- **Wechsel der Person (Rang 61):** Startseite, ein Bildschirm: Kurzvita „Er wurde …“, darunter „wo ich gelebt habe“, am Ende der Chronik auf der Tafel „Hier lebt er heute.“ (`index.html` Zeile 499).
- **Tiefsinnsformeln (Rang 37):** Satoshi, Abschnitt „Wie er gemacht ist“: „Die Fiktion wohnt in den Leerstellen der Akten“ und „Literatur in den Leerstellen des Verbürgten“, zweimal dieselbe Leerstelle in zwei Sätzen.
- **Effekt-Überschriften und Rubriken (Rang 28):** „Der Roman der Reihe nach“, „Die Frage hinter dem Roman“, „Wie er gemacht ist“, „Kinderzimmer“, „Auf dem Nachttisch“, „Was noch wartet“ und das Bedienwort „zurücklegen“. Dominiks Goodreads-Regale heißen childhood-readings, currently-reading, to-read und not-finished. „Kinderzimmer“ und „Nachttisch“ stammen aus synthese.md. Benutzt Dominik eines der Wörter selbst, bleibt es.
- **Fotos:** `d-index-ganz.png`, `d-bibliothek-schirm.png`, `d-laender-schirm.png`, `d-satoshi-schirm.png`, `d-index-ursprung.png`.
- **Stärke:** stark in der Summe. Einzeln wirken die Sätze sorgfältig. Wer mehrere Seiten liest, hört überall dieselbe Stimme mit denselben Wendungen.
- **Alternative, Fassungen zum Freigeben:**
  - Kurzvita: „Er wurde 1995 in Dortmund geboren, studierte am Hasso-Plattner-Institut in Potsdam und lebte vier Jahre auf Taiwan. Heute lebt er in Berlin und moderiert die Werkstattbühne des Autorenforums Berlin. 2022 erhielt er den A.-E.-Johann-Preis. Er schließt gerade seinen Debütroman Satoshi ab und schreibt an einer Romantrilogie über die Anfänge der Zivilisation.“
  - Werkverzeichnis: „Satoshi. Roman in vierzig Kapiteln, das Manuskript ist abgeschlossen.“ und „Ursprung. Drei Romane über die Anfänge der Zivilisation, begonnen in Kaohsiung.“. Den Stand „in Arbeit“ einmal nennen, auf der Seite der Trilogie.
  - Zeitband: ein Satz, „Alle Bücher nach dem Jahr ihrer Erstausgabe, von Gilgamesch bis Labatut.“. Die Kodierung (dunkel, halbe Höhe, Strich darüber, quer, eigene Werke) als gezeichnete Legende mit je einem Wort, wie auf einer Karte. Statt der Absicherung „Kurzgeschichten und Anthologien trage ich noch nach.“, das ist Dominiks Wunsch laut README.
  - Bibliothek: Vorspann auf einen Satz kürzen, Zeichenerklärung gezeichnet, „Zu jedem Rücken gibt es eine Karteikarte“ streichen, der erste Klick zeigt es.
  - Länder: den Satz mit „die meisten, viele, einige, wenige“ streichen und die Kontinente im Register den Globus drehen lassen. Wenn ein Satz bleibt, dann mit Zahlen: „Einunddreißig der fünfundsechzig Länder und Gebiete liegen in Europa, neunzehn in Asien, elf in Afrika und vier in Amerika.“
  - Ebenen: statt „Auf dem Globus: wo ich gelebt habe, …“ eine Kartenwahl unter dem Globus aus Substantiven, gesetzt wie die Navigation: „Wohnorte  Reisen  Satoshi  Ursprung“.
  - Tafel am Ende der Chronik: „Berlin, seit 2022.“, ohne Person.
  - Bildlegende über dem Regal streichen. „Die ganze Bibliothek, jedes Buch …“ wird ein Link „Bibliothek“.
  - Meta-Beschreibungen als Sätze: „Satoshi ist der Debütroman von Dominik Jäkel …“.
  - Satoshi, „Wie er gemacht ist“: durch Dominiks Abschnitt „Vergleichstitel“ aus dem Exposé ersetzen (B17).
  - Ursprung, Band I: Dominiks vollständigen Satz aus dem Exposé einsetzen oder den Satz streichen.

### B7. Nachgebaute Papiergegenstände und Buchkulisse (Rang 52, 60, 26, 57, Rang 3 in der Strich-Variante)

- **Befund:** gefunden.
- **Wo:**
  - Karteikarte (`stil.css` Zeile 225–248, `seite.js` ab Zeile 590): „A6 quer“, Kartonfarbe, Kartonrand, Signaturen wie „A 1890b“ oder „DJ 1“, das Bedienwort „zurücklegen“. Fotos: `d-index-karte-eigen.png`, `d-bibliothek-karte.png`.
  - Regal in `bibliothek.html`: Bleistiftstriche für Lieblingsbücher (`.strich-1`, Zeile 62), Lesezeichen für abgebrochene Bücher (`.lesezeichen`, 67), Buchstützen (`.stuetze`), mit Bleistift vorgezeichnete Umrisse der wartenden Bücher (`.geist`, gezeichnete SVG-Pfade), Insel-Muster auf den eigenen Rücken (`.muster-*`, 88–96), ein Schuber, aus dem die Bände gleiten (`.schuber-platz`, 99). Auf der Startseite das Regalbild mit Bünden in Siena (`index.html` Zeile 63–75). Fotos: `d-bibliothek-schirm.png`, `d-bibliothek-eigen.png`.
  - Buchkonventionen als Kulisse (Rang 60): die Stationenzeile nach Joyce als Bedienung (B2), der „lebende Kolumnentitel“ auf dem Telefon (`ursprung.html` `.kolumne`, Foto `t-ursprung-kolumne.png`), die Vita „gesetzt wie eine Buchklappe“, das Kolophon im Fuß in Grau.
  - Mikro-Metadaten (Rang 26): Koordinaten an elf Stationen der Vita ohne Karte, auf jeder Tafel und unter jedem Band der Trilogie, „390 km Luftlinie von Dortmund.“ auf der Tafel, die Signaturen der Karten.
  - Ketten mit Strich (Rang 3): „Dortmund bis 2014 – Freiburg 2014 – …“, „Gilgamesch – 1900 – 1946 – 1990 – 2010 … Kinderzimmer – Was noch wartet“, „Göbekli Tepe um 8000 v. Chr. – Uruk um 2700 v. Chr. – Tyros und Jerusalem …“. Das ist die Mittelpunktzeile mit anderem Trennzeichen.
  - Simulierte Handarbeit (Rang 57): Bleistiftstriche und vorgezeichnete Umrisse. Körnung oder Papiertextur gibt es nicht.
  - Nebenbei: Auf dem Telefon fehlt auf drei liegenden Büchern des Regalbilds der Titel, zwei Rücken sind ganz leer (`t-index-karte.png`). Der gezeichnete Stapel trägt dort keine Information mehr.
- **Stärke:** mittel bis stark. Die Datenspuren sind echt und kein Kitsch: Rückenbreite aus der Seitenzahl, Höhe aus der Bindung, Farbe aus der Verlagsfamilie, Ordnung nach Erstveröffentlichung. Erfunden ist das Beiwerk darum herum.
- **Herkunft:** synthese.md, Bibliothek 1 (Bleistiftstrich, Lesebändchen, Geisterreihe, „Kinderzimmer, Dortmund bis 2014“, Insel-Bücherei, Schuber, Karteikarte A6 quer), recherche-design.md Daten 4 (Zettelkasten).
- **Alternative:**
  - Das Regal behalten und das Beiwerk streichen. Lieblingsbücher, abgebrochene und wiedergelesene Bücher stehen als Satz auf der Karte, das Regal selbst bleibt Daten. Buchstützen und Schilder ersetzt die Jahreszahl unter dem Brett.
  - Wartende Bücher als Liste in der Textschrift, etwa als aufklappbarer Satz mit allen Titeln, ohne nachgezeichnete Linien.
  - Eigene Werke ohne erfundene Muster und ohne Schuber. Solange es keine Umschläge gibt, stehen sie als Text im Werkverzeichnis. Gibt es später ein Umschlagfoto, kommt es dorthin.
  - Karteikarte als schlichte weiße Tafel mit 1 px Graphitlinie, ohne Signatur und ohne Kartonton. „schließen“ statt „zurücklegen“. Oder ganz ohne Kasten: Die Angaben erscheinen in der Zeile unter dem Regal, wie heute schon im Zeitband (`.bandzeile`).
  - Am stärksten wäre ein echtes Artefakt: ein Foto von Dominiks Nachttisch, eine gescannte Karteikarte oder Manuskriptseite (B9).
  - Koordinaten nur auf der Tafel neben dem Globus, die Luftlinie streichen.

### B8. Unterstreichung als Zierde (Rang 53)

- **Befund:** gefunden.
- **Wo:** `stil.css` Zeile 55–60 enthält das „feine“ Rezept aus der Liste wörtlich: `text-decoration-thickness: 1px; text-underline-offset: .2em; text-decoration-color: color-mix(in srgb, currentColor 40%, transparent)`. Es gilt für Links und für jeden Knopf `.wort`. Unterstrichene Elemente im ersten Bildschirm: Startseite 20, Ursprung 13, Satoshi 11, Länder 75 (das ganze Register). Auch die Navigation ist unterstrichen. Fotos: `d-index-schirm.png`, `d-laender-schirm.png`.
- **Stärke:** mittel bis stark. Ein Teil davon ist Bedienung und braucht ein Zeichen.
- **Alternative:**
  - Echte Links im Fließtext und die E-Mail-Adresse mit der Unterstreichung im Werkszustand des Browsers, ohne Dicke, Abstand und Farbmischung. Diese Geste wählt ein Modell kaum (Chimero).
  - Navigation ohne Strich. Ihre Stellung im Briefkopf macht sie erkennbar, die jetzige Seite steht schwarz.
  - Länderregister ohne Strich, mit Strich bei Hover und Fokus. Ein Antippen dreht den Globus wie bisher.
  - Die wenigen Steuerwörter des Globus („früher“, „später“, die Kartenwahl) behalten den Strich.

### B9. Gezeichnet statt fotografiert (Rang 7)

- **Befund:** gefunden.
- **Wo:** Die Startseite hat kein Bild, das Regalbild ist aus CSS gebaut (`index.html` `.regalbild`). Im ganzen Testsystem steht ein Foto, auf der Vita (`bilder/dominik-jaekel-boot.jpg`), ohne Nennung des Fotografen. `bilder/dominik-jaekel.jpg` liegt ungenutzt. Fotos: `d-index-ganz.png`, `d-vita-ganz.png`.
- **Stärke:** mittel. Für unveröffentlichte Romane gibt es keine Umschläge, das erklärt einen Teil. Globus und Zeitband sind zu Recht Code-Zeichnung, dort tragen Daten die Geometrie.
- **Alternative:** zwei bis vier echte Bilder mit durchgehender Bildsprache, klein, gern schwarzweiß. Der Nachttisch-Stapel fotografiert statt gezeichnet, eine Manuskriptseite von Satoshi, ein Notizbuch aus Kaohsiung, das Bootsfoto. Den Fotografen oder die Fotografin im Kolophon nennen (§ 13 UrhG).

### B10. Grautöne, Schriftgrade und Abweichungen zwischen den Seiten (Rang 29, 30, 50, dazu Rang 11)

- **Befund:** gefunden.
- **Wo:**
  - Sieben Textfarben (Tabelle in Abschnitt 3), dazu für Linien und Flächen #C9C8C3, #B9B5AC, #D2CEC5, #D8D4CB und #E9E6E0. `index.html` setzt neun weitere feste Werte ohne Token (#55575C, #6E7075, #97958F, #AFADA7, #BDBBB5, #D3D1CB, #E4E1D9, #F3F1EB, #F8F4EC), `bibliothek.html` sieben (#2A2B2E, #55575C, #8C8E92, #8E9094, #A2A4A7, #A6A8AB, #EAE7DF).
  - Drei Töne unter 4,5 : 1: #7C7E83, #96989C und #A2A4A7. Betroffen sind die Nebenorte und ihre Koordinaten in der Vita bei 13,5 px, die Striche der Stationenzeile, das inaktive „früher“ und die Titel der wartenden Bücher.
  - Zwölf Schriftgrade auf der Startseite. Erster Satz und Jahreszahl der Tafel unterscheiden sich um einen halben Pixel (30,9 und 30,4 px). Auf der Vita elf Grade, davon fünf zwischen 13 und 16,6 px.
  - Drift: Derselbe eigene Rücken ist auf der Startseite #F8F4EC und in der Bibliothek #F6F2EA. `.kolophon` steht zweimal (Startseite, Ursprung), `.nochmal` dreimal mit verschiedenen Abständen. Jede Seite hat einen eigenen `<style>`-Block, der der Startseite hat rund 140 Zeilen.
- **Fotos:** `d-vita-schirm.png`, `d-index-ganz.png`.
- **Stärke:** mittel. Für Leser zeigt sich das als viele leise Stufen ohne klare Ordnung.
- **Alternative:**
  - Farben: Grund #FFFFFF oder #FFFEFC, Text #1D1E21, ein Grau #6B6D72 nur für Zustände, eine Linienfarbe. #0A0B0D und #1D1E21 zusammenlegen. Alle Werte als Token in `stil.css`, keine festen Werte in den Seiten.
  - Drei Schriftgrade: 19 px für Text, 15,4 px (0,8125 em) für Legenden, Fuß und Tafeldaten, 28,5 px (1,5 em) für Seitentitel und den ersten Satz. Die Zwischenstufen 0,9375 em, 1,0625 em, 1,125 em, 1,15 em und 1,25 em entfallen. Die Rückenschrift im Regal bleibt, sie ergibt sich aus der Messung der Rücken.
  - Alle Seiten vor der Abgabe nebeneinander prüfen.

### B11. Bewegung beim Scrollen und unter der Maus (Rang 56, 39, 6)

- **Befund:** teilweise. Das meiste ist an Inhalt gebunden. Mit dem Einstieg hat die Seite fünf Arten Bewegung: Einstieg, Chronik, Kopplung an das Scrollen, Hover-Lift und Schuber.
- **Wo:**
  - Kopplung an das Scrollen: Satoshi führt den Globus beim Lesen von Szene zu Szene (`satoshi.html` Zeile 702, `F.leselinie`). Ursprung klappt die Trilogie beim Scrollen auf (`ursprung.html` Zeile 654). Die Zeitleiste der Bibliothek haftet oben und folgt dem Lesen (`bibliothek.html` Zeile 865). Auf dem Telefon schiebt das senkrechte Scrollen das Zeitband seitlich (`index.html` Zeile 1402, `F.fortschritt`), auf Satoshi, Länder und Ursprung haftet ein Globusband oben (`t-satoshi-band.png`).
  - Hover-Lift: Rücken heben sich um 6 px (`bibliothek.html` Zeile 51, `index.html` Zeile 73), liegende Bücher rücken 6 bis 7 px zur Seite. Der Schuber gleitet in 0,8 s auf.
  - Einblenden: In der Ebene Ursprung der Startseite erscheinen die Bände mit 1,6 s Überblendung (`index.html` Zeile 50, Foto `d-index-ursprung.png`). Sonst blendet beim Scrollen nichts ein.
- **Stärke:** schwach bis mittel. Die Szenenführung auf Satoshi bildet Inhalt ab und entführt den Scroll nicht, die Liste nennt so etwas vertretbar. Das seitliche Mitschieben des Zeitbands ist eine milde Form von Scroll-Jacking. Der Hover-Lift ist das Tailwind-Muster `hover:-translate-y-1`. Die Liste merkt dazu an, dass man ein Buch nach vorn aus dem Regal zieht.
- **Alternative:**
  - Das Mitschieben des Zeitbands streichen, der Leser wischt selbst.
  - Hover und Fokus ohne Bewegung: Der Rücken bekommt eine Graphitkante, Titel und Autor stehen in der Zeile unter dem Brett.
  - Schuber streichen (B7). Die Bände der Trilogie auf der Startseite sofort zeigen.
  - Szenenführung auf Satoshi und Ursprung behalten, die Wahl per Klick bleibt wie jetzt.
- **Gut gelöst:** `prefers-reduced-motion` ist überall berücksichtigt, die Chronik hält an, wenn der Globus aus dem Bild ist, das Pendeln des Kerns ist abgeschaltet (`seite.js` Zeile 211). Die Kurven haben kein Überschwingen.

### B12. Leere Seiten (Abschnitt 3 der Liste, dazu Rang 33 und 59)

- **Befund:** gefunden.
- **Wo:** Erzählungen („Noch steht hier keine.“), Untertext („Noch steht hier kein Eintrag.“) und die Leseseite ohne Text. Alle stehen in der Navigation. Foto: `d-erzaehlungen-schirm.png`.
- **Stärke:** mittel. Eine leere, höflich beschriftete Seite verstärkt den Eindruck einer Vorlage, die auf Inhalt wartet. Abschnitt 3 der Liste verlangt, dass dort, wo etwas fehlt, Substanz hinkommt und kein Ornament.
- **Alternative:** Erzählungen und Untertext aus der Navigation nehmen, bis der erste Text da ist. Im Werkverzeichnis der Startseite bleiben sie als Zeile ohne Link. Die Adressen funktionieren weiter. Kurzgeschichten und Essays folgen laut Dominik später, dann kommen die Seiten zurück.

### B13. Hängende Randmarken (Rang 55)

- **Befund:** teilweise.
- **Wo:** Jahreszahlen hängen links im Rand bei den Szenen von Satoshi (`.szene .jahr`, `satoshi.html` Zeile 35), bei den Kapiteltagen (`.protokoll .jahr`) und in den Stationen der Vita (`.daten .jahr`). Die Jahreszahl der Tafel hängt in den Steg. Die römischen Bandziffern hängen in Siena vor den Titeln (`ursprung.html` Zeile 52). Fotos: `d-satoshi-schirm.png`, `d-ursprung-schirm.png`.
- **Stärke:** schwach. Stationen, Kapiteltage und Szenen sind echte Chronologien, dort ist der hängende Jahrgang Registerkonvention. Als Abschnittskopf wirkt nur die Bandziffer.
- **Alternative:** die Chronologien so lassen. Die Bandziffer in die Titelzeile holen, in Graphit: „Band I. Kreise ohne Wiederkehr“.

### B14. Quelltext und Einbindung (Rang 48, 67, 66, 68)

- **Befund:** Rang 48 und 67 gefunden, Rang 66 teilweise, Rang 68 nicht.
- **Wo:**
  - Google Fonts per `<link>` im Kopf aller elf Seiten, d3 und topojson-client von jsDelivr auf vier Seiten. Die Datenschutzerklärung muss beides erklären.
  - Erzählende Kommentare in ganzen Sätzen in `stil.css`, in allen `<style>`-Blöcken, in `seite.js` und `kern.js`. Auch ausgelieferte HTML-Kommentare erzählen, etwa „Der erste Satz der Vita als Einstieg, in drei Gliedern; das Skript gleich darunter setzt ihn und spielt ihn einmal ab“ (`index.html`, drei Kommentare, `satoshi.html` zwei, `laender.html` einer). Wer den Quelltext öffnet, erkennt die Herkunft in Sekunden.
  - Textauswahl und Bildlaufleiste im Werkszustand, kein `::selection`. Der Fokusring ist gestaltet (`:focus-visible`).
  - Keine Spuren von Generatoren in den Seiten. README und `werkzeuge/` werden laut README nicht ausgeliefert. Die Testseite liegt auf claude.ai und sagt das in der Datenschutzerklärung, das ist nötig und vorübergehend.
- **Stärke:** für Leser unsichtbar, für Quelltextleser und rechtlich deutlich (LG München I, Az. 3 O 17493/20).
- **Alternative:** Vollkorn als WOFF2 selbst hosten (SIL Open Font License, im Kolophon genannt), d3 lokal. `werkzeuge/artefakt.py` entfernt beim Veröffentlichen die Kommentare aus CSS, HTML und JS, die kommentierten Quellen bleiben im Repository. `::selection` passend zum Farbsystem setzen oder den Werkszustand bewusst auf allen Seiten lassen.

### B15. Englische Titel und Namensformen (Rang 46)

- **Befund:** teilweise. Der deutsche Satz ist sonst sorgfältig.
- **Wo:** 39 Bücher deutschsprachiger Autoren stehen mit englischem Titel, weil Goodreads die gelesene Ausgabe so führt, etwa Remarque „All Quiet on the Western Front“, Lenz „The German Lesson“, Mann „The Magic Mountain“, Kafka „The Trial“. Viele davon hat Dominik wohl wirklich auf Englisch gelesen. Ein Widerspruch ist sicher: Preußler „The Little Ghost“ beim Thienemann Verlag. Auf dem Nachttisch der Startseite stehen die Namen englisch („Dostoevsky“, „Aristotle“), in der Leseliste deutsch („Dostojewski“). Fotos: `d-index-karte-eigen.png`, `d-bibliothek-karte.png`.
- **Gut gelöst:** „…“, Halbgeviertstrich mit Leerzeichen, Koordinaten als 52° 31′ N, 13° 24′ O, schmale Leerzeichen bei Tausendern, „v. Chr.“ zusammengehalten, Silbentrennung mit `lang="de"`, Mediävalziffern.
- **Alternative:** Dominik geht die 39 Titel durch. Wo er deutsch gelesen hat, steht der deutsche Titel. Namen einheitlich in deutscher Form (Dostojewski, Aristoteles), auch bei englischer Ausgabe. Preußler sofort berichtigen.

### B16. Der Globus (Rang 27, dazu Rang 14)

- **Befund:** vorhanden, bewusst eingesetzt und gelungen.
- **Wo:** Startseite, Satoshi, Ursprung und Länder. `globus/kern.js`, eigene orthografische Projektion mit d3, Küsten und Grenzen nach Natural Earth. Fotos: `d-index-schirm.png`, `d-satoshi-schirm.png`, `d-index-reisen.png`.
- **Stärke:** schwach. Die Liste verlangt für ein Prunkstück eine Aufgabe, die nur dieser Inhalt stellt, eigenen Bau, echte Projektion, echte Daten, Bedienung über Text, keine Dauerrotation, keinen Glanz und kein Leuchten. Das alles erfüllt der Globus. Er ist kein Fertigbaustein wie Magic UI Globe, das Pendeln ist abgeschaltet, Wörter im Text steuern ihn, Tastatur und reduzierte Bewegung sind berücksichtigt, und der Hinweis „Strg halten und scrollen“ erscheint nur für die unsichtbare Geste.
- **Restrisiko:** Vier von elf Seiten haben dieselbe Silhouette, links Text, rechts der angeschnittene Globus in Fensterhöhe (`--globus` rechnet mit `100svh`). Im Silhouettentest könnten diese vier Seiten wie eine Vorlage wirken. Einen zentrierten Hero-Baukasten (Rang 14) gibt es nicht.
- **Alternative:** behalten. Auf Satoshi und Ursprung kann er kleiner und ohne Anschnitt als Abbildung im Text stehen, dann gehört das große Bild der Startseite. Ortsnamen aufrecht (B2), Wege ohne Siena (B4).

### B17. Dominiks eigene Texte (Rang 16, 17, 34, 36, 37, 62)

- **Befund:** Einige Muster der Liste stehen in Texten, die Dominik geschrieben hat. Sie bleiben unverändert, die Vorschläge legt er selbst fest.
- **Herkunft:** Klappentext, Figuren, der Absatz zum Bau, der Anfang der Satoshi-Seite und die Bandtexte von Ursprung kommen wörtlich aus den Exposés. Die Vita ist Dominiks Fassung (Commit e65dc13). Den Absatz über Deutschland hat er im Feedback geliefert (Commit 1a9b18e). Auch „Eckdaten“, „Die Figuren“ und „Gebaut wie ein Protokoll“ sind seine Wörter aus dem Exposé.
- **Zur Einordnung:** Dominiks Exposé setzt selbst Versalüberschriften und Mittelpunkte („364 Normseiten · Manuskript liegt vollständig vor“). In einem Exposé für Verlage ist das üblich. Die Merkmale der Liste sind keine Fehler. Auf einer Website zählt ihre Häufung.
- **Wo und was:**
  - „Ihr Verfasser hat nie existiert. Verschwinden musste er trotzdem.“ ist ein Stakkato-Schluss (Rang 34), „Davon erzählt dieser Roman.“ ein Schlusssatz über den Text selbst. Im Klappentext ist beides Gattungskonvention.
  - „zwischen zwei Männern, zwei Kontinenten und zwei Leben“ (Rang 16). Eine echte Dreiheit, die Figur ist so gebaut. Bleibt.
  - Gedankenstriche (Rang 36): Satoshi hat 22 Halbgeviertstriche, fast alle in Dominiks Texten aus Exposé und Feedback. In deutschen Klappentexten ist das üblich.
  - „Alle suchen einen Mann. Dabei war Satoshi Nakamoto eben nie eine Person.“ (Rang 17), aus dem Exposé mit Dominiks Zusatz „eben“.
  - „die emotionale Grammatik für einen Zustand“ (Rang 37), „Stabilitätskultur“ und „institutionentreuesten Gesellschaft“ (Rang 62), aus Dominiks Feedback.
  - Herkunft offen: „Nicht ein einzelner Skandal, sondern der flächendeckende Vertrauensentzug – gegenüber Institutionen, Währungen, Verträgen, Nachrichten.“ (Rang 17 und 62). Der Satz steht in keinem Exposé, er kam mit Commit 39af266 in die Daten. Hat Claude ihn geschrieben, sollte er neu gefasst werden, etwa „Das Vertrauen in Institutionen, Währungen, Verträge und Nachrichten schwindet überall zugleich.“
  - Abweichung vom Exposé: Der Abschnitt „Wie er gemacht ist“ nennt Borges, Hernan Diaz und Labatut. Dominiks Exposé nennt unter „Vergleichstitel“ Benjamin Quaderers *Für immer die Alpen*, Hernan Diaz’ *Treue* und Raphaela Edelbauers *Die Inkommensurablen*. Vorschlag: Dominiks Abschnitt übernehmen.
- **Gliederung der Satoshi-Seite:** Das Exposé gliedert in „Eckdaten“, „Warum dieser Roman – und warum jetzt“, „Vergleichstitel“, „Der Autor“, „Ausführliche Inhaltsangabe“ und „Die Figuren“. „Gebaut wie ein Protokoll“ ist dort der Anfang eines Absatzes, auf der Website wurde daraus eine Überschrift. Vorschlag: Klappentext, Eckdaten, Die Figuren, Warum dieser Roman, Vergleichstitel, aufrecht gesetzt (B1). Die Szenenliste braucht keine Überschrift oder nur „Inhalt“.
- **Stärke:** gering, weil man diese Texte als Klappentext liest. Ein aufmerksamer Leser kann die Kadenz trotzdem als KI-Ton hören. Dominik entscheidet.

---

## 6. Was bleiben soll

- **Erste und zweite Welle fehlen.** Keine Pillen, Karten, Pfeile, Monospace-Schrift, Inter oder Geist, kein Lila, keine Emoji, Icons, Kennzahl-Kacheln, kein Glas, Neon, Ticker, keine Verlaufskugeln und Statuspunkte (Rang 4, 5, 12, 13, 15, 18, 19, 20, 22, 38, 40, 41, 47, 54, 63, 64, 65). Keine Mittelpunkte, keine dekorativen Nummern, keine Zeitungs-Haarlinien (Rang 23, 51).
- **Der Globus** (B16). Eigene Projektion, echte Orte, Bedienung über Wörter, kein Dauerdrehen.
- **Das Zeitband.** Alle Bücher als Striche nach dem Jahr der Erstausgabe, jeder so breit wie sein Rücken, Lieblingsbücher dunkel, eigene Werke am Ende. Diese Form kennt kein Katalog, und kein Generator baut sie von selbst (`d-index-ganz.png`, `d-index-zeitband.png`).
- **Das Regal als Datenzeichnung.** Rückenbreite aus der Seitenzahl, Höhe aus der Bindung, Farbe aus der Verlagsfamilie (`bibliothek.html` Zeile 227–239), Ordnung nach Erstveröffentlichung. Ohne das Beiwerk aus B7 ist es das eigenständigste Element nach dem Globus.
- **Links nennen ihr Ziel.** Keine Pfeile, keine Floskeln, Knöpfe sind Wörter mit konkretem Inhalt.
- **Zahlen im Satz und ausgeschrieben,** etwa „Fünfundsechzig Länder und Gebiete“ und „vierzig Kapitel“. Kein Hochzählen.
- **Römische Bandziffern** für eine echte Reihe von drei Bänden.
- **Deutscher Satz** (B15): Anführungszeichen, Halbgeviertstrich, Grad und Minuten, schmale Leerzeichen, Mediävalziffern, Silbentrennung.
- **Zustände** (Rang 43 trifft nicht zu): sichtbarer Fokus, Sprungmarke, `aria-live` auf der Tafel, reduzierte Bewegung, ein Ersatzsatz ohne Globus, `noscript`-Hinweise, Leerzustände.
- **Satzspiegel.** Eine Maßeinheit `--z` (eine Zeile), Abstände als Vielfache davon, eine Textspalte von rund 62 Zeichen, asymmetrischer linker Rand, alles links ausgerichtet, Höhen aus dem Inhalt.
- **Eine Textschrift** mit echten Kapitälchen aus der SC-Familie. Vollkorn steht auf keiner der geprüften Listen und hat mit Robin Sloans Fiktion ein benennbares Vorbild.
- **Das Kolophon** mit Schrift, Gestalter und Kartendaten. Es ist eine Quellenangabe. Nur die graue Farbe sollte Textfarbe werden.
- **Eine Farbe mit genau einer Bedeutung.** Das Prinzip bleibt, der Farbton wechselt (B4).
- **Dominiks Texte stehen wörtlich auf der Seite.**

---

## 7. Alle 68 Merkmale

Befund: **ja** = eindeutig vorhanden, **teilweise** = an einzelnen Stellen oder in abgewandelter Form, **nein** = nicht gefunden. Stärke: wie deutlich das Merkmal auf dieser Website nach KI aussieht.

| Rang | Merkmal | Befund | Wo | Stärke | Alternative |
|---:|---|---|---|---|---|
| 1 | Kapitälchen-Labels über Abschnitten | ja | `.titel` auf allen Seiten, `.tafel-unter`, `.schild` | stark | aufrechte Überschriften oder keine (B1) |
| 2 | Creme- oder Papiergrund | teilweise | Grund #FFFEFC fast weiß, Karteikarte, eigene Rücken, Brett, Beige der bereisten Länder | mittel | Flächen weiß, Länder kühlgrau (B4) |
| 3 | Mittelpunkt-Metazeilen | teilweise | keine Mittelpunkte, aber Strich-Ketten in Stationenzeile, Zeitleiste, Orten der Trilogie | mittel | Ketten streichen, ganze Sätze (B2, B7) |
| 4 | Pillenknöpfe | nein | kein Radius außer am Globusrand | – | beibehalten |
| 5 | Karten für alles | teilweise | nur die Karteikarte, eine Ebene, als Gegenstand | schwach | schlichte Tafel oder Zeile (B7) |
| 6 | Einblenden beim Scrollen | teilweise | nur die Bände der Trilogie auf der Startseite, 1,6 s | schwach | sofort zeigen (B11) |
| 7 | Gezeichnet statt fotografiert | ja | Startseite ohne Bild, Regalbild aus CSS, ein Foto ohne Fotografen | mittel | echte Fotos, Fotograf im Kolophon (B9) |
| 8 | Kursive Akzente und Überschriften | ja | kein Akzentwort, aber kursive Ortsnamen in Tafelkopf, Szenen, Vita und Globus | mittel | Orte aufrecht, Kursiv nur für Werktitel (B2) |
| 9 | Serife als Abkürzung zu „literarisch“ | ja | Vollkorn für alles, IM Fell als Display für eine Zeile | mittel | IM Fell streichen (B3) |
| 10 | Terrakotta, Rost, Siena | ja | `--siena: #9B5230` für eigene Werke | stark | kein Akzent oder Tintenblau mit Herkunft (B4) |
| 11 | Grauer Nebentext | ja | 22 bis 27 % der Zeichen grau, drei Töne unter 4,5 : 1 | stark | Lesetext in Graphit, Grau nur für Zustände (B2, B10) |
| 12 | Pfeil, generische Handlungsaufforderung | nein | 0 Pfeile, Links nennen ihr Ziel | – | beibehalten |
| 13 | Monospace für Labels und Daten | nein | keine Monospace-Schrift | – | beibehalten |
| 14 | Zentrierter Hero-Baukasten | nein | links ausgerichtet, ohne Badge und Knöpfe; nur der Globus richtet sich nach der Fensterhöhe | – | siehe B16 |
| 15 | shadcn und Tailwind im Werkszustand | nein | eigenes CSS mit eigenen Tokens | – | beibehalten |
| 16 | Dreierreihen | teilweise | „Drei Romane über drei Geburten: …“ (Claude, echte Dreiheit), „zwei Männern, zwei Kontinenten und zwei Leben“ (Dominik) | schwach | Satz ohne Doppelpunkt (B6, B17) |
| 17 | „Nicht X, sondern Y“ | teilweise | „Nicht ein einzelner Skandal, sondern …“ (Herkunft offen), sonst Dominiks Texte | schwach | positive Aussage (B17) |
| 18 | Inter oder Geist | nein | – | – | beibehalten |
| 19 | Lila- oder Indigo-Verlauf | nein | – | – | beibehalten |
| 20 | Emoji als Icons | nein | – | – | beibehalten |
| 21 | Taglines, Werbewörter | ja | „Schriftsteller und Reisender“ auf allen Seiten | mittel bis stark | streichen (B5) |
| 22 | Icon im gerundeten Quadrat | nein | keine Icons | – | beibehalten |
| 23 | Dekorative Nummern 01/02/03 | nein | Bandziffern I bis III sind eine echte Reihe | – | beibehalten |
| 24 | Graue Kursive als zweite Stimme | ja | 15 % der Zeichen im ersten Bildschirm von Startseite und Vita | stark | ein Mittel pro Ebene (B2) |
| 25 | Inszenierter Ladeauftritt | ja | einfliegender erster Satz mit Staffel und Unschärfe | stark | Satz steht beim Laden (B3) |
| 26 | Mikro-Metadaten als Schmuck | ja | Koordinaten in der Vita ohne Karte, Luftlinie, Signaturen | mittel | Koordinaten nur auf der Tafel (B2, B7) |
| 27 | Prunkstück-Widget | teilweise | Globus, eigen gebaut, mit Daten und Aufgabe | schwach | behalten (B16) |
| 28 | Effekt-Überschriften, inszenierte Rubriken | ja | „Der Roman der Reihe nach“, „Die Frage hinter dem Roman“, „Wie er gemacht ist“, „Kinderzimmer“, „Nachttisch“, „zurücklegen“ | mittel | Dominiks Wörter, Substantive (B1, B6, B17) |
| 29 | Viele gleichrangige Grautöne | ja | sieben Textfarben, 16 feste Werte ohne Token | mittel | Graphit plus ein Grau (B10) |
| 30 | Zu viele Schriftgrößen | ja | Startseite 12, Vita 11 | mittel | drei Grade (B10) |
| 31 | Schriften aus dem Gratisvorrat | ja | IM Fell French Canon, in Hallmarks „Almanac“; Vollkorn steht auf keiner Liste | mittel | IM Fell streichen (B3) |
| 32 | Doppelpunkt-Pointe, „Name: Erklärung“ | ja | „Auf dem Globus:“, „Drei Romane über drei Geburten:“, fünf Meta-Beschreibungen | mittel | Aussagesätze (B6) |
| 33 | Sätze über die Seite, doppelte Information | ja | Vorspann der Bibliothek, Legende des Zeitbands, Bildlegende, Tafelsätze | stark | jede Information einmal, Legende gezeichnet (B6) |
| 34 | Gleich gebaute Sätze, Pointe am Schluss | ja | „Die meisten …, viele …, einige …, wenige …“, „Dieser Roman erzählt die Geschichte.“ | mittel | mit Zahlen oder streichen (B6, B17) |
| 35 | Wiederholte Formeln | ja | „Auf dem Globus“ ab 5×, „in Arbeit“ ab 7×, „… von … an“ 3×, „Von … bis …“ 5×, w-Etiketten | stark | jede Formel einmal (B6) |
| 36 | Gedankenstrich als Allzweckverbinder | teilweise | fast nur in Dominiks Texten, dazu Strich-Ketten als Trenner | schwach | Dominiks Entscheidung (B17) |
| 37 | Tiefsinnsformeln | ja | „Literatur in den Leerstellen des Verbürgten“, „Die Fiktion wohnt in den Leerstellen der Akten“ | mittel | Vergleichstitel aus dem Exposé (B6, B17) |
| 38 | Kennzahl-Kacheln, Hochzähler | nein | Zahlen im Satz | – | beibehalten |
| 39 | Hover-Lift | ja | Rücken heben sich um 6 px | schwach bis mittel | Zustand ohne Bewegung (B11) |
| 40 | Fast-Schwarz mit Neon | nein | – | – | beibehalten |
| 41 | Farbiger Seitenstreifen | nein | – | – | beibehalten |
| 42 | Schablonenfolge der Abschnitte | teilweise | Startseite: Vita, Werke, Bücher, Kontakt; Globus und Zeitband brechen die Folge | schwach | Silhouettentest vor der Abgabe |
| 43 | Fehlende Zustände | nein | Fokus, reduzierte Bewegung, Ersatz, Leerzustände gestaltet | – | beibehalten |
| 44 | Platzhalter, Stockfotos, erfundene Stimmen | nein | – | – | beibehalten |
| 45 | Federnde Easings | nein | Kurven ohne Überschwingen | – | beibehalten |
| 46 | Deutsche Sonderfälle | teilweise | englische Titel und Namensformen aus Goodreads | schwach bis mittel | Titel prüfen, deutsche Namensform (B15) |
| 47 | Glas und backdrop-blur | nein | – | – | beibehalten |
| 48 | Google Fonts per Link | ja | alle Seiten | für Leser unsichtbar | selbst hosten (B14) |
| 49 | Gleichförmige Abstände | teilweise | Abschnitte überall 4 Zeilen Abstand, sonst Vielfache von `--z` | schwach | Abstände nach Gewicht |
| 50 | Design-Drift zwischen Unterseiten | ja | eigener Rücken in zwei Farbtönen, doppelte Klassen | schwach bis mittel | Token, Seiten nebeneinander prüfen (B10) |
| 51 | Haarlinien als Zeitungskostüm | nein | wenige Linien, alle trennen etwas | – | beibehalten |
| 52 | Nachgebaute Papiergegenstände | ja | Karteikarte, Bleistift, Lesezeichen, Schuber, Muster | mittel bis stark | Beiwerk streichen, echte Artefakte (B7) |
| 53 | Unterstreichung als Zierde | ja | feines Rezept, 75 Striche im ersten Bildschirm der Länder | mittel bis stark | nur echte Links, Werkszustand (B8) |
| 54 | Laufband oder Ticker | nein | – | – | beibehalten |
| 55 | Hängendes Randlabel | teilweise | Jahre in Chronologien, Bandziffern in Siena | schwach | Bandziffer in die Titelzeile (B13) |
| 56 | An das Scrollen gekoppelte Effekte | teilweise | Satoshi, Ursprung, Bibliothek, Zeitband auf dem Telefon | schwach bis mittel | Mitschieben streichen (B11) |
| 57 | Körnung und Papiertextur | teilweise | keine Körnung, aber nachgezeichnete Bleistiftstriche | schwach | streichen (B7) |
| 58 | Semikolon als Ersatzverbinder | ja | Startseite 8 auf 386 Wörter | mittel | zwei Sätze (B6) |
| 59 | Absicherung ohne Information | ja | „Eine Auswahl, längst nicht alles.“, „… wird nie vollständig sein.“ | mittel | Satz mit Inhalt (B6) |
| 60 | Buchkonventionen als Kulisse | ja | Joyce-Zeile, Kolumnentitel, Buchklappe, graues Kolophon | mittel | Kolophon als Quelle in Textfarbe (B2, B7) |
| 61 | Wechsel der Erzählperson | ja | Startseite: „Er wurde …“, „wo ich gelebt habe“, „Hier lebt er heute.“ | schwach bis mittel | Kurzvita dritte Person, sonst ohne Person (B6) |
| 62 | Nominalstil | teilweise | „der flächendeckende Vertrauensentzug“ (Herkunft offen) | schwach | Verben (B17) |
| 63 | Smaragd- oder Salbeigrün | nein | – | – | beibehalten |
| 64 | Verlaufskugeln, Blobs | nein | – | – | beibehalten |
| 65 | Blinkender Statuspunkt | nein | – | – | beibehalten |
| 66 | Browser-Oberflächen im Werkszustand | teilweise | kein `::selection`, Fokus gestaltet | schwach | festlegen oder bewusst lassen (B14) |
| 67 | Erzählende Kommentare im Quelltext | ja | alle Dateien, auch ausgelieferte HTML-Kommentare | für Quelltextleser stark | beim Veröffentlichen entfernen (B14) |
| 68 | Fingerabdrücke von Generatoren | nein | nur das Testhosting auf claude.ai | – | entfällt mit dem Umzug |

Summe: 29 ja, 16 teilweise, 23 nein.

---

## 8. Reihenfolge für den Feinschliff von Version A

| Schritt | Befund | Aufwand | Entscheidung |
|---:|---|---|---|
| 1 | Tagline streichen | klein | Dominik bestätigt |
| 2 | Kapitälchen-Labels durch aufrechte Überschriften ersetzen oder streichen | klein, eine Regel in `stil.css` und die Wörter | Satoshi-Gliederung mit Dominik |
| 3 | Grau und Kursiv trennen, Stationenzeile streichen, Koordinaten der Vita streichen, Ortsnamen aufrecht | mittel | – |
| 4 | Claudes Mikrotexte neu fassen (Kurzvita, Werkverzeichnis, Legenden, Bibliothek, Länder, Tafel, Beschreibungen) | mittel | Dominik gibt frei |
| 5 | Erster Satz ohne Flug und in der Vollkorn | klein | Dominik |
| 6 | Siena ersetzen oder streichen, Flächen weiß | klein bis mittel | Dominik wählt die Variante |
| 7 | Unterstreichung auf echte Links und Steuerwörter beschränken | klein | – |
| 8 | Beiwerk am Regal streichen, Karteikarte schlicht | mittel | – |
| 9 | Grautöne und Schriftgrade auf Token zurückführen, Drift beheben | mittel | – |
| 10 | Erzählungen und Untertext bis zum ersten Text aus der Navigation nehmen | klein | Dominik |
| 11 | Mitschieben des Zeitbands, Hover-Lift und Schuber streichen | klein | – |
| 12 | Echte Fotos einsetzen, Fotografen nennen | – | Dominik liefert |
| 13 | Schriften und d3 selbst hosten, Kommentare beim Veröffentlichen entfernen | mittel | – |
| 14 | Englische Titel prüfen, Namensformen vereinheitlichen | klein | Dominik |

Schritte 1 bis 7 ändern den Eindruck am stärksten und lassen Aufbau, Globus, Zeitband und Regal unberührt.

---

## 9. Was Dominik entscheiden sollte

1. Bleibt der einfliegende erste Satz (B3)?
2. Kein Akzent, oder ein Akzent aus welchem Gegenstand (B4)?
3. War „Schriftsteller und Reisender“ sein Wunsch (B5)?
4. Übernimmt die Satoshi-Seite die Gliederung und die Vergleichstitel aus seinem Exposé (B17)?
5. Stammt der Satz „Nicht ein einzelner Skandal, sondern …“ von ihm (B17)?
6. Benutzt er die Wörter „Nachttisch“ und „Kinderzimmer“ selbst (B6)?
7. Welche Bücher hat er auf Deutsch gelesen (B15)?
8. Welche Fotos gibt es, und wer hat das Bootsfoto gemacht (B9)?
9. Sollen Erzählungen und Untertext bis zum ersten Text unsichtbar bleiben (B12)?

---

## Anhang: Dateien

### Messung und Skripte

- Messwerte aller Seiten und Geräte: `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/messung.json`
- Bildschirmfotos und Messung: `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/messen.cjs`
- Zustände: `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/zustaende.cjs`
- Leerräume auf Satoshi und der Startseite: `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/luecke.cjs`
- Herkunft der Texte: `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-text/herkunft.txt`

### Bildschirmfotos

Erste Bildschirme und ganze Seiten liegen für alle elf Seiten vor, als `d-<seite>-schirm.png`, `d-<seite>-ganz.png` (Desktop) und `t-<seite>-schirm.png`, `t-<seite>-ganz.png` (Telefon), mit `<seite>` = index, satoshi, ursprung, erzaehlungen, untertext, laender, bibliothek, vita, lesen, impressum, datenschutz. Die im Text genannten:

- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-index-schirm.png`
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-index-ganz.png`
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/t-index-schirm.png`
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-satoshi-schirm.png`
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-satoshi-ganz.png`
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-ursprung-schirm.png`
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-vita-schirm.png`
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-vita-ganz.png`
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-bibliothek-schirm.png`
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-laender-schirm.png`
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-erzaehlungen-schirm.png`

Zustände:

- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-index-einstieg-folge.png` (Einstieg nach 150, 450 und 900 ms)
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-index-karte-eigen.png` (Karteikarte eines eigenen Werks, Regalbild)
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-index-karte-buch.png` (Karteikarte eines Buchs vom Nachttisch)
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-index-zeitband.png` (Zeitband)
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-index-reisen.png` (Ebene Reisen)
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-index-ursprung.png` (Ebene Ursprung mit einblendenden Bänden)
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-bibliothek-karte.png` (Karteikarte in der Bibliothek)
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-bibliothek-eigen.png` (eigene Werke, Schuber)
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-satoshi-lesen.png` (Satoshi beim Lesen der Szenen)
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-satoshi-uebergang.png` und `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-satoshi-y1600.png` (Übergang von den Szenen zum Klappentext)
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/d-satoshi-figuren.png` (Figuren)
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/t-index-globus.png` (Telefon, Globus mit Tafel)
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/t-index-schreiben.png` und `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/t-index-karte.png` (Telefon, Regalbild und Karteikarte als Blatt)
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/t-satoshi-band.png` (Telefon, haftendes Globusband)
- `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-pruefung/shots/t-ursprung-kolumne.png` (Telefon, lebender Kolumnentitel)
