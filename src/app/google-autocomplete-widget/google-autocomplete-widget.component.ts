import { AfterViewInit, Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-google-autocomplete-widget',
  templateUrl: './google-autocomplete-widget.component.html',
  styleUrls: ['./google-autocomplete-widget.component.scss'],
})
export class GoogleAutocompleteWidgetComponent implements AfterViewInit {
  @ViewChild('googleAutocompleteWidget', { static: true })
  private googleWidget!: ElementRef<HTMLInputElement>;

  private autocomplete!: google.maps.places.Autocomplete;

  public mapForm: FormGroup = this.formBuilder.group({ googleWidget: [''] });
  public mapSearchSelection: any;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  public ngAfterViewInit(): void {
    this.autocomplete = new google
      .maps
      .places
      .Autocomplete(
        this.googleWidget.nativeElement,
        {
          componentRestrictions: {
            country: 'us',
          },
          types: [ 'address' ],
          fields: [
            'address_components',
            'formatted_address',
          ],
        },
      );

    this.autocomplete.addListener('place_changed', (): void => {
      const place: PlaceResult = this.autocomplete.getPlace();

      console.log('==== google widget selected option:', place);

      this.mapSearchSelection = place;
    });
  }
}
