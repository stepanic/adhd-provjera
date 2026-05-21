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
    <section className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_6px_24px_rgba(40,50,90,0.08)] mb-6">
      <div
        className="h-2 bg-[#e6ebf5] rounded-full overflow-hidden mb-3"
        aria-label={`Napredak ${napredak} posto`}
      >
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 transition-[width] duration-300"
          style={{ width: `${napredak}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-sm text-[#5a627a] mb-4">
        <span>
          Pitanje {indeks + 1} od {ukupno}
        </span>
        <span className="bg-[#eef0f8] rounded-full px-3 py-0.5 text-xs">
          Dio {pitanje.dio}
        </span>
      </div>

      <h2 className="text-lg sm:text-xl font-medium text-[#1a1f2c] leading-snug mt-0 mb-4">
        {pitanje.tekst}
      </h2>

      <aside className="bg-[#f0f4fc] border-l-[3px] border-[#8aa0d6] rounded-md px-4 py-3 mb-5 text-[14px] text-[#3c4868] italic leading-relaxed">
        <span className="inline-block bg-[#8aa0d6] text-white not-italic font-semibold text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full mr-2 align-middle">
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
                  ? 'bg-brand-500 text-white border-brand-600'
                  : 'bg-[#f6f8fc] text-[#1a1f2c] border-[#dbe2f0] hover:bg-[#eef2fa]',
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
          className="bg-white border border-[#c8d0e0] text-[#2d3a66] rounded-xl px-4 py-3 hover:bg-[#f0f3fa] disabled:opacity-45 disabled:cursor-not-allowed"
        >
          ← Natrag
        </button>
        <button
          type="button"
          onClick={onNaprijed}
          disabled={!mozeNaprijed}
          className="bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl px-4 py-3 disabled:opacity-45 disabled:cursor-not-allowed"
        >
          {zadnje ? 'Prikaži rezultat' : 'Sljedeće →'}
        </button>
      </div>
    </section>
  );
}
