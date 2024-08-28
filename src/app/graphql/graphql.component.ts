import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {indexFieldsData} from './graphqlConstants';
import {Apollo, gql} from 'apollo-angular';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {graphql_ws_url} from '../shared/constants';
import {IndexFiltersComponent} from './index-filters/index-filters.component';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import {Title} from '@angular/platform-browser';
import {ApiDataService} from '../services/api-data.service';
import { ShortenTitlePipe } from './display-data/shorten-title.pipe';
import { TitleCasePipe } from '@angular/common';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { DisplayDataComponent } from './display-data/display-data.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderComponent } from '../shared/header/header.component';
import { GraphQLModule } from '../graphql.module';

@Component({
  selector: 'app-graphql',
  templateUrl: './graphql.component.html',
  styleUrls: ['./graphql.component.css'],
  standalone: true,
  imports: [HeaderComponent, MatToolbar, FlexModule, MatFormField, MatLabel, MatSelect, FormsModule, ReactiveFormsModule, MatOption,
    IndexFiltersComponent, MatButton, MatProgressBar, DisplayDataComponent, MatDialogTitle, CdkScrollable, MatDialogContent,
    MatDialogActions, MatDialogClose, TitleCasePipe, ShortenTitlePipe, GraphQLModule]
})
export class GraphqlComponent implements OnInit, OnDestroy  {
  @ViewChild(IndexFiltersComponent ) filtersComponent!: IndexFiltersComponent ;
  @ViewChild('filtersDialog') filtersDialog!: TemplateRef<any>;
  @ViewChild('columnsDialog') columnsDialog!: TemplateRef<any>;

  firstIndexName = new FormControl('');
  secondIndexName = new FormControl('');
  firstIndices: string[] = [];
  secondIndices = [];
  selectedIndicesArray: any[] = [];
  selectedColumns = {};
  indicesSelected = false;
  showProgressBar = false;
  searchSuccess = false;
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;
  indexData: {[index: string]: any} = {};
  dataTable: any[] = [];
  socket: any;
  taskId = '';
  errors: any[] = [];
  columnValuesCount = 0;
  cursor = '';
  private querySubscription: Subscription = Subscription.EMPTY;

  constructor(
    private apollo: Apollo,
    public dialog: MatDialog,
    private titleService: Title,
    private dataService: ApiDataService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('GraphQL Search');
    this.displayedColumns = [];
    this.selectedIndicesArray = [];
    this.indexData = indexFieldsData;
    this.firstIndices = Object.keys(indexFieldsData);
    this.dataTable = [];
  }

  onIndexChange(indexName: string, event: { value: any; }) {
    if (indexName === 'firstIndex') {
      this.selectedIndicesArray = [];
      this.dataTable = [];
      this.selectedIndicesArray[0] = event.value;
      if (this.firstIndexName.value) {
        this.secondIndices = this.indexData[this.firstIndexName.value]['joinIndices'];
        this.secondIndexName.reset();
      }
    } else if (indexName === 'secondIndex') {
      this.selectedIndicesArray[1] = event.value;
      this.dataTable = [];
    }
    this.searchSuccess = false;
    this.indicesSelected = this.selectedIndicesArray.length === 2 && !this.selectedIndicesArray.includes('');

    // select defaults fields on index change
    if (this.indicesSelected) {
      for (let i = 0; i < this.selectedIndicesArray.length; i += 1) {
        const index = this.selectedIndicesArray[i];
        this.selectedColumns[index] = this.indexData[index]['defaults'];
      }
    }
  }


  fetchJoinedResult(mainButtonClick: Boolean) {
    this.searchSuccess = false;
    // get filters
    const filtersObj = this.filtersComponent.getFormValues();
    if (filtersObj === null) {
      if (mainButtonClick) {
        this.dialog.open(this.filtersDialog);
        this.showProgressBar = false;
      }
      return;
    }
    const graphqlFiltersObj = this.generateGraphqlFilters(filtersObj);

    // get selected fields
    const leftIndexFields = Array.from(new Set(this.selectedColumns[this.selectedIndicesArray[0]]));

    if (leftIndexFields.length > 0) {
      this.showProgressBar = true;
      const queryString = this.buildGraphqlJoinQuery(graphqlFiltersObj);

      this.querySubscription = this.apollo.watchQuery<any>({
        query: gql`
         ${queryString}
        `
      })
        .valueChanges
        .subscribe(({ data }) => {
          if (this.firstIndexName.value) {
            this.taskId = data?.[this.indexData[this.firstIndexName.value].celeryQueryName]?.['id'];
            this.setSocket(this.taskId);
          }
        });
    } else {
      this.dialog.open(this.columnsDialog);
      this.showProgressBar = false;
      return;
    }
  }

