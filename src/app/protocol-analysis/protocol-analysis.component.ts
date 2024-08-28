import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {ApiDataService} from '../services/api-data.service';
import {FilterStateService} from '../services/filter-state.service';
import {AggregationService} from '../services/aggregation.service';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import {TableServerSideComponent} from '../shared/table-server-side/table-server-side.component';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { SubscriptionDialogComponent } from '../shared/subscription-dialog/subscription-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
import { ActiveFilterComponent } from '../shared/active-filter/active-filter.component';
import { FilterComponent } from '../shared/filter/filter.component';
import { FlexModule } from '@angular/flex-layout/flex';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-protocol-analysis',
  templateUrl: './protocol-analysis.component.html',
  styleUrls: ['./protocol-analysis.component.css'],
  standalone: true,
  imports: [HeaderComponent, MatTabGroup, MatTab, FlexModule, FilterComponent, ActiveFilterComponent, MatButton, MatTooltip, MatIcon,
    MatProgressSpinner, TableServerSideComponent, RouterLink]
})
export class ProtocolAnalysisComponent implements OnInit {
  @ViewChild('tabs', { static: true }) tabGroup!: MatTabGroup;
  @ViewChild('nameTemplate', { static: true }) nameTemplate!: TemplateRef<any>;
  @ViewChild('uniTemplate', { static: true }) uniTemplate!: TemplateRef<any>;
  @ViewChild('dateTemplate', { static: true }) dateTemplate!: TemplateRef<any>;
  @ViewChild(TableServerSideComponent, { static: true }) tableServerComponent!: TableServerSideComponent;
  public loadTableDataFunction!: Function;

  columnNames: string[] = ['Protocol name', 'Organisation', 'Year of protocol', 'Subscribe'];
  displayFields: string[] = ['protocol_name', 'university_name', 'protocol_date', 'subscribe'];
  templates: { [index: string]: any } = {};
  filter_field: any;
  aggrSubscription!: Subscription;
  downloadData = false;
  downloading = false;
  data = {};
  subscriptionDialogTitle = '';
  subscriber = { email: '', title: '', indexName: '', indexKey: ''};
  dialogRef: any;
  indexDetails: { [index: string]: any } = {};

  query: { [index: string]: any } = {
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
  error = '';

  constructor(private dataService: ApiDataService,
              private filterStateService: FilterStateService,
              private activatedRoute: ActivatedRoute,
              private dialogModel: MatDialog,
              private router: Router,
              private aggregationService: AggregationService,
              private titleService: Title) { }

  ngOnInit() {
    this.indexDetails = {index: 'protocol_analysis', indexKey: 'key', apiKey: 'key'};
    this.tabGroup.selectedIndex = 2;
    this.templates = {
      'protocol_name': this.nameTemplate,
      'university_name': this.uniTemplate,
      'protocol_date': this.dateTemplate
    };
    this.loadTableDataFunction = this.dataService.getAllAnalysisProtocols.bind(this.dataService);
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
    this.aggrSubscription = this.filterStateService.updateUrlParams(this.query, ['protocol', 'analysis']);
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
    void this.router.navigate(['protocol', 'analysis'], {queryParams: {}, replaceUrl: true, skipLocationChange: false});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  downloadFile(format: string) {
    this.downloadData = !this.downloadData;
    this.downloading = true;
    this.downloadQuery['file_format'] = format;
    const mapping = {
      'protocol_name': 'protocolName',
      'university_name': 'universityName',
      'protocol_date': 'protocolDate',
    };
    this.dataService.downloadRecords('protocol_analysis', mapping, this.downloadQuery).subscribe((res: Blob) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(res);
      a.download = 'faang_data.' + format;
      a.click();
      this.downloading = false;
    });
  }

  onUploadProtocolClick() {
    void this.router.navigate(['upload_protocol']);
  }

  tabClick(tab: any) {
    if (tab.index === 0) {
      void this.router.navigate(['protocol/samples']);
    } else if (tab.index === 1) {
      void this.router.navigate(['protocol/experiments']);
    } else if (tab.index === 2) {
      void this.router.navigate(['protocol/analysis']);
    }
  }

  openSubscriptionDialog() {
    // Opening the dialog component
    this.subscriber.title = 'Subscribing to filtered Analysis entries';
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

  loadInitialPageState(params: any) {
    const filters = this.filterStateService.setUpAggregationFilters(params);
    this.filter_field = filters;
    this.query['filters'] = filters;
    this.downloadQuery['filters'] = filters;
    // load pre-search and pre-sorting
    if (params['searchTerm']) {
      this.query['search'] = params['searchTerm'];
    }
    if (params['sortTerm'] && params['sortDirection']) {
      this.query['sort'] = [params['sortTerm'], params['sortDirection']];
    }
  }

  encodeDot(filename: string) {
    return `%22${filename}%22`;
  }

}

