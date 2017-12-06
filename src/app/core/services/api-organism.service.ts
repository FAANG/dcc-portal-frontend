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
  private host:string = "http://ves-hx-e4:9200/faang_build_3/organism/";
//  private host:string = "http://test.faang.org/api/organism/";
//  private host:string = "/api/organism/";

  constructor(
    private http: Http,
    private apiTimeoutService: ApiTimeoutService,
    private apiErrorService: ApiErrorService,
  ) {}

  // public methods

  get(biosampleId: string): Observable<Organism>{
    return this.apiTimeoutService.handleTimeout<Organism>(
      this.apiErrorService.handleError(
//        this.http.get(`http://ves-hx-e4:9200/faang_build_3/organism/${biosampleId}`)
//        this.http.get(`http://test.faang.org/api/organism/${biosampleId}`)
        this.http.get(this.host+`${biosampleId}`)
      ).map((r: Response) => r.json()._source as Organism)
    );
  }
  getAll(query: any): Observable<OrganismList>{
    return this.apiTimeoutService.handleTimeout<OrganismList>(
      this.apiErrorService.handleError(
        this.http.post(this.host+"_search", query)
//        this.http.post(`http://ves-hx-e4:9200/faang_build_3/organism/_search`, query)
//        this.http.post(`http://test.faang.org/api/organism/_search`, query)
//        this.http.post(`/api/organism/_search`, query)
      ).map((r: Response) => r.json() as OrganismList)
//      ).map((r: Response) => r.json() as OrganismList).do(console.log) #do function to print out the result
    );
  }

  getAllInArray(query: any): Observable<Array<Array<string>>>{
    return this.apiTimeoutService.handleTimeout<Array<Array<string>>>(
      this.apiErrorService.handleError(
        this.http.post(this.host+"_search", query)
      ).map((r: Response) => {
        console.log(query);
        var result:Array<Array<string>> = new Array<Array<string>>();
//        console.log("within service initialize:"+result.length);
        var header:Array<string> = ["BiosampleId","Sex","Species","Breed"];
        result.push(header);
        let json = r.json() as OrganismList;
        for ( let index in json.hits.hits){
          var one:Array<string> = new Array<string>();
          let hit : Organism = json.hits.hits[index]['_source'];
          one.push(hit.biosampleId);
          one.push(hit.sex.text);
          one.push(hit.organism.text);
          one.push(hit.breed.text);
          result.push(one);
        }
//        console.log("result within service\n"+result);
        return result;
      })
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
        this.http.post(`/api/organism/_search`, body)
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
          'description.std',
          'organism.organism.text.autocomp',
          'sex.text.autocomp',
          'breed.text.autocomp',
          'healthStatus.text.autocomp'
        ],
      }
    }
    return this.search(hitsPerPage, 0, query);
  }
}
