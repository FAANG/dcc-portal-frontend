import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import setting from './subproject-detail.component.setting.json';

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

  constructor(private route: ActivatedRoute,
              private title: Title,
              private spinner: NgxSpinnerService,
              private router: Router,
              private titleService: Title) {
    this.initTwitterWidget();
  }

  ngOnInit() {
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
    this.setting = setting[this.project];
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

  ngOnDestroy() {
    this.twitter.unsubscribe();
  }

}
