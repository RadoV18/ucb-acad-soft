import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDialogComponent } from './admin-dialog.component';

describe('AdminDialogComponent', () => {
  let component: AdminDialogComponent;
  let fixture: ComponentFixture<AdminDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDialogComponent]
    });
    fixture = TestBed.createComponent(AdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
