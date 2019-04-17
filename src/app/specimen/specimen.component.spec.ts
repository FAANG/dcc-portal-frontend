import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecimenComponent } from './specimen.component';
import {HeaderComponent} from '../shared/header/header.component';
import {FilterComponent} from '../shared/filter/filter.component';
import {ExportComponent} from '../shared/export/export.component';
import {ActiveFilterComponent} from '../shared/active-filter/active-filter.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FilterPipe} from '../pipes/filter.pipe';
import {SortPipe} from '../pipes/sort.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SpecimenComponent', () => {
  let component: SpecimenComponent;
  let fixture: ComponentFixture<SpecimenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpecimenComponent,
        HeaderComponent,
        FilterComponent,
        ExportComponent,
        ActiveFilterComponent,
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
    fixture = TestBed.createComponent(SpecimenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
