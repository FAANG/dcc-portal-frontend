import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Location} from '@angular/common';
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ApiDataService} from "../services/api-data.service";
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";


import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-koosum',
  templateUrl: './koosum.component.html',
  styleUrl: './koosum.component.css',
  // imports: [MatButtonModule, MatDividerModule, MatIconModule],
})
export class KoosumComponent {
  location: Location;

  title = 'ng2-charts-demo';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;


  constructor(
    location: Location) {
    this.location = location;
  }


  ngOnInit() {

  }

}







// /**
//  * @title Basic buttons
//  */
// @Component({
//   selector: 'button-overview-example',
//   templateUrl: 'button-overview-example.html',
//   styleUrls: ['button-overview-example.css'],
//   standalone: true,
//   imports: [MatButtonModule, MatDividerModule, MatIconModule],
// })
// export class ButtonOverviewExample {}
