#!/usr/bin/env python3
"""Kartenziffern: die zehn Ziffern der Baskervville-Antiqua als Versalziffern mit fester Breite.

Auf der Leinwand der Karte (canvas) lässt sich keine OpenType-Ziffernwahl einschalten; dort stünden sonst die
Mediävalziffern, die in der Schrift voreingestellt sind. Diese Datei enthält nur U+0030 bis U+0039, gezeichnet mit den
Glyphen zero.tf bis nine.tf, und wird in stil.css als eigene Schrift „Baskervville Ziffern“ nur für die Leinwand geladen.
Die Achse wght (400 bis 700) bleibt erhalten. Änderung nach SIL Open Font License 1.1, die Schrift hat keinen
Reserved Font Name.

Aufruf:  python3 werkzeuge/kartenziffern.py schrift/baskervville-antiqua.woff2 schrift/baskervville-ziffern.woff2
"""
import sys
from fontTools.ttLib import TTFont
from fontTools import subset

quelle, ziel = sys.argv[1], sys.argv[2]
NAMEN = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

f = TTFont(quelle)
reihe = set(f.getGlyphOrder())
for t in f['cmap'].tables:
    if not t.isUnicode():
        continue
    for i, n in enumerate(NAMEN):
        if n + '.tf' in reihe:
            t.cmap[0x30 + i] = n + '.tf'

opt = subset.Options()
opt.layout_features = []
opt.name_IDs = ['*']
opt.notdef_outline = True
opt.flavor = 'woff2'
s = subset.Subsetter(opt)
s.populate(unicodes=range(0x30, 0x3A))
s.subset(f)
f.flavor = 'woff2'
f.save(ziel)
print(ziel, sorted(TTFont(ziel).getBestCmap().items()))
