import type { Kategorija, Rezultat } from '../data/asrs';

interface Props {
  rezultat: Rezultat;
  ukupno: number;
  onIspocetka: () => void;
}

// Kategorije idu od smirene navy preko bijele do crvenog naglaska.
const BOJE_KATEGORIJA: Record<Kategorija, string> = {
  niska: 'bg-domovina-navy-50',
  blaga: 'bg-domovina-navy-100',
  umjerena: 'bg-amber-50',
  izrazena: 'bg-domovina-red-soft',
};

export function Result({ rezultat, ukupno, onIspocetka }: Props) {
  return (
    <section className="bg-white border border-domovina-border rounded-2xl p-6 sm:p-7 shadow-card mb-6">
      <h2 className="text-2xl font-bold text-domovina-navy mt-0 mb-4">Vaš rezultat</h2>

      <div
        className={`text-center rounded-xl py-5 px-4 ${BOJE_KATEGORIJA[rezultat.kategorija]}`}
      >
        <div className="text-5xl font-extrabold text-domovina-navy leading-none">
          {rezultat.indikator}
        </div>
        <div className="text-sm text-domovina-muted mt-1">
          indikator simptoma (0–100)
        </div>
      </div>

      <div className="h-3.5 bg-domovina-navy-50 rounded-full overflow-hidden mt-4 mb-2">
        <div
          className="h-full bg-gradient-to-r from-domovina-navy via-amber-400 to-domovina-red transition-[width] duration-500"
          style={{ width: `${rezultat.indikator}%` }}
        />
      </div>

      <p className="text-[15px] my-4">{rezultat.porukaKategorije}</p>

      <dl className="grid gap-2 my-4">
        <Row label="Pozitivni odgovori (Dio A, screener)" value={`${rezultat.pozitivnoA} / 6`} />
        <Row label="Pozitivni odgovori ukupno" value={`${rezultat.pozitivnoUkupno} / ${ukupno}`} />
        <Row label="Sirovi zbroj" value={`${rezultat.ukupnoSum} / ${rezultat.maxSum}`} />
      </dl>

      {rezultat.screenerPozitivan && (
        <div className="bg-domovina-red-soft border-l-4 border-domovina-red rounded-md px-4 py-3 my-4 text-[15px]">
          <strong>Screener Dijela A je pozitivan</strong> (≥ 4 pozitivna odgovora u 6
          pitanja). Prema standardnoj ASRS interpretaciji, vaši simptomi su konzistentni
          s ADHD-om u odraslih i <strong>preporuča se daljnja klinička procjena</strong>.
        </div>
      )}

      <div className="bg-domovina-navy-50 border-l-4 border-domovina-navy rounded-md px-4 py-3 my-4 text-[15px]">
        <strong>Što sad?</strong>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>
            Razgovarajte s <strong>obiteljskim liječnikom</strong> i zatražite uputnicu
            prema psihijatru ili kliničkom psihologu.
          </li>
          <li>
            U Hrvatskoj se ADHD u odraslih dijagnosticira u{' '}
            <strong>psihijatrijskim ambulantama</strong> i{' '}
            <strong>centrima za mentalno zdravlje</strong>.
          </li>
          <li>
            Ovaj rezultat ponesite na pregled kao orijentacijsku informaciju —{' '}
            <em>nije zamjena za stručnu procjenu</em>.
          </li>
        </ul>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onIspocetka}
          className="bg-white border border-domovina-navy text-domovina-navy rounded-xl px-4 py-3 hover:bg-domovina-navy-50 font-semibold"
        >
          Ponovi provjeru
        </button>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-dashed border-domovina-border pb-1">
      <dt className="text-domovina-muted m-0">{label}</dt>
      <dd className="m-0 font-semibold text-domovina-ink">{value}</dd>
    </div>
  );
}
