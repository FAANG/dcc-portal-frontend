import { Component, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {barChartOptions, pieChartOptions} from '../shared/chart-options';
import {ApiFileService} from '../services/api-file.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-files-summary',
  templateUrl: './files-summary.component.html',
  styleUrls: ['./files-summary.component.css']
})
export class FilesSummaryComponent implements OnInit {
  error: string;

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

  constructor(private apiFileService: ApiFileService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG summary|files');
    this.apiFileService.getFileSummary('summary_file').subscribe(
      data => {
        this.assignChartData(data['hits']['hits'][0]['_source']);
      },
      error => {
        this.error = error;
      }
    );
  }

  assignChartData(data: any) {
    for (const item of data['standardSummary']) {
      this.standardChartLabels.push(item['name']);
      this.standardChartData.push(item['value']);
    }
    for (const item of data['paperPublishedSummary']) {
      this.paperChartLabels.push(item['name']);
      this.paperChartData.push(item['value']);
    }
    for (const item of data['specieSummary']) {
      this.speciesChartLabels.push(item['name']);
      this.speciesChartData.push(item['value']);
    }
    for (const item of data['assayTypeSummary']) {
      this.assayTypeChartLabels.push(item['name']);
      this.assayTypeChartData.push(item['value']);
    }
  }

}
