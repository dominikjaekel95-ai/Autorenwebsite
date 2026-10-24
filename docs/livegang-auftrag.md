# Livegang heute: Anleitung für die zweite Claude-Sitzung

Stand: 24. Oktober 2026. Diese Anleitung ersetzt `docs/vercel-einrichtung.md`.

Sie ist für eine Claude-Sitzung auf Dominiks Computer (Claude-Desktop-App oder `claude remote-control`). Diese Sitzung hilft Dominik im Browser bei Vercel und bei den Domains. Den Code der Website schreibt eine andere Sitzung in der Cloud. Diese Sitzung hier ändert keine Dateien im Repository.

Die Angaben stammen aus einer Recherche der Cloud-Sitzung vom 24. Oktober 2026. Für sie waren vercel.com, die Domain-Abfragen und die Markenregister gesperrt. Was sie selbst gelesen hat, steht mit „gelesen“ dabei. Was nur aus Suchergebnissen stammt, steht mit „nur Suche“ dabei. Weicht die Oberfläche von Vercel oder vom Registrar ab, gilt die Oberfläche.

## Worum es geht

- **Website:** die Autorenwebsite von Dominik Jäkel, eine statische Seite aus HTML, CSS und JavaScript ohne Build-Schritt. Schriften und Programmbibliotheken liegen mit im Ordner, die Seite lädt nichts von fremden Servern.
- **Repository:** `dominikjaekel95-ai/Autorenwebsite` auf GitHub, Branch `claude/laughing-sagan-4dlccv`. Es ist der einzige und der Standard-Branch. Das Repository ist öffentlich und gehört Dominiks persönlichem GitHub-Konto (GitHub-API, gelesen). Die Commits stammen von „Claude“, nicht von Dominik (im Repo nachgesehen; wichtig für Schritt 1.5).
- **Was online geht:** der Ordner `veroeffentlichung/` im Repository. Die Cloud-Sitzung erzeugt ihn aus `website-c/`, mit `vercel.json` (saubere Adressen ohne `.html`, Sicherheitsangaben), Fehlerseite, robots.txt und Sitemap.
  - Der Ordner ist heute noch ein Entwurf: Impressum und Datenschutz enthalten Platzhalter der Form `[[ZU PRÜFEN …]]` und sind für Suchmaschinen gesperrt (`noindex`, im Repo nachgesehen). Sichtbar sind sie trotzdem, sobald die Domain verbunden ist. Deshalb Schritt 7 früh erledigen.
  - Die endgültige Fassung baut die Cloud-Sitzung, sobald sie die Angaben aus Schritt 7 und Dominiks Freigaben hat.
  - **Stand 24. Oktober, abends:** Die endgültige Fassung ist gebaut (Schritt 7 erledigt): keine Platzhalter mehr, Impressum und Datenschutz ohne `noindex`. Online ist sie, sobald die Cloud-Sitzung sie gepusht und Vercel sie gebaut hat.
- **Adresse:** `https://dominikjaekel.de`, ohne www. Sie steht im Code schon als Basisadresse (`BASIS_URL` in `website-c/werkzeuge/veroeffentlichen.py`). Daraus entstehen die Angaben für Suchmaschinen, das Vorschaubild, Sitemap und robots.txt.
- **Tarif:** Vercel Hobby, entschieden. Hobby ist laut Vercel nur für nicht kommerzielle, private Nutzung erlaubt (Fair Use Guidelines, nur Suche). Als kommerziell zählt zum Beispiel, ein Produkt zum Kauf zu bewerben. Heute bewirbt die Seite nichts zum Kauf, sie hat keine Kauf-, Spenden- oder Affiliate-Links (im Repo nachgesehen). Eine Autorenseite bleibt trotzdem ein Grenzfall (Einschätzung). Bewirbt die Seite später ein Buch zum Kauf, ist Pro nötig.
- **Ziel:** die Seite heute unter `https://dominikjaekel.de` live.
- **Schon entschieden (Dominik, 24. Oktober):** Tarif Hobby; Impressum und Datenschutz freigegeben; die 65 Länder bleiben; Simon-Kucher bleibt in der Vita. **Domains: nur `dominikjaekel.de` und `dominikjaekel.com` kaufen** („Okay, dann nur dominikjaekel.de und .com kaufen“); keine Umlaut- und keine Bindestrich-Domains, keine Satoshi-Domains. Neu als Ziel für später (steht in `docs/todo.md`): bei Google auf Platz 1 für „Satoshi Nakamoto Roman“ und „Göbekli Tepe Roman“, mit eigenen Unterseiten; dafür zählen die Seiten selbst, nicht zusätzliche Domains.

## Regeln für diese Sitzung

1. **Anmelden, Zugriffe erlauben und Bezahlen macht Dominik selbst.** Vor jedem Kauf und jeder Bestätigung stoppen und ihn fragen. Passwörter, Tokens und Zahlungsdaten nie in den Chat schreiben lassen.
2. **Kauf nur nach Dominiks ausdrücklichem Ja.** Vorher die genaue Liste der Domains, den Anbieter und den Gesamtpreis pro Jahr zeigen. Das gilt auch in Vercel: Vercel bietet in der Domainsuche und beim Hinzufügen einer noch nicht gekauften Domain einen Kauf an („Buy“). Dort nichts anklicken, nur lesen.
3. **Im Repository nichts ändern, nichts committen und nichts pushen.** Ist im Code etwas nötig, etwa an `vercel.json`, schreibt Dominik es der Cloud-Sitzung. Sonst entstehen Konflikte.
4. **Nichts einschalten, was Daten über Besucher sammelt oder Cookies setzt.** Dazu gehören Vercel Web Analytics, Speed Insights, Kommentare und die Toolbar auf der echten Seite. Die Datenschutzerklärung sagt, dass es kein Tracking gibt.
5. **Nichts ungefragt installieren.** Braucht ein Schritt ein Programm, das fehlt (zum Beispiel Node.js), erst Dominik fragen.
6. **Unsicherheiten nicht überspielen.** Weicht etwas von dieser Anleitung ab, die Abweichung beschreiben und die naheliegende Wahl vorschlagen.
7. **Mit Dominik einfach sprechen.** Fachbegriffe beim ersten Mal in einem Satz erklären.

## Ablauf heute im Überblick

