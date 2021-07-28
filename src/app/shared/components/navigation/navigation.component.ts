import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { WeatherText } from '../../enums/app-txt.enum';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  fromPageFavorites() {
    const ws = this.weatherService;
    if (!ws.getFavorites.length && ws.getDailyWeather.length) {
      ws.addToFavoritesText = WeatherText.ButtonTxtPre
      ws.icon = "pi pi-heart"
      ws.showChosenForecast = true;
    } else if (!ws.getDailyWeather.length && ws.getFavorites.length) {
      ws.addToFavoritesText = WeatherText.ButtonTxtPost
      ws.icon = "pi pi-check"
      ws.addToFavoritesBtn = true;
      ws.showChosenForecast = false;
      ws.showText = false;
    } else if(!ws.getDailyWeather.length && !ws.getFavorites.length) {
      ws.showChosenForecast = true;
      ws.icon = "pi pi-heart"
      ws.setDailyWeather = [];
      ws.setWeatherByLocation = [];
    } else {
      ws.showChosenForecast = true;
    }
  }

}
