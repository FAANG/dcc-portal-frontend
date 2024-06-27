import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ApiDataService} from '../../services/api-data.service';
import * as FileSaver from 'file-saver';
import setting from './portal-data-table.setting.json';
import {UserService} from '../../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {Observable, of as observableOf} from 'rxjs';

@Component({
  selector: 'app-portal-data-table',
  templateUrl: './portal-data-table.component.html',
  styleUrl: './portal-data-table.component.css'
})
export class PortalDataTableComponent implements OnInit {
  @Input() project: string[];
  @Input() data_type: string;
  @Input() download_key: string;
  @Output() fetchedRecords = new EventEmitter<any>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  display_fields: Array<string> = [];
  progress: Observable<Object> = observableOf({});
  totalHits = 0;
  records: any;
  urls: string[] = [];
  checked = false;
  mode: string;
  timer: any;
  delaySearch: boolean = true;
  search = '';
  initialDataExists: boolean = false;

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
    for (const column of setting[this.data_type]['display']) {
      this.display_fields.push(column);
    }
    if (this.download_key && this.download_key.length > 0 && this.mode == 'public') {
      this.display_fields.push('Download');
    }
    // random delay for concurrent requests
    setTimeout(() => {
      this.fetchData();
    }, Math.floor(Math.random() * 200));
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.fetchData();
    });
    this.paginator.page.subscribe(() => {
      this.fetchData();
    });
  }

  ngOnChanges() {
    setTimeout(() => {
      this.fetchData();
    }, Math.floor(Math.random() * 200));
  }

  fetchData() {
    if (!this.project.length) {
      return;
    }
    switch (this.data_type) {
      case 'organism':
        this.dataService.getAllOrganismsFromProject(
          this.project, this.mode, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
          (res: any) => {
            this.dataSource.data = this.getDataSource(res['data']);
            this.totalHits = res['totalHits'];
          });
        break;
      case 'specimen':
        this.dataService.getAllSpecimensForProject(
          this.project, this.mode, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
          (res: any) => {
            this.dataSource.data = this.getDataSource(res['data']);
            this.totalHits = res['totalHits'];
          });
        break;
      case 'protocolsamples':
        this.dataService.getAllProtocolSamplesForProject(
          this.project, this.mode, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
          (res: any) => {
            this.dataSource.data = this.getDataSource(res['data']);
            this.totalHits = res['totalHits'];
            this.fetchedRecords.emit(['protocol_samples', this.totalHits]);
          });
        break;
      case 'protocolfiles':
        this.dataService.getAllProtocolFilesForProject(
          this.project, this.mode, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
          (res: any) => {
            this.dataSource.data = this.getDataSource(res['data']);
            this.totalHits = res['totalHits'];
            this.fetchedRecords.emit(['protocol_files', this.totalHits]);
          });
        break;
      case 'protocolanalysis':
        this.dataService.getAllProtocolAnalysisForProject(
          this.project, this.mode, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
          (res: any) => {
            this.dataSource.data = this.getDataSource(res['data']);
            this.totalHits = res['totalHits'];
            this.fetchedRecords.emit(['protocol_analysis', this.totalHits]);
          });
        break;
      case 'publication':
        this.dataService.getAllArticlesForProject(
          this.project, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
          (res: any) => {
            this.dataSource.data = this.getDataSource(res['data']);
            this.totalHits = res['totalHits'];
          });
        break;
      case 'file':
        this.dataService.getAllFilesForProject(
          this.project, this.mode, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
          (res: any) => {
            this.dataSource.data = this.getDataSource(res['data']);
            this.totalHits = res['totalHits'];
          });
        break;
      case 'dataset':
        this.dataService.getAllDatasetsForProject(
          this.project, this.mode, this.getSort(), this.paginator.pageIndex * 10, this.search).subscribe(
          (res: any) => {
            this.dataSource.data = this.getDataSource(res['data']);
            this.totalHits = res['totalHits'];
          });
        break;
      default:
        break;
    }
  }

  checkSelectedProjects(selectedProjects: string[]) {
    if (!selectedProjects.length) {
      console.log("empty projects")
    }

  }

  getSort() {
    const defaults = {
      'organism': 'BioSamples ID',
      'specimen': 'BioSamples ID',
      'protocolsamples': 'Protocol Name',
      'protocolfiles': 'Protocol Type',
      'protocolanalysis': 'Protocol Name',
      'publication': 'Title',
      'file': 'File name',
      'dataset': 'Study name',
      'download': 'Name',
      'analysis': 'Accession'
    };
    if (this.sort.active && this.sort.direction) {
      return setting[this.data_type]['fields'][this.sort.active]['source'] + ':' + this.sort.direction;
    } else {
      return setting[this.data_type]['fields'][defaults[this.data_type]]['source'] + ':asc';
    }
  }

  getDataSource(records) {
    const tableData = [];
    const fields = setting[this.data_type]['fields'];
    if (records) {
      for (const index of Object.keys(records)) {
        const rowObj = {};
        for (const field of Object.keys(fields)) {
          const prop = fields[field]['value'].split('.');
          rowObj[field] = records[index];
          while (prop.length && rowObj[field] && rowObj[field].hasOwnProperty(prop[0])) {
            rowObj[field] = rowObj[field][prop[0]];
            prop.shift();
          }
          if (this.download_key && this.download_key.length > 0) {
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
    }
    return tableData;
  }

  isEmptyData() {
    if (this.dataSource.data && this.dataSource.data.length !== 0) {
      if (this.initialDataExists === false) {
        this.initialDataExists = true;
      }
      return false;
    }
    return true;
  }

  // get table headers
  get_all_fields() {
    return setting[this.data_type]['all'];
  }

  // the attributes to render the link
  get_field_values_for_links(attr: string) {
    return setting[this.data_type]['fields'][attr]['link'];
  }

  downloadAllFiles() {
    this.urls.forEach(url => {
      let file_url = url.split('://')[1];
      this.progress[file_url] = 0;
      this.http.get(url,
        {
          responseType: 'blob',
          reportProgress: true,
          observe: 'events',
        }).subscribe(result => {
        let filename = file_url.split('/').pop();
        if (result.type === HttpEventType.DownloadProgress) {
          this.progress[file_url] = Math.round(100 * result.loaded / result.total);
        }
        if (result.type === HttpEventType.Response) {
          FileSaver.saveAs(result.body, filename);
        }
      });
      this.progress[file_url] = 0;
    });
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

  searchChanged(event: any) {
    const searchFilterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.delaySearch) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(this.applySearchFilter.bind(this), 500, searchFilterValue);
    } else {
      this.applySearchFilter(searchFilterValue);
    }
  }

  applySearchFilter(value: string) {
    this.paginator.pageIndex = 0;
    this.search = value;
    this.fetchData();
  }

  displayTitle(targetType: string) {
    const titles = {
      'analysis': 'Analyses',
      'protocolsamples': 'Protocol Samples',
      'protocolfiles': 'Protocol Experiments',
      'protocolanalysis': 'Protocol Analysis'
    };
    if (titles.hasOwnProperty(targetType)) {
      return titles[targetType];
    } else {
      return this.capitalizeFirstLetter(targetType) + 's';
    }
  }

  goToDownloader() {
    (window as any).open("https://github.com/FAANG/dcc-bulk-data-downloader", "_blank");
  }

  displayCellData(str) {
    if (str && str.charAt(0) === ',') {
      return str.replace(/^,/, '');
    }
    return str
  }
}
