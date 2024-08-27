import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiFiltersService {
  current_api_filters: {[index: string]: any} = {};

  constructor() { }

  set_current_api_filters(filters: {[index: string]: any}) {
    this.current_api_filters = filters;
  }

  get_current_api_filters() {
    return this.current_api_filters;
  }

}
