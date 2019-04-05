import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetsSummaryComponent } from './datasets-summary.component';

describe('DatasetsSummaryComponent', () => {
  let component: DatasetsSummaryComponent;
  let fixture: ComponentFixture<DatasetsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
