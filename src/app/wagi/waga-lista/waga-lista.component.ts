import { Component, OnInit } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/shared/firestore.service';
import { WagaService } from 'src/app/shared/waga.service';

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
  constructor(
    private afs: AngularFirestore,
    private firestoreService: FirestoreService,
    private serviceWaga: WagaService
  ) { }

  ngOnInit() {
    this.firestoreService.getItems().subscribe(data => {
      this.list = data.map(item => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as Item)
        };
      });
    });

    this.zmiana = this.serviceWaga.jakaZmiana();
    // alert(this.zmiana.zmiana + ', - pozostalo ' + this.zmiana.doKonca + ' do konca');
    // this.serviceWaga.WyrobionyCzasFn();
  }

  update(item: Item) {
    console.log('update: ', item);
    // this.firestoreService.updateItem(item);
    this.serviceWaga.form.setValue({
      id: item.id,
      wll: item.wll,
      l1: item.l1,
      czas: item.czas,
      szt: item.szt,
      partia: item.partia,
      edit: true
    });
  }
  addItem(item: Item) {
    console.log('addItem: ', item);
    this.firestoreService.addItem(item);
  }
  delete(item: Item) {
    this.firestoreService.deleteItem(item);
  }
}
