import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismDetailComponent } from './organism-detail.component';

describe('OrganismDetailComponent', () => {
  let component: OrganismDetailComponent;
  let fixture: ComponentFixture<OrganismDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganismDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
