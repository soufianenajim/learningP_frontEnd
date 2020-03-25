import { TestBed, inject } from '@angular/core/testing';

import { LicenceService } from './licence.service';

describe('LicenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LicenceService]
    });
  });

  it('should be created', inject([LicenceService], (service: LicenceService) => {
    expect(service).toBeTruthy();
  }));
});
