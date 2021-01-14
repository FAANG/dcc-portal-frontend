import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TableServerSideComponent } from './table-server-side.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {of as observableOf} from 'rxjs';
import { ApiDataService } from '../../services/api-data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TableServerSideComponent', () => {
  let component: TableServerSideComponent;
  let fixture: ComponentFixture<TableServerSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TableServerSideComponent,
        MatPaginator,
        MatSort,
       ],
       imports: [
         MatTableModule,
         MatTooltipModule,
         HttpClientTestingModule
       ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableServerSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update query and table data when filters are set', () => {
    const service = TestBed.get(ApiDataService);
    component.apiFunction = service.getAllFiles.bind(service);
    spyOn(component, 'apiFunction').and.returnValue(observableOf({data: [{id: 'testId1'}]}));
    component.query = {
      'filters': {
        'standard': ['FAANG'],
        'paper_published': ['Yes'],
        'assayType': ['RNA-Seq'],
        'sex': ['female']
      },
      'sort': ['name','desc'],
      '_source': [
        'study.accession',
        'experiment.accession',
        'species.text',
        'experiment.assayType',
        'experiment.target',
        'specimen',
        'run.instrument',
        'experiment.standardMet',
        'paperPublished'],
    };
    let expected_query_filter = {
      'standard': ['FAANG'],
      'paper_published': ['true'],
      'assayType': ['transcription profiling by high throughput sequencing', 'RNA-Seq'],
      'sex': ['female', 'female genotypic sex', 'intact female', 'F', 'Female']
    }
    component.filter_values = observableOf({standard: ['FAANG']});
    component.ngOnChanges();

    expect(component.apiFunction).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual([{id: 'testId1'}]);
    expect(component.query['filters']).toEqual(expected_query_filter);
  });

  it('should update sort query when table is sorted', () => {
    component.sort.active = 'id';
    component.sort.direction = 'asc';
    component.query = {
      'filters': {
        'standard': ['FAANG'],
        'paper_published': ['Yes'],
        'assayType': ['RNA-Seq'],
        'sex': ['female']
      },
      'sort': ['name','desc'],
      '_source': [
        'study.accession',
        'experiment.accession',
        'species.text',
        'experiment.assayType',
        'experiment.target',
        'specimen',
        'run.instrument',
        'experiment.standardMet',
        'paperPublished'],
    };
    component.ngAfterViewInit();
    expect(component.query['sort']).toEqual(['id', 'asc']);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
