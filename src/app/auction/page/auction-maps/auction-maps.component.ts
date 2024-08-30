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

    <div class="flex bg-red-600">
      <div class="flex-none basis-1/6">
        01 --------

      </div>
      <app-azure-map [auctions]="this.auctions"
                     class="flex-auto bg-red-600 h-screen"
      ></app-azure-map>

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
