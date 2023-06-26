import { TestBed } from '@angular/core/testing';

import { ApiFiltersService } from './api-filters.service';

describe('ApiFiltersService', () => {
  let service: ApiFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
