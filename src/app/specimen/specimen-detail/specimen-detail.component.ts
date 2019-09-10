import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {external_ols_prefix, internal_organism, internal_specimen} from '../../shared/constants';

@Component({
  selector: 'app-specimen-detail',
  templateUrl: './specimen-detail.component.html',
  styleUrls: ['./specimen-detail.component.css']
})
export class SpecimenDetailComponent implements OnInit {
  biosampleId: string;
  specimen: any;
  error: any;
  readonly ols_prefix = external_ols_prefix;
  readonly organism_prefix = internal_organism;
  readonly specimen_prefix = internal_specimen;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: ApiDataService,
              private spinner: NgxSpinnerService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.biosampleId = params['id'];
      this.titleService.setTitle(`${this.biosampleId} | FAANG specimen`);
    });
    this.dataService.getSpecimen(this.biosampleId).subscribe(
      (data: any) => {
        if (data['hits']['hits'].length === 0) {
          this.spinner.hide();
          this.router.navigate(['404']);
        } else {
          this.specimen = data['hits']['hits'][0]['_source'];
          if (this.biosampleId !== this.specimen.biosampleId) {
            // this.router.navigate(['/specimen', this.specimen.biosampleId]);
            this.router.navigate(['/']).then(() => {
              this.router.navigate(['/specimen', this.specimen.biosampleId]);
            });
          }
          if (this.specimen) {
            this.spinner.hide();
            if (this.specimen.hasOwnProperty('publishedArticles')) {
              this.specimen.publishedArticles = this.specimen.publishedArticles.sort((a, b) => (a.year > b.year) ? -1 :
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

  dealWithAvailability(input: string): string {
    if (input.substr(0, 6) === 'mailto') {
      return input.substr(7);
    } else {
      return input;
    }
  }

  getProtocolLink() {
    if (this.specimen.specimenFromOrganism.specimenCollectionProtocol.url.split('//')[0] === 'ftp:') {
      return 'http://' + this.specimen.specimenFromOrganism.specimenCollectionProtocol.url.split('//')[1];
    } else {
      return this.specimen.specimenFromOrganism.specimenCollectionProtocol.url;
    }
  }
}
