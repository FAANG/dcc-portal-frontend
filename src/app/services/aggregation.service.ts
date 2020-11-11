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
    datasetSource: []
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
    if (type === 'file') {
      let standard = {};
      let study = {};
      let species = {};
      let assay_type = {};
      let target = {};
      let instrument = {};
      let paper_published = {};
      let all_data;

      for (const item of recordList) {
        if (item['assayType'] === 'transcription profiling by high throughput sequencing') {
          item['assayType'] = 'RNA-Seq';
        }
        standard = this.updateAggregation(standard, item['standard']);
        study = this.updateAggregation(study, item['study']);
        species = this.updateAggregation(species, item['species']);
        assay_type = this.updateAggregation(assay_type, item['assayType']);
        target = this.updateAggregation(target, replaceUnderscoreWithSpace(item['target']));
        instrument = this.updateAggregation(instrument, item['instrument']);
        paper_published = this.updatePaperAggregation(paper_published, item['paperPublished']);
      }
      // each value in the filter contains two elements: 0 for the value and 1 for the count
      all_data = {
        standard: Object.entries(standard).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        study: Object.entries(study).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        species: Object.entries(species).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        assay_type: Object.entries(assay_type).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        target: Object.entries(target).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        instrument: Object.entries(instrument).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        paper_published: Object.entries(paper_published).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
      };
      this.data.next(all_data);
    } else if (type === 'organism') {
      let standard = {};
      let sex = {};
      let organism = {};
      let breed = {};
      let paper_published = {};
      let all_data;

      for (const item of recordList) {
        let sex_value: string;
        male_values.indexOf(item['sex']) > -1 ? sex_value = 'male' : (female_values.indexOf(item['sex']) > -1 ? sex_value = 'female' :
          sex_value = 'not determined');
        standard = this.updateAggregation(standard, item['standard']);
        sex = this.updateAggregation(sex, sex_value);
        organism = this.updateAggregation(organism, item['organism']);
        breed = this.updateAggregation(breed, item['breed']);
        paper_published = this.updatePaperAggregation(paper_published, item['paperPublished']);
      }

      all_data = {
        standard: Object.entries(standard).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        sex: Object.entries(sex).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        organism: Object.entries(organism).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        breed: Object.entries(breed).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        paper_published: Object.entries(paper_published).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
      };
      this.data.next(all_data);
    } else if (type === 'specimen') {
      let all_data = {};
      for (const key in recordList) { // recordList contains aggregations from API response
        all_data[key] = {};
        recordList[key]['buckets'].forEach(element => {
          all_data[key][element['key']] = element['doc_count'];
        });
        // process sex values
        if (key == 'sex') {
          let sex_values = {'male': 0, 'female': 0};
          for (const val in all_data['sex']) {
            male_values.indexOf(val) > -1 ? sex_values['male'] += all_data['sex'][val] 
            : female_values.indexOf(val) > -1 ? sex_values['female'] += all_data['sex'][val] 
            : sex_values[val] = all_data['sex'][val];
          }
          all_data['sex'] = sex_values;
        }
        // process paperPublished values
        if (key == 'paperPublished') {
          let paper_values = {'Yes': 0, 'No': 0};
          for (const val in all_data['paperPublished']) {
            val == 'true' ? paper_values['Yes'] += all_data['paperPublished'][val] : paper_values['No'] += all_data['paperPublished'][val];
          }
          all_data['paperPublished'] = paper_values;
        }
        all_data[key] = Object.entries(all_data[key]).sort(function (a: any, b: any) {
          return b[1] - a[1];
        })
      }
      this.data.next(all_data);
    } else if (type === 'dataset') {
      let standard = {};
      let species = {};
      let assay_type = {};
      let archive = {};
      let paper_published = {};
      let all_data;
      for (const item of recordList) {
        standard = this.updateAggregation(standard, item['standard']);
        for (const spec of item['species'].split(',')) {
          species = this.updateAggregation(species, spec);
        }
        for (const arch of item['archive'].split(',')) {
          archive = this.updateAggregation(archive, arch);
        }
        for (let my_type of item['assayType'].split(',')) {
          if (my_type === 'transcription profiling by high throughput sequencing') {
            my_type = 'RNA-Seq';
          }
          assay_type = this.updateAggregation(assay_type, my_type);
        }
        paper_published = this.updatePaperAggregation(paper_published, item['paperPublished']);
      }

      all_data = {
        standard: Object.entries(standard).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        species: Object.entries(species).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        assay_type: Object.entries(assay_type).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        archive: Object.entries(archive).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        paper_published: Object.entries(paper_published).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
      };
      this.data.next(all_data);
    } else if (type === 'analysis') {
      let standard = {};
      let species = {};
      let assay_type = {};
      let dataset = {};
      let analysis_type = {};
      let all_data;
      for (const item of recordList) {
        let assay_type_value = 'not provided';
        if (item['assayType']) {
          assay_type_value = item['assayType'];
        }
        standard = this.updateAggregation(standard, item['standard']);
        for (const spec of item['species'].split(',')) {
          species = this.updateAggregation(species, spec);
        }
        assay_type = this.updateAggregation(assay_type, assay_type_value);
        dataset = this.updateAggregation(dataset, item['datasetAccession']);
        analysis_type = this.updateAggregation(analysis_type, replaceUnderscoreWithSpace(item['analysisType']));
      }

      all_data = {
        standard: Object.entries(standard).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        species: Object.entries(species).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        assay_type: Object.entries(assay_type).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        dataset: Object.entries(dataset).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        analysis_type: Object.entries(analysis_type).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
      };
      this.data.next(all_data);
    } else if (type === 'article') {
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
