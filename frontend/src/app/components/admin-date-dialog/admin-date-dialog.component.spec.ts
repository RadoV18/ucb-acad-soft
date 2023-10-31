import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDateDialogComponent } from './admin-date-dialog.component';

describe('AdminDateDialogComponent', () => {
  let component: AdminDateDialogComponent;
  let fixture: ComponentFixture<AdminDateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDateDialogComponent]
    });
    fixture = TestBed.createComponent(AdminDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