1. Schritt 0: Stand erheben.
2. Schritt 3, erster Teil: Prüfskript laufen lassen. Es dauert eine Minute.
3. Schritte 1 und 2: Projekt in Vercel anlegen oder prüfen.
4. **Schritt 7 vorziehen:** die Angaben für die Datenschutzerklärung sammeln und als **Zwischenmeldung 2 (Datenschutz)** an Dominik geben. Dann kann die Cloud-Sitzung die endgültige Fassung bauen, während die Domains noch eingerichtet werden. **Erledigt (24. Oktober):** Zwischenmeldung 2 ist eingetragen, die endgültige Fassung gebaut.
5. Schritte 3 bis 5: Dominik kauft, und zwar nur `dominikjaekel.de` und `dominikjaekel.com` (entschieden am 24. Oktober). Danach **Zwischenmeldung 1 (Domains)** an die Cloud-Sitzung.
6. Schritt 6: Domains verbinden. Während Vercel auf DNS und Zertifikate wartet, Schritt 7 abschließen, falls noch offen.
7. Schritt 8, die Prüfliste: einmal nach dem Verbinden, einmal mit der endgültigen Fassung.
8. Schritt 9 nach dem Livegang, Schritt 10 zum Schluss.

## Schritt 0: Stand erheben

Erst nachsehen, was es schon gibt. So passiert nichts doppelt.

1. **Vercel, Projekte:** Gibt es schon ein Projekt für `dominikjaekel95-ai/Autorenwebsite`? Wenn ja, kein zweites anlegen. Notieren:
   - Projektname und die Adresse `…vercel.app`,
   - Framework Preset, Root Directory, Build-, Install- und Output-Einstellungen,
   - Production Branch, Ignored Build Step, Deployment Protection,
   - ob Web Analytics, Speed Insights oder die Toolbar an sind,
   - welche Domains schon unter Settings → Domains stehen,
   - Status und Commit des letzten Deployments (bei „Blocked“ siehe Schritt 1.5).
2. **Vercel, Konto:** Läuft das Konto auf Hobby? Läuft ein Pro-Test? Kein Pro-Test starten.
3. **Vercel, Domains des Kontos:** Gehört Dominik bei Vercel schon eine Domain?
4. **Registrare:** Dominik fragen, ob er bei einem Anbieter (INWX, IONOS, Strato, united-domains oder anderen) schon ein Konto hat und ob ihm eine der Domains aus Schritt 3 schon gehört.
5. **GitHub:** Hat die Vercel-App Zugriff auf das Repository? Das zeigt sich spätestens beim Import in Schritt 1.
6. **Ergebnis:** Dominik eine kurze Liste zeigen: was es gibt, was fehlt, was von dieser Anleitung abweicht.

## Schritt 1: Projekt in Vercel anlegen

Nur, wenn es in Schritt 0 noch kein Projekt gab. Sonst die Werte unten mit dem bestehenden Projekt vergleichen und Abweichungen mit Dominik korrigieren.

1. In Vercel: **Add New… → Project**.
2. **Import Git Repository:** `dominikjaekel95-ai/Autorenwebsite` wählen. Fehlt das Repository in der Liste, über **Adjust GitHub App Permissions** der Vercel-App Zugriff auf genau dieses Repository geben. Das bestätigt Dominik.
3. **Configure Project:**
   - **Project Name:** `dominikjaekel` oder ähnlich.
   - **Framework Preset:** `Other`.
   - **Root Directory:** `veroeffentlichung`.
   - **Build and Output Settings:** Build Command leer lassen, gegebenenfalls Override einschalten und leer lassen. Install Command leer. Output Directory leer lassen. Besteht Vercel auf einem Wert, `.` eintragen.
   - **Environment Variables:** keine.
4. **Deploy**, nach Dominiks Ja. Danach die Adresse `…vercel.app` öffnen und kurz ansehen: Startseite, Navigation, Impressum und Datenschutz im Fuß. Die ausführliche Prüfung kommt in Schritt 8.
5. **Falls das Deployment „Blocked“ zeigt** mit einem Hinweis, der Commit-Autor habe keinen Zugriff oder Hobby unterstütze keine Zusammenarbeit („collaboration“):
   - Hintergrund: Bei Hobby baut Vercel in manchen Fällen nur Commits des Konto-Inhabers. Laut Vercel-Docs gilt das nicht für öffentliche Repositories und nicht für persönliche GitHub-Konten (nur Suche). Beides trifft hier zu. In der Vercel-Community gibt es trotzdem Berichte über gesperrte Deployments (nur Suche).
   - Nicht auf Pro wechseln, das Repository nicht auf privat stellen, keine Einstellung in GitHub ändern.
   - Den genauen Text der Meldung Dominik zeigen. Er gibt ihn an die Cloud-Sitzung weiter. Danach mit den übrigen Schritten weitermachen, soweit sie ohne Deployment gehen.

## Schritt 2: Einstellungen im Projekt

1. **Settings → Git → Production Branch:** `claude/laughing-sagan-4dlccv`. Das ist meist schon voreingestellt.
2. **Settings → Git → Ignored Build Step:** „Custom“ wählen und als Befehl eintragen: `git diff --quiet "$VERCEL_GIT_PREVIOUS_SHA" HEAD -- .`
   - Der Befehl vergleicht mit dem letzten erfolgreichen Deployment, nicht nur mit dem letzten Commit. So geht kein Stand verloren, wenn ein Push mehrere Commits enthält.
   - Beim ersten Deployment ist die Variable leer, der Befehl schlägt fehl, und Vercel baut. Das ist gewollt.
   - Bietet Vercel stattdessen „Only build if there are changes in a folder“ an, geht auch das.
   - Grund: Die Cloud-Sitzung pusht oft Zwischenstände in `website-c/`. Online gehen soll nur, was sie bewusst nach `veroeffentlichung/` legt.
3. **Settings → Deployment Protection:** Die Standardeinstellung lassen, bei der Vorschauen geschützt sind und die echte Seite öffentlich ist.
4. **Analytics, Speed Insights, Toolbar:** aus lassen (Regel 4). Die Toolbar für Production unter Settings → General abschalten, falls sie dort an ist.
5. **Tarif:** Hobby lassen. Nichts upgraden.

## Schritt 3: Domains auswählen und prüfen

### Welche Domains?

Dominiks Frage war, ob man eine weglassen kann. **Ja.** Pflicht ist nur `dominikjaekel.de`. Empfohlen waren dazu `dominikjaekel.com` und, wenn verfügbar, `dominikjäkel.de`. Beide Schreibweisen mit Bindestrich, `dominik-jaekel.de` und `dominik-jaekel.com`, können weg.

**Entschieden (Dominik, 24. Oktober): „Okay, dann nur dominikjaekel.de und .com kaufen.“** Gekauft werden genau `dominikjaekel.de` und `dominikjaekel.com`. Nicht gekauft werden die Umlaut-Domains (`dominikjäkel.de`, `dominikjäkel.com`), die Domains mit Bindestrich (`dominik-jaekel.de`, `dominik-jaekel.com`), `dominikjakel.de` und die Satoshi-Domains. Die Tabelle unten bleibt als Begründung stehen.

Zur Erklärung: Eine **Domain** ist der Name der Seite im Internet. Man kauft sie für ein Jahr bei einem **Registrar** (Domain-Händler) und verlängert sie jährlich. `www.dominikjaekel.de` ist kein eigener Kauf, sondern eine Unteradresse von `dominikjaekel.de`.

