import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  items: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.items = db.list('items').valueChanges();
    const itemsRef = db.list('items');
    itemsRef.push({ name: 'newName' });
  }
}
