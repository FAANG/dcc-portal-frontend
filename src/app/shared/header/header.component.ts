import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { MatButton } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout/flex';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [MatToolbar, FlexModule, RouterLink, MatButton, ExtendedModule, MatMenuTrigger, MatIcon, RouterLinkActive, NgClass,
      MatMenu, MatMenuItem]
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  isActive(option: string) {
    const menuItems: {[index: string]: any} = {
      'data': ['organism', 'specimen', 'dataset', 'file', 'analysis', 'protocol', 'article'],
      'submit': ['ruleset', 'validation', 'trackhubs', 'nextflowSubmission'],
      'help': ['api'],
      'search': ['graphql', 'globalsearch'],
      'protocol': ['protocol'],
      'validation': ['validation'],
      'ruleset': ['ruleset']
    };
    for (const item of menuItems[option]) {
      if (option === 'data') {
        if (this.router.url.includes(item) && !this.router.url.includes('summary') ) {
          return 'active';
        }
      } else {
        if (this.router.url.includes(item)) {
          return 'active';
        }
      }
    }
    return null;
  }
}
