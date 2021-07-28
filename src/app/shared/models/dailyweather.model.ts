import { Units } from '../interfaces/unit.interface'
import {Icons} from '../interfaces/icons.interface'

export class DailyForecastModel {
    Date?: Date;
    EpochDate?: Date;
    Temperature?: {
      Minimum: {
        Value: any,
        Unit: any,
        UnitType: any
    },
      Maximum: {
        Value: any,
        Unit: any,
        UnitType: any
      }
    };
    Day?: Icons;
    Night?: Icons;
    Sources?: string[];
    MobileLink?: string;
    Link?: string;


    constructor(daily?: DailyForecastModel){
        if(daily){
            this.Date = daily.Date;
            this.EpochDate = daily.EpochDate;
            this.Temperature = daily.Temperature;
            this.Day = daily.Day;
            this.Night = daily.Night;
            this.Sources = daily.Sources;
            this.MobileLink = daily.MobileLink;
            this.Link = daily.Link;    
        }
    }
}
