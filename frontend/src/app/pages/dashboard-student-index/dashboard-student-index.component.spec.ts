import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStudentIndexComponent } from './dashboard-student-index.component';

describe('DashboardStudentIndexComponent', () => {
  let component: DashboardStudentIndexComponent;
  let fixture: ComponentFixture<DashboardStudentIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardStudentIndexComponent]
    });
    fixture = TestBed.createComponent(DashboardStudentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
