import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent implements OnInit, OnDestroy {

  // public properties
  currentUrl: string;

  // private properties
  private routeSubscription: Subscription = null;

  public constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('FAANG | whoops');
    this.routeSubscription =
      this.activatedRoute.url.subscribe(segments => this.currentUrl = segments.join('/'));
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
};
