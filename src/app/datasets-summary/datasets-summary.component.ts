import { Component, OnInit } from '@angular/core';
import {ChartOptions} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {SlicePipe} from '@angular/common';

@Component({
  selector: 'app-datasets-summary',
  templateUrl: './datasets-summary.component.html',
  styleUrls: ['./datasets-summary.component.css']
})
export class DatasetsSummaryComponent implements OnInit {
  standardData = {'Legacy': 420, 'FAANG': 22};
  paperPublishedData = {'yes': 152, 'no': 290};
  species = {'Bos taurus': 129, 'Gallus gallus': 111, 'Sus scrofa': 77, 'Equus caballus': 63, 'Ovis aries': 48, 'Capra hircus': 33,
    'Bos indicus': 1, 'Bubalus bubalis': 1};
  speciesData = [];
  speciesLabels = [];

  assayType = {'whole genome sequencing assay': 323, 'ChIP-seq': 55, 'methylation profiling by high throughput sequencing': 50,
    'transcription profiling by high throughput sequencing': 10, 'RNA-seq of coding RNA': 4, 'ATAC-seq': 4, 'Hi-C': 4,
    'RNA-seq of non coding RNA': 1, 'microRNA profiling by high throughput sequencing': 1, 'DNase-Hypersensitivity seq': 1};
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
