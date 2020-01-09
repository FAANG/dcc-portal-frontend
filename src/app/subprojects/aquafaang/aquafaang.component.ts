import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-aquafaang',
  templateUrl: './aquafaang.component.html',
  styleUrls: ['./aquafaang.component.css']
})
export class AquafaangComponent implements OnInit, OnDestroy {
  private twitter: any;

  constructor(private title: Title, private _router: Router) {
    this.initTwitterWidget();
  }

  ngOnInit() {
    this.title.setTitle('AQUA-FAANG');
  }

  initTwitterWidget() {
    this.twitter = this._router.events.subscribe(val => {
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
