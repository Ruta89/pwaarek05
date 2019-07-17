import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../waga-lista/waga-lista.component';
import { FirestoreService } from 'src/app/shared/firestore.service';
import { CzasService } from 'src/app/czas.service';

@Component({
  selector: 'app-waga-detail',
  templateUrl: './waga-detail.component.html',
  styleUrls: ['./waga-detail.component.css']
})
export class WagaDetailComponent implements OnInit {
  @Input() list: Item;
  constructor(
    private firestoreService: FirestoreService,
    private czasService: CzasService
  ) {}

  ngOnInit() {}
  close() {
    this.list = null;
  }
  addAuf(id, auf) {
    // console.log('id: ' + id + ' auf: ' + auf);
    // alert('id: ' + id + ' auf: ' + auf);
    this.czasService.snackBar('Dodano zlecenie: ' + auf, 'X');

    const aufStr =
      auf.slice(0, 6) + '/' + auf.slice(6, 8) + '/' + auf.slice(8, 10);
    alert(aufStr);
    return this.firestoreService.updateAuf(id, auf);
  }
  addPartia(id, partia) {
    // console.log('id: ' + id + '  Partia: ' + partia);
    // alert('id: ' + id + ' auf: ' + auf);
    this.czasService.snackBar('Dodano partie: ' + partia, 'X');
    return this.firestoreService.updatePartia(id, partia);
  }
  addCzas(id, czas) {
    this.czasService.snackBar('Dodano czas: ' + czas, ' minut');
    return this.firestoreService.updateCzas(id, czas);
  }
}
