import { Component, OnInit } from '@angular/core';
import { Item, ApiService } from './api.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pwaarek06';
  constructor(private swUpdate: SwUpdate) {}
  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('Nowa wersja jest dostępna. Załadować nową wersję?')) {
          window.location.reload();
        }
      });
    }
  }
}
