# Dominiks Vorgaben für die Website

Stand: 23. Oktober 2026. Angelegt am 21. Oktober nach Dominiks Auftrag für Version C, seither ergänzt um V73 und V74.

Diese Liste sammelt alles, was Dominik im Chat zur Website vorgegeben, gewünscht, entschieden oder korrigiert hat und was heute noch gilt. Sie ist für den Bau von Version C verbindlich. Sie steht über den Empfehlungen in `aenderungen-website-b.md`, über den Referenzen und über der Liste der KI-Merkmale.

## So ist die Liste gebaut

- **Quellen:** alle Nachrichten von Dominik aus dem Verlauf dieses Projekts, auch die, die er geschickt hat, während Claude arbeitete, dazu seine Antworten auf Claudes Auswahlfragen. Grundlage sind `flaggen-nutzer.txt` und das vollständige Protokoll der Sitzung. Nachrichten von Hilfsprogrammen und Systemhinweise zählen nicht.
- **Zeiten:** Datum und Uhrzeit stehen in UTC, so wie das Protokoll sie speichert. In Berlin war es zwei Stunden später.
- **Zitate:** wörtlich, nur offensichtliche Tippfehler sind korrigiert. Das entspricht seiner Vorgabe V61. Ein „haha“ ist weggelassen, Auslassungen stehen als […], Ergänzungen von Claude in eckigen Klammern.
- **Spätere Aussage gilt.** Wo eine spätere Nachricht eine frühere ändert, steht das beim Punkt. Die frühere gilt dann nicht mehr.
- **Konflikt:** So ist markiert, wo seine Vorgabe einer Empfehlung in `aenderungen-website-b.md` widerspricht. Seine Vorgabe gilt. Wo es einen Grund geben könnte, davon abzuweichen, steht er dabei.
- **Ort in A:** Bei Texten steht, in welcher Datei und in welchem Element von `website/` sie heute stehen. Diese Stellen sind beim Bau zu schützen.
- **Datenschutz:** Private Notizen aus seiner Leseliste, seine Telefonnummer und alles Weitere aus dem Abschnitt „Verbote“ sind hier nicht abgeschrieben. Dort steht nur das Thema.

Am Ende stehen drei Übersichten: seine eigenen Texte mit ihrem Ort, die Konflikte mit dem Vergleichsdokument und die Fragen, auf die er noch nicht geantwortet hat.

---

## 1. Grundsätze

**V01. Seine Vorgaben gehen vor.**
„Im Zweifel schau auch immer in meine Prompte. Die gelten über allen anderen. Und es muss sehr gute Gründe geben, dass du sie überschreiben willst.“ (21.10., 04:29)
Für den Bau: Rangfolge nach dem Auftrag: erst diese Liste, dann seine eigenen Texte, dann die besten vergleichbaren Websites, zuletzt die KI-Merkmale. Jede Abweichung von dieser Liste braucht einen benannten Grund im Entscheidungsdokument.
Später geändert: nein, das ist die jüngste Aussage.

**V02. Anmutung von A, Zoomen aus B.**
„Das Zoomen im neuen Globus ist besser. Trotzdem fand ich den Look und Feel der Vorgängerversion etwas besser. Dafür hast du viele überflüssige Elemente rausgehauen, die tatsächlich auf KI hingewiesen haben.“ (20.10., 23:48)
Für den Bau: A ist die Grundlage für Schrift, Farbe, Kugel, Chronik, Regal und Zeitband. Aus B kommen das flüssige Zoomen und das Weglassen der überflüssigen Merkmale. So steht es auch in `mischfassung-entscheidungen.md`.
Später geändert: nein. Am 21.10. bestätigt und erweitert durch V03.

**V03. Ein KI-typisches Element ist erlaubt, wenn es deutlich besser ist. Die vielen kleinen Markierungen gehen.**
„Ich glaube, wenn etwas deutlich eleganter, gebräuchlicher ist. Sinnvoll. Also wirklich von der UX herausragend, dann ist ein KI-Element eben auch legitim. Es geht nur darum, eben die tausenden von Mikromarkern in den Texten. Mit den kursiven Schriften zu entfernen. Du kannst dir auch nochmal bekannte Websites anschauen und schauen, wie sie mit den Mikrodetails umgehen. Kursiven Schriften. Etc... Neben- und Randbemerkungen übergangen [vermutlich: Übergänge]. Spacings.“ (21.10., 04:29)
Für den Bau: Weg kommen graue Kursive für Beschriftungen und Notizen, gesperrte Kapitälchen als Etikett, Randbemerkungen und Nebensätze ohne Inhalt, überflüssige Metazeilen, Requisiten und ungleiche Abstände. Auch Übergänge und Abstände gehören zu den Mikrodetails, die an den Vergleichsseiten zu prüfen sind. Ein gängiges, gut bedienbares Muster bleibt, auch wenn es oft in KI-Seiten vorkommt. Für Kursive, Bildunterschriften, Nebenbemerkungen und Abstände gilt, was die besten Vergleichsseiten tun (`referenzen-c.md`).
Später geändert: nein. Diese Aussage mildert V04: Es geht nicht mehr um möglichst wenig KI-Merkmale um jeden Preis.

**V04. Die Seite soll aussehen, als habe ein Designer sie gemacht.**
„Ich finde die Website aktuell sehr schick und elegant. Aber idealerweise differenziert sie sich so weit wie möglich von anderen mit KI erstellten Websites. Und sie sieht aus, als habe ein Designer sie erstellt.“ (20.10., 14:42)
Für den Bau: Ziel bleibt die Wirkung einer gestalteten Seite.
Später geändert: teilweise durch V03. „So weit wie möglich“ gilt nicht mehr, wenn das bessere Element dabei verloren geht.

**V05. Minimalistisch, elegant, Weiß und Graphit.**
„Aber können wir das viel minimalistischer und eleganter machen?“ und „Ich bin von der Farbe noch nicht überzeugt. Oder vielleicht ist es die Schrift. Aber es geht in die richtige Richtung. Es könnte irgendwie noch cooler sein.“ (19.10., 02:24). Seine Wahl der Stimmung: „Weiß & Graphit“, in der Vorschau beschrieben als „feine graue Linien, viel Weiß, ein Akzent: Orte“, und für die Erde „Feine Ländergrenzen“ (Antwort 19.10., 02:30).
Für den Bau: Papierweiß und Graphit, feine Grenzen. Ein einziger Akzent ist nach seiner Wahl erlaubt, und zwar für Orte. Warme Zusatzfarben wie Siena und Creme braucht es nicht.
Vergleichsdokument: kein Konflikt. Element 08 und Frage 3 empfehlen, Siena und Creme zu streichen. Das passt zu seiner Wahl.
Später geändert: nein.

**V06. Gute Vorbilder ansehen und nachbauen.**
„Kannst du dir mal wirklich gute Websites anschauen und schauen, wie sie ihre Globen bauen, und das nachbauen?“ (19.10., 02:24). „Wie machen das bessere Websites? Reverse Engineer.“ (19.10., 03:58). „Analog best practices der 10 Top Websites, die auch so etwas umsetzen, zählen. Aber immer mit dem korrigierenden Blick, was vielleicht zu sehr nach KI-Element ausschaut.“ (21.10., 04:29)
Für den Bau: Vorbilder sind Verlage, Literaturmagazine und Autorenseiten. Ihre Lösung gilt vor der Regel „kein KI-Merkmal“.
Später geändert: nein.

**V07. Autorität zeigen, ohne arrogant zu wirken.**
„Ich will halt nicht zu arrogant auftreten, aber die Website soll meine Autorität backen. Ich glaube, viele trauen einem 31-Jährigen nicht zu, dass er solche Projekte stemmt, wie ich sie mir vornehme. […] Die Website soll halt der erste Schritt auf dem Launch zur Autorenmarke sein.“ (19.10., 20:12)
Für den Bau: Die Seite nennt Fakten. Keine Superlative, kein „preisgekrönt“, keine Behauptung, kaum jemand habe so viel gereist oder gelesen. Claude hat das am 20.10. um 03:35 so vorgeschlagen, Dominik hat nicht widersprochen.
Später geändert: nein.

**V08. Jede Entscheidung begründen.**
„Erkläre mir vor allem immer ganz genau, warum du ein bestimmtes Element ausgetauscht hast, und erkläre mir die Vor- und Nachteile. Ich würde gerne dein Reasoning verstehen.“ (20.10., 14:48). „Und ich werde morgen dann vermutlich nochmal durch das Dokument mit den Entscheidungen gehen und ggf. noch ein paar Sachen ändern.“ (21.10., 04:29)
Für den Bau: Version C braucht ein Entscheidungsdokument mit Vorher, Nachher, Grund, Vor- und Nachteilen. Jede Textänderung steht mit Vorher und Nachher in einer Liste, damit er sie mit einem Satz zurücknehmen kann (Claudes Zusage vom 21.10.).
Später geändert: nein.

**V09. Ein Testsystem, das zusammengehört, unter einem privaten Link.**
„Also können wir ein Testsystem bauen, das zusammen gehört.“ (20.10., 04:24). „Privater Claude-Link […] Dann kaufe ich eine Domain bald … Will aber erstmal alles testen.“ (20.10., 04:37)
Für den Bau: C ist eine vollständige, funktionierende Website mit gemeinsamer Navigation und gemeinsamem Fuß. Nach Claudes Zusage vom 21.10. bekommt C einen dritten privaten Link. A und B bleiben unverändert zum Vergleich stehen.
Später geändert: nein.

