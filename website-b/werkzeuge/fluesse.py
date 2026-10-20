#!/usr/bin/env python3
"""Flüsse für die Karte Ursprung: daten/fluesse.js aus Natural Earth (gemeinfrei).

Quelle: ne_50m_rivers_lake_centerlines.geojson aus github.com/nvkelso/natural-earth-vector (Ordner geojson).
Aufruf:  python3 werkzeuge/fluesse.py <ne_50m_rivers_lake_centerlines.geojson> daten/fluesse.js
"""
import json
import sys

quelle, ziel = sys.argv[1], sys.argv[2]
GRUPPEN = {
    'Euphrat': ['Firat', 'Al Furat', 'Euphrates'],
    'Tigris': ['Dicle', 'Tigris'],
    'Schatt al-Arab': ['Shatt al Arab'],
    'Jordan': ['Jordan'],
    'Nil': ['Nile', 'Damietta Branch', 'Rosetta Branch'],
}
# Die Stelle am Fluss, an der sein Name steht
ANKER = {'Euphrat': [39.9, 35.9], 'Tigris': [43.6, 35.3], 'Jordan': [35.55, 32.3], 'Nil': [31.0, 26.5]}

d = json.load(open(quelle, encoding='utf-8'))
aus = []
for name, teile in GRUPPEN.items():
    linien = []
    for x in d['features']:
        if (x['properties'].get('name') or '') not in teile:
            continue
        g = x['geometry']
        for l in ([g['coordinates']] if g['type'] == 'LineString' else g['coordinates']):
            l = [c for c in l if 24 <= c[1] <= 42 and 28 <= c[0] <= 50]
            r = []
            for c in l:
                q = [round(c[0], 2), round(c[1], 2)]
                if not r or r[-1] != q:
                    r.append(q)
            if len(r) > 1:
                linien.append(r)
    e = {'name': name, 'linien': linien}
    if name in ANKER:
        e['anker'] = ANKER[name]
    aus.append(e)

kopf = ('/* Flüsse für die Karte Ursprung (Version B): Euphrat, Tigris, Schatt al-Arab, Jordan und Nil, aus Natural Earth\n'
        '   (ne_50m_rivers_lake_centerlines, gemeinfrei), beschnitten auf 28–50° O und 24–42° N, auf zwei Stellen gerundet.\n'
        '   anker: die Stelle am Fluss, an der sein Name steht. Gebaut mit werkzeuge/fluesse.py. */\n')
with open(ziel, 'w', encoding='utf-8') as f:
    f.write(kopf + 'window.FLUESSE = ' + json.dumps(aus, separators=(',', ':'), ensure_ascii=False) + ';\n')
print(ziel, [(e['name'], sum(len(l) for l in e['linien'])) for e in aus])
