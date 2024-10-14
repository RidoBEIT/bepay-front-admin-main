import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeErrorCodeComponent } from './type-error-code.component';

describe('TypeErrorCodeComponent', () => {
  let component: TypeErrorCodeComponent;
  let fixture: ComponentFixture<TypeErrorCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeErrorCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeErrorCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
