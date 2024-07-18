import {Component, Input, OnChanges, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow,
  MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {indexFieldsData} from '../graphqlConstants';
import { ShortenTitlePipe } from './shorten-title.pipe';
import { RouterLink } from '@angular/router';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { NgStyle, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css'],
  standalone: true,
  imports: [NgStyle, ExtendedModule, MatFormField, MatLabel, MatInput, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell,
    MatSortHeader, MatCellDef, MatCell, RouterLink, NgTemplateOutlet, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator,
    ShortenTitlePipe]
})
export class DisplayDataComponent implements OnInit, OnChanges {
  @Input() dataTable: any;
  @Input() displayedColumns: any;
  @Input() colLinks: any;
  @Input() primaryField: any;
  @Input() firstIndex: any;

  indexData = {};
  dataSource!: MatTableDataSource<any>;
  colPrimaryField: any;
  timer: any;
  delaySearch = true;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('linkTemplate', { static: true }) linkTemplate!: TemplateRef<any>;

  constructor() {
  }

  ngOnInit(): void {
    this.indexData = indexFieldsData;
    this.dataSource = new MatTableDataSource(this.dataTable);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.colPrimaryField = `${this.firstIndex}.${this.primaryField}`;
    this.displayedColumns = this.updateDisplayedColumnsArr(this.displayedColumns);
  }


  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.data = this.dataTable;
    }
  }

  extractNumEntries(str: any) {
    const pattern = /^\[numEntries:\s\d*\]/;
    if (pattern.test(str)) {
      const match = str.match(pattern)[0].match(/\d+/)[0];
      return parseInt(match, 10);
    }
    return null;
  }

  numEntriesGreaterThan10(val: any) {
    const numEntries = this.extractNumEntries(val);
    if (numEntries) {
      return numEntries > 10;
    }
    return false;
  }

  removeNumEntries(str: any) {
    if (str) {
      const pattern = /^\[numEntries:\s\d*\]/;
      if (pattern.test(str)) {
        return str.replace(pattern, '');
      }
      return str;
    }
  }

  getUrlAccession(colValue: string) {
    return this.firstIndex === 'file' ? colValue.split('.')[0] : colValue;
  }

  isOntologyTerm(colName: string, indexName: string | number) {
    if (this.indexData[indexName]['ontologyTermsLink']) {
      return colName in this.indexData[indexName]['ontologyTermsLink'];
    }
    return false;
  }

  getOntologyTermsLink(colName: string | number, indexName: string | number) {
    return this.indexData[indexName]['ontologyTermsLink'][colName];
  }

  updateDisplayedColumnsArr(displayedColumns: any) {
    const filteredColumnsArr = [...displayedColumns];
    for (const col of filteredColumnsArr) {
      const indexName = col.split('.')[0];
      if (this.indexData[indexName]['ontologyTermsLink'] && col in this.indexData[indexName]['ontologyTermsLink']) {
        const index = filteredColumnsArr.indexOf(this.indexData[indexName]['ontologyTermsLink'][col]);
        if (index !== -1) {
          filteredColumnsArr.splice(index, 1);
        }
      }
    }
    return filteredColumnsArr;
  }

  searchChanged(event: any) {
    const searchFilterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.delaySearch) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(this.applySearchFilter.bind(this), 500, searchFilterValue);
    } else {
      this.applySearchFilter(searchFilterValue);
    }
  }

  applySearchFilter(val: string) {
    this.dataSource.filter = val;
  }

}
