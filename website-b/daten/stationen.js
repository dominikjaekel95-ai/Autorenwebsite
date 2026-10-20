/* Von Hand gepflegte Texte für Version B; die übrigen Dateien in daten/ sind unveränderte Kopien aus Version A.

   STATIONEN: Land, Zeitraum und Tätigkeit der Wohnorte und längeren Aufenthalte für die Legende der Karte „Wohnorte“
   („Taiwan, 2018–2022, Lektor und freier Autor.“). Schlüssel ist der Name wie in daten/inhalt.js (leben, aufenthalte).
   Die Tätigkeiten stammen aus der Liste „Stationen“ der Vita in Version A; was die Kurzvita der Startseite schon sagt,
   steht hier nicht noch einmal. Ein Zeitraum endet mit dem Jahr des nächsten Wohnorts; die Enden sind aus den Daten
   abgeleitet und von Dominik zu bestätigen. land: '' heißt kein Land (deutsche Orte).

   SZENEN: die Szenen von Satoshi in der Reihenfolge von daten/inhalt.js (satoshi.szenen). Die Texte sind aus Sätzen von
   Dominiks Exposé vom August 2026 gebaut, wörtlich, wo es ging, und verraten das Ende nicht. Dieselben Texte stehen in
   satoshi.html; wer einen ändert, ändert beide. */
window.STATIONEN = {
  Dortmund: { land: '', zeit: '1995–2014', satz: '' },
  Freiburg: { land: '', zeit: '2014–2015', satz: 'Studium Liberal Arts & Sciences' },
  Potsdam: { land: '', zeit: '2015–2018', satz: 'Studium IT-Systems Engineering' },
  Colombo: { land: 'Sri Lanka', zeit: '2016', satz: 'Freiwilligenprojekt mit AIESEC' },
  Cotonou: { land: 'Benin', zeit: '2018', satz: 'Freiwilligenprojekt mit AIESEC' },
  Kaohsiung: { land: 'Taiwan', zeit: '2018–2022', satz: 'Lektor und freier Autor' },
  Berlin: { land: '', zeit: 'seit 2022', satz: '' },
  Mallorca: { land: 'Spanien', zeit: '2023', satz: '' },
  Kapstadt: { land: 'Südafrika', zeit: '2024', satz: '' },
  Sansibar: { land: 'Tansania', zeit: '2025', satz: '' },
  'Buenos Aires': { land: 'Argentinien', zeit: '2026', satz: '' }
};

window.SZENEN = [
  { ort: 'Buenos Aires', text: 'Die siebzehnjährige Lana erlebt, wie die Ersparnisse ihrer Familie per Dekret verschwinden.' },
  { ort: 'London', text: 'In den Bilanzen, die Lana als Praktikantin bei Lehman Brothers durchrechnet, erkennt sie das Muster von Buenos Aires wieder.' },
  { ort: 'Black Rock Desert', text: 'Auf dem Burning-Man-Festival begegnet Lana Arthur und Samuel. In den Nächten des Festivals lösen die drei ein Problem, an dem Mathematiker seit Jahrzehnten verzweifeln, und schließen einen Pakt.' },
  { ort: 'London', text: 'Im September stolpert Lana in einen Bankrun vor einer Northern-Rock-Filiale.' },
  { ort: 'Kobe', text: 'Lana folgt Arthur nach Japan, wo der Pakt sein Pseudonym bekommt: Satoshi Nakamoto.' },
  { ort: 'New York', text: 'Lana und Arthur überreden Samuel, aus seinem Leben als CTO eines Wall-Street-Fonds auszusteigen.' },
  { ort: 'Berlin', text: 'In einer Kreuzberger Fabriketage bauen die drei das erste digitale Geld, das niemandem gehört.' },
  { ort: 'Buenos Aires', text: 'Am 3. Januar startet in einem Internetcafé mit wackeligem Strom das Bitcoin-Netzwerk.' },
  { ort: 'Bariloche', text: 'Die Behörden finden Satoshis Spur. Sie führt nach Patagonien.' },
  { ort: 'Penang', text: 'Jahre später liest Lana von einem mysteriösen Whitepaper.' }
];
