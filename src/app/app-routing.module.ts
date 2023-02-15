import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './authentification/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./layout/footer/footer.module').then( m => m.FooterPageModule)
  },
  {
    path: 'redirect-to-map',
    loadChildren: () => import('./modules/news/redirect-to-map/redirect-to-map.module').then( m => m.RedirectToMapPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
