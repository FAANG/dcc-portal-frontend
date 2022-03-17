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

  isActive(option) {
    let menuItems = {
      'data': ['organism', 'specimen', 'dataset', 'file', 'analysis', 'protocol', 'article'],
      'submit': ['ruleset', 'validation', 'trackhubs'],
      'help': ['api'],
      'protocol': ['protocol'],
      'validation': ['validation']
    }
    for (let item of menuItems[option]) {
      if (this.router.url.includes(item)) {
        return 'active';
      }
    }
  }
}
