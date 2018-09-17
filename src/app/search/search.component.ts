import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  search(text: string) {
    this.searchService.searchText$.next(text);
  }

  ngOnInit() {
  }

  constructor(private searchService: SearchService) { }

}
