import { Component, OnInit } from '@angular/core';
import { CzasService } from '../czas.service';

@Component({
  selector: 'app-czas',
  templateUrl: './czas.component.html',
  styleUrls: ['./czas.component.css']
})
export class CzasComponent implements OnInit {


  czasy: any; 
  razem: any;
  tonazCzas: number;
  dlugoscCzas: number;
  minutyCzas: number;
  sztukCzas: number;
  sumaCzas: number;

  constructor(private czasService: CzasService) { }

  ngOnInit() {
    this.czasService.readCzas().subscribe(data => {

      this.czasy = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Tonaz: e.payload.doc.data()['Tonaz'],
          Dlugosc: e.payload.doc.data()['Dlugosc'],
          Minuty: e.payload.doc.data()['Minuty'],
          Sztuk: e.payload.doc.data()['Sztuk'],
          Razem: e.payload.doc.data()['Razem'],
        }
      })
      console.log(this.czasy)
    })
    
    this.czasService.razemCzas().subscribe(data => {

      this.razem = data.map(ea => {
        return ea.payload.doc.data()['Razem']
      })
      console.log('abc');
      console.log( this.razem );
      this.sumaCzas = this.razem.reduce( (a, b) => {
        return a + b;
    }, 0);
    console.log( this.sumaCzas )
    })
    }



  CreateCzas() {
    let record = {};
    record['Tonaz'] = this.tonazCzas;
    record['Dlugosc'] = this.dlugoscCzas;
    record['Minuty'] = this.minutyCzas;
    record['Sztuk'] = this.sztukCzas;
    record['Razem'] = this.sztukCzas * this.minutyCzas;
    record['created'] = new Date();
    this.czasService.addCzas(record).then(resp => {
      this.tonazCzas = undefined;
      this.dlugoscCzas = undefined;
      this.minutyCzas = undefined;
      this.sztukCzas = undefined;
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.czasService.deleteCzas(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditTonaz = record.Tonaz;
    record.EditDlugosc = record.Dlugosc;
    record.EditMinuty = record.Minuty;
    record.EditSztuk = record.Sztuk;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Tonaz'] = recordRow.EditTonaz;
    record['Dlugosc'] = recordRow.EditDlugosc;
    record['Minuty'] = recordRow.EditMinuty;
    record['Sztuk'] = recordRow.EditSztuk;
    record['Razem'] = recordRow.EditSztuk * recordRow.EditMinuty;
    this.czasService.updateCzas(recordRow.id, record);
    recordRow.isEdit = false;
  }


}
