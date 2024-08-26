import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MapComponent} from "./auction/component/map.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MapComponent],
  template:
    `
      <router-outlet></router-outlet>
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
