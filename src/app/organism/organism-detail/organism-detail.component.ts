import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {external_ols_prefix, internal_organism} from '../../shared/constants';
import {UserService} from '../../services/user.service';
import { RelatedItemsComponent } from '../../shared/related-items/related-items.component';
import { RobustLinkComponent } from '../../shared/robust-link/robust-link.component';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButton } from '@angular/material/button';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-organism-detail',
  templateUrl: './organism-detail.component.html',
  styleUrls: ['./organism-detail.component.css'],
  standalone: true,
  imports: [HeaderComponent, MatButton, FlexModule, RobustLinkComponent, RouterLink, RelatedItemsComponent]
})
export class OrganismDetailComponent implements OnInit {
  biosampleId = '';
  organism: any;
  error: any;
  readonly ols_prefix = external_ols_prefix;
  readonly organism_prefix = internal_organism;
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
    void this.spinner.show();
    this.route.params.subscribe((params: Params) => {
      this.biosampleId = params['id'];
      this.titleService.setTitle(`${this.biosampleId} | FAANG organism`);
    });
    this.dataService.getOrganism(this.biosampleId, this.mode).subscribe(
      (data: any) => {
        if (data['hits']['hits'].length === 0) {
          void this.spinner.hide();
          void this.router.navigate(['404']);
        } else {
          this.organism = data['hits']['hits'][0]['_source'];
          if (this.organism) {
            this.relatedArticles = data['hits']['hits'][0]['_source']['publishedArticles'];
          }
          if (this.biosampleId !== this.organism.biosampleId) {
            void this.router.navigate(['/']).then(() => {
              void this.router.navigate(['/organism', this.organism.biosampleId]);
            });
          }
          void this.spinner.hide();
        }
      },
      error => {
        this.error = error;
        void this.spinner.hide();
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

}
