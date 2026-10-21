/* Globus-Kern von Version C: orthografischer Globus auf einer Leinwand.
 *
 * Grundlage ist der Kern von Version A (die Kugel, ihre Farben, Grenzen und Namensblöcke). Aus Version B kommen das Zoomen
 * (grob in Bewegung, fein in Ruhe), die Namen auch in Bewegung, das Gradnetz, das mit dem Zoom dichter wird, das Drehen mit
 * einem Finger, die feste Flugdauer, der Weg mit Abstechern (routeBauen) und die Flüsse. Nicht aus B: Blauplatte, Rahmen,
 * Ring, Schraffur, Gewässernamen. Regeln: docs/gestaltung-website-c.md, Abschnitte 09, 10, 14b, 4.1 und 8.4.
 * Seit Runde 4 stehen gezoomt die feinen Linien auch in Bewegung, und die feine Fläche blendet ein und aus (siehe bewegung()).
 * Ein Ablauf fliegt sanft an und aus, so lange, wie sein Takt es nach der Entfernung sagt (docs/website-c.md, Runde 4).
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
 *     namenInRuhe: true,          // false: in Ruhe setzt jemand anders die Namen (FSeite, Namensblöcke)
 *     namenInBewegung: true,      // false: auch in Bewegung (FSeite seit Runde 4: dieselben Namen in Ruhe und Bewegung)
 *     beimZeichnen: info => {},   // nach jedem Bild: { bewegt, k, fein, linien } (fein, linien: Anteil der feinen Fläche und Linien)
 *     beiOrtKlick: (ort, i) => {},// Klick auf einen Punkt (Trefferradius 12 px), i ist der Index in ebene.orte
 *     ortKlickbar: () => true,    // ob ein Punkt gerade wählbar ist (dann zeigt die Maus eine Hand)
 *     rechterRand: () => px,      // rechte Kante des sichtbaren Teils der Leinwand (der Fensterrand schneidet den Globus an)
 *     tippText: land => 'Name',
 *     beimAnsichtWechsel: teile => {}, beimEingriff: () => {}, beiChronikEnde: grund => {}
 *   });
 *   g.ebene({ orte: [{ name, lat, lon, rang, kurz, neben }], laender, grenzen, fluesse, blick: { mitte: [lon, lat], k } }, { fliegen, behalten })
 *        neben: true ist ein längerer Aufenthalt (offener Kreis); auf dem Weg ein Abstecher vom Wohnort davor, hin und zurück
 *   g.fliegen([lon, lat], k, { dauer, ease }) -> Promise 'fertig' | 'abgebrochen';  g.springen([lon, lat], k)
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
    const namenInRuhe = o.namenInRuhe !== false, namenInBewegung = o.namenInBewegung !== false;
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
    /* Die feinen Linien (Grenzen, Küsten) in Stücken zu höchstens 32 Punkten, je Stück seine Mitte als Einheitsvektor und sein
       Radius als Bogen. Gezeichnet werden nur die Stücke, die die Leinwand erreichen: gezoomt kosten die feinen Linien so 3 bis 7 ms
       statt 30 und dürfen auch in Bewegung stehen (Runde 4) */
    const einheit = ([lon, lat]) => { const l = lon * RAD, p = lat * RAD, c = Math.cos(p); return [c * Math.cos(l), c * Math.sin(l), Math.sin(p)]; };
    function stueckeBauen(ml) {
      const stuecke = [];
      ml.coordinates.forEach(l => {
        for (let i = 0; i < l.length - 1; i += 31) {
          const s = l.slice(i, i + 32), v = s.map(einheit);
          let x = 0, y = 0, z = 0;
          v.forEach(q => { x += q[0]; y += q[1]; z += q[2]; });
          const n = Math.hypot(x, y, z) || 1;
          x /= n; y /= n; z /= n;
          let r = 0;
          v.forEach(q => { r = Math.max(r, Math.acos(Math.max(-1, Math.min(1, q[0] * x + q[1] * y + q[2] * z)))); });
          stuecke.push({ s, x, y, z, r });
        }
      });
      return stuecke;
    }
    const grob = datensatz(window.WELT_110M);
    let fein = null, feinDa = null;
    const feinBereit = new Promise(r => { feinDa = r; });
    function feinLaden() {
      if (fein || feinLaden.laeuft) return;
      feinLaden.laeuft = true;
      const fertig = () => {
        if (!window.WELT_50M) return;
        const d = datensatz(window.WELT_50M);
        d.stuecke = { grenzen: stueckeBauen(d.grenzen), kueste: stueckeBauen(d.kueste) };
        fein = d;
        feinDa();
        zeichnen();
      };
      if (window.WELT_50M) return fertig();
      const s = document.createElement('script');
      s.src = o.daten50 || 'daten/welt-50m.js';
      s.onload = fertig;
      document.head.appendChild(s);
    }
    const FLUESSE = (window.FLUESSE || []).map(f => ({ type: 'MultiLineString', coordinates: f.linien }));

    /* Datenregel aus B: in Bewegung und bis 1,8-fach grob, gezoomt in Ruhe fein. In A galt fein schon in Bewegung, sobald der
       Zoom über 1,8 lag; ein Bild dauerte dann rund 90 ms. Ruhe heißt: 220 ms ohne Bewegung, oder ein Flug ist zu Ende (ein Ablauf
       meldet die Ankunft an einer Station selbst, ruhe()).
       Seit Runde 4 (Dominik, 21. Oktober abends: erst „unscharf“, dann „für eine Sekunde die detaillierten Ränder“, dann weiter)
       wechselt nichts mehr hart:
       - Die feinen Linien (Grenzen, Küsten) stehen auch in Bewegung, sobald die Kugel gezoomt ist: zwischen 1,6- und 2,1-fach
         blenden sie über die groben, dem Ziel folgen sie höchstens in 300 ms (linien.a). Grob bleibt in Bewegung nur die Fläche.
       - Die feine Fläche malt der Kern in Ruhe einmal in ein zweites Bild (bild) und blendet sie über 350 ms über die grobe
         (blende.a). Geht es weiter, blendet sie über 300 ms aus; das Bild folgt dabei der Kugel (bildLegen), es springt nichts.
       - In einem Ablauf nur, wenn der Halt danach noch 1,5 s mit der feinen Karte trägt (flaecheSoll, haltBis); ein Halt bei
         gezoomter Kugel dauert dafür mindestens so lange (haltFuer). Die feinen Linien kommen dort nur auf dem Weg zu einem Halt
         und gehen auf dem Weg davon (flugLage.an, flugLage.ab), nie für einen Augenblick dazwischen. */
    let bewegt = false, ruheTimer = null;
    function bewegung() {
      bewegt = true;
      clearTimeout(ruheTimer);
      ruheTimer = setTimeout(ruhe, 220);
    }
    function ruhe() {
      clearTimeout(ruheTimer);
      ruheTimer = null;
      if (!bewegt) return;
      bewegt = false;
      torDanach = 1;
      zeichnen();
      ansichtMelden();
    }
    const daten = () => fein && k > 1.8 && !bewegt ? fein : grob;

    // ---------- Überblendung grob zu fein ----------
    const BLENDE_EIN = 350, BLENDE_AUS = 300, LINIEN_MS = 300, FEIN_MIN = 1500;
    const glatt = t => t * t * (3 - 2 * t);
    const blende = { a: 0, von: 0, nach: 0, start: 0, dauer: 0 };     // Anteil der feinen Fläche
    const linien = { a: 0, t: 0 };                                     // Anteil der feinen Linien
    let flugLage = null, torDanach = 1;  // im Flug { e, ab, an }; danach, ob die feinen Linien bis zum nächsten Flug stehen dürfen
    let haltBis = 0;                     // Ende des Halts, in dem ein Ablauf gerade steht (performance.now), sonst 0
    function blendeStand(jetzt) {
      if (blende.dauer) {
        const t = Math.min(1, (jetzt - blende.start) / blende.dauer);
        blende.a = t >= 1 ? blende.nach : blende.von + (blende.nach - blende.von) * glatt(t);
        if (t >= 1) blende.dauer = 0;
      }
      return blende.a;
    }
    function blendeNach(ziel, ms, jetzt) {
      if (blende.nach === ziel && (blende.dauer || blende.a === ziel)) return;
      blende.von = blende.a; blende.nach = ziel; blende.start = jetzt;
      blende.dauer = Math.max(1, ms * Math.abs(ziel - blende.a));
    }
    function blendeAus() { blende.a = blende.von = blende.nach = 0; blende.dauer = 0; }
    // Soll die feine Fläche jetzt stehen? Nur in Ruhe und gezoomt; im Ablauf nur mit genug Halt für Einblenden und 1,5 s fein
    function flaecheSoll(jetzt) {
      if (bewegt || !fein || k <= 1.8) return false;
      if (blende.a > 0 || blende.nach === 1) return true;
      if (chronikNummer) return !!haltBis && haltBis - jetzt >= BLENDE_EIN + FEIN_MIN;
      return true;
    }
    // Ziel der feinen Linien: in Ruhe gezoomt ganz, in Bewegung nach der Vergrößerung, im Ablauf nur auf dem Weg zu oder von einem Halt
    function linienSoll() {
      if (!fein) return 0;
      if (!bewegt) return k > 1.8 ? 1 : 0;
      const tor = flugLage ? (flugLage.e < .5 ? flugLage.ab : flugLage.an) : torDanach;
      return tor * Math.max(0, Math.min(1, (k - 1.6) / .5));
    }
    function linienStand(jetzt, soll) {
      const dt = Math.min(34, Math.max(0, jetzt - linien.t));
      linien.t = jetzt;
      const schritt = dt / LINIEN_MS;
      linien.a = soll > linien.a ? Math.min(soll, linien.a + schritt) : Math.max(soll, linien.a - schritt);
      return linien.a;
    }
    // Das zweite Bild: Kugel, Gradnetz und die feine Fläche in der Ansicht, in der es gemalt wurde
    const bild = document.createElement('canvas'), bctx = bild.getContext('2d');
    let bildStand = null, bildDauer = 150, bildPlan = 0, nachBild = 0;
    const ansicht = () => [mitte[0], mitte[1], k, seite, dpr, ebene.laender ? 1 : 0].join();
    const bildPasst = () => !!bildStand && bildStand.ansicht === ansicht();
    function bildMalen() {
      const t0 = performance.now();
      if (bild.width !== canvas.width || bild.height !== canvas.height) { bild.width = canvas.width; bild.height = canvas.height; }
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.clearRect(0, 0, seite, seite);
      grundZeichnen(bctx, fein);
      const c = seite / 2, h = seite / 4;
      bildStand = { ansicht: ansicht(), seite, c, h, punkte: [[c, c], [c + h, c], [c, c + h]].map(p => projektion.invert(p)) };
      bildDauer = performance.now() - t0;
    }
    /* Nach der Ankunft: erst das Bild der Ankunft zeigen, im nächsten Durchlauf das feine Bild malen (rund 100 ms auf dem
       Prüfrechner, die Kugel steht dabei) und dann einblenden, wenn es noch soll */
    function bildPlanen() {
      if (bildPlan) return;
      bildPlan = requestAnimationFrame(() => setTimeout(() => {
        bildPlan = 0;
        if (!flaecheSoll(performance.now())) return;
        projektionSetzen();
        if (!bildPasst()) bildMalen();
        const jetzt = performance.now();
        if (!flaecheSoll(jetzt)) return;
        blendeNach(1, BLENDE_EIN, jetzt);
        zeichnen();
      }, 0));
    }
    /* Das feine Bild auf die jetzige Projektion legen: in Ruhe deckungsgleich, beim Abflug über drei Punkte nachgeführt (eine
       affine Abbildung; im kleinen Ausschnitt einer gezoomten Kugel weicht sie am Rand um 1 bis 2 px ab, während das Bild
       ausblendet). false, wenn es nicht mehr passt */
    function bildLegen(alpha) {
      if (bildPasst()) { ctx.globalAlpha = alpha; ctx.drawImage(bild, 0, 0, seite, seite); ctx.globalAlpha = 1; return true; }
      if (!bildStand || bildStand.punkte.some(p => !p || !sichtbar(p))) return false;
      const q = bildStand.punkte.map(p => projektion(p)), { c, h } = bildStand;
      const a = (q[1][0] - q[0][0]) / h, b = (q[1][1] - q[0][1]) / h, cc = (q[2][0] - q[0][0]) / h, d = (q[2][1] - q[0][1]) / h;
      ctx.setTransform(dpr * a, dpr * b, dpr * cc, dpr * d, dpr * (q[0][0] - (a + cc) * c), dpr * (q[0][1] - (b + d) * c));
      ctx.globalAlpha = alpha;
      ctx.drawImage(bild, 0, 0, bildStand.seite, bildStand.seite);
      ctx.globalAlpha = 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    }
    // Solange etwas blendet und kein Flug die Bilder treibt, ein Bild je Durchlauf
    function weiterZeichnen() {
      if (nachBild || flug) return;
      nachBild = requestAnimationFrame(() => { nachBild = 0; if (!flug) zeichnen(); });
    }
    // Die sichtbaren Stücke der feinen Linien (je Ansicht einmal): was die Ecken der Leinwand erreichen, mit etwas Rand
    // (Die Listen werden wiederverwendet: im Flug wählt jedes Bild neu, ohne jedes Mal neue Felder anzulegen)
    const stueckWahl = { schluessel: '', grenzen: { type: 'MultiLineString', coordinates: [] }, kueste: { type: 'MultiLineString', coordinates: [] } };
    function sichtbareStuecke() {
      const schluessel = mitte[0] + ',' + mitte[1] + ',' + k + ',' + seite;
      if (stueckWahl.schluessel === schluessel) return stueckWahl;
      const sicht = Math.asin(Math.min(1, Math.SQRT2 * (seite / 2) / (R * k))) + .03;
      const m = einheit(mitte);
      const wahl = (st, aus) => {
        aus.length = 0;
        for (const q of st) { const w = sicht + q.r; if (w >= Math.PI || q.x * m[0] + q.y * m[1] + q.z * m[2] > Math.cos(w)) aus.push(q.s); }
      };
      wahl(fein.stuecke.grenzen, stueckWahl.grenzen.coordinates);
      wahl(fein.stuecke.kueste, stueckWahl.kueste.coordinates);
      stueckWahl.schluessel = schluessel;
      return stueckWahl;
    }

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
    function projektionSetzen() {
      const c = seite / 2;
      projektion.translate([c, c]).scale(R * k).rotate([-mitte[0], -mitte[1]]).clipExtent([[0, 0], [seite, seite]]);
    }
    // Grund: Kugel, Gradnetz und Fläche (Land, bereiste Länder) aus dem Datensatz d, in die Leinwand c
    function grundZeichnen(c, d) {
      pfad.context(c);
      c.beginPath(); pfad({ type: 'Sphere' }); c.fillStyle = F.papier; c.fill();
      c.beginPath(); pfad(netz()); c.strokeStyle = F.gradnetz; c.lineWidth = .5; c.stroke();
      c.beginPath(); pfad(d.land); c.fillStyle = F.land; c.fill();
      if (ebene.laender) { c.beginPath(); pfad(d.bereistFlaeche); c.fillStyle = F.reise; c.fill(); }
      pfad.context(ctx);
    }
    /* Die feinen Linien liegen gezoomt mit mehreren Punkten je Pixel auf der Leinwand (auf dem Telefon bei 3,6-fach rund drei).
       Für sie lässt der Pfad Punkte aus, die weniger als 1 px vom zuletzt gesetzten liegen; der letzte Punkt jeder Linie bleibt.
       Man sieht keinen Unterschied (im Mittel unter einer Graustufe), aber auf dem Telefon kostet ein Bild im Flug so 5 ms weniger
       (40 statt 56 Bilder je Sekunde ohne). In Ruhe und Bewegung gleich, damit sich an den Linien beim Halt nichts ändert */
    const duenn = {
      x: 0, y: 0, px: 0, py: 0, offen: false,
      moveTo(x, y) { this.ende(); ctx.moveTo(x, y); this.x = x; this.y = y; },
      lineTo(x, y) {
        const dx = x - this.x, dy = y - this.y;
        if (dx * dx + dy * dy < 1) { this.px = x; this.py = y; this.offen = true; return; }
        ctx.lineTo(x, y); this.x = x; this.y = y; this.offen = false;
      },
      closePath() { this.ende(); ctx.closePath(); },
      arc(x, y, r, a0, a1) { this.ende(); ctx.arc(x, y, r, a0, a1); },
      ende() { if (this.offen) { ctx.lineTo(this.px, this.py); this.offen = false; } }
    };
    // Grenzen und Küsten in gleicher Strichstärke und Farbe, grob wie fein (fein ausgedünnt)
    function linienZeichnen(grenzen, kueste, alpha, ausduennen) {
      ctx.globalAlpha = alpha;
      if (ausduennen) pfad.context(duenn);
      if (ebene.grenzen !== false) { ctx.beginPath(); pfad(grenzen); duenn.ende(); ctx.strokeStyle = F.grenze; ctx.lineWidth = k > 3 ? .7 : .45; ctx.stroke(); }
      ctx.beginPath(); pfad(kueste); duenn.ende(); ctx.strokeStyle = F.kueste; ctx.lineWidth = .6; ctx.stroke();
      pfad.context(ctx);
      ctx.globalAlpha = 1;
    }
    function zeichnen() {
      const jetzt = performance.now();
      projektionSetzen();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, seite, seite);
      if (flaeche) flaeche.classList.toggle('ist-gezoomt', k > 1.15);

      // Fläche: die grobe, darüber das feine Bild in seinem Anteil (in Ruhe ganz, beim Einblenden und Abflug teilweise)
      let a = blendeStand(jetzt);
      if (flaecheSoll(jetzt)) {
        if (!bildPasst() && a > 0) bildMalen();      // die Ansicht hat sich in Ruhe geändert (Sprung, Größe): gleich fein
        if (bildPasst()) { if (a < 1) blendeNach(1, BLENDE_EIN, jetzt); }
        else bildPlanen();
      } else if (a > 0) blendeNach(0, BLENDE_AUS, jetzt);
      a = blendeStand(jetzt);
      if (!(a >= 1 && !bewegt && bildPasst())) grundZeichnen(ctx, grob);
      if (a > 0 && fein && !bildLegen(a)) { blendeAus(); a = 0; }

      // Linien: grob, darüber die feinen in ihrem Anteil
      const lSoll = linienSoll(), l = linienStand(jetzt, lSoll);
      if (l < 1) linienZeichnen(grob.grenzen, grob.kueste, 1 - l);
      if (l > 0 && fein) { const w = sichtbareStuecke(); linienZeichnen(w.grenzen, w.kueste, l, true); }
      if (ebene.fluesse && FLUESSE.length) {
        ctx.lineJoin = 'round'; ctx.strokeStyle = F.kueste; ctx.lineWidth = .8;
        FLUESSE.forEach(f => { ctx.beginPath(); pfad(f); ctx.stroke(); });
      }
      if (ebene.laender) {
        const d = fein && (bewegt ? l >= .5 : k > 1.8) ? fein : grob;
        const gewaehlt = auswahl ? d.laender.find(x => x.iso === auswahl.iso) || auswahl : null;
        [[gewaehlt, 1.2], [hover !== gewaehlt ? hover : null, 1]].forEach(([f, w]) => {
          if (!f || !f.geometry) return;
          ctx.beginPath(); pfad(f); ctx.strokeStyle = F.tinte; ctx.lineWidth = w; ctx.stroke();
        });
        // Kleinstaaten ohne Fläche im Maßstab: eine kleine Scheibe in der Farbe der bereisten Länder, ohne Kontur (wie ein Land,
        // nicht wie ein Ortszeichen in Tinte); gezeigt oder gewählt mit Kontur. Hat die feine Fläche das Land, geht die Scheibe
        // mit ihr: sie blendet aus, wie die Fläche einblendet
        Object.entries(winzig).forEach(([iso, pos]) => {
          if (!bereist.has(iso) || grob.isos.has(iso) || !sichtbar(pos)) return;
          const deckend = fein && fein.isos.has(iso) ? 1 - a : 1;
          if (deckend <= 0) return;
          const p = projektion(pos), an = (auswahl && auswahl.iso === iso) || (hover && hover.iso === iso);
          ctx.globalAlpha = deckend;
          ctx.beginPath(); ctx.arc(p[0], p[1], 3.2, 0, Math.PI * 2);
          ctx.fillStyle = F.reise; ctx.fill();
          if (an) { ctx.lineWidth = 1.2; ctx.strokeStyle = F.tinte; ctx.stroke(); }
          ctx.globalAlpha = 1;
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
      if (bewegt ? namenInBewegung : namenInRuhe) namenSetzen(orte);

      if (!erstesBild) erstesBild = performance.now();
      if (!bewegt) ansichtMelden();
      if (blende.dauer || l !== lSoll) weiterZeichnen();
      melden('beimZeichnen', { bewegt, k, fein: a, linien: l });
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
    function flugBeenden(grund = 'abgebrochen') {
      if (flug) { flug.stop(); flug = null; }
      if (flugLage) { torDanach = grund === 'fertig' ? flugLage.an : 1; flugLage = null; }
      if (flugEnde) { const f = flugEnde; flugEnde = null; f(grund); }
    }
    /* Ein Flug. extra: { dauer, jeBild(e), ease, ab, an, ruhen }
         ease    Verlauf (Vorgabe d3.easeCubicInOut; ein Ablauf fliegt mit sanft)
         ab, an  false: die feinen Linien stehen in der ersten (ab) oder zweiten Hälfte (an) des Flugs nicht (ein Ablauf: kein
                 Halt davor oder danach)
         ruhen   false: am Ende keine Ruhe (ein Ablauf fliegt gleich weiter oder meldet die Ruhe selbst) */
    function fliegen(ziel, zielK, extra) {
      flugBeenden();
      tippVerstecken();
      extra = extra || {};
      zielK = Math.max(KMIN, Math.min(KMAX, zielK));
      if (zielK > 1.6) feinLaden();
      const start = mitte.slice(), startK = k;
      const weg = d3.geoInterpolate(start, ziel);
      const abstand = d3.geoDistance(start, ziel);
      const dauer = ruhig ? 0 : (extra.dauer != null ? extra.dauer : o.dauer || 1000);
      const delle = Math.min(Math.log(Math.max(startK, zielK)), abstand * 1.1);
      const { jeBild } = extra, weich = extra.ease || d3.easeCubicInOut, ruhen = extra.ruhen !== false;
      if (!dauer) { mitte = ziel.slice(); k = zielK; if (jeBild) jeBild(1); zoomStandSetzen(); zeichnen(); return Promise.resolve('fertig'); }
      return new Promise(fertig => {
        flugEnde = fertig;
        const lage = flugLage = { e: 0, ab: extra.ab === false ? 0 : 1, an: extra.an === false ? 0 : 1 };
        bewegung();
        flug = d3.timer(verstrichen => {
          const t = Math.min(1, verstrichen / dauer);
          const e = weich(t);
          lage.e = e;
          mitte = weg(e);
          k = Math.max(KMIN, Math.exp((1 - e) * Math.log(startK) + e * Math.log(zielK) - delle * Math.sin(Math.PI * e)));
          if (jeBild) jeBild(e);
          zoomStandSetzen(); bewegung(); zeichnen();
          if (t >= 1) { flugBeenden('fertig'); if (ruhen) ruhe(); }
        });
      });
    }
    // Sanft an- und auslaufen (Smootherstep): langsamer Beginn, in der Mitte 1,9-mal so schnell wie im Schnitt (kubisch 3-mal)
    const sanft = t => t * t * t * (t * (t * 6 - 15) + 10);
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
      haltBis = 0;
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
      haltBis = 0;
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
         flug: 1000,             // ms je Flug, oder (grad, station, i) => ms nach der Entfernung in Grad (auch für den Schluss)
         ersterFlug: 1000,       // ms für den Flug zur ersten Station, Zahl oder Funktion wie flug (Vorgabe: flug)
         halt: 600,              // ms Halt an jeder Station, oder (station, i) => ms; gezoomt (über 1,8-fach) mindestens so
                                 // lange, dass die feine Karte danach noch 1,5 s steht (haltFuer)
         rueckweg: 500,          // ms für den Rückweg eines Abstechers, ohne Halt; Zahl oder Funktion wie flug
         ease: sanft,            // Verlauf jedes Flugs (Vorgabe: sanft an- und auslaufen)
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
      const flugMs = fn(takt.flug, o.dauer || 1000), rueckMs = fn(takt.rueckweg, 500);
      const ersterMs = takt.ersterFlug == null ? flugMs : fn(takt.ersterFlug, 1000);
      const haltMs = fn(takt.halt, 600), zoomZiel = fn(takt.zoom, 2.6), weich = takt.ease || sanft;
      const grad = z => d3.geoDistance(mitte, z) / RAD;
      const bis = takt.orte !== 'alle';
      if (ab === 0) route = routeBauen(stationen); else routeSetzen(stationen);
      gezeigt = bis ? new Set(stationen.slice(0, ab).map(s => s.name)) : null;
      chronikStand = { bei: ab - 1, unterwegs: null };
      const vorbei = () => chronikNummer !== nummer;
      const ende = () => stilleGruende.get(nummer) || 'abgebrochen';
      let heim = null, vonHalt = true;
      for (let j = 0; j < ab; j++) if (!stationen[j].neben) heim = j;
      /* Die feine Karte (rund 0,3 s Rechnen) vor dem ersten Flug, nicht mitten darin: sonst stockte der Flug. Höchstens 2 s warten */
      if (!fein && stationen.some((s, i) => zoomZiel(s, i) > 1.6)) {
        feinLaden();
        await Promise.race([feinBereit, new Promise(r => setTimeout(r, 2000))]);
        if (vorbei()) return ende();
      }
      for (let i = ab; i < n; i++) {
        const s = stationen[i], von = route.fortschritt, ziel = route.an[i], zk = zoomZiel(s, i), punkt = [s.lon, s.lat];
        chronikStand.unterwegs = i;
        await fliegen(punkt, zk, {
          dauer: (i === 0 && ab === 0 ? ersterMs : flugMs)(grad(punkt), s, i), ease: weich, ab: vonHalt, an: true, ruhen: false,
          jeBild: e => { route.fortschritt = von + (ziel - von) * e; }
        });
        if (vorbei()) return ende();
        // Angekommen: Punkt, Name und Tafel wechseln in einem Bild, wenn die Linie am Ziel ist; dann steht die Kugel (Ruhe)
        route.fortschritt = ziel;
        chronikStand.unterwegs = null;
        chronikStand.bei = i;
        if (gezeigt) gezeigt.add(s.name);
        aktiverOrt = s.name;
        if (typeof takt.beiStation === 'function') takt.beiStation(s, i);
        if (vorbei()) return ende();
        const ms = haltFuer(haltMs(s, i), zk);
        haltBis = ms > 0 ? performance.now() + ms : 0;
        if (ms > 0 && bewegt) ruhe(); else zeichnen();
        await halten(ms);
        haltBis = 0;
        if (vorbei()) return ende();
        vonHalt = ms > 0;
        if (!s.neben) heim = i;
        // Rückweg eines Abstechers zum Wohnort davor, ohne Halt; die Tafel bleibt beim Abstecher
        if (s.neben && heim !== null && route.punkte.length > ziel + 1) {
          const h = stationen[heim], hp = [h.lon, h.lat];
          const rueckK = typeof takt.rueckZoom === 'function' ? takt.rueckZoom(s, i) : zoomZiel(h, heim);
          await fliegen(hp, rueckK, { dauer: rueckMs(grad(hp), s, i), ease: weich, ab: vonHalt, an: false, ruhen: false, jeBild: e => { route.fortschritt = ziel + e; } });
          if (vorbei()) return ende();
          route.fortschritt = ziel + 1;
          vonHalt = false;
        }
      }
      route.fortschritt = route.punkte.length - 1;
      if (takt.schluss !== null) {
        const sch = takt.schluss || { mitte: d3.geoCentroid({ type: 'MultiPoint', coordinates: route.punkte }), k: 1 };
        const sp = sch.mitte || sch;
        aktiverOrt = takt.endeAktiv || null;
        await fliegen(sp, sch.k || 1, { dauer: flugMs(grad(sp), null, n), ease: weich, ab: vonHalt, an: true, ruhen: false });
        if (vorbei()) return ende();
      }
      chronikNummer = 0;
      chronikStand = null;
      gezeigt = null;
      aktiverOrt = takt.endeAktiv || null;
      if (bewegt) ruhe(); else zeichnen();
      melden('beiChronikEnde', 'fertig');
      return 'fertig';
    }
    /* Ein Halt bei gezoomter Kugel (über 1,8-fach, die feine Karte kommt) dauert mindestens so lange, dass nach dem Malen des feinen
       Bilds (zuletzt bildDauer) und dem Einblenden noch 1,5 s fein stehen, bevor es weitergeht */
    function haltFuer(ms, zk) {
      if (!(ms > 0) || zk <= 1.8 || !(fein || feinLaden.laeuft)) return ms;
      return Math.max(ms, Math.ceil(bildDauer) + 100 + BLENDE_EIN + FEIN_MIN);
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

    // Die feine Karte gleich laden: meist ist sie da, bevor der erste Flug beginnt (vorher nach 1,2 s, oft mitten im Flug)
    setTimeout(feinLaden, 0);
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
