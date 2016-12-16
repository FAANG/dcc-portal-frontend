import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { OrganismList } from '../shared/organism-list';

import { ApiOrganismService }  from '../core/services/api-organism.service';

@Component({
    selector: 'organism-table',
    templateUrl: './organism-table.component.html',
})
export class OrganismTableComponent implements OnInit, OnDestroy { 
  // public properties
  organismList: OrganismList

  // private properties
  private routeSubscription: Subscription = null;
  private organismSource: Subject<Observable<OrganismList>>;
  private organismSubscription: Subscription = null;

  constructor(
    private apiOrganismService: ApiOrganismService,
  ){ };

  ngOnInit() {
    this.organismSource = new Subject<Observable<OrganismList>>();
    this.organismSubscription = this.organismSource
        .switchMap((o: Observable<OrganismList>):Observable<OrganismList> => o)
        .subscribe((e: OrganismList) => this.organismList = e );
    this.organismSource.next(this.apiOrganismService.getAll());
  };

  ngOnDestroy() {
    if (this.organismSubscription) {
      this.organismSubscription.unsubscribe();
    }
  };
};
