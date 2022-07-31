import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { indexData } from './constants';

@Component({
  selector: 'app-data-join-ui',
  templateUrl: './data-join-ui.component.html',
  styleUrls: ['./data-join-ui.component.css']
})
export class DataJoinUiComponent implements OnInit {

  firstIndexName = new FormControl('');
  firstIndices = Object.keys(indexData);
  
  secondIndexName = new FormControl('');
  secondIndices = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectionChange(e, indexName){

    if(indexName === 'firstIndex'){
      this.secondIndices = indexData[this.firstIndexName.value]['possibleRightJoinIndices'];
    }

  }
}
