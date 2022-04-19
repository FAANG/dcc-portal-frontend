import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ApiDataService} from '../../services/api-data.service';
import * as FileSaver from 'file-saver';
import setting from './related-items.component.setting.json';
import {UserService} from '../../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpEventType} from '@angular/common/http';
import { Observable, of as observableOf } from 'rxjs';

@Component({
  selector: 'app-related-items',
  templateUrl: './related-items.component.html',
  styleUrls: ['./related-items.component.css']
})
export class RelatedItemsComponent implements OnInit {
  @Input() record_id: string; // the record id used to retrieve particular record
  @Input() source_type: string; // equal to the type of detail page, e.g. to list files in the dataset detail page, set to be dataset
  @Input() target_type: string; // the related entities, e.g. to list files in the dataset detail page, set to be file
  @Input() download_key: string; // if download not needed (normally not file), set to empty string, otherwise to the link attribute
  @Input() isEuroFaangProj = false; // specifies if datasets table is for EuroFAANG - display project title next to table header
  @Input() data: Array<any>; // Array data to be populated in the table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  display_fields: Array<string> = [];
  progress: Observable<Object> = observableOf({});
  totalHits = 0;
  client_side = ['project-pipeline', 'publication-dataset', 'analysis-file',
    'file-paper', 'dataset-specimen', 'dataset-file', 'dataset-paper', 'organism-paper', 'specimen-paper'];
  relationship_type;
  records: any;
  urls: string[] = [];
  checked = false;
  mode: string;
  timer: any;
  delaySearch: boolean = true;
  search = '';

  p = 1; // page number for html template
  // to use this component, 4 steps:
  // Step 1: add corresponding setting in the setting json file
  // Step 2: in ngOnInit, add else if to retrieve the data
  // Step 3: add this component into the detail page
  // Step 4: make necessary adjustment (i.e. debugging) to the setting

