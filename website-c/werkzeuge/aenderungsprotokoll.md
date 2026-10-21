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

## 21. Oktober 2026, Startseite und Vita (Bau der Seiten)

1. **Zeilenhöhe des ersten Satzes in der Vita 1,25 z statt 1,5 z** (02). Bei drei Zeilen im Grad groß fiele der Satz mit 1,5 z sichtbar auseinander.
2. **Zeilenhöhe des ersten Satzes auf dem Telefon 1,25 z** (Startseite und Vita). Bei 21 bis 23 px Schrift ergäbe 1,5 z ein Verhältnis von 1,8.
3. **Erster Satz der Vita auf dem Telefon unter dem Grad groß** (22,5 px bei 390 px, 20,8 px bei 360 px). Nur so passt jedes Glied auf eine Zeile, wie auf der Startseite.
4. **Breite des Vita-Fotos auch durch die Fensterhöhe begrenzt** (6.16). So stehen Foto und Legende bei 1280 × 800 im ersten Bildschirm. Bei 1440 × 900 bleibt es bei 456 px.
5. **Reservierte Höhe der Buchzeile unter dem Zeitband:** auf dem Telefon 3 z statt 2 z, am Desktop die Höhe des längsten Satzes (6.11). Ein gewöhnlicher Satz hat auf dem Telefon drei Zeilen, ohne Reserve sprängen die Reihen darunter.
6. **Herausziehen mit einer eigenen Transformation statt der Klasse `.zug`** (14). `.zug` hebt die Neigung von „Länder“ auf. Dieselben Token, liegende Bücher gleiten 12 px seitlich aus dem Stapel.
7. **Tafel bei Berlin zeigt immer „seit 2022“**, wie es Textänderung 11 voraussetzt.
8. **Zusatz am Ort** („Nevada“, „Patagonien“): 6.4 will ihn klein, 3.5 im selben Grad. Seit dem Korrekturlauf gilt auf der Startseite wie auf *Satoshi* und an der Tafel des Lebens („Colombo, Sri Lanka“) 3.5.
9. **Tafel der Ebene *Satoshi* in Ruhe wie in A** („Satoshi“, „Roman“, Auftakt). Textänderung 25 gilt nur für `satoshi.html`.
10. **Wartezeit des ersten Satzes inline**, gleichwertig zu `FSeite.schriftEinstieg`, weil `seite.js` erst am Ende der Seite lädt.

## 21. Oktober 2026, *Satoshi* und *Ursprung* (Bau der Seiten)

1. **Temple City und die Anden erst ab 2,4-fach** (oder gewählt), statt immer als Kreis (6.8). Im Überblick las sich der namenlose Kreis neben New York wie „◦ New York“, die Anden lagen auf Bariloche. Seit dem Korrekturlauf über `abK` im Kern.
2. **Kopf „Black Rock Desert, Nevada“ ganz im Grad Überschrift**, nach 3.5 („keine zweite Abstufung“), gegen 6.4. `FSeite.stationInhalt` setzt „Colombo, Sri Lanka“ genauso.
3. **„alle Schauplätze“ entfällt** (das Wort von A auf der Tafel eines weiteren Orts). Die Steuerzeile ersetzt diesen Fuß. Das Wort steht nicht in der Textliste und braucht dort eine Nummer.
4. ***Ursprung* auf dem Telefon: der Einspieler läuft auch dort**, sobald die Kugel zur Hälfte zu sehen ist (6.5, M7, V23). „Kein Aufklappen von selbst“ (19, 9.3) betrifft den Mechanismus von A.
5. **„zurück“ auf dem Telefon (*Ursprung*)** bleibt wie in A und B, als viertes Wort der Steuerzeile, Name „zurück zu Band III im Text“. Es erscheint nur, wenn man einen Ort weit unter der Kugel getippt hat.
6. **Leselinie bei reduzierter Bewegung ausgeschaltet**, wie in A. 7.4 regelt das nicht.
7. **Kapiteltage unter 40 rem: Jahr | Tag über Ereignis** statt drei Spalten. Die Spalte für das Ereignis wäre sonst nur rund 150 px breit.
8. **Ortszeile unter der Bandüberschrift ¼ z** (Nebentext unter seinem Gegenstand, 5.2) statt ½ z.
9. ***Satoshi* lädt `daten/buecher.js` und `daten/leseliste.js` nicht mehr**, sie braucht sie nicht.

