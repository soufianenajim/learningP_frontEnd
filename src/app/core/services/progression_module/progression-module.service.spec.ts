import { TestBed } from '@angular/core/testing';

import { ProgressionModuleService } from './progression-module.service';

describe('ProgressionModuleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressionModuleService = TestBed.get(ProgressionModuleService);
    expect(service).toBeTruthy();
  });
});
