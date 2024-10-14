import { TestBed } from '@angular/core/testing';

import { TypeReponseService } from './type-reponse.service';

describe('TypeReponseService', () => {
  let service: TypeReponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeReponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
