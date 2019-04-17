import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetsSummaryComponent } from './datasets-summary.component';
import {HeaderComponent} from '../shared/header/header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ChartsModule} from 'ng2-charts';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DatasetsSummaryComponent', () => {
  let component: DatasetsSummaryComponent;
  let fixture: ComponentFixture<DatasetsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatasetsSummaryComponent,
        HeaderComponent
      ],
      imports: [
        RouterTestingModule,
        ChartsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
