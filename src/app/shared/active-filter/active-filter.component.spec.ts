import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';

import { ActiveFilterComponent } from './active-filter.component';
import {AggregationService} from '../../services/aggregation.service';

describe('ActiveFilterComponent', () => {
  let component: ActiveFilterComponent;
  let fixture: ComponentFixture<ActiveFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [ActiveFilterComponent],
    providers: [AggregationService]
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

  it ('clearFilter should emit new data', inject([AggregationService], (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['standard']).toEqual([]);
    });
    component.clearFilter('FAANG');
  }));
});
