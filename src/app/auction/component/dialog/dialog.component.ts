import {Component, Inject} from '@angular/core';
import {Auction, AuctionAsset} from "../../interface/auction";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";
import {Constants} from "../../constants";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [DatePipe],
  template: `

    <div class="max-w-sm mx-auto p-6 text-center">
      <div class="flex justify-center items-center mb-4">
        <div class="bg-white rounded-full p-2">
          <img [src]="getIconByAssetType(data[1].assetType)" alt="" class="h-8 w-8">
        </div>
      </div>

      <h2 class="text-xl font-semibold mb-2">
        Auction detail
      </h2>

      <p><strong>Identifier:</strong> {{ data[0].identifier }}</p>
      <p><strong>Type:</strong> {{ data[1].assetType }}</p>

      <p><strong>Lots:</strong> {{ data[0].lots }}</p>

      <p><strong>Appraisal Value:</strong> {{ data[0].appraisalValue }}</p>
      <p><strong>Minimum Bid:</strong> {{ data[0].minimumBid }}</p>
      <p><strong>Bid Increment:</strong> {{ data[0].bidIncrement }}</p>
      <p><strong>Deposit Amount:</strong> {{ data[0].depositAmount }}</p>

      <div class="max-w-lg mx-auto p-4">
        <div class="flex space-x-20 mb-2">
          <span class="text-sm font-medium ">{{ this.startDate | date }}</span>
          <span class="text-sm font-medium">{{ this.endDate |date }}</span>
        </div>
      </div>

      <button (click)="goToAssetPage()"
              class="bg-gray-400 text-white font-bold py-2 px-4 rounded hover:bg-gray-500">
        Go to asset page
      </button>

    </div>

  `,
  styles: [``]
})
export class DialogComponent {

  protected startDate?: Date;
  protected endDate?: Date;

  constructor(@Inject(MAT_DIALOG_DATA) public data: [Auction, AuctionAsset]) {
    console.log(data)
    this.startDate = this.transformDate(data[0].startDate);
    this.endDate = this.transformDate(data[0].endDate);
  }

  goToAssetPage() {
    window.open(this.data[1].assetLink);
  }

  transformDate(dateString: string): Date {
    const [day, month, year, time] = dateString.split(/[- :]/);
    console.log(`${year}-${month}-${day}T${time}`);
    const date = new Date(`${year}-${month}-${day} ${time}:00:00`);
    return date;
  }

  getIconByAssetType(assetType: string): string | undefined {
    return Constants.assetIcons.get(assetType);
  }

}
