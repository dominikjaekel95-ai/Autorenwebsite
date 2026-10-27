#!/usr/bin/env python3
"""Baut aus website-c/ (Version C) den Ordner veroeffentlichung/, den Vercel ausliefert (Root Directory „veroeffentlichung“,
Framework „Other“, kein Build-Schritt; docs/vercel-einrichtung.md). Vercel baut nur neu, wenn sich in veroeffentlichung/ etwas
ändert. Darum entsteht der Ordner nur mit diesem Werkzeug, als bewusster, geprüfter Stand. Von Hand wird darin nichts geändert.

Aufruf (aus einem beliebigen Ordner):
  python3 website-c/werkzeuge/veroeffentlichen.py              die echte Veröffentlichung
  python3 website-c/werkzeuge/veroeffentlichen.py --entwurf    auch mit offenen [[ZU PRÜFEN …]]-Stellen; nennt sie alle
  … --ziel <ordner>                                             woanders hin bauen, etwa zum Ausprobieren
  … --platzhalter                                               für diesen Bau die Platzhalter-Ausgabe, gleich, was AUSGABE sagt
  … --website                                                   für diesen Bau die volle Website, gleich, was AUSGABE sagt

Die Adresse der Website steht an genau einer Stelle: BASIS_URL unten. Aus ihr entstehen Canonical, Open Graph, die
strukturierten Daten, sitemap.xml und robots.txt. Ändert sich die Domain, nur BASIS_URL ändern und neu bauen.

Schalter oben im Werkzeug: TARIF (Tarif bei Vercel, 'pro' oder 'hobby'; None, solange er offen ist) wählt den Absatz zur
Auftragsverarbeitung im Datenschutz (Runde 6, S8). AUSGABE ('website' oder 'platzhalter', 27. Oktober) wählt, was ausgeliefert
wird. Er steht auf 'platzhalter', solange die Website offline ist (Dominik: „Können wir sie wieder offline nehmen?“): so bringt
ein Bau ohne Zusatz nicht aus Versehen die volle Website zurück. Zurück zur vollen Website: AUSGABE = 'website' und neu bauen;
die volle Website bleibt dabei Byte für Byte, wie sie vor dem Schalter war.

Zwei Ausgaben aus derselben Quelle (27. Oktober). Dominik: „Können wir sie wieder offline nehmen? Ich würde einfach einen
Platzhalter auf der Startseite. […] Einfach eine einzelne indizierte Seite ohne Verlinkungen.“ und „Dann brauche ich getrennt davon
eine Seite für Satoshi. Das bleibt. Das ist das sogenannte digitale Exposé.“
  - 'website': die volle Website mit den elf Seiten, wie unten beschrieben. platzhalter.html geht nicht mit.
  - 'platzhalter': nur fünf Seiten. Unter / steht platzhalter.html (als index.html; der erste Bildschirm der Startseite ohne Menü,
    darunter „Seite im Aufbau.“), unter /satoshi das digitale Exposé, dazu /impressum, /datenschutz und 404.html. Indiziert und in
    der Sitemap ist nur /; das Exposé, Impressum und Datenschutz tragen noindex (auch als X-Robots-Tag in vercel.json). Alle
    übrigen Adressen der elf Seiten, mit und ohne .html, leitet vercel.json mit 307 (nicht dauerhaft, damit ein späterer Neustart
    ohne Altlasten geht) auf / weiter. Strukturierte Daten nur auf /: Person, knapp (Name, Adresse, Beruf), ohne Kurzvita und Werke.
    Aus daten/ und bilder/ geht nur mit, worauf eine ausgelieferte Seite, ein Stil oder ein eigenes Skript verweist (ohne Kommentare
    gelesen); Schriften mit Lizenzen, Bibliotheken, Kern und Icons gehen ganz mit. Vorher prüft der Bau, dass platzhalter.html den
    Kopf, den ersten Satz mit Skript und Stilen und die Zeile Impressum/Datenschutz Zeichen für Zeichen aus index.html übernimmt und
    dass ihre Stationen (nur Breite, Länge, Aufenthalt) zu INHALT.leben in daten/inhalt.js passen. Im Bau der vollen Website
    prüft er das auch und nennt Abweichungen als Hinweis, ohne abzubrechen.
    Verweise (Dominik: „ohne Verlinkungen“; Impressum und Datenschutz bleiben, § 5 DDG und DSGVO): Der Bau prüft je Seite, wohin
    ihre Verweise führen dürfen (VERWEISE_PLATZHALTER): / nur auf Impressum und Datenschutz; das Exposé nur auf sich selbst (Anker),
    Impressum, Datenschutz, die Adresse für Anfragen und nach außen; Impressum, Datenschutz und 404.html nur auf /, Impressum,
    Datenschutz, die Adresse für Anfragen und nach außen. Auf /satoshi verweist so keine andere Seite: den Link gibt der Autor
    weiter. Verweise, die erst ein Skript im Browser setzt, sieht der Bau nicht; darum vor jedem Livegang auch das Prüfprogramm
    im Browser laufen lassen (docs/todo.md).
  - In beiden setzt der Bau die Markierungen in den Seiten um (artefakt.ausgabe_umsetzen; erklärt auf satoshi.html):
    data-nur="website" nur in der vollen Website, data-nur="expose" nur im Platzhalter, data-verweis="website" ein Verweis, der im
    Platzhalter reiner Text wird. Danach steht keine Markierung mehr da (geprüft).

Was der Bau tut:
  - Er kopiert website-c/ ohne werkzeuge/, README.md, versteckte Dateien und ohne Bilder aus bilder/, auf die nichts verweist.
    Alle Seiten behalten ihr Gerüst (<!doctype>, <html>, <head>, <body>), auch index.html.
  - Aus HTML, CSS und den eigenen Skripten (nicht aus lib/) entfernt er alle Kommentare, wie werkzeuge/artefakt.py.
  - Adressen ohne .html (Runde 6, S6): vercel.json hat "cleanUrls": true, Vercel liefert vita.html unter /vita aus und leitet
    /vita.html (auch /vita.html/) mit 308 dorthin weiter, ebenso /index.html auf /. Der Bau schreibt darum jeden internen
    Verweis auf eine der elf Seiten um, „vita.html“ und „/vita.html“ auf „/vita“, „index.html“ auf „/“, Anker bleiben
    („bibliothek.html#zeit-1“ wird „/bibliothek#zeit-1“): in href der Seiten und in den Zeichenketten der eigenen Skripte
    (FSeite.SEITEN in seite.js). In website-c/ bleiben die .html-Verweise, der Testlink auf claude.ai braucht sie.
  - Im Datenschutz lässt er nach TARIF eine der beiden Fassungen des Absatzes zur Auftragsverarbeitung stehen
    (data-tarif="pro" oder "hobby") und löscht die andere und die Markierung davor; mit TARIF = None bleiben alle drei.
  - In den Kopf jeder Seite außer 404.html schreibt er Canonical, og:title (der <title>), og:description (die vorhandene
    Meta-Beschreibung), og:url, og:image (bilder/vorschau.jpg), og:locale de_DE und twitter:card summary_large_image.
  - Strukturierte Daten (Runde 6, S5) als <script type="application/ld+json"> im Kopf, nicht ausführbar, darum ohne Hash in
    der CSP: Person auf der Startseite und der Vita, Book auf Satoshi, BookSeries mit den drei Bänden auf Ursprünge. Alles
    kommt aus den Seiten selbst (Kurzvita, Überschriften, Meta-Beschreibungen) oder aus den festen Angaben unten (PERSON_*),
    nichts Erfundenes, keine Geburtsdaten, keine Anschrift; sameAs aus PROFILE in seite.js, solange es leer ist, ohne.
  - Die Skripte, die in den Seiten stehen (<script> ohne src), bleiben, wo sie sind. Für jedes trägt er den SHA-256-Hash
    seines Texts in script-src der Content-Security-Policy in vercel.json ein (in website-c/vercel.json steht nur 'self').
    So erlaubt die CSP genau diese Skripte und kein anderes, ohne 'unsafe-inline'.
  - Er schreibt sitemap.xml mit den elf Seiten und robots.txt (alles erlaubt, Verweis auf die Sitemap). lastmod ist das Datum
    des Baus, außer eine Seite (mit ihren Skripten und Stilen) ist gleich geblieben: dann bleibt das lastmod des letzten Baus.
    Seiten mit noindex fehlen in der Sitemap: im Entwurf die mit offenen Stellen, und lesen.html, solange daten/texte.js keinen
    Text hat (Runde 6, S3). Dann trägt lesen.html auch noindex. Ebenso erzaehlungen.html und untertext.html, solange es keinen
    Text ihrer Art gibt (Dominik, 24. Oktober: „Erzählungen und Untertext bis zum ersten Text rausnehmen“). Das prüft der Bau
    jedes Mal selbst; mit dem ersten Text stehen die Seiten wieder in der Sitemap, ohne noindex.
  - vercel.json, 404.html, die Icons und das Vorschaubild gehen mit.
  - Steht in einer ausgelieferten Datei noch „[[ZU PRÜFEN“, baut er nicht, außer mit --entwurf. Dann nennt er jede Stelle, und
    die Seiten mit offenen Stellen bekommen <meta name="robots" content="noindex">, damit kein Entwurf in Suchmaschinen landet.
  - Ist in seite.js NEWSLETTER = true, aber der Abschnitt „Newsletter“ fehlt im Datenschutz oder der Dank nach dem Eintragen
    (POST_DANKE) ist leer oder spricht vom Testsystem, baut er nicht.

Er baut zuerst in einen versteckten Ordner neben dem Ziel und prüft dort: keine Kommentare, jedes Skript in einer Seite hat
seinen Hash in der CSP (die strukturierten Daten sind gültiges JSON mit Adressen ohne .html), keine Ereignis-Attribute (onclick=) und keine javascript:-Verweise, keine Ressource von fremden
Servern, Verweise nach außen nur aus AUSSEN_ERLAUBT (mit rel="noopener", ohne target), jeder lokale Verweis zeigt auf eine
ausgelieferte Datei und kein interner Verweis endet noch auf .html, jede Seite hat Icons und Vorschau-Angaben, kein Wort vom
Testsystem (auch nicht von claude.ai oder Anthropic) in den Seiten, Stilen und eigenen Skripten, vercel.json hat alle Header. Erst wenn alles stimmt, ersetzt er das Ziel. Ein abgebrochener Bau lässt
den alten Stand stehen.
"""
import base64
import datetime
import hashlib
import html
import json
import os
import re
import shutil
import sys
import tempfile
from pathlib import Path

