import { Component, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {barChartOptions, pieChartOptions} from '../shared/chart-options';
import {ApiFileService} from '../services/api-file.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-organisms-summary',
  templateUrl: './organisms-summary.component.html',
  styleUrls: ['./organisms-summary.component.css']
})
export class OrganismsSummaryComponent implements OnInit {
  name: string;
  error: string;
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


  constructor(private apiFileService: ApiFileService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG summary|organisms');
    this.apiFileService.getOrganismSummary('summary_organism').subscribe(
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
    for (const item of data['organismSummary']) {
      this.organismChartLabels.push(item['name']);
      this.organismChartData.push(item['value']);
    }
    for (const item of data['standardSummary']) {
      this.standardChartLabels.push(item['name']);
      this.standardChartData.push(item['value']);
    }
    for (const item of data['breedSummary']) {
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
}
