import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentKardexRequestComponent } from './student-kardex-request.component';

describe('StudentKardexRequestComponent', () => {
  let component: StudentKardexRequestComponent;
  let fixture: ComponentFixture<StudentKardexRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentKardexRequestComponent]
    });
    fixture = TestBed.createComponent(StudentKardexRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
