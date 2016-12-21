import { Component, OnChanges, OnDestroy, SimpleChanges, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { SpecimenList } from '../shared/specimen-list';

import { ApiSpecimenService }  from '../core/services/api-specimen.service';

@Component({
    selector: 'organism-specimens',
    templateUrl: './organism-specimens.component.html',
    styles: [`
      .clickable {
        cursor: pointer;
      }
    `],
})
export class OrganismSpecimensComponent{
  @Input() biosampleId: string;

  // public properties
  specimenList: SpecimenList
  specimenOffset: number = 0
  pageLimit: number = 10

  // private properties
  private specimenSource: Subject<Observable<SpecimenList>>;
  private specimenSubscription: Subscription = null;

  constructor(
    private apiSpecimenService: ApiSpecimenService,
  ){ };

  getSpecimenList() {
    if (this.biosampleId) { 
      this.specimenSource.next(this.apiSpecimenService.getOrganismsSpecimens(this.biosampleId, this.specimenOffset));
    }else {
      this.specimenSource.next(Observable.empty<SpecimenList>());
    }
  }

  initSpecimenSource() {
    this.specimenSource = new Subject<Observable<SpecimenList>>();
    this.specimenSubscription = this.specimenSource
        .switchMap((o: Observable<SpecimenList>):Observable<SpecimenList> => o)
        .subscribe((f:SpecimenList) => this.specimenList = f );
  };

  ngOnChanges(changes: SimpleChanges) {
    if (! this.specimenSource) {
      this.initSpecimenSource();
    }
    if (changes['biosampleId']) {
      this.specimenOffset = 0;
      this.getSpecimenList();
    }
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
