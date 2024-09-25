import {Component, inject, OnInit} from '@angular/core';

import {AssetService} from "../../asset.service";
import {Auction, AuctionAsset} from "../../interface/auction";
import {JsonPipe, NgClass, NgStyle} from "@angular/common";
import {AzureMapComponent} from "../../component/azure-map/azure-map.component";
import {RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {FilterDialogComponent} from "../../component/dialog/filter-dialog.component";
import {LoadingSpinnerComponent} from "../../../core/loading-spinner/loading-spinner.component";

@Component({
  standalone: true,
  imports: [JsonPipe, AzureMapComponent, NgClass, NgStyle, RouterLink, LoadingSpinnerComponent],
  template: `
    <div class="h-svh w-svw">
      <div class="" id="div1">
        <header class="bg-white text-center h-full">
          <h2
            class="text-xl sm:text-4xl font-extrabold text-rose-700 pt-2"
          >
            <button routerLink=""> Auction Map</button>
          </h2>
          <button (click)="this.openFilterDialog()"
                  class="mt-2 sm:text-2xl">
            Filter
          </button>
        </header>
      </div>

      @if (!isLoaded) {
        <app-loading-spinner></app-loading-spinner>
      } @else {
        <div id="div2">
          <app-azure-map [auctionAssets]="this.assets"></app-azure-map>
        </div>
      }
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

  isLoaded: boolean = false;
  protected assets: AuctionAsset[] = [];
  private auctionService = inject(AssetService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.fetchAuctions();
  }

  protected openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '50vh',
      height: '70vh'
    });

    dialogRef.componentInstance.filter.subscribe((filters: any) => {
      console.log(filters);
      this.fetchAuctions(filters);
      dialogRef.close();
    });
  }

  private fetchAuctions(filters?: any): void {
    this.isLoaded = false;
    this.auctionService.getAsset(filters).subscribe(data => {
      this.assets = data;
      this.isLoaded = true;
    });
  }

}
