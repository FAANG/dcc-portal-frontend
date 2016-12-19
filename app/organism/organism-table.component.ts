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
  organismOffset: number
  pageLimit: number

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
    this.organismOffset = 0;
    this.pageLimit = 10;
    this.getOrganismList();
  };

  getOrganismList() {
    this.organismSource.next(this.apiOrganismService.getAll(this.organismOffset));
  }

  ngOnDestroy() {
    if (this.organismSubscription) {
      this.organismSubscription.unsubscribe();
    }
  };

  tableNext() {
    if (this.tableHasMore()) {
      this.organismOffset += this.pageLimit;
      this.getOrganismList();
    }
  }
  tablePrevious() {
    if (this.organismList && this.organismList.hits) {
      this.organismOffset = (this.organismOffset >= this.pageLimit) ? this.organismOffset - this.pageLimit : 0;
      this.getOrganismList();
    }
  }
  tableHasMore():boolean {
    if (this.organismList && this.organismList.total > this.organismOffset + this.pageLimit) {
      return true;
    }
    return false;
  }
};
