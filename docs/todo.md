# To-do-Liste

Stand: 23. Oktober 2026. Was bis zum Livegang und danach noch zu tun ist. Wer es tut, steht dabei: **Dominik** (Anmelden, Bezahlen, Entscheiden, alles im Browser) oder **Claude** (Code im Repository).

## Entscheidungen, die offen sind

- [x] **Dominik:** Weiße Fläche am Desktop, Startseite: entschieden für „7 und 6“ (23. Oktober, V75; https://claude.ai/artifact/93qkfHP2cNbTVKNXeptcKt), mit der Unterschrift „Meine Projekte und was auf dem Nachttisch liegt“ und auf dem Telefon dem ganzen Regal. Eingebaut in `website-c/index.html` (Änderungsprotokoll, 23. Oktober).
- [x] **Dominik:** *Satoshi*: das Inhaltsverzeichnis als Buch (V76): entschieden für Variante 5, das Buch zum Umblättern, mit einem Zeichen unter jedem Kapitel und langsamem Erscheinen nach dem Aufhänger (23. Oktober, V77). Eingebaut in `website-c/satoshi.html` (Änderungsprotokoll, 23. Oktober); auf dem Telefon steht das Buch jetzt immer sichtbar unter der Tafel.
- [ ] **Dominik:** Einblenden beim Laden (`docs/einblenden.md`, Entscheidungsseite https://claude.ai/artifact/WJvDcw5tPNERyLNcv1NMyv): Empfehlung Variante 2 „Globus zuletzt“ (Testlink https://claude.ai/artifact/YNHCYoruZSVqHntS3BRSgQ), Gegenrede Variante 1; alle fünf zum Gegentesten unter https://claude.ai/artifact/LdXQjJubBA6uogxtngZ9un. Dazu die Frage, ob das Inhaltsbuch auf *Satoshi* in 0,5 und 1,0 s statt 0,8 und 1,4 s erscheinen darf (V77). Erst nach der Wahl kommt etwas in die echte Seite.
- [ ] **Dominik:** Abstände und Gliederung der Startseite unterhalb des ersten Bildschirms (`docs/startseite-rhythmus.md`, Empfehlung: Variante 1 mit Legende und Fuß aus Variante 2), passend zur Wahl oben.

## Vor dem Livegang

- [ ] **Dominik:** *Satoshi* auf einem iPhone (Safari), das neue Telefonbuch (V80): unter der Tafel den schmalen Band antippen, er schlägt sich zur Doppelseite auf; dann alle sechs Einträge antippen (Klappentext, Eckdaten, Gebaut wie ein Protokoll, Die Figuren, Die Frage hinter dem Roman, Wie er gemacht ist), dazwischen mit einem Tipp auf die freie linke Seite zuschlagen. Einmal mit und einmal ohne „Bewegung reduzieren“ (Einstellungen › Bedienungshilfen › Bewegung). Geprüft ist das bisher nur in Chrome (Chromium); zu achten ist auf ein Flackern beim Umschlagen des Deckels, auf Text, der durch den Deckel scheint, darauf, dass „Klappentext“ neben dem Fuß des Bands steht und beim Aufschlagen ohne Sprung unter die Doppelseite wechselt, dass über dem Band nie eine große weiße Lücke bleibt (auch während die Kugel ihre Stationen abspielt) und dass jeder Tipp auf einen Eintrag zum richtigen Abschnitt springt. Am Desktop (Buch zum Umblättern) wie bisher.
- [ ] **Dominik:** Domain dominikjaekel.de prüfen und kaufen, mit Vercel verbinden (`docs/vercel-einrichtung.md`, Schritte 1 bis 3).
- [ ] **Dominik:** Angaben zu Vercel für die Datenschutzerklärung aus der anderen Sitzung (Schritt 4: Anschrift, Data Privacy Framework, Standardvertragsklauseln, Auftragsverarbeitungsvertrag, Server-Logs).
- [ ] **Dominik:** Tarif Pro oder Hobby. Empfehlung: Pro, weil der Auftragsverarbeitungsvertrag nur Pro und Enterprise nennt.
- [ ] **Dominik:** Impressum und Datenschutz freigeben.
- [ ] **Dominik:** Stimmen die 65 Länder?
- [ ] **Dominik:** Darf Simon-Kucher in der Vita genannt werden?
- [ ] **Claude:** Danach die endgültige Fassung bauen: `TARIF` setzen, die Markierungen „ZU PRÜFEN“ füllen, `veroeffentlichen.py` ohne `--entwurf`, beide Prüfprogramme.

## Nach dem Livegang

- [ ] **Dominik:** Zeitstempel im Internet Archive (V74). Die folgenden Adressen einmal im Browser aufrufen; jede legt einen datierten Schnappschuss der Seite an:
  - https://web.archive.org/save/https://dominikjaekel.de/satoshi
  - https://web.archive.org/save/https://dominikjaekel.de/ursprung
  - https://web.archive.org/save/https://dominikjaekel.de/

  Danach unter https://web.archive.org/web/*/dominikjaekel.de/* nachsehen, ob die Schnappschüsse da sind. Wiederholen, wenn sich die Texte zur Handlung auf *Satoshi* oder *Ursprünge* deutlich ändern.
- [ ] **Dominik:** Den Branch in GitHub in `main` umbenennen und in Vercel den Production Branch auf `main` stellen (`docs/vercel-einrichtung.md`, Schritt 2).

## Später

- [ ] **Dominik:** Newsletter: Wortlaut, Anbieter (V68); bis dahin ausgeblendet.
- [ ] **Dominik:** Adressen für Instagram und LinkedIn (V69).
- [ ] **Dominik:** Die ersten Kurzgeschichten für *Erzählungen*.
- [ ] Die übrigen offenen Fragen stehen in `docs/dominik-vorgaben.md`, Übersicht 3.
