import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Organism } from '../../shared/organism';
import { OrganismList } from '../../shared/organism-list';
import { ApiHits } from '../../shared/api-types/api-hits';
import { ApiTimeoutService } from './api-timeout.service';
import { ApiErrorService } from './api-error.service';


@Injectable()
export class ApiOrganismService {

  constructor(
    private http: Http,
    private apiTimeoutService: ApiTimeoutService,
    private apiErrorService: ApiErrorService,
  ) {}

  // public methods

  get(biosampleId: string): Observable<Organism>{
    return this.apiTimeoutService.handleTimeout<Organism>(
      this.apiErrorService.handleError(
        //this.http.get(`http://data.faang.org/api/organism/${biosampleId}`)
        this.http.get(`http://ves-hx-e3:9200/faang_build_2/organism/${biosampleId}`)
      ).map((r: Response) => r.json()._source as Organism)
    );
  }
  getAll(query: any): Observable<OrganismList>{
    return this.apiTimeoutService.handleTimeout<OrganismList>(
      this.apiErrorService.handleError(
        //this.http.post(`http://data.faang.org/api/organism/_search`, query)
        this.http.post(`http://ves-hx-e3:9200/faang_build_2/organism/_search`, query)
      ).map((r: Response) => r.json() as OrganismList)      
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
        //this.http.post(`http://data.faang.org/api/organism/_search`, body)
        this.http.post(`http://ves-hx-e3:9200/faang_build_2/organism/_search`, body)
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
          'sameAs.std',
          'organism.organism.text',
          'sex.text',
          'breed.text'
        ],
      }
    }
    return this.search(hitsPerPage, 0, query);
  }
}
