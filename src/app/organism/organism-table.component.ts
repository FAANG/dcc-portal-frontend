import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { OrganismList } from '../shared/organism-list';

import { ApiOrganismService }  from '../core/services/api-organism.service';

let organismTableStyles: string = `
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
    selector: 'organism-table',
    templateUrl: './organism-table.component.html',
    styles: [ organismTableStyles ],
})
export class OrganismTableComponent implements OnInit, OnDestroy { 

  // public properties
  organismList: OrganismList
  organismOffset: number
  isSexFiltered: {[key: string] : boolean} = {}
  isOrganismFiltered: {[key: string] : boolean} = {}
  isBreedFiltered: {[key: string] : boolean} = {}
  //bucket size counters
  sexAggs: {key: string, doc_count: number}[]
  organismAggs: {key: string, doc_count: number}[]
  breedAggs: {key: string, doc_count: number}[]

  // private properties
  private routeSubscription: Subscription = null;
  private organismSource: Subject<Observable<OrganismList>>;
  private organismSubscription: Subscription = null;
  private query: {[term: string]: any} = {};
  private pageLimit: number

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiOrganismService: ApiOrganismService,
    private titleService: Title,
  ){ };

  ngOnInit() {
    this.titleService.setTitle('FAANG organisms');
    this.organismSource = new Subject<Observable<OrganismList>>();
    this.organismSubscription = this.organismSource
        .switchMap((o: Observable<OrganismList>):Observable<OrganismList> => o)
        .subscribe((e: OrganismList) => {
          this.organismList = e;
          this.sexAggs = [];
          this.organismAggs = [];
          this.breedAggs = [];

          if (e && e.aggregations && e.aggregations['all_organism']) {
            let aggs = e.aggregations['all_organism'];
            //when initialized, i.e. without any filter, the buckets (the terms aggs) are under 'sex'. refer to line 100
            //with any filter, the buckets are under 'sex'.'sex'
            //. in the elasticsearch response in ts is represented by [][]
            this.sexAggs = aggs['sex']['buckets'] ? aggs['sex']['buckets']
                      : aggs['sex']['sex-filter']['buckets'] ? aggs['sex']['sex-filter']['buckets']
                      : [];
            this.organismAggs = aggs['organism']['buckets'] ? aggs['organism']['buckets']
                      : aggs['organism']['organism-filter']['buckets'] ? aggs['organism']['organism-filter']['buckets']
                      : [];
            this.breedAggs = aggs['breed']['buckets'] ? aggs['breed']['buckets']
                      : aggs['breed']['breed-filter']['buckets'] ? aggs['breed']['breed-filter']['buckets']
                      : [];
          }
        });
    //in the background elasticsearch the term "organism" is used under both types (elasticsearch term): organism and specimen, just use "organism" below as "sex" may get the unwanted.
    //Basically "sex.text" could be referenced as "organism.sex.text", in specimen it will be specimen.organism.sex.text, so no chance to mixed two sex fields 
    this.organismOffset = 0;
    this.pageLimit = 20;
    this.getOrganismList();
    this.routeSubscription =
      this.activatedRoute.queryParams.subscribe((queryParams: {sex: string, organism: string, breed: string}) => {
        this.organismOffset = 0;
        this.query['from'] = this.organismOffset
        this.query['size'] = this.pageLimit
        this.query['sort'] = []
        this.query['aggs'] = {
                                'all_organism': {
                                  'global' : {}, 
                                  'aggs': {
                                    'sex': {'terms': {'field': 'sex.text', 'size': 50}}, 
                                    'organism': {'terms': {'field': 'organism.organism.text', 'size': 50}},
                                    'breed': {'terms': {'field': 'breed.text', 'size': 50}}
                                  }
                                }
                              }
        this.isSexFiltered = {}
        this.isOrganismFiltered = {}
        this.isBreedFiltered = {}
        if (queryParams.sex || queryParams.organism || queryParams.breed) { //exist any query, add the query
          this.query['query'] = {"filtered" : {"filter" : {"bool": {"must": []}}}}

          if (queryParams.sex){          
            let sexParams = queryParams.sex.split("|")
            //add to the filter at the same level as global aggs using terms bool filter
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'sex.text' : sexParams}})
            
            //add sex filter to all other aggs in two steps:
            //1. initialize the filter if no filter existant for other aggs
            if(this.query['aggs']['all_organism']['aggs']['organism']['terms']){ //only true when there is no filter under that aggs
              this.query['aggs']['all_organism']['aggs']['organism'] = {'aggs': 
                                                                          {'organism-filter': {'terms': {'field': 'organism.organism.text', 'size': 50}}}, 
                                                                          "filter" : {"bool": {"must": []}}
                                                                        }
            }
            if(this.query['aggs']['all_organism']['aggs']['breed']['terms']){
              this.query['aggs']['all_organism']['aggs']['breed'] = {'aggs': 
                                                                      {'breed-filter': {'terms': {'field': 'breed.text', 'size': 50}}}, 
                                                                      "filter" : {"bool": {"must": []}}
                                                                    }
            }
            //2. actually add filter under aggs
            this.query['aggs']['all_organism']['aggs']['organism']['filter']['bool']['must'].push({'terms': {'sex.text' : sexParams}})
            this.query['aggs']['all_organism']['aggs']['breed']['filter']['bool']['must'].push({'terms': {'sex.text' : sexParams}})
            
            //flag which filters are selected
            for (let filter of sexParams){
              this.isSexFiltered[filter] = true
            }
          }


          if (queryParams.organism){
            let organismParams = queryParams.organism.split("|")
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'organism.text' : organismParams}})
            if(this.query['aggs']['all_organism']['aggs']['sex']['terms']){
              //delete this.query['aggs']['all_organism']['aggs']['sex']
              this.query['aggs']['all_organism']['aggs']['sex'] = {'aggs': 
                                                                    {'sex-filter': {'terms': {'field': 'sex.text', 'size': 50}}}, 
                                                                    "filter" : {"bool": {"must": []}}
                                                                  }
            }
            if(this.query['aggs']['all_organism']['aggs']['breed']['terms']){
              this.query['aggs']['all_organism']['aggs']['breed'] = {'aggs': 
                                                                      {'breed-filter': {'terms': {'field': 'breed.text', 'size': 50}}}, 
                                                                      "filter" : {"bool": {"must": []}}
                                                                    }
            }
            this.query['aggs']['all_organism']['aggs']['sex']['filter']['bool']['must'].push({'terms': {'organism.organism.text' : organismParams}})             
            this.query['aggs']['all_organism']['aggs']['breed']['filter']['bool']['must'].push({'terms': {'organism.organism.text' : organismParams}})
            for (let filter of organismParams){
              this.isOrganismFiltered[filter] = true
            }
          }

          if (queryParams.breed){
            let breedParams = queryParams.breed.split("|")
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'breed.text' : breedParams}})
            if(this.query['aggs']['all_organism']['aggs']['sex']['terms']){
              //delete this.query['aggs']['all_organism']['aggs']['sex']
              this.query['aggs']['all_organism']['aggs']['sex'] = {'aggs': 
                                                                      {'sex-filter': {'terms': {'field': 'sex.text', 'size': 50}}}, 
                                                                      "filter" : {"bool": {"must": []}}
                                                                  }
            }
            if(this.query['aggs']['all_organism']['aggs']['organism']['terms']){
              this.query['aggs']['all_organism']['aggs']['organism'] = {'aggs': 
                                                                          {'organism-filter': {'terms': {'field': 'organism.organism.text', 'size': 50}}}, 
                                                                          "filter" : {"bool": {"must": []}}
                                                                        }
            }
            this.query['aggs']['all_organism']['aggs']['sex']['filter']['bool']['must'].push({'terms': {'breed.text' : breedParams}})             
            this.query['aggs']['all_organism']['aggs']['organism']['filter']['bool']['must'].push({'terms': {'breed.text' : breedParams}})
            for (let filter of breedParams){
              this.isBreedFiltered[filter] = true
            }
          }
        }else{
          delete this.query['query']
        }
        this.getOrganismList();
      });
  };

  getOrganismList() {
    this.organismSource.next(this.apiOrganismService.getAll(this.query));
  }

  setSort(sort: any) {
    this.query['sort'] = sort;
    this.getOrganismList();
  }
 
  ngOnDestroy() {
    if (this.organismSubscription) {
      this.organismSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  };

  tableNext() {
    if (this.tableHasMore()) {
      this.organismOffset += this.pageLimit;
      this.query['from'] = this.organismOffset
      this.getOrganismList();
    }
  }
  tablePrevious() {
    if (this.organismList && this.organismList.hits) {
      this.organismOffset = (this.organismOffset >= this.pageLimit) ? this.organismOffset - this.pageLimit : 0;
      this.query['from'] = this.organismOffset
      this.getOrganismList();
    }
  }
  tableHasMore():boolean {
    if (this.organismList && this.organismList.hits.total > this.organismOffset + this.pageLimit) {
      return true;
    }
    return false;
  }
  //used in html <h3 class="col-md-10 col-md-offset-1 text-primary" *ngIf="hasActiveFilters()">
  //if not set here, the clicked filter won't be displayed as the active filter
  hasActiveFilters():boolean {
    for (var key in this.isSexFiltered){
      if (this.isSexFiltered[key]){
        return true
      }
    }
    for (var key in this.isOrganismFiltered){
      if (this.isOrganismFiltered[key]){
        return true
      }
    }
    for (var key in this.isBreedFiltered){
      if (this.isBreedFiltered[key]){
        return true
      }
    }
    return false
  }
};
