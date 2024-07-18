import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ApiDataService } from '../../services/api-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';
import { convertArrayToStr, getProtocolLink } from '../../shared/common_functions';

import {
  external_biosample_prefix,
  external_ena_prefix,
  external_ols_prefix,
  internal_dataset,
  internal_specimen
} from '../../shared/constants';
import {UserService} from '../../services/user.service';
import { RelatedItemsComponent } from '../../shared/related-items/related-items.component';
import { RobustLinkComponent } from '../../shared/robust-link/robust-link.component';
import { FlexModule } from '@angular/flex-layout/flex';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.css'],
  standalone: true,
  imports: [HeaderComponent, FlexModule, RobustLinkComponent, RouterLink, RelatedItemsComponent]
})
export class AnalysisDetailComponent implements OnInit {
  accession = '';
  analysis: any;
  error: any;
  convertArrayToStr: any;
  getProtocolLink: any;
  relatedFiles: Array<any> = [];
  readonly ena_prefix = external_ena_prefix;
  readonly ols_prefix = external_ols_prefix;
  readonly biosample_prefix = external_biosample_prefix;
  readonly specimen_prefix = internal_specimen;
  readonly dataset_prefix = internal_dataset;
  mode = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: ApiDataService,
              private spinner: NgxSpinnerService,
              private titleService: Title,
              public _userService: UserService) { }

  ngOnInit() {
    this._userService.token ? this.mode = 'private' : this.mode = 'public';
    this.convertArrayToStr = convertArrayToStr;
    this.getProtocolLink = getProtocolLink;
    void this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.accession = params['id'];
      this.titleService.setTitle(`${this.accession} | FAANG analysis`);
    });
    this.dataService.getAnalysis(this.accession, this.mode).subscribe({
      next: (data: any) => {
        if (data['hits']['hits'].length === 0) {
          void this.spinner.hide();
          void this.router.navigate(['404']);
        } else {
          this.analysis = data['hits']['hits'][0]['_source'];
          if (this.analysis) {
            this.relatedFiles = data['hits']['hits'][0]['_source']['files'];
            void this.spinner.hide();
          }
        }
      },
      error: error => {
        this.error = error;
        void this.spinner.hide();
      }
    });
  }

  // TODO: add new ES field to check existence of samples when importing the analysis
  // the introduction of virtual pool of specimen which does not meet FAANG standard makes it necessary to dynamically determine
  // which prefix to use to create the link, either within data portal or ENA
  sampleInES(biosampleId: string) {
    return false;
  }
}
