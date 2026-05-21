import { Component, computed, signal } from '@angular/core';
import {
  izracunaj,
  OPCIJE_ODGOVORA,
  Odgovor,
  Pitanje,
  PITANJA_KRATKO,
  PITANJA_PUNO,
  Rezultat,
} from './asrs';

type Korak = 'pocetak' | 'upitnik' | 'rezultat';
type Verzija = 'kratko' | 'puno';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly opcije = OPCIJE_ODGOVORA;
  readonly korak = signal<Korak>('pocetak');
  readonly verzija = signal<Verzija>('kratko');
  readonly odgovori = signal<(Odgovor | null)[]>([]);
  readonly trenutni = signal<number>(0);

  readonly pitanja = computed<Pitanje[]>(() =>
    this.verzija() === 'kratko' ? PITANJA_KRATKO : PITANJA_PUNO,
  );

  readonly pitanje = computed<Pitanje>(() => this.pitanja()[this.trenutni()]);

  readonly napredak = computed<number>(() =>
    Math.round(((this.trenutni() + 1) / this.pitanja().length) * 100),
  );

  readonly rezultat = computed<Rezultat>(() => izracunaj(this.pitanja(), this.odgovori()));

  readonly mozeNatrag = computed<boolean>(() => this.trenutni() > 0);

  readonly mozeNaprijed = computed<boolean>(
    () => this.odgovori()[this.trenutni()] != null,
  );

  readonly zadnjePitanje = computed<boolean>(
    () => this.trenutni() === this.pitanja().length - 1,
  );

  zapocni(v: Verzija) {
    this.verzija.set(v);
    this.odgovori.set(new Array(this.pitanja().length).fill(null));
    this.trenutni.set(0);
    this.korak.set('upitnik');
  }

  odgovori_klik(o: Odgovor) {
    const arr = [...this.odgovori()];
    arr[this.trenutni()] = o;
    this.odgovori.set(arr);
  }

  natrag() {
    if (this.mozeNatrag()) this.trenutni.set(this.trenutni() - 1);
  }

  naprijed() {
    if (!this.mozeNaprijed()) return;
    if (this.zadnjePitanje()) {
      this.korak.set('rezultat');
    } else {
      this.trenutni.set(this.trenutni() + 1);
    }
  }

  ispocetka() {
    this.odgovori.set([]);
    this.trenutni.set(0);
    this.korak.set('pocetak');
  }
}
