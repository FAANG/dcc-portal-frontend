import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologyDetailWorkshopComponent } from './ontology-detail-workshop.component';

describe('OntologyDetailWorkshopComponent', () => {
  let component: OntologyDetailWorkshopComponent;
  let fixture: ComponentFixture<OntologyDetailWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OntologyDetailWorkshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OntologyDetailWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
