import {Component, OnDestroy, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {ApiDataService} from '../services/api-data.service';
import {FilterStateService} from '../services/filter-state.service';
import {AggregationService} from '../services/aggregation.service';
import {Observable, Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {DatasetTable} from '../shared/interfaces';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TableServerSideComponent}  from '../shared/table-server-side/table-server-side.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/internal/operators/finalize';
import { SubscriptionDialogComponent } from '../shared/subscription-dialog/subscription-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit, OnDestroy {
  @ViewChild('datasetAccessionTemplate', {static: true}) datasetAccessionTemplate: TemplateRef<any>;
  @ViewChild('paperPublishedTemplate', {static: true}) paperPublishedTemplate: TemplateRef<any>;
  @ViewChild(TableServerSideComponent, {static: true}) tableServerComponent: TableServerSideComponent;
  @ViewChild('subscriptionTemplate') subscriptionTemplate = {} as TemplateRef<any>;
  public loadTableDataFunction: Function;
  datasetListShort: Observable<DatasetTable[]>;
  datasetListLong: Observable<DatasetTable[]>;
  displayFields: string[] = ['datasetAccession', 'title', 'species', 'archive', 'assayType', 'numberOfExperiments',
    'numberOfSpecimens', 'numberOfFiles', 'standard', 'paperPublished', 'subscribe'];
  columnNames: string[] = ['Dataset accession', 'Title', 'Species', 'Archive', 'Assay type', 'Number of Experiments',
    'Number of Specimens', 'Number of Files', 'Standard', 'Paper published', 'Subscribe'];
  filter_field: any;
  templates: Object;
  aggrSubscription: Subscription;
  downloadData = false;
  downloading = false;
  data = {};
  subscriptionDialogTitle: string;
  subscriber = {email: '', title: '', indexName: '', indexKey: ''};
  dialogRef: any;
  dialogInfoRef: any;
  indexDetails: {};

  query = {
    'sort': ['accession', 'desc'],
    '_source': [
      'accession',
      'title',
      'species.text',
      'archive',
      'experiment.accession',
      'file.name',
      'specimen.biosampleId',
      'assayType',
      'standardMet',
      'paperPublished',
      'submitterEmail'],
    'search': ''
  };

  downloadQuery = {
    'sort': ['accession', 'desc'],
    '_source': [
      '_source.accession',
      '_source.title',
      '_source.species.text',
      '_source.archive',
      '_source.experiment.accession',
      '_source.file.name',
      '_source.specimen.biosampleId',
      '_source.assayType',
      '_source.standardMet',
      '_source.paperPublished',
      '_source.submitterEmail'
    ],
    'columns': this.columnNames.concat(['Submitter Email']),
    'filters': {},
    'file_format': 'csv',
  };

  defaultSort = ['accession', 'desc'];
  error: string;
  subscriptionDialog: MatDialogRef<SubscriptionDialogComponent>;

  constructor(private dataService: ApiDataService,
              private filterStateService: FilterStateService,
              private activatedRoute: ActivatedRoute,
              private dialogModel: MatDialog,
              private router: Router,
              private aggregationService: AggregationService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.indexDetails = {index: 'dataset', indexKey: 'accession', apiKey: 'datasetAccession'};
    this.templates = {
      'datasetAccession': this.datasetAccessionTemplate,
      'paperPublished': this.paperPublishedTemplate
    };
    this.loadTableDataFunction = this.dataService.getAllDatasets.bind(this.dataService);
    this.titleService.setTitle('FAANG datasets');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.filterStateService.resetFilter();
      this.loadInitialPageState(params);
    });

    this.tableServerComponent.dataUpdate.subscribe((data) => {
      this.aggregationService.getAggregations(data.aggregations, 'dataset');
    });
    this.tableServerComponent.sortUpdate.subscribe((sortParams) => {
      this.downloadQuery['sort'] = sortParams;
    });

    this.aggrSubscription = this.filterStateService.updateUrlParams(this.query, ['dataset']);
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
    this.router.navigate(['dataset'], {queryParams: {}, replaceUrl: true, skipLocationChange: false});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  downloadFile(format: string) {
    this.downloadData = !this.downloadData;
    this.downloading = true;
    this.downloadQuery['file_format'] = format;
    const mapping = {
      'datasetAccession': 'accession',
      'title': 'title',
      'species': 'species.text',
      'archive': 'archive',
      'assayType': 'assayType',
      'numberOfExperiments': 'experiment.accession',
      'numberOfSpecimens': 'specimen.biosampleId',
      'numberOfFiles': 'file.name',
      'standard': 'standardMet',
      'paper_published': 'paperPublished',
      'submitterEmail': 'submitterEmail'
    };
    this.dataService.downloadRecords('dataset', mapping, this.downloadQuery).subscribe(
      (res: Blob) => {
        const a = document.createElement('a');
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

  wasPublished(published: any) {
    return published === 'true';
  }

  isGreen(published: any) {
    return published === 'true' ? 'green' : 'default';
  }

  openSubscriptionDialog() {
    // Opening the dialog component
    this.subscriber.title = 'Subscribing to filtered Dataset entries';
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

  loadInitialPageState(params) {
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
