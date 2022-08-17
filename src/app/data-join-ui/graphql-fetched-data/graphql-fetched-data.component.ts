import { Component, Input, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { graphql_task_status_ws_url } from 'src/app/shared/constants';

@Component({
  selector: 'app-graphql-fetched-data',
  templateUrl: './graphql-fetched-data.component.html',
  styleUrls: ['./graphql-fetched-data.component.css']
})
export class GraphqlFetchedDataComponent implements OnInit {


  @Input() graphQLQuery = '';

  fetchedData = '';
  showSpinner = false;
  socket;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {}

  fetchData(){
    this.showSpinner = true;
    const gqlObject = gql(this.graphQLQuery);
    console.log(gqlObject);
    const result = this.apollo
      .query({
        query: gql(`
          query{
            hello{
              id
              status
            }
          }
        `),
      })
      .subscribe(
        ({ data, loading }:any) => {
          console.log(data,loading);
          this.setSocket(data?.['hello']?.['id'] || 'abcd');
        }
      );
      // .pipe(map(response => response.data));
      console.log(result);
  }


  setSocket(task_id) {
    const url = graphql_task_status_ws_url + task_id.split('-').join('_') + '/';

    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      
      console.log('WebSockets connection created.');
      // this.socket.send('I am message');
    
    };

    this.socket.onmessage = (event) => {
      this.showSpinner = false;
    
      console.log('event received',event);
      const data = JSON.parse(event.data)['response'];
      if (data['errors']) {
        console.log(data['errors']);
      }

      this.socket.close();
    };
  }


}
