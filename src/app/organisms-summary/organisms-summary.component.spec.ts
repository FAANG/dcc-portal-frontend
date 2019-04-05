import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismsSummaryComponent } from './organisms-summary.component';

describe('OrganismsSummaryComponent', () => {
  let component: OrganismsSummaryComponent;
  let fixture: ComponentFixture<OrganismsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganismsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
