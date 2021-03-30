import { TestBed } from '@angular/core/testing';

import { BingMapsService } from './bing-maps.service';

describe('BingMapsService', () => {
  let service: BingMapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingMapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
