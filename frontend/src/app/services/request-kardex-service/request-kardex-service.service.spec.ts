import { TestBed } from '@angular/core/testing';

import { RequestKardexService } from './request-kardex.service';

describe('RequestKardexServiceService', () => {
  let service: RequestKardexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestKardexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
