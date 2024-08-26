import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {Auction, AuctionAsset} from "../../interface/auction";

@Component({
  selector: 'app-dialog-component',
  standalone: true,
  imports: [
    MatDialogModule, MatButtonModule
  ],
  template: `
    <h1 mat-dialog-title>Auction Details</h1>
    <mat-dialog-content class="mat-typography">
      <p><strong>Auction ID:</strong> {{ data[0].identifier }}</p>
<!--      <p><strong>Type:</strong> {{ data[0].auctionType }}</p>-->
      <p><strong>Appraisal Value:</strong> {{ data[0].appraisalValue }}</p>
      <p><strong>Minimum Bid:</strong> {{ data[0].minimumBid }}</p>
      <p><strong>Deposit Amount</strong> {{ data[0].depositAmount }}</p>

      <link>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
      <button mat-button (click)="goToAssetPage()" cdkFocusInitial>
        Go to the Asset Page
      </button>
    </mat-dialog-actions>
  `,
  styles: [``]
})
export class DialogComponentComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: [Auction, AuctionAsset]) {
    console.log(data[0])
  }

  goToAssetPage(){
    window.open(this.data[1].assetLink);
  }
}
