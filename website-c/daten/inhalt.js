/* Gemeinsame Inhalte der Website: Orte, Stationen, Länder, eigene Werke.
   Erzeugt von werkzeuge/daten.cjs; in Version C von Hand geändert (Textänderungen 12, 22, 36 bis 38 in docs/text-aenderungen-c.md),
   darum nicht mit --erzwingen neu erzeugen. Nur, was die Seiten lesen. Keine privaten Kontaktdaten. */
window.INHALT = {
  // Bereiste Länder und Gebiete (ISO-Codes; die Landesteile des Vereinigten Königreichs einzeln, Westjordanland als PS-WB)
  bereist: ['AT', 'BE', 'BG', 'DK', 'DE', 'GB-ENG', 'EE', 'FI', 'FR', 'IE', 'IT', 'HR', 'LV', 'LT', 'MC', 'NL', 'GB-NIR', 'PL', 'PT', 'RO', 'RU', 'GB-SCT', 'SE', 'CH', 'RS', 'SK', 'SI', 'ES', 'CZ', 'HU', 'VA', 'AM', 'BD', 'CN', 'GE', 'HK', 'IN', 'ID', 'IL', 'KW', 'MY', 'OM', 'KR', 'LK', 'TW', 'TH', 'TR', 'AE', 'VN', 'PS-WB', 'EG', 'ET', 'BJ', 'GH', 'CV', 'KE', 'MA', 'ZA', 'TZ', 'TG', 'TN', 'AR', 'CA', 'UY', 'US'],

  // Dieselben Länder nach Kontinenten, für die Wörter im Text der Ebene „wohin ich gereist bin“
  kontinente: {
    Europa: ['AT', 'BE', 'BG', 'DK', 'DE', 'GB-ENG', 'EE', 'FI', 'FR', 'IE', 'IT', 'HR', 'LV', 'LT', 'MC', 'NL', 'GB-NIR', 'PL', 'PT', 'RO', 'RU', 'GB-SCT', 'SE', 'CH', 'RS', 'SK', 'SI', 'ES', 'CZ', 'HU', 'VA'],
    Asien: ['AM', 'BD', 'CN', 'GE', 'HK', 'IN', 'ID', 'IL', 'KW', 'MY', 'OM', 'KR', 'LK', 'TW', 'TH', 'TR', 'AE', 'VN', 'PS-WB'],
    Afrika: ['EG', 'ET', 'BJ', 'GH', 'CV', 'KE', 'MA', 'ZA', 'TZ', 'TG', 'TN'],
    Amerika: ['AR', 'CA', 'UY', 'US']
  },

  // Kleinstaaten ohne Fläche im groben Maßstab: [Länge, Breite]
  winzig: { MC: [7.42, 43.73], VA: [12.45, 41.9], HK: [114.17, 22.32], CV: [-23.6, 15.1] },

  // Eigene Blickpunkte für große Länder: [Länge, Breite, Zoom]
  ansichten: { FR: [2.5, 46.6, 5.5], NL: [5.3, 52.2, 12], US: [-98, 39, 2.1], RU: [70, 60, 1.5], PT: [-8.1, 39.7, 9], ES: [-3.7, 40.2, 6], CN: [104, 35, 2.4], CA: [-96, 58, 1.8], DK: [10, 56, 10] },

  // Lebensstationen in zeitlicher Reihenfolge (Chronik der Startseite, Koordinaten der Vita).
  // neben: ein längerer Aufenthalt, während der Wohnort woanders war
  leben: [
    { name: 'Dortmund', jahr: 'bis 2014', projekt: 'geboren 1995', lat: 51.51, lon: 7.47 },
    { name: 'Freiburg', jahr: '2014', projekt: 'Studium Liberal Arts & Sciences', lat: 47.99, lon: 7.85 },
    { name: 'Potsdam', jahr: '2015', projekt: 'Studium IT-Systems Engineering am Hasso-Plattner-Institut', lat: 52.39, lon: 13.06 },
    { name: 'Colombo', land: 'Sri Lanka', jahr: '2016', neben: true, projekt: 'Freiwilligenprojekt mit AIESEC', lat: 6.93, lon: 79.86 },
    { name: 'Cotonou', land: 'Benin', jahr: '2018', neben: true, projekt: 'Freiwilligenprojekt mit AIESEC', lat: 6.37, lon: 2.43 },
    { name: 'Kaohsiung', land: 'Taiwan', jahr: '2018', projekt: 'vier Jahre als Lektor und freier Autor', lat: 22.63, lon: 120.3 },
    { name: 'Berlin', jahr: '2022', lat: 52.52, lon: 13.4 },
    { name: 'Mallorca', jahr: '2023', neben: true, lat: 39.57, lon: 2.65 }
  ],

  // Weitere längere Aufenthalte, nur für die Koordinaten der Vita (auf dem Globus wäre es zu voll)
  aufenthalte: [
    { name: 'Kapstadt', land: 'Südafrika', jahr: '2024', lat: -33.92, lon: 18.42 },
    { name: 'Sansibar', land: 'Tansania', jahr: '2025', lat: -6.16, lon: 39.19 },
    { name: 'Buenos Aires', land: 'Argentinien', jahr: '2026', lat: -34.6, lon: -58.38 }
  ],

  // Satoshi: Schauplätze, die Szenen der Reihe nach (ohne das Ende zu verraten), der erste Satz, Eckdaten und das Pseudonym
  // für die Karteikarte. Klappentext, Bau, Figuren und Frage stehen als Text in satoshi.html
  satoshi: {
    orte: [
      { name: 'Buenos Aires', lat: -34.6, lon: -58.38 },
      { name: 'Black Rock Desert', notiz: 'Nevada', lat: 40.79, lon: -119.2 },
      { name: 'Berlin', lat: 52.52, lon: 13.4 },
      { name: 'New York', lat: 40.71, lon: -74.01 },
      { name: 'Kobe', lat: 34.69, lon: 135.2 },
      { name: 'London', lat: 51.51, lon: -0.13 },
      { name: 'Penang', lat: 5.41, lon: 100.33 },
      { name: 'Bariloche', notiz: 'Patagonien', lat: -41.13, lon: -71.31 },
      { name: 'Anden an der Grenze zu Chile', kurz: 'Anden', notiz: 'Patagonien', lat: -41.16, lon: -71.88, rang: 3 },
      { name: 'Temple City', notiz: 'San Gabriel Valley', lat: 34.11, lon: -118.06, rang: 2 }
    ],
    szenen: [
      { ort: 'Buenos Aires', jahr: '2001', text: 'Dezember 2001. Die siebzehnjährige Lana erlebt, wie die Ersparnisse ihrer Familie per Dekret verschwinden.' },
      { ort: 'London', jahr: '2007', text: 'Lana macht ein Praktikum bei Lehman Brothers und erkennt in den Bilanzen Muster, die sie beunruhigen und an Buenos Aires erinnern.' },
      { ort: 'Black Rock Desert', jahr: '2007', text: 'Burning Man. In den Nächten des Festivals lösen Lana, Arthur und Samuel ein Problem, an dem Mathematiker seit Jahrzehnten scheitern, und schließen einen Pakt.' },
      { ort: 'London', jahr: '2007', text: 'September 2007. Ein Bankrun vor einer Filiale von Northern Rock.' },
      { ort: 'Kobe', jahr: '2007', text: 'In Japan bekommt der Pakt seinen Namen: Satoshi Nakamoto.' },
      { ort: 'New York', jahr: '2008', text: 'Samuel ist CTO eines Quant-Fonds an der Wall Street, als die anderen ihn nach Berlin holen.' },
      { ort: 'Berlin', jahr: '2008', text: 'Eine Kreuzberger Fabriketage. Hier entsteht das erste digitale Geld, das niemandem gehört.' },
      { ort: 'Buenos Aires', jahr: '2009', text: '3. Januar 2009. Ein Internetcafé mit wackeligem Strom, zwischen zwei Stromausfällen der erste Block.' },
      { ort: 'Bariloche', jahr: '2010', text: 'Patagonien, 2010.' },
      { ort: 'Penang', jahr: '2013', text: 'Der Epilog, 2013.' }
    ],
    hook: 'Am 31. Oktober 2008 erschienen neun Seiten, die das Geld neu erfinden sollten. Ihr Verfasser hat nie existiert. Verschwinden musste er trotzdem.',
    eckdaten: { zeit: 'Prolog 2001, Kernhandlung 2007 bis 2010, Epilog 2013', stand: 'Das Manuskript liegt vollständig vor, gerade entsteht die Endfassung.' },
    figuren: [
      { name: 'Satoshi Nakamoto', rolle: 'Das Pseudonym' }
    ]
  },

  // Ursprungstrilogie: die Orte in zeitlicher Reihenfolge (für die Chronik)
  ursprung: [
    { name: 'Göbekli Tepe', band: 'I', jahr: 'um 8000 v. Chr.', lat: 37.22, lon: 38.92 },
    { name: 'Uruk', band: 'II', jahr: 'um 2700 v. Chr.', volk: 'die Sumerer', lat: 31.32, lon: 45.64 },
    { name: 'Tyros', band: 'III', jahr: 'um 940 v. Chr.', volk: 'die Phönizier', lat: 33.27, lon: 35.2 },
    { name: 'Jerusalem', band: 'III', jahr: 'um 940 v. Chr.', volk: 'die Phönizier', lat: 31.78, lon: 35.22 }
  ],

  // Ein Satz je Band für die Tafel: Landschaft und Zeit, dann worum es geht
  baende: {
    I: 'Göbekli Tepe in Südostanatolien, um 8000 v. Chr. Der älteste Tempel der Menschheit, und warum er von Menschenhand begraben wurde.',
    II: 'Uruk im Süden Mesopotamiens, um 2700 v. Chr. König Gilgamesch und der Schreiberlehrling Harran.',
    III: 'Jerusalem zur Zeit des ersten Tempels, um 940 v. Chr. König Salomo und die phönizische Gelehrte Thyra.'
  },

  // Die Bände im Einzelnen; als Stand gilt für die ganze Trilogie nur „in Arbeit“. Die Texte stehen in ursprung.html
  trilogie: {
    titel: 'Ursprung',
    baende: [
      { band: 'I', titel: 'Kreise ohne Wiederkehr', ort: 'Göbekli Tepe', zeit: 'um 8000 v. Chr.', thema: 'Die Geburt der organisierten Religion und die Sesshaftwerdung' },
      {
        band: 'II',
        titel: 'Von dem König, der niemals sterben wollte',
        arbeitstitel: true,
        ort: 'Uruk',
        zeit: 'um 2700 v. Chr.',
        thema: 'Die Geburt der Literatur und der Wandel der Schrift von einer bürokratischen zu einer Sprache der Mythen und Legenden'
      },
      { band: 'III', titel: 'Das steinerne Wort', arbeitstitel: true, ort: 'Jerusalem', zeit: 'um 940 v. Chr.', thema: 'Die Geburt der Heiligen Schrift als politisches Werkzeug' }
    ]
  },

  // Eigene Werke für Regal, Zeitband und Karteikarten; titel ist der kurze Rückentitel, buchtitel der Titel des Buchs
  werke: [
    {
      id: 'satoshi',
      titel: 'Satoshi',
      buchtitel: 'Satoshi',
      art: 'Roman',
      stand: 'wird gerade abgeschlossen',
      text: 'Am 31. Oktober 2008 erschienen neun Seiten, die das Geld neu erfinden sollten. Ihr Verfasser hat nie existiert. Verschwinden musste er trotzdem.'
    },
    { id: 'ursprung-1', titel: 'Ursprung I', buchtitel: 'Kreise ohne Wiederkehr', art: 'Roman, Band I der Ursprungstrilogie', stand: 'in Arbeit', band: 'I' },
    { id: 'ursprung-2', titel: 'Ursprung II', buchtitel: 'Von dem König, der niemals sterben wollte', arbeitstitel: true, art: 'Roman, Band II der Ursprungstrilogie', stand: 'in Arbeit', band: 'II' },
    { id: 'ursprung-3', titel: 'Ursprung III', buchtitel: 'Das steinerne Wort', arbeitstitel: true, art: 'Roman, Band III der Ursprungstrilogie', stand: 'in Arbeit', band: 'III' },
    { id: 'erzaehlungen', titel: 'Erzählungen', buchtitel: 'Erzählungen', art: 'Kurzgeschichten', stand: '', text: 'Viele davon hat er auf der Werkstattbühne des Autorenforums Berlin gelesen.' },
    { id: 'untertext', titel: 'Untertext', buchtitel: 'Untertext', art: 'Journal', stand: '' },
    { id: 'laender', titel: 'Länder', buchtitel: 'Länder', art: 'Länderguides', stand: 'in Arbeit' }
  ]
};
