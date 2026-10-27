#!/usr/bin/env python3
"""Baut aus website-c/ (Version C) die Fassung für einen eigenen privaten claude.ai-Link (ein Artefakt aus mehreren Dateien).
A und B behalten ihre Links; dies ist die Fassung von werkzeuge/artefakt.py aus Version B für website-c/, ohne den Abgleich
der Daten mit Version A (C hat eigene Textänderungen in daten/inhalt.js und daten/buecher.js und dazu daten/fluesse.js).

Aufruf (aus einem beliebigen Ordner):
  python3 website-c/werkzeuge/artefakt.py <zielordner>

Der Zielordner wird neu angelegt; liegt dort schon ein früherer Bau (ein Ordner mit index.html), wird er ersetzt.

Was der Bau tut:
  - Er kopiert website-c/ in den Zielordner, ohne werkzeuge/, README.md, versteckte Dateien, ohne 404.html und vercel.json (die
    gehören nur zur Veröffentlichung bei Vercel, siehe werkzeuge/veroeffentlichen.py) und ohne Bilder aus bilder/, auf die
    keine Seite, kein Skript und kein Stil verweist (etwa bilder/vorschau.jpg, das erst die Veröffentlichung einträgt). Schriften (schrift/, mit den Lizenzen) und Bibliotheken (lib/)
    gehen mit, die Seiten laden nichts von fremden Servern.
  - Aus HTML, CSS und den eigenen Skripten (nicht aus lib/, dort stehen die Lizenzen) entfernt er alle Kommentare, auch die
    in <script> und <style> der Seiten. Ausgeliefert wird nur, was zur Seite gehört. Die übrigen Dateien bleiben Byte für Byte
    gleich.
  - Die Hauptseite (index.html) bettet claude.ai selbst in ein Gerüst aus <!doctype html>, <head> und <body> mit
    Zeichensatz und Viewport. Sie verliert deshalb ihr eigenes Gerüst: <!doctype>, <html>, <head>, <meta charset>, </head>,
    <body>, </body> und </html> fallen weg. Oben stehen danach nur Titel, Meta-Angaben, Links und Stil, dann der Inhalt
    und die Skripte, in derselben Reihenfolge wie vorher.
  - Was am <html> und am <body> stand, setzt ein kleines Skript: ganz oben die Sprache (document.documentElement.lang,
    davon hängt die Silbentrennung ab), an der Stelle des alten <body> dessen Klassen (mit-globus; ohne das Gerüst von
    claude.ai bekommt sie <html>).
  - Die übrigen Seiten liefert claude.ai unverändert aus; sie behalten ihr Gerüst.
  - Im Datenschutz steht der Absatz zur Auftragsverarbeitung in der Fassung, die TARIF in werkzeuge/veroeffentlichen.py wählt
    (Runde 6, S8), wie in der Veröffentlichung; solange TARIF None ist, beide Fassungen mit der Markierung davor. Die Verweise
    behalten .html (nur die Veröffentlichung bei Vercel hat Adressen ohne Endung), strukturierte Daten, Canonical und Open
    Graph schreibt nur die Veröffentlichung.

Zwei Ausgaben (27. Oktober), wie in der Veröffentlichung (werkzeuge/veroeffentlichen.py, AUSGABE; dort steht, was jede enthält):
  python3 website-c/werkzeuge/artefakt.py <zielordner>                 die Ausgabe, die AUSGABE in veroeffentlichen.py nennt
                                                                        (seit dem 27. Oktober 'platzhalter', solange die Website
                                                                        offline ist)
  python3 website-c/werkzeuge/artefakt.py --platzhalter <zielordner>   der Platzhalter: platzhalter.html als Hauptseite, dazu
                                                                        satoshi.html als digitales Exposé, Impressum, Datenschutz
  python3 website-c/werkzeuge/artefakt.py --website <zielordner>       die volle Website, gleich, was AUSGABE sagt
In beiden Ausgaben setzt der Bau die Markierungen data-nur und data-verweis um (ausgabe_umsetzen unten) und lässt keine stehen.
In der vollen Website fehlt platzhalter.html; im Platzhalter fehlen die übrigen Seiten und aus daten/ und bilder/, worauf keine
ausgelieferte Datei verweist, und kein Verweis zeigt auf eine Datei, die nicht mitgeht. Wohin jede Seite dort verweisen darf,
steht in VERWEISE_PLATZHALTER in veroeffentlichen.py (die Hauptseite nur auf Impressum und Datenschutz, auf das Exposé nur das
Exposé selbst); auch das prüft der Bau.

Zum Schluss prüft der Bau, dass jede unveränderte Kopie der Quelle gleicht, dass in keiner ausgelieferten Text-Datei ein
Kommentar übrig ist, und nennt Zahl und Größe der Dateien.
"""
import filecmp
import os
import re
import shutil
import sys
from html.parser import HTMLParser
from pathlib import Path

QUELLE = Path(__file__).resolve().parents[1]
HAUPTSEITE = 'index.html'
# 404.html und vercel.json gehören nur zur Veröffentlichung bei Vercel (werkzeuge/veroeffentlichen.py): die Fehlerseite verweist vom
# Wurzelordner aus (/stil.css), was unter claude.ai ins Leere ginge
AUSLASSEN = {'werkzeuge', 'README.md', '404.html', 'vercel.json'}
TEXTDATEIEN = ('.html', '.css', '.js')


def fehler(text):
    sys.exit('artefakt.py: ' + text)


def attribute(roh, tag):
    """Die Attribute eines Tags als dict; nur doppelt gequotete Werte, wie sie auf diesen Seiten stehen."""
    rest = re.sub(r'\s+([\w-]+)="([^"]*)"', '', roh)
    if rest.strip():
        fehler(f'<{tag}> hat Attribute, die der Bau nicht versteht: {roh!r}')
    return dict(re.findall(r'([\w-]+)="([^"]*)"', roh))


def js_text(wert):
    return "'" + wert.replace('\\', '\\\\').replace("'", "\\'") + "'"


# ---------- Kommentare entfernen ----------
# Ein kleiner Zerleger für JavaScript: er kennt Zeichenketten, Vorlagen mit ${…}, reguläre Ausdrücke und Kommentare.
# Reguläre Ausdrücke erkennt er am Zeichen davor (wie ein Parser es täte, für den Code dieser Website ausreichend).
REGEX_VOR = set('(,=:[!&|?{};+-*%<>~^') | {''}
REGEX_WOERTER = ('return', 'typeof', 'case', 'in', 'of', 'delete', 'void', 'throw', 'new', 'else', 'do', 'yield', 'await')


