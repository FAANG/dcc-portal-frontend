import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationAnalysesComponent } from './validation-analyses.component';

describe('ValidationAnalysesComponent', () => {
  let component: ValidationAnalysesComponent;
  let fixture: ComponentFixture<ValidationAnalysesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationAnalysesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationAnalysesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
