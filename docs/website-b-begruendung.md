# Version B: Was KI-typisch bleibt, und warum

Stand: 20. Oktober 2026, nach der Korrekturrunde zu den beiden Prüfungen von Version B („KI-Merkmale“ und „Form und Funktion“).

Dieses Blatt nennt jedes Merkmal aus der Rangliste (`docs/ki-merkmale.md`), das in `website-b/` noch vorkommt: was es ist, wo es steht und warum es bleibt. Angaben wie „Rang 27“ verweisen auf die Rangliste, Angaben wie „12.5“ auf die Gestaltungsregeln (`docs/gestaltung-website-b.md`). Die einzelnen Abweichungen von den Regeln stehen im Änderungsprotokoll `website-b/werkzeuge/aenderungsprotokoll.md`.

---

## 1. Was diese Runde geändert hat

### Aus der Prüfung „KI-Merkmale“

| Befund | Änderung in B |
|---|---|
| 1.1 Karte als Kostüm: Gradzahlen, Maßstab, Zeichenerklärung mit einem Zeichen | Keine Gradzahlen und kein Maßstab mehr. Nur die Seite Länder beschriftet im Überblick den Äquator. Eine Zeichenerklärung steht nur noch auf der Karte Wohnorte, wo es zwei Zeichen gibt. Die eigene Ziffernschrift für die Karte entfällt |
| 1.2 Text und Karte sagen dasselbe | Der Kopf der Tafel ist gestrichen, den Ortsnamen trägt die Karte. Die Legende sagt nur, was weder Karte noch Kurzvita sagen: Land, Zeitraum, Tätigkeit („Taiwan, 2018–2022, Lektor und freier Autor.“). Die Jahreszeilen über den Szenen sind weg, das Jahr steht hinter dem Ort („London, 2007.“). Die Vita hat keine Stationenliste mehr neben Dominiks Text |
| 1.3 Ortswörter als unterstrichene Knöpfe | Die Kurzvita ist reiner Text. Die Szenen auf *Satoshi* sind eine Auswahlliste ohne Strich, die ganze Zeile wählt. Auf *Ursprung* ist nur „Bibliothek“ ein Verweis. Erster Bildschirm der Startseite: 8 Unterstreichungen statt 12, alle echte Verweise oder Steuerwörter |
| 1.4 Das Foto steht weiter hinten als in A | Das Bootsfoto steht am Desktop neben dem Text auf der Höhe des Titels, auf dem Telefon direkt unter dem Titel |
| 1.5 Formeln über die Seiten, Kolophon überall | „Drei Romane über die Anfänge …“, „begonnen in Kaohsiung“, „Viele davon …“ und „Das Manuskript liegt vollständig vor“ stehen nur noch je einmal, die Werkstattbühne steht auf der Startseite einmal. Das Kolophon steht nur im Impressum und ist berichtigt |
| 1.6 Claudes Texte als Dominiks Texte geschützt | Die Szenen sind aus Sätzen des Exposés vom August 2026 neu gebaut, wörtlich, wo es ging. Bariloche und Penang haben Inhalt. Band I endet mit Dominiks Satz aus dem Exposé („*Kreise ohne Wiederkehr* erzählt die Geschichte hinter dem größten Rätsel der Frühgeschichte: …“). „Die Tage, mit denen die Kapitel geschnitten sind:“ ist gestrichen. Der Datenschutz hat kein „Kurz gesagt:“ und keine Semikolons mehr |
| 1.7 Karte haftet auf dem Telefon | Auf Telefon und Tablet hochkant steht die Karte über Szenen oder Bänden und haftet nicht. Ein Tippen auf eine Szene rückt sie ins Bild. Auf Tablet quer stehen Text und Karte nebeneinander |
| 1.8 Gleiche Silhouette wie A, Chronik startet von selbst | Keine Chronik mehr. In Ruhe steht der ganze Weg, Berlin halbfett, früher und später gehen die Stationen durch. Die Startseite ist am Desktop gespiegelt: Karte am Außensteg links, Text am Bund rechts, wie die linke Seite eines aufgeschlagenen Atlas |
| 1.9 Englische Titel deutscher Werke | 76 Werke, die zuerst auf Deutsch erschienen sind, stehen mit dem Originaltitel da (*Der Prozess*, *In Stahlgewittern*, *Das Glasperlenspiel*), dazu deutsche Namensformen (Aristoteles, Fjodor Dostojewski, Mark Aurel). Verlag und Seitenzahl bleiben die der gelesenen Ausgabe |
| 1.10 Kleinere Punkte | Navigation und Kartenwahl aufrecht. Die Bibliothek spricht in der dritten Person wie der Rest. Der Vorspann der Bibliothek ist ein Satz ohne „von X bis Y“ und ohne den Beispielsatz der Rangliste. Die Seite Erzählungen hat einen Satz mit Bezug |
| Rang 67, 68 | Der Bau (`werkzeuge/artefakt.py`) entfernt alle Kommentare aus HTML, CSS und den eigenen Skripten. Geprüft durch Vergleich der Syntaxbäume: 31 Skripte gleich, nur Kommentare fehlen |
| Nebenbefunde | Der Radius der Kugel wird nie negativ. Der Kern enthält nur noch die Zeichnung von B |

