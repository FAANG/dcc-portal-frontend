import { TestBed, inject } from '@angular/core/testing';

import { AggregationService } from './aggregation.service';

describe('AggregationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AggregationService]
    });
  });

  it('should be created', inject([AggregationService], (service: AggregationService) => {
    expect(service).toBeTruthy();
  }));
});
