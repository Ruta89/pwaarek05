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
  partieAr = [];
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
  getCalendar() {
    return this.afs
      .collection('calendar')
      .snapshotChanges();
  }
  getCalendar2() {
    return this.afs
      .collection('zleceniaTest', ref =>
        ref.where('archive', '==', false).orderBy('created', 'desc')
      )
      .snapshotChanges();
  }
  addCalendar() {
    let data = {
      'id': 'HNAvSxGsJdEb72CMx1Xh',
      'archive': false,
      'created': 1564172369619,
      'czas': 1,
      'edit': true,
      'l1': 5,
      'licznik': 120,
      'partia': 1,
      'planowanyKoniec': 1564172429619,
      'szpule': 6,
      'szt': 10,
      'waga': 10.692,
      'wll': 10,
      'start': 'Fri Jul 26 2019 22:19:29 GMT+0200 (czas środkowoeuropejski letni)',
      'end': 'Fri Jul 26 2019 22:20:29 GMT+0200 (czas środkowoeuropejski letni)',
      'title': 'titlwe',
      'color': {
        'primary': '#e3bc08',
        'secondary': '#FDF1BA'
      },
      'actions': [
        {
          'label': '<i class="fa fa-fw fa-pencil"></i>'
        },
        {
          'label': '<i class="fa fa-fw fa-times"></i>'
        }
      ],
      'resizable': {
        'beforeStart': true,
        'afterEnd': true
      },
      'draggable': true,
      'allDay': false
    };

    return this.afs.collection('calendar').add(data);
  }

  getPartie() {
    this.afs
      .collection('zleceniaTest', ref =>
        ref.where('archive', '==', false).orderBy('created', 'desc')
      )
      .snapshotChanges().subscribe(data => {
        this.list = data.map(item => {
          return {
            id: item.payload.doc.id,
            ...(item.payload.doc.data() as Item)
          };
        });
        this.list.map(d => {
          this.partieAr.push(d.partia.valueOf());
        });
        return this.partieAr;
      });
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
    const archiveData = { archive: true, archiveDate: new Date() };
    this.afs.doc(`zleceniaTest/${item.id}`).update(archiveData);
  }
}
