import {Component, OnDestroy, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {SpecimenTable} from '../shared/interfaces';
import {Observable, Subscription} from 'rxjs';
import {ApiDataService} from '../services/api-data.service';
import {FilterStateService} from '../services/filter-state.service';
import {AggregationService} from '../services/aggregation.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TableServerSideComponent}  from '../shared/table-server-side/table-server-side.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/internal/operators/finalize';
import { SubscriptionDialogComponent } from '../shared/subscription-dialog/subscription-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-specimen',
  templateUrl: './specimen.component.html',
  styleUrls: ['./specimen.component.css']
})
export class SpecimenComponent implements OnInit, OnDestroy {
  @ViewChild('biosampleIdTemplate', { static: true }) biosampleIdTemplate: TemplateRef<any>;
  @ViewChild('paperPublishedTemplate', { static: true }) paperPublishedTemplate: TemplateRef<any>;
  @ViewChild('trackhubUrlTemplate', { static: true }) trackhubUrlTemplate: TemplateRef<any>;
  @ViewChild('subscriptionTemplate') subscriptionTemplate = {} as TemplateRef<any>;
  @ViewChild(TableServerSideComponent, { static: true }) tableServerComponent: TableServerSideComponent;
  public loadTableDataFunction: Function;
  specimenListShort: Observable<SpecimenTable[]>;
  specimenListLong: Observable<SpecimenTable[]>;
  columnNames: string[] = ['BioSample ID', 'Material', 'Organism part/Cell type', 'Sex', 'Organism', 'Breed', 'Standard',
    'Paper published', 'Track Hub', 'Subscribe'];
  displayFields: string[] = ['bioSampleId', 'material', 'organismpart_celltype', 'sex', 'organism', 'breed', 'standard',
  'paperPublished', 'trackhubUrl', 'subscribe'];
  filter_field: any;
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
    'sort': ['id_number', 'desc'],
    '_source': [
      'biosampleId',
      'material.text',
      'cellType.text',
      'organism.sex.text',
      'organism.organism.text',
      'organism.breed.text',
      'standardMet',
      'id_number',
      'paperPublished',
      'trackhubUrl'
    ],
    'search': ''
  };

  downloadQuery = {
    'sort': ['id_number', 'desc'],
    '_source': [
      '_source.biosampleId',
      '_source.id_number',
      '_source.material.text',
      '_source.cellType.text',
      '_source.organism.sex.text',
      '_source.organism.organism.text',
      '_source.organism.breed.text',
      '_source.standardMet',
      '_source.paperPublished',
      '_source.trackhubUrl'
    ],
    'columns': this.columnNames.concat(['Track Hub']),
    'filters': {},
    'file_format': 'csv',
  };

  defaultSort = ['id_number','desc'];
  error: string;
  subscriptionDialog: MatDialogRef<SubscriptionDialogComponent>;

  constructor(private dataService: ApiDataService,
              private filterStateService: FilterStateService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private dialogModel: MatDialog,
              private aggregationService: AggregationService,
              private titleService: Title) { }

  ngOnInit() {
    this.indexDetails = {index: 'specimen', indexKey: 'biosampleId', apiKey: 'bioSampleId'}
    this.templates = {'bioSampleId': this.biosampleIdTemplate,
                      'paperPublished': this.paperPublishedTemplate,
                      'trackhubUrl': this.trackhubUrlTemplate };
    this.loadTableDataFunction = this.dataService.getAllSpecimens.bind(this.dataService);
    this.titleService.setTitle('FAANG specimens');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.filterStateService.resetFilter();
      this.loadInitialPageState(params);
    });

    this.tableServerComponent.dataUpdate.subscribe((data) => {
      this.aggregationService.getAggregations(data.aggregations, 'specimen');
    });
    this.tableServerComponent.sortUpdate.subscribe((sortParams) => {
      this.downloadQuery['sort'] = sortParams;
    });
    this.aggrSubscription = this.filterStateService.updateUrlParams(this.query, ['specimen']);
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
    this.router.navigate(['specimen'], {queryParams: {}, replaceUrl: true, skipLocationChange: false});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  downloadFile(format: string) {
    this.downloadData = !this.downloadData;
    this.downloading = true;
    this.downloadQuery['file_format'] = format;
    let mapping = {
      'standard': 'standardMet',
      'sex': 'organism.sex.text',
      'organism': 'organism.organism.text',
      'material': 'material.text',
      'organismpart_celltype': 'cellType.text',
      'breed': 'organism.breed.text',
      'paper_published': 'paperPublished',
      'trackhubUrl': 'trackhubUrl'
    }
    this.dataService.downloadRecords('specimen', mapping, this.downloadQuery).subscribe((res:Blob)=>{
      var a = document.createElement("a");
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
    this.subscriber.title = 'Subscribing to filtered Specimen entries'
    this.subscriber.indexName = this.indexDetails['index'];
    this.subscriber.indexKey = this.indexDetails['indexKey'];
    const subscriptionDialog = this.dialogModel.open(SubscriptionDialogComponent, {
      height: '300px', width: '400px',
      data: this.subscriber
    });
  }

  ngOnDestroy() {
    if (typeof  this.filter_field !== 'undefined') {
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