sys.dont_write_bytecode = True   # kein __pycache__ in werkzeuge/
sys.path.insert(0, str(Path(__file__).resolve().parent))
import artefakt  # noqa: E402  (die Bereinigung der Kommentare ist dieselbe wie für claude.ai)

# ---------- Die eine Stelle für die Adresse ----------
BASIS_URL = 'https://dominikjaekel.de'

# ---------- Schalter: Tarif bei Vercel (Runde 6, S8) ----------
# Vercels Data Processing Addendum nennt nach der Recherche der zweiten Sitzung nur Kunden auf Pro und Enterprise. Auf dem
# Hobby-Tarif ist der Satz „Dafür gilt ein Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO) …“ nicht haltbar. datenschutz.html hat
# darum zwei Fassungen des Absatzes: 'pro' (mit dem Vertrag) und 'hobby' (ohne ihn). None: noch offen, dann bleiben beide und die
# Markierung [[ZU PRÜFEN: Tarif bei Vercel, pro oder hobby]] stehen, und der Bau geht nur als Entwurf. Der Bau für claude.ai
# (artefakt.py) folgt demselben Schalter.
# 24. Oktober 2026: Hobby. Dominik: „Vercel Hobby“; die Zwischenmeldung 2 der Vercel-Sitzung (live gelesen) bestätigt: „Tarif ist
# und bleibt Hobby“, das DPA gilt nur für Pro und Enterprise. Bewirbt die Seite später ein Buch zum Kauf, ist Pro nötig: dann
# TARIF = 'pro' und neu bauen (docs/todo.md).
TARIF = 'hobby'

# ---------- Schalter: Ausgabe (27. Oktober) ----------
# 'website': die volle Website. 'platzhalter': der Platzhalter unter / mit dem digitalen Exposé unter /satoshi (oben im Kopf des
# Werkzeugs beschrieben). --platzhalter oder --website im Aufruf gilt für einen Bau, ohne den Schalter zu ändern. Der Bau für
# claude.ai (artefakt.py) folgt demselben Schalter. Er steht auf 'platzhalter', solange die Website offline ist: dann bringt ein
# Bau ohne Zusatz nicht aus Versehen die volle Website zurück. Zurück zur vollen Website: hier 'website' eintragen und neu bauen
AUSGABE = 'platzhalter'
PLATZHALTER = 'platzhalter.html'
SEITEN_PLATZHALTER = ['index.html', 'satoshi.html', 'impressum.html', 'datenschutz.html']
NOINDEX_PLATZHALTER = {'satoshi.html', 'impressum.html', 'datenschutz.html'}
LD_PLATZHALTER = {'index.html': 'Person'}
# Wohin im Platzhalter jede Seite verweisen darf (<a href>, <area href>, <form action>): die eigenen Seiten (ein Anker auf der
# Seite selbst zählt als diese Seite) und ob dazu mailto: und Verweise nach außen (AUSSEN_ERLAUBT) sein dürfen. Dominik: „Einfach
# eine einzelne indizierte Seite ohne Verlinkungen.“ Impressum und Datenschutz bleiben (§ 5 DDG, DSGVO). Auf das Exposé
# (satoshi.html) verweist nur das Exposé selbst; die übrigen Seiten führen zurück auf / (der Name im Kopf, „Zur Startseite“)
VERWEISE_PLATZHALTER = {
    'index.html': ({'impressum.html', 'datenschutz.html'}, False),
    'satoshi.html': ({'satoshi.html', 'impressum.html', 'datenschutz.html'}, True),
    'impressum.html': ({'index.html', 'impressum.html', 'datenschutz.html'}, True),
    'datenschutz.html': ({'index.html', 'impressum.html', 'datenschutz.html'}, True),
    '404.html': ({'index.html', 'impressum.html', 'datenschutz.html'}, True),
}
# Was platzhalter.html Zeichen für Zeichen aus index.html übernimmt: Name und Rolle, der erste Satz mit seinem Skript, seine Stile
# und die Zeile im Fuß (platzhalter_pruefen)
AUS_DER_STARTSEITE = {
    'Name und Rolle': r'<h1 class="briefkopf">.*?</h1>',
    'der erste Satz mit seinem Skript': r'<p class="einstieg[^"]*" id="einstieg">.*?</p>\s*<script>.*?</script>',
    'die Stile des ersten Satzes': r'/\* ---------- Der erste Satz \(02\) ----------.*?@keyframes einstieg-notfall \{[^{}]*\{[^{}]*\} \}',
    'die Zeile Impressum und Datenschutz': r'<p class="impressum">.*?</p>',
}

QUELLE = Path(__file__).resolve().parents[1]
ZIEL = QUELLE.parent / 'veroeffentlichung'
AUSLASSEN = {'werkzeuge', 'README.md'}
TEXTDATEIEN = ('.html', '.css', '.js')
FEHLERSEITE = '404.html'
VORSCHAUBILD = 'bilder/vorschau.jpg'
VORSCHAU_ALT = ('Dominik Jäkel, Schriftsteller und Reisender. Dominik Jäkel schreibt tagsüber unter fremden Namen und abends '
                'unter seinem eigenen. Rechts ein Globus mit Europa und Afrika.')
# Die Seiten in der Reihenfolge von FSeite.SEITEN (seite.js); die Startseite steht unter „/“
SEITEN = ['index.html', 'satoshi.html', 'ursprung.html', 'erzaehlungen.html', 'untertext.html', 'laender.html', 'bibliothek.html',
          'vita.html', 'lesen.html', 'impressum.html', 'datenschutz.html']
PFLICHT = ['vercel.json', FEHLERSEITE, 'favicon.svg', 'favicon-32.png', 'apple-touch-icon.png', 'icon-512.png', VORSCHAUBILD]
MARKER = re.compile(r'\[\[ZU PRÜFEN[^\]]*\]\]|\[\[ZU PRÜFEN')
TESTSYSTEM = re.compile(r'Testsystem|Testseite|Testphase|claude\.ai|Anthropic', re.I)
# Verweise nach außen, die sein dürfen, und nur diese (Runde 5, R4; vorher nur das Autorenforum). Jeder ist ein <a href> mit
# rel="noopener" und ohne target und lädt nichts, bevor man ihn anklickt. In Daten (daten/inhalt.js) steht ein solcher Verweis als
# href: '…' und wird von FSeite.textMitVerweis gesetzt. Ein neuer Verweis nach außen kommt zuerst hier hinein
AUSSEN_ERLAUBT = {
    'https://autorenforum-berlin.de/',
    'https://www.simon-kucher.com/de',
    'https://www.a-e-johann.de/der-a-e-johann-preis',
    'https://de.wikipedia.org/wiki/Byzantinischer_Fehler',
    'https://satoshi.nakamotoinstitute.org/',
    # Datenschutz, Hosting: die Datenschutzerklärung von Vercel und das Data Processing Addendum (nur in der Fassung für Pro)
    # (Zwischenmeldung 2 der Vercel-Sitzung, 24.10.2026)
    'https://vercel.com/legal/privacy-policy',
    'https://vercel.com/legal/dpa',
}
# Was die Content-Security-Policy mindestens sagen muss (script-src bekommt dazu die Hashes)
CSP_SOLL = {
    'default-src': ["'self'"], 'script-src': ["'self'"], 'style-src': ["'self'", "'unsafe-inline'"], 'img-src': ["'self'", 'data:'],
    'font-src': ["'self'"], 'connect-src': ["'self'"], 'frame-ancestors': ["'none'"], 'base-uri': ["'self'"],
    'form-action': ["'self'"], 'object-src': ["'none'"],
}
# Strukturierte Daten (Runde 6, S5). Was nicht aus den Seiten kommt, steht hier: Name, Beruf, Preis, Verein (höchstens das
# Autorenforum, mit seiner Adresse aus AUSSEN_ERLAUBT). Keine Geburtsdaten, keine Anschrift, kein Verlag, kein Datum (Satoshi ist
# noch nicht erschienen). sameAs kommt aus PROFILE in seite.js, sobald dort Instagram und LinkedIn stehen
PERSON_NAME = 'Dominik Jäkel'
PERSON_BERUF = 'Schriftsteller'
PERSON_PREIS = 'A.-E.-Johann-Preis (2022)'
PERSON_VEREIN = {'@type': 'Organization', 'name': 'Autorenforum Berlin e. V.', 'url': 'https://autorenforum-berlin.de/'}
LD_SEITEN = {'index.html': 'Person', 'vita.html': 'Person', 'satoshi.html': 'Book', 'ursprung.html': 'BookSeries'}
LD_VERBOTEN = {'birthDate', 'birthPlace', 'address', 'homeLocation', 'telephone', 'email', 'publisher', 'datePublished',
               'isbn', 'gender', 'nationality'}
