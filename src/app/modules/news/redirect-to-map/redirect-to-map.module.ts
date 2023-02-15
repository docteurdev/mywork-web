import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RedirectToMapPageRoutingModule } from './redirect-to-map-routing.module';

import { RedirectToMapPage } from './redirect-to-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RedirectToMapPageRoutingModule
  ],
  declarations: [RedirectToMapPage]
})
export class RedirectToMapPageModule {}
