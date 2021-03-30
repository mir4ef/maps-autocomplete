import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAutocompleteWidgetComponent } from './google-autocomplete-widget.component';

describe('GoogleAutocompleteWidgetComponent', () => {
  let component: GoogleAutocompleteWidgetComponent;
  let fixture: ComponentFixture<GoogleAutocompleteWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleAutocompleteWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAutocompleteWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
