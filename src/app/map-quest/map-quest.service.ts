import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapQuestService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  public search(event: any): Observable<any> {
    return this.http
      .get(
        'http://www.mapquestapi.com/search/v3/prediction',
        {
          params: {
            key: environment.mapQuestKey,
            q: event.query,
            collection: 'address',
            countryCode: 'us',
            limit: '15', // max is 15
          },
        }
      )
  }
}