### Aus der Prüfung „Form und Funktion“

| Befund | Änderung in B |
|---|---|
| A1 Fokus geht in der Bibliothek verloren | Geht der Fokus vom Rücken des Manuskripts in den Verweis der Buchzeile, bleibt die Zeile stehen. Geprüft mit der Tastatur |
| A2 Zeitband: Hover und Klick treffen verschiedene Bücher | Das Zeitband entfällt (siehe B6) |
| A3 Kein Abstand über „Leseliste“ | 3 z (90 px), gemessen |
| A4 Daten veraltet | `daten/buecher.js` ist abgeglichen (*Don Quijote*). Der Bau bricht ab, wenn `daten/` nicht mehr zu `website/daten/` passt, `--abgleichen` kopiert |
| A5 Satoshi bei 1920 × 1080 überspringt die erste Szene | Die Leselinie beginnt am Anfang der ersten Szene. Beim Laden steht immer Buenos Aires da |
| A6 Haftende Tafel zu groß auf Tablet und Telefon | Sie haftet dort nicht mehr |
| A7 „Dortmund“ ohne Strich | Entfällt mit den Bedienwörtern |
| A8 Gewässernamen berühren Land | Prüfung in 1,5-px-Schritten mit 2 px Rand. „Golf von Biskaya“ steht frei |
| A9 „früher“ allein in einer Zeile bei 1280 | Früher und später stehen in der Zeile der Legende, darunter die Zeichenerklärung. Die freigehaltene Höhe ist auf zwei Zeilen begrenzt |
| A10 Ein Weg, den es nicht gab | Längere Aufenthalte sind Abstecher vom Wohnort, hin und zurück. Kapstadt, Sansibar und Buenos Aires stehen jetzt auf der Karte |
| B1 Rechtes Feld leer auf *Satoshi* | Doppelseite: neben Klappentext, Aufbau und „Warum dieser Roman“ stehen Eckdaten, Kapiteltage und Figuren |
| B2 Löcher statt Rhythmus | Kein Auslauf mehr unter den Szenen (3 z), keine Lücke über dem Standortregister, Legende höchstens zwei Zeilen hoch |
| B3, B4 Ring und Zeichenerklärung ohne Information | Siehe 1.1 und 1.2 oben |
| B5 Karte *Ursprung* fast leer | Euphrat, Tigris, Schatt al-Arab, Jordan und Nil aus Natural Earth auf der Blauplatte, die Flussnamen kursiv in Blau |
| B6 Zeitband als Strichcode | Entfällt. Die Bibliothek beginnt mit Vorspann, Zeichenerklärung, Standortregister und dem obersten Brett |
| B7 Rücken unruhig | Eine Größe (10 px, 500) für alle Rücken. Liegende Bücher tragen den frei stehenden Strich nicht mehr |
| B8, B9 Kleinkram, leerer Rahmen ohne Skript | Inhaltsverzeichnis ohne „Vita.“ als Satz und ohne frühen Umbruch. Ohne Skript kein Rahmen, nur der Satz |
| C | USA in Kapitälchen. Lange Ländernamen brechen um. Mallorca mit Land. „Potsdam, Berlin“ teilen sich eine Beschriftung |
| D | Der Absatz „spekulative Chronik“ steht wieder im Aufbau. Kurzvita und Vita sagen beide „Moderatorenteam“. Kein „(AT)“ und keine Normseiten auf der Startseite |

