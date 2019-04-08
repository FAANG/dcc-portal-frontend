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
    if (this.router.url === '/summary/organisms' || this.router.url === '/summary/specimens' || this.router.url === '/summary/datasets' ||
      this.router.url === '/summary/files') {
      return 'active';
    }
  }

  isActiveProtocols() {
    if (this.router.url === '/protocol/samples' || this.router.url === '/protocol/experiments') {
      return 'active';
    }
  }

}
