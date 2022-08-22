import { Component, Input, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { graphql_task_status_ws_url, graphql_task_status_ws_url_local } from 'src/app/shared/constants';

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
  taskId = '';

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {}

  addTask(){
    this.showSpinner = true;
    const gqlObject = gql(this.graphQLQuery);
    console.log(gqlObject);
    const result = this.apollo
      .query({
        query: 
        // gqlObject
        gql(`
        query{
          allOrganismsAsTask(
            filter:{
              basic:{

              }
              join:{
                specimen:{}
              }
            }
          ){
            id
            status
          }
        }
        `),
      })
      .subscribe(
        ({ data, loading }:any) => {
          console.log(data,loading);
          this.taskId = data?.['allOrganismsAsTask']?.['id'];
          this.setSocket(this.taskId);
        }
      );
      // .pipe(map(response => response.data));
      console.log(result);
  }

  fetchTaskResult(){
    const gqlObject = gql(this.graphQLQuery);
    console.log(gqlObject);
    const result = this.apollo
      .query({
        query: 
        // gqlObject
        gql(`
        query{
          allOrganismsTaskResult(taskId:"${this.taskId}"){
            edges{
              node{
                biosampleId
                name
                organism{
                  text
                }
                join{
                  specimen{
                    edges{
                      node{
                        biosampleId
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
        `),
      })
      .subscribe(
        ({ data, loading }:any) => {
          console.log(data);
          this.showSpinner = false;
    
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
      
      console.log('event received',event);
      const data = JSON.parse(event.data)['response']['data'];
      if (data['errors']) {
        console.log(data['errors']);
      }

      if(data === 'task finished'){
        this.fetchTaskResult();
        
      }



      

      // this.socket.close();
    };
  }


}
