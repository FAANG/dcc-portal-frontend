import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-graphql-display-fetched-data',
  templateUrl: './graphql-display-fetched-data.component.html',
  styleUrls: ['./graphql-display-fetched-data.component.css']
})
export class GraphqlDisplayFetchedDataComponent {
  @Input() tableRecordsList = [];
  @Input() tableColumns = [];
  @Input() tableDataSource;
}
