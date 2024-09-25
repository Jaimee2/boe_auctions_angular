import {Component, Inject} from '@angular/core';
import {Auction, AuctionAsset} from "../../interface/auction";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DatePipe, DecimalPipe} from "@angular/common";
import {Constants} from "../../constants";
import {DateDifferencePipe} from "../../../core/pipe/DateDifference.pipe";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [DatePipe, DecimalPipe, DateDifferencePipe],
  template: `

    <div class="max-w-sm mx-auto p-6 text-center">
      <div class="flex justify-center items-center mb-4">
        <div class="bg-rose-300 rounded-full p-2">
          <img [src]="getIconByAssetType(asset.assetType)" alt="" class="h-8 w-8">
        </div>
      </div>

      <h2 class="text-xl font-semibold mb-2">
        Auction detail
      </h2>


      <p><strong>Identifier:</strong> {{ asset.auctionId }}</p>
      <p><strong>Type:</strong> {{ asset.assetType }}</p>
<!--      <p><strong>Lots:</strong> {{ asset.lots }}</p>-->
      <p><strong>Auction Value:</strong> {{ asset.auctionValue }}</p>
      <p><strong>Appraisal Value:</strong> {{ asset.appraisalValue }}</p>
      <p><strong>Bid Increment:</strong> {{ asset.bidIncrement }}</p>
      <p><strong>Deposit Amount:</strong> {{ asset.depositAmount }}</p>


      <div class="max-w-lg mx-auto p-3">

        <span class="text-sm font-medium">{{ Date() | dateDifference:this.endDate! }}</span>
      </div>

      <div class="flex flex-wrap gap-4 text-center justify-center">
        <a (click)="goToAssetPage()"
           class="rounded bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium py-3 px-4">
          See more
        </a>
        <a (click)="goToAssetPage()"
           class="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700
           focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
           href="#"
        >
          Go to the boe page
        </a>
      </div>

    </div>

  `,
  styles: [``]
})
export class AuctionDialogComponent {

  protected startDate?: Date;
  protected endDate?: Date;

  constructor(@Inject(MAT_DIALOG_DATA) public asset: AuctionAsset) {
    console.log(asset)
    console.log(asset.startDate)
    this.startDate = this.transformDate(asset.startDate);
    this.endDate = this.transformDate(asset.endDate);
  }

  goToAssetPage() {
    window.open(this.asset.assetLink);
  }

  transformDate(dateString: string): Date {
    console.log("data-" + dateString)
    const [day, month, year, time] = dateString.split(/[- :]/);
    console.log(`${year}-${month}-${day}T${time}`);
    const date = new Date(`${year}-${month}-${day} ${time}:00:00`);
    return date;
  }

  getIconByAssetType(assetType: string): string | undefined {
    return Constants.assetIcons.get(assetType);
  }

  protected readonly Date = Date;
}
