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
  assignTaskWithFiltersQuery = '';
  fetchFromTaskWithSelectedFieldsQuery = '';
  indexDetailsArray = [];

  constructor() {}

  
  
  updateIndexFieldsAndFilters(index = 'firstIndex'){

    const indexToUpdate = index === 'firstIndex' ? this.firstIndexName : this.secondIndexName;
    
    if(indexToUpdate.value){
      
      const updatedIndexFieldsAndFilters = new FormGroup({
        formFields: new FormArray(indexData[indexToUpdate.value]['fields'].map(
          (formFieldName:string)=>new FormGroup({
            fieldName : new FormControl(formFieldName),
            isSelected : new FormControl(false),
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
    let currentObj = query['query'][indexData[this.indexDetailsArray[0].indexName].assignAsTaskFieldName];

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
        set(currentFieldObj,[indexData[this.indexDetailsArray[i].indexName].fetchFromTaskFieldName,'edges','node'].join('.'),this.getObjWithFieldsAndFiltersForGraphQLQuery(i,'fields'));
        set(currentFieldObj,[indexData[this.indexDetailsArray[i].indexName].fetchFromTaskFieldName,'edges','node','join'].join('.'),{});
      
        fieldObj = {...currentFieldObj};
        currentFieldObj = fieldObj[indexData[this.indexDetailsArray[i].indexName].fetchFromTaskFieldName]['edges']['node']['join'];
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

    // assigning task and specifying filters
    const assignTaskWithFiltersObj = {}
    set(assignTaskWithFiltersObj,[indexData[this.indexDetailsArray[0].indexName].assignAsTaskFieldName],{ id: true, status: true });
    set(assignTaskWithFiltersObj,[indexData[this.indexDetailsArray[0].indexName].assignAsTaskFieldName,'__args','filter'].join('.'),{...filterObj});
    const assignTaskWithFiltersQueryObj = cleanObject({query: {...assignTaskWithFiltersObj}}); 
    this.ensureJoinInQueryFilterArgument(assignTaskWithFiltersQueryObj,filterObj);

    const assignTaskWithFiltersQuery = JSON.stringify(jsonToGraphQLQuery(assignTaskWithFiltersQueryObj,{pretty:true}),null,2).replace(/\\r/g, '\r').replace(/\\n/g, '\n').replace(/\\"/g, "\"").split('\"').slice(1, -1).join('\"');
    
    // fetching the data with selected fields by specifying task id
    set(fieldObj,[indexData[this.indexDetailsArray[0].indexName].fetchFromTaskFieldName,'__args'].join('.'),{taskId : "<%TASK_ID%>"});
    const fetchFromTaskWithSelectedFieldsQueryObj = cleanObject({query: {...fieldObj}}); 
    const fetchFromTaskWithSelectedFieldsQuery = JSON.stringify(jsonToGraphQLQuery(fetchFromTaskWithSelectedFieldsQueryObj,{pretty:true}),null,2).replace(/\\r/g, '\r').replace(/\\n/g, '\n').replace(/\\"/g, "\"").split('\"').slice(1, -1).join('\"');
    
    return [assignTaskWithFiltersQuery, fetchFromTaskWithSelectedFieldsQuery];
  }

  updateGraphQLQuery(){
    const [assignTaskWithFiltersQuery, fetchFromTaskWithSelectedFieldsQuery] = this.buildQuery();
    this.assignTaskWithFiltersQuery = assignTaskWithFiltersQuery;
    this.fetchFromTaskWithSelectedFieldsQuery = fetchFromTaskWithSelectedFieldsQuery;
  }

  ngOnInit(): void {
    this.updateIndexFieldsAndFilters();
  }
  
}
