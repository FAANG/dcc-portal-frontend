import { Component, Input, Output, OnInit, ViewChild, EventEmitter} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow,
  MatRowDef, MatRow } from '@angular/material/table';
import {Observable} from 'rxjs';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { NgTemplateOutlet, NgStyle } from '@angular/common';

@Component({
  selector: 'app-table-client-side',
  templateUrl: './table-client-side.component.html',
  styleUrls: ['./table-client-side.component.css'],
  standalone: true,
  imports: [MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, NgTemplateOutlet, MatCellDef, MatCell,
    NgStyle, ExtendedModule, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator]
})
export class TableClientSideComponent implements OnInit {
  @Input() display_fields: Array<string> = []; // list of fields to be displayed in the table
  @Input() column_names: Array<string> = []; // list of column headers for the selected fields
  @Input() public templates: {[index: string]: any} = {}; // column templates
  @Input() data: Array<any> = []; // Array data to be populated in the table
  @Input() page_size = 0; // number of records in a page
  // filter values in the format { col1: [val1, val2..], col2: [val1, val2...], ... }
  @Input() filter_values!: Observable<{[index: string]: any}>;
  @Input() col_width: Array<any> = []; // list of column widths
  @Output() dataUpdate = new EventEmitter<any>();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  pageSize = 0;

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.filter = JSON.stringify(this.filter_values);
    this.pageSize = this.page_size ? this.page_size : 25;
    // if col widths not provided, set equal width for all columns
    if (this.col_width === undefined) {
      this.col_width = [];
      this.column_names.forEach(el => {
        this.col_width.push('calc(100%/' + this.column_names.length + ')');
      });
    }
  }

  // apply filter when component input "filter_values" is changed
  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.data = this.data;
      this.dataSource.filter = JSON.stringify(this.filter_values);
      if (this.filter_values) {
        this.dataUpdate.emit(this.dataSource.filteredData); // emit data update event
      }
    }
  }

  // custom filter function to override angular material tables default filter behaviour
  createFilter() {
    const filterFunction = function (data: any, filter: string): boolean {
      const searchTerms = JSON.parse(filter);
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
          // handling search filter (should behave similar to angular material default filter)
          if (col === 'search') {
            if (!searchTerms['search'][0]) {
              return true;
            }
            for (const column in data) {
              if (data[column]) {
                const colData = data[column].toString().trim().toLowerCase();
                if (colData.search(searchTerms[col][0]) !== -1) {
                  return true;
                }
              }
            }
            return false;
          } else {
            // process filters for comma-separated ontology_type and project values
            if (col === 'ontology_type' || col === 'project') {
              const ontology_type_values = data[col].split(', ');
              let found = false;
              ontology_type_values.forEach((val: any, i: any) => {
                if (searchTerms[col].indexOf(val) >= 0) {
                  found = true;
                }
              });
              if (!found) {
                return false;
              }
            } else {
              if (!data[col] || searchTerms[col].indexOf(data[col]) === -1) {
                return false;
              }
            }
          }
        }
        return true;
      }
      return true;
    };
    return filterFunction;
  }
}

