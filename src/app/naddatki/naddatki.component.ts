import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-naddatki',
  templateUrl: './naddatki.component.html',
  styleUrls: ['./naddatki.component.css']
})
export class NaddatkiComponent implements OnInit {
  naddatkiForm = this.fb.group({
    tonaz: null,
    dlugosc: [null, Validators.required],
    maszyna: [null, Validators.required],
    naddatek: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])],
    rekaw: ['rekaw', Validators.required],
    notatka: null
  });

  hasUnitNumber = false;

  maszyny = [
    { name: 'Tadek', abbreviation: 'tadek' },
    { name: 'Długa', abbreviation: 'dluga' },
    { name: 'Kółko', abbreviation: 'kolko' },
    { name: 'Słupki', abbreviation: 'slupki' }
  ];

  constructor(private fb: FormBuilder) { }
  ngOnInit() {

  }

  onSubmit() {
    alert('Dzieki!');
    console.log(this.naddatkiForm.value);
  }

}
