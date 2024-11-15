import { TestBed } from '@angular/core/testing';

import { HostsApiService } from './hosts-api.service';

describe('ClubsApiService', () => {
  let service: HostsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
