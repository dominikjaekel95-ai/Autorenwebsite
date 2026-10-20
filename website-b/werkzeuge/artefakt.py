#!/usr/bin/env python3
"""Baut aus website-b/ (Version B) die Fassung für einen eigenen privaten claude.ai-Link (ein Artefakt aus mehreren Dateien).
Version A behält ihren Link; dies ist die Fassung von werkzeuge/artefakt.py aus Version A für website-b/.

Aufruf (aus einem beliebigen Ordner):
  python3 website-b/werkzeuge/artefakt.py <zielordner>

Der Zielordner wird neu angelegt; liegt dort schon ein früherer Bau (ein Ordner mit index.html), wird er ersetzt.

Was der Bau tut:
  - Er kopiert website-b/ in den Zielordner, ohne werkzeuge/, README.md, versteckte Dateien und ohne Bilder aus bilder/,
    auf die keine Seite, kein Skript und kein Stil verweist (solange vita.html fehlt, das Bootsfoto). Alle Dateien bleiben
    Byte für Byte gleich, bis auf die Hauptseite.
  - Die Hauptseite (index.html) bettet claude.ai selbst in ein Gerüst aus <!doctype html>, <head> und <body> mit
    Zeichensatz und Viewport. Sie verliert deshalb ihr eigenes Gerüst: <!doctype>, <html>, <head>, <meta charset>, </head>,
    <body>, </body> und </html> fallen weg. Oben stehen danach nur Titel, Meta-Angaben, Links und Stil, dann der Inhalt
    und die Skripte, in derselben Reihenfolge wie vorher.
  - Was am <html> und am <body> stand, setzt ein kleines Skript: ganz oben die Sprache (document.documentElement.lang,
    davon hängt die Silbentrennung ab), an der Stelle des alten <body> dessen Klassen (in Version B keine).
  - Die übrigen Seiten liefert claude.ai unverändert aus; sie behalten ihr Gerüst.

Zum Schluss prüft der Bau, dass jede Kopie der Quelle gleicht, und nennt Zahl und Größe der Dateien.

Noch offen für Version B (Abschnitt 17 der Gestaltungsregeln): erzählende Kommentare aus HTML, CSS und JS entfernen,
bevor veröffentlicht wird. Der Bau kopiert die Dateien bisher Byte für Byte.
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
        koerper = '<script>document.body.classList.add(' + ', '.join(js_text(k) for k in klassen) + ');</script>\n'

    neu = ''.join(oben) + kopf + koerper + rumpf + '\n'
    rest = re.findall(r'<(!doctype|/?html|/?head|/?body)\b', neu, re.I)
    if rest:
        fehler(f'{HAUPTSEITE}: nach dem Umbau stehen noch Gerüst-Tags da: {rest}')
    return neu


def verwiesene_bilder(dateien):
    """Die Bilder aus bilder/, auf die eine der veröffentlichten Text-Dateien verweist (Pfade relativ zu website-b/)."""
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
    if len(sys.argv) != 2:
        fehler('Aufruf: python3 website-b/werkzeuge/artefakt.py <zielordner>')
    ziel = Path(sys.argv[1]).expanduser().resolve()
    ziel_pruefen(ziel)

    dateien, weg = dateien_sammeln()
    if Path(HAUPTSEITE) not in dateien:
        fehler(f'{HAUPTSEITE} fehlt in {QUELLE}')

    for p in dateien:
        (ziel / p).parent.mkdir(parents=True, exist_ok=True)
        if p == Path(HAUPTSEITE):
            neu = hauptseite_umbauen((QUELLE / p).read_text(encoding='utf-8'))
            (ziel / p).write_text(neu, encoding='utf-8', newline='\n')
        else:
            shutil.copy2(QUELLE / p, ziel / p)

    for p in dateien:
        if p != Path(HAUPTSEITE) and not filecmp.cmp(QUELLE / p, ziel / p, shallow=False):
            fehler(f'{p} weicht von der Quelle ab')

    groesse = sum((ziel / p).stat().st_size for p in dateien)
    print(f'Bau in {ziel}')
    print(f'{len(dateien)} Dateien, {groesse / 1024:.1f} KB')
    print(f'Hauptseite: {ziel / HAUPTSEITE} (ohne eigenes Gerüst)')
    print('Ausgelassen: ' + ', '.join(sorted(AUSLASSEN) + [str(p) + ' (nirgends verwiesen)' for p in weg]))


if __name__ == '__main__':
    main()
