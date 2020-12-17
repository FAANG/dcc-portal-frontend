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
    const test_records = {
      "standard": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [{
          "key": "Legacy",
          "doc_count": 11
        }, {
          "key": "FAANG",
          "doc_count": 6
        }]
      },
      "assay_type": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [{
          "key": "transcription profiling by high throughput sequencing",
          "doc_count": 12
        }, {
          "key": "whole genome sequencing assay",
          "doc_count": 5
        }]
      },
      "study": {
        "doc_count_error_upper_bound": 496,
        "sum_other_doc_count": 109680,
        "buckets": [{
          "key": "PRJEB19199",
          "doc_count": 13
        }, {
          "key": "PRJEB25226",
          "doc_count": 4
        }]
      },
      "paper_published": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [{
          "key": "true",
          "doc_count": 11
        }]
      },
      "species": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [{
          "key": "Bos taurus",
          "doc_count": 15
        }, {
          "key": "Gallus gallus",
          "doc_count": 2
        }]
      },
      "paper_published_missing": {
        "doc_count": 4
      },
      "instrument": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 476,
        "buckets": [{
          "key": "Illumina HiSeq 2000",
          "doc_count": 14
        }, {
          "key": "Illumina HiSeq 2500",
          "doc_count": 3
        }]
      },
      "target": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [{
          "key": "Unknown",
          "doc_count": 10
        }, {
          "key": "input DNA",
          "doc_count": 7
        }]
      }
    };

    const should_return_list = {
      standard: [
        ['Legacy', 11], 
        ['FAANG', 6]
      ],
      study: [
        ['PRJEB19199', 13],
        ['PRJEB25226', 4]
      ],
      species: [
        ['Bos taurus', 15],
        ['Gallus gallus', 2]
      ],
      assay_type: [
        ['RNA-Seq', 12],
        ['whole genome sequencing assay', 5]
      ],
      target: [
        ['Unknown', 10],
        ['input DNA', 7] 
      ],
      instrument: [
        ['Illumina HiSeq 2000', 14],
        ['Illumina HiSeq 2500', 3]
      ],
      paper_published: [
        ['Yes', 11], 
        ['No', 4]
      ]
    };

    service.data.subscribe(data => {
      expect(data).toEqual(should_return_list);
    });
    service.getAggregations(test_records, 'file');
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
      paper_published: [[ 'Yes', 1], ['No', 1]]
    };

    service.data.subscribe(data => {
      expect(data).toEqual(should_return_list);
    });
    service.getAggregations(test_list, 'organism');
  }));

  it ('should return aggregation for specimen type', inject([AggregationService], (service: AggregationService) => {
    const test_records = {
      "standard": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [{
          "key": "Legacy (basic)",
          "doc_count": 6
        }, {
          "key": "Legacy",
          "doc_count": 5
        }, {
          "key": "FAANG",
          "doc_count": 4
        }]
      },
      "paper_published": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [{
          "key": "true",
          "doc_count": 12
        }]
      },
      "material": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [{
          "key": "specimen from organism",
          "doc_count": 6
        }, {
          "key": "cell specimen",
          "doc_count": 3
        }]
      },
      "organism": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [{
          "key": "Bos taurus",
          "doc_count": 21
        }, {
          "key": "Sus scrofa",
          "doc_count": 2
        }]
      },
      "sex": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 47,
        "buckets": [{
          "key": "female",
          "doc_count": 20
        }, {
          "key": "male",
          "doc_count": 8
        }]
      },
      "paper_published_missing": {
        "doc_count": 5
      },
      "organismpart_celltype": {
        "doc_count_error_upper_bound": 221,
        "sum_other_doc_count": 33796,
        "buckets": [{
          "key": "blood",
          "doc_count": 7
        }, {
          "key": "liver",
          "doc_count": 5
        }]
      },
      "breed": {
        "doc_count_error_upper_bound": 154,
        "sum_other_doc_count": 22682,
        "buckets": [{
          "key": "Holstein",
          "doc_count": 12
        }, {
          "key": "Texel sire x Scottish Blackface dam",
          "doc_count": 5
        }]
      }
    };

    const should_return_list = {
      standard: [
        ['Legacy (basic)', 6],
        ['Legacy', 5],
        ['FAANG', 4]
      ],
      sex: [
        ['female', 20],
        ['male', 8]
      ],
      organism: [
        ['Bos taurus', 21],
        ['Sus scrofa', 2]
      ],
      material: [
        ['specimen from organism', 6],
        ['cell specimen', 3]
      ],
      organismpart_celltype: [
        ['blood', 7],
        ['liver', 5]
      ],
      breed: [
        ['Holstein', 12],
        ['Texel sire x Scottish Blackface dam', 5]
      ],
      paper_published: [
        [ 'Yes', 12], 
        ['No', 5]
      ]};

    service.data.subscribe(data => {
      expect(data).toEqual(should_return_list);
    });
    service.getAggregations(test_records, 'specimen');
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
