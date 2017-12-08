import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { SpecimenList } from '../shared/specimen-list';
import { Specimen } from '../shared/specimen';

import { ApiSpecimenService }  from '../core/services/api-specimen.service';

let specimenTableStyles: string = `
  .clickable {
    cursor: pointer;
  }
  @media (max-width: 767px) {
    div.faang-filter {
      width: 300px;
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

@Component({
    selector: 'specimen-table',
    templateUrl: './specimen-table.component.html',
    styles: [ specimenTableStyles ],
})
export class SpecimenTableComponent implements OnInit, OnDestroy { 
  // public properties
  specimenList: SpecimenList
  specimenOffset: number
  isSexFiltered: {[key: string] : boolean} = {}
  isMaterialFiltered: {[key: string] : boolean} = {}
  isOrganismFiltered: {[key: string] : boolean} = {}
  isOrganismPartFiltered: {[key: string] : boolean} = {}
  isBreedFiltered: {[key: string] : boolean} = {}
  isStandardFiltered: {[key: string] : boolean} = {}

  sexAggs: {key: string, doc_count: number}[]
  materialAggs: {key: string, doc_count: number}[]
  organismAggs: {key: string, doc_count: number}[]
  organismPartAggs: {key: string, doc_count: number}[]
  breedAggs: {key: string, doc_count: number}[]
  standardAggs: {key: string, doc_count: number}[]

  // private properties
  private routeSubscription: Subscription = null;
  private specimenSource: Subject<Observable<SpecimenList>>;
  private specimenSubscription: Subscription = null;
  private query: {[term: string]: any} = {};
  private pageLimit: number

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiSpecimenService: ApiSpecimenService,
    private titleService: Title,
  ){ };

  ngOnInit() {
    this.query['sort'] = [{biosampleId: "desc"}]//if in the subscribe function, the sort order will be initialized every time, i.e. after removing all filters, the existing sort orders will be lost
    this.titleService.setTitle('FAANG specimens');
    this.specimenSource = new Subject<Observable<SpecimenList>>();
    this.specimenSubscription = this.specimenSource
        .switchMap((o: Observable<SpecimenList>):Observable<SpecimenList> => o) //convert each http request into an element in the pipe
        .subscribe((e: SpecimenList) => { //deal with each element coming out of the pipe
          this.specimenList = e;
          this.sexAggs = [];
          this.materialAggs = [];
          this.organismAggs = [];
          this.organismPartAggs = [];
          this.breedAggs = [];
          this.standardAggs = [];

          if (e && e.aggregations && e.aggregations['all_specimen']) {
            let aggs = e.aggregations['all_specimen'];
            //when initialized, i.e. without any filter, the buckets (the terms aggs) are under 'sex'. refer to line 105
            //with any filter, the buckets are under 'sex'.'sex'
            //. in the elasticsearch response in ts is represented by [][]
            this.sexAggs = aggs['sex']['buckets'] ? aggs['sex']['buckets']
                      : aggs['sex']['sex-filter']['buckets'] ? aggs['sex']['sex-filter']['buckets']
                      : [];
            this.materialAggs = aggs['material']['buckets'] ? aggs['material']['buckets']
                      : aggs['material']['material-filter']['buckets'] ? aggs['material']['material-filter']['buckets']
                      : [];
            this.organismAggs = aggs['organism']['buckets'] ? aggs['organism']['buckets']
                      : aggs['organism']['organism-filter']['buckets'] ? aggs['organism']['organism-filter']['buckets']
                      : [];
            this.organismPartAggs = aggs['organismPart']['buckets'] ? aggs['organismPart']['buckets']
                      : aggs['organismPart']['organismPart-filter']['buckets'] ? aggs['organismPart']['organismPart-filter']['buckets']
                      : [];
            this.breedAggs = aggs['breed']['buckets'] ? aggs['breed']['buckets']
                      : aggs['breed']['breed-filter']['buckets'] ? aggs['breed']['breed-filter']['buckets']
                      : [];
            this.standardAggs = aggs['standard']['buckets'] ? aggs['standard']['buckets']
                      : aggs['standard']['standard-filter']['buckets'] ? aggs['standard']['standard-filter']['buckets']
                      : [];
          }
        });
    
    this.specimenOffset = 0;
    this.pageLimit = 20;
    this.getSpecimenList();
    this.routeSubscription =
      this.activatedRoute.queryParams.subscribe((queryParams: {sex: string, material: string, organism: string, organismPart: string, breed: string, standard: string}) => {
        this.specimenOffset = 0;
        this.query['from'] = this.specimenOffset
        this.query['size'] = this.pageLimit
//        this.query['sort'] = [{biosampleId: "desc"}]
        this.initAggRelatedVariables();
        if (queryParams.sex || queryParams.material || queryParams.organism || queryParams.organismPart || queryParams.breed || queryParams.standard) {
          this.query['query'] = {"filtered" : {"filter" : {"bool": {"must": []}}}}

          if (queryParams.sex){
            let sexParams = queryParams.sex.split("|")
            //add to the filter at the same level as global aggs using terms bool filter
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'organism.sex.text' :sexParams}})
            
            //add sex filter to all other aggs in two steps:
            //1. initialize the filter as if no filter existant for other aggs
            if(this.query['aggs']['all_specimen']['aggs']['material']['terms']){
              this.query['aggs']['all_specimen']['aggs']['material'] = {'aggs': 
                                                                          {'material-filter': {'terms': {'field': 'specimen.material.text', 'size': 100}}}, 
                                                                          "filter" : {"bool": {"must": []}}
                                                                        }
            }
            if(this.query['aggs']['all_specimen']['aggs']['organism']['terms']){
              this.query['aggs']['all_specimen']['aggs']['organism'] = {'aggs': 
                                                                          {'organism-filter': {'terms': {'field': 'specimen.organism.organism.text', 'size': 100}}}, 
                                                                          "filter" : {"bool": {"must": []}}
                                                                        }
            }
            if(this.query['aggs']['all_specimen']['aggs']['organismPart']['terms']){
              this.query['aggs']['all_specimen']['aggs']['organismPart'] = {'aggs': 
                                                                              {'organismPart-filter': {'terms': {'field': 'specimen.cellType.text', 'size': 100}}}, 
                                                                              "filter" : {"bool": {"must": []}}
                                                                            }
            }
            if(this.query['aggs']['all_specimen']['aggs']['breed']['terms']){
              this.query['aggs']['all_specimen']['aggs']['breed'] = {'aggs': 
                                                                        {'breed-filter': {'terms': {'field': 'specimen.organism.breed.text'}}}, 
                                                                        "filter" : {"bool": {"must": []}}
                                                                     }
            }
            if(this.query['aggs']['all_specimen']['aggs']['standard']['terms']){
              this.query['aggs']['all_specimen']['aggs']['standard'] = {'aggs': 
                                                                      {'standard-filter': {'terms': {'field': 'specimen.standardMet', 'size': 50}}}, 
                                                                      "filter" : {"bool": {"must": []}}
                                                                    }
            }
        //2. actually add filter under aggs
            this.query['aggs']['all_specimen']['aggs']['material']['filter']['bool']['must'].push({'terms': {'specimen.organism.sex.text' : sexParams}})
            this.query['aggs']['all_specimen']['aggs']['organism']['filter']['bool']['must'].push({'terms': {'specimen.organism.sex.text' : sexParams}})
            this.query['aggs']['all_specimen']['aggs']['organismPart']['filter']['bool']['must'].push({'terms': {'specimen.organism.sex.text' : sexParams}})
            this.query['aggs']['all_specimen']['aggs']['breed']['filter']['bool']['must'].push({'terms': {'specimen.organism.sex.text' : sexParams}})
            this.query['aggs']['all_specimen']['aggs']['standard']['filter']['bool']['must'].push({'terms': {'specimen.organism.sex.text' : sexParams}})

            //flag which filters are selected
            for (let filter of sexParams){
              this.isSexFiltered[filter] = true
            }
          }

          if (queryParams.material){
            let materialParams = queryParams.material.split("|")
            //add to the filter at the same level as global aggs using terms bool filter
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'material.text' :materialParams}})
            
            //add sex filter to all other aggs in two steps:
            //1. initialize the filter as if no filter existant for other aggs
            if(this.query['aggs']['all_specimen']['aggs']['sex']['terms']){
              this.query['aggs']['all_specimen']['aggs']['sex'] = {'aggs': 
                                                                      {'sex-filter': {'terms': {'field': 'specimen.organism.sex.text'}}}, 
                                                                      "filter" : {"bool": {"must": []}}
                                                                   }
            }
            if(this.query['aggs']['all_specimen']['aggs']['organism']['terms']){
              this.query['aggs']['all_specimen']['aggs']['organism'] = {'aggs': 
                                                                          {'organism-filter': {'terms': {'field': 'specimen.organism.organism.text', 'size': 100}}}, 
                                                                          "filter" : {"bool": {"must": []}}
                                                                        }
            }
            if(this.query['aggs']['all_specimen']['aggs']['organismPart']['terms']){
              this.query['aggs']['all_specimen']['aggs']['organismPart'] = {'aggs': 
//                                                                              {'organismPart-filter': {'terms': {'field': 'specimen.specimenFromOrganism.organismPart.text', 'size': 100}}}, 
                                                                              {'organismPart-filter': {'terms': {'field': 'specimen.cellType.text', 'size': 100}}}, 
                                                                              "filter" : {"bool": {"must": []}}
                                                                            }
            }
            if(this.query['aggs']['all_specimen']['aggs']['breed']['terms']){
              this.query['aggs']['all_specimen']['aggs']['breed'] = {'aggs': 
                                                                        {'breed-filter': {'terms': {'field': 'specimen.organism.breed.text'}}}, 
                                                                        "filter" : {"bool": {"must": []}}
                                                                     }
            }
            if(this.query['aggs']['all_specimen']['aggs']['standard']['terms']){
              this.query['aggs']['all_specimen']['aggs']['standard'] = {'aggs': 
                                                                      {'standard-filter': {'terms': {'field': 'specimen.standardMet', 'size': 50}}}, 
                                                                      "filter" : {"bool": {"must": []}}
                                                                    }
            }
            //2. actually add filter under aggs
            this.query['aggs']['all_specimen']['aggs']['sex']['filter']['bool']['must'].push({'terms': {'specimen.material.text' : materialParams}})
            this.query['aggs']['all_specimen']['aggs']['organism']['filter']['bool']['must'].push({'terms': {'specimen.material.text' : materialParams}})
            this.query['aggs']['all_specimen']['aggs']['organismPart']['filter']['bool']['must'].push({'terms': {'specimen.material.text' : materialParams}})
            this.query['aggs']['all_specimen']['aggs']['breed']['filter']['bool']['must'].push({'terms': {'specimen.material.text' : materialParams}})
            this.query['aggs']['all_specimen']['aggs']['standard']['filter']['bool']['must'].push({'terms': {'specimen.material.text' : materialParams}})

            //flag which filters are selected
            for (let filter of materialParams){
              this.isMaterialFiltered[filter] = true
            }
          }

          if (queryParams.organism){
            let organismParams = queryParams.organism.split("|")
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'organism.organism.text' :organismParams}})

            if(this.query['aggs']['all_specimen']['aggs']['sex']['terms']){
              this.query['aggs']['all_specimen']['aggs']['sex'] = {'aggs': 
                                                                      {'sex-filter': {'terms': {'field': 'specimen.organism.sex.text'}}}, 
                                                                      "filter" : {"bool": {"must": []}}
                                                                   }
            }
            if(this.query['aggs']['all_specimen']['aggs']['material']['terms']){
              this.query['aggs']['all_specimen']['aggs']['material'] = {'aggs': 
                                                                          {'material-filter': {'terms': {'field': 'specimen.material.text', 'size': 100}}}, 
                                                                          "filter" : {"bool": {"must": []}}
                                                                        }
            }
            if(this.query['aggs']['all_specimen']['aggs']['organismPart']['terms']){
              this.query['aggs']['all_specimen']['aggs']['organismPart'] = {'aggs': 
//                                                                              {'organismPart-filter': {'terms': {'field': 'specimen.specimenFromOrganism.organismPart.text', 'size': 100}}}, 
                                                                              {'organismPart-filter': {'terms': {'field': 'specimen.cellType.text', 'size': 100}}}, 
                                                                              "filter" : {"bool": {"must": []}}
                                                                            }
            }
            if(this.query['aggs']['all_specimen']['aggs']['breed']['terms']){
              this.query['aggs']['all_specimen']['aggs']['breed'] = {'aggs': 
                                                                        {'breed-filter': {'terms': {'field': 'specimen.organism.breed.text'}}}, 
                                                                        "filter" : {"bool": {"must": []}}
                                                                     }
            }
            if(this.query['aggs']['all_specimen']['aggs']['standard']['terms']){
              this.query['aggs']['all_specimen']['aggs']['standard'] = {'aggs': 
                                                                      {'standard-filter': {'terms': {'field': 'specimen.standardMet', 'size': 50}}}, 
                                                                      "filter" : {"bool": {"must": []}}
                                                                    }
            }
            this.query['aggs']['all_specimen']['aggs']['sex']['filter']['bool']['must'].push({'terms': {'specimen.organism.organism.text' : organismParams}})
            this.query['aggs']['all_specimen']['aggs']['material']['filter']['bool']['must'].push({'terms': {'specimen.organism.organism.text' : organismParams}})
            this.query['aggs']['all_specimen']['aggs']['organismPart']['filter']['bool']['must'].push({'terms': {'specimen.organism.organism.text' : organismParams}})
            this.query['aggs']['all_specimen']['aggs']['breed']['filter']['bool']['must'].push({'terms': {'specimen.organism.organism.text' : organismParams}})
            this.query['aggs']['all_specimen']['aggs']['standard']['filter']['bool']['must'].push({'terms': {'specimen.organism.organism.text' : organismParams}})
            for (let filter of organismParams){
              this.isOrganismFiltered[filter] = true
            }
          }

          if (queryParams.organismPart){
            let organismPartParams = queryParams.organismPart.split("|")
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'specimen.cellType.text' :organismPartParams}})

            if(this.query['aggs']['all_specimen']['aggs']['sex']['terms']){
              this.query['aggs']['all_specimen']['aggs']['sex'] = {'aggs': 
                                                                      {'sex-filter': {'terms': {'field': 'specimen.organism.sex.text'}}}, 
                                                                      "filter" : {"bool": {"must": []}}
                                                                    }
            }
            if(this.query['aggs']['all_specimen']['aggs']['material']['terms']){
              this.query['aggs']['all_specimen']['aggs']['material'] = {'aggs': 
                                                                          {'material-filter': {'terms': {'field': 'specimen.material.text', 'size': 100}}}, 
                                                                          "filter" : {"bool": {"must": []}}
                                                                        }
            }
            if(this.query['aggs']['all_specimen']['aggs']['organism']['terms']){
              this.query['aggs']['all_specimen']['aggs']['organism'] = {'aggs': 
                                                                          {'organism-filter': {'terms': {'field': 'specimen.organism.organism.text', 'size': 100}}}, 
                                                                          "filter" : {"bool": {"must": []}}
                                                                        }
            }
            if(this.query['aggs']['all_specimen']['aggs']['breed']['terms']){
              this.query['aggs']['all_specimen']['aggs']['breed'] = {'aggs': 
                                                                        {'breed-filter': {'terms': {'field': 'specimen.organism.breed.text'}}}, 
                                                                        "filter" : {"bool": {"must": []}}
                                                                     }
            }
            if(this.query['aggs']['all_specimen']['aggs']['standard']['terms']){
              this.query['aggs']['all_specimen']['aggs']['standard'] = {'aggs': 
                                                                      {'standard-filter': {'terms': {'field': 'specimen.standardMet', 'size': 50}}}, 
                                                                      "filter" : {"bool": {"must": []}}
                                                                    }
            }
            this.query['aggs']['all_specimen']['aggs']['sex']['filter']['bool']['must'].push({'terms': {'specimen.cellType.text' : organismPartParams}})
            this.query['aggs']['all_specimen']['aggs']['material']['filter']['bool']['must'].push({'terms': {'specimen.cellType.text' : organismPartParams}})
            this.query['aggs']['all_specimen']['aggs']['organism']['filter']['bool']['must'].push({'terms': {'specimen.cellType.text' : organismPartParams}})
            this.query['aggs']['all_specimen']['aggs']['breed']['filter']['bool']['must'].push({'terms': {'specimen.cellType.text' : organismPartParams}})
            this.query['aggs']['all_specimen']['aggs']['standard']['filter']['bool']['must'].push({'terms': {'specimen.cellType.text' : organismPartParams}})
            for (let filter of organismPartParams){
              this.isOrganismPartFiltered[filter] = true
            }
          }

          if (queryParams.breed){
            let breedParams = queryParams.breed.split("|")
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'organism.breed.text' :breedParams}})

            if(this.query['aggs']['all_specimen']['aggs']['sex']['terms']){
              this.query['aggs']['all_specimen']['aggs']['sex'] = {'aggs': 
                                                                      {'sex-filter': {'terms': {'field': 'specimen.organism.sex.text'}}}, 
                                                                      "filter" : {"bool": {"must": []}}
                                                                   }
            }
            if(this.query['aggs']['all_specimen']['aggs']['material']['terms']){
              this.query['aggs']['all_specimen']['aggs']['material'] = {'aggs': 
                                                                          {'material-filter': {'terms': {'field': 'specimen.material.text', 'size': 100}}}, 
                                                                          "filter" : {"bool": {"must": []}}
                                                                        }
            }
            if(this.query['aggs']['all_specimen']['aggs']['organism']['terms']){
              this.query['aggs']['all_specimen']['aggs']['organism'] = {'aggs': 
                                                                          {'organism-filter': {'terms': {'field': 'specimen.organism.organism.text', 'size': 100}}}, 
                                                                          "filter" : {"bool": {"must": []}}
                                                                        }
            }
            if(this.query['aggs']['all_specimen']['aggs']['organismPart']['terms']){
              this.query['aggs']['all_specimen']['aggs']['organismPart'] = {'aggs': 
                                                                              {'organismPart-filter': {'terms': {'field': 'specimen.cellType.text', 'size': 100}}}, 
                                                                              "filter" : {"bool": {"must": []}}
                                                                            }
            }
            if(this.query['aggs']['all_specimen']['aggs']['standard']['terms']){
              this.query['aggs']['all_specimen']['aggs']['standard'] = {'aggs': 
                                                                      {'standard-filter': {'terms': {'field': 'specimen.standardMet', 'size': 50}}}, 
                                                                      "filter" : {"bool": {"must": []}}
                                                                    }
            }
            this.query['aggs']['all_specimen']['aggs']['sex']['filter']['bool']['must'].push({'terms': {'specimen.organism.breed.text' : breedParams}})
            this.query['aggs']['all_specimen']['aggs']['material']['filter']['bool']['must'].push({'terms': {'specimen.organism.breed.text' : breedParams}})
            this.query['aggs']['all_specimen']['aggs']['organism']['filter']['bool']['must'].push({'terms': {'specimen.organism.breed.text' : breedParams}})
            this.query['aggs']['all_specimen']['aggs']['organismPart']['filter']['bool']['must'].push({'terms': {'specimen.organism.breed.text' : breedParams}})
            this.query['aggs']['all_specimen']['aggs']['standard']['filter']['bool']['must'].push({'terms': {'specimen.organism.breed.text' : breedParams}})
            for (let filter of breedParams){
              this.isBreedFiltered[filter] = true
            }
          }

          if (queryParams.standard){
            let standardParams = queryParams.standard.split("|")
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'standardMet' :standardParams}})

            if(this.query['aggs']['all_specimen']['aggs']['sex']['terms']){
              this.query['aggs']['all_specimen']['aggs']['sex'] = {'aggs': 
                                                                      {'sex-filter': {'terms': {'field': 'specimen.organism.sex.text'}}}, 
                                                                      "filter" : {"bool": {"must": []}}
                                                                   }
            }
            if(this.query['aggs']['all_specimen']['aggs']['material']['terms']){
              this.query['aggs']['all_specimen']['aggs']['material'] = {'aggs': 
                                                                          {'material-filter': {'terms': {'field': 'specimen.material.text', 'size': 100}}}, 
                                                                          "filter" : {"bool": {"must": []}}
                                                                        }
            }
            if(this.query['aggs']['all_specimen']['aggs']['organism']['terms']){
              this.query['aggs']['all_specimen']['aggs']['organism'] = {'aggs': 
                                                                          {'organism-filter': {'terms': {'field': 'specimen.organism.organism.text', 'size': 100}}}, 
                                                                          "filter" : {"bool": {"must": []}}
                                                                        }
            }
            if(this.query['aggs']['all_specimen']['aggs']['organismPart']['terms']){
              this.query['aggs']['all_specimen']['aggs']['organismPart'] = {'aggs': 
                                                                              {'organismPart-filter': {'terms': {'field': 'specimen.cellType.text', 'size': 100}}}, 
                                                                              "filter" : {"bool": {"must": []}}
                                                                            }
            }
            if(this.query['aggs']['all_specimen']['aggs']['breed']['terms']){
              this.query['aggs']['all_specimen']['aggs']['breed'] = {'aggs': 
                                                                        {'breed-filter': {'terms': {'field': 'specimen.organism.breed.text'}}}, 
                                                                        "filter" : {"bool": {"must": []}}
                                                                     }
            }
            this.query['aggs']['all_specimen']['aggs']['sex']['filter']['bool']['must'].push({'terms': {'specimen.standardMet' : standardParams}})
            this.query['aggs']['all_specimen']['aggs']['material']['filter']['bool']['must'].push({'terms': {'specimen.standardMet' : standardParams}})
            this.query['aggs']['all_specimen']['aggs']['organism']['filter']['bool']['must'].push({'terms': {'specimen.standardMet' : standardParams}})
            this.query['aggs']['all_specimen']['aggs']['organismPart']['filter']['bool']['must'].push({'terms': {'specimen.standardMet' : standardParams}})
            this.query['aggs']['all_specimen']['aggs']['breed']['filter']['bool']['must'].push({'terms': {'specimen.standardMet' : standardParams}})
            for (let filter of standardParams){
              this.isStandardFiltered[filter] = true
            }
          }
        }else{
          delete this.query['query']
        }
        this.getSpecimenList();
      });
  };

  getSpecimenList() {
    this.specimenSource.next(this.apiSpecimenService.getAll(this.query)); // this.apiSpecimenService.getAll(this.query) is an Observable, input of the pipe
  }

  getCellType(specimen: Specimen):string{
    let cellType = "";
    if(specimen['_source']['specimenFromOrganism'] && specimen['_source']['specimenFromOrganism']['organismPart']){
      cellType = specimen['_source']['specimenFromOrganism']['organismPart']['text'];
    }
    if(specimen['_source']['cellSpecimen'] && specimen['_source']['cellSpecimen']['cellType']){
      cellType = specimen['_source']['cellSpecimen']['cellType'][0]['text'];
    }
    if(specimen['_source']['cellCulture'] && specimen['_source']['cellCulture']['cellType']){
      cellType = specimen['_source']['cellCulture']['cellType']['text'];
    }
    if(specimen['_source']['cellLine'] && specimen['_source']['cellLine']['cellType']){
      cellType = specimen['_source']['cellLine']['cellType']['text'];
    }
    if(specimen['_source']['poolOfSpecimens']){
      cellType = 'Not applicable';
    }
    return cellType
  }

  getSort(){
    return this.query['sort'];
  }

  getQuery(){
    return this.query;
  }

  setSort(sort: any) {
    this.query['sort'] = sort;
    this.getSpecimenList();
  }
 
  resetSort(){
    this.query['sort'] = [{biosampleId: "desc"}];
    this.getSpecimenList();
  }

  notDefaultSort(){
    let orders = this.query['sort'];
    if (orders.length>1) return true;
    if (orders[0]["biosampleId"]!="desc") return true;
    return false;
  }

  resetFilter(){
    delete this.query['query'];
    this.initAggRelatedVariables();
    this.getSpecimenList();
    this.router.navigate([], {relativeTo:this.activatedRoute, queryParams: {}})

//    window.alert(this.activatedRoute.url);
  }

  initAggRelatedVariables(){
    this.query['aggs'] = {
                          'all_specimen': {
                            'global' : {}, 
                            'aggs': {
                              'sex': {'terms': {'field': 'specimen.organism.sex.text', 'size': 50}}, 
                              'material': {'terms': {'field': 'specimen.material.text', 'size': 50}}, 
                              'organism': {'terms': {'field': 'specimen.organism.organism.text', 'size': 50}}, 
                              'organismPart': {'terms': {'field': 'specimen.specimenFromOrganism.organismPart.text', 'size': 1000}},
                              'breed': {'terms': {'field': 'specimen.organism.breed.text', 'size': 1000}},
                              'standard': {'terms': {'field': 'specimen.standardMet', 'size': 1000}}
                            }
                          }
                        }
    this.isSexFiltered = {}
    this.isMaterialFiltered = {}
    this.isOrganismFiltered = {}
    this.isOrganismPartFiltered = {}
    this.isBreedFiltered = {}
    this.isStandardFiltered = {}
  }

  ngOnDestroy() {
    if (this.specimenSubscription) {
      this.specimenSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  };

  tableNext() {
    if (this.tableHasMore()) {
      this.specimenOffset += this.pageLimit;
      this.query['from'] = this.specimenOffset
      this.getSpecimenList();
    }
  }
  tablePrevious() {
    if (this.specimenList && this.specimenList.hits) {
      this.specimenOffset = (this.specimenOffset >= this.pageLimit) ? this.specimenOffset - this.pageLimit : 0;
      this.query['from'] = this.specimenOffset
      this.getSpecimenList();
    }
  }
  tableHasMore():boolean {
    if (this.specimenList && this.specimenList.hits.total > this.specimenOffset + this.pageLimit) {
      return true;
    }
    return false;
  }
  //used in html <h3 class="col-md-10 col-md-offset-1 text-primary" *ngIf="hasActiveFilters()">
  //if not set here, the clicked filter won't be displayed as the active filter
  hasActiveFilters():boolean {
    for (var key in this.isOrganismFiltered){
      if (this.isOrganismFiltered[key]){
        return true
      }
    }
    for (var key in this.isSexFiltered){
      if (this.isSexFiltered[key]){
        return true
      }
    }
    for (var key in this.isMaterialFiltered){
      if (this.isMaterialFiltered[key]){
        return true
      }
    }
    for (var key in this.isOrganismPartFiltered){
      if (this.isOrganismPartFiltered[key]){
        return true
      }
    }
    for (var key in this.isBreedFiltered){
      if (this.isBreedFiltered[key]){
        return true
      }
    }
    for (var key in this.isStandardFiltered){
      if (this.isStandardFiltered[key]){
        return true
      }
    }
    return false
  }
};
