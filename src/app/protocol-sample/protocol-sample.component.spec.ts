import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProtocolSampleComponent } from './protocol-sample.component';
import {HeaderComponent} from '../shared/header/header.component';
import {ActiveFilterComponent} from '../shared/active-filter/active-filter.component';
import {FilterComponent} from '../shared/filter/filter.component';
import {ExportComponent} from '../shared/export/export.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxPaginationModule} from 'ngx-pagination';
import {FilterPipe} from '../pipes/filter.pipe';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import { ApiDataService } from '../services/api-data.service';
import {ExportService} from '../services/export.service';
import { AggregationService } from '../services/aggregation.service';
import {Observable, of as observableOf} from 'rxjs';

describe('ProtocolSampleComponent', () => {
  let component: ProtocolSampleComponent;
  let fixture: ComponentFixture<ProtocolSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProtocolSampleComponent,
        HeaderComponent,
        ActiveFilterComponent,
        FilterComponent,
        ExportComponent,
        FilterPipe
      ],
      imports: [
        RouterTestingModule,
        NgxPaginationModule,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolSampleComponent);
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
    expect(router.navigate).toHaveBeenCalledWith(['protocol', 'samples'], Object({queryParams: Object({ })}));
  }));

  it('should navigate on onUploadProtocolClick', inject([Router], (router: Router) => {
    spyOn(router, 'navigate').and.stub();
    component.onUploadProtocolClick();
    expect(router.navigate).toHaveBeenCalledWith(['upload_protocol']);
  }));

  it('get table data when component loads', () => {
    const service = TestBed.get(ApiDataService);
    spyOn(service, 'getAllSamplesProtocols').and.callThrough();
    component.ngOnInit();
    expect(service.getAllSamplesProtocols).toHaveBeenCalled();
  });

  it ('should update export data', inject([ExportService], (service: ExportService) => {
    service.data.next(['true']);
    expect(component.data).toEqual(['true']);
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
