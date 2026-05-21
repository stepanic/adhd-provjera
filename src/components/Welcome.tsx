import type { Verzija } from '../App';

interface Props {
  onStart: (v: Verzija) => void;
}

export function Welcome({ onStart }: Props) {
  return (
    <section className="bg-white rounded-2xl p-7 shadow-[0_6px_24px_rgba(40,50,90,0.08)] mb-6">
      <h2 className="text-2xl font-semibold text-[#2d3a66] mt-0">Dobrodošli</h2>

      <p className="text-[15px] leading-relaxed">
        Ova aplikacija provodi <strong>samoprocjenu</strong> simptoma ADHD-a u odraslih
        koristeći upitnik <strong>ASRS v1.1</strong> Svjetske zdravstvene organizacije
        i Harvard Medical School. Sva obrada odgovora odvija se isključivo u vašem
        pregledniku — ništa se ne šalje na internet.
      </p>

      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-md px-4 py-3 my-4 text-[15px]">
        <strong>Važno:</strong> rezultat ove provjere <em>nije medicinska dijagnoza</em>.
        ADHD može dijagnosticirati isključivo kvalificirani liječnik (psihijatar) ili
        klinički psiholog kroz detaljnu kliničku procjenu. Ako vam rezultat ili vlastiti
        doživljaj sugeriraju značajne poteškoće, obratite se obiteljskom liječniku radi
        upute na specijalističku obradu.
      </div>

      <h3 className="text-lg font-semibold text-[#2d3a66] mb-2 mt-4">
        Odaberite verziju upitnika
      </h3>

      <div className="grid gap-3">
        <button
          type="button"
          onClick={() => onStart('kratko')}
          className="bg-brand-500 hover:bg-brand-600 active:scale-[0.99] transition text-white font-semibold rounded-xl py-4 px-4 text-center"
        >
          <div>Kratka verzija (6 pitanja)</div>
          <div className="font-normal text-sm opacity-85 mt-1">
            Screener — brza okvirna provjera
          </div>
        </button>
        <button
          type="button"
          onClick={() => onStart('puno')}
          className="bg-brand-500 hover:bg-brand-600 active:scale-[0.99] transition text-white font-semibold rounded-xl py-4 px-4 text-center"
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
