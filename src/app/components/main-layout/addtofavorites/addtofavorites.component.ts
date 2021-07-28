import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { AlertsComponent } from '../../alerts/alerts.component';

import { WeatherText } from 'src/app/shared/enums/app-txt.enum';

@Component({
  selector: 'addtofavorites',
  templateUrl: './addtofavorites.component.html',
  styleUrls: ['./addtofavorites.component.scss']
})
export class AddtofavoritesComponent implements OnInit {

  @Input() buttonText!: string;
  checkOrHeartIcon: boolean = false;

  constructor(public weatherService: WeatherService, public alerts: AlertsComponent) { }

  ngOnInit(): void {
  }

  addForecast() {
    const ws = this.weatherService;
    const fromFavorites = [...ws.getFavorites]
    const inFavorites = fromFavorites.find(f=> f.key === ws.currentWeather.key)
    if(!inFavorites || inFavorites === undefined){
      ws.addToFavoritesText = WeatherText.ButtonTxtPost;
      ws.icon = "pi pi-check"
      ws.addToFavorites().then(()=>{
        this.alerts.addWeatherOrNot(true);
      })
      ws.addToFavoritesBtn = true;
    } else {
      this.alerts.addWeatherOrNot(false);
    }
  }
  

}
