import { Pipe, PipeTransform } from '@angular/core';
import {AggregationService} from '../services/aggregation.service';
import {ExportService} from '../services/export.service';
import {female_values, male_values} from '../shared/constants';
import {protocolNames} from '../shared/protocolnames';
import {replaceUnderscoreWithSpace} from '../shared/common_functions';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  constructor(private aggregationService: AggregationService, private exportService: ExportService) {}

  transform(value: any, filter_field: {}, type: string): any {
    if (!value) {
      return [];
    }
    if (typeof  filter_field === 'undefined') {
      if (type === 'dataset') {
        const results_for_download = [];
        for (const item of value) {
          const item_for_download = JSON.parse(JSON.stringify(item));
          const species = [];
          for (const data of item['species']['_source']['species']) {
            species.push(data['text']);
          }
          item_for_download['species'] = species.join(';');
          item_for_download['assayType'] = item_for_download['assayType'].join(';');
          results_for_download.push(item_for_download);
        }
        this.exportService.data.next(results_for_download);
      } else if (type === 'organism' || type === 'specimen') {
        const results_for_download = [];
        for (const item of value) {
          const item_for_download = JSON.parse(JSON.stringify(item));
          delete item_for_download['idNumber'];
          results_for_download.push(item_for_download);
        }
        this.exportService.data.next(results_for_download);
      } else if (type === 'protocol') {
        const results_for_download = [];
        for (const item of value) {
          const item_for_download = JSON.parse(JSON.stringify(item));
          delete item_for_download['key'];
          results_for_download.push(item_for_download);
        }
        this.exportService.data.next(results_for_download);
      } else {
        this.exportService.data.next(value);
      }
      return value;
    } else {
      const results = [];
      const results_for_download = [];
      for (const item of value) {
        const item_for_download = JSON.parse(JSON.stringify(item));
        if (type === 'specimen' || type === 'organism') {
          delete item_for_download['idNumber'];
        }
        if (type === 'protocol' || type === 'protocol_experiments') {
          delete item_for_download['key'];
          item_for_download['name'] = protocolNames[item_for_download['name']];
        }
        let will_be_in = true;
        for (const key of Object.keys(filter_field)) {
          for (const filter_value of filter_field[key]) {
            if (type === 'dataset' && key === 'species') {
              let found = false;
              for (const data of item['species'].split(',')) {
                if (data === filter_value) {
                  found = true;
                }
              }
              if (!found) {
                will_be_in = false;
              }
            } else if (type === 'dataset' && key === 'archive') {
              let found = false;
              for (const data of item['archive'].split(',')) {
                if (data === filter_value) {
                  found = true;
                }
              }
              if (!found) {
                will_be_in = false;
              }
            } else if (type === 'dataset' && key === 'assayType') {
              let found = false;
              for (let data of item['assayType'].split(',')) {
                if (data === 'transcription profiling by high throughput sequencing') {
                  data = 'RNA-Seq';
                }
                if (data === filter_value) {
                  found = true;
                }
              }
              if (!found) {
                will_be_in = false;
              }
            } else if (key === 'sex') {
              let comparison_value: string;
              male_values.indexOf(item[key]) > -1 ? comparison_value = 'male' : (female_values.indexOf(item[key]) > -1 ?
                comparison_value = 'female' : comparison_value = 'not determined');
              if (comparison_value !== filter_value) {
                will_be_in = false;
              }
            } else if (key === 'paper_published') {
              if (filter_value === 'Yes') {
                if (item['paperPublished'] !== 'true') {
                  will_be_in = false;
                }
              } else if (filter_value === 'No') {
                if (item['paperPublished'] === 'true') {
                  will_be_in = false;
                }
              }
            } else if (key === 'journal_title') {
              if (item['journal'] !== filter_value) {
                will_be_in = false;
              }
            } else if (key === 'publication_year') {
              if (item['publicationYear'] !== filter_value) {
                will_be_in = false;
              }
            } else if (type === 'file' && key === 'assayType') {
              let search_for;
              if (item[key] === 'transcription profiling by high throughput sequencing') {
                search_for = 'RNA-Seq';
              } else {
                search_for = item[key];
              }
              if (search_for !== filter_value) {
                will_be_in = false;
              }
            }  else if (type === 'analysis' && key === 'analysisType') {
              if (replaceUnderscoreWithSpace(item[key]) !== filter_value) {
                will_be_in = false;
              }
            }  else if (type === 'file' && key === 'target') {
              if (replaceUnderscoreWithSpace(item[key]) !== filter_value) {
                will_be_in = false;
              }
            }  else if (type === 'protocol_experiments' && key === 'experimentTarget') {
              if (replaceUnderscoreWithSpace(item[key]) !== filter_value) {
                will_be_in = false;
              }
            }  else if (type === 'analysis' && key === 'assayType' && !item[key] && filter_value === 'not provided') {
              will_be_in = true;
            } else {
              if (item[key] !== filter_value) {
                will_be_in = false;
              }
            }
          }
        }
        if (will_be_in) {
          results.push(item);
          results_for_download.push(item_for_download);
        }
      }
      this.aggregationService.getAggregations(results, type);
      this.exportService.data.next(results_for_download);
      return results;
    }
  }
}
