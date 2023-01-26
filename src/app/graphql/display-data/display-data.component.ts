import {AfterViewInit, Component, Input, OnChanges, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';

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

  dataSource: MatTableDataSource<any>;
  colPrimaryField;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('linkTemplate', { static: true }) linkTemplate: TemplateRef<any>;

  constructor() {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataTable);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.colPrimaryField = `${this.firstIndex}.${this.primaryField}`;
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
    return this.firstIndex === 'file' ? colValue.split('.')[0] : colValue
  }

}
