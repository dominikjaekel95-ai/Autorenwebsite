# Referenzen für Version C: wie gute Seiten mit den Mikrodetails umgehen

Stand: 21. Oktober 2026. Zweck: Grundlage für Version C. Hier steht, wie gut gemachte Verlags-, Magazin- und Autorenseiten mit Kursive, Nebentext, Randbemerkungen, Beschriftungen, Grautönen, Abständen, Verweisen, Fuß und Newsletter umgehen. Am Ende stehen Regeln für C, jede mit den Seiten, die sie stützen.

Rangfolge beim Bau bleibt: erst Dominiks Vorgaben (`dominik-vorgaben.md`), dann seine Texte, dann dieses Dokument, zuletzt die KI-Merkmale (`ki-merkmale.md`).

---

## 1. Kurz vorweg: was ging und was nicht

**Die Verlagsseiten waren nicht erreichbar.** Aus dieser Arbeitsumgebung lässt das Netz nur GitHub und wenige Dienste zu. Fitzcarraldo, Paris Review, NYRB, Granta, Suhrkamp, Hanser, Kein & Aber, Spector Books, LCB, DLA Marbach, Craig Mod, Robin Sloan, Teju Cole und Frank Chimero lehnte der Zugang ab, auch der Abruf über das Abrufwerkzeug scheiterte. Von diesen Seiten gibt es deshalb keine Bildschirmfotos und keine gemessenen Stile.

**Deshalb zwei Gruppen.**

- **Gemessen (G1 bis G6).** Sechs Seiten mit offenem Quelltext auf GitHub. Drei habe ich lokal ausgeliefert und im Browser gemessen (Tufte CSS, Resilient Web Design, brandur.org). Bei drei weiteren habe ich Stylesheet und Hausregeln gelesen, weil sie eine Datenbank oder einen eigenen Übersetzer brauchen (Standard Ebooks, Republik, gwern.net).
- **Beschrieben (B1 bis B9).** Verlage, Magazine und Autoren, belegt durch Suchindex, eigene Kolophone der Seiten und Gestaltungsberichte. Hier steht nur, was eine Quelle trägt: Aufbau, Wortlaut, Reihenfolge der Angaben, Schriften. Ob dort etwas kursiv, grau oder klein steht, ließ sich nicht prüfen.

**Ohne verwertbare Angaben** blieben Granta (nur ein Bericht über den Umbau 2015), Kein & Aber, Spector Books, DLA Marbach und Teju Cole. Sie haben kein Profil.

**Gegenprobe.** A und B habe ich mit demselben Messprogramm gemessen. So lassen sich die Zahlen direkt vergleichen (Abschnitt 4).

**Was das für die Regeln heißt.** Die Zahlen kommen aus G1 bis G6. Die Verlage stützen Regeln zu Aufbau und Wortlaut: wie ein Buch gelistet wird, wie eine Lesung angekündigt wird, wo der Newsletter steht. Wo die Seiten sich widersprechen, steht es dabei.

## 2. Wie gemessen wurde

- Playwright mit Chromium. Fenster 1440 × 900 und Telefon 390 × 844 (Telefonmodus, Touch, doppelte Pixeldichte). Die Lesetextbreite zusätzlich bei 1920 × 1080, 1280 × 800 und 360 × 740.
- Gezählt wird jedes sichtbare Zeichen der Seite, mit Navigation und Fuß. Für jedes Zeichen: Schriftgröße, Schriftlage (kursiv oder aufrecht), Versalien, Kapitälchen oder Sperrung, Farbe und Kontrast zum Grund.
- Lesetext: die Absätze mit mindestens drei Zeilen in der häufigsten Größe. Zeichen je Zeile ist der Median aus Zeichenzahl geteilt durch Zeilenzahl.
- Abstände: senkrechter Abstand zwischen aufeinander folgenden Blöcken im Hauptbereich.
- „Text unter 7 : 1“ heißt: Anteil der Zeichen mit weniger als 7 : 1 Kontrast. Das ist praktisch der graue Text.

Dateien:

- Messprogramm: `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/lauf3/referenzen/skripte/messen.cjs`, Kurzfassung `kurz.cjs`, Breiten `breiten.cjs`
- Messwerte: `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/lauf3/referenzen/messung/*.json`
- Bildschirmfotos: `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/lauf3/referenzen/bilder/*.jpg` (je Seite Desktop und Telefon, dazu Ausschnitte der Randnotizen bei Tufte und der Bildlegenden bei Resilient Web Design)

---

## 3. Die Seiten im Einzelnen

### Gemessen

#### G1. Tufte CSS

Stilvorlage nach den Büchern von Edward Tufte, von Dave Liepmann, heute ein Projekt von Tufte. Die bekannteste Vorlage für Randnotizen im Netz. URL: edwardtufte.github.io/tufte-css, Quelle github.com/edwardtufte/tufte-css.

