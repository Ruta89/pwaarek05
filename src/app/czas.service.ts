import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class CzasService {

  constructor(private firestore: AngularFirestore) { }

  addCzas(data) {
    return this.firestore.collection('czas').add(data);
  }
  readCzas() {
    return this.firestore.collection('czas').snapshotChanges();
  }
  updateCzas(id, data) {
    this.firestore.doc('czas/' + id).update(data);
  }
  deleteCzas(id) {
    this.firestore.doc('czas/' + id).delete();
  }
}