**V10. Bewegung beim Scrollen nur, wo sie Sinn ergibt.**
„Also ein paar interaktive Elemente beim Scrollen, sofern sie Sinn machen.“ (19.10., 23:05)
Für den Bau: Bewegung, die etwas zeigt, bleibt erlaubt: Zeit, die vergeht, eine Reihenfolge. Bewegung, die nur schmückt, darf gehen.
Vergleichsdokument: leichter Konflikt mit Element 14 („kein Mitschieben“) und 23 („ohne Mitschieben“). Seine Bedingung „sofern sie Sinn machen“ lässt das Streichen einzelner Effekte zu. Ganz ohne sinnvolle Bewegung sollte C aber nicht sein; die Chronik (V22) und das Entfalten der Trilogie (V23) erfüllen den Wunsch.
Später geändert: nein.

**V11. Die Website heißt nach ihm, das Journal heißt Untertext.**
„Präferenz geht gerade leicht zu untertext. Oder eben doch eine Website über den Namen?!“ (19.10., 00:24). „Untertagebuch gibt es nicht. Dann nur Untertext.“ (19.10., 03:58)
Für den Bau: Absender jeder Seite ist „Dominik Jäkel“. *Untertext* ist das Journal. Das Wort „Untertagebuch“ kommt nirgends vor.
Später geändert: nein.

**V12. Nichts Unternehmerisches.**
„Allerdings werden wir wohl alles Unternehmerische rausnehmen?“ (19.10., 00:24). Claude hat zugestimmt, Dominik hat nicht widersprochen.
Für den Bau: Keine Freelancing-Angebote, keine eigenen Prototypen oder Firmenprojekte.
Später geändert: nein.

---

## 2. Startseite

**V13. Der erste Satz fliegt ein, in einer eigenen Anzeigeschrift.**
„Vielleicht können wir am Anfang auch nochmal eine Schrift machen, die einfliegt. Für die Bio. Oder die verwischt an manchen Stellen. Und dafür eine gute optische Schriftart wählen.“ (19.10., 23:02). Unter drei Varianten hat er gewählt: „Einstieg einfliegend.“ (20.10., 03:53)
Der Satz selbst: „Dominik Jäkel schreibt tagsüber unter fremden Namen und abends unter seinem eigenen.“ Das war Claudes Vorschlag. Er hat ihn gewählt (Antwort „Fremde Namen“, 19.10., 20:16), nachdem er um einen „sympathischeren Einstieg“ gebeten hatte (19.10., 20:12).
Für den Bau: Der Satz bleibt im Wortlaut und fliegt ein. Nach Claudes Zusage vom 21.10. wird der Einflug kürzer und blockiert den Globus nicht. Bei reduzierter Bewegung steht er sofort da.
Ort in A: `index.html`, `p#einstieg.leitsatz`; `vita.html`, `p.einstieg.leitsatz` am Anfang der `div.vita-text`.
**Konflikt** mit Element 02 und Frage 2: Dort wird empfohlen, den Satz stehend in der Vollkorn zu setzen. Seine Vorgabe gilt. Der Grund des Vergleichsdokuments (der Einflug ist das auffälligste Einzelmerkmal des ersten Bildschirms) rechtfertigt einen kürzeren, ruhigeren Einflug, kein Streichen. Auch die eigene Anzeigeschrift ist sein Wunsch („eine gute optische Schriftart“); sie darf nur ersetzt werden, wenn eine andere Anzeigeschrift deutlich besser passt.
Später geändert: nein.

**V14. „Schriftsteller und Reisender“ bleibt, aber eleganter.**
„Autor und Reisender in der Schrift sieht nach KI aus. Könnte eleganter.“ (19.10., 03:58). „Ein Nachtrag auf jeden Fall. Klein. Es müsste Schriftsteller und Reisender heißen.“ (19.10., 04:00)
Für den Bau: Die Zeile steht im Kopf jeder Seite. Sie ist nicht grau und nicht kursiv. Seine Kritik galt der Form, der Wortlaut ist sein Wunsch.
Ort in A: `index.html`, `h1.briefkopf span.rolle`; auf allen anderen Seiten `p.briefkopf span.rolle`; dazu die Beschreibung in `index.html`, `meta[name=description]`.
**Konflikt** mit Element 16, Frage 7 und Text-Flagge 1: Dort wird empfohlen, die Zeile zu streichen. Seine Vorgabe gilt. Einen sehr guten Grund dagegen gibt es nicht; dass die Wendung oft vorkommt, löst die ruhigere Form.
Später geändert: ja. „Autor und Reisender“ (und früher „Reiseschriftsteller & Traveler“ vom 19.10., 00:24) ist durch „Schriftsteller und Reisender“ ersetzt.

**V15. Die kurze Vita der Startseite: Claudes Kürzung mit der Werkstattbühne.**
Erst schickte er eine eigene Fassung (20.10., 03:53), dann eine kürzere: „Finde den ersten Textblock immer noch zu groß, lass uns das nochmal kürzen“ (20.10., 04:37). Claude schlug eine Fassung mit etwa 50 Wörtern vor, wahlweise mit der Werkstattbühne. Seine Entscheidung: „Dein Vorschlag mit Werkstattbühne, go für über Nacht.“ (20.10., 04:47)
Der freigegebene Wortlaut: „Er wurde 1995 in Dortmund geboren, studierte am Hasso-Plattner-Institut in Potsdam und lebte vier Jahre auf Taiwan; heute lebt er in Berlin und moderiert die Werkstattbühne des Autorenforums Berlin. 2022 erhielt er den A.-E.-Johann-Preis. Gerade schließt er seinen Debütroman *Satoshi* ab; daneben schreibt er an einer Romantrilogie über die Ursprünge der Zivilisation.“ Dazu der Verweis „Ausführlich in der Vita.“
Für den Bau: freigegebener Text. Nur Tippfehler dürfen geändert werden. Text-Flagge 14 (Semikolons) ist nur ein Vorschlag an ihn.
Ort in A: `index.html`, `p.vita`, mit `span.leise` für den Verweis.
Später geändert: ja. Seine Fassungen vom 20.10. um 03:53 und 04:37 gelten nicht mehr.

**V16. Es braucht eine Navigation.**
„Und generell Websitenavigationsmenü fehlt auch.“ (19.10., 20:12)
Für den Bau: Jede Seite hat dieselbe Navigation. Ob sie auf dem Telefon offen steht oder hinter einem Schalter liegt, ist frei (Element 16, Frage 8).
Später geändert: nein.

**V17. Zwei Abschnitte: „Was ich schreibe“ und „Was ich gelesen habe“.**
„Ich würde was ich schreibe und was ich gelesen habe machen. Werke“ (19.10., 20:12)
Für den Bau: Die beiden Überschriften sind seine Wörter und bleiben. Ihre Form darf ruhiger werden.
Ort in A: `index.html`, `h2#schreiben-titel` und `h2#gelesen-titel`.
Vergleichsdokument: kein Konflikt. Element 17 und Frage 6 lassen den Wortlaut offen; hier ist er entschieden.
Später geändert: nein.

**V18. Der Strahl aller Bücher steht auf der Startseite, das ganze Regal auf einer eigenen Seite.**
„Und dann halt den Strahl aller Bücher. Gerne wie du es hast. Bibliothek. Die wichtigsten aus der Jugend und was noch wartet … Und dann kann noch ein Button ganze Bibliothek erkunden … Wie du es in der Klappentext-Version gemacht hast. Und dann kommt eine Seite, wo alle Bücher sind; auf der Startseite direkt finde ich das etwas protzig. Aber sonst gut.“ (19.10., 20:12)
Für den Bau: Auf der Startseite das Zeitband aller Bücher, darunter die wichtigsten aus Kindheit und Jugend und was noch wartet, dazu ein Verweis auf die ganze Bibliothek. Das Regal mit allen Rücken steht nur in `bibliothek.html`. Nach Claudes Zusage vom 21.10. bleiben Chronik und Zeitband auf der Startseite.
Vergleichsdokument: kein Konflikt mit Element 23 und Frage 14 (Startseite, mit Verweis auf die Bibliothek).
Später geändert: nein.

**V19. Grundlage ist der Entwurf mit dem Klappentext, ergänzt um Koordinaten und eine Stationstafel unter dem Globus.**
„Ich finde eins gut (Klappentexte, gerne noch um Koordinaten ergänzen). […] Aber würde die Timeline aus 2 nehmen und dann verlagern.“ (19.10., 20:12). Auf Claudes Rückfrage wählte er „Stationstafel unter den Globus“ (Antwort 19.10., 20:16).
Für den Bau: Unter dem Globus steht eine Tafel mit Jahr, Ort und Koordinaten der jeweiligen Station, mit „früher“ und „später“.
Später geändert: teilweise. Die Kennzahlen, die zu dieser Tafel gehörten, hat er später verworfen (V20).

**V20. Keine Kennzahlen und keine Tabelle unter dem Globus.**
„Die ganze Tabelle darunter ist ein generisches KI-Element.“ (19.10., 03:58). Zum Block „8 Orte, fünf Wohnorte, drei längere Aufenthalte, von Cotonou, 6° 22′ N, bis Berlin, 52° 31′ N. Am weitesten von Dortmund: Kaohsiung, 9 510 km Luftlinie“: „Das finde ich blöd. Klingt sehr nach KI … Können wir da was anderes schreiben?“ (20.10., 04:03)
Für den Bau: Keine großen Zahlen, keine Zusammenfassung in Zahlen, keine Tabelle. Die Entfernung „… km Luftlinie von Dortmund“ auf der Tafel darf wegfallen.
Vergleichsdokument: kein Konflikt. Frage 18 empfiehlt, die Luftlinie zu streichen; das passt zu seiner Kritik.
Später geändert: nein.

**V21. „Nach eigener Zählung 67“ fällt weg.**
„Nach eigener Zählung 67 rausnehmen.“ (20.10., 03:53)
Für den Bau: Die Zahl 67 steht nirgends. Gezeigt werden die 65 Länder und Gebiete auf dem Globus (V27).
Später geändert: nein.

