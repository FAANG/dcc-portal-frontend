import {Component, Input, OnChanges, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {indexFieldsData} from '../graphqlConstants';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit, OnChanges {
  @Input() dataTable;
  @Input() displayedColumns;
  @Input() colLinks;
  @Input() primaryField;
  @Input() firstIndex;

  indexData = {};
  dataSource: MatTableDataSource<any>;
  colPrimaryField;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('linkTemplate', { static: true }) linkTemplate: TemplateRef<any>;

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

  keyExists(key: any, obj: Object) {
    return key in obj;
  }

  extractNumEntries(str: any) {
    const pattern = /^\[numEntries:\s\d*\]/;
    if (pattern.test(str)) {
      const match = str.match(pattern)[0].match(/\d+/)[0];
      return parseInt(match, 10);
    }
    return null;
  }

  removeNumEntries(str: any) {
    if (str) {
      const pattern = /^\[numEntries:\s\d*\]/;
      return str.replace(pattern, '');
    }
  }

  getUrlAccession(colValue) {
    return this.firstIndex === 'file' ? colValue.split('.')[0] : colValue;
  }

  isOntologyTerm(colName, indexName) {
    if (this.indexData[indexName]['ontologyTermsLink']) {
      return colName in this.indexData[indexName]['ontologyTermsLink'];
    }
    return false;
  }

  getOntologyTermsLink(colName, indexName) {
    return this.indexData[indexName]['ontologyTermsLink'][colName];
  }

  updateDisplayedColumnsArr(displayedColumns) {
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

}
