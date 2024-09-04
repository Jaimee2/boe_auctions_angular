import {Routes} from "@angular/router";
import {AuctionMapsComponent} from "./page/auction-maps/auction-maps.component";

export const auctionRoutes: Routes =
  [
    {
      path: '',
      component: AuctionMapsComponent,
      children: [
        {path: 'map', component: AuctionMapsComponent},
      ]
    },
  ];
