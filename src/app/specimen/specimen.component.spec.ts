import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpecimenComponent } from './specimen.component';
import {HeaderComponent} from '../shared/header/header.component';
import {FilterComponent} from '../shared/filter/filter.component';
import {ExportComponent} from '../shared/export/export.component';
import {ActiveFilterComponent} from '../shared/active-filter/active-filter.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FilterPipe} from '../pipes/filter.pipe';
import {SortPipe} from '../pipes/sort.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SpecimenComponent', () => {
  let component: SpecimenComponent;
  let fixture: ComponentFixture<SpecimenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [NgxPaginationModule,
        RouterTestingModule, HeaderComponent,
        FilterComponent,
        ExportComponent,
        ActiveFilterComponent,
        FilterPipe,
        SortPipe, SpecimenComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecimenComponent);
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
    component.selectedColumn = 'BioSample ID';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('idNumber');

    component.selectedColumn = 'Material';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('material');

    component.selectedColumn = 'Organism part/Cell type';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('organismpart_celltype');

    component.selectedColumn = 'Sex';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('sex');

    component.selectedColumn = 'Organism';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('organism');

    component.selectedColumn = 'Breed';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('breed');

    component.selectedColumn = 'Standard';
    component.selectColumn();
    expect(component.sort_field['id']).toEqual('standard');
  });

  it('chooseClass should assign right values for spanClass and sort_field', () => {
    component.selectedColumn = 'BioSample ID';
    component.chooseClass('expand_more');
    expect(component.spanClass).toEqual('expand_less');
    expect(component.sort_field['direction']).toEqual('asc');

    component.chooseClass('expand_less');
    expect(component.spanClass).toEqual('expand_more');
    expect(component.sort_field['direction']).toEqual('desc');

    component.selectedColumn = 'Material';
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