  includeOntologyTermsField(selectedIndexFields: any[], indexName: string) {
    for (const col of selectedIndexFields) {
      const colName = indexName + '.' + col;
      if (this.indexData[indexName]['ontologyTermsLink'] && colName in this.indexData[indexName]['ontologyTermsLink']) {
        const regex = new RegExp( `^${indexName}.` );
        const colNameNoIndex = this.indexData[indexName]['ontologyTermsLink'][colName].replace(regex, '');
        selectedIndexFields.push(colNameNoIndex);
      }
    }
  }


  fetchFilteredResult() {
    this.searchSuccess = false;
    this.showProgressBar = true;

    // get selected fields
    const leftIndexFields = Array.from(new Set(this.selectedColumns[this.selectedIndicesArray[0]]));
    const joinIndexFields = Array.from(new Set(this.selectedColumns[this.selectedIndicesArray[1]]));

    // add ontologyTerms field to leftIndexFields if column name is found in ontologyTermsLink object
    this.includeOntologyTermsField(leftIndexFields, this.selectedIndicesArray[0]);
    this.includeOntologyTermsField(joinIndexFields, this.selectedIndicesArray[1]);

    const leftIndexColumns = leftIndexFields.map(field => `${this.selectedIndicesArray[0]}.${field}`);
    const joinIndexColumns = joinIndexFields.map(field => `${this.selectedIndicesArray[1]}.${field}`);

    if (leftIndexColumns.length > 0) {
      this.displayedColumns = [];
      this.displayedColumns.push(...leftIndexColumns);
      this.displayedColumns.push(...joinIndexColumns);
      const queryString = this.buildGraphqlQuery(leftIndexFields, joinIndexFields);
      this.querySubscription = this.apollo.watchQuery<any>({
        query: gql`
         ${queryString}
        `
      })
        .valueChanges
        .subscribe(({ data }) => {
          this.generateDataTable(data);
          this.showProgressBar = false;
          this.searchSuccess = true;
        });

    } else {
      this.dialog.open(this.columnsDialog);
      this.showProgressBar = false;
    }
  }


  flatten(obj: any, path = '') {
    if (!(obj instanceof Object)) {
      return {[path.replace(/\.$/g, '')] : obj};
    }
    // return only the first 10 entries for display to reduce slowness on front-end
    if (obj instanceof Array) {
      this.columnValuesCount = obj.length;
      if (obj.length > 10) {
        obj = obj.slice(0, 10);
      }
    }
    const flatObject =  Object.keys(obj).reduce((output, key) => {
      if (obj instanceof Array) {
        return {...output,
          ...this.flatten(obj[key], path +  '[' + key + '].' +  '[' + this.columnValuesCount + '].')
        };
      } else {
        return {...output,
          ...this.flatten(obj[key], path + key + '.')
        };
      }
    }, {});
    return flatObject;
  }


  setColumnValue(indexName: any, dictRecord: any, container: any) {
    const flatRec = this.flatten(dictRecord);
    for (const [key, recValue] of Object.entries(flatRec)) {
      const pattern = /\.\[\d*\]/g;

      if (pattern.test(key)) {
        let numEntries = '';

        const matchArray: RegExpMatchArray | null = key.match(pattern);
        if (matchArray) {
          const lastItem = matchArray.at(-1);
          if (lastItem) {
            const match: RegExpMatchArray | null = lastItem.match(/\d+/g);
            if (match) {
              numEntries = match[0];
            }
          }
        }

        const newKey = key.replace(pattern, '');
        if (`${indexName}.${newKey}` in container && container[`${indexName}.${newKey}`]) {
          // initialise a set with the existing entries associated with flatRec dict key
          const uniqueValues = new Set(container[`${indexName}.${newKey}`].split(' | '));
          uniqueValues.add(recValue);
          container[`${indexName}.${newKey}`] = Array.from(uniqueValues).join(' | ');
        } else {
          container[`${indexName}.${newKey}`] = `[numEntries: ${numEntries}]` + recValue;
        }
      } else {
        container[`${indexName}.${key}`] = recValue;
      }
    }
  }

