import { Injectable } from '@angular/core';
import { Feature, LocationsResponse } from '../interfaces/locations.interface';
import { LocationApiClient } from '../api';
import { MapService } from './map.service';


@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  public  useLocation?: [ number, number ];

  public  isLoadingLocations: boolean = false;
  public  locations:  Feature[] = [];

  get isUserLocationReady():  boolean {
    return  !!this.useLocation;
  }

  constructor(
    private locationsApi: LocationApiClient,
    private mapService: MapService,
  ) {
    this.getUserLocation();
   }

  public  async getUserLocation():  Promise<[number,  number]>  {

    return  new Promise(  (resolve, reject) =>  {
      navigator.geolocation.getCurrentPosition( //! El metodo geolocation tambien tiene una opcion watch, cpno esto podriamos hacer un seguimiento constante
        ({  coords  })  =>  {
          this.useLocation  = [ coords.longitude, coords.latitude ];
          resolve( this.useLocation );
        },
        ( err ) =>  {
          alert('No se pudo obtener la geolocalizacion');
          console.log(err);
          reject();
        }
      );
    });

  }

  getLocationByQuery( query:  string  = ''  ){
    //  ToDo: Evaluar cuando el query es nulo

    if(query.length === 0){
      this.isLoadingLocations = false;
      this.locations  = [];
      return;
    }

    if( !this.useLocation ) throw Error('Bo hay userLocation');

    this.isLoadingLocations = true;
    // console.log(query);


    this.locationsApi.get<LocationsResponse>(`${  query  }`,{
      params: {
        proximity:  [-99.12873869142356, 19.322504201582362]
      }
    })
      .subscribe( resp  =>  {

        // console.log(resp.features)
        this.isLoadingLocations = false;
        this.locations  = resp.features;

        this.mapService.createMarkersFromPlaces(  this.locations, this.useLocation!  )
      });
  }

  deletePlaces(){
    this.locations  = [];
  }

}
