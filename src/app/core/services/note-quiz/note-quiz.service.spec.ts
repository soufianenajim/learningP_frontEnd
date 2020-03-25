import { TestBed, inject } from '@angular/core/testing';

import { NoteQuizService } from './note-quiz.service';

describe('NoteQuizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteQuizService]
    });
  });

  it('should be created', inject([NoteQuizService], (service: NoteQuizService) => {
    expect(service).toBeTruthy();
  }));
});
