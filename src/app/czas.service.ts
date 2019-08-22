import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface Razem {
  razem: number;
}

@Injectable({
  providedIn: 'root'
})
export class CzasService {
  constructor(
    private firestore: AngularFirestore,
    private _snackBar: MatSnackBar
  ) {}

  addCzas(data) {
    this.snackBar('dodaje', 'X');
    return this.firestore.collection('czas').add(data);
  }
  readCzas() {
    return this.firestore
      .collection('czas', ref => ref.orderBy('created', 'asc'))
      .snapshotChanges();
  }
  updateCzas(id, data) {
    this.snackBar('aktualizuje', 'X');
    this.firestore.doc('czas/' + id).update(data);
  }
  deleteCzas(id) {
    this.snackBar('usuwam', 'X');
    this.firestore.doc('czas/' + id).delete();
  }
  razemCzas() {
    return this.firestore.collection<Razem>('czas').snapshotChanges();
  }

  snackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
