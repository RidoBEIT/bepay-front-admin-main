import { TestBed } from '@angular/core/testing';

import { ResponseParamService } from './response-param.service';

describe('ResponseParamService', () => {
  let service: ResponseParamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseParamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
