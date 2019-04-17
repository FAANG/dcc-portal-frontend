import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolExperimentDetailsComponent } from './protocol-experiment-details.component';
import {HeaderComponent} from '../../shared/header/header.component';
import {RobustLinkComponent} from '../../shared/robust-link/robust-link.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ProtocolExperimentDetailsComponent', () => {
  let component: ProtocolExperimentDetailsComponent;
  let fixture: ComponentFixture<ProtocolExperimentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProtocolExperimentDetailsComponent,
        HeaderComponent,
        RobustLinkComponent
      ],
      imports: [
        NgxPaginationModule,
        NgxSmartModalModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        NgxSmartModalService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolExperimentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