  constructor(
    private dataService: ApiDataService,
    private _userService: UserService,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    // Read in the initial column display settings
    // set those selected to be displayed
    this._userService.token ? this.mode = 'private' : this.mode = 'public';
    for (const column of setting[this.source_type][this.target_type]['display']) {
      this.display_fields.push(column);
    }
    if (this.download_key.length > 0) {
      this.display_fields.push('Download');
    }
    // random delay for concurrent requests
    setTimeout(() => {
      this.fetchData();
    }, Math.floor(Math.random() * 200));
    this.relationship_type = `${this.source_type}-${this.target_type}`;
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      if (!this.client_side.includes(this.relationship_type)) {
        this.fetchData();
      }
    });
    this.paginator.page.subscribe(() => {
      if (!this.client_side.includes(this.relationship_type)) {
        this.fetchData();
      }
    });
  }

  fetchData() {
    const relationship_type = `${this.source_type}-${this.target_type}`;
    if (relationship_type === 'project-organism') {
      this.dataService.getAllOrganismsFromProject(
        this.record_id, this.mode, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
        (res: any) => {
          this.dataSource.data = this.getDataSource(res['data']);
          this.totalHits = res['totalHits'];
        }
      );
    } else if (relationship_type === 'project-specimen') {
      this.dataService.getAllSpecimensForProject(this.record_id, this.mode, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
        (res: any) => {
          this.dataSource.data = this.getDataSource(res['data']);
          this.totalHits = res['totalHits'];
        }
      );
    } else if (relationship_type === 'project-publication') {
      this.dataService.getAllArticlesForProject(this.record_id, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
        (res: any) => {
          this.dataSource.data = this.getDataSource(res['data']);
          this.totalHits = res['totalHits'];
        }
      );
    } else if (relationship_type === 'project-pipeline') {
      this.dataService.getAllPipelinesForProject(this.record_id).subscribe(
        (res: any) => {
          this.dataSource.data = this.getDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.totalHits = this.dataSource.data.length;
        }
      );
    } else if (relationship_type === 'project-file') {
      this.dataService.getAllFilesForProject(this.record_id, this.mode, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
        (res: any) => {
          this.dataSource.data = this.getDataSource(res['data']);
          this.totalHits = res['totalHits'];
        }
      );
    } else if (relationship_type === 'project-dataset') {
      this.dataService.getAllDatasetsForProject(this.record_id, this.mode, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
        (res: any) => {
          this.dataSource.data = this.getDataSource(res['data']);
          this.totalHits = res['totalHits'];
        }
      );
    } else if (relationship_type === 'publication-dataset') {
        for (const record of this.data) {
          record['species'] = record['species'].sort();
        }
        this.dataSource.data = this.getDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalHits = this.dataSource.data.length;
    } else if (relationship_type === 'analysis-file') {
        this.dataSource.data = this.getDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalHits = this.dataSource.data.length;
    } else if (relationship_type === 'file-download') {
      this.dataService.getFilesByRun(this.record_id, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
        (res: any) => {
          this.dataSource.data = this.getDataSource(res['data']);
          this.totalHits = res['totalHits'];
        });
    } else if (relationship_type === 'file-paper') {
        this.dataSource.data = this.getDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalHits = this.dataSource.data.length;
    } else if (relationship_type === 'dataset-specimen' || relationship_type === 'dataset-file'
              || relationship_type === 'dataset-paper') {
        this.dataSource.data = this.getDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalHits = this.dataSource.data.length;
    } else if (relationship_type === 'dataset-analysis') {
      this.dataService.getAnalysesByDataset(this.record_id, this.getSort(), this.paginator.pageIndex * 10, this.mode, this.search).subscribe(
        (res: any) => {
          this.dataSource.data = this.getDataSource(res['data']);
          this.totalHits = res['totalHits'];
        });
    } else if (relationship_type === 'organism-paper') {
        this.dataSource.data = this.getDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalHits = this.dataSource.data.length;
    } else if (relationship_type === 'organism-specimen') {
      this.dataService.getOrganismsSpecimens(this.record_id, this.getSort(), this.paginator.pageIndex * 10, this.mode, this.search).subscribe(
        (data: any) => {
          this.records = data.hits.hits;
          this.dataSource.data = this.getDataSource(this.records);
          this.totalHits = data.hits.total.value;
        });
    } else if (relationship_type === 'specimen-paper') {
        this.dataSource.data = this.getDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalHits = this.dataSource.data.length;
    } else if (relationship_type === 'specimen-specimen') {
      this.dataService.getSpecimenRelationships(this.record_id, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
        (res: any) => {
          this.dataSource.data = this.getDataSource(res['data']);
          this.totalHits = res['totalHits'];
        });
    } else if (relationship_type === 'specimen-file') {
      this.dataService.getSpecimenFiles(this.record_id, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
        (res: any) => {
          this.dataSource.data = this.getDataSource(res['data']);
          this.totalHits = res['totalHits'];
        });
    } else if (relationship_type === 'specimen-analysis') {
      this.dataService.getAnalysesBySample(this.record_id, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
        (res: any) => {
          this.dataSource.data = this.getDataSource(res['data']);
          this.totalHits = res['totalHits'];
        });
    }
  }

  getSort() {
    const defaults = {
      'organism' : 'BioSamples ID',
      'specimen' : 'BioSamples ID',
      'publication': 'Title',
      'file' : 'File name',
      'dataset': 'Study name',
      'download': 'Name',
      'analysis': 'Accession'
    };
    if (this.sort.active && this.sort.direction) {
      return setting[this.source_type][this.target_type]['fields'][this.sort.active]['source'] + ':' + this.sort.direction;
    } else {
      return setting[this.source_type][this.target_type]['fields'][defaults[this.target_type]]['source'] + ':asc';
    }
  }

  getDataSource(records) {
    const tableData = [];
    const fields = setting[this.source_type][this.target_type]['fields'];
    for (const index of Object.keys(records)) {
      const rowObj = {};
      for (const field of Object.keys(fields)) {
        const prop = fields[field]['value'].split('.');
        rowObj[field] = records[index];
        while (prop.length && rowObj[field] && rowObj[field].hasOwnProperty(prop[0])) {
          rowObj[field] = rowObj[field][prop[0]];
          prop.shift();
        }
        if (this.download_key.length > 0) {
          const dKey = this.download_key.split('.');
          rowObj['Download'] = records[index];
          while (dKey.length) {
            rowObj['Download'] = rowObj['Download'][dKey[0]];
            dKey.shift();
          }
        }
        if (records[index]['private']) {
          rowObj['private'] = records[index]['private'];
        }
      }
      tableData.push(rowObj);
    }
    return tableData;
  }

  isRecordPrivate(record: any) {
    if (this.source_type === 'organism' && this.target_type === 'specimen' && this.mode === 'private') {
      return true;
    }
    return record.private;
  }

  // get table headers
  get_all_fields() {
    return setting[this.source_type][this.target_type]['all'];
  }

  // the attributes to render the link
  get_field_values_for_links(attr: string) {
    return setting[this.source_type][this.target_type]['fields'][attr]['link'];
  }

  downloadAllFiles() {
    this.urls.forEach(url => {
      const ftp_url = url.split('://')[1];
      this.progress[ftp_url] = 0;
      this.http.get(url,
        {
            responseType: 'blob',
            reportProgress: true,
            observe: 'events',
        }).subscribe(result => {
        if (result.type === HttpEventType.DownloadProgress) {
          this.progress[ftp_url] = Math.round(100 * result.loaded / result.total);;
        }
        if (result.type === HttpEventType.Response) {
          FileSaver.saveAs(result.body);
        }
      });
      this.progress[ftp_url] = 0;
    });
  }

  displayPlatformLogo(record: any, attr: string) {
    return (this.target_type === 'pipeline' && attr === 'Platform' && record['Platform'] === 'nf-core');
  }

  // the behaviour of the checkbox in the table under Download column
  onCheckboxClick(url: string) {
    url = `https://${url}`;
    const index = this.urls.indexOf(url);
    if (index !== -1) {
      this.urls.splice(index, 1);
    } else {
      this.urls.push(url);
    }
  }

  // the checked conversion_status of the checkbox in the table under Download column
  CheckboxChecked(url: string) {
    url = `https://${url}`;
    return this.urls.indexOf(url) !== -1;
  }

  // determine the checked conversion_status of the checkbox in the table header
  // return 2 means all files selected (checkbox checked conversion_status),
  // 1 means partially files selected (checkbox indeterminate conversion_status)
  // and 0 means none selected
  mainCheckboxChecked() {
    if (this.dataSource.data) {
      if (this.urls.length === this.dataSource.data.length) {
        this.checked = true;
        return 2;
      } else {
        this.checked = false;
        if (this.urls.length > 0) {
          return 1;
        } else {
          return 0;
        }
      }
    } else {
      return 0;
    }
  }

  // the behaviour of the checkbox in the table header
  mainCheckboxClicked() {
    if (this.checked === true) {
      this.urls = [];
    } else {
      for (const record of this.dataSource.data) {
        const url = `https://${record['Download']}`;
        const idx = this.urls.indexOf(url);
        if (idx === -1) {
          this.urls.push(url);
        }
      }
    }
    this.checked = !this.checked;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  searchChanged(event: any){
    const searchFilterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.delaySearch){
      if (this.timer){
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(this.applySearchFilter.bind(this), 500, searchFilterValue);
    } 
    else {
      this.applySearchFilter(searchFilterValue);
    }
  }

  applySearchFilter(value: string) {
    this.paginator.pageIndex = 0;
    this.search = value;
    if (!this.client_side.includes(this.relationship_type)) {
      this.fetchData();
    } else {
      this.dataSource.filter = value;
    }
  }
}
