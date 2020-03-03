import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { merge, fromEvent } from 'rxjs';

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.css']
})
export class KatalogComponent implements OnInit {
  scroll$;
  images = [
    '/assets/b/1.gif',
    '/assets/b/2.gif',
    '/assets/b/3.gif',
    '/assets/b/4b.gif',
    '/assets/b/4.gif',
    '/assets/b/5.gif',
    '/assets/b/6.gif',
    '/assets/b/7.gif',
    '/assets/b/8.gif',
    '/assets/b/9.gif',
    '/assets/b/10.gif'
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
