import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFiltersComponent } from './index-filters.component';

describe('IndexFiltersComponent', () => {
  let component: IndexFiltersComponent;
  let fixture: ComponentFixture<IndexFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