**V73. Unter dem Zeitband bleibt auf dem Telefon in Ruhe kein leerer Raum; die Ruhe beginnt bei Gilgamesch.**
„Hier ist halt jetzt noch ein Leerraum, wenn man noch auf kein Buch geklickt hat auf dem Handy. Können wir den noch füllen? Vielleicht ganz leicht ausgegraut?“ (22.10., 22:31, mit einem Bildschirmfoto vom Telefon: unter „früher später“ der leere Raum bis „die wichtigsten aus Kindheit und Jugend“). Claude baute den grauen Satz zum neuesten Buch ein, auf allen Breiten. In Claudes Bericht („beim Laden also das neueste“) schrieb er dazu: „mach mal das älteste. Also Gilgamesch. Sonst ist alles gut 😉 Will nur nicht bei Caroline Wahl oder einem anderen Buch anfangen, was ich dann noch in der Bib habe“ (22.10., 22:58). Gleich danach: „Davon abgesehen ist das glaube ich auch nur ein mobiles Problem. Sonst geht das“ (22.10., 22:59). Nach dem ersten Blick auf dem Testlink: „Es muss noch deutlich grauer sein. Also viel blasser Gilgamesch. Im Anfang der Seite“ (23.10.)
Für den Bau: Nur auf dem Telefon (das rollende Band, bis 40 rem) steht in Ruhe in der Buchzeile unter „früher“ und „später“ der Satz zum Buch am Knopf von „gelesen“, im blassesten Grau der Seite, `--zb-strich` (dem Grau der hellen Striche im Band). Kein neues Wort und keine Anleitung, nur der echte Satz. Beim Laden ist das Gilgamesch: Alle drei Knöpfe stehen in Ruhe leer beim ältesten Buch ihrer Reihe, auf allen Breiten; „später“ wählt dann das älteste Buch, „früher“ ist leise. Das Band auf dem Telefon steht beim Laden weiter am rechten Ende (Standardentscheidung 27); Claudes Versuch, es nach links zu Gilgamesch zu stellen, ist zurückgenommen, weil die zwei Reihen darunter dann leer im Bild waren und Dominik nur das Buch in Ruhe ändern wollte. Nach dem Zurücklegen zeigt der Satz das Buch, an dem der Knopf dann steht. Er verschwindet beim Zeigen, Ziehen und Wählen; ein Tipp darauf wählt das Buch. Tablet und Desktop: in Ruhe nichts in der Buchzeile, wie vorher.
Ort in C: `website-c/index.html`, `span#zeile-ruhe` in `p#bandzeile` (`ruheBuch`, `ruheSetzen`), der Knopf in `einenZeigen`, die Jahreszahlen des Reglers in `reglerBauen`.
Später geändert: ja. Der erste Einbau (grau der Satz zum neuesten Buch, Caroline Wahl, *22 Bahnen*, auf allen Breiten) gilt nicht mehr.

---

## 3. Globus und Karten

**V22. Die Chronik des Lebens springt von Station zu Station.**
„Können wir in den Globus reinzoomen? Vielleicht auch noch Dortmund, Freiburg, Potsdam, Mallorca, Kaohsiung (Colombo und Cotonou) als Standorte.“ (19.10., 02:24). „Wäre auch cool, wenn es springt, beim Leben. […] Also mit den Jahren Dortmund bis 2014, Freiburg 2014, Potsdam 2015, Sri Lanka 2016, Benin 2018, Kaohsiung 2018, Berlin 2022, Mallorca 2023 … So in die Richtung gehend … Also pendelnd.“ (19.10., 03:58). „Ich finde die Animation gut, aber es ist immer noch zu KI-generisch.“ (ebenda)
Für den Bau: Die Chronik läuft von selbst und springt, ohne langes Warten. Berlin seit 2022 hat er bestätigt („Ja, Berlin stimmt“, 19.10., 20:12). Nach Claudes Zusage vom 21.10. bleibt die Chronik auf der Startseite.
Vergleichsdokument: kein Konflikt. Element 11 und Frage 9 empfehlen „von selbst, wie in A“.
Später geändert: nein.

**V23. Die Trilogie entfaltet sich langsam.**
„Und genauso bei der Trilogie sich erst langsam entfaltet.“ (19.10., 03:58)
Für den Bau: In der Ebene *Ursprung* der Startseite und auf der Seite *Ursprung* erscheinen die Orte nacheinander und langsamer als beim Leben: Göbekli Tepe, Uruk, Tyros und Jerusalem.
**Konflikt** mit Element 19 und Frage 17 („klicken statt Wiedergabe“): Seine Vorgabe gilt. Klicken darf zusätzlich möglich sein. Ein Grund, das Entfalten ganz zu streichen, ist nicht genannt.
Später geändert: nein.

**V24. Nebenorte sind längere Aufenthalte von einem Wohnort aus.**
„Es ist vielleicht nochmal wichtig zu sagen, dass Cotonou und Colombo und auch Mallorca mehr Nebenorte sind. Also Orte, wo ich länger war, während ich woanders gelebt habe.“ (19.10., 04:26)
Für den Bau: Colombo, Cotonou und Mallorca sind als längere Aufenthalte gekennzeichnet, leiser als die Wohnorte. Die Spur zu ihnen kann als Abstecher vom jeweiligen Wohnort gezeichnet werden (Element 14b). Claudes Annahme bis zu seiner Antwort: Colombo und Cotonou von Potsdam aus, Mallorca von Berlin aus, jeweils hin und zurück.
Vergleichsdokument: kein Konflikt. Seine Beschreibung stützt die Abstecher aus Element 14b und Frage 10.
Später geändert: nein.

**V25. Die Ebenen lassen sich umschalten.**
„Ich fände auch cool, noch Satoshi als Roman nachzubauen … Also eine Funktion, dass man in den Roman reinzoomen kann.“ (19.10., 02:24). Seine Antwort auf die Frage, wie das gehen soll: „Genau umschaltbar. Das fände ich cool.“ (19.10., 02:30). „Reisen fehlt halt noch.“ (19.10., 03:46)
Für den Bau: Auf dem Globus der Startseite gibt es vier Ebenen: wo er gelebt hat, wohin er gereist ist, *Satoshi* und *Ursprung*.
Später geändert: nein.

**V26. Zoomen wie in B.**
„Können wir in den Globus reinzoomen?“ (19.10., 02:24). „Das Zoomen im neuen Globus ist besser.“ (20.10., 23:48)
Für den Bau: Technik aus B, also grob zeichnen in Bewegung und fein in Ruhe. Das Aussehen der Kugel bleibt wie in A.
Vergleichsdokument: kein Konflikt (Element 10, schon entschieden).
Später geändert: nein.

**V27. Die bereisten Länder: 65, deutlich sichtbar.**
Seine Angaben: „Du musst die Flaggen aus der Karte ablesen. Dazu sind noch Argentinien und Uruguay gekommen.“ (19.10., 02:41). „Bosnien war ich nicht. Nordirland schon!“ (19.10., 02:46). „Nein. Das waren Rubbelfehler.“ (zu Bosnien, 19.10., 02:46). „(England, Schottland und Nordirland zählen auf dem Globus als ein Land.) Trenn die mal.“ (19.10., 02:47). „Sind doch 65.“ (19.10., 02:53). „Westjordanland (aber weiß nicht, ob ich das mitgezählt habe).“ (19.10., 02:54). „Sansibar (auch.)“ und „Aber muss nicht getrennt. Ist im Grunde auch nur Kleinkram.“ (19.10., 02:54 und 02:55). „Reisen fehlt halt noch. Also ich sehe noch nicht alle Länder?“ (19.10., 03:46)
Für den Bau: Die Liste in `daten/inhalt.js` (`bereist`, `kontinente`) bleibt, wie sie ist: 65 Länder und Gebiete, England, Schottland und Nordirland einzeln, Westjordanland ohne Gazastreifen, Sansibar als Teil Tansanias. Die Fläche der bereisten Länder muss sich klar vom Rest abheben. Ein zu blasses Grau hatte er schon einmal übersehen.
Vergleichsdokument: kein Konflikt mit Element 09 und Frage 11 (Hellgrau), solange der Unterschied deutlich bleibt.
Später geändert: ja. 64 und 67 sind durch 65 ersetzt.

**V28. Kapstadt, Sansibar und Buenos Aires nur in der Vita, nicht auf dem Globus der Startseite.**
„Längere Aufenthalte. Wir können 2024 noch Kapstadt […] mit aufnehmen. Aber das mehr in der Vita. Im Globus auf der Startseite wäre das überladen.“ (20.10., 03:57). Jahre korrigiert: „Sansibar, Tansania, längerer Aufenthalt 6° 10′ S, 39° 11′ O“ (20.10., 04:47) und „Sorry. Der Fehler ist: 2026 Buenos Aires. Nicht Kapstadt … 2025 Tanzania/Sansibar (das richtigziehen)“ (20.10., 05:00)
Für den Bau: Kapstadt 2024, Sansibar 2025, Buenos Aires 2026 stehen in der Vita mit Koordinaten. Auf dem Globus der Startseite erscheinen sie nicht. Claudes Annahme, sie als Abstecher von Berlin zu zeichnen, betrifft nur eine Karte, auf der sie überhaupt vorkommen; die Startseite gehört nicht dazu.
Ort in A: `daten/inhalt.js`, `aufenthalte`; `vita.html`, letzte drei `li.neben` in `ul.daten`.
Später geändert: ja. Seine erste Fassung (2024 Kapstadt, 2024 Sansibar, 2026 Kapstadt) gilt nicht mehr.

