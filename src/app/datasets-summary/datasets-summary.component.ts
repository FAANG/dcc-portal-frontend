import { Component, OnInit, ViewChild } from '@angular/core';
import {barChartOptions, pieChartOptions} from '../shared/chart-options';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {ApiDataService} from '../services/api-data.service';
import {Title} from '@angular/platform-browser';
import {MatTabGroup} from '@angular/material/tabs';
import {Router} from '@angular/router';

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

  public pieChartOptions = pieChartOptions;
  public barChartOptions = barChartOptions;
  public barChartPlugins = [pluginDataLabels];
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['#5bc0de', '#5cb85c'],
    },
  ];


  public standardChartLabels = [];
  public standardChartData = [];

  public paperChartLabels = [];
  public paperChartData = [];

  public speciesChartLabels = [];
  public speciesChartData = [];

  public assayTypeChartLabels = [];
  public assayTypeChartData = [];

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
      this.standardChartLabels.push(item['name']);
      this.standardChartData.push(item['value']);
    }
    for (const item of data[paperPublishedSummaryName]) {
      this.paperChartLabels.push(item['name']);
      this.paperChartData.push(item['value']);
    }
    for (const item of data[specieSummaryName]) {
      this.speciesChartLabels.push(item['name']);
      this.speciesChartData.push(item['value']);
    }
    for (const item of data[assayTypeSummaryName]) {
      this.assayTypeChartLabels.push(item['name']);
      this.assayTypeChartData.push(item['value']);
    }
  }

  clearChartData() {
    this.standardChartLabels = [];
    this.standardChartData = [];

    this.paperChartLabels = [];
    this.paperChartData = [];

    this.speciesChartLabels = [];
    this.speciesChartData = [];

    this.assayTypeChartLabels = [];
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
