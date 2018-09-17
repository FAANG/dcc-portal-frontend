import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecimenDetailComponent } from './specimen-detail.component';

describe('SpecimenDetailComponent', () => {
  let component: SpecimenDetailComponent;
  let fixture: ComponentFixture<SpecimenDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecimenDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecimenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
