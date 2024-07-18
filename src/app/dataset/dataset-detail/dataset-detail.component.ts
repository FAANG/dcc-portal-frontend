import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {external_ena_prefix, external_ols_prefix} from '../../shared/constants';
import {UserService} from '../../services/user.service';
import {QueryService} from '../../services/query.service';
import { RelatedItemsComponent } from '../../shared/related-items/related-items.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RobustLinkComponent } from '../../shared/robust-link/robust-link.component';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButton } from '@angular/material/button';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-dataset-detail',
  templateUrl: './dataset-detail.component.html',
  styleUrls: ['./dataset-detail.component.css'],
  standalone: true,
  imports: [HeaderComponent, MatButton, FlexModule, RobustLinkComponent, MatProgressSpinner, RelatedItemsComponent]
})


export class DatasetDetailComponent implements OnInit {
  accession = '';
  dataset: any;
  error: any;
  publishedArticles: any;
  readonly ena_prefix = external_ena_prefix;
  readonly ols_prefix = external_ols_prefix;
  mode = '';
  downloadColumns: string[] = [];
  relatedSpecimen: Array<any> = [];
  relatedFiles: Array<any> = [];
  relatedArticles: Array<any> = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: ApiDataService,
              private spinner: NgxSpinnerService,
              private titleService: Title,
              public _userService: UserService,
              public queryService: QueryService) {
  }

  ngOnInit() {
    this.downloadColumns = ['file.name', 'file.url', 'study', 'file.experiment.accession', 'file.run.accession',
      'specimen.organism.biosampleId', 'file.species.text',
      'specimen.organism.breed.text', 'specimen.organism.sex.text', 'specimen.specimenFromOrganism.animalAgeAtCollection.text',
      'specimen.specimenFromOrganism.animalAgeAtCollection.unit', 'specimen.biosampleId', 'specimen.cellType.text'];

    this._userService.token ? this.mode = 'private' : this.mode = 'public';
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.accession = params['id'];
      this.titleService.setTitle(`${this.accession} | FAANG dataset`);
    });
    this.dataService.getDataset(this.accession, this.mode).subscribe({
      next: (data: any) => {
        if (data['hits']['hits'].length === 0) {
          this.spinner.hide();
          this.router.navigate(['404']);
        } else {
          this.dataset = data['hits']['hits'][0]['_source'];
          if (this.dataset) {
            this.relatedSpecimen = data['hits']['hits'][0]['_source']['specimen'];
            this.relatedFiles = data['hits']['hits'][0]['_source']['file'];
            this.relatedArticles = data['hits']['hits'][0]['_source']['publishedArticles'];
          }
        }
        this.spinner.hide();
      },
      error: error => {
        this.error = error;
        this.spinner.hide();
      }
    });
  }

  downloadTSV() {
    this.queryService.downloadDatasetTSV(this.downloadColumns, '', 'tsv', this.accession);
  }
}

