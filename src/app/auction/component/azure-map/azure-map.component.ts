import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AuthenticationType, data, HtmlMarker, Map} from 'azure-maps-control';
import {Auction, AuctionAsset} from '../../interface/auction';


@Component({
  selector: 'app-azure-map',
  standalone: true,
  imports: [],
  template: `
    <div #map id="map"></div>
  `,
  styles: [`
    #map {
      /* Default values */
      height: 500px;
      width: 500px;
    }
  `]
})
export class AzureMapComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() height?: string;
  @Input() width?: string;

  @ViewChild('map', {static: true}) mapContainer?: ElementRef;
  @Input() auctions!: Auction[];

  private map!: Map;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    const mapElement = this.el.nativeElement.querySelector('#map');
    mapElement.style.height = this.height;
    mapElement.style.width = this.width;
  }

  ngOnInit() {
    this.initializeMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['auctions']) {
      this.addMarkers();
      this.centerMap();
    }
  }

  private initializeMap() {

    this.map = new Map(this.mapContainer?.nativeElement, {
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
              const marker = new HtmlMarker({
                position: position,
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
    console.log("TODO!!!!")
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
