import { Component, OnChanges, SimpleChanges, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ApiSpecimenService }  from '../core/services/api-specimen.service';
import { ApiHits } from '../shared/api-types/api-hits';

let searchSpecimenStyles: string = `
  ul.list-group {
    margin: 0;
    max-height: 200px;
    overflow-y: scroll;
  }
  .list-group-item {
    padding: 5px 15px;
  }
`;

@Component({
    templateUrl: './search-specimen.component.html',
    selector: 'search-specimen',
    styles: [ searchSpecimenStyles ],
})
export class SearchSpecimenComponent implements OnChanges, OnDestroy {
  @Input() query: string;

  public constructor(
    private apiSpecimenService: ApiSpecimenService,
  ) {};

  public specimenHits: ApiHits = null;

  // private properties
  private specimenHitsSource: Subject<Observable<ApiHits>> = null;
  private specimenHitsSubscription: Subscription = null;
  private hitsPerPage: number = 100;

  ngOnChanges(changes: SimpleChanges) {

    if (!this.specimenHitsSource) {
      this.specimenHitsSource = new Subject<Observable<ApiHits>>();
      this.specimenHitsSubscription = this.specimenHitsSource
          .switchMap((o: Observable<ApiHits>) : Observable<ApiHits> => o)
          .subscribe((h: ApiHits) => {
            this.specimenHits = h
          });
    }

    this.specimenHitsSource.next(this.apiSpecimenService.textSearch(this.query, this.hitsPerPage));
  }

  ngOnDestroy() {
    if (this.specimenHitsSubscription) {
      this.specimenHitsSubscription.unsubscribe();
    }
  }

};