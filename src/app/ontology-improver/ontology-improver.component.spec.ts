import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OntologyImproverComponent } from './ontology-improver.component';

describe('OntologyImproverComponent', () => {
  let component: OntologyImproverComponent;
  let fixture: ComponentFixture<OntologyImproverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OntologyImproverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologyImproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
