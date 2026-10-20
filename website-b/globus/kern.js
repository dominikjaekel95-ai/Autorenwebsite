/* Globus-Kern: orthografischer Canvas-Globus der Website.
 *
 * Braucht d3 7.9 und topojson-client 3.1 sowie daten/welt-110m.js (window.WELT_110M).
 * Optional: daten/welt-50m.js (wird nachgeladen), daten/uk-landesteile.js, daten/laender-de.js.
 *
 *   const g = Globus.erstellen({
 *     canvas, flaeche,            // Canvas und das Element, das beim Zoomen den runden Rand bekommt (Klasse ist-gezoomt)
 *     tipp, hinweis,              // optionale Elemente für Länder-Tooltip und Bedienhinweis
 *     bereist: ['DE', ...],       // ISO-Codes, Landesteile als 'GB-ENG' usw., Westjordanland als 'PS-WB'
 *     winzig: { MC: [lon, lat] }, // Kleinstaaten ohne Fläche im groben Maßstab
 *     ansichten: { FR: [lon, lat, k] },
 *     farben: { papier, land, reise, grenze, kueste, rand, text, textLeise, akzent, akzentHauch, gradnetz },
 *     schrift: { ort: '500 10.5px Mono', land: 'italic 13px Serif' }, versalien: true,
 *     daten50: 'daten/welt-50m.js', pendeln: true,
 *     beimAnsichtWechsel: teile => {}, beimEingriff: () => {}, beiChronikEnde: grund => {}
 *   });
 *   g.ebene({ orte: [{ name, lat, lon, rang, kurz, neben }], laender: true, blick: { mitte: [lon, lat], k }, farben: { akzent } }, { fliegen: true });
 *                                 // farben in der Ebene überschreiben die Grundfarben, solange die Ebene gilt
 *                                 // neben: true zeichnet einen Nebenort (offener Punkt, leise Beschriftung, gestrichelte Spur)
 *   g.fliegen([lon, lat], k)      -> Promise 'fertig' | 'abgebrochen'
 *   g.ortAnfliegen(ort, k), g.landAnfliegen(iso), g.aktiv('Name' | 'A · B' | null), g.auswahl(iso | null)
 *   g.zoomen(faktor), g.ganz()
 *   g.chronik(stationen, { beiStation(station, i), pause, zoom, dauer }) -> Promise 'fertig' | 'abgebrochen'
 *   g.chronikSchritt(stationen, i, { zoom, dauer })  // eine Station von Hand, die Spur wächst oder schrumpft bis i
 *   g.routeZeigen(stationen)                          // ganze Spur stehen lassen, ohne Flug
 *   g.chronikStoppen(), g.pendelnStoppen(), g.zeichnen(), g.k(), g.land(iso)
 *   Optional: tippText: (land, bereist) => 'Text' für den Länder-Tooltip
 *
 * Zeichenart „druck“ (Version B, website-b): zeichenart: 'druck' zeichnet die Kugel als Karte im Zweifarbendruck.
 *   Schwarzplatte (farben.tinte): Grenzen gestrichelt, Weg, Ortszeichen, Ortsnamen aufrecht, Schraffur bereister Länder,
 *   Kugelrand. Blauplatte (farben.blau, farben.blauRaster): Wasserfläche als Raster, Küste, Gradnetz, Gewässernamen kursiv,
 *   Gradzahlen im Ring zwischen Kugelrand und Kartenrahmen. Land in farben.papier. Die Farben gibt die Seite aus ihren Tokens.
 *   Weitere Optionen nur für „druck“:
 *     schrift: { ort, ortAktiv, wasser, ring }   Schriften für Ortsnamen, aktiven Ort, Gewässernamen, Gradzahlen (Leinwand)
 *     dauer: 1000                    feste Dauer jedes Flugs in ms (bei reduzierter Bewegung 0)
 *     aussparungen: () => [[x0, y0, x1, y1], …]   Rechtecke in Leinwandpunkten, die keine Gradzahl berühren darf
 *     beiLand: land | null => {}     Land unter dem Zeiger (nur auf Ebenen mit laender: true), statt eines Tooltips
 *     beiAnsicht: ({ k, mitte, bewegt, massstab }) => {}   nach jedem Bild; massstab { km, px } ab Zoom 2,4, sonst null
 *   Ebene: grenzen: false lässt die Staatsgrenzen weg (Karte der Trilogie). Zoom nie unter 1: die ganze Kugel füllt den Ring.
 *   Ein Finger waagerecht dreht die Kugel (touch-action: pan-y lässt die Seite senkrecht scrollen), zwei Finger zoomen.
 *   g.chronik(stationen, { zoom: (station, i) => k, sofort: true }): Zoom je Station; sofort: die erste Station ohne Flug.
 *   g.massstab() -> { km, px } | null;  g.springen([lon, lat], k) ohne Flug;  g.landBei(x, y) -> Land an einem Leinwandpunkt
 */
