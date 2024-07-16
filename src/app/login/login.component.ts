import { Component, OnInit } from '@angular/core';
import {UserForm} from '../validation/webin_aap_user';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout/flex';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [HeaderComponent, FlexModule, FormsModule, MatButton]
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

  getErrors() {
    return this._userService.errors.username;
  }

}
