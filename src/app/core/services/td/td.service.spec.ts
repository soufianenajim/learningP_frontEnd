import { TestBed, inject } from '@angular/core/testing';

import { TdService } from './td.service';

describe('TdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TdService]
    });
  });

  it('should be created', inject([TdService], (service: TdService) => {
    expect(service).toBeTruthy();
  }));
});
