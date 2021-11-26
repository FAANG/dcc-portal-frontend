import { Component, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material';
import { QueryService } from '../services/query.service';
import { Observable, merge, of as observableOf } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-query-language',
  templateUrl: './query-language.component.html',
  styleUrls: ['./query-language.component.css']
})
export class QueryLanguageComponent implements AfterViewInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  columnNames: string[];
  fields: string[];
  tableData: any[];
  templates: Object;
  filter_field: {};
  indices = new FormControl();
  indicesList = ['file', 'organism', 'specimen', 'dataset', 'article', 'analysis', 
    'experiment', 'protocol_files', 'protocol_samples', 'protocol_analysis'];
  selectedIndices: Observable<any[]>;
  selectedColumns = {};
  columnsByIndex;
  loading: boolean;
  col_width;
  pageSize = 10;
  from = 0;
  totalHits: Observable<any>;
  sortFields = '';
  defaultSort: MatSortable = {
    id: '',
    start: 'asc',
    disableClear: true
};

  constructor(
    private queryService: QueryService
  ) { }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.tableData); 
    this.templates = {};
    this.columnsByIndex = {};
    this.loading = false;
    this.fields = [];
    this.queryService.getAllColumns().subscribe(
      data => {
        this.columnsByIndex = data;
        
      }
    );
  }

  fetchRecords() {
    this.loading = true;
    // get selected fields and columnNames
    let uniqueSelections = [];
    for (let prop in this.selectedColumns) {
      uniqueSelections = uniqueSelections.concat(this.selectedColumns[prop]);
      uniqueSelections = uniqueSelections.filter((value,pos) => {return uniqueSelections.indexOf(value) == pos;});
    }
    this.columnNames = uniqueSelections;
    this.fields = uniqueSelections;
    // Reset back to the first page when sort order is changed
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          if(this.sort.active && this.sort.direction) {
            this.sortFields = this.sort.active + ':' + this.sort.direction;
          }
          this.from = this.paginator.pageIndex * this.paginator.pageSize;
          return this.queryService.getRecords(this.selectedIndices, this.fields, 
                  this.from, this.sortFields);
        }),
        map(data => {
          return data;
        }),
        catchError(() => {
          this.loading = false;
          return observableOf([]);
        })
      ).subscribe((res: any) => {
          this.tableData = res.data.hits.hits.map( entry => {
            let res = entry['_source'];
            return res;
          });
          console.log(this.tableData);
          this.dataSource.data = this.tableData;
          this.totalHits = res.count; // set length of paginator
          this.loading = false;
        });
  }

  updateDefaults(indices) {
    // reset from, sortFields, fields
    this.from = 0;
    this.sortFields = '';
    this.fields = [];
    this.sort.sort(this.defaultSort);
    // remove selections for indices which are deselected
    for (let index in this.selectedColumns) {
      if (!indices.includes(index)) {
        delete this.selectedColumns[index];
      }
    }
    // if user hasn't selected columns for the index, set defaults
    for (let i=0; i<indices.length; i+=1) {
      let index = indices[i];
      if (!(index in this.selectedColumns)) {
        this.selectedColumns[index] = this.columnsByIndex[index]['defaults'];
      }
    }
    this.fetchRecords();
  }

  displayName(index) {
    index = index.split('_').join(' ');
    index = index.replace(/\b\S/g, t => t.toUpperCase());
    return index;
  }

  downloadCSV() {
    this.queryService.downloadCsv(this.selectedIndices, this.fields, this.sortFields);
  }

}
