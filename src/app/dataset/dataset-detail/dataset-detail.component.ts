import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import { external_ena_prefix, external_ols_prefix } from '../../shared/constants';
import {UserService} from '../../services/user.service';

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
  readonly ena_prefix = external_ena_prefix;
  readonly ols_prefix = external_ols_prefix;
  mode: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: ApiDataService,
              private spinner: NgxSpinnerService,
              private titleService: Title,
              public _userService: UserService) { }

  ngOnInit() {
    this._userService.token ? this.mode = 'private' : this.mode = 'public';
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.accession = params['id'];
      this.titleService.setTitle(`${this.accession} | FAANG dataset`);
    });
    this.dataService.getDataset(this.accession, this.mode).subscribe(
      (data: any) => {
        if (data['hits']['hits'].length === 0) {
          this.spinner.hide();
          this.router.navigate(['404']);
        } else {
          this.dataset = data['hits']['hits'][0]['_source'];
        }
        this.spinner.hide();
      },
      error => {
        this.error = error;
        this.spinner.hide();
      }
    );
  }
}
