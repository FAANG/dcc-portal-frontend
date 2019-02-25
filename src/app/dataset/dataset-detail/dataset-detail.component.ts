import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ApiFileService} from '../../services/api-file.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-dataset-detail',
  templateUrl: './dataset-detail.component.html',
  styleUrls: ['./dataset-detail.component.css']
})
export class DatasetDetailComponent implements OnInit {
  accession: string;
  dataset: any;
  error: any;
  publishedArticles: any;

  constructor(private route: ActivatedRoute,
              private apiFileService: ApiFileService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.accession = params['id'];
      this.titleService.setTitle(`${this.accession} | FAANG dataset`);
    });
    this.apiFileService.getDataset(this.accession).subscribe(
      (data: any) => {
        this.dataset = data['hits']['hits'][0]['_source'];
        if (this.dataset) {
          this.spinner.hide();
          this.dataset.publishedArticles = this.dataset.publishedArticles.sort((a,b) => (a.year > b.year) ? -1 :
            ((b.year > a.year) ? 1 : 0));
        }
      },
      error => {
        this.error = error;
        this.spinner.hide();
      }
    );
  }
}
