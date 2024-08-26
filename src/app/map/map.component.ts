import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

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
export class MapComponent implements OnInit {
  private map!: L.Map

  private markers = [
    L.marker([40.3836467, -3.7065281]).bindPopup(`
        <h4> hello</h4>
        <a href="http://localhost:4200">link text</a>
        `
    )

  ];

  constructor() {
  }

  ngOnInit() {
    this.initializeMap();
    this.addMarkers();
    // this.centerMap();
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
    this.markers.forEach(marker => marker.addTo(this.map));
  }

  private centerMap() {
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    this.map.fitBounds(bounds);
  }

}
