import { TestBed } from '@angular/core/testing';

import { ProfilesService } from './profiles.service';

describe('ProfileServiceService', () => {
  let service: ProfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
