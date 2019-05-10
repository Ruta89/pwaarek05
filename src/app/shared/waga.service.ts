import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Waga } from './waga';
import { Item } from '../wagi/waga-lista/waga-lista.component';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WagaService {
  waga;
  constructor() { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    wll: new FormControl(null, Validators.required),
    l1: new FormControl(null, Validators.required),
    czas: new FormControl(null),
    szt: new FormControl(null),
    partia: new FormControl(null),
    edit: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      wll: null,
      l1: null,
      czas: null,
      szt: null,
      partia: null,
      edit: false
    });
  }
  reset() {
    this.initializeFormGroup();
  }
  ustawIleSzpul(wll: number) {
    switch (wll) {
      case 1:
        return 1;
        break;
      case 2:
        return 2;
        break;
      case 3:
        return 3;
        break;
      case 4:
        return 2;
        break;
      case 5:
        return 3;
        break;
      case 6:
        return 4;
        break;
      case 8:
        return 5;
        break;
      case 10:
        return 6;
        break;
      case 15:
        return 6;
        break;
      case 20:
        return 12;
        break;
      case 25:
        return 12;
        break;
      case 30:
        return 12;
        break;
      case 35:
        return 12;
        break;
      case 40:
        return 12;
        break;
      case 45:
        return 12;
        break;
      case 50:
        return 12;
        break;
      case 60:
        return 12;
        break;
      case 200:
        return 12;
        break;
      case 100:
        return 12;
        break;

      default:
        return 0;
    }
  }
  ustawLicznik(wll, l1) {
    // console.log('wll: ' + wll + ', l1: ' + l1);
    let licznikMetr = 0;
    if (wll === 0.5) {
      licznikMetr = 20;
    }
    if (wll === 1) {
      licznikMetr = 22;
    }
    if (wll === 1.5) {
      licznikMetr = 17;
    }
    if (wll <= 4) {
      licznikMetr = 22;
    }
    if (wll > 4 && wll < 10) {
      licznikMetr = 20;
    }
    if (wll === 10) {
      licznikMetr = 24;
    }
    if (wll === 12) {
      licznikMetr = 28;
    }
    if (wll === 15) {
      licznikMetr = 36;
    }
    if (wll === 20) {
      licznikMetr = 26;
    }
    if (wll === 25) {
      licznikMetr = 32;
    }
    if (wll === 30) {
      licznikMetr = 38;
    }
    if (wll === 35) {
      licznikMetr = 44;
    }
    if (wll === 40) {
      licznikMetr = 50;
    }
    if (wll === 45) {
      licznikMetr = 54;
    }
    if (wll === 50) {
      licznikMetr = 64;
    }
    if (wll === 100) {
      licznikMetr = 126;
    }
    if (wll === 200) {
      licznikMetr = 252;
    }
    if (wll === 300) {
      licznikMetr = 384;
    }
    console.log('licznik: ' + licznikMetr * l1 + ', 1m: ' + licznikMetr);
    return licznikMetr * l1;
  }
  ustawWage(wll, dl) {
    const szpule = this.ustawIleSzpul(wll);
    const licznik = this.ustawLicznik(wll, dl);
    const nawinieto = licznik + (dl * 2 + 5);
    const zuzyto = (licznik + (dl * 2 + 5)) * szpule;
    if (wll < 4) {
      console.log(
        'nawinieto [66.000] ' +
        nawinieto +
        ' metrów, zuzyto: ' +
        zuzyto +
        ' metrów o wadze: ' +
        zuzyto * 0.0066
      );
      return zuzyto * 0.0066;
    } else if (wll > 3) {
      console.log(
        'nawinieto [132.000] ' +
        nawinieto +
        ' metrów, zuzyto: ' +
        zuzyto +
        ' metrów o wadze: ' +
        zuzyto * 0.0132
      );
      return zuzyto * 0.0132;
    } else {
      console.log('[service] Blad: ' + 0);
      return 0;
    }
  }
  updateS(s) {
    console.log('s update: ', s);
  }
  jakaZmiana() {
    const teraz = new Date();
    const dzien = teraz.getDay();
    const godzina = teraz.getHours();
    const minuta = teraz.getMinutes();
    const time = teraz.getTime();
    const result = {}

    if (godzina >= 6 && godzina <= 14) {

      console.log('rano');
      let przerwaI = new Date(teraz).setHours(16, 30, 0);
      let przerwaIa = new Date(przerwaI).getTime() - new Date().getTime();
      let przerwaIb = Math.floor(przerwaIa / 60000);
      let przerwaIc = Math.floor(przerwaIb / 60);
      let przerwaId = Math.floor(przerwaIc % 60);
      return { zmiana: 'rano', przerwaI: przerwaI }
    }

    if (godzina >= 14 && godzina <= 22) {
      console.log('popołudnie');

      if (teraz.getHours() < 17) {
        let przerwaI = new Date(teraz).setHours(16, 30, 0);
        let przerwaIa = new Date(przerwaI).getTime() - new Date().getTime();
        let przerwaIb = Math.floor(przerwaIa / 60000);
        let przerwaIc = Math.floor(przerwaIb / 60);
        let przerwaId = Math.floor(przerwaIc % 60);
        console.log('I przerwa za: ' + przerwaIc + ':' + przerwaId);
        // alert('I przerwa za: ' + przerwaIc + ':' + przerwaId);

        let przerwa1 = przerwaIc + ':' + przerwaId;
        return { przerwaI: przerwa1 }
      }
      if (teraz.getHours() < 20) {
        let przerwaII = new Date(teraz).setHours(19, 30, 0);
        let timeEee = new Date(przerwaII).getTime() - new Date().getTime();
        let timeFff = Math.floor(timeEee / 60000);
        let timeGgg = Math.floor(timeFff / 60);
        let timeGggg = Math.floor(timeFff % 60);
        if (timeGgg >= 1) {
          console.log('II przerwa za: ' + timeGgg + ':' + timeGggg);
          // alert('II przerwa za: ' + timeGgg + ':' + timeGggg)

          let przerwa2 = timeGgg + ':' + timeGggg;
          return { przerwaII: przerwa2 }
        }
      }
      let timeD = new Date(teraz).setHours(22, 0, 0);
      let timeE = new Date(timeD).getTime() - new Date().getTime();
      let timeF = Math.floor(timeE / 60000);
      let timeG = Math.floor(timeF / 60);
      let timeGg = Math.floor(timeF % 60);
      let doKoncaDnia = timeG + ':' + timeGg;
      console.log(' ile do konca dniowki: ' + doKoncaDnia);
      // alert(' ile do konca dniowki: ' + doKoncaDnia)

      return { zmiana: 'popoludnie', doKonca: doKoncaDnia }
    }
    if (godzina >= 22 && godzina <= 6) {
      let timeD = new Date(teraz).setHours(6, 0, 0);
      let timeE = new Date(timeD).getTime() - new Date().getTime();
      let timeF = Math.floor(timeE / 60000);
      let timeG = Math.floor(timeF / 60);
      let timeGg = Math.floor(timeF % 60);
      let doKoncaDnia = timeG + ':' + timeGg;
      console.log(' ile do konca dniowki: ' + doKoncaDnia);
      // alert(' ile do konca dniowki: ' + doKoncaDnia)
      console.log('nocka');
      if (godzina >= 22 && godzina <= 2) {

        console.log('Iprzerwa');
        let przerwaI = new Date(teraz).setHours(1, 30, 0);
        let przerwaIa = new Date(przerwaI).getTime() - new Date().getTime();
        let przerwaIb = Math.floor(przerwaIa / 60000);
        let przerwaIc = Math.floor(przerwaIb / 60);
        let przerwaId = Math.floor(przerwaIc % 60);
        return { zmiana: 'nocka', przerwaI: przerwaI, doKonca: doKoncaDnia }
      }
  
      return { zmiana: 'nocka', doKonca: doKoncaDnia }
    }
    return 'niewiem która zmiana';
  }

  czasSztuki(czas, szt) {
    let czasWms = czas * 60000;
    let i = 0;
    const time = setInterval(function () {
      i++;
      console.log('teoretycznie powinnienes juz miec zrobione ' + i);
    }, czasWms);

    setTimeout(() => {
      clearInterval(time);
      console.log('Koniec');
    }, czasWms * (szt + 1));
  }
  lacznyCzas(czas) {
    const norma = 450;
    let wynik = norma - czas;
    console.log('łączny czas: ' + wynik);
    return wynik;
  }
}
