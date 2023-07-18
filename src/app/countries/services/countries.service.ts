import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Country} from "../interfaces/country.interface";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";

  constructor(private httpClient: HttpClient) { }

  public searchCountryByAlfaCode(code: string): Observable<Country | null> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Access-Control-Allow-Origin", "*");
    return this.httpClient
      .get<Country[]>(`${this.apiUrl}/alpha/${code}`, {headers})
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(error => of(null))
      );
  }

  public searchByCapital(term: string): Observable<Country[]> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Access-Control-Allow-Origin", "*");
    return this.httpClient
      .get<Country[]>(`${this.apiUrl}/capital/${term}`, {headers})
      .pipe(
        catchError(error => of([]))
      );
  }

  public searchByCountry(term: string): Observable<Country[]> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Access-Control-Allow-Origin", "*");
    return this.httpClient
      .get<Country[]>(`${this.apiUrl}/name/${term}`, {headers})
      .pipe(
        catchError(error => of([]))
      );
  }

  public searchByRegion(term: string): Observable<Country[]> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Access-Control-Allow-Origin", "*");
    return this.httpClient
      .get<Country[]>(`${this.apiUrl}/region/${term}`, {headers})
      .pipe(
        catchError(error => of([]))
      );
  }
}
