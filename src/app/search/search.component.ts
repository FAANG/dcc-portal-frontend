import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service';
import {Title} from '@angular/platform-browser';


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
    this.titleService.setTitle('FAANG Search');
  }

  constructor(private searchService: SearchService, private titleService: Title) { }

}
