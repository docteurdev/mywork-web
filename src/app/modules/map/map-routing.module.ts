import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Map } from './map.page';

const routes: Routes = [
  {
    path: '',
    component: Map,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule {}