def js_ohne_kommentare(t):
    aus, i, n = [], 0, len(t)

    def vorher():
        k = ''.join(aus).rstrip()
        if not k:
            return ''
        for w in REGEX_WOERTER:
            if k.endswith(w) and (len(k) == len(w) or not (k[-len(w) - 1].isalnum() or k[-len(w) - 1] in '_$')):
                return '('
        return k[-1]

    def zeichenkette(i, q):
        j = i + 1
        while j < n:
            if t[j] == '\\':
                j += 2
                continue
            if t[j] == q:
                return j + 1
            if t[j] == '\n':
                fehler('Zeilenende in einer Zeichenkette')
            j += 1
        fehler('Zeichenkette ohne Ende')

    def vorlage(i):
        # i steht auf `; zurück kommt das Ende und der Text mit bereinigten ${…}
        teile, j = ['`'], i + 1
        while j < n:
            c = t[j]
            if c == '\\':
                teile.append(t[j:j + 2]); j += 2; continue
            if c == '`':
                teile.append('`'); return j + 1, ''.join(teile)
            if c == '$' and j + 1 < n and t[j + 1] == '{':
                ende, innen = code(j + 2, bis_klammer=True)
                teile.append('${' + innen + '}'); j = ende; continue
            teile.append(c); j += 1
        fehler('Vorlage ohne Ende')

    def code(i, bis_klammer=False):
        nonlocal aus
        alt, aus = aus, []
        tiefe = 0
        while i < n:
            c = t[i]
            if bis_klammer and c == '}' and tiefe == 0:
                innen = ''.join(aus); aus = alt
                return i + 1, innen
            if c in '"\'':
                j = zeichenkette(i, c); aus.append(t[i:j]); i = j; continue
            if c == '`':
                i, txt = vorlage(i); aus.append(txt); continue
            if c == '/' and i + 1 < n and t[i + 1] == '/':
                j = t.find('\n', i)
                i = n if j < 0 else j
                continue
            if c == '/' and i + 1 < n and t[i + 1] == '*':
                j = t.find('*/', i + 2)
                if j < 0:
                    fehler('Kommentar ohne Ende')
                i = j + 2
                if aus and not aus[-1][-1:].isspace() and i < n and not t[i].isspace():
                    aus.append(' ')
                continue
            if c == '/' and vorher() in REGEX_VOR | {'('}:
                j, klasse = i + 1, False
                while j < n:
                    if t[j] == '\\':
                        j += 2; continue
                    if t[j] == '[':
                        klasse = True
                    elif t[j] == ']':
                        klasse = False
                    elif t[j] == '/' and not klasse:
                        break
                    elif t[j] == '\n':
                        fehler('Zeilenende in einem regulären Ausdruck')
                    j += 1
                j += 1
                while j < n and (t[j].isalpha()):
                    j += 1
                aus.append(t[i:j]); i = j; continue
            if c == '{':
                tiefe += 1
            elif c == '}':
                tiefe -= 1
            aus.append(c); i += 1
        if bis_klammer:
            fehler('${ ohne Ende')
        fertig = ''.join(aus); aus = alt
        return i, fertig

    _, ergebnis = code(0)
    return leerzeilen(ergebnis)


def leerzeilen(t):
    """Zeilen, die nach dem Entfernen nur noch Leerraum tragen, fallen weg; am Zeilenende kein Leerraum."""
    zeilen = [z.rstrip() for z in t.split('\n')]
    return '\n'.join(z for z in zeilen if z.strip()) + '\n'


def css_ohne_kommentare(t):
    if re.search(r'url\(\s*[^"\')]*/\*', t):
        fehler('/* in einer url() ohne Anführungszeichen')
    return leerzeilen(re.sub(r'/\*.*?\*/', '', t, flags=re.S))


def html_ohne_kommentare(t):
    t = re.sub(r'<!--.*?-->', '', t, flags=re.S)
    t = re.sub(r'(<script\b[^>]*>)(.*?)(</script>)', lambda m: m.group(1) + ('\n' + js_ohne_kommentare(m.group(2)) if m.group(2).strip() else '') + m.group(3), t, flags=re.S | re.I)
    t = re.sub(r'(<style\b[^>]*>)(.*?)(</style>)', lambda m: m.group(1) + '\n' + css_ohne_kommentare(m.group(2)) + m.group(3), t, flags=re.S | re.I)
    return t


# ---------- Zwei Ausgaben: die volle Website und der Platzhalter (27. Oktober) ----------
# Dominik: „Können wir sie wieder offline nehmen? Ich würde einfach einen Platzhalter auf der Startseite. […] Dann brauche ich
# getrennt davon eine Seite für Satoshi. Das bleibt. Das ist das sogenannte digitale Exposé. […] Also im Grunde die bestehende
# Seite ohne die Navigationselemente zu den anderen Seiten.“ Beide Ausgaben entstehen aus derselben Quelle; was nur in einer
# steht, ist in den Seiten markiert (erklärt auf satoshi.html), nach dem Entfernen der Kommentare:
#   data-nur="website"      nur in der vollen Website; im Platzhalter fällt das Element weg, allein auf seinen Zeilen mit ihnen
#   data-verweis="website"  ein Verweis, der nur in der vollen Website gilt; im Platzhalter wird das <a> ein <span> mit denselben
#                           übrigen Attributen (href, rel, target, hreflang, aria-current fallen weg), der Text bleibt
#   data-nur="expose"       nur im Platzhalter (dem digitalen Exposé); in der vollen Website fällt das Element weg
# Was bleibt, verliert die Markierung; danach steht keine mehr da. Gefunden werden die Elemente mit html.parser (Start- und
# Endmarke mit Verschachtelung), nicht über Textersetzung. Eine Seite ohne Markierung bleibt Zeichen für Zeichen, wie sie ist.
AUSGABEN = ('website', 'platzhalter')
LEERE_ELEMENTE = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}
MARKIERUNG = re.compile(r'\sdata-(?:nur|verweis)=')


