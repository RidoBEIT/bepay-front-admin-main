import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBilletsComponent } from './list-billets.component';

describe('ListBilletsComponent', () => {
  let component: ListBilletsComponent;
  let fixture: ComponentFixture<ListBilletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBilletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBilletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
