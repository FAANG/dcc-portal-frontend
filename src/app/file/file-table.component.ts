import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { FileList } from '../shared/file-list';

import { ApiFileService }  from '../core/services/api-file.service';

let fileTableStyles: string = `
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
    selector: 'file-table',
    templateUrl: './file-table.component.html',
    styles: [ fileTableStyles ],
})
export class FileTableComponent implements OnInit, OnDestroy { 

  // public properties
  fileList: FileList
  fileOffset: number
  isStudyFiltered: {[key: string] : boolean} = {}
  isSpeciesFiltered: {[key: string] : boolean} = {}
  isAssayFiltered: {[key: string] : boolean} = {}
  isInstrumentFiltered: {[key: string] : boolean} = {}
  //bucket size counters
  studyAggs: {key: string, doc_count: number}[]
  speciesAggs: {key: string, doc_count: number}[]
  assayAggs: {key: string, doc_count: number}[]
  instrumentAggs: {key: string, doc_count: number}[]

  // private properties
  private routeSubscription: Subscription = null;
  private fileSource: Subject<Observable<FileList>>;
  private fileSubscription: Subscription = null;
  private query: {[term: string]: any} = {};
  private pageLimit: number
  private numberOfRecord: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiFileService: ApiFileService,
    private titleService: Title,
  ){ };

  ngOnInit() {
    this.query['sort'] = [{name: "asc"}]
    this.titleService.setTitle('FAANG files');
    this.fileSource = new Subject<Observable<FileList>>();
    this.fileSubscription = this.fileSource
        .switchMap((o: Observable<FileList>):Observable<FileList> => o) //first Observable is the type of the parameter, second is the expected type of the output. 
        .subscribe((e: FileList) => {
          this.fileList = e;
          this.numberOfRecord = e.hits.total;
          this.studyAggs = [];
          this.speciesAggs = [];
          this.assayAggs = [];
          this.instrumentAggs = [];

          if (e && e.aggregations && e.aggregations['all_file']) {
            let aggs = e.aggregations['all_file'];
            //when initialized, i.e. without any filter, the buckets (the terms aggs) are under 'sex'. refer to line 100
            //with any filter, the buckets are under 'sex'.'sex'
            //. in the elasticsearch response in ts is represented by [][]
            this.studyAggs = aggs['study']['buckets'] ? aggs['study']['buckets']
                      : aggs['study']['study-filter']['buckets'] ? aggs['study']['study-filter']['buckets']
                      : [];
            this.speciesAggs = aggs['species']['buckets'] ? aggs['species']['buckets']
                      : aggs['species']['species-filter']['buckets'] ? aggs['species']['species-filter']['buckets']
                      : [];
            this.assayAggs = aggs['assay']['buckets'] ? aggs['assay']['buckets']
                      : aggs['assay']['assay-filter']['buckets'] ? aggs['assay']['assay-filter']['buckets']
                      : [];
            this.instrumentAggs = aggs['instrument']['buckets'] ? aggs['instrument']['buckets']
                      : aggs['instrument']['instrument-filter']['buckets'] ? aggs['instrument']['instrument-filter']['buckets']
                      : [];
          }
        });
    //in the background elasticsearch the term "organism" is used under both types (elasticsearch term): organism and specimen, just use "organism" below as "sex" may get the unwanted.
    //Basically "sex.text" could be referenced as "organism.sex.text", in specimen it will be specimen.organism.sex.text, so no chance to mixed two sex fields 
    this.fileOffset = 0;
    this.pageLimit = 20;
    this.getFileList();
    this.routeSubscription =
      this.activatedRoute.queryParams.subscribe((queryParams: {study: string, species: string, assay: string, instrument: string}) => {
        this.fileOffset = 0;
        this.query['from'] = this.fileOffset
        this.query['size'] = this.pageLimit
        this.initAggRelatedVariables();

        if (queryParams.study || queryParams.species || queryParams.assay || queryParams.instrument) { //exist any query, add the query
          this.query['query'] = {"filtered" : {"filter" : {"bool": {"must": []}}}}

          if (queryParams.study){          
            let studyParams = queryParams.study.split("|")
            //add to the filter at the same level as global aggs using terms bool filter
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'study.accession' : studyParams}})
            
            //add study filter to all other aggs in two steps:
            //1. initialize the filter if no filter existant for other aggs
            if(this.query['aggs']['all_file']['aggs']['species']['terms']){ //only true when there is no filter under that aggs
              this.query['aggs']['all_file']['aggs']['species'] = {'aggs': 
                                                                   {'species-filter': {'terms': {'field': 'species.text', 'size': 50}}}, 
                                                                    "filter" : {"bool": {"must": []}}
                                                                  }
            }
            if(this.query['aggs']['all_file']['aggs']['assay']['terms']){
              this.query['aggs']['all_file']['aggs']['assay'] = {'aggs': 
                                                                  {'assay-filter': {'terms': {'field': 'experiment.assayType', 'size': 50}}}, 
                                                                  "filter" : {"bool": {"must": []}}
                                                                }
            }
            if(this.query['aggs']['all_file']['aggs']['instrument']['terms']){
              this.query['aggs']['all_file']['aggs']['instrument'] = {'aggs': 
                                                                  {'instrument-filter': {'terms': {'field': 'run.instrument', 'size': 100}}}, 
                                                                  "filter" : {"bool": {"must": []}}
                                                                }
            }
            //2. actually add filter under aggs
            this.query['aggs']['all_file']['aggs']['species']['filter']['bool']['must'].push({'terms': {'study.accession' : studyParams}})
            this.query['aggs']['all_file']['aggs']['assay']['filter']['bool']['must'].push({'terms': {'study.accession' : studyParams}})
            this.query['aggs']['all_file']['aggs']['instrument']['filter']['bool']['must'].push({'terms': {'study.accession' : studyParams}})
            
            //flag which filters are selected
            for (let filter of studyParams){
              this.isStudyFiltered[filter] = true
            }
          }


          if (queryParams.species){
            let speciesParams = queryParams.species.split("|")
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'species.text' : speciesParams}})
            if(this.query['aggs']['all_file']['aggs']['study']['terms']){
              //delete this.query['aggs']['all_organism']['aggs']['study']
              this.query['aggs']['all_file']['aggs']['study'] = {'aggs': 
                                                                  {'study-filter': {'terms': {'field': 'study.accession', 'size': 1000}}}, 
                                                                  "filter" : {"bool": {"must": []}}
                                                                }
            }
            if(this.query['aggs']['all_file']['aggs']['assay']['terms']){
              this.query['aggs']['all_file']['aggs']['assay'] = {'aggs': 
                                                                  {'assay-filter': {'terms': {'field': 'experiment.assayType', 'size': 50}}}, 
                                                                  "filter" : {"bool": {"must": []}}
                                                                }
            }
            if(this.query['aggs']['all_file']['aggs']['instrument']['terms']){
              this.query['aggs']['all_file']['aggs']['instrument'] = {'aggs': 
                                                                  {'instrument-filter': {'terms': {'field': 'run.instrument', 'size': 100}}}, 
                                                                  "filter" : {"bool": {"must": []}}
                                                                }
            }
            this.query['aggs']['all_file']['aggs']['study']['filter']['bool']['must'].push({'terms': {'species.text' : speciesParams}})             
            this.query['aggs']['all_file']['aggs']['assay']['filter']['bool']['must'].push({'terms': {'species.text' : speciesParams}})             
            this.query['aggs']['all_file']['aggs']['instrument']['filter']['bool']['must'].push({'terms': {'species.text' : speciesParams}})             
            for (let filter of speciesParams){
              this.isSpeciesFiltered[filter] = true
            }
          }

          if (queryParams.assay){
            let assayParams = queryParams.assay.split("|")
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'experiment.assayType' : assayParams}})
            if(this.query['aggs']['all_file']['aggs']['study']['terms']){
              //delete this.query['aggs']['all_organism']['aggs']['study']
              this.query['aggs']['all_file']['aggs']['study'] = {'aggs': 
                                                                  {'study-filter': {'terms': {'field': 'study.accession', 'size': 1000}}}, 
                                                                  "filter" : {"bool": {"must": []}}
                                                                }
            }
            if(this.query['aggs']['all_file']['aggs']['species']['terms']){ //only true when there is no filter under that aggs
              this.query['aggs']['all_file']['aggs']['species'] = {'aggs': 
                                                                   {'species-filter': {'terms': {'field': 'species.text', 'size': 50}}}, 
                                                                    "filter" : {"bool": {"must": []}}
                                                                  }
            }
            if(this.query['aggs']['all_file']['aggs']['instrument']['terms']){
              this.query['aggs']['all_file']['aggs']['instrument'] = {'aggs': 
                                                                  {'instrument-filter': {'terms': {'field': 'run.instrument', 'size': 100}}}, 
                                                                  "filter" : {"bool": {"must": []}}
                                                                }
            }
            this.query['aggs']['all_file']['aggs']['study']['filter']['bool']['must'].push({'terms': {'experiment.assayType' : assayParams}})             
            this.query['aggs']['all_file']['aggs']['species']['filter']['bool']['must'].push({'terms': {'experiment.assayType' : assayParams}})             
            this.query['aggs']['all_file']['aggs']['instrument']['filter']['bool']['must'].push({'terms': {'experiment.assayType' : assayParams}})             
            for (let filter of assayParams){
              this.isAssayFiltered[filter] = true
            }
          }

          if (queryParams.instrument){
            let instrumentParams = queryParams.instrument.split("|")
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'run.instrument' : instrumentParams}})
            if(this.query['aggs']['all_file']['aggs']['study']['terms']){
              //delete this.query['aggs']['all_organism']['aggs']['study']
              this.query['aggs']['all_file']['aggs']['study'] = {'aggs': 
                                                                  {'study-filter': {'terms': {'field': 'study.accession', 'size': 1000}}}, 
                                                                  "filter" : {"bool": {"must": []}}
                                                                }
            }
            if(this.query['aggs']['all_file']['aggs']['species']['terms']){ //only true when there is no filter under that aggs
              this.query['aggs']['all_file']['aggs']['species'] = {'aggs': 
                                                                   {'species-filter': {'terms': {'field': 'species.text', 'size': 50}}}, 
                                                                    "filter" : {"bool": {"must": []}}
                                                                  }
            }
            if(this.query['aggs']['all_file']['aggs']['assay']['terms']){
              this.query['aggs']['all_file']['aggs']['assay'] = {'aggs': 
                                                                  {'assay-filter': {'terms': {'field': 'experiment.assayType', 'size': 50}}}, 
                                                                  "filter" : {"bool": {"must": []}}
                                                                }
            }
            this.query['aggs']['all_file']['aggs']['study']['filter']['bool']['must'].push({'terms': {'run.instrument' : instrumentParams}})             
            this.query['aggs']['all_file']['aggs']['species']['filter']['bool']['must'].push({'terms': {'run.instrument' : instrumentParams}})             
            this.query['aggs']['all_file']['aggs']['assay']['filter']['bool']['must'].push({'terms': {'run.instrument' : instrumentParams}})             
            for (let filter of instrumentParams){
              this.isInstrumentFiltered[filter] = true
            }
          }
        }else{
          delete this.query['query']
        }
        this.getFileList();
      });
  };

  getFileList() {
    this.fileSource.next(this.apiFileService.getAll(this.query));
  }

  getSort(){
    return this.query['sort'];
  }

  getQuery(){
    return this.query;
  }

  getCount(){
    return this.numberOfRecord;
  }

  setSort(sort: any) {
    this.query['sort'] = sort;
    this.getFileList();
  }
 
  resetSort(){
    this.query['sort'] = [{name: "asc"}];
    this.getFileList()
  }

  notDefaultSort(){
    let orders = this.query['sort'];
    if (orders.length>1) return true;
    if (orders[0]["name"]!="asc") return true;
    return false;
  }

  resetFilter(){
    delete this.query['query'];
    this.initAggRelatedVariables();
    this.getFileList();
    this.router.navigate([], {relativeTo:this.activatedRoute, queryParams: {}})
  }
  
  initAggRelatedVariables(){
    this.query['aggs'] = {
                          'all_file': {
                            'global' : {}, 
                              'aggs': {
                                'study': {'terms': {'field': 'study.accession', 'size': 1000}}, 
                                'species': {'terms': {'field': 'species.text', 'size': 50}},
                                'assay': {'terms': {'field': 'experiment.assayType', 'size': 50}},
                                'instrument': {'terms': {'field': 'run.instrument', 'size': 50}}
                              }
                            }
                          }
    this.isStudyFiltered = {}
    this.isSpeciesFiltered = {}
    this.isAssayFiltered = {}
    this.isInstrumentFiltered = {}
  }

  ngOnDestroy() {
    if (this.fileSubscription) {
      this.fileSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  };

  tableNext() {
    if (this.tableHasMore()) {
      this.fileOffset += this.pageLimit;
      this.query['from'] = this.fileOffset
      this.getFileList();
    }
  }
  tablePrevious() {
    if (this.fileList && this.fileList.hits) {
      this.fileOffset = (this.fileOffset >= this.pageLimit) ? this.fileOffset - this.pageLimit : 0;
      this.query['from'] = this.fileOffset
      this.getFileList();
    }
  }
  tableHasMore():boolean {
    if (this.fileList && this.fileList.hits.total > this.fileOffset + this.pageLimit) {
      return true;
    }
    return false;
  }
  //used in html <h3 class="col-md-10 col-md-offset-1 text-primary" *ngIf="hasActiveFilters()">
  //if not set here, the clicked filter won't be displayed as the active filter
  hasActiveFilters():boolean {
    for (var key in this.isStudyFiltered){
      if (this.isStudyFiltered[key]){
        return true
      }
    }
    for (var key in this.isSpeciesFiltered){
      if (this.isSpeciesFiltered[key]){
        return true
      }
    }
    for (var key in this.isAssayFiltered){
      if (this.isAssayFiltered[key]){
        return true
      }
    }
    for (var key in this.isInstrumentFiltered){
      if (this.isInstrumentFiltered[key]){
        return true
      }
    }
    return false
  }
};