class _Markierte(HTMLParser):
    """Jedes Element mit data-nur oder data-verweis: Name, Attribute, Lage der Start- und der Endmarke im Text."""

    def __init__(self, text, seite):
        super().__init__(convert_charrefs=False)
        self.text, self.seite = text, seite
        self.zeilen = [0] + [m.end() for m in re.finditer('\n', text)]
        self.stapel, self.funde = [], []

    def versatz(self):
        z, s = self.getpos()
        return self.zeilen[z - 1] + s

    def handle_starttag(self, tag, attrs):
        a, roh = self.versatz(), self.get_starttag_text()
        if self.text[a:a + len(roh)] != roh:
            fehler(f'{self.seite}: Startmarke nicht an ihrer Stelle: {roh[:60]!r}')
        e = {'tag': tag, 'attrs': dict(attrs), 'start': (a, a + len(roh)), 'ende': None}
        if tag in LEERE_ELEMENTE:
            e['ende'] = (a + len(roh), a + len(roh))
            self.merken(e)
        else:
            self.stapel.append(e)

    def handle_startendtag(self, tag, attrs):
        a, roh = self.versatz(), self.get_starttag_text()
        self.merken({'tag': tag, 'attrs': dict(attrs), 'start': (a, a + len(roh)), 'ende': (a + len(roh), a + len(roh))})

    def handle_endtag(self, tag):
        a = self.versatz()
        m = re.compile(r'</\s*' + re.escape(tag) + r'\s*>', re.I).match(self.text, a)
        if not m:
            fehler(f'{self.seite}: Endmarke </{tag}> nicht an ihrer Stelle')
        if not any(x['tag'] == tag for x in self.stapel):
            return
        while self.stapel:
            e = self.stapel.pop()
            if e['tag'] == tag:
                e['ende'] = (a, m.end())
                self.merken(e)
                return
            e['ende'] = (a, a)   # ohne eigene Endmarke (li, p): endet mit dem umgebenden Element
            self.merken(e)

    def merken(self, e):
        if 'data-nur' in e['attrs'] or 'data-verweis' in e['attrs']:
            self.funde.append(e)


def _attribut_weg(marke, name, seite):
    neu, n = re.subn(r'\s' + re.escape(name) + r'="[^"]*"', '', marke, count=1)
    if n != 1:
        fehler(f'{seite}: {name} nicht in {marke[:60]!r}')
    return neu