# lesen.html steht nur in der Sitemap und ohne noindex, wenn daten/texte.js mindestens einen Text hat (Runde 6, S3)
LESESEITE = 'lesen.html'
# erzaehlungen.html und untertext.html ebenso, solange es keinen Text ihrer Art gibt (Dominik, 24. Oktober: „Erzählungen und
# Untertext bis zum ersten Text rausnehmen“); die Seiten bleiben in der Navigation und sagen „Die ersten … folgen.“
LISTENSEITEN = {'erzaehlungen.html': 'erzaehlung', 'untertext.html': 'untertext'}
SLUG = re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')
SLUG_BELEGT = {'inhalt', 'kontakt', 'kontakt-titel', 'nav-liste', 'lesen'}   # wie BELEGT in FSeite.texte (seite.js)
HEADER_SOLL = {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
}


def fehler(text):
    sys.exit('veroeffentlichen.py: ' + text)


artefakt.fehler = fehler


def adresse(seite):
    """Die Adresse einer Seite bei Vercel mit cleanUrls: index.html ist /, vita.html ist /vita."""
    return '/' if seite == 'index.html' else '/' + seite.removesuffix('.html')


def url_fuer(seite):
    return BASIS_URL + adresse(seite)


SEITENVERWEIS = re.compile(r'(?:\./|/)?([a-z0-9-]+\.html)(#[^"\'\s]*)?')


def sauberer_verweis(ref):
    """„vita.html“, „./vita.html“ oder „/vita.html“ (mit Anker) als „/vita“ (mit Anker); None, wenn ref keine der elf Seiten ist."""
    m = SEITENVERWEIS.fullmatch(ref)
    if not m or m.group(1) not in SEITEN:
        return None
    return adresse(m.group(1)) + (m.group(2) or '')


JS_SEITE = re.compile(r'([\'"])([a-z0-9-]+\.html(?:#[^\'"\s]*)?)\1')


def js_verweise(js):
    """Zeichenketten in Skripten, die genau eine Seite nennen ('vita.html'), werden ihre Adresse ('/vita')."""
    return JS_SEITE.sub(lambda m: m.group(1) + (sauberer_verweis(m.group(2)) or m.group(2)) + m.group(1), js)


def verweise_umschreiben(p, text):
    """Interne Verweise ohne .html (cleanUrls, Runde 6, S6): in href der Seiten und in den Zeichenketten der eigenen Skripte und
    der Skripte in den Seiten. Anker bleiben, Verweise nach außen und auf andere Dateien bleiben unberührt."""
    if p.parts[0] == 'lib':
        return text
    if p.suffix == '.js':
        return js_verweise(text)
    if p.suffix != '.html':
        return text
    text = re.sub(r'(\bhref=")([^"]*)"', lambda m: m.group(1) + (sauberer_verweis(m.group(2)) or m.group(2)) + '"', text)
    return re.sub(r'(<script>)(.*?)(</script>)', lambda m: m.group(1) + js_verweise(m.group(2)) + m.group(3), text, flags=re.S)


# ---------- Dateien ----------
def dateien_sammeln():
    alle = []
    for ordner, unterordner, namen in os.walk(QUELLE):
        rel = Path(ordner).relative_to(QUELLE)
        unterordner[:] = sorted(u for u in unterordner if not u.startswith('.') and (rel / u).as_posix() not in AUSLASSEN)
        for name in sorted(namen):
            p = rel / name
            if not name.startswith('.') and p.as_posix() not in AUSLASSEN:
                alle.append(p)
    return alle


def vorher_pruefen(dateien, ausgabe='website'):
    namen = {p.as_posix() for p in dateien}
    for p in PFLICHT:
        if p not in namen:
            fehler(f'{p} fehlt in {QUELLE} (Icons und Vorschaubild: werkzeuge/favicon.py, dann werkzeuge/bilder.cjs)')
    for p in ('robots.txt', 'sitemap.xml'):
        if p in namen:
            fehler(f'website-c/{p} gibt es; beide schreibt nur der Bau (aus BASIS_URL). Bitte die Datei entfernen')
    if ausgabe not in artefakt.AUSGABEN:
        fehler(f'AUSGABE ist {ausgabe!r}; erlaubt sind {", ".join(artefakt.AUSGABEN)}')
    if ausgabe == 'platzhalter' and PLATZHALTER not in namen:
        fehler(f'Ausgabe platzhalter: website-c/{PLATZHALTER} fehlt')
    seiten = {p.name for p in dateien if p.suffix == '.html' and len(p.parts) == 1} - {FEHLERSEITE, PLATZHALTER}
    if seiten != set(SEITEN):
        fehler(f'Die Seiten in website-c/ sind nicht die elf aus SEITEN: zu viel {sorted(seiten - set(SEITEN))}, '
               f'es fehlt {sorted(set(SEITEN) - seiten)}')
    js = (QUELLE / 'seite.js').read_text(encoding='utf-8')
    m = re.search(r'^\s*const NEWSLETTER = (true|false);', js, re.M)
    if not m:
        fehler('seite.js: „const NEWSLETTER = true|false;“ nicht gefunden')
    if m.group(1) == 'true':
        if 'id="d-newsletter"' not in (QUELLE / 'datenschutz.html').read_text(encoding='utf-8'):
            fehler('NEWSLETTER ist true, aber im Datenschutz fehlt der Abschnitt „Newsletter“ (docs/newsletter-datenschutz-entwurf.md)')
        dank = re.search(r"^\s*const POST_DANKE = '([^']*)';", js, re.M)
        if not dank or not dank.group(1).strip() or TESTSYSTEM.search(dank.group(1)):
            fehler('NEWSLETTER ist true, aber POST_DANKE in seite.js ist leer oder spricht vom Testsystem (Dank passend zum Dienst eintragen)')
    try:
        json.loads((QUELLE / 'vercel.json').read_text(encoding='utf-8'))
    except ValueError as e:
        fehler(f'vercel.json ist kein gültiges JSON: {e}')
    if not re.fullmatch(r'https://[a-z0-9.-]+\.[a-z]{2,}', BASIS_URL):
        fehler(f'BASIS_URL {BASIS_URL!r} hat nicht die Form https://name.tld (ohne Schrägstrich am Ende)')


# ---------- Texte zum Lesen (Runde 6, S3) ----------
def texte_zaehlen():
    """Wie viele Texte daten/texte.js hat: die Einträge in window.TEXTE mit einem gültigen slug, ohne Kommentare gelesen (das
    Beispiel im Kommentar zählt nicht). seite.js prüft dazu art und titel; hier zählt, ob überhaupt ein Text eingetragen ist."""
    js = artefakt.js_ohne_kommentare((QUELLE / 'daten' / 'texte.js').read_text(encoding='utf-8'))
    m = re.search(r'window\.TEXTE\s*=\s*\[(.*)\]\s*;?\s*$', js, re.S)
    if not m:
        fehler('daten/texte.js: „window.TEXTE = [ … ];“ nicht gefunden')
    innen = m.group(1).strip()
    slugs = [s for s in re.findall(r'\bslug\s*:\s*[\'"]([^\'"]*)[\'"]', innen) if SLUG.match(s) and s not in SLUG_BELEGT]
    if innen and not slugs:
        fehler('daten/texte.js: window.TEXTE hat Einträge, aber keinen mit gültigem slug (Kleinbuchstaben, Ziffern, Bindestriche)')
    return len(slugs), texte_arten(innen)


def eintraege(innen):
    """Die Einträge der Liste window.TEXTE als Quelltext, je ein { … } auf oberster Ebene (Zeichenketten übersprungen)."""
    teile, tiefe, anfang, zeichen, i = [], 0, 0, None, 0
    while i < len(innen):
        c = innen[i]
        if zeichen:
            if c == '\\':
                i += 1
            elif c == zeichen:
                zeichen = None
        elif c in '\'"`':
            zeichen = c
        elif c == '{':
            if tiefe == 0:
                anfang = i
            tiefe += 1
        elif c == '}':
            tiefe -= 1
            if tiefe == 0:
                teile.append(innen[anfang:i + 1])
        i += 1
    return teile


def texte_arten(innen):
    """Die Arten ('erzaehlung', 'untertext', 'laenderguide'), von denen es mindestens einen Text mit gültigem slug gibt."""
    arten = set()
    for e in eintraege(innen):
        slug = re.search(r'(?:^|[{,\s])slug\s*:\s*[\'"]([^\'"]*)[\'"]', e)
        art = re.search(r'(?:^|[{,\s])art\s*:\s*[\'"]([^\'"]*)[\'"]', e)
        if slug and art and SLUG.match(slug.group(1)) and slug.group(1) not in SLUG_BELEGT:
            arten.add(art.group(1))
    return arten