(function () {
  const RAD = Math.PI / 180;

  function erstellen(o) {
    const { canvas, flaeche, tipp, hinweis } = o;
    const grundfarben = Object.assign({
      papier: '#fff', land: '#F1F1F2', reise: '#D5D8F5', grenze: '#BFC1C5', kueste: '#9B9DA2', rand: '#1D1E21',
      text: '#1D1E21', textLeise: '#63656B', akzent: '#2C3CCB', akzentHauch: 'rgba(44, 60, 203, .14)', gradnetz: '#EDEEEF'
    }, o.farben || {});
    const schrift = Object.assign({ ort: '500 10.5px ui-monospace, monospace', land: 'italic 13px Georgia, serif' }, o.schrift || {});
    const versalien = o.versalien !== false;
    const druck = o.zeichenart === 'druck';
    const KMIN = druck ? 1 : .9;
    const bereist = new Set(o.bereist || []);
    const winzig = o.winzig || {};
    const ansichten = o.ansichten || {};
    const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const melden = (name, ...werte) => { if (typeof o[name] === 'function') o[name](...werte); };

    const ctx = canvas.getContext('2d', o.zeichenart === 'druck' ? { willReadFrequently: true } : undefined);
    const DE = window.LAENDER_DE || { nach_id: {}, nach_name: {} };
    const projektion = d3.geoOrthographic().clipAngle(90).precision(.4);
    const pfad = d3.geoPath(projektion, ctx);
    const gradnetz = d3.geoGraticule10();

    let ebene = { orte: [], laender: false, blick: { mitte: [20, 25], k: 1 } };
    let mitte = [20, 25];
    let k = 1, seite = 600, R = 280, dpr = 1, ring = 24;
    let hover = null, auswahl = null, aktiverOrt = null;
    let flug = null, flugEnde = null;
    let route = null;              // { punkte: [[lon, lat]], neben: [bool], fortschritt: Segmente als Kommazahl }
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
        landGanz: { type: 'FeatureCollection', features: laender },
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
    // In Bewegung grob zeichnen, in Ruhe fein
    let bewegt = false, ruheTimer = null;
    function bewegung() {
      bewegt = true;
      clearTimeout(ruheTimer);
      ruheTimer = setTimeout(() => { bewegt = false; zeichnen(); ansichtMelden(); }, 220);
    }
    // „druck“: in Bewegung und im Überblick grob, gezoomt in Ruhe fein (sonst dauert ein Bild über 100 ms)
    const daten = () => druck ? (fein && k > 1.8 && !bewegt ? fein : grob) : (fein && (k > 1.8 || !bewegt)) ? fein : grob;

    // ---------- Zeichnen ----------
    function messen() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      seite = canvas.clientWidth || 600;
      canvas.width = Math.round(seite * dpr);
      canvas.height = Math.round(seite * dpr);
      ring = seite < 480 ? 19 : 24;
      R = druck ? seite / 2 - ring : seite / 2 - 2;
      if (druck) musterBauen();
    }
    function imKreis(b) {
      const r = seite / 2 - 4;
      return [[b[0], b[1]], [b[2], b[1]], [b[0], b[3]], [b[2], b[3]]].every(([x, y]) => Math.hypot(x - seite / 2, y - seite / 2) < r);
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
      for (let i = 0; i <= n; i++) { const t = (i / n) * bis; punkte.push(weg(t)); }
      return punkte;
    }

    function zeichnen() {
      if (druck) { druckZeichnen(); return; }
      const farben = ebene.farben ? Object.assign({}, grundfarben, ebene.farben) : grundfarben;
      projektion.translate([seite / 2, seite / 2]).scale(R * k).rotate([-mitte[0], -mitte[1]]).clipExtent([[0, 0], [seite, seite]]);
      const d = daten();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, seite, seite);

      ctx.beginPath(); pfad({ type: 'Sphere' }); ctx.fillStyle = farben.papier; ctx.fill();
      if (k < 2.2) { ctx.beginPath(); pfad(gradnetz); ctx.strokeStyle = farben.gradnetz; ctx.lineWidth = .5; ctx.stroke(); }
      if (flaeche) flaeche.classList.toggle('ist-gezoomt', k > 1.15);

      ctx.beginPath(); d.laender.forEach(f => pfad(f)); ctx.fillStyle = farben.land; ctx.fill();
      if (ebene.laender) { ctx.beginPath(); pfad(d.bereist); ctx.fillStyle = farben.reise; ctx.fill(); }
      if (hover) { ctx.beginPath(); pfad(hover); ctx.fillStyle = farben.akzentHauch; ctx.fill(); }

      ctx.beginPath(); pfad(d.grenzen); ctx.strokeStyle = farben.grenze; ctx.lineWidth = k > 3 ? .7 : .45; ctx.stroke();
      ctx.beginPath(); pfad(d.kueste); ctx.strokeStyle = farben.kueste; ctx.lineWidth = .6; ctx.stroke();
      if (hover) { ctx.beginPath(); pfad(hover); ctx.strokeStyle = farben.akzent; ctx.lineWidth = 1; ctx.stroke(); }
      if (auswahl && auswahl !== hover && ebene.laender) {
        const a = d.laender.find(x => x.iso === auswahl.iso) || auswahl;
        ctx.beginPath(); pfad(a); ctx.strokeStyle = farben.akzent; ctx.lineWidth = 1.2; ctx.stroke();
      }
      ctx.beginPath(); pfad({ type: 'Sphere' }); ctx.strokeStyle = farben.rand; ctx.lineWidth = 1; ctx.stroke();

      if (ebene.laender) {
        Object.entries(winzig).forEach(([iso, pos]) => {
          if (!bereist.has(iso) || d.isos.has(iso) || !sichtbar(pos)) return;
          const p = projektion(pos);
          ctx.beginPath(); ctx.arc(p[0], p[1], 2.4, 0, Math.PI * 2);
          ctx.fillStyle = farben.reise; ctx.fill();
          ctx.lineWidth = .8; ctx.strokeStyle = farben.akzent; ctx.stroke();
        });
      }

      // Route der Chronik: fertige Abschnitte durchgezogen, der aktuelle wächst
      if (route && route.punkte.length > 1) {
        ctx.lineWidth = 1.3; ctx.strokeStyle = farben.akzent; ctx.lineCap = 'round';
        const ganz = Math.floor(route.fortschritt), rest = route.fortschritt - ganz;
        for (let i = 0; i < route.punkte.length - 1 && i <= ganz; i++) {
          const bis = i < ganz ? 1 : rest;
          if (bis <= 0) continue;
          ctx.globalAlpha = i < ganz - 2 ? .35 : .85;
          ctx.setLineDash(route.neben && (route.neben[i] || route.neben[i + 1]) ? [2.5, 3.5] : []);
          linie(bogen(route.punkte[i], route.punkte[i + 1], bis));
        }
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      // Orte mit Beschriftung ohne Überlappung
      const belegt = [];
      const gruppen = [];
      const orte = ebene.orte.map((ort, i) => ({ ort, i })).filter(({ i }) => sichtbarBis === null || i <= sichtbarBis).sort((a, b) => (a.ort.rang || 1) - (b.ort.rang || 1));
      ctx.font = schrift.ort;
      ctx.textBaseline = 'middle';
      orte.forEach(({ ort }) => {
        const pos = [ort.lon, ort.lat];
        if (!sichtbar(pos)) return;
        const p = projektion(pos);
        const aktiv = !!aktiverOrt && aktiverOrt.split(' · ').includes(ort.name);
        ctx.beginPath(); ctx.arc(p[0], p[1], aktiv ? 7 : ort.neben ? 4.5 : 5.5, 0, Math.PI * 2); ctx.fillStyle = farben.akzentHauch; ctx.fill();
        if (ort.neben) { ctx.beginPath(); ctx.arc(p[0], p[1], 2.3, 0, Math.PI * 2); ctx.fillStyle = farben.papier; ctx.fill(); ctx.lineWidth = 1.1; ctx.strokeStyle = farben.akzent; ctx.stroke(); }
        else { ctx.beginPath(); ctx.arc(p[0], p[1], 2.6, 0, Math.PI * 2); ctx.fillStyle = farben.akzent; ctx.fill(); }
        belegt.push([p[0] - 3, p[1] - 3, p[0] + 3, p[1] + 3]);   // Beschriftungen sollen keine Punkte verdecken
        const name = ort.beschriftung || ort.kurz || ort.name;
        const nah = gruppen.find(g => Math.hypot(g.p[0] - p[0], g.p[1] - p[1]) < 16);
        if (nah) { nah.namen.push(name); nah.aktiv = nah.aktiv || aktiv; nah.neben = nah.neben && !!ort.neben; } else gruppen.push({ p, namen: [name], aktiv, neben: !!ort.neben });
      });
      // Kollision mit 4 px Luft, der aktive Ort wird zuerst beschriftet
      const frei = b => !belegt.some(x => b[0] - 4 < x[2] && b[2] + 4 > x[0] && b[1] < x[3] && b[3] > x[1]);
      gruppen.sort((a, b) => b.aktiv - a.aktiv).forEach(({ p, namen, aktiv, neben }) => {
        const text = versalien ? namen.join(' · ').toUpperCase() : namen.join(' · ');
        const breite = ctx.measureText(text).width + 2;
        const boxRechts = [p[0] + 9, p[1] - 8, p[0] + 9 + breite, p[1] + 8];
        const boxLinks = [p[0] - 9 - breite, p[1] - 8, p[0] - 9, p[1] + 8];
        const rechts = imKreis(boxRechts) && frei(boxRechts);
        const links = imKreis(boxLinks) && frei(boxLinks);
        if (!rechts && !links) return;
        belegt.push(rechts ? boxRechts : boxLinks);
        ctx.textAlign = rechts ? 'left' : 'right';
        ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = farben.papier;
        ctx.strokeText(text, rechts ? p[0] + 9 : p[0] - 9, p[1]);
        ctx.fillStyle = aktiv ? farben.akzent : neben ? farben.textLeise : farben.text;
        ctx.fillText(text, rechts ? p[0] + 9 : p[0] - 9, p[1]);
      });

      // Ländernamen bereister Länder ab mittlerem Zoom
      if (k >= 2.6 && ebene.laender) {
        ctx.font = schrift.land;
        ctx.fillStyle = farben.textLeise;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        d.bereist.features.forEach(f => {
          if (d3.geoDistance(f.punkt, mitte) > 1.3) return;
          const p = projektion(f.punkt);
          if (!p) return;
          const b = ctx.measureText(f.name).width / 2 + 2;
          const box = [p[0] - b, p[1] - 8, p[0] + b, p[1] + 8];
          if (!imKreis(box) || !frei(box)) return;
          belegt.push(box);
          ctx.fillText(f.name, p[0], p[1]);
        });
      }
      if (!bewegt) ansichtMelden();
    }

    // ---------- Zeichenart „druck“: Karte im Zweifarbendruck ----------
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
    const NB = ' ';
    const druckSchrift = Object.assign({ ort: '500 15px serif', ortAktiv: '600 15px serif', wasser: 'italic 500 13px serif', ring: '500 13px serif' }, o.schrift || {});
    let muster = null;
    // Schraffur der bereisten Länder: Schwarzplatte, 45°, Linien von 0,55 px im Abstand von 3,4 px
    function musterBauen() {
      const a = Math.max(2, Math.round(3.4 * dpr)), m = document.createElement('canvas');
      m.width = m.height = a;
      const g = m.getContext('2d');
      g.strokeStyle = grundfarben.tinte; g.lineWidth = .55 * dpr;
      g.beginPath();
      g.moveTo(0, a); g.lineTo(a, 0); g.moveTo(-1, 1); g.lineTo(1, -1); g.moveTo(a - 1, a + 1); g.lineTo(a + 1, a - 1);
      g.stroke();
      muster = ctx.createPattern(m, 'repeat');
      if (muster && muster.setTransform && window.DOMMatrix) muster.setTransform(new DOMMatrix().scale(1 / dpr));
    }
    const rasterRgb = (() => { const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(String(grundfarben.blauRaster || '').trim()); return m ? [1, 2, 3].map(j => parseInt(m[j], 16)) : [229, 236, 243]; })();
    const netzSchritt = () => k < 1.6 ? 30 : k < 4 ? 10 : k < 9 ? 5 : 2;
    const netze = {};
    const netz = s => netze[s] || (netze[s] = d3.geoGraticule().step([s, s]).extentMajor([[-180, -90 + 1e-6], [180, 90 - 1e-6]])());
    // Maßstab: in der orthografischen Projektion stimmt er nur in der Kartenmitte; unter Zoom 2,4 gibt es keinen
    function massstab() {
      if (!druck || k < 2.4) return null;
      const jeKm = R * k / 6371, hoechstens = seite < 480 ? 96 : 120;
      const km = [100, 250, 500, 1000].filter(x => x * jeKm <= hoechstens).pop() || 100;
      return { km, px: km * jeKm };
    }
    const gradText = (wert, art) => {
      if (wert === 0) return art === 'b' ? 'Äquator' : '0°';
      if (art === 'l' && Math.abs(wert) === 180) return '180°';
      return Math.abs(wert) + '°' + NB + (art === 'b' ? (wert > 0 ? 'N' : 'S') : (wert > 0 ? 'O' : 'W'));
    };
    function druckZeichnen() {
      const F = grundfarben, c = seite / 2;
      projektion.translate([c, c]).scale(R * k).rotate([-mitte[0], -mitte[1]]).clipExtent([[0, 0], [seite, seite]]);
      const d = daten();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, seite, seite);
      ctx.save();
      ctx.beginPath(); ctx.arc(c, c, R, 0, Math.PI * 2); ctx.clip();

      ctx.beginPath(); pfad({ type: 'Sphere' }); ctx.fillStyle = F.blauRaster; ctx.fill();
      ctx.beginPath(); pfad(d.landFlaeche); ctx.fillStyle = F.papier; ctx.fill();
      // In Ruhe: das Bild aus Wasser und Land einmal auslesen; daran prüfen die Gewässernamen, ob sie auf Wasser stehen
      let wasserBild = null;
      if (!bewegt) { try { wasserBild = ctx.getImageData(0, 0, canvas.width, canvas.height); } catch (e) { wasserBild = null; } }
      if (ebene.laender && muster) { ctx.beginPath(); pfad(d.bereist); ctx.fillStyle = muster; ctx.fill(); }

      ctx.beginPath(); pfad(netz(netzSchritt())); ctx.strokeStyle = F.blau; ctx.lineWidth = .45; ctx.globalAlpha = .75; ctx.stroke(); ctx.globalAlpha = 1;
      if (ebene.grenzen !== false) {
        ctx.beginPath(); pfad(d.grenzen); ctx.strokeStyle = F.tinte; ctx.lineWidth = k >= 3 ? .6 : .45;
        ctx.setLineDash([2.2, 1.6]); ctx.stroke(); ctx.setLineDash([]);
      }
      ctx.beginPath(); pfad(d.kueste); ctx.strokeStyle = F.blau; ctx.lineWidth = .8; ctx.stroke();
      if (ebene.laender) {
        const a = auswahl ? d.laender.find(x => x.iso === auswahl.iso) || auswahl : null;
        [[a, 1.2], [hover !== a ? hover : null, 1]].forEach(([f, w]) => { if (!f) return; ctx.beginPath(); pfad(f); ctx.strokeStyle = F.tinte; ctx.lineWidth = w; ctx.stroke(); });
        Object.entries(winzig).forEach(([iso, pos]) => {
          if (!bereist.has(iso) || d.isos.has(iso) || !sichtbar(pos)) return;
          // Kleinstaaten ohne Fläche im Maßstab: ein schraffiertes Quadrat, damit sie nicht wie ein Ortszeichen aussehen
          const p = projektion(pos);
          ctx.beginPath(); ctx.rect(p[0] - 3, p[1] - 3, 6, 6);
          ctx.fillStyle = muster || F.papier; ctx.fill(); ctx.lineWidth = .6; ctx.strokeStyle = F.tinte; ctx.stroke();
        });
      }

      // Weg: Schwarzplatte, zu Nebenorten gestrichelt
      if (route && route.punkte.length > 1) {
        ctx.lineWidth = 1.2; ctx.strokeStyle = F.tinte; ctx.lineCap = 'round';
        const ganz = Math.floor(route.fortschritt), rest = route.fortschritt - ganz;
        for (let i = 0; i < route.punkte.length - 1 && i <= ganz; i++) {
          const bis = i < ganz ? 1 : rest;
          if (bis <= 0) continue;
          ctx.setLineDash(route.neben && (route.neben[i] || route.neben[i + 1]) ? [3, 3] : []);
          linie(bogen(route.punkte[i], route.punkte[i + 1], bis));
        }
        ctx.setLineDash([]);
        ctx.lineCap = 'butt';
      }

      // Ortszeichen zuerst, damit kein Name sie verdeckt: gefüllter Punkt, für längere Aufenthalte ein offener Kreis (7 px)
      const belegt = [];
      const imRund = (b, rand) => [[b[0], b[1]], [b[2], b[1]], [b[0], b[3]], [b[2], b[3]]].every(([x, y]) => Math.hypot(x - c, y - c) < R - rand);
      const orte = ebene.orte.map((ort, i) => ({ ort, i })).filter(({ i }) => sichtbarBis === null || i <= sichtbarBis)
        .filter(({ ort }) => sichtbar([ort.lon, ort.lat])).map(x => Object.assign(x, { p: projektion([x.ort.lon, x.ort.lat]) }));
      orte.forEach(({ ort, p }) => {
        ctx.beginPath();
        if (ort.neben) { ctx.arc(p[0], p[1], 2.875, 0, Math.PI * 2); ctx.fillStyle = F.papier; ctx.fill(); ctx.lineWidth = 1.25; ctx.strokeStyle = F.tinte; ctx.stroke(); }
        else { ctx.arc(p[0], p[1], 3.5, 0, Math.PI * 2); ctx.fillStyle = F.tinte; ctx.fill(); }
        belegt.push([p[0] - 4, p[1] - 4, p[0] + 4, p[1] + 4]);
      });
      // Ortsnamen aufrecht; Lage nach der Reihenfolge rechts oben, rechts unten, links oben, links unten, rechts, links.
      // Der aktive Ort zuerst und halbfett; kein Name überdeckt einen anderen oder ein Ortszeichen
      const aktivListe = aktiverOrt ? aktiverOrt.split(' · ') : [];
      const frei = b => !belegt.some(x => b[0] < x[2] + 1 && b[2] + 1 > x[0] && b[1] < x[3] && b[3] > x[1]);
      ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
      orte.slice().sort((a, b) => aktivListe.includes(b.ort.name) - aktivListe.includes(a.ort.name) || (a.ort.rang || 1) - (b.ort.rang || 1) || a.i - b.i)
        .forEach(({ ort, p }) => {
          const aktiv = aktivListe.includes(ort.name);
          ctx.font = aktiv ? druckSchrift.ortAktiv : druckSchrift.ort;
          const text = ort.beschriftung || ort.kurz || ort.name, w = ctx.measureText(text).width, h = 11, [px, py] = p;
          const lagen = [[px + 5, py - 5, 'l'], [px + 5, py + 5 + h, 'l'], [px - 5, py - 5, 'r'], [px - 5, py + 5 + h, 'r'], [px + 7, py + h / 2, 'l'], [px - 7, py + h / 2, 'r']];
          for (const [lx, ly, a] of lagen) {
            const box = a === 'l' ? [lx - 1.5, ly - h - 1.5, lx + w + 1.5, ly + 4] : [lx - w - 1.5, ly - h - 1.5, lx + 1.5, ly + 4];
            if (!imRund(box, 3) || !frei(box)) continue;
            belegt.push(box);
            ctx.textAlign = a === 'l' ? 'left' : 'right';
            ctx.lineWidth = 3; ctx.strokeStyle = F.papier; ctx.strokeText(text, lx, ly);
            ctx.fillStyle = F.tinte; ctx.fillText(text, lx, ly);
            break;
          }
        });
      // Gewässernamen: Blauplatte, kursiv, nur auf Wasser; Ozeane in Versalien, gesperrt
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = druckSchrift.wasser;
      const em = parseFloat(/(\d+(?:\.\d+)?)px/.exec(druckSchrift.wasser) ? /(\d+(?:\.\d+)?)px/.exec(druckSchrift.wasser)[1] : 13);
      const kannSperren = 'letterSpacing' in ctx;
      // In Bewegung keine Gewässernamen: die Prüfung auf Wasser ist teuer; nach dem Flug stehen sie wieder da
      if (!bewegt) GEWAESSER.forEach(([name, lon, lat, abK, ozean, bisK]) => {
        if (k < abK || (ozean && k > (bisK || 3.2)) || !sichtbar([lon, lat])) return;
        const p = projektion([lon, lat]);
        if (kannSperren) ctx.letterSpacing = ozean ? (em * .12).toFixed(2) + 'px' : '0px';
        const text = ozean ? name.toUpperCase() : name, w = ctx.measureText(text).width, hh = em * .5;
        // Auf Wasser: im Schriftfeld liegt alle 3 px kein Bildpunkt Land (Papier statt Raster der Blauplatte)
        const aufWasser = b => {
          if (!wasserBild) return false;
          const W = wasserBild.width, px = wasserBild.data, [wr, wg, wb] = rasterRgb;
          for (let y = b[1]; y <= b[3]; y += 3) for (let x = b[0]; x <= b[2]; x += 3) {
            const i = (Math.round(y * dpr) * W + Math.round(x * dpr)) * 4;
            if (i < 0 || i >= px.length) return false;
            if (Math.abs(px[i] - wr) > 6 || Math.abs(px[i + 1] - wg) > 6 || Math.abs(px[i + 2] - wb) > 6) return false;
          }
          return true;
        };
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
      ctx.restore();

      // Kugelrand und Gradzahlen im Ring
      ctx.beginPath(); ctx.arc(c, c, R, 0, Math.PI * 2); ctx.strokeStyle = F.tinte; ctx.lineWidth = .9; ctx.stroke();
      ringBeschriften();
      melden('beiAnsicht', { k, mitte: mitte.slice(), bewegt, massstab: massstab() });
      if (!bewegt && typeof o.beimAnsichtWechsel === 'function') ansichtMelden();
    }

    /* Wo eine Netzlinie den Kugelrand schneidet, steht ihr Wert im Ring, der Rundung folgend. Der Rand wird abgetastet:
       ungezoomt der Horizont, gezoomt der Kreis des Ausschnitts (zurückgerechnet auf Länge und Breite). Werte, die näher als
       40 px an der vorigen stehen oder ein Rechteck aus o.aussparungen() berühren, entfallen. */
    function ringBeschriften() {
      const c = seite / 2, s = netzSchritt(), N = 360, rand = [];
      if (R * k <= R + .5) {
        const kreis = d3.geoCircle().center(mitte).radius(89.95).precision(360 / N)().coordinates[0];
        kreis.forEach(ll => { const p = projektion(ll); if (p) rand.push({ ll, th: Math.atan2(p[1] - c, p[0] - c) }); });
      } else {
        for (let i = 0; i <= N; i++) {
          const th = i / N * Math.PI * 2 - Math.PI, ll = projektion.invert([c + R * Math.cos(th), c + R * Math.sin(th)]);
          if (ll && isFinite(ll[0]) && isFinite(ll[1])) rand.push({ ll, th });
        }
      }
      const treffer = [];
      for (let i = 1; i < rand.length; i++) {
        const a = rand[i - 1], b = rand[i];
        let dth = b.th - a.th; if (dth > Math.PI) dth -= 2 * Math.PI; if (dth < -Math.PI) dth += 2 * Math.PI;
        if (Math.abs(dth) > .2) continue;
        const kreuz = (wa, wb, art) => {
          const lo = Math.min(wa, wb), hi = Math.max(wa, wb);
          for (let v = Math.ceil(lo / s) * s; v <= hi; v += s) {
            if (v === lo && v === hi) continue;
            if (art === 'b' && Math.abs(v) > 80) continue;
            const t = hi === lo ? 0 : (v - wa) / (wb - wa);
            let w = ((v % 360) + 540) % 360 - 180; if (art === 'l' && w === -180) w = 180;
            treffer.push({ th: a.th + dth * t, text: gradText(art === 'l' ? w : v, art) });
          }
        };
        kreuz(a.ll[1], b.ll[1], 'b');
        let la = a.ll[0], lb = b.ll[0];
        if (lb - la > 180) lb -= 360; else if (la - lb > 180) lb += 360;
        kreuz(la, lb, 'l');
      }
      const rl = R + ring / 2 + .5;
      ctx.font = druckSchrift.ring;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const sperren = (typeof o.aussparungen === 'function' ? o.aussparungen() : []) || [];
      const gesetzt = [];
      treffer.map(t => Object.assign(t, { w: ctx.measureText(t.text).width }))
        .sort((x, y) => x.th - y.th)
        .forEach(t => {
          const x = c + rl * Math.cos(t.th), y = c + rl * Math.sin(t.th), halb = t.w / 2;
          const nah = gesetzt.some(g => { let d = Math.abs(g.th - t.th); d = Math.min(d, Math.PI * 2 - d); return d * rl - halb - g.halb < 40; });
          if (nah) return;
          if (sperren.some(r => x + halb + 2 > r[0] && x - halb - 2 < r[2] && y + halb + 2 > r[1] && y - halb - 2 < r[3])) return;
          gesetzt.push({ th: t.th, halb });
          const dreh = Math.sin(t.th) > .02 ? t.th - Math.PI / 2 : t.th + Math.PI / 2;
          ctx.save(); ctx.translate(x, y); ctx.rotate(dreh);
          ctx.fillStyle = grundfarben.blau; ctx.fillText(t.text, 0, .5);
          ctx.restore();
        });
    }

    let letzteAnsicht = '';
    function ansichtMelden() {
      const teile = ['Welt'];
      if (k >= 1.3) {
        const mehrere = aktiverOrt && aktiverOrt.includes(' · ');
        const land = mehrere ? null : daten().laender.find(f => d3.geoContains(f, mitte));
        if (land) teile.push(land.name);
        if (aktiverOrt && k >= 3) teile.push(aktiverOrt);
      }
      const text = teile.join(' › ');
      if (text !== letzteAnsicht) { letzteAnsicht = text; melden('beimAnsichtWechsel', teile); }
    }

    // ---------- Bedienung ----------
    function eingriff() { flugBeenden(); chronikStoppen('abgebrochen'); pendelnStoppen(); auswahl = null; melden('beimEingriff'); }
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
      tippVerstecken();
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

    // Touch: ein Finger scrollt die Seite, zwei Finger drehen und zoomen
    let finger = null;
    const fingerLage = t => {
      const r = canvas.getBoundingClientRect();
      return { x: (t[0].clientX + t[1].clientX) / 2 - r.left, y: (t[0].clientY + t[1].clientY) / 2 - r.top, abstand: Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY) };
    };
    canvas.addEventListener('touchstart', e => { if (e.touches.length === 2) { finger = fingerLage(e.touches); eingriff(); } }, { passive: true });
    canvas.addEventListener('touchmove', e => {
      if (e.touches.length === 1 && !finger) { if (!druck) hinweisZeigen('Zwei Finger zum Drehen und Zoomen'); return; }
      if (e.touches.length !== 2 || !finger) return;
      e.preventDefault();
      const jetzt = fingerLage(e.touches);
      const tempo = .25 / k;
      mitte[0] -= (jetzt.x - finger.x) * tempo;
      mitte[1] = Math.max(-85, Math.min(85, mitte[1] + (jetzt.y - finger.y) * tempo));
      k = Math.max(KMIN, Math.min(24, k * jetzt.abstand / finger.abstand));
      if (k > 1.6) feinLaden();
      finger = jetzt;
      zoomStandSetzen(); tippVerstecken(); bewegung(); zeichnen();
    }, { passive: false });
    canvas.addEventListener('touchend', e => { if (e.touches.length < 2) finger = null; });
    if (druck) {
      // Ein Finger waagerecht dreht; senkrecht scrollt der Browser die Seite (touch-action: pan-y) und bricht die Geste ab
      let zeiger = null;
      canvas.addEventListener('pointerdown', e => { if (e.pointerType === 'touch' && e.isPrimary) zeiger = { x: e.clientX, an: false }; }, { passive: true });
      canvas.addEventListener('pointermove', e => {
        if (!zeiger || e.pointerType !== 'touch' || !e.isPrimary || finger) return;
        const dx = e.clientX - zeiger.x;
        if (!zeiger.an) { if (Math.abs(dx) < 4) return; zeiger.an = true; eingriff(); }
        zeiger.x = e.clientX;
        mitte[0] -= dx * .25 / k;
        tippVerstecken(); bewegung(); zeichnen();
      }, { passive: true });
      ['pointerup', 'pointercancel', 'pointerleave'].forEach(t => canvas.addEventListener(t, () => { zeiger = null; }, { passive: true }));
    }

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
      tippVerstecken();
      tasten[e.key]();
      zoomStandSetzen(); bewegung(); zeichnen();
    });

    // Länder-Tooltip
    function tippVerstecken() { if (tipp) tipp.hidden = true; if (hover) { hover = null; zeichnen(); landMelden(); } }
    let gemeldetesLand = null;
    function landMelden() { if (hover !== gemeldetesLand) { gemeldetesLand = hover; melden('beiLand', hover); } }
    let wartet = false;
    canvas.addEventListener('pointermove', e => {
      if (e.buttons || wartet || (!tipp && !o.beiLand)) return;
      if (druck && !ebene.laender) { if (hover) tippVerstecken(); return; }
      wartet = true;
      requestAnimationFrame(() => {
        wartet = false;
        const r = canvas.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        const lonlat = Math.hypot(x - seite / 2, y - seite / 2) < (druck ? R : R * k) ? projektion.invert([x, y]) : null;
        const treffer = lonlat ? daten().laender.find(f => (!druck || f.bereist) && d3.geoContains(f, lonlat)) || null : null;
        if (treffer !== hover) { hover = treffer; zeichnen(); landMelden(); }
        if (!tipp) return;
        if (!treffer) { tipp.hidden = true; return; }
        tipp.textContent = o.tippText ? o.tippText(treffer, treffer.bereist && ebene.laender) : treffer.name + (treffer.bereist && ebene.laender ? ' · bereist' : '');
        tipp.hidden = false;
        tipp.classList.toggle('links', x + tipp.offsetWidth + 24 > seite);
        tipp.style.left = x + 'px';
        tipp.style.top = y + 'px';
      });
    });
    canvas.addEventListener('pointerleave', tippVerstecken);

    // ---------- Kamerafahrt ----------
    function flugBeenden(grund = 'abgebrochen') { if (flug) { flug.stop(); flug = null; } if (flugEnde) { const f = flugEnde; flugEnde = null; f(grund); } }
    function fliegen(ziel, zielK, extra) {
      flugBeenden();
      pendelnStoppen();
      tippVerstecken();
      if (zielK > 1.6) feinLaden();
      const start = mitte.slice(), startK = k;
      const weg = d3.geoInterpolate(start, ziel);
      const abstand = d3.geoDistance(start, ziel);
      const dauer = ruhig ? 0 : (extra && extra.dauer) || o.dauer || Math.min(2400, 900 + abstand * 700);
      const delle = Math.min(Math.log(Math.max(startK, zielK)), abstand * 1.1);
      const jeBild = extra && extra.jeBild;
      if (!dauer) { mitte = ziel.slice(); k = zielK; if (jeBild) jeBild(1); zoomStandSetzen(); zeichnen(); return Promise.resolve('fertig'); }
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
    function landAnfliegen(iso) {
      const f = (fein || grob).laender.find(x => x.iso === iso);
      auswahl = f || null;
      if (ansichten[iso]) return fliegen(ansichten[iso].slice(0, 2), ansichten[iso][2]);
      if (!f) return winzig[iso] ? fliegen(winzig[iso], 20) : Promise.resolve('fertig');
      const radius = Math.sqrt(d3.geoArea(f) / Math.PI);
      return fliegen(d3.geoCentroid(f), Math.max(1, Math.min(22, .5 / Math.sin(Math.min(radius * 1.4, 1.4)))));
    }

    // ---------- Chronik: Station für Station, die Route wächst mit ----------
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
      const pause = einst.pause !== undefined ? einst.pause : (ruhig ? 2200 : 1500);
      const zoomZiel = typeof einst.zoom === 'function' ? einst.zoom : () => einst.zoom || 2.6;
      route = { punkte: stationen.map(s => [s.lon, s.lat]), neben: stationen.map(s => !!s.neben), fortschritt: 0 };
      sichtbarBis = 0;
      aktiverOrt = stationen[0].name;
      if (typeof einst.beiStation === 'function') einst.beiStation(stationen[0], 0);
      let ergebnis;
      if (einst.sofort) {
        flugBeenden(); pendelnStoppen();
        mitte = [stationen[0].lon, stationen[0].lat]; k = zoomZiel(stationen[0], 0);
        if (k > 1.6) feinLaden();
        zoomStandSetzen(); zeichnen(); ergebnis = 'fertig';
      } else ergebnis = await fliegen([stationen[0].lon, stationen[0].lat], zoomZiel(stationen[0], 0), einst.dauer ? { dauer: einst.dauer } : undefined);
      for (let i = 1; i < stationen.length; i++) {
        if (chronikNummer !== nummer || ergebnis === 'abgebrochen') return 'abgebrochen';
        await new Promise(r => setTimeout(r, pause));
        if (chronikNummer !== nummer) return 'abgebrochen';
        const s = stationen[i];
        ergebnis = await fliegen([s.lon, s.lat], zoomZiel(s, i), {
          dauer: einst.dauer,
          jeBild: e => {
            route.fortschritt = i - 1 + e;
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
      // Zum Schluss die ganze Route zeigen
      const ziel = einst.schluss || d3.geoCentroid({ type: 'MultiPoint', coordinates: route.punkte });
      await fliegen(ziel.mitte || ziel, (ziel.k) || 1);
      if (chronikNummer !== nummer) return 'abgebrochen';
      chronikNummer = 0;
      sichtbarBis = null;
      aktiverOrt = null;
      zeichnen();
      melden('beiChronikEnde', 'fertig');
      return 'fertig';
    }

    function routeSetzen(stationen) {
      const punkte = stationen.map(s => [s.lon, s.lat]);
      const gleich = route && route.punkte.length === punkte.length && route.punkte.every((p, j) => p[0] === punkte[j][0] && p[1] === punkte[j][1]);
      if (!gleich) route = { punkte, neben: stationen.map(s => !!s.neben), fortschritt: 0 };
    }
    function chronikSchritt(stationen, i, einst = {}) {
      chronikStoppen('abgebrochen');
      routeSetzen(stationen);
      const s = stationen[i], von = route.fortschritt;
      aktiverOrt = s.name;
      return fliegen([s.lon, s.lat], einst.zoom || Math.max(k, 2.6), { dauer: einst.dauer, jeBild: e => { route.fortschritt = von + (i - von) * e; } });
    }
    function routeZeigen(stationen) {
      chronikStoppen('abgebrochen');
      routeSetzen(stationen);
      route.fortschritt = stationen.length - 1;
      zeichnen();
    }

    // ---------- Leerlauf: sanftes Pendeln, pausiert außer Sicht ----------
    let leerlauf = null;
    function pendelnStoppen() { if (leerlauf) { leerlauf.stop(); leerlauf = null; } }
    if (o.pendeln !== false && !ruhig) {
      let imBild = true;
      if ('IntersectionObserver' in window) new IntersectionObserver(e => { imBild = e[0].isIntersecting; }).observe(canvas);
      let basis = null;
      leerlauf = d3.timer(t => {
        if (flug || k >= 1.2 || !imBild || document.hidden) return;
        if (basis === null) basis = mitte[0];
        mitte[0] = basis + Math.sin(t / 5200) * 14;
        tippVerstecken(); bewegung(); zeichnen();
      });
      canvas.addEventListener('pointerdown', pendelnStoppen, { passive: true });
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
        route = null; aktiverOrt = null; auswahl = null;
        // behalten: Blick und Zoom bleiben, wie sie sind (nur „druck“ nutzt das, wenn eine Ebene mitten im Eingriff wechselt)
        if (einst.behalten) { zeichnen(); return Promise.resolve('fertig'); }
        if (einst.fliegen === false) { mitte = ebene.blick.mitte.slice(); k = ebene.blick.k; zoomStandSetzen(); zeichnen(); return Promise.resolve('fertig'); }
        return fliegen(ebene.blick.mitte, ebene.blick.k);
      },
      fliegen: (ziel, zielK) => { chronikStoppen('abgebrochen'); return fliegen(ziel, zielK); },
      ortAnfliegen(ort, zielK) { chronikStoppen('abgebrochen'); aktiverOrt = ort.name; return fliegen([ort.lon, ort.lat], zielK || Math.max(k, 7)); },
      mehrereAnfliegen(orte, zielK) {
        chronikStoppen('abgebrochen');
        aktiverOrt = orte.map(x => x.name).join(' · ');
        return fliegen(d3.geoCentroid({ type: 'MultiPoint', coordinates: orte.map(x => [x.lon, x.lat]) }), zielK || 8);
      },
      landAnfliegen(iso) { chronikStoppen('abgebrochen'); return landAnfliegen(iso); },
      aktiv(name) { aktiverOrt = name; zeichnen(); },
      auswahl(iso) { auswahl = iso ? (fein || grob).laender.find(x => x.iso === iso) || null : null; zeichnen(); },
      zoomen(faktor) { chronikStoppen('abgebrochen'); return fliegen(mitte.slice(), Math.max(KMIN, Math.min(24, k * faktor))); },
      massstab: () => massstab(),
      // Ohne Flug an einen Blick springen (etwa, wenn die Karte nicht zu sehen ist)
      springen(ziel, zielK) { chronikStoppen('abgebrochen'); flugBeenden(); pendelnStoppen(); mitte = ziel.slice(); k = Math.max(KMIN, zielK); if (k > 1.6) feinLaden(); zoomStandSetzen(); zeichnen(); },
      // Land an einem Punkt der Leinwand (Leinwandpunkte); in „druck“ nur bereiste Länder
      landBei(x, y) {
        const lonlat = Math.hypot(x - seite / 2, y - seite / 2) < (druck ? R : R * k) ? projektion.invert([x, y]) : null;
        return lonlat ? daten().laender.find(f => (!druck || f.bereist) && d3.geoContains(f, lonlat)) || null : null;
      },
      ganz() { chronikStoppen('abgebrochen'); auswahl = null; return fliegen(ebene.blick.mitte, 1); },
      chronik, chronikSchritt, routeZeigen, chronikStoppen: () => chronikStoppen('abgebrochen'),
      pendelnStoppen, zeichnen,
      k: () => k,
      land: iso => (fein || grob).laender.find(x => x.iso === iso) || null
    };
  }

  window.Globus = { erstellen };
})();
