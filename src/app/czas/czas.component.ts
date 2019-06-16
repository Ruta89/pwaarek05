import { Component, OnInit } from '@angular/core';
import { CzasService } from '../czas.service';

@Component({
  selector: 'app-czas',
  templateUrl: './czas.component.html',
  styleUrls: ['./czas.component.css']
})
export class CzasComponent implements OnInit {


  czasy: any;
  tonazCzas: string;
  dlugoscCzas: number;
  minutyCzas: string;
  sztukCzas: number;

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
        };
      });
      console.log(this.czasy);

    });
  }

  CreateCzas() {
    let record = {};
    record['Tonaz'] = this.tonazCzas;
    record['Dlugosc'] = this.dlugoscCzas;
    record['Minuty'] = this.minutyCzas;
    record['Sztuk'] = this.sztukCzas;
    this.czasService.addCzas(record).then(resp => {
      this.tonazCzas = '';
      this.dlugoscCzas = undefined;
      this.minutyCzas = '';
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
    let recordTemp = {};
    recordTemp['Tonaz'] = recordRow.EditTonaz;
    recordTemp['Dlugosc'] = recordRow.EditDlugosc;
    recordTemp['Minuty'] = recordRow.EditMinuty;
    recordTemp['Sztuk'] = recordRow.EditSztuk;
    let record = recordTemp;
    this.czasService.updateCzas(recordRow.id, record);
    recordRow.isEdit = false;
  }


}
