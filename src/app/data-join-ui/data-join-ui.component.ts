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

  indexDetailsArray = [];

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

  ensureJoinInQueryFilterArgument(query, filterObj){
    let currentObj = query['query'][indexData[this.indexDetailsArray[0].indexName].multipleRecordsResolverFieldName];

    if(!currentObj['__args']?.['filter']?.['join']){
      set(currentObj,'__args.filter.join',{});
    }

    currentObj = currentObj['__args']['filter']['join'];
    let filterReference = filterObj['join'];

    for(let i = 1 ;i < this.indexDetailsArray.length; i++){
     
        currentObj[this.indexDetailsArray[i].indexName] = {...filterReference[this.indexDetailsArray[i].indexName]};
        if(i < this.indexDetailsArray.length - 1){
          currentObj[this.indexDetailsArray[i].indexName]['join'] = {...filterReference[this.indexDetailsArray[i].indexName]['join']};
          currentObj = currentObj[this.indexDetailsArray[i].indexName]['join'];
          filterReference = filterObj[this.indexDetailsArray[i].indexName]['join'];
        }
    }


  }

  getObjWithFieldsAndFiltersForGraphQLQuery(indexFormArrayIndex:number,objType = 'fields'){
    const obj = {};
    for(let {fieldName,isSelected,filter} of this.indexDetailsArray[indexFormArrayIndex]['indexForm'].get('formFields').value){
      merge(obj,set({},fieldName,objType === 'fields' ? isSelected : filter.split(',')));
    }
    return obj;
  }

  buildQuery(){
    let fieldObj = {};
    let filterObj = {};
    this.indexDetailsArray = [{indexName:this.firstIndexName.value,indexForm:this.firstIndexFieldsAndFilters},{indexName:this.secondIndexName.value,indexForm:this.secondIndexFieldsAndFilters}];
    let currentFieldObj = {};
    let currentFilterObj = {};

    for(let i = 0; i< this.indexDetailsArray.length; i++){

      // For selecting fields
      
      if(i === 0){
        set(currentFieldObj,[indexData[this.indexDetailsArray[i].indexName].multipleRecordsResolverFieldName,'edges','node'].join('.'),this.getObjWithFieldsAndFiltersForGraphQLQuery(i,'fields'));
        set(currentFieldObj,[indexData[this.indexDetailsArray[i].indexName].multipleRecordsResolverFieldName,'edges','node','join'].join('.'),{});
      
        fieldObj = {...currentFieldObj};
        currentFieldObj = fieldObj[indexData[this.indexDetailsArray[i].indexName].multipleRecordsResolverFieldName]['edges']['node']['join'];
      }else{
        set(currentFieldObj,[this.indexDetailsArray[i].indexName,'edges','node'].join('.'),this.getObjWithFieldsAndFiltersForGraphQLQuery(i,'fields'));
        set(currentFieldObj,[this.indexDetailsArray[i].indexName,'edges','node','join'].join('.'),{});
        currentFieldObj = currentFieldObj[this.indexDetailsArray[i].indexName]['edges']['node']['join'];
      }

      // For selecting filters
      if(i === 0){
        set(currentFilterObj,'basic',this.getObjWithFieldsAndFiltersForGraphQLQuery(i,'filters'));
        set(currentFilterObj,'join',{});
        filterObj = {...currentFilterObj};
      }else{
        set(currentFilterObj,[this.indexDetailsArray[i].indexName,'basic'].join('.'),this.getObjWithFieldsAndFiltersForGraphQLQuery(i,'filters'));
        set(currentFilterObj,[this.indexDetailsArray[i].indexName,'join'].join('.'),{});
      }

      currentFilterObj = filterObj['join'];

    }

    set(fieldObj,[indexData[this.indexDetailsArray[0].indexName].multipleRecordsResolverFieldName,'__args','filter'].join('.'),{...filterObj});
    const query = cleanObject({query:{...fieldObj}});
    
    this.ensureJoinInQueryFilterArgument(query,filterObj);
    
    return JSON.stringify(jsonToGraphQLQuery(query,{pretty:true}),null,2).replace(/\\r/g, '\r').replace(/\\n/g, '\n').replace(/\\"/g, "\"").split('\"').slice(1, -1).join('\"');
  }

  updateGraphQLQuery(){
    this.graphQLQuery = this.buildQuery();
  }

  ngOnInit(): void {
    this.updateIndexFieldsAndFilters();
  }
  
}