**V29. Die Koordinaten bleiben.**
„Die Koordinaten sind gut. Aber der Look und Feel noch nicht ganz.“ (19.10., 03:58). „Klappentexte, gerne noch um Koordinaten ergänzen.“ (19.10., 20:12). Er hat die Koordinaten von Sansibar selbst korrigiert (20.10., 04:47).
Für den Bau: Koordinaten bleiben an der Tafel unter dem Globus, in den Stationen der Vita und bei den Bänden von *Ursprung*. Nach Claudes Zusage vom 21.10. stehen sie aufrecht und ruhig, nicht grau und kursiv.
**Konflikt** mit Frage 18 („Koordinaten nur an der Tafel“): Seine Vorgabe gilt. Dass Koordinaten als Mikro-Metadaten gelten, ist kein sehr guter Grund, denn er hat sie ausdrücklich gelobt und in der Vita selbst geprüft.
Später geändert: nein.

---

## 4. Satoshi

**V30. Die Schauplätze.**
„Schauplätze: Buenos Aires, Black Rock Desert, Berlin, New York, Kobe, London, Penang, Patagonien (Kernhandlung 2007–2010) / Sind die Schauplätze von Satoshi / San Gabriel Valley (auch noch! Temple City?) / (Patagonien Bariloche und im Grunde noch in den Bergen zur Grenze Chiles)“ (19.10., 02:46)
Für den Bau: Die Orte in `daten/inhalt.js`, `satoshi.orte`, bleiben. Temple City und die Anden stehen als weitere Schauplätze.
Ort in A: `satoshi.html`, `p#weitere`.
Später geändert: teilweise. „Fort Meadow“ aus derselben Nachricht ist gestrichen (V31).

**V31. Fort Meade bleibt draußen.**
„Fort Meade passt.“ (19.10., 20:12). Dann: „Fort Meade darf draußen bleiben.“ (20.10., 03:34)
Für den Bau: Fort Meade erscheint weder auf dem Globus noch im Text.
Später geändert: ja. Die spätere Aussage gilt.

**V32. Szenen erscheinen nur nach Klick, der Klappentext steht direkt unter dem Globus.**
„Eine Sache weiß ich jetzt schon. Bei Satoshi. Da springen wir durch die Timeline mit den Beschreibungen. Das soll nicht als Liste. Sondern immer nur, wenn man draufklickt, erscheinen. Das heißt, der Plot kommt direkt unter den Globus … Das ist besser. Die Timeline kann man dann durchnavigieren, wenn man will (es sind ja auch keine richtigen Spoiler, aber schon etwas).“ (21.10., 00:00)
Für den Bau: Keine sichtbare Liste „Der Roman der Reihe nach“ und keine Wiedergabe „Szene für Szene“. Am Globus eine schmale Zeitleiste mit Orten und Jahren, dazu „früher“ und „später“. Eine Szene zeigt ihren Text erst nach einer Wahl. Ohne Wahl zeigt der Globus den ganzen Weg ohne Szenentext. Für Vorleseprogramme bleiben die Szenen über benannte Bedienelemente erreichbar. Direkt unter dem Globus steht der Klappentext. Siehe `mischfassung-entscheidungen.md`, Punkt 3. Auslegung für die Startseite: In der Ebene *Satoshi* gilt dasselbe, also keine Szenentexte ohne Wahl.
**Konflikt** mit Element 18 und Frage 15 („Klappentext am Desktop in der linken Spalte neben dem Globus“): Seine Vorgabe gilt, der Klappentext steht unter dem Globus. Der Grund des Vergleichsdokuments (ein Globus über die ganze Breite wirke wie ein großes Kopfbild) reicht nicht. Lösen lässt sich das, ohne den Globus über die ganze Breite zu ziehen: Globus und Zeitleiste in einer Spalte, der Klappentext unmittelbar darunter.
Später geändert: nein.

**V33. Der London-Satz in seinem Wortlaut.**
„Zu Satoshi. Den ersten Satz zu London unbedingt ändern: London. Lana macht ein Praktikum bei Lehman Brothers und erkennt in den Bilanzen Muster, die sie beunruhigen und an Buenos Aires erinnern.“ (20.10., 04:23)
Für den Bau: Wortlaut unverändert. Text-Flagge 25 empfiehlt hier ausdrücklich „lassen“.
Ort in A: `daten/inhalt.js`, `satoshi.szenen`, zweiter Eintrag (London, 2007); `satoshi.html`, das zweite `li.szene` mit `span.szene-text`.
Später geändert: nein.

**V34. Der Satz mit Halloween ist gestrichen.**
„An Halloween 2008 stehen neun Seiten im Netz. (Den Satz mit Halloween raus.)“ (20.10., 04:23)
Für den Bau: Dieser Szenensatz kommt nicht zurück, auch nicht in einer Szene aus B oder aus Text-Flagge 25. Der erste Satz der Seite („Am 31. Oktober 2008 erschienen neun Seiten, die das Geld neu erfinden sollten. Ihr Verfasser hat nie existiert. Verschwinden musste er trotzdem.“) ist davon nicht betroffen. Er ist der Auftakt seines Exposés und bleibt.
Ort in A: Der Auftakt steht in `satoshi.html`, `p.anfang`, und in `daten/inhalt.js`, `satoshi.hook` und `werke[0].text`.
Später geändert: nein.

**V35. Die drei Absätze nach der Frage hinter dem Roman.**
„Das noch ergänzen nach dem Satz mit der Frage hinter dem Roman: Deutschland ist dabei ein Sonderfall. […] SATOSHI ist der Versuch des Autors, diese Lücke ein Stück weit zu schließen: […] Doch mit welcher Konsequenz? Wer war Satoshi Nakamoto wirklich? […] Satoshi ist ein Versprechen – und dieser Roman erzählt, was es gekostet hat.“ (20.10., 04:23)
Für den Bau: Alle drei Absätze stehen wörtlich, einschließlich seiner Gedankenstriche und der Titel *Wolf unter Wölfen* und *Schwarzer Obelisk*. Sein Text, nur Tippfehler dürfen geändert werden. Die Text-Flaggen 30 und 31 betreffen diese Absätze und sind nur Hinweise.
Ort in A: `satoshi.html`, Abschnitt mit `h2#frage-titel` („Die Frage hinter dem Roman“), zweiter bis vierter Absatz.
Später geändert: nein.

**V36. Über Satoshi muss man mehr erfahren können, aus seinen Texten.**
„Außerdem muss man über die Ursprungstrilogie und über Satoshi noch besser Sachen erfahren können. Ich gebe dir mal zu Satoshi das Exposé.“ und „Für den Einstieg und die Beschreibung Satoshi gerne auf die Vorhabensbeschreibung zugreifen.“ (19.10., 20:12). „Gerade bei Satoshi. Das ist alles einmal gründlich überarbeitet.“ (21.10., 04:29)
Für den Bau: Die Abschnitte aus Exposé und Vorhabensbeschreibung bleiben: Auftakt, Klappentext, Eckdaten, „Gebaut wie ein Protokoll“, die Figuren, „Die Frage hinter dem Roman“, „Wie er gemacht ist“. Die Seite gilt als von ihm durchgesehen. Ändern darf C dort nur Texte, die Claude geschrieben hat, also Beschriftungen und Hinweise. Die Szenentexte bleiben nach Claudes Zusage wie in A; Flagge 25 ist nur ein Vorschlag an ihn.
Ort in A: `satoshi.html`, die Abschnitte mit `h2#klapp-titel`, `h2#eck-titel`, `h2#bau-titel`, `h2#figuren-titel`, `h2#frage-titel`, `h2#machart-titel`.
Später geändert: nein.

**V37. Das Ende von Satoshi wird nicht verraten.**
Claude hat am 19.10. um 20:26 angekündigt, den Absatz zum Ende aus dem Klappentext wegzulassen. Dominik hat nicht widersprochen. Am 21.10. um 00:00 schrieb er über die Szenen: „es sind ja auch keine richtigen Spoiler, aber schon etwas“.
Für den Bau: Der Klappentext endet ohne den Absatz über das Ende des Pakts. Die Szenen zu Bariloche und Penang bleiben so knapp wie in A.
Ort in A: `satoshi.html`, Abschnitt `h2#klapp-titel`, fünf Absätze.
Später geändert: nein.

**V74. Die Handlung auf der Seite von *Satoshi* bleibt so ausführlich, wie sie ist; nach dem Livegang ein Zeitstempel im Internet Archive.**
Anlass war eine Einschätzung zum Urheberrecht, die Dominik in den Chat kopierte: Geschützt ist nicht nur der Wortlaut, sondern das Gefüge aus Figuren, Handlungsgang und erfundenen Ereignissen; ein Roman, der es nachbaut, wäre eine unfreie Bearbeitung. Das Risiko sei klein, und ein Schnappschuss im Internet Archive gebe einen neutralen Zeitstempel. Dominik: „Können wir das nochmal berücksichtigen. Bei Kreise finde ich es nichtiger. Bei Satoshi gebe ich schon ganz schön viele Infos ...“ Claude legte drei Stufen vor (A so lassen und Zeitstempel, B die zweite Schicht kürzen, C deutlich kürzen) und empfahl A. Dominik: „Wir machen wohl A hiervon. Setz das mal auf unsere Todo Liste“ (23.10., 12:06).
Für den Bau: Klappentext, Figuren, „Gebaut wie ein Protokoll“ und die Szenen der Tafel bleiben unverändert. *Kreise ohne Wiederkehr* nennt ohnehin nur Ort, Zeit und die Frage, warum der Tempel begraben wurde. Nach dem Livegang macht Dominik die Schnappschüsse selbst (`docs/todo.md`, Punkt „Nach dem Livegang“).
Ort in C: `website-c/satoshi.html`, `website-c/daten/inhalt.js` (Szenen der Tafel).
Später geändert: nein.

