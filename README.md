# Maps

Examples of address autocomplete search with:
 - [Google Autocomplete Widget](https://developers.google.com/maps/documentation/javascript/places-autocomplete#add-autocomplete)
 - [Google Autocomplete Service](https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service)
 - [Here Maps](https://developer.here.com/documentation/maps/3.1.24.0/dev_guide/topics/geocoding.html)
 - [Bing Maps](https://docs.microsoft.com/en-us/bingmaps/rest-services/autosuggest)
 - [MapQuest](https://developer.mapquest.com/documentation/searchahead-api/)

Also, there is an example validating if an address is a valid USPS deliverable shipping address using the [USPS Address validation API](https://www.usps.com/business/web-tools-apis/address-information-api.htm#_Toc39492052). 

The examples are built using [Angular](https://angular.io/). Even though Angular is used, the services used
are generic and can easily be used with vanilla JavaScript or any other framework.

**Note: You need to provide API keys for each one of these services if you would like to try them out!** 

## Usage

To use the Google Autocomplete Widget and Service you will need to set the API key in `index.html`. Please replace the `XXX`s on line 14.

To use any of the other services (*Here*, *Bing*, *MapQuest*, *USPS*), please set the API key in `environment.ts`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.6.
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
