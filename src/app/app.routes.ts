import {Routes} from '@angular/router';
import {LandingPageComponent} from "./landing/page/landing-page/landing-page.component";

export const routes: Routes = [
  {
    path: 'landing',
    component: LandingPageComponent
  },
  {
    path: 'map',
    loadChildren: () => import("./auction/auction.routes")
      .then(a => a.auctionRoutes)
  },
  {
    path: '**',
    redirectTo: 'landing'
  }
];
