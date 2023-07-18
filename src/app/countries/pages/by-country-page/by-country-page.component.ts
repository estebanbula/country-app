import { Component } from '@angular/core';
import {Country} from "../../interfaces/country.interface";
import {CountriesService} from "../../services/countries.service";

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  public countriesByCountry: Country[] = [];

  constructor(private _countriesService: CountriesService) {
  }

  public searchByCountry(term: string): void {
    this._countriesService.searchByCountry(term)
      .subscribe(response => this.countriesByCountry = response);
  }

}
