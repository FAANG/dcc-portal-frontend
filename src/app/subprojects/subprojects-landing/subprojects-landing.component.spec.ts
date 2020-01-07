import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprojectsLandingComponent } from './subprojects-landing.component';

describe('SubprojectsLandingComponent', () => {
  let component: SubprojectsLandingComponent;
  let fixture: ComponentFixture<SubprojectsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubprojectsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubprojectsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
