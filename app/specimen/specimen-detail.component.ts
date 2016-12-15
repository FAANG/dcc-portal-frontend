import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Specimen } from '../shared/specimen';

import { ApiSpecimenService }  from '../core/services/api-specimen.service';

@Component({
    selector: 'specimen-detail',
    templateUrl: './specimen-detail.component.html',
})
export class SpecimenDetailComponent implements OnInit, OnDestroy { 
  
  // public properties
  biosampleId: string
  specimen: Specimen

  // private properties
  private routeSubscription: Subscription = null;
  private specimenSource: Subject<Observable<Specimen>>;
  private specimenSubscription: Subscription = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiSpecimenService: ApiSpecimenService,
  ){ };

  ngOnInit() {
    this.specimenSource = new Subject<Observable<Specimen>>();
    this.specimenSubscription = this.specimenSource
        .switchMap((o: Observable<Specimen>):Observable<Specimen> => o)
        .subscribe((e: Specimen) => this.specimen = e );
    this.routeSubscription =
      this.activatedRoute.params.subscribe((params: {biosampleId: string}) => {
        this.biosampleId = params.biosampleId;
        if (this.biosampleId){
          this.specimenSource.next(this.apiSpecimenService.get(this.biosampleId));
        }
      });
  };

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.specimenSubscription) {
      this.specimenSubscription.unsubscribe();
    }
  };
};