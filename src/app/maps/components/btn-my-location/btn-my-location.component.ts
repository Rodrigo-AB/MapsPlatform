import { Component } from '@angular/core';
import { LocationsService, MapService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  constructor(
    private locationService:  LocationsService,
    private mapService: MapService,
  ){}

  goToMyLocation(){
    if( !this.locationService.isUserLocationReady ) throw Error('No hay ubicacion del usuario');
    if( !this.mapService.isMapReady ) throw Error('No hay mapa disponible')

    this.mapService.flyTo(  [-99.12873869142356, 19.322504201582362]  )

    }


}