## 21. Oktober 2026, Bibliothek und Länder (Bau der Seiten)

1. **Länder: der Satz zum Grau nur an der Tafel**, nicht auch links (9.6, 6.15). Beides zugleich wäre im Überblick eine Wiederholung (3.5, R7). Textänderung 51 behält ihn an der Tafel.
2. **Länder: ¾ z zwischen den Kontinenten statt ¼ z.** Jeder Kontinent ist ein mehrzeiliger Absatz (6.15), dafür gilt der Absatzabstand.
3. **Länder: Zeilenhöhe des Registers auf Touch 1,25 z**, damit die Namen 44 px hoch treffbar sind, ohne dass sich die Flächen der Zeilen überlagern.
4. **Bibliothek: Strich „mehr als einmal gelesen“ in Tinte.** Er sitzt über dem Kopf auf Papier, in Papierschrift wäre er auf dunklen Rücken unsichtbar.
5. **Bibliothek: 1 px Papier zwischen den Rücken** statt der Kante aus 7 % Schwarz von A. Keine Transparenz, keine Farbmischung (4.2).
6. **Bibliothek: eigene Transformation statt `.zug`**, wie auf der Startseite (lehnende Bücher behalten ihre Neigung).
7. **Bibliothek: Schilderzeile nur unter Brettern, auf denen eine Zeit beginnt.** Eine leere Zeile unter jedem Brett machte die Telefonseite rund 700 px länger. Die Buchzeile bleibt je Brett reserviert.
8. **Bibliothek: die Zeile zur Leseliste haftet am unteren Rand** (Lösung aus B). Unter 84 Einträgen stünde sie sonst weit vom gewählten Eintrag.
9. **Bibliothek: liegende Bücher mindestens 14 px dick** (A: 11 px), damit der Name in 9 px hineinpasst.
10. **Feine Linien in `--brett`** unter dem haftenden Register, über der haftenden Listenzeile und unter dem Globusband der Länder. 4.1 nennt das Token nur für das Brett.
11. **Leseliste mit einem Tab-Halt und Pfeiltasten**, wie das Regal. Sonst wären es 84 Tab-Halte bis zum Fuß.

## 21. Oktober 2026, Lesen, Erzählungen, *Untertext*, Impressum, Datenschutz (Bau der Seiten)

1. **Leseseite: Untertitel im Grad Text statt klein** (6.17). Er gehört zum Titel, so steht er auch auf *Satoshi* (9.2). Zurück mit `.lese-unter { font-size: var(--g-klein); line-height: var(--zh-klein) }`.
2. **Hängender Einzug in den Listen von Erzählungen und *Untertext*** (aus 6.15). Bei ¼ z Abstand sähe man auf dem Telefon sonst nicht, wo ein umbrochener Eintrag endet.
3. **Der Satz für die leere Liste steht auch ohne Skript.** A zeigte ohne Skript nichts.
4. **Schlusssatz im Impressum im Grad Text statt klein.** Er ist ein Verweis mit Inhalt, keine „Stand“-Zeile (wie B).
5. **Vermerk ¼ z unter dem `h1`** (5.2: Nebentext unter seinem Gegenstand). Seit dem Korrekturlauf in `stil.css`.
6. **Kursivanteil über 5 % auf sehr kurzen Seiten** (Lesen ohne Text 7,0 %, unbekannte Adresse 6,5 %, Journal-Eintrag 5,8 %, *Untertext* leer 5,1 %). Es sind nur die Werktitel in der Navigation und „*Untertext*“ selbst.

