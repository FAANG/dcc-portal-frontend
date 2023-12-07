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
  jsonData: {};
  showResults = false;
  showSpinner = false;
  linkText = '';

  constructor(private dataService: ApiDataService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    window.addEventListener('popstate', (event) => {
      console.log('Current URL:', window.location.href);
      console.log('Current state:', window.history.state);
      if (window.location.href !== `${window.location.origin}/globalsearch`) {
        console.log('BACK!');
        const browserHistory = window.history;
        for (let i = 0; i < browserHistory.length; i++) {
          console.log(`History entry ${i + 1}: ${JSON.stringify(browserHistory.state)}`);
        }

        if (window.location.href !== `${window.location.origin}/globalsearch`) {
          // window.history.replaceState({ customData: 'TEST DATA' }, null, '/globalsearch');
          const newState = {
            customData: 'TEST DATA'
          };
          // window.history.replaceState(newState, null, '/globalsearch');
          this.router.navigate(['/globalsearch'], { state: newState });
        }

        console.log('Current URL:', window.location.href);
        console.log('Current state:', window.history.state);
      } else {
        console.log('TEST!');
        console.log('Current state:', window.history.state);
      }
    });

    this.router.events.subscribe((event) => {
      console.log('Router Event:', event);
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
