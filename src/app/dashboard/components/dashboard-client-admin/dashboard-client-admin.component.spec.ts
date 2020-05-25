import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClientAdminComponent } from './dashboard-client-admin.component';

describe('DashboardClientAdminComponent', () => {
  let component: DashboardClientAdminComponent;
  let fixture: ComponentFixture<DashboardClientAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardClientAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardClientAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