## 21. Oktober 2026, Korrekturlauf nach den beiden Kritiken

1. **Die Steuerzeile steht an allen vier Globen direkt unter der Kugel, über der Tafel** (6.4: „im Fuß der Tafel“). Breit bündig mit dem Inhalt der Tafel und der Kante der Kugel, auf dem Telefon über die ganze Breite. Grund: Im Fuß sprang sie mit der Länge des Szenentexts (Startseite bis 120 px), oder sie stand fest unten mit vier leeren Zeilen darüber (*Satoshi*), und auf dem Telefon stand sie auf zwei Seiten oben, auf der Startseite unten (Rang 50). Jetzt springt sie nie, liegt immer im ersten Bildschirm und ist überall gleich. Ist eine Ebene ohne Ablauf gewählt (Reisen), bleibt ihr Platz frei, damit die Tafel nicht springt. Die Regeln `.tafel.fuss-unten` der Seiten entfallen.
2. **Globus der Startseite in jeder Ebene gleich groß** (12). Er bemisst sich an Steuerzeile und Tafel des Lebens; die Tafel hält die Höhe des längsten Inhalts aller Ebenen in Ruhe. Vorher wuchs die Kugel beim Wechsel zu Reisen von 671 auf 714 px und rückte 39 px nach links. Bei 1440 × 900 hat sie jetzt 743 px.
3. **Startseite einspaltig: die Kartenwahl steht direkt über der Kugel, der Text der Ebene unter der Tafel** (9.1, 6.6: darüber). Vorher rückte die Kugel beim Wechsel der Ebene um bis zu 182 px, weil der Text der Ebenen verschieden lang ist. Die Tafel hält dort je Ebene die Höhe ihres längsten Inhalts (auch der Szenentexte), damit die Wörter darunter nicht unter dem Finger wandern. Die Wahl liest sich so auch als Teil des Globus.
4. **Kartenwahl am Desktop ¼ z über dem Text der Ebene** (vorher ½ z), damit beide als ein Bedienteil zu lesen sind und nicht als zweite Navigation.
5. **Steuerzeile auf dem Telefon mit 1 em Abstand** (6.4: 1,2 em). „früher  später  noch einmal von vorn“ passt so auch bei 360 px in eine Zeile.
6. **Ortsleisten und weitere Schauplätze auf Touch mit 1,25 z Zeilenhöhe** (5.2, 3.2: ¾ z), alle Bedienwörter genau 44 px hoch (aus der Zeilenhöhe berechnet, vorher pauschal 12 px Polster). Vorher trafen auf *Satoshi* 5 von 10 Szenen und auf *Ursprung* 2 von 4 Orten über ihre Mitte den Nachbarn. Jetzt treffen alle Mitten. Die Regel steht in `stil.css` für alle Seiten.
7. **Name im Kopf auf dem Telefon im Grad Text** (6.1: Überschrift). Sonst war der erste Satz bei 360 px kleiner als der Name (M9).
8. **Eigene Rücken in Tinte, ihre Titel in Papier** (08, 21, 6.10: weiß mit Kontur). Startseite und Bibliothek, mit dem Schuber. Als leere weiße Kästen sahen die wichtigsten Bücher neben den farbigen Stapeln wie Platzhalter aus. Es ist keine neue Farbe. Beim Zeigen und Herausziehen zeigt auf dunklen Rücken (auch Penguin Classics und andere dunkle Familien) eine Linie in Papier innerhalb der Kontur dasselbe an.
9. **Regalbild der Startseite auf dem Telefon nur mit den eigenen Werken** (6.10: dazu der Nachttisch). Mit dem Nachttisch wäre die Rückenschrift unter 7 px gefallen, alle Rücken blieben leer, und die liegenden Bücher wären 7 bis 33 px dick gewesen. Der Nachttisch steht in der Bibliothek und quer im Zeitband. „Länder“ lehnt dort nicht, weil kein Stapel daneben steht.
10. **`FAMILIEN` steht in `seite.js` (`FSeite.buch.farbe`)**, nicht mehr in `bibliothek.html` (4.2, 05, 8.3, Anhang A). Startseite und Bibliothek geben demselben Buch dieselbe Farbe; vorher hatte der Nachttisch der Startseite gar keine.
11. **Die Orte der Zeitleiste auf *Satoshi* sind in Ruhe unterstrichen** (07: Ortsleisten ohne Strich). Nur über sie erreicht man den Text einer Szene (V32); ohne Strich sah gerade diese Bedienung nicht bedienbar aus, während die weiteren Schauplätze darunter unterstrichen waren.
12. **Jahresgruppen der Zeitleiste brechen nicht in sich um** (6.8). Die längste Gruppe passt auch bei 360 px.
13. ***Satoshi* breit: die Kugel bemisst sich an einer mittellangen Szene, die Tafel hält die Höhe der längsten** (12). So bleibt die Kugel groß (700 statt 660 px bei 1440 × 900), und der Klappentext springt beim Durchklicken nicht.
14. **Tafel von *Ursprung* ohne Kartenzeichen** (6.4: Zeichen und Ort). Auf dieser Karte sind alle Orte gleich, und neben der Bandziffer las sich der Punkt wie „I •“. Gilt auf der Startseite und auf *Ursprung*.
15. **Bandüberschriften auf *Ursprung* brechen nur zwischen ihren Teilen**: nach „Band I“, am Komma des langen Titels, vor „Arbeitstitel“ (`text-wrap: wrap`, Teile in `.nw`). Vorher brachen sie mitten in der Wendung („Das / steinerne Wort“). „Arbeitstitel“ darf so in eine eigene Zeile rücken.
16. **Die Zeile aus dem Exposé bei Band I steht ausgeglichen** (`text-wrap: balance`, 3.3 sieht `wrap` vor), mit einem geschützten Leerzeichen vor dem Gedankenstrich. Mit `pretty` brach sie zu früh („… sie / zu begraben.“), mit `wrap` stünde „begraben.“ allein in der zweiten Zeile. Jetzt bricht sie am Gedankenstrich.
17. ***Ursprung* breit: wer über Band I hinaus nach oben scrollt, sieht wieder den Überblick** (neu: `ablauf.ruhen()`). Vorher blieb die Tafel bei Band II stehen.
18. **Ebene *Ursprung* der Startseite: die Bandziffern rechtsbündig in einer festen Spalte** (6.6: 0,5 em Abstand), damit die Titel in einer Flucht beginnen. Zwischen Ziffer und Titel steht ein echtes Leerzeichen, Vorleseprogramme lesen nicht mehr „IKreise“.
19. **Reisen und Länder: die Tafel wechselt erst mit einem Klick**, beim Zeigen nennt nur der Zettel das Land. Vorher flackerte die Tafel bei jeder Mausbewegung und wiederholte den Zettel. Bei einem Land, in dem er nicht war, stehen keine Koordinaten (die Mitte eines fremden Lands sagt nichts); die Koordinaten seiner Orte und Länder bleiben (V29).
20. **Tafel der Länder ohne Markenspalte**, ihr Inhalt steht an der Kante der Kugel (vorher 59 px rechts davon).
21. **Kleinstaaten als kleine Scheibe ohne Kontur in `--karte-bereist`**, mit Kontur nur gezeigt oder gewählt. Ersetzt Punkt 3 des Fundaments: die Quadrate wirkten wie Bildfehler.
22. **Zeichenerklärung der Bibliothek: die Zeichen auf einem kleinen gefüllten Rücken** (9 × 21 px, in `--zb-strich`), damit sie wie Bücher aussehen und nicht wie Kästchen zum Ankreuzen.
23. **Zeitband: quer liegende Bücher in `--zb-strich` gefüllt** (6.11: Papier mit Kontur). Als leere Rahmen wirkten sie wie Platzhalter.
24. **Hinweis zum Zoomen beim Zeiger oder Finger, fest im Fenster** (6.3: oben an der Kugel). Wer mit dem Rad über der Kugel scrollt, scrollt die Seite; oben an der Kugel stand der Hinweis dann außerhalb des Fensters.
25. **Regalbild der Startseite: die Stapel 24 mm auseinander** (vorher 14), damit ein herausgezogenes Buch nicht an den zweiten Stapel stößt. Der Name beim Zeigen steht über allem, was unter seiner Breite liegt, auch über dem lehnenden Buch.
26. **Verweise werden nicht getrennt** (`hyphens: none` an `a` und `.wort`), Stationen der Vita, Kapiteltage und Figuren nur von Hand. Vorher stand „Ursprungs- / trilogie“ als Verweis über zwei Zeilen.
27. **Geschützte Leerzeichen**: im Kolophon in „Friedrich Althausen“, „IM Fell French Canon“, „Igino Marini“, „Natural Earth“; bei den Figuren nach „die“, „der“, „das“; „Bitcoin-Block“ bleibt zusammen. Der Wortlaut ist derselbe.
28. **Fuß und Name im Kopf auf Touch 44 px hoch treffbar**, die Zeile mit Impressum und Datenschutz dafür 1 z hoch. Vorschlag aus dem Bau der kleinen Seiten.
29. **Tafel unter 62 rem ohne Mindesthöhe aus `stil.css`**; die Seiten halten sie selbst (`FSeite.tafelReservieren`). Vorher blieb unter jeder Tafel bis zu 6,5 z leer.
30. **`g.sperren()` hat keine Wirkung mehr.** Sein Zuhörer verschluckte auf dem Telefon das Drehen mit einem Finger. Der Kern hebt Länder ohnehin nur auf Ebenen mit Ländern hervor.
31. **Die Namen auf dem Globus folgen dem Kern** (`g.gezeigt()`, `g.aktiverOrt()`). Vorher standen auf der Startseite in den 600 ms vor dem Einspieler alle acht Namen des Endzustands auf der leeren Kugel.
32. **Ebene *Satoshi* der Startseite: Überblick wie auf `satoshi.html`** (aus dem sichtbaren Teil der Leinwand berechnet, breit 0,92-fach), damit Buenos Aires und Bariloche ihre Namen bekommen.
33. **Anhang A, Kursiv höchstens 5 %: reine Titellisten zählen nicht.** Die Bibliothek liegt durch die Leseliste („Autor, *Titel*“, 6.14) bei 11 % (Telefon 16 %). Dort ist Kursive Buchsatz.
34. **6.4, Zustand „am Ende“: auf der Startseite bleibt „später“ an**, denn nach Berlin folgt Mallorca. Nur die Regel ist ungenau, der Bau ist richtig.

