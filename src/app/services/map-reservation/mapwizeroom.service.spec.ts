import { TestBed } from '@angular/core/testing';

import { MapwizeroomService } from './mapwizeroom.service';

describe('MapwizeroomService', () => {
  let service: MapwizeroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapwizeroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