---

## 5. Ursprung

**V38. Für die Trilogie steht nur „in Arbeit“.**
„Wir schreiben bei Trilogie einfach ‚in Arbeit‘ … Ich verrate dir dann noch mehr zum Plot.“ (19.10., 03:46)
Für den Bau: Die Trilogie und jeder Band stehen als „in Arbeit“. Keine Seitenzahl, kein „fertiggestellt“. Die Geschichte mit den Agenturen und die Idee mit den tausend Lesern bleiben draußen.
**Konflikt** mit Frage 21 (Band I als fertiges Manuskript ins Regal, den Text „in Arbeit“ für Band I anpassen): Seine Vorgabe gilt. Dass das Exposé Band I als fertiggestellt nennt, ist kein Grund, denn er hat sich bewusst für „in Arbeit“ entschieden. Ob Band I einen Rücken im Regal bekommt, ist eine Formfrage; der Text bleibt „in Arbeit“.
Später geändert: nein.

**V39. Orte und Zeiten der Bände: Göbekli Tepe, Uruk, Tyros und Jerusalem.**
„Ich würde Ursprung, hat eigentlich … Göbekli Tepe. Dann hat es die Sumerer (die Hauptstadt der Sumerer) und als drittes die Phönizier um Jerusalem.“ (19.10., 03:46). „Ur passt, und trag beide ein: Jerusalem und Tyros.“ (19.10., 03:53). Auf die Rückfrage nach dem Exposé wählte er „Wie im Exposé“, also Uruk für Band II, um 8000 v. Chr. für Band I und die Titel *Kreise ohne Wiederkehr*, *Von dem König, der niemals sterben wollte* (Arbeitstitel) und *Das steinerne Wort* (Arbeitstitel) (Antwort 19.10., 20:16). Seine eigene Vita nennt „von Göbekli Tepe um 8000 v. Chr. über Uruk bis Jerusalem um 940 v. Chr.“ (20.10., 04:02).
Für den Bau: Band I Göbekli Tepe um 8000 v. Chr., Band II Uruk um 2700 v. Chr., Band III Tyros und Jerusalem um 940 v. Chr. Das Exposé schreibt „Arbeitstitel“; das beantwortet Frage 17 zur Schreibweise.
Ort in A: `daten/inhalt.js`, `ursprung`, `baende`, `trilogie`; `ursprung.html`, `p.band-ort` je Band.
Später geändert: ja. „Ur“ ist durch „Uruk“ ersetzt, „9500 v. Chr.“ durch „um 8000 v. Chr.“. Tyros und Jerusalem bleiben beide.

**V40. Die Zeile zu Band I.**
„Der älteste Tempel der Menschheit, und warum er von Menschenhand begraben wurde.“ (20.10., 03:53)
Für den Bau: Wortlaut unverändert, auf der Tafel der Startseite und der Seite *Ursprung*.
Ort in A: `daten/inhalt.js`, `baende.I`.
Später geändert: nein.

**V41. Die Figuren Jaromir und Kannika sind gestrichen.**
„Das würde ich rausnehmen. Jaromir, der Älteste. Seit er in jungen Jahren unerwartet zum ‚Ältesten‘ wurde, fühlt sich Jaromir wie ein Hochstapler. Kannika, die Wanderin. In ihrer frühen Kindheit ermordeten die Priester ihre Eltern. Sie wächst am Berg Karazak in der Obhut einiger Wanderer auf.“ (20.10., 04:10)
Für den Bau: Auf der Seite *Ursprung* gibt es keine Figurenliste. Die Kurzinhaltsangabe von Band I aus seinem Exposé nennt Jaromir und Kannika weiterhin. Sie ist sein Text und bleibt; gestrichen hat er nur die beiden Figureneinträge.
Ort in A: Die Kurzinhaltsangabe steht in `ursprung.html`, `p.band-text` in Band I.
Später geändert: nein.

**V42. „Alles steht unter der Frage …“ vor Band II.**
„Hier noch davorsetzen. Alles steht unter der Frage: Warum wurde der älteste Tempel der Menschheit nach zweitausend Jahren Blütezeit absichtlich unter Unmengen von Schutt und Erde begraben? Dieser Roman erzählt die Geschichte.“ (20.10., 04:10)
Für den Bau: Wortlaut unverändert, am Ende von Band I, also unmittelbar vor Band II. Die einzelne Frage, die dort vorher stand, bleibt ersetzt. Text-Flagge 41 betrifft diesen Satz und ist nur ein Hinweis.
Ort in A: `ursprung.html`, `p.band-frage`.
Später geändert: nein.

**V43. Der Text zu Band II.**
„Der junge Schreiberlehrling Harran bricht auf, um seine Schwester Samhat zu retten, die König Gilgamesch entführt hat. Er trifft auf einen Herrscher, der von der Angst vor dem Tod besessen ist und nach Unsterblichkeit strebt. Harran erkennt, dass er den König nicht mit Gewalt besiegen kann, sondern nur, wenn er ihm eine Geschichte schreibt.“ (20.10., 04:10; das Komma vor „wenn“ hat Claude ergänzt)
Für den Bau: Wortlaut unverändert.
Ort in A: `ursprung.html`, `p.band-text` in Band II.
Später geändert: nein.

**V44. Der Satz zur Bibliothek, mit Sapiens.**
„Zum Stoff der Trilogie stehen in seiner Bibliothek u. a. Gilgamesch, Sumerer und Akkader von Gebhard J. Selz und The Dawn of Everything von David Graeber und David Wengrow. (Dazu Harari natürlich. Sapiens …)“ (20.10., 04:10)
Für den Bau: Satz mit allen vier Büchern, *Sapiens* von Yuval Noah Harari am Ende. Die Titel öffnen ihre Buchzeile.
Ort in A: `ursprung.html`, `p#regal`.
Später geändert: nein.

**V45. Über die Trilogie muss man mehr erfahren können.**
„Außerdem muss man über die Ursprungstrilogie und über Satoshi noch besser Sachen erfahren können.“ (19.10., 20:12). „Göbekli Tepe, die Bücher noch anders ausmalen.“ (19.10., 02:24)
Für den Bau: Jeder Band hat Ort, Zeit, Thema und Inhalt aus dem Exposé. Die Ebene *Ursprung* fliegt nach Göbekli Tepe und entfaltet sich langsam (V23).
Ort in A: `ursprung.html`, die drei `section`-Blöcke mit `h2.band-titel`.
Später geändert: nein.

---

## 6. Bibliothek und Leseliste

**V46. Keine Zahlen, der Eindruck „sehr belesen“.**
„Also zu den Büchern noch. Es ist vielleicht blöd, hier zu genau die Zahl anzugeben. Also man kann sie durch die Zeit nehmen. Fände ich interessant, oder auch in welchen Jahren ich was gelesen habe? (Gelesen ist nicht aktuell!) […] Aber Zeitachse fände ich auch nice. Es muss im Detail nicht so genau dokumentiert sein, also mehr als sehr belesen. Das soll herauskommen, wenn man es sieht.“ (19.10., 04:07)
Für den Bau: Keine Buchzahlen, nirgends, auch nicht in Beschreibungen für Suchmaschinen. Ordnung nach dem Jahr der Erstveröffentlichung. Die Lesedaten aus Goodreads sind nicht aktuell; die Seite behauptet nicht, wann er etwas gelesen hat.
Später geändert: nein.

**V47. Kindheit und Jugend sind eine Auswahl.**
„Kindheit ist sehr unvollständig. Es sind mehr die wichtigsten Kindheitsbücher. Da fehlen locker 200 bis 400.“ (19.10., 04:07). „Die wichtigsten aus der Jugend und was noch wartet.“ (19.10., 20:12)
Für den Bau: Die Rubrik heißt so, dass sie als Auswahl erkennbar ist. „die wichtigsten aus Kindheit und Jugend“ und „was noch wartet“ setzen sich aus seinen Wörtern zusammen.
Ort in A: `index.html`, `p.bandname` im Zeitband (im Skript erzeugt); `bibliothek.html`, Namen der Bretter.
Vergleichsdokument: Das beantwortet Frage 22 zum Teil.
Später geändert: nein.

**V48. Die echte Leseliste, nicht die vereinfachte.**
„Hier ist übrigens gerade meine tatsächliche Leseliste. Nicht die vereinfachte Version.“ (19.10., 20:12)
Für den Bau: „was noch wartet“ zeigt seine Leseliste vollständig, mit Titel und Autor. Seine Anmerkungen zu den einzelnen Titeln sind privat und stehen nirgends.
Ort in A: `daten/leseliste.js`.
Später geändert: nein.

**V49. Auf dem Nachttisch: Bolaño statt der Geisha.**
„Bitte Memories of a Geisha durch Bolaño ersetzen. In der Liste der Bücher auf dem Nachttisch.“ (20.10., 03:53)
Für den Bau: Bolaño liegt auf dem Nachttisch, die Geisha nicht. „Nachttisch“ ist auch sein Wort. Das korrigiert die Angabe in `text-flaggen.md`, das Wort stehe bei ihm nur in einer mitkopierten Bildlegende.
Ort in A: `daten/buecher.js`, Einträge mit `"r":"gerade"`, darunter „Die wilden Detektive“.
Vergleichsdokument: Das beantwortet Frage 22 zum Teil: „Auf dem Nachttisch“ darf bleiben.
Später geändert: nein.

