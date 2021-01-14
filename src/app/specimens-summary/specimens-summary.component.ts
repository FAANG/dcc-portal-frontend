import { Component, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {barChartOptions, pieChartOptions} from '../shared/chart-options';
import {ApiDataService} from '../services/api-data.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-specimens-summary',
  templateUrl: './specimens-summary.component.html',
  styleUrls: ['./specimens-summary.component.css']
})
export class SpecimensSummaryComponent implements OnInit {
  name: string;
  error: string;
  chartData;
  excludeLegacyData = true;

  cellsData = {};
  breedKeys = [];
  breedData = {};
  public pieChartOptions = pieChartOptions;
  public barChartOptions = barChartOptions;
  public barChartPlugins = [pluginDataLabels];
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['#5bc0de', '#5cb85c', '#428bca', 'rgba(217,83,79,0.5)', '#f9f9f9'],
    },
  ];

  public sexChartLabels = [];
  public sexChartData = [];

  public paperChartLabels = [];
  public paperChartData = [];

  public standardChartLabels = [];
  public standardChartData = [];

  public cellsChartLabels = [];
  public cellsChartData = [];

  public organismChartLabels = [];
  public organismChartData = [];

  public materialChartLabels = [];
  public materialChartData = [];

  public breedChartLabels = [];
  public breedChartData = [];


  constructor(private dataService: ApiDataService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG summary|specimens');
    this.dataService.getSpecimenSummary('summary_specimen').subscribe(
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
    let cell_type_summary_name = 'cellTypeSummary';
    let organism_summary_name = 'organismSummary';
    let material_summary_name = 'materialSummary';
    let breed_summary_name = 'breedSummary';
    if (excludeLegacy === true) {
      sexSummaryName = 'sexSummaryFAANGOnly';
      paperPublishedSummaryName = 'paperPublishedSummaryFAANGOnly';
      standard_summary_name = 'standardSummaryFAANGOnly';
      cell_type_summary_name = 'cellTypeSummaryFAANGOnly';
      organism_summary_name = 'organismSummaryFAANGOnly';
      material_summary_name = 'materialSummaryFAANGOnly';
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
      for (const item of data[standard_summary_name]) {
        this.standardChartLabels.push(item['name']);
        this.standardChartData.push(item['value']);
      }
      for (const item of data[cell_type_summary_name]) {
        this.cellsData[item['name']] = item['value'];
      }
      const tmp = Object.entries(this.cellsData);
      tmp.sort(function (a: any, b: any) {
        return b[1] - a[1];
      });
      tmp.forEach((item, index) => {
        if (index <= 10) {
          this.cellsChartLabels.push(item[0]);
          this.cellsChartData.push(item[1]);
        }
      });
      for (const item of data[organism_summary_name]) {
        this.organismChartLabels.push(item['name']);
        this.organismChartData.push(item['value']);
      }
      for (const item of data[material_summary_name]) {
        this.materialChartLabels.push(item['name']);
        this.materialChartData.push(item['value']);
      }
      for (const item of data[breed_summary_name]) {
        this.breedKeys.push(item['speciesName']);
        const labels = [];
        const breed_data = [];
        item['speciesValue'].sort(function (a: any, b: any) {
          return b['breedsValue'] - a['breedsValue'];
        });
        item['speciesValue'].forEach((v, i) => {
          if (i <= 10) {
            labels.push(v['breedsName']);
            breed_data.push(v['breedsValue']);
          }
        });
        this.breedData[item['speciesName']] = {
          'labels': labels,
          'data': breed_data
        };
      }
      this.name = this.breedKeys[0];
      this.breedChartLabels = this.breedData[this.name]['labels'];
      this.breedChartData = this.breedData[this.name]['data'];  
    }
  }

  onItemClick(name: string) {
    this.name = name;
    this.breedChartLabels = [];
    this.breedChartData = [];
    this.breedChartLabels = this.breedData[this.name]['labels'];
    this.breedChartData = this.breedData[this.name]['data'];
  }

  clearChartData() {
    this.sexChartLabels = [];
    this.sexChartData = [];

    this.paperChartLabels = [];
    this.paperChartData = [];

    this.standardChartLabels = [];
    this.standardChartData = [];

    this.cellsChartLabels = [];
    this.cellsChartData = [];

    this.organismChartLabels = [];
    this.organismChartData = [];

    this.materialChartLabels = [];
    this.materialChartData = [];

    this.breedChartLabels = [];
    this.breedChartData = [];
  }

  onCheckboxClick() {
    this.excludeLegacyData = !this.excludeLegacyData;
    this.clearChartData();
    this.assignChartData(this.chartData, this.excludeLegacyData);
  }

}
