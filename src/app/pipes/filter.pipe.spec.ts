import {FilterPipe} from './filter.pipe';
import {async, inject, TestBed} from '@angular/core/testing';
import {AggregationService} from '../services/aggregation.service';
import {ExportService} from '../services/export.service';

describe('Pipe: FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FilterPipe
      ],
      providers: [
        AggregationService,
        ExportService
      ]
    })
      .compileComponents();
  }));

  it('should be created', inject([AggregationService, ExportService], (aggregation_service: AggregationService,
                                                                       export_service: ExportService) => {
    pipe = new FilterPipe(aggregation_service, export_service);
    expect(pipe.transform('', {}, 'file')).toEqual([]);
  }));

  it('should not filter dataset', inject([AggregationService, ExportService],
    (aggregation_service: AggregationService, export_service: ExportService) => {
    const value = [
      {
        species: {
          _source: {
            species: [
              {
                text: 'test1'
              }
            ]
          }
        },
        assayType: ['RNA-seq of non coding RNA', 'microRNA profiling by high throughput sequencing'],
        archive: ['ENA'],
        standard: 'FAANG',
        paperPublished: 'true'
      },
      {
        species: {
          _source: {
            species: [
              {
                text: 'test2'
              }
            ]
          }
        },
        assayType: ['RNA-seq of non coding RNA', 'microRNA profiling by high throughput sequencing'],
        archive: ['ENA'],
        standard: 'FAANG',
        paperPublished: 'true'
      },
    ];
    pipe = new FilterPipe(aggregation_service, export_service);
    export_service.data.subscribe(data => {
      expect(data[0]['species']).toEqual('test1');
      expect(data[1]['species']).toEqual('test2');
    });
    pipe.transform(value, {}, 'dataset');
  }));

  it('should not filter specimen and organism', inject([AggregationService, ExportService],
    (aggregation_service: AggregationService, export_service: ExportService) => {
    const value = [
      {
        idNumber: 1,
        sex: 'male'
      },
      {
        idNumber: 2,
        sex: 'female'
      },
    ];
    pipe = new FilterPipe(aggregation_service, export_service);
    export_service.data.subscribe(data => {
      expect(data[0]['sex']).toEqual('male');
      expect(data[1]['sex']).toEqual('female');
    });
    pipe.transform(value, {}, 'organism');
  }));

  it('should not filter protocol/protocol_experiments', inject([AggregationService, ExportService],
    (aggregation_service: AggregationService, export_service: ExportService) => {
    const value = [
      {
        key: 1,
        name: 'experimentalProtocol',
        customField: 'test1'
      },
      {
        key: 2,
        name: 'experimentalProtocol',
        customField: 'test2'
      },
    ];
    pipe = new FilterPipe(aggregation_service, export_service);
    export_service.data.subscribe(data => {
      expect(data[0]['customField']).toEqual('test1');
      expect(data[1]['customField']).toEqual('test2');
    });
    pipe.transform(value, {}, 'organism');
  }));

  it('should not filter other types', inject([AggregationService, ExportService],
    (aggregation_service: AggregationService, export_service: ExportService) => {
    const value = [
      {
        key: 1,
        name: 'experimentalProtocol',
        customField: 'test1'
      },
      {
        key: 2,
        name: 'experimentalProtocol',
        customField: 'test2'
      },
    ];
    pipe = new FilterPipe(aggregation_service, export_service);
    export_service.data.subscribe(data => {
      expect(data[0]['customField']).toEqual('test1');
      expect(data[1]['customField']).toEqual('test2');
    });
    pipe.transform(value, {}, 'file');
  }));

  it('should filter dataset by species field', inject([AggregationService, ExportService],
    (aggregation_service: AggregationService, export_service: ExportService) => {
    const value = [
      {
        species: {
          _source: {
            species: [
              {
                text: 'test1'
              }
            ]
          }
        },
        assayType: ['RNA-seq of non coding RNA', 'microRNA profiling by high throughput sequencing'],
        archive: ['ENA'],
        standard: 'FAANG',
        paperPublished: 'true'
      },
      {
        species: {
          _source: {
            species: [
              {
                text: 'test2'
              }
            ]
          }
        },
        assayType: ['RNA-seq of non coding RNA', 'microRNA profiling by high throughput sequencing'],
        archive: ['ENA'],
        standard: 'FAANG',
        paperPublished: 'true'
      },
    ];
    const filter_field = {
      species: ['test1']
    };
    pipe = new FilterPipe(aggregation_service, export_service);
    export_service.data.subscribe(data => {
      expect(data[0]['species']).toEqual('test1');
    });
    pipe.transform(value, filter_field, 'dataset');
  }));

  it('should filter dataset by archive field', inject([AggregationService, ExportService],
    (aggregation_service: AggregationService, export_service: ExportService) => {
    const value = [
      {
        species: {
          _source: {
            species: [
              {
                text: 'test1'
              }
            ]
          }
        },
        assayType: ['RNA-seq of non coding RNA', 'microRNA profiling by high throughput sequencing'],
        archive: ['ENA'],
        standard: 'FAANG',
        paperPublished: 'true'
      },
      {
        species: {
          _source: {
            species: [
              {
                text: 'test2'
              }
            ]
          }
        },
        assayType: ['RNA-seq of non coding RNA', 'microRNA profiling by high throughput sequencing'],
        archive: ['SRA'],
        standard: 'FAANG',
        paperPublished: 'true'
      },
    ];
    const filter_field = {
      archive: ['SRA']
    };
    pipe = new FilterPipe(aggregation_service, export_service);
    export_service.data.subscribe(data => {
      expect(data[0]['archive']).toEqual(['SRA']);
    });
    pipe.transform(value, filter_field, 'dataset');
  }));

  it('should filter dataset by assayType field', inject([AggregationService, ExportService],
    (aggregation_service: AggregationService, export_service: ExportService) => {
    const value = [
      {
        species: {
          _source: {
            species: [
              {
                text: 'test1'
              }
            ]
          }
        },
        assayType: ['microRNA profiling by high throughput sequencing'],
        archive: ['ENA'],
        standard: 'FAANG',
        paperPublished: 'true'
      },
      {
        species: {
          _source: {
            species: [
              {
                text: 'test2'
              }
            ]
          }
        },
        assayType: ['RNA-seq of non coding RNA'],
        archive: ['SRA'],
        standard: 'FAANG',
        paperPublished: 'true'
      },
    ];
    const filter_field = {
      assayType: ['RNA-seq of non coding RNA']
    };
    pipe = new FilterPipe(aggregation_service, export_service);
    export_service.data.subscribe(data => {
      expect(data[0]['assayType']).toEqual('RNA-seq of non coding RNA');
    });
    pipe.transform(value, filter_field, 'dataset');
  }));

  it('should filter specimen and organism by sex field', inject([AggregationService, ExportService],
    (aggregation_service: AggregationService, export_service: ExportService) => {
    const value = [
      {
        idNumber: 1,
        sex: 'male'
      },
      {
        idNumber: 2,
        sex: 'female'
      },
    ];
    const filter_field = {
      sex: ['male']
    };
    pipe = new FilterPipe(aggregation_service, export_service);
    export_service.data.subscribe(data => {
      expect(data[0]['sex']).toEqual('male');
    });
    pipe.transform(value, filter_field, 'organism');
  }));

  it('should filter all types by paperPublished field', inject([AggregationService, ExportService],
    (aggregation_service: AggregationService, export_service: ExportService) => {
    const value = [
      {
        idNumber: 1,
        paperPublished: 'true'
      },
      {
        idNumber: 2,
        paperPublished: 'false'
      },
    ];
    const filter_field = {
      paper_published: ['Yes']
    };
    pipe = new FilterPipe(aggregation_service, export_service);
    export_service.data.subscribe(data => {
      expect(data[0]['paperPublished']).toEqual('true');
    });
    pipe.transform(value, filter_field, 'organism');
  }));

  it('should filter all types by journal title field', inject([AggregationService, ExportService],
    (aggregation_service: AggregationService, export_service: ExportService) => {
    const value = [
      {
        idNumber: 1,
        journal: 'test1'
      },
      {
        idNumber: 2,
        journal: 'test2'
      },
    ];
    const filter_field = {
      journal_title: ['test1']
    };
    pipe = new FilterPipe(aggregation_service, export_service);
    export_service.data.subscribe(data => {
      expect(data[0]['journal']).toEqual('test1');
    });
    pipe.transform(value, filter_field, 'organism');
  }));

  it('should filter all types by publication year field', inject([AggregationService, ExportService],
    (aggregation_service: AggregationService, export_service: ExportService) => {
    const value = [
      {
        idNumber: 1,
        publicationYear: '2017'
      },
      {
        idNumber: 2,
        publicationYear: '2019'
      },
    ];
    const filter_field = {
      publication_year: ['2017']
    };
    pipe = new FilterPipe(aggregation_service, export_service);
    export_service.data.subscribe(data => {
      expect(data[0]['publicationYear']).toEqual('2017');
    });
    pipe.transform(value, filter_field, 'organism');
  }));

  it('should filter all types by any other field', inject([AggregationService, ExportService],
    (aggregation_service: AggregationService, export_service: ExportService) => {
    const value = [
      {
        idNumber: 1,
        customField: 'test1'
      },
      {
        idNumber: 2,
        customField: 'test2'
      },
    ];
    const filter_field = {
      customField: ['test1']
    };
    pipe = new FilterPipe(aggregation_service, export_service);
    export_service.data.subscribe(data => {
      expect(data[0]['customField']).toEqual('test1');
    });
    pipe.transform(value, filter_field, 'organism');
  }));

  it('should filter protocol/protocol_experiments types by any other field', inject([AggregationService, ExportService],
    (aggregation_service: AggregationService, export_service: ExportService) => {
    const value = [
      {
        key: 1,
        name: 'experimentalProtocol',
        customField: 'test1'
      },
      {
        key: 2,
        name: 'experimentalProtocol',
        customField: 'test2'
      },
    ];
    const filter_field = {
      customField: ['test1']
    };
    pipe = new FilterPipe(aggregation_service, export_service);
    export_service.data.subscribe(data => {
      expect(data[0]['customField']).toEqual('test1');
    });
    pipe.transform(value, filter_field, 'organism');
  }));
});
