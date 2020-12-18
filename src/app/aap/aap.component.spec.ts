import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AapComponent } from './aap.component';
import {AuthService, TokenService, ɵb as AAP_CONFIG, ɵf as DEFAULT_CONF} from 'ng-ebi-authorization';
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
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        { provide: AAP_CONFIG, useValue: DEFAULT_CONF }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
