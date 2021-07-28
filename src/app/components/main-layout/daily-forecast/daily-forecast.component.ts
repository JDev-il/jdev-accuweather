import { Input, Output, Pipe, ViewChild, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss']
})

export class DailyForecastComponent implements OnInit {

  w = window.innerWidth;

  cardDivStyle = {
    std: {
      'width': '100%',
      'display': 'flex',
      'flex-wrap': 'wrap',
      'margin': '0 auto'
    },
    alt: {
      'width': '100%',
      'display': 'block',
      'flex-flow': 'nowrap',
      'margin': '0 auto'
    }
  }


  show: boolean = false;
  hideDailyForecast: boolean = false;

  @Output() hideForeCastEmit = new EventEmitter();
  @Input() hideForeCastToShowFavorites: boolean = false;

  subscribe?: Subscription;
  loadingSubscription?: Subscription;

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
    const ws = this.weatherService;
    this.subscribe = ws.forecastLoaderSource$.subscribe(forecast => {
      if (forecast) {
        this.show = true
        ws.showText = true;
        setTimeout(() => {
          this.show = false;
        }, 1000);
      } else {  
        this.hideDailyForecast = false;
        ws.showText = false;
      }      
    })
    this.loadingSubscription = ws.loading$.subscribe((load) => {
      // if (load) {
      //   this.weatherService.addToFavoritesBtn = true;
      //   this.show = true;          
      // } else {
      //   setTimeout(() => {
      //     this.show = false;
      //   }, 1000);
      // }
    })    
  }

  async chosenCity(cityKey: any) {
    const ws = this.weatherService;
    ws.showText = true;
    ws.addToFavoritesBtn = true;
    await ws.get5DaysForecast(cityKey.Key)
  }

}
