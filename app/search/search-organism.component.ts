import { Component, OnChanges, SimpleChanges, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ApiOrganismService }  from '../core/services/api-organism.service';
import { ApiHits } from '../shared/api-types/api-hits';

let searchOrganismStyles: string = `
  ul.list-group {
    margin: 0;
  }
`;

@Component({
    templateUrl: './search-organism.component.html',
    selector: 'search-organism',
    styles: [ searchOrganismStyles ],
})
export class SearchOrganismComponent implements OnChanges, OnDestroy {
  @Input() query: string;

  public constructor(
    private apiOrganismService: ApiOrganismService,
  ) {};

  public organismHits: ApiHits = null;

  // private properties
  private organismHitsSource: Subject<Observable<ApiHits>> = null;
  private organismHitsSubscription: Subscription = null;
  private hitsPerPage: number = 10;

  ngOnChanges(changes: SimpleChanges) {

    if (!this.organismHitsSource) {
      this.organismHitsSource = new Subject<Observable<ApiHits>>();
      this.organismHitsSubscription = this.organismHitsSource
          .switchMap((o: Observable<ApiHits>) : Observable<ApiHits> => o)
          .subscribe((h: ApiHits) => {
            this.organismHits = h
          });
    }

    this.organismHitsSource.next(this.apiOrganismService.textSearch(this.query, this.hitsPerPage));
  }

  ngOnDestroy() {
    if (this.organismHitsSubscription) {
      this.organismHitsSubscription.unsubscribe();
    }
  }

};