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
//  private host:string = "http://ves-hx-e4:9200/faang_build_3/organism/";
//  private host:string = "http://test.faang.org/api/organism/";
  private host:string = "/api/organism/";

  constructor(
    private http: Http,
    private apiTimeoutService: ApiTimeoutService,
    private apiErrorService: ApiErrorService,
  ) {}

  // public methods

  get(biosampleId: string): Observable<Organism>{
    return this.apiTimeoutService.handleTimeout<Organism>(
      this.apiErrorService.handleError(
        this.http.get(this.host+`${biosampleId}`)
      ).map((r: Response) => r.json()._source as Organism)
    );
  }
  getAll(query: any): Observable<OrganismList>{
    return this.apiTimeoutService.handleTimeout<OrganismList>(
      this.apiErrorService.handleError(
        this.http.post(this.host+"_search", query)
      ).map((r: Response) => r.json() as OrganismList)
//      ).map((r: Response) => r.json() as OrganismList).do(console.log) #do function to print out the result
    );
  }

  getAllInArray(query: any): Observable<Array<Array<string>>>{
    return this.apiTimeoutService.handleTimeout<Array<Array<string>>>(
      this.apiErrorService.handleError(
        this.http.post(this.host+"_search", query)
      ).map((r: Response) => {
        var result:Array<Array<string>> = new Array<Array<string>>();
        var header:Array<string> = ["BiosampleId",
                                    "Name",
                                    "Standard",
                                    "Release date",
                                    "Update date",
                                    "Project",
                                    "Organization",
                                    "Material",
                                    "Species",
                                    "Species ontology",
                                    "Sex",
                                    "Sex ontology",
                                    "Breed",
                                    "Breed ontology",
                                    "Birth date",
                                    "Health status",
                                    "Birth location",
                                    "Birth location longitude",
                                    "Birth location latitude",
                                    "Birth weight",
                                    "PlacentalWeight",
                                    "Pregnancy length",
                                    "Delivery timing",
                                    "Delivery ease",
                                    "Child of",
                                    "Pedigree"
                                    ];
        result.push(header);
        let json = r.json() as OrganismList;
        for ( let index in json.hits.hits){
          var one:Array<string> = new Array<string>();
          let hit : Organism = json.hits.hits[index]['_source'];
          one.push(hit.biosampleId);
          one.push(hit.name);
          one.push(hit.standardMet);
          one.push(hit.releaseDate);
          one.push(hit.updateDate);
          one.push(hit.project);
          one.push(this.joinArray(hit.organization));
          one.push(hit.material.text);
          one.push(hit.organism.text);
          one.push(hit.organism.ontologyTerms);
          one.push(hit.sex.text);
          one.push(hit.sex.ontologyTerms);
          one.push(hit.breed.text);
          one.push(hit.breed.ontologyTerms);
          one.push(hit.birthDate.text);
          one.push(this.joinArray(hit.healthStatus));
          one.push(hit.birthLocation);
          one.push(hit.birthLocationLongitude.text);
          one.push(hit.birthLocationLatitude.text);
          one.push(hit.birthWeight.text+hit.birthWeight.unit);
          one.push(hit.placentalWeight.text+hit.placentalWeight.unit);
          one.push(hit.pregnancyLength.text+hit.pregnancyLength.unit);
          one.push(hit.deliveryTiming);
          one.push(hit.deliveryEase);
          one.push(this.joinArray(hit.childOf));
          one.push(hit.pedigree);
          result.push(one);
        }
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
