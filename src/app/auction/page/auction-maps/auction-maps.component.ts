import {Component, inject, OnInit} from '@angular/core';

import {AuctionServiceService} from "../../auction-service.service";
import {Auction} from "../../interface/auction";
import {JsonPipe, NgClass, NgIf, NgStyle} from "@angular/common";
import {AzureMapComponent} from "../../component/azure-map/azure-map.component";
import {FilterComponent} from "../../component/filter/filter.component";

@Component({
  standalone: true,
  imports: [JsonPipe, AzureMapComponent, NgClass, NgIf, NgStyle, FilterComponent],
  template: `

    <div class=" w-screen flex flex-col">
      <header class="p-4 bg-white text-center">
        <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">Auction Map</h2>
        <button> Filter</button>

      </header>
    </div>

    <div class="flex">
      <app-azure-map [auctions]="this.auctions"
                     class="h-screen w-screen"
      ></app-azure-map>
    </div>

  `
})
export class AuctionMapsComponent implements OnInit {

  protected filterOn: boolean = false;

  protected auctions: Auction[] = [];
  private auctionService = inject(AuctionServiceService);


  ngOnInit(): void {
    this.auctionService.getAuctions().subscribe(data => {
      this.auctions = data
    })
  }

  changeDisplayFilter() {
    this.filterOn = !this.filterOn;
  }

}
