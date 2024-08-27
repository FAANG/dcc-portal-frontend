import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationSamplesComponent } from './validation-samples.component';

describe('ValidationSamplesComponent', () => {
  let component: ValidationSamplesComponent;
  let fixture: ComponentFixture<ValidationSamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationSamplesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
