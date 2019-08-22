import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { TableComponent } from './table/table.component';
import { WagiComponent } from './wagi/wagi.component';
import { WagaListaComponent } from './wagi/waga-lista/waga-lista.component';
import { WagaComponent } from './wagi/waga/waga.component';
import { NrArtkComponent } from './nr-artk/nr-artk.component';
import { CzasComponent } from './czas/czas.component';
import { NaddatkiComponent } from './naddatki/naddatki.component';
import { UploadComponent } from './upload/upload.component';
import { CalendarMonthComponent } from './calendar/calendar-month/calendar-month.component';

const routes: Routes = [
  { path: '', component: WagiComponent },
  { path: 'TreeComponent', component: TreeComponent },
  { path: 'drag', component: DragDropComponent },
  { path: 'DashboardComponent', component: DashboardComponent },
  { path: 'TableComponent', component: TableComponent },
  { path: 'AddressFormComponent', component: AddressFormComponent },
  { path: 'wagi', component: WagiComponent },
  { path: 'waga', component: WagaComponent },
  { path: 'WagaListaComponent', component: WagaListaComponent },
  { path: 'nr-artk', component: NrArtkComponent },
  { path: 'czas', component: CzasComponent },
  { path: 'naddatki', component: NaddatkiComponent },
  { path: 'wgraj', component: UploadComponent },
  { path: 'calendar-m', component: CalendarMonthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
