import { TestBed } from '@angular/core/testing';

import { ExercicesService } from './exercices.service';

describe('ExercicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExercicesService = TestBed.get(ExercicesService);
    expect(service).toBeTruthy();
  });
});
