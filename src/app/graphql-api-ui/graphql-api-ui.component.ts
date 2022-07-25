import { Component, OnInit } from '@angular/core';
import { indexDetails } from './constants';
@Component({
  selector: 'app-graphql-api-ui',
  templateUrl: './graphql-api-ui.component.html',
  styleUrls: ['./graphql-api-ui.component.css']
})
export class GraphqlApiUiComponent implements OnInit {

  indexNames = Object.keys(indexDetails);
  // indexDetails = ['analysis'];
  constructor() { }

  ngOnInit(): void {
  }

}
