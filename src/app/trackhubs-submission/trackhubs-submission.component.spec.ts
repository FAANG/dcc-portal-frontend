import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackhubsSubmissionComponent } from './trackhubs-submission.component';

describe('TrackhubsSubmissionComponent', () => {
  let component: TrackhubsSubmissionComponent;
  let fixture: ComponentFixture<TrackhubsSubmissionComponent>;

  beforeEach(async(() => {
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
