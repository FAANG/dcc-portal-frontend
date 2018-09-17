import { Pipe, PipeTransform } from '@angular/core';
import {AggregationService} from '../services/aggregation.service';
import {ExportService} from '../services/export.service';

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
              for (const data of item['species']['_source']['species']) {
                if (data['text'] === data_field) {
                  found = true;
                }
              }
              if (!found) {
                will_be_in = false;
              }
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