---

## 2. Was KI-typisch bleibt

Geordnet nach Gewicht, das sichtbarste zuerst.

### Rang 9: Serife als Abkürzung zu „literarisch“

- **Was:** eine Antiqua mit Kursive für alles.
- **Wo:** überall.
- **Warum es bleibt:** Eine Textschrift ist für einen Schriftsteller die richtige Werkzeugwahl, keine Pose. Die Schrift erfüllt die Gegenprobe der Rangliste: Baskervville der ANRT steht auf keiner Liste, die die Recherche geprüft hat. Es gibt keine Display-Geste, kein kursives Akzentwort, keine zweite Familie, drei Grade, eine Farbe. Was KI-typisch ist, ist die Serife als Kostüm über einer sonst generischen Seite. Hier trägt sie den Satz.

### Rang 27: Prunkstück-Widget (die Kugel)

- **Was:** eine selbst gezeichnete orthografische Karte, mit der man etwas tun kann.
- **Wo:** Startseite (ganzes Tafelfeld), Länder (ganzes Tafelfeld), *Satoshi* und *Ursprung* (höchstens 30 rem).
- **Warum es bleibt:** Sie zeigt etwas, das nur dieser Inhalt hat: Dominiks Wohnorte, die Schauplätze seiner Romane, seine bereisten Länder. Sie dreht sich nicht von selbst, leuchtet nicht, hat keine Chronik mehr und startet nichts. Diese Runde hat ihr Beiwerk entfernt: Gradzahlen, Maßstab, Kopf, Einzeiler-Zeichenerklärungen. Die Flüsse auf *Ursprung* sind Inhalt, denn Mesopotamien liegt zwischen ihnen.
- **Was es ablösen könnte:** ein Foto oder Scan von Dominiks echter Rubbelkarte auf der Seite Länder. Dann käme die Karte aus seinem Material statt aus einem allgemeinen Atlasbild.

### Rang 7: Gezeichnet statt fotografiert

- **Was:** Karte und Regal sind Code-Zeichnungen, es gibt ein einziges Foto.
- **Wo:** Startseite, *Satoshi*, *Ursprung*, Länder, Bibliothek.
- **Warum es bleibt:** Hier tragen Daten die Geometrie: Koordinaten, Seitenzahlen, Bindungen. Dafür ist eine Zeichnung richtig. Ein erfundenes Bild oder ein Platzhalter wäre schlimmer (Rang 44). Das Bootsfoto steht jetzt oben.
- **Was es ablösen könnte:** nur Dominiks Material. Fotos vom Manuskriptstapel, von der Rubbelkarte, von Lesungen auf der Werkstattbühne, eine Leseprobe aus *Satoshi*. Mit der Angabe, wer fotografiert hat.

### Rang 51: Haarlinien

- **Was:** Linien von 1 px.
- **Wo:** Kartenrahmen und Kugelrand, die Bretter und Achsen des Regals, die Linie unter dem haftenden Standortregister.
- **Warum es bleibt:** Jede Linie trennt etwas, das Abstand nicht trennen kann: eine Abbildung vom Text, ein Brett vom nächsten, eine haftende Leiste vom Text darunter. Zwischen Textabschnitten gibt es keine Linie, und es gibt keine Spalten im Zeitungsstil.

### Rang 14 und 42: Text und Bild nebeneinander

- **Was:** Text in einer Spalte, die Karte in der anderen.
- **Wo:** Startseite (gespiegelt), *Satoshi*, *Ursprung*, Länder.
- **Warum es bleibt:** Es folgt aus dem Inhalt, einem Blatt mit Karte. Die Startseite ist am Desktop gespiegelt, damit sie nicht die Silhouette von A und nicht die des üblichen „Text links, Bild rechts“ hat. Auf *Satoshi* und *Ursprung* ist die Karte kleiner, damit nicht vier Seiten gleich aussehen. Nichts ist zentriert, kein Bildschirm ist ein Hero mit 100 vh.

### Rang 56: An das Scrollen gekoppelt

