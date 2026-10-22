/* Texte zum Lesen: Erzählungen, Einträge im Journal Untertext und Länderguides.
   Ein Text ist ein Eintrag in der Liste unten. erzaehlungen.html und untertext.html listen ihn, auf laender.html führt die Tafel
   seines Lands zu einem Länderguide, lesen.html#<slug> zeigt jeden. Alle Seiten lesen die Einträge über FSeite.texte (seite.js).
   Von Hand gepflegt; das Werkzeug in werkzeuge/ fasst diese Datei nicht an.

   Felder eines Eintrags:
     slug        Adresse des Textes: Kleinbuchstaben, Ziffern und Bindestriche, ohne Umlaute, einmalig
                 (aus „Titel der Erzählung“ wird 'titel-der-erzaehlung'; der Text steht dann unter
                 lesen.html#titel-der-erzaehlung). Nicht 'inhalt' oder 'kontakt': so heißen schon Stellen der Seite.
     art         'erzaehlung' (erscheint unter Erzählungen), 'untertext' (erscheint im Untertext) oder
                 'laenderguide' (erscheint auf der Tafel seines Lands unter Länder, als Verweis „Zum Länderguide“)
     land        nur beim Länderguide, und dort nötig: der ISO-Code des Lands wie in daten/inhalt.js (bereist),
                 etwa 'TW' für Taiwan, 'GB-SCT' für Schottland
     titel       Titel des Textes
     untertitel  wahlweise, eine kurze Zeile unter dem Titel
     datum       'JJJJ-MM-TT', 'JJJJ-MM' oder 'JJJJ'; wird zu „14. März 2026“, „März 2026“ oder „2026“.
                 Beide Listen stehen nach diesem Datum, das neueste zuerst.
     ort         wahlweise, steht mit dem Datum unter dem Titel: 'Berlin' oder mit Koordinaten
                 { name: 'Berlin', lat: 52.52, lon: 13.405 } (Süden und Westen negativ) → „52° 31′ N, 13° 24′ O“
     absaetze    der Text, ein Eintrag je Absatz. Gerade Anführungszeichen werden zu „…“, einfache am Wortanfang mit
                 passendem Ende zu ‚…‘, jedes andere ' zu ’ (geht’s, Grass’), ... zu …, ' - ' zu ' – '.
                 <i>…</i> setzt kursiv; ein Absatz '***' ist ein Szenenwechsel.
     html        statt absaetze: der ganze Text als HTML ('<p>…</p><p>…</p>'), wird unverändert übernommen
     notiz       wahlweise, ein Satz am Ende des Textes, etwa 'Vorgetragen auf der Werkstattbühne des Autorenforums Berlin e.\u00a0V.'

   Ein neuer Text: das Beispiel unten kopieren, die Zeichen // am Zeilenanfang entfernen, die Felder füllen.
   Jeder Eintrag endet mit einem Komma. */
window.TEXTE = [
  // {
  //   slug: 'titel-der-erzaehlung',
  //   art: 'erzaehlung',
  //   titel: 'Titel der Erzählung',
  //   untertitel: 'Untertitel, wenn es einen gibt',
  //   datum: '2026-03-14',
  //   ort: { name: 'Berlin', lat: 52.52, lon: 13.405 },
  //   absaetze: [
  //     'Erster Absatz.',
  //     'Zweiter Absatz, mit einem <i>kursiven</i> Wort und "wörtlicher Rede".',
  //     '***',
  //     'Erster Absatz nach dem Szenenwechsel.'
  //   ],
  //   notiz: 'Vorgetragen auf der Werkstattbühne des Autorenforums Berlin e.\u00a0V.'
  // },
];
