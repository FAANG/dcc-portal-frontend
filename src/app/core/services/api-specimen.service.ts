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
export class ApiSpecimenService{
//  private host:string = "http://ves-hx-e4:9200/faang_build_3/specimen/";
//  private host:string = "http://data.faang.org/api/specimen/";
  private host:string = "/api/specimen/";
  //headers for different sections
  private header:Array<string> = ["BiosampleId",
                                  "Name",
                                  "Material",
                                  "Material ontology",
                                  "Standard",
                                  "Release date",
                                  "Update date",
                                  "Project",
                                  "Organization",
                                  "Derived from",
                                  "Species",
                                  "Species ontology",
                                  "Sex",
                                  "Sex ontology",
                                  "Breed",
                                  "Breed ontology",
                                  "Health status",
                                 ];
  private headerSpecimenFromOrganism:Array<string> = ["Specimen collection date",
                                                      "Animal age at collection",
                                                      "Development stage",
                                                      "Development stage ontology",
                                                      "Health status at collection",
                                                      "Organism part",
                                                      "Organism part ontology",
                                                      "Specimen collection protocol",
                                                      "Fasted status",
                                                      "Number of pieces",
                                                      "Specimen volume",
                                                      "Specimen size",
                                                      "Specimen weight",
                                                      "Specimen picture urls",
                                                      "Gestational age at collection"
                                                     ];
  private headerCellSpecimen:Array<string> = ["Markers",
                                              "Cell types",
                                              "Purification protocol",
                                             ];
  private headerCellCulture:Array<string> = ["Culture type",
                                             "Culture type ontology",
                                             "Cell type",
                                             "Cell type ontology",
                                             "Cell culture protocol",
                                             "Culture conditions",
                                             "Number of passages"
                                            ];
  private headerCellLine:Array<string> = ["Cell line",
                                          "Biomaterial provider",
                                          "Catalogue number",
                                          "Number of passages",
                                          "Date established",
                                          "Publication",
                                          "Cell type",
                                          "Cell type ontology",
                                          "Culture conditions",
                                          "Culture protocol",
                                          "Disease",
                                          "Karyotype"
                                          ];

  constructor(
    private http: Http,
    private apiTimeoutService: ApiTimeoutService,
    private apiErrorService: ApiErrorService,
  ) {
    //ngOnInit does not execute the following codes
    for (let value of this.headerSpecimenFromOrganism){
      this.header.push(value);
    }
    for (let value of this.headerCellSpecimen){
      this.header.push(value);
    }
    for (let value of this.headerCellCulture){
      this.header.push(value);
    }
    for (let value of this.headerCellLine){
      this.header.push(value);
    }
  }

  getHeader(): Array<string>{
    return this.header;
  }

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

