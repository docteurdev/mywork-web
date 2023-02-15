import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesMenu } from './services-home.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesMenu,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesMenuRoutingModule {}
