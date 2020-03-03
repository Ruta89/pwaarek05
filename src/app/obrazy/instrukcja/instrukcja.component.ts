import { Component, OnInit } from '@angular/core';
import { merge, fromEvent } from 'rxjs';

@Component({
  selector: 'app-instrukcja',
  templateUrl: './instrukcja.component.html',
  styleUrls: ['./instrukcja.component.css']
})
export class InstrukcjaComponent implements OnInit {
  scroll$;
  images = [
    '/assets/i/w 1z2.jpg',
    '/assets/i/w 2z2.jpg',
    '/assets/i/1.jpg',
    '/assets/i/2.jpg',
    '/assets/i/3.jpg',
    '/assets/i/4.jpg',
    '/assets/i/5.jpg',
    '/assets/i/6.jpg',
    '/assets/i/7.jpg',
    '/assets/i/8.jpg',
    '/assets/i/9.jpg',
    '/assets/i/10.jpg',
    '/assets/i/11.jpg',
    '/assets/i/a.png',
    '/assets/i/k 1z7.jpg',
    '/assets/i/k 2z7.jpg',
    '/assets/i/k 3z7.jpg',
    '/assets/i/k 4z7.jpg',
    '/assets/i/k 6z7.jpg',
    '/assets/i/k 7z7.jpg',
    '/assets/i/kk 1z3.jpg',
    '/assets/i/kk 2z3.jpg',
    '/assets/i/kk 3z3.jpg'
  ];
  errorImage = 'https://i.imgur.com/XkU4Ajf.png';
  defaultImage = 'https://www.placecage.com/1000/1000';

  constructor() {
    this.scroll$ = merge(
      fromEvent(window, 'scroll')
      // ,
      // fromEvent(someDivRef, 'scroll')
    );
  }

  ngOnInit(): void {
  }

}
