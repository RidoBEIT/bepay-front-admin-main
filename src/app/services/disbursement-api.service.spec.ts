import { TestBed } from '@angular/core/testing';

import { DisbursementApiService } from './disbursement-api.service';

describe('DisbursementApiService', () => {
  let service: DisbursementApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisbursementApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
