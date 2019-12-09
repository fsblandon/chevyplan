import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  URL_BASE = "https://restcountries.eu/rest/v2";

  constructor(
    private httpClient: HttpClient
  ) { }

  getCountry(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.URL_BASE + '/all');
  }
}
