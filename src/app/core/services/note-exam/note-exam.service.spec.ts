import { TestBed, inject } from '@angular/core/testing';

import { NoteExamService } from './note-exam.service';

describe('NoteExamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteExamService]
    });
  });

  it('should be created', inject([NoteExamService], (service: NoteExamService) => {
    expect(service).toBeTruthy();
  }));
});
