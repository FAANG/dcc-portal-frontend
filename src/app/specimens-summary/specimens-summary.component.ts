import { Component, OnInit, ViewChild } from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {barChartOptions, pieChartOptions, doughnutChartOptions} from '../shared/chart-options';
import {ApiDataService} from '../services/api-data.service';
import {Title} from '@angular/platform-browser';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import {Router} from '@angular/router';
import {ChartConfiguration} from 'chart.js';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { NgChartsModule } from 'ng2-charts';
import { MatCard } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout/flex';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-specimens-summary',
  templateUrl: './specimens-summary.component.html',
  styleUrls: ['./specimens-summary.component.css'],
  standalone: true,
  imports: [HeaderComponent, FlexModule, MatTabGroup, MatTab, MatCard, NgChartsModule, MatButton, MatMenuTrigger, MatIcon,
    MatMenu, MatMenuItem]
})
export class SpecimensSummaryComponent implements OnInit {
  @ViewChild('tabs', { static: true }) tabGroup!: MatTabGroup;
  name = '';
  error = '';
  chartData: any;
  excludeLegacyData = true;

  cellsData: {[index: string]: any} = {};
  breedKeys: any[] = [];
  breedData: {[index: string]: any} = {};

  public doughnutChartOptions = doughnutChartOptions;
  public pieChartOptions = pieChartOptions;
  public barChartOptions = barChartOptions;
  public barChartPlugins = [ChartDataLabels];
  public pieChartPlugins = [ChartDataLabels];
  // public doughnutChartPlugins = [ChartDataLabels];
  public pieChartColors = ['#5bc0de', '#5cb85c', '#428bca', 'rgba(217,83,79,0.5)', '#f9f9f9'];

  public sexChartLabels: any;
  public sexChartData: any;

  public paperChartLabels: any[] = [];
  public paperChartData: any[] = [];

  public standardChartLabels: any;
  public standardChartData!: ChartConfiguration<'doughnut'>['data']['datasets'];

  // public cellsChartLabels = [];
  public cellsChartData: any;



  public organismChartData: any;

  public materialChartLabels: any;
  public materialChartData: any;

  public breedChartData: any;


  constructor(
    private dataService: ApiDataService,
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG summary|specimens');
    this.tabGroup.selectedIndex = 1;
    this.dataService.getSpecimenSummary('summary_specimen').subscribe({
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
    let sexSummaryName = 'sexSummary';
    let paperPublishedSummaryName = 'paperPublishedSummary';
    let standard_summary_name = 'standardSummary';
    let cell_type_summary_name = 'cellTypeSummary';
    let organism_summary_name = 'organismSummary';
    let material_summary_name = 'materialSummary';
    let breed_summary_name = 'breedSummary';
    if (excludeLegacy) {
      sexSummaryName = 'sexSummaryFAANGOnly';
      paperPublishedSummaryName = 'paperPublishedSummaryFAANGOnly';
      standard_summary_name = 'standardSummaryFAANGOnly';
      cell_type_summary_name = 'cellTypeSummaryFAANGOnly';
      organism_summary_name = 'organismSummaryFAANGOnly';
      material_summary_name = 'materialSummaryFAANGOnly';
      breed_summary_name = 'breedSummaryFAANGOnly';
    }
    // sex piechart
    for (const item of data[sexSummaryName]) {
      // labels array
      if (Array.isArray(this.sexChartLabels)) {
        this.sexChartLabels.push(item['name']);
      } else {
        this.sexChartLabels = [item['name']];
      }
      // data array
      if (Array.isArray(this.sexChartData) && this.sexChartData[0] && 'data' in this.sexChartData[0]) {
        this.sexChartData[0]['data'].push(item['value']);
      } else {
        this.sexChartData = [{'data': [item['value']]}];
      }
    }
    this.sexChartData[0]['backgroundColor'] = this.pieChartColors;

    // paper published piechart
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

    // standard doughnut chart
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


    // cell type barchart
    for (const item of data[cell_type_summary_name]) {
      this.cellsData[item['name']] = item['value'];
    }
    const tmp = Object.entries(this.cellsData);
    tmp.sort(function (a: any, b: any) {
      return b[1] - a[1];
    });
    tmp.forEach((item, index) => {
      if (index <= 10) {
        // labels array
        if (typeof this.cellsChartData === 'object' && Array.isArray(this.cellsChartData['labels'])) {
          this.cellsChartData['labels'].push(item[0]);
        } else {
          this.cellsChartData = {
            labels: [item[0]],
            datasets: [
              {data: [], label: ''},
            ]
          };
        }
        // data array
        if (Array.isArray(this.cellsChartData['datasets']) && 'data' in this.cellsChartData['datasets'][0]) {
          this.cellsChartData['datasets'][0]['data'].push(item[1]);
        } else {
          this.cellsChartData = {
            datasets: [
              {data: [item[1]], label: ''},
            ]
          };
        }

      }
    });


    // organism summary name barchart
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
      if (Array.isArray(this.organismChartData['datasets']) &&
        this.organismChartData['datasets'][0] &&
        'data' in this.organismChartData['datasets'][0]) {
        this.organismChartData['datasets'][0]['data'].push(item['value']);
      } else {
        this.organismChartData = {
          datasets: [
            {data: [item['value']], label: ''},
          ]
        };
      }
    }

    // material doughnut chart
    for (const item of data[material_summary_name]) {
      // labels array
      if (Array.isArray(this.materialChartLabels)) {
        this.materialChartLabels.push(item['name']);
      } else {
        this.materialChartLabels = [item['name']];
      }
      // data array
      if (Array.isArray(this.materialChartData) && this.materialChartData[0] && 'data' in this.materialChartData[0]) {
        this.materialChartData[0]['data'].push(item['value']);
      } else {
        this.materialChartData = [
          {
            'data': [item['value']],
            'backgroundColor': this.pieChartColors
          }
        ];
      }

    }



    for (const item of data[breed_summary_name]) {
      this.breedKeys.push(item['speciesName']);
      const labels: any[] = [];
      const breed_data: any[] = [];
      item['speciesValue'].sort(function (a: any, b: any) {
        return b['breedsValue'] - a['breedsValue'];
      });
      item['speciesValue'].forEach((v: { [x: string]: any; }, i: number) => {
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
    this.breedChartData = {
      labels: this.breedData[this.name]['labels'],
      datasets: [
        {data: this.breedData[this.name]['data'], label: ''},
      ]
    };
  }

  onItemClick(name: string) {
    this.name = name;
    this.breedChartData = {
      labels: this.breedData[this.name]['labels'],
      datasets: [
        {data: this.breedData[this.name]['data'], label: ''},
      ]
    };

  }

  clearChartData() {
    this.sexChartLabels = [];
    this.sexChartData = [];

    this.paperChartLabels = [];
    this.paperChartData = [];

    this.standardChartLabels = [];
    this.standardChartData = [];

    this.cellsChartData = [];

    this.organismChartData = [];

    this.materialChartLabels = [];
    this.materialChartData = [];

    this.breedChartData = [];
  }

  onCheckboxClick() {
    this.excludeLegacyData = !this.excludeLegacyData;
    this.clearChartData();
    this.assignChartData(this.chartData, this.excludeLegacyData);
  }

  tabClick(tab: { index: number; }) {
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
