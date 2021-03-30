import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UspsService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  public verifyWithUsps(address: any): Observable<any> {
    let xml = `<AddressValidateRequest USERID="${environment.uspsKey}"><Revision>1</Revision><Address ID="0"><Address1 /><Address2>${address.streetNumber} ${address.streetName}</Address2><City>${address.city}</City><State>${address.state}</State><Zip5>${address.zip}</Zip5><Zip4>${address.zipSuffix}</Zip4></Address></AddressValidateRequest>`;

    if (address.country?.toLowerCase() === 'puerto rico') {
      xml = `<AddressValidateRequest USERID="${environment.uspsKey}"><Revision>1</Revision><Address ID="0"><Address1 /><Address2>${address.streetNumber} ${address.streetName?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[¿¡]/g, '')}</Address2><City>${address.city}</City><State>PR</State><Urbanization>${address.urbanization}</Urbanization><Zip5>${address.zip}</Zip5><Zip4>${address.zipSuffix}</Zip4></Address></AddressValidateRequest>`;
    }

    return this.http.get(`http://production.shippingapis.com/ShippingAPI.dll?API=Verify&XML=${xml}`, { responseType: 'text' });
  }
}
