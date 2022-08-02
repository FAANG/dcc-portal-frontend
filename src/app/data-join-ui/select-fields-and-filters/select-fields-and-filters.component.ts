import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { indexData } from '../constants';

@Component({
  selector: 'app-select-fields-and-filters',
  templateUrl: './select-fields-and-filters.component.html',
  styleUrls: ['./select-fields-and-filters.component.css']
})
export class SelectFieldsAndFiltersComponent implements OnInit {

  @Input() firstIndexName;
  @Input() firstIndexFieldsAndFilters;
  @Input() secondIndexName;
  @Input() secondIndexFieldsAndFilters;

  constructor() { }

  ngOnInit(): void {
  }

  trackByFn(index,item) {
    return this.firstIndexName?.value + item.fieldName;  
  }

  handleFilterValueChange(e,index='firstIndex',fieldIndex){
    
    const indexToUpdate = index === 'firstIndex' ? this.firstIndexFieldsAndFilters : this.secondIndexFieldsAndFilters;
    
    const formControlToUpdate = (<FormArray>indexToUpdate.get("formFields")).at(fieldIndex).get('filter');
    let currentVal = e.target.value;
    formControlToUpdate.patchValue(currentVal);
    
  }

}
