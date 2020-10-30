import { Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-table-client-side',
  templateUrl: './table-client-side.component.html',
  styleUrls: ['./table-client-side.component.css']
})
export class TableClientSideComponent implements OnInit {
  @Input() display_fields: Array<string>;
  @Input() column_names: Array<string>;
  @Input() data: Array<any>;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.data); 
    this.dataSource.paginator = this.paginator; 
    this.dataSource.sort = this.sort;
  }

}

