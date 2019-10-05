import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { map } from 'rxjs/operators';

export class State {
  constructor(
    public color: string,
    public artykul: string,
    public tonaz: number,
    public rodzaj: string
  ) { }
}

@Component({
  selector: 'app-nr-artk',
  templateUrl: './nr-artk.component.html',
  styleUrls: ['./nr-artk.component.css']
})
export class NrArtkComponent {

  constructor() {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this.filterStates(state) : this.states.slice()))
    );
  }
  state = '';
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;

  states: State[] = [
    {
      color: 'https://img.thexmod.com/toolstream/640/297196_ENWNMPRO1.jpg',
      artykul: '5140512',
      tonaz: 1000,
      rodzaj: 'DeForce 1'
    },
    {
      color: 'https://img.thexmod.com/toolstream/640/297196_ENWNMPRO1.jpg',
      artykul: '5141012',
      tonaz: 1500,
      rodzaj: 'DeForce 1'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/2-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5141512',
      tonaz: 2000,
      rodzaj: 'DeForce 1'
    },
    {
      color:
        'https://www.lankhorstropes.com/media/140/EN/Producten/390/800x600xcover@70@@/tipto-web-round-slings-with-ce-mark-according-to-en-1492-2-%25281%2529.jpg',
      artykul: '5143012',
      tonaz: 3000,
      rodzaj: 'DeForce 1'
    },
    {
      color:
        'https://media.ladungssicherung.eu/media/catalog/product/cache/2/thumbnail/1024x/086573fb18a536de18772a590c1bc25c/r/u/rundschlinge_rs40_d.png',
      artykul: '5144512',
      tonaz: 4000,
      rodzaj: 'DeForce 1'
    },
    {
      color:
        'https://www.bishopliftingequipment.co.uk/wp-content/uploads/2016/03/5-ton-round-850x850.jpg',
      artykul: '5145512',
      tonaz: 5000,
      rodzaj: 'DeForce 1'
    },
    {
      color:
        'https://images-na.ssl-images-amazon.com/images/I/41q3Ku2WlHL._SY355_.jpg',
      artykul: '5146012',
      tonaz: 6000,
      rodzaj: 'DeForce 1'
    },
    {
      color:
        'https://image.made-in-china.com/202f0j00PMzTGrNfVygR/8000kg-Endless-Round-Sling-Lifting-Sling.jpg',
      artykul: '5147512',
      tonaz: 8000,
      rodzaj: 'DeForce 1'
    },
    {
      color: 'https://img.thexmod.com/toolstream/640/297196_ENWNMPRO1.jpg',
      artykul: '5140522',
      tonaz: 1000,
      rodzaj: 'DeForce 2'
    },
    {
      color: 'https://img.thexmod.com/toolstream/640/297196_ENWNMPRO1.jpg',
      artykul: '5141022',
      tonaz: 1500,
      rodzaj: 'DeForce 2'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/2-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5142522',
      tonaz: 2000,
      rodzaj: 'DeForce 2'
    },
    {
      color: 'https://www.fervi.com/ftp/images/FTx-3000.jpg',
      artykul: '5143022',
      tonaz: 3000,
      rodzaj: 'DeForce 2'
    },
    {
      color:
        'https://media.ladungssicherung.eu/media/catalog/product/cache/2/thumbnail/1024x/086573fb18a536de18772a590c1bc25c/r/u/rundschlinge_rs40_d.png',
      artykul: '5144522',
      tonaz: 4000,
      rodzaj: 'DeForce 2'
    },
    {
      color:
        'https://www.bishopliftingequipment.co.uk/wp-content/uploads/2016/03/5-ton-round-850x850.jpg',
      artykul: '5145522',
      tonaz: 5000,
      rodzaj: 'DeForce 2'
    },
    {
      color:
        'https://images-na.ssl-images-amazon.com/images/I/41q3Ku2WlHL._SY355_.jpg',
      artykul: '5146022',
      tonaz: 6000,
      rodzaj: 'DeForce 2'
    },
    {
      color:
        'https://image.made-in-china.com/202f0j00PMzTGrNfVygR/8000kg-Endless-Round-Sling-Lifting-Sling.jpg',
      artykul: '5147522',
      tonaz: 8000,
      rodzaj: 'DeForce 2'
    },
    {
      color: 'https://img.thexmod.com/toolstream/640/297196_ENWNMPRO1.jpg',
      artykul: '5140532',
      tonaz: 1000,
      rodzaj: 'DeDoweb'
    },
    {
      color: 'https://img.thexmod.com/toolstream/640/297196_ENWNMPRO1.jpg',
      artykul: '5141032',
      tonaz: 1500,
      rodzaj: 'DeDoweb'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/2-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5141532',
      tonaz: 2000,
      rodzaj: 'DeDoweb'
    },
    {
      color: 'https://www.fervi.com/ftp/images/FTx-3000.jpg',
      artykul: '5143032',
      tonaz: 3000,
      rodzaj: 'DeDoweb'
    },
    {
      color:
        'https://media.ladungssicherung.eu/media/catalog/product/cache/2/thumbnail/1024x/086573fb18a536de18772a590c1bc25c/r/u/rundschlinge_rs40_d.png',
      artykul: '5144532',
      tonaz: 4000,
      rodzaj: 'DeDoweb'
    },
    {
      color:
        'https://www.bishopliftingequipment.co.uk/wp-content/uploads/2016/03/5-ton-round-850x850.jpg',
      artykul: '5145532',
      tonaz: 5000,
      rodzaj: 'DeDoweb'
    },
    {
      color:
        'https://images-na.ssl-images-amazon.com/images/I/41q3Ku2WlHL._SY355_.jpg',
      artykul: '5146032',
      tonaz: 6000,
      rodzaj: 'DeDoweb'
    },
    {
      color:
        'https://image.made-in-china.com/202f0j00PMzTGrNfVygR/8000kg-Endless-Round-Sling-Lifting-Sling.jpg',
      artykul: '5147532',
      tonaz: 8000,
      rodzaj: 'DeDoweb'
    },
    {
      color: 'https://img.thexmod.com/toolstream/640/297196_ENWNMPRO1.jpg',
      artykul: '5140552',
      tonaz: 1000,
      rodzaj: 'doPremium'
    },
    {
      color: 'https://img.thexmod.com/toolstream/640/297196_ENWNMPRO1.jpg',
      artykul: '5141052',
      tonaz: 1500,
      rodzaj: 'doPremium'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/2-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5141552',
      tonaz: 2000,
      rodzaj: 'doPremium'
    },
    {
      color: 'https://www.fervi.com/ftp/images/FTx-3000.jpg',
      artykul: '5143052',
      tonaz: 3000,
      rodzaj: 'doPremium'
    },
    {
      color:
        'https://media.ladungssicherung.eu/media/catalog/product/cache/2/thumbnail/1024x/086573fb18a536de18772a590c1bc25c/r/u/rundschlinge_rs40_d.png',
      artykul: '5144552',
      tonaz: 4000,
      rodzaj: 'doPremium'
    },
    {
      color:
        'https://www.bishopliftingequipment.co.uk/wp-content/uploads/2016/03/5-ton-round-850x850.jpg',
      artykul: '5145552',
      tonaz: 5000,
      rodzaj: 'doPremium'
    },
    {
      color:
        'https://images-na.ssl-images-amazon.com/images/I/41q3Ku2WlHL._SY355_.jpg',
      artykul: '5146052',
      tonaz: 6000,
      rodzaj: 'doPremium'
    },
    {
      color:
        'https://image.made-in-china.com/202f0j00PMzTGrNfVygR/8000kg-Endless-Round-Sling-Lifting-Sling.jpg',
      artykul: '5147552',
      tonaz: 8000,
      rodzaj: 'doPremium'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/10-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5148025',
      tonaz: 10000,
      rodzaj: 'doPremium'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/10-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5148012',
      tonaz: 10000,
      rodzaj: 'doMega'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/10-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5149112',
      tonaz: 12000,
      rodzaj: 'doMega'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/10-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5149312',
      tonaz: 15000,
      rodzaj: 'doMega'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/10-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5149512',
      tonaz: 20000,
      rodzaj: 'doMega'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/10-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5149812',
      tonaz: 25000,
      rodzaj: 'doMega'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/10-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5149912',
      tonaz: 30000,
      rodzaj: 'doMega'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/10-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5149962',
      tonaz: 40000,
      rodzaj: 'doMega'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/10-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5149972',
      tonaz: 50000,
      rodzaj: 'doMega'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/10-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5149932',
      tonaz: 60000,
      rodzaj: 'doMega'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/10-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5149942',
      tonaz: 80000,
      rodzaj: 'doMega'
    },
    {
      color:
        'https://www.rhtltd.co.uk/image/cache/catalog/Miller%20Weblift/Images/Round%20Slings/10-tonne-round-sling-(1)-500x500.jpg',
      artykul: '5149992',
      tonaz: 100000,
      rodzaj: 'doMega'
    },
    {
      color:
        'https://dolezych.pl/wp-content/uploads/sites/12/2018/08/Bez-nazwy.jpg',
      artykul: '5000120',
      tonaz: 2000,
      rodzaj: 'Linki'
    }
  ];
  onEnter(state: string) {
    this.state = state;
  }
  filterStates(artykul: string) {
    return this.states.filter(state => state.artykul.indexOf(artykul) === 0);
  }
}
