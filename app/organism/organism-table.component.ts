import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from'@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { OrganismList } from '../shared/organism-list';

import { ApiOrganismService }  from '../core/services/api-organism.service';

@Component({
    selector: 'organism-table',
    templateUrl: './organism-table.component.html',
    styles: [`
      .clickable {
        cursor: pointer;
      }
      li.list-group-item.title {
        cursor: default;
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
export class OrganismTableComponent implements OnInit, OnDestroy { 
  // public properties
  organismList: OrganismList
  organismOffset: number
  pageLimit: number

  // private properties
  private routeSubscription: Subscription = null;
  private organismSource: Subject<Observable<OrganismList>>;
  private organismSubscription: Subscription = null;
  private query: {[term: string]: any} = {};

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
        .subscribe((e: OrganismList) => this.organismList = e );
    this.organismOffset = 0;
    this.pageLimit = 10;
    this.getOrganismList();
    this.routeSubscription =
      this.activatedRoute.queryParams.subscribe((queryParams: {sex: string, organism: string}) => {
        this.organismOffset = 0;
        this.query['from'] = this.organismOffset
        this.query['sort'] = [{biosampleId: "desc"}]
        this.query['aggs'] = {'sex': {'terms': {'field': 'sex.text'}}, 'organism': {'terms': {'field': 'organism.organism.text'}}}
        if (queryParams.sex || queryParams.organism) {
          this.query['query'] = {"filtered" : {"filter" : {"bool": {"must": []}}}}
          if (queryParams.sex){
            this.query['query']['filtered']['filter']['bool']['must'].push({'term': {'sex.text' :queryParams.sex}})
          }
          if (queryParams.organism){
            this.query['query']['filtered']['filter']['bool']['must'].push({'term': {'organism.text' :queryParams.organism}}) 
          }
        }
        this.getOrganismList();
      });
  };

  getOrganismList() {
    this.organismSource.next(this.apiOrganismService.getAll(this.query));
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
};
