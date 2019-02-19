import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

import {female_values, male_values} from '../shared/sexvalues';
import {protocolNames} from '../shared/protocolnames';

@Injectable({
  providedIn: 'root'
})
export class AggregationService {

  active_filters = {
    standard: [],
    study: [],
    species: [],
    assayType: [],
    instrument: [],
    sex: [],
    organism: [],
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
  };

  protocolNames = protocolNames;

  current_active_filters = [];

  data = new Subject();
  field = new Subject();

  constructor() { }

  getHumanName(data) {
    return this.protocolNames[data];
  }

  getAggregations(fileList: any, type: string) {
    if (type === 'file') {
      const standard = {};
      const study = {};
      const species = {};
      const assay_type = {};
      const instrument = {};
      const paper_published = {};
      let all_data;

      for (const item of fileList) {
        standard.hasOwnProperty(item['standard']) ? standard[item['standard']] += 1 : standard[item['standard']] = 1;
        study.hasOwnProperty(item['study']) ? study[item['study']] += 1 : study[item['study']] = 1;
        species.hasOwnProperty(item['species']) ? species[item['species']] += 1 : species[item['species']] = 1;
        assay_type.hasOwnProperty(item['assayType']) ? assay_type[item['assayType']] += 1 : assay_type[item['assayType']] = 1;
        instrument.hasOwnProperty(item['instrument']) ? instrument[item['instrument']] += 1 : instrument[item['instrument']] = 1;
        if (item['paperPublished'] === 'true') {
          paper_published.hasOwnProperty('Yes') ? paper_published['Yes'] += 1 : paper_published['Yes'] = 1;
        } else {
          paper_published.hasOwnProperty('No') ? paper_published['No'] += 1 : paper_published['No'] = 1;
        }
      }

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
        instrument: Object.entries(instrument).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        paper_published: Object.entries(paper_published).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
      };
      this.data.next(all_data);
    } else if (type === 'organism') {
      const standard = {};
      const sex = {};
      const organism = {};
      const breed = {};
      const paper_published = {};
      let all_data;

      for (const item of fileList) {
        let sex_value: string;
        male_values.indexOf(item['sex']) > -1 ? sex_value = 'male' : (female_values.indexOf(item['sex']) > -1 ? sex_value = 'female' :
          sex_value = 'not determined');
        standard.hasOwnProperty(item['standard']) ? standard[item['standard']] += 1 : standard[item['standard']] = 1;
        sex.hasOwnProperty(sex_value) ? sex[sex_value] += 1 : sex[sex_value] = 1;
        organism.hasOwnProperty(item['organism']) ? organism[item['organism']] += 1 : organism[item['organism']] = 1;
        breed.hasOwnProperty(item['breed']) ? breed[item['breed']] += 1 : breed[item['breed']] = 1;
        if (item['paperPublished'] === 'true') {
          paper_published.hasOwnProperty('Yes') ? paper_published['Yes'] += 1 : paper_published['Yes'] = 1;
        } else {
          paper_published.hasOwnProperty('No') ? paper_published['No'] += 1 : paper_published['No'] = 1;
        }
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
      const standard = {};
      const sex = {};
      const organism = {};
      const material = {};
      const organismpart_celltype = {};
      const breed = {};
      const paper_published = {};
      let all_data;

      for (const item of fileList) {
        let sex_value: string;
        male_values.indexOf(item['sex']) > -1 ? sex_value = 'male' : (female_values.indexOf(item['sex']) > -1 ? sex_value = 'female' :
          sex_value = 'not determined');
        standard.hasOwnProperty(item['standard']) ? standard[item['standard']] += 1 : standard[item['standard']] = 1;
        sex.hasOwnProperty(sex_value) ? sex[sex_value] += 1 : sex[sex_value] = 1;
        organism.hasOwnProperty(item['organism']) ? organism[item['organism']] += 1 : organism[item['organism']] = 1;
        material.hasOwnProperty(item['material']) ? material[item['material']] += 1 : material[item['material']] = 1;
        organismpart_celltype.hasOwnProperty(item['organismpart_celltype']) ? organismpart_celltype[item['organismpart_celltype']] += 1 :
          organismpart_celltype[item['organismpart_celltype']] = 1;
        breed.hasOwnProperty(item['breed']) ? breed[item['breed']] += 1 : breed[item['breed']] = 1;
        if (item['paperPublished'] === 'true') {
          paper_published.hasOwnProperty('Yes') ? paper_published['Yes'] += 1 : paper_published['Yes'] = 1;
        } else {
          paper_published.hasOwnProperty('No') ? paper_published['No'] += 1 : paper_published['No'] = 1;
        }
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
        material: Object.entries(material).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        organismpart_celltype: Object.entries(organismpart_celltype).sort(function (a: any, b: any) {
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
    } else if (type === 'dataset') {
      const standard = {};
      const species = {};
      const assay_type = {};
      const archive = {};
      const paper_published = {};
      let all_data;
      for (const item of fileList) {
        standard.hasOwnProperty(item['standard']) ? standard[item['standard']] += 1 : standard[item['standard']] = 1;
        for (const spec of item['species']['_source']['species']) {
          species.hasOwnProperty(spec['text']) ? species[spec['text']] += 1 : species[spec['text']] = 1;
        }
        // archive.hasOwnProperty(item['archive']) ? archive[item['archive']] += 1 : archive[item['archive']] = 1;
        for (const arch of item['archive']) {
          archive.hasOwnProperty(arch) ? archive[arch] += 1 : archive[arch] = 1;
        }
        for (const type of item['assayType']) {
          assay_type.hasOwnProperty(type) ? assay_type[type] += 1 : assay_type[type] = 1;
        }
        if (item['paperPublished'] === 'true') {
          paper_published.hasOwnProperty('Yes') ? paper_published['Yes'] += 1 : paper_published['Yes'] = 1;
        } else {
          paper_published.hasOwnProperty('No') ? paper_published['No'] += 1 : paper_published['No'] = 1;
        }
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
    } else if (type === 'protocol') {
      const protocol_name = {};
      const university_name = {};
      const protocol_date = {};
      const protocol_type = {};
      let all_data;
      for (const item of fileList) {
        protocol_name.hasOwnProperty(item['protocol_name']) ? protocol_name[item['protocol_name']] += 1 :
          protocol_name[item['protocol_name']] = 1;
        university_name.hasOwnProperty((item['university_name'])) ? university_name[item['university_name']] += 1 :
          university_name[item['university_name']] = 1;
        protocol_date.hasOwnProperty(item['protocol_date']) ? protocol_date[item['protocol_date']] += 1 :
          protocol_date[item['protocol_date']] = 1;
        protocol_type.hasOwnProperty(item['protocol_type']) ? protocol_type[item['protocol_type']] += 1 :
          protocol_type[item['protocol_type']] = 1;
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
      const protocol_type = {};
      const experiment_target = {};
      const assay_type = {};
      let all_data;
      for (const item of fileList) {
        const name = this.getHumanName(item['name']);
        protocol_type.hasOwnProperty(name) ? protocol_type[name] += 1 : protocol_type[name] = 1;
        experiment_target.hasOwnProperty(item['experimentTarget']) ? experiment_target[item['experimentTarget']] += 1 :
          experiment_target[item['experimentTarget']] = 1;
        assay_type.hasOwnProperty(item['assayType']) ? assay_type[item['assayType']] += 1 : assay_type[item['assayType']] = 1;
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
}