def ausgabe_umsetzen(text, ausgabe, seite='?'):
    """Eine Seite (ohne Kommentare) für die Ausgabe 'website' oder 'platzhalter'; ohne Markierung unverändert."""
    if ausgabe not in AUSGABEN:
        fehler(f'Ausgabe {ausgabe!r}; erlaubt sind {", ".join(AUSGABEN)}')
    if not MARKIERUNG.search(text):
        return text
    p = _Markierte(text, seite)
    p.feed(text)
    p.close()
    offen = [e['tag'] for e in p.stapel if 'data-nur' in e['attrs'] or 'data-verweis' in e['attrs']]
    if offen:
        fehler(f'{seite}: markierte Elemente ohne Ende: {offen}')
    aenderungen = []   # (anfang, ende, ersatz)
    for e in p.funde:
        nur, verweis = e['attrs'].get('data-nur'), e['attrs'].get('data-verweis')
        if nur not in (None, 'website', 'expose') or verweis not in (None, 'website') or (nur and verweis):
            fehler(f'{seite}: unbekannte Markierung data-nur={nur!r} data-verweis={verweis!r} an <{e["tag"]}>')
        if verweis and e['tag'] != 'a':
            fehler(f'{seite}: data-verweis an <{e["tag"]}>; nur an <a> erlaubt')
        (sa, se), (ea, ee) = e['start'], e['ende']
        if (nur == 'website' and ausgabe == 'platzhalter') or (nur == 'expose' and ausgabe == 'website'):
            za, zn = text.rfind('\n', 0, sa) + 1, text.find('\n', ee)
            if zn >= 0 and not text[za:sa].strip() and not text[ee:zn].strip():
                sa, ee = za, zn + 1
            aenderungen.append((sa, ee, ''))
            continue
        marke = _attribut_weg(text[sa:se], 'data-nur' if nur else 'data-verweis', seite)
        if verweis and ausgabe == 'platzhalter':
            for name in ('href', 'rel', 'target', 'hreflang', 'aria-current'):
                marke = re.sub(r'\s' + name + r'="[^"]*"', '', marke)
            marke = re.sub(r'^<a\b', '<span', marke)
            if text[ea:ee].lower() != '</a>':
                fehler(f'{seite}: <a data-verweis> ohne eigenes </a>')
            aenderungen.append((ea, ee, '</span>'))
        aenderungen.append((sa, se, marke))
    # Von vorn nach hinten; was in einem weggefallenen Element liegt, entfällt mit ihm
    aenderungen.sort(key=lambda x: (x[0], -x[1]))
    teile, pos = [], 0
    for a, e, ersatz in aenderungen:
        if a < pos:
            continue
        teile += [text[pos:a], ersatz]
        pos = e
    neu = ''.join(teile) + text[pos:]
    if MARKIERUNG.search(neu):
        fehler(f'{seite}: nach dem Umsetzen der Ausgabe {ausgabe} steht noch eine Markierung data-nur oder data-verweis da')
    return neu


def bereinigen(p, text):
    if p.parts[0] == 'lib':
        return None
    if p.suffix == '.html':
        return html_ohne_kommentare(text)
    if p.suffix == '.css':
        return css_ohne_kommentare(text)
    if p.suffix == '.js':
        return js_ohne_kommentare(text)
    return None


def veroeffentlichen_laden():
    """werkzeuge/veroeffentlichen.py für TARIF, AUSGABE und den Platzhalter (erst hier geladen: es lädt selbst dieses Werkzeug)."""
    sys.dont_write_bytecode = True   # kein __pycache__ in werkzeuge/
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    import veroeffentlichen
    veroeffentlichen.fehler = fehler
    return veroeffentlichen


def tarif_waehlen(text):
    """datenschutz.html mit der Fassung des Absatzes zur Auftragsverarbeitung, die TARIF in veroeffentlichen.py wählt."""
    v = veroeffentlichen_laden()
    return v.tarif_waehlen(text, v.TARIF)


