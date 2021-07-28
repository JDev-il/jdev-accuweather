import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { FavoritesRoutingModule } from './favorites-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    SharedModule
  ],
})
export class FavoritesModule { }
