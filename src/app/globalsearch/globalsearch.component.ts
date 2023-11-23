import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../services/api-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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

  constructor(
    private dataService: ApiDataService, private router: Router, private route: ActivatedRoute, private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('FAANG Global Search');
    window.addEventListener('popstate', (event) => {
      if (window.location.href !== `${window.location.origin}/globalsearch`) {
        const browserHistory = window.history;
        if (window.location.href !== `${window.location.origin}/globalsearch`) {
          this.router.navigate(['/globalsearch']);
        }
      }
    });
  }

  onSearch() {
    if (this.searchText) {
      this.showSpinner = true;
      this.dataService.getGSearchData(this.searchText).subscribe(json_data => {
        this.showSpinner = false;
        this.jsonData = json_data;
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
      this.router.navigate(
        [`/${itemKey}`], { relativeTo: this.route, queryParams: { searchTerm }, queryParamsHandling: 'merge'});
    }
  }

}
