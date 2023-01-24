import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenTitle'
})
export class ShortenTitlePipe implements PipeTransform {
  transform(value: any) {
    return value.replace(/.text$/, '');
  }
}