- **Lesetext:** ET Book 21 px auf 30 px Zeile (1,43). 80 Zeichen je Zeile bei 1920, 74 bei 1440, 64 bei 1280, 35 bei 390, 32 bei 360.
- **Grade:** zehn insgesamt, vier davon mit mehr als 1 % der Zeichen. Im ersten Bildschirm drei. 81 % aller Zeichen stehen in der Lesegröße.
- **Kursiv (6 % der Zeichen):** Werktitel, Zitate und Motti, Betonung, der Name unter dem Titel und die Überschriften h2 und h3. Die kursiven Überschriften sind Tuftes Handschrift.
- **Randnotizen:** 16,5 px, also 0,79 der Lesegröße. Aufrecht, in derselben Tinte, rechts neben dem Text auf Höhe der Stelle, nummeriert. Randbemerkungen ohne Nummer sehen gleich aus. Auf dem Telefon sind sie eingeklappt und öffnen sich mit einem Zeichen im Text.
- **Grau:** keins. Eine Tinte (#111 auf #FFFFF8, 18,8 : 1) für alles.
- **Kapitälchen:** nur für die ersten Wörter eines neuen Gedankens („newthought“), unter 1 % der Zeichen. Keine Etiketten.
- **Verweise:** unterstrichen in der Textfarbe, Linie 1 px, 2 px unter der Grundlinie.
- **Abstände:** Absatz zu Absatz 21 px (0,7 Zeilen). Überschrift: 31,5 px davor, 21 px danach.
- **Bewegung:** keine einzige Überblendung im Stylesheet.

#### G2. Resilient Web Design (Jeremy Keith)

Die Website zum Buch eines Autors, ganz als Buch gesetzt. URL: resilientwebdesign.com, Quelle github.com/adactio/resilientwebdesign. Gemessen: Startseite und Kapitel 1.

- **Lesetext:** ET Book, wächst mit dem Fenster: 32/56 px bei 1920, 30/52,5 px bei 1440 (1,75), 16,9/25,3 px auf dem Telefon. Immer 61 Zeichen je Zeile am Desktop, 47 und 44 auf dem Telefon.
- **Grade:** im Kapitel sieben, nur zwei mit mehr als 1 %. Im ersten Bildschirm drei. 95 % der Zeichen in der Lesegröße.
- **Kursiv (2 % im Kapitel):** Werktitel und Betonung. Auf der Startseite stehen die Stimmen von Lesern als Zitate kursiv, deshalb dort 64 %.
- **Bildlegenden:** 16 px Groteske, aufrecht, schwarz. Am Desktop rechts neben dem Bild, oben bündig, auf dem Telefon unter dem Bild. Der Bildnachweis („Photograph by Paul Clark.“) steht in derselben Größe und Farbe als eigener Satz unter der Legende.
- **Grau:** keins. Schwarz auf Weiß, Verweise in einem Rot (5,9 : 1).
- **Etiketten:** genau eins, „Chapter 1“ in gesperrten Kapitälchen über dem Kapiteltitel. Abkürzungen in echten Kapitälchen. Überschriften sonst groß und schlicht.
- **Abstände:** zwei Werte. 60 px zwischen allen Blöcken (Absatz, Bild, Überschrift), 180 px vor jedem Abschnitt, also das Dreifache.
- **Fuß:** ein Satz in Lesegröße: geschrieben und hergestellt von Jeremy Keith, gesetzt aus der ET Book, Lizenz. Kein Newsletter.

#### G3. brandur.org (Brandur Leach)

Persönliche Seite eines Schreibenden und Fotografen: Essays, Fotoreihen von Reisen, zwei Newsletter. Oft für ihre Typografie gelobt. Quelle github.com/brandur/sorg, lokal gebaut. Gemessen: Startseite, ein Essay, Über, eine Ausgabe des Reise-Newsletters „Passages & Glass“.

- **Lesetext:** Serifenschrift 18 px auf 32 px Zeile (1,78), 74 Zeichen je Zeile am Desktop, 40 und 35 auf dem Telefon. Die Über-Seite läuft mit 93 Zeichen zu breit. Der Newsletter ist anders gesetzt: Helvetica 17/25,5 px, 65 Zeichen.
- **Grade:** im Essay fünf im ersten Bildschirm.
- **Kursiv (bis 7 %):** Bildlegenden, ein Hinweis zu Beginn, Betonung. Auf der Startseite stehen die Daten der Einträge klein, kursiv und grau.
- **Bildlegenden:** 14 px (0,78 der Lesegröße), kursiv, grau (#6B7280, 4,4 : 1), unter dem Bild. Klein, grau und kursiv zugleich: genau die Kombination, die A hat.
- **Randspalte:** links neben dem Essay eine Spalte mit „Article“, „Published Jul 20, 2018“ und „Location San Francisco“ in kleiner grauer Groteske. Rechts das Inhaltsverzeichnis.
- **Grau:** mehrere Töne. Der Lesetext selbst ist ein weiches Schiefergrau (9,4 : 1), Daten 4,4 : 1, ein Satz auf der Startseite nur 2,3 : 1. Das liegt unter jedem Mindestwert.
- **Etiketten:** die Navigation in gesperrten Versalien, 12 px. Sonst keine. Zwischenüberschriften 16 px halbfett, ohne Versalien.
- **Abstände:** Absatz 24 px (0,75 Zeilen). Überschrift 30 px davor, 4 px danach: Sie klebt an ihrem Text.
- **Newsletter:** ein Satz sagt, was es ist und wie oft es kommt: „a personal newsletter about exploration, ideas, and software written for friends and family. It's sent only a few times a year.“ Darunter Feld und Knopf „Subscribe to Passages“.

**Was G3 zeigt:** Auch eine gestaltete Seite setzt Legenden grau und kursiv und führt Ort und Datum in einer Randspalte. Sie tut es aber an genau zwei Stellen, immer gleich. A tut es an über zehn Stellen mit drei verschiedenen Grautönen.

#### G4. Standard Ebooks

Verlag für gemeinfreie Literatur, bekannt für sein Satzhandbuch. URL: standardebooks.org, Quellen github.com/standardebooks/web (Stylesheet) und github.com/standardebooks/manual (Handbuch). Nicht gerendert, Stylesheet und Vorlagen gelesen.

- **Lesetext:** Crimson Pro 22 px, Zeile 1,4, Silbentrennung an, Mediävalziffern im Hauptbereich.
- **Überschriften:** h2 in League Spartan, Versalien, 1 px gesperrt. Das ist das Markenzeichen der Seite und gilt überall gleich.
- **Bücherliste:** Umschlag, darunter Titel, darunter der Autor kursiv.
- **Nebentext:** ein Grau (#666 auf #E9E7E0, 4,6 : 1) für Datumsangaben und Randkästen, die Kästen zusätzlich kursiv und kleiner (0,9). Bildlegenden 0,6 rem kursiv auf dem Bild.
- **Handbuch zur Kursive:** Kursiv stehen Titel selbständiger Werke (Bücher, Zeitschriften, lange Gedichte, Filme, Gemälde) und Schiffsnamen. In Anführungszeichen stehen Teile eines Ganzen (Erzählungen, Gedichte, Kapitel, Aufsätze). Ortsnamen stehen weder kursiv noch in Anführungszeichen. Kursive und Anführungszeichen zugleich „is usually not necessary“.

**Was G4 zeigt:** Ein sorgfältiger Verlag setzt Nebensachen kursiv und Überschriften als gesperrte Versalien. Er tut es als ein festes System. Die Regeln für Titel und Ortsnamen sind streng und gut begründet.

#### G5. Republik

Deutschsprachiges Onlinemagazin aus Zürich, für Lesbarkeit und Typografie bekannt. Der Styleguide ist offen: github.com/republik/plattform, Paket `styleguide`. Gelesen, nicht gerendert.

- **Lesetext:** Rubis 19 px auf 30 px am Desktop, 17 auf 26 px auf dem Telefon. Vorspann 23/30 px.
- **Absätze:** 30 px Abstand, genau eine Zeile. Auf dem Telefon 22 px.
- **Bildlegende:** Groteske 15/18 px, auf dem Telefon 12/15 px, aufrecht, in der Textfarbe (#282828), unter dem Bild.
- **Bildnachweis:** eigener kleinster Grad, 12 px (Telefon 10 px), wahlweise hochkant an der Bildkante.
- **Autorenzeile und Datum:** Groteske 15/21 px in der Textfarbe, nicht grau.
- **Grau:** ein Ton (#8C8C8C) für die Rubrikzeile über dem Titel, ein zweiter (#757575, 4,6 : 1) für Sonderfälle.
- **Kursiv:** als Schnitt vorhanden, nur für Betonung und Zitate vorgesehen.

**Was G5 zeigt:** Deutschsprachige Lesepraxis trennt Nebentext durch Schriftart und Größe, nicht durch Grau und Kursive. Der Bildnachweis ist die kleinste Stufe der ganzen Seite.

#### G6. gwern.net

Seite eines Essayisten mit sehr viel typografischem Apparat: Randnotizen links und rechts, Kapitälchen, Mediävalziffern. Quelle github.com/gwern/gwern.net, nur Stylesheets gelesen.

- Kapitälchen für Seitentitel, Hauptüberschriften, Navigation und viele Kleinteile.
- Kursiv für die Seitenbeschreibung, für Randbemerkungen und Motti.
- Bildlegenden 0,9 der Lesegröße, aufrecht.
- Gut 70 Überblendungen im Stylesheet.

**Was G6 zeigt:** die obere Grenze. Jedes Mittel ist für sich Buchsatz, zusammen sind sie eine Handschrift, die man sofort erkennt. Für C ist G6 das Gegenbeispiel.

### Beschrieben (nicht gemessen)

#### B1. Robin Sloan, robinsloan.com

Romanautor mit eigenem Kolophon und kleiner Stilregel.

- Schriften laut Kolophon: Filosofia, Trade Gothic Next, Überschriften in Kyrios. Seine Erzählungen setzt er in der **Vollkorn**.
- Stilregel: „Titles of books, periodicals, movies, etc., in plain text rather than italics.“ Werktitel also aufrecht. Endet ein Satz in einer kursiven Wendung, wird auch das Satzzeichen kursiv.
- Newsletter: Archivierte Ausgaben verweisen auf „the form at the bottom of the page“. Das Formular steht unten auf der Seite.
- Quellen: robinsloan.com/colophon, robinsloan.com/newsletters

#### B2. Craig Mod, craigmod.com

Schriftsteller und Fotograf, schreibt über lange Wanderungen in Japan. Am nächsten an Dominiks Thema.

- Die Startseite beginnt mit den Büchern (*Things Become Other Things*, *Kissa by Kissa*) und den Essays, nicht mit einer Selbstvorstellung.
- Die Über-Seite nennt jedes Buch mit Jahr und einem Satz, etwa „*Kissa by Kissa* (2020; six printings)“.
- Zwei Newsletter, jeder mit Takt und Thema: „*Roden*, monthly“ und „*Ridgeline*, weekly“. Dazu das Versprechen „always one-click to unsubscribe“.
- Quellen: craigmod.com, craigmod.com/about, craigmod.com/newsletters

#### B3. Frank Chimero, frankchimero.com

Gestalter und Buchautor. Seine Seite 2019 und 2020 war mit Absicht „default-ish: no webfonts, no Javascript, and only a dash of vanilla CSS“, Text in Georgia. Den Umbau danach hat er öffentlich beschrieben. Er zeigt, dass Zurückhaltung selbst eine Gestaltung ist.
Quellen: frankchimero.com/blog/2020/redesign-this-design, frankchimero.com/blog/2019/redesign

#### B4. Fitzcarraldo Editions

Londoner Literaturverlag, berühmt für seine Umschläge.

- Bücher: eine eigene Serifenschrift von Ray O'Meara. Robin Kinross: die Bücher kommen „without the need for any partner typeface for captions or headlines“. Farbe als System: Blau für Romane, Weiß für Essays.
- Shop: Titel, darunter der Autor, darunter der Preis.
- Autoren: Register von A bis Z unter Buchstaben. Die Autorenseite hat eine kurze Biografie und die Titel.
- Fuß: eine Liste von Verweisen (About, Catalogues, Foreign Rights, Fiction, Essays, Authors, Prizes, News & Events, Datenschutz) und auf jeder Seite „Sign up to our newsletter“.
- Quellen: Suchindex von fitzcarraldoeditions.com (shop, authors, catalogues), robinkinross.substack.com/p/fitzcarraldo-editions, fontsinuse.com/uses/50700

#### B5. The Paris Review

Literaturmagazin, 2021 von Matt Willey (Pentagram) neu gestaltet.

- Druck: Text in Heldane Text, Name in Founders Grotesk. Für das Web fand sich keine Quelle.
- Archiv nach Heftnummer („Issue No. 48 Cover“). Interviews heißen mit Reihe und Nummer, etwa „The Art of Fiction No. 54“. Die Nummer ist Teil des Titels, kein Etikett darüber.
- In der Navigation stehen „The Daily“ und „Newsletters“ als eigene Bereiche.
- Quellen: creativereview.co.uk/paris-review-matt-willey-redesign, pentagram.com/work/the-paris-review, Suchindex von theparisreview.org

#### B6. The New York Review und NYRB Classics

- Das Magazin wurde 2022 neu gestaltet: zwei Schriften von Henrik Kubel aus dem Archiv von Robert Besley, Gestaltung Matt Willey.
- NYRB Classics nennen Übersetzer und Einleitung als eigene, schlichte Angaben: „Translated by …“, „Introduction by …“.
- Quellen: nybooks.com/announcing-the-new-york-reviews-redesign, nyrb.com/pages/about, Katalogeinträge

#### B7. Suhrkamp

Die Liste aller Bücher zeigt Titel, darunter den Autor, dazu Erscheinungstermin und Preis („10.03.2020“, „24,00 €“). Angaben stehen als eigene Felder, nicht als Kette mit Trennpunkten.
Quelle: suhrkamp.de/buecher (Suchindex)

#### B8. Hanser Literaturverlage

- Autorinnen und Autoren von A bis Z, jede Seite mit kurzer Biografie und den Büchern.
- Was noch nicht erschienen ist, steht als schlichte Angabe: „erscheint voraussichtlich am …“.
- Eine Seite für Veranstaltungen und ein Satz für Lesungsanfragen: „Wenn Sie Autor:innen für eine Lesung einladen möchten, finden Sie hier die Ansprechpartner:innen.“
- Quellen: hanser-literaturverlage.de/autoren, /veranstaltungen-c-34, /personen/nora-bossong-p-748 (Suchindex)

#### B9. Literarisches Colloquium Berlin

Jede Veranstaltungsseite folgt demselben Aufbau: Titel, Mitwirkende, Moderation, Datum und Uhrzeit, Ort (Am Sandwerder 5), Eintritt („8 € / 5 € ermäßigt“), bei Bedarf die Sprache. Jede Angabe steht auf einer eigenen Zeile.
Quelle: lcb.de/programm (Suchindex)

### Regelwerke, auf die sich die Gestalter berufen

- **Matthew Butterick, Practical Typography:** Lesetext im Netz 15–25 px, Zeilenabstand 120–145 %, Zeilen mit 45–90 Zeichen. Versalien und Kapitälchen 5–12 % sperren, Kleinbuchstaben nicht. Unterstreichen nur für Verweise. Quelle: practicaltypography.com/summary-of-key-rules.html, /letterspacing.html, /underlining.html
- **Bringhurst im Netz (Richard Rutter, webtypography.net):** 45–75 Zeichen als bequemes Maß. Die Seite selbst hält es mit 77 Zeichen knapp ein. Ihre Lizenzzeile steht in Hellgrau mit 2,7 : 1, auch Typografen verfehlen das.
- **Deutsche Hausregeln** sind uneinheitlich. Die Stilvorlage des ICI Berlin setzt selbständige Werke kursiv und Teile in Anführungszeichen, wie Standard Ebooks. Andere Häuser setzen alle Titel in Anführungszeichen, im Feuilleton ist das üblich. Quellen: press.ici-berlin.org/pdf/ICI-Publikationen_Stilvorlage.pdf und die Richtlinien der Universitäten Marburg und Rostock.

---

## 4. A und B im selben Maß

Erster Bildschirm bei 1440 × 900, Anteile bezogen auf alle sichtbaren Zeichen der Seite.

| Seite | Lesetext | Zeichen je Zeile (1440 / 390) | Grade im 1. Bildschirm | kursiv | Versal, Kapitälchen, gesperrt | Text unter 7 : 1 |
|---|---|---|---|---|---|---|
| G1 Tufte | 21/30 px | 74 / 35 | 3 | 6,1 % | 0,9 % | 0 % |
| G2 Resilient Web Design, Kapitel | 30/52,5 px | 61 / 47 | 3 | 2,1 % | 2,8 % | 0 % (rote Verweise 2,8 %) |
| G3 brandur, Essay | 18/32 px | 74 / 40 | 5 | 6,7 % | 0,4 % | 2,1 % |
| G3 brandur, Über | 18/32 px | 93 / 40 | 5 | 1,7 % | 2,0 % | 0 % |
| **A, Startseite** | 19/28,5 px | 66 / 36 | **8** | **16,7 %** | 5,0 % | **24,9 %** |
| **A, Vita** | 19/28,5 px | 57 / 38 | **9** | **13,8 %** | 1,0 % | **29,1 %** |
| B, Startseite | 20/30 px | 56 / 39 | 3 | 3,2 % | 0 % | 0 % |

Dazu bei A:

- Insgesamt 13 Grade auf der Startseite, neun davon mit mehr als 1 % der Zeichen. Bei den gemessenen Seiten sind es zwei bis fünf.
- Drei Grautöne für Nebentext (#6B6D72, #7C7E83, #96989C), der hellste mit 2,9 : 1.
- Kursiv sind Stationen, Legende, Bandnamen, Jahreszahlen am Zeitband, Koordinaten, Orte, „bis“, die Striche und die Buchrücken im Regal.
- Bei 1280 × 800 hat der Lesetext der Vita nur 49 Zeichen je Zeile, die Spalte wird zu schmal.
- Absatzabstände wechseln auf derselben Seite zwischen 14 und 29 px, dazu freie Werte wie 36 px.

Die Lesegröße und das Zeilenmaß von A liegen gut im Bereich der Vorbilder. Was A von ihnen trennt, sind Menge und Art des Nebentexts: etwa doppelt so viele Grade im ersten Bildschirm, zwei- bis achtmal so viel Kursive, mehr als zehnmal so viel Grau.

---

## 5. Was die besten Seiten gemeinsam machen

1. **Eine Lesegröße trägt die Seite.** 81 bis 96 % der Zeichen stehen in ihr (Tufte, Resilient Web Design, brandur). Im ersten Bildschirm sind drei bis fünf Größen zu sehen.
2. **Nebentext ist eine Stufe kleiner, etwa vier Fünftel.** Tufte 16,5 zu 21 (0,79), brandur 14 zu 18 (0,78), Republik 15 zu 19 (0,79). Der Bildnachweis darf eine Stufe darunter liegen (Republik 12 px).
3. **Zeilen mit 60 bis 75 Zeichen am Desktop, 35 bis 47 auf dem Telefon.** Tufte 74, Resilient Web Design 61, brandur 74. Zeilenabstand 1,4 bis 1,8.
4. **Kursiv vor allem für Werktitel, Zitate und Betonung.** So bei Tufte, Resilient Web Design, Republik und im Handbuch von Standard Ebooks. Ortsnamen sind nie kursiv (Standard Ebooks).
   *Hier gehen die Seiten auseinander:* brandur und Standard Ebooks setzen auch Legenden, Daten und Randkästen kursiv, gwern Randbemerkungen. Robin Sloan setzt nicht einmal Werktitel kursiv.
5. **Bildlegenden und Randnotizen meist aufrecht und in der Textfarbe.** Tufte, Resilient Web Design, Republik, gwern (Legenden). Unterschieden werden sie durch Größe, Stellung oder eine zweite Schriftart, nicht durch Grau.
   *Ausnahmen:* brandur und Standard Ebooks setzen Legenden klein, grau und kursiv zugleich.
6. **Wenig oder gar kein Grau.** Tufte und Resilient Web Design kommen ohne aus. Republik und Standard Ebooks haben je ein Grau für eine Sorte Nebentext. Drei abgestufte Grautöne wie in A hat keine der gemessenen Seiten. Nur brandur hat mehrere, einer davon unter jedem Mindestwert.
7. **Versalien oder Kapitälchen höchstens als ein System.** Resilient Web Design nur über dem Kapitel, brandur nur in der Navigation, Standard Ebooks nur in den Überschriften, Tufte nur am Absatzbeginn. Viele kleine gesperrte Etiketten an verschiedenen Stellen hat keine Seite außer gwern.
8. **Überschriften schlicht.** Größer (Tufte, Resilient Web Design, Republik) oder halbfett in Textgröße (brandur). Abstand davor größer als danach: brandur 30 zu 4 px, Tufte 31,5 zu 21 px.
9. **Randnotizen nur mit Inhalt.** Tufte und gwern nutzen den Rand für Anmerkungen und Quellen, Resilient Web Design für Bildlegenden. Auf dem Telefon rücken sie unter den Gegenstand oder klappen ein. Leere Randbemerkungen, die nur Stimmung machen, gibt es nirgends.
10. **Wenige Abstände, nach Gewicht gestuft.** Absatz zu Absatz 0,7 bis 1 Zeile (Tufte 21 von 30 px, brandur 24 von 32, Republik 30 von 30). Abschnitte zwei- bis dreimal so viel (Resilient Web Design 60 und 180 px).
11. **Verweise im Text unterstrichen, Navigation ohne Strich.** Tufte: 1 px in der Textfarbe, 2 px Abstand. brandur ähnlich. Resilient Web Design zeigt Verweise nur durch Farbe. Die Navigation ist bei brandur und Resilient Web Design nicht unterstrichen.
12. **Daten, Orte und Preise als schlichte Angaben.** LCB: jede Angabe eine Zeile. Suhrkamp und Fitzcarraldo: Titel, Autor, Datum, Preis als eigene Felder. NYRB: „Translated by …“. Hanser: „erscheint voraussichtlich am …“. Ketten mit Mittelpunkten fanden sich nicht.
    *Ausnahme:* brandur führt Ort und Datum in einer grauen Randspalte.
13. **Bücher als kurze Liste.** Titel, darunter Autor oder Jahr, höchstens ein Satz (Craig Mod, Fitzcarraldo, Suhrkamp, Standard Ebooks).
14. **Fuß als Verweisliste oder als ein Satz.** Fitzcarraldo listet Verweise, Resilient Web Design hat einen Satz Kolophon.
15. **Newsletter unten, ein Satz, ein Feld.** Fitzcarraldo im Fuß jeder Seite, Robin Sloan unten auf der Seite. Der Satz sagt, was kommt und wie oft (brandur: „only a few times a year“, Craig Mod: „monthly“, „weekly“), Craig Mod verspricht die Abmeldung mit einem Klick. Kein Kasten, kein Fenster.
16. **Kaum Bewegung.** Tufte hat keine Überblendung, Resilient Web Design eine (Farbe der Verweise, 0,25 s), brandur nur an Schaltern. Was sich bewegt, zeigt etwas.

---

## 6. Konkrete Regeln für Version C

Jede Regel nennt die Seiten, die sie stützen, und wo die Praxis abweicht. Wo eine Vorgabe von Dominik berührt ist, steht sie dabei. Sie geht vor.

### R1. Vier Grade und die Anzeigeschrift für den ersten Satz

- **klein 15,4 px:** Legenden, Tafel, Koordinaten, Stationenzeile, Fuß, Bildnachweis
- **Text 19 px:** Lesetext, Navigation, „Schriftsteller und Reisender“
- **Überschrift 23,75 px:** Abschnittsüberschriften, Name im Kopf, Ort auf der Tafel
- **groß 28,5 px:** Seitentitel, Jahr auf der Tafel, der erste Satz

Der erste Satz bleibt in der IM Fell und fliegt ein (V13). Er bekommt den Grad „groß“, nicht eine eigene Zwischengröße (heute 30,9 neben 30,4 px). Im ersten Bildschirm höchstens fünf Grade. Ausgenommen sind Zeichnungen: Buchrücken, Ortsnamen auf dem Globus.
Telefon: Text 18 px, klein 15 px, nichts darunter außer in Zeichnungen.
**Stützen:** Tufte, Resilient Web Design und brandur mit drei bis fünf Graden im ersten Bildschirm. Das Verhältnis klein zu Text (0,81) liegt bei Tufte, brandur und Republik (0,78 bis 0,79).
**Abweichend:** Standard Ebooks und Republik haben je etwa sechs Grade, verteilt auf mehrere Seitentypen.

### R2. Zeilenmaß

Lesetext 55 bis 75 Zeichen bei 1280 bis 1920 px, 35 bis 45 auf dem Telefon. Die Spalte der Vita darf bei 1280 nicht unter 55 Zeichen fallen (heute 49).
**Stützen:** Tufte 64 bis 80, Resilient Web Design 61, brandur 74, Butterick 45 bis 90, Bringhurst 45 bis 75.

### R3. Kursiv nur für Werktitel, fremde Wörter und Zitate

- Kursiv: *Satoshi*, *Ursprung*, *Untertext*, Buchtitel im Fließtext und in Listen, fremdsprachige Wörter, wörtliche Zitate.
- Aufrecht: Legenden, Stationen, Koordinaten, Orte, Jahreszahlen, „bis“, Striche, Tafel, Beschriftungen, Navigation, Fuß.
- Aufrecht auch die Ortsnamen auf dem Globus (heute kursiv im Zeichencode) und die Titel auf den Buchrücken. Auf einem echten Rücken steht der Titel aufrecht.
- Titel von Erzählungen im Fließtext in deutschen Anführungszeichen („…“), weil sie Teil eines Ganzen sind. Als Überschrift ihrer eigenen Seite stehen sie schlicht.
- Nie Kursive und Anführungszeichen zugleich.

**Stützen:** Tufte, Resilient Web Design, Republik, Handbuch von Standard Ebooks (Titel kursiv, Teile in Anführungszeichen, Orte nie kursiv), Stilvorlage des ICI Berlin. Dominiks Wunsch, die „Mikromarker mit den kursiven Schriften“ zu entfernen (V03).
**Abweichend:** Robin Sloan setzt Titel aufrecht. Viele deutsche Zeitungen setzen Titel in Anführungszeichen. Für C bleibt die Kursive bei Titeln, weil dann *Satoshi* und *Ursprung* auf jeder Seite sofort ins Auge fallen und A und B es schon so halten. Kursiv sollten danach höchstens 3 bis 5 % der Zeichen sein (B 3,2 %, Tufte 6,1 % mit kursiven Überschriften).

### R4. Nebentext mit einem Mittel: eine Stufe kleiner

Legenden, Tafeldaten, Koordinaten, Stationenzeile und Fuß stehen im Grad „klein“, aufrecht, in Graphit. Die Abstufung kommt aus Größe und Stellung unter oder neben dem Gegenstand. Nebenorte wie Colombo oder Cotonou bekommen keinen eigenen, noch kleineren und helleren Grad. Dass es ein längerer Aufenthalt war, sagt der Text.
Koordinaten bleiben, wo sie heute stehen (V29): an der Tafel, in den Stationen der Vita, bei den Bänden von *Ursprung*. Aufrecht, klein, Graphit, ohne eigene Schrift.
**Stützen:** Tufte (Randnotizen nur kleiner), Resilient Web Design (Legende kleiner und in einer zweiten Schrift, schwarz), Republik (Legende und Autorenzeile in der Textfarbe).
**Abweichend:** brandur und Standard Ebooks setzen Nebentext klein, grau und kursiv zugleich. C folgt der strengeren Gruppe, weil genau diese Kombination das ist, was Dominiks Freund aufgefallen ist und was Dominik entfernt haben will.

### R5. Ein Grau, und nur für Zustände

Lesetext, Nebentext, Tagline und Fuß stehen in Graphit. Ein einziges Grau mit mindestens 4,5 : 1 bleibt für echte Zustände: das nicht verfügbare „früher“ oder „später“, ein ausgeschalteter Knopf. Die Striche der Stationenzeile stehen in Graphit oder entfallen.
„Schriftsteller und Reisender“ bleibt (V14), nicht grau, nicht kursiv. Abgesetzt durch Stellung neben oder unter dem Namen.
**Stützen:** Tufte und Resilient Web Design ganz ohne Grau, Republik und Standard Ebooks mit genau einem.
**Abweichend:** brandur mit mehreren Grautönen, einer davon mit 2,3 : 1.

### R6. Überschriften und Beschriftungen ohne Sperrung

- Abschnittsüberschriften („Was ich schreibe“, „Was ich gelesen habe“, „Stationen“) im Grad „Überschrift“, normale Groß- und Kleinschreibung, aufrecht, nicht gesperrt.
- Der Name im Kopf ungesperrt.
- Kein Etikett über einem Abschnitt, das nur sagt, was darunter ohnehin steht.
- Kapitälchen höchstens an einer einzigen Sorte von Stellen auf der ganzen Website. Wenn überhaupt, dann bei Figurennamen oder Kontinenten auf Länder. Das lässt die Mischfassung unter 04 zu.

**Stützen:** Tufte, Republik und brandur mit schlichten Überschriften. Resilient Web Design, brandur, Standard Ebooks und Tufte mit Versalien oder Kapitälchen an je genau einer Sorte Stelle. Butterick: Versalien und Kapitälchen 5 bis 12 % sperren, Kleinbuchstaben nie. A hält das handwerklich ein. Das Problem von A ist die Zahl der Stellen, nicht die Sperrung.
**Abweichend:** Standard Ebooks setzt alle h2 als gesperrte Versalien, gwern fast alles in Kapitälchen.

### R7. Randbemerkungen nur, wenn sie etwas sagen

- Am Rand oder neben dem Bild steht nur, was Inhalt trägt: eine Bildlegende, eine Quelle, eine Anmerkung.
- Am Desktop ab 1280 px neben dem Gegenstand, oben bündig. Auf dem Telefon darunter.
- Aufrecht, klein, Graphit.
- Bedienhinweise nur, wo eine Handlung nicht von selbst klar ist, einmal und kurz.
- Keine Zwischenrufe, keine Ankündigungen von Dingen, die schon sichtbar sind.

**Stützen:** Tufte (Randnotizen auf Höhe der Stelle, auf dem Telefon eingeklappt), Resilient Web Design (Legende neben dem Bild, auf dem Telefon darunter), gwern.
**Abweichend:** brandur nutzt eine Randspalte auch für Metadaten (Artikel, Datum, Ort). C lässt das weg. Die Tafel am Globus ist keine Randbemerkung, sie zeigt die gewählte Station.

### R8. Verweise

- Im Text unterstrichen: 1 px in voller Textfarbe, etwa 0,12 em unter der Grundlinie. Heute 40 % Deckkraft und 0,2 em, das wirkt wie Dekor.
- Navigation in Textgröße, Graphit, ohne Strich. Strich unter der Maus und beim Tastaturfokus. Die aktuelle Seite halbfett und ohne Verweis.
- Register (Länder) wie die Navigation. Auf Touchgeräten bleibt dort der Strich stehen, damit man sieht, dass man tippen kann.
- Unterstrichen bleiben die E-Mail-Adresse, „früher“, „später“ und die Wörter der Kartenwahl.

**Stützen:** Tufte (1 px, Textfarbe, 2 px Abstand bei 21 px), brandur (feine Linie, Navigation ohne Strich), Resilient Web Design (Navigation ohne Strich), Butterick. Das entspricht der Mischfassung unter 07 und spricht bei Frage 30 für die zweite Fassung.
**Abweichend:** Resilient Web Design zeigt Verweise nur durch Farbe. Das wäre ein Akzent, den A nicht hat (V05: Akzent nur für Orte).

### R9. Abstände auf einem Raster aus der Zeile

Grundzeile 28,5 px. Erlaubt sind nur 7,125 (¼), 14,25 (½), 21,375 (¾), 28,5 (1), 57 (2) und 85,5 px (3).

- Absatz zu Absatz: eine Zeile, 28,5 px, überall gleich (heute 14 und 29 px gemischt). Wer es dichter will, nimmt ¾ Zeile, aber dann auf allen Seiten.
- Kurze Zeilen, die zusammengehören (Tafel, Anschrift im Fuß), stehen ohne Abstand untereinander.
- Überschrift: 57 px davor, 14,25 px danach.
- Legende unter einem Bild oder unter dem Globus: 7,125 px.
- Zwischen großen Abschnitten: 85,5 px.
- Telefon: dieselben Stufen auf der Grundzeile 27 px.

**Stützen:** Republik (Absatz genau eine Zeile), Resilient Web Design (gut eine Zeile, zwei Werte im Verhältnis 1 zu 3), Tufte (Absatz 0,7 Zeilen, Überschrift davor 1,5-mal so viel wie danach), brandur (0,75 Zeilen, Überschrift 30 zu 4 px).
**Abweichend:** Der Raum zwischen zwei Absätzen reicht von 0,7 bis gut 1 Zeile. Gemeinsam ist allen, dass es auf einer Seite ein Wert ist. Deutscher Buchsatz kennt dazu den Einzug ohne Abstand. Keine der gemessenen Seiten nutzt ihn.

### R10. Bildlegende und Bildnachweis

Die Legende steht unter oder neben dem Bild, im Grad „klein“, aufrecht. Ein Bildnachweis, wo einer nötig ist, folgt als eigener kurzer Satz in derselben Größe. Beim Bootsfoto entfällt er (Entscheidung 8). Hat ein Bild keine Legende, die etwas sagt, bekommt es keine. Das gilt für das Regalbild der Startseite.
**Stützen:** Resilient Web Design („Photograph by …“ als eigener Satz), Republik (Nachweis als kleinster Grad), Tufte.

### R11. Daten, Orte und Jahre als schlichte Angaben

- Im Satz oder als eigene Zeile: „Berlin, seit 2022“, „Kapstadt 2024“.
- Trennzeichen ist das Komma. Keine Mittelpunkte, keine Schrägstriche als Zierde.
- Die Stationenzeile der Chronik bleibt (V22), aufrecht, in Graphit, im Grad „klein“.
- Was noch nicht erschienen ist, heißt „in Arbeit“ (V38), ohne Etikett und ohne Hervorhebung.

**Stützen:** LCB (jede Angabe eine Zeile), Hanser („erscheint voraussichtlich am …“), NYRB („Translated by …“), Suhrkamp (Datum und Preis als Felder), Craig Mod (Titel mit Jahr in Klammern).
**Abweichend:** brandur sammelt Ort und Datum in einer Randspalte.

### R12. Werke als kurze Liste

Jeder Eintrag: Titel kursiv, darunter in einem Satz Gattung und Stand, höchstens ein Satz Beschreibung. Keine Metazeile der Form „Roman · 2024 · 320 Seiten“.
**Stützen:** Craig Mod (Titel, Jahr, ein Satz), Fitzcarraldo und Suhrkamp (Titel, darunter Autor, dann Datum und Preis), Standard Ebooks (Titel, darunter Autor).

### R13. Fuß

Reihenfolge: Kontakt (Anschrift und E-Mail genau wie in A, V67), die Newsletterzeile, Impressum und Datenschutz als Verweise, das Kolophon im Wortlaut von V64. Alles im Grad „klein“, Graphit, ohne Überschrift „Kontakt“ in Kapitälchen. Die Mischfassung unter 20 empfiehlt, die Überschrift ganz wegzulassen.
**Stützen:** Fitzcarraldo (Fuß als Verweisliste), Resilient Web Design (ein Satz Kolophon, wer es gemacht hat, welche Schrift), Robin Sloan (eigenes Kolophon).

### R14. Newsletter: eine Zeile

Eine Zeile im Fuß: ein Satz, was kommt und wie selten, dazu ein Feld und „Eintragen“ (V68). Kein Kasten, kein Fenster, keine Zahl der Leser. Der heutige Satz „Eine E-Mail, wenn ein Buch erscheint oder eine Lesung ansteht“ erfüllt das. Er sagt Anlass und damit Seltenheit.
**Stützen:** Fitzcarraldo (im Fuß jeder Seite), Robin Sloan (Formular unten auf der Seite), brandur („It's sent only a few times a year“, Feld und Knopf), Craig Mod (Takt genannt, Abmeldung mit einem Klick).
**Abweichend:** Craig Mod nennt seine Leserzahl und hat einen eigenen Abschnitt auf der Startseite. Das passt zu einem Newsletter, der selbst ein Werk ist, nicht zu einer Benachrichtigung.

### R15. Übergänge und Bewegung

Bewegung nur, wo sie etwas zeigt: die wandernden Linien auf dem Globus, die Chronik, der Einflug des ersten Satzes (Entscheidung 7 in `mischfassung-entscheidungen.md`, V13). Kein Einblenden von Abschnitten beim Scrollen, kein Anheben unter der Maus, keine Überblendung von Farben. Unter der Maus erscheint der Strich sofort. Bei reduzierter Bewegung steht alles sofort da.
**Stützen:** Tufte (keine Überblendung), Resilient Web Design (eine, 0,25 s), brandur (nur an Schaltern).
**Abweichend:** Standard Ebooks und gwern haben viele kleine Übergänge in der Bedienung.

### R16. Telefon

Randnotizen und Legenden rücken unter den Gegenstand. Lesetext 18 px auf 27 px, klein 15 px. Zeilen mit 35 bis 45 Zeichen. Touchflächen mindestens 44 px hoch, auch für die Stationen und „früher“ und „später“.
**Stützen:** Tufte und Resilient Web Design (Rand wird zur Zeile oder klappt ein), Republik (eigene Telefongrade, Text 17 px).

---

## 7. Prüfliste für den fertigen Bau

Mit `messen.cjs` an Startseite, Vita und *Satoshi*, 1440 × 900 und 390 × 844:

- Grade im ersten Bildschirm: höchstens fünf
- kursiv: höchstens 5 % der Zeichen, und nur in `i`, `em`, `cite` oder `q`
- Versal, Kapitälchen, gesperrt: höchstens eine Sorte Stelle
- Text unter 7 : 1: nur Zustände, unter 2 % der Zeichen
- kein Text unter 4,5 : 1
- Absatzabstände: ein Wert je Seite
- Lesetext bei 1280: mindestens 55 Zeichen je Zeile

## 8. Quellen

Gemessen oder gelesen:

- github.com/edwardtufte/tufte-css
- github.com/adactio/resilientwebdesign
- github.com/brandur/sorg
- github.com/standardebooks/web und github.com/standardebooks/manual (8-typography.rst, Abschnitte „Italics“ und „Italics in names and titles“)
- github.com/republik/plattform (packages/styleguide: theme/fonts.js, theme/colors.js, components/Typography, components/Figure)
- github.com/gwern/gwern.net (css/initial.css, css/default.css)
- github.com/clagnut/webtypography

Beschrieben:

- robinsloan.com/colophon, robinsloan.com/newsletters
- craigmod.com, craigmod.com/about, craigmod.com/newsletters
- frankchimero.com/blog/2020/redesign-this-design, frankchimero.com/blog/2019/redesign
- fitzcarraldoeditions.com (shop, authors, catalogues, subscribe), robinkinross.substack.com/p/fitzcarraldo-editions, fontsinuse.com/uses/50700/fitzcarraldo-editions-book-series
- creativereview.co.uk/paris-review-matt-willey-redesign, pentagram.com/work/the-paris-review, theparisreview.org (Archiv, Autorenseiten)
- nybooks.com/announcing-the-new-york-reviews-redesign, nyrb.com/pages/about
- suhrkamp.de/buecher/alle-buecher-s-7
- hanser-literaturverlage.de/autoren, hanser-literaturverlage.de/veranstaltungen-c-34
- lcb.de/programm
- practicaltypography.com (summary-of-key-rules, letterspacing, underlining)
- press.ici-berlin.org/pdf/ICI-Publikationen_Stilvorlage.pdf
