import { TestBed } from '@angular/core/testing';

import { MapQuestService } from './map-quest.service';

describe('MapQuestService', () => {
  let service: MapQuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapQuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
