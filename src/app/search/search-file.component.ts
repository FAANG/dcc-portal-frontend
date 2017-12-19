import { Component, OnChanges, SimpleChanges, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ApiFileService }  from '../core/services/api-file.service';
import { ApiHits } from '../shared/api-types/api-hits';

let searchFileStyles: string = `
  table {
    margin: 0;
  }
  .clickable {
    cursor: pointer;
  }
`;

@Component({
    templateUrl: './search-file.component.html',
    selector: 'search-file',
    styles: [ searchFileStyles ],
})
export class SearchFileComponent implements OnChanges, OnDestroy {
  @Input() query: string;

  public constructor(
    private apiFileService: ApiFileService,
  ) {};

  public fileHits: ApiHits = null;

  // private properties
  private fileHitsSource: Subject<Observable<ApiHits>> = null;
  private fileHitsSubscription: Subscription = null;
  private hitsPerPage: number = 100;

  ngOnChanges(changes: SimpleChanges) {

    if (!this.fileHitsSource) {
      this.fileHitsSource = new Subject<Observable<ApiHits>>();
      this.fileHitsSubscription = this.fileHitsSource
          .switchMap((o: Observable<ApiHits>) : Observable<ApiHits> => o)
          .subscribe((h: ApiHits) => {
            this.fileHits = h
          });
    }

    this.fileHitsSource.next(this.apiFileService.textSearch(this.query, this.hitsPerPage));
  }

  ngOnDestroy() {
    if (this.fileHitsSubscription) {
      this.fileHitsSubscription.unsubscribe();
    }
  }

};