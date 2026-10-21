# Vercel einrichten: Anleitung für eine zweite Claude-Sitzung

Diese Anleitung ist für eine Claude-Sitzung auf Dominiks Computer (Claude-Desktop-App oder `claude remote-control`), die Dominik beim Einrichten im Browser hilft. Der Code der Website kommt von einer anderen Sitzung in der Cloud. Diese Sitzung hier ändert keine Dateien im Repository.

## Worum es geht

- **Website:** die Autorenwebsite von Dominik Jäkel, eine statische Seite aus HTML, CSS und JavaScript ohne Build-Schritt. Schriften und Programmbibliotheken liegen mit im Ordner, die Seite lädt nichts von fremden Servern.
- **Repository:** `dominikjaekel95-ai/Autorenwebsite` auf GitHub, Branch `claude/laughing-sagan-4dlccv`. Es ist der einzige und der Standard-Branch.
- **Was online geht:** der Ordner `veroeffentlichung/` im Repository. Die Cloud-Sitzung erzeugt ihn aus `website-c/` mit Konfiguration (`vercel.json`), Fehlerseite, robots.txt und Sitemap. Gibt es den Ordner noch nicht, zuerst die Domain erledigen (Schritt 3) und Dominik Bescheid geben. Er sagt der Cloud-Sitzung, dass der Ordner gebraucht wird.
- **Ziel:** die Seite unter `https://dominikjaekel.de` live, bis Freitag oder Samstag.

## Regeln für diese Sitzung

1. **Anmelden, Zugriffe erlauben und Bezahlen macht Dominik selbst.** Vor jedem Kauf und jeder Bestätigung stoppen und ihn fragen. Passwörter, Tokens und Zahlungsdaten nie in den Chat schreiben lassen.
2. **Im Repository nichts ändern, nichts committen und nichts pushen.** Ist im Code etwas nötig, etwa an `vercel.json`, schreibt Dominik es der Cloud-Sitzung. Sonst entstehen Konflikte.
3. **Nichts einschalten, was Daten über Besucher sammelt oder Cookies setzt.** Dazu gehören Vercel Web Analytics, Speed Insights, Kommentare und die Toolbar auf der echten Seite. Die Datenschutzerklärung sagt, dass es kein Tracking gibt.
4. **Unsicherheiten nicht überspielen.** Weicht in Vercel etwas von dieser Anleitung ab, weil die Oberfläche sich ändert, die Abweichung beschreiben und die naheliegende Wahl vorschlagen.

## Schritt 1: Projekt in Vercel anlegen

Dominik hat schon ein Vercel-Konto.

1. In Vercel: **Add New… → Project**.
2. **Import Git Repository:** `dominikjaekel95-ai/Autorenwebsite` wählen. Fehlt das Repository in der Liste, über **Adjust GitHub App Permissions** der Vercel-App Zugriff auf genau dieses Repository geben. Das bestätigt Dominik.
3. **Configure Project:**
   - **Project Name:** `dominikjaekel` oder ähnlich
   - **Framework Preset:** `Other`
   - **Root Directory:** `veroeffentlichung`
   - **Build and Output Settings:** Build Command leer lassen, gegebenenfalls Override einschalten und leer lassen. Install Command leer. Output Directory leer lassen. Besteht Vercel auf einem Wert, `.` eintragen.
   - **Environment Variables:** keine.
4. **Deploy.** Danach die Adresse `…vercel.app` öffnen und prüfen:
   - Startseite: Der erste Satz fliegt ein, der Globus erscheint und bewegt sich.
   - Alle Seiten aus der Navigation laden, ebenso Impressum und Datenschutz im Fuß.
   - Eine falsche Adresse, etwa `/gibtesnicht`, zeigt die eigene Fehlerseite.
   - Auf dem Telefon sieht die Seite ordentlich aus. Dominik öffnet sie dafür am besten auf seinem iPhone.

## Schritt 2: Einstellungen im Projekt

