import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LocationsService, MapService } from '../../services';

import { Map, Marker, Popup } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements  AfterViewInit {

  @ViewChild('map') divMap?:  ElementRef;

  constructor(
    private locationService:  LocationsService,
    private mapService: MapService,
  ){}

  // ngOnInit(): void {
  //   console.log(  this.locationService.useLocation  );
  // }

  ngAfterViewInit(): void {
      if  ( !this.divMap )  throw 'El elemento HTML no fue encontrado';

      const map = new Map({
        container: this.divMap.nativeElement, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-99.12873869142356, 19.322504201582362], // starting position [lng, lat]
        zoom: 17, // starting zoom
      });

      const popup = new Popup()
        .setHTML(`
          <h6>Ubicacion Actual</h6>
          <span>Estas son las coordenadas ${  [-99.12873869142356, 19.322504201582362]  } </span>
        `);

        new Marker({  color:  'red' })
          .setLngLat( [-99.12873869142356, 19.322504201582362] )
          .setPopup(  popup  )
          .addTo( map )

        this.mapService.setMap( map );

  }


}
