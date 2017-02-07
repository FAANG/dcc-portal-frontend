import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

let searchResultStyles: string = `
  form {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

@Component({
    templateUrl: './search-results.component.html',
    styles: [ searchResultStyles ],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  public constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  // public properties
  public query: string;

  // private properties
  private routeSubscription: Subscription = null;

  setUrl(query: string) {
    this.router.navigate([], {relativeTo: this.activatedRoute, queryParams: {q: query}})
  }

  ngOnInit() {
    this.titleService.setTitle( 'FAANG search');
    this.routeSubscription = this.activatedRoute.queryParams
      .debounceTime(300)
      .subscribe((params: {q: string}) => this.query = params.q);
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

};