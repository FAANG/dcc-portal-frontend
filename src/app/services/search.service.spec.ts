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

  it('should return 8203 result files when search for scrofa', inject([SearchService], (service: SearchService) => {
    service.searchFile('scrofa', false).subscribe(data => {
      expect(data['hits']['total']).toEqual(8203);
    });
  }));

  it('should return 1204 result files when search for scrofa with excluding legacy data', inject([SearchService],
    (service: SearchService) => {
    service.searchFile('scrofa', true).subscribe(data => {
      expect(data['hits']['total']).toEqual(1204);
    });
  }));

  it('should return 160 result organisms when search for scrofa', inject([SearchService], (service: SearchService) => {
    service.searchOrganism('scrofa', false).subscribe(data => {
      expect(data['hits']['total']).toEqual(160);
    });
  }));

  it('should return 160 result organisms when search for scrofa with excluding legacy data', inject([SearchService],
    (service: SearchService) => {
    service.searchOrganism('scrofa', true).subscribe(data => {
      expect(data['hits']['total']).toEqual(160);
    });
  }));

  it('should return 4535 result specimens when search for scrofa', inject([SearchService],
    (service: SearchService) => {
    service.searchSpecimen('scrofa', false).subscribe(data => {
      expect(data['hits']['total']).toEqual(4535);
    });
  }));

  it('should return 1826 result specimens when search for scrofa with excluding legacy data', inject([SearchService],
    (service: SearchService) => {
    service.searchSpecimen('scrofa', true).subscribe(data => {
      expect(data['hits']['total']).toEqual(1826);
    });
  }));

  it('should return 88 result datasets when search for scrofa', inject([SearchService], (service: SearchService) => {
    service.searchDataset('scrofa', false).subscribe(data => {
      expect(data['hits']['total']).toEqual(88);
    });
  }));

  it('should return 11 result datasets when search for scrofa with excluding legacy data', inject([SearchService],
    (service: SearchService) => {
    service.searchDataset('scrofa', true).subscribe(data => {
      expect(data['hits']['total']).toEqual(11);
    });
  }));
});
