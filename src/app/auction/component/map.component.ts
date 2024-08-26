import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';
import {Auction} from "../interface/auction";

const iconUrl = 'assets/marker-icon.png';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  template: `

    <div id="map"></div>
  `,
  styles: [`
    #map {
      width: 80vh;
      height: 80vh;
    }
  `]
})
export class MapComponent implements OnInit, OnChanges {
  @Input() auctions!: Auction[];

  private map!: L.Map
  private markers = [
    L.circleMarker([40.3836467, -3.7065281])
  ];

  constructor() {
  }

  ngOnInit() {
    this.initializeMap();
    this.addMarkers();
    // this.centerMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['auctions']) {
      this.addMarkers();
      this.centerMap();
    }
  }

  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map', {
      center: [40.4167047, -3.7035825],
      zoom: 12
    });
    console.log(iconUrl)

    L.tileLayer(baseMapURl).addTo(this.map);

  }

  private addMarkers() {
    console.log(this.auctions)
    if (this.auctions && this.auctions.length > 0) {
      this.auctions.forEach(auction => {
        if (auction.assets && auction.assets.length > 0) {
          auction.assets.forEach(asset => {
            if (asset.coordinates) {
              const marker = L.circleMarker(
                [parseFloat(asset.coordinates.lat), parseFloat(asset.coordinates.lon)],
                {radius: 8, color: 'green'} // Customize marker appearance
              ).addTo(this.map);

              marker.bindPopup(this.createPopupContent(auction, asset));
            }
          });
        }
      });
    }
  }

  private createPopupContent(auction: Auction, asset: any): string {
    return `
      <strong>Auction ID:</strong> ${auction.identifier}<br>
      <strong>Type:</strong> ${auction.auctionType}<br>
      <strong>Address:</strong> ${asset.fullAddress}<br>
      <strong>Appraisal Value:</strong> ${auction.appraisalValue}<br>
      <strong>Minimum Bid:</strong> ${auction.minimumBid}<br>
    `;
  }

  private centerMap() {
    const bounds = L.latLngBounds([]);
    this.auctions.forEach(auction => {
      if (auction.assets) {
        auction.assets.forEach(asset => {
          if (asset.coordinates) {
            bounds.extend([parseFloat(asset.coordinates.lat), parseFloat(asset.coordinates.lon)]);
          }
        });
      }
    });

    if (bounds.isValid()) {
      this.map.fitBounds(bounds);
    }
  }

}
