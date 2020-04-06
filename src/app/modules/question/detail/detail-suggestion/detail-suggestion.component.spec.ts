import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSuggestionComponent } from './detail-suggestion.component';

describe('DetailSuggestionComponent', () => {
  let component: DetailSuggestionComponent;
  let fixture: ComponentFixture<DetailSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