**V50. Frühe Werke, viele davon als Auszüge.**
„Zu den frühen Büchern. Bitte noch Marcus Aurelius Meditationen hinzufügen + Das Neue Testament + Die ersten Kapitel der Bibel, das Buch Hiob etc. […] Die Aeneis habe ich auch gelesen (in Latein in der Schule) […] Caesar Bello Gallico“ (20.10., 03:53). „Gerne Odyssee und Ilias und Metamorphosen auch noch hinzufügen bei frühen Werken. Aber analog zu Bello Gallico und Aeneis als Auszüge markieren. Gerne auch im Mittelalter noch Schriften von Thomas von Aquin auflisten (mit Auszügen, Summa theologica).“ (20.10., 14:42). Antwort auf die Rückfrage: „Die genannten plus Genesis“ als Auszüge (20.10., 14:44). „Don Quixote muss auch noch in die Bücherliste. Als Auszug.“ (20.10., 19:04)
Für den Bau: Alle diese Werke stehen im Zeitband und im Regal. Als Auszüge markiert sind Ilias, Odyssee, Aeneis, Metamorphosen, De bello Gallico, Genesis, Summa theologica und Don Quijote.
Ort in A: `daten/buecher.js` (Feld `x`); Vermerk „In Auszügen gelesen.“ in `seite.js`.
Später geändert: nein.

**V51. Keine Doppelungen.**
„Die Leiden des jungen Werthers sind dann in der Taiwan 2x / Shelley Frankenstein taucht als nicht zu Ende gelesen auf und als gelesen / (Achte bitte auf Doppelungen“ (20.10., 03:53)
Für den Bau: Jedes Werk steht einmal. Frankenstein steht nur als gelesen. Die Bereinigung in `daten/buecher.js` bleibt.
Später geändert: nein.

**V52. Ein Titel bleibt aus den Daten.**
Auf Claudes Frage nach einem abgebrochenen Titel antwortete er: „Titel raus lassen.“ (19.10., 20:12)
Für den Bau: Der Titel ist aus den Bücherdaten gelöscht und kommt nicht zurück, auch nicht bei einem neuen Export.
Später geändert: nein.

**V53. Das Regal: Bücher herausziehen, das quer liegende Buch bleibt.**
„Weiter unten könnte man vielleicht noch Bücher und eine Bibliothek animieren, wo man Sachen rausziehen kann etc. … Und dann auf Texte stößt.“ (19.10., 02:31). „Also das quere Buch finde ich aber prinzipiell gut. Vielleicht kann man noch mit den Abständen spielen etc.“ (19.10., 03:58). Zur Dichte: „Ja, mach 2 jetzt“, also Rücken dichter zeichnen (20.10., 09:42).
Für den Bau: Ein angeklicktes Buch zieht sich heraus und zeigt seine Angaben. Die quer liegenden Bücher bleiben. Das Regal bleibt dicht.
**Konflikt** zum Teil mit Element 21 („Requisiten gehen“) und 22: Bleistiftstriche, Lesezeichen und Karton dürfen gehen. Das Herausziehen und die quer liegenden Bücher bleiben, denn beides hat er ausdrücklich gelobt.
Später geändert: nein.

**V54. Für später: neuer Export, Kurzgeschichten, Essays, Anthologien.**
„Ggf. kann ich die Goodreads-Liste auch nochmal mit einigen hundert Kurzgeschichten aktualisieren. […] Aber wir können ggf. nochmal ein paar Anthologien hinzufügen, die ich gelesen habe. Merk dir das mal für die Zukunft.“ (19.10., 20:12). „Den Export schicke ich später. […] Oder wir machen halt ein extra Regal für Short Stories und Essays. Dann gäbe es bestimmt auch noch 100 bis 200 … Könnten wir überlegen.“ (20.10., 09:42)
Für den Bau: nicht Teil von C. Die Datenstruktur soll ein solches Regal später zulassen.
Später geändert: nein.

---

## 7. Vita

**V55. Sein Vita-Text steht auf der Vita-Seite.**
„Ich denke, ich kann Simon-Kucher ruhig in der Vita nennen. Was sagst du? Hier die angepasste Vita: Er wurde 1995 in Dortmund geboren. In Freiburg studierte er Liberal Arts & Sciences, danach in Potsdam IT-Systems Engineering am Hasso-Plattner-Institut. Vier Jahre lebte er in Kaohsiung auf Taiwan. […]“ (20.10., 04:02)
Für den Bau: Sein Text bleibt, wie er heute in A steht. Claude hat dort nur Tippfehler und Grammatik korrigiert: „Indie-Gaming-Studios“, „Zivilisation“, „Marketing- und Pricingberatung“, „Vertrauen in Institutionen“, das Komma vor „was“, der Gedankenstrich statt des Bindestrichs. Geglättet hat Claude „gehört er zum festen Bestandteil des Moderatorenteams“ zu „ist er fester Bestandteil des Moderatorenteams“. „Aboriginer-Kultur“ ist sein Wort und bleibt, bis er anders entscheidet (Text-Flaggen, „Nebenbei“).
Ort in A: `vita.html`, `div.vita-text`, zweiter Absatz (Geburt, Studium), vierter (Taiwan), fünfter (Berlin, Simon-Kucher, Werkstattbühne), sechster (Preis, *Satoshi*) und siebter (Ursprungstrilogie).
Später geändert: ja. Seine kürzere Fassung vom 20.10., 03:53, war für die Startseite gedacht und ist dort durch V15 ersetzt.

**V56. Simon-Kucher nur in der Vita.**
„Ich denke, ich kann Simon-Kucher ruhig in der Vita nennen.“ (20.10., 04:02). Vorher hatte er beim Ghostwriting „Nur allgemein“ gewählt, also „schreibt beruflich für Unternehmen“ ohne Ghostwriting und ohne Medien (Antwort 19.10., 20:16).
Für den Bau: Simon-Kucher steht genau einmal, in `vita.html`. Sonst bleibt der Beruf allgemein. Ghostwriting, Auftraggeber und Medien werden nicht genannt.
Später geändert: ja, für Simon-Kucher. Die spätere Aussage erlaubt den Namen in der Vita. Für alles andere gilt weiter „Nur allgemein“.

**V57. AIESEC bei Colombo und Cotonou.**
„Bei Benin und Sri Lanka, es waren Freiwilligenprojekte mit AIESEC, das könnten wir noch erwähnen.“ (20.10., 03:57)
Für den Bau: In der Vita ein Satz dazu, in den Stationen und auf der Tafel der Startseite der Vermerk „Freiwilligenprojekt mit AIESEC“.
Ort in A: `vita.html`, dritter Absatz der `div.vita-text`, und die beiden ersten `li.neben` in `ul.daten`; `daten/inhalt.js`, `leben`, Feld `projekt`.
Später geändert: nein.

**V58. Die längeren Aufenthalte seit Berlin.**
Siehe V28. Claude hat daraus den Satz „Längere Aufenthalte führten ihn seitdem nach Mallorca, Kapstadt, Sansibar und Buenos Aires.“ gebildet; seine Fassung vom 20.10. beruhte auf einer älteren Datei, in der der Satz fehlte.
Für den Bau: Satz und Stationen bleiben.
Ort in A: `vita.html`, Ende des fünften Absatzes der `div.vita-text`, und `ul.daten`.
Später geändert: ja, die Jahre (V28).

**V59. Das Bootsfoto in der Vita.**
„Zur Vita. Bitte dieses Bild …“ (20.10., 03:57). „Hier nochmal das Bild. Passt das jetzt?“ (20.10., 04:05). Das Foto kam am 20.10. um 04:12 als PDF.
Für den Bau: Das Foto vom Boot steht auf der Vita-Seite. Nach Claudes Annahme vom 21.10. steht kein Bildnachweis darunter, bis er den Namen nennt. Die Bildunterschrift zu *Picknick am Wegesrand* ist Claudes Text.
Ort in A: `vita.html`, `figure.bildnis`; `bilder/dominik-jaekel-boot.jpg`.
Später geändert: ja. Das Studioporträt ist durch das Bootsfoto ersetzt.

**V60. Keine Zeile zu Förderung und Mentoren.**
Seine Vita vom 20.10., 04:02, enthält sie nicht. Claude hat sie daraufhin entfernt (20.10., 04:07).
Für den Bau: Keine Mentoren, keine Seminare in der Vita.
Später geändert: nein.

---

## 8. Texte und Ton

**V61. Tippfehler immer korrigieren.**
„Hier ist die überarbeitete Vita. Tippfehler immer automatisch korrigieren.“ (20.10., 03:53)
Für den Bau: Tippfehler werden überall korrigiert, auch in seinen Texten, ohne Rückfrage. Sie kommen trotzdem in die Liste der Textänderungen.
Später geändert: nein.

**V62. Textänderungen nur bei deutlicher Verbesserung, seine Texte bleiben.**
„Nur nichts an den Texten verändern. Aber klar kannst du auch flaggen, wenn Texte nach KI klingen ;) Dann schaue ich mir die nochmal getrennt an.“ (20.10., 14:58). Dann: „Ich gebe dir diesmal auch die Erlaubnis für textliche Änderungen, wenn du sie für eine (deutliche) Verbesserung hältst. Wäge bitte immer ab.“ und „Irgendetwas Wichtiges, das du für den neuen Build wissen solltest? Also Originaltexte aus Exposés zählen. Oder Änderungen, die ich manuell gemacht habe. Gerade bei Satoshi.“ (21.10., 04:29)
Für den Bau: Seine Texte bleiben: Exposés, Vorhabensbeschreibung, seine Vita, alles, was er bei *Satoshi* und *Ursprung* geschickt oder gestrichen hat. Nach Claudes Zusage vom 21.10. ändert C nur Texte, die Claude beim Bau geschrieben hat, also Beschriftungen, Hinweise und kurze Beschreibungen, und nur bei deutlicher Verbesserung. Jede Änderung steht mit Vorher und Nachher in einer Liste.
Später geändert: ja. Das Verbot vom 20.10. ist durch die Erlaubnis vom 21.10. ersetzt, in den Grenzen der Zusage.

