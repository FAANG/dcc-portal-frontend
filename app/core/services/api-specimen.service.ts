import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Specimen } from '../../shared/specimen';
import { SpecimenList } from '../../shared/specimen-list';
import { ApiHits } from '../../shared/api-types/api-hits';
import { ApiTimeoutService } from './api-timeout.service';
import { ApiErrorService } from './api-error.service';

@Injectable()
export class ApiSpecimenService {

  constructor(
    private http: Http,
    private apiTimeoutService: ApiTimeoutService,
    private apiErrorService: ApiErrorService,
  ) {}

  // public methods

  get(biosampleId: string): Observable<Specimen>{
    return this.apiTimeoutService.handleTimeout<Specimen>(
      this.apiErrorService.handleError(
        //this.http.get(`http://data.faang.org/api/specimen/${biosampleId}`)
        this.http.get(`http://ves-hx-e3:9200/faang_build_2/specimen/${biosampleId}`)
      ).map((r: Response) => r.json()._source as Specimen)
    );
  }
  getAll(query: any): Observable<SpecimenList>{
    return this.apiTimeoutService.handleTimeout<SpecimenList>(
      this.apiErrorService.handleError(                                                    
        //this.http.post(`http://data.faang.org/api/specimen/_search`, query)
        this.http.post(`http://ves-hx-e3:9200/faang_build_2/specimen/_search`, query)
      ).map((r: Response) => r.json() as SpecimenList)
    );
  }
  getOrganismsSpecimens(biosampleId: string, specimenOffset: number): Observable<SpecimenList>{
    return this.apiTimeoutService.handleTimeout<SpecimenList>(
      this.apiErrorService.handleError(
        //this.http.post(`http://data.faang.org/api/specimen/_search`, {
        this.http.post(`http://ves-hx-e3:9200/faang_build_2/specimen/_search`, {
          "query": {
            "filtered" : {
              "filter" : {
                "term" : {"organism.biosampleId" : biosampleId}
              }
            }
          },
          sort: [
            {biosampleId: "desc"}
          ],
          from: specimenOffset
        })
      ).map((r: Response) => r.json() as SpecimenList)
    );
  }

  search(hitsPerPage: number, from: number, query: any): Observable<ApiHits>{
    let body = {
      from: from,
      size: hitsPerPage,
    };
    if (query) {
      body['query'] = query;
    }
    return this.apiTimeoutService.handleTimeout<ApiHits>(
      this.apiErrorService.handleError(
        //this.http.post(`http://data.faang.org/api/specimen/_search`, body)
        this.http.post(`http://ves-hx-e3:9200/faang_build_2/specimen/_search`, body)
      ).map((r:Response): ApiHits => {
        let h: {hits: ApiHits} = r.json() as {hits: ApiHits};
        return h.hits;
      })
    );
  }

  textSearch(text: string, hitsPerPage: number): Observable<ApiHits> {
    if (!text) {
      return Observable.of<ApiHits>(null);
    }
    let query = {
      multi_match: {
        query: text,
        fields: [
          'biosampleId.std',
          'name.std',
          'description.std',
          'sameAs.std',
          'derivedFrom.std',
          'organization.name.std',
          'specimenFromOrganism.developmentalStage.text.autocomp',
          'specimenFromOrganism.healthStatusAtCollection.text.autocomp',
          'specimenFromOrganism.organismPart.text.autocomp',
          'organism.biosampleId.std',
          'organism.organism.text.autocomp',
          'organism.sex.text.autocomp',
          'organism.breed.text.autocomp',
          'organism.healthStatus.text.autocomp',
          'cellLine.organism.text.autocomp',
          'cellLine.sex.text.autocomp',
          'cellLine.breed.text.autocomp',
          'cellLine.cellLine.std',
          'cellLine.disease.autocomp',
        ],
      }
    }
    return this.search(hitsPerPage, 0, query);
  }
}
