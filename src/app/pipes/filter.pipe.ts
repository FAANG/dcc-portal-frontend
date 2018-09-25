import { Pipe, PipeTransform } from '@angular/core';
import {AggregationService} from '../services/aggregation.service';
import {ExportService} from '../services/export.service';
import {male_values} from '../shared/sexvalues';

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
      this.exportService.data.next(value);
      return value;
    } else {
      const results = [];
      for (const item of value) {
        let will_be_in = true;
        for (const key of Object.keys(filter_field)) {
          for (const data_field of filter_field[key]) {
            if (type === 'dataset' && key === 'species') {
              let found = false;
              const species = [];
              for (const data of item['species']['_source']['species']) {
                if (data['text'] === data_field) {
                  found = true;
                }
                species.push(data['text']);
              }
              if (!found) {
                will_be_in = false;
              }
              // console.log(species.join(','));
            } else if (type === 'dataset' && key === 'archive') {
              let found = false;
              for (const data of item['archive']) {
                if (data === data_field) {
                  found = true;
                }
              }
              if (!found) {
                will_be_in = false;
              }
            } else if (key === 'sex') {
              let comparison_value: string;
              male_values.indexOf(item[key]) > -1 ? comparison_value = 'male' : comparison_value = 'female';
              if (comparison_value !== data_field) {
                will_be_in = false;
              }
            } else {
              if (item[key] !== data_field) {
                will_be_in = false;
              }
            }
          }
        }
        if (will_be_in) {
          results.push(item);
        }
      }
      this.aggregationService.getAggregations(results, type);
      this.exportService.data.next(results);
      return results;
    }
  }
}
