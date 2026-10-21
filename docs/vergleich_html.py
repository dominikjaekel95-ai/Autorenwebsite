#!/usr/bin/env python3
"""Baut aus docs/aenderungen-website-b.md eine Artefakt-Seite (ohne eigenes Gerüst) mit den Bildern aus docs/vergleich/.

Aufruf: python3 vergleich_html.py <markdown> <zielordner>
Im Zielordner entstehen index.html und vergleich/*.jpg (nur die eingebundenen Bilder) und dateien.json (Karte für `files`).
"""
import html
import json
import re
import shutil
import sys
from pathlib import Path

import markdown

quelle = Path(sys.argv[1]).resolve()
ziel = Path(sys.argv[2]).resolve()
if ziel.exists():
    shutil.rmtree(ziel)
(ziel / 'vergleich').mkdir(parents=True)

text = quelle.read_text(encoding='utf-8')
titel_md = re.search(r'^# (.+)$', text, re.M)
text = re.sub(r'^# .+\n', '', text, count=1)

md = markdown.Markdown(extensions=['tables', 'toc', 'attr_list', 'sane_lists'],
                       extension_configs={'toc': {'toc_depth': '2-3', 'slugify': lambda v, s: re.sub(r'[^0-9a-zäöüß]+', '-', v.lower()).strip('-')}})
rumpf = md.convert(text)

bilder = []


def figur(m):
    tag = m.group(0)
    src = re.search(r'src="([^"]+)"', tag).group(1)
    alt = html.unescape(re.search(r'alt="([^"]*)"', tag).group(1))
    bilder.append(src)
    marke, _, rest = alt.partition(':')
    marke = marke.strip()
    klasse = 'a' if marke.upper().startswith('A') else 'b' if marke.upper().startswith('B') else 'x'
    if klasse == 'x':
        marke, rest = '', alt
    unter = (f'<span class="marke {klasse}">{html.escape(marke)}</span> ' if marke else '') + html.escape(rest.strip())
    return (f'<figure class="{klasse}"><a href="{src}" target="_blank" rel="noopener"><img src="{src}" alt="{html.escape(alt)}" loading="lazy"></a>'
            f'<figcaption>{unter}</figcaption></figure>')


def bildabsatz(m):
    inhalt = m.group(1)
    if re.sub(r'<img[^>]*>|\s|<br\s*/?>', '', inhalt):
        return m.group(0)
    figs = re.sub(r'<img[^>]*>', figur, inhalt)
    figs = re.sub(r'<br\s*/?>', '', figs)
    return f'<div class="paar">{figs}</div>'


rumpf = re.sub(r'<p>((?:\s*<img[^>]*>\s*(?:<br\s*/?>)?\s*)+)</p>', bildabsatz, rumpf)
# Tabellen dürfen seitlich rollen
rumpf = rumpf.replace('<table>', '<div class="tabelle"><table>').replace('</table>', '</table></div>')
# Elementabschnitte (### NN. Name) als eigene Blöcke, jeweils bis zum nächsten h3 oder h2
def abschnitte(stueck):
    teile = re.split(r'(?=<h3 id="[^"]*">\d\d[a-z]?\. )', stueck)
    return teile[0] + ''.join(f'<section class="element">{t}</section>' for t in teile[1:])


rumpf = ''.join(abschnitte(s) for s in re.split(r'(?=<h2 )', rumpf))
# Feldmarken „**Vorher (A).**“ usw. als kleine Rubrik
rumpf = re.sub(r'<p><strong>([^<]{2,40}?)\.?</strong>\s*', lambda m: f'<p><span class="feld">{m.group(1).rstrip(".")}</span> ', rumpf)

for src in dict.fromkeys(bilder):
    q = quelle.parent / src
    if not q.exists():
        print('FEHLT', src)
        continue
    d = ziel / src
    d.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(q, d)

inhalt_toc = md.toc
titel = 'Fassungen im Vergleich'
unterzeile = html.escape(titel_md.group(1)) if titel_md else ''

