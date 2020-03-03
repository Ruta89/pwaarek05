import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { merge, fromEvent } from 'rxjs';
@Component({
  selector: 'app-zdjecia',
  templateUrl: './zdjecia.component.html',
  styleUrls: ['./zdjecia.component.css']
})
export class ZdjeciaComponent implements OnInit {
  scroll$;
  images = [
    '/assets/b/1.png',
    '/assets/b/1.jpg',
    '/assets/b/2.png',
    '/assets/b/3.png',
    '/assets/b/2.jpg',
    '/assets/b/3.jpg',
    '/assets/b/4.jpg',
    '/assets/b/5.jpg',
    '/assets/b/6.jpg',
    '/assets/b/7.jpg',
    '/assets/b/8.jpg',
    '/assets/b/9.jpg',
    '/assets/b/10.jpg',
    '/assets/b/11.jpg',
    '/assets/b/12.jpg',
    '/assets/b/13.jpg',
    '/assets/b/14.jpg',
    '/assets/b/15.jpg',
    '/assets/b/16.jpg',
    '/assets/b/17.jpg',
    '/assets/b/18.jpg',
    '/assets/b/19.jpg',
    '/assets/b/20.jpg',
    '/assets/b/21.jpg',
    '/assets/b/22.jpg',
    '/assets/b/23.jpg',
    '/assets/b/24.jpg',
    '/assets/b/25.jpg',
    '/assets/b/26.jpg',
    '/assets/b/27.jpg',
    '/assets/b/28.jpg',
    '/assets/b/29.jpg',

    '/assets/b/30.jpg',
    '/assets/b/31.jpg',
    '/assets/b/32.jpg',
    '/assets/b/33.jpg',
    '/assets/b/34.jpg',
    '/assets/b/35.jpg',
    '/assets/b/36.jpg',
    '/assets/b/37.jpg',
    '/assets/b/38.jpg',
    '/assets/b/39.jpg',

    '/assets/b/40.jpg',
    '/assets/b/41.jpg',
    '/assets/b/42.jpg',
    '/assets/b/43.jpg',
    '/assets/b/44.jpg',
    '/assets/b/45.jpg',
    '/assets/b/46.jpg',
    '/assets/b/47.jpg',
    '/assets/b/48.jpg',
    '/assets/b/49.jpg',

    '/assets/b/50.jpg',
    '/assets/b/51.jpg',
    '/assets/b/52.jpg',
    '/assets/b/53.jpg',
    '/assets/b/54.jpg',
    '/assets/b/55.jpg',
    '/assets/b/56.jpg',
    '/assets/b/57.jpg',
    '/assets/b/58.jpg',
    '/assets/b/59.jpg',
    '/assets/b/60.jpg',
    '/assets/b/61.jpg',
    '/assets/b/62.jpg',
    '/assets/b/63.jpg',
    '/assets/b/64.jpg',
    '/assets/b/65.jpg',
    '/assets/b/66.jpg',
    '/assets/b/67.jpg',
    '/assets/b/68.jpg',
    '/assets/b/69.jpg',
    '/assets/b/70.jpg',
    '/assets/b/71.jpg',
    '/assets/b/72.jpg',
    '/assets/b/73.jpg',
    '/assets/b/74.jpg',
    '/assets/b/75.jpg',
    '/assets/b/76.jpg',
    '/assets/b/77.jpg',
    '/assets/b/78.jpg',
    '/assets/b/79.jpg',
    '/assets/b/80.jpg',
    '/assets/b/81.gif'
    // ,
    // '/assets/b/82.jpg',
    // '/assets/b/83.jpg',
    // '/assets/b/84.jpg',
    // '/assets/b/85.jpg',
    // '/assets/b/86.jpg',
    // '/assets/b/87.jpg',
    // '/assets/b/88.jpg',
    // '/assets/b/89.jpg'
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
