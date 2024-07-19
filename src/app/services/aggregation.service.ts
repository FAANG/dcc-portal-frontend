import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

import {female_values, male_values, published_article_source} from '../shared/constants';
import {protocolNames} from '../shared/protocolnames';
import {replaceUnderscoreWithSpace} from '../shared/common_functions';

@Injectable({
  providedIn: 'root'
})
export class AggregationService {

  active_filters: {[index: string]: any} = {
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
    source: [],
    datasetSource: [],
    project: [],
    type: [],
    projects: [],
    status_activity: []
  };

  protocolNames: {[index: string]: any} = protocolNames;

  current_active_filters: any[] = [];

  data = new Subject();
  field = new Subject();

  constructor() { }

  getHumanName(data: string) {
    return this.protocolNames[data];
  }

  getHumanReadableValue(data: string) {
    return data.split(/(?=[A-Z])/).join(' ').toLowerCase();
  }

  getAggregations(recordList: any, type: string) {
    if (type === 'file' || type === 'organism' || type === 'specimen' || type === 'dataset' ||
        type === 'analysis' || type === 'protocol' || type === 'protocol_experiments'
        || type === 'article' || type === 'ontology') {
      const all_data: {[index: string]: any} = {};
      for (const key in recordList) { // recordList contains aggregations from API response
        if (recordList[key]) {
          all_data[key] = {};
          if (recordList[key]['buckets']) {
            recordList[key]['buckets'].forEach((bucket: { [x: string]: any; }) => {
              if (bucket['key']) {
                all_data[key][bucket['key']] = bucket['doc_count'];
              }
            });
          } else {
            all_data[key] = recordList[key]['doc_count'];
          }
        }
      }
      let paperPublishedProcessed = false;
      for (const key in all_data) {
        if (all_data[key]) {
          // process paperPublished values
          if ((key === 'paper_published' || key === 'paper_published_missing') && !paperPublishedProcessed) {
            const paper_values: { [index: string]: any } = {'Yes': 0, 'No': 0};
            for (const val in all_data['paper_published']) {
              if (all_data['paper_published'][val]) {
                val ===
                'true' ? paper_values['Yes'] += all_data['paper_published'][val] : paper_values['No'] += all_data['paper_published'][val];
              }
            }
            if (all_data['paper_published_missing']) {
              paper_values['No'] += all_data['paper_published_missing'];
            }
            for (const val in paper_values) {
              if (paper_values[val] === 0) {
                delete paper_values[val];
              }
            }
            all_data['paper_published'] = paper_values;
            paperPublishedProcessed = true;
          }
          // process assayType
          if (key === 'assay_type') {
            for (const val in all_data['assay_type']) {
              if (val === 'transcription profiling by high throughput sequencing') {
                all_data['assay_type']['RNA-Seq'] = all_data['assay_type'][val];
                delete all_data['assay_type'][val];
                break;
              }
            }
          }
          // process sex
          if (key === 'sex') {
            const sex_values: { [index: string]: any } = {'male': 0, 'female': 0};
            for (const val in all_data['sex']) {
              if (all_data['sex'][val]) {
                male_values.indexOf(val) > -1 ? sex_values['male'] += all_data['sex'][val]
                  : female_values.indexOf(val) > -1 ? sex_values['female'] += all_data['sex'][val]
                    : sex_values[val] = all_data['sex'][val];
              }
            }
            for (const val in sex_values) {
              if (sex_values[val] === 0) {
                delete sex_values[val];
              }
            }
            all_data['sex'] = sex_values;
          }

          // process article source
          if (key === 'source') {
            const source_values: { [index: string]: any } = {'published': 0, 'preprint': 0};
            for (const prop in all_data['source']) {
              if (prop.toUpperCase() === 'PPR') {
                source_values['preprint'] += all_data['source'][prop];
              } else if (published_article_source.indexOf(prop.toUpperCase()) > -1) {
                source_values['published'] += all_data['source'][prop];
              } else {
                source_values[prop] = all_data['source'][prop];
              }
            }
            for (const prop in source_values) {
              if (source_values[prop] === 0) {
                delete source_values[prop];
              }
            }
            all_data['source'] = source_values;
          }
          // process Analysis Type and Experiment Target
          if (key === 'analysis_type' || key === 'experiment_target') {
            for (const val in all_data[key]) {
              if (all_data[key][val]) {
                all_data[key][replaceUnderscoreWithSpace(val)] = all_data[key][val];
                delete all_data[key][val];
              }
            }
          }
          // process protocol name for experiment protocols
          if (key === 'protocol_type') {
            for (const val in all_data[key]) {
              if (all_data[key][val]) {
                all_data['protocol_type'][this.getHumanName(val)] = all_data[key][val];
                delete all_data[key][val];
              }
            }
          }
          // process ontology type
          if (key === 'type') {
            for (const val in all_data[key]) {
              if (all_data[key][val]) {
                all_data['type'][this.getHumanReadableValue(val)] = all_data[key][val];
                delete all_data[key][val];
              }
            }
          }
          all_data[key] = Object.entries(all_data[key]).sort(function (a: any, b: any) {
            return b[1] - a[1];
          });
        }
      }
      this.data.next(all_data);
    }
  }
}