| Domain | Wofür | Empfehlung |
|---|---|---|
| `dominikjaekel.de` | Hauptadresse. Steht schon als Basisadresse im Code und passt zum deutschen Publikum. | **kaufen** |
| `www.dominikjaekel.de` | Unteradresse, kein eigener Kauf | in Vercel anlegen, leitet weiter |
| `dominikjaekel.com` | Schutz. Viele tippen aus Gewohnheit .com, auch Leser im Ausland. | **kaufen** |
| `dominikjäkel.de` (intern `xn--dominikjkel-s8a.de`) | So, wie der Name geschrieben wird. Preis wie eine .de-Domain, etwa 5 € im Jahr (geschätzt). Nur als Weiterleitung, nie als Hauptadresse oder für E-Mail: Laut Strato-FAQ kommt manche Software mit Umlaut-Domains schlecht zurecht (nur Suche). | ~~kaufen, wenn der Registrar sie anbietet~~ **nicht kaufen** (Dominik, 24.10.) |
| `dominik-jaekel.de` | Bindestriche tippt kaum jemand (Einschätzung). Etwa 5 € im Jahr. | **nicht kaufen** |
| `dominik-jaekel.com` | bringt praktisch keinen Schutz | weglassen |
| `dominikjäkel.com` | bringt praktisch keinen Schutz; nicht jeder Registrar verkauft Umlaut-Domains (Cloudflare zum Beispiel nicht, gelesen) | weglassen |
| `dominikjakel.de` | ohne Umlaut und ohne „e“; so könnten Leser ohne deutsche Tastatur tippen. Nur eine Idee, nicht belegt. | nur auf Wunsch |
| `satoshinakamoto.de`, `satoshi-nakamoto.de` | siehe Schritt 4 | **nicht kaufen** (Dominik, 24.10.) |

`xn--dominikjkel-s8a.de` ist die **Punycode**-Schreibweise von `dominikjäkel.de`: die Form ohne Umlaut, die das Internet intern nutzt. Die Cloud-Sitzung hat sie mit Python berechnet und nachgerechnet. Browser zeigen den Umlaut an.

### Sind die Domains frei?

**Stand 24. Oktober 2026, 17:44, 18:05 und 18:12 UTC: ungeprüft.** Die Cloud-Sitzung konnte keine Abfrage machen, der Proxy hat alle Abfrage-Adressen gesperrt (rdap.denic.de, rdap.verisign.com, rdap.org und andere). Die Websuche fand unter keiner der Domains eine Seite. Das heißt nicht, dass sie frei sind.

Deshalb prüft diese Sitzung selbst, mit dem Skript unten. Es kauft nichts und meldet nichts an.

- **Teil 1** fragt das offizielle Verzeichnis der Domains ab (RDAP): für .de bei der DENIC, für .com bei Verisign. „frei“ heißt: dort nicht eingetragen (HTTP 404). „vergeben“ heißt: eingetragen (HTTP 200). Bei „unklar“ kurz warten und die Domain einzeln wiederholen. Teil 1 braucht nur `sh` und `curl`.
- **Teil 2** läuft nur mit `sh domain-check.sh mit-vercel`. Er fragt die Kommandozeile von Vercel ohne Anmeldung: Verkauft Vercel die Endung, und zu welchem Preis? Die Meldung „The TLD … is not supported“ heißt: Vercel verkauft diese Endung nicht. Dass `domains check` und `domains price` ohne Anmeldung gehen, steht im Code von Vercel CLI 65.2.0 (gelesen). Ausprobiert ist es nicht.
  - Teil 2 braucht Node.js (`npx`) und lädt die Vercel-Kommandozeile herunter. Vorher Dominik fragen (Regel 5).
  - Fragt der Befehl nach einer Anmeldung: mit Ctrl+C abbrechen.
  - Ohne Node.js Teil 2 weglassen. Preise dann in der Domainsuche bei Vercel (Domains → Buy) und beim Registrar ansehen. Nur ansehen, nichts kaufen (Regel 2).
- **Windows:** `sh` gibt es dort nicht von Haus aus. Dann die Domains einzeln in der Domainsuche des Registrars prüfen.
- Endgültig ist erst die Anzeige beim Registrar im Bestellvorgang.

Das Skript als Datei speichern, etwa `domain-check.sh`, und mit `sh domain-check.sh` starten. Für den Kauf zählen nur die Zeilen `dominikjaekel.de` und `dominikjaekel.com`; die übrigen fragt das Skript nur zur Auskunft ab.

```sh
#!/bin/sh
# Domain-Check für Dominiks Rechner (zweite Claude-Sitzung). Nur Lesen, kauft nichts, meldet nichts an.
# Aufruf: sh domain-check.sh             (nur Teil 1, braucht sh und curl)
#         sh domain-check.sh mit-vercel  (dazu Teil 2, braucht Node.js; vorher Dominik fragen)
# Teil 1: RDAP der Registries (DENIC für .de, Verisign für .com). 404 = frei, 200 = vergeben.
# Teil 2: Vercel-CLI ohne Login (domains check/price; laut Code von Vercel CLI 65.2.0 ohne Token, nicht ausprobiert):
#         zeigt, ob Vercel die Endung verkauft und zu welchem Preis. Telemetrie der CLI ist abgeschaltet.

DE="dominikjaekel dominik-jaekel xn--dominikjkel-s8a dominikjakel satoshinakamoto satoshi-nakamoto satoshi-roman satoshi-der-roman satoshiroman"
COM="dominikjaekel dominik-jaekel xn--dominikjkel-s8a"
# xn--dominikjkel-s8a = dominikjäkel (Punycode)

pruefe() { # $1 = Domain, $2 = RDAP-Adresse
  code=$(curl -s -m 20 -o "/tmp/rdap_$1.json" -w '%{http_code}' -H 'Accept: application/rdap+json' "$2")
  case $code in 404) s=frei;; 200) s=vergeben;; *) s="unklar (HTTP $code)";; esac
  extra=""; [ "$code" = 200 ] && extra=$(grep -oE '"eventAction" *: *"[^"]*" *, *"eventDate" *: *"[^"]*"' "/tmp/rdap_$1.json" | tr '\n' ' ')
  echo "$1  $s  $extra"
  sleep 1
}

echo "Abfrage: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "--- RDAP .de (rdap.denic.de) ---"
for d in $DE; do pruefe "$d.de" "https://rdap.denic.de/domain/$d.de"; done
echo "--- RDAP .com (rdap.verisign.com) ---"
for d in $COM; do pruefe "$d.com" "https://rdap.verisign.com/com/v1/domain/$d.com"; done

if [ "$1" != "mit-vercel" ]; then
  echo "--- Teil 2 (Vercel) übersprungen. Mit Dominiks Ja: sh domain-check.sh mit-vercel ---"
  exit 0
fi
command -v npx >/dev/null 2>&1 || { echo "npx fehlt (Node.js nicht installiert). Teil 2 entfällt."; exit 0; }
echo "--- Vercel: verfügbar und Preis (ohne Login) ---"
ALL=""
for d in $DE; do ALL="$ALL $d.de"; done
for d in $COM; do ALL="$ALL $d.com"; done
VERCEL_TELEMETRY_DISABLED=1 npx --yes vercel@65.2.0 domains check $ALL
VERCEL_TELEMETRY_DISABLED=1 npx --yes vercel@65.2.0 domains price $ALL
# "The TLD for domain name ... is not supported." = Vercel verkauft diese Endung nicht.
# Fragt die CLI nach einer Anmeldung: mit Ctrl+C abbrechen.
```

