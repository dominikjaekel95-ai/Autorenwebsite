/* Globus-Kern für Version B (website-b): die Kugel als Karte im Zweifarbendruck, orthografisch, auf einer Leinwand.
 * Kopie des Kerns aus Version A, auf die Zeichenart „druck“ beschränkt; die Zeichnung von A (Akzentfarben, Versalien,
 * Tooltip, Pendeln) ist entfernt.
 *
 * Braucht d3 7.9 und topojson-client 3.1 sowie daten/welt-110m.js (window.WELT_110M).
 * Optional: daten/welt-50m.js (wird nachgeladen), daten/uk-landesteile.js, daten/laender-de.js, daten/fluesse.js.
 *
 *   const g = Globus.erstellen({
 *     canvas, hinweis,               // Leinwand und ein Element für den Bedienhinweis (Zoomen mit Strg oder ⌘)
 *     bereist: ['DE', ...],          // ISO-Codes, Landesteile als 'GB-ENG' usw., Westjordanland als 'PS-WB'
 *     winzig: { MC: [lon, lat] },    // Kleinstaaten ohne Fläche im groben Maßstab
 *     ansichten: { FR: [lon, lat, k] },
 *     farben: { papier, tinte, blau, blauRaster },
 *     schrift: { ort, ortAktiv, wasser, ring },    // Schriften auf der Leinwand
 *     ring: 'aequator' | null,       // Gradzahlen im Ring: nur „Äquator“ im Überblick, sonst keine
 *     gewaesserNamen: false,         // Gewässer- und Flussnamen (A hat keine; in B aus, siehe Textregel)
 *     dauer: 1000,                   // feste Dauer jedes Flugs in ms (bei reduzierter Bewegung 0)
 *     aussparungen: () => [[x0, y0, x1, y1], …],   // Rechtecke, die keine Ringbeschriftung berühren darf
 *     landName: iso => 'Name',       // Name eines Kleinstaats, der im groben Maßstab keine Fläche hat
 *     beiLand: land | null => {},    // bereistes Land unter dem Zeiger (nur auf Ebenen mit laender: true)
 *     alleLaender: true,             // beiLand meldet jedes Land unter dem Zeiger, nicht nur bereiste (land.bereist sagt es)
 *     beimEingriff: () => {}, beiChronikEnde: grund => {}
 *   });
 *   g.ebene({ orte: [{ name, lat, lon, rang, kurz, neben }], laender, grenzen, fluesse, blick: { mitte: [lon, lat], k } }, { fliegen, behalten })
 *   g.fliegen([lon, lat], k) -> Promise 'fertig' | 'abgebrochen';  g.springen([lon, lat], k) ohne Flug
 *   g.ortAnfliegen(ort, k), g.landAnfliegen(iso), g.aktiv('Name' | null), g.auswahl(iso | null), g.landBei(x, y)
 *   g.chronik(stationen, { beiStation, pause, zoom, dauer, sofort, schluss }), g.chronikSchritt(stationen, i, { zoom, dauer })
 *   g.routeZeigen(stationen), g.chronikStoppen(), g.zeichnen(), g.k(), g.land(iso)
 *
 * Zeichnung. Schwarzplatte (tinte): Grenzen gestrichelt, Weg, Ortszeichen, Ortsnamen aufrecht, Schraffur bereister Länder,
 * Name des gewählten Lands, Kugelrand. Blauplatte (blau, blauRaster): Wasserfläche als Raster, Küste, Flüsse, Gradnetz,
 * Gewässernamen kursiv. Land in papier.
 * Weg: Nebenorte (neben: true) sind Abstecher vom Wohnort davor, hin und zurück, gestrichelt.
 * Ein Finger waagerecht dreht die Kugel (touch-action: pan-y lässt die Seite senkrecht scrollen), zwei Finger zoomen.
 */
