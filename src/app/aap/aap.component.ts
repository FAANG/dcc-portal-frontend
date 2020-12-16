import { Component, Injectable, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService, TokenService, User} from 'ng-ebi-authorization';

@Component({
  selector: 'app-aap',
  templateUrl: './aap.component.html',
  styleUrls: ['./aap.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class AapComponent implements OnInit {
  user: Observable < User | null >;
  expiration: Observable < Date | null > ;
  domains: Observable < string[] > ;
  iss: Observable < string | null > ;

  constructor(public auth: AuthService, private token: TokenService) {
    this.user = auth.user();
    this.expiration = this.user.pipe(
      map(user => token.getTokenExpirationDate())
    );
    this.domains = this.user.pipe(
      map(_ => token.getClaim < string[], string[] > ('domains', []))
    );
    this.iss = this.user.pipe(
      map(_ => token.getClaim < string, null > ('iss', null))
    );
  }

  openLoginWindow() {
    // ttl: time of live, and location
    this.auth.openLoginWindow({
      'ttl': '60'
    }, 500, 500, 100, 100);
  }

  logOut() {
    this.auth.logOut();
  }

  ngOnInit() {
    // Demonstration of register and unregister login events
    this.auth.addLogInEventListener(() => console.log('Welcome'));

    // Demonstration of register and unregister logout events
    this.auth.addLogOutEventListener(() => console.log('Bye'));
  }

}
