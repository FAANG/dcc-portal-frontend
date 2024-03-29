import {Component, OnInit, ViewChild} from '@angular/core';
import {barChartOptions, pieChartOptions, doughnutChartOptions} from '../shared/chart-options';
import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {ApiDataService} from '../services/api-data.service';
import {Title} from '@angular/platform-browser';
import {MatTabGroup} from '@angular/material/tabs';
import {Router} from '@angular/router';
import {ChartOptions} from 'chart.js';
import {ChartConfiguration} from 'chart.js';

@Component({
  selector: 'app-organisms-summary',
  templateUrl: './organisms-summary.component.html',
  styleUrls: ['./organisms-summary.component.css']
})
export class OrganismsSummaryComponent implements OnInit {

  public doughnutChartOptions = doughnutChartOptions;

  public pieChartOptions = pieChartOptions;
  public pieChartColors = ['#5bc0de', '#5cb85c', '#D3D3D3'];
  public pieChartPlugins = [ChartDataLabels];

  public barChartPlugins = [ChartDataLabels];
  public barChartOptions = barChartOptions;

  @ViewChild('tabs', {static: true}) tabGroup: MatTabGroup;
  name: string;
  error: string;
  chartData;
  excludeLegacyData = true;
  breedsData = {};
  breedKeys: any;

  public sexChartLabels: any;
  public sexChartData: any;

  public paperChartLabels: any;
  public paperChartData: any;

  public standardChartLabels: any;
  public standardChartData: ChartConfiguration<'doughnut'>['data']['datasets'];

  public organismChartData: ChartConfiguration<'bar'>['data'];

  public breedChartLabels = [];
  public breedChartData: ChartConfiguration<'bar'>['data'];


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
    for (const item of data[sexSummaryName]) {
      // labels array
      if (Array.isArray(this.sexChartLabels)) {
        this.sexChartLabels.push(item['name']);
      } else {
        this.sexChartLabels = [item['name']];
      }
      // data array
      if (Array.isArray(this.sexChartData) && 'data' in this.sexChartData[0]) {
        this.sexChartData[0]['data'].push(item['value']);
      } else {
        this.sexChartData = [{'data': [item['value']]}];
      }
    }
    this.sexChartData[0]['backgroundColor'] = this.pieChartColors;

    for (const item of data[paperPublishedSummaryName]) {
      // labels array
      if (Array.isArray(this.paperChartLabels)) {
        this.paperChartLabels.push(item['name']);
      } else {
        this.paperChartLabels = [item['name']];
      }

      // data array
      if (Array.isArray(this.paperChartData) && 'data' in this.paperChartData[0]) {
        this.paperChartData[0]['data'].push(item['value']);
      } else {
        this.paperChartData = [{'data': [item['value']]}];
      }

    }
    this.paperChartData[0]['backgroundColor'] = this.pieChartColors;

    for (const item of data[organism_summary_name]) {
      // labels array
      if (typeof this.organismChartData === 'object' && Array.isArray(this.organismChartData['labels'])) {
        this.organismChartData['labels'].push(item['name']);
      } else {
        this.organismChartData = {
          labels: [item['name']],
          datasets: [
            {data: [], label: ''},
          ]
        };
      }
      // data array
      if (Array.isArray(this.organismChartData['datasets']) && 'data' in this.organismChartData['datasets'][0]) {
        this.organismChartData['datasets'][0]['data'].push(item['value']);
      } else {
        this.organismChartData = {
          datasets: [
            {data: [item['value']], label: ''},
          ]
        };
      }
    }

    // standard chart
    for (const item of data[standard_summary_name]) {
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

    for (const item of data[breed_summary_name]) {
      if (Array.isArray(this.breedKeys)) {
        this.breedKeys.push(item['speciesName']);
      } else {
        this.breedKeys = [item['speciesName']];
      }
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
    this.breedChartData = {
      labels: this.breedsData[this.name]['labels'],
      datasets: [
        {data: this.breedsData[this.name]['data'], label: ''},
      ]
    };
  }

  onItemClick(name: string) {
    this.name = name;
    this.breedChartData = {
      labels: this.breedsData[this.name]['labels'],
      datasets: [
        {data: this.breedsData[this.name]['data'], label: ''},
      ]
    };
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

    // this.organismChartLabels = [];
    this.organismChartData = {
      labels: [],
      datasets: [
        {data: [], label: ''},
      ]
    };

    this.breedChartLabels = [];
    this.breedChartData = {
      labels: [],
      datasets: [
        {data: [], label: ''},
      ]
    };
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


  populateBarChart(chartData, data) {
    // labels array
    if (typeof chartData === 'object' && Array.isArray(chartData['labels'])) {
      chartData['labels'].push(data['name']);
    } else {
      chartData = {
        labels: [data['name']],
      };
    }
    // data array
    if (Array.isArray(chartData['datasets']) && 'data' in chartData['datasets'][0]) {
      chartData['datasets'][0]['data'].push(data['value']);
    } else {
      chartData = {
        datasets: [
          {data: [data['value']], label: ''},
        ]
      };
    }
  }
}
