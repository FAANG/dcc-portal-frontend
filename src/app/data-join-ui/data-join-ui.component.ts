import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { indexData } from './constants';

@Component({
  selector: 'app-data-join-ui',
  templateUrl: './data-join-ui.component.html',
  styleUrls: ['./data-join-ui.component.css']
})
export class DataJoinUiComponent implements OnInit {

  firstIndexName = new FormControl('');
  firstIndices = Object.keys(indexData);
  firstIndexFieldsAndFilters = new FormGroup({});

  secondIndexName = new FormControl();
  secondIndices = [];

  constructor() { }

  updateFirstIndexFieldsAndFilters(){
    if(this.firstIndexName.value){
      console.log(this.firstIndexFieldsAndFilters.value)
    
      this.firstIndexFieldsAndFilters = new FormGroup({
        formFields: new FormArray(indexData[this.firstIndexName.value]['fields'].map(
          (formFieldName:string)=>new FormGroup({
            fieldName : new FormControl({value: formFieldName}),
            isSelected : new FormControl(true),
            filter: new FormControl(''),
          })
        ))
      });
      console.log(this.firstIndexFieldsAndFilters.value)
    
    
    }
  }

  ngOnInit(): void {
    this.updateFirstIndexFieldsAndFilters();
  }

  
}
