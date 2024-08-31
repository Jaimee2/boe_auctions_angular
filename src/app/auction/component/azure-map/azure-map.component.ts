import {Component, ElementRef, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AuthenticationType, data, HtmlMarker, Map as AzureMap} from 'azure-maps-control';
import {Auction, AuctionAsset} from '../../interface/auction';
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Constants} from "../../constants";

@Component({
  selector: 'app-azure-map',
  standalone: true,
  imports: [],
  template: `
    <div #map id="map" class=""></div>
  `,
  styles: [`

    #map {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
  `]
})
export class AzureMapComponent implements OnInit, OnChanges {
  @ViewChild('map', {static: true}) mapContainer!: ElementRef;
  @Input() auctions!: Auction[];
  private map!: AzureMap;
  private dialog = inject(MatDialog);

  constructor() {
  }

  ngOnInit() {
    this.initializeMap();

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("this changed !! ")
    if (changes['auctions']) {
      this.addMarkers();
      this.centerMap();
    }
  }

  private initializeMap() {

    this.map = new AzureMap(this.mapContainer?.nativeElement, {
      center: [-3.7035825, 40.4167047], // Centered on Madrid
      zoom: 10,
      language: 'en-US',
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: 'XRKf4AGk19X05G3NDvSmYinOvIHsyGaJiVkNijAwtsvKWJCqVmOMJQQJ99AHAC5RqLJ2gwi4AAAgAZMP2t9J'
      }
    });

    this.map.events.add('ready', () => {
      this.addMarkers();
      this.centerMap();
    });
  }

  private addMarkers() {
    if (this.map && this.auctions && this.auctions.length == 0) return;

    this.auctions.forEach(auction => {
      if (auction.assets && auction.assets.length == 0) return;

      auction.assets.forEach(asset => {
        if (asset.coordinates) {
          const position = [parseFloat(asset.coordinates.lon), parseFloat(asset.coordinates.lat)];
          const iconUrl = Constants.assetIcons.get(asset.assetType);
          const marker = new HtmlMarker({
            position: position,
            htmlContent: `
                  <div class="bg-white rounded-full p-2 m-2">
                  <img alt="house" class="h-5 w-5" src="${iconUrl}">
                  </div>`,
          });

          this.map.markers.add(marker);

          this.map.events.add('click', marker, () => {
            marker.togglePopup();
            console.log("Click!")
            this.openDialog(auction, asset)
          });

        }
      });

    });

  }

  private openDialog(auction: Auction, asset: AuctionAsset): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: [auction, asset]
    });
  }

  private centerMap() {
    if (this.map && this.auctions && this.auctions.length == 0) return;
    const positions: data.Position[] = [];

    this.auctions.forEach(auction => {
      if (auction.assets && auction.assets.length == 0) return;
      auction.assets.forEach(asset => {
        if (asset.coordinates) {
          positions.push([parseFloat(asset.coordinates.lon), parseFloat(asset.coordinates.lat)]);
        }
      });

    });

    if (positions.length == 0) return;

    const bounds = data.BoundingBox.fromPositions(positions);
    this.map.setCamera({
      bounds: bounds,
      padding: 50
    });

  }

}
