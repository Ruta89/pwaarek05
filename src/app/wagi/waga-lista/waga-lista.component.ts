import {
  Component,
  OnInit
} from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import {
  Observable
} from 'rxjs';
import {
  FirestoreService
} from 'src/app/shared/firestore.service';
import {
  WagaService
} from 'src/app/shared/waga.service';
import {
  CzasService
} from 'src/app/czas.service';

export interface Item {
  id: string;
  wll: number;
  l1: number;
  czas: number;
  szt: number;
  licznik?: number;
  szpule?: number;
  partia?: number;
  waga?: number;
  edit?: boolean;
  created?: number;
  planowanyKoniec?: number;
  archive?: boolean;
  archiveDate?: Date;
  auf?: number;
}

@Component({
  selector: 'app-waga-lista',
  templateUrl: './waga-lista.component.html',
  styleUrls: ['./waga-lista.component.css']
})
export class WagaListaComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item>;
  private itemsCollection: AngularFirestoreCollection<Item>;
  items$: Observable<Item[]>;
  list: Item[];
  zmiana;
  razem;
  sumaOblicz;
  rwag;
  sumaWag;
  math: Math;
  selectedItem: Item;
  partieAr = [];
  constructor(
    private afs: AngularFirestore,
    private firestoreService: FirestoreService,
    private serviceWaga: WagaService,
    private czasService: CzasService
  ) {
    this.math = Math;
  }

  ngOnInit() {
    this.firestoreService.getItems().subscribe(data => {
      this.list = data.map(item => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as Item)
        };
      });
      this.list.map(d => {
        this.partieAr.push(d.partia.valueOf() + ' ');
      });
    });

    this.zmiana = this.serviceWaga.jakaZmiana();

    this.razemSuma();
    this.razemSumaWagi();
  }
  getPartie() {
    this.czasService.snackBar('ostatnie partie:  ' + this.partieAr.toString(), 'X');
    console.log('ostatnie partie:  ', this.partieAr.toString());
  }

  update(item: Item) {
    this.serviceWaga.form.setValue({
      id: item.id,
      wll: item.wll,
      l1: item.l1,
      czas: item.czas,
      szt: item.szt,
      partia: item.partia,
      edit: true
    });
    this.czasService.snackBar('aktualizuje...', 'x');
  }
  addItem(item: Item) {
    this.firestoreService.addItem(item);
    this.czasService.snackBar('dodaje...', 'x');
  }
  delete(item: Item) {
    this.firestoreService.deleteItem(item);
    this.czasService.snackBar('usuwam...', 'x');
  }

  razemSuma() {
    this.firestoreService.sumaCzasu().subscribe(data => {
      this.razem = data.map(ea => {
        return ea.payload.doc.data()['czas'] * ea.payload.doc.data()['szt'];
      });
      this.sumaOblicz = this.razem.reduce((a, b) => {
        return a + b;
      }, 0);
    });
  }
  razemSumaWagi() {
    this.firestoreService.sumaWagi().subscribe(data => {
      this.rwag = data.map(ea => {
        return ea.payload.doc.data()['waga'] * ea.payload.doc.data()['szt'];
      });
      this.sumaWag = this.rwag.reduce((a, b) => {
        return a + b;
      }, 0);
    });
  }
  archive(item: Item) {
    this.czasService.snackBar('Archiwizuje', 'X');
    return this.firestoreService.archiveS(item);
  }
  onSelect(item: Item): void {
    this.selectedItem = item;

    this.czasService.snackBar('Wybrałeś: ' + item.id, 'X');
  }
}
