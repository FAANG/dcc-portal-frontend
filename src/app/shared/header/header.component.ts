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
  validation_dropdown_open = false;
  help_dropdown_open = false;
  show_banner = 'show';

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

  isOntologyImprover() {
    if (this.router.url.includes('ontology')) {
      return 'active';
    }
  }

  isQuery() {
    if (this.router.url.includes('query')) {
      return 'active';
    }
  }

  recordsOpenDropdown() {
    return this.records_dropdown_open === true ? 'show' : '';
  }

  recordsOnDropdownClick() {
    this.records_dropdown_open = !this.records_dropdown_open;
    if (this.projects_dropdown_open === true) {
      this.projects_dropdown_open = false;
    }
    if (this.validation_dropdown_open === true) {
      this.validation_dropdown_open = false;
    }
    if (this.help_dropdown_open === true) {
      this.help_dropdown_open = false;
    }
  }

  isActiveProjects() {
    if (this.router.url.includes('projects')) {
      return 'active';
    }
  }

  projectsOnDropdownClick() {
    this.projects_dropdown_open = !this.projects_dropdown_open;
    if (this.records_dropdown_open === true) {
      this.records_dropdown_open = false;
    }
    if (this.validation_dropdown_open === true) {
      this.validation_dropdown_open = false;
    }
    if (this.help_dropdown_open === true) {
      this.help_dropdown_open = false;
    }
  }

  validationOpenDropdown() {
    let active = '';
    if (this.router.url.includes('validation')) {
      active = 'active';
    }
    return this.validation_dropdown_open === true ? (active + ' show') : active;
  }

  validationOnDropdownClick() {
    this.validation_dropdown_open = !this.validation_dropdown_open;
    if (this.projects_dropdown_open === true) {
      this.projects_dropdown_open = false;
    }
    if (this.records_dropdown_open === true) {
      this.records_dropdown_open = false;
    }
    if (this.help_dropdown_open === true) {
      this.help_dropdown_open = false;
    }
  }

  helpOpenDropdown() {
    let active = '';
    if (this.router.url.includes('help')) {
      active = 'active';
    }
    return this.help_dropdown_open === true ? (active + ' show') : active;
  }

  helpOnDropdownClick() {
    this.help_dropdown_open = !this.help_dropdown_open;
    if (this.projects_dropdown_open === true) {
      this.projects_dropdown_open = false;
    }
    if (this.records_dropdown_open === true) {
      this.records_dropdown_open = false;
    }
    if (this.validation_dropdown_open === true) {
      this.validation_dropdown_open = false;
    }
  }

  hideBanner() {
    this.show_banner = 'hide';
  }

}