**Ist `dominikjaekel.de` vergeben:** sofort stoppen und Dominik Bescheid geben. Dann muss er eine andere Hauptadresse wählen, und die Cloud-Sitzung muss `BASIS_URL` ändern und neu bauen. Ist eine vergeben, die Dominik schon gehört (Schritt 0), ist das kein Problem.

Das Ergebnis Dominik als Tabelle zeigen, mit Datum und Uhrzeit der Abfrage.

## Schritt 4: Satoshi-Nakamoto-Domains – ENTSCHEIDUNG FÜR DOMINIK

Dominik hat gefragt, ob man `satoshi-nakamoto.de` und `satoshinakamoto.de` mitkaufen und auf die Romanseite leiten kann. *Satoshi* ist der Arbeitstitel seines Romans, die Seite liegt unter `/satoshi`. Satoshi Nakamoto ist das Pseudonym des unbekannten Bitcoin-Erfinders.

**Entschieden (Dominik, 24. Oktober): nicht kaufen** („Okay, dann nur dominikjaekel.de und .com kaufen“). Der Abschnitt bleibt als Begründung stehen; für später gilt die Alternative unten (die Seite `/satoshi` selbst, `docs/todo.md`: Platz 1 bei Google über eigene Unterseiten).

Ob die Domains überhaupt frei sind, zeigt erst Schritt 3. Sind sie vergeben, entfällt die Frage.

**Die Einschätzung der Cloud-Sitzung, knapp.** Das ist keine Rechtsberatung.

- **Dafür spricht:** Wer den Namen eintippt, landet beim Roman. Eine .de-Domain kostet wenig.
- **Namensrecht:** Nach § 12 BGB (gelesen) kann der Berechtigte Beseitigung und Unterlassung verlangen, wenn ein anderer seinen Namen unbefugt gebraucht.
  - Ein bekanntes Pseudonym ist geschützt (BGH „maxem.de“, I ZR 296/00, 2003, nur Suche). „Satoshi Nakamoto“ ist weltbekannt.
  - Nach demselben Urteil kann schon die Registrierung eines fremden Namens als Domain eine Namensanmaßung sein (nur Suche).
  - Ein Hinweis auf der Seite hilft dagegen nicht (BGH „solingen.info“, I ZR 201/03, 2006, nur Suche).
  - Dominik hat selbst kein Recht an dem Namen. In einem Streit stünde er deshalb schlecht da.
- **Wer könnte sich wehren:** am ehesten Menschen, die wirklich Satoshi Nakamoto heißen, etwa Dorian Satoshi Nakamoto in den USA; in Japan ist der Name nicht selten (nur Suche). Der echte Satoshi müsste sich zu erkennen geben, das ist praktisch ausgeschlossen. Dazu kommen mögliche Markeninhaber.
- **Wie wahrscheinlich:** Eine Abmahnung ist eher unwahrscheinlich (Einschätzung). Kommt es doch dazu, kann ein Dritter bei der DENIC einen Dispute-Eintrag setzen lassen, also die Domain sperren lassen. Dafür genügt es, ein Recht glaubhaft zu machen. Die Domain fällt dann bei Löschung an ihn (DENIC-Domainbedingungen, nur Suche). Die Kosten eines Streits richten sich nach dem Streitwert. Gefundene Beispiele aus Firmenfällen nennen 25.000 bis 50.000 € (nur Suche); eine belastbare Zahl für Privatpersonen gibt es nicht.
- **Marken:** In Großbritannien wurde „Satoshi Nakamoto“ am 02.09.2025 als Marke angemeldet, Nr. UK00004257849, unter anderem für Bücher (Klasse 16) (nur Suche, UK Trade Mark Journal). In den USA gibt es Einträge für Software und Krypto (nur Suche). Marken aus Großbritannien und den USA wirken in Deutschland nicht. Ob es eine Marke für Deutschland oder die EU gibt, ist **ungeprüft**, die Register waren gesperrt.
- **Praktisch:** Wer `satoshinakamoto.de` eintippt, erwartet Bitcoin-Informationen, keinen Roman. Die Weiterleitung kann wie Domain-Grabbing wirken, und zwar gerade bei den Bitcoin-Lesern, die der Roman erreichen will. Für die Suchmaschine bringen neue Domains ohne Links nichts (Einschätzung, nicht geprüft); für die Suche nach „Satoshi Nakamoto Roman“ zählt die Seite `/satoshi` selbst.

**Empfehlung: nicht kaufen.** Die sicherere Alternative:

1. Die Adresse bleibt `dominikjaekel.de/satoshi`.
2. Der Name steht schon beschreibend im Text der Seite (im Repo nachgesehen). Wahlweise auch in Titel und Beschreibung, etwa „Satoshi – ein Roman über Satoshi Nakamoto und die Entstehung von Bitcoin“. Jemanden zu nennen ist keine Namensanmaßung. Das macht die Cloud-Sitzung, wenn Dominik es will.
3. Später, wenn der Titel feststeht und die Markensuche sauber ist: `satoshi-roman.de` als kurze Adresse für Druck und Lesungen. Ein Vorname plus „Roman“ ist beschreibend und namensrechtlich unkritisch (Einschätzung).

**Falls Dominik es trotzdem will:**

1. Vorher die Markensuche in TMview zeigen: https://www.tmdn.org/tmview/, Suchbegriffe „SATOSHI NAKAMOTO“ und „SATOSHI“, Ämter DE, EM und WO, Klassen 9, 16, 35, 36 und 41. Das dauert etwa 5 Minuten. Gibt es einen Treffer für Bücher (16) oder Lesungen (41): nicht kaufen.
2. Nur **eine** Domain kaufen: `satoshinakamoto.de`, so wie man es tippt. `satoshi-nakamoto.de` nicht kaufen, die zweite verdoppelt das Risiko ohne Nutzen.
3. Inhaber ist Dominik Jäkel. Keine Parkseite, keine Werbung, die Domain nie zum Verkauf anbieten.
4. Nirgends bewerben, nur still weiterleiten.
5. Kommt eine Abmahnung oder ein Dispute-Eintrag: Fristen ernst nehmen, nichts ungeprüft unterschreiben, eher die Domain freigeben als streiten, einen Anwalt fragen.
6. Wie die Weiterleitung auf `/satoshi` eingerichtet wird, steht in Schritt 6.3.

