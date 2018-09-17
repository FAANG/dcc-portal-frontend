import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismSpecimenComponent } from './organism-specimen.component';

describe('OrganismSpecimenComponent', () => {
  let component: OrganismSpecimenComponent;
  let fixture: ComponentFixture<OrganismSpecimenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganismSpecimenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismSpecimenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
