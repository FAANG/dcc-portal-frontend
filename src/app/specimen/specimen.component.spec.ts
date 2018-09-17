import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecimenComponent } from './specimen.component';

describe('SpecimenComponent', () => {
  let component: SpecimenComponent;
  let fixture: ComponentFixture<SpecimenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecimenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecimenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
