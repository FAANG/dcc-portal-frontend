import {Component, OnInit} from '@angular/core';
import {Angular2CsvComponent} from 'angular2-csv';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent extends Angular2CsvComponent {
}
