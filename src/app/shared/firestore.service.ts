import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../wagi/waga-lista/waga-lista.component';
import { WagaService } from './waga.service';
import { Razem } from '../czas.service';
export interface RazemWaga {
  waga: number;
}
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;
  list: Item[];
  formData: Item;

  czasCollection: AngularFirestoreCollection<any>;
  // uploadsCollection: AngularFirestoreCollection<any>;
  // uploads: Observable<any[]>;

  constructor(private afs: AngularFirestore, private wService: WagaService) {
    this.itemsCollection = this.afs.collection('zleceniaTest', ref =>
      ref.where('archive', '==', false).orderBy('created', 'desc')
    );

    this.itemsCollection.snapshotChanges().subscribe(actionArray => {
      actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Item;
      });
    });

    this.czasCollection = this.afs.collection('lacznyCzas');
    this.czasCollection.snapshotChanges().subscribe(a => {
      a.map(b => {
        return { date: new Date(), czas: b.payload.doc.data() };
      });
    });
  }

  getItems() {
    return this.afs
      .collection('zleceniaTest', ref =>
        ref.where('archive', '==', false).orderBy('created', 'desc')
      )
      .snapshotChanges();
  }
  getPliki() {
    return this.afs.collection('pliki').snapshotChanges();
  }

  addItem(item: Item) {
    this.itemsCollection.add(item).then(d => {
      const idTemp = { id: d.id };
      console.log(idTemp);
      this.afs.doc(`zleceniaTest/${d.id}`).update(idTemp);
    });
  }

  addForm(item: Item) {
    const czasMS = item.czas * 60000;
    const start = Date.now();
    const en = czasMS * item.szt;
    const end = en + start;
    const szpul = this.wService.ustawIleSzpul(item.wll);
    const licznikM = this.wService.ustawLicznik(item.wll, item.l1);
    const wagaSzt = this.wService.ustawWage(item.wll, item.l1);
    const razem = {
      created: start,
      planowanyKoniec: end,
      szpule: szpul,
      licznik: licznikM,
      waga: wagaSzt,
      archive: false,
      ...item
    };

    this.itemsCollection.add(razem).then(data => {
      const idData = { id: data.id };
      this.afs.doc(`zleceniaTest/${data.id}`).update(idData);

      const lacznyCzass = this.wService.lacznyCzas(razem.czas * razem.szt);
      this.czasCollection.add({
        date: new Date(),
        czas: lacznyCzass,
        idZlecenia: data.id
      });
    });

    this.wService.czasSztuki(item.czas, item.szt);
  }

  deleteItem(item: Item) {
    console.log('deleteItem: ', item);
    this.itemDoc = this.afs.doc(`zleceniaTest/${item.id}`);
    this.itemDoc.delete();
  }

  updateItem(item: Item) {
    // let itemT = item.edit['true'];
    this.afs.doc(`zleceniaTest/${item.id}`).update(item);
    this.wService.reset();
  }
  updateAuf(id, auf) {
    console.log('servis auf: ' + auf);
    const itemAuf = { auf: auf };
    // let itemT = item.edit['true'];
    return this.afs.doc(`zleceniaTest/${id}`).update(itemAuf);
  }

  updatePartia(id, partia) {
    console.log('servis partia: ' + partia);
    const itemPartia = { partia: partia };
    return this.afs.doc(`zleceniaTest/${id}`).update(itemPartia);
  }
  updateCzas(id, czas) {
    console.log('servis czAs: ' + czas);
    const itemCzas = { czas: czas };
    return this.afs.doc(`zleceniaTest/${id}`).update(itemCzas);
  }

  sumaCzasu() {
    return this.afs
      .collection<Razem>('zleceniaTest', ref =>
        ref.where('archive', '==', false).orderBy('created', 'desc')
      )
      .snapshotChanges();
  }
  sumaWagi() {
    return this.afs
      .collection<RazemWaga>('zleceniaTest', ref =>
        ref.where('archive', '==', false).orderBy('created', 'desc')
      )
      .snapshotChanges();
  }
  uploadURL(url) {
    console.log('url service: ', url);
    console.log('url service: ', ...url);

    //  this.uploadsCollection.add({ 'url': url });
  }
  archiveS(item: Item) {
    console.log('s archive: ', item);
    // let itemT = item.edit['true'];
    const archiveData = { archive: true };
    this.afs.doc(`zleceniaTest/${item.id}`).update(archiveData);
  }
}