Dominiks Antwort in die Zwischenmeldung 1 schreiben.

## Schritt 5: Domains kaufen (nur nach Dominiks Ja)

**Zu kaufen sind nur `dominikjaekel.de` und `dominikjaekel.com`** (Dominik, 24. Oktober), keine weiteren.

**Empfehlung: beide Domains in einer Bestellung bei INWX** (Berlin, Mitglied der DENIC seit 2006, nur Suche). Dort gibt es .de und .com bei einem Anbieter, in Euro, mit deutschem Vertrag und unabhängig vom Hosting. Ob INWX die Umlaut-Domain anbietet, ist nicht belegt. In der Domainsuche nachsehen.

| Anbieter | .de pro Jahr | .com pro Jahr | Anmerkung (alles nur Suche) |
|---|---|---|---|
| **INWX** | 5,02 € (ob mit oder ohne MwSt., ist unklar) | 17,52 USD; Aktion 13,50 USD im ersten Jahr bei Zahlung bis 01.11.2026 | eigener DNS-Editor, fremde Nameserver möglich |
| netcup | ca. 5,04 € inkl. MwSt. | ca. 16,56 € | günstig, Verwaltung etwas sperrig |
| Hetzner | ab 4,90 € netto | unklar | Verwaltung über konsoleH |
| Vercel | unklar | nur per Kommandozeile abfragbar | siehe unten |
| Cloudflare | .de nicht verfügbar | – | Umlaut-Domains nicht unterstützt (gelesen, Cloudflare-Docs) → scheidet aus |

**Grobkosten** für `dominikjaekel.de` und `dominikjaekel.com` bei INWX: 5,02 € plus 17,52 USD im Jahr (im ersten Jahr mit der Aktion 13,50 USD), zusammen rund 20 €, geschätzt aus den Preisen oben. Den genauen Preis zeigt erst der Warenkorb.

**Alternative Vercel:** Vercel stellt das DNS dann selbst ein. Nachteile: Die Domain hängt am Hosting, abgerechnet wird in USD, und die Unterstützung für Umlaut-Domains ist unklar. Laut einem Vercel-Changelog wurden einige Länderendungen gestrichen, etwa .at, .lu und .ma (nur Suche); ob .de verfügbar ist, zeigt erst das Skript. Nur wählen, wenn das Skript zeigt, dass Vercel alle gewünschten Domains zu Marktpreisen verkauft, und Dominik gar nichts am DNS einstellen will.

**Beim Bestellen:**

1. Dominik legt das Konto beim Registrar selbst an und bezahlt selbst. Ob INWX ein neues Konto sofort freischaltet oder vorher Guthaben oder eine Prüfung verlangt, ist nicht recherchiert. Dauert das heute zu lange, ist netcup die Ausweichwahl.
2. Inhaber ist Dominik Jäkel als Privatperson. Die Daten trägt er selbst ein.
3. Keine Zusatzpakete: kein Hosting, kein E-Mail-Paket, kein SSL-Zertifikat. Das Zertifikat stellt Vercel kostenlos aus.
4. Nameserver: die Voreinstellung des Registrars lassen. Wie es weitergeht, steht in Schritt 6.4.
5. Domains verlängern sich in der Regel jedes Jahr automatisch. In der Bestellung nachsehen und Dominik sagen.
6. Bei .com verlangt der Registrar oft, dass der Inhaber seine E-Mail-Adresse bestätigt. Laut INWX bleiben dafür 15 Tage, sonst wird die Domain abgeschaltet (INWX-Hilfe, nur Suche). Dominik auf die Bestätigungs-Mail hinweisen.
7. Datenschutz im Whois: Bei .de gibt die DENIC seit 25.05.2018 keine Inhaberdaten an Dritte heraus (nur Suche). Wie INWX das bei .com handhabt, ist nicht recherchiert. In der Bestellung nachsehen und Dominik sagen.

**Zwischenmeldung 1 (Domains) an Dominik für die Cloud-Sitzung**, gleich nach dem Kauf:

- welche Domains gekauft sind, bei wem, ab wann, zu welchem Preis,
- ob `dominikjaekel.de` die Hauptadresse bleibt,
- Dominiks Entscheidung zu den Satoshi-Domains und, falls ja, das Ergebnis der TMview-Suche.

## Schritt 6: Domains mit dem Projekt verbinden

Kurz erklärt:
- **DNS** ist das Adressbuch des Internets. Es sagt dem Browser, auf welchem Server eine Domain liegt.
- Ein **A-Eintrag** verweist eine Domain auf eine IP-Adresse, ein **CNAME** verweist einen Namen auf einen anderen Namen, ein **TXT-Eintrag** ist ein Textvermerk, mit dem man zum Beispiel beweist, dass einem die Domain gehört.
- **Nameserver** sind die Server, die das DNS einer Domain verwalten.
- Eine **Weiterleitung mit Code 308** ist dauerhaft. Browser und Suchmaschinen merken sich das Ziel. 307 ist die vorläufige Variante.

**Nur gekaufte Domains hinzufügen.** Bietet Vercel beim Hinzufügen einen Kauf an, hat der Kauf beim Registrar noch nicht geklappt oder ist noch nicht eingetragen. Nicht kaufen, sondern Dominik fragen (Regel 2). Verlangt Vercel zur Bestätigung einen TXT-Eintrag `_vercel`, ihn genau so beim Registrar anlegen.

### 6.1 Hauptdomain und www

1. Im Projekt: **Settings → Domains → Add** → `dominikjaekel.de`.
2. Vercel schlägt dann die www-Variante vor und empfiehlt dabei www als Hauptadresse. **Hier bewusst die andere Variante wählen:** `www.dominikjaekel.de` leitet auf `dominikjaekel.de` weiter. Die Adresse im Code ist ohne www. Vercel weist darauf hin, das gebe Vercel „less control over incoming traffic“; es funktioniert trotzdem (Vercel-Docs „Deploying & Redirecting Domains“, nur Suche).

### 6.2 Zusatzdomains als Weiterleitung

