import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, delay, map, Observable, of, tap} from "rxjs";
import {Country} from "../interfaces/country.interface";
import {CacheStore} from "../interfaces/cache-store.interface";
import {Region} from "../interfaces/region.type";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";

  public cacheStore: CacheStore = {
    byCapital: {term: "", countries: []},
    byCountry: {term: "", countries: []},
    byRegion: {region: "", countries: []}
  }

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  public searchCountryByAlfaCode(code: string): Observable<Country | null> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Access-Control-Allow-Origin", "*");
    return this.httpClient
      .get<Country[]>(`${this.apiUrl}/alpha/${code}`, {headers})
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(error => of(null)),
        delay(2000)
      );
  }

  public searchByCapital(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = {term, countries}),
        tap(() => this.saveToLocalStorage())
      );
  }

  public searchByCountry(term: string): Observable<Country[]> {
    const url: string = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountry = {term, countries}),
        tap(() => this.saveToLocalStorage())
      );
  }

  public searchByRegion(region: Region): Observable<Country[]> {
    const url: string = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {region, countries}),
        tap(() => this.saveToLocalStorage())
      );
  }

  private getCountriesRequest(url:string): Observable<Country[]> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Access-Control-Allow-Origin", "*");
    return this.httpClient.get<Country[]>(url, {headers})
      .pipe(
        catchError(() => of([])),
        delay(2000)
      );
  }

  private saveToLocalStorage(): void {
    localStorage.setItem("cacheStorage", JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void {
    if (!localStorage.getItem("cacheStorage")) return;
    this.cacheStore = JSON.parse(localStorage.getItem("cacheStorage")!);
  }
}
