import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';


@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MainLayoutComponent implements OnInit {


  //! TEMPORARY WEATHER
  TEMPdefaultWeatherName?: string;
  TEMPdefaultWeatherDetails?: number;



  constructor(
    public weatherService: WeatherService,
    public router: Router
  ) { }

  ngOnInit() {
    const ws = this.weatherService;
    this.TEMPdefaultWeatherName = ws.initialWeatherTempName.LocalizedName
    this.TEMPdefaultWeatherDetails = ws.initialWeatherTempDetails.Temperature.Metric.Value;
    ws.showChosenForecast = false;
    // ws.getLocation().then(()=>{

    // })
  }

}
