import {Routes} from "@angular/router";

export const auctionRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./page/auction-maps/auction-maps.component')
      .then(m => m.AuctionMapsComponent)
  },
];
