import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CountriesService} from "../../services/countries.service";
import {map, switchMap} from "rxjs";
import {Country} from "../../interfaces/country.interface";

@Component({
  selector: 'country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _countriesService: CountriesService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this._countriesService.searchCountryByAlfaCode(id))
      )
      .subscribe(country => country ? this.setCountry(country) : null);
  }

  private setCountry(country: Country): void {
    if (!country) {
      this.router.navigateByUrl("").then(r => r.valueOf());
    }
    this.country = country;
  }

}
