import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Subject} from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loginSuccess = new Subject();

  // http options used for making API calls
  private httpOptions: any;

  // the actual JWT token
  public token: any;

  // the token expiration date
  public token_expires: any;

  // the username of the logged in user
  public username: any = '';

  // error messages received from the login attempt
  public errors: any = [];

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  // Uses http.post() to get an auth token from djangorestframework-jwt endpoint
  public login(user: {[index: string]: any}) {
    this.http.post('https://api.faang.org/api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe({
      next: (data: {[index: string]: any}) => {
        console.log('login success', data);
        this.loginSuccess.next(true);
        this.updateData(data['token']);
      },
      error: err => {
        console.error('login error', err);
        this.errors = err['error'];
      }
  });
  }

  /**
   * Refreshes the JWT token, to extend the time the user is logged in
   */
  public refreshToken() {
    this.http.post('https://api.faang.org/api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe({
      next: (data: { [index: string]: any }) => {
        console.log('refresh success', data);
        this.updateData(data['token']);
      },
      error: err => {
        console.error('refresh error', err);
        this.errors = err['error'];
      }
    });
  }

  public logout() {
    this.token = null;
    this.token_expires = null;
    this.username = null;
  }

  private updateData(token: string) {
    this.token = token;
    this.errors = [];

    // decode the token to read the username and expiration timestamp
    const token_parts = this.token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    this.token_expires = new Date(token_decoded.exp * 1000);
    this.username = token_decoded.username;
  }
}
