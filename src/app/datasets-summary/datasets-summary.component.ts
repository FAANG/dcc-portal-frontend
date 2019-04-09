import { Component, OnInit } from '@angular/core';
import {barChartOptions, pieChartOptions} from '../shared/chart-options';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-datasets-summary',
  templateUrl: './datasets-summary.component.html',
  styleUrls: ['./datasets-summary.component.css']
})
export class DatasetsSummaryComponent implements OnInit {
  standardData = {'Legacy': 420, 'FAANG': 22};
  paperPublishedData = {'yes': 152, 'no': 290};
  speciesData = {'Bubalus bubalis': 1, 'Sus scrofa': 77, 'Bos taurus': 129, 'Gallus gallus': 111, 'Equus caballus': 63, 'Ovis aries': 48, 'Capra hircus': 33,
    'Bos indicus': 1};

  assayTypeData = {'whole genome sequencing assay': 323, 'ChIP-seq': 55, 'methylation profiling by high throughput sequencing': 50,
    'transcription profiling by high throughput sequencing': 10, 'RNA-seq of coding RNA': 4, 'ATAC-seq': 4, 'Hi-C': 4,
    'RNA-seq of non coding RNA': 1, 'microRNA profiling by high throughput sequencing': 1, 'DNase-Hypersensitivity seq': 1};

  public pieChartOptions = pieChartOptions;
  public barChartOptions = barChartOptions;
  public barChartPlugins = [pluginDataLabels];
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


  public standardChartLabels = Object.keys(this.standardData);
  public standardChartData = Object.values(this.standardData);

  public paperChartLabels = Object.keys(this.paperPublishedData);
  public paperChartData = Object.values(this.paperPublishedData);

  public speciesChartLabels = Object.keys(this.speciesData);
  public speciesChartData = Object.values(this.speciesData);

  public assayTypeChartLabels = Object.keys(this.assayTypeData);
  public assayTypeChartData = Object.values(this.assayTypeData);

  constructor() { }

  ngOnInit() {

  }

}
