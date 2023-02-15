import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationHistoricalPageRoutingModule } from './reservation-historical-routing.module';

import { ReservationHistoricalPage } from './reservation-historical.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationHistoricalPageRoutingModule
  ],
  declarations: [ReservationHistoricalPage]
})
export class ReservationHistoricalPageModule {}
