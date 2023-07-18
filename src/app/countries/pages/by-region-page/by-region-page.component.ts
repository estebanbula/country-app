import { Component } from '@angular/core';
import {Country} from "../../interfaces/country.interface";
import {CountriesService} from "../../services/countries.service";

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public countriesByRegion: Country[] = [];

  constructor(private _countriesService: CountriesService) {
  }

  public searchByRegion(term: string): void {
    this._countriesService.searchByRegion(term)
      .subscribe(response => this.countriesByRegion = response);
  }

}
