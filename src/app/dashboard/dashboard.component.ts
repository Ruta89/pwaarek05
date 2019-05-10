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
          { title: 'Stan', description: 'Stan 450 minut ', cols: 1, rows: 1 },
          { title: 'Dodaj', description: "asddasdasdsadsadsa", cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Stan', description: 'Stan 450 minut ', cols: 2, rows: 1 },
        { title: 'Dodaj', description: 'asddasdasdsadsadsa', cols: 1, rows: 1 }
       ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder
  ) {
    // this.fetchData();
  }
  // fetchData() {
  //   this.apiService.fetch().subscribe(
  //     (data: Array<Item>) => {
  //       console.log(data);
  //       this.items = data;
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   );
  // } 
  addForm = this.fb.group({
    wll: null,
    dlugosc: [null, Validators.required],
    szt: [null, Validators.required],
    czas: null
  });


  onSubmit() {
    alert('Dzieki!');
  }
}