## 21. Oktober 2026, Runde 2 (Dominiks Rückmeldung), K1 bis K7

Dominiks Rückmeldung geht `gestaltung-website-c.md` vor. Die Wörter stehen in `docs/text-aenderungen-c.md`, Nr. 61 bis 78.

1. **Koordinaten nur noch auf *Satoshi* und *Ursprung*** (6.4, 6.9, 6.16). `FSeite.stationInhalt` gibt keine Koordinaten mehr. Die Startseite setzt die Tafel von *Ursprung* über `ursprungTafel` ohne `daten`, `FSeite.ursprungInhalt` behält sie für `ursprung.html`. In der Vita fallen die Zeilen, ihre Klasse `.koord` und das Skript weg, das sie füllte. Auf Länder fällt auch das Neusetzen der Tafel nach dem Laden von `welt-50m.js` weg, es war nur für die genaueren Koordinaten da.
2. **Ebene Leben ohne Text der Ebene** (6.6). Ist kein Text der Ebene sichtbar, ist `.ebenentext` ausgeblendet (`:has`). So stehen auf dem Telefon zwischen Tafel und „Was ich schreibe“ 3 z wie zwischen allen großen Teilen, nicht 4 z.
3. **Zeitband ohne die eigenen Werke** (6.11). Der Platz, den sie rechts hatten (22 px Lücke und sieben Umrisse), geht an die Bücher. Das Band füllt weiter die ganze Breite.
4. **Zeile aus dem Exposé kursiv** (3.4 sagt aufrecht). Dominik: „kann kursiv!“ Ihre zwei Hälften halten je zusammen (`.nw`), damit sie wie vorher am Gedankenstrich bricht. Kursiv bricht `balance` sonst nach „Götter“. Die erste Hälfte ist kursiv rund 270 px breit und passt auch bei 360 px Fensterbreite in die Spalte (310 px).
5. **Platzhalter „E-Mail-Adresse“ im Newsletter-Feld in `--leise`** (6.2, 4.2). Er ist ein Zustand des leeren Felds und kein Text, aufrecht, 5,1 : 1 auf Papier. In Tinte sähe er aus wie eine schon eingetragene Adresse.

