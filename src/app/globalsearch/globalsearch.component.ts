import { Component, OnInit } from '@angular/core';
import {ApiDataService} from '../services/api-data.service';
import { HostSetting } from '../services/host-setting';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-globalsearch',
  templateUrl: './globalsearch.component.html',
  styleUrls: ['./globalsearch.component.css']
})
export class GlobalSearchComponent implements OnInit {

  searchText = '';
  jsonData: {};
  showResults = false;
  hostSetting = new HostSetting;

  constructor(private dataService: ApiDataService) { }

  ngOnInit(): void {
  }

  onSearch() {
    if (this.searchText) {
      this.dataService.getGSearchData(this.searchText).subscribe(json_data => {
        this.jsonData = json_data;
      });
    } else {
      this.jsonData = null;
    }
    this.showResults = true;
  }

}