(function () {
  const RAD = Math.PI / 180;

  function erstellen(o) {
    const { canvas, hinweis } = o;
    const F = Object.assign({ papier: '#FFFFFF', tinte: '#141414', blau: '#2A5F99', blauRaster: '#E5ECF3' }, o.farben || {});
    const schrift = Object.assign({ ort: '500 15px serif', ortAktiv: '600 15px serif', land: '500 13px serif', wasser: 'italic 500 13px serif', ring: '500 13px serif' }, o.schrift || {});
    // Gewässer- und Flussnamen nur mit o.gewaesserNamen: true. A beschriftet keine Gewässer; nach der Textregel steht in B kein
    // Wort, das A nicht hat (die Zeichnung der Blauplatte bleibt)
    const gewaesserNamen = o.gewaesserNamen === true;
    const KMIN = 1;
    const bereist = new Set(o.bereist || []);
    const winzig = o.winzig || {};
    const ansichten = o.ansichten || {};
    const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const melden = (name, ...werte) => { if (typeof o[name] === 'function') o[name](...werte); };

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const DE = window.LAENDER_DE || { nach_id: {}, nach_name: {} };
    const projektion = d3.geoOrthographic().clipAngle(90).precision(.4);
    const pfad = d3.geoPath(projektion, ctx);

    let ebene = { orte: [], laender: false, blick: { mitte: [20, 25], k: 1 } };
    let mitte = [20, 25];
    let k = 1, seite = 600, R = 276, dpr = 1, ring = 24;
    let hover = null, auswahl = null, aktiverOrt = null;
    let flug = null, flugEnde = null;
    let route = null;              // { punkte: [[lon, lat]], neben: [bool], an: [Index je Station], fortschritt: Abschnitte als Kommazahl }
    let sichtbarBis = null;        // während einer Chronik: nur Orte bis zu diesem Index zeigen
    let chronikNummer = 0;

    // ---------- Daten ----------
    const UK = window.UK_LANDESTEILE;
    function datensatz(topo) {
      let laender = topojson.feature(topo, topo.objects.countries).features;
      laender.forEach(f => {
        const eintrag = DE.nach_id[f.id] || DE.nach_name[f.properties.name] || ['', f.properties.name];
        f.iso = eintrag[0];
        f.name = eintrag[1] || f.properties.name;
      });
      if (UK) laender = laender.filter(f => f.iso !== 'GB').concat(UK.features.map(f => ({ ...f, iso: f.properties.iso, name: f.properties.name })));
      laender = laender.flatMap(f => {
        if (f.iso !== 'PS') return [f];
        const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates];
        const teil = (iso, name, ps) => ps.length ? [{ type: 'Feature', id: iso, iso, name, properties: {}, geometry: { type: 'MultiPolygon', coordinates: ps } }] : [];
        const westlich = p => d3.geoCentroid({ type: 'Polygon', coordinates: p })[0] < 34.7;
        return teil('PS-WB', 'Westjordanland', polys.filter(p => !westlich(p))).concat(teil('PS-GZ', 'Gazastreifen', polys.filter(westlich)));
      });
      laender.forEach(f => {
        f.bereist = bereist.has(f.iso);
        const teile = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates.map(c => ({ type: 'Polygon', coordinates: c })) : [f.geometry];
        f.punkt = d3.geoCentroid(teile.reduce((a, b) => d3.geoArea(b) > d3.geoArea(a) ? b : a));
      });
      const innen = topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b);
      return {
        laender,
        landFlaeche: topojson.merge(topo, topo.objects.countries.geometries),
        grenzen: UK ? { type: 'MultiLineString', coordinates: innen.coordinates.concat(UK.innen.coordinates) } : innen,
        kueste: topojson.mesh(topo, topo.objects.countries, (a, b) => a === b),
        bereist: { type: 'FeatureCollection', features: laender.filter(f => f.bereist) },
        isos: new Set(laender.map(f => f.iso))
      };
    }
    const grob = datensatz(window.WELT_110M);
    let fein = null;
    function feinLaden() {
      if (fein || feinLaden.laeuft) return;
      feinLaden.laeuft = true;
      const fertig = () => { if (window.WELT_50M) { fein = datensatz(window.WELT_50M); zeichnen(); } };
      if (window.WELT_50M) return fertig();
      const s = document.createElement('script');
      s.src = o.daten50 || 'daten/welt-50m.js';
      s.onload = fertig;
      document.head.appendChild(s);
    }
    const FLUESSE = (window.FLUESSE || []).map(f => ({ name: f.name, anker: f.anker, geo: { type: 'MultiLineString', coordinates: f.linien } }));

    // In Bewegung und im Überblick grob, gezoomt in Ruhe fein (sonst dauert ein Bild über 100 ms)
    let bewegt = false, ruheTimer = null;
    function bewegung() {
      bewegt = true;
      clearTimeout(ruheTimer);
      ruheTimer = setTimeout(() => { bewegt = false; zeichnen(); }, 220);
    }
    const daten = () => fein && k > 1.8 && !bewegt ? fein : grob;

    // ---------- Maße ----------
    function messen() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      seite = Math.max(0, canvas.clientWidth || 0);
      canvas.width = Math.round(seite * dpr);
      canvas.height = Math.round(seite * dpr);
      ring = seite < 480 ? 19 : 24;
      // Eine sehr kleine Tafel hätte einen negativen Radius: dann wird nichts gezeichnet
      R = Math.max(0, seite / 2 - ring);
      musterBauen();
    }
    const sichtbar = p => d3.geoDistance(p, mitte) < Math.PI / 2 - .02;
    function linie(punkte) {
      ctx.beginPath();
      let offen = false;
      punkte.forEach(pt => {
        if (!sichtbar(pt)) { offen = false; return; }
        const p = projektion(pt);
        if (offen) ctx.lineTo(p[0], p[1]); else { ctx.moveTo(p[0], p[1]); offen = true; }
      });
      ctx.stroke();
    }
    function bogen(a, b, bis = 1) {
      const weg = d3.geoInterpolate(a, b);
      const n = Math.max(8, Math.ceil(d3.geoDistance(a, b) / RAD / 2));
      const punkte = [];
      for (let i = 0; i <= n; i++) punkte.push(weg((i / n) * bis));
      return punkte;
    }

    // ---------- Gewässer, Schraffur, Gradnetz ----------
    // Gewässer: Name, Länge, Breite, ab Zoom, Ozean (Versalien, gesperrt), bis Zoom (Ozeane; Vorgabe 3,2)
    const GEWAESSER = [
      ['Atlantischer Ozean', -31, 29, 0, true], ['Atlantischer Ozean', -16, -14, 1.4, true], ['Atlantischer Ozean', -15.5, 47.5, 2.5, true, 8],
      ['Pazifischer Ozean', 152, 21, 0, true], ['Pazifischer Ozean', -135, 8, 0, true],
      ['Indischer Ozean', 78, -22, 0, true], ['Indischer Ozean', 72, -7, 2, true],
      ['Mittelmeer', 17.6, 34.6, 2], ['Nordsee', 3.3, 56.4, 2.6], ['Ostsee', 19.4, 57.6, 2.6], ['Schwarzes Meer', 34.2, 43.2, 2.4],
      ['Arabisches Meer', 64.5, 14.5, 1.6], ['Golf von Bengalen', 89, 14.5, 2], ['Südchinesisches Meer', 114, 13.5, 2],
      ['Ostchinesisches Meer', 126, 29.5, 2.4], ['Philippinensee', 133, 18, 2.2], ['Golf von Guinea', 2.5, 1.5, 1.8],
      ['Karibisches Meer', -75, 14.5, 1.8], ['Golf von Mexiko', -90, 25, 1.8], ['Rotes Meer', 38.4, 20.5, 3.4],
      ['Persischer Golf', 51.2, 27.2, 4], ['Kaspisches Meer', 50.8, 42, 3], ['Mittelmeer', 32.6, 33.1, 5], ['Golf von Biskaya', -4.6, 45.6, 3.4]
    ];
    const NB = ' ';
    let muster = null;
    // Schraffur der bereisten Länder: Schwarzplatte, 45°, Linien von 0,55 px im Abstand von 3,4 px
    function musterBauen() {
      const a = Math.max(2, Math.round(3.4 * dpr)), m = document.createElement('canvas');
      m.width = m.height = a;
      const g = m.getContext('2d');
      g.strokeStyle = F.tinte; g.lineWidth = .55 * dpr;
      g.beginPath();
      g.moveTo(0, a); g.lineTo(a, 0); g.moveTo(-1, 1); g.lineTo(1, -1); g.moveTo(a - 1, a + 1); g.lineTo(a + 1, a - 1);
      g.stroke();
      muster = ctx.createPattern(m, 'repeat');
      if (muster && muster.setTransform && window.DOMMatrix) muster.setTransform(new DOMMatrix().scale(1 / dpr));
    }
    const rasterRgb = (() => { const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(String(F.blauRaster || '').trim()); return m ? [1, 2, 3].map(j => parseInt(m[j], 16)) : [229, 236, 243]; })();
    const netzSchritt = () => k < 1.6 ? 30 : k < 4 ? 10 : k < 9 ? 5 : 2;
    const netze = {};
    const netz = s => netze[s] || (netze[s] = d3.geoGraticule().step([s, s]).extentMajor([[-180, -90 + 1e-6], [180, 90 - 1e-6]])());
    const groesse = font => { const m = /(\d+(?:\.\d+)?)px/.exec(font); return m ? parseFloat(m[1]) : 13; };

    // ---------- Zeichnen ----------
    function zeichnen() {
      const c = seite / 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, seite, seite);
      if (R <= 0) return;
      projektion.translate([c, c]).scale(R * k).rotate([-mitte[0], -mitte[1]]).clipExtent([[0, 0], [seite, seite]]);
      const d = daten();
      ctx.save();
      ctx.beginPath(); ctx.arc(c, c, R, 0, Math.PI * 2); ctx.clip();

      ctx.beginPath(); pfad({ type: 'Sphere' }); ctx.fillStyle = F.blauRaster; ctx.fill();
      ctx.beginPath(); pfad(d.landFlaeche); ctx.fillStyle = F.papier; ctx.fill();
      // In Ruhe: das Bild aus Wasser und Land einmal auslesen; daran prüfen die Gewässernamen, ob sie auf Wasser stehen
      let wasserBild = null;
      if (!bewegt && gewaesserNamen) { try { wasserBild = ctx.getImageData(0, 0, canvas.width, canvas.height); } catch (e) { wasserBild = null; } }
      if (ebene.laender && muster) { ctx.beginPath(); pfad(d.bereist); ctx.fillStyle = muster; ctx.fill(); }

      ctx.beginPath(); pfad(netz(netzSchritt())); ctx.strokeStyle = F.blau; ctx.lineWidth = .45; ctx.globalAlpha = .75; ctx.stroke(); ctx.globalAlpha = 1;
      if (ebene.grenzen !== false) {
        ctx.beginPath(); pfad(d.grenzen); ctx.strokeStyle = F.tinte; ctx.lineWidth = k >= 3 ? .6 : .45;
        ctx.setLineDash([2.2, 1.6]); ctx.stroke(); ctx.setLineDash([]);
      }
      ctx.beginPath(); pfad(d.kueste); ctx.strokeStyle = F.blau; ctx.lineWidth = .8; ctx.stroke();
      if (ebene.fluesse) FLUESSE.forEach(f => { ctx.beginPath(); pfad(f.geo); ctx.strokeStyle = F.blau; ctx.lineWidth = .8; ctx.lineJoin = 'round'; ctx.stroke(); });
      let gewaehlt = null;
      if (ebene.laender) {
        gewaehlt = auswahl ? d.laender.find(x => x.iso === auswahl.iso) || auswahl : null;
        [[gewaehlt, 1.2], [hover !== gewaehlt ? hover : null, 1]].forEach(([f, w]) => { if (!f || !f.geometry) return; ctx.beginPath(); pfad(f); ctx.strokeStyle = F.tinte; ctx.lineWidth = w; ctx.stroke(); });
        Object.entries(winzig).forEach(([iso, pos]) => {
          if (!bereist.has(iso) || d.isos.has(iso) || !sichtbar(pos)) return;
          // Kleinstaaten ohne Fläche im Maßstab: ein schraffiertes Quadrat, damit sie nicht wie ein Ortszeichen aussehen
          const p = projektion(pos);
          ctx.beginPath(); ctx.rect(p[0] - 3, p[1] - 3, 6, 6);
          ctx.fillStyle = muster || F.papier; ctx.fill(); ctx.lineWidth = (auswahl && auswahl.iso === iso) || (hover && hover.iso === iso) ? 1.2 : .6; ctx.strokeStyle = F.tinte; ctx.stroke();
        });
      }

      // Weg: Schwarzplatte, zu Nebenorten gestrichelt
      if (route && route.punkte.length > 1) {
        ctx.lineWidth = 1.2; ctx.strokeStyle = F.tinte; ctx.lineCap = 'round';
        const ganz = Math.floor(route.fortschritt), rest = route.fortschritt - ganz;
        for (let i = 0; i < route.punkte.length - 1 && i <= ganz; i++) {
          const bis = i < ganz ? 1 : rest;
          if (bis <= 0) continue;
          ctx.setLineDash(route.neben[i] || route.neben[i + 1] ? [3, 3] : []);
          linie(bogen(route.punkte[i], route.punkte[i + 1], bis));
        }
        ctx.setLineDash([]);
        ctx.lineCap = 'butt';
      }

      // Ortszeichen zuerst, damit kein Name sie verdeckt: gefüllter Punkt, für längere Aufenthalte ein offener Kreis (7 px)
      const belegt = [];
      const imRund = (b, rand) => [[b[0], b[1]], [b[2], b[1]], [b[0], b[3]], [b[2], b[3]]].every(([x, y]) => Math.hypot(x - c, y - c) < R - rand);
      const frei = b => !belegt.some(x => b[0] < x[2] + 1 && b[2] + 1 > x[0] && b[1] < x[3] && b[3] > x[1]);
      const orte = ebene.orte.map((ort, i) => ({ ort, i })).filter(({ i }) => sichtbarBis === null || i <= sichtbarBis)
        .filter(({ ort }) => sichtbar([ort.lon, ort.lat])).map(x => Object.assign(x, { p: projektion([x.ort.lon, x.ort.lat]) }));
      orte.forEach(({ ort, p }) => {
        ctx.beginPath();
        if (ort.neben) { ctx.arc(p[0], p[1], 2.875, 0, Math.PI * 2); ctx.fillStyle = F.papier; ctx.fill(); ctx.lineWidth = 1.25; ctx.strokeStyle = F.tinte; ctx.stroke(); }
        else { ctx.arc(p[0], p[1], 3.5, 0, Math.PI * 2); ctx.fillStyle = F.tinte; ctx.fill(); }
        belegt.push([p[0] - 4, p[1] - 4, p[0] + 4, p[1] + 4]);
      });
      // Ortsnamen aufrecht; Orte, deren Zeichen fast aufeinander liegen, teilen sich eine Beschriftung: die Namen untereinander,
      // ohne Zeichen dazwischen (Potsdam über Berlin), wie die Namensblöcke von A.
      // Lage nach der Reihenfolge rechts oben, rechts unten, links oben, links unten, rechts, links. Der aktive Ort zuerst
      // und halbfett; kein Name überdeckt einen anderen oder ein Ortszeichen
      const aktivListe = aktiverOrt ? [aktiverOrt] : [];
      const gruppen = [];
      orte.forEach(x => {
        const name = x.ort.beschriftung || x.ort.kurz || x.ort.name;
        const nah = gruppen.find(g => Math.hypot(g.p[0] - x.p[0], g.p[1] - x.p[1]) < 7);
        const teil = { text: name, aktiv: aktivListe.includes(x.ort.name), i: x.i, rang: x.ort.rang || 1 };
        if (nah) nah.teile.push(teil); else gruppen.push({ p: x.p, teile: [teil] });
      });
      orte.forEach(x => { const g = gruppen.find(q => q.teile.some(t => t.i === x.i)); if (g) (g.punkte = g.punkte || []).push(x.p); });
      gruppen.forEach(g => { g.teile.sort((a, b) => a.i - b.i); g.aktiv = g.teile.some(t => t.aktiv); g.rang = Math.min(...g.teile.map(t => t.rang)); g.i = g.teile[0].i; });
      ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round'; ctx.textAlign = 'left';
      const teilBreite = t => { ctx.font = t.aktiv ? schrift.ortAktiv : schrift.ort; return ctx.measureText(t.text).width; };
      gruppen.sort((a, b) => b.aktiv - a.aktiv || a.rang - b.rang || a.i - b.i).forEach(g => {
        const breiten = g.teile.map(teilBreite);
        const n = g.teile.length, h = 11, zeile = 16, hoch = h + (n - 1) * zeile;
        const w = Math.max(...breiten);
        // Die Lagen beziehen sich auf alle Zeichen der Gruppe; 7 px Abstand, damit das eigene Zeichen frei bleibt.
        // y ist die Grundlinie der ersten Zeile
        const xs = g.punkte.map(q => q[0]), ys = g.punkte.map(q => q[1]);
        const x0g = Math.min(...xs), x1g = Math.max(...xs), y0g = Math.min(...ys), y1g = Math.max(...ys), ym = (y0g + y1g) / 2;
        const oben = y0g - 5 - (n - 1) * zeile, unten = y1g + 5 + h, mittig = ym - hoch / 2 + h;
        const lagen = [[x1g + 7, oben, 'l'], [x1g + 7, unten, 'l'], [x0g - 7, oben, 'r'], [x0g - 7, unten, 'r'], [x1g + 7, mittig, 'l'], [x0g - 7, mittig, 'r']];
        for (const [lx, ly, a] of lagen) {
          const x0 = a === 'l' ? lx : lx - w;
          const box = [x0 - 1.5, ly - h - 1.5, x0 + w + 1.5, ly + (n - 1) * zeile + 4];
          if (!imRund(box, 3) || !frei(box)) continue;
          belegt.push(box);
          g.teile.forEach((t, j) => {
            const x = a === 'l' ? x0 : x0 + w - breiten[j], y = ly + j * zeile;
            ctx.font = t.aktiv ? schrift.ortAktiv : schrift.ort;
            ctx.lineWidth = 3; ctx.strokeStyle = F.papier; ctx.strokeText(t.text, x, y);
            ctx.fillStyle = F.tinte; ctx.fillText(t.text, x, y);
          });
          break;
        }
      });
      // Das gewählte oder gezeigte Land: sein Name aufrecht in Tinte, freigestellt, über seiner größten Fläche
      if (ebene.laender && (hover || gewaehlt)) {
        const f = hover || gewaehlt;
        const pos = f.punkt || winzig[f.iso];
        if (pos && sichtbar(pos)) {
          const p = projektion(pos), name = f.name || (typeof o.landName === 'function' ? o.landName(f.iso) : '');
          if (p && name) {
            ctx.font = schrift.ort; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            const w = ctx.measureText(name).width, y = winzig[f.iso] && !f.geometry ? p[1] - 13 : p[1];
            const x = Math.max(c - R + w / 2 + 6, Math.min(c + R - w / 2 - 6, p[0]));
            ctx.lineWidth = 3; ctx.strokeStyle = F.papier; ctx.strokeText(name, x, y);
            ctx.fillStyle = F.tinte; ctx.fillText(name, x, y);
            belegt.push([x - w / 2 - 2, y - 9, x + w / 2 + 2, y + 9]);
          }
        }
      }
      // Ländernamen bereister Länder ab mittlerem Zoom, wie in A: aufrecht in Tinte, freigestellt, wo Platz ist
      if (k >= 2.6 && ebene.laender) {
        const d = daten(), f0 = hover || gewaehlt;
        ctx.font = schrift.land; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        d.bereist.features.forEach(f => {
          if ((f0 && f0.iso === f.iso) || !f.punkt || d3.geoDistance(f.punkt, mitte) > 1.3) return;
          const p = projektion(f.punkt);
          if (!p) return;
          const b = ctx.measureText(f.name).width / 2 + 2, box = [p[0] - b, p[1] - 8, p[0] + b, p[1] + 8];
          if (!imRund(box, 3) || !frei(box)) return;
          belegt.push(box);
          ctx.lineWidth = 3; ctx.strokeStyle = F.papier; ctx.strokeText(f.name, p[0], p[1]);
          ctx.fillStyle = F.tinte; ctx.fillText(f.name, p[0], p[1]);
        });
      }
      // Gewässernamen (nur mit o.gewaesserNamen): Blauplatte, kursiv, nur auf Wasser; Ozeane in Versalien, gesperrt
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = schrift.wasser;
      const em = groesse(schrift.wasser);
      const kannSperren = 'letterSpacing' in ctx;
      // Auf Wasser: im Schriftfeld und 2 px darum liegt kein Bildpunkt Land (Papier statt Raster der Blauplatte), geprüft
      // im Abstand von 1,5 px, damit auch schmale Halbinseln und Küstenlinien auffallen
      const aufWasser = b => {
        if (!wasserBild) return false;
        const W = wasserBild.width, px = wasserBild.data, [wr, wg, wb] = rasterRgb;
        for (let y = b[1] - 2; y <= b[3] + 2; y += 1.5) for (let x = b[0] - 2; x <= b[2] + 2; x += 1.5) {
          const i = (Math.round(y * dpr) * W + Math.round(x * dpr)) * 4;
          if (i < 0 || i >= px.length) return false;
          if (Math.abs(px[i] - wr) > 6 || Math.abs(px[i + 1] - wg) > 6 || Math.abs(px[i + 2] - wb) > 6) return false;
        }
        return true;
      };
      // In Bewegung keine Gewässernamen: die Prüfung auf Wasser ist teuer; nach dem Flug stehen sie wieder da
      if (!bewegt && gewaesserNamen) GEWAESSER.forEach(([name, lon, lat, abK, ozean, bisK]) => {
        if (k < abK || (ozean && k > (bisK || 3.2)) || !sichtbar([lon, lat])) return;
        const p = projektion([lon, lat]);
        if (kannSperren) ctx.letterSpacing = ozean ? (em * .12).toFixed(2) + 'px' : '0px';
        const text = ozean ? name.toUpperCase() : name, w = ctx.measureText(text).width, hh = em * .5;
        // Lagen um den Ankerpunkt, die nächsten zuerst
        const lagen = [];
        [0, -.25, .25, -.5, .5].forEach(fx => [0, -12, 12, -24, 24, -36, 36].forEach(dy => lagen.push([w * fx, dy])));
        lagen.sort((a, b) => Math.hypot(a[0], a[1] * 2) - Math.hypot(b[0], b[1] * 2));
        for (const [dx, dy] of lagen) {
          const x = p[0] + dx, y = p[1] + dy, box = [x - w / 2 - 2, y - hh - 1, x + w / 2 + 2, y + hh + 1];
          if (!imRund(box, 2) || !frei(box) || !aufWasser(box)) continue;
          belegt.push(box);
          ctx.fillStyle = F.blau; ctx.fillText(text, x + (ozean && kannSperren ? em * .06 : 0), y);
          break;
        }
      });
      if (kannSperren) ctx.letterSpacing = '0px';
      // Flussnamen: Blauplatte, kursiv, dem Lauf folgend, 4 px neben dem Fluss
      if (ebene.fluesse && !bewegt && gewaesserNamen) FLUESSE.forEach(f => {
        if (!f.anker || !sichtbar(f.anker)) return;
        let best = null;
        f.geo.coordinates.forEach(l => l.forEach((q, j) => { const dd = d3.geoDistance(q, f.anker); if (!best || dd < best.d) best = { d: dd, l, j }; }));
        if (!best) return;
        const a = projektion(best.l[Math.max(0, best.j - 2)]), b = projektion(best.l[Math.min(best.l.length - 1, best.j + 2)]);
        let winkel = Math.atan2(b[1] - a[1], b[0] - a[0]);
        if (winkel > Math.PI / 2) winkel -= Math.PI; else if (winkel < -Math.PI / 2) winkel += Math.PI;
        const m = projektion(best.l[best.j]), w = ctx.measureText(f.name).width;
        for (const seite2 of [-1, 1]) {
          const nx = -Math.sin(winkel) * seite2 * (em * .5 + 4), ny = Math.cos(winkel) * seite2 * (em * .5 + 4);
          const x = m[0] + nx, y = m[1] + ny, r = w / 2 + 2;
          const box = [x - r, y - r * Math.abs(Math.sin(winkel)) - em / 2, x + r, y + r * Math.abs(Math.sin(winkel)) + em / 2];
          if (!imRund(box, 2) || !frei(box)) continue;
          belegt.push(box);
          ctx.save(); ctx.translate(x, y); ctx.rotate(winkel);
          ctx.lineWidth = 3; ctx.strokeStyle = F.papier; ctx.strokeText(f.name, 0, 0);
          ctx.fillStyle = F.blau; ctx.fillText(f.name, 0, 0);
          ctx.restore();
          break;
        }
      });
      ctx.restore();

      // Kugelrand; im Ring höchstens der Äquator
      ctx.beginPath(); ctx.arc(c, c, R, 0, Math.PI * 2); ctx.strokeStyle = F.tinte; ctx.lineWidth = .9; ctx.stroke();
      if (o.ring === 'aequator' && k < 1.6) ringBeschriften();
    }

    /* Wo der Äquator den Kugelrand schneidet, steht „Äquator“ im Ring, der Rundung folgend. Der Rand ist ungezoomt der
       Horizont. Ein Wort, das ein Rechteck aus o.aussparungen() berühren würde, entfällt. */
    function ringBeschriften() {
      const c = seite / 2, N = 360, rand = [];
      d3.geoCircle().center(mitte).radius(89.95).precision(360 / N)().coordinates[0]
        .forEach(ll => { const p = projektion(ll); if (p) rand.push({ ll, th: Math.atan2(p[1] - c, p[0] - c) }); });
      const treffer = [];
      for (let i = 1; i < rand.length; i++) {
        const a = rand[i - 1], b = rand[i];
        let dth = b.th - a.th; if (dth > Math.PI) dth -= 2 * Math.PI; if (dth < -Math.PI) dth += 2 * Math.PI;
        if (Math.abs(dth) > .2) continue;
        if ((a.ll[1] <= 0) !== (b.ll[1] <= 0)) {
          const t = (0 - a.ll[1]) / (b.ll[1] - a.ll[1]);
          treffer.push(a.th + dth * t);
        }
      }
      const rl = R + ring / 2 + .5;
      ctx.font = schrift.ring; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const sperren = (typeof o.aussparungen === 'function' ? o.aussparungen() : []) || [];
      const halb = ctx.measureText('Äquator').width / 2;
      treffer.forEach(th => {
        const x = c + rl * Math.cos(th), y = c + rl * Math.sin(th);
        if (sperren.some(r => x + halb + 2 > r[0] && x - halb - 2 < r[2] && y + halb + 2 > r[1] && y - halb - 2 < r[3])) return;
        const dreh = Math.sin(th) > .02 ? th - Math.PI / 2 : th + Math.PI / 2;
        ctx.save(); ctx.translate(x, y); ctx.rotate(dreh);
        ctx.fillStyle = F.blau; ctx.fillText('Äquator', 0, .5);
        ctx.restore();
      });
    }

    // ---------- Bedienung ----------
    function eingriff() { flugBeenden(); chronikStoppen('abgebrochen'); auswahl = null; melden('beimEingriff'); }
    const zoom = d3.zoom().scaleExtent([KMIN, 24]).filter(e => {
      if (e.type === 'wheel') {
        if (e.ctrlKey || e.metaKey) return true;
        hinweisZeigen(/Mac|iPhone|iPad/.test(navigator.platform) ? 'Zum Zoomen ⌘ halten und scrollen' : 'Zum Zoomen Strg halten und scrollen');
        return false;
      }
      if (e.type.startsWith('touch') || e.type === 'dblclick') return false;
      return !e.button;
    });
    let letzte = d3.zoomIdentity;
    zoom.on('start', eingriff);
    zoom.on('zoom', e => {
      const t = e.transform;
      if (t.k !== letzte.k) { k = t.k; if (k > 1.6) feinLaden(); }
      else {
        const tempo = .25 / k;
        mitte[0] -= (t.x - letzte.x) * tempo;
        mitte[1] = Math.max(-85, Math.min(85, mitte[1] + (t.y - letzte.y) * tempo));
      }
      letzte = t;
      hoverLoesen();
      bewegung();
      zeichnen();
    });
    d3.select(canvas).call(zoom);
    function zoomStandSetzen() { letzte = d3.zoomIdentity.translate(letzte.x, letzte.y).scale(k); canvas.__zoom = letzte; }

    let hinweisTimer = null;
    function hinweisZeigen(text) {
      if (!hinweis) return;
      hinweis.textContent = text;
      hinweis.hidden = false;
      clearTimeout(hinweisTimer);
      hinweisTimer = setTimeout(() => { hinweis.hidden = true; }, 1600);
    }

    // Touch: zwei Finger drehen und zoomen; ein Finger waagerecht dreht, senkrecht scrollt der Browser die Seite
    let finger = null;
    const fingerLage = t => {
      const r = canvas.getBoundingClientRect();
      return { x: (t[0].clientX + t[1].clientX) / 2 - r.left, y: (t[0].clientY + t[1].clientY) / 2 - r.top, abstand: Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY) };
    };
    canvas.addEventListener('touchstart', e => { if (e.touches.length === 2) { finger = fingerLage(e.touches); eingriff(); } }, { passive: true });
    canvas.addEventListener('touchmove', e => {
      if (e.touches.length !== 2 || !finger) return;
      e.preventDefault();
      const jetzt = fingerLage(e.touches);
      const tempo = .25 / k;
      mitte[0] -= (jetzt.x - finger.x) * tempo;
      mitte[1] = Math.max(-85, Math.min(85, mitte[1] + (jetzt.y - finger.y) * tempo));
      k = Math.max(KMIN, Math.min(24, k * jetzt.abstand / finger.abstand));
      if (k > 1.6) feinLaden();
      finger = jetzt;
      zoomStandSetzen(); hoverLoesen(); bewegung(); zeichnen();
    }, { passive: false });
    canvas.addEventListener('touchend', e => { if (e.touches.length < 2) finger = null; });
    let zeiger = null;
    canvas.addEventListener('pointerdown', e => { if (e.pointerType === 'touch' && e.isPrimary) zeiger = { x: e.clientX, an: false }; }, { passive: true });
    canvas.addEventListener('pointermove', e => {
      if (!zeiger || e.pointerType !== 'touch' || !e.isPrimary || finger) return;
      const dx = e.clientX - zeiger.x;
      if (!zeiger.an) { if (Math.abs(dx) < 4) return; zeiger.an = true; eingriff(); }
      zeiger.x = e.clientX;
      mitte[0] -= dx * .25 / k;
      hoverLoesen(); bewegung(); zeichnen();
    }, { passive: true });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(t => canvas.addEventListener(t, () => { zeiger = null; }, { passive: true }));

    canvas.addEventListener('keydown', e => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const schritt = 10 / k;
      const tasten = {
        ArrowLeft: () => { mitte[0] -= schritt; }, ArrowRight: () => { mitte[0] += schritt; },
        ArrowUp: () => { mitte[1] = Math.min(85, mitte[1] + schritt); }, ArrowDown: () => { mitte[1] = Math.max(-85, mitte[1] - schritt); },
        '+': () => { k = Math.min(24, k * 1.4); feinLaden(); }, '=': () => { k = Math.min(24, k * 1.4); feinLaden(); }, '-': () => { k = Math.max(KMIN, k / 1.4); }
      };
      if (!tasten[e.key]) return;
      e.preventDefault();
      eingriff();
      hoverLoesen();
      tasten[e.key]();
      zoomStandSetzen(); bewegung(); zeichnen();
    });

    // Land unter dem Zeiger (nur auf Ebenen mit laender: true): bereiste Länder; mit o.alleLaender jedes Land, wie die Tafel von A
    // („nicht bereist“). Gewählt wird mit landBei(x, y) nur ein bereistes
    function hoverLoesen() { if (hover) { hover = null; zeichnen(); landMelden(); } }
    let gemeldetesLand = null;
    function landMelden() { if (hover !== gemeldetesLand) { gemeldetesLand = hover; melden('beiLand', hover); } }
    function landBei(x, y, alle) {
      if (!ebene.laender || Math.hypot(x - seite / 2, y - seite / 2) >= R) return null;
      const ll = projektion.invert([x, y]);
      if (!ll) return null;
      const f = daten().laender.find(l => (l.bereist || alle) && d3.geoContains(l, ll));
      if (f) return f;
      // Kleinstaaten: ihr Quadrat
      for (const [iso, pos] of Object.entries(winzig)) {
        if (!bereist.has(iso) || daten().isos.has(iso) || !sichtbar(pos)) continue;
        const p = projektion(pos);
        if (Math.abs(p[0] - x) <= 5 && Math.abs(p[1] - y) <= 5) return { iso, name: typeof o.landName === 'function' ? o.landName(iso) : iso, punkt: pos };
      }
      return null;
    }
    let wartet = false;
    canvas.addEventListener('pointermove', e => {
      if (e.buttons || wartet || e.pointerType === 'touch') return;
      if (!ebene.laender) { hoverLoesen(); return; }
      wartet = true;
      requestAnimationFrame(() => {
        wartet = false;
        const r = canvas.getBoundingClientRect();
        const t = landBei(e.clientX - r.left, e.clientY - r.top, !!o.alleLaender);
        if ((t && t.iso) !== (hover && hover.iso)) { hover = t; zeichnen(); landMelden(); }
      });
    });
    canvas.addEventListener('pointerleave', hoverLoesen);

    // ---------- Flug ----------
    function flugBeenden(grund = 'abgebrochen') { if (flug) { flug.stop(); flug = null; } if (flugEnde) { const f = flugEnde; flugEnde = null; f(grund); } }
    function fliegen(ziel, zielK, extra) {
      flugBeenden();
      hoverLoesen();
      if (zielK > 1.6) feinLaden();
      const start = mitte.slice(), startK = k;
      const weg = d3.geoInterpolate(start, ziel);
      const abstand = d3.geoDistance(start, ziel);
      const dauer = ruhig ? 0 : (extra && extra.dauer) || o.dauer || Math.min(2400, 900 + abstand * 700);
      const delle = Math.min(Math.log(Math.max(startK, zielK)), abstand * 1.1);
      const jeBild = extra && extra.jeBild;
      if (!dauer) { mitte = ziel.slice(); k = Math.max(KMIN, zielK); if (jeBild) jeBild(1); zoomStandSetzen(); zeichnen(); return Promise.resolve('fertig'); }
      return new Promise(fertig => {
        flugEnde = fertig;
        flug = d3.timer(verstrichen => {
          const t = Math.min(1, verstrichen / dauer);
          const e = d3.easeCubicInOut(t);
          mitte = weg(e);
          k = Math.max(KMIN, Math.exp((1 - e) * Math.log(startK) + e * Math.log(zielK) - delle * Math.sin(Math.PI * e)));
          if (jeBild) jeBild(e);
          zoomStandSetzen(); bewegung(); zeichnen();
          if (t >= 1) flugBeenden('fertig');
        });
      });
    }
    function landSuchen(iso) {
      const f = (fein || grob).laender.find(x => x.iso === iso);
      if (f) return f;
      return winzig[iso] ? { iso, name: typeof o.landName === 'function' ? o.landName(iso) : iso, punkt: winzig[iso] } : null;
    }
    function landAnfliegen(iso) {
      const f = landSuchen(iso);
      auswahl = f;
      if (ansichten[iso]) return fliegen(ansichten[iso].slice(0, 2), ansichten[iso][2]);
      if (!f) return Promise.resolve('fertig');
      if (!f.geometry) return fliegen(f.punkt, 20);
      const radius = Math.sqrt(d3.geoArea(f) / Math.PI);
      return fliegen(d3.geoCentroid(f), Math.max(1, Math.min(22, .5 / Math.sin(Math.min(radius * 1.4, 1.4)))));
    }

    // ---------- Weg und Chronik ----------
    // Der Weg einer Reihe von Stationen; ein Nebenort ist ein Abstecher vom Wohnort davor, hin und zurück
    function routeBauen(stationen) {
      const punkte = [], neben = [], an = [];
      let heim = null;
      stationen.forEach(s => {
        const p = [s.lon, s.lat];
        punkte.push(p); neben.push(!!s.neben); an.push(punkte.length - 1);
        if (s.neben && heim) { punkte.push(heim); neben.push(false); }
        if (!s.neben) heim = p;
      });
      return { punkte, neben, an, fortschritt: 0 };
    }
    function routeSetzen(stationen) {
      const neu = routeBauen(stationen);
      const gleich = route && route.punkte.length === neu.punkte.length && route.punkte.every((p, j) => p[0] === neu.punkte[j][0] && p[1] === neu.punkte[j][1]);
      if (!gleich) route = neu;
    }
    function chronikStoppen(grund) {
      if (!chronikNummer) return;
      chronikNummer = 0;
      sichtbarBis = null;
      zeichnen();
      melden('beiChronikEnde', grund || 'abgebrochen');
    }
    async function chronik(stationen, einst = {}) {
      chronikStoppen('abgebrochen');
      const nummer = chronikNummer = Date.now() + Math.random();
      const pause = einst.pause !== undefined ? einst.pause : 2600;
      const zoomZiel = typeof einst.zoom === 'function' ? einst.zoom : () => einst.zoom || 2.6;
      route = routeBauen(stationen);
      sichtbarBis = 0;
      aktiverOrt = stationen[0].name;
      if (typeof einst.beiStation === 'function') einst.beiStation(stationen[0], 0);
      let ergebnis;
      if (einst.sofort) {
        flugBeenden();
        mitte = [stationen[0].lon, stationen[0].lat]; k = zoomZiel(stationen[0], 0);
        if (k > 1.6) feinLaden();
        zoomStandSetzen(); zeichnen(); ergebnis = 'fertig';
      } else ergebnis = await fliegen([stationen[0].lon, stationen[0].lat], zoomZiel(stationen[0], 0), einst.dauer ? { dauer: einst.dauer } : undefined);
      for (let i = 1; i < stationen.length; i++) {
        if (chronikNummer !== nummer || ergebnis === 'abgebrochen') return 'abgebrochen';
        await new Promise(r => setTimeout(r, pause));
        if (chronikNummer !== nummer) return 'abgebrochen';
        const s = stationen[i], von = route.an[i - 1], bis = route.an[i];
        ergebnis = await fliegen([s.lon, s.lat], zoomZiel(s, i), {
          dauer: einst.dauer,
          jeBild: e => {
            route.fortschritt = von + (bis - von) * e;
            if (e > .55 && sichtbarBis < i) {
              sichtbarBis = i;
              aktiverOrt = s.name;
              if (typeof einst.beiStation === 'function') einst.beiStation(s, i);
            }
          }
        });
      }
      if (chronikNummer !== nummer || ergebnis === 'abgebrochen') return 'abgebrochen';
      await new Promise(r => setTimeout(r, pause));
      if (chronikNummer !== nummer) return 'abgebrochen';
      const ziel = einst.schluss || d3.geoCentroid({ type: 'MultiPoint', coordinates: route.punkte });
      route.fortschritt = route.punkte.length - 1;
      await fliegen(ziel.mitte || ziel, ziel.k || 1);
      if (chronikNummer !== nummer) return 'abgebrochen';
      chronikNummer = 0;
      sichtbarBis = null;
      aktiverOrt = null;
      zeichnen();
      melden('beiChronikEnde', 'fertig');
      return 'fertig';
    }
    function chronikSchritt(stationen, i, einst = {}) {
      chronikStoppen('abgebrochen');
      routeSetzen(stationen);
      const s = stationen[i], von = route.fortschritt, bis = route.an[i];
      aktiverOrt = s.name;
      return fliegen([s.lon, s.lat], einst.zoom || Math.max(k, 2.6), { dauer: einst.dauer, jeBild: e => { route.fortschritt = von + (bis - von) * e; } });
    }
    function routeZeigen(stationen) {
      chronikStoppen('abgebrochen');
      routeSetzen(stationen);
      route.fortschritt = route.punkte.length - 1;
      zeichnen();
    }

    setTimeout(feinLaden, 1200);
    messen();
    zeichnen();
    window.addEventListener('resize', () => { messen(); zeichnen(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(zeichnen);

    return {
      ebene(neu, einst = {}) {
        chronikStoppen('abgebrochen');
        ebene = Object.assign({ orte: [], laender: false, blick: { mitte: [20, 25], k: 1 } }, neu);
        route = null; aktiverOrt = null; auswahl = null; hover = null;
        // behalten: Blick und Zoom bleiben, wie sie sind
        if (einst.behalten) { zeichnen(); return Promise.resolve('fertig'); }
        if (einst.fliegen === false) { mitte = ebene.blick.mitte.slice(); k = Math.max(KMIN, ebene.blick.k); zoomStandSetzen(); zeichnen(); return Promise.resolve('fertig'); }
        return fliegen(ebene.blick.mitte, ebene.blick.k);
      },
      fliegen: (ziel, zielK) => { chronikStoppen('abgebrochen'); return fliegen(ziel, zielK); },
      ortAnfliegen(ort, zielK) { chronikStoppen('abgebrochen'); aktiverOrt = ort.name; return fliegen([ort.lon, ort.lat], zielK || Math.max(k, 7)); },
      landAnfliegen(iso) { chronikStoppen('abgebrochen'); return landAnfliegen(iso); },
      aktiv(name) { aktiverOrt = name; zeichnen(); },
      auswahl(iso) { auswahl = iso ? landSuchen(iso) : null; zeichnen(); },
      springen(ziel, zielK) { chronikStoppen('abgebrochen'); flugBeenden(); mitte = ziel.slice(); k = Math.max(KMIN, zielK); if (k > 1.6) feinLaden(); zoomStandSetzen(); zeichnen(); },
      landBei,
      chronik, chronikSchritt, routeZeigen, chronikStoppen: () => chronikStoppen('abgebrochen'),
      zeichnen,
      k: () => k,
      land: iso => landSuchen(iso)
    };
  }

  window.Globus = { erstellen };
})();
