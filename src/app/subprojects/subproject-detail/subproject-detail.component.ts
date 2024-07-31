import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import setting from './subproject-detail.component.setting.json';
import {UserService} from '../../services/user.service';
import { EurofaangInfoComponent } from './eurofaang-info/eurofaang-info.component';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { RelatedItemsComponent } from '../../shared/related-items/related-items.component';
import { EnsemblAnnotationComponent } from '../../shared/ensembl-annotation/ensembl-annotation.component';
import { MatCard } from '@angular/material/card';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { NgClass } from '@angular/common';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatButton } from '@angular/material/button';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-subproject-detail',
  templateUrl: './subproject-detail.component.html',
  styleUrls: ['./subproject-detail.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [HeaderComponent, MatButton, FlexModule, NgClass, ExtendedModule, MatCard, EnsemblAnnotationComponent, RelatedItemsComponent,
    MatTabGroup, MatTab, EurofaangInfoComponent]
})
export class SubprojectDetailComponent implements OnInit, OnDestroy {
  private twitter: any;
  project = '';
  setting: {[index: string]: any} = {};
  eurofaang_keyproj: any = [];
  error: any;
  right_logo_url: {[index: string]: any} = {};
  project_links: {[index: string]: any} = {};
  public tabs: string[] = [];
  public tabsConfig: {[index: string]: any} = {
    protocolsamples: {
      title: 'Samples',
      enabled: false,
    },
    protocolfiles: {
      title: 'Experiments',
      enabled: false,
    },
    protocolanalysis: {
      title: 'Analyses',
      enabled: false,
    },
  };

  constructor(private route: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private router: Router,
              private titleService: Title,
              protected _userService: UserService) {
    this.initTwitterWidget();
  }

  ngOnInit() {
    this.tabs = Object.keys(this.tabsConfig);
    void this.spinner.show();
    this.right_logo_url = {
      bovine: 'https://github.com/FAANG/comm-data-portal-projects/raw/master/projects/bovine/funding-logo-1.png',
      other: 'https://github.com/FAANG/comm-data-portal-projects/raw/master/projects/bovreg/funding-logo-1.png'
    };
    this.project_links = {
      'AQUA-FAANG': 'https://eurofaang.eu/projects/aquafaang',
      'BovReg': 'https://eurofaang.eu/projects/bovreg',
      'GENE-SWitCH': 'https://eurofaang.eu/projects/geneswitch',
      'GEroNIMO': 'https://eurofaang.eu/projects/geronimo',
      'RUMIGEN': 'https://eurofaang.eu/projects/rumigen'
    };
    this.route.params.subscribe({
      next: (params: Params) => {
        this.project = params['id'];
        this.titleService.setTitle(`${this.project} | FAANG project`);
        void this.spinner.hide();
      },
      error: error => {
        this.error = error;
        void this.spinner.hide();
      }
    });
    if (setting.hasOwnProperty(this.project)) {
      this.setting = setting[this.project as keyof typeof setting];

      if (this.project === 'EuroFAANG') {
        for (const [key, val] of Object.entries(setting)) {
          const value: any = val;
          if (value['parent_project'] && value['parent_project'] === 'EuroFAANG') {
            this.eurofaang_keyproj.push(key);
          }
        }
      }
    } else {
      void this.router.navigate(['404']);
    }
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
          // @ts-ignore
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
    void this.router.navigate(['login']);
  }

  ngOnDestroy() {
    this.twitter.unsubscribe();
  }

  public enableTab(emittedVal: any): void {
    if (emittedVal[1] !== 0) {
      this.tabsConfig[emittedVal[0]].enabled = true;
    }
  }

  getEnabledStatus(type: string) {
    return this.tabsConfig[type].enabled;
  }

  getTotalEnabledStatus() {
    for (const key in this.tabsConfig) {
      if (this.tabsConfig[key].enabled) {
         return true;
      }
    }
    return false;
  }

  getSelectedTab() {
    let i = 0;
    for (const key in this.tabsConfig) {
      if (this.tabsConfig.hasOwnProperty(key)) {
        if (this.tabsConfig[key].enabled) {
          return i;
        }
        i++;
      }
    }
    return 0;
  }
}
