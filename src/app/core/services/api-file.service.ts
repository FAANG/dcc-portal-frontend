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
//  private host:string = "http://ves-hx-e4:9200/faang_build_2/file/";
  private host:string = "/api/file/";

  constructor(
    private http: Http,
    private apiTimeoutService: ApiTimeoutService,
    private apiErrorService: ApiErrorService,
  ) {}

  // public methods

  get(name: string): Observable<File>{
    return this.apiTimeoutService.handleTimeout<File>(
      this.apiErrorService.handleError(
        this.http.get(this.host+`${name}`)
      ).map((r: Response) => r.json()._source as File)
    );
  }
  getAll(query: any): Observable<FileList>{
    return this.apiTimeoutService.handleTimeout<FileList>(
      this.apiErrorService.handleError(
        this.http.post(this.host+"_search", query)
      ).map((r: Response) => r.json() as FileList)      
    );
  }

  getAllInArray(query: any, timeout: number): Observable<Array<Array<string>>>{
    return this.apiTimeoutService.handleExportTimeout<Array<Array<string>>>(
      timeout, this.apiErrorService.handleError(
        this.http.post(this.host+"_search", query)
      ).map((r: Response) => {
        var result:Array<Array<string>> = new Array<Array<string>>();
        var header:Array<string> = ["File name",
                                    "Release date",
                                    "Update date",
                                    "Specimen",
                                    "Organism",
                                    "Species",
                                    "Species ontology",
                                    "URL",
                                    "Type",
                                    "Size",
                                    "Readable size",
                                    "Checksum",
                                    "Checksum method",
                                    "Archive",
                                    "Read count",
                                    "Base count",
                                    "Submission",
                                    "Experiment accession",
                                    "Experiment target",
                                    "Experiment assay type",
                                    "Study accession",
                                    "Study type",
                                    "Study secondary accession",
                                    "Study title",
                                    "Run accession",
                                    "Platform",
                                    "Instrument",
                                    "Centre name",
                                    "Sequencing date",
                                    "Sequencing location",
                                    "Sequencing latitude",
                                    "Sequencing longitude"
                                    ];

        result.push(header);
        let json = r.json() as FileList;
        for ( let index in json.hits.hits){
          var one:Array<string> = new Array<string>();
          let hit : File = json.hits.hits[index]['_source'];


          one.push(hit.name);
          one.push(hit.releaseDate);
          one.push(hit.updateDate);
          one.push(hit.specimen);
          one.push(hit.organism);
          one.push(hit.species.text);
          one.push(hit.species.ontologyTerms);
          one.push(hit.url);
          one.push(hit.type);
          one.push(hit.size+"");
          one.push(hit.readableSize+"");
          one.push(hit.checksum);
          one.push(hit.checksumMethod);
          one.push(hit.archive);
          one.push(hit.readCount+"");
          one.push(hit.baseCount+"");
          one.push(hit.submission);
          one.push(hit.experiment.accession);
          one.push(hit.experiment.target);
          one.push(hit.experiment.assayType);
          one.push(hit.study.accession);
          one.push(hit.study.type);
          one.push(hit.study.secondaryAccession);
          one.push(hit.study.title);
          one.push(hit.run.accession);
          one.push(hit.run.platform);
          one.push(hit.run.instrument);
          one.push(hit.run.centerName);
          one.push(hit.run.sequencingDate);
          one.push(hit.run.sequencingLocation);
          one.push(hit.run.sequencingLatitude);
          one.push(hit.run.sequencingLongitude);
          result.push(one);
        }
        return result;
      })
    );
  }

  getSpecimensFiles(biosampleId: string, fileOffset: number): Observable<FileList>{
    return this.apiTimeoutService.handleTimeout<FileList>(
      this.apiErrorService.handleError(
        this.http.post(this.host+"_search", {
//        this.http.post(`http://ves-hx-e4:9200/faang_build_3/file/_search`, {
          "query": {
            "filtered" : {
              "filter" : {
                "term" : {"specimen" : biosampleId}
              }
            }
          },
          "sort": [
            {"run.accession": "asc"},
            {"name":"asc"}
          ],
          from: fileOffset
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
