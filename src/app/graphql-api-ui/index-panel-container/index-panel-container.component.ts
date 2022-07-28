import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  // fieldQueryData = this.indexPanelContainerService.fieldsQueryData;
  @Output() queryDataChanged = new EventEmitter<{
    indexName:string;
    updatedQueryData:Record<string,any>;
  }>();

  @Output() fieldsQueryDataInit = new EventEmitter<{
    indexName:string;
    serviceReference: any;
  }>();

  constructor(
    public indexPanelContainerService : IndexPanelContainerService
    ) { }


  ngOnInit(): void {
    this.fieldsQueryDataInit.emit({indexName:this.indexName,serviceReference:this.indexPanelContainerService.fieldsQueryData});
  }

  // ngOnChanges(changes:SimpleChanges){
  //   console.log(changes)
  //   this.queryDataChanged.emit({indexName:this.indexName,updatedQueryData:{...this.indexPanelContainerService.fieldsQueryData}})
  // }

}
