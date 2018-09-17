import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatasetTable, SortParams} from '../shared/interfaces';
import {Subject, Subscription} from 'rxjs';
import {ApiFileService} from '../services/api-file.service';
import {AggregationService} from '../services/aggregation.service';
import {ExportService} from '../services/export.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit, OnDestroy {
  datasetList: Subject<DatasetTable[]>;
  columnNames: string[] = ['Dataset accession', 'Title', 'Species', 'Archive', 'Number of Experiments', 'Number of Specimens',
    'Number of Files', 'Standard'];
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
    'sort': [{'accession': 'asc'}],
    'from': 0,
    'size': 20,
    '_source': [
      'accession',
      'title',
      'species.text',
      'archive',
      'experiment.accession',
      'file.name',
      'specimen.biosampleId',
      'standardMet'],
    'aggs': {
      'all_dataset': {
        'global': {},
        'aggs': {
          'species': {
            'terms': {
              'field': 'species.text',
              'size': 50}},
          'instrument': {
            'terms': {
              'field': 'instrument',
              'size': 50}},
          'archive': {
            'terms': {
              'field': 'archive',
              'size': 50}},
          'standard': {
            'terms': {
              'field': 'standardMet',
              'size': 50}}}}}};
  error: string;

  constructor(private apiFileService: ApiFileService,
              private aggregationService: AggregationService,
              private exportService: ExportService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG datasets');
    this.spinner.show();
    this.optionsCsv = this.exportService.optionsCsv;
    this.optionsTabular = this.exportService.optionsTabular;
    this.optionsCsv['headers'] = this.columnNames;
    this.optionsTabular['headers'] = this.optionsTabular;
    this.apiFileService.getAllDatasets(this.query).subscribe(
      data => {
        this.datasetList = data;
        if (this.datasetList) {
          this.spinner.hide();
        }
        this.aggregationService.getAggregations(this.datasetList, 'dataset');
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

  getSpeciesStr(dataset: any): string {
    const species: any[] = dataset['_source']['species'];
    let value: string = '';
    for (let i = species.length - 1; i >= 0; i--) {
      value += species[i]['text'] + ',';
    }
    return value.substring(0, value.length - 1);
  }

  convertArrayToStr(data: string[]) {
    let value: string = '';
    for (let i = 0; i < data.length; i++) {
      value += data[i] + ',';
    }
    return value.substring(0, value.length - 1);
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  ngOnDestroy() {
    if (typeof  this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
    this.exportSubscription.unsubscribe();
  }
}
