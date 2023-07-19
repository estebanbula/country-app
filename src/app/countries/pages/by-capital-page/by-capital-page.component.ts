import {Component, OnInit} from '@angular/core';
import {CountriesService} from "../../services/countries.service";
import {Country} from "../../interfaces/country.interface";

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countriesByCapital: Country[] = [];
  public isLoading: boolean = false;
  public searchTerm: string = "";

  constructor(private _countriesService: CountriesService) {
  }

  public searchByCapital(term: string): void {
    this.isLoading = true;
    this._countriesService.searchByCapital(term)
      .subscribe(response => {
        this.countriesByCapital = response;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.countriesByCapital = this._countriesService.cacheStore.byCapital.countries;
    this.searchTerm = this._countriesService.cacheStore.byCapital.term;
  }

}
