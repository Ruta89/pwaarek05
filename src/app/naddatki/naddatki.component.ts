import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NaddatkiService, Naddatek } from '../naddatki.service';

@Component({
  selector: 'app-naddatki',
  templateUrl: './naddatki.component.html',
  styleUrls: ['./naddatki.component.css']
})
export class NaddatkiComponent implements OnInit {
  listaNaddatkow: any;
  naddatkiForm = this.fb.group({
    tonaz: null,
    dlugosc: [null, Validators.required],
    maszyna: [null, Validators.required],
    naddatek: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ])
    ],
    rekaw: ['rekaw', Validators.required],
    notatka: null
  });

  hasUnitNumber = false;
  visable: boolean;
  maszyny = [
    { name: 'Tadek', abbreviation: 'tadek' },
    { name: 'Długa', abbreviation: 'dluga' },
    { name: 'Kółko', abbreviation: 'kolko' },
    { name: 'Słupki', abbreviation: 'slupki' }
  ];

  constructor(
    private fb: FormBuilder,
    private naddatkiService: NaddatkiService
  ) {}
  ngOnInit() {
    console.log('naddatki');
    this.naddatkiService.pokazNaddatki().subscribe(data => {
      this.listaNaddatkow = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });
      console.log(this.listaNaddatkow);
    });
    console.log(this.listaNaddatkow);
  }

  onSubmit() {
    alert('Dzieki!');
    console.log(this.naddatkiForm.value);
    this.naddatkiService.dodajNaddatek(this.naddatkiForm.value);
  }
  delete() {
    return alert('usuwam');
  }
  hide(data) {
    return alert('archiwizuje');
    console.log(data);
    this.visable = false;
  }
  dodano() {
    return alert('dodano: data...');
  }
}
