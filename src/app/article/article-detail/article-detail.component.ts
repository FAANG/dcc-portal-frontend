import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  articleId: string;

  constructor(private route: ActivatedRoute,
              private titleService: Title) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.articleId = params['id'];
      this.titleService.setTitle(`${this.articleId} | FAANG article`);
    });
  }

}
