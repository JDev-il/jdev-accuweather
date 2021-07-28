export class CurrentWeatherModel {
    EpochTime?: Date;
    HasPrecipitation?: boolean;
    IsDayTime?: boolean;
    Link?: string;
    LocalObservationDateTime?: Date;
    MobileLink?: string;
    PrecipitationType?: null;
    Temperature?: {Imperial: {Value: number, Unit: string, UnitType: number}, Metric: {Value: number, Unit: string, UnitType: number}};
    WeatherIcon?: number;
    WeatherText?: string;

    constructor(current?: CurrentWeatherModel){
        if(current){
            this.EpochTime = current.EpochTime
            this.HasPrecipitation = current.HasPrecipitation
            this.IsDayTime = current.IsDayTime;
            this.Link = current.Link;
            this.LocalObservationDateTime = current.LocalObservationDateTime;
            this.MobileLink = current.MobileLink;
            this.PrecipitationType = current.PrecipitationType;
            this.Temperature = current.Temperature;
            this.WeatherIcon = current.WeatherIcon;
            this.WeatherText = current.WeatherText;        
        }
    }
}
