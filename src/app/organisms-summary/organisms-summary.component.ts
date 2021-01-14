import { Component, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {barChartOptions, pieChartOptions} from '../shared/chart-options';
import {ApiDataService} from '../services/api-data.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-organisms-summary',
  templateUrl: './organisms-summary.component.html',
  styleUrls: ['./organisms-summary.component.css']
})
export class OrganismsSummaryComponent implements OnInit {
  name: string;
  error: string;
  chartData;
  excludeLegacyData = true;

  breedsData = {};
  breedKeys = [];

  public pieChartOptions = pieChartOptions;
  public barChartOptions = barChartOptions;
  public barChartPlugins = [pluginDataLabels];
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['#5bc0de', '#5cb85c'],
    },
  ];

  public sexChartLabels = [];
  public sexChartData = [];

  public paperChartLabels = [];
  public paperChartData = [];

  public standardChartLabels = [];
  public standardChartData = [];

  public organismChartLabels = [];
  public organismChartData = [];

  public breedChartLabels = [];
  public breedChartData = [];


  constructor(private dataService: ApiDataService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG summary|organisms');
    this.dataService.getOrganismSummary('summary_organism').subscribe(
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
    let sexSummaryName = 'sexSummary';
    let paperPublishedSummaryName = 'paperPublishedSummary';
    let standard_summary_name = 'standardSummary';
    let organism_summary_name = 'organismSummary';
    let breed_summary_name = 'breedSummary';
    if (excludeLegacy === true) {
      sexSummaryName = 'sexSummaryFAANGOnly';
      paperPublishedSummaryName = 'paperPublishedSummaryFAANGOnly';
      standard_summary_name = 'standardSummaryFAANGOnly';
      organism_summary_name = 'organismSummaryFAANGOnly';
      breed_summary_name = 'breedSummaryFAANGOnly';
    }
    if (data) {
      for (const item of data[sexSummaryName]) {
        this.sexChartLabels.push(item['name']);
        this.sexChartData.push(item['value']);
      }
      for (const item of data[paperPublishedSummaryName]) {
        this.paperChartLabels.push(item['name']);
        this.paperChartData.push(item['value']);
      }
      for (const item of data[organism_summary_name]) {
        this.organismChartLabels.push(item['name']);
        this.organismChartData.push(item['value']);
      }
      for (const item of data[standard_summary_name]) {
        this.standardChartLabels.push(item['name']);
        this.standardChartData.push(item['value']);
      }
      for (const item of data[breed_summary_name]) {
        this.breedKeys.push(item['speciesName']);
        const labels = [];
        const breed_data = [];
        for (const tmp of item['speciesValue']) {
          labels.push(tmp['breedsName']);
          breed_data.push(tmp['breedsValue']);
        }
        this.breedsData[item['speciesName']] = {
          'labels': labels,
          'data': breed_data
        };
      }
      this.name = this.breedKeys[0];
      this.breedChartLabels = this.breedsData[this.name]['labels'];
      this.breedChartData = this.breedsData[this.name]['data'];
    }
  }

  onItemClick(name: string) {
    this.name = name;
    this.breedChartLabels = this.breedsData[this.name]['labels'];
    this.breedChartData = this.breedsData[this.name]['data'];
  }

  clearChartData() {
    this.sexChartLabels = [];
    this.sexChartData = [];

    this.paperChartLabels = [];
    this.paperChartData = [];

    this.standardChartLabels = [];
    this.standardChartData = [];

    this.organismChartLabels = [];
    this.organismChartData = [];

    this.breedChartLabels = [];
    this.breedChartData = [];
  }

  onCheckboxClick() {
    this.excludeLegacyData = !this.excludeLegacyData;
    this.clearChartData();
    this.assignChartData(this.chartData, this.excludeLegacyData);
  }
}
