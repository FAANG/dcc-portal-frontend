import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {convertArrayToStr} from '../../shared/common_functions';

import {
  external_biosample_prefix,
  external_ena_prefix,
  external_ols_prefix,
  internal_dataset,
  internal_specimen
} from '../../shared/constants';

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.css']
})
export class AnalysisDetailComponent implements OnInit {
  accession: string;
  analysis: any;
  error: any;
  convertArrayToStr: any;
  readonly ena_prefix = external_ena_prefix;
  readonly ols_prefix = external_ols_prefix;
  readonly biosample_prefix = external_biosample_prefix;
  readonly specimen_prefix = internal_specimen;
  readonly dataset_prefix = internal_dataset;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: ApiDataService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.convertArrayToStr = convertArrayToStr;
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.accession = params['id'];
      this.titleService.setTitle(`${this.accession} | FAANG analysis`);
    });
    this.dataService.getAnalysis(this.accession).subscribe(
      (data: any) => {
        if (data['hits']['hits'].length === 0) {
          this.spinner.hide();
          this.router.navigate(['404']);
        } else {
          this.analysis = data['hits']['hits'][0]['_source'];
          if (this.analysis) {
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

  // TODO: add new ES field to check existence of samples when importing the analysis
  // the introduction of virtual pool of specimen which does not meet FAANG standard makes it necessary to dynamically determine
  // which prefix to use to create the link, either within data portal or ENA
  sampleInES(biosampleId: string) {
    return false;
  }
}
