# KI-typische Merkmale beim Bau von Websites

Rangliste mit Quellen und Gegenmitteln aus der Gestaltungspraxis. Stand: 20. Oktober 2026.
Grundlage für das Audit der bestehenden Seite (Version A) und für den Neubau (Version B).

---

## 1. Einleitung

### Was hier als KI-Merkmal zählt

Ein KI-Merkmal ist ein Gestaltungs- oder Textmittel, das auf generierten Seiten deutlich öfter vorkommt als auf Seiten, die Gestalter gebaut haben. Leser erkennen es deshalb als Herkunftsspur. Für sich genommen ist fast keines dieser Mittel falsch. Viele stammen aus dem Buchdruck oder aus guter Webpraxis und sind erst durch Wiederholung zum Erkennungszeichen geworden.

Alle Kataloge betonen, dass ein einzelnes Merkmal nichts beweist. Erst die Häufung ergibt eine Signatur. febbhav schreibt „One match is noise. Ten matches is a signature“, Hallmark nennt zwei Treffer im selben Bildschirm „a confirmation“. Die Liste ist deshalb ein Prüfraster. Wer sie anwendet, zählt am Ende die Treffer pro Bildschirm.

### Drei Wellen

Die Quellen beschreiben drei aufeinanderfolgende Looks.

1. **Erste Welle, bis etwa Mitte 2025.** Inter, Lila-Verlauf auf Weiß, zentrierter Hero, drei Icon-Karten. Anthropic schrieb im November 2025 selbst, Claude lande ohne Anleitung „almost always“ bei Inter, Lila und wenig Bewegung.
2. **Zweite Welle, 2025.** Die technische Gegenbewegung mit Geist oder Space Grotesk, Monospace-Labels, gesperrten Versalien, Pillen und Haarlinien-Tabellen. Der erste Entwurf dieser Website (d-globus.html mit Geist Light, Geist Mono und Pillen) gehörte dazu.
3. **Dritte Welle, 2026.** Der literarische Look mit Cremegrund, Serife, kursiven Akzenten, Terrakotta, Kapitälchen und Papier-Requisiten. Kyle Chayka hat ihn im New Yorker (Juni 2026) beschrieben: „Beige backgrounds, rust-red text, overzealous italics and underlining, pointless news tickers“. Anthropic dokumentiert ihn in den Prompting-Leitfäden für Opus 4.8 und Opus 5.5 als Claudes Standard.

Die dritte Welle ist zum Teil aus Anthropics eigenem Rat gegen die erste entstanden. Das Cookbook vom Oktober 2025 und der frontend-design-Skill vom November 2025 empfahlen Playfair, Fraunces, Newsreader, den Ton „editorial/magazine“, Korn-Überlagerungen und gestaffelte Einblendungen. Seit September 2026 warnt derselbe Skill vor genau diesen Mitteln.

### Der Hinweis zur grauen Kursive

Der Freund hat recht. „Graue kursive Schrift“ steht in keinem Katalog wörtlich als eigenes Merkmal, auch eine gezielte Suche fand nichts. Sie setzt sich aber aus mehreren gut belegten Merkmalen zusammen: Kursive als Dekor (Rang 8), grauer Nebentext (Rang 11) sowie Legenden- und Metazeilen (Rang 3 und 26). In Claudes Ausgabe für Buch- und Literaturthemen ist diese Kombination nach Lage der Quellen häufig. Sie steht als eigenes Merkmal auf Rang 24.

Dazu kommt ein Befund aus diesem Projekt. Die früheren Notizen haben das Mittel ausdrücklich empfohlen. In recherche-design.md (Muster 6) sollen die Koordinaten „kursiv in Grau“ stehen, in synthese.md (Entwurf C) die Orte „als kursive Marginalie“, die Stationenzeile kursiv nach Joyce. Diese Notizen stammen vom selben Modell. So beschreiben impeccable und taste-skill die dritte Welle: Der Rat gegen den alten Standard erzeugt den neuen.

Dasselbe gilt für weitere Empfehlungen dieser Notizen. Betroffen sind die eine Buchschrift mit Kapitälchen, Kapitälchen als Abschnittsbezeichnung, Siena als Sonderfarbe, hängende Jahreszahlen, Atlastafel und Karteikarte, die Kolophonzeile „Gesetzt aus …“ und Rubriken wie „Nachttisch“ und „Kinderzimmer“. Jedes Teil ist handwerklich sauber. Zusammen ergeben sie das Profil, das Claude bei „Autor“ von selbst wählt. Die Regeln aus synthese.md gegen die erste und zweite Welle bleiben richtig: kein Mono, keine Pillen, keine Tagline, keine Mittelpunkte, Zahlen im Satz, eine einzige Bewegung.

---

## 2. Wie die Rangfolge entstand

Die Liste fasst vier Recherchestränge zusammen.

- **Kataloge.** 19 Kernquellen: Anthropics Dokumentation, sieben Kataloge und Skills auf GitHub, drei Studien mit Zahlen, fünf Pressetexte.
- **Claude.** Anthropics Skill-Fassungen von November 2025, Juni 2026 und September 2026, die Prompting-Leitfäden und eine eigene Auszählung der Design Creativity Bench.
- **Gestalter.** Die Praxis von Verlagen, Museen und Typografen als Gegenprobe.
- **Text.** Mikrotexte, der Wikipedia-Leitfaden „Signs of AI writing“, Studien zum Schreibstil von Sprachmodellen, deutschsprachige Beobachtungen und eine Messung aller sichtbaren Texte der bestehenden Website.

### Häufigkeit

- **sehr häufig:** mindestens zwei unabhängige Quellen, dazu eine Messung über etwa 10 % der Seiten oder Anthropics eigene Beschreibung als Claude-Standard. Bei Textmerkmalen eine Korpusmessung oder übereinstimmende Nennung in den großen Leitfäden.
- **häufig:** mehrere Quellen ohne starke Messung, oder gemessen etwa 4 bis 10 %.
- **gelegentlich:** eine bis vier Quellen ohne Messung, ein Merkmal, das an einen Seitentyp gebunden ist, oder eine eigene Beobachtung.

### Rang

- Rang 1 ist das häufigste Merkmal. Gezählt wird über die ganze Liste. Die Gruppierung nach Bereichen in Kapitel 5 ändert die Nummern nicht.
- Gewichtet ist nach Seiten, die 2025 und 2026 mit KI-Werkzeugen gebaut wurden, mit Schwerpunkt auf Claude Code und Claude Opus 4.8 bis 5.5. Mit diesen Werkzeugen ist die Website entstanden. Merkmale der ersten Welle sind bei v0, Lovable, Bolt und Cursor weiter sehr häufig, bei Claude aber selten geworden. Sie stehen deshalb hinter den Claude-Merkmalen. Wo die Häufigkeit allgemein und bei Claude auseinandergeht, nennt die Zeile „Häufigkeit“ beide Werte.
- Merkmale, die Gestalter genauso oft verwenden, rücken nach hinten, auch wenn sie in KI-Seiten oft vorkommen. Haarlinien zum Beispiel setzen fast alle Modelle, aber auch 61 % der besten Galerieseiten. Sie unterscheiden also nichts.
- Die Reihenfolge innerhalb einer Stufe ist eine begründete Abwägung, keine Messung.

### Kennzeichnung

- **Claude:** Anthropic beschreibt das Merkmal als Claudes Standard, oder die Auszählung zeigt Claude deutlich über anderen Modellen.
- **Claude-Rat:** Das Merkmal ist aus Anthropics eigenem früheren Gestaltungsrat entstanden (Cookbook Oktober 2025, Skill November 2025 und Juni 2026).
- **°** hinter einer Quelle: nur über Suchzusammenfassungen bekannt, Wortlaut nicht selbst geprüft.
- **Unabhängig** heißt: verschiedene Urheber. Anthropics Skill, Leitfäden und Blog zählen zusammen als eine Quelle. Kataloge, die Adrian Krebs’ Zahlen übernehmen, zählen nicht als eigene Messung.

---

## 3. Grenzen der Belege

- Direkt lesbar waren aus der Arbeitsumgebung nur GitHub, claude.com und platform.claude.com. Pressetexte (New Yorker, WIRED, The Atlantic, Washington Post), Krebs’ Blog, Reddit, Hacker News und deutschsprachige Medien kennen wir nur aus Suchzusammenfassungen. Zitate daraus sind aus zweiter Hand.
- Belastbare Zahlen stammen aus vier Erhebungen:
  - Adrian Krebs, rund 1.400 Show-HN-Seiten, automatisch auf 14 bis 16 DOM-Muster geprüft, etwa 5 bis 10 % Fehlalarme (April 2026).
  - J. Carter Johnson, Auswertung von 3,2 Millionen Reddit-Beiträgen mit 3.033 Kommentaren aus 125 Threads. Das sind Beschwerden, also gefühlte Merkmale.
  - taste-skill, 246 Galerieseiten von One Page Love und Awwwards (Oktober 2026). Die Noten hat ein Panel aus Modellen vergeben, nicht aus Menschen. „Spitze“ heißt Note ab 7,5 (82 Seiten), „schwach“ unter 6,5 (23 Seiten).
  - Eigene Auszählung der Design Creativity Bench (Kombai, Oktober 2026): 20 Produktbriefings, eine HTML-Seite pro Modell, grob per Regex gezählt. Es sind SaaS- und Formularseiten ohne Webfonts, keine Autorenseiten. Werte für Buchthemen fehlen, weil es keinen API-Zugang für eigene Läufe gab.
- Viele Kataloge sind selbst Skills für Sprachmodelle und zitieren einander. Ihre Häufigkeitsangaben sind oft Einschätzungen.
- Textmerkmale sind fast nur für das Englische gemessen. Für das Deutsche gibt es Beobachtungen aus Journalismus und Ratgebern, aber keine Korpusstudie.
- Listen veralten schnell. Jede bisherige Liste mit Ersatzschriften oder Ersatzfarben wurde binnen Monaten zur nächsten Welle. taste-skill nennt deshalb bewusst keine Ersatzschriften. Auch diese Liste beschreibt nur den Stand vom Oktober 2026.
- Weglassen allein hilft nicht. In einer verdeckten Bewertung von taste-skill unterlag eine Seite, aus der alle Merkmale entfernt und nichts eingesetzt wurde, einer reicheren Seite mit Merkmalen. Sie wirkte wie „an empty page with good manners“. Wo ein Merkmal fällt, gehört Substanz hin: echte Bilder, voller Inhalt, eine Entscheidung mit Grund.

---

## 4. Übersicht

Claude: **ja** = Claude-Standard oder bei Claude deutlich häufiger. **Rat** = aus Anthropics früherem Rat entstanden. **selten** = bei Claude seltener als bei anderen Werkzeugen. **allgemein** = kein Unterschied belegt.

| Rang | Merkmal | Bereich | Häufigkeit | Claude |
|---:|---|---|---|---|
| 1 | Gesperrte Versal- oder Kapitälchen-Labels über Abschnitten | Typografie | sehr häufig | ja |
| 2 | Warmer Creme- oder Papiergrund | Farbe | sehr häufig | ja |
| 3 | Mittelpunkt-Metazeilen und Labels „WORT — Fragment“ | Komponenten | sehr häufig | ja |
| 4 | Pillenknöpfe | Komponenten | sehr häufig | ja |
| 5 | Karten für alles | Layout | sehr häufig | allgemein |
| 6 | Einblenden beim Scrollen auf jedem Abschnitt | Bewegung | sehr häufig | Rat |
| 7 | Gezeichnet statt fotografiert | Bilder | sehr häufig | ja |
| 8 | Kursives Akzentwort und kursive Überschriften | Typografie | sehr häufig | ja |
| 9 | Serife als Abkürzung zu „literarisch“ | Typografie | sehr häufig | ja, Rat |
| 10 | Terrakotta-, Rost- oder Siena-Akzent | Farbe | sehr häufig | ja |
| 11 | Grauer Nebentext mit wenig Kontrast | Farbe | sehr häufig | allgemein |
| 12 | Pfeil an Links, generische Handlungsaufforderung | Text | sehr häufig | ja |
| 13 | Monospace für kleine Labels und Daten | Typografie | sehr häufig | ja, Rat |
| 14 | Zentrierter Hero-Baukasten | Layout | sehr häufig | selten |
| 15 | shadcn und Tailwind im Werkszustand | Code | sehr häufig | selten |
| 16 | Dreierreihen | Text | sehr häufig | allgemein |
| 17 | „Nicht X, sondern Y“ | Text | sehr häufig | allgemein |
| 18 | Inter oder Geist für alles | Typografie | sehr häufig | selten |
| 19 | Lila- oder Indigo-Verlauf | Farbe | sehr häufig | selten |
| 20 | Emoji als Icons | Bilder | sehr häufig | selten |
| 21 | Leere Versprechen, Werbewörter, Taglines | Text | sehr häufig | selten |
| 22 | Icon im gerundeten Quadrat | Komponenten | sehr häufig | allgemein |
| 23 | Dekorative Nummern 01/02/03 | Layout | häufig | ja |
| 24 | Graue Kursive als zweite Stimme | Typografie | häufig | ja, Rat |
| 25 | Inszenierter Ladeauftritt | Bewegung | häufig | Rat |
| 26 | Mikro-Metadaten als Schmuck | Komponenten | häufig | Rat |
| 27 | Prunkstück-Widget | Komponenten | häufig | Rat |
| 28 | Effekt-Überschriften und inszenierte Rubriknamen | Text | häufig | ja |
| 29 | Viele gleichrangige Grautöne | Farbe | häufig | allgemein |
| 30 | Zu viele Schriftgrößen | Typografie | häufig | allgemein |
| 31 | Schriften aus dem „geschmackvollen“ Gratisvorrat | Typografie | häufig | Rat |
| 32 | Doppelpunkt-Pointe, Titel „Name: Erklärung“ | Text | häufig | allgemein |
| 33 | Sätze über die Seite, doppelte Information | Text | häufig | ja |
| 34 | Gleich gebaute Sätze, Pointe am Schluss | Text | häufig | allgemein |
| 35 | Wiederholte Formeln über die Seiten | Text | häufig | allgemein |
| 36 | Gedankenstrich als Allzweckverbinder | Text | häufig | selten |
| 37 | Tiefsinnsformeln | Text | häufig | allgemein |
| 38 | Kennzahl-Kacheln, Hochzähler | Layout | häufig | allgemein |
| 39 | Hover-Lift auf jeder Karte | Bewegung | häufig | allgemein |
| 40 | Fast-Schwarz mit Neonfarbe und Glow | Farbe | häufig | ja |
| 41 | Farbiger Seitenstreifen an Karten | Komponenten | häufig | allgemein |
| 42 | Schablonenfolge der Abschnitte | Layout | häufig | allgemein |
| 43 | Fehlende Zustände | Code | häufig | allgemein |
| 44 | Platzhalter, Stockfotos, erfundene Stimmen | Bilder | häufig | allgemein |
| 45 | Federnde Easings | Bewegung | häufig | allgemein |
| 46 | Deutsche Sonderfälle | Text | häufig | allgemein |
| 47 | Glas und backdrop-blur | Komponenten | häufig | allgemein |
| 48 | Google Fonts per Link | Code | häufig | allgemein |
| 49 | Gleichförmige Abstände | Layout | häufig | allgemein |
| 50 | Design-Drift zwischen Unterseiten | Layout | häufig | allgemein |
| 51 | Haarlinien als Zeitungskostüm | Layout | häufig | ja |
| 52 | Nachgebaute Papiergegenstände | Komponenten | gelegentlich | Rat |
| 53 | Unterstreichung als Zierde | Typografie | gelegentlich | ja |
| 54 | Laufband oder Ticker | Komponenten | gelegentlich | ja |
| 55 | Hängendes Randlabel („Specimen“) | Layout | gelegentlich | allgemein |
| 56 | An das Scrollen gekoppelte Effekte, Dauerbewegung | Bewegung | gelegentlich | allgemein |
| 57 | Körnung und Papiertextur als Anti-KI-Reflex | Bilder | gelegentlich | Rat |
| 58 | Semikolon als Ersatzverbinder | Text | gelegentlich | ja |
| 59 | Absicherung ohne Information | Text | gelegentlich | allgemein |
| 60 | Buchkonventionen als Kulisse | Text | gelegentlich | ja |
| 61 | Wechsel der Erzählperson | Text | gelegentlich | allgemein |
| 62 | Nominalstil | Text | gelegentlich | allgemein |
| 63 | Smaragd- oder Salbeigrün als Ausweichakzent | Farbe | gelegentlich | allgemein |
| 64 | Verlaufskugeln, Blobs, Aurora | Bilder | gelegentlich | Rat |
| 65 | Blinkender Statuspunkt | Komponenten | gelegentlich | allgemein |
| 66 | Browser-Oberflächen im Werkszustand | Code | gelegentlich | allgemein |
| 67 | Erzählende Kommentare im Quelltext | Code | gelegentlich | ja |
| 68 | Fingerabdrücke von Generatoren | Code | gelegentlich | allgemein |

