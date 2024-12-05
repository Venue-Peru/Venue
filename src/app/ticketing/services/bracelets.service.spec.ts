import { TestBed } from '@angular/core/testing';

import { BraceletsService } from './bracelets.service';

describe('BraceletsService', () => {
  let service: BraceletsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BraceletsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
