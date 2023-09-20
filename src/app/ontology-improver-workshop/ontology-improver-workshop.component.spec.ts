import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologyImproverWorkshopComponent } from './ontology-improver-workshop.component';

describe('OntologyImproverWorkshopComponent', () => {
  let component: OntologyImproverWorkshopComponent;
  let fixture: ComponentFixture<OntologyImproverWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OntologyImproverWorkshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OntologyImproverWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
