import { Component, Input, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
@Component({
  selector: 'app-graphql-fetched-data',
  templateUrl: './graphql-fetched-data.component.html',
  styleUrls: ['./graphql-fetched-data.component.css']
})
export class GraphqlFetchedDataComponent implements OnInit {


  @Input() graphQLQuery = '';

  fetchedData = '';
  
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {}

  fetchData(){
    const gqlObject = gql(this.graphQLQuery);
    console.log(gqlObject);
    const result = this.apollo
      .query({
        query: gql(this.graphQLQuery),
      })
      .subscribe(
        ({ data, loading }) => {
          console.log(data,loading);
        }
      );
      // .pipe(map(response => response.data));
      console.log(result);
  }


}
