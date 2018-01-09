import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Dataset } from '../../shared/dataset';
import { DatasetList } from '../../shared/dataset-list';
import { FileList } from '../../shared/file-list';
import { File } from '../../shared/file';
import { ApiHits } from '../../shared/api-types/api-hits';
import { ApiTimeoutService } from './api-timeout.service';
import { ApiErrorService } from './api-error.service';

@Injectable()
export class ApiDatasetService {
  private host:string = "http://ves-hx-e4:9200/faang_build_3/file/";
//  private host:string = "http://ves-pg-e4:9200/faang/file/";
//  private host:string = "http://data.faang.org/api/file/";
//  private host:string = "/api/file/";

  constructor(
    private http: Http,
    private apiTimeoutService: ApiTimeoutService,
    private apiErrorService: ApiErrorService,
  ) {}

  // public methods

  get(accession: string): Observable<Dataset>{
    return this.apiTimeoutService.handleTimeout<Dataset>(
      this.apiErrorService.handleError(
        this.http.post(this.host+"_search", {
          "query": {
            "filtered" : {
              "filter" : {
                "term" : {"study.accession" : accession}
              }
            }
          },
          "sort": [
            {"name": "asc"}
          ],
          size:1000
        })
      ).map((r: Response) => {
        let json = r.json() as FileList;
        var numberOfFile:number = json.hits.total;
        console.log(numberOfFile);
        var files: File[] = new Array<File>(numberOfFile);
        let one : File = json.hits.hits[0]['_source'];
        var title: string = one.study.title;
        var type: string = one.study.type;
        var secondAccession: string = one.study.secondaryAccession;
        var species: {[text:string]:string} = {};
        var experiments: {[experiment:string]:number} = {};
        var instruments: {[experiment:string]:number} = {};
        for ( let index in json.hits.hits){
          let hit : File = json.hits.hits[index]['_source'];
          files[index] = hit;
          species[hit.species.text] = hit.species.ontologyTerms;
          experiments[hit.experiment.accession] = 1;
          instruments[hit.run.instrument] = 1;
        }

        var speciesArr: any[] = [];
        for (let text of Object.keys(species)){
          let tmp = {"text":text, "ontologyTerms":species[text]};
          speciesArr.push(tmp);
        }

        var dataset:Dataset = new Dataset(accession,title,type,secondAccession,speciesArr,Object.keys(experiments),Object.keys(instruments),files);
        console.log(dataset);
        return dataset;
      })
    );
  }
  getAll(query: any): Observable<DatasetList>{
    return this.apiTimeoutService.handleTimeout<DatasetList>(
      this.apiErrorService.handleError(
        this.http.post(this.host+"_search", query)
      ).map((r: Response) => r.json() as DatasetList)      
    );
  }

  getSpecimensFiles(accession: string): Observable<FileList>{
    return this.apiTimeoutService.handleTimeout<FileList>(
      this.apiErrorService.handleError(
        this.http.post(this.host+"_search", {
//        this.http.post(`http://ves-hx-e4:9200/faang_build_3/file/_search`, {
          "query": {
            "filtered" : {
              "filter" : {
                "term" : {"study.accession" : accession}
              }
            }
          },
          "sort": [
            {"run.accession": "asc"},
            {"name":"asc"}
          ]
        })
      ).map((r: Response) => r.json() as FileList)
    );
  }

  getSpecimensFilesByRun(runId: string, fileOffset: number): Observable<FileList>{
    return this.apiTimeoutService.handleTimeout<FileList>(
      this.apiErrorService.handleError(
        this.http.post(this.host+"_search", {
//        this.http.post(`http://ves-hx-e4:9200/faang_build_3/file/_search`, {
          "query": {
            "filtered" : {
              "filter" : {
                "term" : {"run.accession" : runId}
              }
            }
          },
          "sort": [
            {"name":"asc"}
          ],
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
          'study.accession',
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
