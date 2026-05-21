import * as RadioGroup from '@radix-ui/react-radio-group';
import { OPCIJE_ODGOVORA, Odgovor, Pitanje } from '../data/asrs';
import { cn } from '../lib/cn';

interface Props {
  pitanje: Pitanje;
  ukupno: number;
  indeks: number;
  odgovor: Odgovor | null;
  onOdgovor: (o: Odgovor) => void;
  onNatrag: () => void;
  onNaprijed: () => void;
}

export function Question({
  pitanje,
  ukupno,
  indeks,
  odgovor,
  onOdgovor,
  onNatrag,
  onNaprijed,
}: Props) {
  const napredak = Math.round(((indeks + 1) / ukupno) * 100);
  const zadnje = indeks === ukupno - 1;
  const mozeNatrag = indeks > 0;
  const mozeNaprijed = odgovor != null;

  return (
    <section className="bg-white border border-domovina-border rounded-2xl p-6 sm:p-7 shadow-card mb-6">
      <div
        className="h-2 bg-domovina-navy-50 rounded-full overflow-hidden mb-3"
        aria-label={`Napredak ${napredak} posto`}
      >
        <div
          className="h-full bg-domovina-navy transition-[width] duration-300"
          style={{ width: `${napredak}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-sm text-domovina-muted mb-4">
        <span>
          Pitanje {indeks + 1} od {ukupno}
        </span>
        <span className="bg-domovina-navy-50 text-domovina-navy rounded-full px-3 py-0.5 text-xs font-semibold">
          Dio {pitanje.dio}
        </span>
      </div>

      <h2 className="text-lg sm:text-xl font-semibold text-domovina-ink leading-snug mt-0 mb-4">
        {pitanje.tekst}
      </h2>

      <aside className="bg-domovina-navy-50 border-l-[3px] border-domovina-navy rounded-md px-4 py-3 mb-5 text-[14px] text-domovina-ink/80 italic leading-relaxed">
        <span className="inline-block bg-domovina-navy text-white not-italic font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full mr-2 align-middle">
          Primjer
        </span>
        {pitanje.primjer}
      </aside>

      <RadioGroup.Root
        value={odgovor != null ? String(odgovor) : ''}
        onValueChange={v => onOdgovor(Number(v) as Odgovor)}
        className="grid gap-2 mb-5"
        aria-label={pitanje.tekst}
      >
        {OPCIJE_ODGOVORA.map(o => {
          const odabran = odgovor === o.vrijednost;
          return (
            <RadioGroup.Item
              key={o.vrijednost}
              value={String(o.vrijednost)}
              className={cn(
                'group text-left rounded-xl px-4 py-3.5 border transition font-medium',
                odabran
                  ? 'bg-domovina-navy text-white border-domovina-navy-700'
                  : 'bg-white text-domovina-ink border-domovina-border hover:bg-domovina-navy-50',
              )}
            >
              {o.oznaka}
            </RadioGroup.Item>
          );
        })}
      </RadioGroup.Root>

      <div className="flex justify-between gap-3 flex-col-reverse sm:flex-row">
        <button
          type="button"
          onClick={onNatrag}
          disabled={!mozeNatrag}
          className="bg-white border border-domovina-border text-domovina-navy rounded-xl px-4 py-3 hover:bg-domovina-navy-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Natrag
        </button>
        <button
          type="button"
          onClick={onNaprijed}
          disabled={!mozeNaprijed}
          className="bg-domovina-navy hover:bg-domovina-navy-600 text-white font-semibold rounded-xl px-4 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {zadnje ? 'Prikaži rezultat' : 'Sljedeće →'}
        </button>
      </div>
    </section>
  );
}
