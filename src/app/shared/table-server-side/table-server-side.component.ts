import { Component, Input, Output, AfterViewInit, ViewChild, EventEmitter} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, merge, of as observableOf } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import {female_values, male_values, published_article_source} from '../constants';

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
  @Input() query: Object; // query params ('sort', 'aggs', 'filters', '_source', 'from_')
  @Input() defaultSort: string[]; // default sort param e.g - ['id': 'desc'];

  @Output() dataUpdate = new EventEmitter<any>();
  @Output() sortUpdate = new EventEmitter<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource();
  totalHits = 0;
  timer: any;
  delaySearch: boolean = true;

  constructor(private spinner: NgxSpinnerService,) { }

  ngAfterViewInit() {
    // Reset back to the first page when sort order is changed
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.spinner.show();
          if(this.sort.active && this.sort.direction) {
            this.query['sort'] = [this.sort.active, this.sort.direction];
            this.sortUpdate.emit(this.query['sort']);
          } else {
            this.query['sort'] = this.defaultSort;
          }
          this.query['from_'] = this.paginator.pageIndex * this.paginator.pageSize;
          return this.apiFunction(
            this.query, 25);
        }),
        map(data => {
          return data;
        }),
        catchError(() => {
          this.spinner.hide();
          return observableOf([]);
        })
      ).subscribe((res: any) => {
          this.dataSource.data = res.data; // set table data
          this.dataUpdate.emit(res); // emit data update event
          this.totalHits = res.totalHits; // set length of paginator
          this.spinner.hide();
        });
  }

    // apply filter when component input "filter_values" is changed
    ngOnChanges() {
      if (this.dataSource) {
        this.spinner.show();
        // reset query params before applying filter
        this.paginator.pageIndex = 0;
        if(this.sort.active && this.sort.direction) {
          this.query['sort'] = [this.sort.active, this.sort.direction];
          this.sortUpdate.emit(this.query['sort']);
        } else {
          this.query['sort'] = this.defaultSort;
        }
        this.sortUpdate.emit(this.query['sort']);
        this.query['from_'] = 0;
        for (const col in this.query['filters']) {
          // process paper_published filter
          if (col === 'paper_published') {
            this.query['filters'][col].forEach((val, i) => {
              val == 'Yes' ? this.query['filters'][col][i] = 'true' : this.query['filters'][col][i] = 'false';
            });
          }
          // process assayType filter
          if (col === 'assayType') {
            this.query['filters'][col].forEach((val, i) => {
              if (val == 'RNA-Seq') {
                this.query['filters'][col][i] = 'transcription profiling by high throughput sequencing';
                this.query['filters'][col].push('RNA-Seq');
              }
            });
          }
          // process sex filter
          if (col == 'sex') {
            let sex_val = [];
            this.query['filters'][col].forEach((val, i) => {
              if (val == 'male') {
                sex_val = sex_val.concat(male_values);
              }
              else if (val == 'female') {
                sex_val = sex_val.concat(female_values);
              }
              else {
                sex_val.push(val);
              }
            });
            this.query['filters'][col] = sex_val;
          }

          // process article source (Article Type) filter
          if (col === 'source') {
            let source_val = [];
            this.query['filters'][col].forEach((val, i) => {
              if (val === 'preprint') {
                source_val = source_val.concat('PPR');
              } else if (val === 'published') {
                source_val = source_val.concat(published_article_source);
              }
              else {
                source_val.push(val);
              }
            });
           this.query['filters'][col] = source_val;
          }


        }
        this.apiFunction(this.query, 25).subscribe((res: any) => {
          this.dataSource.data = res.data; // set table data
          this.dataUpdate.emit(res); // emit data update event
          this.totalHits = res.totalHits; // set length of paginator
          this.spinner.hide();
        });
      }
    }

    searchChanged(event: any){
      const searchFilterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      if (this.delaySearch){
        if (this.timer){
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(this.applySearchFilter.bind(this), 500, searchFilterValue);
      }
      else {
        this.applySearchFilter(searchFilterValue);
      }
    }

    applySearchFilter(value: string) {
      // reset query params before applying search
      this.paginator.pageIndex = 0;
      this.query['from_'] = 0;
      this.query['search'] = value;
      this.spinner.show();
      this.apiFunction(this.query, 25).subscribe((res: any) => {
        this.dataSource.data = res.data; // set table data
        this.dataUpdate.emit(res); // emit data update event
        this.totalHits = res.totalHits; // set length of paginator
        this.spinner.hide();
      });
    }

}