  generateDataTable(data: any) {
    this.dataTable = [];
    const leftIndex = this.selectedIndicesArray[0];
    const queryName = this.indexData[leftIndex].resultQueryName;
    const recordsList = data[queryName]['edges'];
    const completeResultset: any[] = [];
    let joinRecords: any[] = [];
    let joinIndex = '';
    recordsList.forEach((record: any) => {
      const {join: joinObj, ...leftIndexObj} = record['node'];
      if (joinObj) {
        joinIndex = Object.keys(joinObj)[0];
        joinRecords = joinObj[joinIndex]['edges'];
      }
      let dataTable: any[] = [];
      if (joinRecords && joinRecords.length > 0) {
        dataTable = joinRecords.map(rec => {
          const container = {};
          this.setColumnValue(joinIndex, rec['node'], container);
          this.setColumnValue(leftIndex, leftIndexObj, container);
          return container;
        });
      } else {
        // no joinRecords associated with right index
        const container = {};
        this.setColumnValue(leftIndex, leftIndexObj, container);
        dataTable.push(container);
      }
      completeResultset.push(...dataTable);
    });
    this.dataTable = completeResultset;

  }


  buildGraphqlJoinQuery(graphqlFiltersObj: any) {
    const firstIndex = this.selectedIndicesArray[0];
    const secondIndex = this.selectedIndicesArray[1];
    const queryName = this.indexData[firstIndex].celeryQueryName;
    const queryString =
      `query {\
        ${queryName} (filter: { basic:${graphqlFiltersObj} join: {${secondIndex}: {basic:{}}}}) {\
          id\
          status\
        }\
      }`;
    return queryString;
  }


  buildGraphqlQuery(leftIndexFields: any, joinIndexFields: any) {
    const firstIndex = this.selectedIndicesArray[0];
    const secondIndex = this.selectedIndicesArray[1];
    if (!leftIndexFields.includes(this.indexData[firstIndex]['primary'])) {
      leftIndexFields.push(this.indexData[firstIndex]['primary']);
    }
    const formattedLeftIndexFields = this.formatFields(leftIndexFields);
    const formattedRightIndexFields = this.formatFields(joinIndexFields);

    const queryName = this.indexData[firstIndex].resultQueryName;
    let queryString = '';

    if (joinIndexFields && joinIndexFields.length) {
      queryString =
        `query {\
        ${queryName} (taskId: "${this.taskId}") {\
          pageInfo {\
             endCursor\
             hasNextPage\
          }\
          edges {\
            cursor\
            node {\
              ${formattedLeftIndexFields.join()}\
              join {\
                ${secondIndex} {\
                  edges {\
                    node {\
                      ${formattedRightIndexFields.join()}\
                    }\
                  }\
                }\
              }\
            }\
          }\
        }\
      }`;
    } else {
      queryString =
        `query {\
        ${queryName} (taskId: "${this.taskId}") {\
          pageInfo {\
             endCursor\
             hasNextPage\
          }\
          edges {\
            cursor\
            node {\
              ${formattedLeftIndexFields.join()}\
            }\
          }\
        }\
      }`;
    }
    return queryString;
  }


  formatFields(indexFields: any) {
    return indexFields.map((field: string) => {
      if (field.includes('.')) {
        const nestedFieldsArr = field.split('.');
        let fieldGraphqlString = '';
        let bracketCount = 0;
        for (const [index, val] of nestedFieldsArr.entries()) {
          if (index === nestedFieldsArr.length - 1) {
            fieldGraphqlString = fieldGraphqlString + `${val}`;
            for (let i = 0; i < bracketCount; i++) {
              fieldGraphqlString = fieldGraphqlString + '}';
            }
          } else {
            fieldGraphqlString = fieldGraphqlString + `${val}{`;
            bracketCount += 1;
          }
        }
        return fieldGraphqlString;
      }
      return field;
    });
  }


  setSocket(task_id = '') {
    const url = graphql_ws_url + task_id?.split('-')?.join('_') + '/';
    this.socket = new WebSocket(url);
    this.socket.onopen = () => {
      console.log('WebSockets connection created.');
      this.socket.send(JSON.stringify({
        'task_id': task_id
      }));
    };
    this.socket.onmessage = (event: any) => {
      const data = JSON.parse(event.data)['response'];
      if (data['graphql_status'] && data['graphql_status'] === 'Success') {
        this.fetchFilteredResult();
      }
      if (data['graphql_status'] && data['graphql_status'] === 'Error') {
        this.errors.push(data['errors']);
        this.searchSuccess = false;
      }
    };

    this.socket.onclose = () => {
      console.log('Websocket closed');
    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.onopen(null);
    }
  }


