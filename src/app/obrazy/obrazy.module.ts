import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObrazyRoutingModule } from './obrazy-routing.module';
import { ObrazyComponent } from './obrazy.component';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ZdjeciaComponent } from './zdjecia/zdjecia.component';
import { KatalogComponent } from './katalog/katalog.component';
import { InstrukcjaComponent } from './instrukcja/instrukcja.component';
@NgModule({
  declarations: [ObrazyComponent, ZdjeciaComponent, KatalogComponent, InstrukcjaComponent],
  imports: [
    CommonModule,
    ObrazyRoutingModule,
    LazyLoadImageModule
  ]
})
export class ObrazyModule { }
