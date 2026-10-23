# Wie die Seiten beim Laden erscheinen: fünf Varianten und eine Empfehlung

Stand 23. Oktober 2026. Anlass ist Dominiks Eindruck, dass das Auge am Desktop auf der Startseite und auf *Satoshi* beim Laden überfordert ist, auf *Ursprünge* etwas weniger, und sein Bauchgefühl, dass der Globus als Letztes kommen sollte.

**Kurz gesagt.** Der externe Gestalter bestätigt Dominiks Eindruck: Heute fallen in die erste Lesesekunde drei Dinge zugleich, der einfliegende Satz, das Hineinplatzen von Globus, Regal und Tafel, und auf *Satoshi* schon der Beginn der Globusbewegung. Wann der Globus hineinplatzt, entscheidet heute der Zufall der Rechnerlast (zwischen 0,6 und 1,2 Sekunden), nicht die Gestaltung. Gute Redaktions- und Buchseiten lassen den Text sofort stehen und zeigen große Karten still; wenn sich eine Karte bewegt, dann später oder erst, wenn der Leser etwas tut. Empfohlen und als Testlink gebaut ist Variante 2 „Globus zuletzt“: Erst steht der Satz allein, dann kommt leise das Regal oder das Buch, der Globus als Letztes, und er beginnt sich eine Sekunde danach zu bewegen. Es bewegt sich nie mehr als eine Sache zugleich, und jede Handlung des Lesers lässt sofort alles erscheinen. Die stärkste Gegenrede spricht für Variante 1: Alles bleibt sofort da, nur die Bewegung wartet; das ist die Praxis der Redaktionen und die kürzeste Wartezeit. Darin gehen die Urteile auseinander: Gestalter und Prüfer aus Dominiks Sicht setzen Variante 2 an die Spitze, der Prüfer für Nutzbarkeit Variante 1, weil man bei Variante 2 auf jeder Seite rund 3 Sekunden auf den Globus wartet. Variante 2 berührt das KI-Merkmal „inszenierter Ladeauftritt“ (Rang 25 in `ki-merkmale.md`) stärker als Variante 1; vertretbar ist das nur, weil es bei zwei leisen Stufen bleibt, nur über die Deckkraft, ohne Gleiten.

## Begriffe

- **Einflug:** Der große erste Satz der Startseite und der Aufhänger von *Satoshi* erscheinen Wort für Wort, leicht unscharf, und werden scharf.
- **Einspieler:** Der Globus fliegt von selbst die erste Station an (Startseite: Dortmund, *Satoshi*: Buenos Aires, *Ursprünge*: Göbekli Tepe) und erzählt danach weiter.
- **Deckkraft:** Wie durchsichtig etwas ist. „Nur über die Deckkraft einblenden“ heißt: Es wird sichtbar, ohne sich zu bewegen oder zu wachsen.
- **Sprung:** Ein Teil der Seite rutscht weg, weil oben etwas nachträglich Platz braucht. Gemessen als Verschiebungswert (CLS); 0 heißt, nichts springt.
- **Textmoment:** Der Zeitpunkt, ab dem der erste Satz steht. Auf Seiten ohne Einflug: erstes Bild plus 1 Sekunde.

## Testlinks

