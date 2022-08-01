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

  constructor() { }

  ngOnInit(): void {
    console.log('init')
  }

  ngOnChanges(changes:SimpleChanges){
    console.log(changes)
  }

  trackByFn(index) {
    return index;  
  }

  handleFieldChekboxClick(index,fieldIndex){
    const formControlToUpdate = (<FormArray>this.firstIndexFieldsAndFilters.get("formFields")).at(fieldIndex);
    let currentVal = !formControlToUpdate.value.isSelected;
    formControlToUpdate.get('isSelected').patchValue(currentVal)
  }

  handleFilterValueChange(){
    console.log("e.target.value")
    // const formControlToUpdate = (<FormArray>this.firstIndexFieldsAndFilters.get("formFields")).at(fieldIndex).get('filter');
    // let currentVal = e.target.value;
    // formControlToUpdate.patchValue(currentVal);
    
  }

  handleFocusOut(e){
    console.log('focusout')
  }
}
