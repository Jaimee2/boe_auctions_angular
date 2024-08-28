import {Component, inject, OnInit} from '@angular/core';

import {AuctionServiceService} from "../../auction-service.service";
import {Auction} from "../../interface/auction";
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {AzureMapComponent} from "../../component/azure-map/azure-map.component";

@Component({
  standalone: true,
  imports: [JsonPipe, AzureMapComponent, NgClass, NgIf],
  template: `
    <div class="flex h-screen">
      <!-- Toggle Button -->
      <div class="fixed top-5 left-4 z-50">
        <button (click)="toggleSidebar()"
                class="p-2 text-gray-900 rounded-md hover:bg-gray-200 bg-white"
        >
          <img alt="toggle icon" class="w-6 h-6"
               src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/icons/list.svg">
        </button>
      </div>

      <!-- Sidebar -->
      <div [ngClass]="{'-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen}"
           class="fixed inset-y-0 left-0 w-64 bg-white text-gray-900 shadow-md transform transition-transform duration-300">

        <!-- Navigation Links -->
        <nav class="flex-1 px-4 py-4 space-y-2 pt-16">
          <a class="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-200" href="#">
            <img alt="home icon" class="w-5 h-5 text-gray-600"
                 src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/icons/house.svg">
            <span>Home</span>
          </a>
          <a class="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-200" href="#">
            <img alt="products icon" class="w-5 h-5 text-gray-600"
                 src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/icons/box.svg">
            <span>Products</span>
          </a>
          <a class="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-200" href="#">
            <img alt="team icon" class="w-5 h-5 text-gray-600"
                 src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/icons/people.svg">
            <span>Team</span>
          </a>
          <a class="flex items-center p-2 space-x-2 rounded-md hover:bg-gray-200" href="#">
            <img alt="settings icon" class="w-5 h-5 text-gray-600"
                 src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/icons/gear.svg">
            <span>Settings</span>
          </a>
        </nav>
      </div>

      <!-- Main Content -->
      <div [ngClass]="{'ml-64': isSidebarOpen, 'ml-0': !isSidebarOpen}"
           class="flex-1 lg:pl-16 p-5 transition-all duration-300">
        <app-azure-map [auctions]="this.auctions"></app-azure-map>
      </div>
    </div>
  `
})
export class AuctionMapsComponent implements OnInit {

  private auctionService = inject(AuctionServiceService);
  protected auctions: Auction[] = [];

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit(): void {
    this.auctionService.getAuctions().subscribe(data => {this.auctions = data})
  }

}
