import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HereMapsService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  public search(event: any): Observable<any> {
    return this.http
      .get(
        'https://autosuggest.search.hereapi.com/v1/autosuggest',
        {
          params: {
            apikey: environment.hereMapsKey,
            q: event.query,
            in: 'countryCode:USA',
            // at: '38.71014896078624,-98.60787954719035', // ORD
            // at: '40.82436,-74.3326', // Roseland, NJ
            at: '40,-110', // somewhere in the US...
            show: 'details',
            limit: '100', // max is 100
            // lang: 'es',
          },
        }
      );
  }
}