  getAllInArray(query: any, timeout: number): Observable<Array<Array<string>>>{
//    return this.apiTimeoutService.handleTimeout<Array<Array<string>>>(
    return this.apiTimeoutService.handleExportTimeout<Array<Array<string>>>(
      timeout, this.apiErrorService.handleError(
        this.http.post(this.host+"_search", query)
      ).map((r: Response) => {
        var result:Array<Array<string>> = new Array<Array<string>>();
        let json = r.json() as SpecimenList;
        console.log("AHHHHH: "+json.hits.total);
        for ( let index in json.hits.hits){
          var one:Array<string> = new Array<string>();
          let hit : Specimen = json.hits.hits[index]['_source'];
          one.push(hit.biosampleId);
          one.push(hit.name);
          one.push(hit.material.text);
          one.push(hit.material.ontologyTerms);
          one.push(hit.standardMet);
          one.push(hit.releaseDate);
          one.push(hit.updateDate);
          one.push(hit.project);
          one.push(this.joinArray(hit.organization));
          if(typeof(hit.derivedFrom)=="string"){
            one.push(hit.derivedFrom);
          }else{
            one.push(this.joinArray(hit.derivedFrom));
          }
          one.push(hit.organism.organism.text);
          one.push(hit.organism.organism.ontologyTerms);
          one.push(hit.organism.sex.text);
          one.push(hit.organism.sex.ontologyTerms);
          one.push(hit.organism.breed.text);
          one.push(hit.organism.breed.ontologyTerms);
          one.push(this.joinArray(hit.organism.healthStatus));
          if(hit.material.text == "specimen from organism"){
            one.push(hit.specimenFromOrganism.specimenCollectionDate.text);
            one.push(hit.specimenFromOrganism.animalAgeAtCollection.text+" "+hit.specimenFromOrganism.animalAgeAtCollection.unit);
            one.push(hit.specimenFromOrganism.developmentalStage.text);
            one.push(hit.specimenFromOrganism.developmentalStage.ontologyTerms);
            one.push(this.joinArray(hit.specimenFromOrganism.healthStatusAtCollection));
            one.push(hit.specimenFromOrganism.organismPart.text);
            one.push(hit.specimenFromOrganism.organismPart.ontologyTerms);
            one.push(hit.specimenFromOrganism.specimenCollectionProtocol.url);
            one.push(hit.specimenFromOrganism.fastedStatus);
            one.push(hit.specimenFromOrganism.numberOfPieces.text+hit.specimenFromOrganism.numberOfPieces.unit);
            one.push(hit.specimenFromOrganism.specimenVolume.text+hit.specimenFromOrganism.specimenVolume.unit);
            one.push(hit.specimenFromOrganism.specimenSize.text+hit.specimenFromOrganism.specimenSize.unit);
            one.push(hit.specimenFromOrganism.specimenWeight.text+hit.specimenFromOrganism.specimenWeight.unit);
            one.push(this.joinArray(hit.specimenFromOrganism.specimenPictureUrl));
            one.push(hit.specimenFromOrganism.gestationalAgeAtSampleCollection.text+hit.specimenFromOrganism.gestationalAgeAtSampleCollection.unit);
          }else{
            for (let i in this.headerSpecimenFromOrganism){
              one.push("");
            }
          }
          if(hit.material.text == "cell specimen"){
            one.push(hit.cellSpecimen.markers);
            one.push(this.joinArray(hit.cellSpecimen.cellType));
            one.push(hit.cellSpecimen.purificationProtocol.url);
          }else{
            for (let i in this.headerCellSpecimen){
              one.push("");
            }
          }
          if(hit.material.text == "cell culture"){
            one.push(hit.cellCulture.cultureType.text);
            one.push(hit.cellCulture.cultureType.ontologyTerms);
            one.push(hit.cellCulture.cellType.text);
            one.push(hit.cellCulture.cellType.ontologyTerms);
            one.push(hit.cellCulture.cellCultureProtocol.url);
            one.push(hit.cellCulture.cultureConditions);
            one.push(hit.cellCulture.numberOfPassages+"");
          }else{
            for (let i in this.headerCellCulture){
              one.push("");
            }
          }
          if(hit.material.text == "cell line"){
            one.push(hit.cellLine.cellLine);
            one.push(hit.cellLine.biomaterialProvider);
            one.push(hit.cellLine.catalogueNumber);
            one.push(hit.cellLine.passageNumber+"");
            one.push(hit.cellLine.dateEstablished.text+"");
            one.push(hit.cellLine.publication);
            one.push(hit.cellLine.cellType.text);
            one.push(hit.cellLine.cellType.ontologyTerms);
            one.push(hit.cellLine.cultureConditions);
            one.push(hit.cellLine.cultureProtocol.url);
            one.push(hit.cellLine.disease.text);
            one.push(hit.cellLine.karyotype);
          }else{
            for (let i in this.headerCellLine){
              one.push("");
            }
          }
          result.push(one);
        }
        console.log("within service result length: "+result.length);
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
  //maybe needed to wrap each element
  wrapWithQuotationMark (str:string): string{
//    return "\""+str+"\"";
    if(str == undefined) return str;
    if(str.length==0) return "";
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
