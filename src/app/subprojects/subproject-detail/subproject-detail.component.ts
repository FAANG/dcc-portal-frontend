import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import setting from './subproject-detail.component.setting.json';
import {UserService} from '../../services/user.service';
import {ApiDataService} from '../../services/api-data.service';

@Component({
  selector: 'app-subproject-detail',
  templateUrl: './subproject-detail.component.html',
  styleUrls: ['./subproject-detail.component.css']
})
export class SubprojectDetailComponent implements OnInit, OnDestroy {
  private twitter: any;
  project: string;
  setting: any;
  error: any;
  tableType: string;
  relatedItemsCount: Object;

  constructor(private route: ActivatedRoute,
              private title: Title,
              private spinner: NgxSpinnerService,
              private router: Router,
              private titleService: Title,
              private _userService: UserService,
              private dataService: ApiDataService) {
    this.initTwitterWidget();
  }

  ngOnInit() {
    this.tableType = 'Organisms';
    this.relatedItemsCount = {
      'Organisms': 0, 'Specimens': 0, 'Publications': 0, 'Files': 0,
    }
    this.spinner.show();
    this.route.params.subscribe((params: Params) => {
        this.project = params['id'];
        this.titleService.setTitle(`${this.project} | FAANG project`);
        this.spinner.hide();
      },
      error => {
        this.error = error;
        this.spinner.hide();
      });
    if (setting.hasOwnProperty(this.project)) {
      this.setting = setting[this.project];
    } else {
      this.router.navigate(['404']);
    }
    this.dataService.getProjectOrganismsCount(this.project).subscribe(
      (data: any) => {
        this.relatedItemsCount['Organisms'] = data;
      }
    );
    this.dataService.getProjectSpecimensCount(this.project).subscribe(
      (data: any) => {
        this.relatedItemsCount['Specimens'] = data;
      }
    );
    this.dataService.getProjectPublicationsCount(this.project).subscribe(
      (data: any) => {
        this.relatedItemsCount['Publications'] = data;
      }
    );
    this.dataService.getProjectFilesCount(this.project).subscribe(
      (data: any) => {
        this.relatedItemsCount['Files'] = data;
      }
    );
  }

  initTwitterWidget() {
    this.twitter = this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        (<any>window).twttr = (function (d, s, id) {
          let js: any;
          const fjs = d.getElementsByTagName(s)[0],
            t = (<any>window).twttr || {};
          if (d.getElementById(id)) {
            return t;
          }
          js = d.createElement(s);
          js.id = id;
          js.src = 'https://platform.twitter.com/widgets.js';
          fjs.parentNode.insertBefore(js, fjs);

          t._e = [];
          t.ready = function (f: any) {
            t._e.push(f);
          };

          return t;
        }(document, 'script', 'twitter-wjs'));

        if ((<any>window).twttr.ready()) {
          (<any>window).twttr.widgets.load();
        }

      }
    });
  }

  logout() {
    this._userService.logout();
    window.location.reload();
  }

  login() {
    this.router.navigate(['login']);
  }

  setTableType(tableTypeValue: string) {
    this.tableType = tableTypeValue;
  }

  ngOnDestroy() {
    this.twitter.unsubscribe();
  }

}
