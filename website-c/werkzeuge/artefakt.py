#!/usr/bin/env python3
"""Baut aus website-c/ (Version C) die Fassung für einen eigenen privaten claude.ai-Link (ein Artefakt aus mehreren Dateien).
A und B behalten ihre Links; dies ist die Fassung von werkzeuge/artefakt.py aus Version B für website-c/, ohne den Abgleich
der Daten mit Version A (C hat eigene Textänderungen in daten/inhalt.js und daten/buecher.js und dazu daten/fluesse.js).

Aufruf (aus einem beliebigen Ordner):
  python3 website-c/werkzeuge/artefakt.py <zielordner>

Der Zielordner wird neu angelegt; liegt dort schon ein früherer Bau (ein Ordner mit index.html), wird er ersetzt.

Was der Bau tut:
  - Er kopiert website-c/ in den Zielordner, ohne werkzeuge/, README.md, versteckte Dateien und ohne Bilder aus bilder/,
    auf die keine Seite, kein Skript und kein Stil verweist. Schriften (schrift/, mit den Lizenzen) und Bibliotheken (lib/)
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

Zum Schluss prüft der Bau, dass jede unveränderte Kopie der Quelle gleicht, dass in keiner ausgelieferten Text-Datei ein
Kommentar übrig ist, und nennt Zahl und Größe der Dateien.
"""
import filecmp
import os
import re
import shutil
import sys
from pathlib import Path

QUELLE = Path(__file__).resolve().parents[1]
HAUPTSEITE = 'index.html'
AUSLASSEN = {'werkzeuge', 'README.md'}
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


def dateien_sammeln():
    alle = []
    for ordner, unterordner, namen in os.walk(QUELLE):
        rel = Path(ordner).relative_to(QUELLE)
        unterordner[:] = sorted(u for u in unterordner if not u.startswith('.') and str(rel / u) not in AUSLASSEN)
        for name in sorted(namen):
            p = rel / name
            if name.startswith('.') or str(p) in AUSLASSEN:
                continue
            alle.append(p)
    bilder = {p for p in alle if p.parts[0] == 'bilder'}
    weg = sorted(bilder - verwiesene_bilder(alle))
    return [p for p in alle if p not in weg], weg


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
    if len(argumente) != 1 or argumente[0].startswith('-'):
        fehler('Aufruf: python3 website-c/werkzeuge/artefakt.py <zielordner>')
    ziel = Path(argumente[0]).expanduser().resolve()
    ziel_pruefen(ziel)

    dateien, weg = dateien_sammeln()
    if Path(HAUPTSEITE) not in dateien:
        fehler(f'{HAUPTSEITE} fehlt in {QUELLE}')

    bereinigt = set()
    for p in dateien:
        (ziel / p).parent.mkdir(parents=True, exist_ok=True)
        neu = bereinigen(p, (QUELLE / p).read_text(encoding='utf-8')) if p.suffix in TEXTDATEIEN else None
        if p == Path(HAUPTSEITE):
            neu = hauptseite_umbauen(neu)
        if neu is not None:
            (ziel / p).write_text(neu, encoding='utf-8', newline='\n')
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

    groesse = sum((ziel / p).stat().st_size for p in dateien)
    print(f'Bau in {ziel}')
    print(f'{len(dateien)} Dateien, {groesse / 1024:.1f} KB')
    print(f'Hauptseite: {ziel / HAUPTSEITE} (ohne eigenes Gerüst)')
    print(f'Ohne Kommentare: {len(bereinigt)} Dateien')
    print('Ausgelassen: ' + ', '.join(sorted(AUSLASSEN) + [str(p) + ' (nirgends verwiesen)' for p in weg]))


if __name__ == '__main__':
    main()
