import { Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-table-client-side',
  templateUrl: './table-client-side.component.html',
  styleUrls: ['./table-client-side.component.css']
})
export class TableClientSideComponent implements OnInit {
  @Input() display_fields: Array<string>; // list of fields to be displayed in the table
  @Input() column_names: Array<string>; // list of column headers for the selected fields
  @Input() data: Array<any>; // Array data to be populated in the table
  @Input() filter_values: Observable<Object>; // filter values in the format { col1: [val1, val2..], col2: [val1, val2...], ... }
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.data); 
    this.dataSource.paginator = this.paginator; 
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();
  }

  // apply filter when component input "filter_values" is changed
  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.filter = JSON.stringify(this.filter_values);
    }
  }

  // custom filter function to override angular material tables default filter behaviour
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].length > 0) {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }
      if (isFilterSet) {
        for (const col in searchTerms) {
          if (searchTerms[col].indexOf(data[col]) == -1) {
            return false;
          }
        }
        return true;
      } else {
        return true;
      }
    }
    return filterFunction;
  }
}

