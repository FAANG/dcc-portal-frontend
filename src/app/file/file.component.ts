import {Component, OnDestroy, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {ApiDataService} from '../services/api-data.service';
import {AggregationService} from '../services/aggregation.service';
import {Observable, Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {FileTable} from '../shared/interfaces';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TableServerSideComponent}  from '../shared/table-server-side/table-server-side.component';

@Component({
  selector: 'app-file-table',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit, OnDestroy {
  @ViewChild('fileNameTemplate', { static: true }) fileNameTemplate: TemplateRef<any>;
  @ViewChild('paperPublishedTemplate', { static: true }) paperPublishedTemplate: TemplateRef<any>;
  @ViewChild(TableServerSideComponent, { static: true }) tableServerComponent: TableServerSideComponent;
  public loadTableDataFunction: Function;
  fileListShort: Observable<FileTable[]>;
  fileListLong: Observable<FileTable[]>;
  displayFields: string[] = ['fileName', 'study', 'experiment', 'species', 'assayType', 'target', 'specimen', 'instrument', 'standard', 'paperPublished'];
  columnNames: string[] = ['File name', 'Study', 'Experiment', 'Species', 'Assay type', 'Target', 'Specimen', 'Instrument', 'Standard', 'Paper published'];
  filter_field: {};
  templates: Object;
  aggrSubscription: Subscription;
  downloadData = false;
  data = {};

  private query = {
    'sort': ['name','desc'],
    '_source': [
      'study.accession',
      'experiment.accession',
      'species.text',
      'experiment.assayType',
      'experiment.target',
      'specimen',
      'run.instrument',
      'experiment.standardMet',
      'paperPublished'],
  };

  downloadQuery = {
    'sort': ['name','desc'],
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
      '_source.paperPublished'
    ],
    'columns': this.columnNames,
    'filters': {},
    'file_format': 'csv',
  };

  defaultSort = ['name','desc'];
  error: string;

  constructor(private dataService: ApiDataService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private aggregationService: AggregationService,
              private titleService: Title) { }

  ngOnInit() {
    this.templates = {'fileName': this.fileNameTemplate, 
                      'paperPublished': this.paperPublishedTemplate };
    this.loadTableDataFunction = this.dataService.getAllFiles.bind(this.dataService);
    this.titleService.setTitle('FAANG files');
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
      this.aggregationService.getAggregations(data.aggregations, 'file');
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
      this.router.navigate(['file'], {queryParams: params});
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
    this.filter_field = Object.assign({}, this.filter_field);
  }

  removeFilter() {
    this.resetFilter();
    this.router.navigate(['file'], {queryParams: {}});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  downloadCsvFile() {
    this.downloadQuery['file_format'] = 'csv';
    this.dataService.downloadFiles(this.downloadQuery).subscribe((res:Response)=>{
      var a = document.createElement("a");
      a.href = URL.createObjectURL(res);
      a.download = 'faang_data.csv';
      a.click();
    });
  }

  downloadTabularFile() {
    this.downloadQuery['file_format'] = 'txt';
    this.dataService.downloadFiles(this.downloadQuery).subscribe((res:Response)=>{
      var a = document.createElement("a");
      a.href = URL.createObjectURL(res);
      a.download = 'faang_data.txt';
      a.click();
    });
  }

  wasPublished(published: any) {
    return published === 'true';
  }

  isGreen(published: any) {
    return published === 'true' ? 'green' : 'default';
  }

  ngOnDestroy() {
    if (typeof this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
  }
}
