import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { parseString } from 'xml2js';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import PlaceResult = google.maps.places.PlaceResult;
import AutocompletionRequest = google.maps.places.AutocompletionRequest;
import PlaceDetailsRequest = google.maps.places.PlaceDetailsRequest;

import { UspsService } from './usps.service';

@Component({
  selector: 'app-usps',
  templateUrl: './usps.component.html',
  styleUrls: ['./usps.component.scss'],
})
export class UspsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('googlePlacesDetails', { static: true })
  private googlePlacesDetails!: ElementRef<HTMLDivElement>;

  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();
  private readonly googleAutocompleteService: google.maps.places.AutocompleteService = new google.maps.places.AutocompleteService();
  private googlePlacesService: google.maps.places.PlacesService|undefined;

  public mapForm: FormGroup = this.formBuilder.group({ google: [''] });
  public delay = 1000;
  public googleMapsResults: Array<AutocompletePrediction> = [];

  // Google address breakdown
  public googleAddress = {
    selectedOption: '',
    responseFormattedAddress: '',
    streetNumber: '',
    streetName: '',
    city: '',
    county: '',
    state: '',
    country: '',
    urbanization: '', // PR only
    zip: '',
    zipSuffix: '',
  };

  // USPS address breakdown
  public uspsAddress = {
    address1: '',
    address2: '',
    uspsCity: '',
    uspsState: '',
    uspsUrbanization: '',
    uspsZip: '',
    uspsZipSuffix: '',
    responseText: '',
    uspsError: '',
  };

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    private readonly service: UspsService,
  ) { }

  public ngAfterViewInit(): void {
    this.googlePlacesService = new google.maps.places.PlacesService(this.googlePlacesDetails.nativeElement);
  }

  public searchGoogle(event: { originalEvent: InputEvent, query: string }): void {
    const request: AutocompletionRequest = {
      input: event.query,
      componentRestrictions: {
        country: [ 'us', 'pr' ],
      },
      types: [ 'address' ],
    };

    this.googleAutocompleteService.getPlacePredictions(request, this.handleSearchResults.bind(this));
  }

  private handleSearchResults(result: Array<AutocompletePrediction>): void {
    console.log('=== google maps:', result);

    this.googleMapsResults = result;

    // This is a callback, so need to trigger CDR manually (maybe take it out of NgZone?)
    this.cdr.detectChanges();
  }

  public handleSelect(value: AutocompletePrediction): void {
    console.log(`=== google selected value':`, value);

    this.clearFields();
    this.googleAddress.selectedOption = value.description;

    if (value?.place_id && this.googlePlacesService) {
      const request: PlaceDetailsRequest = {
        placeId: value.place_id,
        fields: [
          'address_components',
          'formatted_address',
        ],
      };

      this.googlePlacesService.getDetails(request, this.handleDetailsResult.bind(this));
    }
  }

  private handleDetailsResult(result: PlaceResult): void {
    console.log('==== google place details:', result);

    this.googleAddress.responseFormattedAddress = result.formatted_address as string;

    if (result.address_components?.length) {
      for (const addrComp of result.address_components) {
        if (addrComp.types.includes('street_number')) {
          this.googleAddress.streetNumber = addrComp.long_name;
          continue;
        }
        if (addrComp.types.includes('route')) {
          this.googleAddress.streetName = addrComp.long_name;
          continue;
        }
        if (addrComp.types.includes('locality')) {
          this.googleAddress.city = addrComp.long_name;
          continue;
        }
        if (addrComp.types.includes('administrative_area_level_2')) {
          this.googleAddress.county = addrComp.long_name;
          continue;
        }
        if (addrComp.types.includes('administrative_area_level_1')) {
          this.googleAddress.state = addrComp.short_name;
          continue;
        }
        if (addrComp.types.includes('country')) {
          this.googleAddress.country = addrComp.long_name;
          continue;
        }
        if (addrComp.types.includes('postal_code')) {
          this.googleAddress.zip = addrComp.long_name;
          continue;
        }
        if (addrComp.types.includes('postal_code_suffix')) {
          this.googleAddress.zipSuffix = addrComp.long_name;
          continue;
        }
        if (addrComp.types.includes('sublocality_level_1')) {
          this.googleAddress.urbanization = addrComp.long_name;
        }
      }

      this.service
        .verifyWithUsps(this.googleAddress)
        .pipe(
          take(1),
        )
        .subscribe(
          (response: string): void => {
            console.log('=== usps api response:', response);
            parseString(response, this.handleUspsResponse.bind(this));
          },
          (error: any): void => {
            console.error('=== usps api error:', error);
          });
    }
  }

  private handleUspsResponse(err: Error, result: any): void {
    if (err) {
      console.error('=== error parsing usps response:', err);

      return;
    }

    console.log('=== parsed usps response:', result);

    const res = result.AddressValidateResponse.Address[0];

    if (res.Error) {
      this.uspsAddress.uspsError = res.Error[0].Description[0];
    } else {
      this.uspsAddress.uspsError = '';
      this.uspsAddress.address1 = res.Address1 ? res.Address1[0] : '';
      this.uspsAddress.address2 = res.Address2[0];
      this.uspsAddress.uspsCity = res.City[0];
      this.uspsAddress.uspsState = res.State[0];
      this.uspsAddress.uspsUrbanization = res.Urbanization ? res.Urbanization[0] : '';
      this.uspsAddress.uspsZip = res.Zip5[0];
      this.uspsAddress.uspsZipSuffix = res.Zip4[0];
      this.uspsAddress.responseText = res.ReturnText ? res.ReturnText[0] : '';
    }

    // This is a callback, so need to trigger CDR manually (maybe take it out of NgZone?)
    this.cdr.detectChanges();
  }

  private clearFields(): void {
    this.googleAddress = {
      selectedOption: '',
      responseFormattedAddress: '',
      streetNumber: '',
      streetName: '',
      city: '',
      county: '',
      state: '',
      country: '',
      urbanization: '',
      zip: '',
      zipSuffix: '',
    };

    this.uspsAddress = {
      address1: '',
      address2: '',
      uspsCity: '',
      uspsState: '',
      uspsUrbanization: '',
      uspsZip: '',
      uspsZipSuffix: '',
      responseText: '',
      uspsError: '',
    };
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
