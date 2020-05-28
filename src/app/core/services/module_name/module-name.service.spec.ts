import { TestBed } from '@angular/core/testing';

import { ModuleNameService } from './module-name.service';

describe('ModuleNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModuleNameService = TestBed.get(ModuleNameService);
    expect(service).toBeTruthy();
  });
});
