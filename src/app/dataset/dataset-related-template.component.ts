import { Component, Input, OnInit } from '@angular/core';


@Component({
    selector: 'dataset-related-template',
    templateUrl: './dataset-related-template.component.html',
})
export class DatasetRelatedTemplateComponent implements OnInit{ 
//export class DatasetRelatedTemplateComponent{ 
  // public properties
  @Input() data:any[];
  @Input() entity: string;
  pageLimit: number = 10;
  offset: number = 0;
  currentDisplayed: any[] = [];

  ngOnInit(){
//    console.log("within template for type: "+this.entity);
//    console.log(this.data);
//    this.update();
  }
  // private properties

  update(){
    this.currentDisplayed = [];
    if(this.data){
      for (var i = 0; i < this.pageLimit && ((this.offset + i) < this.data.length); i++){
        this.currentDisplayed[i] = this.data[i+this.offset];
      }
    }
  }

  tableNext() {
    if (this.tableHasMore()) {
      this.offset += this.pageLimit;
    }
//    this.update();
  }

  tablePrevious() {
    if (this.data) {
      this.offset = (this.offset >= this.pageLimit) ? this.offset - this.pageLimit : 0;
    }
//    this.update();
  }
  
  tableHasMore():boolean {
    this.update();
    if (this.data && this.data.length > this.offset + this.pageLimit) {
      return true;
    }
    return false;
  }
};
