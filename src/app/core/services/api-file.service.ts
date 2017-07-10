import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { File } from '../../shared/file';
import { FileList } from '../../shared/file-list';
import { ApiHits } from '../../shared/api-types/api-hits';
import { ApiTimeoutService } from './api-timeout.service';
import { ApiErrorService } from './api-error.service';

@Injectable()
export class ApiFileService {

  constructor(
    private http: Http,
    private apiTimeoutService: ApiTimeoutService,
    private apiErrorService: ApiErrorService,
  ) {}

  // public methods

  get(name: string): Observable<File>{
    return this.apiTimeoutService.handleTimeout<File>(
      this.apiErrorService.handleError(
        this.http.get(`/api/file/${name}`)
       ).map((r: Response) => r.json()._source as File)
    );
  }
  getAll(query: any): Observable<FileList>{
    return this.apiTimeoutService.handleTimeout<FileList>(
      this.apiErrorService.handleError(
        this.http.post(`/api/file/_search`, query)
      ).map((r: Response) => r.json() as FileList)      
    );
  }

  getSpecimensFiles(biosampleId: string, fileOffset: number): Observable<FileList>{
    return this.apiTimeoutService.handleTimeout<FileList>(
      this.apiErrorService.handleError(
        this.http.post(`/api/file/_search`, {
          "query": {
            "filtered" : {
              "filter" : {
                "term" : {"specimens" : biosampleId}
              }
            }
          },
          from: fileOffset
        })
      ).map((r: Response) => r.json() as FileList)
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
        this.http.post(`/api/file/_search`, body)
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
          'name.std',
          'dataType.std',
          'archive.std',
          'specimens.std',
          'url.keywords'
        ],
      }
    }
    return this.search(hitsPerPage, 0, query);
  }
}
