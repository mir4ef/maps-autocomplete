import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BingMapsService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  public search(event: any): Observable<any> {
    return this.http
      .get(
        'http://dev.virtualearth.net/REST/v1/Autosuggest',
        {
          params: {
            key: environment.bingMapsKey,
            query: event.query,
            maxResults: '10', // max is 10
            includeEntityTypes: 'address',
            culture: 'en-us',
            userRegion: 'us',
            countryFilter: 'us',
            output: 'json',
          },
        }
      );
  }
}
