import {Component, OnDestroy, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {ApiDataService} from '../services/api-data.service';
import {FilterStateService} from '../services/filter-state.service';
import {AggregationService} from '../services/aggregation.service';
import {Observable, Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TableServerSideComponent}  from '../shared/table-server-side/table-server-side.component';
import {MatTabGroup} from '@angular/material/tabs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/internal/operators/finalize';
import { SubscriptionDialogComponent } from '../shared/subscription-dialog/subscription-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-protocol-experiment',
  templateUrl: './protocol-experiment.component.html',
  styleUrls: ['./protocol-experiment.component.css']
})
export class ProtocolExperimentComponent implements OnInit, OnDestroy {
  @ViewChild('tabs', { static: true }) tabGroup: MatTabGroup;
  @ViewChild('nameTemplate', { static: true }) nameTemplate: TemplateRef<any>;
  @ViewChild('targetTemplate', { static: true }) targetTemplate: TemplateRef<any>;
  @ViewChild('assayTemplate', { static: true }) assayTemplate: TemplateRef<any>;
  @ViewChild(TableServerSideComponent, { static: true }) tableServerComponent: TableServerSideComponent;
  public loadTableDataFunction: Function;
  columnNames: string[] = ['Protocol type', 'Experiment target', 'Assay type', 'Subscribe'];
  displayFields: string[] = ['protocol_type', 'experiment_target', 'assay_type', 'subscribe'];
  templates: Object;
  filter_field: {};
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
    'sort': ['name', 'asc'],
    '_source': [
      'key',
      'name',
      'experimentTarget',
      'assayType'
    ],
    'search': ''
  };

  downloadQuery = {
    'sort': ['name', 'asc'],
    '_source': [
      '_source.name',
      '_source.experimentTarget',
      '_source.assayType'
    ],
    'columns': this.columnNames,
    'filters': {},
    'file_format': 'csv',
  };

  defaultSort = ['name', 'asc'];
  error: string;
  subscriptionDialog: MatDialogRef<SubscriptionDialogComponent>;


  constructor(private dataService: ApiDataService,
              private filterStateService: FilterStateService,
              private activatedRoute: ActivatedRoute,
              private dialogModel: MatDialog,
              private router: Router,
              private aggregationService: AggregationService,
              private titleService: Title) { }

  ngOnInit() {
    this.indexDetails = {index: 'protocol_files', indexKey: 'key', apiKey: 'key'}
    this.tabGroup.selectedIndex = 1;
    this.templates = {
      'protocol_type': this.nameTemplate,
      'experiment_target': this.targetTemplate,
      'assay_type': this.assayTemplate,
    };
    this.loadTableDataFunction = this.dataService.getAllExperimentsProtocols.bind(this.dataService);
    this.titleService.setTitle('FAANG protocols');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.filterStateService.resetFilter();
      this.loadInitialPageState(params);
    });

    this.tableServerComponent.dataUpdate.subscribe((data) => {
      this.aggregationService.getAggregations(data.aggregations, 'protocol_experiments');
    });
    this.tableServerComponent.sortUpdate.subscribe((sortParams) => {
      this.downloadQuery['sort'] = sortParams;
    });
    this.aggrSubscription = this.filterStateService.updateUrlParams(this.query, ['protocol', 'experiments']);
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

  removeFilter() {
    this.filterStateService.resetFilter();
    this.filter_field = {};
    this.router.navigate(['protocol', 'experiments'], {queryParams: {}});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  downloadFile(format: string) {
    this.downloadData = !this.downloadData;
    this.downloading = true;
    this.downloadQuery['file_format'] = format;
    let mapping = {
      'protocol_type': 'name',
      'experiment_target': 'experimentTarget',
      'assay_type': 'assayType',
    }
    this.dataService.downloadRecords('protocol_files', mapping, this.downloadQuery).subscribe((res:Blob)=>{
      var a = document.createElement("a");
      a.href = URL.createObjectURL(res);
      a.download = 'faang_data.' + format;
      a.click();
      this.downloading = false;
    });
  }

  onUploadProtocolClick() {
    this.router.navigate(['upload_protocol']);
  }

  tabClick(tab) {
    if (tab.index == 0) {
      this.router.navigate(['protocol/samples']);
    }
    else if (tab.index == 1) {
      this.router.navigate(['protocol/experiments']);
    }
    else if (tab.index == 2) {
      this.router.navigate(['protocol/analysis']);
    }
  }

  openSubscriptionDialog() {
    // Opening the dialog component
    this.subscriber.title = 'Subscribing to filtered Protocol Experiment entries'
    this.subscriber.indexName = this.indexDetails['index'];
    this.subscriber.indexKey = this.indexDetails['indexKey'];
    const subscriptionDialog = this.dialogModel.open(SubscriptionDialogComponent, {
      height: '300px', width: '400px',
      data: this.subscriber
    });
  }

  ngOnDestroy() {
    if (typeof this.filter_field !== 'undefined') {
      this.filterStateService.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
  }

  loadInitialPageState(params){
    const filters = this.filterStateService.setUpAggregationFilters(params);
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

}
