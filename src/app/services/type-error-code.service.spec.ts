import { TestBed } from '@angular/core/testing';

import { TypeErrorCodeService } from './type-error-code.service';

describe('TypeErrorCodeService', () => {
  let service: TypeErrorCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeErrorCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
