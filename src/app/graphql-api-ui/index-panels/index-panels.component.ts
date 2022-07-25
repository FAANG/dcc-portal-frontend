import { Component, OnInit, Input } from '@angular/core';
import { indexDetails } from '../constants';

@Component({
  selector: 'app-index-panels',
  templateUrl: './index-panels.component.html',
  styleUrls: ['./index-panels.component.css']
})
export class IndexPanelsComponent implements OnInit {

  @Input() indexName = '';
  @Input() indexPath = [];

  primaryKeys = [];
  queryMultipleDocumentsResolverName = {};
  possibleRightIndicesForJoin = [];
  
  enableJoin = false;

  constructor() { }

  ngOnInit(): void {
    this.indexPath = [...this.indexPath,this.indexName];
    this.primaryKeys = indexDetails[this.indexName]['primaryKeys'];
    this.queryMultipleDocumentsResolverName = indexDetails[this.indexName]['queryMultipleDocumentsResolverName'];
    this.possibleRightIndicesForJoin = indexDetails[this.indexName]['possibleRightIndicesForJoin'];
    
    console.log(this.indexPath)
  }

  onSlideToggleClick(){
    this.enableJoin = !this.enableJoin;
  }

}
