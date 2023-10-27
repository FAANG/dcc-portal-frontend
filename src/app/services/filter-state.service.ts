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

  updateUrlParams(queryObj, componentName) {
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
      this.router.navigate([componentName], {queryParams: params});
    });
    return aggrSubscription;
  }

}
