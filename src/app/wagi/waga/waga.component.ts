import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WagaService } from './../../shared/waga.service';
import { Waga } from 'src/app/shared/waga';
import { FirestoreService } from 'src/app/shared/firestore.service';
import { Item } from 'src/app/api.service';

@Component({
  selector: 'app-waga',
  templateUrl: './waga.component.html',
  styleUrls: ['./waga.component.css']
})
export class WagaComponent implements OnInit {
  value;
  szpule;
  licznik;
  tempSzpule;
  waga;
  constructor(
    public service: WagaService,
    private firestoreService: FirestoreService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }
  onClick(form) {
    this.szpule = this.service.ustawIleSzpul(form.wll);
    this.licznik = this.service.ustawLicznik(form.wll, form.l1);
    this.waga = this.service.ustawWage(form.wll, form.l1);
    const currentDate = Date.now();
    this.value = {
      created: currentDate,
      szpule: this.szpule,
      licznik: this.licznik,
      waga: this.waga,
      ...form
    };
    console.log(this.value);
    this.firestoreService.addItem(this.value);
    setTimeout(() => {
      this.onClear();
      this.reset();
    }, 4000);
  }

  saveForm(form) {
    console.log(form);
    this.firestoreService.addForm(form);
    setTimeout(() => {
      this.onClear();
    }, 5000);
  }

  update(d) {
    console.log('update waga comp', d);

    this.firestoreService.updateItem(d);
  }

  reset() {
    this.service.reset();
    this.value = 0;
    this.szpule = 0;
    this.licznik = 0;
    this.tempSzpule = 0;
    this.waga = 0;
  }
}
