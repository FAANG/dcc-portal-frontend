import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { SpecimenList } from '../shared/specimen-list';

import { ApiSpecimenService }  from '../core/services/api-specimen.service';

@Component({
    selector: 'specimen-table',
    templateUrl: './specimen-table.component.html',
})
export class SpecimenTableComponent implements OnInit, OnDestroy { 
  // public properties
  specimenList: SpecimenList
  specimenOffset: number
  pageLimit: number

  // private properties
  private routeSubscription: Subscription = null;
  private specimenSource: Subject<Observable<SpecimenList>>;
  private specimenSubscription: Subscription = null;

  constructor(
    private apiSpecimenService: ApiSpecimenService,
  ){ };

  ngOnInit() {
    this.specimenSource = new Subject<Observable<SpecimenList>>();
    this.specimenSubscription = this.specimenSource
        .switchMap((o: Observable<SpecimenList>):Observable<SpecimenList> => o)
        .subscribe((e: SpecimenList) => this.specimenList = e );
    this.specimenOffset = 0;
    this.pageLimit = 10;
    this.getSpecimenList();
  };

  getSpecimenList() {
    this.specimenSource.next(this.apiSpecimenService.getAll(this.specimenOffset));
  }

  ngOnDestroy() {
    if (this.specimenSubscription) {
      this.specimenSubscription.unsubscribe();
    }
  };

  tableNext() {
    if (this.tableHasMore()) {
      this.specimenOffset += this.pageLimit;
      this.getSpecimenList();
    }
  }
  tablePrevious() {
    if (this.specimenList && this.specimenList.hits) {
      this.specimenOffset = (this.specimenOffset >= this.pageLimit) ? this.specimenOffset - this.pageLimit : 0;
      this.getSpecimenList();
    }
  }
  tableHasMore():boolean {
    if (this.specimenList && this.specimenList.total > this.specimenOffset + this.pageLimit) {
      return true;
    }
    return false;
  }
};