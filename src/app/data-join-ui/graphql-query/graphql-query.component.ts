import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-graphql-query',
  templateUrl: './graphql-query.component.html',
  styleUrls: ['./graphql-query.component.css']
})
export class GraphqlQueryComponent implements OnInit {

  @Input() graphQLQuery = '';

  constructor() { }

  ngOnInit(): void {
  }

}
