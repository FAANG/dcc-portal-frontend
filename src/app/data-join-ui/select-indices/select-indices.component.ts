import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { indexData } from '../constants';

@Component({
  selector: 'app-select-indices',
  templateUrl: './select-indices.component.html',
  styleUrls: ['./select-indices.component.css']
})
export class SelectIndicesComponent implements OnInit {

  @Input() firstIndexName;
  @Input() secondIndexName;

  @Output() firstIndexChange = new EventEmitter();
  

  firstIndices = Object.keys(indexData);
  secondIndices = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectionChange(indexName){
    
    if(indexName === 'firstIndex'){
      this.secondIndices = indexData[this.firstIndexName.value]['possibleRightJoinIndices'];
      if(!this.secondIndices.includes(this.secondIndexName))
        this.secondIndexName.setValue('');
      this.firstIndexChange.emit();
    }

  }

}
