import { Component, OnInit } from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-organisms-summary',
  templateUrl: './organisms-summary.component.html',
  styleUrls: ['./organisms-summary.component.css']
})
export class OrganismsSummaryComponent implements OnInit {
  sexData = {'female': 186, 'male': 333};
  paperPublishedData = {'yes': 64, 'no': 455};
  organismData = {'Bos indicus': 65, 'Bos taurus': 166, 'Sus scrofa': 64, 'Gallus gallus': 132, 'Ovis aries': 63, 'Capra hircus': 11,
    'Bubalus bubalis': 13, 'Equus caballus': 5};
  breeds = {'Brahman': 39, 'Nellore': 26, 'Angus': 116, 'White Composite sire x Meishan dam': 2, 'Holstein': 28, 'Duroc': 9,
    'Norwegian Red': 12, 'chicken breed': 124, 'Spanish Assaf': 4, 'White Leghorn line 6x White Leghorn line 7': 4, 'German Landrace': 16,
    'Pietrain': 17, 'Cattle crossbreed': 6, 'Texel sire x Scottish Blackface dam': 35, 'Large White': 5, 'Alpine': 4, 'Goat crossbreed': 7,
    'Mediterranean': 6, 'Yorkshire': 2, 'Hereford (Line 1)': 4, 'White Leghorn': 4, 'Landrace,Large White': 3, 'Rambouillet': 1,
    'Jafarabadi': 1, 'Texel': 3, 'pig breed': 1, 'Pig crossbreed': 4, 'Scottish Blackface': 10,
    'Texel sire x (Texel sire x Scottish Blackface dam) dam': 6, 'Thoroughbred': 5, 'Pandharpuri': 5, 'Yorkshire sire x Landrace dam': 3,
    'Spanish Churra': 4, 'Bhadawari': 1, 'Meishan sire x White Composite dam': 2};
  breedLabels = [];
  breedData = [];

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

  public pieChartLabels: Label[] = Object.keys(this.sexData);
  public pieChartData: number[] = Object.values(this.sexData);

  public paperChartLabels = Object.keys(this.paperPublishedData);
  public paperChartData = Object.values(this.paperPublishedData);

  public organismChartLabels = Object.keys(this.organismData);
  public organismChartData = Object.values(this.organismData);

  public breedChartLabels = this.breedLabels;
  public breedChartData = this.breedData;

  public barChartPlugins = [pluginDataLabels];



  homeClass = 'glyphicon glyphicon-home';
  arrowRightClass = 'glyphicon glyphicon-menu-hamburger';
  allClasses = {
    'Organisms': this.homeClass,
    'Specimens': this.arrowRightClass,
    'Datasets': this.arrowRightClass,
    'Files': this.arrowRightClass
  };


  constructor() { }

  ngOnInit() {
    const tmp = Object.entries(this.breeds);
    tmp.sort(function (a, b) {
      return b[1] - a[1];
    });
    for (const entry of tmp) {
      this.breedLabels.push(entry[0]);
      this.breedData.push(entry[1]);
    }
  }

  onClick(currentClass: string) {
    for (const key in this.allClasses) {
      if (key === currentClass) {
        this.allClasses[currentClass] = this.homeClass;
      } else {
        this.allClasses[key] = this.arrowRightClass;
      }
    }
  }
}
