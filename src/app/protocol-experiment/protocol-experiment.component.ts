import {Component, OnDestroy, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {ApiDataService} from '../services/api-data.service';
import {AggregationService} from '../services/aggregation.service';
import {Observable, Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TableServerSideComponent}  from '../shared/table-server-side/table-server-side.component';
import {MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'app-protocol-experiment',
  templateUrl: './protocol-experiment.component.html',
  styleUrls: ['./protocol-experiment.component.css']
})
export class ProtocolExperimentComponent implements OnInit, OnDestroy {
  @ViewChild('tabs', { static: true }) tabGroup: MatTabGroup;
  @ViewChild('nameTemplate', { static: true }) nameTemplate: TemplateRef<any>;
  @ViewChild(TableServerSideComponent, { static: true }) tableServerComponent: TableServerSideComponent;
  public loadTableDataFunction: Function;
  columnNames: string[] = ['Protocol type', 'Experiment target', 'Assay type'];
  displayFields: string[] = ['protocol_type', 'experiment_target', 'assay_type'];
  templates: Object;
  filter_field: {};
  aggrSubscription: Subscription;
  downloadData = false;
  downloading = false;
  data = {};

  private query = {
    'sort': ['name', 'asc'],
    '_source': [
      'key',
      'name',
      'experimentTarget',
      'assayType'
    ],
    'search': ''
  };

  downloadQuery = {
    'sort': ['name', 'asc'],
    '_source': [
      '_source.name',
      '_source.experimentTarget',
      '_source.assayType'
    ],
    'columns': this.columnNames,
    'filters': {},
    'file_format': 'csv',
  };

  defaultSort = ['name', 'asc'];
  error: string;

  constructor(private dataService: ApiDataService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private aggregationService: AggregationService,
              private titleService: Title) { }

  ngOnInit() {
    this.tabGroup.selectedIndex = 1;
    this.templates = {'protocol_type': this.nameTemplate};
    this.loadTableDataFunction = this.dataService.getAllExperimentsProtocols.bind(this.dataService);
    this.titleService.setTitle('FAANG protocols');
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.resetFilter();
      const filters = {};
      for (const key in params) {
        if (Array.isArray(params[key])) {
          filters[key] = params[key];
          for (const value of params[key]) {
            this.aggregationService.current_active_filters.push(value);
            this.aggregationService.active_filters[key].push(value);
          }
        } else {
          filters[key] = [params[key]];
          this.aggregationService.current_active_filters.push(params[key]);
          this.aggregationService.active_filters[key].push(params[key]);
        }
      }
      this.aggregationService.field.next(this.aggregationService.active_filters);
      this.filter_field = filters;
      this.query['filters'] = filters;
      this.downloadQuery['filters'] = filters;
      this.filter_field = Object.assign({}, this.filter_field);
    });
    this.tableServerComponent.dataUpdate.subscribe((data) => {
      this.aggregationService.getAggregations(data.aggregations, 'protocol_experiments');
    });
    this.tableServerComponent.sortUpdate.subscribe((sortParams) => {
      this.downloadQuery['sort'] = sortParams;
    });
    this.aggrSubscription = this.aggregationService.field.subscribe((data) => {
      const params = {};
      for (const key of Object.keys(data)) {
        if (data[key] && data[key].length !== 0) {
          params[key] = data[key];
        }
      }
      this.router.navigate(['protocol', 'experiments'], {queryParams: params});
    });
  }

  hasActiveFilters() {
    if (typeof this.filter_field === 'undefined') {
      return false;
    }
    for (const key of Object.keys(this.filter_field)) {
      if (this.filter_field[key].length !== 0) {
        return true;
      }
    }
    return false;
  }

  resetFilter() {
    for (const key of Object.keys(this.aggregationService.active_filters)) {
      this.aggregationService.active_filters[key] = [];
    }
    this.aggregationService.current_active_filters = [];
    this.filter_field = Object.assign({}, this.filter_field);
  }

  removeFilter() {
    this.resetFilter();
    this.router.navigate(['protocol', 'experiments'], {queryParams: {}});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  downloadFile(format: string) {
    this.downloadData = !this.downloadData;
    this.downloading = true;
    this.downloadQuery['file_format'] = format;
    let mapping = {
      'protocol_type': 'name',
      'experiment_target': 'experimentTarget',
      'assay_type': 'assayType',
    }
    this.dataService.downloadRecords('protocol_files', mapping, this.downloadQuery).subscribe((res:Blob)=>{
      var a = document.createElement("a");
      a.href = URL.createObjectURL(res);
      a.download = 'faang_data.' + format;
      a.click();
      this.downloading = false;
    });
  }  
  
  onUploadProtocolClick() {
    this.router.navigate(['upload_protocol']);
  }

  tabClick(tab) {
    if (tab.index == 0) {
      this.router.navigate(['protocol/samples']);
    }
    else if (tab.index == 1) {
      this.router.navigate(['protocol/experiments']);
    }
  }

  ngOnDestroy() {
    if (typeof this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
  }
}
