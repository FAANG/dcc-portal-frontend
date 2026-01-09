import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationBetaComponent } from './validation-beta.component';

describe('ValidationBetaComponent', () => {
  let component: ValidationBetaComponent;
  let fixture: ComponentFixture<ValidationBetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationBetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationBetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
