import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { pieChartOptions} from '../shared/chart-options';
import {ApiDataService} from '../services/api-data.service';
import {Title} from '@angular/platform-browser';
import {MatTabGroup} from '@angular/material/tabs';
import {Router} from '@angular/router';
import {ChartOptions} from 'chart.js';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-organisms-summary',
  templateUrl: './organisms-summary.component.html',
  styleUrls: ['./organisms-summary.component.css']
})
export class OrganismsSummaryComponent implements OnInit, AfterViewInit {

  // Pie
  public pieChartLabels = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartDatasets = [{
    data: [300, 500, 100],
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public barChartPlugins = [];


  @ViewChild('tabs', {static: true}) tabGroup: MatTabGroup;
  name: string;
  error: string;
  chartData;
  excludeLegacyData = true;

  breedsData = {};
  breedKeys = [];


  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  public pieChartOptions = pieChartOptions;
  // public barChartOptions = barChartOptions;
  // public barChartPlugins = [pluginDataLabels];
  // public pieChartPlugins = [pluginDataLabels];
  // public pieChartColors = [
  //   {
  //     backgroundColor: ['#5bc0de', '#5cb85c'],
  //   },
  // ];

  public pieChartColors = ['#5bc0de', '#5cb85c'];


  // public sexChartLabels = [];
  // public sexChartData = [{data: []}];

  public sexChartLabels: any;
  public sexChartData: any;

  public paperChartLabels = [];
  public paperChartData = [{data: []}];

  public standardChartLabels = [];
  public standardChartData = [];

  public organismChartLabels = [];
  public organismChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: '' },
    ]
  };



  public barChartLegend = true;
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
    ]
  };




  public breedChartLabels = [];
  public breedChartData = [];


  constructor(
    private dataService: ApiDataService,
    private titleService: Title,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('FAANG summary|organisms');
    this.tabGroup.selectedIndex = 0;
    this.dataService.getOrganismSummary('summary_organism').subscribe(
      data => {
        this.chartData = data['hits']['hits'][0]['_source'];
        console.log("1")
        this.assignChartData(this.chartData, this.excludeLegacyData);
        console.log("2")
      },
      error => {
        this.error = error;
      }
    );
  }

  ngAfterViewInit(){
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
    for (const item of data[sexSummaryName]) {
      // this.sexChartLabels.push(item['name']);
      // this.sexChartData[0]['data'].push(item['value']);

      if (Array.isArray(this.sexChartLabels)){
        this.sexChartLabels.push(item['name']);
      } else {
        this.sexChartLabels = [item['name']];
      }

      if (Array.isArray(this.sexChartData) && 'data' in this.sexChartData[0]){
        this.sexChartData[0]['data'].push(item['value']);
      } else {
        this.sexChartData = [{'data': [item['value']]}];
      }

    }
    this.sexChartData[0]['backgroundColor'] = this.pieChartColors;

    for (const item of data[paperPublishedSummaryName]) {
      this.paperChartLabels.push(item['name']);
      this.paperChartData[0]['data'].push(item['value']);
    }
    this.paperChartData[0]['backgroundColor'] = this.pieChartColors;

    for (const item of data[organism_summary_name]) {
      this.organismChartData['labels'].push(item['name']);
      this.organismChartData['datasets'][0]['data'].push(item['value']);
    }
    console.log(this.organismChartData)
    for (const item of data[standard_summary_name]) {
      this.standardChartData.push(item['name']);
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

  onItemClick(name: string) {
    this.name = name;
    this.breedChartLabels = this.breedsData[this.name]['labels'];
    this.breedChartData = this.breedsData[this.name]['data'];
  }

  clearChartData() {
    this.sexChartLabels = [];
    this.sexChartData = [{
      data: []
    }];

    this.paperChartLabels = [];
    this.paperChartData = [{
      data: []
    }];

    this.standardChartLabels = [];
    this.standardChartData = [];

    this.organismChartLabels = [];
    this.organismChartData = {
      labels: [],
      datasets: [
        { data: [], label: '' },
      ]
    };

    this.breedChartLabels = [];
    this.breedChartData = [];
  }

  onCheckboxClick() {
    this.excludeLegacyData = !this.excludeLegacyData;
    this.clearChartData();
    this.assignChartData(this.chartData, this.excludeLegacyData);
  }

  tabClick(tab) {
    if (tab.index == 0) {
      this.router.navigate(['summary/organisms']);
    } else if (tab.index == 1) {
      this.router.navigate(['summary/specimens']);
    } else if (tab.index == 2) {
      this.router.navigate(['summary/datasets']);
    } else if (tab.index == 3) {
      this.router.navigate(['summary/files']);
    }
  }
}
