import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'views/inicio',
    pathMatch: 'full'
  },
  {
    path: 'views/inicio',
    loadChildren: () => import('./views/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'views/pesquisar',
    loadChildren: () => import('./views/pesquisar/pesquisar.module').then( m => m.PesquisarPageModule)
  },
  {
    path: 'views/login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
