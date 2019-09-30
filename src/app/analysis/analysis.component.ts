import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnalysisTable, SortParams} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {ApiDataService} from '../services/api-data.service';
import {AggregationService} from '../services/aggregation.service';
import {ExportService} from '../services/export.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs/internal/Observable';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit, OnDestroy {
  analysisListShort: Observable<AnalysisTable[]>;
  analysisListLong: Observable<AnalysisTable[]>;
  columnNames: string[] = ['Analysis accession', 'Dataset', 'Title', 'Species', 'Assay type', 'Analysis type', 'Standard'];

  spanClass = 'expand_more';
  defaultClass = 'unfold_more';
  selectedColumn = 'Analysis accession';
  sort_field: SortParams;
  filter_field = {};
  aggrSubscription: Subscription;
  exportSubscription: Subscription;
  analysisListLongSubscription: Subscription;
  downloadData = false;

  optionsCsv;
  optionsTabular;
  data = {};

  // Local variable for pagination
  p = 1;

  private query = {
    'sort': 'accession:desc',
    '_source': [
      'accession',
      'datasetAccession',
      'title',
      'organism.text',
      'assayType',
      'analysisType',
      'standardMet'],
  };
  error: string;


  constructor(private dataService: ApiDataService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private aggregationService: AggregationService,
              private exportService: ExportService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG analyses');
    this.spinner.show();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const filters = {};
      this.resetFilter();
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
    this.optionsCsv['headers'] = this.columnNames;
    this.optionsTabular['headers'] = this.optionsTabular;
    this.sort_field = {id: 'accession', direction: 'desc'};
    this.spinner.hide();
    this.analysisListLong = this.dataService.getAllAnalyses(this.query, 100000);
    this.analysisListLongSubscription = this.analysisListLong.subscribe((data) => {
      this.aggregationService.getAggregations(data, 'analysis');
    });
    this.aggrSubscription = this.aggregationService.field.subscribe((data: any) => {
      const params = {};
      for (const key in data) {
        if (data[key].length !== 0) {
          params[key] = data[key];
        }
      }
      this.router.navigate(['analysis'], {queryParams: params});
    });
    this.exportSubscription = this.exportService.data.subscribe((data) => {
      this.data = data;
    });
  }

  onTableClick(event: any) {
    let event_class;
    if (event['srcElement']['firstElementChild']) {
      event_class = event['srcElement']['firstElementChild']['innerText'];
    } else {
      event_class = event['srcElement']['innerText'];
    }
    this.selectedColumn = event['srcElement']['id'];
    this.selectColumn();
    this.chooseClass(event_class);
  }

  chooseClass(event_class: string) {
    if (this.selectedColumn === 'Analysis accession') {
      if (event_class === 'expand_more') {
        this.spanClass = 'expand_less';
        this.sort_field['direction'] = 'asc';
      } else {
        this.spanClass = 'expand_more';
        this.sort_field['direction'] = 'desc';
      }
    } else {
      if (event_class === this.defaultClass) {
        this.spanClass = 'expand_more';
        this.sort_field['direction'] = 'desc';
      } else if (event_class === 'expand_more') {
        this.spanClass = 'expand_less';
        this.sort_field['direction'] = 'asc';
      } else {
        this.spanClass = 'unfold_more';
        this.sort_field['direction'] = 'desc';
        this.sort_field['id'] = 'datasetAccession';
        this.selectedColumn = 'Analysis accession';
        this.spanClass = 'expand_more';
      }
    }
  }

  selectColumn() {
    switch (this.selectedColumn) {
      case 'Dataset': {
        this.sort_field['id'] = 'datasetAccession';
        break;
      }
      case 'Title': {
        this.sort_field['id'] = 'title';
        break;
      }
      case 'Species': {
        this.sort_field['id'] = 'species';
        break;
      }
      case 'Analysis accession': {
        this.sort_field['id'] = 'accession';
        break;
      }
      case 'Assay type': {
        this.sort_field['id'] = 'assayType';
        break;
      }
      case 'Analysis type': {
        this.sort_field['id'] = 'analysisType';
        break;
      }
    }
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
    this.router.navigate(['analysis'], {queryParams: {}});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  ngOnDestroy() {
    if (typeof  this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
    this.exportSubscription.unsubscribe();
    this.analysisListLongSubscription.unsubscribe();
  }
}
