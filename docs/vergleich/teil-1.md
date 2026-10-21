## Teil 1: Schrift und Satz

Dieser Teil vergleicht, wie A und B Text setzen: Schrift, erster Satz, graue Kursive, Kapitälchen, Textfarben, Schriftgrößen und Unterstreichung. Die Rangnummern beziehen sich auf `docs/ki-merkmale.md`.

So sind die Bilder entstanden: Beide Fassungen liefen über einen eigenen kleinen Server und wurden mit Playwright (ein ferngesteuerter Chrome) bei 1440 × 900 Pixeln geöffnet. Ausschnitte von Schrift sind mit doppelter Pixeldichte aufgenommen, damit man die Buchstaben genau sieht. Von A zeige ich jeweils den Zustand nach dem Ende der Einflug-Animation, also etwa viereinhalb Sekunden nach dem Laden, nicht den Zustand mit reduzierter Bewegung. B wird gerade noch auf den Wortlaut von A zurückgesetzt. Die Bilder zeigen B am 21. Oktober 2026 gegen 1:30 Uhr. Alle Zahlen habe ich im Browser gemessen und am Quelltext geprüft. Wo sie von der Prüfung vom 20. Oktober (`docs/pruefung-website.md`) leicht abweichen, liegt das am inzwischen geänderten Stand.

### 01. Schriftfamilie

![A: Vita, Seitentitel und Lesetext in Vollkorn, der erste Satz in IM Fell French Canon](vergleich/01-schrift-a.jpg)
![B: Vita, alles in Baskervville](vergleich/01-schrift-b.jpg)
![A: Schriftprobe, Vollkorn normal und kursiv, Vollkorn SC, IM Fell French Canon](vergleich/01-schrift-a2.jpg)
![B: Schriftprobe, Baskervville normal, kursiv, Kapitälchen und halbfett](vergleich/01-schrift-b2.jpg)

Die beiden Schriftproben habe ich groß in die jeweilige Seite gesetzt, mit den Schriftdateien, die die Fassung wirklich lädt. Sie gehören nicht zur Website, sie zeigen nur die Buchstaben deutlicher.

**Vorher (A).** A setzt allen Text in der Vollkorn von Friedrich Althausen, einer Serifenschrift (Serifen sind die kleinen Füßchen und Abschlüsse an den Buchstabenenden), Lesetext in 19 px. Die Vollkorn ist kräftig und gleichmäßig, dicke und dünne Striche unterscheiden sich wenig. Für Kapitälchen (Großbuchstaben in der Höhe der Kleinbuchstaben) lädt A eine zweite Familie, die Vollkorn SC, und für den ersten Satz eine dritte, die IM Fell French Canon. Alle drei holt der Browser per `<link>` von Google Fonts, auf allen elf Seiten. Dabei geht die IP-Adresse jedes Besuchers an Google, die Datenschutzerklärung von A erklärt das in einem eigenen Abschnitt.

**Nachher (B).** B setzt alles in der Baskervville des Atelier National de Recherche Typographique (ANRT) in Nancy, einer Neuzeichnung der Baskerville, die John Baskerville um 1757 in Birmingham geschnitten hat. Es ist eine einzige Familie für Text, Überschriften, Navigation und Kartenschrift, Lesetext in 20 px. Kapitälchen, Mediävalziffern (Ziffern mit Ober- und Unterlängen wie Kleinbuchstaben) und Ligaturen stecken in derselben Datei. Die Schrift hat mehr Kontrast im Strich als die Vollkorn, feinere Haarstriche und eine geschwungenere Kursive. B liefert die Schrift selbst aus: zwei WOFF2-Dateien (das übliche Dateiformat für Webschriften) mit 58 und 50 KB im Ordner `schrift/`. Beim Laden geht keine Anfrage an einen fremden Server, das habe ich im Browser geprüft.

**Warum.** Der Grund ist Rang 9, „Serife als Abkürzung zu ‚literarisch‘“, dazu Rang 31 (Schriften aus dem „geschmackvollen“ Gratisvorrat) und Rang 48 (Google Fonts per Link).

Warum greift eine KI bei einem Schriftsteller so oft zur Serife? Die Quellen nennen drei Ursachen.

1. Das Lernmaterial. Bücher, Verlage und Feuilletons sind in Serifenschriften gesetzt. Fragt man ein Sprachmodell nach einer Seite für einen Autor, liefert es die statistisch naheliegendste Antwort. Der Katalog impeccable hat das bei Claude als festen Hang gemessen: Bücher-, Familien- und Kinderthemen enden bei Cremegrund, großer Serife mit kursiven Akzenten und Lampenlicht, „even when the assigned direction never asked for them“.
2. Anthropics eigener Rat. Anthropics Rezeptsammlung (Cookbook) vom Oktober 2025 empfahl Fraunces, Playfair, Crimson Pro und Newsreader. Der Gestaltungsleitfaden für Claude vom Juni 2026 verlangte „a characterful display face that’s used with restraint“, also eine Charakterschrift, sparsam eingesetzt. Der Leitfaden zu Opus 4.8 nennt „serif display type (Georgia, Fraunces, Playfair)“ ausdrücklich als Claudes Hausstil. Die Liste nennt diese dritte Welle den literarischen Look: Er ist zum Teil aus dem Rat gegen den alten Look entstanden.
3. Die Serife als Zeichen für „menschlich“. WIRED nennt die Welle „tasteslop“: KI-Firmen und Claude selbst nutzen Serifen, um warm und menschlich zu wirken. Anthropics eigene Marke ist nach einer Rekonstruktion von VoltAgent in den Serifenschriften Tiempos und Copernicus gesetzt. Auf Hacker News heißt es: „Claude loves generating websites with a particular style of serif font“.

Die Vollkorn selbst ist dabei kein starkes Zeichen. Sie steht auf keiner der geprüften Listen, und der Schriftsteller Robin Sloan setzt seine erzählenden Texte in Vollkorn. Verräterisch ist in A die Kombination. Zur Serife kommt eine Charakterschrift, die nur eine einzige Zeile trägt (IM Fell, siehe 02). Rang 9 beschreibt genau das als eigenes Muster, und IM Fell steht in Hallmarks Rezept „Almanac“ („warm parchment paper, IM Fell roman-serif display“). Dazu kommen die Kapitälchen als Überschriften (Rang 1, siehe 04) und die Kursive als Nebenstimme (Rang 24, siehe 03). Bei einer Autorenseite fällt das besonders auf, weil sie genau das Thema ist, bei dem Claude von selbst zu diesem Paket greift.

Was macht die Baskervville anders? Ehrlich gesagt: Sie ist auch eine Serife, Rang 9 bleibt. B führt das in den Regeln (Abschnitt 18) selbst als „bewusst KI-typisch“. Der Unterschied liegt im Gebrauch und in der Seltenheit:

