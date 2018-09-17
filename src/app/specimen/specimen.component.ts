import {Component, OnDestroy, OnInit} from '@angular/core';
import {SortParams, SpecimenTable} from '../shared/interfaces';
import {Observable, Subscription} from 'rxjs';
import {ApiFileService} from '../services/api-file.service';
import {AggregationService} from '../services/aggregation.service';
import {ExportService} from '../services/export.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-specimen',
  templateUrl: './specimen.component.html',
  styleUrls: ['./specimen.component.css']
})
export class SpecimenComponent implements OnInit, OnDestroy {
  specimenList: Observable<SpecimenTable[]>;
  columnNames: string[] = ['BioSample ID', 'Material', 'Organism part/Cell type', 'Sex', 'Organism', 'Breed', 'Standard'];
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

  private query = {
    'sort': [{'id_number': 'desc'}],
    'from': 0,
    'size': 1000000,
    '_source': [
      'biosampleId',
      'material.text',
      'cellType.text',
      'organism.sex.text',
      'organism.organism.text',
      'organism.breed.text',
      'standardMet'],
    'aggs': {
      'all_specimen': {
        'global': {},
        'aggs': {
          'sex': {
            'terms': {
              'field': 'specimen.organism.sex.text',
              'size': 50}},
          'material': {
            'terms': {
              'field': 'specimen.material.text',
              'size': 50}},
          'organism': {
            'terms': {
              'field': 'specimen.organism.organism.text',
              'size': 50}},
          'organismPart': {
            'terms': {
              'field': 'specimen.specimenFromOrganism.organismPart.text',
              'size': 1000}},
          'breed': {
            'terms': {
              'field': 'specimen.organism.breed.text',
              'size': 1000}},
          'standard': {
            'terms': {
              'field': 'specimen.standardMet',
              'size': 1000}}}}}};
  error: string;

  constructor(private apiFileService: ApiFileService,
              private aggregationService: AggregationService,
              private exportService: ExportService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG specimens');
    this.spinner.show();
    this.optionsCsv = this.exportService.optionsCsv;
    this.optionsTabular = this.exportService.optionsTabular;
    this.optionsCsv['headers'] = this.columnNames;
    this.optionsTabular['headers'] = this.optionsTabular;
    this.sort_field = {id: 'bioSampleId', direction: 'asc'};
    this.apiFileService.getAllSpecimens(this.query).subscribe(
      data => {
        this.specimenList = data;
        if (this.specimenList) {
          this.spinner.hide();
        }
        this.aggregationService.getAggregations(this.specimenList, 'specimen');
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
      case 'Material': {
        this.sort_field['id'] = 'material';
        break;
      }
      case 'Organism part/Cell type': {
        this.sort_field['id'] = 'organismpart_celltype';
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
    if (typeof  this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
    this.exportSubscription.unsubscribe();
  }

}
