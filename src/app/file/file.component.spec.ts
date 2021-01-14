import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FileComponent } from './file.component';
import {HeaderComponent} from '../shared/header/header.component';
import {ActiveFilterComponent} from '../shared/active-filter/active-filter.component';
import {FilterComponent} from '../shared/filter/filter.component';
import {ExportComponent} from '../shared/export/export.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FilterPipe} from '../pipes/filter.pipe';
import {SortPipe} from '../pipes/sort.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TableServerSideComponent}  from '../shared/table-server-side/table-server-side.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatSort } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {Router} from '@angular/router';
import {ApiDataService} from '../services/api-data.service';
import {AggregationService} from '../services/aggregation.service';
import {of as observableOf} from 'rxjs';

describe('FileTableComponent', () => {
  let component: FileComponent;
  let fixture: ComponentFixture<FileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FileComponent,
        HeaderComponent,
        ActiveFilterComponent,
        FilterComponent,
        ExportComponent,
        FilterPipe,
        SortPipe,
        TableServerSideComponent,
        MatPaginator,
        MatSort,
      ],
      imports: [
        NgxPaginationModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatTableModule,
        MatTooltipModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ApiDataService,
        AggregationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileComponent);
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
    expect(router.navigate).toHaveBeenCalledWith(['file'], Object({queryParams: Object({ })}));
  }));

  it('downloadCsvFile should download file in csv format', inject([ApiDataService], (dataService: ApiDataService) => {
    var blob = new Blob(['sample data'], {type:'text/csv'});
    spyOn(dataService, 'downloadFiles').and.returnValue(observableOf(blob));
    const spyObj = jasmine.createSpyObj('a', ['click']);
    spyOn(document, 'createElement').and.returnValue(spyObj);

    component.downloadCsvFile();

    expect(component.downloadQuery.file_format).toEqual('csv');
    expect(dataService.downloadFiles).toHaveBeenCalledWith(component.downloadQuery);
    dataService.downloadFiles(component.downloadQuery).subscribe(() => {
      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(spyObj.download).toBe('faang_data.csv');
      expect(spyObj.click).toHaveBeenCalled();
    })
  }));

  it('downloadTabularFile should download file in txt format', inject([ApiDataService], (dataService: ApiDataService) => {
    var blob = new Blob(['sample data'], {type:'text/plain'});
    spyOn(dataService, 'downloadFiles').and.returnValue(observableOf(blob));
    const spyObj = jasmine.createSpyObj('a', ['click']);
    spyOn(document, 'createElement').and.returnValue(spyObj);

    component.downloadTabularFile();

    expect(component.downloadQuery.file_format).toEqual('txt');
    expect(dataService.downloadFiles).toHaveBeenCalledWith(component.downloadQuery);
    dataService.downloadFiles(component.downloadQuery).subscribe(() => {
      expect(document.createElement).toHaveBeenCalledWith('a');
      expect(spyObj.download).toBe('faang_data.txt');
      expect(spyObj.click).toHaveBeenCalled();
    })
  }));

  it('should navigate to right url when aggregation fields are updated', 
  inject([AggregationService, Router], (service: AggregationService, router: Router) => {
    spyOn(router, 'navigate').and.stub();
    var params = {};
    service.field.next(params);
    service.field.subscribe(() => {
      expect(router.navigate).toHaveBeenCalledWith(['file'], Object({queryParams: Object(params)}));
    })
    params = {standard: ['FAANG']}
    service.field.next(params);
    service.field.subscribe(() => {
      expect(router.navigate).toHaveBeenCalledWith(['file'], Object({queryParams: Object(params)}));
    })
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
