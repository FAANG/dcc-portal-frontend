import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FilterComponent } from './filter.component';
import {AggregationService} from '../../services/aggregation.service';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  const test_agg = {
    'standard': ['testStandard', 1],
    'study': ['testStudy', 1],
    'dataset': ['testDataset', 1],
    'species': ['testSpecies', 1],
    'assay_type': ['testAssayType', 1],
    'analysis_type': ['testAnanlysisType', 1],
    'instrument': ['testInstrument', 1],
    'sex': ['testSex', 1],
    'organism': ['testOrganism', 1],
    'breed': ['testBreed', 1],
    'material': ['testMaterial', 1],
    'organismpart_celltype': ['testCellType', 1],
    'archive': ['testArchive', 1],
    'protocol_name': ['testProtocolName', 1],
    'university_name': ['testUniversity', 1],
    'protocol_date': ['testProtocolDate', 1],
    'protocol_type': ['testProtocolType', 1],
    'experiment_target': ['testExperiment', 1],
    'target': ['testTarget', 1],
    'paper_published': ['testPaper', 1],
    'journal': ['testJournal', 1],
    'year': ['testYear', 1],
    'datasetSource': ['testDataset', 1],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterComponent ],
      providers: [AggregationService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleCollapse should assign right values for itemLimit and isCollapsed when isCollapsed is true', () => {
    component.isCollapsed = true;
    component.toggleCollapse();
    expect(component.itemLimit).toEqual(10000);
    expect(component.isCollapsed).toEqual(false);
  });

  it('toggleCollapse should assign right values for itemLimit and isCollapsed when isCollapsed is false', () => {
    component.isCollapsed = false;
    component.filterSize = 3;
    component.toggleCollapse();
    expect(component.itemLimit).toEqual(3);
    expect(component.isCollapsed).toEqual(true);
  });

  it('getReverseHumanName should return right name', () => {
    expect(component.getReverseHumanName('Experimental protocol')).toEqual('experimentalProtocol');
  });

  it ('onButtonClick for Standard should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['standard']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Standard');
  }));

  it ('onButtonClick for Standard should emit standard data when upon double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('test', 'Standard');
    service.field.subscribe(data => {
      expect(data['standard']).toEqual([]);
    });
    component.onButtonClick('test', 'Standard');
  }));

  it ('onButtonClick for Study should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['study']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Study');
  }));

  it ('onButtonClick for Study should emit standard data when upon double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('test', 'Study');
    service.field.subscribe(data => {
      expect(data['study']).toEqual([]);
    });
    component.onButtonClick('test', 'Study');
  }));

  it ('onButtonClick for Species should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['species']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Species');
  }));

  it ('onButtonClick for Species should emit standard data when upon double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('test', 'Species');
    service.field.subscribe(data => {
      expect(data['species']).toEqual([]);
    });
    component.onButtonClick('test', 'Species');
  }));

  it ('onButtonClick for Assay type should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['assayType']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Assay type');
  }));

  it ('onButtonClick for Assay type should emit standard data when upon double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('test', 'Assay type');
    service.field.subscribe(data => {
      expect(data['assayType']).toEqual([]);
    });
    component.onButtonClick('test', 'Assay type');
  }));

  it ('onButtonClick for Target should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['target']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Target');
  }));

  it ('onButtonClick for Target should emit standard data when upon double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('test', 'Target');
    service.field.subscribe(data => {
      expect(data['target']).toEqual([]);
    });
    component.onButtonClick('test', 'Target');
  }));

  it ('onButtonClick for Instrument should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['instrument']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Instrument');
  }));

  it ('onButtonClick for Instrument should emit standard data when upon double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('test', 'Instrument');
    service.field.subscribe(data => {
      expect(data['instrument']).toEqual([]);
    });
    component.onButtonClick('test', 'Instrument');
  }));

  it ('onButtonClick for Sex should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['sex']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Sex');
  }));

  it ('onButtonClick for Sex should emit standard data when upon double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('test', 'Sex');
    service.field.subscribe(data => {
      expect(data['sex']).toEqual([]);
    });
    component.onButtonClick('test', 'Sex');
  }));

  it ('onButtonClick for Organism should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['organism']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Organism');
  }));

  it ('onButtonClick for Organism should emit standard data when upon double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('test', 'Organism');
    service.field.subscribe(data => {
      expect(data['organism']).toEqual([]);
    });
    component.onButtonClick('test', 'Organism');
  }));

  it ('onButtonClick for Breed should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['breed']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Breed');
  }));

  it ('onButtonClick for Breed should emit standard data when upon double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('test', 'Breed');
    service.field.subscribe(data => {
      expect(data['breed']).toEqual([]);
    });
    component.onButtonClick('test', 'Breed');
  }));

  it ('onButtonClick for Material should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['material']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Material');
  }));

  it ('onButtonClick for Material should emit standard data when upon double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('test', 'Material');
    service.field.subscribe(data => {
      expect(data['material']).toEqual([]);
    });
    component.onButtonClick('test', 'Material');
  }));

  it ('onButtonClick for Organism part/Cell type should emit standard data when upon single click',
    inject([AggregationService], (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['organismpart_celltype']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Organism part/Cell type');
  }));

  it ('onButtonClick for Organism part/Cell type should emit standard data when upon double click',
    inject([AggregationService], (service: AggregationService) => {
    component.onButtonClick('test', 'Organism part/Cell type');
    service.field.subscribe(data => {
      expect(data['organismpart_celltype']).toEqual([]);
    });
    component.onButtonClick('test', 'Organism part/Cell type');
  }));

  it ('onButtonClick for Archive type should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['archive']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Archive');
  }));

  it ('onButtonClick for Archive type should emit standard data when upon double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('test', 'Archive');
    service.field.subscribe(data => {
      expect(data['archive']).toEqual([]);
    });
    component.onButtonClick('test', 'Archive');
  }));

  it ('onButtonClick for Organisation type should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['university_name']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Organisation');
  }));

  it ('onButtonClick for Organisation type should emit standard data when upon double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('test', 'Organisation');
    service.field.subscribe(data => {
      expect(data['university_name']).toEqual([]);
    });
    component.onButtonClick('test', 'Organisation');
  }));

  it ('onButtonClick for Protocol Year type should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['protocol_date']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Protocol Year');
  }));

  it ('onButtonClick for Protocol Year type should emit standard data when upon double click',
    inject([AggregationService], (service: AggregationService) => {
    component.onButtonClick('test', 'Protocol Year');
    service.field.subscribe(data => {
      expect(data['protocol_date']).toEqual([]);
    });
    component.onButtonClick('test', 'Protocol Year');
  }));

  it ('onButtonClick for Protocol type type should emit standard data when upon single click',
    inject([AggregationService], (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['protocol_type']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Protocol type');
  }));

  it ('onButtonClick for Protocol type type should emit standard data when upon double click',
    inject([AggregationService], (service: AggregationService) => {
    component.onButtonClick('test', 'Protocol type');
    service.field.subscribe(data => {
      expect(data['protocol_type']).toEqual([]);
    });
    component.onButtonClick('test', 'Protocol type');
  }));

  it ('onButtonClick for Protocol type should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['name']).toEqual(['experimentalProtocol']);
    });
    component.onButtonClick('Experimental protocol', 'Protocol');
  }));

  it ('onButtonClick for Protocol type should emit standard data when upon double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('Experimental protocol', 'Protocol');
    service.field.subscribe(data => {
      expect(data['name']).toEqual([]);
    });
    component.onButtonClick('Experimental protocol', 'Protocol');
  }));

  it ('onButtonClick for Experiment target type should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['experimentTarget']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Experiment target');
  }));

  it ('onButtonClick for Experiment target type should emit standard data when upon double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('test', 'Experiment target');
    service.field.subscribe(data => {
      expect(data['experimentTarget']).toEqual([]);
    });
    component.onButtonClick('test', 'Experiment target');
  }));

  it ('onButtonClick for Paper published type should emit standard data when upon single click',
    inject([AggregationService], (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['paper_published']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Paper published');
  }));

  it ('onButtonClick for Paper published type should emit standard data when upon double click',
    inject([AggregationService], (service: AggregationService) => {
    component.onButtonClick('test', 'Paper published');
    service.field.subscribe(data => {
      expect(data['paper_published']).toEqual([]);
    });
    component.onButtonClick('test', 'Paper published');
  }));

  it ('onButtonClick for Journal type should emit standard data when upon single click',
    inject([AggregationService], (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['journal']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Journal');
  }));

  it ('onButtonClick for Journal type should emit standard data when upon double click',
    inject([AggregationService], (service: AggregationService) => {
    component.onButtonClick('test', 'Journal');
    service.field.subscribe(data => {
      expect(data['journal']).toEqual([]);
    });
    component.onButtonClick('test', 'Journal');
  }));

  it ('onButtonClick for Year type should emit standard data when upon single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['year']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Year');
  }));

  it ('onButtonClick for Year type should emit standard data when upon double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('test', 'Year');
    service.field.subscribe(data => {
      expect(data['year']).toEqual([]);
    });
    component.onButtonClick('test', 'Year');
  }));

  it ('onButtonClick for Dataset type single click', inject([AggregationService],
    (service: AggregationService) => {
    service.field.subscribe(data => {
      expect(data['datasetSource']).toEqual(['test']);
    });
    component.onButtonClick('test', 'Dataset source');
  }));

  it ('onButtonClick for Dataset source type double click', inject([AggregationService],
    (service: AggregationService) => {
    component.onButtonClick('test', 'Dataset source');
    service.field.subscribe(data => {
      expect(data['datasetSource']).toEqual([]);
    });
    component.onButtonClick('test', 'Dataset source');
  }));

  it ('should get Standard aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Standard';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testStandard', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Study aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Study';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testStudy', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Dataset aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Dataset';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testDataset', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Species aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Species';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testSpecies', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Assay type aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Assay type';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testAssayType', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Analysis type aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Analysis type';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testAnanlysisType', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Instrument aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Instrument';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testInstrument', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Sex aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Sex';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testSex', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Organism aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Organism';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testOrganism', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Breed aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Breed';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testBreed', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Material aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Material';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testMaterial', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Organism part/Cell type aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Organism part/Cell type';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testCellType', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Archive aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Archive';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testArchive', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Protocol Name aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Protocol Name';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testProtocolName', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Organisation aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Organisation';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testUniversity', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Protocol Year aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Protocol Year';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testProtocolDate', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Protocol type aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Protocol type';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testProtocolType', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Protocol aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Protocol';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testProtocolType', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Experiment target aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Experiment target';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testExperiment', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Target aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Target';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testTarget', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Paper published aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Paper published';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testPaper', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Journal aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Journal';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testJournal', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Year aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Year';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testYear', 1]);
    });
    service.data.next(test_agg);
  }));

  it ('should get Dataset source aggregation', inject([AggregationService], (service: AggregationService) => {
    component.title = 'Dataset source';
    service.data.subscribe(() => {
      expect(component.aggregation).toEqual(['testDataset', 1]);
    });
    service.data.next(test_agg);
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
