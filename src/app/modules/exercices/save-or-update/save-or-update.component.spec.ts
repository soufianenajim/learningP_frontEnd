import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveOrUpdateComponent } from './save-or-update.component';

describe('SaveOrUpdateComponent', () => {
  let component: SaveOrUpdateComponent;
  let fixture: ComponentFixture<SaveOrUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveOrUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
