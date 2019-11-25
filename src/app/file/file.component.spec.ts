import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
        SortPipe
      ],
      imports: [
        NgxPaginationModule,
        RouterTestingModule,
        HttpClientTestingModule
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

  it('selectColumn should assign right value for sort_field', () => {
    component.selectedColumn = 'File name';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('fileName');

    component.selectedColumn = 'Study';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('study');

    component.selectedColumn = 'Experiment';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('experiment');

    component.selectedColumn = 'Species';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('species');

    component.selectedColumn = 'Assay type';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('assayType');

    component.selectedColumn = 'Specimen';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('specimen');

    component.selectedColumn = 'Instrument';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('instrument');

    component.selectedColumn = 'Standard';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('standard');
  });

  it('chooseClass should assign right values for spanClass and sort_field', () => {
    component.selectedColumn = 'File name';
    component.chooseClass('expand_more');
    expect(component.spanClass).toEqual('expand_less');
    expect(component.sort_field['direction']).toEqual('asc');

    component.chooseClass('expand_less');
    expect(component.spanClass).toEqual('expand_more');
    expect(component.sort_field['direction']).toEqual('desc');

    component.selectedColumn = 'Study';
    component.chooseClass('unfold_more');
    expect(component.spanClass).toEqual('expand_more');
    expect(component.sort_field['direction']).toEqual('desc');

    component.chooseClass('expand_more');
    expect(component.spanClass).toEqual('expand_less');
    expect(component.sort_field['direction']).toEqual('asc');

    component.chooseClass('expand_less');
    expect(component.spanClass).toEqual('expand_more');
    expect(component.sort_field['direction']).toEqual('desc');
  });
});
