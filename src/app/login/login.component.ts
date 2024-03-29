import { Component, OnInit } from '@angular/core';
import {UserForm} from '../validation/webin_aap_user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = new UserForm('', '', '');

  constructor(public _userService: UserService, private router: Router) { }

  ngOnInit() {
    this._userService.loginSuccess.subscribe(data => {
      this.router.navigate(['projects/BovReg']);
    });
  }

  login() {
    this._userService.login({'username': this.model.username, 'password': this.model.password});
  }

  refreshToken() {
    this._userService.refreshToken();
  }

  logout() {
    this._userService.logout();
  }

}
