import {Component, inject, OnInit} from '@angular/core';

import {AuctionServiceService} from "../../auction-service.service";
import {Auction} from "../../interface/auction";
import {JsonPipe, NgClass, NgIf, NgStyle} from "@angular/common";
import {AzureMapComponent} from "../../component/azure-map/azure-map.component";
import {hidden} from "ansi-colors";

@Component({
  standalone: true,
  imports: [JsonPipe, AzureMapComponent, NgClass, NgIf, NgStyle],
  template: `

    <div class=" w-screen flex flex-col">
      <!-- Header at the top of the page -->
      <header class="p-4 bg-white text-center">
        <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">Auction Map</h2>
      </header>
    </div>

    <div class="lg:flex">
      <div class="lg:flex-none lg:basis-1/4">
        01 --------

      </div>

      <div class="lg:flex-auto lg:basis-3/4">
          <app-azure-map [auctions]="this.auctions"></app-azure-map>
      </div>

    </div>

  `
})
export class AuctionMapsComponent implements OnInit {

  protected auctions: Auction[] = [];
  private auctionService = inject(AuctionServiceService);


  ngOnInit(): void {
    this.auctionService.getAuctions().subscribe(data => {
      this.auctions = data
    })
  }
}
