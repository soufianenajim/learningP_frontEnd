import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTechnicalAdminComponent } from './dashboard-technical-admin.component';

describe('DashboardTechnicalAdminComponent', () => {
  let component: DashboardTechnicalAdminComponent;
  let fixture: ComponentFixture<DashboardTechnicalAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTechnicalAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTechnicalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