def hauptseite_umbauen(text):
    m = re.match(r'﻿?<!doctype html>[ \t]*\n?', text, re.I)
    if not m:
        fehler(f'{HAUPTSEITE} beginnt nicht mit <!doctype html>')
    text = text[m.end():]

    m = re.match(r'<html((?:\s+[\w-]+="[^"]*")*)\s*>[ \t]*\n?', text)
    if not m:
        fehler(f'{HAUPTSEITE}: kein <html> nach dem Doctype')
    html_attr = attribute(m.group(1), 'html')
    if set(html_attr) - {'lang'}:
        fehler(f'<html> trägt mehr als lang: {html_attr}')
    text = text[m.end():]

    m = re.match(r'<head>[ \t]*\n?', text)
    if not m:
        fehler(f'{HAUPTSEITE}: kein <head> nach <html>')
    text = text[m.end():]

    if text.count('</head>') != 1:
        fehler(f'{HAUPTSEITE}: </head> steht nicht genau einmal da')
    kopf, rumpf = text.split('</head>')

    # Den Zeichensatz setzt das Gerüst von claude.ai; im <body> wäre er ohne Wirkung.
    kopf, n = re.subn(r'^[ \t]*<meta charset="[^"]*">[ \t]*\n', '', kopf, count=1, flags=re.M)
    if n != 1:
        fehler(f'{HAUPTSEITE}: <meta charset> nicht gefunden')

    # Im Kopf dürfen nur Titel, Meta-Angaben, Links, Stil und Skripte stehen; alles andere gehörte nicht nach oben.
    ohne_bloecke = re.sub(r'<(style|script)\b[^>]*>.*?</\1>', '', kopf, flags=re.S | re.I)
    fremd = set(t.lower() for t in re.findall(r'<([a-zA-Z][\w-]*)', ohne_bloecke)) - {'title', 'meta', 'link'}
    if fremd:
        fehler(f'{HAUPTSEITE}: unerwartete Elemente im Kopf: {sorted(fremd)}')
    if '<title>' not in kopf:
        fehler(f'{HAUPTSEITE}: kein <title> im Kopf')

    m = re.match(r'\s*<body((?:\s+[\w-]+="[^"]*")*)\s*>[ \t]*\n?', rumpf)
    if not m:
        fehler(f'{HAUPTSEITE}: kein <body> nach </head>')
    body_attr = attribute(m.group(1), 'body')
    if set(body_attr) - {'class'}:
        fehler(f'<body> trägt mehr als class: {body_attr}')
    rumpf = rumpf[m.end():]

    m = re.search(r'\s*</body>\s*</html>\s*$', rumpf)
    if not m:
        fehler(f'{HAUPTSEITE} endet nicht mit </body></html>')
    rumpf = rumpf[:m.start()]

    oben = []
    if html_attr.get('lang'):
        oben.append(f"<script>document.documentElement.lang = {js_text(html_attr['lang'])};</script>\n")
    klassen = body_attr.get('class', '').split()
    koerper = ''
    if klassen:
        # Im Gerüst von claude.ai steht das Skript im <body>; liest man den Bau ohne Gerüst, steht es noch im Kopf, dann
        # bekommt <html> die Klassen (die Stile fragen nur nach Vorfahren, etwa .mit-globus .kopf)
        koerper = '<script>(document.body || document.documentElement).classList.add(' + ', '.join(js_text(k) for k in klassen) + ');</script>\n'

    neu = ''.join(oben) + kopf + koerper + rumpf + '\n'
    rest = re.findall(r'<(!doctype|/?html|/?head|/?body)\b', neu, re.I)
    if rest:
        fehler(f'{HAUPTSEITE}: nach dem Umbau stehen noch Gerüst-Tags da: {rest}')
    return neu


def verwiesene_bilder(dateien):
    """Die Bilder aus bilder/, auf die eine der veröffentlichten Text-Dateien verweist (Pfade relativ zu website-c/)."""
    texte = ''.join((QUELLE / p).read_text(encoding='utf-8') for p in dateien if p.suffix in TEXTDATEIEN)
    return {p for p in dateien if p.parts[0] == 'bilder' and p.as_posix() in texte}


def dateien_sammeln(v, ausgabe='website'):
    """Die Dateien der Ausgabe und die ausgelassenen Bilder. Volle Website: alles außer platzhalter.html, ohne Bilder, auf die nichts
    verweist. Platzhalter: nur die Seiten aus SEITEN_PLATZHALTER (index.html kommt dann aus platzhalter.html); was aus daten/ und
    bilder/ mitgeht, entscheidet main() nach den bereinigten Texten (veroeffentlichen.verwiesen)."""
    alle = []
    for ordner, unterordner, namen in os.walk(QUELLE):
        rel = Path(ordner).relative_to(QUELLE)
        unterordner[:] = sorted(u for u in unterordner if not u.startswith('.') and str(rel / u) not in AUSLASSEN)
        for name in sorted(namen):
            p = rel / name
            if name.startswith('.') or str(p) in AUSLASSEN:
                continue
            alle.append(p)
    weg_seiten = {Path(v.PLATZHALTER)}
    if ausgabe == 'platzhalter':
        weg_seiten |= {Path(s) for s in v.SEITEN if s not in v.SEITEN_PLATZHALTER}
        return [p for p in alle if p not in weg_seiten], []
    alle = [p for p in alle if p not in weg_seiten]
    bilder = {p for p in alle if p.parts[0] == 'bilder'}
    weg = sorted(bilder - verwiesene_bilder(alle))
    return [p for p in alle if p not in weg], weg


