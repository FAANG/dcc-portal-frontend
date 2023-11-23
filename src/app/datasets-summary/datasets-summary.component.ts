import { Component, OnInit, ViewChild } from '@angular/core';
import {barChartOptions, pieChartOptions, doughnutChartOptions} from '../shared/chart-options';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {ApiDataService} from '../services/api-data.service';
import {Title} from '@angular/platform-browser';
import {MatTabGroup} from '@angular/material/tabs';
import {Router} from '@angular/router';
import {ChartConfiguration} from 'chart.js';

@Component({
  selector: 'app-datasets-summary',
  templateUrl: './datasets-summary.component.html',
  styleUrls: ['./datasets-summary.component.css']
})
export class DatasetsSummaryComponent implements OnInit {
  @ViewChild('tabs', { static: true }) tabGroup: MatTabGroup;
  error: string;
  chartData;
  excludeLegacyData = true;

  public doughnutChartOptions = doughnutChartOptions;
  public pieChartOptions = pieChartOptions;
  public barChartOptions = barChartOptions;
  public barChartPlugins = [ChartDataLabels];
  public pieChartPlugins = [ChartDataLabels];
  public pieChartColors = ['#5bc0de', '#5cb85c'];


  public standardChartLabels: any;
  public standardChartData: ChartConfiguration<'doughnut'>['data']['datasets'];

  public paperChartLabels = [];
  public paperChartData = [];

  public speciesChartData: any;

  public assayTypeChartData: any;

  constructor(
    private dataService: ApiDataService,
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG summary|datasets');
    this.tabGroup.selectedIndex = 2;
    this.dataService.getDatasetSummary('summary_dataset').subscribe(
      data => {
        this.chartData = data['hits']['hits'][0]['_source'];
        this.assignChartData(this.chartData, this.excludeLegacyData);
      },
      error => {
        this.error = error;
      }
    );
  }

  assignChartData(data: any, excludeLegacy: boolean) {
    let standardSummaryName = 'standardSummary';
    let paperPublishedSummaryName = 'paperPublishedSummary';
    let specieSummaryName = 'specieSummary';
    let assayTypeSummaryName = 'assayTypeSummary';
    if (excludeLegacy === true) {
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
          {'data': [item['value']]}
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
      if (Array.isArray(this.speciesChartData['datasets']) &&
        this.speciesChartData['datasets'][0] &&
        'data' in this.speciesChartData['datasets'][0]) {
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
      if (Array.isArray(this.assayTypeChartData['datasets']) &&
        this.assayTypeChartData['datasets'][0] &&
        'data' in this.assayTypeChartData['datasets'][0]) {
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

  tabClick(tab) {
    if (tab.index == 0) {
      this.router.navigate(['summary/organisms']);
    }
    else if (tab.index == 1) {
      this.router.navigate(['summary/specimens']);
    }
    else if (tab.index == 2) {
      this.router.navigate(['summary/datasets']);
    }
    else if (tab.index == 3) {
      this.router.navigate(['summary/files']);
    }
  }

}
