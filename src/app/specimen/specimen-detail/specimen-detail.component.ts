import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {external_ols_prefix, internal_organism, internal_specimen} from '../../shared/constants';
import {getProtocolLink} from '../../shared/common_functions';
import {UserService} from '../../services/user.service';

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
  mode: string;
  relatedArticles: Array<any>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: ApiDataService,
              private spinner: NgxSpinnerService,
              private titleService: Title,
              public _userService: UserService) {
  }

  ngOnInit() {
    this._userService.token ? this.mode = 'private' : this.mode = 'public';
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.biosampleId = params['id'];
      this.titleService.setTitle(`${this.biosampleId} | FAANG specimen`);
    });
    this.dataService.getSpecimen(this.biosampleId, this.mode).subscribe(
      (data: any) => {
        if (data['hits']['hits'].length === 0) {
          this.spinner.hide();
          this.router.navigate(['404']);
        } else {
          this.specimen = data['hits']['hits'][0]['_source'];
          if (this.specimen) {
            this.relatedArticles = data['hits']['hits'][0]['_source']['publishedArticles'];
          }
          if (this.biosampleId !== this.specimen.biosampleId) {
            // this.router.navigate(['/specimen', this.specimen.biosampleId]);
            this.router.navigate(['/']).then(() => {
              this.router.navigate(['/specimen', this.specimen.biosampleId]);
            });
          }
        }
        this.spinner.hide();
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

  generateProtocolLink(url: string) {
    return getProtocolLink(url);
  }
}
