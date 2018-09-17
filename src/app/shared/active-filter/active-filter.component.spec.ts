import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveFilterComponent } from './active-filter.component';

describe('ActiveFilterComponent', () => {
  let component: ActiveFilterComponent;
  let fixture: ComponentFixture<ActiveFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
