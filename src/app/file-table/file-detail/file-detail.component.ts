import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiFileService} from '../../services/api-file.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {FIELDEXCLUDENAMES, FIELDNAMES} from '../../shared/fieldnames';

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

  objectKeys = Object.keys;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiFileService: ApiFileService,
              private spinner: NgxSpinnerService,
              private titleService: Title,
              public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.fileId = params['id'];
      this.titleService.setTitle(`${this.fileId} | FAANG file`);
    });
    this.apiFileService.getFile(this.fileId).subscribe(
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
              this.apiFileService.getFilesExperiment(this.file['experiment']['accession']).subscribe(
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
}
