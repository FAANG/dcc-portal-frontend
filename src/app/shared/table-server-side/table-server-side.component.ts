import { Component, Input, Output, AfterViewInit, ViewChild, EventEmitter, TemplateRef, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, merge, of as observableOf } from 'rxjs';
import { map, startWith, switchMap, catchError, finalize, first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatDialog} from '@angular/material/dialog';
import {female_values, male_values, published_article_source} from '../constants';
import {ApiDataService} from '../../services/api-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {subscription_ws_url} from '../constants';
import {Location} from '@angular/common';


@Component({
  selector: 'app-table-server-side',
  templateUrl: './table-server-side.component.html',
  styleUrls: ['./table-server-side.component.css']
})

export class TableServerSideComponent implements OnInit, AfterViewInit {
  @Input() display_fields: Array<string>; // list of fields to be displayed in the table
  @Input() column_names: Array<string>; // list of column headers for the selected fields
  @Input() templates: Object; // column templates
  @Input() filter_values: Observable<Object>; // filter values in the format { col1: [val1, val2..], col2: [val1, val2...], ... }
  @Input() apiFunction: Function; // function that queries the API endpoints
  @Input() query: Object; // query params ('sort', 'aggs', 'filters', '_source', 'from_')
  @Input() defaultSort: string[]; // default sort param e.g - ['id': 'desc'];
  @Input() indexDetails: Object;

  @Output() dataUpdate = new EventEmitter<any>();
  @Output() sortUpdate = new EventEmitter<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('subscriptionTemplate') subscriptionTemplate = {} as TemplateRef<any>;
  @ViewChild('subscriptionInfoTemplate') subscriptionInfoTemplate = {} as TemplateRef<any>;

  dataSource = new MatTableDataSource();
  totalHits = 0;
  timer: any;
  delaySearch: boolean = true;
  subscriptionDialogTitle: string;
  subscriber = { email: '', filters: {} };
  dialogRef: any;
  dialogSubscriptionInfoRef: any;
  public subscriptionForm: FormGroup;
  socket;
  submission_message: string;
  subscription_status: string;
  apiKey:string;
  currentSearchTerm: string = '';
  queryParams: any = {};
  location: Location;
  urlTree: string;

  constructor(private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private dataService: ApiDataService,
              location: Location) {
    this.location = location;
  }


  ngOnInit() {
    this.subscriptionForm = new FormGroup({
      subscriberEmail: new FormControl('', [Validators.required, Validators.email]),
    });
    // get search term
    this.currentSearchTerm = this.query['search'];

    // extract query parameters
    this.activatedRoute.queryParams.subscribe(params => {
        this.queryParams = {...params};

      });

    if (this.queryParams['sortTerm'] && this.queryParams['sortDirection']){
      // display sort arrow
      this.sort.active = this.queryParams['sortTerm'];
      this.sort.direction = this.queryParams['sortDirection'];
    }
    if (this.queryParams['pageIndex']){
      this.resetPagination(this.queryParams['pageIndex']);
    }
  }

  ngAfterViewInit() {
    if (this.indexDetails){
      this.apiKey = this.indexDetails['apiKey']
      this.setSocket();
    }
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
          this.updateSortingUrlParameters(this.query['sort'][0], this.query['sort'][1]);

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
        this.updateSortingUrlParameters(this.query['sort'][0], this.query['sort'][1]);

        this.sortUpdate.emit(this.query['sort']);
        this.query['from_'] = 0;

        // Update filter value for special cases
        this.updateUrlCodeFilters();

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
      // Update query parameters to pass to route
      this.updateUrlParameters(value, 'searchTerm')
    }


  updateSortingUrlParameters(sortTerm, sortDirection){
    this.updateUrlParameters(sortTerm, 'sortTerm');
    this.updateUrlParameters(sortDirection, 'sortDirection');
  }

  updateUrlParameters(value, parameterName){
    if (value){
      this.queryParams[parameterName] = value;
    } else {
      if (parameterName in this.queryParams){
        delete this.queryParams[parameterName];
      }
    }
    // will not reload the page, but will update query params
    this.router.navigate([],
      {
        relativeTo: this.activatedRoute,
        queryParams: this.queryParams,
      });
  }

  openSubscriptionDialog(value: string) {
    this.subscriptionDialogTitle = `Subscribing to record ${value}`
    this.subscriber.filters[this.indexDetails['indexKey']] = [value];
    this.dialogRef = this.dialog.open(this.subscriptionTemplate,
      { data: this.subscriber, height: '260px', width: '400px' });
  }

