import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressionCourComponent } from './progression-cour.component';

describe('ProgressionCourComponent', () => {
  let component: ProgressionCourComponent;
  let fixture: ComponentFixture<ProgressionCourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressionCourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressionCourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