1. `dominikjaekel.com` hinzufügen. Danach **Edit** → **Redirect to** → `dominikjaekel.de`.
2. Entfällt (die Umlaut-Domain wird nicht gekauft; Dominik, 24.10.). ~~Ebenso die Umlaut-Domain, aber als Punycode eintragen: `xn--dominikjkel-s8a.de`. Vercel nimmt Umlaute nicht direkt an und meldet sonst „invalid“ (Vercel-Docs und Community, nur Suche).~~
3. Entfällt (nicht gekauft). ~~Ebenso `dominik-jaekel.de`, falls gekauft.~~
4. **Statuscode:** 308 wählen, also dauerhaft (301 geht auch). Laut Vercel-Docs lässt sich der Statuscode beim Bearbeiten der Domain wählen (nur Suche); laut anderen Berichten ist 307 voreingestellt (nur Suche). Gibt es nur 307: so lassen und in der Rückmeldung nennen. Die Cloud-Sitzung entscheidet dann, ob sie es im Code löst.
5. Das Dropdown „Redirect to“ zeigt nur Domains, die schon im Projekt sind. Deshalb zuerst `dominikjaekel.de` anlegen.
6. www ist bei den Zusatzdomains nicht nötig. Wer will, legt `www.dominikjaekel.com` zusätzlich an, ebenfalls mit Weiterleitung.
7. Hobby erlaubt 50 Domains je Projekt (Vercel-Docs, nur Suche). Das reicht bequem. Vercel verlangt pro Domain nichts.
8. Ob der Pfad bei der Weiterleitung erhalten bleibt (`dominikjaekel.com/vita` → `dominikjaekel.de/vita`), ist nur aus Berichten bekannt (nur Suche). Schritt 8 prüft es.

### 6.3 Satoshi-Domain auf /satoshi (nur, wenn gekauft)

1. **Im Dashboard keine Weiterleitung einstellen.** „Redirect to“ nimmt nur eine Domain, keinen Pfad. Außerdem greift eine Weiterleitung im Dashboard laut Berichten vor der Regel im Code, die Regel käme dann nie zum Zug (nur Suche).
2. Die Weiterleitung auf `/satoshi` geht nur über eine Regel in `vercel.json`. Die schreibt die Cloud-Sitzung. Dominik schickt ihr dazu diese Nachricht, mit den tatsächlich gekauften Namen:

   > „Bitte in `website-c/vercel.json` eine Weiterleitung mit Host-Bedingung einbauen: `satoshinakamoto.de` und `www.satoshinakamoto.de` → `https://dominikjaekel.de/satoshi`, `permanent: true` (308), `source` `"/(.*)"` (nicht `"/:path*"`, das erfasst die Startseite nicht). Danach neu bauen und pushen. Bitte auch den Hinweis oben auf /satoshi einbauen, dass die Seite nicht von Satoshi Nakamoto stammt.“

3. **Reihenfolge: erst die Regel, dann die Domain.** Die Domain erst ins Projekt aufnehmen, wenn das Deployment mit der Regel online ist. Sonst zeigt sie bis dahin die ganze Website unter dem fremden Namen (Folgerung, nicht geprüft). Dann `satoshinakamoto.de` und `www.satoshinakamoto.de` normal hinzufügen, verbunden mit Production, ohne Weiterleitung.
4. Die Regel wirkt nur im echten Deployment, nicht lokal (Vercel-Docs, nur Suche). Geprüft wird sie in Schritt 8.
5. Will Dominik nur, dass die Domain auf der Startseite landet, reicht die normale Weiterleitung aus 6.2. Dann ist keine Code-Änderung nötig.

### 6.4 DNS beim Registrar

Vercel zeigt bei jeder Domain auf der Domain-Karte, was einzutragen ist. **Immer genau die Werte von dort nehmen,** nicht Werte aus dem Gedächtnis oder aus dieser Anleitung. Vercel prüft auf genau diesen Wert.

- Zur Einordnung (nur Suche): Für viele Projekte ist der A-Wert `76.76.21.21`. Neuere Projekte bekommen projektbezogene Werte, zum Beispiel `216.198.79.1` und als CNAME etwa `…vercel-dns-017.com`.

**Empfehlung heute: Weg B.** Grund: Bei .de prüft die DENIC vor einer Umstellung der Nameserver, ob die neuen Nameserver die Domain schon richtig ausliefern (DENIC-Docs „Nameserver Predelegation Check“, nur Suche). Ein Thread in der Vercel-Community berichtet, dass ein Registrar die Umstellung einer .de-Domain auf Vercel deshalb abgelehnt hat (nur Suche). Weg B umgeht das, und alle Einträge liegen an einer Stelle beim Registrar.

**Weg A: Nameserver auf Vercel umstellen.** Beim Registrar die Nameserver aller Domains auf die Werte setzen, die Vercel anzeigt (laut Docs `ns1.vercel-dns.com` und `ns2.vercel-dns.com`, nur Suche). Vercel legt die Einträge dann selbst an.
- Die Seite nutzt heute keine E-Mail-Adresse unter der eigenen Domain (im Repo nachgesehen). Es gehen also keine E-Mail-Einträge verloren.
- Spätere Einträge, etwa für die Google Search Console, legt man dann in Vercel an.
- Lehnt der Registrar die neuen Nameserver ab, prüfen, ob die Domain schon in Vercel hinzugefügt ist, und es dann erneut versuchen. Klappt es nicht, Weg B nehmen.

**Weg B: Einträge beim Registrar setzen.** Je Domain einen A-Eintrag für `@` (die Domain selbst) und, wo www gebraucht wird, einen CNAME für `www`, mit den Werten von Vercel. Bei drei Domains sind das etwa vier Einträge.

**Bei beiden Wegen:**
1. Vom Registrar gesetzte Standard-Einträge einer Parkseite (A, AAAA, CNAME) entfernen. Vorhandene E-Mail-Einträge (MX) bleiben (Vercel-Docs Troubleshooting, nur Suche).
2. Gibt es CAA-Einträge (sie legen fest, wer Zertifikate ausstellen darf), muss `0 issue "letsencrypt.org"` dabei sein. Gibt es keine, ist nichts zu tun (nur Suche).
3. Jede Änderung beim Registrar speichert Dominik selbst oder nach seinem Ja (Regel 1).
4. Dominik sagen, welcher Weg gewählt wurde. Der gleiche Weg für alle Domains ist am übersichtlichsten.

### 6.5 Warten auf „Valid Configuration“ und Zertifikat

1. Jede Domain braucht einzeln „Valid Configuration“, auch die Weiterleitungsdomains. Jede bekommt ein eigenes Zertifikat. Grund: Bei `http://` stellt Vercel erst auf https um und leitet dann weiter (Community, nur Suche).
2. Vercel stellt die HTTPS-Zertifikate automatisch über Let's Encrypt aus und erneuert sie automatisch (Vercel-Docs, nur Suche).
3. Eine offizielle Dauer gibt es nicht. Sie hängt davon ab, wann das DNS überall sichtbar ist. Meist sind es Minuten, manchmal Stunden; belegt ist das nicht.
4. Die Wartezeit für Schritt 7 nutzen, falls er noch offen ist.

## Schritt 7: Angaben für die Datenschutzerklärung

Am besten gleich nach Schritt 2 erledigen (siehe Ablauf). Die Datenschutzerklärung hat noch Platzhalter zu Vercel. Die Cloud-Sitzung konnte vercel.com nicht öffnen. Diese Sitzung liest die Angaben in den aktuellen Unterlagen von Vercel nach, mit Link, nicht aus dem Gedächtnis:

