import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Auction, AuctionAsset} from "../../interface/auction";

@Component({
  selector: 'app-dialog-component',
  standalone: true,
  imports: [],
  template: `
    hola
  `,
  styles: [``]
})
export class DialogComponentComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: [Auction, AuctionAsset]) {
    console.log(data[0])
  }

  goToAssetPage() {
    window.open(this.data[1].assetLink);
  }
}
