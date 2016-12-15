import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'organism-detail',
    templateUrl: './organism-detail.component.html',
})
export class OrganismDetailComponent implements OnInit, OnDestroy { 
  // public properties
  biosampleId: string

  // private properties
  private routeSubscription: Subscription = null;

  constructor(
    private activatedRoute: ActivatedRoute,
  ){ };

  ngOnInit() {
    this.routeSubscription =
      this.activatedRoute.params.subscribe((params: {biosampleId: string}) => {
        this.biosampleId = params.biosampleId;
      });
  };

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  };
};
