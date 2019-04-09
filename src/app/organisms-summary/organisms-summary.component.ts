import { Component, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {barChartOptions, pieChartOptions} from '../shared/chart-options';

@Component({
  selector: 'app-organisms-summary',
  templateUrl: './organisms-summary.component.html',
  styleUrls: ['./organisms-summary.component.css']
})
export class OrganismsSummaryComponent implements OnInit {
  name: string;
  standardData = {'FAANG': 519};
  sexData = {'female': 186, 'male': 333};
  paperPublishedData = {'yes': 64, 'no': 455};
  organismData = {'Bos indicus': 65, 'Bos taurus': 166, 'Sus scrofa': 64, 'Gallus gallus': 132, 'Ovis aries': 63, 'Capra hircus': 11,
    'Bubalus bubalis': 13, 'Equus caballus': 5};
  breedsData = {'Bos indicus': {'Brahman': 39, 'Nellore': 26},
    'Bos taurus': {'Angus': 116,
      'Holstein': 28,
      'Norwegian Red': 12,
      'Cattle crossbreed': 6,
      'Hereford (Line 1)': 4},
    'Sus scrofa': {'White Composite sire x Meishan dam': 2,
      'Duroc': 9,
      'German Landrace': 16,
      'Pietrain': 17,
      'Large White': 5,
      'Yorkshire': 2,
      'Landrace,Large White': 3,
      'pig breed': 1,
      'Pig crossbreed': 4,
      'Yorkshire sire x Landrace dam': 3,
      'Meishan sire x White Composite dam': 2},
    'Gallus gallus': {'chicken breed': 124,
      'White Leghorn line 6x White Leghorn line 7': 4,
      'White Leghorn': 4},
    'Ovis aries': {'Spanish Assaf': 4,
      'Texel sire x Scottish Blackface dam': 35,
      'Texel': 3,
      'Rambouillet': 1,
      'Scottish Blackface': 10,
      'Texel sire x (Texel sire x Scottish Blackface dam) dam': 6,
      'Spanish Churra': 4},
    'Capra hircus': {'Alpine': 4, 'Goat crossbreed': 7},
    'Bubalus bubalis': {'Mediterranean': 6,
      'Jafarabadi': 1,
      'Pandharpuri': 5,
      'Bhadawari': 1},
    'Equus caballus': {'Thoroughbred': 5}};
  breedKeys = Object.keys(this.breedsData);

  public pieChartOptions = pieChartOptions;
  public barChartOptions = barChartOptions;
  public barChartPlugins = [pluginDataLabels];
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  public sexChartLabels = Object.keys(this.sexData);
  public sexChartData = Object.values(this.sexData);

  public paperChartLabels = Object.keys(this.paperPublishedData);
  public paperChartData = Object.values(this.paperPublishedData);

  public standardChartLabels = Object.keys(this.standardData);
  public standardChartData = Object.values(this.standardData);

  public organismChartLabels = Object.keys(this.organismData);
  public organismChartData = Object.values(this.organismData);

  public breedChartLabels = Object.keys(this.breedsData[this.breedKeys[0]]);
  public breedChartData = Object.values(this.breedsData[this.breedKeys[0]]);


  constructor() { }

  ngOnInit() {
    this.name = this.breedKeys[0];
  }

  onItemClick(name: string) {
    this.name = name;
    this.breedChartLabels = Object.keys(this.breedsData[this.name]);
    this.breedChartData = Object.values(this.breedsData[this.name]);
  }
}
