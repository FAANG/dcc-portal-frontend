import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ArticleComponent } from './article.component';
import {HeaderComponent} from '../shared/header/header.component';
import {ActiveFilterComponent} from '../shared/active-filter/active-filter.component';
import {FilterComponent} from '../shared/filter/filter.component';
import {ExportComponent} from '../shared/export/export.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FilterPipe} from '../pipes/filter.pipe';
import {SortPipe} from '../pipes/sort.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import { ApiDataService } from '../services/api-data.service';
import {ExportService} from '../services/export.service';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ArticleComponent,
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
    fixture = TestBed.createComponent(ArticleComponent);
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
      year: ['2019']
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
      year: ['2019']
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
    expect(router.navigate).toHaveBeenCalledWith(['article'], Object({queryParams: Object({ })}));
  }));

  it('get table data when component loads', () => {
    const service = TestBed.get(ApiDataService);
    spyOn(service, 'getAllArticles').and.callThrough();
    component.ngOnInit();
    expect(service.getAllArticles).toHaveBeenCalled();
  });

  it ('should update export data', inject([ExportService], (service: ExportService) => {
    service.data.next(['true']);
    expect(component.data).toEqual(['true']);
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
