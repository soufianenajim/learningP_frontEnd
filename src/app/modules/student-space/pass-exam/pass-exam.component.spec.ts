import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassExamComponent } from './pass-exam.component';

describe('PassExamComponent', () => {
  let component: PassExamComponent;
  let fixture: ComponentFixture<PassExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
