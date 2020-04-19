import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCourComponent } from './read-cour.component';

describe('ReadCourComponent', () => {
  let component: ReadCourComponent;
  let fixture: ComponentFixture<ReadCourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadCourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadCourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
