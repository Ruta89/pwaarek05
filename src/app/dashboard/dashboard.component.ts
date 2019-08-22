import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Item, ApiService } from '../api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  items: Array<Item>;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          {
            title: 'Stan 1',
            description:
              'Stan 450 minut, Stan 1 Stan 450 minut, Stan 1 Stan 450 minut, Stan 1 Stan 450 minut, Stan 1 ',
            cols: 1,
            rows: 1
          },
          {
            title: 'Dodaj 1',
            description:
              'Dodaj 1 Dodaj 1 Dodaj 1 Dodaj 1 Dodaj 1 Dodaj 1 Dodaj 1 Dodaj 1 Dodaj 1 Dodaj 1 ',
            cols: 1,
            rows: 1
          }
        ];
      }

      return [
        {
          title: 'Stan 2',
          description:
            'Stan 450 minut, Stan 2 Stan 450 minut Stan 450 minut, Stan 2 Stan 450 minut Stan 450 minut, Stan 2 Stan 450 minut ',
          cols: 2,
          rows: 1
        },
        {
          title: 'Dodaj 2 ',
          description:
            'asddasdasdsa Dodaj 2 Dodaj 2 Dodaj 2 Dodaj 2 Dodaj 2 Dodaj 2 Dodaj 2 Dodaj 2 Dodaj 2 Dodaj 2 dsadsa',
          cols: 1,
          rows: 1
        }
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder
  ) { }
  addForm = this.fb.group({
    wll: [null, Validators.required],
    dlugosc: [null, Validators.required],
    szt: [null, Validators.required],
    czas: [null, Validators.required],
  });

  onSubmit() {
    const message = `Dzięki, dodałeś ${this.addForm.value.wll}T,  ${this.addForm.value.dlugosc}m, ${this.addForm.value.czas}min,  ${this.addForm.value.szt}szt.`;
    console.log(message);
    alert(message);

  }
}
