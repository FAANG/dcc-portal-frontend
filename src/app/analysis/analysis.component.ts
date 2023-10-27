import {Component, OnDestroy, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {ApiDataService} from '../services/api-data.service';
import {AggregationService} from '../services/aggregation.service';
import {Observable, Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {AnalysisTable} from '../shared/interfaces';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TableServerSideComponent}  from '../shared/table-server-side/table-server-side.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/internal/operators/finalize';
import { SubscriptionDialogComponent } from '../shared/subscription-dialog/subscription-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit, OnDestroy {
  @ViewChild('accessionTemplate', { static: true }) accessionTemplate: TemplateRef<any>;
  @ViewChild('assayTypeTemplate', { static: true }) assayTypeTemplate: TemplateRef<any>;
  @ViewChild(TableServerSideComponent, { static: true }) tableServerComponent: TableServerSideComponent;
  public loadTableDataFunction: Function;
  columnNames: string[] = ['Analysis accession', 'Dataset', 'Title', 'Species', 'Assay type', 'Analysis type', 'Standard', 'Subscribe'];
  displayFields: string[] = ['accession', 'datasetAccession', 'title', 'species', 'assayType', 'analysisType', 'standard', 'subscribe'];
  filter_field: {};
  templates: Object;
  aggrSubscription: Subscription;
  downloadData = false;
  downloading = false;
  data = {};
  subscriptionDialogTitle: string;
  subscriber = { email: '', title: '', indexName: '', indexKey: ''};
  dialogRef: any;
  dialogInfoRef: any;
  indexDetails: {};

  query = {
    'sort': ['accession', 'desc'],
    '_source': [
      'accession',
      'datasetAccession',
      'title',
      'organism.text',
      'assayType',
      'analysisType',
      'standardMet'],
    'search': ''
  };

  downloadQuery = {
    'sort': ['accession','desc'],
    '_source': [
      '_source.accession',
      '_source.datasetAccession',
      '_source.title',
      '_source.organism.text',
      '_source.assayType',
      '_source.analysisType',
      '_source.standardMet'],
    'columns': this.columnNames,
    'filters': {},
    'file_format': 'csv',
  };

  defaultSort = ['accession','desc'];
  error: string;
  subscriptionDialog: MatDialogRef<SubscriptionDialogComponent>;


  constructor(private dataService: ApiDataService,
              private activatedRoute: ActivatedRoute,
              private dialogModel: MatDialog,
              private router: Router,
              private aggregationService: AggregationService,
              private titleService: Title) { }


  ngOnInit() {
    this.indexDetails = {index: 'analysis', indexKey: 'accession', apiKey: 'accession'}
    this.templates = {'accession': this.accessionTemplate, 'assayType': this.assayTypeTemplate};
    this.loadTableDataFunction = this.dataService.getAllAnalyses.bind(this.dataService);
    this.titleService.setTitle('FAANG analyses');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.resetFilter();
      this.loadInitialPageState(params);
    });

    this.tableServerComponent.dataUpdate.subscribe((data) => {
      this.aggregationService.getAggregations(data.aggregations, 'analysis');
    });
    this.tableServerComponent.sortUpdate.subscribe((sortParams) => {
      this.downloadQuery['sort'] = sortParams;
    });

    this.updateUrlParams();
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
    this.filter_field = Object.assign({}, this.filter_field);
  }

  removeFilter() {
    this.resetFilter();
    this.router.navigate(['analysis'], {queryParams: {}});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  downloadFile(format: string) {
    this.downloadData = !this.downloadData;
    this.downloading = true;
    this.downloadQuery['file_format'] = format;
    let mapping = {
      'accession': 'accession',
      'datasetAccession': 'datasetAccession',
      'title': 'title',
      'species': 'organism.text',
      'assayType': 'assayType',
      'analysisType': 'analysisType',
      'standard': 'standardMet'
    }
    this.dataService.downloadRecords('analysis', mapping, this.downloadQuery).subscribe(
      (res:Blob)=>{
        var a = document.createElement("a");
        a.href = URL.createObjectURL(res);
        a.download = 'faang_data.' + format;
        a.click();
        this.downloading = false;
      },
      (err) => {
        this.downloading = false;
      }
    );
  }

  openSubscriptionDialog() {
    // Opening the dialog component
    this.subscriber.title = 'Subscribing to filtered Analysis entries'
    this.subscriber.indexName = this.indexDetails['index'];
    this.subscriber.indexKey = this.indexDetails['indexKey'];
    const subscriptionDialog = this.dialogModel.open(SubscriptionDialogComponent, {
      height: '300px', width: '400px',
      data: this.subscriber
    });
  }

  ngOnDestroy() {
    if (typeof this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
  }

  loadInitialPageState(params){
    console.log("delete", params)
    const filters = {};
    // set up filters on pageLoad based on queryParams
    for (const key in params) {
      if (key !== 'searchTerm' && key !== 'sortTerm' && key !== 'sortDirection' && key !== 'pageIndex'){
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
    }
    this.aggregationService.field.next(this.aggregationService.active_filters);
    this.filter_field = filters;
    this.query['filters'] = filters;
    this.downloadQuery['filters'] = filters;
    // load pre-search and pre-sorting
    if (params['searchTerm']){
      this.query['search'] = params['searchTerm'];
    }
    if (params['sortTerm'] && params['sortDirection']){
      this.query['sort'] = [params['sortTerm'], params['sortDirection']];
    }
  }

  updateUrlParams(){
    // setting urls params based on filters
    this.aggrSubscription = this.aggregationService.field.subscribe((data) => {
      const params = {};
      for (const key of Object.keys(data)) {
        if (data[key] && data[key].length !== 0) {
          params[key] = data[key];
        }
      }
      //update url for search term and sorting
      if (this.query['search']){
        params['searchTerm'] = this.query['search'];
      }
      if (this.query['sort']){
        params['sortTerm'] = this.query['sort'][0]
        params['sortDirection'] = this.query['sort'][1]
      }
      this.router.navigate(['analysis'], {queryParams: params});
    });
  }
}
