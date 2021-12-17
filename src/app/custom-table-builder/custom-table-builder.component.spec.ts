import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableBuilderComponent } from './custom-table-builder.component';

describe('CustomTableBuilderComponent', () => {
  let component: CustomTableBuilderComponent;
  let fixture: ComponentFixture<CustomTableBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTableBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTableBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
