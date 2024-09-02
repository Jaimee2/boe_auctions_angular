import {Component, inject, OnInit} from '@angular/core';

import {AuctionServiceService} from "../../auction-service.service";
import {Auction} from "../../interface/auction";
import {JsonPipe, NgClass, NgIf, NgStyle} from "@angular/common";
import {AzureMapComponent} from "../../component/azure-map/azure-map.component";
import {FilterComponent} from "../../component/filter/filter.component";
import {RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "../../component/dialog/filter-dialog.component";

@Component({
  standalone: true,
  imports: [JsonPipe, AzureMapComponent, NgClass, NgIf, NgStyle, FilterComponent, RouterLink],
  template: `

    <div class="h-svh w-svw">
      <div id="div1" class="">
        <header class="bg-white text-center h-full">
          <h2 class="text-xl sm:text-4xl font-extrabold text-rose-700 pt-2"
              [routerLink]="''"
          >
            Auction Map
          </h2>

          <button (click)="this.openFilterDialog()" class="mt-2 sm:text-2xl">Filter</button>
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

  protected auctions: Auction[] = [];
  private auctionService = inject(AuctionServiceService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.auctionService.getAuctions().subscribe(data => {
      this.auctions = data
    })
  }

  protected openFilterDialog(): void {
    this.dialog.open(FilterDialogComponent, {
      width: '600px',
      height: '600px'
    })
  }

}
