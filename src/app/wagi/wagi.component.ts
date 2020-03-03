import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wagi',
  templateUrl: './wagi.component.html',
  styleUrls: ['./wagi.component.css']
})
export class WagiComponent implements OnInit {
  show = true;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.show = false;
    }, 3500);
  }

}