# ---------- Datenschutz: Tarif bei Vercel (Runde 6, S8) ----------
TARIF_ABSATZ = re.compile(r'[ \t]*<p data-tarif="(offen|pro|hobby)">.*?</p>\n', re.S)


def tarif_waehlen(text, tarif):
    """datenschutz.html mit der Fassung für tarif ('pro' oder 'hobby'); None lässt beide und die Markierung davor stehen."""
    funde = [m.group(1) for m in TARIF_ABSATZ.finditer(text)]
    if sorted(funde) != ['hobby', 'offen', 'pro']:
        fehler(f'datenschutz.html: die Absätze data-tarif="offen", "pro" und "hobby" stehen nicht je einmal da ({funde})')
    if tarif is None:
        return text
    neu = TARIF_ABSATZ.sub(lambda m: m.group(0).replace(f' data-tarif="{tarif}"', '', 1) if m.group(1) == tarif else '', text)
    if 'data-tarif' in neu:
        fehler('datenschutz.html: nach der Wahl des Tarifs steht noch data-tarif da')
    return neu


# ---------- Strukturierte Daten (Runde 6, S5) ----------
def nur_text(teil):
    """Text aus einem Stück HTML: ohne Tags und weiche Trennungen, Leerzeichen jeder Art als ein Leerzeichen."""
    t = html.unescape(re.sub(r'<[^>]+>', '', teil)).replace('\u00ad', '')
    return re.sub(r'\s+', ' ', t.replace('\u00a0', ' ').replace('\u202f', ' ')).strip()


def stueck(text, muster, was, seite):
    m = re.search(muster, text, re.S)
    if not m:
        fehler(f'{seite}: {was} nicht gefunden (für die strukturierten Daten)')
    return m.group(1)


def kurzvita(index_html):
    """Die Kurzvita der Startseite (p.vita) als Beschreibung der Person: ohne „Ausführlich in der Vita.“ und ohne Geburtsjahr und
    -ort. Aus „Er wurde 1995 in Dortmund geboren, studierte …“ wird „Dominik Jäkel studierte …“; der Rest bleibt Wort für Wort."""
    t = nur_text(stueck(index_html, r'<p class="vita">(.*?)</p>', 'die Kurzvita (p.vita)', 'index.html'))
    t = re.sub(r'\s*Ausführlich in der Vita\.$', '', t)
    t, n = re.subn(r'^Er wurde \d{4} in [^,;]+ geboren, ', PERSON_NAME + ' ', t)
    if n != 1 or re.search(r'geboren|\b1[89]\d\d\b', t):
        fehler(f'index.html: die Kurzvita beginnt nicht mehr mit „Er wurde … geboren, “ oder nennt noch ein Geburtsjahr; '
               f'die Beschreibung der Person (kurzvita in veroeffentlichen.py) bitte anpassen: {t[:80]!r}')
    return t


def profile_lesen(seite_js):
    """Die Adressen aus PROFILE in seite.js (sameAs), nur https; leer, solange PROFILE leer ist."""
    m = re.search(r'\bconst PROFILE = \[(.*?)\];', seite_js, re.S)
    if not m:
        fehler('seite.js: „const PROFILE = [ … ];“ nicht gefunden')
    return re.findall(r'\burl\s*:\s*[\'"](https://[^\'"\s]+)[\'"]', m.group(1))


def strukturierte_daten(texte):
    """Je Seite aus LD_SEITEN das Objekt für <script type="application/ld+json">, aus den Seiten selbst gelesen."""
    person_id = BASIS_URL + '/#person'
    autor = {'@type': 'Person', '@id': person_id, 'name': PERSON_NAME, 'url': url_fuer('index.html')}
    person = {'@context': 'https://schema.org', '@type': 'Person', '@id': person_id, 'name': PERSON_NAME, 'url': url_fuer('index.html'),
              'jobTitle': PERSON_BERUF, 'description': kurzvita(texte[Path('index.html')]), 'award': PERSON_PREIS,
              'affiliation': PERSON_VEREIN}
    profile = profile_lesen(texte[Path('seite.js')])
    if profile:
        person['sameAs'] = profile
    s = texte[Path('satoshi.html')]
    buch = {'@context': 'https://schema.org', '@type': 'Book', '@id': url_fuer('satoshi.html') + '#buch',
            'name': nur_text(stueck(s, r'<h1\b[^>]*>(.*?)</h1>', '<h1>', 'satoshi.html')), 'url': url_fuer('satoshi.html'),
            'author': autor, 'inLanguage': 'de', 'genre': 'Roman',
            'description': nur_text(stueck(s, r'<meta name="description" content="([^"]*)">', 'Meta-Beschreibung', 'satoshi.html'))}
    u = texte[Path('ursprung.html')]
    baende = []
    for i, nr in enumerate(('i', 'ii', 'iii'), 1):
        titel = stueck(u, rf'<h2\b[^>]*\bid="band-{nr}-titel"[^>]*>(.*?)</h2>', f'die Überschrift von Band {nr.upper()}', 'ursprung.html')
        titel = nur_text(re.sub(r'<span class="(?:band-nr[^"]*|arbeitstitel)">.*?</span>', '', titel))
        if not titel:
            fehler(f'ursprung.html: Band {nr.upper()} ohne Titel')
        baende.append({'@type': 'Book', 'name': titel, 'position': i, 'url': url_fuer('ursprung.html') + f'#band-{nr}',
                       'author': {'@id': person_id}, 'inLanguage': 'de', 'genre': 'Roman'})
    reihe = {'@context': 'https://schema.org', '@type': 'BookSeries', '@id': url_fuer('ursprung.html') + '#reihe',
             'name': nur_text(stueck(u, r'<h1\b[^>]*>(.*?)</h1>', '<h1>', 'ursprung.html')), 'url': url_fuer('ursprung.html'),
             'author': autor, 'inLanguage': 'de',
             'description': nur_text(stueck(u, r'<meta name="description" content="([^"]*)">', 'Meta-Beschreibung', 'ursprung.html')),
             'hasPart': baende}
    return {'index.html': person, 'vita.html': person, 'satoshi.html': buch, 'ursprung.html': reihe}


def person_knapp(texte):
    """Strukturierte Daten des Platzhalters (nur auf /): die Person mit Name, Adresse und Beruf, ohne Kurzvita, Preis, Verein und
    Werke; sameAs aus PROFILE, sobald es dort steht."""
    person = {'@context': 'https://schema.org', '@type': 'Person', '@id': BASIS_URL + '/#person', 'name': PERSON_NAME,
              'url': url_fuer('index.html'), 'jobTitle': PERSON_BERUF}
    profile = profile_lesen(texte[Path('seite.js')])
    if profile:
        person['sameAs'] = profile
    return {'index.html': person}


# ---------- Platzhalter (27. Oktober) ----------
def stationen_lesen(text, muster, was, probleme):
    """Der Text zwischen den Klammern einer Liste von Stationen im Quelltext ('' und ein Problem, wenn sie fehlt)."""
    m = re.search(muster, text, re.S)
    if not m:
        probleme.append(f'{was}: die Liste der Stationen nicht gefunden')
        return ''
    return m.group(1)


def platzhalter_pruefen(streng=True):
    """platzhalter.html übernimmt aus index.html Name und Rolle, den ersten Satz mit Skript und Stilen und die Zeile im Fuß
    Zeichen für Zeichen (AUS_DER_STARTSEITE), und ihre Stationen passen zu INHALT.leben (daten/inhalt.js): dieselbe Reihenfolge,
    Breite, Länge und Aufenthalt (neben). Ändert sich etwas davon auf der Startseite oder in den Daten, baut der Platzhalter erst,
    wenn platzhalter.html nachgezogen ist (oder die Regel hier mit Absicht geändert wird). streng (Platzhalter): bei Abweichung
    kein Bau; sonst (volle Website) nur die Liste der Abweichungen, als Hinweis, dass platzhalter.html nachzuziehen ist."""
    probleme = []
    start = (QUELLE / 'index.html').read_text(encoding='utf-8')
    platz = (QUELLE / PLATZHALTER).read_text(encoding='utf-8')
    for was, muster in AUS_DER_STARTSEITE.items():
        teile = re.findall(muster, start, re.S)
        if len(teile) != 1:
            probleme.append(f'index.html: {was} steht nicht genau einmal da ({len(teile)}); AUS_DER_STARTSEITE in veroeffentlichen.py anpassen')
        elif platz.count(teile[0]) != 1:
            probleme.append(f'{PLATZHALTER}: {was} stimmt nicht mehr Zeichen für Zeichen mit index.html überein; bitte aus index.html übernehmen')
    js = artefakt.js_ohne_kommentare((QUELLE / 'daten' / 'inhalt.js').read_text(encoding='utf-8'))
    leben = []
    for e in re.findall(r'\{[^{}]*\}', stationen_lesen(js, r'\bleben\s*:\s*\[(.*?)\]', 'daten/inhalt.js', probleme)):
        lat, lon = re.search(r'\blat\s*:\s*(-?[\d.]+)', e), re.search(r'\blon\s*:\s*(-?[\d.]+)', e)
        if not lat or not lon:
            probleme.append(f'daten/inhalt.js: eine Station in leben ohne lat oder lon: {e[:60]}')
            continue
        leben.append((float(lat.group(1)), float(lon.group(1)), bool(re.search(r'\bneben\s*:\s*true\b', e))))
    hier = [(float(a), float(b), bool(c)) for a, b, c in re.findall(r"\[\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*(,\s*'neben'\s*)?\]",
                                                                    stationen_lesen(platz, r'const LEBEN = \[(.*?)\]\.map', PLATZHALTER, probleme))]
    if not leben or hier != leben:
        probleme.append(f'{PLATZHALTER}: die Stationen (const LEBEN) passen nicht zu INHALT.leben in daten/inhalt.js:\n  hier  {hier}\n  dort  {leben}')
    if re.search(r'<script src="daten/inhalt\.js"', platz):
        probleme.append(f'{PLATZHALTER} lädt daten/inhalt.js; die Stationen stehen in der Seite selbst')
    if probleme and streng:
        fehler('\n'.join(probleme))
    return probleme


