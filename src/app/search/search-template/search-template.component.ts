import {Component, Input, OnInit} from '@angular/core';
import {SearchService} from '../../services/search.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-search-template',
  templateUrl: './search-template.component.html',
  styleUrls: ['./search-template.component.css']
})
export class SearchTemplateComponent implements OnInit {
  @Input() entity: string;
  hits;
  display = false;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(text => this.searchService.search(this.entity, text))
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

    if (hit['_source']['cellLine'] && hit['_source']['cellLine']['cellType']){
      cellType = hit['_source']['cellLine']['cellType']['text'];
    }
    return cellType;
  }

  convertArrayToStr(data: string[], subelement: string): string {
    let value: string = '';
    for (var i = 0; i < data.length; i++) {
      if (subelement === ''){
        value += data[i] + ',';
      } else {
        value += data[i][subelement] + ',';
      }
    }
    return value.substring(0, value.length - 1);
  }

}
