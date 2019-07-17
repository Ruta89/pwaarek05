import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent {
  form2 = this.fb.group({
    ptonaz: null,
    pdlugosc: null
  });

  constructor(private fb: FormBuilder) {}

  save() {
    navigator.vibrate(500);
    alert(
      `Wll ${this.form2.value.ptonaz} t, L1: ${this.form2.value.pdlugosc} m.`
    );
  }
}
