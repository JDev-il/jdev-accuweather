import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'default-forecast',
  templateUrl: './default-forecast.component.html',
  styleUrls: ['./default-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultForecastComponent implements OnInit {


  @Input() defaultWeatherName?: string;
  @Input() defaultWeatherDetails?: number;
  
  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
    
  }

}
