import { Component, AfterViewInit, TemplateRef, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { QueryService } from '../services/query.service';
import { Observable, merge, of as observableOf } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-table-builder',
  templateUrl: './custom-table-builder.component.html',
  styleUrls: ['./custom-table-builder.component.css']
})
export class CustomTableBuilderComponent implements AfterViewInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('speciesTemplate', { static: true }) speciesTemplate: TemplateRef<any>;
  @ViewChild('fileIdTemplate', { static: true }) fileIdTemplate: TemplateRef<any>;
  @ViewChild('specimenIdTemplate', { static: true }) specimenIdTemplate: TemplateRef<any>;
  @Input() project: string;
  columnNames: string[];
  fields: string[];
  templates: Object;
  filter_field: {};
  indices = new FormControl();
  indicesList = ['file', 'organism', 'specimen', 'dataset', 'article', 'analysis',
    'experiment', 'protocol_files', 'protocol_samples', 'protocol_analysis'];
  selectedIndices;
  selectedColumns = {};
  columnsByIndex;
  columnsByIndexDisplay;
  loading: boolean;
  col_width;
  pageSize = 10;
  from = 0;
  totalHits = 0;
  sortFields = '';
  defaultSort: MatSortable = {
    id: '',
    start: 'asc',
    disableClear: true
  };

  constructor(
    public queryService: QueryService,
    public snackbar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>([]);
    this.templates = {};
    this.columnsByIndex = {};
    this.loading = false;
    this.fields = [];
    this.queryService.getAllColumns().subscribe(
      data => {
        this.columnsByIndex = data;
        this.columnsByIndexDisplay = JSON.parse(JSON.stringify(this.columnsByIndex));
        // set default value for selectedIndices
        this.selectedIndices = ['file', 'specimen'];
        this.updateDefaults(['file', 'specimen']);
      }
    );
    this.templates = {
      'file.species.text': this.speciesTemplate,
      'file.filename': this.fileIdTemplate,
      'specimen.biosampleId': this.specimenIdTemplate,
    };
    this.cdRef.detectChanges(); 
  }

  fetchRecords() {
    this.loading = true;
    // get selected fields and columnNames
    let uniqueSelections = [];

    for (const index in this.selectedColumns) {
      const indexColsArr = this.selectedColumns[index].map(colName => `${index}.${colName}`);
      uniqueSelections = uniqueSelections.concat(indexColsArr);
    }
    this.columnNames = uniqueSelections.slice();
    this.fields = uniqueSelections.slice();

    // Reset back to the first page when sort order is changed`
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          if (this.sort.active && this.sort.direction) {
            this.sortFields = this.sort.active + ':' + this.sort.direction;
          }
          this.from = this.paginator.pageIndex * this.paginator.pageSize;

          // fetch related fields
          const fieldsToFetch = this.fields;
          if (this.fields.includes('file.species.text') && !this.fields.includes('file.species.ontologyTerms')) {
            fieldsToFetch.push('file.species.ontologyTerms');
          }
          return this.queryService.getRecords(this.selectedIndices, fieldsToFetch,
                  this.from, this.sortFields, this.project);
        }),
        map(data => {
          return data;
        }),
        catchError(() => {
          this.loading = false;
          this.openSnackbar('Indices cannot be combined!', 'Dismiss');
          return observableOf([]);
        })
      ).subscribe((res: any) => {
          this.dataSource.data = res.data;
          this.totalHits = res.count; // set length of paginator
          this.loading = false;
        });
  }

  updateDefaults(indices) {
    // reset from, sortFields, fields
    this.from = 0;
    this.sortFields = '';
    this.fields = [];
    this.sort.sort(this.defaultSort);
    // remove selections for indices which are deselected
    for (const index in this.selectedColumns) {
      if (!indices.includes(index)) {
        delete this.selectedColumns[index];
      }
    }
    // reset columns to display
    this.columnsByIndexDisplay = JSON.parse(JSON.stringify(this.columnsByIndex));
    if (this.selectedIndices.includes('file') && this.selectedIndices.includes('specimen')) {
      this.columnsByIndexDisplay['file']['columns'] = this.columnsByIndexDisplay['file']['columns'].filter(item => item !== 'organism');
      if (this.selectedColumns['file']) {
        this.selectedColumns['file'] = this.selectedColumns['file'].filter(item => item !== 'organism');
      }
    }
    // if user hasn't selected columns for the index, set defaults
    for (let i=0; i<indices.length; i+=1) {
      const index = indices[i];
      if (!(index in this.selectedColumns)) {
        this.selectedColumns[index] = this.columnsByIndex[index]['defaults'];
      }
    }
    this.fetchRecords();
  }

  displayName(index) {
    index = index.split('_').join(' ');
    index = index.replace(/\b\S/g, t => t.toUpperCase());
    return index;
  }

  downloadCSV() {
    this.queryService.downloadCsv(this.selectedIndices.join('-'), this.fields, this.project, 'csv');
  }

  isOptionDisabled(opt: any): boolean {
    // return this.indices.value && this.indices.value.length >= 2 && !this.indices.value.find(el => el == opt)
    return opt !== 'file' && opt !== 'specimen';
  }

  openSnackbar(message: string, action: string) {
    const snackBarRef = this.snackbar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}

