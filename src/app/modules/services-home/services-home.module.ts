import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesMenu } from './services-home.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ServicesMenuRoutingModule } from './services-home-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ServicesMenuRoutingModule,
  ],
  declarations: [ServicesMenu]
})
export class ServicesMenuModule {}
