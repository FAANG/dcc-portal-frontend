import {Component, OnInit, ViewChild} from '@angular/core';

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
  }

  dismiss(): void {
    this.cookieLawEl.dismiss();
  }
}
