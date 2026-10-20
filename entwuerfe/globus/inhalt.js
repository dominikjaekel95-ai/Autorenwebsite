/* Gemeinsame Inhalte für die Entwürfe E1 bis F: Orte, Stationen, Länder, eigene Werke.
   Quellen für Vita, Satoshi und Ursprung: Dominiks Exposés (Satoshi, August 2026; Kreise ohne Wiederkehr)
   und die Vorhabensbeschreibung zu Satoshi (September 2026). Keine privaten Kontaktdaten. */
window.INHALT = {
  person: { name: 'Dominik Jäkel', rolle: 'Schriftsteller und Reisender' },

  // Fakten für die Vita. Beruf: Simon-Kucher darf genannt werden (Dominik, 20. Oktober); kein Ghostwriting, keine Medien.
  vita: {
    einstieg: 'Dominik Jäkel schreibt tagsüber unter fremden Namen und abends unter seinem eigenen.',
    geboren: { jahr: 1995, ort: 'Dortmund' },
    studium: [
      { ort: 'Freiburg', fach: 'Liberal Arts & Sciences' },
      { ort: 'Potsdam', fach: 'IT-Systems Engineering am Hasso-Plattner-Institut' }
    ],
    taiwan: 'Vier Jahre lebte er in Kaohsiung auf Taiwan. Er arbeitete dort als Lektor und freier Autor, unter anderem für Sprachassistenten und Indie-Gaming-Studios. In Taiwan, das von einer starken Aboriginer-Kultur geprägt ist, begann seine Beschäftigung mit der Frühgeschichte des Menschen und die Arbeit an der Ursprungstrilogie der Zivilisation.',
    berlin: 'Seit 2022 lebt er in Berlin und schreibt beruflich für Unternehmen (vor allem für die Marketing- und Pricingberatung Simon-Kucher).',
    werkstattbuehne: 'Auf der Werkstattbühne des Autorenforums Berlin hat er viele seiner Geschichten vorgelesen; seit einigen Jahren ist er einer der Moderatoren.',
    preis: { name: 'A.-E.-Johann-Preis', jahr: 2022 },
    foerderung: 'Gefördert in der Meisterklasse des Schreibhains und in Seminaren der Bundesakademie für kulturelle Bildung, mit Mentorinnen und Mentoren wie Ursula Poznanski, Wulf Dorn und Klaus N. Frick.',
    debuet: 'Gerade schließt er seinen Debütroman Satoshi ab; daneben arbeitet er seit einigen Jahren an einer Romantrilogie, die in die Ursprünge der Zivilisation eintaucht.',
    kontakt: { email: 'dominik.jd.jaekel@gmail.com', anschrift: 'Stresemannstraße 76, 10963 Berlin' }
  },

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

  // Lebensstationen in zeitlicher Reihenfolge (für die Chronik).
  // neben: true = Nebenort, ein längerer Aufenthalt, während der Wohnort woanders war (Colombo, Cotonou, Mallorca)
  leben: [
    { name: 'Dortmund', jahr: 'bis 2014', von: null, bis: 2014, lat: 51.51, lon: 7.47 },
    { name: 'Freiburg', jahr: '2014', von: 2014, lat: 47.99, lon: 7.85 },
    { name: 'Potsdam', jahr: '2015', von: 2015, lat: 52.39, lon: 13.06 },
    { name: 'Colombo', land: 'Sri Lanka', jahr: '2016', von: 2016, neben: true, projekt: 'Freiwilligenprojekt mit AIESEC', lat: 6.93, lon: 79.86 },
    { name: 'Cotonou', land: 'Benin', jahr: '2018', von: 2018, neben: true, projekt: 'Freiwilligenprojekt mit AIESEC', lat: 6.37, lon: 2.43 },
    { name: 'Kaohsiung', land: 'Taiwan', jahr: '2018', von: 2018, lat: 22.63, lon: 120.30 },
    { name: 'Berlin', jahr: '2022', von: 2022, lat: 52.52, lon: 13.40 },
    { name: 'Mallorca', jahr: '2023', von: 2023, neben: true, lat: 39.57, lon: 2.65 }
  ],
  // Weitere längere Aufenthalte, nur für die Vita (auf dem Globus wäre es zu voll)
  aufenthalte: [
    { name: 'Kapstadt', land: 'Südafrika', jahr: '2024', lat: -33.92, lon: 18.42 },
    { name: 'Sansibar', land: 'Tansania', jahr: '2025', lat: -6.16, lon: 39.19 },
    { name: 'Buenos Aires', land: 'Argentinien', jahr: '2026', lat: -34.60, lon: -58.38 }
  ],

  satoshi: {
    notiz: 'Die Kernhandlung spielt 2007 bis 2010.',
    orte: [
      { name: 'Buenos Aires', lat: -34.60, lon: -58.38 },
      { name: 'Black Rock Desert', notiz: 'Nevada', lat: 40.79, lon: -119.20 },
      { name: 'Berlin', lat: 52.52, lon: 13.40 },
      { name: 'New York', lat: 40.71, lon: -74.01 },
      { name: 'Kobe', lat: 34.69, lon: 135.20 },
      { name: 'London', lat: 51.51, lon: -0.13 },
      { name: 'Penang', lat: 5.41, lon: 100.33 },
      { name: 'Bariloche', notiz: 'Patagonien', lat: -41.13, lon: -71.31 },
      { name: 'Anden an der Grenze zu Chile', kurz: 'Anden', notiz: 'Patagonien', lat: -41.16, lon: -71.88, rang: 3 },
      { name: 'Temple City', notiz: 'San Gabriel Valley', lat: 34.11, lon: -118.06, rang: 2 },
      { name: 'Fort Meade', notiz: 'Maryland', lat: 39.11, lon: -76.73, rang: 2 }
    ],
    // Der Roman der Reihe nach, ohne das Ende zu verraten (für eine Chronik auf dem Globus)
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
    // Klappentext aus dem Exposé; der Absatz über das Ende ist bewusst weggelassen
    klappentext: [
      'Satoshi erzählt die Gründungslegende von Bitcoin als Liebesgeschichte dreier Menschen, die einander nicht vertrauen können – und die deshalb Geld bauen, das ohne Vertrauen funktioniert.',
      'Jeder von ihnen baut an der Maschine, um etwas nicht tun zu müssen. Lana, die Ökonomin, deren Familie der argentinische Staat 2001 über Nacht enteignet hat, muss sich nicht entscheiden – zwischen zwei Männern, zwei Kontinenten und zwei Leben –, solange die Arbeit am Projekt sie davon abhält. Arthur, ein Kryptograph, der beim Zusammenbruch der UdSSR heimatlos wurde, muss nichts fühlen, solange er im Code versinkt. Samuel, ein Quant an der Wall Street, dessen Vater an der Finanzkrise zerbricht, muss niemandem mehr vertrauen, solange er nur die Mathematik kontrolliert.',
      'Kennengelernt haben sie sich 2007 auf dem Burning-Man-Festival in Nevada: Zwei Männer verlieben sich in dieselbe Frau – und alle drei in dieselbe Idee. Im Rausch des Festivals finden sie eine Lösung für ein Problem, an dem Mathematiker seit Jahrzehnten scheitern – Geld ohne zentrale Instanz – und schließen einen gemeinsamen Pakt. Die oberste Regel: Wer enttarnt wird, verschwindet.',
      'Unter dem Pseudonym Satoshi Nakamoto bauen sie in einer Kreuzberger Fabriketage das erste digitale Geld, das niemandem gehört: keiner Bank und keiner Regierung. Die Arbeit gibt ihnen den perfekten Vorwand, nie auszusprechen, was zwischen ihnen ist. Doch im Herbst 2008, als die neun Seiten erscheinen, ist Lana schwanger – von einem der beiden Männer. Sie will nicht wissen, von wem.'
    ],
    schluss: 'Die Erfindung von Bitcoin gelingt, gerade weil sie ohne Vertrauen auskommt. Die drei scheitern aus demselben Grund. Davon erzählt dieser Roman.',
    frage: 'Was machen Menschen, wenn die Versprechen unserer Zeit brechen? Nicht ein einzelner Skandal, sondern der flächendeckende Vertrauensentzug – gegenüber Institutionen, Währungen, Verträgen, Nachrichten. Die 2020er Jahre sind das Jahrzehnt, in dem der Ausstieg zum ersten Mal massentauglich wurde – bis hin zum Ausstieg aus dem Geldsystem.',
    sonderfall: 'Deutschland ist dabei ein Sonderfall. Kaum ein Land hat so tiefe Geldbrüche erlebt – 1923, 1948, für den Osten 1990 – und kaum eines hat sie so gründlich institutionalisiert: Aus der Erfahrung der Inflation wurden eine Behörde und eine umfangreiche Stabilitätskultur, jedoch nur in seltensten Fällen lebendiges Erzählwissen. Die letzten großen deutschen Romane über Inflation und zerbrechendes Geld – Falladas Wolf unter Wölfen, Remarques Schwarzer Obelisk – sind über siebzig Jahre alt. Jetzt, da die Vertrauenskurve auch hier zu knicken beginnt, fehlt der institutionentreuesten Gesellschaft Europas auf einmal die emotionale Grammatik für einen Zustand, für den sie Ämter oder Gesetze hat – aber keine eigenen Geschichten und Narrative mehr.',
    versuch: 'Satoshi ist der Versuch des Autors, diese Lücke ein Stück weit zu schließen: ein Roman über den radikalsten Ausstieg, den unsere Epoche hervorgebracht hat – die Erfindung des Geldes, das ohne Vertrauen und mit bloßer Mathematik funktioniert.',
    warumJetzt: 'Doch mit welcher Konsequenz? Wer war Satoshi Nakamoto wirklich? Das vielleicht letzte große Rätsel des digitalen Zeitalters ist noch immer ungelöst. Alle suchen einen Mann. Dabei war Satoshi Nakamoto eben nie eine Person. Satoshi ist ein Versprechen – und dieser Roman erzählt, was es gekostet hat.',
    bau: 'Vierzig Kapitel, jedes ein Schlüsseltag im Leben der drei, geschnitten mit den Tagen, an denen die alte Welt fiel. Dazwischen die Momente, die in keiner offiziellen Chronik stehen: ein Spiegelkabinett in der Wüste von Nevada, in dem über Nacht eine Idee entsteht; ein Schwangerschaftstest, während zwei Männer im Nebenraum auf Börsenkurse starren; ein Rechner in einem Internetcafé in Buenos Aires, der zwischen zwei Stromausfällen den ersten Bitcoin-Block signiert.',
    poetik: 'Satoshi ist eine spekulative Chronik. Der Roman arbeitet mit dem realen Dokumentenbestand – Satoshi Nakamotos Mails, Forenbeiträgen, dem Whitepaper, dem Code und der Entwicklungsgeschichte von Bitcoin – und montiert ihn in die Erzählung, übersetzt, verdichtet und bearbeitet. Die Fiktion wohnt in den Leerstellen der Akten und widerspricht ihnen nirgends.',
    tradition: 'Eine Erzähltradition, die ihre Wurzeln in Borges’ Ficciones hat und zu deren heutigen Vertretern Hernan Diaz und Benjamín Labatut gehören: Literatur in den Leerstellen des Verbürgten.',
    // Echte Daten, mit denen die Kapitel geschnitten sind
    daten: [
      { datum: '14. September 2007', text: 'Bankrun auf Northern Rock' },
      { datum: '15. September 2008', text: 'Lehman Brothers meldet Insolvenz an' },
      { datum: '31. Oktober 2008', text: 'Das Whitepaper erscheint, neun Seiten' },
      { datum: '3. Januar 2009', text: 'Der erste Block' },
      { datum: '15. August 2010', text: 'Ein Fehler im Code erzeugt Milliarden Bitcoins aus dem Nichts' },
      { datum: 'Dezember 2010', text: 'Die Banken sperren WikiLeaks die Konten' }
    ],
    figuren: [
      { name: 'Satoshi Nakamoto', rolle: 'Das Pseudonym', text: 'Das berühmteste Phantom der Gegenwart. Die Faktenlage passt auf eine Karteikarte: ein Whitepaper, gut fünfhundert Forenposts, der erklärte Wunsch, sich selbst überflüssig zu machen. Dieser Roman gibt dem Pseudonym, was ihm bisher fehlte: eine Stimme – und drei Gesichter.' },
      { name: 'Lana Álvarez', alter: 23, rolle: 'Die Schöpferin', text: 'Lana steht mit einem Fuß in der Welt, die sie retten, und mit dem anderen in der, die sie zerstören will. Als Tochter eines ruinierten argentinischen Bauunternehmers, die bei Lehman Brothers Bilanzen rechnet, kennt sie das Finanzsystem von beiden Seiten – als Opfer und als Komplizin.' },
      { name: 'Arthur Volkov', alter: 32, rolle: 'Der Visionär', text: 'Arthur vertraut Algorithmen mehr als Menschen – was ihn zu einem der brillantesten Kryptographen seiner Generation und zum schwierigsten Menschen macht, den man lieben kann.' },
      { name: 'Samuel Vaughn', alter: 31, rolle: 'Der Anker', text: 'Samuel ist der Realist des Trios – Sohn eines Ex-Army-Offiziers und einer deutschen Mutter, großgezogen in einer Familie, in der man Pflichten erfüllt, statt über sie zu sprechen.' }
    ],
    eckdaten: { gattung: 'Roman, Debüt', perspektive: 'personal, Lana und kontrapunktisch Samuel', zeit: 'Prolog 2001, Kernhandlung 2007 bis 2010, Epilog 2013', stand: 'Das Manuskript liegt vollständig vor; gerade entsteht die Endfassung.' }
  },

  // Ursprungstrilogie in zeitlicher Reihenfolge (für die Chronik)
  // Laut Exposé: Band I um 8000 v. Chr. in Göbekli Tepe, Band II in Uruk (Gilgamesch), Band III in Jerusalem zur Zeit des ersten Tempels
  ursprung: [
    { name: 'Göbekli Tepe', band: 'I', jahr: 'um 8000 v. Chr.', lat: 37.22, lon: 38.92 },
    { name: 'Uruk', band: 'II', jahr: 'um 2700 v. Chr.', volk: 'die Sumerer', lat: 31.32, lon: 45.64 },
    { name: 'Tyros', band: 'III', jahr: 'um 940 v. Chr.', volk: 'die Phönizier', lat: 33.27, lon: 35.20 },
    { name: 'Jerusalem', band: 'III', jahr: 'um 940 v. Chr.', volk: 'die Phönizier', lat: 31.78, lon: 35.22 }
  ],
  baende: {
    I: 'Göbekli Tepe in Südostanatolien, um 8000 v. Chr. Der älteste Tempel der Menschheit, und warum er von Menschenhand begraben wurde.',
    II: 'Uruk im Süden Mesopotamiens, um 2700 v. Chr. König Gilgamesch und die Geburt der Literatur.',
    III: 'Jerusalem zur Zeit des ersten Tempels, um 940 v. Chr. Eine phönizische Gelehrte und die Geburt der Heiligen Schrift.'
  },
  // Die Trilogie im Einzelnen. Stand nach Dominiks Wunsch nur „in Arbeit“.
  trilogie: {
    titel: 'Ursprung',
    untertitel: 'Eine Trilogie über die Anfänge der Zivilisation',
    stand: 'in Arbeit',
    herkunft: 'In Taiwan begann Dominik Jäkels Beschäftigung mit der Frühgeschichte des Menschen und die Arbeit an der Trilogie.',
    baende: [
      { band: 'I', titel: 'Kreise ohne Wiederkehr', ort: 'Göbekli Tepe', zeit: 'um 8000 v. Chr.', thema: 'Die Geburt der organisierten Religion und die Sesshaftwerdung',
        pitch: 'Als die Menschheit ihre Götter erfand – und beschloss, sie zu begraben.',
        frage: 'Warum wurde der älteste Tempel der Menschheit nach zweitausend Jahren Blütezeit absichtlich unter Unmengen von Schutt und Erde begraben?',
        text: 'Am ersten Tempel der Menschheit kämpft der Priester Jaromir – der mit nur 37 Sommern den Titel des „Ältesten“ trägt – um das Überleben seines Volkes. Die Winter werden kälter, die Ahnen wenden sich von den Menschen ab und die Jagdgründe versiegen. Zwischen den ersten sesshaften Bauern und den nomadischen Jägern des Umlands droht ein Krieg auszubrechen. Verzweifelt sucht Jaromir nach einem Schüler und Nachfolger, um die Verbindung zu den Ahnen wiederherzustellen. Doch als er gezwungen wird, die gefangene Jägerin Kannika in sein Dorf aufzunehmen, gerät nicht nur sein Glaube, sondern alles, wofür er jemals einstand, ins Wanken.' },
      { band: 'II', titel: 'Von dem König, der niemals sterben wollte', arbeitstitel: true, ort: 'Uruk', zeit: 'um 2700 v. Chr.', thema: 'Die Geburt der Literatur: Die Schrift wird von einer Sprache der Verwaltung zu einer Sprache der Mythen und Legenden',
        text: 'Der junge Schreiberlehrling Harran bricht auf, um seine Schwester Samhat zu retten, die König Gilgamesch entführt hat. Er trifft auf einen Herrscher, der von der Angst vor dem Tod besessen ist und nach Unsterblichkeit strebt. Harran erkennt, dass er den König nicht mit Gewalt besiegen kann, sondern nur, wenn er ihm eine Geschichte schreibt.' },
      { band: 'III', titel: 'Das steinerne Wort', arbeitstitel: true, ort: 'Jerusalem', zeit: 'um 940 v. Chr.', thema: 'Die Geburt der Heiligen Schrift als politisches Werkzeug',
        text: 'Die phönizische Gelehrte Thyra, eine Meisterin aller Mythen der Mittelmeervölker, strandet in Jerusalem. Dort zwingt sie der alternde König Salomo, ihm bei seinem Monumentalwerk zu helfen: aus den vielen Göttern seines zerfallenden Reiches einen einzigen, allmächtigen Gott zu schaffen, um sein zerstrittenes Volk zu einen.' }
    ]
  },

  // Eigene Werke für die Bibliothek
  werke: [
    // titel ist der kurze Rückentitel, buchtitel der Titel des Romans
    { id: 'satoshi', titel: 'Satoshi', buchtitel: 'Satoshi', art: 'Roman', stand: 'wird gerade abgeschlossen', text: 'Am 31. Oktober 2008 erschienen neun Seiten, die das Geld neu erfinden sollten. Ihr Verfasser hat nie existiert. Verschwinden musste er trotzdem.', ebene: 'satoshi' },
    { id: 'ursprung-1', titel: 'Ursprung I', buchtitel: 'Kreise ohne Wiederkehr', art: 'Roman, Band I der Ursprungstrilogie', stand: 'in Arbeit', band: 'I', ebene: 'ursprung' },
    { id: 'ursprung-2', titel: 'Ursprung II', buchtitel: 'Von dem König, der niemals sterben wollte', arbeitstitel: true, art: 'Roman, Band II der Ursprungstrilogie', stand: 'in Arbeit', band: 'II', ebene: 'ursprung' },
    { id: 'ursprung-3', titel: 'Ursprung III', buchtitel: 'Das steinerne Wort', arbeitstitel: true, art: 'Roman, Band III der Ursprungstrilogie', stand: 'in Arbeit', band: 'III', ebene: 'ursprung' },
    { id: 'erzaehlungen', titel: 'Erzählungen', buchtitel: 'Erzählungen', art: 'Kurzgeschichten', stand: '', text: 'Viele davon hat er auf der Werkstattbühne des Autorenforums Berlin gelesen.' },
    { id: 'untertext', titel: 'Untertext', buchtitel: 'Untertext', art: 'Journal', stand: '' },
    { id: 'laender', titel: 'Länder', buchtitel: 'Länder', art: 'Länderguides', stand: 'in Arbeit' }
  ],

  // Beispieltexte für das Journal Untertext
  journal: [
    { titel: 'Der blinde Bibliothekar', datum: '2026-10-12', rubrik: 'Literatur', teaser: 'Warum Borges mehr über das Reisen wusste als jeder Reiseführer.' },
    { titel: 'Die leise Erosion', datum: '2026-09-14', rubrik: 'Politik', teaser: 'Institutionen sterben selten an einem Tag.' },
    { titel: 'Das langsamste Medium der Welt', datum: '2026-08-17', rubrik: 'Aufmerksamkeit', teaser: 'Ein Plädoyer für Bücher, die man nicht nebenbei lesen kann.' }
  ],

  regale: { gelesen: 'Gelesen', gerade: 'Gerade', kindheit: 'Kindheit und Jugend', abgebrochen: 'Nicht zu Ende gelesen', leseliste: 'Als Nächstes', 'lieber-nicht': 'Lieber nicht' }
};
