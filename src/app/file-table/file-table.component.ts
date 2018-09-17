import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiFileService} from '../services/api-file.service';
import {AggregationService} from '../services/aggregation.service';
import {SortParams} from '../shared/interfaces';
import {Observable, Subscription} from 'rxjs';
import {ExportService} from '../services/export.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {FileTable} from '../shared/interfaces';

@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html',
  styleUrls: ['./file-table.component.css']
})
export class FileTableComponent implements OnInit, OnDestroy {
  fileList: Observable<FileTable[]>;
  columnNames: string[] = ['File name', 'Study', 'Experiment', 'Species', 'Assay type', 'Specimen', 'Instrument', 'Standard'];
  spanClass = 'glyphicon glyphicon-arrow-down';
  defaultClass = 'glyphicon glyphicon-sort';
  selectedColumn = 'File name';
  sort_field: SortParams;
  filter_field: {};
  aggrSubscription: Subscription;
  exportSubscription: Subscription;
  downloadData = false;

  optionsCsv;
  optionsTabular;
  data = {};


  // Local variable for pagination
  p = 1;

  private query = {
    'sort': [{'name': 'asc'}],
    'from': 0,
    'size': 1000000,
    '_source': [
      'study.accession',
      'experiment.accession',
      'species.text',
      'experiment.assayType',
      'specimen',
      'run.instrument',
      'experiment.standardMet'],
    'aggs': {
      'all_file': {
        'global': {},
        'aggs': {
          'standard': {
            'terms': {
              'field': 'file.experiment.standardMet',
              'size': 50}},
          'study': {
            'terms': {
              'field': 'study.accession',
              'size': 1000}},
          'species': {
            'terms': {
              'field': 'species.text',
              'size': 50}},
          'assay': {
            'terms': {
              'field': 'file.experiment.assayType',
              'size': 50}},
          'instrument': {
            'terms': {
              'field': 'run.instrument',
              'size': 50}}}}}};
  error: string;

  constructor(private apiFileService: ApiFileService,
              private aggregationService: AggregationService,
              private exportService: ExportService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG files');
    this.spinner.show();
    this.optionsCsv = this.exportService.optionsCsv;
    this.optionsTabular = this.exportService.optionsTabular;
    this.optionsCsv['headers'] = this.columnNames;
    this.optionsTabular['headers'] = this.optionsTabular;
    this.sort_field = {id: 'fileName', direction: 'asc'};
    this.apiFileService.getAllFiles(this.query).subscribe(
      (data) => {
        this.fileList = data;
        if (this.fileList) {
          this.spinner.hide();
        }
        this.aggregationService.getAggregations(this.fileList, 'file');
      },
      error => {
        this.error = error;
        this.spinner.hide();
      }
    );
    this.aggrSubscription = this.aggregationService.field.subscribe((data) => {
      this.filter_field = data;
    });
    this.exportSubscription = this.exportService.data.subscribe((data) => {
      this.data = data;
    });
  }

  onTableClick(event: any) {
    const event_class = event['srcElement']['className'];
    this.selectedColumn = event['srcElement']['id'];
    this.selectColumn();
    this.chooseClass(event_class);
  }

  chooseClass(event_class: string) {
    if (this.selectedColumn === 'File name') {
      if (event_class === 'glyphicon glyphicon-arrow-down') {
        this.spanClass = 'glyphicon glyphicon-arrow-up';
        this.sort_field['direction'] = 'desc';
      } else {
        this.spanClass = 'glyphicon glyphicon-arrow-down';
        this.sort_field['direction'] = 'asc';
      }
    } else {
      if (event_class === this.defaultClass) {
        this.spanClass = 'glyphicon glyphicon-arrow-down';
        this.sort_field['direction'] = 'asc';
      } else if (event_class === 'glyphicon glyphicon-arrow-down') {
        this.spanClass = 'glyphicon glyphicon-arrow-up';
        this.sort_field['direction'] = 'desc';
      } else {
        this.spanClass = 'glyphicon glyphicon-sort';
        this.sort_field['direction'] = 'asc';
        this.sort_field['id'] = '_id';
        this.selectedColumn = 'File name';
        this.spanClass = 'glyphicon glyphicon-arrow-down';
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
    for (const key of Object.keys(this.filter_field)) {
      this.filter_field[key] = [];
      this.aggregationService.current_active_filters = [];
    }
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  ngOnDestroy() {
    if (typeof this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
    this.exportSubscription.unsubscribe();
  }
}
