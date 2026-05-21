// ASRS v1.1 — Adult ADHD Self-Report Scale (WHO / Harvard Medical School)
// Izvor: Kessler RC, et al. The World Health Organization Adult ADHD Self-Report Scale (ASRS).
// Psychol Med. 2005;35(2):245-256. https://www.hcp.med.harvard.edu/ncs/asrs.php
//
// Ovaj kod je obrazovni alat za samoprocjenu — NIJE klinička dijagnoza.

export type Odgovor = 0 | 1 | 2 | 3 | 4;

export interface Pitanje {
  redni: number;
  tekst: string;
  prag: 2 | 3; // minimalna vrijednost odgovora koja se smatra "pozitivnom"
  dio: 'A' | 'B';
}

export const OPCIJE_ODGOVORA: { vrijednost: Odgovor; oznaka: string }[] = [
  { vrijednost: 0, oznaka: 'Nikad' },
  { vrijednost: 1, oznaka: 'Rijetko' },
  { vrijednost: 2, oznaka: 'Ponekad' },
  { vrijednost: 3, oznaka: 'Često' },
  { vrijednost: 4, oznaka: 'Vrlo često' },
];

// Pragovi pozitivnog odgovora prema standardnom ASRS v1.1 obrascu bodovanja.
// Pitanja 1-6 čine Dio A (screener); 4 ili više pozitivnih u Dijelu A upućuje
// na simptome konzistentne s ADHD-om i preporuča se klinička procjena.
export const PITANJA: Pitanje[] = [
  { redni: 1,  dio: 'A', prag: 2, tekst: 'Koliko često imate problema s privođenjem zadatka kraju, nakon što su izazovni dijelovi obavljeni?' },
  { redni: 2,  dio: 'A', prag: 2, tekst: 'Koliko često imate poteškoća pri organiziranju i posloživanju stvari kad morate obaviti zadatak koji zahtijeva organizaciju?' },
  { redni: 3,  dio: 'A', prag: 2, tekst: 'Koliko često imate problema sa sjećanjem na sastanke ili obveze?' },
  { redni: 4,  dio: 'A', prag: 3, tekst: 'Kad imate zadatak koji zahtijeva mnogo razmišljanja, koliko često izbjegavate ili odgađate njegov početak?' },
  { redni: 5,  dio: 'A', prag: 3, tekst: 'Koliko često se vrpoljite ili migoljite rukama ili nogama kad morate dugo sjediti?' },
  { redni: 6,  dio: 'A', prag: 3, tekst: 'Koliko često osjećate da ste pretjerano aktivni i prisiljeni činiti stvari, kao da vas nešto pokreće motorom?' },
  { redni: 7,  dio: 'B', prag: 3, tekst: 'Koliko često radite nemarne pogreške kada radite na dosadnom ili teškom projektu?' },
  { redni: 8,  dio: 'B', prag: 3, tekst: 'Koliko često imate poteškoća s održavanjem pažnje kada radite dosadan ili ponavljajući posao?' },
  { redni: 9,  dio: 'B', prag: 2, tekst: 'Koliko često imate poteškoća s usredotočenjem na ono što vam ljudi govore, čak i kad razgovaraju izravno s vama?' },
  { redni: 10, dio: 'B', prag: 2, tekst: 'Koliko često ostavljate stvari na krivim mjestima ili imate poteškoća s pronalaženjem stvari kod kuće ili na poslu?' },
  { redni: 11, dio: 'B', prag: 2, tekst: 'Koliko često vas ometa aktivnost ili buka oko vas?' },
  { redni: 12, dio: 'B', prag: 2, tekst: 'Koliko često ustajete sa stolice na sastancima ili u drugim situacijama u kojima se očekuje da ostanete sjediti?' },
  { redni: 13, dio: 'B', prag: 3, tekst: 'Koliko često osjećate nemir ili nervozu?' },
  { redni: 14, dio: 'B', prag: 3, tekst: 'Koliko često imate poteškoća s opuštanjem kad imate vremena za sebe?' },
  { redni: 15, dio: 'B', prag: 3, tekst: 'Koliko često se uhvatite kako previše pričate u društvenim situacijama?' },
  { redni: 16, dio: 'B', prag: 2, tekst: 'Koliko često, dok ste u razgovoru, dovršavate rečenice drugih osoba prije nego što ih oni mogu sami dovršiti?' },
  { redni: 17, dio: 'B', prag: 3, tekst: 'Koliko često imate poteškoća s čekanjem reda u situacijama kad je potrebno čekati?' },
  { redni: 18, dio: 'B', prag: 3, tekst: 'Koliko često prekidate druge dok su zauzeti?' },
];

export const PITANJA_KRATKO = PITANJA.filter(p => p.dio === 'A'); // 6 pitanja
export const PITANJA_PUNO = PITANJA;                              // 18 pitanja

export interface Rezultat {
  indikator: number;          // 0–100
  pozitivnoA: number;         // broj pozitivnih u Dijelu A (0–6)
  pozitivnoUkupno: number;    // broj pozitivnih ukupno
  ukupnoSum: number;          // zbroj svih odgovora (raw score)
  maxSum: number;             // teorijski maksimum zbroja
  screenerPozitivan: boolean; // ≥4 pozitivnih u Dijelu A
  kategorija: 'niska' | 'blaga' | 'umjerena' | 'izrazena';
  porukaKategorije: string;
}

export function izracunaj(pitanja: Pitanje[], odgovori: (Odgovor | null)[]): Rezultat {
  let pozitivnoA = 0;
  let pozitivnoUkupno = 0;
  let ukupnoSum = 0;

  pitanja.forEach((p, i) => {
    const o = odgovori[i];
    if (o == null) return;
    ukupnoSum += o;
    if (o >= p.prag) {
      pozitivnoUkupno++;
      if (p.dio === 'A') pozitivnoA++;
    }
  });

  const maxSum = pitanja.length * 4;
  const indikator = Math.round((ukupnoSum / maxSum) * 100);
  const screenerPozitivan = pozitivnoA >= 4;

  let kategorija: Rezultat['kategorija'];
  let porukaKategorije: string;
  if (indikator < 25) {
    kategorija = 'niska';
    porukaKategorije = 'Niska razina prijavljenih simptoma. Rezultat ne ukazuje na izraženu prisutnost simptoma ADHD-a.';
  } else if (indikator < 50) {
    kategorija = 'blaga';
    porukaKategorije = 'Blaže izraženi simptomi. Pojedini simptomi su prisutni, ali ne nužno u kliničkom obliku.';
  } else if (indikator < 75) {
    kategorija = 'umjerena';
    porukaKategorije = 'Umjereno do značajno izraženi simptomi. Preporuča se razgovor sa stručnjakom.';
  } else {
    kategorija = 'izrazena';
    porukaKategorije = 'Vrlo izraženi simptomi konzistentni s ADHD-om. Preporuča se stručna klinička procjena.';
  }

  return {
    indikator,
    pozitivnoA,
    pozitivnoUkupno,
    ukupnoSum,
    maxSum,
    screenerPozitivan,
    kategorija,
    porukaKategorije,
  };
}
