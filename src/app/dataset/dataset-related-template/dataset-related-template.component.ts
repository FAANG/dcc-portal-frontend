import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dataset-related-template',
  templateUrl: './dataset-related-template.component.html',
  styleUrls: ['./dataset-related-template.component.css']
})
export class DatasetRelatedTemplateComponent implements OnInit {
  @Input() data: any[];
  @Input() entity: string;

  p = 1;

  constructor() { }

  ngOnInit() {
  }

}
