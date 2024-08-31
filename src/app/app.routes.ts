import {Routes} from '@angular/router';
import {AuctionMapsComponent} from "./auction/page/auction-maps/auction-maps.component";
import {LandingPageComponent} from "./landing/page/landing-page/landing-page.component";

export const routes: Routes = [
  {
    path: 'landing',
    component: LandingPageComponent
  },
  {
    path: 'map',
    component: AuctionMapsComponent
  },
  {
    path: '**',
    redirectTo: 'landing'
  }
];
