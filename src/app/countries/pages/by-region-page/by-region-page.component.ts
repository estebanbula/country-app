import {Component, OnInit} from '@angular/core';
import {Country} from "../../interfaces/country.interface";
import {CountriesService} from "../../services/countries.service";
import {Region} from "../../interfaces/region.type";

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: []
})
export class ByRegionPageComponent implements OnInit {

  public countriesByRegion: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"]
  public selectedRegion?: Region;

  constructor(private _countriesService: CountriesService) {
  }

  public searchByRegion(region: Region): void {
    this.isLoading = true;
    this.selectedRegion = region;
    this._countriesService.searchByRegion(region)
      .subscribe(response => {
        this.countriesByRegion = response;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.countriesByRegion = this._countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this._countriesService.cacheStore.byRegion.region;
  }

}
