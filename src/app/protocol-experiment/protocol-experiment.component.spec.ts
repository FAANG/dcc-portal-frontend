import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProtocolExperimentComponent } from './protocol-experiment.component';
import {HeaderComponent} from '../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ActiveFilterComponent} from '../shared/active-filter/active-filter.component';
import {FilterComponent} from '../shared/filter/filter.component';
import {ExportComponent} from '../shared/export/export.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FilterPipe} from '../pipes/filter.pipe';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import { ApiDataService } from '../services/api-data.service';
import {ExportService} from '../services/export.service';

describe('ProtocolExperimentComponent', () => {
  let component: ProtocolExperimentComponent;
  let fixture: ComponentFixture<ProtocolExperimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProtocolExperimentComponent,
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
    fixture = TestBed.createComponent(ProtocolExperimentComponent);
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

  it('removeFilter should reset all filters and remove queryParams', inject([Router], (router: Router) => {
    spyOn(router, 'navigate').and.stub();
    component.filter_field = {
      standard: ['FAANG']
    };
    component.removeFilter();
    expect(component.filter_field).toEqual({});
    expect(router.navigate).toHaveBeenCalledWith(['protocol', 'experiments'], Object({queryParams: Object({ })}));
  }));

  it('should navigate on onUploadProtocolClick', inject([Router], (router: Router) => {
    spyOn(router, 'navigate').and.stub();
    component.onUploadProtocolClick();
    expect(router.navigate).toHaveBeenCalledWith(['upload_protocol']);
  }));

  it('onDownloadData should change value of downloadData', () => {
    expect(component.downloadData).toEqual(false);
    component.onDownloadData();
    expect(component.downloadData).toEqual(true);
    component.onDownloadData();
    expect(component.downloadData).toEqual(false);
  });

  it('getHumanName should return human readable name for protocol', () => {
    expect(component.getHumanName('rnaPreparation3AdapterLigationProtocol')).toEqual('Rna preparation 3\' adapter ligation protocol');
  });

  it('get table data when component loads', () => {
    const service = TestBed.get(ApiDataService);
    spyOn(service, 'getAllExperimentsProtocols').and.callThrough();
    component.ngOnInit();
    expect(service.getAllExperimentsProtocols).toHaveBeenCalled();
  });

  it ('should update export data', inject([ExportService], (service: ExportService) => {
    service.data.next(['true']);
    expect(component.data).toEqual(['true']);
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
