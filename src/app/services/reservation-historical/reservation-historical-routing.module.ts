import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationHistoricalPage } from './reservation-historical.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationHistoricalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationHistoricalPageRoutingModule {}
