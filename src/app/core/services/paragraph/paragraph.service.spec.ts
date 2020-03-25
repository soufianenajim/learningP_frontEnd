import { TestBed, inject } from '@angular/core/testing';

import { ParagraphService } from './paragraph.service';

describe('ParagraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParagraphService]
    });
  });

  it('should be created', inject([ParagraphService], (service: ParagraphService) => {
    expect(service).toBeTruthy();
  }));
});
