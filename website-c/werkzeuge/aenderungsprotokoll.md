# Änderungsprotokoll Version C

Abweichungen von `docs/gestaltung-website-c.md`, je mit Grund (Abschnitt 1, „Spielraum beim Bau“). Bleibt lokal, wird nicht veröffentlicht.

## 21. Oktober 2026, Fundament (stil.css, seite.js, globus/kern.js, Kopf und Fuß aller Seiten)

1. **Name im Kopf auf einer Zeile von 1 z statt 1,25 z** (3.2, 6.1). Der Kopf der Globusseiten hat die feste Höhe 6,5 z. Mit 1,25 z für den Namen bräuchte er bei zweizeiliger Navigation 6,75 z und schöbe den Globus nach unten. Name (23,75 px) und Tagline stehen ohne Abstand untereinander, wie 5.2 es für zusammengehörige Zeilen will. Der Kopf hat nun `min-height` statt `height`, damit er nie überläuft.
2. **Steuerwörter klein: „anhalten“, „abspielen“, „noch einmal von vorn“** (6.4). So stehen sie in `docs/text-aenderungen-c.md` („Bedienwörter am Globus“), weil sie in einer Zeile mit „früher“ und „später“ stehen, die schon in A klein waren. Der Wortlaut ist Sache der Texter.
3. **Kleinstaaten auf Ebenen mit Ländern als kleines Quadrat** (09). Monaco, Vatikanstadt, Hongkong und Kap Verde haben im groben Maßstab keine Fläche. A zeichnete einen Kreis, der in C wie das Zeichen „längerer Aufenthalt“ aussähe. Das Quadrat (6 px, Fläche `--karte-bereist`, Kontur 0,6 px Tinte) stammt aus B.
4. **Führungslinien der Namensblöcke in der Farbe der Küste** (4.1). Die Tabelle nennt sie nicht. Tinte wäre an dieser Stelle schwerer als der Weg selbst. Die Farbe ist ein Token (`--karte-kueste`).
5. **Der Rückweg eines Abstechers wird nicht noch einmal gezeichnet** (14b). Hin- und Rückweg liegen genau aufeinander. Doppelt gestrichelt schlössen sich die Lücken, und der Abstecher sähe durchgezogen aus. Der Globus fliegt den Rückweg weiter (0,5 s), der Weg geht danach vom Wohnort aus weiter.
6. **Land und bereiste Länder als je eine Fläche gezeichnet**, das Gradnetz gezoomt nur im sichtbaren Ausschnitt (10). Das Aussehen ist dasselbe. In Bewegung dauert ein Bild auf der Startseite bei 2,4-fach rund 8 ms statt 13 ms mit einzelnen Ländern (A: 92 ms).
7. **Tafel auf Ursprung: der Ort im Kopf, nicht der Bandtitel** (6.4). 6.4 legt den Kopf als „Kartenzeichen und Ort“ fest und nennt „um 8000 v. Chr.“ als Unterzeile. Die Unterzeile ist der Teil der Bandzeile vor dem Thema ohne den Ortsnamen („in Südostanatolien, um 8000 v. Chr.“, bei Tyros „die Stadt der Phönizier, um 940 v. Chr.“). Der Titel des Bands steht in der Ortsleiste und im Text daneben.
8. **„Tausender erst ab fünf Stellen“ gilt jetzt in `FSeite.tausender`** (3.9). In A stand „1 040 Seiten“, jetzt „1040 Seiten“.
9. **Karteikarte bleibt vorerst als Funktion** (22). `FSeite.karteikarte` zeichnet eine schlichte Karte in Papier und Tinte, bis die Seiten auf `FSeite.buchzeile` umgestellt sind. Der Knopf heißt „schließen“ (Textänderung 48). Danach kann sie weg.
10. **Die Hilfen der Bibliothekszeichen tragen den Namen `auszug`** (6.12). B nannte das Zeichen `auszuege`. Beide Namen gehen.
