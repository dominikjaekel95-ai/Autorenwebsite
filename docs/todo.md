# To-do-Liste

Stand: 23. Oktober 2026. Was bis zum Livegang und danach noch zu tun ist. Wer es tut, steht dabei: **Dominik** (Anmelden, Bezahlen, Entscheiden, alles im Browser) oder **Claude** (Code im Repository).

## Entscheidungen, die offen sind

- [x] **Dominik:** Weiße Fläche am Desktop, Startseite: entschieden für „7 und 6“ (23. Oktober, V75; https://claude.ai/artifact/93qkfHP2cNbTVKNXeptcKt), mit der Unterschrift „Meine Projekte und was auf dem Nachttisch liegt“ und auf dem Telefon dem ganzen Regal. Eingebaut in `website-c/index.html` (Änderungsprotokoll, 23. Oktober).
- [ ] **Dominik:** *Satoshi*: das Inhaltsverzeichnis als Buch (V76). Fünf Varianten zum Ausprobieren: https://claude.ai/artifact/AKzeEDR9G7EskUYjsJ1afc (Begründung und Empfehlung: https://claude.ai/artifact/NiUCVfu3Xt98sgH982QaBQ, `docs/satoshi-buch.md`; empfohlen Variante 4, zweite Wahl Variante 2). Danach baut Claude die Wahl in `website-c/satoshi.html` ein. Offen dabei: Auf dem Telefon ist das Verzeichnis während des Einspielers am Globus verdeckt; soll es dort immer direkt unter der Tafel stehen?
- [ ] **Dominik:** Abstände und Gliederung der Startseite unterhalb des ersten Bildschirms (`docs/startseite-rhythmus.md`, Empfehlung: Variante 1 mit Legende und Fuß aus Variante 2), passend zur Wahl oben.

## Vor dem Livegang

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
