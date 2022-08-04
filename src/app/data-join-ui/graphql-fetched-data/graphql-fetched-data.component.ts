import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphql-fetched-data',
  templateUrl: './graphql-fetched-data.component.html',
  styleUrls: ['./graphql-fetched-data.component.css']
})
export class GraphqlFetchedDataComponent implements OnInit {


  @Input() graphQLQuery = '';

  fetchedData = '';

  constructor() { }

  ngOnInit(): void {
  }

  fetchData(){
    
  }

}
