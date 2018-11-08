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
  specimenListShort: Observable<SpecimenTable[]>;
  specimenListLong: Observable<SpecimenTable[]>;
  columnNames: string[] = ['BioSample ID', 'Material', 'Organism part/Cell type', 'Sex', 'Organism', 'Breed', 'Standard'];
  spanClass = 'glyphicon glyphicon-arrow-down';
  defaultClass = 'glyphicon glyphicon-sort';
  selectedColumn = 'BioSample ID';
  sort_field: SortParams;
  filter_field: {};
  aggrSubscription: Subscription;
  exportSubscription: Subscription;
  specimenListLongSubscription: Subscription;
  downloadData = false;

  optionsCsv;
  optionsTabular;
  data = {};

  // Local variable for pagination
  p = 1;

  private query = {
    'sort': [{'id_number': 'desc'}],
    'from': 0,
    '_source': [
      'biosampleId',
      'material.text',
      'cellType.text',
      'organism.sex.text',
      'organism.organism.text',
      'organism.breed.text',
      'standardMet',
      'id_number'],
  };
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
    this.sort_field = {id: 'idNumber', direction: 'desc'};
    this.apiFileService.getAllSpecimens(this.query, 30).subscribe(
      data => {
        this.specimenListShort = data;
        if (this.specimenListShort) {
          this.spinner.hide();
        }
      },
      error => {
        this.error = error;
        this.spinner.hide();
      }
    );
    this.specimenListLong = this.apiFileService.getAllSpecimens(this.query, 100000);
    this.specimenListLongSubscription = this.specimenListLong.subscribe((data) => {
      this.aggregationService.getAggregations(data, 'specimen');
    });
    this.aggrSubscription = this.aggregationService.field.subscribe((data) => {
      this.filter_field = data;
    });
    this.exportSubscription = this.exportService.data.subscribe((data) => {
      this.data = data;
    });
  }

  onTableClick(event: any) {
    let event_class;
    if (event['srcElement']['firstElementChild']) {
      event_class = event['srcElement']['firstElementChild']['classList']['value'];
    } else {
      event_class = event['srcElement']['className'];
    }
    this.selectedColumn = event['srcElement']['id'];
    this.selectColumn();
    this.chooseClass(event_class);
  }

  chooseClass(event_class: string) {
    if (this.selectedColumn === 'BioSample ID') {
      if (event_class === 'glyphicon glyphicon-arrow-down') {
        this.spanClass = 'glyphicon glyphicon-arrow-up';
        this.sort_field['direction'] = 'asc';
      } else {
        this.spanClass = 'glyphicon glyphicon-arrow-down';
        this.sort_field['direction'] = 'desc';
      }
    } else {
      if (event_class === this.defaultClass) {
        this.spanClass = 'glyphicon glyphicon-arrow-down';
        this.sort_field['direction'] = 'desc';
      } else if (event_class === 'glyphicon glyphicon-arrow-down') {
        this.spanClass = 'glyphicon glyphicon-arrow-up';
        this.sort_field['direction'] = 'asc';
      } else {
        this.spanClass = 'glyphicon glyphicon-sort';
        this.sort_field['direction'] = 'desc';
        this.sort_field['id'] = 'idNumber';
        this.selectedColumn = 'BioSample ID';
        this.spanClass = 'glyphicon glyphicon-arrow-down';
      }
    }
  }

  selectColumn() {
    switch (this.selectedColumn) {
      case 'BioSample ID': {
        this.sort_field['id'] = 'idNumber';
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
    this.specimenListLongSubscription.unsubscribe();
  }

}
