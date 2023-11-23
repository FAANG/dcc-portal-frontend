import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../services/api-data.service';
import { Location } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-globalsearch',
  templateUrl: './globalsearch.component.html',
  styleUrls: ['./globalsearch.component.css']
})
export class GlobalSearchComponent implements OnInit {

  searchText = '';
  jsonData: { [key: string]: { totalHits: number } } = {};
  showResults = false;
  showSpinner = false;
  linkText = '';

  constructor(private dataService: ApiDataService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    window.addEventListener('popstate', (event) => {
      if (window.location.href !== `${window.location.origin}/globalsearch`) {
        const browserHistory = window.history;
        if (window.location.href !== `${window.location.origin}/globalsearch`) {
          const newState = {
            customData: 'TEST DATA'
          };
          this.router.navigate(['/globalsearch'], { state: newState });
        }
      }
    });
  }

  onSearch() {
    if (this.searchText) {
      this.showSpinner = true;
      this.dataService.getGSearchData(this.searchText).subscribe(json_data => {
        this.jsonData = json_data;
        this.showSpinner = false;
        this.linkText = this.searchText;
      });
    } else {
      this.jsonData = null;
    }
    this.showResults = true;
  }

  changeKey(key: string) {
    const parts = key.split('/');
    if (parts.length === 2) {
      if (parts[1] === 'analysis') {
        return `${parts[1]} ${parts[0]}`;
      } else {
        return `${parts[1].slice(0, -1)} ${parts[0]}`;
      }
    }
    return key;
  }

  navigateToItem(itemKey: string, searchTerm: string): void {
    if (itemKey && searchTerm) {
      this.router.navigate([`/${itemKey}`], { queryParams: { searchTerm } });
    }
  }

}
