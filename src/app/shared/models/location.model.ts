export class LocationModel {
    Version?: number;
    Key?: string;
    Type?: string;
    Rank?: number;
    LocalizedName?: string;
    Country?: {
        ID: string;
        LocalizedName: string;
    };
    AdministrativeArea?: {};

    constructor(location?: LocationModel){
        if(location){
            this.Version = location.Version;
            this.Key = location.Key;
            this.Type = location.Type;
            this.Rank = location.Rank;
            this.LocalizedName = location.LocalizedName;
            this.Country = location.Country;
            this.AdministrativeArea = this.AdministrativeArea;
        }
    }
}