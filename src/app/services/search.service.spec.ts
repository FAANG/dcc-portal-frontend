import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';
import {HttpClientModule} from '@angular/common/http';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchService
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  it('should return 6955 result files when search for scrofa', inject([SearchService], (service: SearchService) => {
    service.searchFile('scrofa', false).subscribe(data => {
      expect(data['hits']['total']).toEqual(6955);
    });
  }));

  it('should return 1033 result files when search for scrofa with excluding legacy data', inject([SearchService],
    (service: SearchService) => {
    service.searchFile('scrofa', true).subscribe(data => {
      expect(data['hits']['total']).toEqual(1033);
    });
  }));

  it('should return 64 result organisms when search for scrofa', inject([SearchService], (service: SearchService) => {
    service.searchOrganism('scrofa', false).subscribe(data => {
      expect(data['hits']['total']).toEqual(64);
    });
  }));

  it('should return 64 result organisms when search for scrofa with excluding legacy data', inject([SearchService],
    (service: SearchService) => {
    service.searchOrganism('scrofa', true).subscribe(data => {
      expect(data['hits']['total']).toEqual(64);
    });
  }));

  it('should return 3431 result specimens when search for scrofa', inject([SearchService],
    (service: SearchService) => {
    service.searchSpecimen('scrofa', false).subscribe(data => {
      expect(data['hits']['total']).toEqual(3431);
    });
  }));

  it('should return 1454 result specimens when search for scrofa with excluding legacy data', inject([SearchService],
    (service: SearchService) => {
    service.searchSpecimen('scrofa', true).subscribe(data => {
      expect(data['hits']['total']).toEqual(1454);
    });
  }));

  it('should return 77 result datasets when search for scrofa', inject([SearchService], (service: SearchService) => {
    service.searchDataset('scrofa', false).subscribe(data => {
      expect(data['hits']['total']).toEqual(77);
    });
  }));

  it('should return 11 result datasets when search for scrofa with excluding legacy data', inject([SearchService],
    (service: SearchService) => {
    service.searchDataset('scrofa', true).subscribe(data => {
      expect(data['hits']['total']).toEqual(11);
    });
  }));
});
