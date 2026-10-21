## Bibliothek, Länder, Vita, kleine Seiten und Technik

Alle Bilder in diesem Teil sind bei 1440 × 900 Pixeln aufgenommen, die Telefonbilder bei 390 × 844 mit doppelter Pixeldichte. Wo „doppelt vergrößert“ steht, ist das Fenster gleich groß, nur die Pixeldichte verdoppelt, damit man kleine Zeichen erkennt. Version B wird gerade noch an Textresten nachgearbeitet. Die Bilder von B zeigen den Stand vom 21. Oktober 2026 um 1:30 Uhr (UTC). Seit B auf den Wortlaut von A zurückgesetzt wurde, weicht B an einigen Stellen von seinen eigenen Regeln ab (Schuber, Karteikarte, Koordinaten in der Vita). Ich beschreibe, was B jetzt tut, und sage dazu, wo die Regeln von B etwas anderes vorsahen.

### 21. Regal

![A: zwei Bretter mit farbigen Rücken, Buchstütze, Regalschildern in Kapitälchen und der Zeitleiste darüber](vergleich/21-regal-a.jpg)
![B: dieselben Bücher als Strichzeichnung, der Name des Fachs in normaler Schrift unter dem Brett](vergleich/21-regal-b.jpg)
![A, doppelt vergrößert: Bleistiftstriche unten auf den Rücken, Lesezeichen oben, Buchstütze vor Buddenbrooks, ein schräg lehnendes Buch am Ende](vergleich/21-regal-a2.jpg)
![B, doppelt vergrößert: Punkt für ein Lieblingsbuch, gestrichelter Umriss für nicht zu Ende gelesen, Strich über dem Kopf für mehrmals gelesen](vergleich/21-regal-b2.jpg)
![A: oberstes Brett, die eigenen Werke mit Mustern nach der Insel-Bücherei, der Schuber offen, daneben der Nachttisch](vergleich/21-regal-a3.jpg)
![B: oberstes Brett, Satoshi als liegendes Manuskript, der Schuber offen, alles als Umriss](vergleich/21-regal-b3.jpg)

**Vorher (A).** Jedes Buch ist ein farbiger Rücken. Die Breite kommt aus der Seitenzahl, die Höhe aus der Bindung. Die Farbe kommt aus einer geschätzten Verlagsfamilie: Penguin Classics schwarz, Suhrkamp in sieben Pastelltönen, Reclam gelb, dazu „Leinen“ und „Creme“ für den Rest, zusammen 38 Töne. Welcher Ton ein Buch bekommt, ob es 6 % breiter oder schmaler steht, wo auf einem Brett eine Lücke ist und welche drei oder vier Bücher schräg lehnen, entscheidet ein Hash (eine Rechnung, die aus dem Titel eine feste, zufällig wirkende Zahl macht). Dazu kommt Beiwerk: ein Bleistiftstrich unten auf dem Rücken für ein Lieblingsbuch (1 × 6 Pixel, schräg, zu 32 % deckend), zwei für mehrmals gelesen, ein Lesezeichen oben aus nicht zu Ende gelesenen Büchern, eine Buchstütze aus Metall zwischen zwei Zeiten und unter dem Brett ein Regalschild in grauen Kapitälchen (Großbuchstaben in der Höhe der Kleinbuchstaben), etwa „von gilgamesch bis zur jahrhundertwende“. Wer mit der Maus auf einen Rücken zeigt (Hover), sieht ihn in 0,2 Sekunden um 6 Pixel steigen. Oben stehen die eigenen Werke mit Mustern in Siena nach dem Vorbild der Insel-Bücherei. Die Trilogie steckt in einem Schuber, aus dem die drei Bände auf Klick in 0,8 Sekunden nacheinander herausgleiten. Über den Brettern haftet (bleibt beim Scrollen oben am Fensterrand stehen) eine Zeitleiste in grauer Kursive.

**Nachher (B).** Das Regal ist eine Strichzeichnung. Jeder Rücken ist weiß mit einer Kontur (Umrisslinie) von einem Pixel in Schwarz, das Brett ist eine Linie. Breite und Höhe folgen derselben Formel, aber ohne Hash. Es gibt keine Lücken, nichts lehnt, es gibt keine Buchstützen. Vier gezeichnete Zeichen tragen die Leseart: ein Punkt über dem Fuß für ein Lieblingsbuch, ein Strich über dem Kopf für mehrmals gelesen, ein gestrichelter Umriss für nicht zu Ende gelesen, ein gepunkteter für Bücher, die Dominik nur in Auszügen gelesen hat (Ilias, Odyssee, Aeneis). Eine Zeichenerklärung neben dem Vorspann zeigt drei davon. Der Name des Fachs steht unter dem ersten Brett in normaler Schreibung, klein und schwarz. Die Rückenschrift ist Baskervville ohne Kapitälchen. Zeigen, Fokus (die Markierung, wo man mit der Tastatur steht) und Wahl kehren den Rücken um, er wird schwarz mit weißer Schrift, nichts bewegt sich. Die Zeitleiste von A heißt in B Standortregister, steht aufrecht und schwarz, ohne Unterstreichung, das aktuelle Fach halbfett. Oben liegt *Satoshi* als Manuskript, so breit wie ein A4-Blatt quer und so hoch wie 364 Blatt. Den Schuber hat B wieder, seit es auf den Wortlaut von A zurückgesetzt wurde, er öffnet sich aber ohne Bewegung. Die Regeln von B (Abschnitt 12.7) sahen nur das Manuskript vor.

**Warum.** Das Regal selbst ist kein KI-Merkmal. Die Prüfung nennt es das eigenständigste Element nach dem Globus, weil die Maße echte Daten sind. Das Beiwerk darum herum ist es. Rang 52 (nachgebaute Papiergegenstände) beschreibt fast wörtlich dieses Regal: „Regale aus CSS-Brettern, Buchrücken und Lesebändchen“. Die Quellen dazu sind Einschätzungen, gezählt hat es niemand. Anthropics eigener Rat und taste-skill empfehlen solche Requisiten aus der Welt des Gegenstands, deshalb tauchen sie in Claudes Ausgabe auf. Die Bleistiftstriche fallen zusätzlich unter Rang 57, die simulierte Handarbeit, die eine Seite „menschlich“ machen soll. avoid-ai-design nennt das einen Anti-KI-Reflex dritter Ordnung. Die Regalschilder in gesperrten Kapitälchen sind Rang 1, das am besten belegte Merkmal der ganzen Liste. Kleine gesperrte Versalien stehen auf 57 % der schwachen und 16 % der besten Galerieseiten. Die Zeitleiste „Gilgamesch – 1900 – 1946 – 1990 – 2010“ ist eine Kette mit Strichen statt Mittelpunkten, die Prüfung zählt sie zu Rang 3 (Metazeilen). B hat diese Kette mit dem Wortlaut von A übernommen. Das Steigen beim Zeigen ist Rang 39, das Tailwind-Muster „hover:-translate-y-1“. Die Liste merkt dazu an, dass man ein Buch nach vorn aus dem Regal zieht, nicht nach oben. Die Familien „Leinen“ und „Creme“ bringen warme Flächen und viele Grautöne (Rang 2, 29). Die Farben sind außerdem erfunden, niemand hat die Umschläge angesehen. B hat sich die Regel gegeben, nichts zu erfinden, auch keine Streuung per Zufall. Das ist eine Frage der Ehrlichkeit, in der Rangliste steht es nicht. Bei einem Schriftsteller fällt das Beiwerk besonders auf, weil Bleistift, Lesezeichen, Schuber und Insel-Bücherei genau das Profil sind, das Claude bei „Autor“ von selbst wählt. Die eigenen Notizen dieses Projekts haben jedes Teil davon empfohlen (synthese.md, Bibliothek 1).