  onCancelDialog(dialogType) {
    if (dialogType === 'info'){
      this.dialogSubscriptionInfoRef.close();
    }else{
      this.dialogRef.close();
    }
  }

  public displayError = (controlName: string, errorName: string) =>{
    return this.subscriptionForm.controls[controlName].hasError(errorName);
  }

  getEmail(event: Event){
    this.subscriber.email = (<HTMLInputElement>event.target).value;
  }

  onRegister(data) {
    if (this.subscriptionForm.valid && this.subscriptionForm.touched){
      this.dataService.subscribeUser(this.indexDetails['index'], this.indexDetails['indexKey'], data.email, data.filters).subscribe(response => {
          this.dialogRef.close();
        },
        error => {
          console.log(error);
          this.dialogRef.close();
        }
      );
    }
  }

  setSocket() {
    const url = `${subscription_ws_url}submission/subscription_${this.indexDetails['index']}/`;

    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      console.log('WebSockets connection created.');
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)['response'];

      if (data['submission_message']) {
        if (this.dialogRef) {
          this.dialogRef.close();
          this.dialogRef.afterClosed().pipe(
            finalize(() => this.dialogRef = undefined)
          );
        }
        this.submission_message = data['submission_message'];
        this.subscription_status = data['subscription_status'];
        if (this.subscription_status){
          this.dialogSubscriptionInfoRef = this.dialog.open(this.subscriptionInfoTemplate,
            { data: this.subscriber, height: '250px', width: '600px' });
        }
      }
    };
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }

  resetPagination(pageIndex) {
    if (pageIndex != 0) {
      this.queryParams['pageIndex'] = pageIndex;
      this.paginator.pageIndex = pageIndex;
      // emit an event so that the table will refresh the data
      this.paginator.page.next({
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
    }
  }


  updateUrlCodeFilters() {
    for (const param in this.query['filters']) {
      if (Array.isArray(this.query['filters'][param])) {
        let filters_arr = [];
        this.query['filters'][param].forEach((val, i) => {
          const filterValue = this.getFilterCodeValue(param, val);
          if (filterValue) {
            filters_arr = filters_arr.concat(filterValue);
          }
        });
        this.query['filters'][param] = filters_arr;
      }
    }
  }


  getFilterDisplayValue(paramName, filterVal){
    const specialFilters = {
      paper_published: [{filterValue: ['true'], displayValue: 'Yes'}, {filterValue: ['false'], displayValue: 'No'}],
      sex:[{filterValue: male_values, displayValue: 'male'}, {filterValue: female_values, displayValue: 'female'}],
      source:[{filterValue: ['PPR'], displayValue: 'preprint'}, {filterValue: published_article_source, displayValue: 'published'}],
      assayType: [{filterValue: ['transcription profiling by high throughput sequencing'], displayValue: 'RNA-Seq'}]
    }
    if (paramName in specialFilters){
      const matchedFiltersArr = specialFilters[paramName].filter(obj => obj['filterValue'] == filterVal);
      if (matchedFiltersArr.length > 0){
        return matchedFiltersArr[0]['displayValue']
      }
    }
    return [filterVal]
  }

  getFilterCodeValue(paramName, displayVal){
    const specialFilters = {
      paper_published: [{filterValue: ['true'], displayValue: 'Yes'}, {filterValue: ['false'], displayValue: 'No'}],
      sex:[{filterValue: male_values, displayValue: 'male'}, {filterValue: female_values, displayValue: 'female'}],
      source:[{filterValue: ['PPR'], displayValue: 'preprint'}, {filterValue: published_article_source, displayValue: 'published'}],
      assayType: [{filterValue: ['transcription profiling by high throughput sequencing'], displayValue: 'RNA-Seq'}]
    }
    if (paramName in specialFilters){
      const matchedFiltersArr = specialFilters[paramName].filter(obj => obj['displayValue'] == displayVal);
      if (matchedFiltersArr.length > 0){
        return matchedFiltersArr[0]['filterValue']
      }
    }
    return [displayVal]
  }

  onPageChange($event) {
    const params = {
      pageIndex: this.paginator.pageIndex,
    };
    this.urlTree = this.router.createUrlTree([], {
      relativeTo: this.activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge',
    }).toString();

    //Update route with Query Params
    this.location.go(this.urlTree);
  }

}
