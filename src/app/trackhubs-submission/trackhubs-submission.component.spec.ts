import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrackhubsSubmissionComponent } from './trackhubs-submission.component';

describe('TrackhubsSubmissionComponent', () => {
  let component: TrackhubsSubmissionComponent;
  let fixture: ComponentFixture<TrackhubsSubmissionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackhubsSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackhubsSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
