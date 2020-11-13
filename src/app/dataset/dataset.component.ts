import {Component, OnDestroy, OnInit, AfterViewInit, TemplateRef, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {DatasetTable} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {ApiDataService} from '../services/api-data.service';
import {AggregationService} from '../services/aggregation.service';
import {ExportService} from '../services/export.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs/internal/Observable';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TableClientSideComponent}  from '../shared/table-client-side/table-client-side.component';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('datasetAccessionTemplate', { static: true }) datasetAccessionTemplate: TemplateRef<any>;
  @ViewChild('paperPublishedTemplate', { static: true }) paperPublishedTemplate: TemplateRef<any>;
  @ViewChildren("tableComp") tableComponents: QueryList<TableClientSideComponent>;
  private tableClientComponent: TableClientSideComponent;
  datasetListShort: Observable<DatasetTable[]>;
  datasetListLong: Observable<DatasetTable[]>;
  columnNames: string[] = ['Dataset accession', 'Title', 'Species', 'Archive',  'Assay type', 'Number of Experiments',
    'Number of Specimens', 'Number of Files', 'Standard', 'Paper published'];
  displayFields: string[] = ['datasetAccession', 'title', 'species', 'archive', 'assayType', 'numberOfExperiments', 
    'numberOfSpecimens', 'numberOfFiles', 'standard', 'paperPublished'];
  templates: Object;
  filter_field = {};
  aggrSubscription: Subscription;
  exportSubscription: Subscription;
  datasetListLongSubscription: Subscription;
  downloadData = false;

  optionsCsv;
  optionsTabular;
  data = {};

  private query = {
    'sort': 'accession:desc',
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
      'paperPublished'],
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
    this.templates = {'datasetAccession': this.datasetAccessionTemplate, 
                      'paperPublished': this.paperPublishedTemplate };
    this.titleService.setTitle('FAANG datasets');
    this.spinner.show();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.resetFilter();
      const filters = {};
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
      for (const key in filters) {
        if (key == 'paper_published') {
          filters['paper_published'].forEach(function(item, i) { 
            if (item == 'Yes') 
              filters['paper_published'][i] = 'true'; 
            else
              filters['paper_published'][i] = 'false'; 
          });
          filters['paperPublished'] = filters['paper_published'];
          delete filters['paper_published'];
        }
      }
      this.filter_field = filters;
      this.filter_field = Object.assign({}, this.filter_field);
    });
    this.optionsCsv = this.exportService.optionsCsv;
    this.optionsTabular = this.exportService.optionsTabular;
    this.optionsCsv['headers'] = this.columnNames;
    this.optionsTabular['headers'] = this.optionsTabular;
    this.dataService.getAllDatasets(this.query, 25).subscribe(
      (data) => {
        this.datasetListShort = data;
        if (this.datasetListShort) {
          this.spinner.hide();
        }
      },
      error => {
        this.error = error;
        this.spinner.hide();
      }
    );
    this.datasetListLong = this.dataService.getAllDatasets(this.query, 100000);
    this.datasetListLongSubscription = this.datasetListLong.subscribe((data) => {
      this.aggregationService.getAggregations(data, 'dataset');
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
    this.exportSubscription = this.exportService.data.subscribe((data) => {
      this.data = data;
    });
  }

  ngAfterViewInit() {
      this.tableComponents.changes.subscribe((comps: QueryList <TableClientSideComponent>) => {
          this.tableClientComponent = comps.first;
          this.aggregationService.getAggregations(this.tableClientComponent.dataSource.filteredData, 'dataset');
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
    this.filter_field = {};
  }

  removeFilter() {
    this.resetFilter();
    this.router.navigate(['dataset'], {queryParams: {}});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  wasPublished(published: any) {
    return published === 'true';
  }

  isGreen(published: any) {
    return published === 'true' ? 'green' : 'default';
  }

  ngOnDestroy() {
    if (typeof  this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
    this.exportSubscription.unsubscribe();
    this.datasetListLongSubscription.unsubscribe();
  }
}
