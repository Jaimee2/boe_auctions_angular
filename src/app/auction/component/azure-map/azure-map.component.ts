import {Component, ElementRef, inject, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import atlas, {AuthenticationType, data, Map as AzureMap} from 'azure-maps-control';
import {AuctionAsset} from '../../interface/auction';
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
  @Input() auctionAssets!: AuctionAsset[];
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
      enableAccessibilityLocationFallback: false,
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: 'XRKf4AGk19X05G3NDvSmYinOvIHsyGaJiVkNijAwtsvKWJCqVmOMJQQJ99AHAC5RqLJ2gwi4AAAgAZMP2t9J'
      }
    });

  }

  private addMarkers() {
    // Wait until the map resources are ready.
    this.map.events.add('ready', () => {

      this.map.controls.add(new atlas.control.StyleControl({
        mapStyles: ['road', 'night', 'satellite']
      }));

      const iconPromises: any = [];

      Constants.assetIcons.forEach((iconUrl, iconKey) => {
        iconPromises.push(this.map.imageSprite.add(iconKey, iconUrl));
      });

      // @ts-ignore
      Promise.all(iconPromises).then(() => {

        /* Create a data source and add it to the map */
        let dataSource = new DataSource();
        this.map.sources.add(dataSource);

        this.auctionAssets.forEach(asset => {
          if (!asset.coordinates) return;

          let point = new Point([
            parseFloat(asset.coordinates.lon),
            parseFloat(asset.coordinates.lat)
          ]);

          let formattedAuctionValue =
            asset.auctionValue.toLocaleString("de-DE", {style: "currency", currency: "EUR"});

          const feature = new Feature(point, {
            asset: asset,
            auctionValue: formattedAuctionValue,
            icon: asset.assetType || 'pin-blue',
          });

          dataSource.add(feature);
        });

        const iconLayer = new SymbolLayer(dataSource, null!, {
          minZoom: 0,
          maxZoom: 24,
          iconOptions: {
            image: ['get', 'icon'],
            size: 0.15,
            allowOverlap: true,
          }
        });

        const textLayer = new SymbolLayer(dataSource, null!, {
          minZoom: 10,
          maxZoom: 24,
          textOptions: {
            textField: ['get', 'auctionValue'],
            offset: [0, 1],
            size: 16,
            color: 'black',
            haloColor: 'white',
            haloWidth: 20,
            allowOverlap: false,
          },
          iconOptions: {
            image: '',
          },
        });

        this.map.layers.add(iconLayer);
        this.map.layers.add(textLayer);

      });
    });

    this.map.events.add('click', (e) => {
      if (!e.shapes || e.shapes.length < 0) return;
      // @ts-ignore
      let properties = e.shapes[0].getProperties();
      this.openDialog(properties.asset);
    });
  }

  private openDialog(asset: AuctionAsset): void {
    this.dialog.open(AuctionDialogComponent, {
      width: '400px',
      height: ' ',
      data: asset
    });
  }

  private centerMap() {
    if (this.map && this.auctionAssets && this.auctionAssets.length == 0) return;
    const positions: data.Position[] = [];

    this.auctionAssets.forEach(asset => {
      if (asset.coordinates) {
        positions.push([parseFloat(asset.coordinates.lon), parseFloat(asset.coordinates.lat)]);
      }
    });

    if (positions.length == 0) return;

    const bounds = data.BoundingBox.fromPositions(positions);
    this.map.setCamera({bounds: bounds, padding: 50});
  }

}
