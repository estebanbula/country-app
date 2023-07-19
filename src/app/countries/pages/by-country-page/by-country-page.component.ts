import {Component, OnInit} from '@angular/core';
import {Country} from "../../interfaces/country.interface";
import {CountriesService} from "../../services/countries.service";

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countriesByCountry: Country[] = [];
  public isLoading: boolean = false;
  public searchTerm: string = "";

  constructor(private _countriesService: CountriesService) {
  }

  public searchByCountry(term: string): void {
    this.isLoading = true;
    this._countriesService.searchByCountry(term)
      .subscribe(response => {
        this.countriesByCountry = response;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.countriesByCountry = this._countriesService.cacheStore.byCountry.countries;
    this.searchTerm = this._countriesService.cacheStore.byCountry.term;
  }

}
