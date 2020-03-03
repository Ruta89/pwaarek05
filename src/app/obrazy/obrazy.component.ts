import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { merge, fromEvent } from 'rxjs';
@Component({
  selector: 'image',
  templateUrl: './obrazy.component.html',
  styleUrls: ['./obrazy.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObrazyComponent implements OnInit {
  scroll$;
  images = [
    '/assets/katalog/44 (2).jpg',
    '/assets/katalog/56 (2).jpg',
    '/assets/katalog/57 (2).jpg',
    '/assets/katalog/58 (2).jpg',
    '/assets/katalog/59 (2).jpg',
    '/assets/katalog/60 (2).jpg',
    '/assets/katalog/61 (2).jpg',
    '/assets/katalog/62 (2).jpg',
    '/assets/katalog/63 (2).jpg',
    '/assets/katalog/64 (2).jpg',
    '/assets/katalog/65 (2).jpg',
    '/assets/katalog/66 (2).jpg',
    '/assets/katalog/67 (2).jpg',
    '/assets/katalog/72 (2).jpg',
    '/assets/katalog/73 (2).jpg',
    '/assets/katalog/74 (2).jpg',
    '/assets/katalog/75 (2).jpg'
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
