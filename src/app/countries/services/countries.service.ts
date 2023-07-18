import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Country} from "../interfaces/country.interface";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";

  constructor(private httpClient: HttpClient) { }

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
