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

  it ('should return human name', inject([AggregationService], (service: AggregationService) => {
    expect(service.getHumanName('experimentalProtocol')).toEqual('Experimental protocol');
  }));

  it ('should return aggregation for file type', inject([AggregationService], (service: AggregationService) => {
    const test_list = [
      {
        'standard': 'Faang',
        'study': 'PRJNA216983',
        'species': 'Gallus gallus',
        'assayType': 'whole genome sequencing assay',
        'instrument': 'Illumina HiSeq 2000',
        'paperPublished': 'true',
      },
      {
        'standard': 'Faang',
        'study': 'PRJNA216983',
        'species': 'Gallus gallus',
        'assayType': 'whole genome sequencing assay',
        'instrument': 'Illumina HiSeq 2000',
        'paperPublished': 'false',
      }
    ];

    const should_return_list = {
      standard: [['Faang', 2]],
      study: [['PRJNA216983', 2]],
      species: [['Gallus gallus', 2]],
      assay_type: [['whole genome sequencing assay', 2]],
      instrument: [['Illumina HiSeq 2000', 2]],
      paper_published: [['Yes', 1 ], ['No', 1]]};

    service.data.subscribe(data => {
      expect(data).toEqual(should_return_list);
    });
    service.getAggregations(test_list, 'file');
  }));

  it ('should return aggregation for organism type', inject([AggregationService], (service: AggregationService) => {
    const test_list = [
      {
        'sex': 'male',
        'standard': 'Faang',
        'organism': 'Equus caballus',
        'breed': 'Thoroughbred',
        'paperPublished': 'true'
      },
      {
        'sex': 'male',
        'standard': 'Faang',
        'organism': 'Equus caballus',
        'breed': 'Thoroughbred',
        'paperPublished': 'false'
      }
    ];

    const should_return_list = {
      standard: [['Faang', 2]],
      sex: [['male', 2]],
      organism: [['Equus caballus', 2]],
      breed: [[ 'Thoroughbred', 2 ]],
      paper_published: [[ 'Yes', 1], ['No', 1]]};

    service.data.subscribe(data => {
      expect(data).toEqual(should_return_list);
    });
    service.getAggregations(test_list, 'organism');
  }));

  it ('should return aggregation for specimen type', inject([AggregationService], (service: AggregationService) => {
    const test_list = [
      {
        'standard': 'Faang',
        'sex': 'male',
        'organism': 'Equus caballus',
        'material': 'specimen from organism',
        'organismpart_celltype': 'esophagus',
        'breed': 'Thoroughbred',
        'paperPublished': 'true'
      },
      {
        'standard': 'Faang',
        'sex': 'male',
        'organism': 'Equus caballus',
        'material': 'specimen from organism',
        'organismpart_celltype': 'esophagus',
        'breed': 'Thoroughbred',
        'paperPublished': 'false'
      }
    ];

    const should_return_list = {
      standard: [['Faang', 2]],
      sex: [[ 'male', 2]],
      organism: [['Equus caballus', 2]],
      material: [[ 'specimen from organism', 2]],
      organismpart_celltype: [[ 'esophagus', 2]],
      breed: [['Thoroughbred', 2]],
      paper_published: [[ 'Yes', 1], ['No', 1]]};

    service.data.subscribe(data => {
      expect(data).toEqual(should_return_list);
    });
    service.getAggregations(test_list, 'specimen');
  }));

  it ('should return aggregation for dataset type', inject([AggregationService], (service: AggregationService) => {
    const test_list = [
      {
        'standard': 'Faang',
        'species': 'Bos taurus',
        'archive': 'ENA',
        'assayType': 'RNA-seq of non coding RNA,microRNA profiling by high throughput sequencing',
        'paperPublished': 'true'
      },
      {
        'standard': 'Faang',
        'species': 'Bos taurus',
        'archive': 'ENA',
        'assayType': 'RNA-seq of non coding RNA,microRNA profiling by high throughput sequencing',
        'paperPublished': 'false'
      },
    ];

    const should_return_list = {
      standard: [['Faang', 2]],
      species: [[ 'Bos taurus', 2]],
      assay_type: [['RNA-seq of non coding RNA', 2],
        [ 'microRNA profiling by high throughput sequencing', 2 ]],
      archive: [['ENA', 2]],
      paper_published: [['Yes', 1], ['No', 1]]};

    service.data.subscribe(data => {
      expect(data).toEqual(should_return_list);
    });
    service.getAggregations(test_list, 'dataset');
  }));

  it ('should return aggregation for protocol samples type', inject([AggregationService], (service: AggregationService) => {
    const test_list = [
      {
        'protocol_name': 'Harvest of Large Animal Tissues',
        'university_name': 'Roslin Institute (Edinburgh, UK)',
        'protocol_date': '2016',
        'protocol_type': 'samples'
      },
      {
        'protocol_name': 'Harvest of Large Animal Tissues',
        'university_name': 'Roslin Institute (Edinburgh, UK)',
        'protocol_date': '2016',
        'protocol_type': 'samples'
      }
    ];

    const should_return_list = {
      protocol_name: [['Harvest of Large Animal Tissues', 2]],
      university_name: [['Roslin Institute (Edinburgh, UK)', 2]],
      protocol_date: [['2016', 2]],
      protocol_type: [['samples', 2]]};

    service.data.subscribe(data => {
      expect(data).toEqual(should_return_list);
    });
    service.getAggregations(test_list, 'protocol');
  }));

  it ('should return aggregation for protocol experiments type', inject([AggregationService], (service: AggregationService) => {
    const test_list = [
      {
        'name': 'libraryGenerationProtocol',
        'experimentTarget': 'total RNA',
        'assayType': 'transcription profiling by high throughput sequencing'
      },
      {
        'name': 'libraryGenerationProtocol',
        'experimentTarget': 'total RNA',
        'assayType': 'transcription profiling by high throughput sequencing'
      }
    ];

    const should_return_list = {
      protocol_type: [['Library generation protocol', 2]],
      experiment_target: [['total RNA', 2]],
      assay_type: [['transcription profiling by high throughput sequencing', 2]]};

    service.data.subscribe(data => {
      expect(data).toEqual(should_return_list);
    });
    service.getAggregations(test_list, 'protocol_experiments');
  }));
});