- **Was:** Ein Zustand folgt der Leseposition.
- **Wo:** ab 60 rem Breite auf *Satoshi* (die Karte fliegt zur Szene, die man liest) und *Ursprung* (der Ort des Bands wird halbfett), in der Bibliothek das halbfette Fach im haftenden Standortregister.
- **Warum es bleibt:** Es bildet ab, was man gerade liest, und entführt den Scroll nicht. Kein Einblenden, kein Pinnen ganzer Abschnitte, keine Bewegung ohne Zutun. Auf Telefon und Tablet hochkant haftet die Karte nicht mehr und folgt dem Lesen nicht.

### Rang 53: Unterstreichung

- **Was:** unterstrichene Wörter.
- **Wo:** Verweise, früher und später, die Kontinente in der Legende der Karte Reisen.
- **Warum es bleibt:** Im Werkszustand des Browsers und nur dort, wo man klicken kann. Auswahllisten (Navigation, Kartenwahl, Szenen, Länderregister, Standortregister) stehen ohne Strich. Im ersten Bildschirm der Startseite sind es 8.

### Rang 26: Mikro-Metadaten

- **Was:** kleine Angaben am Rand.
- **Wo:** „Äquator“ im Ring der Seite Länder, die Jahreszahlen unter den Brettern, Land und Zeitraum in der Legende der Wohnorte, die Kapiteltage als Register.
- **Warum es bleibt:** Jede Angabe beantwortet eine Frage, die das Bild nicht beantwortet: Wo liegt der Äquator auf der gedrehten Kugel? Aus welchem Jahr ist dieses Buch? Wann lebte er dort? Was geschah an diesem Tag? Schmuckangaben ohne Frage (Koordinaten, Gradring, Maßstab, Luftlinie) sind gestrichen.

### Rang 55: Register mit Jahresspalte

- **Was:** Jahr, Tag und Ereignis in festen Spalten.
- **Wo:** die Kapiteltage auf *Satoshi*.
- **Warum es bleibt:** Es ist eine echte Chronologie, die Registerkonvention ist dafür gemacht. Das Jahr steht nur, wo es wechselt. Als Label über Abschnitten gibt es die Form nicht mehr, auch nicht über den Szenen.

### Rang 1: gesperrte Versalien und Kapitälchen

- **Was:** gesperrte Großbuchstaben, Kapitälchen.
- **Wo:** Ozeannamen auf der Karte („INDISCHER OZEAN“), Versalabkürzungen im Lauftext (AIESEC, UdSSR, USA, CTO, DSGVO).
- **Warum es bleibt:** Die Sperrung der Ozeane ist Kartenschrift und zeigt die Ausdehnung der Fläche. Kapitälchen für Abkürzungen sind Buchsatz nach Bringhurst. Es gibt kein Label, keine Rubrik und keinen Namen in Kapitälchen.

### Rang 52, nah: gezeichneter Gegenstand

- **Was:** Buchrücken und der Manuskriptstapel als Umriss.
- **Wo:** Bibliothek.
- **Warum es bleibt:** Datenzeichnung aus Blattzahl, Seitenzahl und Bindung, ohne Textur, ohne Schatten, ohne Buchstützen und Schilder. Das Manuskript ist das einzige eigene Werk im Regal, weil nur von ihm ein Manuskript bekannt ist.
- **Was es ablösen könnte:** ein Foto des echten Manuskripts.

### Rang 57, nah: Schraffur

- **Was:** 45°-Schraffur der bereisten Länder.
- **Wo:** Karte Reisen auf der Startseite, Seite Länder.
- **Warum es bleibt:** Einfarbiger thematischer Druck mit Bedeutung, wie auf gedruckten Karten. Keine simulierte Handarbeit, keine Körnung.

### Rang 19, nah: Blau

- **Was:** eine zweite Farbe.
- **Wo:** nur auf den Karten, für Wasser, Küste, Flüsse, Gradnetz und Gewässernamen.
- **Warum es bleibt:** Es ist die zweite Druckplatte jeder topografischen Karte. Blau tritt nie in Text, Verweisen oder Bedienung auf und markiert nichts als „wichtig“.

### Rang 46: Deutsche Sonderfälle, teilweise

- **Was:** englische Titel in einer deutschen Bibliothek.
- **Wo:** Buchrücken und Buchzeilen übersetzter Werke, die nicht zuerst auf Deutsch erschienen sind (*Crime and Punishment*, *The Nicomachean Ethics*).
- **Warum es bleibt:** Es sind die Titel der Ausgaben, die Dominik gelesen hat (Penguin, Vintage, NYRB). Deutsche Originale stehen jetzt deutsch, die Namen in deutscher Form. Ob er die deutschen Originale auf Deutsch gelesen hat, ist seine Frage 21.10.

