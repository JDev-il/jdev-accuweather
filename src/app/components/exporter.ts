
//^ Parent Components
import { MainLayoutComponent } from './main-layout/main-layout.component'
import { FavoritesComponent } from './favorites/favorites.component';

//* Child Components
import { SearchComponent } from './main-layout/search/search.component';
import { DailyForecastComponent } from './main-layout/daily-forecast/daily-forecast.component';
import { DefaultForecastComponent } from './main-layout/default-forecast/default-forecast.component';
import { AddtofavoritesComponent } from './main-layout/addtofavorites/addtofavorites.component';
import { FahrenheitToCelsiusPipe } from 'src/app/shared/pipes/fahrenheit-to-celsius.pipe';




export const allComponents: any[] = [
    MainLayoutComponent,
    FavoritesComponent,
    SearchComponent,
    DailyForecastComponent,
    DefaultForecastComponent,
    AddtofavoritesComponent,
    FahrenheitToCelsiusPipe,

]
