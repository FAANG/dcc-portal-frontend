import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globalsearch',
  templateUrl: './globalsearch.component.html',
  styleUrls: ['./globalsearch.component.css']
})
export class GlobalSearchComponent implements OnInit {

  searchText = '';
  jsonData: string[];
  showResults = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSearch(): void {
    if (this.searchText) {
      this.jsonData = [this.searchText, this.searchText, this.searchText];
    } else {
      this.jsonData = [];
    }
    this.showResults = true;
  }

}
