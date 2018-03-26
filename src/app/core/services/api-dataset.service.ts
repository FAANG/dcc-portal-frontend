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
  private host:string = "http://ves-hx-e4:9200/faang_build_1/dataset/";
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

  getAllInArray(query: any, timeout: number): Observable<Array<Array<string>>>{
    return this.apiTimeoutService.handleExportTimeout<Array<Array<string>>>(
      timeout, this.apiErrorService.handleError(
        this.http.post(this.host+"_search", query)
      ).map((r: Response) => {
        var result:Array<Array<string>> = new Array<Array<string>>();
        var header:Array<string> = ["Study accession",
                                    "Release date",
                                    "Update date",
                                    "Study title",
                                    "Study alias",
                                    "Study type",
                                    "Study secondary accession",
                                    "Archive",
                                    "Species",
                                    "Instruments",
                                    "Center names"
//                                    ,
//                                    "Specimens details list",
//                                    "Files details list",
//                                    "Experiments details list",
                                    ];

        result.push(header);
        let json = r.json() as DatasetList;
        for ( let index in json.hits.hits){
          var one:Array<string> = new Array<string>();
          let hit : Dataset = json.hits.hits[index]['_source'];


          one.push(hit.accession);
          one.push(hit.releaseDate);
          one.push(hit.updateDate);
          one.push(hit.title);
          one.push(hit.alias);
          one.push(hit.type);
          one.push(hit.secondaryAccession);
          one.push(this.joinArray(hit.archive));
          one.push(this.joinArray(hit.species));
          one.push(this.joinArray(hit.instrument));
          one.push(this.joinArray(hit.centerName));
//          one.push(hit.size+"");
//          one.push(hit.experiment.accession);
//          one.push(hit.experiment.target);
          result.push(one);
        }
        console.log("HAHAHA"+result.length);
        return result;
      })
    );
  }

  joinArray (arr: Array<any>): string{
    if (arr == null || typeof(arr) === 'undefined'){
      return "null";
    }
    var str:string = "";
    for (var index in arr) {
      var element = arr[index];
      var curr:string = "";
      if (typeof(element) == 'object'){
        var keys = Object.keys(element);
        if(keys.includes("text")){
          curr = element["text"];
        }else{
          keys = keys.sort();
          for (var key of keys){
            curr += key+":"+element[key]+",";
          }
          curr = curr.substr(0,(curr.length-1));
        }
      }else{
        curr = element;
      }
      if (index == "0"){
        str += curr;
      }else{
        str += ";"+curr;
      }
    }
    return str;
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
