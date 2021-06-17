import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {Subscription} from 'rxjs';
import {AggregationService} from '../../services/aggregation.service';
import {reverseProtocolNames} from '../protocolnames';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() filterSize: number;
  aggregation = [];
  subsription: Subscription;
  isCollapsed = true;
  itemLimit: number;
  current_active_filters = this.aggregationService.current_active_filters;

  constructor(private aggregationService: AggregationService) { }

  ngOnInit() {
    this.itemLimit = this.filterSize;
    this.subsription = this.aggregationService.data.subscribe(
      (data: any) => {
        // data is a map, keys are active_filters names defined in service/aggregatin_service.ts,
        // values are the corresponding aggregation e.g. { "FAANG":675,"Legacy": 9834}
        if (this.title === 'Standard') {
          this.aggregation = data['standard'];
        } else if (this.title === 'Study') {
          this.aggregation = data['study'];
        } else if (this.title === 'Dataset') {
          this.aggregation = data['dataset'];
        } else if (this.title === 'Species') {
          this.aggregation = data['species'];
        } else if (this.title === 'Assay type') {
          this.aggregation = data['assay_type'];
        } else if (this.title === 'Analysis type') {
          this.aggregation = data['analysis_type'];
        } else if (this.title === 'Instrument') {
          this.aggregation = data['instrument'];
        } else if (this.title === 'Sex') {
          this.aggregation = data['sex'];
        } else if (this.title === 'Organism') {
          this.aggregation = data['organism'];
        } else if (this.title === 'Breed') {
          this.aggregation = data['breed'];
        } else if (this.title === 'Material') {
          this.aggregation = data['material'];
        } else if (this.title === 'Organism part/Cell type') {
          this.aggregation = data['organismpart_celltype'];
        } else if (this.title === 'Archive') {
          this.aggregation = data['archive'];
        } else if (this.title === 'Protocol Name') {
          this.aggregation = data['protocol_name'];
        } else if (this.title === 'Organisation') {
          this.aggregation = data['university_name'];
        } else if (this.title === 'Protocol Year') {
          this.aggregation = data['protocol_date'];
        } else if (this.title === 'Protocol type') {
          this.aggregation = data['protocol_type'];
        } else if (this.title === 'Protocol') {
          this.aggregation = data['protocol_type'];
        } else if (this.title === 'Experiment target') {
          this.aggregation = data['experiment_target'];
        } else if (this.title === 'Target') {
          this.aggregation = data['target'];
        } else if (this.title === 'Paper published') {
          this.aggregation = data['paper_published'];
        } else if (this.title === 'Journal') {
          this.aggregation = data['journal'];
        } else if (this.title === 'Year') {
          // this.aggregation = data['publication_year'];
          this.aggregation = data['year'];
        } else if (this.title === 'Dataset source') {
          this.aggregation = data['datasetSource'];
        } else if (this.title === 'Ontology Type') {
          this.aggregation = data['ontology_type'];
        } else if (this.title === 'Ontology Status') {
          this.aggregation = data['ontology_status'];
        } else if (this.title === 'Project') {
          this.aggregation = data['project'];
        }
      }
    );
  }

  onButtonClick(key: string, title: string) {
    let data_key: string;
    // the data_key refers to active_filters defined in service/aggregatin_service.ts
    switch (title) {
      case 'Standard': {
        data_key = 'standard';
        break;
      }
      case 'Study': {
        data_key = 'study';
        break;
      }
      case 'Dataset': {
        data_key = 'datasetAccession';
        break;
      }
      case 'Species': {
        data_key = 'species';
        break;
      }
      case 'Assay type': {
        data_key = 'assayType';
        break;
      }
      case 'Analysis type': {
        data_key = 'analysisType';
        break;
      }
      case 'Instrument': {
        data_key = 'instrument';
        break;
      }
      case 'Sex' : {
        data_key = 'sex';
        break;
      }
      case 'Organism': {
        data_key = 'organism';
        break;
      }
      case 'Breed': {
        data_key = 'breed';
        break;
      }
      case 'Material': {
        data_key = 'material';
        break;
      }
      case 'Organism part/Cell type': {
        data_key = 'organismpart_celltype';
        break;
      }
      case 'Archive': {
        data_key = 'archive';
        break;
      }
      case 'Organisation': {
        data_key = 'university_name';
        break;
      }
      case 'Protocol Year': {
        data_key = 'protocol_date';
        break;
      }
      case 'Protocol type': {
        data_key = 'protocol_type';
        break;
      }
      case 'Protocol': {
        data_key = 'name';
        key = this.getReverseHumanName(key);
        break;
      }
      case 'Experiment target': {
        data_key = 'experimentTarget';
        break;
      }
      case 'Target': {
        data_key = 'target';
        break;
      }
      case 'Paper published': {
        data_key = 'paper_published';
        break;
      }
      case 'Journal': {
        data_key = 'journal';
        break;
      }
      case 'Year': {
        data_key = 'year';
        break;
      }
      case 'Dataset source': {
        data_key = 'datasetSource';
        break;
      }
      case 'Ontology Type': {
        data_key = 'ontology_type';
        break;
      }
      case 'Ontology Status': {
        data_key = 'ontology_status';
        break;
      }
      case 'Project': {
        data_key = 'project';
        break;
      }
    }
    const index = this.aggregationService.active_filters[data_key].indexOf(key);
    if (index > -1) {
      this.aggregationService.active_filters[data_key].splice(index, 1);
    } else {
      this.aggregationService.active_filters[data_key].push(key);
    }

    const active_filter_index = this.aggregationService.current_active_filters.indexOf(key);
    if (index > -1) {
      this.aggregationService.current_active_filters.splice(active_filter_index, 1);
    } else {
      this.aggregationService.current_active_filters.push(key);
    }

    this.aggregationService.field.next(this.aggregationService.active_filters);
  }

  toggleCollapse() {
    if (this.isCollapsed) {
      this.itemLimit = 10000;
      this.isCollapsed = false;
    } else {
      this.itemLimit = this.filterSize;
      this.isCollapsed = true;
    }
  }

  getReverseHumanName(data) {
    return reverseProtocolNames[data];
  }

  ngOnDestroy() {
    this.subsription.unsubscribe();
  }
}
