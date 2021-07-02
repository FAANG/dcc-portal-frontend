import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntologyDetailComponent } from './ontology-detail.component';

describe('OntologyDetailComponent', () => {
  let component: OntologyDetailComponent;
  let fixture: ComponentFixture<OntologyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntologyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntologyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
