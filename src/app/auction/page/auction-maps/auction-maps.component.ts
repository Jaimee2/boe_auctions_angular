import {Component, inject, OnInit} from '@angular/core';
import {MapComponent} from "../../component/map.component";
import {AuctionServiceService} from "../../auction-service.service";
import {Auction} from "../../interface/auction";
import {JsonPipe} from "@angular/common";
import {AzureMapComponent} from "../../component/azure-map/azure-map.component";

@Component({
  standalone: true,
  imports: [MapComponent, JsonPipe, AzureMapComponent],
  template: `
    <app-azure-map [auctions]="this.auctions"></app-azure-map>
  `,
  styles: [`

  `]
})
export class AuctionMapsComponent implements OnInit {

  private auctionService = inject(AuctionServiceService);
  protected auctions: Auction[] = [];

  ngOnInit(): void {
    this.auctionService.getAuctions()
      .subscribe(data => this.auctions = data)
  }


}