## 21. Oktober 2026, Runde 2 (Dominiks Rückmeldung), K8 bis K10

1. **Bibliothek, „Was noch wartet“ auf dem Telefon als Rücken** (6.12, 6.14, 9.4 sagen Liste). Bis 40 rem, der Grenze des Telefon-Layouts, stehen dieselben 75 Bücher als vorgezeichnete weiße Rücken auf Brettern, am Desktop bleibt die Liste. Ein Rücken ist Papier mit 1 px Kontur in `--zb-warte`, derselben Farbe wie die Reihe „was noch wartet“ im Zeitband der Startseite. Gezeigt und gewählt wie jeder Rücken: 1,5 px Tinte, gewählt steigt er 12 px heraus, darunter die Buchzeile mit demselben Satz wie in der Liste. Auf dem Rücken nur der Nachname, aufrecht in Tinte, 9 bis 10 px (32 von 75 Rücken sind breit genug, die übrigen bleiben leer wie im Regal). Zwischen den Rücken 3 bis 5 px Luft wie in A, sonst liefen die Konturen ineinander. Kein Schild unter dem ersten Brett, die Überschrift steht darüber. Ein Tab-Halt je Brett, Pfeiltasten wie im Regal, das Standortregister springt auf den ersten Rücken.
2. ***Satoshi*, Einspieler mit Szenentext, beide Abläufe langsamer** (6.5, 7.1, 7.2, 18 sagen: Einspieler ohne Szenentext, 0,4 s Halt). Einspieler und Abspielen zeigen an jeder Station den Szenentext und halten doppelt so lange wie vorher das Abspielen: 3 s plus 0,6 s je Wort, 6 bis 18 s (`satoshiHalt` in `seite.js`). Der Einspieler übernimmt diesen Takt, weil er jetzt Text zeigt: Mit 0,8 s Halt (doppelt so lang wie bisher) stünde jeder Szenentext 1,7 s und wäre nicht zu lesen. Er dauert damit rund 118 s statt 14 s, hält an, wenn die Kugel aus dem Bild geht, und endet wie bisher bei „Die Schauplätze“. Die Tafel meldet sich dabei Vorleseprogrammen nicht. Gilt auch für die Ebene *Satoshi* der Startseite (6.4: alle Globen gleich); dort steht der Ort der Station im Satz der Ebene halbfett.
3. **Tafel auf *Satoshi* einspaltig: im Ablauf mit fester Höhe**. Während Einspieler oder Abspielen hält sie die Höhe der längsten Szene, damit der Klappentext darunter nicht bei jeder Station springt. Danach wächst sie wieder mit ihrem Text. Auf der Startseite hält die Tafel am Desktop jetzt auch die Höhe der Szenentexte (6 px mehr), aus demselben Grund.
4. ***Satoshi*, Zeitleiste und „Weitere Schauplätze“ im Grad Text** (6.8 sagt Grad klein). Eine Jahresgruppe beginnt auf einer neuen Zeile, wenn sie nicht mehr passt. Nur die Gruppe 2007 ist auf dem Telefon länger als die Zeile, sie bricht nach „Black Rock Desert,“ um und rückt unter den ersten Ort ein (hängender Einzug in der Breite der Jahreszahl). Auf Touch stehen beide Zeilen wie jede Ortsleiste 1,25 z hoch.
5. **K10, mittlere Karte für die Bewegung: gemessen und nicht übernommen.** Aus `welt-50m.js` nach Visvalingam vereinfacht (Bogenenden fest, Inseln mit mindestens drei Punkten; Mallorca, Menorca, Sansibar, Bornholm und Mauritius bleiben). Gemessen in Bewegung bei 2,4-fach über Europa, Prüfbrowser ohne Grafikkarte, Mittel aus zwei Läufen zu je 145 Bildern, Bilder je Sekunde:

   | Karte | Punkte | Startseite Desktop | Startseite Telefon | Länder Desktop | Länder Telefon |
   |---|---:|---:|---:|---:|---:|
   | grob (`welt-110m.js`, heute) | 8246 | 59 | 60 | 59 | 59 |
   | mittel | 15 000 | 46 | 38 | 36 | 34 |
   | mittel | 20 000 | 37 | 35 | 28 | 26 |
   | mittel | 25 000 | 29 | 26 | 21 | 21 |
   | mittel | 30 000 | 23 | 20 | 19 | 17 |
   | fein (`welt-50m.js`) | 80 617 | 11 | 10 | 8 | 8 |

   Ein Bild kostet rund 1 ms je 1000 Punkte (grob 8 ms, mittel mit 25 000 Punkten 28 ms, fein 77 ms, am Desktop auf der Startseite). Keine mittlere Karte im Bereich von 20 000 bis 30 000 Punkten erreicht 40 Bilder je Sekunde, auch nicht mit `projection.precision(0)` (25 000 Punkte: 35 statt 29). Es bleibt alles wie es war, `daten/` und `globus/kern.js` sind unverändert. Werkzeug und Messung liegen außerhalb des Repos (`scratchpad/lauf4/k810/welt-mittel.cjs`, `fps.cjs`).

