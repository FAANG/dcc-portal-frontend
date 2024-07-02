import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import {AggregationService} from '../../services/aggregation.service';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [FilterComponent],
    providers: [AggregationService]
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

  it ('onButtonClick for Dataset source type single click', inject([AggregationService],
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
});