- Eine Familie, keine Display-Schrift (eine Schrift nur für große Zeilen), keine Zweitfamilie für Kapitälchen.
- Modelle wählen sie selten. In den 300 Probeseiten der Design Creativity Bench (15 Modelle mit je 20 Seiten) kommt Baskerville einmal vor, bei Opus 5.5 nie. Georgia steht auf 79 dieser Seiten, Iowan Old Style auf 51.
- Sie passt zum Leitbild von B, dem Atlasblatt. Kupferstichkarten des 18. und 19. Jahrhunderts sind in solchen Schriften beschriftet. Das ist allgemeines Wissen, die Regeln von B sagen selbst, dass es nicht eigens belegt ist.
- Selbst ausgeliefert hat sie alle OpenType-Funktionen (Zusatzfunktionen in der Schriftdatei, etwa Kapitälchen oder besondere Ziffern). Die Fassung, die Google ausliefert, hat sie nicht. Das gilt auch für die Vollkorn: In der von Google gelieferten Datei (Version 5.001) fehlt die Funktion für Kapitälchen, das habe ich mit fontTools geprüft. Deshalb braucht A die Vollkorn SC als zweite Familie.

Das Selbstausliefern hat außerdem einen rechtlichen Grund, der mit KI nichts zu tun hat. Das Landgericht München I hat am 20. Januar 2022 (Az. 3 O 17493/20) die Einbindung von Google Fonts ohne Einwilligung als Verletzung des Persönlichkeitsrechts gewertet und 100 € Schadensersatz zugesprochen, danach kam eine Abmahnwelle. Für Leser ist Rang 48 unsichtbar, im Quelltext sieht man ihn sofort.

**Vorteile.**
- Eine Schrift statt drei ergibt einen gleichmäßigen Grauwert, also eine Textfläche, die aus der Entfernung gleich dunkel wirkt.
- Die Baskervville ist eine seltene Wahl, ein Leser mit Erfahrung in KI-Seiten erkennt sie nicht als Standard.
- Ohne Anfrage an Google wird die Datenschutzerklärung kürzer und die Seite rechtlich sicherer. Sie lädt auch schneller, weil keine fremde Verbindung aufgebaut werden muss.
- Kapitälchen für Abkürzungen im Lauftext kommen aus derselben Datei. B setzt „AIESEC“, „UdSSR“ und „USA“ so, A schreibt sie in vollen Großbuchstaben.

