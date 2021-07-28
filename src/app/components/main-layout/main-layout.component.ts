import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';


@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {

  defaultWeatherName?: string;
  defaultWeatherDetails?: number;
  
  initialWeather?: Subscription;

  constructor(
    public weatherService: WeatherService,
    public router: Router
  ) { }

  async ngOnInit() {
    const ws = this.weatherService;
    await ws.getLocation().then(()=>{
     this.initialWeather = ws.weatherInit$.subscribe(res =>{
      this.defaultWeatherName = res.city
      this.defaultWeatherDetails = res.temperature?.Metric.Value       
     })
    })
  }

}
