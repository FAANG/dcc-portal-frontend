import { Component, OnInit } from '@angular/core';
import {SearchService} from '../services/search.service';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText: string;
  clicked = false;

  search(text: string) {
    this.searchService.searchText$.next(text);
  }

  ngOnInit() {
    this.titleService.setTitle('FAANG Search');
  }

  preventReload(event: any) {
    if (event.code === 'Enter') {
      return false;
    }
  }

  constructor(private searchService: SearchService, private titleService: Title) { }

  onCheckboxClick() {
    this.clicked = !this.clicked;
    this.searchService.clicked.next(this.clicked);
    if (typeof this.searchText !== 'undefined') {
      this.searchService.searchText$.next('');
      setTimeout(() => {
        this.searchService.searchText$.next(this.searchText);
      }, 500);
    }
  }

  addValue(text: string) {
    this.searchText = text;
  }

}
