import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ApiDataService } from '../services/api-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgTemplateOutlet, NgPlural, NgPluralCase, KeyValuePipe } from '@angular/common';
import { MatList, MatListItem } from '@angular/material/list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-globalsearch',
  templateUrl: './globalsearch.component.html',
  styleUrls: ['./globalsearch.component.css'],
  standalone: true,
  imports: [HeaderComponent, FormsModule, MatButton, MatIcon, MatProgressSpinner, MatList, MatListItem, NgTemplateOutlet, NgPlural,
    NgPluralCase, KeyValuePipe]
})
export class GlobalSearchComponent implements OnInit {
  @Input() query: {[index: string]: any} = {};
  searchText = '';
  jsonData: { [key: string]: { totalHits: number, searchTerms: [] } } = {};
  showResults = false;
  showSpinner = false;

  queryParams: any = {};

  timer = 0;

  constructor(
    private dataService: ApiDataService, private router: Router, private route: ActivatedRoute,
    private titleService: Title, private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('FAANG Global Search');

    this.route.queryParams.subscribe(params => {
      this.queryParams = { ...params };
      this.searchText = this.queryParams['searchText'];
      this.onSearch(0);
    });

    window.addEventListener('popstate', (event) => {
      if (window.location.href !== `${window.location.origin}/globalsearch`) {
        void this.router.navigate(['/globalsearch'], {
          relativeTo: this.route,
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      }
    });
  }

  onSearch(time = 1000) {
    if (this.searchText) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.showSpinner = true;
        this.dataService.getGSearchData(this.searchText).subscribe(json_data => {
          this.showSpinner = false;
          this.jsonData = json_data;
        });
      }, time);
    } else {
      this.jsonData = {};
    }
    this.showResults = true;
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { searchText: this.searchText },
      queryParamsHandling: 'merge',
    });
  }

  isJsonDataEmpty(): boolean {
    return Object.keys(this.jsonData).length === 0;
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

  navigateToItem(itemKey: string, searchTerm?: string | null): void {
    if (itemKey && this.searchText) {
      void this.router.navigate(
        [`/${itemKey}`], { relativeTo: this.route, queryParams: { searchTerm: this.searchText }});
    }
    if (itemKey && searchTerm) {
      void this.router.navigate(
        [`/${itemKey}`], { relativeTo: this.route, queryParams: { searchTerm: searchTerm }});
    }
  }


  searchTermsBool(item: any) {
    return item.value?.searchTerms && item.value?.searchTerms.length > 0;
  }

}
