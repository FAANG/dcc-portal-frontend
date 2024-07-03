import { Component, OnInit } from '@angular/core';
import {AggregationService} from '../../services/aggregation.service';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-active-filter',
    templateUrl: './active-filter.component.html',
    styleUrls: ['./active-filter.component.css'],
    standalone: true,
    imports: [MatButton]
})
export class ActiveFilterComponent implements OnInit {
  aggs: any[] = [];
  data: {[index: string]:any} = {};

  constructor(private aggregationService: AggregationService) { }

  ngOnInit() {
    this.aggs = this.aggregationService.current_active_filters;
    this.data = this.aggregationService.active_filters;
    this.aggregationService.field.subscribe(data => {
      this.aggs = this.aggregationService.current_active_filters;
      this.data = this.aggregationService.active_filters;
    });
  }

  clearFilter(field: string) {
    const index = this.aggregationService.current_active_filters.indexOf(field);
    this.aggregationService.current_active_filters.splice(index, 1);
    for (const key of Object.keys(this.data)) {
      const my_index = this.data[key].indexOf(field);
      if (my_index > -1) {
        this.data[key].splice(my_index, 1);
      }
    }
    this.aggregationService.field.next(this.data);
  }

}
