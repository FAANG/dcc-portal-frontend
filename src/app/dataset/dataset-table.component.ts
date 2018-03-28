import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { DatasetList } from '../shared/dataset-list';

import { ApiDatasetService }  from '../core/services/api-dataset.service';

let datasetTableStyles: string = `
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
    selector: 'dataset-table',
    templateUrl: './dataset-table.component.html',
    styles: [ datasetTableStyles ],
})
export class DatasetTableComponent implements OnInit, OnDestroy { 

  // public properties
  datasetList: DatasetList
  datasetOffset: number
  isSpeciesFiltered: {[key: string] : boolean} = {}
  isInstrumentFiltered: {[key: string] : boolean} = {}
  isArchiveFiltered: {[key: string] : boolean} = {}
  //bucket size counters
  speciesAggs: {key: string, doc_count: number}[]
  instrumentAggs: {key: string, doc_count: number}[]
  archiveAggs: {key: string, doc_count: number}[]

  // private properties
  private routeSubscription: Subscription = null;
  private datasetSource: Subject<Observable<DatasetList>>;
  private datasetSubscription: Subscription = null;
  private query: {[term: string]: any} = {};
  private pageLimit: number

  private numberOfRecord: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiDatasetService: ApiDatasetService,
    private titleService: Title,
  ){ };

  ngOnInit() {
    this.query['sort'] = [{accession: "asc"}]
    this.titleService.setTitle('FAANG datasets');
    this.datasetSource = new Subject<Observable<DatasetList>>();
    this.datasetSubscription = this.datasetSource
        .switchMap((o: Observable<DatasetList>):Observable<DatasetList> => o) //first Observable is the type of the parameter, second is the expected type of the output. 
        .subscribe((e: DatasetList) => {
          this.datasetList = e;
          this.numberOfRecord = e.hits.total;
          this.speciesAggs = [];
          this.instrumentAggs = [];
          this.archiveAggs = [];

          if (e && e.aggregations && e.aggregations['all_dataset']) {
            let aggs = e.aggregations['all_dataset'];
            //when initialized, i.e. without any filter, the buckets (the terms aggs) are under 'sex'. refer to line 100
            //with any filter, the buckets are under 'sex'.'sex'
            //. in the elasticsearch response in ts is represented by [][]
            this.speciesAggs = aggs['species']['buckets'] ? aggs['species']['buckets']
                      : aggs['species']['species-filter']['buckets'] ? aggs['species']['species-filter']['buckets']
                      : [];
            this.instrumentAggs = aggs['instrument']['buckets'] ? aggs['instrument']['buckets']
                      : aggs['instrument']['instrument-filter']['buckets'] ? aggs['instrument']['instrument-filter']['buckets']
                      : [];
            this.archiveAggs = aggs['archive']['buckets'] ? aggs['archive']['buckets']
                      : aggs['archive']['archive-filter']['buckets'] ? aggs['archive']['archive-filter']['buckets']
                      : [];
          }
        });
    //in the background elasticsearch the term "organism" is used under both types (elasticsearch term): organism and specimen, just use "organism" below as "sex" may get the unwanted.
    //Basically "sex.text" could be referenced as "organism.sex.text", in specimen it will be specimen.organism.sex.text, so no chance to mixed two sex fields 
    this.datasetOffset = 0;
    this.pageLimit = 20;
//    this.getDatasetList();
    this.routeSubscription =
      this.activatedRoute.queryParams.subscribe((queryParams: {archive: string, species: string, instrument: string}) => {
        this.datasetOffset = 0;
        this.query['from'] = this.datasetOffset
        this.query['size'] = this.pageLimit
        this.initAggRelatedVariables();

        if (queryParams.archive || queryParams.species || queryParams.instrument) { //exist any query, add the query
          this.query['query'] = {"filtered" : {"filter" : {"bool": {"must": []}}}}


          if (queryParams.species){
            let speciesParams = queryParams.species.split("|")
            //add to the filter at the same level as global aggs using terms bool filter
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'species.text' : speciesParams}})

            //add species filter to all other aggs in two steps:
            //1. initialize the filter if no filter existant for other aggs
            if(this.query['aggs']['all_dataset']['aggs']['instrument']['terms']){//only true when there is no filter under that aggs
              this.query['aggs']['all_dataset']['aggs']['instrument'] = {'aggs': 
                                                                  {'instrument-filter': {'terms': {'field': 'instrument', 'size': 100}}}, 
                                                                  "filter" : {"bool": {"must": []}}
                                                                }
            }
            if(this.query['aggs']['all_dataset']['aggs']['archive']['terms']){//only true when there is no filter under that aggs
              this.query['aggs']['all_dataset']['aggs']['archive'] = {'aggs': 
                                                                  {'archive-filter': {'terms': {'field': 'archive', 'size': 50}}}, 
                                                                  "filter" : {"bool": {"must": []}}
                                                                }
            }
            //2. actually add filter under aggs
            this.query['aggs']['all_dataset']['aggs']['instrument']['filter']['bool']['must'].push({'terms': {'species.text' : speciesParams}})             
            this.query['aggs']['all_dataset']['aggs']['archive']['filter']['bool']['must'].push({'terms': {'species.text' : speciesParams}})             

            //flag which filters are selected
            for (let filter of speciesParams){
              this.isSpeciesFiltered[filter] = true
            }
          }

          if (queryParams.instrument){
            let instrumentParams = queryParams.instrument.split("|")
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'instrument' : instrumentParams}})
            
            if(this.query['aggs']['all_dataset']['aggs']['species']['terms']){ //only true when there is no filter under that aggs
              this.query['aggs']['all_dataset']['aggs']['species'] = {'aggs': 
                                                                   {'species-filter': {'terms': {'field': 'species.text', 'size': 50}}}, 
                                                                    "filter" : {"bool": {"must": []}}
                                                                  }
            }
            if(this.query['aggs']['all_dataset']['aggs']['archive']['terms']){ //only true when there is no filter under that aggs
              this.query['aggs']['all_dataset']['aggs']['archive'] = {'aggs': 
                                                                   {'archive-filter': {'terms': {'field': 'archive', 'size': 50}}}, 
                                                                    "filter" : {"bool": {"must": []}}
                                                                  }
            }
            
            this.query['aggs']['all_dataset']['aggs']['species']['filter']['bool']['must'].push({'terms': {'run.instrument' : instrumentParams}})             
            this.query['aggs']['all_dataset']['aggs']['archive']['filter']['bool']['must'].push({'terms': {'run.instrument' : instrumentParams}})             

            for (let filter of instrumentParams){
              this.isInstrumentFiltered[filter] = true
            }
          }

          if (queryParams.archive){
            let archiveParams = queryParams.archive.split("|")
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'archive' : archiveParams}})
            if(this.query['aggs']['all_dataset']['aggs']['species']['terms']){ //only true when there is no filter under that aggs
              this.query['aggs']['all_dataset']['aggs']['species'] = {'aggs': 
                                                                   {'species-filter': {'terms': {'field': 'species.text', 'size': 50}}}, 
                                                                    "filter" : {"bool": {"must": []}}
                                                                  }
            }
            if(this.query['aggs']['all_dataset']['aggs']['instrument']['terms']){//only true when there is no filter under that aggs
              this.query['aggs']['all_dataset']['aggs']['instrument'] = {'aggs': 
                                                                  {'instrument-filter': {'terms': {'field': 'instrument', 'size': 100}}}, 
                                                                  "filter" : {"bool": {"must": []}}
                                                                }
            }
            this.query['aggs']['all_dataset']['aggs']['species']['filter']['bool']['must'].push({'terms': {'archive' : archiveParams}})             
            this.query['aggs']['all_dataset']['aggs']['instrument']['filter']['bool']['must'].push({'terms': {'archive' : archiveParams}})             
            for (let filter of archiveParams){
              this.isArchiveFiltered[filter] = true
            }
          }
        }else{
          delete this.query['query']
        }
        this.getDatasetList();
//        console.log("dataset table datasetList onInit");
//        console.log(this.datasetList);
      });
  };

  getSpeciesStr(dataset: any):string{
    let species: any[] = dataset['_source']['species'];    
    var value:string = "";
    for (var i = species.length - 1; i >= 0; i--) {
      value += species[i]['text']+",";
    }
    return value.substring(0,value.length-1);
  }

  convertArrayToStr(data: string[]){
    var value:string = "";
    for (var i = 0; i< data.length; i++) {
      value += data[i]+",";
    }
    return value.substring(0,value.length-1);
  }

  getDatasetList() {
    this.datasetSource.next(this.apiDatasetService.getAll(this.query));
  }

  getQuery(){
    return this.query;
  }

  getCount(){
    return this.numberOfRecord;
  }

  getSort(){
    return this.query['sort'];
  }

  setSort(sort: any) {
    this.query['sort'] = sort;
    this.getDatasetList();
  }
 
  resetSort(){
    this.query['sort'] = [{accession: "asc"}];
    this.getDatasetList()
  }

  notDefaultSort(){
    let orders = this.query['sort'];
    if (orders.length>1) return true;
    if (orders[0]["accession"]!="asc") return true;
    return false;
  }

  resetFilter(){
    delete this.query['query'];
    this.initAggRelatedVariables();
    this.getDatasetList();
    this.router.navigate([], {relativeTo:this.activatedRoute, queryParams: {}})
  }
  
  initAggRelatedVariables(){
    this.query['aggs'] = {
                          'all_dataset': {
                            'global' : {}, 
                              'aggs': {
                                'species': {'terms': {'field': 'species.text', 'size': 50}},
                                'instrument': {'terms': {'field': 'instrument', 'size': 50}},
                                'archive': {'terms': {'field': 'archive', 'size': 50}}
                              }
                            }
                          }
    this.isSpeciesFiltered = {}
    this.isInstrumentFiltered = {}
    this.isArchiveFiltered = {}
  }

  ngOnDestroy() {
    if (this.datasetSubscription) {
      this.datasetSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  };

  tableNext() {
    if (this.tableHasMore()) {
      this.datasetOffset += this.pageLimit;
      this.query['from'] = this.datasetOffset
      this.getDatasetList();
    }
  }
  tablePrevious() {
    if (this.datasetList && this.datasetList.hits) {
      this.datasetOffset = (this.datasetOffset >= this.pageLimit) ? this.datasetOffset - this.pageLimit : 0;
      this.query['from'] = this.datasetOffset
      this.getDatasetList();
    }
  }
  tableHasMore():boolean {
    if (this.datasetList && this.datasetList.hits.total > this.datasetOffset + this.pageLimit) {
      return true;
    }
    return false;
  }
  //used in html <h3 class="col-md-10 col-md-offset-1 text-primary" *ngIf="hasActiveFilters()">
  //if not set here, the clicked filter won't be displayed as the active filter
  hasActiveFilters():boolean {
    for (var key in this.isSpeciesFiltered){
      if (this.isSpeciesFiltered[key]){
        return true
      }
    }
    for (var key in this.isInstrumentFiltered){
      if (this.isInstrumentFiltered[key]){
        return true
      }
    }
    for (var key in this.isArchiveFiltered){
      if (this.isArchiveFiltered[key]){
        return true
      }
    }
    return false
  }
};
