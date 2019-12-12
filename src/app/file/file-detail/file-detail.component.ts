import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {FIELDEXCLUDENAMES, FIELDNAMES} from '../../shared/fieldnames';
import {external_ena_prefix, external_ols_prefix, internal_dataset, internal_organism, internal_specimen} from '../../shared/constants';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {
  fileId: string;
  file: any;
  experiment: any = {};
  error: any;
  fieldNames = FIELDNAMES;
  fieldExcludeNames = FIELDEXCLUDENAMES;
  showExperimentDetail = false;
  readonly ena_prefix = external_ena_prefix;
  readonly ols_prefix = external_ols_prefix;
  readonly organism_prefix = internal_organism;
  readonly specimen_prefix = internal_specimen;
  readonly dataset_prefix = internal_dataset;

  objectKeys = Object.keys;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: ApiDataService,
              private spinner: NgxSpinnerService,
              private titleService: Title) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.fileId = params['id'];
      this.titleService.setTitle(`${this.fileId} | FAANG file`);
    });
    this.dataService.getFile(this.fileId).subscribe(
      (data: any) => {
        if (data['hits']['hits'].length === 0) {
          this.spinner.hide();
          this.router.navigate(['404']);
        } else {
          this.file = data['hits']['hits'][0]['_source'];
          if (this.file) {
            this.spinner.hide();
            if (this.file.hasOwnProperty('publishedArticles')) {
              this.file.publishedArticles = this.file.publishedArticles.sort((a, b) => (a.year > b.year) ? -1 :
                ((b.year > a.year) ? 1 : 0));
            }
            if (this.file.hasOwnProperty('experiment')) {
              this.dataService.getExperimentByAccession(this.file['experiment']['accession']).subscribe(
                (experiment_data: any) => {
                  this.expandObject(experiment_data['hits']['hits'][0]['_source']);
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

  expandObject(myObject: any) {
    for (const key in myObject) {
      if (key in this.fieldNames) {
        if (typeof myObject[key] === 'object') {
          for (const secondaryKey in myObject[key]) {
            if (myObject[key][secondaryKey] !== '') {
              this.experiment[key] = myObject[key];
            }
          }
        } else {
          if (myObject[key] !== '') {
            this.experiment[key] = myObject[key];
          }
        }
      } else {
        if (key in this.fieldExcludeNames) {
          continue;
        } else {
          this.expandObject(myObject[key]);
        }
      }
    }
  }

  checkIsObject(value: any) {
    if (typeof value === 'object') {
      return true;
    } else {
      return false;
    }
  }

  toggleExperiment() {
    this.showExperimentDetail = !this.showExperimentDetail;
  }
}
