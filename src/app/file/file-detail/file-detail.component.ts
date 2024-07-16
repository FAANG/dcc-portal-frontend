import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {FIELD_NAMES} from '../../shared/fieldnames';
import {external_ena_prefix, external_ols_prefix, internal_dataset, internal_organism, internal_specimen} from '../../shared/constants';
import {expandObject, getProtocolLink} from '../../shared/common_functions';
import {UserService} from '../../services/user.service';
import { SlicePipe } from '@angular/common';
import { RelatedItemsComponent } from '../../shared/related-items/related-items.component';
import { RobustLinkComponent } from '../../shared/robust-link/robust-link.component';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButton } from '@angular/material/button';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css'],
  standalone: true,
  imports: [HeaderComponent, MatButton, FlexModule, RobustLinkComponent, RouterLink, RelatedItemsComponent, SlicePipe]
})
export class FileDetailComponent implements OnInit {
  fileId = '';
  file: any;
  experiment: any = {};
  error: any;
  fieldNames = FIELD_NAMES; // required in the html page
  showExperimentDetail = false;
  expandObject: any;
  getProtocolLink: any;
  relatedArticles: Array<any> = [];
  readonly ena_prefix = external_ena_prefix;
  readonly ols_prefix = external_ols_prefix;
  readonly organism_prefix = internal_organism;
  readonly specimen_prefix = internal_specimen;
  readonly dataset_prefix = internal_dataset;
  mode = '';

  objectKeys = Object.keys;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: ApiDataService,
              private spinner: NgxSpinnerService,
              private titleService: Title,
              public _userService: UserService) { }

  ngOnInit() {
    this._userService.token ? this.mode = 'private' : this.mode = 'public';
    this.expandObject = expandObject;
    this.getProtocolLink = getProtocolLink;
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.fileId = params['id'];
      this.titleService.setTitle(`${this.fileId} | FAANG file`);
    });
    this.dataService.getFile(this.fileId, this.mode).subscribe(
      (data: any) => {
        if (data['hits']['hits'].length === 0) {
          this.spinner.hide();
          this.router.navigate(['404']);
        } else {
          this.file = data['hits']['hits'][0]['_source'];
          if (this.file) {
            this.relatedArticles = data['hits']['hits'][0]['_source']['publishedArticles'];
            this.spinner.hide();
            if (this.file.hasOwnProperty('experiment')) {
              this.dataService.getExperimentByAccession(this.file['experiment']['accession']).subscribe(
                (experiment_data: any) => {
                  if (Array.isArray(experiment_data['hits']['hits']) && experiment_data['hits']['hits'].length > 0) {
                    this.experiment = this.expandObject(experiment_data['hits']['hits'][0]['_source'], this.experiment);
                  }
                },
                error => {
                  this.error = error;
                }
              );
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

  checkIsObject(value: any) {
    return typeof value === 'object';
  }

  toggleExperiment() {
    this.showExperimentDetail = !this.showExperimentDetail;
  }
}
