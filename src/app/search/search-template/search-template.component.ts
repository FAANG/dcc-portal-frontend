import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from '../../services/search.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs/internal/Subscription';
import {convertArrayToStr} from '../../shared/common_functions';

@Component({
  selector: 'app-search-template',
  templateUrl: './search-template.component.html',
  styleUrls: ['./search-template.component.css']
})
export class SearchTemplateComponent implements OnInit, OnDestroy {
  @Input() entity: string;
  hits;
  display = false;
  clicked: boolean;
  clickedSubscription: Subscription;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.clickedSubscription = this.searchService.clicked.subscribe(data => {
      this.clicked = data;
    });
    this.searchService.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(text => this.searchService.search(this.entity, text, this.clicked))
    ).subscribe(
      data => {
        this.hits = data['hits'];
      }
    );
  }

  toggleDisplay() {
    this.display = !this.display;
  }

  getCellType(hit: any) {
    let cellType = '';
    if (hit['_source']['specimenFromOrganism'] && hit['_source']['specimenFromOrganism']['organismPart']) {
      cellType = hit['_source']['specimenFromOrganism']['organismPart']['text'];
    }

    if (hit['_source']['cellSpecimen'] && hit['_source']['cellSpecimen']['cellType']) {
      cellType = hit['_source']['cellSpecimen']['cellType'][0]['text'];
    }

    if (hit['_source']['cellCulture'] && hit['_source']['cellCulture']['cellType']) {
      cellType = hit['_source']['cellCulture']['cellType']['text'];
    }

    if (hit['_source']['cellLine'] && hit['_source']['cellLine']['cellType']) {
      cellType = hit['_source']['cellLine']['cellType']['text'];
    }
    return cellType;
  }

  getStrFromArray(data: any[], subelement: string): string {
    return convertArrayToStr(data, subelement);
  }

  ngOnDestroy(): void {
    this.clickedSubscription.unsubscribe();
  }

}
