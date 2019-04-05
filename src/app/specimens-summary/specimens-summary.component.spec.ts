import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecimensSummaryComponent } from './specimens-summary.component';

describe('SpecimensSummaryComponent', () => {
  let component: SpecimensSummaryComponent;
  let fixture: ComponentFixture<SpecimensSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecimensSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecimensSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
