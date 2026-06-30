import {Component, Inject, Input, OnInit, PLATFORM_ID} from '@angular/core';
import { ApiDataService } from '../services/api-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {NgTemplateOutlet, NgPlural, NgPluralCase, KeyValuePipe, isPlatformBrowser} from '@angular/common';
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
  // Elasticsearch index names returned by the _gsearch endpoint can be timestamped, e.g. `2026_03_26_organism`.
  private static readonly INDEX_DATE_PREFIX = /^\d{4}_\d{2}_\d{2}_/;
  // Default sort applied by each entity list page — mirrored here so global search links land already sorted.
  private static readonly DEFAULT_SORTS: {[index: string]: [string, string]} = {
    organism: ['id_number', 'desc'],
    specimen: ['id_number', 'desc'],
    dataset: ['accession', 'desc'],
    file: ['fileName', 'desc'],
    analysis: ['accession', 'desc'],
    article: ['pmcId', 'asc'],
  };

  @Input() query: {[index: string]: any} = {};
  searchText = '';
  jsonData: { [key: string]: { totalHits: number, searchTerms: [] } } = {};
  showResults = false;
  showSpinner = false;

  queryParams: any = {};
  timer: any = null;
  isBrowser = false;

  constructor(
    private dataService: ApiDataService, private router: Router, private route: ActivatedRoute,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.titleService.setTitle('FAANG Global Search');

    this.route.queryParams.subscribe(params => {
      this.queryParams = { ...params };
      this.searchText = this.queryParams['searchText'];
      this.onSearch(0);
    });

    if (this.isBrowser) {
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
          this.jsonData = this.normalizeResultKeys(json_data);
          this.showResults = true;
        });
      }, time);
    } else {
      this.jsonData = {};
      this.showResults = false;
    }
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { searchText: this.searchText },
      queryParamsHandling: 'merge',
    });
  }

  static normalizeIndexKey(key: string): string {
    return key.replace(GlobalSearchComponent.INDEX_DATE_PREFIX, '');
  }

  private normalizeResultKeys(json_data: { [key: string]: { totalHits: number, searchTerms: [] } }) {
    const normalized: { [key: string]: { totalHits: number, searchTerms: [] } } = {};
    for (const [key, value] of Object.entries(json_data)) {
      normalized[GlobalSearchComponent.normalizeIndexKey(key)] = value;
    }
    return normalized;
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
    const term = searchTerm || this.searchText;
    if (!itemKey || !term) {
      return;
    }
    const route = GlobalSearchComponent.normalizeIndexKey(itemKey);
    const queryParams: {[index: string]: string} = { searchTerm: term };
    const sort = GlobalSearchComponent.DEFAULT_SORTS[route];
    if (sort) {
      queryParams['sortTerm'] = sort[0];
      queryParams['sortDirection'] = sort[1];
    }
    void this.router.navigate([`/${route}`], { relativeTo: this.route, queryParams });
  }


  searchTermsBool(item: any) {
    return item.value?.searchTerms && item.value?.searchTerms.length > 0;
  }

}
