import {Component, OnDestroy, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {ApiDataService} from '../services/api-data.service';
import {AggregationService} from '../services/aggregation.service';
import {Observable, Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {DatasetTable} from '../shared/interfaces';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TableServerSideComponent}  from '../shared/table-server-side/table-server-side.component';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit, OnDestroy {
  @ViewChild('datasetAccessionTemplate', { static: true }) datasetAccessionTemplate: TemplateRef<any>;
  @ViewChild('paperPublishedTemplate', { static: true }) paperPublishedTemplate: TemplateRef<any>;
  @ViewChild(TableServerSideComponent, { static: true }) tableServerComponent: TableServerSideComponent;
  @ViewChild('subscriptionTemplate') subscriptionTemplate = {} as TemplateRef<any>;
  public loadTableDataFunction: Function;
  datasetListShort: Observable<DatasetTable[]>;
  datasetListLong: Observable<DatasetTable[]>;
  displayFields: string[] = ['datasetAccession', 'title', 'species', 'archive', 'assayType', 'numberOfExperiments',
    'numberOfSpecimens', 'numberOfFiles', 'standard', 'paperPublished', 'subscribe'];
  columnNames: string[] = ['Dataset accession', 'Title', 'Species', 'Archive',  'Assay type', 'Number of Experiments',
  'Number of Specimens', 'Number of Files', 'Standard', 'Paper published', 'Subscribe'];
  filter_field: {};
  templates: Object;
  aggrSubscription: Subscription;
  downloadData = false;
  downloading = false;
  data = {};
  subscriptionDialogTitle: string;
  subscriber = { email: ''};
  dialogRef: any;
  dialogInfoRef: any;
  indexDetails: {};
  public subscriptionForm: FormGroup;

  query = {
    'sort': ['accession','desc'],
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
    'sort': ['accession','desc'],
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

  defaultSort = ['accession','desc'];
  error: string;

  constructor(private dataService: ApiDataService,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private router: Router,
              private aggregationService: AggregationService,
              private titleService: Title) { }

  ngOnInit() {
    this.indexDetails = {index: 'dataset', indexKey: 'accession', apiKey: 'datasetAccession'}
    this.templates = {'datasetAccession': this.datasetAccessionTemplate,
                      'paperPublished': this.paperPublishedTemplate };
    this.loadTableDataFunction = this.dataService.getAllDatasets.bind(this.dataService);
    this.titleService.setTitle('FAANG datasets');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.resetFilter();
      const filters = {};
      for (const key in params) {
        if (Array.isArray(params[key])) { // multiple values chosed for one filter
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
      this.query['filters'] = filters;
      this.downloadQuery['filters'] = filters;
      this.filter_field = Object.assign({}, this.filter_field);
    });
    this.tableServerComponent.dataUpdate.subscribe((data) => {
      this.aggregationService.getAggregations(data.aggregations, 'dataset');
    });
    this.tableServerComponent.sortUpdate.subscribe((sortParams) => {
      this.downloadQuery['sort'] = sortParams;
    });
    this.aggrSubscription = this.aggregationService.field.subscribe((data) => {
      const params = {};
      for (const key of Object.keys(data)) {
        if (data[key].length !== 0) {
          params[key] = data[key];
        }
      }
      this.router.navigate(['dataset'], {queryParams: params});
    });

    this.subscriptionForm = new FormGroup({
      subscriberEmail: new FormControl('', [Validators.required, Validators.email]),
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
    this.filter_field = Object.assign({}, this.filter_field);
  }

  removeFilter() {
    this.resetFilter();
    this.router.navigate(['dataset'], {queryParams: {}});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  downloadFile(format: string) {
    this.downloadData = !this.downloadData;
    this.downloading = true;
    this.downloadQuery['file_format'] = format;
    let mapping = {
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
    }
    this.dataService.downloadRecords('dataset', mapping, this.downloadQuery).subscribe(
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

  wasPublished(published: any) {
    return published === 'true';
  }

  isGreen(published: any) {
    return published === 'true' ? 'green' : 'default';
  }

  openSubscriptionDialog() {
    this.subscriptionDialogTitle = `Subscribing to filtered Dataset entries`
    this.dialogRef = this.dialog.open(this.subscriptionTemplate,
      { data: this.subscriber, height: '300px', width: '400px' });
  }

  public displayError = (controlName: string, errorName: string) =>{
    return this.subscriptionForm.controls[controlName].hasError(errorName);
  }

  onCancelDialog(dialogType) {
    if (dialogType === 'info'){
      this.dialogInfoRef.close();
    }else{
      this.dialogRef.close();
    }
  }

  getEmail(event: Event){
    this.subscriber.email = (<HTMLInputElement>event.target).value;
  }

  onRegister(data) {
    console.log("onRegister: ", data)
    if (this.subscriptionForm.valid && this.subscriptionForm.touched){
      this.dataService.subscribeFilteredData('dataset', 'accession', data.email).subscribe(response => {
          console.log("You have now been subscribed!")
          this.dialogRef.close();
        },
        error => {
          console.log(error);
          this.dialogRef.close();
        }
      );
    }
  }

  ngOnDestroy() {
    if (typeof this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
  }
}
