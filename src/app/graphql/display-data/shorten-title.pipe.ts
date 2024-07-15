import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenTitle',
  standalone: true
})
export class ShortenTitlePipe implements PipeTransform {
  transform(value: any) {
    return value.replace(/.text$/, '');
  }
}
