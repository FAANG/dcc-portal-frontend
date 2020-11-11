import { Component, Input, Output, AfterViewInit, ViewChild, EventEmitter} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, merge, of as observableOf } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-table-server-side',
  templateUrl: './table-server-side.component.html',
  styleUrls: ['./table-server-side.component.css']
})

export class TableServerSideComponent implements AfterViewInit {
  @Input() display_fields: Array<string>; // list of fields to be displayed in the table
  @Input() column_names: Array<string>; // list of column headers for the selected fields
  @Input() templates: Object; // column templates
  @Input() filter_values: Observable<Object>; // filter values in the format { col1: [val1, val2..], col2: [val1, val2...], ... }
  @Input() apiFunction: Function; // function that queries the API endpoints
  @Input() query: Object;
  @Output() dataUpdate = new EventEmitter<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource();
  totalHits = 0;

  constructor() { }

  ngAfterViewInit() {
    // Reset back to the first page when sort order is changed
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          if(this.sort.active && this.sort.direction) {
            this.query['sort'] = [this.sort.active, this.sort.direction];
          } else {
            this.query['sort'] = ['id_number', 'desc'];
          }
          this.query['from_'] = this.paginator.pageIndex * this.paginator.pageSize;
          return this.apiFunction(
            this.query, 25);
        }),
        map(data => {
          return data;
        }),
        catchError(() => {
          return observableOf([]);
        })
      ).subscribe((res: any) => {
          this.dataSource.data = res.data; // set table data
          this.dataUpdate.emit(res); // emit data update event
          this.totalHits = res.totalHits; // set length of paginator
        });
  }

    // apply filter when component input "filter_values" is changed
    ngOnChanges() {
      if (this.dataSource) {
        // reset query params before applying filter
        this.paginator.pageIndex = 0;
        this.query['sort'] = ['id_number', 'desc'];
        this.query['from_'] = 0;
        this.apiFunction(this.query, 25).subscribe((res: any) => {
          this.dataSource.data = res.data; // set table data
          this.dataUpdate.emit(res); // emit data update event
          this.totalHits = res.totalHits; // set length of paginator
        });
      }
    }
  
}

