import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ApiDataService} from '../../services/api-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Title} from '@angular/platform-browser';
import {external_ols_prefix, internal_organism} from '../../shared/constants';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-organism-detail',
  templateUrl: './organism-detail.component.html',
  styleUrls: ['./organism-detail.component.css']
})
export class OrganismDetailComponent implements OnInit {
  biosampleId: string;
  organism: any;
  error: any;
  readonly ols_prefix = external_ols_prefix;
  readonly organism_prefix = internal_organism;
  mode: string;

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
      this.titleService.setTitle(`${this.biosampleId} | FAANG organism`);
    });
    this.dataService.getOrganism(this.biosampleId, this.mode).subscribe(
      (data: any) => {
        if (data['hits']['hits'].length === 0) {
          this.spinner.hide();
          this.router.navigate(['404']);
        } else {
          this.organism = data['hits']['hits'][0]['_source'];
          if (this.biosampleId !== this.organism.biosampleId) {
            this.router.navigate(['/']).then(() => {
              this.router.navigate(['/organism', this.organism.biosampleId]);
            });
          }
          this.spinner.hide();
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

}
