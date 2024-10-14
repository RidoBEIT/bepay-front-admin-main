import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementApiComponent } from './disbursement-api.component';

describe('DisbursementApiComponent', () => {
  let component: DisbursementApiComponent;
  let fixture: ComponentFixture<DisbursementApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisbursementApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisbursementApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
