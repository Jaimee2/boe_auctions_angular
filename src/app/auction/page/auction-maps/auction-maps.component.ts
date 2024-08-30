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

    <div class="m-2  py-8 sm:px-6 sm:py-12 lg:px-8 border-8">
      <header>
        <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">Auction Map </h2>

        <!--        <p class="max-w-md text-gray-500">-->
        <!--          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure-->
        <!--          dicta incidunt est ipsam, officia dolor fugit natus?-->
        <!--        </p>-->
      </header>

      <div (click)="toggleSidebar()" class="mt-4 block">
        <button
          class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
          <span class="text-sm font-medium"> Filters & Sorting </span>

          <svg
            class="size-4 rtl:rotate-180"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.25 4.5l7.5 7.5-7.5 7.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="mt-4 lg:mt-8 grid lg:grid-cols-4 lg:items-start border-8">
        <!--        navBar filter -->
        <div [ngClass]="{'hidden':!isSidebarOpen}" class="space-y-4 block">
          <div>
            <p class="block text-xs font-medium text-gray-700">Filters</p>

            <div class="mt-1 space-y-2">
              <details
                class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary
                  class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                >
                  <span class="text-sm font-medium"> Availability </span>

                  <span class="transition group-open:-rotate-180">
                  <svg
                    class="size-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                </summary>

                <div class="border-t border-gray-200 bg-white">
                  <header class="flex items-center justify-between p-4">
                    <span class="text-sm text-gray-700"> 0 Selected </span>

                    <button class="text-sm text-gray-900 underline underline-offset-4" type="button">
                      Reset
                    </button>
                  </header>

                  <ul class="space-y-1 border-t border-gray-200 p-4">
                    <li>
                      <label class="inline-flex items-center gap-2" for="FilterInStock">
                        <input
                          class="size-5 rounded border-gray-300"
                          id="FilterInStock"
                          type="checkbox"
                        />

                        <span class="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                      </label>
                    </li>

                    <li>
                      <label class="inline-flex items-center gap-2" for="FilterPreOrder">
                        <input
                          class="size-5 rounded border-gray-300"
                          id="FilterPreOrder"
                          type="checkbox"
                        />

                        <span class="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                      </label>
                    </li>

                    <li>
                      <label class="inline-flex items-center gap-2" for="FilterOutOfStock">
                        <input
                          class="size-5 rounded border-gray-300"
                          id="FilterOutOfStock"
                          type="checkbox"
                        />

                        <span class="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
                      </label>
                    </li>
                  </ul>
                </div>
              </details>

              <details
                class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary
                  class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                >
                  <span class="text-sm font-medium"> Price </span>

                  <span class="transition group-open:-rotate-180">
                  <svg
                    class="size-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                </summary>

                <div class="border-t border-gray-200 bg-white">
                  <header class="flex items-center justify-between p-4">
                    <span class="text-sm text-gray-700"> The highest price is $600 </span>

                    <button class="text-sm text-gray-900 underline underline-offset-4" type="button">
                      Reset
                    </button>
                  </header>

                  <div class="border-t border-gray-200 p-4">
                    <div class="flex justify-between gap-4">
                      <label class="flex items-center gap-2" for="FilterPriceFrom">
                        <span class="text-sm text-gray-600">$</span>

                        <input
                          class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          id="FilterPriceFrom"
                          placeholder="From"
                          type="number"
                        />
                      </label>

                      <label class="flex items-center gap-2" for="FilterPriceTo">
                        <span class="text-sm text-gray-600">$</span>

                        <input
                          class="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                          id="FilterPriceTo"
                          placeholder="To"
                          type="number"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </details>

              <details
                class="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary
                  class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                >
                  <span class="text-sm font-medium"> Colors </span>

                  <span class="transition group-open:-rotate-180">
                  <svg
                    class="size-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                </summary>

                <div class="border-t border-gray-200 bg-white">
                  <header class="flex items-center justify-between p-4">
                    <span class="text-sm text-gray-700"> 0 Selected </span>

                    <button class="text-sm text-gray-900 underline underline-offset-4" type="button">
                      Reset
                    </button>
                  </header>

                  <ul class="space-y-1 border-t border-gray-200 p-4">
                    <li>
                      <label class="inline-flex items-center gap-2" for="FilterRed">
                        <input
                          class="size-5 rounded border-gray-300"
                          id="FilterRed"
                          type="checkbox"
                        />

                        <span class="text-sm font-medium text-gray-700"> Red </span>
                      </label>
                    </li>

                    <li>
                      <label class="inline-flex items-center gap-2" for="FilterBlue">
                        <input
                          class="size-5 rounded border-gray-300"
                          id="FilterBlue"
                          type="checkbox"
                        />

                        <span class="text-sm font-medium text-gray-700"> Blue </span>
                      </label>
                    </li>

                    <li>
                      <label class="inline-flex items-center gap-2" for="FilterGreen">
                        <input
                          class="size-5 rounded border-gray-300"
                          id="FilterGreen"
                          type="checkbox"
                        />

                        <span class="text-sm font-medium text-gray-700"> Green </span>
                      </label>
                    </li>

                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div [ngClass]="{'': isSidebarOpen, 'ml-0': !isSidebarOpen}" class="ml-8">
          <app-azure-map [auctions]="this.auctions" [height]=mapHeight [width]=mapWidth></app-azure-map>
        </div>

      </div>
    </div>
  `
})
export class AuctionMapsComponent implements OnInit {

  isSidebarOpen = true;
  protected auctions: Auction[] = [];
  private auctionService = inject(AuctionServiceService);

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnInit(): void {
    this.auctionService.getAuctions().subscribe(data => {
      this.auctions = data
    })
  }

  get mapHeight(): string {
    return this.isSidebarOpen ? '80vh' : '60vh';
  }

  get mapWidth(): string {
    return this.isSidebarOpen ? '70vw' : '100vw';
  }
}
