import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MapComponent} from "./map/map.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MapComponent],
  template:
    `
      <h1>Hello world</h1>

      <div class="map-container">
        <app-map></app-map>
      </div>
    `,
  styles: [`
    .map-container {
      width: 80vh;
      height: 80vh;
      border: solid;
    }
  `]
})
export class AppComponent {

}
