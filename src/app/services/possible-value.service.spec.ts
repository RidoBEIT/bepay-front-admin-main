import { TestBed } from '@angular/core/testing';

import { PossibleValueService } from './possible-value.service';

describe('PossibleValueService', () => {
  let service: PossibleValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PossibleValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
