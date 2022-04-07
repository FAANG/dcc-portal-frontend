import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RulesetSampleComponent } from './ruleset-sample.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HeaderComponent} from '../../shared/header/header.component';

describe('RulesetSampleComponent', () => {
  let component: RulesetSampleComponent;
  let fixture: ComponentFixture<RulesetSampleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        RulesetSampleComponent,
        HeaderComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesetSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
