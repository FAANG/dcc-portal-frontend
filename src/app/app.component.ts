import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'faang-portal-frontend-angular6-second';
  name = 'Angular2 Cookie Law with Angular6';
  cookieLawSeen: boolean;

  @ViewChild('cookieLaw')
  cookieLawEl: any;

  ngOnInit() {
    this.cookieLawSeen = this.cookieLawEl.cookieLawSeen;
    if (environment.production) {
      if (location.protocol === 'http:' && location.hostname === 'data.faang.org') {
        window.location.href = location.href.replace('http', 'https');
      }
    }
  }

  dismiss(): void {
    this.cookieLawEl.dismiss();
  }
}
