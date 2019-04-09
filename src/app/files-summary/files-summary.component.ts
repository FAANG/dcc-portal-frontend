import { Component, OnInit } from '@angular/core';
import {ChartOptions} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {SlicePipe} from '@angular/common';
import {barChartOptions, pieChartOptions} from '../shared/chart-options';

@Component({
  selector: 'app-files-summary',
  templateUrl: './files-summary.component.html',
  styleUrls: ['./files-summary.component.css']
})
export class FilesSummaryComponent implements OnInit {
  standardData = {'Legacy': 37888, 'FAANG': 16122};
  paperPublishedData = {'yes': 32046, 'no': 21964};
  speciesData = {'Gallus gallus': 7487, 'Sus scrofa': 6955, 'Bubalus bubalis': 4902, 'Bos taurus': 16705, 'Ovis aries': 12233,
    'Capra hircus': 2889, 'Equus': 2667, 'Bos indicus': 172};

  assayTypeData = {'whole genome sequencing assay': 33438, 'transcription profiling by high throughput sequencing': 14316, 'Hi-C': 2500,
    'methylation profiling by high throughput sequencing': 1719, 'RNA-seq of coding RNA': 1007, 'ChIP-seq': 702, 'ATAC-seq': 162,
    'microRNA profiling by high throughput sequencing': 68, 'RNA-seq of non coding RNA': 68, 'DNase-Hypersensitivity seq': 30};

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
