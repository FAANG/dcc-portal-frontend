import { Component, OnInit, TemplateRef, ViewChildren, QueryList } from '@angular/core';
import { TableClientSideComponent }  from '../shared/table-client-side/table-client-side.component';
import { QueryService } from '../services/query.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-query-language',
  templateUrl: './query-language.component.html',
  styleUrls: ['./query-language.component.css']
})
export class QueryLanguageComponent implements OnInit {
  @ViewChildren("tableComp") tableComponents: QueryList<TableClientSideComponent>;
  private tableClientComponent: TableClientSideComponent;
  columnNames: string[];
  fields: string[];
  tableData: Observable<any[]>;
  templates: Object;
  filter_field: {};
  indices = new FormControl();
  indicesList = ['file', 'organism', 'specimen', 'dataset', 'article', 'analysis', 
    'experiment', 'protocol_files', 'protocol_samples', 'protocol_analysis'];
  selectedIndices: Observable<any[]>;
  selectedColumns = {};
  columnsByIndex;
  loading: boolean;

  constructor(
    private queryService: QueryService
  ) { }

  ngOnInit() {
    this.templates = {};
    this.columnsByIndex = {};
    this.loading = false;
    this.fields = [];
    this.queryService.getAllColumns().subscribe(
      data => {
        this.columnsByIndex = data;
        // this.fields = Object.values(this.columnsByIndex['organism']['columns']);
        // this.columnNames = Object.keys(this.columnsByIndex['organism']['columns']);
        
      }
    );
  }

  fetchRecords() {
    this.loading = true;
    // get selected fields and columnNames
    let uniqueSelections = [];
    for (let prop in this.selectedColumns) {
      uniqueSelections = uniqueSelections.concat(this.selectedColumns[prop]);
      uniqueSelections = uniqueSelections.filter((value,pos) => {return uniqueSelections.indexOf(value) == pos;});
    }
    this.columnNames = uniqueSelections;
    this.fields = uniqueSelections;
    // get records
    this.queryService.getRecords(this.selectedIndices, this.fields).subscribe(
      data => {
        this.tableData = this.flattenTableData(data);
        this.loading = false;
      }
    );
  }

  flattenTableData(data) {
    for(let i=0; i<data.length; i+=1) {
      for(let prop in data[i]) {
        if (typeof data[i][prop] == "object") {
          if (Array.isArray(data[i][prop]) && data[i][prop]) {
            // flatten array
            data[i][prop] = this.flattenArray(data[i][prop])
            if (typeof data[i][prop] == "object") {
              // flatten object
              for (let prop2 in data[i][prop]) {
                data[i][prop+'.'+prop2] = data[i][prop][prop2];
              }
            }
          } else {
            // flatten object
            for (let prop2 in data[i][prop]) {
              data[i][prop+'.'+prop2] = data[i][prop][prop2];
            }
          }
        }
      }
    }
    return data;
  }

  flattenArray(items) {
    if (typeof items[0] == "object") {
      let result = {};
      for(let i=0; i<items.length; i+=1) {
        for(let prop in items[i]) {
          if (prop in result) {
            result[prop] = result[prop] + ', ' + items[i][prop];
          } else {
            result[prop] = items[i][prop];
          }
        }
      } 
      return result;
    } else {
      return items.join(', ');
    }
  }

  updateDefaults(indices) {
    // remove selections for indices which are deselected
    for (let index in this.selectedColumns) {
      if (!indices.includes(index)) {
        delete this.selectedColumns[index];
      }
    }
    // if user hasn't selected columns for the index, set defaults
    for (let i=0; i<indices.length; i+=1) {
      let index = indices[i];
      if (!(index in this.selectedColumns)) {
        this.selectedColumns[index] = this.columnsByIndex[index]['defaults'];
      }
    }
    this.fetchRecords();
  }

  displayName(index) {
    // const titleCase = (str) => str.replace(/\b\S/g, t => t.toUpperCase());
    index = index.split('_').join(' ');
    index = index.replace(/\b\S/g, t => t.toUpperCase());
    return index;
  }

}
