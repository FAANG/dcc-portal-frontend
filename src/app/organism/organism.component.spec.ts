import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OrganismComponent } from './organism.component';
import {HeaderComponent} from '../shared/header/header.component';
import {ActiveFilterComponent} from '../shared/active-filter/active-filter.component';
import {FilterComponent} from '../shared/filter/filter.component';
import {ExportComponent} from '../shared/export/export.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FilterPipe} from '../pipes/filter.pipe';
import {SortPipe} from '../pipes/sort.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router, ActivatedRoute} from '@angular/router';
import { ApiDataService } from '../services/api-data.service';
import { AggregationService } from '../services/aggregation.service';
import {of as observableOf} from 'rxjs';

describe('OrganismComponent', () => {
  let component: OrganismComponent;
  let fixture: ComponentFixture<OrganismComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrganismComponent,
        HeaderComponent,
        ActiveFilterComponent,
        FilterComponent,
        ExportComponent,
        FilterPipe,
        SortPipe
      ],
      imports: [
        NgxPaginationModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hasActiveFilters should return false if filter_field is empty', () => {
    expect(component.hasActiveFilters()).toEqual(false);
  });

  it('hasActiveFilters should return true if filter_field has data', () => {
    component.filter_field = {
      standard: ['FAANG']
    };
    expect(component.hasActiveFilters()).toEqual(true);
  });

  it('hasActiveFilters should return false if filter_field is undefined', () => {
    var filter;
    component.filter_field = filter;
    expect(component.hasActiveFilters()).toEqual(false);
  });

  it('hasActiveFilters should return false if filter_field is not set', () => {
    component.filter_field = {
      standard: []
    };
    expect(component.hasActiveFilters()).toEqual(false);
  });

  it('resetFilter should reset all filters in filter_field', () => {
    component.filter_field = {
      standard: ['FAANG']
    };
    component.resetFilter();
    expect(component.filter_field).toEqual({});
  });

  it('wasPublished should return true if published equals to string with true', () => {
    expect(component.wasPublished('true')).toEqual(true);
  });

  it('wasPublished should return false if published equals to string with false', () => {
    expect(component.wasPublished('false')).toEqual(false);
  });

  it('isGreen should return green if article was published for this record', () => {
    expect(component.isGreen('true')).toEqual('green');
  });

  it('isGreen should return default if article was not published for this record', () => {
    expect(component.isGreen('false')).toEqual('default');
  });

  it('onDownloadData should change value of downloadData', () => {
    expect(component.downloadData).toEqual(false);
    component.onDownloadData();
    expect(component.downloadData).toEqual(true);
    component.onDownloadData();
    expect(component.downloadData).toEqual(false);
  });

  it('removeFilter should reset all filters and remove queryParams', inject([Router], (router: Router) => {
    spyOn(router, 'navigate').and.stub();
    component.filter_field = {
      standard: ['FAANG']
    };
    component.removeFilter();
    expect(component.filter_field).toEqual({});
    expect(router.navigate).toHaveBeenCalledWith(['organism'], Object({queryParams: Object({ })}));
  }));

  it('get table data and aggregations when component loads', () => {
    const service = TestBed.get(ApiDataService);
    const aggService = TestBed.get(AggregationService);
    spyOn(service, 'getAllOrganisms').and.returnValue(observableOf([{id: 'testId1'}, {id: 'testId2'}]));
    spyOn(aggService, 'getAggregations');
    component.ngOnInit();
    expect(service.getAllOrganisms).toHaveBeenCalled();
    expect(aggService.getAggregations).toHaveBeenCalledWith([{id: 'testId1'}, {id: 'testId2'}], 'organism');
  });

  it('get aggregations and set filters from url params', () => {
    const activatedRoute = TestBed.get(ActivatedRoute);
    const aggService = TestBed.get(AggregationService);
    let params = {
      standard: 'FAANG', 
      organism: ['Sus scrofa', 'Gallus gallus'],
      paper_published: 'Yes'
    }
    activatedRoute.queryParams.next(params);
    let active_filters = {};
    for (var key in aggService.active_filters) {
      if (aggService.active_filters[key].length > 0) {
        active_filters[key] = aggService.active_filters[key];
      }
    }
    expect(active_filters).toEqual({standard: ['FAANG'], organism: ['Sus scrofa', 'Gallus gallus'], paper_published: ['Yes']});
    expect(component.filter_field).toEqual({standard: ['FAANG'], organism: ['Sus scrofa', 'Gallus gallus'], paperPublished: ['true']});
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
