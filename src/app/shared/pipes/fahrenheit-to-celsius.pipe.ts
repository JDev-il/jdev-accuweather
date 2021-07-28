import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fahrenheitToCelsius'
})
export class FahrenheitToCelsiusPipe implements PipeTransform {

  transform(fahrenheit: number): number {
    let c = 32;
    let calc = Math.round(((fahrenheit - c) * (5/9)) * 10) / 10
  
    return Number(calc)
  }

}
