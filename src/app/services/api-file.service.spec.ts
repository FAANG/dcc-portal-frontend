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

  it('should return detailed information about particular file', inject([ApiFileService],
    (service: ApiFileService) => {
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

  it('should return detailed information about particular organism', inject([ApiFileService],
    (service: ApiFileService) => {
    service.getOrganism('SAMEA104728877').subscribe(data => {
      expect(data['hits']['hits'][0]['_source']['name']).toEqual('ECA_UCD_AH2');
    });
  }));

  it('should return information about specimens of organism', inject([ApiFileService],
    (service: ApiFileService) => {
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

  it('should return detailed information about particular specimen', inject([ApiFileService],
    (service: ApiFileService) => {
    service.getSpecimen('SAMEA104728909').subscribe(data => {
      expect(data['hits']['hits'][0]['_source']['name']).toEqual('ECA_UCD_S63');
    });
  }));

  it('should return files information about particular specimen', inject([ApiFileService],
    (service: ApiFileService) => {
    service.getSpecimenFiles('SAMEA104728903').subscribe(data => {
      expect(data['hits']['hits'].length).toEqual(4);
    });
  }));

  it('should return first 10 datasets', inject([ApiFileService], (service: ApiFileService) => {
    const query = {
      'sort': 'accession:desc',
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

  it('getSpeciesStr should return string with species', inject([ApiFileService],
    (service: ApiFileService) => {
      const dataset = {
        _source: {
          species: [
            {
              text: 'Gallus gallus'
            },
            {
              text: 'Sus scrofa'
            }
          ]
        }
      };
      expect(service.getSpeciesStr(dataset)).toEqual('Sus scrofa,Gallus gallus');
    }));

  it('convertArrayToString should return string with items from array', inject([ApiFileService],
    (service: ApiFileService) => {
      const dataset = ['1', '2'];
      expect(service.convertArrayToString(dataset)).toEqual('1,2');
    }));

  it('should return detailed information about particular dataset', inject([ApiFileService],
    (service: ApiFileService) => {
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

  it('should return detailed information about particular sample protocol', inject([ApiFileService],
    (service: ApiFileService) => {
    service.getSampleProtocol('ROSLIN_SOP_Harvest_of_Large_Animal_Tissues_20160516.pdf').subscribe(data => {
      expect(data['hits']['hits'][0]['_source']['key']).toEqual('ROSLIN_SOP_Harvest_of_Large_Animal_Tissues_20160516.pdf');
    });
  }));

  it('should return 68 experiments protocols', inject([ApiFileService], (service: ApiFileService) => {
    const query = {
      '_source': [
        'name',
        'experimentTarget',
        'assayType',
        'key'],
    };
    service.getAllExperimentsProtocols(query).subscribe(data => {
      expect(data.length).toEqual(68);
    });
  }));

  it('should return detailed information about particular experiment protocol', inject([ApiFileService],
    (service: ApiFileService) => {
    service.getExperimentProtocol('libraryGenerationProtocol-transcriptionprofilingbyhighthroughputsequencing-totalRNA').subscribe(
      data => {
      expect(data['hits']['hits'][0]['_source']['key']).toEqual(
        'libraryGenerationProtocol-transcriptionprofilingbyhighthroughputsequencing-totalRNA');
    });
  }));

  it('should return information about organisms summary', inject([ApiFileService], (service: ApiFileService) => {
    service.getOrganismSummary('summary_organism').subscribe(data => {
      expect(data['hits']['hits'][0]['_id']).toEqual('summary_organism');
    });
  }));

  it('should return information about specimens summary', inject([ApiFileService], (service: ApiFileService) => {
    service.getSpecimenSummary('summary_specimen').subscribe(data => {
      expect(data['hits']['hits'][0]['_id']).toEqual('summary_specimen');
    });
  }));

  it('should return information about datasets summary', inject([ApiFileService], (service: ApiFileService) => {
    service.getDatasetSummary('summary_dataset').subscribe(data => {
      expect(data['hits']['hits'][0]['_id']).toEqual('summary_dataset');
    });
  }));

  it('should return information about files summary', inject([ApiFileService], (service: ApiFileService) => {
    service.getFileSummary('summary_file').subscribe(data => {
      expect(data['hits']['hits'][0]['_id']).toEqual('summary_file');
    });
  }));
});
