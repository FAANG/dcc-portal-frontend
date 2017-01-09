import { Component, Input } from '@angular/core';
@Component({
    selector: 'faang-filter',
    templateUrl: './faang-filter.component.html',
    styles: [`
      li.list-group-item.title {
        cursor: default;
      }
    `],
})
export class FaangFilterComponent{
  @Input() title: string;
  @Input() aggs: {key: string, doc_count: number}[];
  @Input() isFiltered: {[key: string] : boolean};
}
