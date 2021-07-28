import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./components/main-layout/main.module').then(m => m.MainModule)},
  {path: '', loadChildren: () => import('./components/favorites/favorites.module').then(m => m.FavoritesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
