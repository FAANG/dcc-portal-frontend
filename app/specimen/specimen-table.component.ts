import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { SpecimenList } from '../shared/specimen-list';
import { Specimen } from '../shared/specimen';

import { ApiSpecimenService }  from '../core/services/api-specimen.service';

@Component({
    selector: 'specimen-table',
    templateUrl: './specimen-table.component.html',
    styles: [`
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
    `],
})
export class SpecimenTableComponent implements OnInit, OnDestroy { 
  // public properties
  specimenList: SpecimenList
  specimenOffset: number
  isSexFiltered: {[key: string] : boolean} = {}
  isOrganismFiltered: {[key: string] : boolean} = {}
  isOrganismPartFiltered: {[key: string] : boolean} = {}

  sexAggs: {key: string, doc_count: number}[]
  organismAggs: {key: string, doc_count: number}[]
  organismPartAggs: {key: string, doc_count: number}[]

  // private properties
  private routeSubscription: Subscription = null;
  private specimenSource: Subject<Observable<SpecimenList>>;
  private specimenSubscription: Subscription = null;
  private query: {[term: string]: any} = {};
  private pageLimit: number

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiSpecimenService: ApiSpecimenService,
    private titleService: Title,
  ){ };

  ngOnInit() {
    this.titleService.setTitle('FAANG specimens');
    this.specimenSource = new Subject<Observable<SpecimenList>>();
    this.specimenSubscription = this.specimenSource
        .switchMap((o: Observable<SpecimenList>):Observable<SpecimenList> => o)
        .subscribe((e: SpecimenList) => {
          this.specimenList = e;
          this.organismAggs = [];
          this.sexAggs = [];

          if (e && e.aggregations && e.aggregations['all_specimen']) {
            let aggs = e.aggregations['all_specimen'];
            this.sexAggs = aggs['sex']['buckets'] ? aggs['sex']['buckets']
                      : aggs['sex']['sex']['buckets'] ? aggs['sex']['sex']['buckets']
                      : [];
            this.organismAggs = aggs['organism']['buckets'] ? aggs['organism']['buckets']
                      : aggs['organism']['organism']['buckets'] ? aggs['organism']['organism']['buckets']
                      : [];
            this.organismPartAggs = aggs['organismPart']['buckets'] ? aggs['organismPart']['buckets']
                      : aggs['organismPart']['organismPart']['buckets'] ? aggs['organismPart']['organismPart']['buckets']
                      : [];
          }
        });
    
    this.specimenOffset = 0;
    this.pageLimit = 20;
    this.getSpecimenList();
    this.routeSubscription =
      this.activatedRoute.queryParams.subscribe((queryParams: {sex: string, organism: string, organismPart: string}) => {
        this.specimenOffset = 0;
        this.query['from'] = this.specimenOffset
        this.query['size'] = this.pageLimit
        this.query['sort'] = [{biosampleId: "desc"}]
        this.query['aggs'] = {'all_specimen': {'global' : {}, 'aggs': {'sex': {'terms': {'field': 'specimen.organism.sex.text', 'size': 50}}, 'organism': {'terms': {'field': 'specimen.organism.organism.text', 'size': 50}}, 'organismPart': {'terms': {'field': 'specimen.specimenFromOrganism.organismPart.text', 'size': 1000}}}}}
        this.isSexFiltered = {}
        this.isOrganismFiltered = {}
        if (queryParams.sex || queryParams.organism || queryParams.organismPart) {
          this.query['query'] = {"filtered" : {"filter" : {"bool": {"must": []}}}}
          if (queryParams.sex){
            let sexParams = queryParams.sex.split("|")
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'organism.sex.text' :sexParams}})
            if(this.query['aggs']['all_specimen']['aggs']['organism']['terms']){
              this.query['aggs']['all_specimen']['aggs']['organism'] = {'aggs': {'organism': {'terms': {'field': 'specimen.organism.organism.text', 'size': 100}}}, "filter" : {"bool": {"must": []}}}
            }
            if(this.query['aggs']['all_specimen']['aggs']['organismPart']['terms']){
              this.query['aggs']['all_specimen']['aggs']['organismPart'] = {'aggs': {'organismPart': {'terms': {'field': 'specimen.specimenFromOrganism.organismPart.text', 'size': 100}}}, "filter" : {"bool": {"must": []}}}
            }
            this.query['aggs']['all_specimen']['aggs']['organism']['filter']['bool']['must'].push({'terms': {'specimen.organism.sex.text' : sexParams}})
            this.query['aggs']['all_specimen']['aggs']['organismPart']['filter']['bool']['must'].push({'terms': {'specimen.organism.sex.text' : sexParams}})
            for (let filter of sexParams){
              this.isSexFiltered[filter] = true
            }
          }
          if (queryParams.organism){
            let organismParams = queryParams.organism.split("|")
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'organism.organism.text' :organismParams}})
            if(this.query['aggs']['all_specimen']['aggs']['sex']['terms']){
              this.query['aggs']['all_specimen']['aggs']['sex'] = {'aggs': {'sex': {'terms': {'field': 'specimen.organism.sex.text'}}}, "filter" : {"bool": {"must": []}}}
            }
            if(this.query['aggs']['all_specimen']['aggs']['organismPart']['terms']){
              this.query['aggs']['all_specimen']['aggs']['organismPart'] = {'aggs': {'organismPart': {'terms': {'field': 'specimen.specimenFromOrganism.organismPart.text', 'size': 100}}}, "filter" : {"bool": {"must": []}}}
            }
            this.query['aggs']['all_specimen']['aggs']['sex']['filter']['bool']['must'].push({'terms': {'specimen.organism.organism.text' : organismParams}})
            this.query['aggs']['all_specimen']['aggs']['organismPart']['filter']['bool']['must'].push({'terms': {'specimen.organism.organism.text' : organismParams}})
            for (let filter of organismParams){
              this.isOrganismFiltered[filter] = true
            }
          }
          if (queryParams.organismPart){
            let organismPartParams = queryParams.organismPart.split("|")
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'specimenFromOrganism.organismPart.text' :organismPartParams}})
            if(this.query['aggs']['all_specimen']['aggs']['sex']['terms']){
              this.query['aggs']['all_specimen']['aggs']['sex'] = {'aggs': {'sex': {'terms': {'field': 'specimen.organism.sex.text'}}}, "filter" : {"bool": {"must": []}}}
            }
            if(this.query['aggs']['all_specimen']['aggs']['organism']['terms']){
              this.query['aggs']['all_specimen']['aggs']['organism'] = {'aggs': {'organism': {'terms': {'field': 'specimen.organism.organism.text', 'size': 100}}}, "filter" : {"bool": {"must": []}}}
            }
            this.query['aggs']['all_specimen']['aggs']['sex']['filter']['bool']['must'].push({'terms': {'specimen.specimenFromOrganism.organismPart.text' : organismPartParams}})
            this.query['aggs']['all_specimen']['aggs']['organism']['filter']['bool']['must'].push({'terms': {'specimen.specimenFromOrganism.organismPart.text' : organismPartParams}})
            for (let filter of organismPartParams){
              this.isOrganismPartFiltered[filter] = true
            }
          }
        }else{
          delete this.query['query']
        }
        this.getSpecimenList();
      });
  };

  getSpecimenList() {
    this.specimenSource.next(this.apiSpecimenService.getAll(this.query));
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
      cellType = specimen['_source']['cellLine']['cellType'][0]['text'];
    }
    return cellType
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
};