**Nachteile und Risiken.**
- Die Schrift prägt die Anmutung mehr als jedes andere Element. Die Vollkorn ist wärmer, kräftiger und weicher. Die Baskervville wirkt feiner, aber auch kühler und auf dem Bildschirm in 16 px etwas blass. Wenn Dominik „Look und Feel“ von A lieber mag, ist die Schrift vermutlich ein großer Teil davon.
- Die Baskervville hat kein Griechisch, die Vollkorn hat es. Sollen später Verse aus der Ilias im Original erscheinen, braucht B eine zweite Schrift für griechische Zeichen. Vorgeschlagen ist GFS Didot, das ist noch nicht geprüft.
- Rang 9 bleibt in beiden Fassungen. Der Abstand zum KI-Profil ist ein Grad, keine Grundsatzfrage.
- Selbst ausgelieferte Schriften pflegt man selbst. B hat die Antiqua um Zeichen für Minute und Sekunde ergänzt. Das ist eine Änderung nach der Lizenz (SIL Open Font License) und muss im Kolophon stehen. Das Minutenzeichen sieht in der Baskervville außerdem aus wie ein gerader Schreibmaschinen-Apostroph („52° 31' N“).

**Verworfene Alternativen.** Die Richtung Atlas hatte Libertinus vorgeschlagen. Sie erinnert an Wikipedia und Fachbuch, und die Fassung von Fontsource hat keine Ligaturen, keine Mediävalziffern und keine Kapitälchen. Die Richtung Werkstatt hatte Piazzolla, robust, aber nicht elegant. Unter acht Kandidaten im Probedruck der Richtung Verlag war die Baskervville die eleganteste. Alle Schriften der Listen unter Rang 31 (Fraunces, Playfair, Cormorant, Lora, Crimson, Newsreader, EB Garamond) schieden von vornherein aus. Die Prüfung von A hatte noch etwas anderes empfohlen: die Vollkorn behalten, weil sie auf keiner Liste steht und mit Robin Sloan ein Vorbild hat, und sie nur selbst ausliefern. Möglich wäre auch eine Groteske (eine Schrift ohne Serifen) für alles Funktionale neben der Buchschrift, wie bei der Paris Review. B wollte bewusst nur eine Familie.

**Sicherheit.** Geschmack für die Schrift selbst, weil die Vollkorn auf keiner Liste steht und beide Fassungen bei Rang 9 bleiben. Hoch für das Selbstausliefern, weil es rechtlich und technisch eindeutig besser ist.

**Für die Mischfassung.** Mittelweg: die Vollkorn behalten und selbst ausliefern. Sie trägt viel von der Anmutung, die Dominik an A mag, und sie ist für sich kein KI-Zeichen. Konkret: Vollkorn als WOFF2 in einen Ordner `schrift/` legen, den `<link>` zu Google auf allen elf Seiten entfernen, Lizenz und Gestalter im Kolophon nennen, den Abschnitt zu Google Fonts aus der Datenschutzerklärung streichen. Die IM Fell entfällt (siehe 02). Die Vollkorn SC braucht es nur noch, wenn Kapitälchen bleiben (siehe 04). Vorher prüfen, ob die vollständige Vollkorn aus dem Archiv des Gestalters die Kapitälchen als OpenType-Funktion enthält. Dann reicht eine Datei für alles, wie in B.

### 02. Der erste Satz

![A: der erste Satz nach dem Ende des Einflugs, darunter die Kurzvita](vergleich/02-erster-satz-a.jpg)
![A: drei Momente des Einflugs, 0,3, 0,7 und 1,15 Sekunden nach dem Start](vergleich/02-erster-satz-a2.jpg)
![B: der erste Satz steht beim Laden da, darunter die Kurzvita](vergleich/02-erster-satz-b.jpg)

Für die Momentaufnahmen habe ich die Animationen von A im Browser angehalten und auf die genannte Zeit gestellt. Das letzte Bild zeigt den Stand nach dem Ende der Animation.

**Vorher (A).** Der Satz „Dominik Jäkel schreibt tagsüber / unter fremden Namen / und abends unter seinem eigenen.“ steht in der IM Fell French Canon, 30,9 px, Graphit, in drei Zeilen. Die IM Fell ist Igino Marinis Nachzeichnung von Lettern aus Oxford aus dem 17. Jahrhundert, mit sichtbarem Abdruck von Blei und Tinte. Beim Laden bleibt der Platz leer, bis die Schriften da sind (höchstens 2,5 Sekunden). Dann gleitet jedes der zwölf Wörter einzeln 0,3 em von rechts herein, je 640 ms, 80 ms nach dem vorigen Wort und mit 230 ms Pause zwischen den Zeilen. Dazu kommt eine waagrechte Bewegungsunschärfe (die Buchstaben verwischen in Flugrichtung und werden beim Ankommen scharf). Nach etwa 1,8 Sekunden steht der Satz, erst dann beginnt die Chronik auf dem Globus. Wer im System „Bewegung reduzieren“ eingestellt hat (`prefers-reduced-motion`), sieht den Satz sofort. Auf der Vita steht derselbe Satz ohne Bewegung in IM Fell. Dominik hat den einfliegenden Einstieg selbst festgelegt (Commit e65dc13, „Einstieg einfliegend festgelegt“).

**Nachher (B).** Der Satz ist die Hauptüberschrift der Startseite (`h1`) in der Baskervville, 30 px, in Tinte, mit demselben Zeilenfall in drei Gliedern. Er steht beim Laden vollständig da. Es gibt keinen Einflug, keine Staffel, keine Unschärfe, keine zweite Schrift und kein Skript dafür. Auf dem Telefon fließt er frei und wird ausgeglichen umbrochen. Auf der Vita steht er in B im normalen Textgrad.

**Warum.** Rang 25, „Inszenierter Ladeauftritt“, dazu Rang 9 und Rang 31. Der Einflug ist fast wörtlich das Rezept aus Anthropics eigenem Rat von 2025: „one well-orchestrated page load with staggered reveals (animation-delay)“, also ein gut inszeniertes Laden der Seite mit gestaffeltem Erscheinen. Der heutige Gestaltungsleitfaden spricht noch von einem einzigen inszenierten Moment, warnt aber vor solchen Einblendungen. Die IM Fell steht in Hallmarks Rezept „Almanac“, und eine Charakterschrift für eine einzige Zeile beschreibt Rang 9 als eigenes Muster. Die Prüfung von A hat dieses Element als „stark“ eingestuft.

Bei einem Autor fällt es auf, weil es das Erste ist, was ein Besucher sieht, und weil es den besten Satz der Seite zur Vorführung macht. Dazu kommen zwei technische Gründe: Auf langsamen Verbindungen steht zuerst eine leere Fläche, und die Chronik wartet auf das Ende des Einflugs.

**Vorteile.**
- Der Satz ist sofort lesbar, auch bei langsamer Verbindung und ohne JavaScript.
- Eine Schrift weniger, also eine Anfrage weniger und kein Skript mit rund 160 Zeilen für einen Satz.
- Der Satz wirkt als Satz eines Schriftstellers und nicht als Effekt. Er trägt ohne Bewegung.
- Die eine Bewegung, die der Seite bleibt, ist die mit Inhalt: die Karte.

**Nachteile und Risiken.**
- Der Überraschungsmoment geht verloren, und mit ihm das Bild vom Setzer, der Lettern in den Winkelhaken schiebt. Dominik hat genau diesen Einstieg gewählt.
- Die IM Fell hat einen gedruckten, leicht unregelmäßigen Charakter, den keine Textschrift hat. Ohne sie ist der Satz weniger besonders.
- In der Baskervville wirkt der Satz bei 30 px leichter und kühler als in der IM Fell.

**Verworfene Alternativen.** Die Prüfung hatte als Zwischenlösung vorgeschlagen, dass der ganze Satz in 200 ms ohne Unschärfe und ohne Staffel erscheint. Das schwächt das Merkmal, beseitigt es aber nicht. Eine zweite Möglichkeit wäre der stehende Satz in IM Fell: Dann fällt Rang 25 weg, Rang 9 und 31 bleiben. B hat beides nicht gewählt, weil B grundsätzlich keine zweite Schrift und keinen Ladeauftritt haben sollte.

**Sicherheit.** Hoch für die Bewegung, weil sie das Rezept aus Anthropics eigenem Rat ist und die Quellen sich einig sind. Für die IM Fell als ruhende Schrift: mittel.

**Für die Mischfassung.** Aus B übernehmen, dass der Satz beim Laden steht. Die Schrift dafür sollte aber die Vollkorn von A sein, in rund 1,5 bis 1,625 em in Graphit, mit dem bisherigen Zeilenfall in drei Gliedern. So bleibt die Anmutung von A, und das stärkste Einzelmerkmal des ersten Bildschirms fällt weg. Die Chronik beginnt dann sofort. Hängt Dominik an der IM Fell, ist sie stehend das kleinere Übel als der Flug. Der Flug selbst sollte in jedem Fall entfallen. Das entscheidet Dominik, weil er den Einflug festgelegt hat.

### 03. Graue Kursive für Beschriftungen, Koordinaten, Notizen und Bildunterschriften

![A: erster Bildschirm der Startseite, Berlin in der Stationenzeile gewählt](vergleich/03-graue-kursive-a.jpg)
![B: Startseite, 92 px gescrollt, damit die Stationenzeile im Bild ist](vergleich/03-graue-kursive-b.jpg)
![A: Vita, Stationen mit Koordinaten](vergleich/03-graue-kursive-a2.jpg)
![B: Vita, Stationen mit Koordinaten](vergleich/03-graue-kursive-b2.jpg)
![A: Regalbild der Startseite mit Bildlegende](vergleich/03-graue-kursive-a3.jpg)
![B: Regalbild der Startseite mit Bildlegende](vergleich/03-graue-kursive-b3.jpg)

In A habe ich auf der Startseite „Berlin 2022“ angeklickt, damit beide Tafeln Berlin zeigen. B steht beim Laden auf Berlin.

**Vorher (A).** Neben dem Lesetext läuft in A eine zweite, leise Stimme, die zugleich kleiner, grau und kursiv ist. Auf der Startseite:
- Die Stationenzeile „Dortmund bis 2014 – Freiburg 2014 – …“ steht kursiv in 17,8 px und #6B6D72. Die Nebenorte (Colombo, Cotonou, Mallorca) sind noch kleiner (15,3 px) und heller (#7C7E83), die Striche dazwischen noch heller (#96989C).
- Auf der Tafel unter dem Globus stehen „bis“ kursiv und grau, der Ortsname kursiv, „wohnort“ in grauen Kapitälchen, der Satz darunter grau.
- Die Ortsnamen auf dem Globus selbst sind kursiv.
- Die Bildlegende unter dem Regalbild ist kursiv und grau, ebenso die Jahreszahlen und Reihennamen am Zeitband.

Auf der Vita stehen die Koordinaten jeder Station kursiv und grau, bei den Nebenorten zusätzlich kleiner und heller. Auf *Satoshi* sind die Kapiteltage grau und kursiv. Gemessen sind im ersten Bildschirm der Startseite 15 % aller sichtbaren Zeichen grau und kursiv zugleich, auf dem Telefon 16 %, auf der Vita 15 %. Ohne die kursiven Werktitel der Navigation sind es auf der Startseite rund 12 %.

**Nachher (B).** B hat eine feste Regel: pro Textebene genau ein Unterscheidungsmittel. Nebentexte sind eine Stufe kleiner (16 statt 20 px) und sonst nichts. Sie stehen aufrecht, in derselben Tinte und derselben Schrift wie der Text. Was sie vom Text unterscheidet, ist ihre Stellung direkt unter oder neben dem Gegenstand, den sie erklären. Ortsnamen stehen überall aufrecht, auch auf der Karte. Kursiv ist nur für Werktitel, fremdsprachige Wörter und Zitate. Seit dem Textabgleich mit A stehen auch in B wieder Koordinaten auf der Tafel und in der Vita, aber aufrecht und in Tinte. Gemessen: 0 % graue Zeichen auf allen geprüften Seiten, kursiv stehen nur Werktitel.

**Warum.** Das ist das Merkmal, das Dominiks Freund genannt hat, und er hat recht. Es steht in der Liste auf Rang 24, „Graue Kursive als zweite Stimme“. Kein Katalog führt „graue kursive Schrift“ wörtlich, auch eine gezielte Suche fand nichts. Das Merkmal setzt sich aber aus vier gut belegten Merkmalen zusammen, und erst ihr Zusammentreffen ergibt das Bild, das der Freund gesehen hat.

- **Rang 8, Kursive als Dekor.** Anthropic nennt „italic word-accents“ als Hausstil von Opus 4.8 und rät für Opus 5.5, kursive Akzentwörter ausdrücklich zu verbieten. Hallmark nennt die Kursive „among the most reliable AI tells“. A hat kein kursives Akzentwort in Überschriften. Aber A setzt die Kursive für Ortsnamen, Daten und Legenden, also für Nebensachen. Im Buchsatz ist die Kursive für Werktitel, Fremdwörter und Betonung da.
- **Rang 11, Grauer Nebentext.** Fast jedes generierte Layout bringt eine Farbe „muted“ oder „secondary“ mit. In der verbreiteten Komponentensammlung shadcn/ui steht unter jeder Kartenüberschrift wörtlich `text-sm text-muted-foreground`, also klein und grau. Der Katalog avoid-ai-design nennt gedämpften Text unter dem Mindestkontrast „a systematic generated failure“, taste-skill sagt: „A page set in soft grey reads unfinished“. In A liegen drei Grautöne unter dem Mindestkontrast (siehe 05).
- **Rang 3, Metazeilen.** Claude setzt auf 20 von 20 Probeseiten Zeilen wie „Roman · 2024 · 320 Seiten“. A hat keine Mittelpunkte. Die Stationenzeile ist aber dieselbe Form mit Strichen statt Punkten.
- **Rang 26, Mikro-Metadaten als Schmuck.** Koordinaten, Luftlinie, Signaturen. taste-skill verbietet „Agency micro-meta: local time, coordinates, weather, version stamps“. Die Liste beschreibt sie als „meist klein, grau, kursiv oder in Mono“.

Warum steht das Gesamtbild auf Rang 24 und nicht weiter oben? Die vier Teile sind einzeln sehr häufig oder häufig. Ihr Zusammentreffen als eigene Stimme hat aber niemand gezählt, die Einordnung „häufig“ ist eine Einschätzung aus Anthropics Leitfäden, Chayka und impeccable. Auf Produktseiten ist sie selten: Opus 5.5 hat dort nur auf 2 von 20 Seiten eine Regel für graue Kursive. Bei Buch- und Editorialthemen ist sie dagegen häufig. Die Liste erklärt auch, warum: Der Leitfaden für Claude vom Juni 2026 verlangte „a utility face for captions or data if needed“, eine Hilfsschrift für Legenden und Daten. Bei technischen Themen wird daraus Monospace (Rang 13), bei Buchthemen graue Kursive. Die graue Kursive ist also das literarische Gegenstück zur Schreibmaschinenschrift auf Technikseiten.

Warum wirkt das nach KI und nicht nach Buch? Matthew Butterick rät, nie zwei Auszeichnungen zugleich zu verwenden und jede so sparsam wie möglich. A verwendet drei Mittel (kleiner, grau, kursiv) für dieselbe Nachricht, nämlich „das ist Nebensache“. Das wirkt wie Ornament. Hallmark erlaubt Kursive nur im Fließtext und verbietet „italic captions“, kursive Bildlegenden. Im gedruckten Buch gibt es gar keinen grauen Text.

Dazu kommt ein Befund aus diesem Projekt. Die frühen Notizen haben genau dieses Mittel empfohlen: Koordinaten „kursiv in Grau“ (recherche-design.md), Orte „als kursive Marginalie“ und die Stationenzeile kursiv nach Joyce (synthese.md). Diese Notizen stammen vom selben Modell. So beschreiben die Kataloge die dritte Welle: Der Rat gegen den alten Standard erzeugt den neuen.

Bei einem Schriftsteller fällt es besonders auf, weil Leser einer Autorenseite genau lesen und weil die zweite Stimme im ersten Bildschirm steht. Jede Stelle für sich ist sauberer Buchsatz, erst die Häufung macht die Signatur.

**Vorteile.**
- Das Merkmal, das ein Leser von außen bemerkt hat, verschwindet vollständig.
- Alles ist gut lesbar. Jeder Text in B hat einen Kontrast von 18,4 : 1, in A liegen Nebenorte, Striche und Leselistentitel unter dem Mindestwert.
- Die Kursive bekommt ihre Bedeutung zurück. Wenn nur Werktitel kursiv sind, sieht man *Satoshi* und *Ursprung* sofort.
- Die Regel ist einfach und lässt sich prüfen: ein Mittel pro Ebene.

**Nachteile und Risiken.**
- Die graue Kursive gibt A viel von seiner Weichheit und von dem Gefühl einer Buchklappe. Mit allem in einer Tinte wirkt die Seite dichter und etwas härter.
- Legenden in voller Tinte konkurrieren stärker mit dem Text. Die Abstufung muss dann ganz aus Größe und Abstand kommen, und das verlangt sorgfältige Abstände.
- Koordinaten in Tinte ziehen mehr Blick auf sich als in Grau. Wenn sie bleiben, werden sie wichtiger, als sie sind. B hatte sie deshalb ursprünglich ganz gestrichen, der Textabgleich hat sie zurückgebracht.
- Die Stationenzeile verliert mit der Kursive den Anklang an Joyces Unterschriftzeile, der in A gewollt war.

**Verworfene Alternativen.** Nur das Grau entfernen und die Kursive behalten hätte Rang 8 gelassen. Nur die Kursive entfernen und das Grau behalten hätte Rang 11 gelassen. Die Prüfung hatte vorgeschlagen, die Stationenzeile ganz zu streichen, weil die Kurzvita die Orte schon nennt, oder sie einmal ans Ende der Vita zu setzen, aufrecht, als Unterschrift in Joyces Form. Die Regeln von B haben sie gestrichen, der Textabgleich mit A hat sie wieder eingesetzt, jetzt aufrecht. Daten in Monospace kamen nie in Frage, das wäre Rang 13.

**Sicherheit.** Hoch. Jeder der vier Bausteine ist gut belegt, die Messung ist eindeutig, und ein Leser ohne Kenntnis der Liste hat das Merkmal von selbst bemerkt.

**Für die Mischfassung.** Mittelweg: die Regel aus B in die Gestalt von A übernehmen. Die Vollkorn, das Papierweiß und der Aufbau bleiben, nur die zweite Stimme verschwindet. Konkret:
- Legenden, Tafel, Stationenzeile und Koordinaten aufrecht in Graphit, eine Stufe kleiner als der Text (der Grad „klein“ aus 06), unterschieden durch ihre Stellung.
- Nebenorte nicht kleiner und nicht heller. „längerer Aufenthalt“ steht schon als Wort da.
- Ortsnamen aufrecht, auch auf dem Globus (in `seite.js` steht dafür `italic 15px "Vollkorn"`).
- Kursiv nur für Werktitel, Fremdwörter und Zitate.
- Ein einziges Grau bleibt für einen echten Zustand, etwa das nicht verfügbare „früher“, mit mindestens 4,5 : 1.
- Koordinaten nur auf der Tafel neben dem Globus, in der Vita streichen, dort gibt es keine Karte.

So behält A seinen Ton und verliert das Merkmal, das der Freund gesehen hat. Das ist nach meiner Einschätzung die wirksamste einzelne Änderung in diesem Teil.

### 04. Kapitälchen-Labels, gesperrter Name, Figurennamen und Kontinente

![A: Briefkopf mit gesperrtem Namen in Kapitälchen, darunter die Abschnittsüberschrift „was ich schreibe“](vergleich/04-kapitaelchen-a.jpg)
![B: Briefkopf ohne Sperrung, darunter die Abschnittsüberschrift halbfett](vergleich/04-kapitaelchen-b.jpg)
![A: Satoshi, „die figuren“ und Figurennamen in Kapitälchen](vergleich/04-kapitaelchen-a2.jpg)
![B: Satoshi, „Die Figuren“ und Figurennamen halbfett](vergleich/04-kapitaelchen-b2.jpg)
![A: Länder, Kontinente als Kapitälchen am Zeilenanfang](vergleich/04-kapitaelchen-a3.jpg)
![B: Länder, Kontinente als halbfette Überschriften](vergleich/04-kapitaelchen-b3.jpg)

**Vorher (A).** Jede Abschnittsüberschrift steht in der Vollkorn SC, 20,2 px, gesperrt um 0,06 em (Sperrung heißt: mehr Abstand zwischen den Buchstaben) und ganz in Kleinbuchstaben geschrieben. Die Schrift macht daraus Kapitälchen ohne große Anfangsbuchstaben: „was ich schreibe“, „was ich gelesen habe“, „kontakt“. Auf *Satoshi* gibt es sieben solcher Zeilen („klappentext“, „eckdaten“, „gebaut wie ein protokoll“ und andere), auf der Vita „stationen“, auf der Tafel „wohnort“ in grauen Kapitälchen. Der Name im Kopf steht in Kapitälchen, 21,9 px, gesperrt um 0,07 em, wie in einem Briefkopf. Die Figurennamen auf *Satoshi* stehen in Kapitälchen, die Kontinente im Länderregister als Kapitälchen am Anfang ihrer Zeile.

**Nachher (B).** Es gibt keine Kapitälchen als Überschrift, als Name oder als Etikett. Abschnittsüberschriften stehen im Textgrad (20 px), aufrecht, in normaler Schreibung und halbfett (Gewicht 600, eine Stufe kräftiger als der Text). Halbfett hat in B genau eine Bedeutung, Orientierung: Überschriften, die aktuelle Seite, die gewählte Karte. Der Name im Kopf steht im kleinen Grad (16 px) ohne Sperrung. Die Figurennamen sind halbfett, die Kontinente eigene halbfette Überschriften über ihrer Länderliste. Kapitälchen gibt es nur noch für Abkürzungen aus drei und mehr Großbuchstaben im Lauftext, etwa AIESEC, UdSSR, USA, CTO, wie es der Typograf Robert Bringhurst vorsieht.

**Warum.** Rang 1, „Gesperrte Versal- oder Kapitälchen-Labels über Abschnitten“. Das ist das häufigste Merkmal der ganzen Liste und das mit der stärksten Datenlage. Opus 5.5 setzt solche Zeilen auf 20 von 20 Probeseiten, auf 19 davon drei oder mehr. Ein Vergleichsmodell von OpenAI hat sie auf 8 von 20 Seiten. Anthropics eigener Gestaltungsleitfaden zählt zwei seiner drei häufigsten Erkennungszeichen hierher: „all caps for labels“ und „unnecessary typographic labels above content“. Der Katalog impeccable verbietet das Label ausdrücklich auch in Kapitälchen („This one is a ban … no brief earns it back“). Es ist das einzige Modemerkmal, das auch die Daten aus Galerien gestalteter Seiten verurteilen: Winzige gesperrte Großbuchstaben stehen auf 57 % der schwachen und 16 % der besten Seiten. Kyle Chayka nennt im New Yorker „tracked-out subheadings“.

Kapitälchen mildern den Eindruck, weil sie aus dem Buchsatz kommen. Verräterisch bleibt die Dichte von einem Label pro Abschnitt. Die Liste nennt als Beispiele der literarischen Variante ausgerechnet „klappentext“, „eckdaten“ und „stationen“, also genau die Wörter von A.

Die vier Stellen sind aber nicht gleich stark:
- Die Abschnittsüberschriften sind das eigentliche Merkmal.
- Der gesperrte Name im Kopf gehört dazu. Die Prüfung von A empfahl, ihn ohne Sperrung zu setzen.
- Figurennamen in Kapitälchen sind eine echte Buch- und Theaterkonvention, im Personenverzeichnis eines Dramas stehen Namen oft so.
- Die Kontinente als Stichwort am Zeilenanfang sind eine Registerkonvention. Die Prüfung von A hatte ausdrücklich empfohlen, sie zu behalten. B hat sie trotzdem gestrichen, um die Regel ohne Ausnahme zu halten.

**Vorteile.**
- Das häufigste KI-Merkmal der Liste verschwindet von allen elf Seiten.
- Überschriften in normaler Schreibung lesen sich schneller als Kapitälchen in Kleinschreibung.
- Eine Schriftdatei weniger, wenn keine Kapitälchen mehr nötig sind.
- Kapitälchen bekommen ihre Buchsatz-Bedeutung zurück und machen Abkürzungen im Lauftext ruhiger.

**Nachteile und Risiken.**
- Halbfette Überschriften wirken mehr nach Website und weniger nach Buch. Die ruhige Eleganz der Kapitälchen ist ein Teil der Anmutung von A.
- Halbfett ist selbst ein sehr gewöhnliches Mittel. Es fällt nicht als KI auf, aber auch nicht als Handschrift.
- Halbfette Figurennamen sehen eher nach Formular aus als nach Personenverzeichnis.
- Die Kontinente als eigene Überschriften machen das Länderregister länger, es passt in B nicht mehr auf einen Bildschirm.

**Verworfene Alternativen.** Die Prüfung von A hatte vorgeschlagen, die Überschriften aufrecht in der Vollkorn zu setzen, normal geschrieben, eine Stufe größer als der Text (1,25 em) und ohne Fettung, mit zwei Zeilen Abstand davor. Wo ein Abschnitt ohne Überschrift verständlich ist, entfällt sie, etwa „Kontakt“ über der E-Mail-Adresse. B hat sich für halbfett entschieden, damit Halbfett überall dieselbe Bedeutung hat. Gesperrte Großbuchstaben wären schlimmer gewesen, kursive Überschriften wären Rang 8.

**Sicherheit.** Hoch für die Abschnittsüberschriften und den gesperrten Namen, das ist die beste Datenlage der ganzen Liste. Geschmack für Figurennamen und Kontinente, weil beide echte Buchkonventionen sind.

**Für die Mischfassung.** Mittelweg:
- Abschnittsüberschriften aus B übernehmen, aber in der Form der Prüfung: aufrecht in der Vollkorn, normale Schreibung, ohne Sperrung, ohne Fettung, etwas größer als der Text und mit mehr Abstand davor. Das bleibt so leise wie die Kapitälchen von A, ohne das Label-Muster.
- Den Namen im Kopf ohne Sperrung in der Vollkorn setzen.
- „wohnort“ auf der Tafel als normales Wort in Graphit (siehe 03).
- Figurennamen und Kontinente dürfen in Kapitälchen bleiben, ohne zusätzliche Sperrung. Das ist Buchsatz und passt zur Anmutung, die Dominik mag. Wer ganz sicher gehen will, nimmt dort die Lösung von B.

### 05. Grautöne und Textfarben

![A: Farbtafel, sieben Textfarben mit Kontrast und Verwendung, dazu Linien- und Flächenfarben und feste Werte](vergleich/05-grautoene-a.jpg)
![B: Farbtafel, eine Textfarbe, vier weitere Farben nie für Text](vergleich/05-grautoene-b.jpg)
![A: Kopf, erster Satz, Kurzvita und Kartenwahl der Startseite, fünf Textfarben in einem Ausschnitt](vergleich/05-grautoene-a2.jpg)
![B: derselbe Bereich der Startseite in einer Tinte](vergleich/05-grautoene-b2.jpg)

Die beiden Farbtafeln habe ich aus dem Quelltext und der Messung zusammengestellt und in der jeweiligen Seite gesetzt. Sie gehören nicht zur Website.

Zuerst ein Begriff: Ein **Token** ist ein benannter Wert im Stylesheet, etwa `--tinte: #141414`. Überall, wo Text gesetzt wird, steht dann „Tinte“ statt des Farbwerts. Das funktioniert wie eine Formatvorlage in Word: Man legt sie einmal fest, und ändert man sie, ändert sich jede Stelle, die sie benutzt. Der Name sagt außerdem, wofür die Farbe da ist. Ein fester Wert dagegen steht direkt an einer Stelle im Code. Nimmt die nächste Arbeitssitzung ein etwas anderes Grau, merkt es niemand, und die Seiten laufen auseinander.

**Vorher (A).** A hat sieben Textfarben, gemessen gegen den Seitengrund #FFFEFC:
- #0A0B0D „schwarz“ (19,5 : 1) für die aktuelle Seite, gewählte Wörter und Seitentitel,
- #1D1E21 „graphit“ (16,5 : 1) für den Lesetext,
- #47494E „grau-1“ (8,9 : 1) für Navigation und „Auf dem Globus:“,
- #6B6D72 „grau-2“ (5,1 : 1) für Tagline, Stationenzeile, Tafel, Legenden, Koordinaten und Fuß,
- #7C7E83 „grau-neben“ (4,0 : 1) für Nebenorte,
- #96989C „grau-3“ (2,9 : 1) für Striche und das inaktive „früher“,
- #A2A4A7 ohne Token in `bibliothek.html` (2,5 : 1) für die Titel der Leseliste.

Drei davon liegen unter dem Mindestkontrast von 4,5 : 1 der Richtlinien für barrierefreie Webinhalte (WCAG). Das Verhältnis gibt an, wie stark sich die Helligkeit von Schrift und Grund unterscheidet. In `stil.css` stehen insgesamt 14 Farbwerte, neben den Textfarben das Papier, Siena und sechs Töne für Linien und Flächen. In `index.html` stehen 9 und in `bibliothek.html` 7 feste Farbwerte ohne Token, die Verlagsfarben der Buchrücken nicht mitgezählt. Gemessen: Im ersten Bildschirm der Startseite stehen sechs Textfarben, und 24 % aller Zeichen sind #6B6D72 oder heller. Derselbe eigene Buchrücken hat auf der Startseite den Ton #F8F4EC, in der Bibliothek #F6F2EA.

**Nachher (B).** B hat eine einzige Textfarbe, `--tinte` #141414 (18,4 : 1 auf Weiß), für allen Text und alle Linien. Vier weitere Farben kommen nie in Text vor: `--papier` #FFFFFF als Grund, `--tinte-raster` #C4C4C4 nur für die Striche im Zeitband der Bibliothek, `--blau` #2A5F99 und `--blau-raster` #E5ECF3 nur auf Karten. Alle stehen als Token in `stil.css`. In den HTML-Seiten und in `seite.js` von B steht kein einziger fester Farbwert, das habe ich im Quelltext gesucht. Gemessen ist auf allen geprüften Seiten genau eine Textfarbe. Rang entsteht über Größe, Stellung und Halbfett. Ein Bedienwort, das gerade nicht geht, wird ausgeblendet statt grau.

**Warum.** Hier treffen drei Merkmale zusammen. Rang 29, „Viele gleichrangige Grautöne“: Jede Arbeitssitzung bringt einen neuen Grauwert mit, designmd.me spricht von „five greys that arrived independently“. Anthropic schrieb 2025: „Dominant colors with sharp accents outperform timid, evenly-distributed palettes.“ Rang 11, „Grauer Nebentext mit wenig Kontrast“, ist unter 03 beschrieben. Rang 50, „Design-Drift zwischen Unterseiten“: Unterseiten aus verschiedenen Sitzungen bringen eigene Farben mit, der Katalog avoid-ai-design stuft das als dringlichste Stufe ein. Die zwei Töne desselben Buchrückens in A sind genau das.

Ein Teil des Grunds ist keine KI, sondern Lesbarkeit. Text unter 4,5 : 1 ist für viele Menschen schwer zu lesen, besonders auf dem Telefon in der Sonne. Bei einem Schriftsteller ist Text das Werk. Grauer Text sagt dem Leser „das musst du nicht lesen“, und das steht im Widerspruch zum Inhalt. Im gedruckten Buch gibt es keinen grauen Text.

**Vorteile.**
- Jeder Text ist gut lesbar.
- Eine Farbe an einer Stelle zu ändern, ändert die ganze Website. Unterseiten können nicht mehr auseinanderlaufen.
- Die Ordnung der Seite ist klarer, weil sie über Größe und Stellung entsteht und nicht über sieben feine Abstufungen, die man kaum unterscheidet.
- Der Code ist kürzer und prüfbar: Ein Suchlauf nach Farbwerten außerhalb von `stil.css` muss leer sein.

**Nachteile und Risiken.**
- Die abgestuften Grautöne geben A Tiefe und Ruhe. Mit einer einzigen Tinte wirkt B flacher und strenger.
- #141414 auf reinem Weiß ist härter als Graphit auf dem Papierweiß von A. Das trägt zum kühleren Eindruck von B bei.
- Ohne Grau braucht B Halbfett für die Ordnung. Halbfett ist lauter als ein Grauton.
- Die Liste warnt selbst: Weglassen allein ergibt leicht „an empty page with good manners“. Strenge muss durch Inhalt aufgewogen werden.

**Verworfene Alternativen.** Die Prüfung von A hatte zwei Textfarben vorgeschlagen: Graphit für allen Text und ein Grau (#6B6D72, 5,1 : 1) nur für Zustände wie „nicht gewählt“. B ging weiter auf eine einzige Farbe. Die Palette von A nur als Token zu ordnen, hätte die Drift beseitigt, das Merkmal aber gelassen.

**Sicherheit.** Hoch für das Ordnen in Token und für das Anheben aller Texte über 4,5 : 1, das ist Handwerk und Barrierefreiheit. Geschmack bei der Frage, ob es eine Textfarbe sein muss oder zwei sein dürfen.

**Für die Mischfassung.** Mittelweg: den Vorschlag der Prüfung umsetzen. Graphit #1D1E21 für allen Lesetext, #0A0B0D darin aufgehen lassen. Ein einziges Grau, #6B6D72, nur für echte Zustände, etwa das nicht verfügbare „früher“. #47494E, #7C7E83, #96989C und #A2A4A7 entfallen. Alle Farben werden Token in `stil.css`, die 16 festen Werte in `index.html` und `bibliothek.html` verschwinden, und vor der Abgabe sucht ein Skript nach Farbwerten außerhalb von `stil.css`. Graphit auf Papierweiß ist weicher als die Tinte von B auf reinem Weiß. So bleibt die Anmutung von A, und die vielen Grautöne verschwinden.

### 06. Schriftgrade und Rhythmus

![A: alle Schriftgrade der Startseite in echter Größe, zwölf im HTML und einer in der Zeichnung](vergleich/06-schriftgrade-a.jpg)
![B: alle Schriftgrade der Startseite in echter Größe, drei im HTML und zwei in Zeichnungen](vergleich/06-schriftgrade-b.jpg)
![A: Vita, erster Bildschirm](vergleich/06-schriftgrade-a2.jpg)
![B: Vita, erster Bildschirm, gleicher Inhalt](vergleich/06-schriftgrade-b2.jpg)

Die beiden Gradleitern habe ich aus der Messung gesetzt, jede Zeile in der Schrift und Größe, in der sie auf der Seite steht. Die Vita zeige ich, weil ihr Inhalt in beiden Fassungen gleich ist.

**Vorher (A).** Ein Schriftgrad ist eine Schriftgröße. Auf der Startseite von A habe ich zwölf Grade im HTML gemessen: 30,9 px (erster Satz), 30,4 px (Jahreszahl der Tafel), 23,8 px (Ort im Tafelkopf), 21,9 px (Name), 20,2 px (Abschnittstitel), 19 px (Lesetext), 17,8 px (Navigation, Stationenzeile, Legende), 16,7 px („bis“), 15,3 px (Nebenorte), 14 px (Fuß), 10,8 und 9,9 px (Rückenschrift im Regalbild). Dazu kommen 13 px für die Jahreszahlen am Zeitband, die in einer Zeichnung stehen. Ohne die Rückenschrift bleiben zehn. Viele liegen dicht beieinander, der erste Satz und die Jahreszahl unterscheiden sich um einen halben Pixel. Auf der Vita sind es elf Grade, fünf davon zwischen 13 und 16,6 px. A hat ein Zeilenraster (alle Zeilen und Abstände sind Vielfache einer Grundzeile, wie die Linien auf Schreibpapier) mit einer Zeile von 28,5 px. Die meisten Abstände halten sich daran. Einige Elemente verlassen es aber mit eigenen Zeilenhöhen: die Stationenzeile (1,65), der Text der Tafel (1,42) und der Fuß (1,6). Ich habe nachgemessen, ob die Textblöcke im ersten Bildschirm auf einem Raster aus Viertelzeilen beginnen: auf der Startseite 11 von 20, auf der Vita 20 von 26.

**Nachher (B).** B hat drei Grade im HTML: groß 30 px (erster Satz, Seitentitel), Text 20 px (Lesetext, Überschriften), klein 16 px (Kopf, Legenden, Fuß). Auf dem Telefon sind es 26, 18 und 15 px. Die Grundzeile ist 30 px, die Zeilenhöhen sind 1,25, 1 und 0,75 Zeilen, alle Abstände sind Vielfache einer Viertelzeile. Dieselbe Messung ergibt auf der Vita 28 von 28 Textblöcken auf dem Raster, auf der Startseite 20 von 24. Daneben liegt nur die Legende unter der Karte, weil die Karte so hoch wie breit ist und ihre Höhe keine ganze Zahl von Zeilen ergibt. Eigene kleine Grade gibt es nur in Zeichnungen, 15 px für Ortsnamen auf der Karte und 10 bis 11 px für die Rückenschrift.

**Warum.** Rang 30, „Zu viele Schriftgrößen“: Jedes Bauteil bekommt beim Generieren seine eigene Größe, niemand legt eine Skala fest. Mehrere Kataloge führen das (avoid-ai-design, taste-skill, febbhav, slop-detect), Anthropic verlangt eine klare Skala. Bücher kommen mit einem Grad für den Text und ein bis zwei weiteren aus. Als KI-Zeichen ist das Merkmal schwächer als die vorigen, die Liste ordnet es bei Claude als „allgemein“ ein. Der Hauptgrund ist deshalb Ruhe und Lesbarkeit. Dazu gehört Rang 49, gleichförmige Abstände. B verteilt Abstände nach Gewicht, zwischen Absätzen keinen, vor einer Überschrift zwei Zeilen, zwischen großen Teilen drei.

**Vorteile.**
- Die Seite wirkt ruhiger, weil das Auge nur drei Größen ordnen muss.
- Die Zeilen stehen in einem festen Rhythmus, auch neben der Karte.
- Neue Seiten lassen sich ohne neue Größen bauen, alle Seiten sehen gleich aus.
- Die Baskervville wirkt bei gleicher Pixelgröße kleiner als die Vollkorn. Mit 20 px statt 19 px liest sich der Text in B etwa gleich groß.

**Nachteile und Risiken.**
- Mit drei Graden fehlen Zwischentöne. Der große Jahrgang an der Tafel oder der etwas größere Name im Kopf geben A Charakter.
- Die Ordnung muss über Halbfett und Abstand kommen. Das wirkt nüchterner.
- Auf dem Telefon liegen 15 und 18 px dicht beieinander, Legenden und Text unterscheiden sich dort wenig.
- In Zeichnungen braucht es trotzdem eigene Größen. Die Regel „drei Grade“ gilt nur für den Text.

**Verworfene Alternativen.** Die Prüfung von A schlug drei Grade auf der Skala von A vor: 19 px für Text, 15,4 px (0,8125 em) für Legenden, Fuß und Tafel, 28,5 px (1,5 em) für Seitentitel und den ersten Satz. Die Liste erlaubt höchstens fünf deutlich verschiedene Grade. Eine rechnerische Skala mit festem Faktor wäre möglich gewesen, ergibt aber krumme Werte ohne Bezug zur Zeile.

**Sicherheit.** Mittel. Die Quellen sind sich einig, dass weniger Grade ruhiger wirken, als KI-Merkmal ist das aber nur schwach belegt.

**Für die Mischfassung.** Mittelweg: drei Grade auf der Skala von A, wie die Prüfung sie vorschlug. 19 px für den Lesetext, 15,4 px für Legenden, Tafel, Koordinaten und Fuß, 28,5 px für den ersten Satz, die Seitentitel und den Jahrgang auf der Tafel. Die Zwischenstufen 0,9375, 1,0625, 1,15, 1,25 und 1,6 em entfallen. Die Zeilenhöhen werden Vielfache einer Viertelzeile, auch bei Stationenzeile, Tafel und Fuß. Die Rückenschrift im Regal bleibt eine Ausnahme, weil sie aus der Breite des Rückens folgt. Das Schriftbild der Vollkorn bleibt so erhalten, nur ruhiger.

### 07. Unterstreichung der Verweise

![A: Navigation und Werkverzeichnis mit der feinen, halbtransparenten Unterstreichung](vergleich/07-unterstreichung-a.jpg)
![B: Navigation ohne Strich, Inhaltsverzeichnis mit der Unterstreichung im Werkszustand](vergleich/07-unterstreichung-b.jpg)
![A: Länder, erster Bildschirm, linke Spalte mit unterstrichenem Register](vergleich/07-unterstreichung-a2.jpg)
![B: Länder, erster Bildschirm, linke Spalte, Register ohne Strich](vergleich/07-unterstreichung-b2.jpg)

**Vorher (A).** A unterstreicht jeden Verweis und jedes Wort, das etwas tut, mit demselben „feinen“ Rezept: Strich 1 px dick, 0,2 em unter der Grundlinie, in 40 % der Schriftfarbe, also halb durchsichtig. Auch die Navigation ist unterstrichen, grau (#47494E) mit einem Strich in 35 % Deckung, die aktuelle Seite steht schwarz ohne Strich. Gemessen stehen im ersten Bildschirm der Startseite 19 unterstrichene Elemente, auf der Seite Länder 75, weil jedes Land im Register unterstrichen ist.

**Nachher (B).** B unterstreicht im Werkszustand, also so, wie der Browser es von sich aus tut: nur `text-decoration-line: underline`, ohne eigene Dicke, ohne Abstand, ohne Farbmischung. Lage und Stärke des Strichs kommen aus der Schrift, die Farbe ist die volle Tinte. Unterstrichen sind nur Verweise im Text, Bedienwörter und „früher“ und „später“. Navigation, Kartenwahl und Länderregister sind Auswahllisten ohne Strich. Erst unter der Maus erscheint der Strich, gewählt steht ein Eintrag halbfett. Gemessen: 8 unterstrichene Elemente im ersten Bildschirm der Startseite, 5 auf der Seite Länder.

**Warum.** Rang 53, „Unterstreichung als Zierde“. Die Liste beschreibt genau das Rezept von A (1 px, 0,2 em Abstand, halbtransparent) als gängigen Schnipsel für „geschmackvolle“ Links. Kyle Chayka nennt „overzealous underlining“ unter den Zeichen des KI-Looks. Die Unterstreichung wird dabei zur Stimmung, statt einen Link anzuzeigen. Das Gegenmittel der Liste: unterstrichen wird nur, was im Fließtext ein Link ist, die Navigation zeigt den Ort durch ihre Stellung. Der Gestalter Frank Chimero hat bei seiner Seite bewusst die Browserstandards stehen lassen. Diese Geste würde ein Modell kaum wählen.

Die Beleglage ist hier dünner als bei den anderen Elementen. Das Merkmal gilt als „gelegentlich“, und Chaykas Text kennen wir nur aus Suchzusammenfassungen. Ein Teil ist außerdem Bedienbarkeit und keine KI: Links im Text brauchen ein Zeichen, das auch ohne Farbe auskommt.

**Vorteile.**
- Ein Strich bedeutet eindeutig „hier kann man klicken“.
- Weniger Striche machen das Länderregister und die Startseite ruhiger.
- Der Werkszustand passt sich jeder Schrift an und braucht keine Pflege.
- Die Navigation wirkt wie ein Inhaltsverzeichnis und nicht wie eine Reihe von Links.

**Nachteile und Risiken.**
- Die Linie im Werkszustand ist dunkler, dicker und näher am Text. Sie wirkt gröber als die feine Linie von A, die zur Eleganz von A gehört.
- Auf dem Telefon gibt es keine Maus. Dort sieht man dem Länderregister in B nicht an, dass man die Länder antippen kann.
- Eine Navigation ohne Strich erkennt man nur an ihrer Stellung. Das ist üblich und funktioniert, ist aber eine Spur weniger deutlich.

**Verworfene Alternativen.** Das feine Rezept zu behalten und nur sparsamer einzusetzen, hätte die Menge verringert, das Rezept aber gelassen. Striche nur unter der Maus überall hätte das Telefon ganz ohne Hinweis gelassen. Links in einer Akzentfarbe wären Rang 10 oder 19 gewesen.

**Sicherheit.** Mittel für die Menge der Striche, weil Navigation und Register klar entlastet werden. Geschmack für die Art der Linie, weil die Belege dünn sind.

**Für die Mischfassung.** Mittelweg: die Menge aus B übernehmen, die Linie behutsam anpassen.
- Navigation ohne Strich und in Graphit statt grau (siehe 05). Unter der Maus erscheint der Strich. Die aktuelle Seite steht halbfett wie in B, die Vollkorn lädt A schon mit diesem Gewicht.
- Länderregister ohne Strich, mit Strich unter der Maus und beim Tastaturfokus. Auf Geräten ohne Maus bleibt der Strich stehen, das lässt sich im Stylesheet für Touchgeräte allein festlegen. So verliert das Telefon den Hinweis nicht.
- Verweise im Fließtext, die E-Mail-Adresse und „früher“ und „später“ bleiben unterstrichen.
- Für die Linie zwei Fassungen nebeneinander ausprobieren: der Werkszustand in der Vollkorn und eine Linie von 1 px in voller Graphitfarbe, ohne Durchsichtigkeit und ohne eigenen Abstand. Beides ist weniger „Rezept“ als die halbtransparente Linie. Dominik wählt nach Ansicht.
