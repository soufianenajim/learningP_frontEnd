import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdOrQuizComponent } from './td-or-quiz.component';

describe('TdOrQuizComponent', () => {
  let component: TdOrQuizComponent;
  let fixture: ComponentFixture<TdOrQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdOrQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdOrQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