def verwiesen(dateien, texte, immer):
    """Für den Platzhalter: alle Dateien außer daten/ und bilder/, dazu immer (die Pflichtdateien) und aus daten/ und bilder/ nur,
    worauf eine schon gewählte Datei verweist, bis nichts mehr dazukommt. Ein Verweis ist der Pfad als ganze Zeichenkette in ihrem
    Text ohne Kommentare: in Anführungszeichen oder url( ), auch mit / oder ./ davor und mit Anker oder Abfrage danach (eine
    Meldung wie 'daten/texte.js: Eintrag übersprungen' in seite.js zählt nicht)."""
    drin = {p for p in dateien if p.parts[0] not in ('daten', 'bilder')} | {Path(p) for p in immer}
    while True:
        alles = ''.join(texte[p] for p in drin if p in texte)
        neu = {p for p in dateien if p not in drin
               and re.search(r'[\'"`(/]' + re.escape(p.as_posix()) + r'[\'"`)#?]', alles)}
        if not neu:
            return drin
        drin |= neu


def vercel_platzhalter(roh, umleiten, noindex):
    """vercel.json des Platzhalters: dazu die Weiterleitungen der übrigen Seiten auf / (307, permanent false; jede mit und ohne
    .html) und X-Robots-Tag noindex für die Seiten mit noindex. Gebaut als JSON, nicht als Text; sonst bleibt alles, wie es ist.
    Die Einträge mit .html erreicht Vercel nicht: cleanUrls leitet /vita.html vorher mit 308 auf /vita, dann führt /vita mit 307
    auf / (Reihenfolge laut vercel build 48.12.1). Sie stehen da, falls cleanUrls einmal fällt."""
    konfig = json.loads(roh)
    if 'redirects' in konfig:
        fehler('website-c/vercel.json hat schon redirects; die Weiterleitungen des Platzhalters schreibt der Bau')
    neu = {}
    for k, v in konfig.items():
        if k == 'headers':
            neu['redirects'] = ([{'source': adresse(s), 'destination': '/', 'permanent': False} for s in umleiten]
                                + [{'source': '/' + s, 'destination': '/', 'permanent': False} for s in umleiten])
            v = v + [{'source': adresse(s), 'headers': [{'key': 'X-Robots-Tag', 'value': 'noindex'}]} for s in SEITEN if s in noindex]
        neu[k] = v
    return json.dumps(neu, ensure_ascii=False, indent=2) + '\n'


