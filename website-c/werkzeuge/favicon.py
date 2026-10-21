#!/usr/bin/env python3
"""Zeichnet das Zeichen der Website als favicon.svg: „DJ“ aus der Vollkorn (halbfett, 600) in Tinte auf Papier, als Pfade.
Das SVG braucht keine Schrift und lädt nichts. Die PNG-Fassungen (32, 180, 512 px) und das Vorschaubild rechnet danach
werkzeuge/bilder.cjs aus diesem SVG.

Aufruf (aus einem beliebigen Ordner):
  python3 website-c/werkzeuge/favicon.py
  node website-c/werkzeuge/bilder.cjs

Braucht fontTools mit brotli (für woff2). Farben aus stil.css (--papier, --tinte), Abschnitt 4.1 der Regeln.
"""
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

QUELLE = Path(__file__).resolve().parents[1]
PAPIER, TINTE = '#FFFEFC', '#1D1E21'
GEWICHT = 600
TEXT = 'DJ'
FELD = 64            # Kantenlänge des SVG
RAND = 0.12          # freier Rand an der breiteren Seite, Anteil der Kante
SPERRUNG = -20       # Abstand zwischen D und J in Schrifteinheiten (das J der Vollkorn hat links Luft)


def main():
    schrift = instancer.instantiateVariableFont(TTFont(QUELLE / 'schrift/vollkorn.woff2'), {'wght': GEWICHT})
    glyphen = schrift.getGlyphSet()
    cmap = schrift.getBestCmap()
    hmtx = schrift['hmtx']

    # Die Buchstaben nebeneinander, wie sie im Satz stehen (mit Kerning wäre es dasselbe: D und J haben kein Paar)
    teile, x = [], 0
    for z in TEXT:
        name = cmap[ord(z)]
        teile.append((name, x))
        x += hmtx[name][0] + SPERRUNG

    grenzen = BoundsPen(glyphen)
    for name, dx in teile:
        glyphen[name].draw(TransformPen(grenzen, (1, 0, 0, 1, dx, 0)))
    x0, y0, x1, y1 = grenzen.bounds
    breite, hoehe = x1 - x0, y1 - y0
    massstab = FELD * (1 - 2 * RAND) / max(breite, hoehe)
    # Mitte der Zeichnung in die Mitte des Felds; y nach unten (SVG)
    dx = FELD / 2 - (x0 + breite / 2) * massstab
    dy = FELD / 2 + (y0 + hoehe / 2) * massstab

    stift = SVGPathPen(glyphen, ntos=lambda v: f'{v:.2f}'.rstrip('0').rstrip('.'))
    for name, versatz in teile:
        glyphen[name].draw(TransformPen(stift, (massstab, 0, 0, -massstab, dx + versatz * massstab, dy)))

    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {FELD} {FELD}" width="{FELD}" height="{FELD}">'
           f'<rect width="{FELD}" height="{FELD}" fill="{PAPIER}"/>'
           f'<path fill="{TINTE}" d="{stift.getCommands()}"/></svg>\n')
    ziel = QUELLE / 'favicon.svg'
    ziel.write_text(svg, encoding='utf-8')
    print(f'{ziel}: {len(svg)} Bytes, Zeichnung {breite * massstab:.1f} × {hoehe * massstab:.1f} von {FELD}')


if __name__ == '__main__':
    main()
