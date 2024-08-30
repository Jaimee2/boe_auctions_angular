import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {AuthenticationType, data, HtmlMarker, Map as AzureMap} from 'azure-maps-control';
import {Auction, AuctionAsset} from '../../interface/auction';
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-azure-map',
  standalone: true,
  imports: [],
  template: `
    <div #map class=" h-full w-full" id="map"></div>
  `,
  styles: [`

  `]
})
export class AzureMapComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('map', {static: true}) mapContainer!: ElementRef;

  @Input() height?: string;
  @Input() width?: string;

  @Input() auctions!: Auction[];
  private map!: AzureMap;
  private dialog = inject(MatDialog);

  private assetIcons = new Map<string, string>([
    ['Vivienda', 'assets/img/house.svg'],
    ['Garaje', 'assets/img/garage.png'],
    ['Nave industrial', 'assets/img/warehouse.png'],
    ['Local comercial', 'assets/img/store.png'],
  ]);

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    const mapElement = this.el.nativeElement.querySelector('#map');

  }

  ngOnInit() {
    this.initializeMap();

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("this changed !! ")
    this.mapContainer.nativeElement.style.height = this.height;
    this.mapContainer.nativeElement.style.width = this.width;
    if (changes['auctions']) {
      this.addMarkers();
      this.centerMap();
    }
  }

  private initializeMap() {

    this.map = new AzureMap(this.mapContainer?.nativeElement, {
      center: [-3.7035825, 40.4167047], // Centered on Madrid
      zoom: 12,
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
    if (this.map && this.auctions && this.auctions.length > 0) {
      this.auctions.forEach(auction => {
        if (auction.assets && auction.assets.length > 0) {
          auction.assets.forEach(asset => {
            if (asset.coordinates) {
              const position = [parseFloat(asset.coordinates.lon), parseFloat(asset.coordinates.lat)];
              const iconUrl = this.assetIcons.get(asset.assetType);
              const marker = new HtmlMarker({
                position: position,
                htmlContent: `
                             <div class="flex justify-center items-center mb-2 bg-white-900">
                                <div class="bg-lime-300 rounded-full p-1 m-1">
                                <img alt="house" class="h-5 w-5" src="${iconUrl}">
                                </div>
                             </div>
                             `,
                color: 'green',
                text: "!",
              });

              this.map.markers.add(marker);

              this.map.events.add('click', marker, () => {
                marker.togglePopup();
                console.log("Click!")
                this.openDialog(auction, asset)
              });

            }
          });
        }
      });
    }
  }

  private openDialog(auction: Auction, asset: AuctionAsset): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: [auction, asset]
    });
  }

  private centerMap() {
    if (this.map && this.auctions && this.auctions.length > 0) {
      const positions: data.Position[] = [];

      this.auctions.forEach(auction => {
        if (auction.assets && auction.assets.length > 0) {
          auction.assets.forEach(asset => {
            if (asset.coordinates) {
              positions.push([parseFloat(asset.coordinates.lon), parseFloat(asset.coordinates.lat)]);
            }
          });
        }
      });

      if (positions.length > 0) {
        const bounds = data.BoundingBox.fromPositions(positions);
        this.map.setCamera({
          bounds: bounds,
          padding: 50 // Add some padding around the bounds
        });
      }
    }
  }
}
