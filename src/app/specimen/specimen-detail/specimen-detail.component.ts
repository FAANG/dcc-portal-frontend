import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiFileService} from '../../services/api-file.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-specimen-detail',
  templateUrl: './specimen-detail.component.html',
  styleUrls: ['./specimen-detail.component.css']
})
export class SpecimenDetailComponent implements OnInit {
  biosampleId: string;
  specimen: any;
  error: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiFileService: ApiFileService,
              private spinner: NgxSpinnerService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.biosampleId = params['id'];
      this.titleService.setTitle(`${this.biosampleId} | FAANG specimen`);
    });
    this.apiFileService.getSpecimen(this.biosampleId).subscribe(
      (data: any) => {
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
