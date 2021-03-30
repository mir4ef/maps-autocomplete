import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HereMapsComponent } from './here-maps/here-maps.component';
import { BingMapsComponent } from './bing-maps/bing-maps.component';
import { MapQuestComponent } from './map-quest/map-quest.component';
import { GoogleAutocompleteWidgetComponent } from './google-autocomplete-widget/google-autocomplete-widget.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { UspsComponent } from './usps/usps.component';

@NgModule({
  declarations: [
    AppComponent,
    HereMapsComponent,
    BingMapsComponent,
    MapQuestComponent,
    GoogleAutocompleteWidgetComponent,
    GoogleMapsComponent,
    UspsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AutoCompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
