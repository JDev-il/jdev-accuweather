import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


/*=====  PrimeNG  ======*/
import { SharedModule } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


/*=====  Components  ======*/
import { AppComponent } from './app.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AppRoutingModule } from './app-routing.module';


import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NavigationComponent } from './shared/components/navigation/navigation.component';


/*=====  Pipes  ======*/


@NgModule({
  declarations: [
    AppComponent,
    AlertsComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ProgressSpinnerModule
  ],
  providers: [NavigationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
