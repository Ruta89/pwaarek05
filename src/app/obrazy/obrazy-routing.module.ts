import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObrazyComponent } from './obrazy.component';
import { ZdjeciaComponent } from './zdjecia/zdjecia.component';
import { KatalogComponent } from './katalog/katalog.component';
import { InstrukcjaComponent } from './instrukcja/instrukcja.component';

const routes: Routes = [
  { path: '', component: ObrazyComponent },
  { path: 'zdjecia', component: ZdjeciaComponent },
  { path: 'katalog', component: KatalogComponent },
  { path: 'instrukcja', component: InstrukcjaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObrazyRoutingModule { }
