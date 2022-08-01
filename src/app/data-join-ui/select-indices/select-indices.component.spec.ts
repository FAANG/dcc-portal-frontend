import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIndicesComponent } from './select-indices.component';

describe('SelectIndicesComponent', () => {
  let component: SelectIndicesComponent;
  let fixture: ComponentFixture<SelectIndicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectIndicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectIndicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
