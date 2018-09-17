import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiFileService} from '../services/api-file.service';
import {OrganismTable, SortParams} from '../shared/interfaces';
import {AggregationService} from '../services/aggregation.service';
import {Observable, Subscription} from 'rxjs';
import {ExportService} from '../services/export.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-organism',
  templateUrl: './organism.component.html',
  styleUrls: ['./organism.component.css']
})
export class OrganismComponent implements OnInit, OnDestroy {
  organismList: Observable<OrganismTable[]>;

  columnNames: string[] = ['BioSample ID', 'Sex', 'Organism', 'Breed', 'Standard'];
  spanClass = 'glyphicon glyphicon-arrow-down';
  defaultClass = 'glyphicon glyphicon-sort';
  selectedColumn = 'BioSample ID';
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

  error: string;

  private query = {
    'sort': [{'id_number': 'desc'}],
    'from': 0,
    'size': 1000000,
    '_source': [
      'biosampleId',
      'sex.text',
      'organism.text',
      'breed.text',
      'standardMet'],
    'aggs': {
      'all_organism': {
        'global': {},
        'aggs': {
          'sex': {
            'terms': {
              'field': 'sex.text',
              'size': 50}},
          'organism': {
            'terms': {
              'field': 'organism.organism.text',
              'size': 50}},
          'breed': {
            'terms': {
              'field': 'breed.text',
              'size': 50}},
          'standard': {
            'terms': {
              'field': 'standardMet',
              'size': 50}}}}}};

  constructor(private apiFileService: ApiFileService,
              private aggregationService: AggregationService,
              private spinner: NgxSpinnerService,
              private exportService: ExportService,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG organisms');
    this.spinner.show();
    this.optionsCsv = this.exportService.optionsCsv;
    this.optionsTabular = this.exportService.optionsTabular;
    this.optionsCsv['headers'] = this.columnNames;
    this.optionsTabular['headers'] = this.optionsTabular;
    this.sort_field = {id: 'bioSampleId', direction: 'asc'};
    this.apiFileService.getAllOrganisms(this.query).subscribe(
      (data) => {
        this.organismList = data;
        if (this.organismList) {
          this.spinner.hide();
        }
        this.aggregationService.getAggregations(this.organismList, 'organism');
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
    if (this.selectedColumn === 'BioSample ID') {
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
        this.selectedColumn = 'BioSample ID';
        this.spanClass = 'glyphicon glyphicon-arrow-down';
      }
    }
  }

  selectColumn() {
    switch (this.selectedColumn) {
      case 'BioSample ID': {
        this.sort_field['id'] = 'bioSampleId';
        break;
      }
      case 'Sex': {
        this.sort_field['id'] = 'sex';
        break;
      }
      case 'Organism': {
        this.sort_field['id'] = 'organism';
        break;
      }
      case 'Breed': {
        this.sort_field['id'] = 'breed';
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
