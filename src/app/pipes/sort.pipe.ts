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
    return value.sort(function (a, b) {
      return a[parameters] > b[parameters] ? first : (b[parameters] > a[parameters] ? second : 0);
    });
  }
}
