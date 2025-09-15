import {Component, OnInit} from '@angular/core';
import {NgcCookieConsentService, NgcCookieConsentConfig} from 'ngx-cookieconsent';
import {environment} from '../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import {NgxSpinnerModule} from 'ngx-spinner';

export const cookieConfig: NgcCookieConsentConfig =   {
  'cookie': {
    'domain': environment.cookieDomain
  },
  'position': 'bottom',
  'theme': 'classic',
  'palette': {
    'popup': {
      'background': '#333',
      'text': '#ffffff',
      'link': '#ffffff'
    },
    'button': {
      'background': '#f1d600',
      'text': '#333',
      'border': 'transparent'
    }
  },
  'type': 'info',
  'content': {
    'message': 'This website requires cookies, and the limited processing of your personal data in order to function. By using the site you are agreeing to this as outlined in our ',
    'dismiss': 'Accept cookies',
    'deny': 'Refuse cookies',
    'link': 'Privacy Notice',
    'href': '/assets/gdpr/privacy_notice_ FAANG.pdf',
    'policy': 'Cookie Policy'
  }
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'faang-portal-frontend-angular-version17';

  constructor(
    private ccService: NgcCookieConsentService
  ) {}

  ngOnInit() {
  }
}
