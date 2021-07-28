import { ChangeDetectionStrategy, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import { WeatherText } from 'src/app/shared/enums/app-txt.enum';
import { WeatherModel } from 'src/app/shared/models/weather.model';
import { AlertsComponent } from '../alerts/alerts.component';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {

  favoriteForecasts: WeatherModel[] = [];
  show: boolean = false;

  @Output() hideForeCastToShowFavorites = new EventEmitter();
  

  loadingSubscription?: Subscription;

  constructor(
    public weatherService: WeatherService,
    public alerts: AlertsComponent,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.loadingSubscription = this.weatherService.loading$.subscribe((load) => {
      if (load) {
        this.show = true;
      } else {
        setTimeout(() => {
          this.show = false;
        }, 1000);
      }
    })
  }

  sendBackToMain() { // "Add Now" button
    const ws = this.weatherService;
    this.hideForeCastToShowFavorites.emit(false)
    ws.showChosenForecast = true;
    ws.addToFavoritesText = WeatherText.ButtonTxtPre
    ws.showText = false;
    if(!ws.getDailyWeather.length){
      ws.addToFavoritesBtn = true;
    } else {
      ws.addToFavoritesBtn = false;
    }
    this.route.navigate(['/']);
  }

  showSelectedForecast(weather: WeatherModel) { // "Show Forecast" button in card 
    const ws = this.weatherService;
    Promise.all([this.weatherService.selectedWeather = weather])
      .then(() => {
        this.hideForeCastToShowFavorites.emit(true)
        ws.showChosenForecast = true;
        ws.addToFavoritesBtn = true;
        ws.addToFavoritesText = WeatherText.ButtonTxtPost
        ws.showText = false;
        ws.setDailyWeather = [];
        ws.setWeatherByLocation = [];    
        this.route.navigate(['/']);
      })
      .catch(err => err)
  }

  async removeForeCast(weather: WeatherModel) { // "Remove Forecast" button in card
    await this.weatherService.removeForecast(weather).then(() => {
      this.alerts.removeFromFavorites()
    })
  }
}
