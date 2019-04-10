import { Component, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {barChartOptions, pieChartOptions} from '../shared/chart-options';
import {ApiFileService} from '../services/api-file.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-specimens-summary',
  templateUrl: './specimens-summary.component.html',
  styleUrls: ['./specimens-summary.component.css']
})
export class SpecimensSummaryComponent implements OnInit {
  name: string;
  error: string;

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


  constructor(private apiFileService: ApiFileService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG summary|specimens');
    this.apiFileService.getSpecimenSummary('summary_specimen').subscribe(
      data => {
        this.assignChartData(data['hits']['hits'][0]['_source']);
      },
      error => {
        this.error = error;
      }
    );
  }

  assignChartData(data: any) {
    for (const item of data['sexSummary']) {
      this.sexChartLabels.push(item['name']);
      this.sexChartData.push(item['value']);
    }
    for (const item of data['paperPublishedSummary']) {
      this.paperChartLabels.push(item['name']);
      this.paperChartData.push(item['value']);
    }
    for (const item of data['standardSummary']) {
      this.standardChartLabels.push(item['name']);
      this.standardChartData.push(item['value']);
    }
    for (const item of data['cellTypeSummary']) {
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
    for (const item of data['organismSummary']) {
      this.organismChartLabels.push(item['name']);
      this.organismChartData.push(item['value']);
    }
    for (const item of data['materialSummary']) {
      this.materialChartLabels.push(item['name']);
      this.materialChartData.push(item['value']);
    }
    for (const item of data['breedSummary']) {
      this.breedKeys.push(item['name']);
      const labels = [];
      const data = [];
      item['value'].sort(function (a: any, b: any) {
        return b['value'] - a['value'];
      });
      item['value'].forEach((v, i) => {
        if (i <= 10) {
          labels.push(v['name']);
          data.push(v['value']);
        }
      });
      this.breedData[item['name']] = {
        'labels': labels,
        'data': data
      };
    }
    this.name = this.breedKeys[0];
    this.breedChartLabels = this.breedData[this.name]['labels'];
    this.breedChartData = this.breedData[this.name]['data'];
  }

  onItemClick(name: string) {
    this.name = name;
    this.breedChartLabels = [];
    this.breedChartData = [];
    this.breedChartLabels = this.breedData[this.name]['labels'];
    this.breedChartData = this.breedData[this.name]['data'];
  }

}
