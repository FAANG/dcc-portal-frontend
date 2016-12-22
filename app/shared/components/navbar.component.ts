import { Component } from '@angular/core';
@Component({
    selector: 'faang-navbar',
    templateUrl: './navbar.component.html',
    styles: [`

a.navbar-brand {
  padding-top: 2px;
  padding-bottom: 2px;
}

a.navbar-brand img {
  display: inline;
  height: 100%;
}

    `],
})
export class NavbarComponent {
  collapsed: boolean = true;

  toggleCollapse() {
    this.collapsed = ! this.collapsed;
  }

}
