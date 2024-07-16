import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {external_ols_prefix, internal_organism, internal_specimen} from '../../shared/constants';
import {getProtocolLink} from '../../shared/common_functions';
import {UserService} from '../../services/user.service';
import { RelatedItemsComponent } from '../../shared/related-items/related-items.component';
import { RobustLinkComponent } from '../../shared/robust-link/robust-link.component';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButton } from '@angular/material/button';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-specimen-detail',
  templateUrl: './specimen-detail.component.html',
  styleUrls: ['./specimen-detail.component.css'],
  standalone: true,
  imports: [HeaderComponent, MatButton, FlexModule, RobustLinkComponent, RouterLink, RelatedItemsComponent]
})
export class SpecimenDetailComponent implements OnInit {
  biosampleId = '';
  specimen: any;
  error: any;
  readonly ols_prefix = external_ols_prefix;
  readonly organism_prefix = internal_organism;
  readonly specimen_prefix = internal_specimen;
  mode = '';
  relatedArticles: Array<any> = [];

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

  isOrganoid(biosampleid: string) {
    return ['SAMEA113988823', 'SAMEA113988824', 'SAMEA113988825', 'SAMEA113988826', 'SAMEA113988827', 'SAMEA113988828', 'SAMEA113988829',
      'SAMEA113988830', 'SAMEA113988831', 'SAMEA113988832',  'SAMEA113988833', 'SAMEA113988834', 'SAMEA113988835', 'SAMEA113988836',
      'SAMEA113988837',  'SAMEA113988838'].indexOf(biosampleid) !== -1;
  }
}
