import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStudentComponent } from './dashboard-student.component';

describe('DashboardStudentComponent', () => {
  let component: DashboardStudentComponent;
  let fixture: ComponentFixture<DashboardStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
