import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Subscription} from 'rxjs/internal/Subscription';
import {ApiDataService} from '../services/api-data.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AggregationService} from '../services/aggregation.service';
import {ExportService} from '../services/export.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-protocol-sample',
  templateUrl: './protocol-sample.component.html',
  styleUrls: ['./protocol-sample.component.css']
})
export class ProtocolSampleComponent implements OnInit, OnDestroy {
  protocolList: Observable<any[]>;
  protocolListSubscription: Subscription;
  aggrSubscription: Subscription;
  exportSubscription: Subscription;
  columnNames: string[] = ['Protocol name', 'Organisation', 'Year of protocol'];
  exportNames: string[] = ['Organisation', 'Protocol Year', 'Protocol name'];
  filter_field: {};
  downloadData = false;

  optionsCsv;
  optionsTabular;
  data = {};

  // Local variable for pagination
  p = 1;
  error: string;

  constructor(private dataService: ApiDataService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private aggregationService: AggregationService,
              private exportService: ExportService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG protocols');
    this.spinner.show();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.resetFilter();
      const filters = {};
      for (const key in params) {
        if (Array.isArray(params[key])) {
          filters[key] = params[key];
          for (const value of params[key]) {
            this.aggregationService.current_active_filters.push(value);
            this.aggregationService.active_filters[key].push(value);
          }
        } else {
          filters[key] = [params[key]];
          this.aggregationService.current_active_filters.push(params[key]);
          this.aggregationService.active_filters[key].push(params[key]);
        }
      }
      this.aggregationService.field.next(this.aggregationService.active_filters);
      this.filter_field = filters;
    });
    this.optionsCsv = this.exportService.optionsCsv;
    this.optionsTabular = this.exportService.optionsTabular;
    this.optionsCsv['headers'] = this.exportNames;
    this.optionsTabular['headers'] = this.exportNames;
    this.protocolList = this.dataService.getAllSamplesProtocols();
    this.spinner.hide();
    this.protocolListSubscription = this.protocolList.subscribe( data => {
      this.aggregationService.getAggregations(data, 'protocol');
    });
    this.aggrSubscription = this.aggregationService.field.subscribe((data) => {
      const params = {};
      for (const key of Object.keys(data)) {
        if (data[key].length !== 0) {
          params[key] = data[key];
        }
      }
      this.router.navigate(['protocol', 'samples'], {queryParams: params});
    });
    this.exportSubscription = this.exportService.data.subscribe((data) => {
      this.data = data;
    });
  }

  hasActiveFilters() {
    if (typeof this.filter_field === 'undefined') {
      return false;
    }
    for (const key of Object.keys(this.filter_field)) {
      if (this.filter_field[key].length !== 0) {
        return true;
      }
    }
    return false;
  }

  resetFilter() {
    for (const key of Object.keys(this.aggregationService.active_filters)) {
      this.aggregationService.active_filters[key] = [];
    }
    this.aggregationService.current_active_filters = [];
    this.filter_field = {};
  }

  removeFilter() {
    this.resetFilter();
    this.router.navigate(['protocol', 'samples'], {queryParams: {}});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  onUploadProtocolClick() {
    this.router.navigate(['upload_protocol']);
  }

  ngOnDestroy() {
    if (typeof this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.protocolListSubscription.unsubscribe();
    this.aggrSubscription.unsubscribe();
    this.exportSubscription.unsubscribe();
  }

}
