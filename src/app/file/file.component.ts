import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiDataService} from '../services/api-data.service';
import {AggregationService} from '../services/aggregation.service';
import {SortParams} from '../shared/interfaces';
import {Observable, Subscription} from 'rxjs';
import {ExportService} from '../services/export.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {FileTable} from '../shared/interfaces';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-file-table',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit, OnDestroy {
  fileListShort: Observable<FileTable[]>;
  fileListLong: Observable<FileTable[]>;
  columnNames: string[] = ['File name', 'Study', 'Experiment', 'Species', 'Assay type', 'Target', 'Specimen', 'Instrument', 'Standard',
    'Paper published'];
  spanClass = 'expand_more';
  defaultClass = 'unfold_more';
  selectedColumn = 'File name';
  sort_field: SortParams;
  filter_field: {};
  aggrSubscription: Subscription;
  exportSubscription: Subscription;
  fileListLongSubscription: Subscription;
  downloadData = false;

  optionsCsv;
  optionsTabular;
  data = {};


  // Local variable for pagination
  p = 1;

  private query = {
    'sort': 'name:desc',
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
  error: string;

  constructor(private dataService: ApiDataService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private aggregationService: AggregationService,
              private exportService: ExportService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG files');
    this.spinner.show();
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
    });
    this.optionsCsv = this.exportService.optionsCsv;
    this.optionsTabular = this.exportService.optionsTabular;
    this.optionsCsv['headers'] = this.columnNames;
    this.optionsTabular['headers'] = this.optionsTabular;
    this.sort_field = {id: 'fileName', direction: 'desc'};
    this.dataService.getAllFiles(this.query, 25).subscribe(
      data => {
        this.fileListShort = data;
        if (this.fileListShort) {
          this.spinner.hide();
        }
      },
      error => {
        this.error = error;
        this.spinner.hide();
      }
    );
    this.fileListLong = this.dataService.getAllFiles(this.query, 1000000);
    this.fileListLongSubscription = this.fileListLong.subscribe((data) => {
      // data is the full list of getAllFiles result where the field names are defined
      this.aggregationService.getAggregations(data, 'file');
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
    this.exportSubscription = this.exportService.data.subscribe((data) => {
      this.data = data;
    });
  }

  onTableClick(event: any) {
    let event_class;
    if (event['srcElement']['firstElementChild']) {
      event_class = event['srcElement']['firstElementChild']['innerText'];
    } else {
      event_class = event['srcElement']['innerText'];
    }
    this.selectedColumn = event['srcElement']['id'];
    this.selectColumn();
    this.chooseClass(event_class);
  }

  chooseClass(event_class: string) {
    if (this.selectedColumn === 'File name') {
      if (event_class === 'expand_more') {
        this.spanClass = 'expand_less';
        this.sort_field['direction'] = 'asc';
      } else {
        this.spanClass = 'expand_more';
        this.sort_field['direction'] = 'desc';
      }
    } else {
      if (event_class === this.defaultClass) {
        this.spanClass = 'expand_more';
        this.sort_field['direction'] = 'desc';
      } else if (event_class === 'expand_more') {
        this.spanClass = 'expand_less';
        this.sort_field['direction'] = 'asc';
      } else {
        this.spanClass = 'unfold_more';
        this.sort_field['direction'] = 'desc';
        this.sort_field['id'] = 'fileName';
        this.selectedColumn = 'File name';
        this.spanClass = 'expand_more';
      }
    }
  }

  selectColumn() {
    switch (this.selectedColumn) {
      case 'File name': {
        this.sort_field['id'] = 'fileName';
        break;
      }
      case 'Study': {
        this.sort_field['id'] = 'study';
        break;
      }
      case 'Experiment': {
        this.sort_field['id'] = 'experiment';
        break;
      }
      case 'Species': {
        this.sort_field['id'] = 'species';
        break;
      }
      case 'Assay type': {
        this.sort_field['id'] = 'assayType';
        break;
      }
      case 'Target': {
        this.sort_field['id'] = 'target';
        break;
      }
      case 'Specimen': {
        this.sort_field['id'] = 'specimen';
        break;
      }
      case 'Instrument': {
        this.sort_field['id'] = 'instrument';
        break;
      }
      case 'Standard': {
        this.sort_field['id'] = 'standard';
        break;
      }
    }
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
    this.router.navigate(['file'], {queryParams: {}});
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
    if (typeof this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
    this.exportSubscription.unsubscribe();
    this.fileListLongSubscription.unsubscribe();
  }
}