1. vollständiger Name und Anschrift von Vercel als Anbieter, laut Privacy Policy oder Impressum von Vercel,
2. Link zur Privacy Policy von Vercel,
3. was Vercel beim Ausliefern einer Seite speichert (Server-Logs mit IP-Adresse?) und wie lange,
4. ob Vercel unter dem EU-US Data Privacy Framework zertifiziert ist (Eintrag auf dataprivacyframework.gov) und ob zusätzlich Standardvertragsklauseln gelten,
5. ob das Data Processing Addendum (Auftragsverarbeitungsvertrag) für Hobby-Konten gilt. Die Datenschutzerklärung hat für Hobby schon eine Fassung „kein Vertrag geschlossen“; die Angabe dient nur zur Kontrolle.
6. in welcher Region die Seite ausgeliefert wird. Die Function Region spielt keine Rolle, die Seite hat keine Functions.

**Erledigt (24. Oktober).** Zwischenmeldung 2 der Vercel-Sitzung vom 24.10.2026 (Quellen am 22. und 24.10. live gelesen) ist in `website-c/datenschutz.html` eingetragen: (1) Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA (Privacy Policy, „Contact Us“, Stand 1. Juni 2026); (2) Verweis auf https://vercel.com/legal/privacy-policy; (3) Server-Logs ohne feste Frist (Vercel nennt nur „minimum necessary period“; die Runtime-Logs im Dashboard betreffen nur Functions, die Seite hat keine): „nur so lange, wie es für den Betrieb und den Schutz vor Missbrauch erforderlich ist“; (4) EU-US Data Privacy Framework, Vercel aktiv zertifiziert (dataprivacyframework.gov, Re-Zertifizierung fällig 29.04.2027), der Satz zu den Standardvertragsklauseln ist gestrichen; (5) DPA nur für Pro und Enterprise, im Datenschutz die Fassung für Hobby („kein Vertrag geschlossen“), `TARIF = 'hobby'`; (6) Region: weltweites CDN ohne Beschränkung auf die EU, gedeckt durch den Satz zur Übermittlung in die USA. Die endgültige Fassung ist gebaut (`veroeffentlichen.py` ohne `--entwurf`, beide Prüfprogramme ohne Fehler).

**Zwischenmeldung 2 (Datenschutz) an Dominik für die Cloud-Sitzung:** diese Angaben mit Links. Damit setzt die Cloud-Sitzung den Tarif Hobby im Code, füllt die Platzhalter und baut die endgültige Fassung. Schon erledigt (Dominik, 24. Oktober): Impressum und Datenschutz sind freigegeben, die 65 Länder bleiben, Simon-Kucher bleibt in der Vita. Die Cloud-Sitzung hat die Vercel-Angaben ebenfalls zu recherchieren versucht, vercel.com war für sie aber gesperrt; die hier gelesenen Angaben mit Link sind darum die Grundlage.

## Schritt 8: Prüfliste

Zuerst nach dem Verbinden, dann noch einmal, wenn die endgültige Fassung online ist. Ob sie online ist, zeigt Vercel unter Deployments: Status „Ready“, Production, mit dem Commit, den die Cloud-Sitzung nennt.

**Im Browser:**
1. Startseite: Der erste Satz und der Globus erscheinen, der Globus bewegt sich.
2. Alle Seiten aus der Navigation laden, ebenso Impressum und Datenschutz im Fuß.
3. Eine falsche Adresse, etwa `/gibtesnicht`, zeigt die eigene Fehlerseite.
4. Die Adressen enden nicht auf `.html` (`/satoshi`, `/vita`). `/satoshi.html` springt auf `/satoshi`, auch mit Anker (`/satoshi.html#…`). `/index.html` springt auf `/`.
5. Das Schloss-Symbol erscheint, die Seite läuft über HTTPS.
6. Die Vercel-Toolbar erscheint auf der echten Seite nicht.
7. **Telefon:** Dominik öffnet die Seite auf seinem iPhone. Sie sieht ordentlich aus.

**Im Terminal** (nur Lesen). Dieses Skript zeigt für jede Adresse den ersten Sprung und das Ende. Nur gekaufte Domains in der Liste lassen:

```sh
for u in \
  https://dominikjaekel.de/vita \
  https://www.dominikjaekel.de/vita \
  http://dominikjaekel.de/vita \
  https://dominikjaekel.com/vita \
  http://dominikjaekel.com/vita \
  https://xn--dominikjkel-s8a.de/vita
do
  printf '%s\n  erster Sprung: ' "$u"
  curl -sI -m 20 "$u" | grep -iE '^(HTTP/|location:)' | tr -d '\r' | tr '\n' ' '
  printf '\n  Ende: '
  curl -sIL -m 30 -o /dev/null -w '%{http_code} %{url_effective}\n' "$u"
done
```

- Erwartet wird als Ende jedes Mal `200 https://dominikjaekel.de/vita`.
- Der erste Sprung sollte 308 (oder 301) sein. Steht dort 307, in der Rückmeldung nennen.
- Bei `http://` sind es zwei Sprünge: erst auf https, dann auf `dominikjaekel.de`.
- Gekaufte weitere Domains (etwa `dominik-jaekel.de`) in die Liste aufnehmen.
- Für eine Satoshi-Domain stattdessen `https://satoshinakamoto.de/` und `https://satoshinakamoto.de/irgendwas` prüfen. Beide müssen auf `https://dominikjaekel.de/satoshi` enden.
- Meldet curl einen Zertifikatsfehler, ist das Zertifikat noch nicht fertig. Warten.

Dazu einzeln:

```sh
curl -sI https://dominikjaekel.de/satoshi.html | grep -iE '^(HTTP/|location:)'   # 308, Location /satoshi
curl -sI https://dominikjaekel.de/index.html   | grep -iE '^(HTTP/|location:)'   # 308, Location /
curl -sI https://dominikjaekel.de/gibtesnicht  | head -1                          # 404
curl -sI https://dominikjaekel.de/ | grep -i '^content-security-policy'           # Zeile muss da sein
curl -s  https://dominikjaekel.de/robots.txt                                       # nennt die Sitemap
curl -sI https://dominikjaekel.de/sitemap.xml  | head -1                          # 200
curl -s https://dominikjaekel.de/impressum https://dominikjaekel.de/datenschutz | grep -c 'ZU PRÜFEN'   # endgültige Fassung: 0
```

## Schritt 9: Nach dem Livegang

Erst, wenn die endgültige Fassung unter `https://dominikjaekel.de` online ist.

