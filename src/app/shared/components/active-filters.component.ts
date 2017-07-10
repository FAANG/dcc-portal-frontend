import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from'@angular/router';
@Component({
    selector: 'active-filters',
    templateUrl: './active-filters.component.html',
    styles: [`
      li.list-group-item.title {
        cursor: default;
      }
    `],
})
export class ActiveFiltersComponent{
  @Input() routekey: string;
  @Input() aggs: {key: string, doc_count: number}[];
  @Input() isFiltered: {[key: string] : boolean};
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){ };
  clearFilter(key: string){
    this.isFiltered[key] = !this.isFiltered[key];
    let oldParams = this.activatedRoute.snapshot.queryParams;
    let newParams = {}
    for (let filter in oldParams){
      newParams[filter] = oldParams[filter]
    }
    let empty = true
    let filters: string[] = [];
    newParams[this.routekey] = []
    for (let filter in this.isFiltered){
      if (this.isFiltered[filter]){
        filters.push(filter)
        empty = false
      }
    }
    newParams[this.routekey] = filters.join("|")
    if (empty){
      delete newParams[this.routekey]
    }
    this.router.navigate([], {relativeTo:this.activatedRoute, queryParams: newParams})
  }
}