  generateGraphqlFilters(filterObj: any) {
    /*{
      "filterFields": [
      {
        "fieldName": "accession",
        "filterValue": "pmc123, pmc234"
      },
      {
        "fieldName": "alias",
        "filterValue": "aliasVal"
      }
    ]
    should be converted to the format below:
    indexName: {fieldName: ["filterValue", "filterValue"]}

    Example:
    specimen: {biosampleId: ["SAMEA104728717", "SAMEA104728726"]}
    }*/
    let graphqlString = '';
    const filtersArr = filterObj['filterFields'];

    for (let i = 0; i < filtersArr.length; i++) {
      const filterName = filtersArr[i].filterName;
      const filterValuesArr = filtersArr[i].filterValue.split(',')
        .map((element: string) => element.trim())
        .filter((element: string) => element !== '');

      const filterValuesArrGQL = `[${filterValuesArr.map((val: string) => '"' + val + '"')}]`;

      if (filterName.includes('.')) {
        const graphqlObject = {};
        let container = graphqlObject;
        filterName.split('.').map((k: string | number, idx: number, values: any) => {
          container = (container[k] = (idx === values.length - 1 ? filterValuesArrGQL : {}));
        });
        graphqlString += this.stringifyObject(graphqlObject).slice(1, -1);
      } else {
        const filterNameGraphql = graphqlString ? ' ' + filterName : filterName;
        graphqlString += filterNameGraphql + ':' + filterValuesArrGQL;
      }
    }
    return '{' + graphqlString + '}';
  }


  stringifyObject(graphqlObject: any) {
    if (typeof graphqlObject !== 'object' || Array.isArray(graphqlObject)) {
      return graphqlObject;
    }
    // Implements recursive object serialization according to JSON spec
    // but without quotes around the keys.
    const props = Object
      .keys(graphqlObject)
      .map(key => `${key}:${this.stringifyObject(graphqlObject[key])}`)
      .join(',');
    return `{${props}}`;
  }

  downloadFile() {
    this.showProgressBar = true;
    const filtersObj = this.filtersComponent.getFormValues();
    const graphqlFiltersObj = (filtersObj && filtersObj !== 'null') ? this.generateGraphqlFilters(filtersObj) : {};

    // get selected fields
    const leftIndexFields = Array.from(new Set(this.selectedColumns[this.selectedIndicesArray[0]]));
    const joinIndexFields = Array.from(new Set(this.selectedColumns[this.selectedIndicesArray[1]]));
    const leftIndexColumns = leftIndexFields.map(field => `${this.selectedIndicesArray[0]}.${field}`);
    const joinIndexColumns = joinIndexFields.map(field => `${this.selectedIndicesArray[1]}.${field}`);

    if (leftIndexColumns.length > 0) {
      this.displayedColumns = [];
      this.displayedColumns.push(...leftIndexColumns);
      this.displayedColumns.push(...joinIndexColumns);

      const queryString = this.buildGraphqlDownloadQuery(leftIndexFields, joinIndexFields, graphqlFiltersObj);

      this.dataService.downloadGraphqlRecords(this.selectedIndicesArray, this.displayedColumns, queryString,
        this.indexData[this.selectedIndicesArray[0]].queryName).subscribe((res: Blob) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(res);
        a.download = 'faang-join-data.csv';
        a.click();
        this.showProgressBar = false;
      });
    } else {
      this.dialog.open(this.columnsDialog);
      this.showProgressBar = false;
    }
  }

  buildGraphqlDownloadQuery(leftIndexFields: any, joinIndexFields: any, graphqlFiltersObj: any) {
    const firstIndex = this.selectedIndicesArray[0];
    const secondIndex = this.selectedIndicesArray[1];
    const formattedLeftIndexFields = this.formatFields(leftIndexFields);
    const formattedRightIndexFields = this.formatFields(joinIndexFields);
    const queryName = this.indexData[firstIndex].queryName;
    let queryString = '';

    if (joinIndexFields && joinIndexFields.length) {
      queryString =
        `query {\
        ${queryName} (filter: { basic:${Object.keys(graphqlFiltersObj).length === 0 ? '{}' : graphqlFiltersObj}\
         join: {${secondIndex}: {basic:{}}}}) {\
          edges {\
            node {\
              ${formattedLeftIndexFields.join()}\
              join {\
                ${secondIndex} {\
                  edges {\
                    node {\
                      ${formattedRightIndexFields.join()}\
                    }\
                  }\
                }\
              }\
            }\
          }\
        }\
      }`;
    } else {
      queryString =
        `query {\
        ${queryName} {\
          edges {\
            node {\
              ${formattedLeftIndexFields.join()}\
            }\
          }\
        }\
      }`;
    }
    return queryString;
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

}
