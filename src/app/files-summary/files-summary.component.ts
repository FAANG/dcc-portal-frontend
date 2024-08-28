import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {barChartOptions, pieChartOptions, doughnutChartOptions} from '../shared/chart-options';
import {ApiDataService} from '../services/api-data.service';
import {Title} from '@angular/platform-browser';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import {Router} from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { MatCard } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout/flex';
import { HeaderComponent } from '../shared/header/header.component';
import {ActiveFilterComponent} from "../shared/active-filter/active-filter.component";

@Component({
  selector: 'app-files-summary',
  templateUrl: './files-summary.component.html',
  styleUrls: ['./files-summary.component.css'],
  standalone: true,
  imports: [HeaderComponent, FlexModule, MatTabGroup, MatTab, MatCard, NgChartsModule, ActiveFilterComponent]
})
export class FilesSummaryComponent implements OnInit {
  @ViewChild('tabs', {static: true}) tabGroup!: MatTabGroup;
  error = '';
  chartData: any;
  excludeLegacyData = true;


  public doughnutChartOptions = doughnutChartOptions;
  public pieChartOptions = pieChartOptions;
  public barChartOptions = barChartOptions;

  public barChartPlugins = [ChartDataLabels];
  public pieChartPlugins = [ChartDataLabels];
  // public doughnutChartPlugins = [ChartDataLabels];


  public pieChartColors = ['#5bc0de', '#5cb85c'];

  public standardChartLabels: any[] = [];
  public standardChartData: any[] = [];

  public paperChartLabels: any[] = [];
  public paperChartData: any[] = [];

  public speciesChartData: any;


  public assayTypeChartData: any;

  constructor(
    private dataService: ApiDataService,
    private titleService: Title,
    private router: Router
  ) {
  }

  ngOnInit() {
    Chart.register(ChartDataLabels);
    this.titleService.setTitle('FAANG summary|files');
    this.tabGroup.selectedIndex = 3;
    this.dataService.getFileSummary('summary_file').subscribe({
      next: data => {
        this.chartData = data['hits']['hits'][0]['_source'];
        this.assignChartData(this.chartData, this.excludeLegacyData);
      },
      error: error => {
        this.error = error;
      }
    });
  }

  assignChartData(data: any, excludeLegacy: boolean) {
    let standardSummaryName = 'standardSummary';
    let paperPublishedSummaryName = 'paperPublishedSummary';
    let specieSummaryName = 'specieSummary';
    let assayTypeSummaryName = 'assayTypeSummary';
    if (excludeLegacy) {
      standardSummaryName = 'standardSummaryFAANGOnly';
      paperPublishedSummaryName = 'paperPublishedSummaryFAANGOnly';
      specieSummaryName = 'specieSummaryFAANGOnly';
      assayTypeSummaryName = 'assayTypeSummaryFAANGOnly';
    }
    for (const item of data[standardSummaryName]) {
      // labels array
      if (Array.isArray(this.standardChartLabels)) {
        this.standardChartLabels.push(item['name']);
      } else {
        this.standardChartLabels = [item['name']];
      }
      // data array
      if (Array.isArray(this.standardChartData) && this.standardChartData[0] && 'data' in this.standardChartData[0]) {
        this.standardChartData[0]['data'].push(item['value']);
      } else {
        this.standardChartData = [
          {
            'data': [item['value']],
            'backgroundColor': this.pieChartColors
          }
        ];
      }

    }
    for (const item of data[paperPublishedSummaryName]) {
      // labels array
      if (Array.isArray(this.paperChartLabels)) {
        this.paperChartLabels.push(item['name']);
      } else {
        this.paperChartLabels = [item['name']];
      }
      // data array
      if (Array.isArray(this.paperChartData) && this.paperChartData[0] && 'data' in this.paperChartData[0]) {
        this.paperChartData[0]['data'].push(item['value']);
      } else {
        this.paperChartData = [{'data': [item['value']]}];
      }
    }
    this.paperChartData[0]['backgroundColor'] = this.pieChartColors;

    for (const item of data[specieSummaryName]) {
      // labels array
      if (typeof this.speciesChartData === 'object' && Array.isArray(this.speciesChartData['labels'])) {
        this.speciesChartData['labels'].push(item['name']);
      } else {
        this.speciesChartData = {
          labels: [item['name']],
          datasets: [
            {data: [], label: ''},
          ]
        };
      }
      // data array
      if (Array.isArray(this.speciesChartData['datasets']) && 'data' in this.speciesChartData['datasets'][0]) {
        this.speciesChartData['datasets'][0]['data'].push(item['value']);
      } else {
        this.speciesChartData = {
          datasets: [
            {data: [item['value']], label: ''},
          ]
        };
      }
    }
    for (const item of data[assayTypeSummaryName]) {
      // labels array
      if (typeof this.assayTypeChartData === 'object' && Array.isArray(this.assayTypeChartData['labels'])) {
        this.assayTypeChartData['labels'].push(item['name']);
      } else {
        this.assayTypeChartData = {
          labels: [item['name']],
          datasets: [
            {data: [], label: ''},
          ]
        };
      }
      // data array
      if (Array.isArray(this.assayTypeChartData['datasets']) && 'data' in this.assayTypeChartData['datasets'][0]) {
        this.assayTypeChartData['datasets'][0]['data'].push(item['value']);
      } else {
        this.assayTypeChartData = {
          datasets: [
            {data: [item['value']], label: ''},
          ]
        };
      }
    }
  }

  clearChartData() {
    this.standardChartLabels = [];
    this.standardChartData = [];

    this.paperChartLabels = [];
    this.paperChartData = [];

    this.speciesChartData = [];

    this.assayTypeChartData = [];
  }

  onCheckboxClick() {
    this.excludeLegacyData = !this.excludeLegacyData;
    this.clearChartData();
    this.assignChartData(this.chartData, this.excludeLegacyData);
  }

  tabClick(tab: any) {
    if (tab.index === 0) {
      void this.router.navigate(['summary/organisms']);
    } else if (tab.index === 1) {
      void this.router.navigate(['summary/specimens']);
    } else if (tab.index === 2) {
      void this.router.navigate(['summary/datasets']);
    } else if (tab.index === 3) {
      void this.router.navigate(['summary/files']);
    }
  }

}
