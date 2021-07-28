import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';


import * as exportedComponents from '../components/exporter';


@NgModule({
  declarations: [
    ...exportedComponents.allComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DialogModule,
    DynamicDialogModule,
    InputTextModule,
    ProgressSpinnerModule,
    TableModule,
    TabMenuModule,
    TabViewModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DialogModule,
    DynamicDialogModule,
    InputTextModule,
    ProgressSpinnerModule,
    TableModule,
    TabMenuModule,
    TabViewModule
  ]
})
export class SharedModule { }
