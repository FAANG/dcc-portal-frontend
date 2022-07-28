import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { indexDetails } from './constants';
import { IndexPanelContainerService } from './index-panel-container/index-panel-container.service';
@Component({
  selector: 'app-graphql-api-ui',
  templateUrl: './graphql-api-ui.component.html',
  styleUrls: ['./graphql-api-ui.component.css'],
  
})
export class GraphqlApiUiComponent implements OnInit {

  indexNames = Object.keys(indexDetails);
  fieldsQueryData = {};
  query = 'query { }';
  // constructor(private indexPanelContainerService: IndexPanelContainerService) { }

  ngOnInit() {}
  
  onQueryDataChange({indexName,updatedQueryData}){
    console.log('emit', indexName)
    // this.fieldsQueryData = updatedQueryData;
    this.fieldsQueryData[indexName] = {...updatedQueryData};
    console.log(this.fieldsQueryData)
  }

  onFieldsQueryDataInit({indexName,serviceReference}){
    this.fieldsQueryData[indexName]= serviceReference;
  }

  buildQuery(){
    this.query = JSON.stringify(this.fieldsQueryData)
  }

  
}
