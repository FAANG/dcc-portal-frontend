import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'specimen-detail',
    templateUrl: './specimen-detail.component.html',
})
export class SpecimenDetailComponent implements OnInit, OnDestroy { 
  
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