def ld_skript(objekt):
    return ('<script type="application/ld+json">' + json.dumps(objekt, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
            + '</script>')


def ld_pruefen(seite, roh, probleme, namen, ld_seiten=LD_SEITEN):
    """Die strukturierten Daten einer Seite: gültiges JSON, der erwartete Typ, jede Adresse ohne .html auf eine ausgelieferte
    Seite unter BASIS_URL oder aus AUSSEN_ERLAUBT, keine verbotenen Angaben."""
    try:
        d = json.loads(roh)
    except ValueError as e:
        probleme.append(f'{seite}: strukturierte Daten sind kein gültiges JSON: {e}')
        return
    if d.get('@context') != 'https://schema.org' or d.get('@type') != ld_seiten.get(seite):
        probleme.append(f'{seite}: strukturierte Daten mit @type {d.get("@type")!r} statt {ld_seiten.get(seite)!r}')

    def lauf(x, weg):
        if isinstance(x, dict):
            for k, v in x.items():
                if k in LD_VERBOTEN:
                    probleme.append(f'{seite}: strukturierte Daten mit {k} ({weg})')
                if k in ('url', '@id', 'sameAs') and v:
                    for u in (v if isinstance(v, list) else [v]):
                        if not isinstance(u, str):
                            probleme.append(f'{seite}: {weg}.{k} ist kein Text')
                        elif u.startswith(BASIS_URL + '/'):
                            pfad = u[len(BASIS_URL):].split('#')[0]
                            if '.html' in u or not (ziel_von('index.html', pfad) or Path('')).as_posix() in namen:
                                probleme.append(f'{seite}: {weg}.{k} {u} ist keine Adresse einer ausgelieferten Seite (ohne .html)')
                        elif u not in AUSSEN_ERLAUBT and not (k == 'sameAs' and u.startswith('https://')):
                            probleme.append(f'{seite}: {weg}.{k} {u} zeigt nach außen und steht nicht in AUSSEN_ERLAUBT')
                lauf(v, weg + '.' + k)
        elif isinstance(x, list):
            for i, v in enumerate(x):
                lauf(v, f'{weg}[{i}]')
        elif isinstance(x, str) and re.search(r'Stresemann|\b10963\b|geboren', x):
            probleme.append(f'{seite}: strukturierte Daten nennen Anschrift oder Geburt ({weg})')
    lauf(d, d.get('@type', '?'))
    if seite == 'ursprung.html' and len(d.get('hasPart', [])) != 3:
        probleme.append(f'{seite}: die Reihe hat nicht drei Bände')


# ---------- Seiten ----------
SKRIPT_IN_SEITE = re.compile(r'<script\b([^>]*)>(.*?)</script>', re.S | re.I)
LD_TYP = ' type="application/ld+json"'


def skript_hash(inhalt):
    """Der Hash, mit dem eine CSP ein Skript in der Seite erlaubt: SHA-256 über den Text zwischen <script> und </script>."""
    return "'sha256-" + base64.b64encode(hashlib.sha256(inhalt.encode('utf-8')).digest()).decode('ascii') + "'"


def skripte_in_seite(seite, text):
    """Die Hashes aller <script> ohne src einer Seite."""
    hashes = []
    for m in SKRIPT_IN_SEITE.finditer(text):
        attr, inhalt = m.group(1), m.group(2)
        if 'src=' in attr:
            if inhalt.strip():
                fehler(f'{seite}: <script src> mit Inhalt')
            continue
        if attr == LD_TYP:
            continue   # strukturierte Daten: kein Skript, das läuft, darum kein Hash in der CSP
        if attr.strip():
            fehler(f'{seite}: <script{attr}> ohne src, aber mit Attributen; der Bau kennt nur schlichte Skripte')
        hashes.append(skript_hash(inhalt))
    return hashes


def csp_zerlegen(wert):
    return {t.split()[0]: t.split()[1:] for t in wert.split(';') if t.strip()}


def vercel_mit_hashes(roh, hashes):
    """vercel.json aus website-c/ mit den Hashes in script-src. Sonst bleibt die Datei Zeichen für Zeichen, wie sie ist."""
    konfig = json.loads(roh)
    werte = [h['value'] for r in konfig.get('headers', []) for h in r['headers'] if h['key'].lower() == 'content-security-policy']
    if len(werte) != 1:
        fehler(f'vercel.json: {len(werte)} Content-Security-Policy statt genau einer')
    alt = werte[0]
    teile = [t.strip() for t in alt.split(';') if t.strip()]
    neu = []
    for t in teile:
        name, *quellen = t.split()
        if name == 'script-src':
            if "'unsafe-inline'" in quellen or any(q.startswith("'sha") for q in quellen):
                fehler("website-c/vercel.json: script-src soll nur 'self' sein; die Hashes trägt der Bau ein")
            quellen += hashes
        neu.append(' '.join([name] + quellen))
    neu = '; '.join(neu)
    if roh.count(json.dumps(alt)) != 1:
        fehler('vercel.json: die Content-Security-Policy steht nicht genau einmal wörtlich in der Datei')
    aus = roh.replace(json.dumps(alt), json.dumps(neu))
    if [h['value'] for r in json.loads(aus)['headers'] for h in r['headers'] if h['key'] == 'Content-Security-Policy'] != [neu]:
        fehler('vercel.json: Einsetzen der Hashes ging schief')
    return aus


def attribut(text, muster, was, seite):
    m = re.search(muster, text, re.S)
    if not m:
        fehler(f'{seite}: {was} nicht gefunden')
    return html.escape(html.unescape(m.group(1).strip()), quote=True)


def kopf_ergaenzen(seite, text, noindex, ld=None):
    titel = attribut(text, r'<title>(.*?)</title>', '<title>', seite)
    beschreibung = attribut(text, r'<meta name="description" content="([^"]*)">', 'Meta-Beschreibung', seite)
    url = url_fuer(seite)
    bild = BASIS_URL + '/' + VORSCHAUBILD
    zeilen = [
        f'<link rel="canonical" href="{url}">',
        '<meta property="og:type" content="website">',
        '<meta property="og:site_name" content="Dominik Jäkel">',
        '<meta property="og:locale" content="de_DE">',
        f'<meta property="og:title" content="{titel}">',
        f'<meta property="og:description" content="{beschreibung}">',
        f'<meta property="og:url" content="{url}">',
        f'<meta property="og:image" content="{bild}">',
        '<meta property="og:image:type" content="image/jpeg">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        f'<meta property="og:image:alt" content="{html.escape(VORSCHAU_ALT, quote=True)}">',
        '<meta name="twitter:card" content="summary_large_image">',
    ]
    if noindex:
        zeilen.insert(0, '<meta name="robots" content="noindex">')
    if ld is not None:
        zeilen.append(ld_skript(ld))
    if re.search(r'rel="canonical"|property="og:|name="twitter:|application/ld\+json|name="robots"', text):
        fehler(f'{seite}: hat schon Canonical, Open Graph, robots oder strukturierte Daten; die schreibt nur der Bau (aus BASIS_URL)')
    m = re.search(r'<meta name="description" content="[^"]*">\n', text)
    return text[:m.end()] + '\n'.join(zeilen) + '\n' + text[m.end():]


# ---------- Sitemap und robots.txt ----------
VERWEIS = re.compile(r'<(?:script|link)\b[^>]*?\b(?:src|href)="([^"]+)"', re.I)


def fingerabdruck(ordner, seite):
    """Prüfsumme einer Seite mit den Skripten und Stilen, die sie lädt (für lastmod)."""
    datei = ordner / seite
    if not datei.is_file():
        return None
    text = datei.read_bytes()
    h = hashlib.sha256(text)
    for ref in VERWEIS.findall(text.decode('utf-8')):
        if re.match(r'[a-z]+:|//|#', ref):
            continue
        teil = ordner / ref.split('#')[0].split('?')[0].lstrip('/')
        h.update(ref.encode() + b'\0' + (teil.read_bytes() if teil.is_file() else b''))
    return h.hexdigest()


def alte_lastmods(ziel):
    datei = ziel / 'sitemap.xml'
    if not datei.is_file():
        return {}
    return dict(re.findall(r'<loc>([^<]+)</loc>\s*<lastmod>([^<]+)</lastmod>', datei.read_text(encoding='utf-8')))


def sitemap(neu, ziel, heute, ohne, seiten=SEITEN):
    """sitemap.xml und robots.txt. Seiten aus ohne (im Entwurf die mit noindex) stehen nicht in der Sitemap: Suchmaschinen sollen
    keine Adresse gemeldet bekommen, die sie nicht aufnehmen dürfen. seiten: die Seiten der Ausgabe (im Platzhalter nur vier)."""
    alt = alte_lastmods(ziel)
    eintraege = []
    for seite in seiten:
        if seite in ohne:
            continue
        url = url_fuer(seite)
        gleich = fingerabdruck(neu, seite) == fingerabdruck(ziel, seite) and url in alt
        eintraege.append((url, alt[url] if gleich else heute))
    xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    xml += [f'  <url><loc>{u}</loc><lastmod>{d}</lastmod></url>' for u, d in eintraege]
    xml.append('</urlset>')
    (neu / 'sitemap.xml').write_text('\n'.join(xml) + '\n', encoding='utf-8')
    (neu / 'robots.txt').write_text(f'User-agent: *\nAllow: /\n\nSitemap: {BASIS_URL}/sitemap.xml\n', encoding='utf-8')
    return eintraege


# ---------- Prüfen ----------
def marker_suchen(ordner, dateien):
    """Jede offene Stelle in den ausgelieferten Dateien, mit Zeile in der Quelle (website-c/), wo man sie behebt."""
    funde = []
    for p in dateien:
        if p.suffix not in TEXTDATEIEN + ('.txt', '.xml', '.json', '.svg'):
            continue
        quelle = QUELLE / p
        quellzeilen = quelle.read_text(encoding='utf-8').split('\n') if quelle.is_file() else []
        gesehen = {}
        for nr, zeile in enumerate((ordner / p).read_text(encoding='utf-8').split('\n'), 1):
            for m in MARKER.finditer(zeile):
                n = gesehen[m.group(0)] = gesehen.get(m.group(0), 0) + 1
                treffer = [i for i, z in enumerate(quellzeilen, 1) for _ in range(z.count(m.group(0)))]
                ort = f'website-c/{p.as_posix()}:{treffer[n - 1]}' if len(treffer) >= n else f'{p.as_posix()} (im Bau), Zeile {nr}'
                funde.append((ort, m.group(0)))
    return funde


def ziel_von(seite, ref):
    ref = html.unescape(ref).split('#')[0].split('?')[0]
    if not ref:
        return None
    if ref == '/':
        return Path('index.html')
    z = Path(ref.lstrip('/')) if ref.startswith('/') else Path(os.path.normpath((Path(seite).parent / ref).as_posix()))
    # Saubere Adresse (cleanUrls): /vita ist vita.html
    return Path(z.as_posix() + '.html') if not z.suffix and len(z.parts) == 1 else z


def umleitungen_pruefen(konfig, umleiten, noindex, namen, probleme):
    """Platzhalter: jede übrige Seite mit und ohne .html per 307 (permanent false) auf /, keine Weiterleitung sonst, keine auf eine
    ausgelieferte Seite; X-Robots-Tag noindex genau für die Seiten mit noindex."""
    soll = sorted([adresse(s) for s in umleiten] + ['/' + s for s in umleiten])
    ist = konfig.get('redirects', [])
    for r in ist:
        if r.get('destination') != '/' or r.get('permanent') is not False or 'statusCode' in r:
            probleme.append(f'vercel.json: Weiterleitung {r} soll nicht dauerhaft (307) auf / führen')
        ziel = ziel_von('index.html', r.get('source', ''))
        if ziel is not None and ziel.as_posix() in namen:
            probleme.append(f'vercel.json: {r.get("source")} wird weitergeleitet, die Seite wird aber ausgeliefert')
    if sorted(r.get('source') for r in ist) != soll:
        probleme.append(f'vercel.json: Weiterleitungen {sorted(r.get("source") for r in ist)} statt {soll}')
    robots = sorted(r['source'] for r in konfig.get('headers', []) for h in r['headers'] if h['key'] == 'X-Robots-Tag' and h['value'] == 'noindex')
    if robots != sorted(adresse(s) for s in noindex if s in namen):
        probleme.append(f'vercel.json: X-Robots-Tag noindex für {robots}, soll {sorted(adresse(s) for s in noindex if s in namen)}')


def verweise_platzhalter(seite, text, probleme):
    """Platzhalter: wohin die Verweise einer Seite führen (<a href>, <area href>, <form action>), nach VERWEISE_PLATZHALTER. text ist
    das HTML der Seite ohne den Text ihrer Skripte. Ein Anker allein (#inhalt) zeigt auf die Seite selbst."""
    erlaubt, auch_aussen = VERWEISE_PLATZHALTER.get(seite, (set(), False))
    if seite not in VERWEISE_PLATZHALTER:
        probleme.append(f'{seite}: keine Regel in VERWEISE_PLATZHALTER')
    for tag in re.finditer(r'<(a|area|form)\b([^>]*)>', text, re.I):
        for ref in re.findall(r'\b(?:href|action)="([^"]*)"', tag.group(2)):
            ref = html.unescape(ref).strip()
            if re.match(r'(?:https?:)?//|mailto:', ref, re.I):
                if not auch_aussen:
                    probleme.append(f'{seite}: Verweis auf {ref}; diese Seite verweist nur auf {", ".join(sorted(adresse(s) for s in erlaubt))}')
                continue
            if re.match(r'[a-z][a-z0-9+.-]*:', ref, re.I):
                probleme.append(f'{seite}: Verweis auf {ref}')
                continue
            z = ziel_von(seite, ref)
            ziel = (z or Path(seite)).as_posix()
            if ziel not in erlaubt:
                probleme.append(f'{seite}: Verweis auf {ref} (im Platzhalter verweist diese Seite nur auf '
                                f'{", ".join(sorted(adresse(s) for s in erlaubt))}{", mailto: und nach außen" if auch_aussen else ""})')


def vercel_pruefen(konfig, hashes, probleme):
    if konfig.get('cleanUrls') is not True:
        probleme.append('vercel.json: cleanUrls soll true sein (die Verweise im Bau enden nicht auf .html; Runde 6, S6)')
    if konfig.get('trailingSlash') is not False:
        probleme.append('vercel.json: trailingSlash soll false sein')
    alle = {}
    for r in konfig.get('headers', []):
        if r.get('source') == '/(.*)':
            alle.update({h['key']: h['value'] for h in r['headers']})
    for k, v in HEADER_SOLL.items():
        if alle.get(k) != v:
            probleme.append(f'vercel.json: {k} für alle Pfade soll „{v}“ sein, ist „{alle.get(k)}“')
    csp = csp_zerlegen(alle.get('Content-Security-Policy', ''))
    for name, soll in CSP_SOLL.items():
        ist = csp.get(name)
        if ist is None:
            probleme.append(f'vercel.json: CSP ohne {name}')
            continue
        rest = sorted(set(ist) - set(soll) - (set(hashes) if name == 'script-src' else set()))
        if [q for q in soll if q not in ist] or rest:
            probleme.append(f'vercel.json: CSP {name} ist {" ".join(ist)}')
    fehlen = sorted(set(hashes) - set(csp.get('script-src', [])))
    if fehlen:
        probleme.append(f'vercel.json: script-src ohne die Hashes {fehlen}')
    cache = {r['source']: h['value'] for r in konfig.get('headers', []) for h in r['headers'] if h['key'] == 'Cache-Control'}
    for quelle, soll in (('/', 'must-revalidate'), ('/([^/.]+)', 'must-revalidate'), ('/(schrift|lib|daten|bilder)/(.*)', 'max-age=86400')):
        if soll not in cache.get(quelle, '') or 'immutable' in cache.get(quelle, ''):
            probleme.append(f'vercel.json: Cache-Control für {quelle} ist „{cache.get(quelle)}“')


def pruefen(neu, dateien, seiten, noindex, ld_seiten=LD_SEITEN, umleiten=None):
    """Prüft den Bau in neu; umleiten: im Platzhalter die Seiten, die vercel.json auf / weiterleitet (sonst None, keine)."""
    namen = {p.as_posix() for p in dateien}
    probleme, hashes = [], set()
    for p in dateien:
        if p.suffix not in TEXTDATEIEN or p.parts[0] == 'lib':
            continue
        text = (neu / p).read_text(encoding='utf-8')
        if p.suffix == '.html' and '<!--' in text or p.suffix == '.css' and '/*' in text:
            probleme.append(f'{p}: Kommentar übrig')
        if TESTSYSTEM.search(text):
            probleme.append(f'{p}: „{TESTSYSTEM.search(text).group(0)}“ in der ausgelieferten Datei')
        if p.suffix == '.js':
            for ref in re.findall(r'\bhref:\s*[\'"](https?://[^\'"]*)', text):
                if ref not in AUSSEN_ERLAUBT:
                    probleme.append(f'{p}: Verweis nach außen {ref} steht nicht in AUSSEN_ERLAUBT')
        skripte = [text] if p.suffix == '.js' else [m.group(2) for m in SKRIPT_IN_SEITE.finditer(text) if not m.group(1).strip()]
        for js in skripte:
            for m in JS_SEITE.finditer(js):
                if sauberer_verweis(m.group(2)):
                    probleme.append(f'{p}: Zeichenkette {m.group(0)} im Skript endet auf .html (cleanUrls: {sauberer_verweis(m.group(2))})')
    for seite in seiten:
        text = (neu / seite).read_text(encoding='utf-8')
        hashes.update(skripte_in_seite(seite, text))
        ld = [m.group(2) for m in SKRIPT_IN_SEITE.finditer(text) if m.group(1) == LD_TYP]
        if len(ld) != (1 if seite in ld_seiten else 0):
            probleme.append(f'{seite}: {len(ld)} Blöcke strukturierter Daten statt {1 if seite in ld_seiten else 0}')
        for roh in ld:
            ld_pruefen(seite, roh, probleme, namen, ld_seiten)
        robots = re.findall(r'<meta name="robots" content="([^"]*)">', text.split('</head>')[0])
        if (robots == ['noindex']) != (seite in noindex or seite == FEHLERSEITE) or len(robots) > 1:
            probleme.append(f'{seite}: robots {robots}, soll {"noindex" if seite in noindex else "keins"}')
        # Für die Prüfung der Tags zählt nur das HTML, nicht der Text der Skripte in der Seite
        text = re.sub(r'(<script\b[^>]*>).*?(</script>)', r'\1\2', text, flags=re.S | re.I)
        for m in re.finditer(r'<[a-zA-Z][^>]*\s(on[a-z]+)\s*=', text):
            probleme.append(f'{seite}: Ereignis-Attribut {m.group(1)}= (verbietet die CSP)')
        if artefakt.MARKIERUNG.search(text):
            probleme.append(f'{seite}: Markierung data-nur oder data-verweis übrig (artefakt.ausgabe_umsetzen)')
        if re.search(r'(?:href|src|action)="\s*javascript:', text, re.I):
            probleme.append(f'{seite}: javascript:-Verweis (verbietet die CSP)')
        if umleiten is not None:
            verweise_platzhalter(seite, text, probleme)
        sichtbar = re.sub(r'<(script|style)\b.*?</\1>', '', text, flags=re.S | re.I)
        if TESTSYSTEM.search(sichtbar):
            probleme.append(f'{seite}: „{TESTSYSTEM.search(sichtbar).group(0)}“ in der Seite')
        # Ressourcen nur vom eigenen Server; jeder lokale Verweis zeigt auf eine ausgelieferte Datei
        for tag in re.finditer(r'<(a|link|script|img|source|iframe|video|audio|embed|object|form)\b([^>]*)>', text, re.I):
            art, attr = tag.group(1).lower(), tag.group(2)
            for name, wert in re.findall(r'\b(href|src|srcset|action|data)="([^"]*)"', attr):
                for ref in ([w.strip().split(' ')[0] for w in wert.split(',')] if name == 'srcset' else [wert]):
                    if re.match(r'(?:https?:)?//', ref):
                        if art == 'a':
                            if ref not in AUSSEN_ERLAUBT:
                                probleme.append(f'{seite}: Verweis nach außen {ref} steht nicht in AUSSEN_ERLAUBT')
                            elif not re.search(r'\brel="[^"]*\bnoopener\b', attr) or re.search(r'\btarget=', attr):
                                probleme.append(f'{seite}: Verweis nach außen {ref} ohne rel="noopener" oder mit target')
                            continue
                        if art == 'link' and 'rel="canonical"' in attr:
                            continue
                        probleme.append(f'{seite}: <{art}> lädt von einem fremden Server: {ref}')
                        continue
                    if re.match(r'(mailto|tel|data):|#', ref):
                        continue
                    if art == 'a' and sauberer_verweis(ref):
                        probleme.append(f'{seite}: Verweis auf {ref} endet auf .html (cleanUrls: {sauberer_verweis(ref)})')
                    z = ziel_von(seite, ref)
                    if z is not None and z.as_posix() not in namen:
                        probleme.append(f'{seite}: Verweis auf {ref}, die Datei wird nicht ausgeliefert')
        for ref in re.findall(r'url\(\s*["\']?([^"\')]+)', text):
            if not re.match(r'data:|#', ref) and (ziel_von(seite, ref) or Path('')).as_posix() not in namen:
                probleme.append(f'{seite}: url({ref}) zeigt auf keine ausgelieferte Datei')
        kopf = text.split('</head>')[0]
        pflicht = ['rel="icon" href="', 'rel="apple-touch-icon"', '<meta name="theme-color" content="#FFFEFC">']
        if seite == FEHLERSEITE:
            pflicht += ['<meta name="robots" content="noindex">']
        else:
            pflicht += ['rel="canonical"', 'property="og:title"', 'property="og:description"', 'property="og:url"',
                        'property="og:image"', 'property="og:locale" content="de_DE"', 'name="twitter:card" content="summary_large_image"']
        for teil in pflicht:
            if teil not in kopf:
                probleme.append(f'{seite}: im Kopf fehlt {teil}')
        if not re.match(r'<!doctype html>\s*<html lang="de">\s*<head>', text, re.I) or not text.rstrip().endswith('</html>'):
            probleme.append(f'{seite}: Gerüst unvollständig')
    for css in [p for p in dateien if p.suffix == '.css']:
        for ref in re.findall(r'url\(\s*["\']?([^"\')]+)', (neu / css).read_text(encoding='utf-8')):
            if not re.match(r'data:|#', ref) and ziel_von(css.as_posix(), ref).as_posix() not in namen:
                probleme.append(f'{css}: url({ref}) zeigt auf keine ausgelieferte Datei')
    konfig = json.loads((neu / 'vercel.json').read_text(encoding='utf-8'))
    vercel_pruefen(konfig, hashes, probleme)
    if umleiten is None:
        if 'redirects' in konfig:
            probleme.append('vercel.json: Weiterleitungen in der vollen Website')
    else:
        umleitungen_pruefen(konfig, umleiten, noindex, namen, probleme)
    if probleme:
        fehler('Prüfung fehlgeschlagen:\n  ' + '\n  '.join(probleme))
    return hashes


# ---------- Ziel ----------
def ziel_pruefen(ziel):
    if ziel == QUELLE or QUELLE in ziel.parents or ziel in QUELLE.parents or ziel == Path.home() or ziel == Path(ziel.anchor):
        fehler(f'{ziel} ist kein geeigneter Zielordner (Quelle, darüber oder darin)')
    if ziel.exists():
        if not ziel.is_dir():
            fehler(f'{ziel} ist eine Datei')
        if (ziel / '.git').exists():
            fehler(f'{ziel} enthält .git')
        if any(ziel.iterdir()) and not ((ziel / 'index.html').exists() and (ziel / 'vercel.json').exists()):
            fehler(f'{ziel} ist nicht leer und sieht nicht nach einer früheren Veröffentlichung aus; bitte selbst leeren')


def main():
    argumente = sys.argv[1:]
    entwurf = '--entwurf' in argumente
    if '--platzhalter' in argumente and '--website' in argumente:
        fehler('--platzhalter und --website schließen einander aus')
    ausgabe = 'platzhalter' if '--platzhalter' in argumente else 'website' if '--website' in argumente else AUSGABE
    argumente = [a for a in argumente if a not in ('--entwurf', '--platzhalter', '--website')]
    ziel = ZIEL
    if argumente[:1] == ['--ziel'] and len(argumente) == 2:
        ziel = Path(argumente[1]).expanduser().resolve()
    elif argumente:
        fehler('Aufruf: python3 website-c/werkzeuge/veroeffentlichen.py [--entwurf] [--platzhalter | --website] [--ziel <ordner>]')
    ziel_pruefen(ziel)
    platz = ausgabe == 'platzhalter'

    dateien = dateien_sammeln()
    vorher_pruefen(dateien, ausgabe)
    if platz:
        platzhalter_pruefen()
    hinweise = [] if platz or PLATZHALTER not in {p.as_posix() for p in dateien} else platzhalter_pruefen(streng=False)
    heute = datetime.date.today().isoformat()
    if TARIF not in (None, 'pro', 'hobby'):
        fehler(f"TARIF ist {TARIF!r}; erlaubt sind None (noch offen), 'pro' und 'hobby'")
    zahl_texte, arten = texte_zaehlen()

    # Die Seiten der Ausgabe: in der vollen Website die elf (platzhalter.html geht nicht mit), im Platzhalter vier, und unter
    # index.html steht dort platzhalter.html
    seiten_liste = SEITEN_PLATZHALTER if platz else SEITEN
    weg_seiten = sorted({Path(s) for s in SEITEN if s not in seiten_liste} | {Path(PLATZHALTER)})
    dateien = [p for p in dateien if p not in weg_seiten]

    def quelle_von(p):
        return QUELLE / (PLATZHALTER if platz and p == Path('index.html') else p)

    # Die Seiten und eigenen Texte ohne Kommentare und mit umgesetzten Markierungen der Ausgabe, die Seiten mit Canonical und
    # Vorschau-Angaben
    texte = {}
    for p in dateien:
        if p.suffix in TEXTDATEIEN:
            neu = artefakt.bereinigen(p, quelle_von(p).read_text(encoding='utf-8'))
            if neu is not None:
                texte[p] = artefakt.ausgabe_umsetzen(neu, ausgabe, p.as_posix()) if p.suffix == '.html' else neu
    texte[Path('datenschutz.html')] = tarif_waehlen(texte[Path('datenschutz.html')], TARIF)
    for p in texte:
        texte[p] = verweise_umschreiben(p, texte[p])
    seiten = [p.as_posix() for p in dateien if p.suffix == '.html']
    offen = {s for s in seiten if MARKER.search(texte[Path(s)])}
    if platz:
        # Im Platzhalter ist nur / indiziert: das Exposé, Impressum und Datenschutz tragen noindex; die übrigen Seiten leitet
        # vercel.json auf / weiter
        noindex = (offen if entwurf else set()) | NOINDEX_PLATZHALTER
        ld_seiten, ld = LD_PLATZHALTER, person_knapp(texte)
        umleiten = [s for s in SEITEN if s not in seiten_liste]
    else:
        # noindex und nicht in der Sitemap: im Entwurf die Seiten mit offenen Stellen; lesen.html, solange es keinen Text gibt;
        # erzaehlungen.html und untertext.html, solange es keinen Text ihrer Art gibt
        noindex = ((offen if entwurf else set()) | (set() if zahl_texte else {LESESEITE})
                   | {s for s, art in LISTENSEITEN.items() if art not in arten})
        ld_seiten, ld = LD_SEITEN, strukturierte_daten(texte)
        umleiten = None
    for s in seiten:
        if s != FEHLERSEITE:
            texte[Path(s)] = kopf_ergaenzen(s, texte[Path(s)], s in noindex, ld.get(s))

    # vercel.json mit den Hashes der Skripte in den Seiten; im Platzhalter dazu die Weiterleitungen und X-Robots-Tag
    hashes = sorted({h for s in seiten for h in skripte_in_seite(s, texte[Path(s)])})
    texte[Path('vercel.json')] = vercel_mit_hashes((QUELLE / 'vercel.json').read_text(encoding='utf-8'), hashes)
    if platz:
        texte[Path('vercel.json')] = vercel_platzhalter(texte[Path('vercel.json')], umleiten, noindex)

    if platz:
        # Aus daten/ und bilder/ nur, worauf eine ausgelieferte Datei verweist
        drin = verwiesen(dateien, texte, PFLICHT)
        weg = sorted(p for p in dateien if p not in drin)
    else:
        # Bilder, auf die nichts verweist, bleiben weg (das Vorschaubild steht nun im Kopf jeder Seite)
        alles = ''.join(texte.values())
        weg = sorted(p for p in dateien if p.parts[0] == 'bilder' and p.as_posix() not in alles)
    dateien = [p for p in dateien if p not in weg]
    ausgeliefert = sorted(set(dateien) | {Path('sitemap.xml'), Path('robots.txt')})

    ziel.parent.mkdir(parents=True, exist_ok=True)
    neu = Path(tempfile.mkdtemp(prefix='.veroeffentlichung-', dir=ziel.parent))
    try:
        for p in dateien:
            (neu / p).parent.mkdir(parents=True, exist_ok=True)
            if p in texte:
                (neu / p).write_text(texte[p], encoding='utf-8', newline='\n')
            else:
                shutil.copy2(QUELLE / p, neu / p)
        eintraege = sitemap(neu, ziel, heute, noindex, seiten_liste)
        if [u for u, _ in eintraege] != [url_fuer(s) for s in seiten_liste if s not in noindex]:
            fehler('sitemap.xml: die Seiten passen nicht zu den Seiten ohne noindex')
        if pruefen(neu, ausgeliefert, seiten, noindex, ld_seiten, umleiten) != set(hashes):
            fehler('Die Hashes in vercel.json passen nicht zu den Skripten in den Seiten')

        marker = marker_suchen(neu, ausgeliefert)
        if marker:
            liste = '\n'.join(f'  {ort}: {m}' for ort, m in marker)
            if not entwurf:
                fehler(f'{len(marker)} offene Stellen [[ZU PRÜFEN …]]; erst klären oder mit --entwurf bauen:\n{liste}')
            print(f'Entwurf: {len(marker)} offene Stellen [[ZU PRÜFEN …]] (Seiten damit tragen noindex):\n{liste}')

        if ziel.exists():
            alt = Path(tempfile.mkdtemp(prefix='.veroeffentlichung-alt-', dir=ziel.parent))
            alt.rmdir()
            ziel.rename(alt)
            neu.rename(ziel)
            shutil.rmtree(alt)
        else:
            neu.rename(ziel)
    finally:
        if neu.exists():
            shutil.rmtree(neu)

    groesse = sum((ziel / p).stat().st_size for p in ausgeliefert)
    print(f'{"Entwurf" if entwurf else "Veröffentlichung"} in {ziel}, Adresse {BASIS_URL}')
    print(f'Ausgabe: {ausgabe}' + (f' (unter / {PLATZHALTER}; dazu {", ".join(seiten_liste[1:])} und {FEHLERSEITE}; '
                                   f'{len(umleiten) * 2} Weiterleitungen mit 307 auf /)' if platz else ' (die volle Website)'))
    print(f'{len(ausgeliefert)} Dateien, {groesse / 1024:.1f} KB; {len(hashes)} Skripte in den Seiten, je mit Hash in script-src')
    print('Sitemap: ' + ', '.join(f'{u.removeprefix(BASIS_URL) or "/"} {d}' for u, d in eintraege))
    if platz:
        print(f'Adressen ohne .html (cleanUrls); noindex: {", ".join(sorted(noindex))}')
    else:
        print(f'Adressen ohne .html (cleanUrls); noindex: {", ".join(sorted(noindex)) or "keine"}; '
              f'Texte in daten/texte.js: {zahl_texte} ({LESESEITE} {"in der Sitemap" if zahl_texte else "mit noindex, nicht in der Sitemap"}'
              + ''.join(f'; {s} {"in der Sitemap" if art in arten else "ohne Text ihrer Art: noindex"}' for s, art in LISTENSEITEN.items()) + ')')
    print('Strukturierte Daten: ' + ', '.join(f'{s} {t}' for s, t in ld_seiten.items())
          + f'; Tarif bei Vercel: {TARIF or "offen (beide Fassungen und die Markierung stehen im Datenschutz)"}')
    print('Ausgelassen: ' + ', '.join(sorted(AUSLASSEN) + [p.as_posix() for p in weg_seiten if not (platz and p == Path(PLATZHALTER))]
                                      + [p.as_posix() + ' (nirgends verwiesen)' for p in weg]))
    if hinweise:
        print(f'Hinweis: {PLATZHALTER} ist nicht mehr auf dem Stand der Startseite oder der Daten; der Bau des Platzhalters bricht so '
              'ab, bis sie nachgezogen ist:\n  ' + '\n  '.join(hinweise))


if __name__ == '__main__':
    main()
