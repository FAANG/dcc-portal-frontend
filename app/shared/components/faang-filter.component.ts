import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from'@angular/router';
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
  @Input() routekey: string;
  @Input() aggs: {key: string, doc_count: number}[];
  @Input() isFiltered: {[key: string] : boolean};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){ };
  toggleFilter(key: string){
    console.log("I am the key", key)
    console.log("Filtered", this.isFiltered)
    this.isFiltered[key] = !this.isFiltered[key];
    console.log("Reversed filtered",this.isFiltered)
    let oldParams = this.activatedRoute.snapshot.queryParams;
    console.log("Existing params", oldParams)
    let newParams = {}
    for (let filter in oldParams){
      newParams[filter] = oldParams[filter]
    }
    newParams[this.routekey] = []
    console.log("Wiped params", newParams)
    for (let filter in this.isFiltered){
      if (this.isFiltered[filter]){
        newParams[this.routekey].push(filter)
      }
    }
    console.log("Edited Params", newParams)
    this.router.navigate([], {relativeTo:this.activatedRoute, queryParams: newParams})
  }
}
