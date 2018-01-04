import { Component, OnChanges, SimpleChanges, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ApiOrganismService }  from '../core/services/api-organism.service';
import { ApiSpecimenService }  from '../core/services/api-specimen.service';
import { ApiFileService }  from '../core/services/api-file.service';
import { ApiHits } from '../shared/api-types/api-hits';

import { Specimen } from '../shared/specimen';

let searchFileStyles: string = `
  table {
    margin: 0;
  }
  .clickable {
    cursor: pointer;
  }
`;

@Component({
    templateUrl: './search-template.component.html',
    selector: 'search-template',
    styles: [ searchFileStyles ],
})
export class SearchTemplateComponent implements OnChanges, OnDestroy {
  @Input() query: string;
  @Input() entity: string;

  public constructor(
    private apiOrganismService: ApiOrganismService,
    private apiSpecimenService: ApiSpecimenService,
    private apiFileService: ApiFileService,
  ) {};

  public hits: ApiHits = null;

  // private properties
  private hitsSource: Subject<Observable<ApiHits>> = null;
  private hitsSubscription: Subscription = null;
  private hitsPerPage: number = 100;

  ngOnChanges(changes: SimpleChanges) {

    if (!this.hitsSource) {
      this.hitsSource = new Subject<Observable<ApiHits>>();
      this.hitsSubscription = this.hitsSource
          .switchMap((o: Observable<ApiHits>) : Observable<ApiHits> => o)
          .subscribe((h: ApiHits) => {
            this.hits = h
          });
    }

    if (this.entity == "organism"){
      this.hitsSource.next(this.apiOrganismService.textSearch(this.query, this.hitsPerPage));
    }else if (this.entity == "specimen"){
      this.hitsSource.next(this.apiSpecimenService.textSearch(this.query, this.hitsPerPage));
    }else if (this.entity == "file"){
      this.hitsSource.next(this.apiFileService.textSearch(this.query, this.hitsPerPage));
    }
  }

  ngOnDestroy() {
    if (this.hitsSubscription) {
      this.hitsSubscription.unsubscribe();
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