**V63. Seine Wendungen aus der Vorhabensbeschreibung.**
Er hat die Vorhabensbeschreibung zu *Satoshi* am 19.10. um 20:12 in den Chat kopiert. Aus ihr stammen „Nicht ein einzelner Skandal, sondern der flächendeckende Vertrauensentzug …“, die Überschrift „Die Frage hinter dem Roman“, der Absatz zur spekulativen Chronik und „Literatur in den Leerstellen des Verbürgten“.
Für den Bau: Diese Stellen sind sein Text (Text-Flaggen 24, 26 zum Teil, 34). Der erste Absatz unter „Die Frage hinter dem Roman“ ist Claudes Kürzung seines Absatzes. Kürzungen dürfen nur näher an seinen Wortlaut rücken, nicht weiter weg.
Vergleichsdokument: Das beantwortet die Frage in Frage 29, ob „Nicht ein einzelner Skandal, sondern …“ von ihm stammt: ja.
Später geändert: nein.

**V64. Das Kolophon in seinem Wortlaut.**
„Das hier? Gesetzt aus der Vollkorn von Friedrich Althausen, der erste Satz aus der IM Fell French Canon von Igino Marini. Küsten und Grenzen nach Natural Earth. […] (Soll das rein? Also weil wir Design und Templates benutzen, oder wie gehen wir damit um?)“ (20.10., 03:53). Dann: „Dann schreib hier vielleicht: Website gesetzt aus der Vollkorn von Friedrich Althausen, der erste Satz aus der IM Fell French Canon von Igino Marini. Küsten und Grenzen nach Natural Earth.“ (20.10., 04:10)
Für den Bau: Das Kolophon steht im Fuß jeder Seite in diesem Wortlaut. Ändert C eine Schrift, wird nur der Name der Schrift angepasst, damit die Zeile wahr bleibt. Die Teile „Entwurf F“ und „Alle Entwürfe“ bleiben weg.
Ort in A: alle Seiten, `p.kolophon-fuss`.
Vergleichsdokument: kein Konflikt mit Element 20 und Frage 24 (im Fuß, in Graphit).
Später geändert: ja. Die Fassung mit „Website gesetzt aus …“ vom 20.10., 04:10, gilt.

---

## 9. Länder

**V65. Länder bleibt in der Navigation, die Guides sind in Arbeit.**
„Länder bleibt drin.“ (20.10., 04:37). Ursprünglich: „Ich könnte selbst mal Länderguides machen […] Ich fände gut, Travelindependent für Deutschland zu kopieren.“ und „Countryguides zu geben (über 60 bereiste Länder, Aufbau ähnlich zu Travelindependent-Website)“ (19.10., 00:24)
Für den Bau: Die Seite *Länder* mit Globus und Verzeichnis nach Kontinenten bleibt in der Navigation. Die Guides stehen als „in Arbeit“. Ein Guide wird später ein Eintrag in `daten/texte.js`.
Später geändert: nein.

---

## 10. Erzählungen, Untertext, Blog

**V66. Erzählungen und Untertext bleiben, vorerst leer.**
„Ich muss dann schauen, was ich veröffentliche, vermutlich bald auch immer mehr von den Kurzgeschichten.“ (19.10., 02:24). „Ergänzt wird es dann wohl noch durch den Blog und durch 2–3 Kurzgeschichten, die ich noch hochladen werde.“ (20.10., 04:24). Auf Claudes Frage: „Untertext erstmal leer.“ (20.10., 04:37). „Kurzgeschichten und Essays kommen dann noch … Aber machen wir später.“ (20.10., 14:42)
Für den Bau: Die Seiten *Erzählungen* und *Untertext* bleiben mit ihrer Leseseite. Es stehen keine erfundenen Beispieltexte darin. Ein neuer Text ist ein Eintrag in `daten/texte.js`.
**Konflikt** mit Frage 25 („Erzählungen und *Untertext* erst ab dem ersten Text in die Navigation“): Seine Vorgabe gilt. Er hat die Struktur mit beiden Seiten freigegeben, „Länder bleibt drin“ entschieden und Texte angekündigt. Das Argument des Vergleichsdokuments (eine leere Seite verspricht etwas) lässt sich mit einer ruhigen, ehrlichen Zeile auf der leeren Seite lösen.
Später geändert: nein.

---

## 11. Kontakt, Impressum, Datenschutz, Newsletter

**V67. Anschrift und Mail.**
„Adresse ist Stresemannstr. 76, 10936 Berlin. Mail ist …“ (20.10., 03:53)
Für den Bau: Anschrift und Mail genau wie in A: Stresemannstraße 76, 10963 Berlin, die Mail wie im Fuß von A. Claude hat die Postleitzahl aus seinem Exposé genommen (10963) und um Bestätigung gebeten. Eine Antwort steht aus (Offene Fragen).
Ort in A: alle Seiten, `footer#kontakt`, `p.impressum` und der `mailto:`-Verweis; `impressum.html`; `datenschutz.html`.
Später geändert: nein.

**V68. Eine dezente Newsletter-Anmeldung.**
„Im Grunde müssen wir auch einen Newsletter-Signup mitaufbauen. Also das wäre gut … Wenn Leute ihre Mail eintragen wollen, wenn sie Updates bekommen.“ (20.10., 19:09). „Der Newsletter aber sehr dezent.“ (20.10., 19:11)
Für den Bau: Eine ruhige Zeile im Fuß mit Feld und „Eintragen“. Kein Pop-up, kein Banner, kein Kasten. Im Testsystem wird nichts verschickt. Die Formulierung „Eine E-Mail, wenn ein Buch erscheint oder eine Lesung ansteht“ ist Claudes Vorschlag. Er sprach allgemeiner von „Updates“; das ist bei Frage 23 zu bedenken.
Ort in A: alle Seiten, `form.post` im Fuß.
Später geändert: ja. „sehr dezent“ ergänzt die erste Nachricht.

**V69. Instagram und LinkedIn kommen später.**
„Und ich werde dann später noch mein Instagram und auch mein LinkedIn hinzufügen. Unten drunter.“ (20.10., 19:09)
Für den Bau: Im Fuß ist ein Platz vorbereitet und verborgen. Keine toten Links, bis er die Adressen schickt.
Ort in A: alle Seiten, `p.profile[hidden]`.
Später geändert: nein.

---

## 12. Daten und Fakten

**V70. Die Fakten, die er bestätigt oder korrigiert hat.**
- Wohnorte und Jahre: Dortmund bis 2014, Freiburg 2014, Potsdam 2015, Kaohsiung 2018, Berlin seit 2022 (V22). Längere Aufenthalte: Colombo 2016, Cotonou 2018, Mallorca 2023 (V24), Kapstadt 2024, Sansibar 2025, Buenos Aires 2026 (V28).
- Vier Jahre in Kaohsiung auf Taiwan, Studium in Freiburg und am Hasso-Plattner-Institut in Potsdam, A.-E.-Johann-Preis 2022, Moderation der Werkstattbühne des Autorenforums Berlin (V15, V55).
- 65 Länder und Gebiete (V27).
- Schauplätze von *Satoshi* (V30), ohne Fort Meade (V31).
- Orte, Zeiten und Titel der Trilogie (V39).
- Auf dem Bootsfoto liest er *Picknick am Wegesrand* (Claudes Bestimmung am 20.10., 04:07, nicht widersprochen).
Für den Bau: Neue persönliche Fakten kommen nicht dazu. Was hier nicht steht und nicht in seinen Exposés oder seiner Vita steht, gehört nicht auf die Seite.
Später geändert: siehe die einzelnen Punkte.

**V71. Nicht bestätigte Annahmen von Claude, die bis zu seiner Antwort gelten.**
- Bolaño auf dem Nachttisch ist *Die wilden Detektive* (Claude, 20.10., 04:01).
- „Don Quijote“ in deutscher Schreibweise, obwohl er „Don Quixote“ schrieb (Claude, 20.10., 19:05).
- Die Geisha ist unsichtbar, ohne Angabe, ob abgebrochen oder ungelesen (20.10., 04:01).
- Bei „die ersten Kapitel der Bibel … etc.“ stehen Genesis, Hiob und das Neue Testament (20.10., 04:01).
- Die Abstecher (V24) und kein Bildnachweis unter dem Foto (V59).
Für den Bau: so lassen, wie es in A steht, und in den offenen Fragen nennen.
Später geändert: nein.

---

## 13. Verbote

Hier stehen nur die Themen. Einzelheiten werden nicht abgeschrieben.

**V72. Was nicht auf die Seite kommt.**
- **Fort Meade** (V31).
- **Ghostwriting und Medien:** keine Einzelheiten zum Ghostwriting, keine Auftraggeber, kein *Wall Street Journal*, keine FAZ, kein *Harvard Business Manager*. Seine Wahl „Nur allgemein“ (19.10., 20:16).
- **Simon-Kucher** außerhalb der Vita (V56).
- **Perry Rhodan.** Er schrieb selbst „vermutlich unter Pseudonym“ (19.10., 00:24); Claude empfahl, es nicht zu verlinken.
- **Capsule** aus der Vita seines Exposés. Er hat es im Chat nie für die Website genannt.
- **Die Bewerbung um das Döblin-Stipendium** und der Arbeitsplan aus der Vorhabensbeschreibung. Er hat den Text als Quelle für die Beschreibung gegeben, nicht zur Veröffentlichung der Bewerbung.
- **Stand der Trilogie** über „in Arbeit“ hinaus, die Agenturen und die tausend Leser (V38).
- **Der gelöschte Goodreads-Titel** (V52).
- **Private Notizen** aus seiner Leseliste (V48) und aus dem Goodreads-Export.
- **Telefonnummer** und andere Kontaktdaten außer Anschrift und Mail wie in A (V67).
- **Unternehmerisches** (V12).
- **Das Wort „Untertagebuch“** (V11) und **die Zahl 67** (V21).
- **Buchzahlen** (V46).
- **Chinesisch** als Sprachkenntnis. Claude hat am 20.10. um 03:35 gefragt, wie gut er es spricht. Ohne Antwort bleibt es weg.
- **Neue persönliche Fakten** über ihn (V70).
- **Superlative** und Vergleiche mit anderen Menschen (V07).

