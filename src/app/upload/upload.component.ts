import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { FirestoreService } from '../shared/firestore.service';
export interface Iupload {
  name: string;
  url: string;
}
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  listaPlikow: Iupload[];

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.firestoreService.getPliki().subscribe(data => {
      this.listaPlikow = data.map(item => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as Iupload)
        };
      });
    });

    // console.log('this. ', this.listaPlikow);
  }
  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `pliki/${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    return task
      .snapshotChanges()
      .pipe(
        finalize(() =>
          fileRef.getDownloadURL().subscribe(ff => {
            // console.log('fff ', ff);
            const dataF = {
              name: `pliki/${Date.now()}`,
              url: ff
            };
            this.db.collection('pliki').add(dataF);
            return (this.downloadURL = ff);
            // return  = ff
          })
        )
      )
      .subscribe();
  }
}
