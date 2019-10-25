import { Pipe, PipeTransform } from '@angular/core';
import {SortParams} from '../shared/interfaces';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: any, sortParam: SortParams): any {
    if (!value) {
      return [];
    }
    const parameters = sortParam['id'];
    const direction = sortParam['direction'];
    let first = 1;
    let second = -1;

    if (direction === 'asc') {
      first = 1;
      second = -1;
    } else {
      first = -1;
      second = 1;
    }

    // TODO: alternative sorting method: FAANG standard always on top, need to be discussed
    if (parameters === 'datasetAccession' || parameters === 'accession') {
      return value.sort(function (a, b) {
        if (a['standard'] === b['standard']) {
          const one = parseInt(a[parameters].match(/[a-zA-z]+([0-9]+)$/)[1], 10);
          const two = parseInt(b[parameters].match(/[a-zA-z]+([0-9]+)$/)[1], 10);
          return one > two ? first : (two > one ? second : 0);
        }
        return a['standard'] > b['standard'] ? 1 : -1;
      });
    } else {
      return value.sort(function (a, b) {
        return a[parameters] > b[parameters] ? first : (b[parameters] > a[parameters] ? second : 0);
      });
    }
  }
}
