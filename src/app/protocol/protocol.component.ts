import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {ApiFileService} from '../services/api-file.service';
import {Title} from '@angular/platform-browser';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs/internal/Subscription';
import {AggregationService} from '../services/aggregation.service';
import {ExportService} from '../services/export.service';

@Component({
  selector: 'app-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.css']
})
export class ProtocolComponent implements OnInit, OnDestroy {
  protocolList: Observable<any[]>;
  protocolListSubscription: Subscription;
  aggrSubscription: Subscription;
  exportSubscription: Subscription;
  columnNames: string[] = ['Protocol name', 'University name', 'Year of protocol', 'Protocol type'];
  exportNames: string[] = ['Protocol name', 'Protocol type', 'University name', 'Protocol Year'];
  filter_field: {};
  downloadData = false;

  optionsCsv;
  optionsTabular;
  data = {};

  // Local variable for pagination
  p = 1;
  error: string;

  constructor(private apiFileService: ApiFileService,
              private aggregationService: AggregationService,
              private exportService: ExportService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG protocols');
    this.spinner.show();
    this.optionsCsv = this.exportService.optionsCsv;
    this.optionsTabular = this.exportService.optionsTabular;
    this.optionsCsv['headers'] = this.exportNames;
    this.optionsTabular['headers'] = this.exportNames;
    this.protocolList = this.apiFileService.getAllProtocols();
    this.spinner.hide();
    this.protocolListSubscription = this.protocolList.subscribe( data => {
      this.aggregationService.getAggregations(data, 'protocol');
    });
    this.aggrSubscription = this.aggregationService.field.subscribe((data) => {
      this.filter_field = data;
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
    for (const key of Object.keys(this.filter_field)) {
      this.filter_field[key] = [];
      this.aggregationService.current_active_filters = [];
    }
  }

  onDownloadData() {
    this.downloadData = !this.downloadData;
  }

  ngOnDestroy() {
    if (typeof this.filter_field !== 'undefined') {
      this.resetFilter();
    }
    this.protocolListSubscription.unsubscribe();
    this.aggrSubscription.unsubscribe();
    this.exportSubscription.unsubscribe();
  }

}
