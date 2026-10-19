/* Gemeinsame Inhalte für die Entwürfe E1 bis E3: Orte, Stationen, Länder, eigene Werke. */
window.INHALT = {
  person: { name: 'Dominik Jäkel', rolle: 'Schriftsteller und Reisender' },

  // Bereiste Länder und Gebiete (Rubbelkarte plus Argentinien, Uruguay, Westjordanland), Landesteile des UK einzeln
  bereist: [
    'AT', 'BE', 'BG', 'DK', 'DE', 'GB-ENG', 'EE', 'FI', 'FR', 'IE', 'IT', 'HR', 'LV', 'LT', 'MC', 'NL', 'GB-NIR', 'PL', 'PT', 'RO', 'RU', 'GB-SCT', 'SE', 'CH', 'RS', 'SK', 'SI', 'ES', 'CZ', 'HU', 'VA',
    'AM', 'BD', 'CN', 'GE', 'HK', 'IN', 'ID', 'IL', 'KW', 'MY', 'OM', 'KR', 'LK', 'TW', 'TH', 'TR', 'AE', 'VN', 'PS-WB',
    'EG', 'ET', 'BJ', 'GH', 'CV', 'KE', 'MA', 'ZA', 'TZ', 'TG', 'TN',
    'AR', 'CA', 'UY', 'US'
  ],
  kontinente: {
    Europa: ['AT', 'BE', 'BG', 'DK', 'DE', 'GB-ENG', 'EE', 'FI', 'FR', 'IE', 'IT', 'HR', 'LV', 'LT', 'MC', 'NL', 'GB-NIR', 'PL', 'PT', 'RO', 'RU', 'GB-SCT', 'SE', 'CH', 'RS', 'SK', 'SI', 'ES', 'CZ', 'HU', 'VA'],
    Asien: ['AM', 'BD', 'CN', 'GE', 'HK', 'IN', 'ID', 'IL', 'KW', 'MY', 'OM', 'KR', 'LK', 'TW', 'TH', 'TR', 'AE', 'VN', 'PS-WB'],
    Afrika: ['EG', 'ET', 'BJ', 'GH', 'CV', 'KE', 'MA', 'ZA', 'TZ', 'TG', 'TN'],
    Amerika: ['AR', 'CA', 'UY', 'US']
  },
  sondernamen: { 'GB-ENG': 'England', 'GB-SCT': 'Schottland', 'GB-NIR': 'Nordirland', 'GB-WLS': 'Wales', 'PS-WB': 'Westjordanland' },
  winzig: { MC: [7.42, 43.73], VA: [12.45, 41.90], HK: [114.17, 22.32], CV: [-23.6, 15.1] },
  ansichten: { FR: [2.5, 46.6, 5.5], NL: [5.3, 52.2, 12], US: [-98, 39, 2.1], RU: [70, 60, 1.5], PT: [-8.1, 39.7, 9], ES: [-3.7, 40.2, 6], CN: [104, 35, 2.4], CA: [-96, 58, 1.8], DK: [10, 56, 10] },

  // Lebensstationen in zeitlicher Reihenfolge (für die Chronik)
  leben: [
    { name: 'Dortmund', jahr: 'bis 2014', von: null, bis: 2014, lat: 51.51, lon: 7.47 },
    { name: 'Freiburg', jahr: '2014', von: 2014, lat: 47.99, lon: 7.85 },
    { name: 'Potsdam', jahr: '2015', von: 2015, lat: 52.39, lon: 13.06 },
    { name: 'Colombo', land: 'Sri Lanka', jahr: '2016', von: 2016, lat: 6.93, lon: 79.86 },
    { name: 'Cotonou', land: 'Benin', jahr: '2018', von: 2018, lat: 6.37, lon: 2.43 },
    { name: 'Kaohsiung', land: 'Taiwan', jahr: '2018', von: 2018, lat: 22.63, lon: 120.30 },
    { name: 'Berlin', jahr: '2022', von: 2022, lat: 52.52, lon: 13.40 },
    { name: 'Mallorca', jahr: '2023', von: 2023, lat: 39.57, lon: 2.65 }
  ],

  satoshi: {
    notiz: 'Die Kernhandlung spielt 2007 bis 2010 in Patagonien.',
    orte: [
      { name: 'Buenos Aires', lat: -34.60, lon: -58.38 },
      { name: 'Black Rock Desert', notiz: 'Nevada', lat: 40.79, lon: -119.20 },
      { name: 'Berlin', lat: 52.52, lon: 13.40 },
      { name: 'New York', lat: 40.71, lon: -74.01 },
      { name: 'Kobe', lat: 34.69, lon: 135.20 },
      { name: 'London', lat: 51.51, lon: -0.13 },
      { name: 'Penang', lat: 5.41, lon: 100.33 },
      { name: 'Bariloche', notiz: 'Patagonien, Kernhandlung 2007 bis 2010', lat: -41.13, lon: -71.31 },
      { name: 'Anden an der Grenze zu Chile', kurz: 'Anden', notiz: 'Patagonien', lat: -41.16, lon: -71.88, rang: 3 },
      { name: 'Temple City', notiz: 'San Gabriel Valley', lat: 34.11, lon: -118.06, rang: 2 },
      { name: 'Fort Meade', notiz: 'Maryland', lat: 39.11, lon: -76.73, rang: 2 }
    ]
  },

  // Ursprungstrilogie in zeitlicher Reihenfolge (für die Chronik)
  ursprung: [
    { name: 'Göbekli Tepe', band: 'I', jahr: 'um 9500 v. Chr.', lat: 37.22, lon: 38.92 },
    { name: 'Ur', band: 'II', jahr: '3. Jahrtausend v. Chr.', volk: 'die Sumerer', lat: 30.96, lon: 46.10 },
    { name: 'Tyros', band: 'III', jahr: '1. Jahrtausend v. Chr.', volk: 'die Phönizier', lat: 33.27, lon: 35.20 },
    { name: 'Jerusalem', band: 'III', jahr: '1. Jahrtausend v. Chr.', volk: 'die Phönizier', lat: 31.78, lon: 35.22 }
  ],
  baende: {
    I: 'Göbekli Tepe in Südostanatolien, um 9500 v. Chr. Älter als Schrift, Rad und Töpferei.',
    II: 'Die Sumerer. Ur im Süden Mesopotamiens, bekannt für seine Zikkurat und die Königsgräber.',
    III: 'Die Phönizier. Tyros an der Küste des heutigen Libanon und Jerusalem im Hinterland.'
  },

  // Eigene Werke für die Bibliothek
  werke: [
    { id: 'satoshi', titel: 'Satoshi', art: 'Roman', stand: 'in Arbeit', text: 'Ein Roman mit vielen Schauplätzen. Die Kernhandlung spielt 2007 bis 2010 in Patagonien.', ebene: 'satoshi' },
    { id: 'ursprung-1', titel: 'Ursprung I', art: 'Roman, Band I der Ursprungstrilogie', stand: 'in Arbeit', band: 'I', ebene: 'ursprung' },
    { id: 'ursprung-2', titel: 'Ursprung II', art: 'Roman, Band II der Ursprungstrilogie', stand: 'in Arbeit', band: 'II', ebene: 'ursprung' },
    { id: 'ursprung-3', titel: 'Ursprung III', art: 'Roman, Band III der Ursprungstrilogie', stand: 'in Arbeit', band: 'III', ebene: 'ursprung' },
    { id: 'erzaehlungen', titel: 'Erzählungen', art: 'Kurzgeschichten', stand: 'erscheinen nach und nach', text: 'Kürzere Prosa, nach und nach hier veröffentlicht.' },
    { id: 'untertext', titel: 'Untertext', art: 'Journal', stand: 'alle drei bis vier Wochen', text: 'Texte über Reisen, Bücher und das, was darunter liegt. Selten. Dann sorgfältig.' },
    { id: 'laender', titel: 'Länder', art: 'Länderguides', stand: 'in Arbeit', text: 'Ehrlich, praktisch, ohne Werbung. Jeder Guide endet mit einer Leseliste und dem Kapitel „Was ich falsch gemacht habe“.' }
  ],

  // Beispieltexte für das Journal Untertext
  journal: [
    { titel: 'Der blinde Bibliothekar', datum: '2026-10-12', rubrik: 'Literatur', teaser: 'Warum Borges mehr über das Reisen wusste als jeder Reiseführer.' },
    { titel: 'Die leise Erosion', datum: '2026-09-14', rubrik: 'Politik', teaser: 'Institutionen sterben selten an einem Tag.' },
    { titel: 'Das langsamste Medium der Welt', datum: '2026-08-17', rubrik: 'Aufmerksamkeit', teaser: 'Ein Plädoyer für Bücher, die man nicht nebenbei lesen kann.' }
  ],

  regale: { gelesen: 'Gelesen', gerade: 'Gerade', kindheit: 'Kindheit und Jugend', abgebrochen: 'Nicht zu Ende gelesen', leseliste: 'Als Nächstes', 'lieber-nicht': 'Lieber nicht' }
};
