import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Observable} from 'rxjs/internal/Observable';
import {ArticleTable} from '../shared/interfaces';
import {Subscription} from 'rxjs/internal/Subscription';
import {ApiFileService} from '../services/api-file.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AggregationService} from '../services/aggregation.service';
import {ExportService} from '../services/export.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {
  articleListLong: Observable<ArticleTable[]>;
  columnNames: string[] = ['Pubmed ID', 'Journal', 'Number of citations', 'Publication year'];
  filter_field: {};
  aggrSubscription: Subscription;
  exportSubscription: Subscription;
  articleListLongSubscription: Subscription;
  downloadData = false;

  optionsCsv;
  optionsTabular;
  data = {};


  // Local variable for pagination
  p = 1;

  private query = {
    'sort': 'name:desc',
    '_source': [
      'pmcid',
      'pubYear',
      'journalTitle',
      'citedByCount'],
  };
  error: string;

  constructor(private apiFileService: ApiFileService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private aggregationService: AggregationService,
              private exportService: ExportService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG articles');
    // this.spinner.show();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const filters = {};
      for (const key in params) {
        if (Array.isArray(params[key])) {
          filters[key] = params[key];
          for (const value of params[key]) {
            if (this.aggregationService.current_active_filters.indexOf(value) === -1) {
              this.aggregationService.current_active_filters.push(value);
              this.aggregationService.active_filters[key].push(value);
            }
          }
        } else {
          filters[key] = [params[key]];
          if (this.aggregationService.current_active_filters.indexOf(params[key]) === -1) {
            this.aggregationService.current_active_filters.push(params[key]);
            this.aggregationService.active_filters[key].push(params[key]);
          }
        }
      }
      this.filter_field = filters;
    });
    this.optionsCsv = this.exportService.optionsCsv;
    this.optionsTabular = this.exportService.optionsTabular;
    this.optionsCsv['headers'] = this.columnNames;
    this.optionsTabular['headers'] = this.optionsTabular;
    this.articleListLong = this.apiFileService.getAllArticles(this.query, 100000);
    this.articleListLongSubscription = this.articleListLong.subscribe((data) => {
      this.aggregationService.getAggregations(data, 'article');
    });
    this.aggrSubscription = this.aggregationService.field.subscribe((data) => {
      const params = {};
      for (const key in data) {
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
    if (typeof this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
    this.exportSubscription.unsubscribe();
    this.articleListLongSubscription.unsubscribe();
  }

}
