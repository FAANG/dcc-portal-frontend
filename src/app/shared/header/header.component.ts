import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  toggleCollapse() {
    this.collapsed = ! this.collapsed;
  }

  isActiveSummary() {
    if (this.router.url.includes('summary')) {
      return 'active';
    }
  }

  isActiveProtocols() {
    if (this.router.url.includes('protocol')) {
      return 'active';
    }
  }

  isActiveRuleset() {
    if (this.router.url.includes('ruleset')) {
      return 'active';
    }
  }

  isActiveValidation() {
    if (this.router.url.includes('validation')) {
      return 'active'
    }
  }

}
