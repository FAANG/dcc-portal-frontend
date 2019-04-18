import { TestBed, inject } from '@angular/core/testing';

import { ApiFileService } from './api-file.service';
import {HttpClientModule} from '@angular/common/http';

describe('ApiFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiFileService
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([ApiFileService], (service: ApiFileService) => {
    expect(service).toBeTruthy();
  }));

  it('should return first 10 files', inject([ApiFileService], (service: ApiFileService) => {
  const query = {
      'sort': 'name:desc',
      '_source': [
        'study.accession',
        'experiment.accession',
        'species.text',
        'experiment.assayType',
        'specimen',
        'run.instrument',
        'experiment.standardMet',
        'paperPublished'],
    };
    service.getAllFiles(query, 10).subscribe(data => {
      expect(data.length).toEqual(10);
    });
  }));

  it('should return detailed information about particular file', inject([ApiFileService], (service: ApiFileService) => {
    service.getFile('SRR958466_2').subscribe(data => {
      expect(data['hits']['hits'][0]['_source']['name']).toEqual('SRR958466_2.fastq.gz');
    });
  }));

  it('should return files from particular run', inject([ApiFileService], (service: ApiFileService) => {
    service.getFilesByRun('SRR958466').subscribe(data => {
      expect(data['hits']['hits'][0]['_source']['name']).toEqual('SRR958466_1.fastq.gz');
    });
  }));
});
