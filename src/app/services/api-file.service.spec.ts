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

  it('should return experiment for particular file', inject([ApiFileService], (service: ApiFileService) => {
    service.getFilesExperiment('SRX339479').subscribe(data => {
      const experiment_should_be = {
        standardMet: 'Legacy',
        accession: 'SRX339479',
        assayType: 'whole genome sequencing assay',
        experimentTarget: 'input DNA'};
      expect(data['hits']['hits'][0]['_source']).toEqual(experiment_should_be);
    });
  }));

  it('should return first 10 organisms', inject([ApiFileService], (service: ApiFileService) => {
    const query = {
      'sort': 'id_number:desc',
      '_source': [
        'biosampleId',
        'sex.text',
        'organism.text',
        'breed.text',
        'standardMet',
        'id_number',
        'paperPublished'],
    };
    service.getAllOrganisms(query, 10).subscribe(data => {
      expect(data.length).toEqual(10);
    });
  }));

  it('should return detailed information about particular organism', inject([ApiFileService], (service: ApiFileService) => {
    service.getOrganism('SAMEA104728877').subscribe(data => {
      expect(data['hits']['hits'][0]['_source']['name']).toEqual('ECA_UCD_AH2');
    });
  }));

  it('should return information about specimens of organism', inject([ApiFileService], (service: ApiFileService) => {
    service.getOrganismsSpecimens('SAMEA104728877').subscribe(data => {
      expect(data['hits']['hits'][0]['_source']['name']).toEqual('ECA_UCD_S116');
    });
  }));

  it('should return first 10 specimens', inject([ApiFileService], (service: ApiFileService) => {
    const query = {
      'sort': 'id_number:desc',
      '_source': [
        'biosampleId',
        'material.text',
        'cellType.text',
        'organism.sex.text',
        'organism.organism.text',
        'organism.breed.text',
        'standardMet',
        'id_number',
        'paperPublished'],
    };
    service.getAllSpecimens(query, 10).subscribe(data => {
      expect(data.length).toEqual(10);
    });
  }));

  it('should return detailed information about particular specimen', inject([ApiFileService], (service: ApiFileService) => {
    service.getSpecimen('SAMEA104728909').subscribe(data => {
      expect(data['hits']['hits'][0]['_source']['name']).toEqual('ECA_UCD_S63');
    });
  }));

  it('should return files information about particular specimen', inject([ApiFileService], (service: ApiFileService) => {
    service.getSpecimenFiles('SAMEA104728903').subscribe(data => {
      expect(data['hits']['hits'].length).toEqual(4);
    });
  }));

  it('should return first 10 datasets', inject([ApiFileService], (service: ApiFileService) => {
    const query = {
      '_source': [
        'accession',
        'title',
        'species.text',
        'archive',
        'experiment.accession',
        'file.name',
        'specimen.biosampleId',
        'assayType',
        'standardMet',
        'paperPublished'],
    };
    service.getAllDatasets(query, 10).subscribe(data => {
      expect(data.length).toEqual(10);
    });
  }));

  it('should return detailed information about particular dataset', inject([ApiFileService], (service: ApiFileService) => {
    service.getDataset('PRJEB28219').subscribe(data => {
      expect(data['hits']['hits'][0]['_source']['accession']).toEqual('PRJEB28219');
    });
  }));

  it('should return 23 sample protocols', inject([ApiFileService], (service: ApiFileService) => {
    const query = {
      '_source': [
        'key',
        'protocolName',
        'universityName',
        'protocolDate',
        'protocolType'],
    };
    service.getAllSamplesProtocols(query).subscribe(data => {
      expect(data.length).toEqual(23);
    });
  }));

  it('should return detailed information about particular sample protocols', inject([ApiFileService], (service: ApiFileService) => {
    service.getSampleProtocol('ROSLIN_SOP_Harvest_of_Large_Animal_Tissues_20160516.pdf').subscribe(data => {
      expect(data['hits']['hits'][0]['_source']['key']).toEqual('ROSLIN_SOP_Harvest_of_Large_Animal_Tissues_20160516.pdf');
    });
  }));
});
