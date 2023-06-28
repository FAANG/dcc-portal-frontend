import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiFiltersService {
  current_api_filters: {}

  constructor() { }

  set_current_api_filters(filters){
    this.current_api_filters = filters;
  }

  get_current_api_filters(){
    return this.current_api_filters
  }
  
}
