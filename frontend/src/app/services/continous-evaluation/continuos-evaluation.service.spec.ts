import { TestBed } from '@angular/core/testing';

import { ContinuosEvaluationService } from './continuos-evaluation.service';

describe('ContinuosEvaluationService', () => {
  let service: ContinuosEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContinuosEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
