import { Injectable } from '@angular/core';
import {AggregationService} from './aggregation.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilterStateService {


  constructor(private aggregationService: AggregationService,
              private router: Router,) { }

  updateUrlParams(queryObj, componentRoute) {
    // setting urls params based on filters
    const aggrSubscription: Subscription = this.aggregationService.field.subscribe((data) => {
      const params = {};
      for (const key of Object.keys(data)) {
        if (data[key] && data[key].length !== 0) {
          params[key] = data[key];
        }
      }
      //update url for search term and sorting
      if (queryObj['search']) {
        params['searchTerm'] = queryObj['search'];
      }
      if (queryObj['sort']) {
        params['sortTerm'] = queryObj['sort'][0]
        params['sortDirection'] = queryObj['sort'][1]
      }
      this.router.navigate(componentRoute, {queryParams: params});
    });
    return aggrSubscription;
  }

  setUpAggregationFilters(params){
    // set up filters on pageLoad based on queryParams
    const filters = {};
    for (const key in params) {
      if (key !== 'searchTerm' && key !== 'sortTerm' && key !== 'sortDirection' && key !== 'pageIndex'){
        if (Array.isArray(params[key])) {
          filters[key] = params[key];
          for (const value of params[key]) {
            this.aggregationService.current_active_filters.push(value);
            this.aggregationService.active_filters[key].push(value);
          }
        } else {
          filters[key] = [params[key]];
          this.aggregationService.current_active_filters.push(params[key]);
          this.aggregationService.active_filters[key].push(params[key]);
        }
      }
    }
    this.aggregationService.field.next(this.aggregationService.active_filters);
    return filters
  }

  resetFilter() {
    for (const key of Object.keys(this.aggregationService.active_filters)) {
      this.aggregationService.active_filters[key] = [];
    }
    this.aggregationService.current_active_filters = [];
  }

}