---

## 5. Die Merkmale nach Bereichen

### 5.1 Typografie

#### 1. Gesperrte Versal- oder Kapitälchen-Labels über Abschnitten (Eyebrow, Kicker)

- **Häufigkeit:** sehr häufig, bei allen Modellen. Die stärkste Datenlage der ganzen Liste.
- **Claude:** ja. Opus 5.5 hat auf 20 von 20 Produktseiten Regeln mit Versalien und Sperrung, auf 19 davon drei oder mehr (eigene Auszählung). Ein Vergleichsmodell von OpenAI hat sie auf 8 von 20 Seiten, nie drei oder mehr.
- **Beschreibung:** Eine kleine, gesperrte Zeile in Großbuchstaben oder Kapitälchen steht als eigener Block über der Überschrift oder über jedem Abschnitt, oft grau. Die literarische Variante nimmt die Kapitälchen der Buchschrift, etwa „klappentext“, „eckdaten“, „stationen“.
- **Warum es nach KI aussieht:** Anthropics Skill zählt zwei seiner drei „commonest tells“ hierher: „all caps for labels“ und „unnecessary typographic labels above content“. impeccable verbietet das Label ausdrücklich auch in Kapitälchen („This one is a ban … no brief earns it back“). Es ist das einzige Modemerkmal, das auch die Galeriedaten verurteilen: Winzige gesperrte Versalien stehen auf 57 % der schwachen und 16 % der Spitzenseiten, drei und mehr auf 43 % gegen 6 %. Chayka nennt „tracked-out subheadings“. Kapitälchen mildern den Eindruck, weil sie aus dem Buchsatz kommen. Verräterisch bleibt die Dichte von einem Label pro Abschnitt.
- **Gegenmittel:** Das Label streichen und die Überschrift den Abschnitt tragen lassen. Wo ein Label Information trägt, steht es in normaler Schreibung und in Lesegröße. Kapitälchen dort, wo Bringhurst sie vorsieht: für Abkürzungen und Namen im Lauftext und als Einstieg in den ersten Absatz eines Kapitels. Im Buch gliedern Abstand und Kolumnentitel.
- **Quellen:** [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [impeccable](https://github.com/pbakaus/impeccable), [taste-skill, tells.md und research.md](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/references/tells.md), [avoid-ai-design, T5 und SD4](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Hallmark](https://github.com/Nutlope/hallmark), [Chayka, New Yorker°](https://kylechayka.substack.com/p/the-generic-style-of-ai-web-design), [Design Creativity Bench](https://github.com/kombai-io/design-creativity-bench), [Bringhurst nach webtypography.net°](https://webtypography.net.clagnut.com/3.2.2)

#### 8. Kursives Akzentwort und kursive Überschriften

- **Häufigkeit:** sehr häufig bei Buch-, Editorial- und Portfoliothemen. Auf Produktseiten seltener: Opus 5.5 setzt dort nur auf 4 von 20 Seiten ein `<em>` in eine Überschrift. In der Galerie hat das kursive Akzentwort 7 % der schwachen und 4 % der Spitzenseiten. Unter Gestaltern ist es also selten, bei Claude ist es Standard.
- **Claude:** ja. Anthropic nennt „italic word-accents“ als Hausstil von Opus 4.8, der „reads well for editorial, hospitality, and portfolio briefs“. Für Opus 5.5 rät Anthropic, „italic accent words“ ausdrücklich zu verbieten.
- **Beschreibung:** In einer Überschrift steht ein Wort kursiv („Romane, die *bleiben*“), oder ganze Überschriften und Titel sind kursiv gesetzt.
- **Warum es nach KI aussieht:** Anthropics Skill nennt es als ersten typografischen Tell („putting one word in italic“). Hallmark: „among the most reliable AI tells“, Überschriften dort immer aufrecht. avoid-ai-design: „A recognizable Claude signature“. Chayka: „overzealous italics“.
- **Gegenmittel:** Überschriften aufrecht. Betonung über die Wortwahl und den Zeilenfall. Kursiv nur für das, wofür der Buchsatz sie vorsieht: Werktitel, fremdsprachige Wörter, Betonung im Satz.
- **Quellen:** [Anthropic, Prompting Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8), [Anthropic, Prompting Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5), [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [Hallmark, anti-patterns.md](https://github.com/Nutlope/hallmark/blob/main/skills/hallmark/references/anti-patterns.md), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [taste-skill](https://github.com/Leonxlnx/taste-skill), [Chayka°](https://x.com/chaykak/status/2069787733648723979)

#### 9. Serife als Abkürzung zu „literarisch“ und „hochwertig“

- **Häufigkeit:** sehr häufig bei Buchthemen, dort Claudes erste Wahl. Auf Produktseiten setzt Opus 5.5 nur auf 2 von 20 Seiten Serifen-Überschriften, Grok 4.7 dagegen auf 18 von 20. Die Serife ist also kein reines Claude-Merkmal mehr.
- **Claude:** ja, Claude-Rat.
- **Beschreibung:** Eine kontrastreiche oder historisierende Serife für Name und Überschriften (Georgia, Fraunces, Playfair, Instrument Serif, Iowan Old Style, IM Fell), oft groß und oft kursiv. Häufig dazu eine „Charakter-Display-Schrift“, die nur für eine einzige Zeile auftritt.
- **Warum es nach KI aussieht:** Anthropic beschreibt „serif display type (Georgia, Fraunces, Playfair)“ als Standard von Opus 4.8. Das Cookbook empfahl 2025 Fraunces, Playfair, Crimson Pro und Newsreader. Der Skill vom Juni 2026 verlangte „a characterful display face that’s used with restraint“. WIRED nennt die Welle „tasteslop“: KI-Firmen und Claude selbst nutzen Serifen, um menschlich zu wirken. Auf Hacker News heißt es: „Claude loves generating websites with a particular style of serif font“. impeccable hat gemessen, dass Buchthemen bei Claude in „serif display with italic accents“ enden.
- **Gegenmittel:** Für einen Schriftsteller ist eine Buchschrift legitim. Sie braucht einen Grund und eine Herkunft (eine Ausgabe, einen Verlag, eine Epoche) und dient als Textschrift statt als Display-Geste. Literarische Häuser mit Gestaltern mischen oft eine Textserife mit einer Groteske für alles Funktionale: Paris Review (Matt Willey, Pentagram) mit Heldane und Founders Grotesk, Sternberg Press mit Sainte Colombe und Proto Grotesk. Oder eine einzige Schrift ohne Partner, wie bei Fitzcarraldo.
- **Quellen:** [Anthropic, Prompting Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8), [Claude Cookbook 2025](https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb), [Verlauf des frontend-design-Skills](https://github.com/anthropics/skills/commits/main/skills/frontend-design/SKILL.md), [impeccable](https://github.com/pbakaus/impeccable), [WIRED, nachgedruckt°](https://agtechdata.uga.edu/ai-has-come-for-serif-fonts/), [Hacker News°](https://news.ycombinator.com/item?id=47598601), [Paris Review, Creative Review°](https://www.creativereview.co.uk/paris-review-matt-willey-redesign/), [Sternberg Press, Fonts In Use°](https://www.fontsinuse.com/uses/50787/sternberg-press-website), [Kinross über Fitzcarraldo°](https://robinkinross.substack.com/p/fitzcarraldo-editions)

#### 13. Monospace für kleine Labels und Daten

- **Häufigkeit:** sehr häufig bei Claude, allgemein häufig. Opus 5.5 nutzt auf 12 von 20 Seiten intensiv Monospace (im Median 6,5 Verwendungen). Auf Award-Seiten ist Mono Mode (44 % der Spitzen- gegen 24 % der schwachen Seiten), deshalb kopieren es Generatoren. Als reines KI-Zeichen ist es schwächer als die Ränge davor.
- **Claude:** ja, Claude-Rat. Das Cookbook empfahl 2025 die Paarung „Display + monospace“.
- **Beschreibung:** Monospace für Jahreszahlen, Koordinaten, Maße, Labels, Signaturen und Navigation, oft in Versalien.
- **Warum es nach KI aussieht:** Anthropic zählt „a monospace face for small data labels“ zum Template-Chrom und nennt „mono labels“ unter den Rückfallstilen von Opus 5.5. Auf Hacker News fällt „the console-ish font Claude seems to love“.
- **Gegenmittel:** Ziffern und Daten in der Textschrift, als Mediävalziffern oder Tabellenziffern. Kapitälchen für Abkürzungen.
- **Quellen:** [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [Anthropic, Prompting Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5), [Claude Cookbook 2025](https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb), [taste-skill](https://github.com/Leonxlnx/taste-skill), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [HN-Diskussion zu Krebs°](https://news.ycombinator.com/item?id=47864393)

#### 18. Inter oder Geist für alles

- **Häufigkeit:** allgemein sehr häufig. Bei Claude seit Mitte 2025 selten.
- **Claude:** selten. Bis Mitte 2025 war es Claudes Standard.
- **Beschreibung:** Inter, Geist, Roboto oder die Systemschrift für Überschriften, Text und Bedienung. Oft als dünner Display-Schnitt mit enger Laufweite.
- **Warum es nach KI aussieht:** Anthropic beschrieb 2025 die „distributional convergence“: ohne Vorgabe „Inter fonts, purple gradients on white backgrounds, and minimal animations“. Geist ist die Hausschrift von Vercel und Standard in v0-Layouts. Krebs, avoid-ai-design und die Reddit-Auswertung führen die Schrift unter den häufigsten Merkmalen.
- **Gegenmittel:** Eine Schrift mit Herkunft (siehe Rang 31). Are.na hat seine Standardschrift von Dinamo neu zeichnen lassen und so die Arial zur eigenen Schrift „Areal“ gemacht.
- **Quellen:** [Anthropic-Blog, November 2025](https://claude.com/blog/improving-frontend-design-through-skills), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Johnson, Reddit-Auswertung](https://github.com/JCarterJohnson/vibecoded-design-tells), [taste-skill](https://github.com/Leonxlnx/taste-skill), [Krebs°](https://www.adriankrebs.ch/blog/design-slop/), [Are.na, Areal°](https://www.are.na/editorial/introducing-areal-are-nas-new-typeface)

#### 24. Graue Kursive als zweite Stimme

- **Häufigkeit:** häufig in Claudes Ausgabe bei Buch- und Editorialthemen. Das ist eine Einschätzung aus Anthropics Leitfäden, Chayka und impeccable, gezählt hat es niemand. Auf Produktseiten ist es selten: Opus 5.5 hat dort nur auf 2 von 20 Seiten eine Regel für graue Kursive. Kein Katalog führt das Merkmal wörtlich.
- **Claude:** ja, Claude-Rat. Der Skill vom Juni 2026 verlangte „a utility face for captions or data if needed“. Bei Buchthemen wird daraus graue Kursive, sonst Mono.
- **Beschreibung:** Unterzeilen, Bildlegenden, Koordinaten, Regalnamen, Datumszeilen und Bedienhinweise sind zugleich kleiner, grau und kursiv. Neben dem Text entsteht eine zweite, „leise“ Stimme.
- **Warum es nach KI aussieht:** Hier treffen drei belegte Merkmale zusammen, die Kursive als Dekor (Rang 8), der graue Nebentext (Rang 11) und Legenden- und Metazeilen (Rang 3 und 26). impeccable beschreibt den Cluster als „italic display serif, small tracked … labels“. Hallmark erlaubt Kursive nur im Fließtext und verbietet im Thema „Lumen“ ausdrücklich „italic captions“. Butterick rät, nie zwei Auszeichnungen zugleich zu verwenden und jede so sparsam wie möglich. Hier tragen drei Mittel dieselbe Information, nämlich „Nebensache“. Das wirkt wie Ornament. Im gedruckten Buch gibt es keinen grauen Text.
- **Gegenmittel:** Pro Textebene genau ein Unterscheidungsmittel. Legenden und Randnotizen aufrecht in der Grundschrift, eine Stufe kleiner, in Textfarbe, unterschieden durch ihre Stellung. Tufte CSS setzt Randnotizen so. Grau nur für einen echten Zustand. Kursiv nur für Werktitel, Fremdwörter und Zitate.
- **Quellen:** [Hallmark](https://github.com/Nutlope/hallmark), [impeccable](https://github.com/pbakaus/impeccable), [Anthropic, Prompting Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8), [Verlauf des frontend-design-Skills](https://github.com/anthropics/skills/commits/main/skills/frontend-design/SKILL.md), [Chayka°](https://kylechayka.substack.com/p/the-generic-style-of-ai-web-design), [Butterick, Bold or italic°](https://practicaltypography.com/bold-or-italic.html), [Tufte CSS](https://edwardtufte.github.io/tufte-css/), [shadcn CardDescription](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/card.tsx). Die Belege sind indirekt.

#### 30. Zu viele Schriftgrößen

- **Häufigkeit:** häufig.
- **Claude:** allgemein.
- **Beschreibung:** Neun und mehr Schriftgrößen mit kleinen Abständen, oder die Tailwind-Treppe 12, 14, 16, 18, 24 px.
- **Warum es nach KI aussieht:** Jede Komponente bekommt ihre eigene Größe, niemand legt eine Skala fest. avoid-ai-design (T6), taste-skill, febbhav, slop-detect und Laith führen es. Anthropic verlangt eine klare Skala.
- **Gegenmittel:** Zwei bis drei sichtbare Größen tragen die Seite, höchstens fünf, deutlich verschieden. Bücher kommen mit einem Grad für den Text und ein bis zwei weiteren aus. Fitzcarraldo braucht laut Kinross keine „partner typeface for captions or headlines“.
- **Quellen:** [taste-skill](https://github.com/Leonxlnx/taste-skill), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [febbhav, Signs of AI design](https://github.com/febbhav/signs-of-ai-design), [slop-detect](https://github.com/ravidsrk/slop-detect), [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)

#### 31. Schriften aus dem „geschmackvollen“ Gratisvorrat

- **Häufigkeit:** häufig. 15,8 % der Seiten nutzen eine Schrift aus dem kleinen „Tasteful“-Satz (avoid-ai-design).
- **Claude:** Claude-Rat. Das Cookbook empfahl 2025 genau diese Schriften als „Impact choices“.
- **Beschreibung:** Serifen wie Fraunces, Playfair, Instrument Serif, Cormorant, Crimson, Newsreader, Lora, Spectral, EB Garamond und DM Serif. Groteske wie Space Grotesk, Syne, Satoshi, IBM Plex, DM Sans, Outfit und Plus Jakarta. Historisierend IM Fell, die Hallmark im Rezept „Almanac“ führt („warm parchment paper, IM Fell roman-serif display, warm-amber accent“).
- **Warum es nach KI aussieht:** Die Schriften, die nicht generisch sein sollten, wurden generisch. impeccable nennt Fraunces, Playfair, Cormorant, Lora, Crimson und Newsreader „training-data defaults“ und schreibt: „books wanting a serif … are the associations the list exists to break“. febbhav nennt Instrument Serif „the newest reflex, usually italic, usually enormous“. Vollkorn steht auf keiner der geprüften Listen. Tiempos und Copernicus gehören zu Anthropics eigener Marke (Rekonstruktion VoltAgent).
- **Gegenmittel:** Eine Schrift mit Herkunft, Lizenz und benennbarem Grund, selbst gehostet und im Kolophon genannt. Beispiele aus der Praxis: Die NYRB griff mit Henrik Kubel auf das Archiv von Robert Besley zurück, die Library of America setzt im Web die Arnhem, die Loeb-Neugestaltung die Zeph. Robin Sloan setzt seine Fiktion in Vollkorn und das Logo seines Newsletters in einer Fraktur von David Jonathan Ross, „because it was hard for AI to read“. Nie die Schrift der letzten drei Projekte nehmen.
- **Quellen:** [avoid-ai-design, T2](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [impeccable](https://github.com/pbakaus/impeccable), [Claude Cookbook 2025](https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb), [Hallmark](https://github.com/Nutlope/hallmark), [febbhav](https://github.com/febbhav/signs-of-ai-design), [VoltAgent, Claude DESIGN.md](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/claude/DESIGN.md), [NYRB°](https://www.nybooks.com/announcing-the-new-york-reviews-redesign/), [Robin Sloan, Kolophon°](https://www.robinsloan.com/winter-garden/colophon/)

#### 53. Unterstreichung als Zierde

- **Häufigkeit:** gelegentlich. Belegt ist es vor allem bei Chayka („overzealous underlining“). Hallmark empfiehlt eine gezeichnete Unterstreichung als Ersatz für die Kursive und erzeugt damit den nächsten Reflex.
- **Claude:** ja, laut Chayka in Claude-Design-Ausgaben.
- **Beschreibung:** Einzelne Wörter unterstrichen, gezeichnete Linien unter Wörtern in Überschriften, oder sehr dichte Unterstreichung durch viele Wortlinks und Wort-Knöpfe nach dem „feinen“ Rezept (text-decoration-thickness 1px, text-underline-offset .2em, halbtransparent).
- **Warum es nach KI aussieht:** Die Unterstreichung wird zur Stimmung, statt einen Link anzuzeigen. Das feine Rezept ist der gängige Schnipsel für „geschmackvolle“ Links.
- **Gegenmittel:** Unterstrichen wird nur, was ein Link im Fließtext ist. Navigation zeigt den Ort durch Stellung. Wenige Links pro Absatz. Frank Chimero ließ 2019/20 die Browserstandards bewusst stehen. Diese Geste würde ein Modell kaum wählen.
- **Quellen:** [Chayka°](https://kylechayka.substack.com/p/the-generic-style-of-ai-web-design), [Hallmark](https://github.com/Nutlope/hallmark), [taste-skill](https://github.com/Leonxlnx/taste-skill), [Frank Chimero°](https://frankchimero.com/blog/2020/redesign-this-design)

### 5.2 Farbe

#### 2. Warmer Creme- oder Papiergrund

- **Häufigkeit:** sehr häufig bei Claude. Opus 5.5 setzt auf 11 von 20 Produktseiten einen warmen hellen Grund, zweimal exakt `#f4f1ea` als Variable. Das geschieht selbst bei SaaS-Briefings, die keine Wärme verlangen. Vergleichsmodelle von OpenAI und Google kommen auf 3 und 0 von 20, Grok 4.7 auf 15. Im Netz allgemein ist es gelegentlich: Nur 13 % der Galerieseiten haben warmes Off-White. Weil Gestalter es selten wählen, ist es ein starkes Signal.
- **Claude:** ja, von Anthropic selbst dokumentiert.
- **Beschreibung:** Seitengrund in gebrochenem, gelblichem Weiß um `#F4F1EA` bis `#FAF9F5`, dazu oft noch wärmere Flächen für Kästen, Karten und Regale.
- **Warum es nach KI aussieht:** Anthropic nennt den Ton im Leitfaden zu Opus 4.8 wörtlich („warm cream/off-white backgrounds (~#F4F1EA)“) und nennt ihn „persistent“. Allgemeine Verbote wie „kein Creme“ führen nur zu einer anderen festen Palette. Für Opus 5.5 steht der Cremegrund unter den Mustern, die man ausdrücklich verbieten soll. Der Ton entspricht Anthropics eigener Markenfläche `#faf9f5`. impeccable hat bei Claude einen „rendition prior“ festgestellt: „warm, bookish, family, and child-facing subjects come out as cream grounds, serif display with italic accents, and lamplight, even when the assigned direction never asked for them“. Eine Autorenseite ist genau so ein Thema. avoid-ai-design führt es als „the Claude look“ (SD1).
- **Gegenmittel:** Den Grund aus dem Material des Gegenstands ableiten. Für Bücher nennt impeccable „bookcloth, thread, jacket, and endpaper color“ und bemerkt, „cream paper is the smallest corner of that world“. taste-skill empfiehlt reines Weiß, kühlen Kalk oder Stein, tiefe Tinte oder ein vollflächiges Farbfeld. In der Galerie haben 25 % der Seiten reines Weiß und 41 % einen dunklen Grund. Naz Hamid hat seine Seite nach Chaykas Text aus Blaupause, Indigo und Selvedge-Denim neu gebaut.
- **Quellen:** [Anthropic, Prompting Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8), [Anthropic, Prompting Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5), [Anthropic, brand-guidelines](https://github.com/anthropics/skills/blob/main/skills/brand-guidelines/SKILL.md), [impeccable](https://github.com/pbakaus/impeccable), [taste-skill](https://github.com/Leonxlnx/taste-skill), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [unclaudey](https://github.com/ramialdine/unclaudey), [Chayka°](https://kylechayka.substack.com/p/the-generic-style-of-ai-web-design), [Naz Hamid°](https://nazhamid.com/links/the-claude-aesthetic/)

#### 10. Terrakotta-, Rost- oder Siena-Akzent

- **Häufigkeit:** sehr häufig in Claudes Ausgabe, meist zusammen mit Rang 2. Gemessen: Von 17 Opus-5.5-Seiten mit benanntem Akzent haben 6 einen orange-terrakottafarbenen, zwei Vergleichsmodelle keinen. In der menschlichen Galerie hat eine von 246 Seiten einen Terrakotta-Knopf.
- **Claude:** ja.
- **Beschreibung:** Ein einziger warmer Erdton (Ton, Rost, gebrannte Siena, Amber) für Hervorhebungen, eigene Titel und Links.
- **Warum es nach KI aussieht:** `#D97757` ist Anthropics Markenfarbe und Claudes Oberflächenfarbe. Der Skill schreibt dazu: „Anthropic’s own Claude-interface accent, so on a user’s brief it reads as a tell“. Der Leitfaden zu Opus 4.8 nennt „a terracotta/amber accent“. Chayka spricht von „rust-red text“, Clo Willaerts von „rusty orange accents“. taste-skill verbietet Terrakotta schon allein, Creme mit Terrakotta erst recht. Dunklere Töne derselben Familie (Siena, Ziegel) lesen sich als Variante.
- **Gegenmittel:** Farbe als System mit Herkunft. Fitzcarraldo trägt Klein-Blau für Romane und Weiß für Sachbücher. Fleckhaus gab der edition suhrkamp 1963 48 Farben, die nebeneinander einen Regenbogen ergeben. Bruce Mau nahm die Palette der McMichael Collection aus dem ersten erworbenen Gemälde. Wenn es einen Akzent gibt, dann aus einer anderen Familie als Rot-Orange (Kartenblau, Flaschengrün, Tintenviolett) und mit genau einer Bedeutung. Oder gar keinen, nur Schwarz und Weiß.
- **Quellen:** [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [Anthropic, Prompting Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8), [Anthropic, brand-guidelines](https://github.com/anthropics/skills/blob/main/skills/brand-guidelines/SKILL.md), [taste-skill](https://github.com/Leonxlnx/taste-skill), [avoid-ai-design, SD1](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Chayka°](https://kylechayka.substack.com/p/the-generic-style-of-ai-web-design), [Pixel Envy°](https://pxlnv.com/linklog/claude-aesthetic/), [Fitzcarraldo, Fonts In Use°](https://fontsinuse.com/uses/50700/fitzcarraldo-editions-book-series), [Fleckhaus, magCulture°](https://magculture.com/fleckhaus-design-revolte-regenbogen/), [Bruce Mau, LogoLounge°](https://www.logolounge.com/news/bruce-mau-rebrands-the-mcmichael)

#### 11. Grauer Nebentext mit wenig Kontrast

- **Häufigkeit:** sehr häufig, weil fast jedes generierte Layout ein Token wie „muted“ oder „secondary“ mitbringt.
- **Claude:** allgemein. Claudes eigene Oberfläche nutzt laut Rekonstruktion `#6c6a64` für Unterzeilen und `#8e8b82` für Legenden.
- **Beschreibung:** Untertitel, Hinweise, Legenden und Metadaten in Mittelgrau, oft knapp unter dem WCAG-Mindestkontrast von 4,5:1. Meist gibt es mehrere Graustufen für Neben-, Neben-Neben- und Hinweistext.
- **Warum es nach KI aussieht:** In shadcn/ui setzen CardDescription und FormDescription wörtlich `text-sm text-muted-foreground`. Das unveränderte shadcn-Set ist laut Reddit-Auswertung die häufigste konkrete Ursache für den KI-Look. avoid-ai-design nennt gedämpften Text unter AA „a systematic generated failure“ (C9). taste-skill: „A page set in soft grey reads unfinished“. Im Blindvergleich von Contra Labs lag Opus 5 bei zehn Designern auf dem letzten Platz, bemängelt wurde unter anderem der Kontrast. Kevin Marks kritisierte den grauen Webtext schon 2016, die KI verstärkt einen älteren Trend.
- **Gegenmittel:** Lesetext in voller Textfarbe. Rang über Größe, Stellung und Abstand. Höchstens ein zweiter Ton, gemessen mindestens 4,5:1, mit einer festen Bedeutung wie „inaktiv“.
- **Quellen:** [shadcn CardDescription](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/card.tsx), [Johnson, Reddit-Auswertung](https://github.com/JCarterJohnson/vibecoded-design-tells), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [taste-skill](https://github.com/Leonxlnx/taste-skill), [slop-detect](https://github.com/ravidsrk/slop-detect), [Laith, ux-skill](https://github.com/Laith0003/ux-skill/wiki/How-to-detect-AI-slop-in-your-design), [VoltAgent, Claude DESIGN.md](https://github.com/VoltAgent/awesome-design-md/blob/main/design-md/claude/DESIGN.md), [Contra Labs°](https://contralabs.com/research/opus-5-landing-page-study), [Kevin Marks°](https://kevinmarks.com/unreadable-web)

#### 19. Lila- oder Indigo-Verlauf

- **Häufigkeit:** allgemein sehr häufig (Krebs: violetter Knopf auf 10,7 % der Seiten). Bei Claude selten. Yuwen Lu stellt fest, dass Claude kaum noch Lila macht. Bei Opus 5.5 ist der Akzent aber noch auf 6 von 17 Seiten blau oder violett.
- **Claude:** selten.
- **Beschreibung:** Verlauf von indigo-500 oder violet-500 nach Blau, lila Knöpfe, Verlaufstext in Überschriften.
- **Warum es nach KI aussieht:** indigo-500 ist die Standardfarbe von Tailwind UI. Adam Wathan, der Autor von Tailwind, hat sich im August 2025 öffentlich dafür entschuldigt. Anthropic beschrieb 2025 „purple gradients on white backgrounds“ als Claudes damaligen Standard.
- **Gegenmittel:** Flächige Farbe mit Bedeutung, kein Verlauf.
- **Quellen:** [Anthropic-Blog, November 2025](https://claude.com/blog/improving-frontend-design-through-skills), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Johnson, Reddit-Auswertung](https://github.com/JCarterJohnson/vibecoded-design-tells), [Krebs°](https://www.adriankrebs.ch/blog/design-slop/), [prg.sh zu Adam Wathan°](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website), [Yuwen Lu°](https://x.com/yuwen_lu_/article/2041187936738447565)

#### 29. Viele gleichrangige Grautöne

- **Häufigkeit:** häufig.
- **Claude:** allgemein.
- **Beschreibung:** Fünf und mehr Grau- und Neutraltöne ohne klare Rollen, keine eindeutige Hauptfarbe.
- **Warum es nach KI aussieht:** Jede Arbeitssitzung bringt einen neuen Grauwert mit. designmd.me spricht von „five greys that arrived independently“. Anthropic schrieb 2025: „Dominant colors with sharp accents outperform timid, evenly-distributed palettes.“
- **Gegenmittel:** Ein Grund, eine Textfarbe, höchstens ein Akzent. Flächen trennt eine klare Tonstufe. impeccable unterscheidet vier Farbstrategien (zurückhaltend, verpflichtet, volle Palette, durchgefärbt). Eine davon wählen und durchhalten.
- **Quellen:** [Anthropic, Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices), [avoid-ai-design, C4](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [febbhav](https://github.com/febbhav/signs-of-ai-design), [impeccable](https://github.com/pbakaus/impeccable), [designmd.me°](https://designmd.me/blog/make-your-ai-built-website-look-less-like-ai)

#### 40. Fast-Schwarz mit Neonfarbe und Glow

- **Häufigkeit:** häufig.
- **Claude:** ja, Anthropic führt es als zweiten Cluster.
- **Beschreibung:** Grund `#0B0B0B` oder `#111` mit einer einzelnen grellen Farbe (Säuregrün, Zinnober), farbige Höfe per box-shadow.
- **Warum es nach KI aussieht:** Anthropic nennt „near-black with a lone acid-green or vermilion pop“. Krebs, die Reddit-Auswertung, taste-skill, impeccable und Hallmark führen Neon und Glow auf Dunkel. Zum getönten Fast-Schwarz an sich sind die Quellen uneinig: Anthropic zählt es zum Template-Chrom, impeccable und Hallmark verlangen es ausdrücklich.
- **Gegenmittel:** Ein dunkler Grund nur, wenn der Gegenstand ihn begründet. Den Akzent nach Bedeutung wählen, nicht nach Leuchtkraft (avoid-ai-design SD2).
- **Quellen:** [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [taste-skill](https://github.com/Leonxlnx/taste-skill), [impeccable](https://github.com/pbakaus/impeccable), [Krebs°](https://www.adriankrebs.ch/blog/design-slop/)

#### 63. Smaragd- oder Salbeigrün als Ausweichakzent

- **Häufigkeit:** gelegentlich.
- **Claude:** allgemein. Die Reddit-Auswertung kennt Salbei als Variante des Cremelooks.
- **Beschreibung:** Smaragd (`#10B981`) als „frischer“ Akzent oder gedämpftes Salbeigrün auf warmem Grund.
- **Warum es nach KI aussieht:** Wer Lila verbietet, bekommt die nächste Standardfarbe aus derselben Bibliothek.
- **Gegenmittel:** wie bei Rang 10. Farbe aus dem Material, mit fester Bedeutung.
- **Quellen:** [avoid-ai-design, SD8](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [febbhav](https://github.com/febbhav/signs-of-ai-design), [Laith, ux-skill](https://github.com/Laith0003/ux-skill/wiki/How-to-detect-AI-slop-in-your-design), [Johnson, Reddit-Auswertung](https://github.com/JCarterJohnson/vibecoded-design-tells)

### 5.3 Layout und Raster

#### 5. Karten für alles

- **Häufigkeit:** sehr häufig, bei allen Werkzeugen. Drei gleiche Icon-Karten stehen auf 28 % der schwachen und 1 % der Spitzenseiten. Opus 5.5 setzt weiche Grauschatten auf 11 von 20 Seiten, ein Vergleichsmodell von OpenAI auf keiner.
- **Claude:** allgemein. Bei Claude tritt es oft als weicher Schatten mit Akzentkante auf.
- **Beschreibung:** Jeder Inhalt steht in einem Kasten mit gleichem Radius, gleichem Schatten und gleichem Innenabstand. Drei gleiche Karten nebeneinander, Karten in Karten („container soup“).
- **Warum es nach KI aussieht:** Anthropics Skill führt das Kartenkit als vierten Cluster, die Gestaltungsanweisung an Claude nennt „rounded-lg everywhere; accent bar/rail on rounded cards“. impeccable: „nested cards are always wrong“. Der Kasten ist die Grundeinheit der Komponentenbibliotheken und erspart die Entscheidung, wie Inhalte zueinander stehen.
- **Gegenmittel:** Höchstens eine Ebene Umrahmung. Alles andere ordnen Abstand, Ausrichtung und Schriftgrad. Ein Kasten nur dort, wo der Inhalt ein Gegenstand ist, etwa ein Formular oder eine Abbildung.
- **Quellen:** [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [impeccable](https://github.com/pbakaus/impeccable), [taste-skill](https://github.com/Leonxlnx/taste-skill), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Hallmark](https://github.com/Nutlope/hallmark), [awesome-claude-design](https://github.com/rohitg00/awesome-claude-design), [Krebs°](https://www.adriankrebs.ch/blog/design-slop/)

#### 14. Zentrierter Hero-Baukasten

- **Häufigkeit:** allgemein sehr häufig, bei Claude seltener. avoid-ai-design gibt nach Krebs 23,5 % der Seiten an. In der Galerie steht die zentrierte Aussage mit Bild darunter auf 24 % der schwachen und 7 % der Spitzenseiten, das Pillen-Badge über der H1 auf 34 % gegen 14 %.
- **Claude:** selten.
- **Beschreibung:** Pillen-Badge („Neu“, „✨“), zentrierte große Überschrift, graue Unterzeile, zwei Knöpfe, darunter ein Bild. Oft als Vollbild mit 100vh. Dazu ist meist auch der Rest der Seite zentriert.
- **Warum es nach KI aussieht:** Es ist die Landingpage-Vorlage aus Tailwind UI und shadcn, die Modelle als Standard gelernt haben. Hallmark stuft den 100vh-Hero als „critical“ ein. Die Gestaltungsanweisung an Claude warnt vor „oversized 100vh heroes“ und „everything centered“.
- **Gegenmittel:** Ein links ausgerichteter Satz und ein Einstieg mit dem Werk. Craig Mods Startseite zeigt das aktuelle Buch statt einer Selbstvorstellung. Die Höhe ergibt sich aus dem Inhalt.
- **Quellen:** [avoid-ai-design, L1](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [taste-skill](https://github.com/Leonxlnx/taste-skill), [Hallmark](https://github.com/Nutlope/hallmark), [febbhav](https://github.com/febbhav/signs-of-ai-design), [slop-detect](https://github.com/ravidsrk/slop-detect), [Krebs°](https://www.adriankrebs.ch/blog/design-slop/)

#### 23. Dekorative Nummern 01/02/03

- **Häufigkeit:** häufig. Bei Claude sehr häufig: Opus 5.5 setzt sie auf 9 von 20 Seiten, Anthropic nennt sie für Opus 5.5 ausdrücklich. Krebs misst 9,4 %. Das Merkmal steht nicht weiter oben, weil auch Gestalter es oft nutzen: In der Galerie haben es 38 % der Spitzen- und 21 % der schwachen Seiten.
- **Claude:** ja.
- **Beschreibung:** Abschnitte oder Punkte tragen „01“, „02“, „03“, ohne dass die Reihenfolge etwas bedeutet.
- **Warum es nach KI aussieht:** Die Nummer täuscht eine Ordnung vor, die der Inhalt nicht hat. Anthropic, avoid-ai-design, impeccable und Hallmark führen es.
- **Gegenmittel:** Nur echte Reihen nummerieren: Bände einer Trilogie, Kapitel, Verse.
- **Quellen:** [Anthropic, Prompting Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5), [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [taste-skill](https://github.com/Leonxlnx/taste-skill), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [impeccable](https://github.com/pbakaus/impeccable), [Krebs°](https://www.adriankrebs.ch/blog/design-slop/)

#### 38. Kennzahl-Kacheln und Hochzähler

- **Häufigkeit:** häufig. Stat-Banner auf 12,2 % der Show-HN-Seiten (Krebs nach avoid-ai-design). Im literarischen Cluster seltener.
- **Claude:** allgemein.
- **Beschreibung:** Große Zahl mit kleinem Label („451 Bücher“, „61 Länder“), oft als Reihe von Kacheln und oft von null hochzählend animiert. Manchmal sind die Zahlen erfunden.
- **Warum es nach KI aussieht:** Anthropic nennt die „hero metric“, impeccable das „hero metric layout“. Das Hochzählen ist eine Dashboard-Geste.
- **Gegenmittel:** Die Zahl im Satz, ausgeschrieben, mit Herkunft und Einschränkung („nach meiner Zählung“). Keine Animation.
- **Quellen:** [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [avoid-ai-design, L4](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [impeccable](https://github.com/pbakaus/impeccable), [Hallmark](https://github.com/Nutlope/hallmark), [Krebs°](https://www.adriankrebs.ch/blog/design-slop/)

#### 42. Schablonenfolge der Abschnitte

- **Häufigkeit:** häufig, bei SaaS sehr häufig.
- **Claude:** allgemein.
- **Beschreibung:** Hero, Logos, Funktionen, Stimmen, Preise, FAQ, Handlungsaufforderung. Auf Autorenseiten: Über mich, Bücher, Termine, Newsletter, Kontakt.
- **Warum es nach KI aussieht:** Die Reihenfolge kommt aus der Vorlage und nicht aus dem Inhalt.
- **Gegenmittel:** Die Reihenfolge aus dem Inhalt ableiten. Silhouettentest nach avoid-ai-design: das Bildschirmfoto auf 200 px Breite schwarzweiß verkleinern und neben fünf ähnliche Seiten legen. Ist es nicht zu unterscheiden, ist es Schablone.
- **Quellen:** [avoid-ai-design, L9](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [febbhav](https://github.com/febbhav/signs-of-ai-design), [taste-skill](https://github.com/Leonxlnx/taste-skill)

#### 49. Gleichförmige Abstände

- **Häufigkeit:** häufig, gilt aber als weiches Signal.
- **Claude:** allgemein.
- **Beschreibung:** Alle Abschnitte mit demselben `padding-block`, perfekt symmetrische Raster, sehr große leere Flächen zwischen gleich gewichteten Blöcken.
- **Warum es nach KI aussieht:** Ein Abstandswert für alles ersetzt die Gewichtung der Inhalte.
- **Gegenmittel:** Abstände als Vielfache der Zeilenhöhe, ungleich nach Gewicht. Ein Satzspiegel mit Rändern wie im Buch. Karl Gerstner beschrieb das Raster als Programm, nicht als fertige Lösung. Frank Chimero schreibt über „The Web’s Grain“.
- **Quellen:** [avoid-ai-design, S1](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [taste-skill](https://github.com/Leonxlnx/taste-skill), [Hallmark](https://github.com/Nutlope/hallmark), [Laith, ux-skill](https://github.com/Laith0003/ux-skill/wiki/How-to-detect-AI-slop-in-your-design), [Gerstner, Designing Programmes°](https://openlab.citytech.cuny.edu/langecomd3504fa2019/files/2018/10/Gerstner_DesigningProgrammes.pdf), [Chimero, The Web’s Grain°](https://frankchimero.com/blog/2015/the-webs-grain/)

#### 50. Design-Drift zwischen Unterseiten

- **Häufigkeit:** häufig, sichtbar nur im Vergleich der Seiten.
- **Claude:** allgemein.
- **Beschreibung:** Unterseiten aus verschiedenen Arbeitssitzungen bringen eigene Grautöne, Größen oder Komponenten mit, oft in seitenspezifischen `<style>`-Blöcken.
- **Warum es nach KI aussieht:** Jede Sitzung generiert neu und verliert die Festlegungen der vorigen. avoid-ai-design stuft es als P0 ein (X1).
- **Gegenmittel:** Ein gemeinsames Stylesheet mit festen Tokens. Vor der Abgabe alle Seiten nebeneinander prüfen.
- **Quellen:** [avoid-ai-design, X1](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Hallmark](https://github.com/Nutlope/hallmark)

#### 51. Haarlinien als Zeitungskostüm

- **Häufigkeit:** Haarlinien selbst sind sehr häufig, als KI-Merkmal aber schwach. Alle 15 Modelle der Design Creativity Bench setzen auf 19 bis 20 von 20 Seiten fünf oder mehr 1-px-Linien. In der Galerie stehen Haarlinien auf 61 % der Spitzen- und 52 % der schwachen Seiten. Als Merkmal zählt nur das Kostüm.
- **Claude:** ja, Anthropic nennt das Broadsheet als dritten Cluster.
- **Beschreibung:** Haarlinien zwischen allen Einträgen, Radius null, dichte Zeitungsspalten und ein Zeitungskopf auf Seiten, die keine Publikation sind.
- **Warum es nach KI aussieht:** Anthropic: „broadsheet hairline rules with dense columns“. avoid-ai-design: „broadsheet cosplay“ (SD3).
- **Gegenmittel:** Linien nur dort, wo sie etwas trennen, das Abstand nicht trennen kann.
- **Quellen:** [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [taste-skill](https://github.com/Leonxlnx/taste-skill), [Design Creativity Bench](https://github.com/kombai-io/design-creativity-bench)

#### 55. Hängendes Randlabel („Specimen“-Muster)

- **Häufigkeit:** gelegentlich. Nur eine Quelle, die aber sehr deutlich.
- **Claude:** allgemein.
- **Beschreibung:** Am linken Rand hängt eine Marke, Nummer oder Jahreszahl, rechts daneben steht der Inhalt. Oft zusammen mit riesiger Serife, asymmetrischen Spannweiten und Haarlinien.
- **Warum es nach KI aussieht:** Hallmark sperrt es in Prüfung 54 als „the single most reliable templated-editorial tell“ und nennt den Fall „specimen fall-through“. impeccable rechnet es zum Broadsheet-Editorial.
- **Gegenmittel:** Nur dort, wo der Inhalt wirklich ein Register oder Werkverzeichnis ist. Das ist echte Buchkonvention. Nicht als Abschnittskopf.
- **Quellen:** [Hallmark, anti-patterns.md](https://github.com/Nutlope/hallmark/blob/main/skills/hallmark/references/anti-patterns.md), [impeccable](https://github.com/pbakaus/impeccable). Die Beleglage ist dünn.

### 5.4 Komponenten und Rahmen

#### 3. Mittelpunkt-Metazeilen und Labels „WORT — Fragment“

- **Häufigkeit:** sehr häufig bei Claude. Opus 5.5 setzt sie auf 20 von 20 Seiten, im Median 22,5 Mittelpunkte je Seite. Ein Vergleichsmodell von OpenAI kommt auf 8,5, eines von Google auf 0.
- **Claude:** ja, stark.
- **Beschreibung:** Kurze Zeilen aus Wörtern, getrennt durch Mittelpunkte, etwa „Roman · 2024 · 320 Seiten“ oder „Berlin · Mallorca“. Verwandt sind Labels der Form „WORT — Fragment“ und Versionsstempel.
- **Warum es nach KI aussieht:** Anthropic zählt sie zum „template chrome“, an dem man generierte Seiten erkennt. avoid-ai-design führt „A · B · C meta strings“ (SD4), taste-skill rechnet sie zur „agency micro-meta“. Hallmark liefert solche Zeilen sogar als Kopf („Maple Street Bread · Lisbon · est. 2026 · n.º 47“).
- **Gegenmittel:** Ganze Sätze oder Buchkonventionen mit Komma und Punkt: „Roman, 2024.“ Was wirklich Daten sind, kommt in eine echte Liste.
- **Quellen:** [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [avoid-ai-design, SD4](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [taste-skill](https://github.com/Leonxlnx/taste-skill), [Hallmark](https://github.com/Nutlope/hallmark), [Design Creativity Bench](https://github.com/kombai-io/design-creativity-bench)

#### 4. Pillenknöpfe

- **Häufigkeit:** sehr häufig. Opus 5.5 setzt sie auf 18 von 20 Seiten, ein Vergleichsmodell von OpenAI auf einer. In der Galerie stehen weich gerundete Formen auf 59 % der schwachen und 23 % der Spitzenseiten.
- **Claude:** ja, Anthropic nennt Pillen für Opus 5.5 ausdrücklich.
- **Beschreibung:** Knöpfe, Filter, Schlagwörter und Eingabefelder mit voll gerundeten Enden (`border-radius: 999px`, `rounded-full`).
- **Warum es nach KI aussieht:** Es ist der Werkszustand vieler Komponentenbibliotheken. Anthropic führt „pill buttons“ unter den Rückfallstilen von Opus 5.5. Reddit-Beschwerden nennen sie regelmäßig.
- **Gegenmittel:** Links sind Wörter. Knöpfe gibt es nur, wo etwas abgeschickt wird, rechteckig mit kleinem oder keinem Radius und einem konkreten Verb. Filter als Wörter im Satz.
- **Quellen:** [Anthropic, Prompting Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5), [taste-skill](https://github.com/Leonxlnx/taste-skill), [Johnson, Reddit-Auswertung](https://github.com/JCarterJohnson/vibecoded-design-tells), [slop-detect](https://github.com/ravidsrk/slop-detect), [Laith, ux-skill](https://github.com/Laith0003/ux-skill/wiki/How-to-detect-AI-slop-in-your-design), [Design Creativity Bench](https://github.com/kombai-io/design-creativity-bench)

#### 22. Icon im gerundeten Quadrat

- **Häufigkeit:** allgemein sehr häufig.
- **Claude:** allgemein. In Claude-Artefakten gehört Lucide zur Standardumgebung.
- **Beschreibung:** Ein Icon aus dem Lucide-Standardset (Sparkles, Zap, Shield, ArrowRight) in einem gerundeten, getönten Quadrat, oft über jeder Karte.
- **Warum es nach KI aussieht:** Takuma Kakehi fasst die Kette zusammen: „Inter for type, ShadCN for components, Lucide for icons“. avoid-ai-design, impeccable, Hallmark, febbhav und awesome-claude-design führen es.
- **Gegenmittel:** Keine Icons, wo ein Wort reicht. Wenn Zeichen nötig sind, dann eigene, aus dem Thema gezeichnet, etwa Kartenzeichen oder Korrekturzeichen.
- **Quellen:** [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [impeccable](https://github.com/pbakaus/impeccable), [Hallmark](https://github.com/Nutlope/hallmark), [febbhav](https://github.com/febbhav/signs-of-ai-design), [Kakehi, UX Collective°](https://uxdesign.cc/ai-design-isnt-ugly-it-s-fluent-and-that-s-the-problem-131b2f4eb78c), [Simon Willison zur Artefakt-Umgebung°](https://simonwillison.net/2024/Oct/23/claude-artifact-runner/)

#### 26. Mikro-Metadaten als Schmuck

- **Häufigkeit:** häufig bei Portfolio-, Reise- und Agenturthemen. Das ist eine Einschätzung, gezählt hat es niemand.
- **Claude:** Claude-Rat. Anthropics canvas-design-Skill verlangt „systematic reference markers that suggest this could be a diagram from an imaginary discipline“.
- **Beschreibung:** Koordinaten („52° 31′ N, 13° 24′ O“), Ortszeit, Wetter, „est. 2014“, Inventarnummern, Signaturen, Versionsstempel, „Scroll“-Hinweis. Meist klein, grau, kursiv oder in Mono.
- **Warum es nach KI aussieht:** taste-skill verbietet „Agency micro-meta: local time, coordinates, weather, version stamps, ‚©2026 — Scroll‘, middle-dot strings“. Es ist eine Galeriemode, die Generatoren zuerst kopieren, und sie teilt nichts mit. Hallmark liefert die Kulisse als Rezept („Almanac“).
- **Gegenmittel:** Ortsangaben als Text („in Kaohsiung, 2018“). Koordinaten nur dort, wo man mit ihnen etwas tut, etwa an einer echten Karte für den gerade gezeigten Ort.
- **Quellen:** [taste-skill, tells.md](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/references/tells.md), [Hallmark](https://github.com/Nutlope/hallmark), [Anthropic, canvas-design](https://github.com/anthropics/skills/blob/main/skills/canvas-design/SKILL.md), [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)

#### 27. Prunkstück-Widget

- **Häufigkeit:** häufig. Das ist eine Einschätzung aus den Vorgaben der Skills, gezählt hat es niemand.
- **Claude:** Claude-Rat. Der Skill vom Juni 2026 verlangte „Signature: the single unique element this page will be remembered by“ und „take one real aesthetic risk“. Die aktuelle Fassung sagt „Let one element be the memorable thing“.
- **Beschreibung:** Ein großes interaktives Element (Globus, 3D-Objekt, Simulation), um das die Seite gebaut ist. Häufig ein Fertigbaustein: Magic UI „Globe“ ist eine sich selbst drehende WebGL-Kugel auf Basis von cobe mit orangen Markern. Für den „spinning globe in hero or about pages“ gibt es einen eigenen Skill, bei Framer fertige Partikel-Globen.
- **Warum es nach KI aussieht:** Das Prunkstück ist eine Anweisung an das Modell geworden, und die Fertigbausteine sehen überall gleich aus.
- **Gegenmittel:** Das Element braucht eine Aufgabe, die nur dieser Inhalt stellt, und es muss eigen gebaut sein: echte Projektion, echte Daten, Bedienung über Text. Keine Dauerrotation, kein Glanz, kein Leuchten.
- **Quellen:** [Verlauf des frontend-design-Skills](https://github.com/anthropics/skills/commits/main/skills/frontend-design/SKILL.md), [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [Magic UI Globe](https://magicui.design/docs/components/globe), [avoid-ai-design, K10](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [cobe-Skill°](https://www.skills.sh/mengto/skills/cobejs), [Framer°](https://www.framer.com/marketplace/components/particle-globe-3d/)

#### 41. Farbiger Seitenstreifen an Karten

- **Häufigkeit:** häufig. 13 % der Seiten laut avoid-ai-design. Krebs nennt ihn „almost as reliable … as em-dashes are for text“.
- **Claude:** allgemein. Die Gestaltungsanweisung an Claude nennt „accent bar/rail on rounded cards“.
- **Beschreibung:** Karten oder Zitate mit einer farbigen linken Kante (`border-left: 3px solid`).
- **Warum es nach KI aussieht:** Es ist die schnellste Art, einer Karte „Akzent“ zu geben, ohne über Inhalt zu entscheiden.
- **Gegenmittel:** Gliederung über Einzug und Abstand. Zitate im Buchsatz eingerückt, ohne Balken.
- **Quellen:** [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [impeccable](https://github.com/pbakaus/impeccable), [Hallmark](https://github.com/Nutlope/hallmark), [awesome-claude-design](https://github.com/rohitg00/awesome-claude-design), [Krebs°](https://www.adriankrebs.ch/blog/design-slop/)

#### 47. Glas und backdrop-blur

- **Häufigkeit:** häufig in den Katalogen (17 % nach avoid-ai-design), in echten Beschwerden aber selten (Reddit: 0,2 %). Gilt als überbewertet.
- **Claude:** allgemein.
- **Beschreibung:** Halbtransparente Flächen mit `backdrop-filter: blur`, oft über Verläufen.
- **Warum es nach KI aussieht:** Es ist ein Reflex für „modern“, ohne Bezug zum Inhalt.
- **Gegenmittel:** Deckende Flächen. Was über dem Inhalt liegt, ist klar abgesetzt.
- **Quellen:** [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Johnson, Reddit-Auswertung](https://github.com/JCarterJohnson/vibecoded-design-tells), [taste-skill](https://github.com/Leonxlnx/taste-skill), [impeccable](https://github.com/pbakaus/impeccable)

#### 52. Nachgebaute Papiergegenstände

- **Häufigkeit:** gelegentlich, steigend. Das ist eine Einschätzung aus der Verbreitung der Skills, gezählt hat es niemand.
- **Claude:** Claude-Rat. Anthropics canvas-design-Skill verlangt „museum or magazine quality“ und „paper grain, ink bleeds“. taste-skill empfiehlt „the page is an artefact from the subject’s world“ und liefert Zettel, Quittungen und Karten als Bausteine.
- **Beschreibung:** Inhalte als Karteikarte, Tafel, Zettel, Beleg oder Präparat inszeniert, mit Kartonrand, Signatur und Inventarnummer, gezeichnet in CSS. Regale aus CSS-Brettern, Buchrücken und Lesebändchen.
- **Warum es nach KI aussieht:** Hallmark arbeitet mit „Catalogue“- und „Almanac“-Requisiten. Elizabeth Goodspeed schrieb im Januar 2026, nachgemachte „realness“ am Computer bringe nichts Neues. Trendberichte für 2026 nennen Papiertexturen und handgezeichnete Pfeile schon als Mode.
- **Gegenmittel:** Das echte Artefakt (Foto oder Scan der eigenen Karteikarten, des Regals, einer Manuskriptseite) oder eine rein typografische Form. Wenn nachgebaut, dann nach einem benannten Vorbild mit echten Maßen und nur an einer Stelle. Datenspuren wie die Rückenbreite aus der Seitenzahl sind dabei kein Kitsch.
- **Quellen:** [Anthropic, canvas-design](https://github.com/anthropics/skills/blob/main/skills/canvas-design/SKILL.md), [taste-skill](https://github.com/Leonxlnx/taste-skill), [Hallmark](https://github.com/Nutlope/hallmark), [Goodspeed, It’s Nice That°](https://www.itsnicethat.com/articles/elizabeth-goodspeed-on-analogue-creative-industry-290126), [Creative Bloq°](https://creativebloq.com/design/graphic-design/texture-warmth-and-tactile-rebellion-the-big-graphic-design-trends-for-2026)

#### 54. Laufband oder Ticker

- **Häufigkeit:** gelegentlich. In der Presse für Claude-Design-Ausgaben 2026 belegt, in den Stichproben nicht gezählt.
- **Claude:** ja (Claude Design).
- **Beschreibung:** Eine durchlaufende Zeile mit Schlagwörtern oder „Neuigkeiten“, oft durch Mittelpunkte getrennt.
- **Warum es nach KI aussieht:** Chayka: „pointless news tickers“. impeccable hat eine eigene Regel „marquee“. Hallmark bietet den Ticker als Fußbaustein an („STUDIO · 2026 · STUDIO ·“).
- **Gegenmittel:** Keine Dauerbewegung ohne Inhalt. Neues steht als datierte Zeile im Satz.
- **Quellen:** [Chayka°](https://kylechayka.substack.com/p/the-generic-style-of-ai-web-design), [impeccable](https://github.com/pbakaus/impeccable), [Hallmark](https://github.com/Nutlope/hallmark), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md)

#### 65. Blinkender Statuspunkt

- **Häufigkeit:** gelegentlich.
- **Claude:** allgemein.
- **Beschreibung:** Ein pulsierender grüner Punkt neben „live“ oder „verfügbar“.
- **Warum es nach KI aussieht:** Ein Zustand wird vorgespielt, den niemand pflegt.
- **Gegenmittel:** Verfügbarkeit als Satz mit Datum.
- **Quellen:** [awesome-claude-design](https://github.com/rohitg00/awesome-claude-design), [taste-skill](https://github.com/Leonxlnx/taste-skill)

### 5.5 Bewegung

#### 6. Einblenden beim Scrollen auf jedem Abschnitt

- **Häufigkeit:** sehr häufig. Opus 5.5 hat auf 11 von 20 Seiten Einblendanimationen, die Vergleichsmodelle auf 9 bis 12.
- **Claude:** Claude-Rat. Anthropic empfahl 2025 noch „scroll-triggering“ und „staggered reveals“.
- **Beschreibung:** Abschnitte gleiten beim Scrollen von unten herein und blenden dabei auf, alle mit derselben Dauer und Kurve.
- **Warum es nach KI aussieht:** Anthropic schreibt seit September 2026: „fade-and-slide-up entrances on each section … read as AI-generated“. unclaudey nennt das Fade-up „the motion equivalent of the cream-and-terracotta palette“. Der Effekt verzögert das Lesen und zeigt nichts, was statisch nicht schon da wäre.
- **Gegenmittel:** Text ist beim Laden vollständig da, auch ohne Skript. Bewegung nur als Antwort auf eine Handlung oder an einer einzigen Stelle, an der sie etwas zeigt, das statisch nicht ginge. David Bushell: „Death to Scroll Fade!“
- **Quellen:** [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [unclaudey](https://github.com/ramialdine/unclaudey), [avoid-ai-design, M1](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Hallmark](https://github.com/Nutlope/hallmark), [Claude Cookbook 2025 (Ursprung)](https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb), [Bushell, Frontend Masters°](https://frontendmasters.com/blog/death-to-scroll-fade/)

#### 25. Inszenierter Ladeauftritt

- **Häufigkeit:** häufig bei Claude, seit der Skill von 2025 Standard ist.
- **Claude:** Claude-Rat. Cookbook und Skill 2025 empfahlen wörtlich „one well-orchestrated page load with staggered reveals (animation-delay)“.
- **Beschreibung:** Beim Laden erscheinen Wörter oder Blöcke nacheinander, mit Verzögerung, manchmal mit Unschärfe. Oft ist es eine einzige große Zeile in einer Display-Schrift.
- **Warum es nach KI aussieht:** Es ist das genaue Rezept aus Anthropics früherem Rat. Der aktuelle Skill spricht noch von einem „single orchestrated moment“, warnt aber vor Fade-ups.
- **Gegenmittel:** Text steht beim Laden da. Die eine erlaubte Bewegung gehört zum Inhalt, etwa eine Karte, die einen Lebensweg nachzeichnet, und nicht zum Auftritt.
- **Quellen:** [Claude Cookbook 2025](https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb), [Anthropic-Blog, November 2025](https://claude.com/blog/improving-frontend-design-through-skills), [Verlauf des frontend-design-Skills](https://github.com/anthropics/skills/commits/main/skills/frontend-design/SKILL.md), [taste-skill](https://github.com/Leonxlnx/taste-skill)

#### 39. Hover-Lift auf jeder Karte

- **Häufigkeit:** häufig.
- **Claude:** allgemein.
- **Beschreibung:** Karten und Elemente heben sich bei Hover um einige Pixel, wachsen um 5 % (`scale-105`) oder ändern über `transition: all` alles zugleich.
- **Warum es nach KI aussieht:** Es ist das Tailwind-Muster `hover:-translate-y-1`. Anthropic nennt „hover on every card“.
- **Gegenmittel:** Ein Zustand ohne Bewegung (Ton, Unterstreichung) oder eine physikalisch begründete Bewegung an einer einzigen Stelle. Ein Buch zieht man nach vorn aus dem Regal, nicht nach oben.
- **Quellen:** [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Hallmark](https://github.com/Nutlope/hallmark), [Johnson, Reddit-Auswertung](https://github.com/JCarterJohnson/vibecoded-design-tells)

#### 45. Federnde Easings

- **Häufigkeit:** häufig.
- **Claude:** allgemein.
- **Beschreibung:** Bewegungen mit Überschwingen (Spring, Bounce, `cubic-bezier` mit Werten über 1).
- **Warum es nach KI aussieht:** Verspieltheit als Standard, auch wo der Inhalt ernst ist.
- **Gegenmittel:** Kurze, harte Übergänge oder ease-out ohne Überschwingen.
- **Quellen:** [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [impeccable](https://github.com/pbakaus/impeccable), [Hallmark](https://github.com/Nutlope/hallmark), [febbhav](https://github.com/febbhav/signs-of-ai-design)

#### 56. An das Scrollen gekoppelte Effekte und Dauerbewegung

- **Häufigkeit:** gelegentlich, steigend. Skills, die „Award-Niveau“ versprechen, setzen auf Scroll-Inszenierung.
- **Claude:** allgemein.
- **Beschreibung:** Zustände, die an die Scrollposition gebunden sind (Parallax, Fortschrittsbalken, Leselinien, Scroll-Jacking), und Endlosschleifen oder Dauerrotation ohne Bedeutung.
- **Warum es nach KI aussieht:** In der Reddit-Auswertung tauchen Beschwerden über „scrolljacking“ auf, taste-skill und Hallmark führen Dauerbewegung. Award-Galerien belohnen den Effekt, Praktiker kritisieren ihn dort.
- **Gegenmittel:** Interaktion auf Klick oder nach Wahl des Lesers. Was der Text sagt, hängt nie an der Scrollgeschwindigkeit. Animationen außerhalb des Sichtbereichs anhalten. Ein Effekt, der Inhalt abbildet und den Scroll nicht entführt, ist vertretbar.
- **Quellen:** [Johnson, Reddit-Auswertung](https://github.com/JCarterJohnson/vibecoded-design-tells), [taste-skill](https://github.com/Leonxlnx/taste-skill), [Hallmark](https://github.com/Nutlope/hallmark), [mcpmarket, award-caliber-Skill°](https://mcpmarket.com/tools/skills/award-caliber-websites), [HN-Diskussion°](https://hn.svelte.dev/item/44221430)

### 5.6 Bilder und Icons

#### 7. Gezeichnet statt fotografiert

- **Häufigkeit:** sehr häufig. Im A/B-Vergleich von unclaudey hat Claude mit dem frontend-design-Skill auf drei Seiten kein einziges Foto verwendet, „even for a climbing gym and a ceramics studio“. In der Benchmark-Stichprobe hat 1 von 20 Opus-Seiten ein `<img>`, im Median aber 29,5 SVG-Elemente (die Benchmark-Vorgaben drücken diese Zahl). Menschliche Galerie: im Median 24 Bilder je Seite, bei Spitzenseiten 37, bei schwachen 5.
- **Claude:** ja. Ein Modell kann Bilder weder sehen noch prüfen und baut deshalb aus Code.
- **Beschreibung:** Wo ein Foto, ein Scan oder ein Umschlag hingehört, steht eine Fläche, ein Icon, eine CSS-Box oder eine SVG-Zeichnung. Fotografen und Gestalter werden nirgends genannt.
- **Warum es nach KI aussieht:** taste-skill: „Text or a CSS box where a picture belongs“. impeccable: „author the assets; never substitute chrome“. Generierte Seiten haben keine Urheber, deshalb nennt niemand einen.
- **Gegenmittel:** Eigene Fotos und Scans mit durchgehender Bildsprache, klein, gern schwarzweiß. Teju Cole und Craig Mod arbeiten mit eigenen Bildern statt eines Hero-Bilds. Code-Zeichnung nur, wo Daten Geometrie tragen (Karte, Diagramm). Fotografen im Impressum oder Kolophon nennen (§ 13 UrhG).
- **Quellen:** [unclaudey](https://github.com/ramialdine/unclaudey), [taste-skill, research.md](https://github.com/Leonxlnx/taste-skill), [impeccable](https://github.com/pbakaus/impeccable), [Design Creativity Bench](https://github.com/kombai-io/design-creativity-bench), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md)

#### 20. Emoji als Icons

- **Häufigkeit:** allgemein sehr häufig. In der Galerie auf 26 % der schwachen und 10 % der Spitzenseiten. Laut Washington Post kam ✅ in ChatGPT-Antworten elfmal so oft vor wie bei Menschen. Bei Claude selten (Opus 4.8: „sparing emoji“).
- **Claude:** selten.
- **Beschreibung:** Emoji als Abschnittsmarke, Aufzählungszeichen oder Icon, ✨ für „neu“.
- **Warum es nach KI aussieht:** Es ist ein Chat-Reflex, der in die Gestaltung übernommen wird.
- **Gegenmittel:** Keine Zeichen als Schmuck. Gliederung über Überschriften und Abstand.
- **Quellen:** [taste-skill](https://github.com/Leonxlnx/taste-skill), [Johnson, Reddit-Auswertung](https://github.com/JCarterJohnson/vibecoded-design-tells), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Anthropic, Prompting Opus 4.8](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-4-8), [Washington Post im Boston Globe°](https://www.bostonglobe.com/2025/11/13/business/chatgpt-writing-style-clues/)

#### 44. Platzhalter, Stockfotos, erfundene Stimmen

- **Häufigkeit:** häufig.
- **Claude:** allgemein.
- **Beschreibung:** Platzhalter-Menschen, Logo-Leisten, erfundene Zitate und Bewertungen, Unsplash-Bilder.
- **Warum es nach KI aussieht:** Das Modell füllt die Vorlage, auch wenn es keinen Inhalt gibt. Die bekannten Gratisbilder sind tausendfach verbraucht.
- **Gegenmittel:** Nur echte Stimmen mit Quelle (Rezension mit Medium und Datum). Eigene Bilder.
- **Quellen:** [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Hallmark](https://github.com/Nutlope/hallmark), [febbhav](https://github.com/febbhav/signs-of-ai-design), [taste-skill](https://github.com/Leonxlnx/taste-skill)

#### 57. Körnung und Papiertextur als Anti-KI-Reflex

- **Häufigkeit:** gelegentlich, steigend. Opus 5.5 zeigt Korn auf 3 von 20 Seiten, ein Qwen-Modell auf 13.
- **Claude:** Claude-Rat. Der Skill von 2025 nannte „noise textures“ und „grain overlays“.
- **Beschreibung:** Rauschen per SVG `feTurbulence`, Papiermaserung, handgezeichnete Pfeile und Markerstriche als Beweis von Menschlichkeit.
- **Warum es nach KI aussieht:** Hallmark empfiehlt Korn „< 0.1 opacity … looks like paper“, impeccable stuft es als Reflex der GPT- und Codex-Familie ein. Creative Bloq nennt die „tactile rebellion“ als Trend 2026. avoid-ai-design spricht von einer „dritten Ordnung“ der Anti-KI-Reflexe.
- **Gegenmittel:** Nicht über simulierte Unvollkommenheit „menschlich“ machen. Eigenart kommt aus Inhalt und Entscheidungen.
- **Quellen:** [Anthropic-Blog, November 2025](https://claude.com/blog/improving-frontend-design-through-skills), [Hallmark](https://github.com/Nutlope/hallmark), [impeccable](https://github.com/pbakaus/impeccable), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Creative Bloq°](https://creativebloq.com/design/graphic-design/texture-warmth-and-tactile-rebellion-the-big-graphic-design-trends-for-2026)

#### 64. Verlaufskugeln, Blobs, Aurora

- **Häufigkeit:** gelegentlich. Die Reddit-Auswertung verwarf „Aurora“ als Artefakt der Stichwortsuche.
- **Claude:** Claude-Rat. Das Cookbook empfahl 2025 „atmosphere“-Hintergründe.
- **Beschreibung:** Weiche Farbkugeln, 3D-Blobs und Aurora-Verläufe im Hintergrund.
- **Warum es nach KI aussieht:** Die Fläche soll Stimmung erzeugen, ohne etwas zu zeigen.
- **Gegenmittel:** Ein Grund als Fläche ohne Effekt, oder ein echtes Bild.
- **Quellen:** [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Hallmark](https://github.com/Nutlope/hallmark), [febbhav](https://github.com/febbhav/signs-of-ai-design), [slop-detect](https://github.com/ravidsrk/slop-detect), [Claude Cookbook 2025](https://github.com/anthropics/claude-cookbooks/blob/main/coding/prompting_for_frontend_aesthetics.ipynb)

### 5.7 Text und Mikrotexte

#### 12. Pfeil an Links und generische Handlungsaufforderungen

- **Häufigkeit:** sehr häufig. Opus 5.5 setzt Pfeile auf 14 von 20 Seiten. Floskeln wie „Mehr erfahren“ sind allgemein sehr häufig, in Claudes literarischem Register seltener.
- **Claude:** ja, beim Pfeil.
- **Beschreibung:** „→“ an Links und Knöpfen, Linktexte wie „Mehr erfahren“, „Jetzt entdecken“, „Kontakt aufnehmen“.
- **Warum es nach KI aussieht:** Anthropic führt den Pfeil im Template-Chrom und verlangt „A CTA says exactly what happens“. avoid-ai-design (CP3, CP6), febbhav und Laith führen beides. Lighthouse und GOV.UK markieren „learn more“ und „click here“ als nichtssagend.
- **Gegenmittel:** Der Link nennt sein Ziel („Bibliothek“, die E-Mail-Adresse selbst). Kein Pfeilzeichen.
- **Quellen:** [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [febbhav](https://github.com/febbhav/signs-of-ai-design), [Laith, ux-skill](https://github.com/Laith0003/ux-skill/wiki/How-to-detect-AI-slop-in-your-design), [Lighthouse, Linktext](https://developer.chrome.com/docs/lighthouse/seo/link-text), [GOV.UK, Links°](https://www.gov.uk/guidance/content-design/links/), [Design Creativity Bench](https://github.com/kombai-io/design-creativity-bench)

#### 16. Dreierreihen

- **Häufigkeit:** sehr häufig.
- **Claude:** allgemein.
- **Beschreibung:** „X, Y und Z“ als Reflex, oft mit gleichem Wortanfang („zwei Männer, zwei Kontinente, zwei Leben“) oder als Slogan nach einem Doppelpunkt („Drei Romane über drei Geburten: …“).
- **Warum es nach KI aussieht:** Wikipedias Leitfaden, humanizer (§ 6) und avoid-ai-design (CP4) nennen die Dreierreihe. Drei ist der Standardrhythmus der Modelle, gleich wie viele Teile der Inhalt hat.
- **Gegenmittel:** Zählen, was der Inhalt hat. Echte Dreiheiten (drei Bände, drei Figuren) bleiben. Sonst zwei, vier oder fünf Glieder, und die Satzform wechseln.
- **Quellen:** [humanizer](https://github.com/blader/humanizer), [avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing), [avoid-ai-design, CP4](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Wikipedia, Signs of AI writing°](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), [Beutler Ink°](https://www.beutlerink.com/blog/how-to-spot-ai-writing)

#### 17. „Nicht X, sondern Y“

- **Häufigkeit:** sehr häufig, vor allem in Hero-, Pitch- und Über-mich-Texten. Laut Washington Post standen Varianten von „not just X, but Y“ im Juli 2025 in 6 % der ChatGPT-Antworten. Barron’s zählte die Wendung in Berichten der Fortune 500: 50 im Jahr 2023, über 200 im Jahr 2025.
- **Claude:** allgemein.
- **Beschreibung:** „Nicht ein einzelner Skandal, sondern …“, „nicht nur …, sondern auch …“, oder auf zwei Sätze verteilt: „Alle suchen einen Mann. Dabei war er nie eine Person.“
- **Warum es nach KI aussieht:** The Atlantic nennt den „negative parallelism“ das bekannteste und hartnäckigste KI-Merkmal. Die negative Hälfte widerlegt eine Behauptung, die niemand aufgestellt hat (humanizer § 1). t3n nennt für das Deutsche „nicht nur, sondern auch“.
- **Gegenmittel:** Die positive Aussage direkt machen. Den Gegensatz nur behalten, wenn er eine echte Erwartung des Lesers korrigiert.
- **Quellen:** [The Atlantic, Zusammenfassung°](https://aiweekly.co/alerts/atlantic-ais-its-not-x-its-y-tic-proves-hardest-to-shake), [Washington Post im Boston Globe°](https://www.bostonglobe.com/2025/11/13/business/chatgpt-writing-style-clues/), [TechCrunch zu Barron’s°](https://techcrunch.com/2026/04/20/ai-writing-its-not-just-this-its-that-barrons/), [Fast Company°](https://www.fastcompany.com/91469729/structure-sentence-dead-giveaway-that-ai-wrote-it), [humanizer](https://github.com/blader/humanizer), [tropes.fyi](https://tropes.fyi/tropes/negative-parallelism), [t3n°](https://t3n.de/news/ki-texte-erkennen-phrasen-chatgpt-claude-1766310/)

#### 21. Leere Versprechen, Werbewörter, Taglines

- **Häufigkeit:** allgemein sehr häufig, in Claudes literarischem Register selten.
- **Claude:** selten.
- **Beschreibung:** Leere Versprechen in Überschriften („Geschichten, die bleiben“), Rollen-Taglines unter dem Namen („Autor und Reisender“), Wörter wie „nahtlos“, „eintauchen“, „vielfältige Möglichkeiten“, „auf das nächste Level“. Als Claude-typisch gelten laut Community-Berichten „load-bearing“, „genuinely“, „quietly“, deutsch etwa „tragend“, „leise“, „still“. Diese Wortliste ist anekdotisch.
- **Warum es nach KI aussieht:** Kobak u. a. (Science Advances 2025) schließen aus überzähligem Wortschatz, dass mindestens 13,5 % der PubMed-Abstracts von 2024 mit einem Sprachmodell bearbeitet wurden. t3n und GIGA (173 Floskeln) sammeln deutsche Beispiele. Anthropics Skill verlangt, dass jedes Textelement genau eine Aufgabe hat.
- **Gegenmittel:** Konkrete Namen, Zahlen und Orte. Der Beruf steht im ersten Satz, eine Tagline gibt es nicht. Verlagskonvention: „geboren in …, lebt in …“.
- **Quellen:** [Kobak u. a., arXiv](https://arxiv.org/abs/2406.07016), [humanizer](https://github.com/blader/humanizer), [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [t3n°](https://t3n.de/news/chatgpt-einfluss-sprache-delve-effekt-1693866/), [GIGA°](https://www.giga.de/artikel/mit-diesen-floskeln-lassen-sich-chatgpt-ki-texte-erkennen/), [explainx, anekdotisch°](https://explainx.ai/blog/claude-opus-5-load-bearing-claudisms-writing-tells-2026)

#### 28. Effekt-Überschriften und inszenierte Rubriknamen

- **Häufigkeit:** häufig in Claudes editorialer Ausgabe. taste-skill prüft es als Merkmal der dritten Welle, gezählt hat es niemand.
- **Claude:** ja.
- **Beschreibung:** Überschriften, die auf Wirkung zielen, statt den Inhalt zu nennen („gebaut wie ein protokoll“, „die frage hinter dem roman“), und inszenierte Rubriknamen wie „Field notes“, „On our desks“, „Quietly trusted by“. Deutsche Gegenstücke sind „Auf dem Nachttisch“, „Kinderzimmer“, „Karteikarte“.
- **Warum es nach KI aussieht:** humanizer (§ 20): Eine Überschrift soll „name what the section holds“. Anthropic warnt vor „unnecessary typographic labels above content“.
- **Gegenmittel:** Ein Substantiv, das den Inhalt benennt („Aufbau“, „Figuren“), oder gar keine Überschrift. Rubriken nur mit Wörtern, die der Autor selbst benutzt.
- **Quellen:** [humanizer](https://github.com/blader/humanizer), [taste-skill, tells.md](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/references/tells.md), [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)

#### 32. Doppelpunkt-Pointe und Titelmuster „Name: Erklärung“

- **Häufigkeit:** häufig, in Meta-Beschreibungen und Kartentiteln sehr häufig.
- **Claude:** allgemein.
- **Beschreibung:** „Die oberste Regel: Wer enttarnt wird, verschwindet.“ Titel und Meta-Beschreibungen nach dem Muster „Länder: wohin …“.
- **Warum es nach KI aussieht:** Die Gestaltungsanweisung an Claude warnt ausdrücklich vor „colon-then-reveal“. Blake Stockton beschreibt die Häufung („Colons, Colons Everywhere“), Prüf-Skills führen „colon reveals“.
- **Gegenmittel:** Ein normaler Aussagesatz. Ein Doppelpunkt nur vor Aufzählung, Zitat oder Adresse.
- **Quellen:** Gestaltungsanweisung an Claude (Systemtext, ohne öffentliche URL), [Stockton°](https://www.blakestockton.com/colons-everywhere/), [tropes.fyi](https://tropes.fyi), [humanizer](https://github.com/blader/humanizer)

#### 33. Sätze über die Seite und doppelte Information

- **Häufigkeit:** häufig bei Claude-Builds mit eigenen Interaktionen.
- **Claude:** ja. Das ist eine Selbstbeobachtung, die die Git-Historie dieses Projekts stützt.
- **Beschreibung:** Legenden für das, was man ohnehin sieht („Oben steht …, darunter …“), Bedienhinweise („halten und scrollen“, „Zu jedem Rücken gibt es eine Karteikarte“), und Etikett, Unterzeile und Satz, die dasselbe sagen.
- **Warum es nach KI aussieht:** humanizer (§ 25) nennt „a legend, layout, or order the reader can already see“. Anthropic: „Words appear in a design for one reason … Let each written element do exactly one job.“ Das Modell füllt jedes Feld einer Komponente, auch wenn es nichts Neues zu sagen gibt.
- **Gegenmittel:** Jede Information einmal pro Bildschirm. Leere Felder bleiben leer. Eine Zeichenerklärung nur für Kodierungen, die man nicht erraten kann, als gezeichnetes Zeichen mit einem Wort wie auf einer Karte. Bedienhinweise nur für unsichtbare Gesten.
- **Quellen:** [humanizer](https://github.com/blader/humanizer), [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [taste-skill](https://github.com/Leonxlnx/taste-skill)

#### 34. Gleich gebaute Sätze und Pointe am Schluss

- **Häufigkeit:** häufig, besonders in Teasern und Hero-Zeilen. Bei Opus 5.5 ist der Gedankenstrich in UI-Texten kaum noch messbar, Kadenz und Dreierreihen bleiben aber.
- **Claude:** allgemein.
- **Beschreibung:** Mehrere gleich gebaute Teilsätze in Folge, Abstufungen wie „die meisten …, viele …, einige …, wenige …“, ein Stakkato-Schluss („Ihr Verfasser hat nie existiert. Verschwinden musste er trotzdem.“) oder ein Schlusssatz über den Text selbst („Davon erzählt dieser Roman.“).
- **Warum es nach KI aussieht:** GPTZero beschreibt das als geringe „burstiness“. avoid-ai-writing führt „Rhythm and uniformity“ und „setup/reversal punchlines“, humanizer die Schlussfragmente (§ 2) und gleichen Satzanfänge (§ 7). Münüklü beschreibt die Texte von GPT-5.2, Gemini 3 und Claude Sonnet 4.5 als „Kohärenz ohne Reibung“.
- **Gegenmittel:** Sätze nach dem Inhalt bauen. Einen Schlusssatz streichen, wenn er nur wiederholt. Keine künstliche Holprigkeit einbauen.
- **Quellen:** [humanizer](https://github.com/blader/humanizer), [avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing), [GPTZero°](https://gptzero.me/news/perplexity-and-burstiness-what-is-it/), [Münüklü, Peter Lang°](https://www.peterlang.com/document/1749360)

#### 35. Wiederholte Formeln über die Seiten

- **Häufigkeit:** häufig.
- **Claude:** allgemein.
- **Beschreibung:** Dieselbe Wendung kehrt auf mehreren Seiten wieder, etwa „in Arbeit“, „Auf dem Globus: …“, „Von X bis Y“ oder w-Sätze als Etikett („was ich schreibe“, „wo ich gelebt habe“).
- **Warum es nach KI aussieht:** febbhav nennt Gleichförmigkeit über unabhängige Stellen „the meta-tell in every category“. Wer zehn Seiten selbst schreibt, erinnert sich an das Geschriebene und variiert.
- **Gegenmittel:** Jede Formel höchstens einmal auf der ganzen Website.
- **Quellen:** [febbhav](https://github.com/febbhav/signs-of-ai-design), [humanizer](https://github.com/blader/humanizer)

#### 36. Gedankenstrich als Allzweckverbinder

- **Häufigkeit:** häufig, rückläufig. Laut Washington Post stand 2024 in weniger als jeder zehnten ChatGPT-Antwort ein Gedankenstrich, im Sommer 2025 in mehr als der Hälfte. Seit Ende 2025 geht das zurück, OpenAI hat mit GPT-5.1 eine Abschaltung auf Anweisung eingebaut. Opus 5.5 setzt in sichtbarem UI-Text im Median keinen Geviertstrich, ein anderes Claude-Modell (Fable 5.1) 6,5 je Seite.
- **Claude:** selten bei Opus 5.5.
- **Beschreibung:** Der Gedankenstrich verbindet alles, Einschübe stehen zwischen zwei Strichen, ein Strich steht vor der Pointe. Im Deutschen fällt besonders der englische Geviertstrich ohne Leerzeichen auf.
- **Warum es nach KI aussieht:** Laut Wikipedias Leitfaden setzen Modelle den Strich, wo Menschen Komma, Klammer oder Doppelpunkt nähmen. humanizer: Der Strich erspart die Entscheidung, wie zwei Satzteile zusammenhängen. t3n sieht ihn als Merkmal englisch geprägter Modelle. Der Beobachter und die taz verteidigen ihn als Stilmittel. In deutschen Klappentexten ist er auch eine echte Gattungskonvention.
- **Gegenmittel:** Höchstens ein Strich pro Seite, für einen echten Einschub (avoid-ai-writing: höchstens einer pro 1000 Wörter). Deutsche Form: Halbgeviertstrich mit Leerzeichen.
- **Quellen:** [Washington Post im Boston Globe°](https://www.bostonglobe.com/2025/11/13/business/chatgpt-writing-style-clues/), [TechCrunch zu OpenAI°](https://www.techcrunch.com/2025/11/14/openai-says-its-fixed-chatgpts-em-dash-problem/), [FlowingData zu Wikipedia°](https://flowingdata.com/2025/10/20/signs-of-ai-writing-on-wikipedia/), [humanizer](https://github.com/blader/humanizer), [avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing), [t3n°](https://t3n.de/news/das-ende-des-gedankenstrichs-warum-sich-ki-modelle-in-texten-immer-noch-verraten-1766310/), [Beobachter°](https://www.beobachter.ch/gesellschaft/es-ist-so-weit-die-ki-hat-mich-erwischt-834960), [Design Creativity Bench](https://github.com/kombai-io/design-creativity-bench)

#### 37. Tiefsinnsformeln

- **Häufigkeit:** häufig in Essay- und Über-mich-Texten.
- **Claude:** allgemein.
- **Beschreibung:** „die emotionale Grammatik für einen Zustand“, „Literatur in den Leerstellen des Verbürgten“, Muster wie „X ist die Sprache von Y“ oder „die Architektur von Z“.
- **Warum es nach KI aussieht:** Solche Sätze klingen zitierfähig, ohne genauer zu werden. humanizer (§ 3) und avoid-ai-writing führen sie.
- **Gegenmittel:** Die gemeinte Aussage direkt sagen.
- **Quellen:** [humanizer](https://github.com/blader/humanizer), [avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing)

#### 46. Deutsche Sonderfälle

- **Häufigkeit:** häufig in deutschem KI-Text. Gemessen ist das kaum.
- **Claude:** allgemein.
- **Beschreibung:** Lehnübersetzungen („macht Sinn“, „am Ende des Tages“), Title Case in deutschen Überschriften, gerade Anführungszeichen, Geviertstrich ohne Leerzeichen, englische Koordinaten („13.40° E“) und englische Titel deutschsprachiger Bücher, die ungeprüft aus Datenquellen wie Goodreads übernommen wurden.
- **Warum es nach KI aussieht:** Die Trainingsdaten sind stark englisch geprägt. Lehnübersetzungen sind schwer zu sehen, weil sie keine englischen Wörter enthalten.
- **Gegenmittel:** Deutsche Satzregeln: „…“ oder »…«, Halbgeviertstrich mit Leerzeichen, 52° 31′ N, 13° 24′ O. Bei deutschsprachigen Autoren der deutsche Titel, sofern das Buch so gelesen wurde.
- **Quellen:** [t3n°](https://t3n.de/news/ki-texte-erkennen-floskeln-buzzwords-gedankenstriche-chatgpt-1745388/), [RiCognizioni, versteckte Anglizismen°](https://ojs.unito.it/index.php/ricognizioni/article/view/11860), [Shaitarova u. a., NoDaLiDa 2023°](https://aclanthology.org/2023.nodalida-1.22), [TypeDrawers zu »…«°](https://typedrawers.com/discussion/comment/43786/)

#### 58. Semikolon als Ersatzverbinder

- **Häufigkeit:** allgemein gelegentlich, häufig bei Modellen, denen der Gedankenstrich verboten wurde. Das ist eine eigene Ableitung ohne fremde Quelle. Auf der Startseite dieser Website stehen in Claudes Mikrotext sechs Semikolons auf rund 150 Wörter.
- **Claude:** ja, in diesem Projekt beobachtet.
- **Beschreibung:** „Das Manuskript liegt vollständig vor; gerade entsteht die Endfassung.“ Ketten aus Teilsätzen mit Semikolon.
- **Warum es nach KI aussieht:** Das Semikolon übernimmt die Aufgabe des Strichs (humanizer § 8). Es verbindet zwei Sätze, ohne zu sagen, wie sie zusammenhängen. In deutschem Webtext ist es selten, deshalb fällt die Häufung auf. Stockton beschreibt dasselbe für Doppelpunkte.
- **Gegenmittel:** Zwei Sätze schreiben oder den Zusammenhang benennen („weil“, „aber“).
- **Quellen:** [humanizer](https://github.com/blader/humanizer), [Stockton°](https://www.blakestockton.com/colons-everywhere/). Die Beleglage ist dünn.

#### 59. Absicherung ohne Information

- **Häufigkeit:** gelegentlich bis häufig.
- **Claude:** allgemein.
- **Beschreibung:** „Eine Auswahl, längst nicht alles.“ „Es ist eine Auswahl und wird nie vollständig sein.“
- **Warum es nach KI aussieht:** Der Satz sichert ab, ohne etwas mitzuteilen. avoid-ai-writing („Hedging“) und humanizer (§ 9) führen ihn.
- **Gegenmittel:** Einmal sagen, mit Inhalt: „Kurzgeschichten und Anthologien trage ich noch nach.“
- **Quellen:** [avoid-ai-writing](https://github.com/conorbronsdon/avoid-ai-writing), [humanizer](https://github.com/blader/humanizer)

#### 60. Buchkonventionen als Kulisse

- **Häufigkeit:** gelegentlich. Eigene Beobachtung, nicht belegt.
- **Claude:** ja, nach eigener Einschätzung.
- **Beschreibung:** Kolophon „Gesetzt aus …“, Joyces Unterschriftzeile „Trieste–Zürich–Paris 1914–1921“ als Stationenzeile oder Navigation, Zitate aus Atlas und Almanach.
- **Warum es nach KI aussieht:** Solche Referenzen leitet ein Modell aus „bookish“ ab, und Claude ergänzt Kolophone in editorialen Layouts gern von sich aus. Zugleich ist das Kolophon eine echte Gestalterkonvention, etwa bei Robin Sloan und Matthew Butterick.
- **Gegenmittel:** Das Kolophon behalten, wenn es eine Quellenangabe ist (Schrift mit Gießerei, Kartendaten, Fotografen), und in Textfarbe setzen. Eine literarische Konvention dort einsetzen, wo sie herkommt. Joyces Zeile ist eine Unterschrift am Ende eines Buchs.
- **Quellen:** [Robin Sloan, Kolophon°](https://www.robinsloan.com/colophon/), [Hallmark, Rezept „Almanac“](https://github.com/Nutlope/hallmark). Die Beleglage ist dünn.

#### 61. Wechsel der Erzählperson

- **Häufigkeit:** gelegentlich. Eigene Beobachtung aus der Textmessung dieses Projekts, keine Quelle.
- **Claude:** allgemein.
- **Beschreibung:** Auf einem Bildschirm steht „Er wurde … geboren“, dann „wo ich gelebt habe“, dann „Hier lebt er heute.“
- **Warum es nach KI aussieht:** Der Wechsel zeigt, dass der Text aus Bausteinen verschiedener Herkunft zusammengesetzt ist.
- **Gegenmittel:** Eine Stimme pro Ebene. Kurzvita und Klappentext in der dritten Person (Verlagskonvention), alles übrige in der ersten Person oder ohne Person.
- **Quellen:** keine externen.

#### 62. Nominalstil

- **Häufigkeit:** im Mikrotext gelegentlich, in KI-Sachtext häufig.
- **Claude:** allgemein.
- **Beschreibung:** Substantivketten wie „der flächendeckende Vertrauensentzug“ und Partizipialketten.
- **Warum es nach KI aussieht:** Reinhart u. a. (PNAS 2025) messen für das Englische Nominalisierungen 1,5- bis 2-mal und Partizipialsätze im Präsens 2- bis 5-mal so häufig wie bei Menschen, am stärksten bei instruktionsgetunten Modellen. Für das Deutsche gibt es nur stilistische Einschätzungen.
- **Gegenmittel:** Verben, wo es um Handlung geht.
- **Quellen:** [Reinhart u. a., CMU°](https://www.cmu.edu/dietrich/news/news-stories/2025/large-language-models-writing-text), [Heiser, Texten mit ChatGPT°](https://ideas.repec.org/h/spr/sprchp/978-3-658-45601-6_9.html)

### 5.8 Code-Details

#### 15. shadcn und Tailwind im Werkszustand

- **Häufigkeit:** allgemein sehr häufig. In der Reddit-Auswertung ist es die häufigste konkrete Ursache für den KI-Look. avoid-ai-design gibt 23,5 % an. Bei Claude Code in reinem HTML seltener, in Claude-Artefakten ist Tailwind mit shadcn, Lucide und Recharts die Standardumgebung.
- **Claude:** selten in reinem HTML.
- **Beschreibung:** `--radius: 0.5rem`, slate- oder zinc-Grautöne, unveränderte Card-, Button- und Badge-Komponenten. Dazu Code-Reflexe wie `transition: all`, `z-index: 9999` und `100vw`.
- **Warum es nach KI aussieht:** Kakehi fasst die Kette zusammen: „Inter for type, ShadCN for components, Lucide for icons“. Hallmark prüft die Code-Reflexe einzeln.
- **Gegenmittel:** Eigene Tokens aus dem Gestaltungskonzept. Komponenten nur übernehmen, wenn sie umgestaltet werden.
- **Quellen:** [Johnson, Reddit-Auswertung](https://github.com/JCarterJohnson/vibecoded-design-tells), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Hallmark](https://github.com/Nutlope/hallmark), [Kakehi, UX Collective°](https://uxdesign.cc/ai-design-isnt-ugly-it-s-fluent-and-that-s-the-problem-131b2f4eb78c), [Krebs°](https://www.adriankrebs.ch/blog/design-slop/), [Simon Willison°](https://simonwillison.net/2024/Oct/23/claude-artifact-runner/)

#### 43. Fehlende Zustände

- **Häufigkeit:** häufig.
- **Claude:** allgemein.
- **Beschreibung:** Kein Fokus-, Hover-, Leer-, Lade- oder Fehlerzustand. `prefers-reduced-motion` wird ignoriert.
- **Warum es nach KI aussieht:** Modelle bauen den Idealzustand. Business Insider zitiert das als eines von drei Erkennungszeichen.
- **Gegenmittel:** Jeden Zustand gestalten, sichtbarer Fokus, reduzierte Bewegung respektieren.
- **Quellen:** [Anthropic, frontend-design-Skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), [impeccable](https://github.com/pbakaus/impeccable), [avoid-ai-design](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [Hallmark](https://github.com/Nutlope/hallmark), [Business Insider°](https://dnyuz.com/2026/07/07/there-are-3-telltale-signs-that-you-used-ai-to-make-your-app-and-they-arent-pretty/)

#### 48. Google Fonts per Link

- **Häufigkeit:** häufig. Das ist eine Einschätzung, kein Katalog führt es als Merkmal. Für Leser unsichtbar, im Quelltext sofort zu sehen.
- **Claude:** allgemein.
- **Beschreibung:** `<link href="https://fonts.googleapis.com/css2?…">` im Kopf jeder Seite.
- **Warum es nach KI aussieht:** Es ist der Standardschnipsel generierter Seiten. Gestalter hosten Schriften selbst und nennen Lizenz und Gießerei. In Deutschland kommt das Recht dazu: Das LG München I (Urteil vom 20.01.2022, Az. 3 O 17493/20) sah in der dynamischen Einbindung ohne Einwilligung eine Verletzung des Persönlichkeitsrechts und sprach 100 € Schadensersatz zu. Danach folgte eine Abmahnwelle.
- **Gegenmittel:** WOFF2 selbst hosten, Lizenz im Kolophon. Das ist unabhängig vom Design ratsam.
- **Quellen:** [IHK zu Google Fonts°](https://www.ihk.de/bergische/recht-und-steuern/wettbewerbsrecht/google-fonts-5646176), [DFN-Infobrief Recht°](https://dfn.de/wp-content/uploads/2022/03/Infobrief_Recht_3-2022.pdf). Als KI-Merkmal ist es nicht belegt.

#### 66. Browser-Oberflächen im Werkszustand

- **Häufigkeit:** gelegentlich benannt, eine Quelle.
- **Claude:** allgemein.
- **Beschreibung:** Textauswahl, Scrollbar, Eingabemarke und Fokusring bleiben im Werkszustand des Browsers.
- **Warum es nach KI aussieht:** impeccable nennt das „the cheapest signal that a page was built rather than assembled, and the one models skip most reliably“.
- **Gegenmittel:** `::selection`, Fokusring und `caret-color` passend zum Farbsystem gestalten. Die Gegenposition: Wer Browserstandards bewusst stehen lässt wie Chimero, trifft auch eine Entscheidung. Sie sollte dann für die ganze Seite gelten.
- **Quellen:** [impeccable](https://github.com/pbakaus/impeccable). Die Beleglage ist dünn.

#### 67. Erzählende Kommentare im Quelltext

- **Häufigkeit:** gelegentlich. Betrifft nur Leser des Quelltexts.
- **Claude:** ja.
- **Beschreibung:** Kommentare, die in ganzen Sätzen erzählen, was der Code tut („Der Kern zeigt bei jedem Rad …“).
- **Warum es nach KI aussieht:** Die Begleitstudie unslop-code zur Reddit-Auswertung nennt „narrating comments“ als Merkmal generierten Codes.
- **Gegenmittel:** Kommentare nur für das Warum, knapp.
- **Quellen:** [Johnson, Reddit-Auswertung und Begleitstudien](https://github.com/JCarterJohnson/vibecoded-design-tells). Die Beleglage ist dünn.

#### 68. Fingerabdrücke von Generatoren

- **Häufigkeit:** gelegentlich, aber eindeutig.
- **Claude:** allgemein.
- **Beschreibung:** `lovable-tagger`, „Built with v0“, Badges, mitausgelieferte `CLAUDE.md`, `.cursorrules` oder Werkzeugnotizen im README.
- **Warum es nach KI aussieht:** Es ist kein Stilmerkmal, sondern ein Beleg. isthatvibecoded.com prüft genau diese Dateien.
- **Gegenmittel:** Nur ausliefern, was zur Seite gehört.
- **Quellen:** [avoid-ai-design, F1](https://github.com/funboy322/avoid-ai-design/blob/main/references/ai-tells-catalog.md), [febbhav](https://github.com/febbhav/signs-of-ai-design), [isthatvibecoded.com°](https://isthatvibecoded.com/)

---

## 6. Was Designer anders machen

Fünfzehn Regeln für den Neubau. Sie verdichten, was die Quellen übereinstimmend als Gegenpraxis beschreiben.

1. **Vorab festlegen, dann bauen.** Vor dem ersten Code steht ein Blatt mit allen Entscheidungen: Vorbild mit Namen, Grundfarbe als Hex, Akzent als Hex mit Bedeutung, Schrift mit Herkunft, Schriftgrade und die eine Bewegung. Version B entsteht von diesem Blatt aus und wird nicht aus Version A weiterentwickelt. Kakehi beobachtet, dass jede Überarbeitung auf der letzten Ausgabe aufbaut und weiter zum Durchschnitt mittelt. Shin u. a. empfehlen „productive friction“, also feste Entscheidungspunkte. Anthropic rät, vorab mehrere Richtungen mit Grund-Hex, Akzent-Hex, Schrift und Begründung vorzuschlagen und konkrete Muster mit Namen zu verbieten.
2. **Das Vorbild kommt aus Dominiks Material.** Ein Umschlag, die Rubbelkarte, ein Notizbuch, eine bestimmte Verlagsreihe oder ein Kartenwerk. Prüffrage nach impeccable: Könnte jemand den Look aus der Kategorie „Autorenseite“ erraten, oder aus Kategorie plus Verbotsliste? Dann ist er nicht fertig.
3. **Grund weiß oder ein volles Feld.** Bildschirmweiß, kühler Stein oder eine gesättigte Fläche aus dem Material (Leinen, Vorsatzpapier). Kein Creme, kein Beige, keine warmen Kartontöne für Kästen.
4. **Ein Akzent mit Herkunft, oder keiner.** Aus einer anderen Familie als Rot-Orange, mit genau einer Bedeutung, nie für Hover oder Zustand. Fitzcarraldo und Fleckhaus zeigen, wie Farbe als Reihensystem arbeitet.
5. **Eine Textfarbe.** Aller Lesetext steht in voller Tinte. Höchstens ein zweiter Ton für Zustände, mit mindestens 4,5:1. Rang entsteht über Größe und Stellung.
6. **Kursiv hat eine Bedeutung.** Werktitel, fremdsprachige Wörter, Zitate. Legenden, Koordinaten und Unterzeilen stehen aufrecht. Pro Textebene gibt es ein einziges Unterscheidungsmittel.
7. **Keine Labels über Überschriften.** Auch nicht in Kapitälchen. Überschriften sind Substantive für den Inhalt, oder es gibt keine. Kapitälchen nur für Namen und Abkürzungen im Lauftext.
8. **Zwei bis drei Schriftgrade.** Höchstens fünf, deutlich verschieden. Keine Display-Schrift, die nur für eine einzelne Zeile auftritt.
9. **Schrift mit Herkunft, selbst gehostet.** Die Wahl folgt aus dem Vorbild, die Schrift hat ein volles Griechisch für die Auszüge, Lizenz und Gießerei stehen im Kolophon. Keine Schrift von den Listen unter Rang 31, auch nicht Tiempos oder Copernicus. Braucht es einen zweiten Schnitt, dann eine Groteske mit Herkunft für alles Funktionale, wie bei Paris Review und Sternberg Press.
10. **Echte Bilder.** Eigene Fotos und Scans statt CSS-Nachbauten von Karteikarten, Tafeln und Brettern. Code-Zeichnung nur, wo Daten Geometrie tragen, also beim Globus und beim Zeitband. Fotografen werden genannt.
11. **Eine Bewegung, die etwas erzählt.** Die springende Lebenschronik auf dem Globus. Kein Ladeauftritt, kein Scroll-Einblenden, kein Hover-Lift, keine Dauerrotation. Der Text steht beim Laden vollständig da.
12. **Daten im Satz.** Keine Mittelpunktzeilen, keine Kennzahl-Kacheln, keine Mikro-Meta. Koordinaten an genau einer Stelle, dort wo man mit ihnen etwas tut. Zahlen ausgeschrieben und mit Herkunft.
13. **Der Text sagt jedes Ding einmal.** Keine Sätze über das Layout, keine Bedienhinweise für sichtbare Gesten, keine Formel zweimal auf der Website. Kein „nicht X, sondern Y“, keine Semikolon-Ketten, ein Doppelpunkt nur vor Aufzählung, Zitat oder Adresse. Links nennen ihr Ziel. Dominiks freigegebene Texte bleiben unverändert, Vorschläge dazu bekommt er getrennt.
14. **Details, die nur jemand vom Fach setzt.** Für die frühen Werke (Ilias, Odyssee, Aeneis, Metamorphosen, De bello Gallico, Summa theologiae) steht jeder Auszug als solcher markiert, mit Übersetzer und Ausgabe, möglichst in gemeinfreier Übersetzung (Voß für Homer und Ovid, für die Summa Ceslaus Maria Schneider 1886–1892, Rechtsstatus prüfen). Das Raster folgt dem Inhalt: Original und Übersetzung als Doppelseite wie in der Loeb-Ausgabe, Verszählung am Rand. Stellenangaben nach Fachkonvention, etwa Hom. Il. 1,1–7 oder Thomas STh I q. 2 a. 3 (die einzelnen Kürzel vor der Veröffentlichung prüfen). Dazu deutsche Satzregeln und gestaltete Browser-Oberflächen (Auswahl, Fokus).
15. **Vor der Abgabe prüfen.** Silhouettentest: Bildschirmfoto auf 200 px Breite, schwarzweiß, neben fünf andere Autorenseiten. An jede Entscheidung die Frage aus Anthropics Skill stellen: „would you have arrived here for any similar page?“ Die Treffer dieser Liste pro Bildschirm zählen, zwei auf einem Bildschirm gelten als Bestätigung. Wo ein Merkmal fällt, kommt Inhalt hin und kein neues Ornament.

---

## Anhang: Arbeitsdateien der Recherche

- Kataloge, Skill-Dateien und Rangfolgen als CSV: `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-kataloge/raw/`
- Skill-Fassungen von Anthropic, Prompting-Seiten und geklonte Repositories: `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-claude/dl/`
- Auszählung der Design Creativity Bench: `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-claude/analyse_dcb.py`
- Sichtbare Texte aller Seiten, Herkunftsabgleich und Skripte: `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/ki-text/`
- Frühere Projektnotizen: `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/recherche-design.md` und `/tmp/claude-0/-home-user-Autorenwebsite/f47320ed-8ba8-501b-b8f6-90b4eb6d5a1c/scratchpad/synthese.md`
