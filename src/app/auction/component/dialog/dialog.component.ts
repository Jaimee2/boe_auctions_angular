import {Component, Inject} from '@angular/core';
import {Auction, AuctionAsset} from "../../interface/auction";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  template: `
    <div class="p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Auction Details</h1>

      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-800">Auction Information</h2>
        <p class="text-gray-600"><strong>Identifier:</strong> {{ data[0].identifier }}</p>
        <p class="text-gray-600"><strong>Start Date:</strong> {{ data[0].startDate }}</p>
        <p class="text-gray-600"><strong>End Date:</strong> {{ data[0].endDate }}</p>
        <p class="text-gray-600"><strong>Lots:</strong> {{ data[0].lots }}</p>

        <p class="text-gray-600"><strong>Auction Value:</strong> {{ data[0].auctionValue }}</p>
        <p class="text-gray-600"><strong>Appraisal Value:</strong> {{ data[0].appraisalValue }}</p>
        <p class="text-gray-600"><strong>Minimum Bid:</strong> {{ data[0].minimumBid }}</p>
        <p class="text-gray-600"><strong>Bid Increment:</strong> {{ data[0].bidIncrement }}</p>
        <p class="text-gray-600"><strong>Deposit Amount:</strong> {{ data[0].depositAmount }}</p>
      </div>

      <div class="mb-4">
        <h2 class="text-xl font-semibold text-gray-700">Asset Information</h2>
        <p class="text-gray-600"><strong>Cadastral Reference:</strong> {{ data[1].cadastralReference }}</p>
        <p class="text-gray-600"><strong>Address:</strong> {{ data[1].fullAddress }}</p>
        <p class="text-gray-600"><strong>Coordinates:</strong> {{ data[1].coordinates.lat }}, {{ data[1].coordinates.lon }}</p>
        <p class="text-gray-600"><strong>Postal Code:</strong> {{ data[1].postalCode }}</p>
        <p class="text-gray-600"><strong>City:</strong> {{ data[1].city }}</p>

        <p class="text-gray-600"><strong>Possession Status:</strong> {{ data[1].possessionStatus }}</p>
        <p class="text-gray-600"><strong>Visitable:</strong> {{ data[1].isVisitable }}</p>
        <p class="text-gray-600"><strong>Primary Residence:</strong> {{ data[1].primaryResidence }}</p>
      </div>

      <div class="mt-6">
        <button
          (click)="goToAssetPage()"
          class="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
          Go to Asset Page
        </button>
      </div>
    </div>
  `,
  styles: ``
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: [Auction, AuctionAsset]) {
    console.log(data[0])
  }

  goToAssetPage() {
    window.open(this.data[1].assetLink);
  }

}
