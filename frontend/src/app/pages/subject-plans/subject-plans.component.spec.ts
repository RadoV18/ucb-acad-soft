import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectPlansComponent } from './subject-plans.component';

describe('SubjectPlansComponent', () => {
  let component: SubjectPlansComponent;
  let fixture: ComponentFixture<SubjectPlansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectPlansComponent]
    });
    fixture = TestBed.createComponent(SubjectPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
