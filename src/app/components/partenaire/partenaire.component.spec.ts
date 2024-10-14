import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartenaireComponent } from './partenaire.component';

describe('CompagnieComponent', () => {
  let component: PartenaireComponent;
  let fixture: ComponentFixture<PartenaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartenaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
