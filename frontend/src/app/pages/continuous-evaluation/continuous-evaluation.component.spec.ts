import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuousEvaluationComponent } from './continuous-evaluation.component';

describe('ContinuousEvaluationComponent', () => {
  let component: ContinuousEvaluationComponent;
  let fixture: ComponentFixture<ContinuousEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContinuousEvaluationComponent]
    });
    fixture = TestBed.createComponent(ContinuousEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
