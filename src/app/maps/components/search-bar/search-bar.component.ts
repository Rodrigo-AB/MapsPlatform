import { Component } from '@angular/core';
import { LocationsService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout;

  constructor(
    private locationsService: LocationsService
  ) {}


  onQueryChanged( query:  string =  '' ){

    if( this.debounceTimer  ) clearTimeout( this.debounceTimer );

    this.debounceTimer  = setTimeout(() =>  {
      // console.log(query)
      this.locationsService.getLocationByQuery( query );

    },  350 );

  }

}
