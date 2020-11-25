import {Component, OnDestroy, OnInit, AfterViewInit, TemplateRef, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiDataService} from '../services/api-data.service';
import {OrganismTable} from '../shared/interfaces';
import {AggregationService} from '../services/aggregation.service';
import {Observable, Subscription} from 'rxjs';
import {ExportService} from '../services/export.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TableClientSideComponent}  from '../shared/table-client-side/table-client-side.component';

@Component({
  selector: 'app-organism',
  templateUrl: './organism.component.html',
  styleUrls: ['./organism.component.css']
})
export class OrganismComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('bioSampleIdTemplate', { static: true }) bioSampleIdTemplate: TemplateRef<any>;
  @ViewChild('paperPublishedTemplate', { static: true }) paperPublishedTemplate: TemplateRef<any>;
  @ViewChildren("tableComp") tableComponents: QueryList<TableClientSideComponent>;
  private tableClientComponent: TableClientSideComponent;
  organismListShort: Observable<OrganismTable[]>;
  organismListLong: Observable<OrganismTable[]>;

  columnNames: string[] = ['BioSample ID', 'Sex', 'Organism', 'Breed', 'Standard', 'Paper published'];
  displayFields: string[] = ['bioSampleId', 'sex', 'organism', 'breed', 'standard', 'paperPublished'];
  templates: Object;
  filter_field: {};
  aggrSubscription: Subscription;
  exportSubscription: Subscription;
  organismListLongSubscription: Subscription;
  downloadData = false;

  optionsCsv;
  optionsTabular;
  data = {};

  error: string;

  private query = {
    'sort': 'id_number:desc',
    '_source': [
      'biosampleId',
      'sex.text',
      'organism.text',
      'breed.text',
      'standardMet',
      'id_number',
      'paperPublished'],
  };

  constructor(private dataService: ApiDataService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private aggregationService: AggregationService,
              private spinner: NgxSpinnerService,
              private exportService: ExportService,
              private titleService: Title) { }

  ngOnInit() {
    this.templates = {'bioSampleId': this.bioSampleIdTemplate, 
                      'paperPublished': this.paperPublishedTemplate };
    this.titleService.setTitle('FAANG organisms');
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
      for (const key in filters) {
        if (key == 'paper_published') {
          filters['paper_published'].forEach(function(item, i) { 
            if (item == 'Yes') 
              filters['paper_published'][i] = 'true'; 
            else
              filters['paper_published'][i] = 'false'; 
          });
          filters['paperPublished'] = filters['paper_published'];
          delete filters['paper_published'];
        }
      }
      this.filter_field = filters;
      this.filter_field = Object.assign({}, this.filter_field);
    });
    this.optionsCsv = this.exportService.optionsCsv;
    this.optionsTabular = this.exportService.optionsTabular;
    this.optionsCsv['headers'] = this.columnNames;
    this.optionsTabular['headers'] = this.columnNames;
    this.dataService.getAllOrganisms(this.query, 25).subscribe(
      (data) => {
        this.organismListShort = data;
        if (this.organismListShort) {
          this.spinner.hide();
        }
      },
      error => {
        this.error = error;
        this.spinner.hide();
      }
    );
    this.organismListLong = this.dataService.getAllOrganisms(this.query, 100000);
    this.organismListLongSubscription = this.organismListLong.subscribe((data) => {
      this.aggregationService.getAggregations(data, 'organism');
    });
    this.aggrSubscription = this.aggregationService.field.subscribe((data) => {
      const params = {};
      for (const key of Object.keys(data)) {
        if (data[key] && data[key].length !== 0) {
          params[key] = data[key];
        }
      }
      this.router.navigate(['organism'], {queryParams: params});
    });
    this.exportSubscription = this.exportService.data.subscribe((data) => {
      this.data = data;
    });
  }

  ngAfterViewInit() {
      this.tableComponents.changes.subscribe((comps: QueryList <TableClientSideComponent>) => {
          this.tableClientComponent = comps.first;
          this.aggregationService.getAggregations(this.tableClientComponent.dataSource.filteredData, 'organism');
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
    this.router.navigate(['organism'], {queryParams: {}});
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  wasPublished(published: any) {
    return published === 'true';
  }

  isGreen(published: any) {
    return published === 'true' ? 'green' : 'default';
  }

  ngOnDestroy() {
    if (typeof this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.aggrSubscription.unsubscribe();
    this.exportSubscription.unsubscribe();
    this.organismListLongSubscription.unsubscribe();
  }
}