### Rang 42 und 60: Schablone des Exposés, Buchkonventionen

- **Was:** Gliederung nach dem Exposé für Verlage, ein Kolophon.
- **Wo:** *Satoshi* (Klappentext, Eckdaten, Aufbau, Die Figuren, Warum dieser Roman), Kolophon im Impressum.
- **Warum es bleibt:** Die Gliederung ist Dominiks eigene aus dem Exposé, und die Seite richtet sich auch an Verlage. Die Überschrift „Vergleichstitel“ ist entfallen, Dominiks Satz steht in den Eckdaten. Das Kolophon hat Dominik gewünscht. Es ist jetzt eine Quellenangabe an einer Stelle statt eines Fußes auf elf Seiten.

### Rang 16, 17, 32, 34, 36, 37, 58: Textmerkmale in Dominiks Texten

- **Was:** Dreierreihen („zwischen zwei Männern, zwei Kontinenten und zwei Leben“), „Nicht ein einzelner Skandal, sondern …“, Doppelpunkt („Die oberste Regel:“, „wo der Pakt sein Pseudonym bekommt: Satoshi Nakamoto“), Halbgeviertstriche als Einschub, zwei Semikolons auf *Satoshi*, eines in der Vita.
- **Wo:** Klappentext, Figuren, „Warum dieser Roman“, Vita, die Szene in Kobe.
- **Warum es bleibt:** Es sind Dominiks Texte, Wort für Wort aus Exposé und Vita. Die Website ändert sie nicht. Vorschläge bekommt er getrennt.

### Rang 35, Rest: wiederholte Formeln

- **Was:** dieselbe Wendung auf mehreren Seiten.
- **Wo:** „Werkstattbühne“ in der Kurzvita, auf der (noch nicht verlinkten) Seite Erzählungen und in Dominiks Vita. „Gründungslegende von Bitcoin“ im Klappentext und in der Vita, beides Dominiks Text.
- **Warum es bleibt:** Jede Seite nennt es einmal und in anderen Worten, wo der Text von Claude stammt. In Dominiks Texten bleibt es stehen.

### Rang 61: Wechsel der Erzählperson

- **Was:** „ich“ neben „er“.
- **Wo:** Datenschutz in der ersten Person, alle anderen Seiten in der dritten.
- **Warum es bleibt:** Die Datenschutzerklärung spricht als Verantwortlicher, so verlangt es die Form. Die Bibliothek spricht jetzt wie der Rest in der dritten Person.

### Rang 68: Fingerabdrücke von Generatoren, nah

- **Was:** Spuren des Werkzeugs.
- **Wo:** Im Datenschutz der Hinweis auf claude.ai und Anthropic als Hoster.
- **Warum es bleibt:** In der Testphase ist er wahr und rechtlich nötig. Vor dem Start wird er durch den echten Hoster ersetzt. Kommentare und Werkzeuge werden nicht mehr ausgeliefert.

### Rang 15 und 66: Code-Reflexe und Werkszustand

- **Was:** `text-wrap: pretty` und `balance`, `clamp()`, `svh`, die Bildlaufleiste im Werkszustand.
- **Wo:** nur im Stylesheet, unsichtbar.
- **Warum es bleibt:** Es sind gewöhnliche Werkzeuge, die die Seite besser setzen. Die Bildlaufleiste bleibt absichtlich, wie sie ist. Textauswahl, Eingabemarke und Fokus sind gestaltet.

### Rang 23: Nummern

- **Was:** „Band I, II, III“.
- **Warum es bleibt:** Eine echte Reihe. Es gibt keine 01/02/03.

### Rang 38: Zählung als Satz

- **Was:** „Fünfundsechzig Länder und Gebiete, einunddreißig in Europa, neunzehn in Asien, elf in Afrika und vier in Amerika.“
- **Wo:** Legende der Karte Reisen auf der Startseite.
- **Warum es bleibt:** Ein Satz statt Kacheln mit großen Zahlen, ausgeschrieben, an einer Stelle. Die Kontinente sind Steuerwörter, mit denen man die Kugel dorthin dreht.

---

## 3. Merkmale je Bildschirm

