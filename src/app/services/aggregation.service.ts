import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FileTable} from '../shared/interfaces';

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
  };

  current_active_filters = [];

  data = new Subject();
  field = new Subject();

  constructor() { }

  getAggregations(fileList: any, type: string) {
    if (type === 'file') {
      const standard = {};
      const study = {};
      const species = {};
      const assay_type = {};
      const instrument = {};
      let all_data;

      for (const item of fileList) {
        standard.hasOwnProperty(item['standard']) ? standard[item['standard']] += 1 : standard[item['standard']] = 1;
        study.hasOwnProperty(item['study']) ? study[item['study']] += 1 : study[item['study']] = 1;
        species.hasOwnProperty(item['species']) ? species[item['species']] += 1 : species[item['species']] = 1;
        assay_type.hasOwnProperty(item['assayType']) ? assay_type[item['assayType']] += 1 : assay_type[item['assayType']] = 1;
        instrument.hasOwnProperty(item['instrument']) ? instrument[item['instrument']] += 1 : instrument[item['instrument']] = 1;
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
      };
      this.data.next(all_data);
    } else if (type === 'organism') {
        const standard = {};
        const sex = {};
        const organism = {};
        const breed = {};
        let all_data;

        for (const item of fileList) {
          standard.hasOwnProperty(item['standard']) ? standard[item['standard']] += 1 : standard[item['standard']] = 1;
          sex.hasOwnProperty(item['sex']) ? sex[item['sex']] += 1 : sex[item['sex']] = 1;
          organism.hasOwnProperty(item['organism']) ? organism[item['organism']] += 1 : organism[item['organism']] = 1;
          breed.hasOwnProperty(item['breed']) ? breed[item['breed']] += 1 : breed[item['breed']] = 1;
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
        };
      this.data.next(all_data);
    } else if (type === 'specimen') {
      const standard = {};
      const sex = {};
      const organism = {};
      const material = {};
      const organismpart_celltype = {};
      const breed = {};
      let all_data;

      for (const item of fileList) {
        standard.hasOwnProperty(item['standard']) ? standard[item['standard']] += 1 : standard[item['standard']] = 1;
        sex.hasOwnProperty(item['sex']) ? sex[item['sex']] += 1 : sex[item['sex']] = 1;
        organism.hasOwnProperty(item['organism']) ? organism[item['organism']] += 1 : organism[item['organism']] = 1;
        material.hasOwnProperty(item['material']) ? material[item['material']] += 1 : material[item['material']] = 1;
        organismpart_celltype.hasOwnProperty(item['organismpart_celltype']) ? organismpart_celltype[item['organismpart_celltype']] += 1 :
          organismpart_celltype[item['organismpart_celltype']] = 1;
        breed.hasOwnProperty(item['breed']) ? breed[item['breed']] += 1 : breed[item['breed']] = 1;
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
      };
      this.data.next(all_data);
    } else if (type === 'dataset') {
      const standard = {};
      const species = {};
      const instrument = {};
      const archive = {};
      let all_data;
      for (const item of fileList) {
        standard.hasOwnProperty(item['standard']) ? standard[item['standard']] += 1 : standard[item['standard']] = 1;
        for (const spec of item['species']['_source']['species']) {
          species.hasOwnProperty(spec['text']) ? species[spec['text']] += 1 : species[spec['text']] = 1;
        }
        // for (const value of item['instrument']) {
        //   instrument.hasOwnProperty(value) ? instrument[value] += 1 : instrument[value] = 1;
        // }
        archive.hasOwnProperty(item['archive']) ? archive[item['archive']] += 1 : archive[item['archive']] = 1;
      }

      all_data = {
        standard: Object.entries(standard).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        species: Object.entries(species).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        instrument: Object.entries(instrument).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
        archive: Object.entries(archive).sort(function (a: any, b: any) {
          return b[1] - a[1];
        }),
      };
      console.log(all_data);
      this.data.next(all_data);
    }
  }
}
