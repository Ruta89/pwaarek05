import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Naddatek {
  tonaz: number;
  dlugosc: number;
  maszyna: string;
  naddatek: number;
  rekaw: string;
  notatka: string;
}
@Injectable({
  providedIn: 'root'
})
export class NaddatkiService {
  private naddatkiCollection: AngularFirestoreCollection<Naddatek>;
  naddatki: Observable<Naddatek[]>;
  constructor(private afs: AngularFirestore) {
    this.naddatkiCollection = afs.collection<Naddatek>('naddatki');
    this.naddatki = this.naddatkiCollection.valueChanges();
  }

  pokazNaddatki() {
    return this.afs.collection<Naddatek>('naddatki').snapshotChanges();
  }
  dodajNaddatek(naddatek: Naddatek) {
    this.naddatkiCollection.add(naddatek);
  }

}
