import { Units } from '../interfaces/unit.interface'
import { CurrentWeatherModel } from './currentweather.model';

export class WeatherModel {
    key?: string;
    type?: string;
    country?: {ID: string, LocalizedName: string};
    city?: string;
    temperature?: {
        Imperial: {
            Value: any,
            Unit: any,
            UnitType: any},
        Metric: {
            Value: any,
            Unit: any,
            UnitType: any}
    };
    date?: Date;
    status?: string;

    constructor(weather?: WeatherModel) {
        if (weather) {
            this.key = weather.key;
            this.type = weather.type;
            this.city = weather.city;
            this.country = weather.country;
            this.temperature = weather.temperature;
            this.date = weather.date;
            this.status = weather.status
        }
    }
}
