import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecimenFilesComponent } from './specimen-files.component';

describe('SpecimenFilesComponent', () => {
  let component: SpecimenFilesComponent;
  let fixture: ComponentFixture<SpecimenFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecimenFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecimenFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
