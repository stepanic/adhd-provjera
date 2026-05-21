# ADHD provjera

PWA aplikacija za **offline samoprocjenu simptoma ADHD-a u odraslih** prema
validiranom upitniku **ASRS v1.1** Svjetske zdravstvene organizacije i Harvard
Medical School.

Sva obrada odgovora odvija se **isključivo u pregledniku korisnika** — nijedan
odgovor ne napušta uređaj, nema backenda, nema analitike, nema kolačića.

> ⚠️ **Ovo nije medicinska dijagnoza.** Rezultat je orijentacijski indikator
> samoprocijenjenih simptoma. ADHD u odraslih dijagnosticira isključivo
> **psihijatar** ili **klinički psiholog** kroz detaljnu kliničku procjenu. Ako
> vam rezultat ili vlastiti doživljaj sugeriraju značajne poteškoće, obratite se
> obiteljskom liječniku radi upute na specijalističku obradu.

## Stack

Iznova izgrađen u **istom tehničkom stilu kao Gnosis Pay** (`app.gnosispay.com`):

| Sloj | Tehnologija |
|---|---|
| Build tool | **Vite 5** (chunked hashed assets, `/assets/index-[hash].js`) |
| Framework | **React 18** + **TypeScript** (strict) |
| UI primitives | **Radix UI** (`@radix-ui/react-radio-group`) — accessible iz prve |
| Styling | **Tailwind CSS** s `brand` paletom |
| PWA | **vite-plugin-pwa** + **Workbox** (autoUpdate, precache, offline) |
| Routing | jednostavan state-machine u Reactu (3 koraka — nema potrebe za routerom) |

Bundle: ~174 KB main (~57 KB gzip), plus mali Workbox runtime. Service worker
pre-cache-a sve assete na prvu posjetu — sljedeća otvaranja su instant i rade
**potpuno offline**.

## Što aplikacija radi

- Dvije verzije upitnika:
  - **Kratka** — 6 pitanja (Dio A, ASRS screener)
  - **Puna** — 18 pitanja (cijeli ASRS Symptom Checklist)
- 5-stupanjska Likertova ljestvica: *Nikad / Rijetko / Ponekad / Često / Vrlo često*
- Uz svako pitanje **ilustrativni primjer iz svakodnevnog života** (neutralan,
  vizualno odvojen od izvornog teksta pitanja)
- Rezultat: **indikator simptoma 0–100**, broj pozitivnih u Dijelu A
  (≥ 4 = pozitivan screener), kategorijska interpretacija i preporuka

## Pokretanje lokalno

Potreban Node.js 20+ i npm.

```bash
npm install
npm run dev        # razvojni server, http://localhost:5173/
npm run build      # produkcijski build u dist/
npm run preview    # serviraj produkcijski build lokalno
```

Za build s ne-root base path-om:
```bash
VITE_BASE=/adhd-provjera/ npm run build
```

## PWA i self-update

Aplikacija je **instalabilna** ("Add to Home Screen" / "Install app") na svim
modernim preglednicima. Service worker:

- pri **autoUpdate** strategiji automatski preuzima novi build u pozadini i
  aktivira ga pri sljedećem otvaranju
- precache-a sve statičke assete pa app radi **potpuno offline** nakon prve
  posjete
- koristi Workbox za upravljanje cache-em (cleanup zastarjelih verzija)

## Hostanje

Produkcijski build je čisto statički (HTML + JS + CSS + service worker). Hosta
se s bilo kojeg statičkog hostinga (GitHub Pages, Netlify, Cloudflare Pages,
vlastiti web). Bez backenda.

## Izvori

- Kessler RC, Adler L, Ames M, et al. *The World Health Organization Adult ADHD
  Self-Report Scale (ASRS): a short screening scale for use in the general
  population.* Psychol Med. 2005;35(2):245–256.
- WHO / Harvard Medical School ASRS: <https://www.hcp.med.harvard.edu/ncs/asrs.php>

Hrvatski prijevodi pitanja u ovoj aplikaciji su radni i nisu službeno validirana
hrvatska inačica upitnika.

**Napomena o primjerima:** uz svako pitanje aplikacija prikazuje kratki
ilustrativni primjer iz svakodnevnog života radi lakšeg razumijevanja. Primjeri
**nisu dio službenog ASRS upitnika**, vizualno su odvojeni od pitanja i napisani
neutralno (ne sugeriraju određeni odgovor). Izvorni tekst svakog pitanja preuzet
je iz ASRS v1.1.

## Gdje se prijaviti na službeno testiranje (Hrvatska)

- **Obiteljski liječnik** — prvi kontakt; izdaje uputnicu prema specijalistu.
- **Psihijatrijska ambulanta** u kliničkim bolničkim centrima i općim bolnicama.
- **Centri za mentalno zdravlje** pri županijskim zavodima za javno zdravstvo.
- **Privatni klinički psiholozi** i **psihijatri** specijalizirani za ADHD u
  odraslih.

Ponesite rezultat ove provjere na pregled isključivo kao **orijentacijsku
informaciju**.

## Licenca

Izvorni kod: MIT.
Upitnik ASRS v1.1: vlasništvo World Health Organization, slobodno dostupan za
kliničku i istraživačku upotrebu.
