import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import {UserService} from '../services/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule, 
        HttpClientModule,
        RouterTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('login function fails with incorrect/no credentials', inject([UserService], (service: UserService) => {
    component.login();
    setTimeout(() => {
      expect(expect(Object.keys(service.errors).length).toBeGreaterThan(0));
    }, 1000)
  }));

  it ('logout sets username to null', inject([UserService], (service: UserService) => {
    service.username = 'test';
    component.logout();
    expect(expect(service.username).toEqual(null));
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
