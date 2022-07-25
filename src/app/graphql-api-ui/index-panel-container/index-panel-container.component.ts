import { Component, Input, OnInit } from '@angular/core';
import { IndexPanelContainerService } from './index-panel-container.service';

// class CustomService extends IndexPanelContainerService{}


@Component({
  selector: 'app-index-panel-container',
  templateUrl: './index-panel-container.component.html',
  styleUrls: ['./index-panel-container.component.css'],
  providers:[IndexPanelContainerService]
})
export class IndexPanelContainerComponent implements OnInit {

  @Input() indexName = '';

  constructor(
    public indexPanelContainerService : IndexPanelContainerService
    ) { }

  ngOnInit(): void {
  }

}
