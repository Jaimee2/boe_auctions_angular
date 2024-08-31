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

    <div class="h-svh w-svw">
      <div id="div1">
        <header class="bg-white text-center h-full">
          <h2 class="text-xl font-bold text-gray-900 pt-3">Auction Map</h2>
          <button class="mt-3">Filter</button>
        </header>
      </div>
      <div id="div2">
        <app-azure-map [auctions]="this.auctions">
        </app-azure-map>
      </div>
    </div>

  `,
  styles: [`
    #div1 {
      height: 10svh;
      width: 100svw;
    }
    #div2 {
      height: 90svh;
      width: 100svw;
    }
  `]
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
