import { TestBed } from '@angular/core/testing';
import { BilletService } from './billets.services';


describe('BilletService', () => {
  let service: BilletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BilletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
