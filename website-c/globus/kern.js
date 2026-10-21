/* Globus-Kern von Version C: orthografischer Globus auf einer Leinwand.
 *
 * Grundlage ist der Kern von Version A (die Kugel, ihre Farben, Grenzen und Namensblöcke). Aus Version B kommen das Zoomen
 * (grob in Bewegung, fein in Ruhe), die Namen auch in Bewegung, das Gradnetz, das mit dem Zoom dichter wird, das Drehen mit
 * einem Finger, die feste Flugdauer, der Weg mit Abstechern (routeBauen) und die Flüsse. Nicht aus B: Blauplatte, Rahmen,
 * Ring, Schraffur, Gewässernamen. Regeln: docs/gestaltung-website-c.md, Abschnitte 09, 10, 14b, 4.1 und 8.4.
 *
 * Braucht d3 7.9 und topojson-client 3.1 (lib/) sowie daten/welt-110m.js (window.WELT_110M).
 * Optional: daten/welt-50m.js (wird nachgeladen), daten/uk-landesteile.js, daten/laender-de.js, daten/fluesse.js.
 *
 *   const g = Globus.erstellen({
 *     canvas, flaeche,            // Leinwand und das Element, das beim Zoomen den runden Rand bekommt (Klasse ist-gezoomt)
 *     tipp, hinweis,              // Elemente für den Namen des Lands unter der Maus und den Bedienhinweis
 *     bereist: ['DE', ...],       // ISO-Codes, Landesteile als 'GB-ENG' usw., Westjordanland als 'PS-WB'
 *     winzig: { MC: [lon, lat] }, // Kleinstaaten ohne Fläche im groben Maßstab
 *     ansichten: { FR: [lon, lat, k] },
 *     farben: { papier, land, reise, grenze, kueste, gradnetz, tinte },
 *     schrift: { ort, ortAktiv }, // Kartenschrift, etwa '15px "Vollkorn"' und '600 15px "Vollkorn"'
 *     daten50: 'daten/welt-50m.js',
 *     dauer: 1000,                // feste Dauer jedes Flugs in ms (bei reduzierter Bewegung 0)
 *     namenInRuhe: true,          // false: in Ruhe setzt jemand anders die Namen (FSeite, Namensblöcke); in Bewegung immer der Kern
 *     beimZeichnen: info => {},   // nach jedem Bild: { bewegt, k }
 *     beiOrtKlick: (ort, i) => {},// Klick auf einen Punkt (Trefferradius 12 px), i ist der Index in ebene.orte
 *     ortKlickbar: () => true,    // ob ein Punkt gerade wählbar ist (dann zeigt die Maus eine Hand)
 *     rechterRand: () => px,      // rechte Kante des sichtbaren Teils der Leinwand (der Fensterrand schneidet den Globus an)
 *     tippText: land => 'Name',
 *     beimAnsichtWechsel: teile => {}, beimEingriff: () => {}, beiChronikEnde: grund => {}
 *   });
 *   g.ebene({ orte: [{ name, lat, lon, rang, kurz, neben }], laender, grenzen, fluesse, blick: { mitte: [lon, lat], k } }, { fliegen, behalten })
 *        neben: true ist ein längerer Aufenthalt (offener Kreis); auf dem Weg ein Abstecher vom Wohnort davor, hin und zurück
 *   g.fliegen([lon, lat], k, { dauer }) -> Promise 'fertig' | 'abgebrochen';  g.springen([lon, lat], k)
 *   g.ortAnfliegen(ort, k), g.mehrereAnfliegen(orte, k), g.landAnfliegen(iso), g.aktiv('Name' | null), g.auswahl(iso | null)
 *   g.zoomen(faktor), g.ganz(), g.k(), g.mitte(), g.land(iso), g.ortBei(x, y), g.zeichnen(), g.projektion, g.erstesBild
 *   g.chronik(stationen, takt) -> Promise 'fertig' | 'abgebrochen' | 'angehalten'   (Takt siehe chronik)
 *   g.chronikAnhalten() -> { bei, unterwegs } | null; g.chronikStoppen(); g.chronikLaeuft()
 *   g.chronikSchritt(stationen, i, { zoom, dauer }) // eine Station von Hand, der Weg wächst oder schrumpft bis i
 *   g.routeZeigen(stationen, bis)                    // Weg ohne Flug, ganz oder bis zur Station bis (-1: noch kein Weg)
 *   g.nurOrte(namen | null)                          // nur diese Orte zeigen (etwa [] vor einem Einspieler), null: alle
 */