- Die empfohlene Variante 2 ist als ganze Website gebaut: [Globus zuletzt](https://claude.ai/artifact/YNHCYoruZSVqHntS3BRSgQ). Die fünf Varianten zum Gegentesten liegen auf einer [eigenen Vergleichsseite](https://claude.ai/artifact/LdXQjJubBA6uogxtngZ9un), je Variante mit Startseite, *Satoshi* und *Ursprünge*. Version C heute: [Testlink](https://claude.ai/artifact/AnmtFCzJT8c4Q7rCgZrQFq).
- Die Varianten beruhen auf dem Stand vor dem mitwandernden Globus und vor dem neuen Buch auf dem Telefon; beides steht in Version C und kommt bei der Übernahme dazu.
- Am besten am Desktop öffnen und jede Seite mehrmals neu laden.

## Wie andere Seiten das machen

Der Proxy hat die meisten Seiten gesperrt. Wo „Quelltext“ steht, wurde der offene Code der Seite gelesen; „nur Suche“ heißt, die Angabe stammt aus einer Suchzusammenfassung.

- [IBM Carbon, Choreografie](https://carbondesignsystem.com/elements/motion/choreography/) (Quelltext): Beim Laden erst das Stabile, dann Text und Bilder, „animierte Datengrafiken“ zuletzt. Die ganze Folge dauert dort aber höchstens 0,5 Sekunden.
- [Maggie Appleton](https://maggieappleton.com) (Quelltext): Titel, Unterzeile, dann der Rest als ein Block; nach 0,45 Sekunden steht alles.
- [The Pudding](https://pudding.cool) (Quelltext): Alles steht sofort, nur eine kleine Zeile bewegt sich. Globen und Karten bewegen sich erst auf Klick oder beim Rollen.
- Guardian, Reuters Graphics, Republik, Art Institute of Chicago, Standard Ebooks (Quelltext): Überschrift und Hauptbild ohne Einblenden, Platz reserviert, nichts springt. Der Ortsglobus von Reuters dreht sich nur auf Zutun (750 ms).
- [GitHub, wie der Globus gebaut ist](https://github.blog/engineering/engineering-principles/how-we-built-the-github-globe/) und [Stripe, Globus](https://stripe.com/blog/globe) (nur Suche): Produktseiten, deren Globus von selbst läuft. Genau das ist das Muster hinter dem KI-Merkmal „Prunkstück-Widget“ (Rang 27).
- [Craig Mod über „Snow Fall“](https://craigmod.com/essays/far_beyond_snowfall) (nur Suche): Viele bewegte Schichten überdecken das Lesen.
- [NN/g, Text-Animationen beim Rollen bremsen Leser](https://www.nngroup.com/articles/scroll-animations/) (nur Suche): Einblenden über 0,5 Sekunden wirkt langsam.
- [Apple, Richtlinien zur Bewegung](https://developer.apple.com/design/human-interface-guidelines/motion) (gelesen): Bewegung am Rand des Blickfelds fällt besonders auf; niemand soll auf eine Animation warten müssen.
- Forschung (nur Suche): Der Beginn einer Bewegung zieht den Blick an, eine laufende kaum (Abrams und Christ 2003). Bewegte Elemente rechts neben einem Text stören das Lesen am stärksten (Simola u. a. 2011). Am Desktop steht der Globus genau dort.

## Heute

Gemessen in der Seite selbst, 5 Läufe je Seite, Median, Desktop 1440 Pixel breit. Der Rechner war belastet; die Abstände stimmen, die genauen Zeiten streuen.

| Zeit | Startseite |
|---|---|
| 0,13 s | Kopf, Navigation, Kurzvita stehen. Der Satz beginnt einzufliegen. |
| 0,6–1,0 s | Globus, Regal, Tafel „bis 2014 Dortmund“ und Steuerzeile erscheinen gleichzeitig, während der Satz noch fliegt. Dabei springt die Seite (0,07). |
| 1,04 s | Der Satz steht. |
| 1,6 s | Der Einspieler beginnt, mitten in der Lesezeit des Satzes. |
| 2,2–3,1 s | Ring um die Kugel, feine Karte blendet ein. |

| Zeit | *Satoshi* |
|---|---|
| 0,32 s | Kopf, Titel; der Aufhänger beginnt einzufliegen. |
| 0,3–0,6 s | Globus, Tafel mit Szenentext, Steuerzeile. |
| 0,77 s | Der Einspieler beginnt, während der Aufhänger noch fliegt. |
| 1,3 s | Der Aufhänger steht. |
| 2,1–3,5 s | Das Inhaltsbuch blendet ein, fast gleichzeitig mit der Landung in Buenos Aires. |

| Zeit | *Ursprünge* |
|---|---|
| 0,1–0,2 s | Text, Globus und Tafel praktisch zugleich, kein Einflug. |
| 0,78 s | Der Einspieler beginnt, während man die Überschrift liest. |

Auf dem Telefon steht der Globus unter dem Text, aber zu 55 bis 87 Prozent im ersten Bildschirm; sein Einspieler beginnt dort nach 0,7 bis 1,5 Sekunden. Sprünge gibt es heute auch auf Bibliothek (bis 0,28) und Länder (0,015 bis 0,06).

## Die Varianten

Alle Varianten außer Variante 0 beseitigen die Sprünge (Startseite, Bibliothek, Länder). Texte sind überall gleich. Bei reduzierter Bewegung (Systemeinstellung „Bewegung reduzieren“) steht in allen Varianten alles sofort, und der Globus spielt nichts ab. Tastatur und Vorleseprogramme erreichen in allen Varianten alles ab dem ersten Bild.

### 0. So lassen

![Startseite 1440, heute: Globus, Regal und Tafel erscheinen um 1 s neben dem Satz](einblenden/v0-index-1440.jpg)
![Satoshi 1440, heute: Globus ab 0,6 s neben dem fliegenden Aufhänger](einblenden/v0-satoshi-1440.jpg)

**Ablauf.** Wie oben unter „Heute“.

**Vorteile.**

- Keine Inszenierung; nach gut 1 Sekunde steht alles.
- Der Globus zeigt früh, dass er erzählt.
- Kein Eingriff, kein Risiko.

**Nachteile.**

- Bis zu fünf Bereiche ändern sich innerhalb einer halben Sekunde.
- Der Zeitpunkt hängt vom Rechner ab, nicht von der Gestaltung.
- Die Bewegung beginnt mitten im Lesen (*Satoshi* sogar mitten im Einflug).
- Die Seite springt auf Startseite, Bibliothek und Länder.

### 1. Nur die Bewegung wartet

![Startseite 1440, Variante 1: Globus, Regal und Tafel kommen gemeinsam, die Bewegung erst nach 4 s](einblenden/v1-index-1440.jpg)
![Satoshi 1440, Variante 1: Globus steht still ab 0,6 s, Bewegung ab 4,15 s](einblenden/v1-satoshi-1440.jpg)

**Ablauf.** Nichts wird eingeblendet. Was das Skript zeichnet, erscheint auf einmal an einem freigehaltenen Platz. Startseite: Globus, Regal und Tafel um 0,7 Sekunden, Einspieler bei 4,1 bis 4,4 Sekunden. *Satoshi*: Globus ab 0,3 Sekunden, Buch 2,1 bis 3,5 Sekunden, Einspieler bei 4,1 Sekunden. *Ursprünge*: Einspieler bei 3,5 Sekunden. Wer klickt, tippt oder rollt, startet die Bewegung sofort.

**Vorteile.**

- Kleinster Eingriff, kürzeste Wartezeit (alles steht nach rund 0,5 bis 1 Sekunde, auch auf schwachen Geräten).
- Der stärkste Blickfänger, der Beginn der Bewegung, fällt nicht mehr ins Lesen.
- So machen es Redaktionen. Kaum Berührung mit Rang 25 und 27.

**Nachteile.**

- Der Globus platzt weiter mitten in den fliegenden Satz, auf der Startseite zusammen mit Regal und Tafel. Dominiks „auch der Globus“ ist nicht erfüllt.
- Gut 3 Sekunden lang steht „anhalten“ unter einer stillen Kugel.

### 2. Globus zuletzt

![Startseite 1440, Variante 2: bis 1,5 s nur Text, bei 2 s das Regal, bei 3 s der Globus, ab 5 s Bewegung](einblenden/v2-index-1440.jpg)
![Satoshi 1440, Variante 2: Buch bei 2 s, rechte Hälfte bis 3 s leer, Globus ab 3,2 s](einblenden/v2-satoshi-1440.jpg)
![Telefon 390, Variante 2: Text zuerst, ab 2 s der Globus unten im Bild](einblenden/v2-index-390.jpg)
![Ursprünge 1440, Variante 2: bis 1,5 s nur Text, bei 2 s der Globus](einblenden/v2-ursprung-1440.jpg)

**Ablauf.** Nach dem Textmoment 0,4 Sekunden Pause, dann das Regal (Startseite) oder das Inhaltsbuch (*Satoshi*), 0,3 Sekunden Pause, dann der Globus mit Tafel und Steuerzeile in 0,7 Sekunden, nur über die Deckkraft. Eine Sekunde später beginnt der Einspieler. Startseite: Regal 1,7 bis 2,3 Sekunden, Globus 2,5 bis 3,3 Sekunden, Einspieler 4,6 bis 4,8 Sekunden. *Satoshi*: Buch 1,8 bis 2,8 Sekunden (kürzer als bisher: 0,5 Sekunden Pause und 1,0 Sekunden statt 0,8 und 1,4), Globus 3,1 bis 3,9 Sekunden, Einspieler 4,9 Sekunden. *Ursprünge* und Länder: Globus 1,5 bis 2,2 Sekunden, Einspieler auf *Ursprünge* 3,3 Sekunden. Telefon: Was unter dem ersten Bildschirm liegt, steht sofort; der Globus kommt bei rund 1,6 bis 2,3 Sekunden. Jede Handlung (Taste, Klick, Rollen, Fokus) zeigt sofort alles. Sicherheitsnetz: Nach 5 Sekunden steht alles, ohne Skript nach 6 Sekunden.

**Vorteile.**

- Erfüllt Dominiks Bauchgefühl wörtlich: Text zuerst, der Globus zuletzt.
- In allen Läufen dieselbe Reihenfolge, unabhängig von der Rechnerlast; nie bewegen sich zwei Dinge zugleich.
- Aus zufälligem Hineinplatzen wird ein gewählter, leiser Zeitpunkt. Kein Zoom, kein Hineindrehen, also kein Prunkstück-Auftritt (Rang 27).
- Der Satz hat die erste Bühne für sich.

**Nachteile.**

- Wartezeit: Bis alles steht, vergehen am Desktop rund 3 Sekunden (Startseite) bzw. 3,7 Sekunden (*Satoshi*), heute gut 1 Sekunde. Die rechte Hälfte ist so lange leeres Papier und kann wie „lädt noch“ wirken.
- Die Folge läuft bei jedem Besuch, auch nach der Zurück-Taste. Auf schwachen Geräten kommt der Globus erst nach rund 6 Sekunden, weil die Pausen erst nach dem Skript beginnen.
- Berührt Rang 25 stärker als Variante 1. Darf nicht um weitere Stufen oder um Gleiten wachsen.
- Der erste Klick auf den leeren Globusplatz zeigt nur alles an, erst der zweite bedient die Kugel.
- Das kürzere Buch auf *Satoshi* braucht Dominiks Ja (Vorgabe V77).

### 3. Die Karte füllt sich

![Startseite 1440, Variante 3: blasser Kugelumriss und leeres Brett, nach dem Satz füllt sich alles in einem Zug](einblenden/v3-index-1440.jpg)
![Satoshi 1440, Variante 3: Umriss ab 1,5 s, Buch und Globus erscheinen gemeinsam](einblenden/v3-satoshi-1440.jpg)

**Ablauf.** Ein blasser Kugelumriss und auf der Startseite das leere Regalbrett halten den Platz. 0,3 Sekunden nach dem Textmoment füllen sich Karte, Tafel, Steuerzeile und Regal oder Buch in einem einzigen Schritt (0,6 Sekunden, nur Deckkraft). Eine Sekunde danach der Einspieler. Startseite: Füllen 1,6 bis 2,2 Sekunden, Einspieler 3,6 Sekunden. *Satoshi*: 1,6 bis 2,6 Sekunden, Einspieler 3,6 Sekunden. *Ursprünge*: 1,4 bis 2,0 Sekunden, Einspieler 3,05 Sekunden.

**Vorteile.**

- Schneller fertig als Variante 2; die rechte Hälfte ist nie ganz leer.
- Ein einziger Schritt statt einer Folge.

**Nachteile.**

- Kreis und leeres Brett wirken wie ein Ladeplatzhalter.
- Am Desktop erscheint der Umriss der Startseite schon während des Einflugs.
- Der Globus kommt nicht allein als Letztes, auf *Satoshi* zugleich mit dem Buch.
- Technisch am heikelsten (der Umriss muss auf den halben Pixel zur Kugel passen).

### 4. Bewegung erst auf Zutun

![Startseite 1440, Variante 4: alles steht um 1 s, still bis 8 s mit „abspielen“, Bewegung erst nach 9 s](einblenden/v4-index-1440.jpg)
![Satoshi 1440, Variante 4: Globus ab 0,6 s still, Bewegung nach 9,2 s](einblenden/v4-satoshi-1440.jpg)

**Ablauf.** Wie Variante 1, alles steht ohne Einblenden. Der Globus bewegt sich erst, wenn der Leser etwas tut (Zeiger über der Kugel, Rollen, Taste, Klick), frühestens nach dem Textmoment, spätestens nach rund 9 Sekunden. Bis dahin steht „abspielen“ in der Steuerzeile.

**Vorteile.**

- Am wenigsten ungefragte Bewegung; so machen es Guardian, Reuters und Pudding.
- „abspielen“ steht ehrlich da, solange die Kugel still ist.

**Nachteile.**

- Nicht vorhersagbar: Eine Mausbewegung über der Kugel startet sie mitten in der Kurzvita; wer still liest, bekommt den Start nach 9 Sekunden am Rand des Blickfelds.
- Der Globus platzt weiter in den Satz.
- Widerspricht Dominiks Vorgabe, dass der Globus von selbst losspringt (V22).

## Rangfolgen der Urteile

Drei unabhängige Prüfer haben alle Varianten selbst geladen und gemessen. Noten von 1 bis 10.

| Platz | Prüfer aus Dominiks Sicht | Externer Gestalter | Prüfer Nutzbarkeit |
|---|---|---|---|
| 1 | 2. Globus zuletzt (8) | 2. Globus zuletzt (8) | 1. Nur die Bewegung wartet (8) |
| 2 | 3. Karte füllt sich (7) | 1. Nur die Bewegung wartet (6,5) | 2. Globus zuletzt (6,5) |
| 3 | 1. Nur die Bewegung wartet (5) | 3. Karte füllt sich (5) | 3. Karte füllt sich (5,5) |
| 4 | 4. Auf Zutun (4) | 4. Auf Zutun (4,5) | 0. So lassen (5) |
| 5 | 0. So lassen (3) | 0. So lassen (3) | 4. Auf Zutun (4) |

Einig sind sich alle drei: „So lassen“ ist nicht gut zu begründen, weil der heutige Ablauf zufällig ist, und die Sprünge gehören in jedem Fall weg. Uneinig sind sie bei der Wartezeit: Gestalter und Prüfer aus Dominiks Sicht nehmen rund 3 Sekunden für die ruhige Reihenfolge in Kauf, der Prüfer für Nutzbarkeit nicht. Wenn Dominik beim Gegentesten die leere rechte Hälfte stört, empfiehlt der Gestalter Variante 1, nicht Variante 3.

## Was vor einer Übernahme von Variante 2 noch zu tun wäre

1. Den ersten Klick auf den noch unsichtbaren Globus an die Kugel durchreichen.
2. Die Pausen an feste Zeitpunkte nach dem Textmoment binden, damit schwache Geräte nicht länger warten als heute.
3. Bei Seitenwechseln innerhalb der Website und nach der Zurück-Taste die Folge stark verkürzen oder weglassen (ohne Browserspeicher, also im Einklang mit der Datenschutzerklärung).
4. Länder ausnehmen: Dort ist der Globus der Inhalt, und es gibt keinen Einflug, der Ruhe bräuchte.
5. Die Vorausrechnung für den Schluss des Einspielers in die stille Pause legen, damit die Bewegung wirklich eine Sekunde nach dem Globus beginnt (heute 1,5 Sekunden auf der Startseite).
6. Dominik fragen, ob das Buch auf *Satoshi* kürzer einblenden darf (0,5 und 1,0 statt 0,8 und 1,4 Sekunden).
7. In `dominik-vorgaben.md` eintragen, dass die Zusage „der Einflug blockiert den Globus nicht“ durch seinen Wunsch vom 23. Oktober ersetzt ist, und `gestaltung-website-c.md` 7.1 und 7.2 neu fassen.
