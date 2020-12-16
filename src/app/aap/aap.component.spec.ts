import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AapComponent } from './aap.component';
import {AuthService, TokenService} from 'ng-ebi-authorization';
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import {HttpClientModule} from '@angular/common/http';

describe('AapComponent', () => {
  let component: AapComponent;
  let fixture: ComponentFixture<AapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AapComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule],
      providers: [AuthService, TokenService, JwtHelperService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
