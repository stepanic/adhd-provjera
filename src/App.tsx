import { useMemo, useState } from 'react';
import {
  izracunaj,
  Odgovor,
  PITANJA_KRATKO,
  PITANJA_PUNO,
} from './data/asrs';
import { Welcome } from './components/Welcome';
import { Question } from './components/Question';
import { Result } from './components/Result';

type Korak = 'pocetak' | 'upitnik' | 'rezultat';
export type Verzija = 'kratko' | 'puno';

export default function App() {
  const [korak, setKorak] = useState<Korak>('pocetak');
  const [verzija, setVerzija] = useState<Verzija>('kratko');
  const [trenutni, setTrenutni] = useState(0);
  const [odgovori, setOdgovori] = useState<(Odgovor | null)[]>([]);

  const pitanja = useMemo(
    () => (verzija === 'kratko' ? PITANJA_KRATKO : PITANJA_PUNO),
    [verzija],
  );

  const rezultat = useMemo(() => izracunaj(pitanja, odgovori), [pitanja, odgovori]);

  const zapocni = (v: Verzija) => {
    const lista = v === 'kratko' ? PITANJA_KRATKO : PITANJA_PUNO;
    setVerzija(v);
    setOdgovori(new Array(lista.length).fill(null));
    setTrenutni(0);
    setKorak('upitnik');
  };

  const postaviOdgovor = (o: Odgovor) => {
    const arr = [...odgovori];
    arr[trenutni] = o;
    setOdgovori(arr);
  };

  const naprijed = () => {
    if (odgovori[trenutni] == null) return;
    if (trenutni === pitanja.length - 1) {
      setKorak('rezultat');
    } else {
      setTrenutni(trenutni + 1);
    }
  };

  const natrag = () => {
    if (trenutni > 0) setTrenutni(trenutni - 1);
  };

  const ispocetka = () => {
    setOdgovori([]);
    setTrenutni(0);
    setKorak('pocetak');
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 pb-12">
      <header className="text-center pt-4 pb-8">
        <h1 className="text-3xl font-bold text-[#2d3a66] m-0">ADHD provjera</h1>
        <p className="mt-1 text-sm text-[#5a627a]">
          Offline alat za samoprocjenu prema ASRS v1.1
        </p>
      </header>

      {korak === 'pocetak' && <Welcome onStart={zapocni} />}

      {korak === 'upitnik' && (
        <Question
          pitanje={pitanja[trenutni]}
          ukupno={pitanja.length}
          indeks={trenutni}
          odgovor={odgovori[trenutni]}
          onOdgovor={postaviOdgovor}
          onNatrag={natrag}
          onNaprijed={naprijed}
        />
      )}

      {korak === 'rezultat' && (
        <Result
          rezultat={rezultat}
          ukupno={pitanja.length}
          onIspocetka={ispocetka}
        />
      )}

      <footer className="text-center text-xs text-[#5a627a] px-2">
        <p>
          Izvor upitnika: ASRS v1.1 — World Health Organization &amp; Harvard Medical
          School (Kessler i sur., 2005). Aplikacija radi 100&nbsp;% offline; nijedan
          odgovor ne napušta vaš preglednik.
        </p>
      </footer>
    </main>
  );
}
