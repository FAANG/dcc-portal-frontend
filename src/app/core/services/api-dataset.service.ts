import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Dataset } from '../../shared/dataset';
import { DatasetList } from '../../shared/dataset-list';
import { ApiHits } from '../../shared/api-types/api-hits';
import { ApiTimeoutService } from './api-timeout.service';
import { ApiErrorService } from './api-error.service';

@Injectable()
export class ApiDatasetService {
  private host:string = "http://ves-hx-e4:9200/faang_build_2/dataset/";
//  private host:string = "http://ves-pg-e4:9200/faang/file/";
//  private host:string = "http://data.faang.org/api/file/";
//  private host:string = "/api/dataset/";

  constructor(
    private http: Http,
    private apiTimeoutService: ApiTimeoutService,
    private apiErrorService: ApiErrorService,
  ) {}

  // public methods
  get(accession: string): Observable<Dataset>{
    return this.apiTimeoutService.handleTimeout<Dataset>(
      this.apiErrorService.handleError(
        this.http.get(this.host+`${accession}`)
      ).map((r: Response) => r.json()._source as Dataset)
    );
  }

  getAll(query: any): Observable<DatasetList>{
    return this.apiTimeoutService.handleTimeout<DatasetList>(
      this.apiErrorService.handleError(
        this.http.post(this.host+"_search", query)
      ).map((r: Response) => r.json() as DatasetList)      
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
        this.http.post(this.host+"_search", body)
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
          'accession',
          'experiment.accession',
          'specimen.std',
          'organism.std',
          'species.text.autocomp',
          'name',
          'url.keywords'
        ],
      }
    }
    return this.search(hitsPerPage, 0, query);
  }
}
