import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ApiFileService} from '../../services/api-file.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  articleId: string;
  article: any;
  error: any;

  constructor(private route: ActivatedRoute,
              private titleService: Title,
              private apiFileService: ApiFileService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.articleId = params['id'];
      this.titleService.setTitle(`${this.articleId} | FAANG article`);
    });
    this.apiFileService.getArticle(this.articleId).subscribe(
      (data: any) => {
        this.article = data['hits']['hits'][0]['_source'];
        if (this.article) {
          this.spinner.hide();
        }
      },
        error => {
        this.spinner.hide();
        this.error = error;
      }
    );
  }

}
