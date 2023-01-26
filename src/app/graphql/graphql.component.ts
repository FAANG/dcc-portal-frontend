import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {indexFieldsData} from './graphqlConstants';
import {Apollo, gql} from 'apollo-angular';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {graphql_ws_url} from '../shared/constants';
import {IndexFiltersComponent} from './index-filters/index-filters.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-graphql',
  templateUrl: './graphql.component.html',
  styleUrls: ['./graphql.component.css']
})
export class GraphqlComponent implements OnInit, OnDestroy  {
  @ViewChild(IndexFiltersComponent ) filtersComponent: IndexFiltersComponent ;
  @ViewChild('filtersDialog') filtersDialog: TemplateRef<any>;
  @ViewChild('columnsDialog') columnsDialog: TemplateRef<any>;

  firstIndexName = new FormControl('');
  secondIndexName = new FormControl('');
  firstIndices = [];
  secondIndices = [];
  selectedIndicesArray = [];
  selectedColumns = {};
  indicesSelected = false;
  showProgressBar = false;
  searchSuccess = false;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  indexData = {};
  dataTable: any[];
  socket;
  taskId = '';
  errors = [];
  columnValuesCount = 0;
  cursor: string;
  private querySubscription: Subscription = Subscription.EMPTY;

  constructor(
    private apollo: Apollo,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.displayedColumns = [];
    this.selectedIndicesArray = [];
    this.indexData = indexFieldsData;
    this.firstIndices = Object.keys(indexFieldsData);
    this.dataTable = [];
  }

  onIndexChange(indexName, event) {
    if (indexName === 'firstIndex') {
      this.selectedIndicesArray = [];
      this.dataTable = [];
      this.selectedIndicesArray[0] = event.value;
      this.secondIndices = this.indexData[this.firstIndexName.value]['joinIndices'];
      this.secondIndexName.reset();
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
    const joinIndexFields = Array.from(new Set(this.selectedColumns[this.selectedIndicesArray[1]]));
    const leftIndexColumns = leftIndexFields.map(field => `${this.selectedIndicesArray[0]}.${field}`);
    const joinIndexColumns = joinIndexFields.map(field => `${this.selectedIndicesArray[0]}.${field}`);

    if (leftIndexColumns.length > 0) {
      this.showProgressBar = true;
      this.displayedColumns = [];
      this.displayedColumns.push(...leftIndexColumns);
      this.displayedColumns.push(...joinIndexColumns);
      const queryString = this.buildGraphqlJoinQuery(leftIndexFields, joinIndexFields, graphqlFiltersObj);

      this.querySubscription = this.apollo.watchQuery<any>({
        query: gql`
         ${queryString}
        `
      })
        .valueChanges
        .subscribe(({ data, loading }) => {
          this.taskId = data?.[this.indexData[this.firstIndexName.value].celeryQueryName]?.['id'];
          this.setSocket(this.taskId);
        });
    } else {
      this.dialog.open(this.columnsDialog);
      this.showProgressBar = false;
      return;
    }
  }

  fetchFilteredResult() {
    this.searchSuccess = false;
    this.showProgressBar = true;

    // get selected fields
    const leftIndexFields = Array.from(new Set(this.selectedColumns[this.selectedIndicesArray[0]]));
    const joinIndexFields = Array.from(new Set(this.selectedColumns[this.selectedIndicesArray[1]]));
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
        .subscribe(({ data, loading }) => {
          this.generateDataTable(data);
          this.showProgressBar = false;
          this.searchSuccess = true;
        });

    } else {
      this.dialog.open(this.columnsDialog);
      this.showProgressBar = false;
    }
  }


  flatten(obj, path = '') {
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


  setColumnValue(indexName, dictRecord, container) {
    const flatRec = this.flatten(dictRecord);
    for (const [key, recValue] of Object.entries(flatRec)) {
      const pattern = /\.\[\d*\]/g;
      if (pattern.test(key)) {
        const numEntries = key.match(pattern).at(-1).match(/\d+/g)[0];
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


  generateDataTable(data) {
    this.dataTable = [];
    const leftIndex = this.selectedIndicesArray[0];
    const queryName = this.indexData[leftIndex].resultQueryName;
    const recordsList = data[queryName]['edges'];
    const completeResultset = [];
    let joinRecords = [];
    let joinIndex = '';
    recordsList.forEach(record => {
      const {join: joinObj, ...leftIndexObj} = record['node'];
      if (joinObj) {
        joinIndex = Object.keys(joinObj)[0];
        joinRecords = joinObj[joinIndex]['edges'];
      }
      let dataTable = [];
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


  buildGraphqlJoinQuery(leftIndexFields, joinIndexFields, graphqlFiltersObj) {
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


  buildGraphqlQuery(leftIndexFields, joinIndexFields) {
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


  formatFields(indexFields) {
    return indexFields.map(field => {
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
    this.socket.onmessage = (event) => {
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


  generateGraphqlFilters(filterObj) {
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
    should be converted in the format:
    indexName: {fieldName: ["filterValue", "filterValue"]}

    Example:
    specimen: {biosampleId: ["SAMEA104728717", "SAMEA104728726"]}
    }*/
    let graphqlString = '';
    const filtersArr = filterObj['filterFields'];

    for (let i = 0; i < filtersArr.length; i++) {
      const filterName = filtersArr[i].filterName;
      const filterValuesArr = filtersArr[i].filterValue.split(',')
        .map(element => element.trim())
        .filter(element => element !== '');

      const filterValuesArrGQL = `[${filterValuesArr.map(val => '"' + val + '"')}]`;

      if (filterName.includes('.')) {
        const graphqlObject = {};
        let container = graphqlObject;
        filterName.split('.').map((k, idx, values) => {
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


  stringifyObject(graphqlObject) {
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

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

}
