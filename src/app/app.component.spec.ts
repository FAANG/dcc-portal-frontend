import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CookieLawModule} from 'angular2-cookie-law';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterComponent} from './shared/footer/footer.component';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FooterComponent
      ],
      imports: [
        RouterTestingModule,
        CookieLawModule,
        NgxSpinnerModule,
        BrowserAnimationsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'faang-portal-frontend-angular6-second'`, async(() => {
    expect(component.title).toEqual('faang-portal-frontend-angular6-second');
  }));

  it('should dismiss', () => {
    const spyObj = jasmine.createSpyObj('cookie-law', ['dismiss']);
    component.cookieLawEl = spyObj;
    component.dismiss();
    expect(component.cookieLawEl.dismiss).toHaveBeenCalled();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
