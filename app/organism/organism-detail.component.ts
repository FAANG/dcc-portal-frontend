import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { Organism } from '../shared/organism';

import { ApiOrganismService }  from '../core/services/api-organism.service';

@Component({
    selector: 'organism-detail',
    templateUrl: './organism-detail.component.html',
})
export class OrganismDetailComponent implements OnInit, OnDestroy { 
  // public properties
  biosampleId: string
  organism: Organism

  // private properties
  private routeSubscription: Subscription = null;
  private organismSource: Subject<Observable<Organism>>;
  private organismSubscription: Subscription = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiOrganismService: ApiOrganismService,
  ){ };

  ngOnInit() {
    this.organismSource = new Subject<Observable<Organism>>();
    this.organismSubscription = this.organismSource
        .switchMap((o: Observable<Organism>):Observable<Organism> => o)
        .subscribe((e: Organism) => this.organism = e );
    this.routeSubscription =
      this.activatedRoute.params.subscribe((params: {biosampleId: string}) => {
        this.biosampleId = params.biosampleId;
        if (this.biosampleId){
          this.organismSource.next(this.apiOrganismService.get(this.biosampleId));
        }
      });
  };

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.organismSubscription) {
      this.organismSubscription.unsubscribe();
    }
  };
};
