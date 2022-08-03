import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { merge, set } from 'lodash';
import {jsonToGraphQLQuery} from 'json-to-graphql-query';
import { indexData, cleanObject } from './constants';


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
  secondIndexFieldsAndFilters = new FormGroup({});

  graphQLQuery = '';

  constructor() {}

  
  
  updateIndexFieldsAndFilters(index = 'firstIndex'){

    const indexToUpdate = index === 'firstIndex' ? this.firstIndexName : this.secondIndexName;
    
    if(indexToUpdate.value){
      
      const updatedIndexFieldsAndFilters = new FormGroup({
        formFields: new FormArray(indexData[indexToUpdate.value]['fields'].map(
          (formFieldName:string)=>new FormGroup({
            fieldName : new FormControl(formFieldName),
            isSelected : new FormControl(true),
            filter: new FormControl(''),
          })
        ))
      });

      if(index === 'firstIndex'){
        this.firstIndexFieldsAndFilters = updatedIndexFieldsAndFilters;
      }else{
        this.secondIndexFieldsAndFilters = updatedIndexFieldsAndFilters;
      }
      
    }
  }

  updateGraphQLQuery(){
    this.graphQLQuery = JSON.stringify(this.firstIndexFieldsAndFilters.value) + JSON.stringify(this.secondIndexFieldsAndFilters.value);
    const obj = {};
    const formFields = this.firstIndexFieldsAndFilters.get('formFields').value;
    for(let {fieldName,isSelected,filter} of formFields){
      merge(obj,set({},fieldName,filter));
    }

    console.log(obj,jsonToGraphQLQuery(cleanObject(obj)));
  }

  ngOnInit(): void {
    this.updateIndexFieldsAndFilters();
  }
  
}
