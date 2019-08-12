import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiFileService} from '../../services/api-file.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.css']
})
export class AnalysisDetailComponent implements OnInit {
  accession: string;
  dataset: any;
  error: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiFileService: ApiFileService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.accession = params['id'];
      this.titleService.setTitle(`${this.accession} | FAANG analysis`);
    });
    this.apiFileService.getDataset(this.accession).subscribe(
      (data: any) => {
        if (data['hits']['hits'].length === 0) {
          this.spinner.hide();
          this.router.navigate(['404']);
        } else {
          this.dataset = data['hits']['hits'][0]['_source'];
          if (this.dataset) {
            this.spinner.hide();
            if (this.dataset.hasOwnProperty('publishedArticles')) {
              this.dataset.publishedArticles = this.dataset.publishedArticles.sort((a, b) => (a.year > b.year) ? -1 :
                ((b.year > a.year) ? 1 : 0));
            }
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
