import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BingMapsComponent } from './bing-maps/bing-maps.component';
import { GoogleAutocompleteWidgetComponent } from './google-autocomplete-widget/google-autocomplete-widget.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { HereMapsComponent } from './here-maps/here-maps.component';
import { MapQuestComponent } from './map-quest/map-quest.component';
import { UspsComponent } from './usps/usps.component';

const routes: Routes = [
  {
    component: HereMapsComponent,
    path: 'here-maps',
  },
  {
    component: BingMapsComponent,
    path: 'bing-maps',
  },
  {
    component: MapQuestComponent,
    path: 'map-quest',
  },
  {
    component: GoogleAutocompleteWidgetComponent,
    path: 'google-widget',
  },
  {
    component: GoogleMapsComponent,
    path: 'google-maps',
  },
  {
    component: UspsComponent,
    path: 'usps',
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'corrected',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [ RouterModule ],
  providers: [],
})
export class AppRoutingModule { }