def verweise_pruefen(texte, dateien, regeln):
    """Platzhalter: jeder lokale Verweis einer Seite (href, src) zeigt auf eine Datei, die mitgeht; nach außen nur https. Dazu
    führen die Verweise jeder Seite (<a href>, <area href>, <form action>) nur dorthin, wohin regeln (VERWEISE_PLATZHALTER in
    veroeffentlichen.py) es erlauben: eigene Seiten (ein Anker allein zeigt auf die Seite selbst) und, wenn erlaubt, mailto: und
    nach außen."""
    namen = {p.as_posix() for p in dateien}
    probleme = []
    for p, text in texte.items():
        if p.suffix != '.html':
            continue
        if p.as_posix() not in regeln:
            probleme.append(f'{p}: keine Regel in VERWEISE_PLATZHALTER')
        erlaubt, auch_aussen = regeln.get(p.as_posix(), (set(), False))
        html = re.sub(r'(<(script|style)\b[^>]*>).*?(</\2>)', r'\1\3', text, flags=re.S | re.I)
        for tag, attr in re.findall(r'<(a|area|link|script|img|source|iframe|form)\b([^>]*)>', html, re.I):
            for name, ref in re.findall(r'\b(href|src|action)="([^"]*)"', attr):
                verweis = tag.lower() in ('a', 'area', 'form')
                if re.match(r'(?:https:)?//|mailto:', ref):
                    if verweis and not auch_aussen:
                        probleme.append(f'{p}: Verweis auf {ref}; diese Seite verweist nur auf {", ".join(sorted(erlaubt))}')
                    continue
                if re.match(r'data:', ref):
                    continue
                if re.match(r'[a-z]+:', ref, re.I):
                    probleme.append(f'{p}: {name}="{ref}"')
                    continue
                pfad = ref.split('#')[0].split('?')[0]
                z = os.path.normpath((p.parent / pfad).as_posix()) if pfad else p.as_posix()
                if z not in namen:
                    probleme.append(f'{p}: Verweis auf {ref}, die Datei geht nicht mit')
                elif verweis and z not in erlaubt:
                    probleme.append(f'{p}: Verweis auf {ref} (im Platzhalter verweist diese Seite nur auf {", ".join(sorted(erlaubt))}'
                                    f'{", mailto: und nach außen" if auch_aussen else ""})')
    if probleme:
        fehler('Verweise ins Leere oder nicht erlaubt:\n  ' + '\n  '.join(probleme))


def ziel_pruefen(ziel):
    if ziel == QUELLE or QUELLE in ziel.parents or ziel in QUELLE.parents or ziel == Path.home() or ziel == Path(ziel.anchor):
        fehler(f'{ziel} ist kein geeigneter Zielordner (Quelle, darüber oder darin)')
    if ziel.exists():
        if not ziel.is_dir():
            fehler(f'{ziel} ist eine Datei')
        inhalt = list(ziel.iterdir())
        if inhalt and not (ziel / HAUPTSEITE).exists():
            fehler(f'{ziel} ist nicht leer und sieht nicht nach einem früheren Bau aus; bitte selbst leeren')
        if (ziel / '.git').exists():
            fehler(f'{ziel} enthält .git')
        shutil.rmtree(ziel)


