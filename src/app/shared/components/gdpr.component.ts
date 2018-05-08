import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
//  styleUrls: ['./gdpr.component.css']
})
export class GdprComponent {
  @Input() version: number;

  constructor() { }
}
