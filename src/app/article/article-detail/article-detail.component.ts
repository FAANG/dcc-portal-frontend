import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {external_doi_prefix, external_epmc_prefix, external_pubmed_prefix, internal_dataset} from '../../shared/constants';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})

export class ArticleDetailComponent implements OnInit {
  id: string;
  article: any;
  error: any;
  readonly dataset_prefix = internal_dataset;
  readonly doi_prefix = external_doi_prefix
  readonly epmc_prefix = external_epmc_prefix
  readonly pubmed_prefix = external_pubmed_prefix

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: ApiDataService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.titleService.setTitle(`${this.id} | FAANG article`);
    });
    this.dataService.getArticle(this.id).subscribe(
      (data: any) => {
        if (data['hits']['hits'].length === 0) {
          this.spinner.hide();
          this.router.navigate(['404']);
        } else {
          this.article = data['hits']['hits'][0]['_source'];
          if (this.article) {
            this.spinner.hide();
          }
        }
      },
      error => {
        this.error = error;
        this.spinner.hide();
      }
    );
  }
}