(function () {
  const RAD = Math.PI / 180;

  function erstellen(o) {
    const { canvas, flaeche, tipp, hinweis } = o;
    const F = Object.assign({
      papier: '#FFFEFC', land: '#F3F3F2', reise: '#C4C7CC', grenze: '#B0B3B8', kueste: '#9C9DA1', gradnetz: '#ECEDEE', tinte: '#1D1E21'
    }, o.farben || {});
    const schrift = Object.assign({ ort: '15px serif', ortAktiv: '600 15px serif' }, o.schrift || {});
    const bereist = new Set(o.bereist || []);
    const winzig = o.winzig || {};
    const ansichten = o.ansichten || {};
    const namenInRuhe = o.namenInRuhe !== false;
    const KMIN = .9, KMAX = 24;
    const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const melden = (name, ...werte) => { if (typeof o[name] === 'function') o[name](...werte); };

    const ctx = canvas.getContext('2d');
    const DE = window.LAENDER_DE || { nach_id: {}, nach_name: {} };
    const projektion = d3.geoOrthographic().clipAngle(90).precision(.4);
    const pfad = d3.geoPath(projektion, ctx);

    let ebene = { orte: [], laender: false, blick: { mitte: [20, 25], k: 1 } };
    let mitte = [20, 25];
    let k = 1, seite = 600, R = 298, dpr = 1;
    let hover = null, auswahl = null, aktiverOrt = null;
    let flug = null, flugEnde = null;
    let route = null;              // { punkte: [[lon, lat]], neben: [bool], an: [Index je Station], fortschritt: Abschnitte als Kommazahl }
    let gezeigt = null;            // während einer Chronik: nur die Orte mit diesen Namen zeigen (Set), sonst alle (null)
    let chronikNummer = 0, chronikZaehler = 0, chronikStand = null, haltUhr = null, haltEnde = null;

    // ---------- Daten ----------
    const UK = window.UK_LANDESTEILE;
    function datensatz(topo) {
      const isoVon = x => (DE.nach_id[x.id] || DE.nach_name[(x.properties || {}).name] || [''])[0];
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
      /* Land und bereiste Länder als je eine Fläche: ein Pfad statt 180 einzelner (in Bewegung rund 8 ms weniger je Bild).
         Die bereisten Länder verschmolzen, wo sie aneinandergrenzen; die Landesteile des Vereinigten Königreichs und das
         Westjordanland kommen als eigene Flächen dazu */
      const polygone = fs => fs.flatMap(f => f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : []);
      const bereistListe = laender.filter(f => f.bereist);
      const geteilt = iso => (UK && iso === 'GB') || iso === 'PS';
      const verschmolzen = topojson.merge(topo, topo.objects.countries.geometries.filter(x => { const iso = isoVon(x); return bereist.has(iso) && !geteilt(iso); }));
      const bereistFlaeche = { type: 'MultiPolygon', coordinates: verschmolzen.coordinates.concat(polygone(bereistListe.filter(f => /^(GB-|PS-)/.test(f.iso)))) };
      return {
        laender,
        land: topojson.merge(topo, topo.objects.countries.geometries),
        bereistFlaeche,
        grenzen: UK ? { type: 'MultiLineString', coordinates: innen.coordinates.concat(UK.innen.coordinates) } : innen,
        kueste: topojson.mesh(topo, topo.objects.countries, (a, b) => a === b),
        bereist: { type: 'FeatureCollection', features: bereistListe },
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
    const FLUESSE = (window.FLUESSE || []).map(f => ({ type: 'MultiLineString', coordinates: f.linien }));

    /* Datenregel aus B: in Bewegung und bis 1,8-fach grob, gezoomt in Ruhe fein. In A galt fein schon in Bewegung, sobald der
       Zoom über 1,8 lag; ein Bild dauerte dann rund 90 ms. Ruhe heißt: 220 ms ohne Bewegung */
    let bewegt = false, ruheTimer = null;
    function bewegung() {
      bewegt = true;
      clearTimeout(ruheTimer);
      ruheTimer = setTimeout(() => { bewegt = false; zeichnen(); ansichtMelden(); }, 220);
    }
    const daten = () => fein && k > 1.8 && !bewegt ? fein : grob;

    /* Gradnetz wie in B: dichter, je weiter man hineinzoomt. Gezoomt nur der sichtbare Ausschnitt (mit Rand): Meridiane als zwei
       Punkte (Großkreise), Breitenkreise alle 2° */
    const netzSchritt = () => k < 1.6 ? 30 : k < 4 ? 10 : k < 9 ? 5 : 2;
    const netze = {}, ausschnitte = new Map();
    const netzGanz = s => netze[s] || (netze[s] = d3.geoGraticule().step([s, s]).extentMajor([[-180, -90 + 1e-6], [180, 90 - 1e-6]])());
    function netz() {
      const s = netzSchritt();
      if (k < 1.6) return netzGanz(s);
      const th = Math.asin(Math.min(1, 1 / k)) / RAD * 1.6 + s;
      const lat0 = Math.max(-80, Math.floor((mitte[1] - th) / s) * s), lat1 = Math.min(80, Math.ceil((mitte[1] + th) / s) * s);
      const halb = th / Math.max(.05, Math.cos(Math.min(85, Math.max(Math.abs(lat0), Math.abs(lat1))) * RAD));
      const lon0 = halb >= 180 ? -180 : Math.floor((mitte[0] - halb) / s) * s, lon1 = halb >= 180 ? 180 : Math.ceil((mitte[0] + halb) / s) * s;
      const schluessel = [s, lat0, lat1, lon0, lon1].join();
      if (ausschnitte.has(schluessel)) return ausschnitte.get(schluessel);
      const linien = [];
      for (let lon = lon0; lon <= lon1 + 1e-9; lon += s) linien.push([[lon, lat0], [lon, (lat0 + lat1) / 2], [lon, lat1]]);
      for (let lat = Math.ceil(lat0 / s) * s; lat <= lat1 + 1e-9; lat += s) {
        const l = [];
        for (let lon = lon0; lon <= lon1 + 1e-9; lon += 2) l.push([lon, lat]);
        if (l[l.length - 1][0] < lon1) l.push([lon1, lat]);
        linien.push(l);
      }
      const g = { type: 'MultiLineString', coordinates: linien };
      if (ausschnitte.size > 12) ausschnitte.clear();
      ausschnitte.set(schluessel, g);
      return g;
    }

    // ---------- Zeichnen ----------
    function messen() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      seite = canvas.clientWidth || 600;
      canvas.width = Math.round(seite * dpr);
      canvas.height = Math.round(seite * dpr);
      R = seite / 2 - 2;
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
    // Die Orte, die jetzt gezeigt werden, mit ihrer Lage auf der Leinwand
    // Ein Ort mit abK (etwa ein weiterer Schauplatz) erscheint erst ab dieser Vergrößerung, oder wenn er gewählt ist
    function sichtbareOrte() {
      return ebene.orte.map((ort, i) => ({ ort, i })).filter(({ ort }) => gezeigt === null || gezeigt.has(ort.name))
        .filter(({ ort }) => !ort.abK || k > ort.abK - .01 || istAktiv(ort.name))
        .filter(({ ort }) => sichtbar([ort.lon, ort.lat])).map(x => Object.assign(x, { p: projektion([x.ort.lon, x.ort.lat]) }));
    }
    const istAktiv = name => !!aktiverOrt && aktiverOrt.split(' · ').includes(name);

    let erstesBild = 0;
    function zeichnen() {
      const c = seite / 2;
      projektion.translate([c, c]).scale(R * k).rotate([-mitte[0], -mitte[1]]).clipExtent([[0, 0], [seite, seite]]);
      const d = daten();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, seite, seite);
      if (flaeche) flaeche.classList.toggle('ist-gezoomt', k > 1.15);

      ctx.beginPath(); pfad({ type: 'Sphere' }); ctx.fillStyle = F.papier; ctx.fill();
      ctx.beginPath(); pfad(netz()); ctx.strokeStyle = F.gradnetz; ctx.lineWidth = .5; ctx.stroke();

      ctx.beginPath(); pfad(d.land); ctx.fillStyle = F.land; ctx.fill();
      if (ebene.laender) { ctx.beginPath(); pfad(d.bereistFlaeche); ctx.fillStyle = F.reise; ctx.fill(); }
      if (ebene.grenzen !== false) { ctx.beginPath(); pfad(d.grenzen); ctx.strokeStyle = F.grenze; ctx.lineWidth = k > 3 ? .7 : .45; ctx.stroke(); }
      ctx.beginPath(); pfad(d.kueste); ctx.strokeStyle = F.kueste; ctx.lineWidth = .6; ctx.stroke();
      if (ebene.fluesse && FLUESSE.length) {
        ctx.lineJoin = 'round'; ctx.strokeStyle = F.kueste; ctx.lineWidth = .8;
        FLUESSE.forEach(f => { ctx.beginPath(); pfad(f); ctx.stroke(); });
      }
      if (ebene.laender) {
        const gewaehlt = auswahl ? d.laender.find(x => x.iso === auswahl.iso) || auswahl : null;
        [[gewaehlt, 1.2], [hover !== gewaehlt ? hover : null, 1]].forEach(([f, w]) => {
          if (!f || !f.geometry) return;
          ctx.beginPath(); pfad(f); ctx.strokeStyle = F.tinte; ctx.lineWidth = w; ctx.stroke();
        });
        // Kleinstaaten ohne Fläche im Maßstab: eine kleine Scheibe in der Farbe der bereisten Länder, ohne Kontur (wie ein Land,
        // nicht wie ein Ortszeichen in Tinte); gezeigt oder gewählt mit Kontur
        Object.entries(winzig).forEach(([iso, pos]) => {
          if (!bereist.has(iso) || d.isos.has(iso) || !sichtbar(pos)) return;
          const p = projektion(pos), an = (auswahl && auswahl.iso === iso) || (hover && hover.iso === iso);
          ctx.beginPath(); ctx.arc(p[0], p[1], 3.2, 0, Math.PI * 2);
          ctx.fillStyle = F.reise; ctx.fill();
          if (an) { ctx.lineWidth = 1.2; ctx.strokeStyle = F.tinte; ctx.stroke(); }
        });
      }
      ctx.beginPath(); pfad({ type: 'Sphere' }); ctx.strokeStyle = F.tinte; ctx.lineWidth = 1; ctx.stroke();

      // Weg: durchgezogen zwischen Wohnorten, zu längeren Aufenthalten gestrichelt (hin und zurück); der jetzige Abschnitt wächst
      if (route && route.punkte.length > 1) {
        ctx.lineWidth = 1.3; ctx.strokeStyle = F.tinte; ctx.lineCap = 'round';
        const ganz = Math.floor(route.fortschritt), rest = route.fortschritt - ganz;
        for (let i = 0; i < route.punkte.length - 1 && i <= ganz; i++) {
          const bis = i < ganz ? 1 : rest;
          if (bis <= 0 || (route.rueck && route.rueck[i + 1])) continue;
          ctx.setLineDash(route.neben[i] || route.neben[i + 1] ? [2.5, 3.5] : []);
          linie(bogen(route.punkte[i], route.punkte[i + 1], bis));
        }
        ctx.setLineDash([]);
        ctx.lineCap = 'butt';
      }

      // Ortszeichen: gefüllter Punkt, für längere Aufenthalte ein offener Kreis; um den gewählten Ort ein Ring
      const orte = sichtbareOrte();
      orte.forEach(({ ort, p }) => {
        ctx.beginPath();
        if (ort.neben) { ctx.arc(p[0], p[1], 2.3, 0, Math.PI * 2); ctx.fillStyle = F.papier; ctx.fill(); ctx.lineWidth = 1.1; ctx.strokeStyle = F.tinte; ctx.stroke(); }
        else { ctx.arc(p[0], p[1], 2.6, 0, Math.PI * 2); ctx.fillStyle = F.tinte; ctx.fill(); }
      });
      orte.forEach(({ ort, p }) => {
        if (!istAktiv(ort.name)) return;
        ctx.beginPath(); ctx.arc(p[0], p[1], 6.5, 0, Math.PI * 2); ctx.lineWidth = 1; ctx.strokeStyle = F.tinte; ctx.stroke();
      });
      if (namenInRuhe || bewegt) namenSetzen(orte);

      if (!erstesBild) erstesBild = performance.now();
      if (!bewegt) ansichtMelden();
      melden('beimZeichnen', { bewegt, k });
    }

    /* Ortsnamen, aufrecht, mit 4 px Freistellung in Papier. Orte, deren Zeichen fast aufeinander liegen, teilen sich eine
       Beschriftung (die Namen untereinander). Lage in der Reihenfolge rechts oben, rechts unten, links oben, links unten, rechts,
       links (wie B). Der gewählte Ort zuerst und halbfett; kein Name überdeckt einen anderen oder ein Ortszeichen, keiner
       ragt über den Kugelrand */
    function namenSetzen(orte) {
      const c = seite / 2, rand = Math.min(R * k, seite / 2) - 3;
      const rechts = typeof o.rechterRand === 'function' ? o.rechterRand() : seite;
      const belegt = orte.map(({ p }) => [p[0] - 4, p[1] - 4, p[0] + 4, p[1] + 4]);
      const imRund = b => b[2] <= rechts && [[b[0], b[1]], [b[2], b[1]], [b[0], b[3]], [b[2], b[3]]].every(([x, y]) => Math.hypot(x - c, y - c) < rand);
      const frei = b => !belegt.some(x => b[0] < x[2] + 1 && b[2] + 1 > x[0] && b[1] < x[3] && b[3] > x[1]);
      const gruppen = [];
      orte.forEach(x => {
        const nah = gruppen.find(g => Math.hypot(g.p[0] - x.p[0], g.p[1] - x.p[1]) < 7);
        const teil = { text: x.ort.beschriftung || x.ort.kurz || x.ort.name, aktiv: istAktiv(x.ort.name), i: x.i, rang: x.ort.rang || 1 };
        if (nah) { nah.teile.push(teil); nah.punkte.push(x.p); } else gruppen.push({ p: x.p, punkte: [x.p], teile: [teil] });
      });
      gruppen.forEach(g => { g.teile.sort((a, b) => a.i - b.i); g.aktiv = g.teile.some(t => t.aktiv); g.rang = Math.min(...g.teile.map(t => t.rang)); g.i = g.teile[0].i; });
      ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round'; ctx.textAlign = 'left';
      const teilBreite = t => { ctx.font = t.aktiv ? schrift.ortAktiv : schrift.ort; return ctx.measureText(t.text).width; };
      gruppen.sort((a, b) => b.aktiv - a.aktiv || a.rang - b.rang || a.i - b.i).forEach(g => {
        const breiten = g.teile.map(teilBreite);
        const n = g.teile.length, h = 11, zeile = 17, w = Math.max(...breiten);
        const xs = g.punkte.map(q => q[0]), ys = g.punkte.map(q => q[1]);
        const x0g = Math.min(...xs), x1g = Math.max(...xs), y0g = Math.min(...ys), y1g = Math.max(...ys), ym = (y0g + y1g) / 2;
        const oben = y0g - 5 - (n - 1) * zeile, unten = y1g + 5 + h, mittig = ym - (h + (n - 1) * zeile) / 2 + h;
        const lagen = [[x1g + 7, oben, 'l'], [x1g + 7, unten, 'l'], [x0g - 7, oben, 'r'], [x0g - 7, unten, 'r'], [x1g + 8, mittig, 'l'], [x0g - 8, mittig, 'r']];
        for (const [lx, ly, a] of lagen) {
          const x0 = a === 'l' ? lx : lx - w;
          const box = [x0 - 2, ly - h - 2, x0 + w + 2, ly + (n - 1) * zeile + 4];
          if (!imRund(box) || !frei(box)) continue;
          belegt.push(box);
          g.teile.forEach((t, j) => {
            const x = a === 'l' ? x0 : x0 + w - breiten[j], y = ly + j * zeile;
            ctx.font = t.aktiv ? schrift.ortAktiv : schrift.ort;
            ctx.lineWidth = 4; ctx.strokeStyle = F.papier; ctx.strokeText(t.text, x, y);
            ctx.fillStyle = F.tinte; ctx.fillText(t.text, x, y);
          });
          break;
        }
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
    function eingriff() { flugBeenden(); chronikStoppen('abgebrochen'); auswahl = null; melden('beimEingriff'); }
    const zoom = d3.zoom().scaleExtent([KMIN, KMAX]).filter(e => {
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

    // Touch wie in B: zwei Finger drehen und zoomen; ein Finger waagrecht dreht, senkrecht scrollt der Browser die Seite
    // (touch-action: pan-y im Stil)
    let finger = null, wisch = null, zeiger = null;
    const fingerLage = t => {
      const r = canvas.getBoundingClientRect();
      return { x: (t[0].clientX + t[1].clientX) / 2 - r.left, y: (t[0].clientY + t[1].clientY) / 2 - r.top, abstand: Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY) };
    };
    canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 2) { finger = fingerLage(e.touches); wisch = null; eingriff(); }
      else if (e.touches.length === 1) wisch = { x: e.touches[0].clientX, y: e.touches[0].clientY, gezeigt: false };
    }, { passive: true });
    canvas.addEventListener('touchmove', e => {
      if (e.touches.length === 1 && !finger) {
        // Ein Finger senkrecht scrollt die Seite: dann einmal je Wischen der Hinweis
        if (!wisch || wisch.gezeigt || (zeiger && zeiger.an)) return;
        const dx = Math.abs(e.touches[0].clientX - wisch.x), dy = Math.abs(e.touches[0].clientY - wisch.y);
        if (dy > 8 && dy > dx) { wisch.gezeigt = true; hinweisZeigen('Zum Drehen waagrecht wischen, zum Zoomen zwei Finger'); }
        return;
      }
      if (e.touches.length !== 2 || !finger) return;
      e.preventDefault();
      const jetzt = fingerLage(e.touches);
      const tempo = .25 / k;
      mitte[0] -= (jetzt.x - finger.x) * tempo;
      mitte[1] = Math.max(-85, Math.min(85, mitte[1] + (jetzt.y - finger.y) * tempo));
      k = Math.max(KMIN, Math.min(KMAX, k * jetzt.abstand / finger.abstand));
      if (k > 1.6) feinLaden();
      finger = jetzt;
      zoomStandSetzen(); tippVerstecken(); bewegung(); zeichnen();
    }, { passive: false });
    canvas.addEventListener('touchend', e => { if (e.touches.length < 2) finger = null; });
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

    canvas.addEventListener('keydown', e => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const schritt = 10 / k;
      const tasten = {
        ArrowLeft: () => { mitte[0] -= schritt; }, ArrowRight: () => { mitte[0] += schritt; },
        ArrowUp: () => { mitte[1] = Math.min(85, mitte[1] + schritt); }, ArrowDown: () => { mitte[1] = Math.max(-85, mitte[1] - schritt); },
        '+': () => { k = Math.min(KMAX, k * 1.4); feinLaden(); }, '=': () => { k = Math.min(KMAX, k * 1.4); feinLaden(); }, '-': () => { k = Math.max(KMIN, k / 1.4); }
      };
      if (!tasten[e.key]) return;
      e.preventDefault();
      eingriff();
      tippVerstecken();
      tasten[e.key]();
      zoomStandSetzen(); bewegung(); zeichnen();
    });

    // Ein Punkt unter dem Zeiger: der nächste gezeigte Ort im Umkreis von 12 px (Index in ebene.orte) oder null
    function ortBei(x, y) {
      let best = null;
      sichtbareOrte().forEach(({ ort, i, p }) => {
        const d = Math.hypot(p[0] - x, p[1] - y);
        if (d <= 12 && (!best || d < best.d)) best = { d, ort, i };
      });
      return best;
    }
    if (typeof o.beiOrtKlick === 'function') {
      canvas.addEventListener('click', e => {
        const r = canvas.getBoundingClientRect();
        const t = ortBei(e.clientX - r.left, e.clientY - r.top);
        if (t) o.beiOrtKlick(t.ort, t.i);
      });
    }

    // Das Land unter der Maus, nur auf Ebenen mit Ländern: Kontur in Tinte und sein Name als Zettel
    function tippVerstecken() { if (tipp) tipp.hidden = true; if (hover) { hover = null; zeichnen(); } }
    function landBei(x, y) {
      if (Math.hypot(x - seite / 2, y - seite / 2) >= R * k) return null;
      const ll = projektion.invert([x, y]);
      return ll ? daten().laender.find(f => d3.geoContains(f, ll)) || null : null;
    }
    let wartet = false;
    canvas.addEventListener('pointermove', e => {
      if (e.buttons || wartet || e.pointerType === 'touch') return;
      wartet = true;
      requestAnimationFrame(() => {
        wartet = false;
        const r = canvas.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        canvas.style.cursor = o.beiOrtKlick && (typeof o.ortKlickbar !== 'function' || o.ortKlickbar()) && ortBei(x, y) ? 'pointer' : '';
        if (!ebene.laender || !tipp) { if (hover) tippVerstecken(); return; }
        const treffer = landBei(x, y);
        if (treffer !== hover) { hover = treffer; zeichnen(); }
        if (!treffer) { tipp.hidden = true; return; }
        tipp.textContent = o.tippText ? o.tippText(treffer, treffer.bereist) : treffer.name;
        tipp.hidden = false;
        tipp.classList.toggle('links', x + tipp.offsetWidth + 24 > seite);
        tipp.style.left = x + 'px';
        tipp.style.top = y + 'px';
      });
    });
    canvas.addEventListener('pointerleave', tippVerstecken);

    // ---------- Flug ----------
    function flugBeenden(grund = 'abgebrochen') { if (flug) { flug.stop(); flug = null; } if (flugEnde) { const f = flugEnde; flugEnde = null; f(grund); } }
    function fliegen(ziel, zielK, extra) {
      flugBeenden();
      tippVerstecken();
      zielK = Math.max(KMIN, Math.min(KMAX, zielK));
      if (zielK > 1.6) feinLaden();
      const start = mitte.slice(), startK = k;
      const weg = d3.geoInterpolate(start, ziel);
      const abstand = d3.geoDistance(start, ziel);
      const dauer = ruhig ? 0 : (extra && extra.dauer != null ? extra.dauer : o.dauer || 1000);
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
    function landSuchen(iso) {
      const f = (fein || grob).laender.find(x => x.iso === iso);
      if (f) return f;
      return winzig[iso] ? { iso, name: iso, punkt: winzig[iso] } : null;
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
    // Der Weg einer Reihe von Stationen; ein Nebenort ist ein Abstecher vom Wohnort davor, hin und zurück (aus B)
    // Der Rückweg liegt genau auf dem Hinweg; er wird nicht noch einmal gezeichnet, sonst schlössen sich die Lücken der Striche
    function routeBauen(stationen) {
      const punkte = [], neben = [], an = [], rueck = [];
      let heim = null;
      stationen.forEach(s => {
        const p = [s.lon, s.lat];
        punkte.push(p); neben.push(!!s.neben); an.push(punkte.length - 1); rueck.push(false);
        if (s.neben && heim) { punkte.push(heim); neben.push(false); rueck.push(true); }
        if (!s.neben) heim = p;
      });
      return { punkte, neben, an, rueck, fortschritt: 0 };
    }
    function routeSetzen(stationen) {
      const neu = routeBauen(stationen);
      const gleich = route && route.punkte.length === neu.punkte.length && route.punkte.every((p, j) => p[0] === neu.punkte[j][0] && p[1] === neu.punkte[j][1]);
      if (!gleich) route = neu;
      return route;
    }
    function haltAbbrechen() { clearTimeout(haltUhr); haltUhr = null; if (haltEnde) { const f = haltEnde; haltEnde = null; f(); } }
    const halten = ms => new Promise(r => { haltEnde = r; haltUhr = setTimeout(() => { haltEnde = null; r(); }, Math.max(0, ms)); });
    function chronikStoppen(grund) {
      if (!chronikNummer) return;
      chronikNummer = 0;
      chronikStand = null;
      haltAbbrechen();
      gezeigt = null;
      zeichnen();
      melden('beiChronikEnde', grund || 'abgebrochen');
    }
    /* Anhalten ohne Ende: der Weg bleibt, wie weit er ist, die gezeigten Orte bleiben. Gibt { bei, unterwegs } zurück:
       bei ist die letzte erreichte Station, unterwegs die, zu der der Globus gerade fliegt (oder null) */
    function chronikAnhalten() {
      if (!chronikNummer) return null;
      const stand = chronikStand ? { bei: chronikStand.bei, unterwegs: chronikStand.unterwegs } : null;
      chronikNummer = 0;
      chronikStand = null;
      haltAbbrechen();
      flugBeenden('angehalten');
      zeichnen();
      return stand;
    }
    /* Eine Chronik: der Globus fliegt von Station zu Station, der Weg wächst mit. Erst wenn der Flug zu Ende ist, erscheinen Punkt
       und Name und kommt beiStation (die Linie zuerst, dann die Schrift; vorher bei 55 % des Flugs).
       takt: {
         ab: 0,                  // Start bei dieser Station; ab > 0 setzt eine angehaltene Chronik fort (der Weg wächst vom
                                 // jetzigen Stand aus weiter)
         flug: 1000,             // ms je Flug
         ersterFlug: 1000,       // ms für den Flug zur ersten Station (Vorgabe: flug)
         halt: 600,              // ms Halt an jeder Station, oder (station, i) => ms
         rueckweg: 500,          // ms für den Rückweg eines Abstechers, ohne Halt
         zoom: 2.6,              // Vergrößerung, oder (station, i) => k
         rueckZoom: (station, i) => k,   // Vergrößerung auf dem Rückweg eines Abstechers (Vorgabe: die des Wohnorts)
         schluss: { mitte, k },  // am Ende dorthin (Vorgabe: Mitte aller Punkte, k = 1); null: der Globus bleibt
         orte: 'bis' | 'alle',   // 'bis': nur die Orte der Stationen bis zur jetzigen zeigen (nach Namen); 'alle': alle
         endeAktiv: 'Name',      // der gewählte Ort am Ende (Vorgabe: keiner)
         beiStation(station, i)  // wenn der Globus eine Station erreicht hat
       }
       Ergebnis: 'fertig', 'abgebrochen' (ein Griff an die Kugel, eine neue Ebene) oder 'angehalten' (chronikAnhalten). */
    async function chronik(stationen, takt = {}) {
      if (!stationen || !stationen.length) return 'fertig';
      chronikStoppen('abgebrochen');
      flugBeenden();
      const nummer = chronikNummer = ++chronikZaehler;
      const n = stationen.length, ab = Math.max(0, Math.min(n, takt.ab || 0));
      const fn = (v, d) => typeof v === 'function' ? v : () => (v == null ? d : v);
      const flugMs = takt.flug == null ? (o.dauer || 1000) : takt.flug, rueckMs = takt.rueckweg == null ? 500 : takt.rueckweg;
      const haltMs = fn(takt.halt, 600), zoomZiel = fn(takt.zoom, 2.6);
      const bis = takt.orte !== 'alle';
      if (ab === 0) route = routeBauen(stationen); else routeSetzen(stationen);
      gezeigt = bis ? new Set(stationen.slice(0, ab).map(s => s.name)) : null;
      chronikStand = { bei: ab - 1, unterwegs: null };
      const vorbei = () => chronikNummer !== nummer;
      const ende = () => stilleGruende.get(nummer) || 'abgebrochen';
      let heim = null;
      for (let j = 0; j < ab; j++) if (!stationen[j].neben) heim = j;
      for (let i = ab; i < n; i++) {
        const s = stationen[i], von = route.fortschritt, ziel = route.an[i];
        chronikStand.unterwegs = i;
        await fliegen([s.lon, s.lat], zoomZiel(s, i), {
          dauer: i === 0 && ab === 0 && takt.ersterFlug != null ? takt.ersterFlug : flugMs,
          jeBild: e => { route.fortschritt = von + (ziel - von) * e; }
        });
        if (vorbei()) return ende();
        // Angekommen: Punkt, Name und Tafel wechseln in einem Bild, wenn die Linie am Ziel ist
        route.fortschritt = ziel;
        chronikStand.unterwegs = null;
        chronikStand.bei = i;
        if (gezeigt) gezeigt.add(s.name);
        aktiverOrt = s.name;
        if (typeof takt.beiStation === 'function') takt.beiStation(s, i);
        if (vorbei()) return ende();
        zeichnen();
        await halten(haltMs(s, i));
        if (vorbei()) return ende();
        if (!s.neben) heim = i;
        // Rückweg eines Abstechers zum Wohnort davor, ohne Halt; die Tafel bleibt beim Abstecher
        if (s.neben && heim !== null && route.punkte.length > ziel + 1) {
          const h = stationen[heim];
          const rueckK = typeof takt.rueckZoom === 'function' ? takt.rueckZoom(s, i) : zoomZiel(h, heim);
          await fliegen([h.lon, h.lat], rueckK, { dauer: rueckMs, jeBild: e => { route.fortschritt = ziel + e; } });
          if (vorbei()) return ende();
          route.fortschritt = ziel + 1;
        }
      }
      route.fortschritt = route.punkte.length - 1;
      if (takt.schluss !== null) {
        const sch = takt.schluss || { mitte: d3.geoCentroid({ type: 'MultiPoint', coordinates: route.punkte }), k: 1 };
        aktiverOrt = takt.endeAktiv || null;
        await fliegen(sch.mitte || sch, sch.k || 1, { dauer: flugMs });
        if (vorbei()) return ende();
      }
      chronikNummer = 0;
      chronikStand = null;
      gezeigt = null;
      aktiverOrt = takt.endeAktiv || null;
      zeichnen();
      melden('beiChronikEnde', 'fertig');
      return 'fertig';
    }
    // Warum eine Chronik endete, wenn sie nicht von selbst fertig wurde: angehalten (chronikAnhalten) oder abgebrochen
    const stilleGruende = new Map();
    const anhaltenMitGrund = () => { const nr = chronikNummer; const stand = chronikAnhalten(); if (nr) stilleGruende.set(nr, 'angehalten'); return stand; };

    function chronikSchritt(stationen, i, einst = {}) {
      chronikStoppen('abgebrochen');
      routeSetzen(stationen);
      gezeigt = null;
      const s = stationen[i], von = route.fortschritt, bis = route.an[i];
      aktiverOrt = s.name;
      return fliegen([s.lon, s.lat], einst.zoom || Math.max(k, 2.6), { dauer: einst.dauer, jeBild: e => { route.fortschritt = von + (bis - von) * e; } });
    }
    function routeZeigen(stationen, bisStation) {
      chronikStoppen('abgebrochen');
      routeSetzen(stationen);
      route.fortschritt = bisStation == null ? route.punkte.length - 1 : bisStation < 0 ? 0 : route.an[Math.min(stationen.length - 1, bisStation)];
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
        route = null; aktiverOrt = null; auswahl = null; hover = null; gezeigt = null;
        if (tipp) tipp.hidden = true;
        if (einst.behalten) { zeichnen(); return Promise.resolve('fertig'); }
        if (einst.fliegen === false) { flugBeenden(); mitte = ebene.blick.mitte.slice(); k = Math.max(KMIN, ebene.blick.k); if (k > 1.6) feinLaden(); zoomStandSetzen(); zeichnen(); return Promise.resolve('fertig'); }
        return fliegen(ebene.blick.mitte, ebene.blick.k);
      },
      fliegen: (ziel, zielK, einst) => { chronikStoppen('abgebrochen'); return fliegen(ziel, zielK, einst); },
      springen(ziel, zielK) { chronikStoppen('abgebrochen'); flugBeenden(); mitte = ziel.slice(); k = Math.max(KMIN, Math.min(KMAX, zielK)); if (k > 1.6) feinLaden(); zoomStandSetzen(); zeichnen(); },
      ortAnfliegen(ort, zielK) { chronikStoppen('abgebrochen'); aktiverOrt = ort.name; return fliegen([ort.lon, ort.lat], zielK || Math.max(k, 7)); },
      mehrereAnfliegen(orte, zielK) {
        chronikStoppen('abgebrochen');
        aktiverOrt = orte.map(x => x.name).join(' · ');
        return fliegen(d3.geoCentroid({ type: 'MultiPoint', coordinates: orte.map(x => [x.lon, x.lat]) }), zielK || 8);
      },
      landAnfliegen(iso) { chronikStoppen('abgebrochen'); return landAnfliegen(iso); },
      aktiv(name) { aktiverOrt = name || null; zeichnen(); },
      auswahl(iso) { auswahl = iso ? landSuchen(iso) : null; zeichnen(); },
      zoomen(faktor) { chronikStoppen('abgebrochen'); return fliegen(mitte.slice(), k * faktor); },
      ganz() { chronikStoppen('abgebrochen'); auswahl = null; return fliegen(ebene.blick.mitte, 1); },
      chronik, chronikSchritt, routeZeigen,
      chronikAnhalten: anhaltenMitGrund,
      chronikStoppen: () => chronikStoppen('abgebrochen'),
      chronikLaeuft: () => !!chronikNummer,
      nurOrte(namen) { gezeigt = namen ? new Set(namen) : null; zeichnen(); },
      // Welche Orte gerade stehen (eine Kopie; null heißt alle) und welcher gewählt ist: die Namen in Ruhe folgen dem Kern
      gezeigt: () => (gezeigt ? new Set(gezeigt) : null),
      aktiverOrt: () => aktiverOrt,
      ortBei: (x, y) => ortBei(x, y),
      zeichnen,
      projektion,
      get erstesBild() { return erstesBild; },
      bewegt: () => bewegt,
      k: () => k,
      mitte: () => mitte.slice(),
      land: iso => landSuchen(iso)
    };
  }

  window.Globus = { erstellen };
})();
