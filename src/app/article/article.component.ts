import {Component, OnDestroy, OnInit, AfterViewInit, TemplateRef, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {ArticleTable} from '../shared/interfaces';
import {Subscription} from 'rxjs';
import {ApiDataService} from '../services/api-data.service';
import {AggregationService} from '../services/aggregation.service';
import {ExportService} from '../services/export.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs/internal/Observable';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TableClientSideComponent}  from '../shared/table-client-side/table-client-side.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('titleTemplate', { static: true }) titleTemplate: TemplateRef<any>;
  @ViewChildren("tableComp") tableComponents: QueryList<TableClientSideComponent>;
  private tableClientComponent: TableClientSideComponent;
  articleListShort: Observable<ArticleTable[]>;
  articleListLong: Observable<ArticleTable[]>;
  columnNames: string[] = ['Title', 'Journal', 'Year', 'Dataset source'];
  displayFields: string[] = ['title', 'journal', 'year', 'datasetSource'];
  templates: Object;
  filter_field = {};
  aggrSubscription: Subscription;
  exportSubscription: Subscription;
  articleListLongSubscription: Subscription;
  downloadData = false;

  optionsCsv;
  optionsTabular;
  data = {};

  private query = {
    'sort': 'pmcId:desc',
    '_source': [
      'title',
      'year',
      'datasetSource',
      'journal']
  };
  error: string;

  constructor(private dataService: ApiDataService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private aggregationService: AggregationService,
              private exportService: ExportService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.templates = {'title': this.titleTemplate};
    this.titleService.setTitle('FAANG articles');
    this.spinner.show();
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
      this.filter_field = Object.assign({}, this.filter_field);
    });
    this.optionsCsv = this.exportService.optionsCsv;
    this.optionsTabular = this.exportService.optionsTabular;
    this.optionsCsv['headers'] = this.columnNames;
    this.spinner.hide();
    this.articleListLong = this.dataService.getAllArticles(this.query, 100000);
    this.articleListLongSubscription = this.articleListLong.subscribe((data) => {
      this.aggregationService.getAggregations(data, 'article');
    });
    this.aggrSubscription = this.aggregationService.field.subscribe((data) => {
      const params = {};
      for (const key of Object.keys(data)) {
        if (data[key].length !== 0) {
          params[key] = data[key];
        }
      }
      this.router.navigate(['article'], {queryParams: params});
    });
    this.exportSubscription = this.exportService.data.subscribe((data) => {
      this.data = data;
    });
  }

  ngAfterViewInit() {
    this.tableComponents.changes.subscribe((comps: QueryList <TableClientSideComponent>) => {
        this.tableClientComponent = comps.first;
        this.aggregationService.getAggregations(this.tableClientComponent.dataSource.filteredData, 'article');
        this.data = this.tableClientComponent.dataSource.sortData(this.tableClientComponent.dataSource.filteredData,this.tableClientComponent.dataSource.sort);
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
    this.filter_field = {};
  }

  removeFilter() {
    this.resetFilter();
    this.router.navigate(['article'], {queryParams: {}});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  ngOnDestroy() {
    if (typeof  this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
    this.exportSubscription.unsubscribe();
    this.articleListLongSubscription.unsubscribe();
  }
}
