import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  records_dropdown_open = false;
  projects_dropdown_open = false;

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

  recordsOpenDropdown() {
    return this.records_dropdown_open === true ? 'show' : '';
  }

  recordsOnDropdownClick() {
    this.records_dropdown_open = !this.records_dropdown_open;
  }

  projectsOpenDropdown() {
    return this.projects_dropdown_open === true ? 'show' : '';
  }

  projectsOnDropdownClick() {
    this.projects_dropdown_open = !this.projects_dropdown_open;
  }

}