1. **Settings → Git → Production Branch:** `claude/laughing-sagan-4dlccv` (ist meist schon voreingestellt).
2. **Settings → Git → Ignored Build Step:** „Only build if there are changes in a folder“ wählen, bezogen auf das Root Directory. Falls ein Befehl verlangt ist: `git diff HEAD^ HEAD --quiet -- .`
   - Grund: Die Cloud-Sitzung pusht oft Zwischenstände in `website-c/`. Online gehen soll nur, was sie bewusst nach `veroeffentlichung/` legt.
3. **Settings → Deployment Protection:** Die Standardeinstellung lassen, bei der Vorschauen geschützt sind und die echte Seite öffentlich ist.
4. **Analytics, Speed Insights, Toolbar:** aus lassen (siehe Regel 3). Die Toolbar für Production unter Settings → General abschalten, falls sie dort an ist.

## Schritt 3: Domain dominikjaekel.de

1. **Prüfen, ob die Domain frei ist.** Entweder direkt in Vercel unter **Domains → Buy**, falls Vercel `.de` anbietet, oder bei einem deutschen Registrar wie INWX oder United Domains. Kaufen erst nach Dominiks Ja (Regel 1).
2. **Im Projekt:** Settings → Domains → `dominikjaekel.de` hinzufügen, dann `www.dominikjaekel.de` mit Weiterleitung auf `dominikjaekel.de`.
3. **DNS:**
   - **Bei Kauf in Vercel:** Vercel stellt die Einträge selbst ein.
   - **Bei einem anderen Registrar:** Dort die Einträge setzen, die Vercel unter Domains anzeigt. Üblich sind ein A-Eintrag für `@` auf die von Vercel genannte IP und ein CNAME für `www` auf das von Vercel genannte Ziel. Immer die Werte nehmen, die Vercel im Projekt anzeigt, nicht Werte aus dem Gedächtnis.
4. **Warten,** bis Vercel bei beiden Domains „Valid Configuration“ zeigt und das HTTPS-Zertifikat ausgestellt ist. Das dauert meist Minuten, manchmal einige Stunden.

## Schritt 4: Angaben für die Datenschutzerklärung sammeln

Die Cloud-Sitzung schreibt den Absatz über das Hosting. Dafür braucht sie geprüfte Angaben aus den aktuellen Unterlagen von Vercel, nicht aus dem Gedächtnis:

- vollständiger Name und Anschrift von Vercel als Anbieter, laut Privacy Policy oder Impressum von Vercel,
- ob Vercel unter dem EU-US Data Privacy Framework zertifiziert ist (Eintrag auf dataprivacyframework.gov) und
  ob zusätzlich Standardvertragsklauseln gelten,
- Link zum Auftragsverarbeitungsvertrag (Data Processing Addendum) und ob er für Hobby-Konten automatisch gilt oder abgeschlossen werden muss,
- was Vercel beim Ausliefern einer Seite speichert (Server-Logs mit IP-Adresse? wie lange?),
- in welcher Region die Seite ausgeliefert wird. Die Function Region spielt hier keine Rolle, die Seite hat keine Functions.

## Schritt 5: Rückmeldung an Dominik (für die Cloud-Sitzung)

Am Ende eine kurze Zusammenfassung für Dominik, die er der Cloud-Sitzung weitergibt:

- Adresse der Seite bei Vercel (`…vercel.app`) und ob `dominikjaekel.de` und `www` verbunden sind,
- die gesetzten Einstellungen (Root Directory, Production Branch, Ignored Build Step, Analytics aus),
- die Angaben aus Schritt 4 mit Links,
- was beim Prüfen der Seite aufgefallen ist (Seite, Gerät, was genau),
- alles, was anders lief als in dieser Anleitung.

Mit diesen Angaben setzt die Cloud-Sitzung die endgültige Adresse in Sitemap, robots.txt und Vorschaubild ein und vervollständigt die Datenschutzerklärung.
