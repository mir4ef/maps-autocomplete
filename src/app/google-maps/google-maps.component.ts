import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import AutocompletePrediction = google.maps.places.AutocompletePrediction;
import PlaceResult = google.maps.places.PlaceResult;
import AutocompletionRequest = google.maps.places.AutocompletionRequest;
import PlaceDetailsRequest = google.maps.places.PlaceDetailsRequest;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements AfterViewInit {
  @ViewChild('googlePlacesDetails', { static: true })
  private googlePlacesDetails!: ElementRef<HTMLDivElement>;

  private readonly googleAutocompleteService: google.maps.places.AutocompleteService = new google.maps.places.AutocompleteService();
  private googlePlacesService: google.maps.places.PlacesService|undefined;

  public mapForm: FormGroup = this.formBuilder.group({ google: [''] });
  public delay = 1000;
  public results: Array<AutocompletePrediction> = [];
  public mapSearchSelection: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
  ) { }

  public ngAfterViewInit(): void {
    this.googlePlacesService = new google.maps.places.PlacesService(this.googlePlacesDetails.nativeElement);
  }

  public search(event: { originalEvent: InputEvent, query: string }): void {
    const request: AutocompletionRequest = {
      input: event.query,
      componentRestrictions: {
        country: 'us',
      },
      types: [ 'address' ],
    };

    this.googleAutocompleteService.getPlacePredictions(request, this.handleSearchResults.bind(this));
  }

  private handleSearchResults(result: Array<AutocompletePrediction>): void {
    console.log('=== google maps search results:', result);

    this.results = result;

    // This is a callback, so need to trigger CDR manually (maybe take it out of NgZone?)
    this.cdr.detectChanges();
  }

  public handleSelect(value: AutocompletePrediction): void {
    console.log(`=== google maps selected value':`, value);

    if (value?.place_id && this.googlePlacesService) {
      const request: PlaceDetailsRequest = {
        placeId: value.place_id,
        fields: [
          'address_components',
          'formatted_address',
        ],
      };

      this.googlePlacesService.getDetails(request, this.handleSelectDetails.bind(this));
    }
  }

  private handleSelectDetails(result: PlaceResult): void {
    console.log('==== google maps selected value details:', result);

    this.mapSearchSelection = result;
  }
}
