import {Component, OnDestroy, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {ApiDataService} from '../services/api-data.service';
import {FilterStateService} from '../services/filter-state.service';
import {AggregationService} from '../services/aggregation.service';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import {TableServerSideComponent} from '../shared/table-server-side/table-server-side.component';
import { SubscriptionDialogComponent } from '../shared/subscription-dialog/subscription-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { NgClass } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
import { ActiveFilterComponent } from '../shared/active-filter/active-filter.component';
import { FilterComponent } from '../shared/filter/filter.component';
import { FlexModule } from '@angular/flex-layout/flex';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-file-table',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
  standalone: true,
  imports: [HeaderComponent, FlexModule, FilterComponent, ActiveFilterComponent, MatButton, MatTooltip, MatIcon, MatProgressSpinner,
    TableServerSideComponent, RouterLink, NgClass, ExtendedModule]
})
export class FileComponent implements OnInit, OnDestroy {
  @ViewChild('fileNameTemplate', { static: true }) fileNameTemplate!: TemplateRef<any>;
  @ViewChild('paperPublishedTemplate', { static: true }) paperPublishedTemplate!: TemplateRef<any>;
  @ViewChild(TableServerSideComponent, { static: true }) tableServerComponent!: TableServerSideComponent;
  @ViewChild('subscriptionTemplate') subscriptionTemplate = {} as TemplateRef<any>;
  public loadTableDataFunction!: Function;
  displayFields: string[] = ['fileName', 'study', 'experiment', 'species', 'assayType', 'target', 'specimen', 'instrument', 'standard', 'paperPublished', 'subscribe'];
  columnNames: string[] = ['File name', 'Study', 'Experiment', 'Species', 'Assay type', 'Target', 'Specimen', 'Instrument', 'Standard', 'Paper published', 'Subscribe'];
  filter_field: any;
  templates: { [index: string]: any } = {};
  aggrSubscription!: Subscription;
  downloadData = false;
  downloading = false;
  data = {};
  subscriptionDialogTitle = '';
  subscriber = { email: '', title: '', indexName: '', indexKey: ''};
  dialogRef: any;
  indexDetails: { [index: string]: any } = {};

  query: { [index: string]: any } = {
    'sort': ['fileName', 'desc'],
    '_source': [
      'study.accession',
      'experiment.accession',
      'species.text',
      'experiment.assayType',
      'experiment.target',
      'specimen',
      'run.instrument',
      'experiment.standardMet',
      'paperPublished',
      'submitterEmail'],
    'search': ''
  };

  downloadQuery = {
    'sort': ['fileName', 'desc'],
    '_source': [
      '_id',
      '_source.study.accession',
      '_source.experiment.accession',
      '_source.species.text',
      '_source.experiment.assayType',
      '_source.experiment.target',
      '_source.specimen',
      '_source.run.instrument',
      '_source.experiment.standardMet',
      '_source.paperPublished',
      '_source.submitterEmail'
    ],
    'columns': [...this.columnNames.slice(0, -1), 'Submitter Email'], //remove 'Subscribe' from array and add 'Submitter Email'
    'filters': {},
    'file_format': 'csv',
  };

  defaultSort = ['fileName', 'desc'];
  error = '';

  constructor(private dataService: ApiDataService,
              private filterStateService: FilterStateService,
              private activatedRoute: ActivatedRoute,
              private dialogModel: MatDialog,
              private router: Router,
              private aggregationService: AggregationService,
              private titleService: Title) { }

  ngOnInit() {
    this.indexDetails = {index: 'file', indexKey: '_id', apiKey: 'fileName'};
    this.templates = {'fileName': this.fileNameTemplate,
                      'paperPublished': this.paperPublishedTemplate };
    this.loadTableDataFunction = this.dataService.getAllFiles.bind(this.dataService);
    this.titleService.setTitle('FAANG files');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.filterStateService.resetFilter();
      this.loadInitialPageState(params);
    });
    this.tableServerComponent.dataUpdate.subscribe((data) => {
      this.aggregationService.getAggregations(data.aggregations, 'file');
    });
    this.tableServerComponent.sortUpdate.subscribe((sortParams) => {
      this.downloadQuery['sort'] = sortParams;
    });

    this.aggrSubscription = this.filterStateService.updateUrlParams(this.query, ['file']);
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
    void this.router.navigate(['file'], {queryParams: {}, replaceUrl: true, skipLocationChange: false});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  downloadFile(format: string) {
    this.downloadData = !this.downloadData;
    this.downloading = true;
    this.downloadQuery['file_format'] = format;
    const mapping = {
      'fileName': 'name',
      'study': 'study.accession',
      'experiment': 'experiment.accession',
      'species': 'species.text',
      'assay_type': 'experiment.assayType',
      'target': 'experiment.target',
      'specimen': 'specimen',
      'instrument': 'run.instrument',
      'assayType': 'experiment.assayType',
      'standard': 'experiment.standardMet',
      'paper_published': 'paperPublished',
      'submitterEmail': 'submitterEmail'
    };
    this.dataService.downloadRecords('file', mapping, this.downloadQuery).subscribe((res: Blob) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(res);
      a.download = 'faang_data.' + format;
      a.click();
      this.downloading = false;
    });
  }

  wasPublished(published: any) {
    return published === 'true';
  }

  isGreen(published: any) {
    return published === 'true' ? 'green' : 'default';
  }

  openSubscriptionDialog() {
    // Opening the dialog component
    this.subscriber.title = 'Subscribing to filtered File entries';
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

}
