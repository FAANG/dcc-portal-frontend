import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
