import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
export interface Razem {
  razem: number;
}

@Injectable({
  providedIn: 'root'
})
export class CzasService {
  constructor(private firestore: AngularFirestore) {}

  addCzas(data) {
    return this.firestore.collection('czas').add(data);
  }
  readCzas() {
    return this.firestore
      .collection('czas', ref => ref.orderBy('created', 'asc'))
      .snapshotChanges();
  }
  updateCzas(id, data) {
    this.firestore.doc('czas/' + id).update(data);
  }
  deleteCzas(id) {
    this.firestore.doc('czas/' + id).delete();
  }
  razemCzas() {
    return this.firestore.collection<Razem>('czas').snapshotChanges();
  }
}
