import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NextflowSubmissionComponent } from './nextflow-submission.component';

describe('NextflowSubmissionComponent', () => {
  let component: NextflowSubmissionComponent;
  let fixture: ComponentFixture<NextflowSubmissionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NextflowSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextflowSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
