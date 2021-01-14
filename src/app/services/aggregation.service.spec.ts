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

  it ('should return aggregation for file type', inject([AggregationService], (service: AggregationService) => {
    const test_records = {
      "assay_type": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [{
          "key": "RNA-Seq",
          "doc_count": 12
        }, {
          "key": "whole genome sequencing assay",
          "doc_count": 5
        }]
      },
      "paper_published": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [{
          "key": "false",
          "doc_count": 11
        }]
      },
    };

    const should_return_list = {
      assay_type: [
        ['RNA-Seq', 12],
        ['whole genome sequencing assay', 5]
      ],
      paper_published: [
        ['No', 11]
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
        'sex': 'Female',
        'standard': 'Legacy',
        'organism': 'Bos taurus',
        'breed': 'Norwegian Red',
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
      standard: [['Faang', 2], ['Legacy', 1]],
      sex: [['male', 2], ['female', 1]],
      organism: [['Equus caballus', 2], ['Bos taurus', 1]],
      breed: [[ 'Thoroughbred', 2 ], ['Norwegian Red', 1]],
      paper_published: [[ 'Yes', 2], ['No', 1]]
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
  it ('should return aggregation for specimen type', inject([AggregationService], (service: AggregationService) => {
    const test_records = {
      "paper_published": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 0,
        "buckets": [{
          "key": "false",
          "doc_count": 12
        }]
      },
      "sex": {
        "doc_count_error_upper_bound": 0,
        "sum_other_doc_count": 47,
        "buckets": [{
          "key": "female",
          "doc_count": 20
        }, {
          "key": "Not determined",
          "doc_count": 8
        }]
      }
    };

    const should_return_list = {
      sex: [
        ['female', 20],
        ['Not determined', 8]
      ],
      paper_published: [
        [ 'No', 12]
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

  it ('should return aggregation for dataset type', inject([AggregationService], (service: AggregationService) => {
    const test_list = [
      {
        'standard': 'Faang',
        'species': 'Bos taurus',
        'archive': 'ENA',
        'assayType': 'RNA-seq of non coding RNA',
        'paperPublished': 'true'
      },
      {
        'standard': 'Faang',
        'species': 'Bos taurus',
        'archive': 'SRA',
        'assayType': 'RNA-seq of non coding RNA,microRNA profiling by high throughput sequencing',
        'paperPublished': 'false'
      },
      {
        'standard': 'Legacy',
        'species': 'Gallus gallus',
        'archive': 'ENA',
        'assayType': 'transcription profiling by high throughput sequencing',
        'paperPublished': 'true'
      },
    ];

    const should_return_list = {
      standard: [['Faang', 2], ['Legacy', 1]],
      species: [[ 'Bos taurus', 2], ['Gallus gallus', 1]],
      assay_type: [['RNA-seq of non coding RNA', 2],
        [ 'microRNA profiling by high throughput sequencing', 1 ],
        ['RNA-Seq', 1]],
      archive: [['ENA', 2], ['SRA', 1]],
      paper_published: [['Yes', 2], ['No', 1]]};

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
        'protocol_name': 'PBMC seperation swine blood',
        'university_name': 'French National Institute for Agricultural Research (France)',
        'protocol_date': '2016',
        'protocol_type': 'samples'
      },
      {
        'protocol_name': 'Harvest of Large Animal Tissues',
        'university_name': 'Roslin Institute (Edinburgh, UK)',
        'protocol_date': '2017',
        'protocol_type': 'experiment'
      }
    ];

    const should_return_list = {
      protocol_name: [['Harvest of Large Animal Tissues', 2], ['PBMC seperation swine blood', 1]],
      university_name: [['Roslin Institute (Edinburgh, UK)', 2], 
                        ['French National Institute for Agricultural Research (France)', 1]],
      protocol_date: [['2016', 2], ['2017', 1]],
      protocol_type: [['samples', 2], ['experiment', 1]]};

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
      },
      {
        'name': 'extractionProtocol',
        'experimentTarget': 'CHEBI_33697',
        'assayType': 'RNA-seq of non coding RNA'
      }
    ];

    const should_return_list = {
      protocol_type: [['Library generation protocol', 2], ['Extraction protocol', 1]],
      experiment_target: [['total RNA', 2], ['CHEBI 33697', 1]],
      assay_type: [['transcription profiling by high throughput sequencing', 2],
                    ['RNA-seq of non coding RNA', 1]]};

    service.data.subscribe(data => {
      expect(data).toEqual(should_return_list);
    });
    service.getAggregations(test_list, 'protocol_experiments');
  }));

  it ('should return aggregation for analysis type', inject([AggregationService], (service: AggregationService) => {
    const test_list = [
      {
        'standard': 'Legacy',
        'species': 'Bos taurus',
        'datasetAccession': 'PRJEB19199',
        'analysisType': 'REFERENCE_ALIGNMENT'
      },
      {
        'standard': 'FAANG',
        'species': 'Equus caballus',
        'assayType': 'ChIP-seq',
        'datasetAccession': 'PRJEB35307',
        'analysisType': 'SEQUENCE_ANNOTATION'
      },
      {
        'standard': 'FAANG',
        'species': 'Equus caballus',
        'assayType': 'ChIP-seq',
        'datasetAccession': 'PRJEB35307',
        'analysisType': 'SEQUENCE_ANNOTATION'
      }
    ];

    const should_return_list = {
      standard: [['FAANG', 2], ['Legacy', 1]],
      species: [['Equus caballus', 2], ['Bos taurus', 1]],
      assay_type: [['ChIP-seq', 2], ['not provided', 1]],
      dataset: [['PRJEB35307', 2], ['PRJEB19199', 1]],
      analysis_type: [['SEQUENCE ANNOTATION', 2], ['REFERENCE ALIGNMENT', 1]],
    };
    service.data.subscribe(data => {
      expect(data).toEqual(should_return_list);
    });
    service.getAggregations(test_list, 'analysis');
  }));

  it ('should return aggregation for article type', inject([AggregationService], (service: AggregationService) => {
    const test_list = [
      {
        'journal': 'Front Vet Sci',
        'year': '2020',
        'datasetSource': 'All',
      },
      {
        'journal': 'Front Vet Sci',
        'year': '2020',
        'datasetSource': 'All',
      },
      {
        'journal': 'BMC Biol',
        'year': '2019',
        'datasetSource': 'FAANG Only',
      },
    ];

    const should_return_list = {
      journal: [['Front Vet Sci', 2], ['BMC Biol', 1]],
      year: [['2020', 2], ['2019', 1]],
      datasetSource: [['FAANG Only', 1]],
    };
    service.data.subscribe(data => {
      expect(data).toEqual(should_return_list);
    });
    service.getAggregations(test_list, 'article');
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
