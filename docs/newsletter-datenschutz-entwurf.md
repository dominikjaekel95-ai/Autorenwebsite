# Newsletter im Datenschutz: Entwurf für später

Stand: 21. Oktober 2026. Zum Start ist der Newsletter ausgeblendet (Dominik: „Newsletter erstmal ausblenden“). Die Zeile im Fuß steht deshalb auf keiner Seite, und der Abschnitt „Newsletter“ ist aus `website-c/datenschutz.html` genommen. Hier steht er im Wortlaut, wie er bis dahin in der Datenschutzerklärung stand, damit er beim Einschalten zurückkommt.

## So kommt der Newsletter zurück

1. Einen Newsletter-Dienst wählen. Er braucht einen Vertrag zur Auftragsverarbeitung und das Double-Opt-in-Verfahren.
2. Den Abschnitt unten in `website-c/datenschutz.html` zwischen „E-Mail“ und „Ihre Rechte“ einsetzen. Den Satz „Welcher Dienst das sein wird, steht noch nicht fest …“ durch Name und Anschrift des Diensts ersetzen, dazu Speicherort und gegebenenfalls die Grundlage für die Übermittlung in ein Drittland. Den letzten Absatz („Im Testsystem …“) streichen.
3. In `website-c/seite.js` `NEWSLETTER = false` auf `true` setzen. Das Formular so anbinden, dass es an den Dienst schickt, und in `POST_DANKE` einen Dank eintragen, der zum Dienst passt, etwa zur Bestätigungsmail. `POST_DANKE` ist zum Start leer, damit das Wort „Testsystem“ nicht in der ausgelieferten `seite.js` steht; im Testsystem hieß der Dank „Danke. Im Testsystem wird noch nichts verschickt.“ `veroeffentlichen.py` baut nicht, solange `NEWSLETTER` true und `POST_DANKE` leer ist.
4. Schickt das Formular an einen fremden Server, braucht `website-c/vercel.json` dessen Adresse in `form-action` (oder, wenn das Skript sendet, in `connect-src`) der Content-Security-Policy.
5. `website-c/werkzeuge/veroeffentlichen.py` baut nicht, solange `NEWSLETTER` true ist und der Abschnitt `id="d-newsletter"` im Datenschutz fehlt.

## Der Abschnitt (HTML, wie er in `datenschutz.html` stand)

```html
    <section aria-labelledby="d-newsletter">
      <h2 class="titel" id="d-newsletter">Newsletter</h2>
      <p>Wenn Sie sich am Ende einer Seite für den Newsletter eintragen, speichert ein Newsletter-Dienst Ihre <span class="nw">E-Mail-Adresse</span>, damit ich Ihnen Nachrichten zu neuen Büchern und Lesungen schicken kann. Welcher Dienst das sein wird, steht noch nicht fest. Er wird an dieser Stelle genannt, bevor das Formular in Betrieb geht. Rechtsgrundlage ist Ihre Einwilligung <span class="nw">(Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;a DSGVO)</span>.</p>
      <p>Die Anmeldung gilt erst, wenn Sie sie bestätigen: Dazu erhalten Sie zuerst eine <span class="nw">E-Mail</span> mit einem Link (Double-Opt-in-Verfahren). Ihre Einwilligung können Sie jederzeit widerrufen, über den Link zum Abmelden in jeder <span class="nw">E-Mail</span> oder mit einer <span class="nw">E-Mail</span> an <a href="mailto:dominik.jd.jaekel@gmail.com">dominik.jd.jaekel@gmail.com</a>. Ihre Adresse wird dann gelöscht.</p>
      <p>Im Testsystem hat das Formular noch keine Funktion. Es werden keine Daten übermittelt.</p>
    </section>
```

## Derselbe Text zum Lesen

**Newsletter**

Wenn Sie sich am Ende einer Seite für den Newsletter eintragen, speichert ein Newsletter-Dienst Ihre E-Mail-Adresse, damit ich Ihnen Nachrichten zu neuen Büchern und Lesungen schicken kann. Welcher Dienst das sein wird, steht noch nicht fest. Er wird an dieser Stelle genannt, bevor das Formular in Betrieb geht. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).

Die Anmeldung gilt erst, wenn Sie sie bestätigen: Dazu erhalten Sie zuerst eine E-Mail mit einem Link (Double-Opt-in-Verfahren). Ihre Einwilligung können Sie jederzeit widerrufen, über den Link zum Abmelden in jeder E-Mail oder mit einer E-Mail an dominik.jd.jaekel@gmail.com. Ihre Adresse wird dann gelöscht.

Im Testsystem hat das Formular noch keine Funktion. Es werden keine Daten übermittelt.

## Die Zeile im Fuß (steht in `seite.js`, `POST_ZEILE`)

„Benachrichtigung, wenn ein Buch erscheint oder eine Lesung ansteht:“, dahinter das Feld mit dem Platzhalter „E-Mail-Adresse“ und das Wort „Eintragen“. Gestaltung in `docs/gestaltung-website-c.md`, 6.2, und `website-c/stil.css` (`.post`).
