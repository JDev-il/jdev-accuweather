import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AlertsComponent } from '../../alerts/alerts.component';

import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { WeatherModel } from 'src/app/shared/models/weather.model';
import { WeatherText } from 'src/app/shared/enums/app-txt.enum';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [DialogService]
})


export class SearchComponent implements OnInit {


  querySubject: Subject<string> = new Subject<string>();
  inputText = new FormControl();
  inputControl!: Subscription;
  resizeSub?: Subscription;


  show?: boolean;
  weather = [];
  display: boolean = false;


  loading: Subject<boolean> = new Subject<boolean>()
  loadingSubscribe?: Subscription;

  
  contentStyle = {
    overflow: 'auto',
    height: '75vh',
    width: '75vw',
    display: 'flex',
    flexFlow: 'column',
    padding: '0px 35px',
    margin: '0',
  };



  constructor(
    public weatherService: WeatherService, 
    public dialogService: DialogService, 
    public alerts: AlertsComponent
    ) {
  }

  
  ngOnInit(): void {
    const ws = this.weatherService;
    // @Observable
    this.inputControl = this.inputText.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(query=>{
      if(!this.inputText.value){
        ws.showText = false;
      }
      ws.setDailyWeather = [];
      ws.selectedWeather = {}
      ws.searchQuery = query.trim().toLowerCase()
      ws.getCityBySearchQuery();
    })
  }

  showDialog(weather: WeatherModel){
    this.weatherService.dialogWeather = weather;
    this.display = true;
  }
  

  ngOnDestroy(): void {
    this.inputControl.unsubscribe()
  }

}
