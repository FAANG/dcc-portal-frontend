import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationExperimentsComponent } from './validation-experiments.component';

describe('ValidationExperimentsComponent', () => {
  let component: ValidationExperimentsComponent;
  let fixture: ComponentFixture<ValidationExperimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationExperimentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationExperimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
