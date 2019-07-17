import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WagaService } from './../../shared/waga.service';
import { Waga } from 'src/app/shared/waga';
import { FirestoreService } from 'src/app/shared/firestore.service';
import { Item } from 'src/app/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  add$ = false;
  constructor(
    public service: WagaService,
    private firestoreService: FirestoreService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
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
      archive: false,
      ...form
    };
    console.log(this.value);
    this.firestoreService.addItem(this.value);
    setTimeout(() => {
      this.onClear();
      this.reset();
    }, 400);
  }

  saveForm(form) {
    console.log(form);
    this.firestoreService.addForm(form);
    setTimeout(() => {
      this.openSnackBar('Dodałeś prawidłowo', 'Zamknij');
      this.onClear();
    }, 500);
  }

  update(d) {
    console.log('update waga comp', d);

    this.firestoreService.updateItem(d);
    this.openSnackBar('Zaktualizowano', 'Zamknij');
    this.add$ = false;
  }

  reset() {
    this.service.reset();
    this.value = 0;
    this.szpule = 0;
    this.licznik = 0;
    this.tempSzpule = 0;
    this.waga = 0;
    this.add$ = false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
  show() {
    this.add$ = true;
  }
}
