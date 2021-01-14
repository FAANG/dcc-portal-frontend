import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TableClientSideComponent } from './table-client-side.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import { of as observableOf } from 'rxjs';

describe('TableClientSideComponent', () => {
  let component: TableClientSideComponent;
  let fixture: ComponentFixture<TableClientSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TableClientSideComponent,
        MatPaginator,
        MatSort
      ],
      imports: [
        MatTableModule,
        MatTooltipModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableClientSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter records by paperPublished values', () => {
    const records = [
      {id: 'rec1', paperPublished: 'true'},
      {id: 'rec2', paperPublished: 'false'},
      {id: 'rec3'},
    ]
    var dataSource = new MatTableDataSource<any>(records);
    dataSource.filterPredicate = component.createFilter();
    dataSource.filter = JSON.stringify({paperPublished: ['true']});
    expect(dataSource.filteredData.length).toEqual(1);
    dataSource.filter = JSON.stringify({paperPublished: ['false']});
    expect(dataSource.filteredData.length).toEqual(2);
    dataSource.filter = JSON.stringify({});
    expect(dataSource.filteredData.length).toEqual(3);
    dataSource.filter = JSON.stringify({paperPublished: []});
    expect(dataSource.filteredData.length).toEqual(3);
  });

  it('should filter records by assayType values', () => {
    const records = [
      {id: 'rec1', assayType: 'RNA-Seq'},
      {id: 'rec2', assayType: 'transcription profiling by high throughput sequencing'},
      {id: 'rec3', assayType: 'whole genome sequencing assay'},
      {id: 'rec4', assayType: 'RNA-Seq,whole genome sequencing assay'},
      {id: 'rec5', assayType: 'whole genome sequencing assay,RNA-Seq'},
      {id: 'rec6', assayType: 'not provided'},
      {id: 'rec7'},
    ]
    var dataSource = new MatTableDataSource<any>(records);
    dataSource.filterPredicate = component.createFilter();
    dataSource.filter = JSON.stringify({assayType: ['RNA-Seq']});
    expect(dataSource.filteredData.length).toEqual(4);
    dataSource.filter = JSON.stringify({assayType: ['not provided']});
    expect(dataSource.filteredData.length).toEqual(2);
    dataSource.filter = JSON.stringify({assayType: ['whole genome sequencing assay']});
    expect(dataSource.filteredData.length).toEqual(3);
    dataSource.filter = JSON.stringify({});
    expect(dataSource.filteredData.length).toEqual(7);
    dataSource.filter = JSON.stringify({assayType: []});
    expect(dataSource.filteredData.length).toEqual(7);
  });

  it('should filter records by species values', () => {
    const records = [
      {id: 'rec1', species: 'Bos taurus'},
      {id: 'rec2', species: 'Bos taurus,Ovis aries'},
      {id: 'rec3'},
    ]
    var dataSource = new MatTableDataSource<any>(records);
    dataSource.filterPredicate = component.createFilter();
    dataSource.filter = JSON.stringify({species: ['Bos taurus']});
    expect(dataSource.filteredData.length).toEqual(2);
    dataSource.filter = JSON.stringify({species: ['Bos taurus','Ovis aries']});
    expect(dataSource.filteredData.length).toEqual(2);
    dataSource.filter = JSON.stringify({species: ['Ovis aries']});
    expect(dataSource.filteredData.length).toEqual(1);
    dataSource.filter = JSON.stringify({species: ['Gallus gallus']});
    expect(dataSource.filteredData.length).toEqual(0);
    dataSource.filter = JSON.stringify({species: ['Ovis aries','Gallus gallus']});
    expect(dataSource.filteredData.length).toEqual(1);
    dataSource.filter = JSON.stringify({});
    expect(dataSource.filteredData.length).toEqual(3);
    dataSource.filter = JSON.stringify({species: []});
    expect(dataSource.filteredData.length).toEqual(3);
  });

  it('should filter records by archive values', () => {
    const records = [
      {id: 'rec1', archive: 'ENA'},
      {id: 'rec2', archive: 'ENA,SRA'},
      {id: 'rec3'},
    ]
    var dataSource = new MatTableDataSource<any>(records);
    dataSource.filterPredicate = component.createFilter();
    dataSource.filter = JSON.stringify({archive: ['ENA']});
    expect(dataSource.filteredData.length).toEqual(2);
    dataSource.filter = JSON.stringify({archive: ['ENA','SRA']});
    expect(dataSource.filteredData.length).toEqual(2);
    dataSource.filter = JSON.stringify({archive: ['SRA']});
    expect(dataSource.filteredData.length).toEqual(1);
    dataSource.filter = JSON.stringify({});
    expect(dataSource.filteredData.length).toEqual(3);
    dataSource.filter = JSON.stringify({archive: []});
    expect(dataSource.filteredData.length).toEqual(3);
  });

  it('should filter records by sex values', () => {
    const records = [
      {id: 'rec1', sex: 'male'},
      {id: 'rec2', sex: 'female'},
      {id: 'rec3', sex: 'not determined'},
      {id: 'rec4'},
      {id: 'rec5', sex: 'Female'},
      {id: 'rec6', sex: 'M'},
    ]
    var dataSource = new MatTableDataSource<any>(records);
    dataSource.filterPredicate = component.createFilter();
    dataSource.filter = JSON.stringify({sex: ['male']});
    expect(dataSource.filteredData.length).toEqual(2);
    dataSource.filter = JSON.stringify({sex: ['female']});
    expect(dataSource.filteredData.length).toEqual(2);
    dataSource.filter = JSON.stringify({sex: ['not determined']});
    expect(dataSource.filteredData.length).toEqual(2);
    dataSource.filter = JSON.stringify({});
    expect(dataSource.filteredData.length).toEqual(6);
    dataSource.filter = JSON.stringify({sex: []});
    expect(dataSource.filteredData.length).toEqual(6);
  });

  it('should filter records by analysisType, experimentTarget and other values', () => {
    const records = [
      {id: 'rec1', experimentTarget: 'CHEBI_33697', analysisType: 'SEQUENCE_ANNOTATION'},
      {id: 'rec2', experimentTarget: 'polyA RNA', analysisType: 'SEQUENCE_VARIATION'},
      {id: 'rec3', experimentTarget: 'polyA RNA'},
      {id: 'rec4', analysisType: 'SEQUENCE_VARIATION', protocol: 'Extraction protocol'},
    ]
    var dataSource = new MatTableDataSource<any>(records);
    dataSource.filterPredicate = component.createFilter();
    dataSource.filter = JSON.stringify({experimentTarget: ['CHEBI 33697']});
    expect(dataSource.filteredData.length).toEqual(1);
    dataSource.filter = JSON.stringify({experimentTarget: ['polyA RNA']});
    expect(dataSource.filteredData.length).toEqual(2);
    dataSource.filter = JSON.stringify({analysisType: ['SEQUENCE ANNOTATION']});
    expect(dataSource.filteredData.length).toEqual(1);
    dataSource.filter = JSON.stringify({analysisType: ['SEQUENCE VARIATION']});
    expect(dataSource.filteredData.length).toEqual(2);
    dataSource.filter = JSON.stringify({analysisType: ['SEQUENCE VARIATION'], experimentTarget: ['CHEBI 33697']});
    expect(dataSource.filteredData.length).toEqual(0);
    dataSource.filter = JSON.stringify({analysisType: ['SEQUENCE ANNOTATION'], experimentTarget: ['CHEBI 33697']});
    expect(dataSource.filteredData.length).toEqual(1);
    dataSource.filter = JSON.stringify({protocol: ['Extraction protocol']});
    expect(dataSource.filteredData.length).toEqual(1);
    dataSource.filter = JSON.stringify({protocol: ['Library generation protocol']});
    expect(dataSource.filteredData.length).toEqual(0);
  });

  it('should apply filter on table when filter values get updated', () => {
    const records = [
      {id: 'rec1', experimentTarget: 'CHEBI_33697', analysisType: 'SEQUENCE_ANNOTATION'},
      {id: 'rec2', experimentTarget: 'polyA RNA', analysisType: 'SEQUENCE_VARIATION'},
      {id: 'rec3', experimentTarget: 'polyA RNA'},
      {id: 'rec4', analysisType: 'SEQUENCE_VARIATION', protocol: 'Extraction protocol'},
    ]
    component.dataSource = new MatTableDataSource<any>(records);
    component.filter_values = observableOf({experimentTarget: ['CHEBI 33697']});
    component.ngOnChanges();
    expect(component.dataSource.filter.length).toBeGreaterThan(0);
  })

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
