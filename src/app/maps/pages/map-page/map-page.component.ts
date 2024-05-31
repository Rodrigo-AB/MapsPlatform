import { Component } from '@angular/core';
import { LocationsService } from '../../services';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})
export class MapPageComponent {

  constructor(
    private locationsService: LocationsService
  ){}

  get isUserocationReady()  {
    return  this.locationsService.isUserLocationReady;
  }


}
