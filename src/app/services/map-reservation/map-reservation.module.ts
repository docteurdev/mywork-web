import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapReservationPageRoutingModule } from './map-reservation-routing.module';

import { MapReservationPage } from './map-reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapReservationPageRoutingModule
  ],
  declarations: [MapReservationPage]
})
export class MapReservationPageModule {}