**Vorteile.**
- Jedes Zeichen hat eine Bedeutung und ist zu sehen. Den Punkt in B erkennt man sofort, den Bleistiftstrich in A muss man suchen (Bild A, doppelt vergrößert).
- Was das Regal zeigt, steht so in den Daten. Nichts ist geschätzt oder gestreut.
- Die Bibliothek verliert zwei Bewegungen (Steigen, Schuber) und fast alle Grautöne.
- Das Manuskript von *Satoshi* als Stapel aus 364 Blatt ist ein wahres Detail, das sich niemand ausdenkt.

**Nachteile und Risiken.**
- Das Regal verliert seine Wärme. Die farbigen Rücken machen A zu einer Bibliothek, in der man stöbern möchte. B sieht bei über 500 Rücken eher aus wie eine technische Zeichnung oder ein Strichcode. Hier liegt vermutlich ein großer Teil dessen, was Dominik an A lieber mag.
- Mehr Linien bedeuten mehr Unruhe. Die Rückenschrift ist in beiden Fassungen sehr klein (6,5 bis 10 Pixel), in B ohne Farbfläche dahinter wirkt sie noch zarter.
- Lesezeichen und Schuber haben Witz. Wer sie entdeckt, freut sich. Das geht verloren.
- Der Aufwand ist gering, weil fast alles Streichen ist.

**Verworfene Alternativen.** Am stärksten wäre ein Foto von Dominiks echtem Regal (Gegenmittel zu Rang 52: das echte Artefakt). Das braucht sein Material. Die Prüfung schlug vor, die Verlagsfarben zu behalten und nur das Beiwerk zu streichen. B hat das verworfen, weil die Farben geschätzt sind und warme Grautöne mitbringen. Die Richtung „Werkstatt“ färbte das Regal nach Leseart, mit schwarzen Lieblingsbüchern, das Regal wurde dadurch schwer.

**Sicherheit.** Mittel. Bei den Kapitälchen-Schildern ist sie hoch (Rang 1), bei Bleistift, Lesezeichen und Schuber mittel (Rang 52 und 57 sind „gelegentlich“ und nur geschätzt), bei den Farben ist es Geschmack.

**Für die Mischfassung.** Mittelweg. Das farbige Regal von A bleibt mit Verlagsfarben und Maßen aus der Seitenzahl. Der Hash bleibt nur für die Wahl des Tons innerhalb einer Familie, sonst stünden alle Suhrkamp-Bände in derselben Farbe. Gestrichen werden die Streuung bei Breite und Höhe, die Lücke und die lehnenden Bücher, denn sie sagen nichts über die Bücher. Die Bleistiftstriche werden zu den Zeichen von B, also Punkt unten und Strich über dem Kopf, in der Schriftfarbe des Rückens, mit einer kleinen Zeichenerklärung. Das Lesezeichen ist das eine Requisit, das ich am ehesten behalten würde, weil es etwas sagt und gut zu sehen ist. Sauberer wäre die gestrichelte Kante aus B. Die Buchstützen fallen weg. Die Regalschilder behalten ihren Wortlaut, stehen aber aufrecht in der Vollkorn, in Graphit, eine Stufe kleiner, wie in B. Beim Zeigen steigt nichts, der Rücken bekommt eine Graphitkante oder wird umgekehrt wie in B. Der Schuber öffnet ohne Gleiten. Die Insel-Muster und das Siena der eigenen Rücken hängen an der Entscheidung über Siena. Die Zeitleiste steht aufrecht in Graphit, die aktuelle Zeit schwarz, die Wörter nur durch Abstand getrennt statt durch Striche, wie es die Regeln von B vorsahen. So bleibt die Anmutung von A, und die Requisiten, die auf KI hinweisen, sind weg.

### 22. Buchzeile und Buchkarte

![A: ein Klick auf Buddenbrooks öffnet die Karteikarte, sie schwebt über dem Regal](vergleich/22-buchkarte-a.jpg)
![B: ein Klick auf Buddenbrooks kehrt den Rücken um, die Angaben stehen in der Zeile unter dem Brett](vergleich/22-buchkarte-b.jpg)
![A beim Zeigen: der Name steht über dem Rücken](vergleich/22-buchkarte-a2.jpg)
![B beim Zeigen: die Buchzeile steht unter dem Brett](vergleich/22-buchkarte-b2.jpg)
![A auf dem Telefon: die Karteikarte liegt als Blatt über dem unteren Drittel des Bildschirms](vergleich/22-buchkarte-a3.jpg)
![B auf dem Telefon: die Angaben stehen in vier Zeilen unter dem Brett](vergleich/22-buchkarte-b3.jpg)

**Vorher (A).** Beim Zeigen steht der Name über dem Rücken: „Mann, *Buddenbrooks*, 1901“. Ein Klick öffnet eine Karteikarte im Format A6 quer, 384 Pixel breit, in Kartonfarbe (#FBF9F4) mit feinem Rand. Im Kopf stehen die Signatur „B 1901“ (Buchstabe des Fachs und Jahr, in Kapitälchen) und das Wort „zurücklegen“, darunter der Titel groß, der Untertitel grau und kursiv, der Autor, zwei graue Zeilen mit Erscheinungsjahr, Verlag und Seitenzahl. Die Karte schwebt über dem Buch oder daneben und deckt die Nachbarn zu. Auf dem Telefon liegt sie als Blatt am unteren Bildschirmrand. Sie geht mit Escape, „zurücklegen“, einem Klick daneben oder beim Wegscrollen zu. Dieselbe Karte öffnet sich auf der Startseite.

**Nachher (B).** Es gibt keine Karte. Beim Zeigen oder mit dem Tastaturfokus steht die Buchzeile in einer festen Zeile unter dem Brett: „Mann, *Buddenbrooks*, 1901“. Ein Klick kehrt den Rücken um und setzt in dieselbe Zeile alle Felder der Karte von A: „B 1901 *Buddenbrooks* The Decline of a Family Thomas Mann Zuerst erschienen 1901. Everyman’s Library, 731 Seiten. zurücklegen“. Die Felder stehen nur durch Abstand getrennt. Die Zeile hält ihre Höhe frei, damit beim Wählen nichts springt. Auf dem Telefon bricht sie in vier Zeilen um. Die Regeln von B (Abschnitt 12.8) wollten hier einen Satz ohne Signatur und ohne „zurücklegen“: „Thomas Mann, *Buddenbrooks*. Zuerst erschienen 1901. Everyman’s Library, 731 Seiten.“ Die Rücksetzung auf den Wortlaut von A hat die Felder zurückgebracht.

**Warum.** Die Karteikarte ist Rang 52 in Reinform. Die Liste beschreibt Inhalte, die „als Karteikarte, Tafel, Zettel … inszeniert“ werden, „mit Kartonrand, Signatur und Inventarnummer“. Die Signatur ist zugleich Rang 26, Mikro-Metadaten als Schmuck. taste-skill verbietet solche Inventarzeichen, weil sie nichts mitteilen. Der Karton ist der warme Grund aus Rang 2, Untertitel und Zeilen in Grau und Kursiv sind die zweite Stimme aus Rang 24. Das Bedienwort „zurücklegen“ führt die Prüfung unter den inszenierten Rubriknamen (Rang 28). Die Karte stammt aus synthese.md („Karteikarte A6 quer“). Für einen Autor ist der Zettelkasten das naheliegende Bild für „Bücher“, und genau deshalb wählt ein Modell ihn. Dass die Karte schwebt und Nachbarn verdeckt, ist eine Frage der Bedienung.

**Vorteile.**
- Nichts deckt das Regal zu. Man sieht das gewählte Buch und seine Nachbarn.
- Auf dem Telefon bleibt der Bildschirm frei, kein Blatt verdeckt ein Drittel.
- Beim Zeigen erscheint die Angabe immer an derselben Stelle, ohne Klick.
- Die erfundene Signatur kann ganz entfallen, sobald die Zeile ein Satz ist.

**Nachteile und Risiken.**
- Die Karte von A liest sich gut. Der Titel steht groß, die Angaben stehen geordnet untereinander. Die Zeile von B im kleinen Grad (der kleineren Schriftgröße), mit Feldern ohne Satzzeichen, ist schwerer zu lesen, und „B 1901“ am Anfang versteht niemand.
- In der jetzigen Form sieht die Zeile von B selbst nach einer Metazeile aus (Rang 3), nur ohne Mittelpunkte. Das behebt erst der Satz aus den Regeln von B.
- Unter jedem Brett muss Platz für die längste Angabe frei bleiben. Auf dem Telefon entstehen dadurch große Lücken zwischen den Brettern.
- Es fehlt der kleine Moment, in dem man eine Karte in die Hand nimmt.

**Verworfene Alternativen.** Die Prüfung schlug eine schlichte weiße Karte mit einer Graphitlinie vor, ohne Signatur, ohne Kartonton und mit „schließen“. B hat das verworfen, weil auch eine schlichte Karte ein Kasten über dem Inhalt bleibt (Rang 5). Die Richtung „Atlas“ hatte eine Katalogkarte mit Bibliothekszeichen nach ISBD („Ilias / Homer. – 560 S.“). Das war Bibliothekskostüm für Leser, die es nicht brauchen (Rang 60).

**Sicherheit.** Mittel. Signatur und Karton sind eindeutig Requisiten, die Belege für Rang 52 sind aber Einschätzungen. Eine Karte als Bedienelement ist für sich nichts Ungewöhnliches.

**Für die Mischfassung.** Mittelweg. Das Prinzip aus B übernehmen. Die Angaben stehen in der Zeile unter dem Brett, nichts schwebt, auf dem Telefon gibt es kein Blatt. Die Zeile wird aber ein Satz in der Vollkorn von A: „Thomas Mann, *Buddenbrooks*. Zuerst erschienen 1901. Everyman’s Library, 731 Seiten.“ Ohne Signatur und ohne „zurücklegen“, ein zweiter Klick oder Escape legt die Wahl zurück. Beim Zeigen genügt der kurze Name wie in A. Will Dominik die Karte behalten, dann als weiße Karte mit einer Graphitlinie, ohne Signatur und mit „schließen“.

### 23. Zeitband

![A: das Zeitband auf der Startseite, beim Zeigen auf Buddenbrooks erscheint die Zeile darunter](vergleich/23-zeitband-a.jpg)
![B: dasselbe Zeitband in der Bibliothek über dem Regal, in Grau und Schwarz](vergleich/23-zeitband-b.jpg)
![A auf dem Telefon, erster Moment: das Band steht noch bei Gilgamesch](vergleich/23-zeitband-a2.jpg)
![A auf dem Telefon, nach einem Stück Scrollen: das Band ist von selbst bis zu den Jahren um 2000 gewandert](vergleich/23-zeitband-a3.jpg)
![B auf dem Telefon, erster Moment: das Band steht am rechten Ende](vergleich/23-zeitband-b2.jpg)
![B auf dem Telefon, nach demselben Stück Scrollen: das Band steht unverändert](vergleich/23-zeitband-b3.jpg)

**Vorher (A).** Das Zeitband steht auf der Startseite unter „was ich gelesen habe“. Jedes gelesene Buch ist ein senkrechter Strich an seinem Erscheinungsjahr, so breit wie sein Rücken und so hoch wie das Buch. Die frühen Jahrhunderte sind gestaucht, Brüche zeigen zwei kleine Schrägstriche. Lieblingsbücher stehen dunkel, die übrigen in warmem Grau, nicht zu Ende gelesene halb so hoch, wiedergelesene mit einem kleinen Strich darüber. Was Dominik gerade liest, liegt quer obenauf, die eigenen Werke stehen rechts als Umrisse in Siena. Darunter folgen zwei kleinere Reihen für Kindheit und Jugend und für das, was noch wartet. Die Jahreszahlen der Achse sind grau, kursiv und 13 Pixel groß. Beim Zeigen steht die Buchzeile unter dem Band, ein Klick öffnet die Karteikarte. Auf dem Telefon ist das Band gut doppelt so breit wie der Bildschirm. Scrollt man die Seite nach unten, wandert es von selbst seitwärts von Gilgamesch bis zum Eigenen, bis man es anfasst (Bilder A2 und A3).

**Nachher (B).** Das Band ist nach demselben Rechenweg gebaut, steht aber in der Bibliothek über dem Regal. Die Startseite verweist nur noch mit „Die ganze Bibliothek“ dorthin. Die Striche stehen in einem neutralen Grau (#C4C4C4), Lieblingsbücher schwarz, eigene Werke und quer liegende Bücher weiß mit schwarzem Umriss. Die Achse ist eine schwarze Linie, die Jahreszahlen stehen aufrecht und schwarz in Versalziffern (Ziffern in Großbuchstabenhöhe). Beim Zeigen steht die Buchzeile unter dem Band, eine Marke auf der Achse zeigt das Jahr. Ein Klick springt zum Rücken im Regal und wählt ihn dort. Auf dem Telefon ist das Band 1000 Pixel breit, steht beim Laden am rechten Ende und bewegt sich nur unter dem Finger. Der Vorspann hat seit der Rücksetzung wieder den Wortlaut von A.

**Warum.** Das Zeitband selbst ist kein KI-Merkmal. Die Prüfung schreibt, dass kein Katalog diese Form kennt und kein Generator sie von selbst baut. B hat vier Dinge daran aus anderen Gründen geändert. Erstens den Ort. Die Startseite von A folgt der Reihe Vita, Werke, Bücher, Kontakt. Das ist Rang 42, die Schablonenfolge, ein schwaches Merkmal. In der Bibliothek erklären sich Band und Regal gegenseitig. Zweitens die Farben, also Siena (Rang 10) und warme Grautöne (Rang 2, 29). Drittens die Achse in grauer Kursive (Rang 24). Viertens das Mitschieben auf dem Telefon. Das ist Rang 56, eine an das Scrollen gekoppelte Bewegung, die Prüfung nennt es eine milde Form von Scroll-Jacking (das Scrollen wird für einen Effekt entführt). Der Vorspann mit fünf Gliedern, Semikolons und „Eine Auswahl, längst nicht alles.“ berührt Rang 33, 58, 59 und 35. Das ist eine Textfrage, die Dominik entscheidet.

**Vorteile.**
- In der Bibliothek führt jeder Strich zu seinem Buch. Ein Klick springt zum Rücken.
- Die Startseite wird kürzer und hat nur noch eine große Abbildung, den Globus.
- Auf dem Telefon bewegt sich nichts von selbst. Man liest, was man selbst aufsucht.
- Aufrechte schwarze Jahreszahlen sind besser zu lesen als graue kursive in 13 Pixeln.

**Nachteile und Risiken.**
- Auf der Startseite war das Band nach dem Globus das eigenständigste Bild. Wer die Bibliothek nicht öffnet, sieht es in B nie. Der Moment „das alles hat er gelesen“ fehlt auf der ersten Seite.
- In Grau und Schwarz liest sich das Band eher wie ein Strichcode. Die Formprüfung von B hat genau das bemängelt, B hatte das Band deshalb eine Runde lang ganz gestrichen.
- Das Mitschieben ist auf dem Telefon auch ein kleines Vergnügen. Man reist ohne Zutun durch die Zeit.
- Der Sprung ins Regal reißt einen aus dem Band. Wer weiter vergleichen will, muss zurückscrollen.

**Verworfene Alternativen.** Das Band ganz streichen, wie B es zwischendurch getan hatte. Das Band auf der Startseite unter dem Blatt, ohne Überschrift, mit „Bibliothek“ als Verweis. Diese Lösung nennen die Regeln von B (Abschnitt 21, Frage 4) ausdrücklich, falls Dominik das Band auf der Startseite will.

**Sicherheit.** Beim Ort ist es Geschmack. Beim Mitschieben mittel (Rang 56 ist „gelegentlich“). Bei der grauen Kursive der Achse hoch, denn sie ist auf dieser Website gemessen und macht 15 % der Zeichen im ersten Bildschirm der Startseite aus.

**Für die Mischfassung.** Mittelweg. Das Band bleibt auf der Startseite von A, denn dort ist es ein Stück Gestalt, das man sonst nirgends sieht, und Dominik mag A. Die Farben von A bleiben, Siena nur, wenn Siena überhaupt bleibt. Die Jahreszahlen stehen aufrecht in Graphit. Auf dem Telefon schiebt sich das Band nicht mehr mit, es steht beim Laden am rechten Ende wie in B. Der Klick zeigt die Angaben wie in Element 22 an Ort und Stelle, dazu ein Verweis „Bibliothek“. Den Vorspann kürzt Dominik selbst, die Prüfung schlägt einen Satz und eine gezeichnete Zeichenerklärung vor.

### 24. Leseliste und Stapel „gerade gelesen“

![A: was noch wartet, als mit Bleistift vorgezeichnete Umrisse, nur die Nachnamen in hellgrauer Kursive](vergleich/24-leseliste-a.jpg)
![B: was noch wartet, als Liste in zwei Spalten, Autor und Titel](vergleich/24-leseliste-b.jpg)
![A, doppelt vergrößert: der Nachttisch in zwei farbigen Stapeln, jedes Buch leicht versetzt](vergleich/24-leseliste-a2.jpg)
![B, doppelt vergrößert: der Nachttisch in zwei Stapeln aus Umrissen, bündig, das größte Buch zuunterst](vergleich/24-leseliste-b2.jpg)

**Vorher (A).** Die 75 Bücher, die noch warten, stehen am Ende des Regals als leere Rücken. Ihre Umrisse sehen aus wie mit Bleistift vorgezeichnet: vier einzelne Striche, die an den Ecken überstehen, manchmal fehlt der obere. Auf jedem Rücken steht nur der Nachname, kursiv, in hellem Grau (#A2A4A7). Den Titel sieht man erst beim Zeigen oder auf der Karteikarte. Die zehn Bücher, die Dominik gerade liest, liegen oben in zwei Stapeln, farbig wie im Regal. Jedes Buch ist per Hash um 2 bis 6 Pixel nach links oder rechts versetzt, damit der Stapel gelegt aussieht. Beim Zeigen rückt ein Buch 7 Pixel zur Seite. Darunter steht „auf dem nachttisch“ in Kapitälchen.

**Nachher (B).** Unter der Überschrift „Was noch wartet“ steht ein Register (ein Verzeichnis wie hinten im Buch): ein Eintrag je Zeile, „Fjodor Dostojewski, *Weiße Nächte*“, am Desktop in zwei Spalten, nach dem Erscheinungsjahr geordnet. Jeder Eintrag lässt sich zeigen und wählen wie ein Rücken, die Angaben erscheinen in einer Zeile, die am unteren Fensterrand stehen bleibt, solange die Liste weiterläuft. Der Nachttisch besteht aus Umrissen, bündig gestapelt, das größte Buch zuunterst, ohne Versatz. Darunter steht „Auf dem Nachttisch“ aufrecht und klein. Die Regeln von B hatten dafür Dominiks Regalnamen von Goodreads vorgesehen, „Lese ich gerade“. Die Rücksetzung hat das Wort von A zurückgebracht.

**Warum.** Die vorgezeichneten Umrisse sind Rang 52 und Rang 57: ein nachgebauter Gegenstand mit simulierter Handarbeit. Sie stammen aus synthese.md („Geisterreihe“). Der zweite Grund ist Lesbarkeit und hat mit KI nichts zu tun. Das helle Grau hat auf dem Grund von A einen Kontrast von 2,5 : 1. Die Richtlinie für barrierefreie Webseiten (WCAG) verlangt für normalen Text mindestens 4,5 : 1. Dazu kommt Rang 24, graue Kursive als zweite Stimme. Vor allem zeigt A die Liste gar nicht als Liste. Man sieht 75 Nachnamen und muss jeden einzeln anfassen, um zu erfahren, welches Buch gemeint ist. Beim Stapel ist der Versatz per Hash erfunden, das seitliche Rücken ist Rang 39, das Schild in Kapitälchen Rang 1. „Auf dem Nachttisch“ führt die Liste unter Rang 28 ausdrücklich als deutsches Beispiel für inszenierte Rubriknamen.

**Vorteile.**
- Die ganze Leseliste ist lesbar, durchsuchbar (Strg+F findet jeden Titel) und für Vorleseprogramme (Software, die blinden Menschen die Seite vorliest) zugänglich.
- Jeder Text hat ausreichend Kontrast.
- Nichts ist nachgezeichnet oder gestreut. Der Stapel zeigt die echten Formate.

**Nachteile und Risiken.**
- Das schöne Bild der leeren Plätze, die auf ihre Bücher warten, geht verloren. Es ist eine poetische Idee, die zu einem Schriftsteller passt.
- Die Liste ist lang, in B am Desktop gut 1500 Pixel. Die Bibliothek endet mit einem Textblock, der wie ein Literaturverzeichnis aussieht.
- Der Stapel aus Umrissen wirkt steif. Sehr dünne Bücher wie Rilkes *Duino Elegies* tragen nur noch winzige Schrift.

**Verworfene Alternativen.** Die Prüfung schlug einen aufklappbaren Satz mit allen Titeln vor. Das versteckt die Liste wieder. Die Leseliste nur im Zeitband zu zeigen, als dritte Reihe, reicht nicht, denn dort sieht man keine Titel. A und B haben diese Reihe zusätzlich.

**Sicherheit.** Hoch für die Liste, denn der Kontrast ist gemessen und liegt deutlich unter dem Mindestwert. Beim Stapel ist es Geschmack.

**Für die Mischfassung.** Für die Leseliste aus B übernehmen, aber in der Typografie von A: Vollkorn, Graphit, zwei Spalten, Werktitel kursiv. Beim Nachttisch Mittelweg. Die farbigen Stapel von A bleiben, aber bündig ohne Versatz und ohne seitliches Rücken beim Zeigen. Das Schild steht aufrecht. Ob es „Auf dem Nachttisch“ oder „Lese ich gerade“ heißt, entscheidet Dominik nach dem Wort, das er selbst benutzt.

### 25. Länder-Seite

![A: das Länderregister mit Kontinenten in Kapitälchen, jeder Name unterstrichen, rechts der Globus mit beigen Ländern](vergleich/25-laender-a.jpg)
![B: die Kontinente als halbfette Überschriften, die Namen ohne Strich, rechts die Karte mit Schraffur im Rahmen](vergleich/25-laender-b.jpg)
![A, doppelt vergrößert: das Register beim Zeigen auf Deutschland, jeder Name trägt einen feinen Strich](vergleich/25-laender-a2.jpg)
![B, doppelt vergrößert: das Register beim Zeigen auf Deutschland, nur dieser Name ist unterstrichen](vergleich/25-laender-b2.jpg)

**Vorher (A).** Das Register steht als ein Absatz je Kontinent mit hängendem Einzug. Vorn steht der Kontinent als Stichwort in Kapitälchen („europa“), dahinter die Länder alphabetisch, durch Kommas getrennt. Jeder Name ist ein Knopf, der den Globus dreht, und trägt das „feine“ Rezept der Unterstreichung: ein Pixel stark, etwas abgesetzt, in 20 % der Textfarbe. Im ersten Bildschirm sind 75 Elemente unterstrichen. Alle vier Kontinente passen in den ersten Bildschirm. „Länderguides, in Arbeit.“ steht grau unter dem Titel. Rechts steht der Globus in Fensterhöhe, angeschnitten, die bereisten Länder beige.

**Nachher (B).** Jeder Kontinent hat eine halbfette Überschrift, darunter stehen die Länder im Fließsatz (als fortlaufender Text) ohne Strich. Beim Zeigen wird ein Name unterstrichen, das gewählte Land steht halbfett. Eine winzige Sperrung gleicht die Mehrbreite des Halbfetten aus, damit nichts neu umbricht. USA steht in Kapitälchen, wie es der Buchsatz für Abkürzungen vorsieht. Das Register braucht mehr Höhe, im ersten Bildschirm stehen nur Europa und Asien. Die Karte steht im Rahmen mit Schraffur und haftet am Desktop neben dem Register. Die Inselmuster gehören zu den eigenen Rücken im Regal (Element 21), unter ihnen der Rücken „Länder“ mit einem Netzmuster. Die Zeichnung der Kugel selbst gehört zum Globus und steht in einem anderen Teil dieses Dokuments.

**Warum.** Die 75 Striche sind Rang 53, Unterstreichung als Zierde. Die Liste nennt das „feine“ Rezept wörtlich als den gängigen Schnipsel für „geschmackvolle“ Links. Kyle Chayka spricht im New Yorker von „overzealous underlining“. Ist alles unterstrichen, zeigt der Strich nicht mehr, was ein Link ist, er wird zur Stimmung. Die Belege für Rang 53 sind dünn („gelegentlich“), aber die Dichte hier ist extrem. Die Kapitälchen der Kontinente sind Rang 1. Hier ist B strenger als die Prüfung. Die Prüfung nennt das Stichwort in Kapitälchen am Absatzanfang eine echte Registerkonvention, die bleiben darf. B verbietet Kapitälchen als Label überall. Das graue „in Arbeit“ ist Rang 11 und Rang 35, denn die Formel steht auf der Website von A mindestens siebenmal.

**Vorteile.**
- Das Register liest sich ruhig als Text. Man erfasst auf einen Blick, wo Dominik war.
- Was gezeigt oder gewählt ist, sieht man sofort, am Strich beim Zeigen und am Halbfett bei der Wahl.
- Die Unterstreichung behält ihre Bedeutung für echte Verweise.

**Nachteile und Risiken.**
- Dass man die Namen anklicken kann, sieht man in B erst beim Zeigen. Auf dem Telefon gibt es kein Zeigen, also gar keinen Hinweis.
- Das Register wird mit Überschriften länger und wirkt wie ein Dokument. Die dichte, buchartige Form von A geht verloren.
- Halbfette Überschriften für vier Kontinente sind mehr Gewicht, als der Inhalt braucht.

**Verworfene Alternativen.** Das feine Rezept behalten und nur noch heller setzen. Das bliebe bei 75 Strichen. Gar keine Auszeichnung, nur der Mauszeiger als Hinweis. Das wäre auf dem Telefon unsichtbar.

**Sicherheit.** Mittel für die Striche, die Belege für Rang 53 sind dünn, die Dichte ist aber eindeutig. Geschmack für die Kapitälchen der Kontinente, Prüfung und Regeln von B urteilen hier verschieden.

**Für die Mischfassung.** Mittelweg. Das kompakte Register von A bleibt, mit den Kontinenten als Stichwort in Kapitälchen am Absatzanfang, denn das ist echter Registersatz. Die Namen verlieren ihren Strich wie in B. Beim Zeigen erscheint er, das gewählte Land steht schwarz oder halbfett. Die Kontinente im Satz darüber („in Europa, viele in Asien …“) bleiben unterstrichen, sie zeigen, dass man hier etwas bedienen kann. „Länderguides, in Arbeit.“ steht in Graphit statt in Grau.

### 26. Vita

![A: die Vita in zwei Spalten, der erste Satz in IM Fell, rechts die Stationen mit kursiven Orten, grauen Koordinaten und hellgrauen Nebenorten](vergleich/26-vita-a.jpg)
![B: die Vita in zwei Spalten, der erste Satz in der Textschrift, rechts die Stationen aufrecht und alle gleich dunkel](vergleich/26-vita-b.jpg)
![A, ganze Seite: das Foto klein am Fuß der rechten Spalte](vergleich/26-vita-a2.jpg)
![B, ganze Seite: das Foto in Spaltenbreite unter den Stationen](vergleich/26-vita-b2.jpg)
![A auf dem Telefon: das Foto steht direkt unter dem Titel](vergleich/26-vita-a3.jpg)
![B auf dem Telefon: das Foto erscheint erst nach Text und Stationen, im dritten Bildschirm](vergleich/26-vita-b3.jpg)

**Vorher (A).** Die Seite ist wie eine Buchklappe gesetzt. Links stehen der Titel, Dominiks erster Satz in der IM Fell French Canon und sechs Absätze mit halber Zeile Abstand. Rechts steht „stationen“ in Kapitälchen, darunter zwölf Einträge. Die Jahreszahl hängt links im Steg (dem weißen Rand zwischen den Spalten). Der Ort steht kursiv und schwarz, darunter die Koordinaten klein, kursiv und grau. Die sechs Nebenorte, also Colombo, Cotonou, Mallorca, Kapstadt, Sansibar und Buenos Aires, stehen kleiner und heller (#7C7E83, Kontrast 4,0 : 1). Das Bootsfoto steht am Fuß der rechten Spalte, 285 Pixel breit, mit grauer Bildlegende. Auf dem Telefon steht das Foto direkt unter dem Titel, noch vor dem Text.

**Nachher (B).** Links stehen der Titel und der erste Satz in der Textschrift, im normalen Grad, in drei Zeilen. Die Absätze folgen ohne Abstand, ab dem zweiten mit Einzug wie im Buch, AIESEC steht in Kapitälchen. Rechts steht „Stationen“ halbfett. Die Jahreszahlen stehen in einer eigenen Spalte rechtsbündig vor dem Eintrag. Alle Orte stehen aufrecht, die Nebenorte so groß und so dunkel wie die Wohnorte, „längerer Aufenthalt“ sagt den Unterschied. Die Koordinaten stehen klein und aufrecht in Schwarz. Die Regeln von B hatten sie gestrichen, die Rücksetzung auf den Wortlaut von A hat sie zurückgebracht. Das Foto ist 550 Pixel breit und steht unter den Stationen, die Legende klein in Schwarz. Auf dem Telefon kommt es erst nach dem ganzen Text und allen Stationen.

**Warum.** Die Vita ist neben der Startseite die Seite mit der meisten grauen Kursive. Die Prüfung hat gemessen, dass 15 % aller Zeichen im ersten Bildschirm zugleich grau und kursiv sind. Das ist Rang 24, die zweite, leise Stimme neben dem Text. Kursive Ortsnamen sind Rang 8. In der Kartografie stehen Siedlungen aufrecht, kursiv sind Gewässer. Koordinaten auf einer Seite ohne Karte sind Rang 26. taste-skill verbietet „coordinates“ ausdrücklich als Agentur-Schmuck, weil man mit ihnen hier nichts tun kann. Die Nebenorte liegen mit 4,0 : 1 unter dem Mindestkontrast. Das ist eine Frage der Lesbarkeit. Die Vita hat elf Schriftgrade, fünf davon zwischen 13 und 16,6 Pixeln (Rang 30), und mehrere Grautöne nebeneinander (Rang 29). Die Kapitälchen-Überschrift ist Rang 1. Die hängende Jahreszahl behalten beide, denn die Stationen sind eine echte Chronologie, dort ist sie Registerkonvention (Rang 55 verlangt nur, sie nicht als Abschnittskopf zu verwenden). Das größere Foto folgt Rang 7. Generierte Seiten haben zu wenige echte Bilder, also soll das eine Foto Gewicht bekommen. Zur IM Fell siehe den Teil über den ersten Satz.

**Vorteile.**
- Ein Text, eine Stimme. Jede Station ist gleich gut zu lesen.
- Kein Text liegt unter dem Mindestkontrast.
- Das größere Foto zeigt Dominik deutlicher und gibt der Seite ein echtes Bild.
- AIESEC in Kapitälchen ist ein Detail, das nur jemand vom Fach setzt.

**Nachteile und Risiken.**
- Auf dem Telefon sieht man in B das Gesicht erst im dritten Bildschirm. A zeigt es sofort, das ist für eine Vita besser.
- Die Abstufung zwischen Wohnorten und kurzen Aufenthalten ist in B nur noch ein Wort. A zeigt sie auf einen Blick.
- Absätze ohne Abstand mit Einzug sind im Buch richtig, am Bildschirm wird die lange Vita dadurch ein dichter Block.
- Der erste Satz im normalen Grad verliert seinen Auftritt. Die Seite beginnt unscheinbarer.
- Die Koordinaten stehen auch in B noch da, B löst Rang 26 hier also nicht.

**Verworfene Alternativen.** Die Prüfung wollte die Koordinaten in der Vita streichen, weil es dort keine Karte gibt. B hatte in einer Runde die ganze Stationenliste gestrichen, weil sie Dominiks Text wiederholt. Beides kam mit der Rücksetzung zurück. Die Stationenzeile nach Joyce als Unterschrift ans Ende der Vita zu setzen, hat B nicht übernommen.

**Sicherheit.** Hoch für graue Kursive und Kontrast, beides ist auf dieser Seite gemessen. Mittel für die Koordinaten. Geschmack für die Größe des Fotos.

**Für die Mischfassung.** Mittelweg. Die Anordnung von A bleibt, auch das Foto auf dem Telefon direkt unter dem Titel. Von B kommen die Stationen mit aufrechten Orten, Nebenorten gleich groß und gleich dunkel und Jahreszahlen in Graphit. Die Koordinaten würde ich streichen. Will Dominik sie behalten (Frage 5 der Regeln von B), dann aufrecht in Graphit, eine Stufe kleiner. Die Überschrift „Stationen“ folgt der Entscheidung über die Kapitälchen-Labels. Die Absätze behalten den halben Zeilenabstand von A. Das Foto würde ich etwas größer setzen als in A, etwa halb so breit wie die Textspalte. Das ist Geschmack.

### 27. Lesen, Erzählungen, Untertext, Impressum und Datenschutz

![A: Leseseite mit Probetext, Titel in Siena, Ort und Koordinaten grau, Szenenwechsel als drei graue Sternchen in der Mitte](vergleich/27-kleine-seiten-a.jpg)
![B: dieselbe Leseseite, Titel in Schwarz, Szenenwechsel als drei Sternchen links in Schwarz ohne zusätzlichen Abstand](vergleich/27-kleine-seiten-b.jpg)
![A: Datenschutz, die Rechte mit grauem Strich davor und grauen Artikelangaben](vergleich/27-kleine-seiten-a2.jpg)
![B: Datenschutz, die Rechte eingezogen ohne Strich, Artikelangaben in Schwarz, DSGVO in Kapitälchen](vergleich/27-kleine-seiten-b2.jpg)
![A: Impressum mit Überschriften in Kapitälchen und grauem, kursivem Entwurfsvermerk](vergleich/27-kleine-seiten-a3.jpg)
![B: Impressum mit halbfetten Überschriften und aufrechtem Entwurfsvermerk in Schwarz](vergleich/27-kleine-seiten-b3.jpg)

Die Website enthält noch keine Erzählung. Für die beiden Bilder der Leseseite habe ich beim Laden einen Probetext eingesetzt, ohne eine Datei zu ändern. Er steht nur dort, damit man Absätze, Szenenwechsel und Notiz sieht.

**Vorher (A).** Auf der Leseseite steht der Titel in Siena. Untertitel, Ort und Datum sind grau, die Koordinaten klein, kursiv und grau darunter. Die Absätze haben einen Einzug. Ein Szenenwechsel ist eine eigene Zeile mit drei grauen Sternchen in der Mitte, mit je einer Zeile Luft davor und danach. Die Notiz am Ende ist grau und kursiv, „Früher:“ grau. Auf den leeren Seiten Erzählungen und *Untertext* steht „Noch steht hier keine.“ grau. Im Impressum stehen die Überschriften in Kapitälchen („angaben gemäß § 5 ddg“), der Vermerk „Entwurf, vor der Veröffentlichung zu prüfen.“ grau und kursiv, die Adresse in vier Zeilen, der Schlusssatz klein und grau. In der Datenschutzerklärung stehen acht Überschriften in Kapitälchen. Vor jedem Recht steht ein grauer Halbgeviertstrich (der kurze Gedankenstrich), dahinter „(Art. 15 DSGVO)“ in Grau.

**Nachher (B).** Der Titel der Leseseite ist schwarz, Untertitel im Textgrad, Ort, Datum und Koordinaten klein, aufrecht und schwarz. Der Szenenwechsel sind dieselben drei Sternchen, aber linksbündig, schwarz und ohne zusätzlichen Abstand. B hatte hier zuerst nur eine Leerzeile, die Sternchen sind seit dem 21. Oktober zurück. Die Notiz steht klein in Schwarz, „Früher:“ in einer festen Spalte vor dem Titel. Leere Seiten zeigen denselben Satz in Schwarz. Impressum und Datenschutz haben halbfette Überschriften. Abkürzungen wie DDG, MStV und DSGVO stehen in Kapitälchen. Der Entwurfsvermerk ist klein, aufrecht und schwarz. Die Absätze der Datenschutzerklärung folgen ohne Abstand mit Einzug. Die Rechte stehen eingezogen ohne Strich, die Artikelangaben schwarz und untrennbar, deshalb bricht der erste Eintrag um. Die Abschnitte zu Schriften und Programmbibliotheken sind neu gefasst, weil B weder Google Fonts noch jsDelivr nutzt (Element 28).

**Warum.** Auf diesen Seiten wiederholt sich im Kleinen, was die großen Seiten prägt: graue Kursive als zweite Stimme (Rang 24) im Vermerk, in der Notiz und bei Ort und Datum, grauer Nebentext (Rang 11) bei den Artikelangaben, Kapitälchen-Überschriften (Rang 1) und Siena für den Titel (Rang 10). Koordinaten unter einer Erzählung sind Rang 26, man kann mit ihnen nichts tun. Die drei Sternchen sind dagegen eine echte Buchkonvention und kein KI-Merkmal. Dass B sie linksbündig setzt, folgt nur der eigenen Regel, nichts zu zentrieren. Kapitälchen für Abkürzungen im Lauftext sind das Gegenmittel, das die Liste unter Rang 1 selbst nennt (nach Bringhurst). Bei Rechtstexten kommt ein Grund ohne KI dazu. Wer ein Impressum liest, sucht etwas. Eine Textfarbe hilft dabei.

**Vorteile.**
- Die Rechtstexte stehen in einer Farbe und sind ruhiger zu lesen.
- Der Titel einer Erzählung braucht keine Sonderfarbe, er steht ohnehin oben und groß.
- Die Kapitälchen bei Abkürzungen sind ein feines Detail aus dem Buchsatz.

**Nachteile und Risiken.**
- Der Szenenwechsel in B ist ohne Abstand und linksbündig leicht zu übersehen. Er sieht aus wie eine verirrte Zeile. In A erkennt man ihn sofort.
- Absätze ohne Abstand machen die Datenschutzerklärung dichter. Für Rechtstext ist das eher ein Nachteil.
- Die Liste der Rechte ohne Strich sieht weniger nach Liste aus. Der umbrochene erste Eintrag liest sich wie zwei Einträge.
- Kapitälchen bei „DSGVO“ wirken auf manche Leser wie Kleinbuchstaben.

**Verworfene Alternativen.** Nur eine Leerzeile als Szenenwechsel, wie B sie zuerst hatte. Am Bildschirm ist eine Leerzeile nicht von einem Seitenumbruch oder einem Fehler zu unterscheiden. Die Sternchen zentriert in Schwarz, also die Form von A ohne Grau. Das hat B wegen der eigenen Regel nicht gewählt.

**Sicherheit.** Mittel. Die Merkmale sind dieselben wie auf den großen Seiten und dort gemessen, hier stehen aber nur wenige Zeichen. Beim Szenenwechsel ist es Geschmack.

**Für die Mischfassung.** Mittelweg. Die Seiten von A bleiben. Die Überschriften folgen der Entscheidung über die Kapitälchen-Labels. Entwurfsvermerk, Notiz, Ort und Datum stehen aufrecht und klein in Graphit, die Artikelangaben in Graphit. Der Titel der Leseseite steht in Graphit, falls Siena fällt. Die Koordinaten unter einer Erzählung fallen weg, der Ortsname genügt. Der Szenenwechsel bleibt wie in A in der Mitte mit Luft, aber in Graphit. Die Liste der Rechte behält den Halbgeviertstrich von A, das ist eine übliche deutsche Listenform, nur nicht grau. Die Kapitälchen für Abkürzungen kann A mit der Vollkorn SC übernehmen, das ist Geschmack. Die Abschnitte zu Schriften und Bibliotheken richten sich nach Element 28.

### 28. Technik und Datenschutz

![A: die Startseite, wenn die fremden Server nicht erreichbar sind, mit Ersatzschrift und ohne Globus](vergleich/28-technik-a.jpg)
![B: die Startseite unter denselben Bedingungen, unverändert](vergleich/28-technik-b.jpg)
![A: der Anfang von seite.js, so wie A ihn ausliefert, mit erzählendem Kommentar](vergleich/28-technik-a2.jpg)
![B: der Anfang von seite.js nach dem Bau, ohne Kommentare](vergleich/28-technik-b2.jpg)

**Vorher (A).** Jede der elf Seiten bindet die Schriften Vollkorn und Vollkorn SC über einen Link zu Google Fonts ein, Startseite und Vita zusätzlich die IM Fell. Die Schriftdateien kommen von fonts.gstatic.com. Die vier Seiten mit Globus laden die Programmbibliotheken d3 und topojson-client von jsDelivr, einem CDN (einem fremden Netz von Servern, das Dateien für viele Websites ausliefert). Ich habe alle elf Seiten geladen und gezählt: 55 Anfragen an fremde Server, 11 an fonts.googleapis.com, 36 an fonts.gstatic.com, 8 an cdn.jsdelivr.net. Der Bau von A (das Skript, das vor dem Veröffentlichen aus den Arbeitsdateien die ausgelieferten Dateien macht) kopiert alles Byte für Byte. Damit gehen alle Kommentare mit, also die Notizen im Quelltext (dem Text, aus dem der Browser die Seite baut und den jeder mit einem Rechtsklick ansehen kann), die der Browser überliest. In HTML, CSS und den eigenen Skripten von A sind das rund ein Fünftel des Umfangs, etwa 86 KB, fast alles ganze deutsche Sätze. Sechs davon stehen sogar als HTML-Kommentar in den Seiten, etwa „Der erste Satz der Vita als Einstieg, in drei Gliedern; das Skript gleich darunter setzt ihn und spielt ihn einmal ab“.

**Nachher (B).** B liefert die Schrift Baskervville als zwei WOFF2-Dateien (das übliche Dateiformat für Webschriften, zusammen 108 KB) aus dem eigenen Ordner aus, mit der Lizenz daneben. d3 und topojson-client liegen als Kopien mit ihren Lizenzen im Ordner lib. Beim Laden aller elf Seiten gibt es keine einzige Anfrage an einen fremden Server. Der Bau von B entfernt alle Kommentare aus HTML, CSS und den eigenen Skripten und prüft danach, dass keiner übrig ist. Die Arbeitsdateien behalten ihre Kommentare, auch in B sind sie ausführlich.

**Was ein Besucher davon merkt.** Meist nichts. Die Seite sieht gleich aus und lädt etwa gleich schnell. Früher hieß es, Google Fonts seien schneller, weil der Browser die Schrift von anderen Seiten schon kennt. Seit 2021 halten Chrome, Firefox und Safari aber für jede Website einen eigenen Zwischenspeicher, dieser Vorteil ist weg. Einen Unterschied sieht nur, wer die fremden Server nicht erreicht: mit einem strengen Blocker, in manchen Firmennetzen, bei einer Störung des CDN oder in Ländern, in denen Google gesperrt ist, etwa in China. Dann zeigt A eine Ersatzschrift (auf Apple-Geräten Iowan Old Style, sonst Georgia, im Bild eine Linux-Schrift) und auf vier Seiten statt des Globus den Satz „Der Globus lässt sich gerade nicht laden.“ B sieht in diesem Fall genauso aus wie sonst. Das Bild von A ist die Startseite nach neun Sekunden, also nach dem Ende des Einflugs.

**Warum.** Der Hauptgrund ist Datenschutz. Bindet eine Seite Google Fonts per Link ein, schickt der Browser die IP-Adresse des Besuchers an Google, bevor der irgendetwas zustimmen kann. Das Landgericht München I hat darin am 20. Januar 2022 eine Verletzung des Persönlichkeitsrechts gesehen und 100 € Schadensersatz zugesprochen (Az. 3 O 17493/20). Danach kam eine Abmahnwelle. Für jsDelivr gilt dasselbe, die Daten können dort auch im Vereinigten Königreich und in den USA verarbeitet werden. A muss beides in der Datenschutzerklärung in zwei langen Abschnitten erklären. Als KI-Merkmal ist Google Fonts per Link (Rang 48) „häufig“, aber nicht belegt. Für Leser ist es unsichtbar, im Quelltext sieht man es sofort. Die erzählenden Kommentare sind Rang 67. Die Liste führt sie als Claude-typisch, die Begleitstudie zur Reddit-Auswertung nennt „narrating comments“ als Merkmal generierten Codes. Die Beleglage ist dünn. Die Prüfung schreibt dazu: „Wer den Quelltext öffnet, erkennt die Herkunft in Sekunden.“ Das tun Journalisten, Agenturen, Verlage mit eigener Technik und Seiten wie isthatvibecoded.com. Rang 68, Fingerabdrücke von Generatoren wie „Built with v0“ oder eine mitgelieferte CLAUDE.md, trifft auf keine der beiden Fassungen zu. README und Werkzeuge werden in beiden nicht ausgeliefert. Es bleibt nur der Hinweis auf claude.ai als Hoster in der Datenschutzerklärung, der in der Testphase wahr und nötig ist. Die Kommentare sind in A das, was einem Fingerabdruck am nächsten kommt. Rang 15, shadcn und Tailwind im Werkszustand mit Code-Reflexen wie „transition: all“ und „z-index: 9999“, trifft auf A ebenfalls nicht zu. Beide Fassungen haben eigenes CSS.

**Vorteile.**
- Kein Besucher wird ungefragt an Google oder jsDelivr gemeldet. Die Datenschutzerklärung wird kürzer und stimmt einfacher.
- Die Seite sieht überall gleich aus, auch hinter Blockern und in gesperrten Netzen.
- Der ausgelieferte Quelltext erzählt nichts mehr über seine Entstehung.
- Am Aussehen ändert sich nichts. Dominiks Wunsch nach der Anmutung von A wird nicht berührt.

**Nachteile und Risiken.**
- Einmal Arbeit: Die Schriftdateien von Vollkorn, Vollkorn SC und, falls sie bleibt, IM Fell müssen geholt und eingebunden werden. Alle drei stehen unter der SIL Open Font License, das erlaubt, sie vom eigenen Server auszuliefern. Die Dateien sollten vom Original kommen, damit Kapitälchen und Mediävalziffern erhalten bleiben.
- Updates von d3 kommen nicht mehr von selbst. Für eine Website dieser Art ist das eher ein Vorteil, denn nichts ändert sich unbemerkt.
- Der Bau muss vor jeder Veröffentlichung laufen. Vergisst man ihn, gehen die Kommentare wieder mit.
- Der ausgelieferte Code ohne Kommentare ist für jemanden, der später daran arbeitet, schwerer zu lesen. Die Arbeitsdateien behalten sie deshalb.

**Verworfene Alternativen.** Google Fonts behalten und vorher um Zustimmung bitten. Das bringt einen Einwilligungsbanner auf eine Autorenseite, schlechter für jeden Besucher. Einen datenschutzfreundlichen Spiegel wie Bunny Fonts nutzen. Das bleibt ein fremder Server. Den ganzen Code zusätzlich verkleinern und unleserlich machen. Das ist für diese Seite unnötig und erschwert die Fehlersuche.

**Sicherheit.** Hoch für Datenschutz und Zuverlässigkeit, Urteil und Messung sind eindeutig. Mittel für den KI-Effekt, denn Rang 48 ist als KI-Merkmal nicht belegt und Rang 67 nur dünn.

**Für die Mischfassung.** Aus B übernehmen, in fünf Schritten:
- Vollkorn, Vollkorn SC und, falls sie bleibt, IM Fell als WOFF2 in einen eigenen Ordner legen, mit der Lizenzdatei.
- d3 und topojson-client als lokale Kopien mit ihren Lizenzen in den Ordner lib legen.
- Den Bau von B (werkzeuge/artefakt.py, der die Kommentare entfernt und danach prüft) für den Ordner von A anpassen.
- Die Abschnitte „Schriften“ und „Programmbibliotheken“ der Datenschutzerklärung wie in B neu fassen.
- Im Kolophon (der Angabe zu Schrift und Kartendaten im Fuß) Schrift und Lizenz nennen.

Dominik und seine Besucher sehen davon nichts.
