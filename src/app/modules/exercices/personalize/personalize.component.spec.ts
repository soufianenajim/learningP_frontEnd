import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizeComponent } from './personalize.component';

describe('PersonalizeComponent', () => {
  let component: PersonalizeComponent;
  let fixture: ComponentFixture<PersonalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
