import {Component, OnDestroy, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {ApiDataService} from '../services/api-data.service';
import {FilterStateService} from '../services/filter-state.service';
import {AggregationService} from '../services/aggregation.service';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {TableServerSideComponent} from '../shared/table-server-side/table-server-side.component';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
import { ActiveFilterComponent } from '../shared/active-filter/active-filter.component';
import { FilterComponent } from '../shared/filter/filter.component';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-protocol-sample',
  templateUrl: './protocol-sample.component.html',
  styleUrls: ['./protocol-sample.component.css'],
  standalone: true,
  imports: [HeaderComponent, MatTabGroup, MatTab, FlexModule, FilterComponent, ActiveFilterComponent, MatButton, MatTooltip, MatIcon,
    MatProgressSpinner, TableServerSideComponent]
})
export class ProtocolSampleComponent implements OnInit, OnDestroy {
  @ViewChild('tabs', { static: true }) tabGroup!: MatTabGroup;
  @ViewChild('nameTemplate', { static: true }) nameTemplate!: TemplateRef<any>;
  @ViewChild('uniTemplate', { static: true }) uniTemplate!: TemplateRef<any>;
  @ViewChild('dateTemplate', { static: true }) dateTemplate!: TemplateRef<any>;
  @ViewChild(TableServerSideComponent, { static: true }) tableServerComponent!: TableServerSideComponent;
  public loadTableDataFunction!: Function;

  columnNames: string[] = ['Protocol name', 'Organisation', 'Year of protocol'];
  displayFields: string[] = ['protocol_name', 'university_name', 'protocol_date'];
  templates: { [index: string]: any } = {};
  filter_field: any;
  aggrSubscription!: Subscription;
  downloadData = false;
  downloading = false;
  data = {};
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
              private router: Router,
              private aggregationService: AggregationService,
              private titleService: Title) { }

  ngOnInit() {
    this.indexDetails = {index: 'protocol_samples', indexKey: 'key', apiKey: 'key'};
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
    void this.router.navigate(['protocol', 'samples'], {queryParams: {}, replaceUrl: true, skipLocationChange: false});
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
    this.dataService.downloadRecords('protocol_samples', mapping, this.downloadQuery).subscribe((res: Blob) => {
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

  // Protocol ids are filenames that often contain a dot (e.g. "...20200720.pdf"). A dotted final path
  // segment is treated as a static-file request by the dev/SSR server, so the app route is never served
  // (you get "Cannot GET ..."). Percent-encode the id and escape dots so the URL has no apparent extension;
  // the detail component decodes it back via decodeURIComponent(params['id']).
  detailUrl(key: string): string {
    return `/protocol/samples/${encodeURIComponent(key).replace(/\./g, '%2E')}`;
  }

}
