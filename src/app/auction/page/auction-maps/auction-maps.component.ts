import {Component, inject, OnInit} from '@angular/core';

import {AuctionServiceService} from "../../auction-service.service";
import {Auction} from "../../interface/auction";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {AzureMapComponent} from "../../component/azure-map/azure-map.component";

@Component({
  standalone: true,
  imports: [JsonPipe, AzureMapComponent, NgClass, NgIf],
  template: `

    <div class="container-fluid">
      <div class="row">
        <!-- Toggle Button -->
        <div class="col-12 mb-3">
          <button class="btn btn-light" type="button" (click)="toggleFilter()">
            {{ showFilter ? 'Hide Filters' : 'Show Filters' }}
          </button>
        </div>

        <!-- Sidebar for Filter -->
        @if (showFilter) {
          <div class="col-md-3">
            <div class="card">
              <div class="card-header">
                Filters
              </div>
              <div class="card-body">
                <!-- Add your filter inputs here -->
                <div class="form-group">
                  <label for="filter1">Filter 1</label>
                  <input type="text" class="form-control" id="filter1">
                </div>
                <div class="form-group">
                  <label for="filter2">Filter 2</label>
                  <select class="form-control" id="filter2">
                    <option value="">Select an option</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                  </select>
                </div>
                <!-- Add more filters as needed -->
              </div>
            </div>
          </div>
        }

        <!-- Main Content Area -->
        <div [ngClass]="showFilter ? 'col-md-9' : 'col-12'">
          <app-azure-map [auctions]="this.auctions"></app-azure-map>
        </div>
      </div>
    </div>

  `,
  styles: [`
    .container-fluid {
      margin: 0;
      padding: 0;
    }
  `]
})
export class AuctionMapsComponent implements OnInit {

  private auctionService = inject(AuctionServiceService);
  protected auctions: Auction[] = [];

  showFilter = true;

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  ngOnInit(): void {
    this.auctionService.getAuctions()
      .subscribe(data => this.auctions = data)
  }


}
