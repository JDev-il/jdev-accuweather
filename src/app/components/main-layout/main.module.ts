import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { MainRoutingModule } from './main-routing.module';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
})
export class MainModule { }