## 21. Oktober 2026, Runde 2 (Dominiks Rückmeldung), Prüfung und K11

1. **Autorenforums Berlin e. V. mit Verweis auf die Website des Vereins** (Dominiks zweiter Nachtrag). Der erste Verweis nach außen in C: `<a href="https://autorenforum-berlin.de/" rel="noopener">`, ohne `target`, je Seite nur am ersten Vorkommen (kurze Vita der Startseite, Autorenabsatz auf *Satoshi*, Vita, Unterzeile der Erzählungen). Er lädt nichts, bevor man ihn anklickt; 8.1 und die Prüfung „keine Anfrage an fremde Server“ gelten weiter. Die Prüfung des Baus (`scratchpad/kc-artefakt/pruefen-artefakt.cjs`) lässt genau diesen Verweis zu, jeden anderen Verweis nach außen meldet sie weiter als Fehler.
2. **Prüfung K1 bis K10** in der laufenden Website (1440 × 900, 390 × 844, dazu 1280 × 800 und 360 × 740): keine Änderung nötig. Den Einspieler von *Satoshi* bis zum Ende angesehen, auf *Satoshi* und in der Ebene der Startseite, je am Desktop und auf dem Telefon: alle zehn Szenentexte erscheinen, der Einspieler dauert rund 118 s. Stichprobe K10 mit 20 000 Punkten auf der Startseite: 37 Bilder je Sekunde am Desktop, 36 auf dem Telefon, also weiter unter 40.