Gezählt im ersten Bildschirm bei 1440 × 900 und 390 × 844, nach dieser Runde. Die Spalte „B vorher“ ist die Zählung der Prüfung „KI-Merkmale“.

| Bildschirm | B jetzt | B vorher | A |
|---|---|---|---:|
| Startseite, Desktop | 7, 9, 27, 51 (14 schwach, gespiegelt): **4** | 10 | 17 |
| Startseite, Telefon | 9: **1** | 4 | 13 |
| *Satoshi*, Desktop | 9, 27, 51, 56: **4** | 9 | 12 |
| *Ursprung*, Desktop | 9, 27, 51, 56: **4** | 9 | 13 |
| Vita, Desktop | 9: **1** | 3–4 | 11 |
| Bibliothek, Desktop | 9, 51, 52 nah, 56, 46 teilweise: **4–5** | 6 | 11 |
| Länder, Desktop | 1 (Ozeane), 9, 26 (Äquator), 27, 51: **5** | 5 | 8 |
| Erzählungen, *Untertext*, Lesen | 9: **1** | 3 | 3 |
| Impressum, Datenschutz | 9, 60, 68 nah: **3** | 4–5 | – |

Das Ziel von höchstens vier Merkmalen je Bildschirm erreichen alle Seiten außer Länder (fünf, davon zwei reine Kartenschrift) und knapp die Bibliothek.

---

## 4. Was nur Dominik lösen kann

Die Prüfung warnt zu Recht: Auch Version B folgt einer Gegenliste, und der Rat gegen den alten Standard kann einen neuen erzeugen (weißer Grund, Tinte, eine Buchschrift, ein Rahmen). Das lässt sich mit Gestaltung allein nicht ganz lösen. Es braucht Material, das nur Dominik hat:

1. **Fotos:** vom Manuskriptstapel, von der Rubbelkarte, von Lesungen, mit Namen der Fotografin oder des Fotografen (für das Bootsfoto fehlt er noch).
2. **Die Rubbelkarte** als Scan für die Seite Länder.
3. **Eine Leseprobe** aus *Satoshi*, etwa die erste Seite.
4. **Lesetermine**, sobald es welche gibt.
5. **Fünf Websites von Autorinnen und Autoren** für den Silhouettentest.

---

## 5. Was Dominik entscheiden muss

Neu aus dieser Runde, dazu die offenen Fragen 21.1 bis 21.12 der Regeln:

1. Ob die Startseite ohne Chronik ruhig stehen darf. A behält die Chronik.
2. Ob ihm die gespiegelte Startseite gefällt, Karte links und Text rechts.
3. Die neuen Szenentexte auf *Satoshi* (aus seinem Exposé gebaut) und ob Bariloche und Penang so stehen dürfen, ohne zu viel zu verraten.
4. Ob das Zeitband in der Bibliothek fehlen darf.
5. Ob die deutschen Originaltitel stimmen und ob er diese Bücher auf Deutsch gelesen hat (21.10). Die Liste steht in `website-b/seite.js` unter `ORIGINAL`.
6. Die neuen Mikrotexte: Inhaltsverzeichnis, Vorspann von *Ursprung* und Bibliothek, Legenden der Wohnorte, Satz der Seite Erzählungen, Beschreibungen der Seiten.
7. Ob *Kreise ohne Wiederkehr* ins Regal darf. Das Exposé nennt 417 Normseiten, fertiggestellt, die Website sagt bisher für die ganze Trilogie „in Arbeit“.

---

## 6. Geprüft

- Alle elf Seiten über `http://` und `file://`, bei 1440 × 900 und 390 × 844, einzelne Seiten zusätzlich bei 1280 × 800, 1920 × 1080 und 1024 × 768.
- Keine Konsolenfehler, keine Anfrage an fremde Server, kein waagerechtes Scrollen.
- Eine Textfarbe (#141414), drei Grade je Breite, eine Familie, Kursive nur bei Werktiteln, kein `transition`, kein `@keyframes`, kein Schatten, kein Radius außer der Kugel.
- Tastatur in Bibliothek, Kartenwahl und Karte, reduzierte Bewegung, ohne Skript, sehr kleine Tafel.
- Der Bau entfernt alle Kommentare, die Syntaxbäume der 31 Skripte sind unverändert.

Die Skripte und Bildschirmfotos liegen in `scratchpad/kb-korrektur/`.
