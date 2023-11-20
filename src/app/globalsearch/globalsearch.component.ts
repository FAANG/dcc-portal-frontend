import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../services/api-data.service';

@Component({
  selector: 'app-globalsearch',
  templateUrl: './globalsearch.component.html',
  styleUrls: ['./globalsearch.component.css']
})
export class GlobalSearchComponent implements OnInit {

  searchText = '';
  jsonData: {};
  showResults = false;
  showSpinner = false;

  constructor(private dataService: ApiDataService) { }

  ngOnInit(): void {
  }

  onSearch() {
    if (this.searchText) {
      this.showSpinner = true;
      this.dataService.getGSearchData(this.searchText).subscribe(json_data => {
        this.jsonData = json_data;
        this.showSpinner = false;
      });
    } else {
      this.jsonData = null;
    }
    this.showResults = true;
  }

}
