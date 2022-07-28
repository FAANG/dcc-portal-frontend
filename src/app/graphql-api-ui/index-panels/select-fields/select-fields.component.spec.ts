import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFieldsComponent } from './select-fields.component';

describe('SelectFieldsComponent', () => {
  let component: SelectFieldsComponent;
  let fixture: ComponentFixture<SelectFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
