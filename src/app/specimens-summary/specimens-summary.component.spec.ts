import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecimensSummaryComponent } from './specimens-summary.component';
import {HeaderComponent} from '../shared/header/header.component';
import {ChartsModule} from 'ng2-charts';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SpecimensSummaryComponent', () => {
  let component: SpecimensSummaryComponent;
  let fixture: ComponentFixture<SpecimensSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpecimensSummaryComponent,
        HeaderComponent
      ],
      imports: [
        ChartsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecimensSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
