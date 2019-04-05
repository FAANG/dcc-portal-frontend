import { Component, OnInit } from '@angular/core';
import {ChartOptions} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {SlicePipe} from '@angular/common';

@Component({
  selector: 'app-files-summary',
  templateUrl: './files-summary.component.html',
  styleUrls: ['./files-summary.component.css']
})
export class FilesSummaryComponent implements OnInit {
  standardData = {'Legacy': 37888, 'FAANG': 16122};
  paperPublishedData = {'yes': 32046, 'no': 21964};
  species = {'Bos taurus': 16705, 'Ovis aries': 12233, 'Gallus gallus': 7487, 'Sus scrofa': 6955, 'Bubalus bubalis': 4902,
    'Capra hircus': 2889, 'Equus': 2667, 'Bos indicus': 172};
  speciesData = [];
  speciesLabels = [];

  assayType = {'whole genome sequencing assay': 33438, 'transcription profiling by high throughput sequencing': 14316, 'Hi-C': 2500,
    'methylation profiling by high throughput sequencing': 1719, 'RNA-seq of coding RNA': 1007, 'ChIP-seq': 702, 'ATAC-seq': 162,
    'microRNA profiling by high throughput sequencing': 68, 'RNA-seq of non coding RNA': 68, 'DNase-Hypersensitivity seq': 30};
  assayData = [];
  assayLabels = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartPlugins = [pluginDataLabels];

  public standardChartLabels = Object.keys(this.standardData);
  public standardChartData = Object.values(this.standardData);

  public paperChartLabels = Object.keys(this.paperPublishedData);
  public paperChartData = Object.values(this.paperPublishedData);

  constructor(private splicePipe: SlicePipe) { }

  ngOnInit() {
    const tmp = Object.entries(this.species);
    tmp.forEach((item, index) => {
      this.speciesLabels.push(item[0]);
      this.speciesData.push(item[1]);
    });

    const tmp2 = Object.entries(this.assayType);
    tmp2.forEach((item, index) => {
      if (item[0].length > 24) {
        item[0] = this.splicePipe.transform(item[0], 0, 25) + '...';
      }
      this.assayLabels.push(item[0]);
      this.assayData.push(item[1]);
    });
  }

}
