import type { Verzija } from '../App';

interface Props {
  onStart: (v: Verzija) => void;
}

export function Welcome({ onStart }: Props) {
  return (
    <section className="bg-white border border-domovina-border rounded-2xl p-6 sm:p-7 shadow-card mb-6">
      <h2 className="text-2xl font-bold text-domovina-navy mt-0">Dobrodošli</h2>

      <p className="text-[15px] leading-relaxed">
        Ova aplikacija provodi <strong>samoprocjenu</strong> simptoma ADHD-a u odraslih
        koristeći upitnik <strong>ASRS v1.1</strong> Svjetske zdravstvene organizacije
        i Harvard Medical School. Sva obrada odgovora odvija se isključivo u vašem
        pregledniku — ništa se ne šalje na internet.
      </p>

      <div className="bg-domovina-red-soft border-l-4 border-domovina-red rounded-md px-4 py-3 my-4 text-[15px]">
        <strong>Važno:</strong> rezultat ove provjere <em>nije medicinska dijagnoza</em>.
        ADHD može dijagnosticirati isključivo kvalificirani liječnik (psihijatar) ili
        klinički psiholog kroz detaljnu kliničku procjenu. Ako vam rezultat ili vlastiti
        doživljaj sugeriraju značajne poteškoće, obratite se obiteljskom liječniku radi
        upute na specijalističku obradu.
      </div>

      <h3 className="text-lg font-semibold text-domovina-navy mb-2 mt-4">
        Odaberite verziju upitnika
      </h3>

      <div className="grid gap-3">
        <button
          type="button"
          onClick={() => onStart('kratko')}
          className="bg-domovina-navy hover:bg-domovina-navy-600 active:scale-[0.99] transition text-white font-semibold rounded-xl py-4 px-4 text-center"
        >
          <div>Kratka verzija (6 pitanja)</div>
          <div className="font-normal text-sm opacity-85 mt-1">
            Screener — brza okvirna provjera
          </div>
        </button>
        <button
          type="button"
          onClick={() => onStart('puno')}
          className="bg-white border border-domovina-navy text-domovina-navy hover:bg-domovina-navy-50 active:scale-[0.99] transition font-semibold rounded-xl py-4 px-4 text-center"
        >
          <div>Puna verzija (18 pitanja)</div>
          <div className="font-normal text-sm opacity-85 mt-1">
            Detaljni upitnik svih simptoma
          </div>
        </button>
      </div>
    </section>
  );
}
