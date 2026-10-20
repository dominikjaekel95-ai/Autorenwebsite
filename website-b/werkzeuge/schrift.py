# Baskervville (ANRT, google/fonts) als WOFF2; in der Antiqua bekommen Minute und Sekunde (U+2032, U+2033)
# die Glyphen des geraden Apostrophs und Anführungszeichens, weil die Schrift keine Strichzeichen hat.
import sys
from fontTools.ttLib import TTFont
quelle, ziel = sys.argv[1], sys.argv[2]
f = TTFont(quelle)
cmap = f.getBestCmap()
if 0x2032 not in cmap:
    q1, q2 = cmap.get(0x27), cmap.get(0x22)
    for t in f['cmap'].tables:
        if t.isUnicode():
            if q1: t.cmap[0x2032] = q1
            if q2: t.cmap[0x2033] = q2
    print('ergänzt:', q1, q2)
f.flavor = 'woff2'
f.save(ziel)
print(ziel)