seite = f'''<title>{titel}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<script>document.documentElement.lang = 'de';</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@500&display=swap">
<style>
/* Arbeitsdokument: eine Lesespalte, Bildpaare A | B in voller Breite, A trägt das Siena von Version A, B das Kartenblau von Version B */
:root {{
  --grund: #fafaf8; --flaeche: #f0f0ec; --tinte: #1e2023; --leise: #5a5d63; --linie: #d9d9d3;
  --a: #8f4a2b; --b: #2f5f8a;
  --text: 'IBM Plex Sans', system-ui, sans-serif; --mono: 'IBM Plex Mono', ui-monospace, monospace;
}}
@media (prefers-color-scheme: dark) {{ :root:not([data-theme="light"]) {{
  --grund: #16171a; --flaeche: #202226; --tinte: #e8e8e4; --leise: #a3a6ab; --linie: #34363b; --a: #d9906c; --b: #8bb6dc; color-scheme: dark; }} }}
:root[data-theme="dark"] {{ --grund: #16171a; --flaeche: #202226; --tinte: #e8e8e4; --leise: #a3a6ab; --linie: #34363b; --a: #d9906c; --b: #8bb6dc; color-scheme: dark; }}
* {{ box-sizing: border-box; }}
body {{ background: var(--grund); color: var(--tinte); font: 400 1.0625rem/1.6 var(--text); margin: 0;
  padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); padding-block: 2.5rem 5rem; }}
main {{ max-width: 72rem; margin: 0 auto; }}
.spalte, main > p, main > ul, main > ol, main > h2, main > h3, main > .tabelle, nav.toc, .element > p, .element > ul, .element > ol, .element > h3 {{ max-width: 44rem; }}
header {{ max-width: 44rem; margin-bottom: 2.5rem; }}
header h1 {{ font-size: 2rem; line-height: 1.2; font-weight: 600; margin: 0 0 .5rem; text-wrap: balance; }}
header p {{ color: var(--leise); margin: 0; }}
header p.links {{ color: var(--tinte); margin-top: 1rem; }}
h2#die-elemente-im-einzelnen {{ border-bottom: 0; }}
h2 + .element {{ border-top: 0; padding-top: .5rem; }}
h2 {{ font-size: 1.45rem; line-height: 1.25; font-weight: 600; margin: 3.5rem 0 1rem; padding-top: 1.5rem; border-top: 1px solid var(--linie); text-wrap: balance; }}
h3 {{ font-size: 1.2rem; line-height: 1.3; font-weight: 600; margin: 0 0 .75rem; text-wrap: balance; }}
h4 {{ font-size: 1rem; margin: 1.5rem 0 .5rem; }}
p, ul, ol {{ margin: 0 0 1rem; }}
li {{ margin-bottom: .35rem; }}
a {{ color: inherit; text-decoration-thickness: 1px; text-underline-offset: .18em; }}
a:hover {{ text-decoration-thickness: 2px; }}
a:focus-visible, summary:focus-visible {{ outline: 2px solid var(--b); outline-offset: 2px; border-radius: 2px; }}
code {{ font-family: var(--mono); font-size: .88em; background: var(--flaeche); padding: .05em .3em; border-radius: 3px; }}
.element {{ margin: 0 0 1rem; padding: 2rem 0 1rem; border-top: 1px solid var(--linie); }}
.element h3 {{ scroll-margin-top: 1rem; }}
.feld {{ font-weight: 600; margin-right: .25em; }}
.paar {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 24rem), 1fr)); gap: 1rem; margin: 1rem 0 1.5rem; max-width: none; }}
figure {{ margin: 0; min-width: 0; }}
figure img {{ display: block; width: 100%; height: auto; border: 1px solid var(--linie); background: #fff; }}
figure a {{ display: block; }}
figcaption {{ font-size: .875rem; line-height: 1.45; color: var(--leise); margin-top: .4rem; }}
.marke {{ font-family: var(--mono); font-weight: 500; font-size: .8rem; color: var(--grund); padding: .05em .45em; border-radius: 3px; margin-right: .2em; }}
.marke.a {{ background: var(--a); }} .marke.b {{ background: var(--b); }}
figure.a img {{ border-top: 3px solid var(--a); }} figure.b img {{ border-top: 3px solid var(--b); }}
.tabelle {{ overflow-x: auto; margin: 0 0 1.5rem; max-width: none !important; }}
table {{ border-collapse: collapse; font-size: .92rem; line-height: 1.4; min-width: 40rem; }}
th, td {{ text-align: left; vertical-align: top; padding: .5rem .75rem .5rem 0; border-bottom: 1px solid var(--linie); }}
th {{ font-weight: 600; border-bottom-color: var(--tinte); }}
td:first-child {{ font-variant-numeric: tabular-nums; white-space: nowrap; }}
nav.toc {{ margin: 0 0 2rem; }}
nav.toc details {{ border: 1px solid var(--linie); border-radius: 4px; padding: .75rem 1rem; background: var(--flaeche); }}
nav.toc summary {{ cursor: pointer; font-weight: 600; }}
nav.toc ul {{ list-style: none; padding-left: 0; margin: .75rem 0 0; }}
nav.toc ul ul {{ padding-left: 1rem; margin: .25rem 0 .5rem; }}
nav.toc li {{ margin: .15rem 0; }}
blockquote {{ margin: 0 0 1rem; padding-left: 1rem; border-left: 3px solid var(--linie); color: var(--leise); max-width: 44rem; }}
hr {{ border: 0; border-top: 1px solid var(--linie); margin: 2rem 0; }}
@media (max-width: 40rem) {{ body {{ font-size: 1rem; }} header h1 {{ font-size: 1.6rem; }} h2 {{ font-size: 1.3rem; }} }}
@media (prefers-reduced-motion: reduce) {{ * {{ scroll-behavior: auto !important; }} }}
</style>
<main>
<header>
<h1>{titel}</h1>
<p>{unterzeile}</p>
<p class="links">Version A: <a href="https://claude.ai/artifact/BkC8hBJNRG4Q42ragcoZzW" target="_blank" rel="noopener">bisheriges Testsystem</a><br>Version B: <a href="https://claude.ai/artifact/T6FyzumK6vqoeRxso8G2wd" target="_blank" rel="noopener">neue Gestalt „Atlas“</a></p>
</header>
<nav class="toc" aria-label="Inhalt"><details><summary>Inhalt</summary>{inhalt_toc}</details></nav>
{rumpf}
</main>
'''
(ziel / 'index.html').write_text(seite, encoding='utf-8')
karte = {src: src for src in dict.fromkeys(bilder) if (ziel / src).exists()}
(ziel / 'dateien.json').write_text(json.dumps(karte, ensure_ascii=False, indent=1), encoding='utf-8')
groesse = sum((ziel / s).stat().st_size for s in karte) + (ziel / 'index.html').stat().st_size
print(f'{len(karte)} Bilder, {groesse / 1e6:.1f} MB, {ziel / "index.html"}')
