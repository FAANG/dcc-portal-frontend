import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFieldsAndFiltersComponent } from './select-fields-and-filters.component';

describe('SelectFieldsAndFiltersComponent', () => {
  let component: SelectFieldsAndFiltersComponent;
  let fixture: ComponentFixture<SelectFieldsAndFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFieldsAndFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFieldsAndFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
