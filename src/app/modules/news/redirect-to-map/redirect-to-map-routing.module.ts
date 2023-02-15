import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedirectToMapPage } from './redirect-to-map.page';

const routes: Routes = [
  {
    path: '',
    component: RedirectToMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedirectToMapPageRoutingModule {}
