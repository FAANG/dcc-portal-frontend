import { Component, OnChanges, SimpleChanges, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ApiSpecimenService }  from '../core/services/api-specimen.service';
import { ApiHits } from '../shared/api-types/api-hits';
import { Specimen } from '../shared/specimen';

let searchSpecimenStyles: string = `
  table {
    margin: 0;
  }
  .clickable {
    cursor: pointer;
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

  getCellType(hit: Specimen):string{
    let cellType = "";
    if(hit['_source']['specimenFromOrganism'] && hit['_source']['specimenFromOrganism']['organismPart']){
      cellType = hit['_source']['specimenFromOrganism']['organismPart']['text'];
    }
    if(hit['_source']['cellSpecimen'] && hit['_source']['cellSpecimen']['cellType']){
      cellType = hit['_source']['cellSpecimen']['cellType'][0]['text'];
    }
    if(hit['_source']['cellCulture'] && hit['_source']['cellCulture']['cellType']){
      cellType = hit['_source']['cellCulture']['cellType']['text'];
    }
    if(hit['_source']['cellLine'] && hit['_source']['cellLine']['cellType']){
      cellType = hit['_source']['cellLine']['cellType']['text'];
    }
    return cellType
  }

};