import { Component, Injectable, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-alerts',
  template: ''
})


export class AlertsComponent implements OnInit {

  //WeatherCards
  private weatherExists = Swal.mixin({
    toast: false,
    position: 'center',
    showConfirmButton: true,
    confirmButtonColor: 'grey'
  });
  private addWeather = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 2500
  })


  //Favorites
  private removeWeather = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false  
  });


  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    
  }

  
  addWeatherOrNot(weatherStatus: boolean){
    if(!weatherStatus){
      this.weatherExists.fire({
        icon: 'error',
        title: 'Forecast already exists in list!'
      })
    } else {
      this.addWeather.fire({
        icon: 'success',
        title: 'Forecast successfully added to favorites!'
      })
    }
  };



  async removeFromFavorites(){
    this.removeWeather.fire({
      toast: false,
      showConfirmButton: false,
      title: 'Forecast successfully deleted!',
      icon: 'success',
      timer: 2000
    })  }

}
