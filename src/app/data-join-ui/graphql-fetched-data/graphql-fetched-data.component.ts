import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { graphql_task_status_ws_url, graphql_task_status_ws_url_local } from 'src/app/shared/constants';
import { indexData } from '../constants';

@Component({
  selector: 'app-graphql-fetched-data',
  templateUrl: './graphql-fetched-data.component.html',
  styleUrls: ['./graphql-fetched-data.component.css']
})
export class GraphqlFetchedDataComponent implements OnInit {


  @Input() assignTaskWithFiltersQuery = '';
  @Input() fetchFromTaskWithSelectedFieldsQuery = '';
  @Input() firstIndexName;
  @Input() indexDetailsArray;
  @Input() tableRecordsList;
  @Input() tableColumns;

  @Output() fetchedDataChange = new EventEmitter();

  fetchedData = '';
  showSpinner = false;
  socket = null;
  taskId = '';
  
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {}

  flattenTableRecordsObject(newTableColumns,dataObject, prefix, resObj){
    if(dataObject)
    for( const key of Object.keys(dataObject)){
      if( key !== 'join'){
        const propName = prefix ? prefix + '.' + key : key;
        if(typeof dataObject[key] === 'object'){
          this.flattenTableRecordsObject(newTableColumns,dataObject[key], propName, resObj);
        }else{
          if(!newTableColumns.includes(propName))
          newTableColumns.push(propName);
          resObj[propName] = dataObject[key];
        }
      }
    }
    return resObj;
  }

  convertResponseDataToTableRecordObject(newTableRecordsList,newTableColumns,recordsList, currentESIndexIdx, resObj = {}){
    const currentESIndexName = this.indexDetailsArray[currentESIndexIdx].indexName;
    
    recordsList.forEach(({node})=>{
      const tableRecordObject = {...resObj, ...this.flattenTableRecordsObject(newTableColumns,node, currentESIndexName, resObj)};
      const nextESIndexIdx = currentESIndexIdx + 1;
      const nextESIndexName = this.indexDetailsArray[nextESIndexIdx]?.indexName;
      if(node?.['join']?.[nextESIndexName]?.['edges']?.length){
        this.convertResponseDataToTableRecordObject(newTableRecordsList,newTableColumns,node['join'][nextESIndexName]['edges'], nextESIndexIdx, tableRecordObject);  
      }else{
        newTableRecordsList.push(tableRecordObject);
      }
    })
    
  }

  updateTableRecordsList(data){

    const newTableRecordsList = [];
    const newTableColumns = [];

    if(this.indexDetailsArray.length){
      const currentESIndexIdx = 0;
      const recordsList = data[indexData[this.indexDetailsArray[currentESIndexIdx].indexName].fetchFromTaskFieldName]['edges'];
      this.convertResponseDataToTableRecordObject(newTableRecordsList,newTableColumns,recordsList,currentESIndexIdx);
    }

    this.fetchedDataChange.emit({newTableRecordsList,newTableColumns});
  }

  assignTaskWithFilters(){
    this.showSpinner = true;
    console.log(this.assignTaskWithFiltersQuery);
    console.log(this.fetchFromTaskWithSelectedFieldsQuery)
    const gqlObject = gql(this.assignTaskWithFiltersQuery);
    console.log(gqlObject);
    const result = this.apollo
      .query({
        query: 
        gqlObject
      })
      .subscribe(
        ({ data, loading }:any) => {
          console.log(data,loading);
          console.log(this.firstIndexName)
          this.taskId = data?.[indexData[this.firstIndexName.value].assignAsTaskFieldName]?.['id'];
          this.setSocket(this.taskId);
        }
      );
  }

  fetchFromTaskWithSelectedFields(){

    const graphQLQueryWithTaskId = this.fetchFromTaskWithSelectedFieldsQuery.replace("<%TASK_ID%>",this.taskId)
    const gqlObject = gql(graphQLQueryWithTaskId);
    console.log(graphQLQueryWithTaskId);

    const result = this.apollo
      .query({
        query: 
        gqlObject
        
      })
      .subscribe(
        ({ data, loading }:any) => {
          console.log(data);
          this.updateTableRecordsList(data);
          console.log(this.tableRecordsList);
          console.log(this.tableColumns);
          this.showSpinner = false;
        }
      );
  }


  setSocket(task_id = '') {
    const url = graphql_task_status_ws_url + task_id?.split('-')?.join('_') + '/';

    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      
      console.log('WebSockets connection created.');
      // this.socket.send('I am message');
    
    };

    this.socket.onmessage = (event) => {
      
      console.log('event received',event);
      const data = JSON.parse(event.data)['response']['data'];
      if (data['errors']) {
        console.log(data['errors']);
      }

      if(data === 'task finished'){
        this.fetchFromTaskWithSelectedFields();
        this.socket.close();
        this.socket = null;
      }



      

      
    };
  }


}
