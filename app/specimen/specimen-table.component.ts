import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { SpecimenList } from '../shared/specimen-list';

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

  sexAggs: {key: string, doc_count: number}[]
  organismAggs: {key: string, doc_count: number}[]

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
          }
        });
    this.specimenOffset = 0;
    this.pageLimit = 15;
    this.getSpecimenList();
    this.routeSubscription =
      this.activatedRoute.queryParams.subscribe((queryParams: {sex: string, organism: string}) => {
        this.specimenOffset = 0;
        this.query['from'] = this.specimenOffset
        this.query['size'] = this.pageLimit
        this.query['sort'] = [{biosampleId: "desc"}]
        this.query['aggs'] = {'all_specimen': {'global' : {}, 'aggs': {'sex': {'terms': {'field': 'specimen.organism.sex.text'}}, 'organism': {'terms': {'field': 'specimen.organism.organism.text'}}}}}
        this.isSexFiltered = {}
        this.isOrganismFiltered = {}
        if (queryParams.sex || queryParams.organism) {
          this.query['query'] = {"filtered" : {"filter" : {"bool": {"must": []}}}}
          if (queryParams.sex){
            let sexParams = queryParams.sex.split("|")
            this.query['query']['filtered']['filter']['bool']['must'].push({'terms': {'organism.sex.text' :sexParams}})
            if(this.query['aggs']['all_specimen']['aggs']['organism']['terms']){
              this.query['aggs']['all_specimen']['aggs']['organism'] = {'aggs': {'organism': {'terms': {'field': 'specimen.organism.organism.text'}}}, "filter" : {"bool": {"must": []}}}
            }
            this.query['aggs']['all_specimen']['aggs']['organism']['filter']['bool']['must'].push({'terms': {'specimen.organism.sex.text' : sexParams}})
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
            this.query['aggs']['all_specimen']['aggs']['sex']['filter']['bool']['must'].push({'terms': {'specimen.organism.organism.text' : organismParams}})
            for (let filter of organismParams){
              this.isOrganismFiltered[filter] = true
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
