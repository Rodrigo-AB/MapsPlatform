import { Component } from '@angular/core';
import { LocationsService, MapService } from '../../services';
import { Feature } from '../../interfaces/locations.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  public  selectedId: string  = '';

  constructor(
    private locationsService: LocationsService,
    private mapService: MapService,
  ) {}

  get isLoadingLocations(): boolean {
    return  this.locationsService.isLoadingLocations;
  }

  get locations():  Feature[] {
    return  this.locationsService.locations;
  }

  flyTo(  location:  Feature  )  {

    this.selectedId = location.id;

    const [ lng,  lat ] = [ location.properties.coordinates.longitude, location.properties.coordinates.latitude  ];
    this.mapService.flyTo([ lng,  lat ]);
  }

  getDirections(  location:Feature  ){
    this.locationsService.useLocation = [-99.12873869142356, 19.322504201582362];

    if( !this.locationsService.useLocation  ) throw Error('No hay userLocation')

      this.locationsService.deletePlaces();

      const start = this.locationsService.useLocation;
      const end:[number,number] = [ location.properties.coordinates.longitude, location.properties.coordinates.latitude  ];

      this.mapService.getRouteBetweenPoints(  start,  end )
  }

}
