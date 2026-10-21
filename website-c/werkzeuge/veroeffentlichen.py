#!/usr/bin/env python3
"""Baut aus website-c/ (Version C) den Ordner veroeffentlichung/, den Vercel ausliefert (Root Directory „veroeffentlichung“,
Framework „Other“, kein Build-Schritt; docs/vercel-einrichtung.md). Vercel baut nur neu, wenn sich in veroeffentlichung/ etwas
ändert. Darum entsteht der Ordner nur mit diesem Werkzeug, als bewusster, geprüfter Stand. Von Hand wird darin nichts geändert.

Aufruf (aus einem beliebigen Ordner):
  python3 website-c/werkzeuge/veroeffentlichen.py              die echte Veröffentlichung
  python3 website-c/werkzeuge/veroeffentlichen.py --entwurf    auch mit offenen [[ZU PRÜFEN …]]-Stellen; nennt sie alle
  … --ziel <ordner>                                             woanders hin bauen, etwa zum Ausprobieren

Die Adresse der Website steht an genau einer Stelle: BASIS_URL unten. Aus ihr entstehen Canonical, Open Graph, sitemap.xml
und robots.txt. Ändert sich die Domain, nur BASIS_URL ändern und neu bauen.

Was der Bau tut:
  - Er kopiert website-c/ ohne werkzeuge/, README.md, versteckte Dateien und ohne Bilder aus bilder/, auf die nichts verweist.
    Alle Seiten behalten ihr Gerüst (<!doctype>, <html>, <head>, <body>), auch index.html.
  - Aus HTML, CSS und den eigenen Skripten (nicht aus lib/) entfernt er alle Kommentare, wie werkzeuge/artefakt.py.
  - In den Kopf jeder Seite außer 404.html schreibt er Canonical, og:title (der <title>), og:description (die vorhandene
    Meta-Beschreibung), og:url, og:image (bilder/vorschau.jpg), og:locale de_DE und twitter:card summary_large_image.
  - Die Skripte, die in den Seiten stehen (<script> ohne src), bleiben, wo sie sind. Für jedes trägt er den SHA-256-Hash
    seines Texts in script-src der Content-Security-Policy in vercel.json ein (in website-c/vercel.json steht nur 'self').
    So erlaubt die CSP genau diese Skripte und kein anderes, ohne 'unsafe-inline'.
  - Er schreibt sitemap.xml mit den elf Seiten und robots.txt (alles erlaubt, Verweis auf die Sitemap). lastmod ist das Datum
    des Baus, außer eine Seite (mit ihren Skripten und Stilen) ist gleich geblieben: dann bleibt das lastmod des letzten Baus.
    Im Entwurf fehlen in der Sitemap die Seiten mit noindex (offene Stellen).
  - vercel.json, 404.html, die Icons und das Vorschaubild gehen mit.
  - Steht in einer ausgelieferten Datei noch „[[ZU PRÜFEN“, baut er nicht, außer mit --entwurf. Dann nennt er jede Stelle, und
    die Seiten mit offenen Stellen bekommen <meta name="robots" content="noindex">, damit kein Entwurf in Suchmaschinen landet.
  - Ist in seite.js NEWSLETTER = true, aber der Abschnitt „Newsletter“ fehlt im Datenschutz oder der Dank nach dem Eintragen
    (POST_DANKE) ist leer oder spricht vom Testsystem, baut er nicht.

Er baut zuerst in einen versteckten Ordner neben dem Ziel und prüft dort: keine Kommentare, jedes Skript in einer Seite hat
seinen Hash in der CSP, keine Ereignis-Attribute (onclick=) und keine javascript:-Verweise, keine Ressource von fremden
Servern, jeder lokale Verweis zeigt auf eine ausgelieferte Datei, jede Seite hat Icons und Vorschau-Angaben, kein Wort vom
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
# Was die Content-Security-Policy mindestens sagen muss (script-src bekommt dazu die Hashes)
CSP_SOLL = {
    'default-src': ["'self'"], 'script-src': ["'self'"], 'style-src': ["'self'", "'unsafe-inline'"], 'img-src': ["'self'", 'data:'],
    'font-src': ["'self'"], 'connect-src': ["'self'"], 'frame-ancestors': ["'none'"], 'base-uri': ["'self'"],
    'form-action': ["'self'"], 'object-src': ["'none'"],
}
HEADER_SOLL = {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
}


def fehler(text):
    sys.exit('veroeffentlichen.py: ' + text)


artefakt.fehler = fehler


def url_fuer(seite):
    return BASIS_URL + ('/' if seite == 'index.html' else '/' + seite)


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


def vorher_pruefen(dateien):
    namen = {p.as_posix() for p in dateien}
    for p in PFLICHT:
        if p not in namen:
            fehler(f'{p} fehlt in {QUELLE} (Icons und Vorschaubild: werkzeuge/favicon.py, dann werkzeuge/bilder.cjs)')
    for p in ('robots.txt', 'sitemap.xml'):
        if p in namen:
            fehler(f'website-c/{p} gibt es; beide schreibt nur der Bau (aus BASIS_URL). Bitte die Datei entfernen')
    seiten = {p.name for p in dateien if p.suffix == '.html' and len(p.parts) == 1} - {FEHLERSEITE}
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


# ---------- Seiten ----------
SKRIPT_IN_SEITE = re.compile(r'<script\b([^>]*)>(.*?)</script>', re.S | re.I)


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


def kopf_ergaenzen(seite, text, entwurf_offen):
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
    if entwurf_offen:
        zeilen.insert(0, '<meta name="robots" content="noindex">')
    if re.search(r'rel="canonical"|property="og:|name="twitter:', text):
        fehler(f'{seite}: hat schon Canonical oder Open Graph; die schreibt nur der Bau (aus BASIS_URL)')
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


def sitemap(neu, ziel, heute, ohne):
    """sitemap.xml und robots.txt. Seiten aus ohne (im Entwurf die mit noindex) stehen nicht in der Sitemap: Suchmaschinen sollen
    keine Adresse gemeldet bekommen, die sie nicht aufnehmen dürfen."""
    alt = alte_lastmods(ziel)
    eintraege = []
    for seite in SEITEN:
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
    if ref.startswith('/'):
        return Path(ref.lstrip('/')) if ref != '/' else Path('index.html')
    return Path(os.path.normpath((Path(seite).parent / ref).as_posix()))


def vercel_pruefen(konfig, hashes, probleme):
    if konfig.get('cleanUrls') is not False:
        probleme.append('vercel.json: cleanUrls soll false sein (die Verweise enden auf .html)')
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
    for quelle, soll in (('/', 'must-revalidate'), ('/(.*)\\.html', 'must-revalidate'), ('/(schrift|lib|daten|bilder)/(.*)', 'max-age=86400')):
        if soll not in cache.get(quelle, '') or 'immutable' in cache.get(quelle, ''):
            probleme.append(f'vercel.json: Cache-Control für {quelle} ist „{cache.get(quelle)}“')


def pruefen(neu, dateien, seiten):
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
    for seite in seiten:
        text = (neu / seite).read_text(encoding='utf-8')
        hashes.update(skripte_in_seite(seite, text))
        # Für die Prüfung der Tags zählt nur das HTML, nicht der Text der Skripte in der Seite
        text = re.sub(r'(<script\b[^>]*>).*?(</script>)', r'\1\2', text, flags=re.S | re.I)
        for m in re.finditer(r'<[a-zA-Z][^>]*\s(on[a-z]+)\s*=', text):
            probleme.append(f'{seite}: Ereignis-Attribut {m.group(1)}= (verbietet die CSP)')
        if re.search(r'(?:href|src|action)="\s*javascript:', text, re.I):
            probleme.append(f'{seite}: javascript:-Verweis (verbietet die CSP)')
        sichtbar = re.sub(r'<(script|style)\b.*?</\1>', '', text, flags=re.S | re.I)
        if TESTSYSTEM.search(sichtbar):
            probleme.append(f'{seite}: „{TESTSYSTEM.search(sichtbar).group(0)}“ in der Seite')
        # Ressourcen nur vom eigenen Server; jeder lokale Verweis zeigt auf eine ausgelieferte Datei
        for tag in re.finditer(r'<(a|link|script|img|source|iframe|video|audio|embed|object|form)\b([^>]*)>', text, re.I):
            art, attr = tag.group(1).lower(), tag.group(2)
            for name, wert in re.findall(r'\b(href|src|srcset|action|data)="([^"]*)"', attr):
                for ref in ([w.strip().split(' ')[0] for w in wert.split(',')] if name == 'srcset' else [wert]):
                    if re.match(r'(?:https?:)?//', ref):
                        if art == 'a' or (art == 'link' and 'rel="canonical"' in attr):
                            continue
                        probleme.append(f'{seite}: <{art}> lädt von einem fremden Server: {ref}')
                        continue
                    if re.match(r'(mailto|tel|data):|#', ref):
                        continue
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
    vercel_pruefen(json.loads((neu / 'vercel.json').read_text(encoding='utf-8')), hashes, probleme)
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
    argumente = [a for a in argumente if a != '--entwurf']
    ziel = ZIEL
    if argumente[:1] == ['--ziel'] and len(argumente) == 2:
        ziel = Path(argumente[1]).expanduser().resolve()
    elif argumente:
        fehler('Aufruf: python3 website-c/werkzeuge/veroeffentlichen.py [--entwurf] [--ziel <ordner>]')
    ziel_pruefen(ziel)

    dateien = dateien_sammeln()
    vorher_pruefen(dateien)
    heute = datetime.date.today().isoformat()

    # Die Seiten und eigenen Texte ohne Kommentare, die Seiten mit Canonical und Vorschau-Angaben
    texte = {}
    for p in dateien:
        if p.suffix in TEXTDATEIEN:
            neu = artefakt.bereinigen(p, (QUELLE / p).read_text(encoding='utf-8'))
            if neu is not None:
                texte[p] = neu
    seiten = [p.as_posix() for p in dateien if p.suffix == '.html']
    offen = {s for s in seiten if MARKER.search(texte[Path(s)])}
    for s in seiten:
        if s != FEHLERSEITE:
            texte[Path(s)] = kopf_ergaenzen(s, texte[Path(s)], entwurf and s in offen)

    # vercel.json mit den Hashes der Skripte in den Seiten
    hashes = sorted({h for s in seiten for h in skripte_in_seite(s, texte[Path(s)])})
    texte[Path('vercel.json')] = vercel_mit_hashes((QUELLE / 'vercel.json').read_text(encoding='utf-8'), hashes)

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
        eintraege = sitemap(neu, ziel, heute, offen if entwurf else set())
        if pruefen(neu, ausgeliefert, seiten) != set(hashes):
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
    print(f'{len(ausgeliefert)} Dateien, {groesse / 1024:.1f} KB; {len(hashes)} Skripte in den Seiten, je mit Hash in script-src')
    print('Sitemap: ' + ', '.join(f'{u.removeprefix(BASIS_URL) or "/"} {d}' for u, d in eintraege))
    print('Ausgelassen: ' + ', '.join(sorted(AUSLASSEN) + [p.as_posix() + ' (nirgends verwiesen)' for p in weg]))


if __name__ == '__main__':
    main()
