import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RulesetAnalysisComponent } from './ruleset-analysis.component';
import {RouterTestingModule} from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {HeaderComponent} from '../../shared/header/header.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('RulesetAnalysisComponent', () => {
  let component: RulesetAnalysisComponent;
  let fixture: ComponentFixture<RulesetAnalysisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [RulesetAnalysisComponent],
    imports: [RouterTestingModule, HeaderComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesetAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
