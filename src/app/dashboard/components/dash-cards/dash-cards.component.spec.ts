import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCardsComponent } from './dash-cards.component';

describe('DashCardsComponent', () => {
  let component: DashCardsComponent;
  let fixture: ComponentFixture<DashCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
