import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ApiDataService } from '../services/api-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-globalsearch',
  templateUrl: './globalsearch.component.html',
  styleUrls: ['./globalsearch.component.css']
})
export class GlobalSearchComponent implements OnInit {
  @Input() query: Object;
  searchText = '';
  jsonData: { [key: string]: { totalHits: number } } = {};
  showResults = false;
  showSpinner = false;

  queryParams: any = {};

  constructor(
    private dataService: ApiDataService, private router: Router, private route: ActivatedRoute,
    private titleService: Title, private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('FAANG Global Search');

    this.route.queryParams.subscribe(params => {
      this.queryParams = { ...params };
      this.searchText = this.queryParams['searchText'];
      this.onSearch();
    });

    window.addEventListener('popstate', (event) => {
      if (window.location.href !== `${window.location.origin}/globalsearch`) {
        this.router.navigate(['/globalsearch'], {
          relativeTo: this.route,
          queryParamsHandling: 'merge',
          replaceUrl: true
        });
      }
    });
  }

  onSearch() {
    if (this.searchText) {
      this.showSpinner = true;
      this.dataService.getGSearchData(this.searchText).subscribe(json_data => {
        this.showSpinner = false;
        this.jsonData = json_data;
      });
    } else {
      this.jsonData = null;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { searchText: this.searchText },
      queryParamsHandling: 'merge',
    });
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

  navigateToItem(itemKey: string): void {
    if (itemKey && this.searchText) {
      this.router.navigate(
        [`/${itemKey}`], { relativeTo: this.route, queryParams: { searchTerm: this.searchText }});
    }
  }

}