1. **Google Search Console** (Dominik meldet sich mit seinem Google-Konto an):
   - Eine **Domain-Property** für `dominikjaekel.de` anlegen, ohne `https://`. „Property“ heißt dort der Eintrag für eine Website. Die Domain-Property deckt www, http und https ab.
   - Bestätigt wird über DNS: einen TXT-Eintrag mit Host `@` oder leer und dem Wert, der mit `google-site-verification=` beginnt. Bei Weg A in Vercel anlegen, bei Weg B beim Registrar. Auf der Seite selbst ändert sich nichts.
   - Laut Google kann die Bestätigung bis zu 48 Stunden dauern. Den Eintrag danach stehen lassen (nur Suche).
   - Unter **Sitemaps** `https://dominikjaekel.de/sitemap.xml` einreichen.
   - Wahlweise über die URL-Prüfung „Indexierung beantragen“ für `/`, `/satoshi` und `/ursprung`. Dafür gibt es ein Tageskontingent (nur Suche).
   - Die Weiterleitungsdomains nicht als eigene Property anlegen.
2. **Bing, wahlweise:** In den Bing Webmaster Tools „Import“ aus der Search Console wählen. Dann ist die Seite ohne eigene Bestätigung dabei, die Sitemap wird übernommen (nur Suche).
3. **Zeitstempel im Internet Archive** (`docs/todo.md`, nach dem Livegang): Diese Adressen einmal im Browser aufrufen. Jede legt einen datierten Schnappschuss an:
   - https://web.archive.org/save/https://dominikjaekel.de/satoshi
   - https://web.archive.org/save/https://dominikjaekel.de/ursprung
   - https://web.archive.org/save/https://dominikjaekel.de/

   Danach unter https://web.archive.org/web/*/dominikjaekel.de/* nachsehen, ob sie da sind.
4. **Später, nicht heute:** Dominik benennt den Branch in GitHub in `main` um und stellt in Vercel den Production Branch auf `main`. Das macht er selbst. Vorher mit der Cloud-Sitzung absprechen, weil sie auf diesen Branch pusht.

## Schritt 10: Rückmeldung an Dominik (für die Cloud-Sitzung)

Am Ende eine kurze Zusammenfassung, die Dominik der Cloud-Sitzung weitergibt:

1. **Domains:** welche gekauft sind, bei wem, mit Preis; welche verbunden sind und „Valid Configuration“ und Zertifikat haben; der Statuscode der Weiterleitungen (308 oder 307).
2. **Satoshi:** Dominiks Entscheidung, gegebenenfalls TMview-Ergebnis und ob die Regel in `vercel.json` wirkt.
3. **DNS:** Weg A oder B und die Werte, die Vercel angezeigt hat.
4. **Projekt:** Projektname und die Adresse `…vercel.app`; ob ein Deployment „Blocked“ war (Schritt 1.5).
5. **Einstellungen:** Tarif Hobby, Framework Preset, Root Directory, Build leer, Production Branch, Ignored Build Step, Deployment Protection, Analytics, Speed Insights und Toolbar aus.
6. **Datenschutz:** die Angaben aus Schritt 7 mit Links, falls noch nicht mit Zwischenmeldung 2 geschickt.
7. **Prüfung:** die Ausgabe der Terminal-Prüfung und was im Browser aufgefallen ist (Seite, Gerät, was genau).
8. **Nach dem Livegang:** Stand von Search Console, Sitemap und Archiv-Schnappschüssen.
9. Alles, was anders lief als in dieser Anleitung.

## Quellen

Aus der Recherche der Cloud-Sitzung vom 24.10.2026. Alle nur Suche, außer markiert.

- Vercel: [Deploying & Redirecting Domains](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting), [Add a domain to a project (API)](https://vercel.com/docs/rest-api/projects/add-a-domain-to-a-project), [Supported domains](https://vercel.com/docs/domains/supported-domains), [Changes to supported TLD registrations](https://vercel.com/changelog/changes-to-supported-tld-registrations), [Sonderzeichen in Domains](https://vercel.com/kb/guide/how-can-i-use-special-characters-in-my-custom-domain), [A-Eintrag und CAA](https://vercel.com/kb/guide/a-record-and-caa-with-vercel), [Troubleshooting](https://vercel.com/docs/domains/troubleshooting), [SSL](https://vercel.com/docs/domains/working-with-ssl), [Hobby](https://vercel.com/docs/plans/hobby), [Limits](https://vercel.com/docs/limits), [Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines), [Redirects mit Host-Bedingung](https://vercel.com/docs/redirects/configuration-redirects), [Redirects, Statuscode bei Domain-Weiterleitung](https://vercel.com/docs/routing/redirects), [Zusammenarbeit im Hobby-Tarif](https://docs.vercel.com/docs/deployments/troubleshoot-project-collaboration), [Community: gesperrte Hobby-Deployments](https://community.vercel.com/t/vercel-hobby-plan-deployment-blocked-because-commit-author-lacks-access/35446), [Community: DENIC und .de](https://community.vercel.com/t/denic-nast-validation-needed-for-de-domain-restaos-de/39377)
- Vercel-Code (gelesen): `packages/routing-utils/src/schemas.ts` im Repository vercel/vercel; Vercel CLI 65.2.0 von npm (Befehle `domains check`, `price` und `search` ohne Token, mehrere Domains je Aufruf, Abschalten der Telemetrie mit `VERCEL_TELEMETRY_DISABLED`). Die Regel mit `"/(.*)"` hat die Cloud-Sitzung mit @vercel/routing-utils 6.6.0 nachgebildet: `/` wird erfasst, mit `"/:path*"` nicht.
- GitHub (gelesen): Repository öffentlich, Inhaber ein persönliches Konto (GitHub-API, 24.10.2026).
- DENIC: [Nameserver Predelegation Check](https://docs.denic.de/en/Content/DENIC-23/Nameserver_Predelegation_Check.htm); [DENIC-Domainbedingungen](https://www.denic.de/fileadmin/Downloads/Rechtliches/DENIC-Domainbedingungen_DE.pdf)
- Registrare: [INWX .de](https://www.inwx.de/en/de-domain), [INWX .com](https://www.inwx.com/en/com-domain), [INWX-Hilfe zur E-Mail-Bestätigung](https://kb.inwx.com/en-us/22-contact-verification/62-how-much-time-do-i-have-to-verify-my-e-mail-address), [netcup](https://www.netcup.com/de/domain/domain-kaufen), [Hetzner](https://www.hetzner.com/webhosting/), [Strato-FAQ Umlaut-Domains](https://www.strato.de/faq/domains/Was-muss-ich-bei-Umlautdomains-beachten/); Cloudflare-Docs `registrar/top-level-domains` (gelesen)
- Recht: § 12 BGB und §§ 5, 14 MarkenG (gelesen, Kopie aus GitHub bundestag/gesetze); BGH „maxem.de“ ([lexetius](https://lexetius.com/2003,1934)); [UK-Markenanmeldung](https://www.ipo.gov.uk/t-tmj/tm-journals/2025-039/UK00004257849.html); [TMview](https://www.tmdn.org/tmview/)
- Google: [Search Console, Domain-Property](https://support.google.com/webmasters/answer/9008080), [Sitemap einreichen](https://support.google.com/webmasters/answer/7451001)
