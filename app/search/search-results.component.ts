import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './search-results.component.html',
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  public constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
  ) {}

  // public properties
  public query: string;

  // private properties
  private routeSubscription: Subscription = null;

  ngOnInit() {
    this.titleService.setTitle( 'FAANG search');
    this.routeSubscription = this.activatedRoute.queryParams.subscribe((params: {q: string}) => this.query = params.q);
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

};