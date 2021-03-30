import { TestBed } from '@angular/core/testing';

import { UspsService } from './usps.service';

describe('UspsService', () => {
  let service: UspsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UspsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
