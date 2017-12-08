import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Specimen } from '../../shared/specimen';
import { SpecimenList } from '../../shared/specimen-list';
import { ApiHits } from '../../shared/api-types/api-hits';
import { ApiTimeoutService } from './api-timeout.service';
import { ApiErrorService } from './api-error.service';

@Injectable()
export class ApiSpecimenService {
  private host:string = "http://ves-hx-e4:9200/faang_build_3/specimen/";
//  private host:string = "http://test.faang.org/api/specimen/";
//  private host:string = "/api/specimen/";

  constructor(
    private http: Http,
    private apiTimeoutService: ApiTimeoutService,
    private apiErrorService: ApiErrorService,
  ) {}

  // public methods

  get(biosampleId: string): Observable<Specimen>{
    return this.apiTimeoutService.handleTimeout<Specimen>(
      this.apiErrorService.handleError(
        this.http.get(this.host+`${biosampleId}`)
      ).map((r: Response) => r.json()._source as Specimen)
    );
  }
  getAll(query: any): Observable<SpecimenList>{
    return this.apiTimeoutService.handleTimeout<SpecimenList>(
      this.apiErrorService.handleError(                                                    
        this.http.post(this.host+"_search", query)
      ).map((r: Response) => r.json() as SpecimenList)
    );
  }

  getAllInArray(query: any): Observable<Array<Array<string>>>{
    return this.apiTimeoutService.handleTimeout<Array<Array<string>>>(
      this.apiErrorService.handleError(
        this.http.post(this.host+"_search", query)
      ).map((r: Response) => {
        console.log(query);
        var result:Array<Array<string>> = new Array<Array<string>>();
        var header:Array<string> = ["BiosampleId",
                                    "Name",
                                    "Standard",
                                    "Release date",
                                    "Update date",
                                    "Project",
                                    "Organization",
                                    "Material",
                                    "Derived from",
                                    "Species",
                                    "Species ontology",
                                    "Sex",
                                    "Sex ontology",
                                    "Breed",
                                    "Breed ontology",
                                    "Health status",
                                    ];

//    readonly specimenFromOrganism: {
//      readonly specimenCollectionDate: {
//        readonly text: string,
//        readonly unit: string,
//      },
//      readonly animalAgeAtCollection: {
//        readonly text: number,
//        readonly unit: string,
//      },
//      readonly developmentalStage: {
//        readonly text: string,
//        readonly ontologyTerms: string,
//      },
//      readonly healthStatusAtCollection: {
//        readonly text: string,
//        readonly ontologyTerms: string,
//      }[],
//      readonly organismPart: {
//        readonly text: string,
//        readonly ontologyTerms: string,
//      },
//      readonly specimenCollectionProtocol: {
//        readonly url: string,
//        readonly filename: string
//      },
//      readonly fastedStatus: string,
//      readonly numberOfPieces: {
//        readonly text: number,
//        readonly unit: string,
//      },
//      readonly specimenVolume: {
//        readonly text: number,
//        readonly unit: string,
//      },
//      readonly specimenSize: {
//        readonly text: number,
//        readonly unit: string,
//      },
//      readonly specimenWeight: {
//        readonly text: number,
//        readonly unit: string,
//      },
//      readonly specimenPictureUrl: string[],
//      readonly gestationalAgeAtSampleCollection: {
//        readonly text: number,
//        readonly unit: string,
//      }
//    },
//    readonly cellSpecimen: {
//      readonly markers: string,
//      readonly cellType: {
//        readonly text: string,
//        readonly ontologyTerms: string,
//      }[],
//      readonly purificationProtocol: {
//        readonly url: string,
//        readonly filename: string
//      }
//    },
//    readonly cellCulture: {
//      readonly cultureType: {
//       readonly text: string,
//        readonly ontologyTerms: string,
//      },
//      readonly cellType: {
//        readonly text: string,
//        readonly ontologyTerms: string,
//      },
//      readonly cellCultureProtocol: {
//        readonly url: string,
//        readonly filename: string
//      },
//      readonly cultureConditions: string,
//      readonly numberOfPassages: number
//    },
//    readonly cellLine: {
//      readonly organism: {
//        readonly text: string,
//        readonly ontologyTerms: string,
//      },
//      readonly sex: {
//        readonly text: string,
//        readonly ontologyTerms: string,
//     },
//      readonly cellLine: string,
//      readonly biomaterialProvider: string,
//      readonly catalogueNumber: string,
//      readonly passageNumber: number,
//      readonly dateEstablished: {
//        readonly text: number,
//        readonly unit: string,
//      },
//      readonly publication: string,
//      readonly breed: {
//        readonly text: string,
//        readonly ontologyTerms: string,
//     },
//      readonly cellType: {
//        readonly text: string,
//        readonly ontologyTerms: string,
//      },
//      readonly cultureConditions: string,
//      readonly cultureProtocol: {
//        readonly url: string,
//        readonly filename: string
//      },
//      readonly disease: {
//        readonly text: string,
//        readonly ontologyTerms: string,
//      },
//      readonly karyotype: string,
//    },

        result.push(header);
        let json = r.json() as SpecimenList;
        for ( let index in json.hits.hits){
          var one:Array<string> = new Array<string>();
          let hit : Specimen = json.hits.hits[index]['_source'];
          one.push(hit.biosampleId);
          one.push(hit.name);
          one.push(hit.standardMet);
          one.push(hit.releaseDate);
          one.push(hit.updateDate);
          one.push(hit.project);
          one.push(this.joinArray(hit.organization));
          one.push(hit.material.text);
          one.push(hit.derivedFrom);
          one.push(hit.organism.organism.text);
          one.push(hit.organism.organism.ontologyTerms);
          one.push(hit.organism.sex.text);
          one.push(hit.organism.sex.ontologyTerms);
          one.push(hit.organism.breed.text);
          one.push(hit.organism.breed.ontologyTerms);
          one.push(this.joinArray(hit.organism.healthStatus));
          result.push(one);
        }
        return result;
      })
    );
  }

  getOrganismsSpecimens(biosampleId: string, specimenOffset: number): Observable<SpecimenList>{
    return this.apiTimeoutService.handleTimeout<SpecimenList>(
      this.apiErrorService.handleError(
//        this.http.post(`/api/specimen/_search`, {
        this.http.post(this.host+"_search",  {
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
          curr = curr.slice(0,(curr.length-1));
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
        this.http.post(`/api/specimen/_search`, body)
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