def main():
    argumente = sys.argv[1:]
    v = veroeffentlichen_laden()
    if '--platzhalter' in argumente and '--website' in argumente:
        fehler('--platzhalter und --website schließen einander aus')
    ausgabe = 'platzhalter' if '--platzhalter' in argumente else 'website' if '--website' in argumente else v.AUSGABE
    argumente = [a for a in argumente if a not in ('--platzhalter', '--website')]
    if len(argumente) != 1 or argumente[0].startswith('-'):
        fehler('Aufruf: python3 website-c/werkzeuge/artefakt.py [--platzhalter | --website] <zielordner>')
    if ausgabe not in AUSGABEN:
        fehler(f'AUSGABE in veroeffentlichen.py ist {ausgabe!r}; erlaubt sind {", ".join(AUSGABEN)}')
    platz = ausgabe == 'platzhalter'
    ziel = Path(argumente[0]).expanduser().resolve()
    ziel_pruefen(ziel)

    if platz:
        if not (QUELLE / v.PLATZHALTER).is_file():
            fehler(f'Ausgabe platzhalter: {v.PLATZHALTER} fehlt in {QUELLE}')
        v.platzhalter_pruefen()
    dateien, weg = dateien_sammeln(v, ausgabe)
    if Path(HAUPTSEITE) not in dateien:
        fehler(f'{HAUPTSEITE} fehlt in {QUELLE}')

    def quelle_von(p):
        return QUELLE / (v.PLATZHALTER if platz and p == Path(HAUPTSEITE) else p)

    # Texte ohne Kommentare, die Seiten mit umgesetzten Markierungen der Ausgabe
    texte = {}
    for p in dateien:
        neu = bereinigen(p, quelle_von(p).read_text(encoding='utf-8')) if p.suffix in TEXTDATEIEN else None
        if neu is not None and p.suffix == '.html':
            neu = ausgabe_umsetzen(neu, ausgabe, p.as_posix())
        if p == Path(HAUPTSEITE):
            neu = hauptseite_umbauen(neu)
        if p == Path('datenschutz.html'):
            neu = tarif_waehlen(neu)
        if neu is not None:
            texte[p] = neu
    if platz:
        # Aus daten/ und bilder/ nur, worauf eine ausgelieferte Datei verweist; kein Verweis ins Leere
        drin = v.verwiesen(dateien, texte, [])
        weg = sorted(p for p in dateien if p not in drin)
        dateien = [p for p in dateien if p in drin]
        texte = {p: t for p, t in texte.items() if p in drin}
        verweise_pruefen(texte, dateien, v.VERWEISE_PLATZHALTER)

    bereinigt = set()
    for p in dateien:
        (ziel / p).parent.mkdir(parents=True, exist_ok=True)
        if p in texte:
            (ziel / p).write_text(texte[p], encoding='utf-8', newline='\n')
            bereinigt.add(p)
        else:
            shutil.copy2(QUELLE / p, ziel / p)

    for p in dateien:
        if p not in bereinigt and not filecmp.cmp(QUELLE / p, ziel / p, shallow=False):
            fehler(f'{p} weicht von der Quelle ab')
    for p in bereinigt:
        rest = (ziel / p).read_text(encoding='utf-8')
        if '<!--' in rest or (p.suffix == '.css' and '/*' in rest):
            fehler(f'{p}: nach dem Bereinigen steht noch ein Kommentar da')
        if p.suffix == '.html' and MARKIERUNG.search(re.sub(r'(<script\b[^>]*>).*?(</script>)', r'\1\2', rest, flags=re.S | re.I)):
            fehler(f'{p}: Markierung data-nur oder data-verweis übrig')

    groesse = sum((ziel / p).stat().st_size for p in dateien)
    print(f'Bau in {ziel}')
    print(f'Ausgabe: {ausgabe}' + (f' (Hauptseite aus {v.PLATZHALTER}; dazu {", ".join(v.SEITEN_PLATZHALTER[1:])})' if platz else ' (die volle Website)'))
    print(f'{len(dateien)} Dateien, {groesse / 1024:.1f} KB')
    print(f'Hauptseite: {ziel / HAUPTSEITE} (ohne eigenes Gerüst)')
    print(f'Ohne Kommentare: {len(bereinigt)} Dateien')
    seiten_weg = sorted(s for s in v.SEITEN if s not in v.SEITEN_PLATZHALTER) if platz else [v.PLATZHALTER]
    print('Ausgelassen: ' + ', '.join(sorted(AUSLASSEN) + seiten_weg + [str(p) + ' (nirgends verwiesen)' for p in weg]))


if __name__ == '__main__':
    main()
