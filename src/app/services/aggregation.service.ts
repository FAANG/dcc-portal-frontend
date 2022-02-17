import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

import {female_values, male_values} from '../shared/constants';
import {protocolNames} from '../shared/protocolnames';
import {replaceUnderscoreWithSpace} from '../shared/common_functions';

@Injectable({
  providedIn: 'root'
})
export class AggregationService {

  active_filters = {
    standard: [],
    study: [],
    species: [],
    assayType: [],
    target: [],
    instrument: [],
    sex: [],
    organism: [],
    datasetAccession: [],
    analysisType: [],
    breed: [],
    material: [],
    organismpart_celltype: [],
    archive: [],
    protocol_name: [],
    university_name: [],
    protocol_date: [],
    protocol_type: [],
    name: [],
    experimentTarget: [],
    paper_published: [],
    year: [],
    journal: [],
    datasetSource: [],
    ontology_type: [],
    ontology_status: [],
    project: [],
  };

  protocolNames = protocolNames;

  current_active_filters = [];

  data = new Subject();
  field = new Subject();

  constructor() { }

  getHumanName(data) {
    return this.protocolNames[data];
  }

  updateAggregation(aggs: {}, value: string): {} {
    aggs.hasOwnProperty(value) ? aggs[value] += 1 : aggs[value] = 1;
    return aggs;
  }

  getAggregations(recordList: any, type: string) {
    if (type === 'file' || type === 'organism' || type === 'specimen' || type == 'dataset' || 
        type === 'analysis') {
      let all_data = {};
      for (const key in recordList) { // recordList contains aggregations from API response
        all_data[key] = {};
        if (recordList[key]['buckets']) {
          recordList[key]['buckets'].forEach(element => {
            all_data[key][element['key']] = element['doc_count'];
          });
        } else {
          all_data[key] = recordList[key]['doc_count'];
        }
      }
      let paperPublishedProcessed = false;
      for (const key in all_data) {
        // process paperPublished values
        if ((key == 'paper_published' || key == 'paper_published_missing') && !paperPublishedProcessed) {
          let paper_values = {'Yes': 0, 'No': 0};
          for (const val in all_data['paper_published']) {
            val == 'true' ? paper_values['Yes'] += all_data['paper_published'][val] : paper_values['No'] += all_data['paper_published'][val];
          }
          if (all_data['paper_published_missing']) {
            paper_values['No'] += all_data['paper_published_missing'];
          }
          for (const val in paper_values) {
            if (paper_values[val] == 0) {
              delete paper_values[val];
            }
          }
          all_data['paper_published'] = paper_values;
          paperPublishedProcessed = true;
        }
        // process assayType
        if (key == 'assay_type') {
          for (const val in all_data['assay_type']) {
            if (val == 'transcription profiling by high throughput sequencing') {
              all_data['assay_type']['RNA-Seq'] = all_data['assay_type'][val];
              delete all_data['assay_type'][val];
              break;
            }
          }
        }
        // process sex
        if (key == 'sex') {
          let sex_values = {'male': 0, 'female': 0};
          for (const val in all_data['sex']) {
            male_values.indexOf(val) > -1 ? sex_values['male'] += all_data['sex'][val] 
            : female_values.indexOf(val) > -1 ? sex_values['female'] += all_data['sex'][val] 
            : sex_values[val] = all_data['sex'][val];
          }
          for (const val in sex_values) {
            if (sex_values[val] == 0) {
              delete sex_values[val];
            }
          }
          all_data['sex'] = sex_values;
        }
        // process Analysis Type
        if (key == 'analysis_type') {
          for (const val in all_data['analysis_type']) {
            all_data['analysis_type'][replaceUnderscoreWithSpace(val)] = all_data['analysis_type'][val];
            delete all_data['analysis_type'][val];
          }
        }
        all_data[key] = Object.entries(all_data[key]).sort(function (a: any, b: any) {
          return b[1] - a[1];
        })
      }
      this.data.next(all_data);
    }
    else if (type === 'article') {
      let journal = {};
      let year = {};
      let dataset_source = {};
      let all_data;
      for (const item of recordList) {
        journal = this.updateAggregation(journal, item['journal']);
        year = this.updateAggregation(year, item['year']);
        dataset_source = this.updateAggregation(dataset_source, item['datasetSource']);
      }
      delete dataset_source['All'];
      all_data = {
        journal: Object.entries(journal).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        year: Object.entries(year).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        datasetSource: Object.entries(dataset_source)
      };
      this.data.next(all_data);
    } else if (type === 'protocol') {
      let protocol_name = {};
      let university_name = {};
      let protocol_date = {};
      let protocol_type = {};
      let all_data;
      for (const item of recordList) {
        protocol_name = this.updateAggregation(protocol_name, item['protocol_name']);
        university_name = this.updateAggregation(university_name, item['university_name']);
        protocol_date = this.updateAggregation(protocol_date, item['protocol_date']);
        protocol_type = this.updateAggregation(protocol_type, item['protocol_type']);
      }
      all_data = {
        protocol_name: Object.entries(protocol_name).sort(function(a: any, b: any) {
          return b[1] - a[1];
        }),
        university_name: Object.entries(university_name).sort(function(a: any, b: any) {
          return b[1] - a[1];
        }),
        protocol_date: Object.entries(protocol_date).sort(function(a: any, b: any) {
          return b[1] - a[1];
        }),
        protocol_type: Object.entries(protocol_type).sort(function(a: any, b: any) {
          return b[1] - a[1];
        }),
      };
      this.data.next(all_data);
    } else if (type === 'protocol_experiments') {
      let protocol_type = {};
      let experiment_target = {};
      let assay_type = {};
      let all_data;
      for (const item of recordList) {
        const name = this.getHumanName(item['name']);
        protocol_type = this.updateAggregation(protocol_type, name);
        experiment_target = this.updateAggregation(experiment_target, replaceUnderscoreWithSpace(item['experimentTarget']));
        assay_type = this.updateAggregation(assay_type, item['assayType']);
      }
      all_data = {
        protocol_type: Object.entries(protocol_type).sort(function(a: any, b: any) {
          return b[1] - a[1];
        }),
        experiment_target: Object.entries(experiment_target).sort(function(a: any, b: any) {
          return b[1] - a[1];
        }),
        assay_type: Object.entries(assay_type).sort(function(a: any, b: any) {
          return b[1] - a[1];
        }),
      };
      this.data.next(all_data);
    } else if (type === 'ontology') {
      let ontology_type = {};
      let ontology_status = {};
      let project = {};
      for (const item of recordList) {
        ontology_type = this.updateAggregation(ontology_type, item['ontology_type']);
        ontology_status = this.updateAggregation(ontology_status, item['ontology_status']);
        project = this.updateAggregation(project, item['project']);
      }
      let all_data = {
        ontology_type: Object.entries(ontology_type).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        ontology_status: Object.entries(ontology_status).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        project: Object.entries(project).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
      };
      this.data.next(all_data);
    }
  }

  private updatePaperAggregation(paper_published: {}, value: string) {
    if (value === 'true') {
      paper_published = this.updateAggregation(paper_published, 'Yes');
    } else {
      paper_published = this.updateAggregation(paper_published, 'No');
    }
    return paper_published;
  }
}