---

## Übersicht 1: Seine Texte und wo sie in A stehen

„Von ihm“ heißt: er hat den Text geschrieben, geschickt oder ausdrücklich gewählt. Diese Stellen ändert C nur bei Tippfehlern. „Gestrichen“ heißt: er hat den Text entfernt, er darf nicht zurückkommen.

| Text | Herkunft | Ort in `website/` |
|---|---|---|
| Erster Satz „Dominik Jäkel schreibt tagsüber …“ | Claudes Vorschlag, von ihm gewählt (19.10., 20:16) | `index.html` `p#einstieg`; `vita.html` `p.einstieg` |
| „Schriftsteller und Reisender“ | sein Wunsch (19.10., 04:00) | alle Seiten, `.briefkopf .rolle` |
| Kurzvita der Startseite mit Werkstattbühne | Claudes Kürzung, von ihm freigegeben (20.10., 04:47) | `index.html` `p.vita` |
| „Was ich schreibe“, „Was ich gelesen habe“ | seine Wörter (19.10., 20:12) | `index.html` `h2#schreiben-titel`, `h2#gelesen-titel` |
| „die wichtigsten aus Kindheit und Jugend“, „was noch wartet“ | seine Wörter (19.10., 04:07 und 20:12) | `index.html`, `p.bandname` im Zeitband; `bibliothek.html`, Bretter |
| Vita-Text | von ihm (20.10., 04:02), Tippfehler korrigiert | `vita.html` `div.vita-text`, Absätze 2 und 4 bis 7 |
| AIESEC-Satz, Satz zu den Aufenthalten | Claude nach seinen Angaben (20.10., 03:57, 04:47, 05:00) | `vita.html` `div.vita-text`, Absatz 3 und Ende von Absatz 5 |
| Stationen mit Jahren und Koordinaten | seine Angaben | `vita.html` `ul.daten`; `daten/inhalt.js` `leben`, `aufenthalte` |
| Auftakt „Am 31. Oktober 2008 …“ | sein Exposé | `satoshi.html` `p.anfang`; `daten/inhalt.js` `satoshi.hook`, `werke[0].text` |
| Klappentext ohne das Ende | sein Exposé | `satoshi.html`, Abschnitt `h2#klapp-titel` |
| Szene London 2007 | von ihm (20.10., 04:23) | `daten/inhalt.js` `satoshi.szenen[1]`; `satoshi.html`, zweites `li.szene` |
| Szene Buenos Aires 2001 | sein Exposé | `daten/inhalt.js` `satoshi.szenen[0]` |
| Satz mit Halloween | **gestrichen** (20.10., 04:23) | nirgends |
| „Die Frage hinter dem Roman“, erster Absatz | seine Vorhabensbeschreibung, von Claude gekürzt | `satoshi.html`, Abschnitt `h2#frage-titel`, Absatz 1 |
| „Deutschland ist dabei ein Sonderfall …“, „*Satoshi* ist der Versuch des Autors …“, „Doch mit welcher Konsequenz? …“ | von ihm (20.10., 04:23) | `satoshi.html`, Abschnitt `h2#frage-titel`, Absätze 2 bis 4 |
| „Wie er gemacht ist“ | seine Vorhabensbeschreibung, gekürzt | `satoshi.html`, Abschnitt `h2#machart-titel` |
| „Gebaut wie ein Protokoll“, Figuren, Eckdaten | sein Exposé, gekürzt; Absatz zum Autor von Claude | `satoshi.html`, Abschnitte `h2#bau-titel`, `h2#figuren-titel`, `h2#eck-titel` |
| Fort Meade | **gestrichen** (20.10., 03:34) | nirgends |
| Pitch, Thema und Kurzinhalt von Band I | sein Exposé | `ursprung.html`, Band I, `p.band-pitch`, `p.band-thema`, `p.band-text` |
| „Alles steht unter der Frage: …“ | von ihm (20.10., 04:10) | `ursprung.html` `p.band-frage` |
| Text zu Band II | von ihm (20.10., 04:10) | `ursprung.html`, Band II, `p.band-text` |
| Thema und Text zu Band III | sein Exposé | `ursprung.html`, Band III, `p.band-thema`, `p.band-text` |
| Figuren Jaromir und Kannika | **gestrichen** (20.10., 04:10) | nirgends als Figurenliste |
| Zeile zu Band I „Der älteste Tempel …“ | von ihm (20.10., 03:53) | `daten/inhalt.js` `baende.I` |
| Satz zur Bibliothek mit *Sapiens* | von ihm (20.10., 04:10) | `ursprung.html` `p#regal` |
| Titel der Bände, „Arbeitstitel“ | sein Exposé (19.10., 20:16) | `daten/inhalt.js` `trilogie`; `ursprung.html` `h2.band-titel` |
| „Nach eigener Zählung 67“ | **gestrichen** (20.10., 03:53) | nirgends |
| Kolophon | von ihm (20.10., 04:10) | alle Seiten, `p.kolophon-fuss` |
| Leseliste, nur Titel und Autor | von ihm (19.10., 20:12) | `daten/leseliste.js` |

## Übersicht 2: Konflikte mit `aenderungen-website-b.md`

In allen Fällen gilt seine Vorgabe.

| Element oder Frage | Empfehlung dort | Seine Vorgabe | Punkt | Grund zur Abweichung? |
|---|---|---|---|---|
| 02, Frage 2 | erster Satz stehend, in der Vollkorn | fliegt ein, eigene Anzeigeschrift | V13 | Nein. Kürzer und ruhiger einfliegen lassen. |
| 16, Frage 7, Flagge 1 | Tagline streichen | „Schriftsteller und Reisender“ bleibt | V14 | Nein. Form statt Wortlaut ändern. |
| Frage 18 | Koordinaten nur an der Tafel | Koordinaten bleiben, auch in Vita und *Ursprung* | V29 | Nein. Die Luftlinie darf gehen. |
| 18, Frage 15 | Klappentext neben dem Globus | Klappentext direkt unter dem Globus | V32 | Nein. Globus in einer Spalte, Text darunter. |
| 19, Frage 17 | klicken statt Wiedergabe | Trilogie entfaltet sich langsam | V23 | Nein. Klicken zusätzlich erlauben. |
| Frage 21 | Band I als fertig zeigen, „in Arbeit“ anpassen | nur „in Arbeit“ | V38 | Nein. |
| Frage 25 | Erzählungen und *Untertext* erst ab dem ersten Text | beide Seiten bleiben | V66 | Schwach. Eine ehrliche Zeile auf der leeren Seite genügt. |
| 21, 22 | Requisiten gehen | Herausziehen und quer liegende Bücher bleiben | V53 | Nur für Bleistift, Lesezeichen, Karton. |
| 14, 23 | kein Mitschieben, keine weiche Bewegung | Bewegung beim Scrollen, sofern sinnvoll | V10 | Ja, für bloß schmückende Effekte. |

Ohne Konflikt, aber durch ihn entschieden: Frage 6 (V17), Frage 9 (V22), Frage 10 (V24, Annahme), Frage 14 (V18), Frage 22 (V47, V49), Frage 24 (V64), Frage 29 zu „Nicht ein einzelner Skandal“ (V63), Element 08 und Frage 3 (V05), Element 10 (V26).

## Übersicht 3: Fragen an ihn, die noch offen sind

1. **Postleitzahl:** Er schrieb 10936, das Exposé und A haben 10963 (V67).
2. **Bolaño:** *Die wilden Detektive* oder *2666* auf dem Nachttisch (V71)?
3. **Geisha:** abgebrochen oder noch ungelesen (V71)?
4. **Bibel:** außer Genesis, Hiob und dem Neuen Testament noch weitere Bücher (V71)?
5. **Erzählungen in Sammelbänden:** einzelne Erzählungen mit ihrem Band zusammenlegen, etwa „The Dead“ und *Dubliners*?
6. **Don Quijote oder Don Quixote** (V71)?
7. **Bootsfoto:** Wer hat es gemacht, und soll die Person genannt werden (V59)?
8. **Abstecher:** von Potsdam nach Colombo und Cotonou, von Berlin nach Mallorca, jeweils hin und zurück (V24)?
9. **Simon-Kucher:** Ist geklärt, dass die Firma genannt werden darf? Claude hatte am 20.10. um 04:07 dazu geraten (V56).
10. **„Aboriginer-Kultur“** in der Vita: lassen oder „indigene Völker“ (V55)?
11. **Chinesisch:** in die Vita, und wie gut (V72)?
12. **Bücher im Regal:** Bleiben *Ghostwritten* von David Mitchell, *Das kleine Gespenst* und die Bücher von Wulf Dorn und Ursula Poznanski? Claude fragte am 20.10. um 06:57.
13. **Newsletter:** Wortlaut der Zeile freigeben, auch Journal-Einträge ankündigen, Anbieter wählen (V68)?
14. **Instagram und LinkedIn:** die Adressen (V69).
15. **Impressum:** ein zweiter schneller Kontaktweg neben der Mail, etwa ein Formular?
16. **Szenentexte von *Satoshi*:** Text-Flagge 25 durchsehen. In C bleiben sie bis dahin wie in A (V36).
