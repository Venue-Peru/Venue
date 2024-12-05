import { TestBed } from '@angular/core/testing';

import { PromoterCodesService } from './promoter-codes.service';

describe('PromoterCodesService', () => {
  let service: PromoterCodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromoterCodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
