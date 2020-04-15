import { TestBed } from '@angular/core/testing';

import { ProgressionCourService } from './progression-cour.service';

describe('ProgressionCourService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressionCourService = TestBed.get(ProgressionCourService);
    expect(service).toBeTruthy();
  });
});
