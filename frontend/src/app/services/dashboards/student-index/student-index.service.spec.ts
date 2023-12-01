import { TestBed } from '@angular/core/testing';

import { StudentIndexService } from './student-index.service';

describe('StudentIndexService', () => {
  let service: StudentIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
