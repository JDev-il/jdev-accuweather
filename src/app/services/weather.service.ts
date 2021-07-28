/*=====  Initial Imports  ======*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'


/*=====  Models & Interfaces =====*/
import { LocationModel } from '../shared/models/location.model';
export interface weatherInterface { city?: String, temperature?: Number }


/*=====  RxJS =====*/
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentWeatherModel } from '../shared/models/currentweather.model';
import { WeatherModel } from '../shared/models/weather.model';


/*=====  Enums =====*/
import { WeatherText } from '../shared/enums/app-txt.enum';

/* TEMPORARY JSON FILE */
import { jerusalemCities } from '../dailyforecast.json';
import { DailyForecastModel } from '../shared/models/dailyweather.model';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {



  /* Global Variables
  -------------------------------------------------- */


  dailyForeCastTemp = jerusalemCities;


  searchQuery!: string;
  searchModel!: string;


  //# AddToFavoritesComponent
  addToFavoritesBtn: boolean = true
  addToFavoritesText: string = WeatherText.ButtonTxtPre;
  icon: string = "pi pi-heart";
  inFavoritesObject!: WeatherModel;
  
  showChosenForecast: boolean = false;
  showText: boolean = false;

  confirmDelete?: boolean;


  initialWeather: WeatherModel = {}
  currentWeather: WeatherModel = {};
  selectedWeather: WeatherModel = {}

  locationWeather: LocationModel[] = [];
  dailyForecast: DailyForecastModel[] = []

  dialogWeather?: WeatherModel;


  /* Private Variables & Observables
  -------------------------------------------------- */
  private path = environment.accurateWeather;

  // @Observables //
  private LoadingSource = new Subject<boolean>();
  private forecastLoaderSource = new Subject<boolean>();
  private WeatherInitSource = new BehaviorSubject<WeatherModel>({});
  private WeatherDailySource = new BehaviorSubject<DailyForecastModel[]>([]);
  private InFavoritesSource = new BehaviorSubject<WeatherModel[]>([])

  readonly loading$ = this.LoadingSource.asObservable();
  readonly forecastLoaderSource$ = this.forecastLoaderSource.asObservable();
  readonly weatherInitSource$ = this.WeatherInitSource.asObservable();
  readonly weatherDailySource$ = this.WeatherDailySource.asObservable();
  readonly inFavoritesSource$ = this.InFavoritesSource.asObservable()


  constructor(private httpApi: HttpClient) { }


  //!TEMPORARY
  initialWeatherTempName =
    {
      "Version": 1,
      "Key": "215854",
      "Type": "City",
      "Rank": 31,
      "LocalizedName": "Tel Aviv",
      "Country": { "ID": "IL", "LocalizedName": "Israel" },
      "AdministrativeArea": { "ID": "TA", "LocalizedName": "Tel Aviv" }
    }

  initialWeatherTempDetails =
    {
      "LocalObservationDateTime": "2021-07-03T10:25:00+03:00",
      "EpochTime": 1625297100,
      "WeatherText": "Sunny",
      "WeatherIcon": 1,
      "HasPrecipitation": false,
      "PrecipitationType": null,
      "IsDayTime": true,
      "Temperature": {
        "Metric": { "Value": 31.2, "Unit": "C", "UnitType": 17 },
        "Imperial": { "Value": 88.0, "Unit": "F", "UnitType": 18 }
      },
      "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
    }




  //# Setters & Getters //
  /*-------------------------------------------------- */

  //~* Initial weather setter;
  set setInitWeather(initialWeather: WeatherModel) {
    this.WeatherInitSource.next(initialWeather)
  }
  //^ Initial weather getter;
  get getInitialWeather() {
    return this.WeatherInitSource.getValue()
  }


  //~* Weather by location setter;
  set setWeatherByLocation(weather: LocationModel[]) {    
    this.locationWeather = weather;
  }
  //^ Weather by location getter;
  get getWeatherByLoaction() {
    return this.locationWeather;
  }


  //~* Weather by daily forcast setter;
  set setDailyWeather(weather: DailyForecastModel[]) {
    this.WeatherDailySource.next(weather)
  }
  //^ Weather by daily forecast getter;
  get getDailyWeather() {
    return this.WeatherDailySource.getValue();
  }


  //~* Weather favorites setter;
  set setFavorites(favorites: WeatherModel[]){
    this.InFavoritesSource.next(favorites)
  }
  //^ Weather favorites setter getter;
  get getFavorites(){
    return this.InFavoritesSource.getValue()
  }


  //! TEMPORARY >> Initial Weather @ MainComponent
  get getTempWeather() {
    return this.dailyForeCastTemp;
  }


  /*=============================================
  =            Initial Events                   =
  =============================================*/


  private get WeatherRoutes() {
    return {
      location: 'locations/v1/cities/autocomplete?apikey=:api&q=:q',
      current: 'currentconditions/v1/:key?apikey=:api',
      daily: 'forecasts/v1/daily/5day/:key?apikey=:api'
    };
  }


  async getLocation() {
    // const city = this.path + this.WeatherRoutes.location
    //   .replace(':api', String(environment.apiKey))
    //   .replace(':q', 'tel aviv');
    // this.httpApi.get(city).pipe(map((data: any) => data[0])).subscribe((city: LocationModel) => {
    //   if (city) {
    //     const current = this.path + this.WeatherRoutes.current
    //       .replace(':api', String(environment.apiKey))
    //       .replace(':key', String(city.Key));
    //     this.httpApi.get(current).pipe(map((data: any) => data[0])).subscribe((current: CurrentcurrentModel) => {
    //       this.initialWeather = {
    //         city: city.LocalizedName,
    //         temperature: current.Temperature?.Metric.Value 
    //       }
    //     })
    //   }
    // })
  }


  /*=====  End of Initial Events  ======*/




  /*=============================================
  =            Event Driven Actions             =
  =============================================*/


  //# SearchComponent | Event: (keyup)
  async getCityBySearchQuery() {
    this.icon = "pi pi-heart";
    this.addToFavoritesBtn = true;  
    this.addToFavoritesText = WeatherText.ButtonTxtPre;
    if (this.searchQuery.length) {  
      this.forecastLoaderSource.next(true)
      this.LoadingSource.next(true)
      const city = this.path + this.WeatherRoutes.location
        .replace(':api', String(environment.apiKey))
        .replace(':q', String(this.searchQuery));
      this.httpApi.get(city).pipe(map((data: any) => data)).subscribe((res: LocationModel[]) => {
        this.setWeatherByLocation = res;
        this.LoadingSource.next(true);
      })
    } else {
      this.setWeatherByLocation = []
      this.setDailyWeather = [];
      this.selectedWeather = {};
      this.currentWeather = {};
    }

  }

  //# DailyForecastComponent | Event: (click)
  async get5DaysForecast(key: string) {
    this.forecastLoaderSource.next(true)
    const currentCity = this.path + this.WeatherRoutes.current
      .replace(':api', String(environment.apiKey))
      .replace(':key', String(key))
    this.httpApi.get(currentCity).pipe(map((data: any) => data[0])).subscribe((result: CurrentWeatherModel) => {        
      const foundCity = this.getWeatherByLoaction.find(f => f.Key === key);      
      if (foundCity) {
        const details: WeatherModel = {
          key: foundCity.Key,
          country: foundCity.Country,
          city: foundCity.LocalizedName,
          type: foundCity.Type,
          temperature: result.Temperature,
          date: result.LocalObservationDateTime,
          status: result.WeatherText
        } 
        this.addToFavoritesBtn = false;
          const findFavorite = this.getWeatherByLoaction.map(f=>{
            return this.getFavorites.find(x => x.key ===  f.Key && x.city?.toUpperCase() === f.LocalizedName?.toUpperCase())
          })
          if(findFavorite[0]){
            this.addToFavoritesBtn = true;
            this.inFavoritesObject = findFavorite[0]
            this.addToFavoritesText = WeatherText.ButtonTxtPost;
            this.icon = "pi pi-check";
          } else {
            this.addToFavoritesText = WeatherText.ButtonTxtPre;
            this.addToFavoritesBtn = false;
            this.icon = "pi pi-heart";
          }
        this.currentWeather = details;        
      }
      const dailyForecast = this.path + this.WeatherRoutes.daily
        .replace(':api', String(environment.apiKey))
        .replace(':key', String(key))
      this.httpApi.get(dailyForecast).pipe(map((data: any) => data.DailyForecasts)).subscribe((daily: DailyForecastModel[]) => {
        this.LoadingSource.next();
        if (daily.length) {
          this.forecastLoaderSource.next(); 
        }  
        this.setDailyWeather = daily;
      })
    })
  }



  async addToFavorites() {
    this.addToFavoritesBtn = true;  
    const favoritesArr = [...this.getFavorites, this.currentWeather];
    this.selectedWeather = this.currentWeather;
    this.setFavorites = favoritesArr
  }


  async removeForecast(weather: WeatherModel){       
    const favorites = [...this.getFavorites];    
    const foundInFavorites = favorites.find(f => f.key === weather.key);
    if (foundInFavorites) {
      const findIndexOfForecast = favorites.findIndex(i => i.key === foundInFavorites.key);
      favorites.splice(findIndexOfForecast, 1);
      this.setFavorites = favorites;
      this.setDailyWeather = [];
      // this.currentWeather = {};
      this.currentWeather = this.inFavoritesObject
      this.showChosenForecast = false;
      if(!this.getFavorites.length){
        this.setDailyWeather = [];
        this.setWeatherByLocation = [];
        this.addToFavoritesBtn = true;
        this.addToFavoritesText = WeatherText.ButtonTxtPre;
        this.icon = "pi pi-heart";
      }
    }
  }

  /*=====  End of Event Driven Actions  ======*/







}
