import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologyImproverComponent } from './ontology-improver.component';

describe('OntologyImproverComponent', () => {
  let component: OntologyImproverComponent;
  let fixture: ComponentFixture<OntologyImproverComponent>;

  beforeEach(async(() => {
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
