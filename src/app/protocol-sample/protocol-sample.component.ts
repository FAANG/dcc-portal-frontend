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
  selector: 'app-protocol-sample',
  templateUrl: './protocol-sample.component.html',
  styleUrls: ['./protocol-sample.component.css']
})
export class ProtocolSampleComponent implements OnInit, OnDestroy {
  @ViewChild('tabs', { static: true }) tabGroup: MatTabGroup;
  @ViewChild('nameTemplate', { static: true }) nameTemplate: TemplateRef<any>;
  @ViewChild('uniTemplate', { static: true }) uniTemplate: TemplateRef<any>;
  @ViewChild('dateTemplate', { static: true }) dateTemplate: TemplateRef<any>;
  @ViewChild(TableServerSideComponent, { static: true }) tableServerComponent: TableServerSideComponent;
  public loadTableDataFunction: Function;

  columnNames: string[] = ['Protocol name', 'Organisation', 'Year of protocol', 'Subscribe'];
  displayFields: string[] = ['protocol_name', 'university_name', 'protocol_date', 'subscribe'];
  templates: Object;
  filter_field: any;
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
    'sort': ['protocolName', 'asc'],
    '_source': [
      'key',
      'protocolName',
      'universityName',
      'protocolDate'
    ],
    'search': ''
  };

  downloadQuery = {
    'sort': ['protocolName', 'asc'],
    '_source': [
      '_source.protocolName',
      '_source.universityName',
      '_source.protocolDate'
    ],
    'columns': this.columnNames,
    'filters': {},
    'file_format': 'csv',
  };

  defaultSort = ['protocolName', 'asc'];
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
    this.indexDetails = {index: 'protocol_samples', indexKey: 'key', apiKey: 'key'}
    this.tabGroup.selectedIndex = 0;
    this.templates = {
      'protocol_name': this.nameTemplate,
      'university_name': this.uniTemplate,
      'protocol_date': this.dateTemplate
    };
    this.loadTableDataFunction = this.dataService.getAllSamplesProtocols.bind(this.dataService);
    this.titleService.setTitle('FAANG protocols');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.filterStateService.resetFilter();
      this.loadInitialPageState(params);
    });

    this.tableServerComponent.dataUpdate.subscribe((data) => {
      this.aggregationService.getAggregations(data.aggregations, 'protocol');
    });
    this.tableServerComponent.sortUpdate.subscribe((sortParams) => {
      this.downloadQuery['sort'] = sortParams;
    });
    this.aggrSubscription = this.filterStateService.updateUrlParams(this.query, ['protocol', 'samples']);
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
    this.router.navigate(['protocol', 'samples'], {queryParams: {}, replaceUrl: true, skipLocationChange: false});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  downloadFile(format: string) {
    this.downloadData = !this.downloadData;
    this.downloading = true;
    this.downloadQuery['file_format'] = format;
    let mapping = {
      'protocol_name': 'protocolName',
      'university_name': 'universityName',
      'protocol_date': 'protocolDate',
    }
    this.dataService.downloadRecords('protocol_samples', mapping, this.downloadQuery).subscribe((res:Blob)=>{
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
    this.subscriber.title = 'Subscribing to filtered Protocol Samples entries'
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
