import {Component, ElementRef, inject, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import atlas, {AuthenticationType, data, Map as AzureMap} from 'azure-maps-control';
import {Auction, AuctionAsset} from '../../interface/auction';
import {AuctionDialogComponent} from "../dialog/auction-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Constants} from "../../constants";
import DataSource = atlas.source.DataSource;
import SymbolLayer = atlas.layer.SymbolLayer;
import Point = atlas.data.Point;
import Feature = atlas.data.Feature;


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

  ngOnInit() {
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
  }

  ngOnChanges(): void {
    if (this.map) {
      this.clearMarkers();
      this.addMarkers();
      this.centerMap();
    }
  }

  private clearMarkers() {
    // Remove existing sources and layers
    this.map.sources.clear();
    this.map.layers.clear();
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

  }

  private addMarkers() {
    // Wait until the map resources are ready.
    this.map.events.add('ready', () => {
      // Add custom icons to the map's image sprite

      // @ts-ignore
      const iconPromises = [];

      Constants.assetIcons.forEach((iconUrl, iconKey) => {
        iconPromises.push(this.map.imageSprite.add(iconKey, iconUrl));
      });

      // @ts-ignore
      Promise.all(iconPromises).then(() => {

        console.log("hello")
        /* Create a data source and add it to the map */
        let dataSource = new DataSource();
        this.map.sources.add(dataSource);

        this.auctions.forEach(auction => {
          if (!auction.assets || auction.assets.length === 0) return;

          auction.assets.forEach(asset => {
            if (!asset.coordinates) return;

            let point = new Point([
              parseFloat(asset.coordinates.lon),
              parseFloat(asset.coordinates.lat)
            ]);

            // Create a feature with auction and asset data in properties
            const feature = new Feature(point, {
              auction: auction,
              asset: asset,
              icon: asset.assetType || 'pin-blue',
            });

            dataSource.add(feature);
          });
        });

        // Create a symbol layer using the data source and add it to the map
        const symbolLayer = new SymbolLayer(dataSource, null!, {
          minZoom: 0,
          maxZoom: 24,
          iconOptions: {
            // Use the icon from the feature's properties
            image: ['get', 'icon'], // This ensures the correct icon is used from the properties
            size: 0.07,              // Adjust size as needed
            allowOverlap: true      // Allow icons to overlap
          }
        });

        this.map.layers.add(symbolLayer);

      });
    });

    // Attach click event handler to the symbol layer
    this.map.events.add('click', (e) => {
      if (!e.shapes || e.shapes.length < 0) return;
      // @ts-ignore
      let properties = e.shapes[0].getProperties();
      this.openDialog(properties.auction, properties.asset);
    });
  }

  private openDialog(auction: Auction, asset: AuctionAsset): void {
    this.dialog.open(AuctionDialogComponent, {
      width: '400px',
      height: ' ',
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
